import './editor.scss';

import {
	useContext,
	useState,
	useEffect,
	forwardRef,
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
import { __ } from '@wordpress/i18n';
import { useDispatch, select } from '@wordpress/data';
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

import UploaderContext from '../../contexts/UploaderContext';
import SendCommand from '../../utils/SendCommand';
import MediaLink from '../../components/MediaLink';
import useDeviceType from '../../hooks/useDeviceType';
import PanelBodyControl from '../../components/PanelBody';
import SidebarImageInspectorControl from '../../components/SidebarImageInspectorControl';
import SidebarImageAdvancedInspectorControl from '../../components/SidebarImageAdvancedInspectorControl';
import CustomPresets from '../../components/CustomPresets';
import getStyles from '../../blocks/photo-block/block-styles';

const EditScreen = forwardRef( ( props, ref ) => {
	const { attributes, setAttributes, innerBlockProps, clientId } = props;
	const {
		uniqueId,
		photo,
		imageSize,
		cssGramFilter,
	} = attributes;
	const { url, id, width, height } = photo;
	const [ imageLoading, setImageLoading ] = useState( true );
	const [ a11yButton, setA11yButton ] = useState( null );
	const [ a11yPopover, setA11yPopover ] = useState( null );
	const [ inspectorTab, setInspectorTab ] = useState( 'settings' ); // Can be settings|styles.
	const [ imageSizeLoading, setImageSizeLoading ] = useState( false );
	const [ mediaLinkPopover, setMediaLinkPopover ] = useState( false );
	const [ mediaLinkRef, setMediaLinkRef ] = useState( null );

	const {
		screen,
		setScreen,
		captionPosition,
		setImageFile,
		imageFile,
		originalImageFile,
		photoMode,
		setPhotoMode,
	} = useContext( UploaderContext );

	const { insertBlock, updateBlockAttributes } = useDispatch( store ); // For setting the preset defaults.

	const [ deviceType, setDeviceType ] = useDeviceType( 'Desktop' );

	// Setup useEffect to update image dimensions if empty.
	useEffect( () => {
		if ( photo.url ) {
			setImageFile( photo );
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
			`${ photoBlock.restUrl + '/get-image-by-size' }/id=${
				photo.id
			}/size=${ size }`,
			'GET'
		)
			.then( ( response ) => {
				setAttributes( { photo: { ...photo, ...response.data } } );
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
		const originalImageUrl = originalImageFile?.url;
		const newImageUrl = photo?.url;

		return originalImageUrl && newImageUrl && originalImageUrl !== newImageUrl;
	};

	// Take a width/height and calculate the width based on the aspect ratio.
	const calculateWidth = ( imageWidth, imageHeight, newHeight ) => {
		const aspectRatio = imageWidth / imageHeight;

		return Math.round( newHeight * aspectRatio );
	};

	// Take a width/height and calculate the height based on the aspect ratio.
	const calculateHeight = ( imageWidth, imageHeight, newWidth ) => {
		const aspectRatio = imageWidth / imageHeight;
		return Math.round( newWidth / aspectRatio );
	};

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
				<PanelRow>
					<TextControl
						label={ __( 'Photo Title', 'photo-block' ) }
						value={ photo.title }
						onChange={ ( title ) => {
							setAttributes( { photo: { ...photo, title } } );
						} }
						placeholder={ __(
							'Please enter a title for this photo.',
							'photo-block'
						) }
					/>
				</PanelRow>
				<PanelRow>
					<TextareaControl
						label={ __( 'Alt Text', 'photo-block' ) }
						value={ photo.alt }
						onChange={ ( alt ) => {
							setAttributes( { photo: { ...photo, alt } } );
						} }
						placeholder={ __( 'Please describe this photo.', 'photo-block' ) }
						help={ __(
							'Alt text provides a description of the photo for screen readers and search engines.',
							'photo-block'
						) }
					/>
				</PanelRow>
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
									photo: originalImageFile,
								} );
								setImageFile( originalImageFile );
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
							setA11yPopover( ! a11yPopover );
						} }
						ref={ setA11yButton }
					/>
					<ToolbarButton
						icon={ <Link /> }
						label={ __( 'Set Link Options', 'photo-block' ) }
						onClick={ () => {
							setMediaLinkPopover( ! mediaLinkPopover );
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
					onClose={ () => {
						setMediaLinkPopover( false );
					} }
				/>
			) }
			{ a11yPopover && (
				<Popover
					position="bottom center"
					onClose={ () => {
						setA11yPopover( false );
					} }
					anchor={ a11yButton }
				>
					<div className="dlx-photo-block__a11y-popover">
						<h3>{ __( 'Accessibility Options', 'photo-block' ) }</h3>
						<TextControl
							label={ __( 'Photo Title', 'photo-block' ) }
							value={ photo.title }
							onChange={ ( title ) => {
								setAttributes( { photo: { ...photo, title } } );
							} }
							placeholder={ __(
								'Please enter a title for this photo.',
								'photo-block'
							) }
							help={ __(
								'The title is used as a tooltip when hovering over the image.',
								'photo-block'
							) }
						/>
						<TextareaControl
							label={ __( 'Alt Text', 'photo-block' ) }
							value={ photo.alt }
							onChange={ ( alt ) => {
								setAttributes( { photo: { ...photo, alt } } );
							} }
							placeholder={ __( 'Please describe this image.', 'photo-block' ) }
							help={ __(
								'Alt text provides a description of the image for screen readers and search engines.',
								'photo-block'
							) }
						/>
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
