import './editor.scss';

import {
	useContext,
	useState,
	useEffect,
	forwardRef,
	useCallback,
} from '@wordpress/element';
import {
	Spinner,
	ToolbarGroup,
	ToolbarButton,
	Popover,
	TabPanel,
	PanelBody,
	TextControl,
	TextareaControl,
	PanelRow,
	SelectControl,
	ButtonGroup,
	Button,
} from '@wordpress/components';
import {
	InspectorControls,
	BlockControls,
	InspectorAdvancedControls,
	store,
} from '@wordpress/block-editor';
import { debounce } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { useDispatch, useSelect } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import {
	Crop,
	Image,
	Accessibility,
	Link,
	Settings,
	Paintbrush,
	Layers,
	Undo2,
} from 'lucide-react';
import classnames from 'classnames';
import blockStore from '../../store';
import SendCommand from '../../utils/SendCommand';
import MediaLink from '../../components/MediaLink';
import useDeviceType from '../../hooks/useDeviceType';
import PanelBodyControl from '../../components/PanelBody';
import SidebarImageInspectorControl from '../../components/SidebarImageInspectorControl';
import SidebarImageAdvancedInspectorControl from '../../components/SidebarImageAdvancedInspectorControl';
import CustomPresets from '../../components/CustomPresets';
import getStyles from '../../blocks/photo-block/block-styles';

const EditScreen = forwardRef( ( props, ref ) => {
	const { attributes, setAttributes, innerBlockProps, clientId, blockUniqueId } = props;
	const {
		uniqueId,
		imageSize,
		cssGramFilter,
	} = attributes;
	const [ imageLoading, setImageLoading ] = useState( true );
	const [ a11yButton, setA11yButton ] = useState( null );
	const [ a11yPopover, setA11yPopover ] = useState( null );
	const [ inspectorTab, setInspectorTab ] = useState( 'settings' ); // Can be settings|styles.
	const [ imageSizeLoading, setImageSizeLoading ] = useState( false );
	const [ mediaLinkPopover, setMediaLinkPopover ] = useState( false );
	const [ mediaLinkRef, setMediaLinkRef ] = useState( null );
	const [ isSavingAlt, setIsSavingAlt ] = useState( false );
	const [ isSavingTitle, setIsSavingTitle ] = useState( false );

	const {
		setScreen,
		setImageData,
	} = useDispatch( blockStore( blockUniqueId ) );

	// Get current block data.
	const {
		imageData,
		captionPosition,
		photoMode,
		originalImageData,
	} = useSelect( ( select ) => {
		return {
			imageData: select( blockStore( blockUniqueId ) ).getImageData(),
			captionPosition: select( blockStore( blockUniqueId ) ).getCaptionPosition(),
			photoMode: select( blockStore( blockUniqueId ) ).getPhotoMode(),
			originalImageData: select( blockStore( blockUniqueId ) ).getOriginalImageData(),

		};
	} );

	const { url, id, width, height } = imageData;

	const { insertBlock, updateBlockAttributes } = useDispatch( store ); // For setting the preset defaults.

	const [ deviceType, setDeviceType ] = useDeviceType( 'Desktop' );

	// Setup useEffect to update image dimensions if empty.
	useEffect( () => {
		const imageUrl = attributes.imageData?.url || '';
		if ( '' !== imageUrl ) {
			setImageData( attributes.imageData );
			setImageLoading( false );
		}
	}, [] );

	// Set the default preset when first loading in (if not already set).
	useEffect( () => {
		if ( false !== imageLoading ) {
			return;
		}
		if ( false !== attributes.defaultsApplied ) {
			return;
		}
		const defaultPreset = photoBlock?.defaultPreset?.attributes ?? false;
		if ( ! defaultPreset ) {
			return;
		}

		// Get innerblocks of parent photo block.
		const children =
			select( 'core/block-editor' ).getBlocksByClientId( clientId )[ 0 ]
				?.innerBlocks || [];
		const captionBlock = children.find(
			( block ) => 'dlxplugins/photo-caption-block' === block.name
		);

		// Get unique ID for the photo block.
		const photoBlockAttributes = { ...defaultPreset.photoAttributes };

		// Apply attributes for photo block.
		setAttributes( photoBlockAttributes );

		// If there is no caption block, but there are attributes to apply, create one.
		if ( ! captionBlock && defaultPreset?.captionAttributes ) {
			const newBlocks = createBlock(
				'dlxplugins/photo-caption-block',
				defaultPreset?.captionAttributes
			);
			insertBlock( newBlocks, undefined, clientId );
		}

		// If there is a caption block and attributes to apply, apply them.
		if ( captionBlock && defaultPreset?.captionAttributes ) {
			const captionBlockAttributes = { ...defaultPreset?.captionAttributes };
			updateBlockAttributes( captionBlock.clientId, captionBlockAttributes );
		}

		// Set having applied defaults to true.
		setAttributes( { defaultsApplied: true } );
	}, [ imageLoading ] );

	/**
	 * Retrieve an image based on size from REST API.
	 *
	 * @param {string} size Image size.
	 */
	const getImageFromSize = async( size ) => {
		setImageSizeLoading( true );
		await SendCommand(
			photoBlock.restNonce,
			{},
			`${ photoBlock.restUrl + '/get-image-by-size' }/id=${ imageData.id
			}/size=${ size }`,
			'GET'
		)
			.then( ( response ) => {
				setAttributes( { imageData: { ...imageData, ...response.data } } );
			} )
			.catch( ( error ) => {
				// todo: error checking/display.
				console.error( error );
			} )
			.then( () => {
				setImageSizeLoading( false );
			} );
	};

	/**
	 * Whether to show the undo button.
	 *
	 * @return {boolean} Whether to show the undo button.
	 */
	const canShowUndo = () => {
		const originalImageUrl = originalImageData?.url;
		const newImageUrl = imageData?.url;

		return originalImageUrl && newImageUrl && originalImageUrl !== newImageUrl;
	};

	/**
	 * Handle changes to the alt text.
	 *
	 * @param {string} altText The alt text.
	 */
	const handleAltChange = useCallback( debounce( async( altText ) => {
		// Ignore manual mode, which is direct URL input. Nothing to save to.
		if ( 'manual' === photoMode ) {
			return;
		}

		// Commence saving.
		setIsSavingAlt( true );
		await SendCommand(
			photoBlock.restNonce,
			{
				imageId: imageData.id,
				altText,
			},
			`${ photoBlock.restUrl + '/image/save-alt' }`,
			'POST'
		)
			.then( ( response ) => {
			} )
			.catch( ( error ) => {
				// todo: error checking/display.
				console.error( error );
			} )
			.then( () => {
				setIsSavingAlt( false );
			} );
	}, 1000 ), [] );

	/**
	 * Handle changes to the title text.
	 *
	 * @param {string} titleText The title text.
	 */
	const handleTitleChange = useCallback( debounce( async( titleText ) => {
		// Ignore manual mode, which is direct URL input. Nothing to save to.
		if ( 'manual' === photoMode ) {
			return;
		}

		// Commence saving.
		setIsSavingTitle( true );
		await SendCommand(
			photoBlock.restNonce,
			{
				imageId: imageData.id,
				titleText,
			},
			`${ photoBlock.restUrl + '/image/save-title' }`,
			'POST'
		)
			.then( ( response ) => {
			} )
			.catch( ( error ) => {
				// todo: error checking/display.
				console.error( error );
			} )
			.then( () => {
				setIsSavingTitle( false );
			} );
	}, 1500 ), [] );

	// Image Sizes.
	const imageSizeOptions = [];
	for ( const key in photoBlock.imageSizes ) {
		const size = photoBlock.imageSizes[ key ];
		imageSizeOptions.push( { value: key, label: size.label } );
	}

	// Set settings inspector Controls.
	const settingsInspectorControls = (
		<>
			<PanelBody
				title={ __( 'Presets', 'photo-block' ) }
				initialOpen={ false }
				icon={ <Layers /> }
				className="photo-block__inspector-panel"
			>
				{ <CustomPresets { ...props } /> }
			</PanelBody>
			<PanelBodyControl
				title={ __( 'Photo Settings', 'photo-block' ) }
				icon={ <Image /> }
				className="photo-block__inspector-panel"
				id="photo-block__photo-settings"
				uniqueId={ uniqueId }
				initialOpen={ true }
				scrollAfterOpen={ false }
			>
				<>
					<TextControl
						label={ __( 'Photo Title', 'photo-block' ) }
						value={ attributes.imageData.title }
						onChange={ ( title ) => {
							setAttributes( { imageData: { ...imageData, title } } );
							setImageData( { ...imageData, title } );
							handleTitleChange( title );
						} }
						className={
							classnames( 'photo-block__title-text',
								{ 'is-saving': isSavingTitle }
							)
						}
						placeholder={ __(
							'Please enter a title for this imageData.',
							'photo-block'
						) }
					/>
					{ isSavingTitle && (
						<>
							<div className="photo-block__text-saving"><Spinner /> { __( 'Saving title text…', 'photo-block' ) }</div>
						</>
					) }
				</>
				<>
					<TextareaControl
						label={ __( 'Alt Text', 'photo-block' ) }
						value={ attributes.imageData.alt }
						onChange={ ( alt ) => {
							setAttributes( { imageData: { ...imageData, alt } } );
							setImageData( { ...imageData, alt } );
							handleAltChange( alt );
						} }
						className={
							classnames( 'photo-block__alt-text',
								{ 'is-saving': isSavingAlt }
							)
						}
						placeholder={ __( 'Please describe this imageData.', 'photo-block' ) }
						help={ __(
							'Alt text provides a description of the photo for screen readers and search engines.',
							'photo-block'
						) }
					/>
					{ isSavingAlt && (
						<>
							<div className="photo-block__text-saving"><Spinner /> { __( 'Saving alt text…', 'photo-block' ) }</div>
						</>
					) }
				</>
				<PanelRow>
					<SelectControl
						label={ __( 'Image Size', 'photo-block' ) }
						value={ imageSize }
						onChange={ ( size ) => {
							setAttributes( { imageSize: size } );
							getImageFromSize( size );
						} }
						options={ imageSizeOptions }
						disabled={ 'photo' !== photoMode }
					/>
				</PanelRow>
			</PanelBodyControl>
		</>
	);

	const interfaceTabs = (
		<>
			{ settingsInspectorControls }
			<SidebarImageInspectorControl
				attributes={ attributes }
				setAttributes={ setAttributes }
				blockUniqueId={ blockUniqueId }
			/>
		</>
	);

	// Set the local inspector controls.
	const localInspectorControls = (
		<InspectorControls>{ interfaceTabs }</InspectorControls>
	);

	// Set the advanced inspector controls.
	const advancedInspectorControls = (
		<SidebarImageAdvancedInspectorControl
			attributes={ attributes }
			setAttributes={ setAttributes }
		/>
	);

	const localToolbar = (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon={ <Crop /> }
						label={ __( 'Crop', 'photo-block' ) }
						onClick={ () => {
							setScreen( 'crop' );
						} }
						disabled={ 'photo' !== photoMode }
					>
						{ __( 'Crop', 'photo-block' ) }
					</ToolbarButton>
					{ /* <ToolbarButton
						icon={ <Stars /> }
						label={ __( 'Effects', 'photo-block' ) }
						onClick={ () => {
							setScreen( 'effects' );
						} }
					>
						{ __( 'Effects', 'photo-block' ) }
					</ToolbarButton> */ }
				</ToolbarGroup>
				<ToolbarGroup>
					<ToolbarButton
						icon={ <Image /> }
						label={ __( 'Replace Photo', 'photo-block' ) }
						onClick={ () => {
							setScreen( 'initial' );
						} }
					>
						{ __( 'Replace', 'photo-block' ) }
					</ToolbarButton>
					{ canShowUndo() && (
						<ToolbarButton
							icon={ <Undo2 /> }
							label={ __( 'Undo', 'photo-block' ) }
							onClick={ () => {
								// Change back to original image.
								setAttributes( {
									imageData: originalImageData,
								} );
								setImageData( originalImageData );
							} }
						>
							{ __( 'Undo', 'photo-block' ) }
						</ToolbarButton>
					) }
				</ToolbarGroup>
				<ToolbarGroup>
					<ToolbarButton
						icon={ <Accessibility /> }
						label={ __( 'Set Accessibility Options', 'photo-block' ) }
						onClick={ () => {
							setA11yPopover( ( state ) => ! state );
						} }
						ref={ setA11yButton }
					/>
					<ToolbarButton
						icon={ <Link /> }
						label={ __( 'Set Link Options', 'photo-block' ) }
						onClick={ () => {
							setMediaLinkPopover( ( state ) => ! state );
						} }
						ref={ setMediaLinkRef }
					/>
				</ToolbarGroup>
			</BlockControls>
			{ mediaLinkPopover && (
				<MediaLink
					attributes={ attributes }
					setAttributes={ setAttributes }
					anchorRef={ mediaLinkRef }
					blockUniqueId={ blockUniqueId }
				/>
			) }
			{ a11yPopover && (
				<Popover
					position="bottom center"
					anchor={ a11yButton }
				>
					<div className="dlx-photo-block__a11y-popover">
						<h3>{ __( 'Accessibility Options', 'photo-block' ) }</h3>
						<TextControl
							label={ __( 'Photo Title', 'photo-block' ) }
							value={ attributes.imageData.title }
							onChange={ ( title ) => {
								setAttributes( { imageData: { ...imageData, title } } );
								setImageData( { ...imageData, title } );
								handleTitleChange( title );
							} }
							placeholder={ __(
								'Please enter a title for this imageData.',
								'photo-block'
							) }
							help={ __(
								'The title is used as a tooltip when hovering over the image.',
								'photo-block'
							) }
						/>
						{ isSavingTitle && (
							<>
								<div className="photo-block__text-saving"><Spinner /> { __( 'Saving title text…', 'photo-block' ) }</div>
							</>
						) }
						<TextareaControl
							label={ __( 'Alt Text', 'photo-block' ) }
							value={ attributes.imageData.alt }
							onChange={ ( alt ) => {
								setAttributes( { imageData: { ...imageData, alt } } );
								setImageData( { ...imageData, alt } );
								handleAltChange( alt );
							} }
							placeholder={ __( 'Please describe this image.', 'photo-block' ) }
							help={ __(
								'Alt text provides a description of the image for screen readers and search engines.',
								'photo-block'
							) }
						/>
						{ isSavingAlt && (
							<>
								<div className="photo-block__text-saving"><Spinner /> { __( 'Saving alt text…', 'photo-block' ) }</div>
							</>
						) }
					</div>
				</Popover>
			) }
		</>
	);

	const styles = getStyles( attributes, deviceType, uniqueId );

	return (
		<>
			{ localInspectorControls }
			{ localToolbar }
			{
				<InspectorAdvancedControls>
					{ advancedInspectorControls }
				</InspectorAdvancedControls>
			}
			<style>{ styles }</style>
			<div className="dlx-photo-block__screen-edit">
				{ imageLoading && (
					<div
						className="dlx-photo-block__screen-edit-spinner"
						style={ {
							minWidth: width,
							minHeight: height,
							maxWidth: '100%',
							maxHeight: '100%',
						} }
					>
						<Spinner />
					</div>
				) }
				<figure className="dlx-photo-block__screen-edit-image-wrapper dlx-photo-block__figure">
					{ 'top' === captionPosition && (
						<div
							className="dlx-photo-block__screen-edit-caption dlx-photo-block__caption"
							{ ...innerBlockProps }
						/>
					) }
					<div className="dlx-photo-block__screen-edit-image dlx-photo-block__image-wrapper">
						<img
							src={ url }
							className={ classnames(
								`photo-block-${ cssGramFilter } dlx-photo-block__image`,
								{
									'has-css-gram': cssGramFilter !== 'none',
								}
							) }
							alt=""
							onLoad={ () => {
								setImageLoading( false );
							} }
							ref={ ref }
							style={ {
								maxWidth: `100%`,
								height: 'auto',
							} }
						/>
						{ 'overlay' === captionPosition && (
							<div
								className="dlx-photo-block__screen-edit-caption dlx-photo-block__caption dlx-photo-block__caption--overlay"
								{ ...innerBlockProps }
							/>
						) }
					</div>
					{ 'bottom' === captionPosition && (
						<div
							className="dlx-photo-block__screen-edit-caption dlx-photo-block__caption"
							{ ...innerBlockProps }
						/>
					) }
				</figure>
			</div>
		</>
	);
} );
export default EditScreen;
