import './editor.scss';

import {
	useContext,
	useState,
	useEffect,
	forwardRef,
	useMemo,
	useCallback,
} from '@wordpress/element';
import {
	Spinner,
	ToolbarGroup,
	ToolbarButton,
	Popover,
	ToolbarDropdownMenu,
	TextControl,
	TextareaControl,
	SelectControl,
	BaseControl,
	Button,
	MenuGroup,
	MenuItem,
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
	CaptionsOff,
	AlignLeft,
	AlignCenter,
	AlignRight,
	Undo2,
	ClipboardCheck,
} from 'lucide-react';
import {
	positionLeft,
	positionRight,
	positionCenter,
} from '@wordpress/icons';
import { applyFilters } from '@wordpress/hooks';
import classnames from 'classnames';
import { blockStore } from '../../store';
import SendCommand from '../../utils/SendCommand';
import MediaLink from '../../components/MediaLink';
import useDeviceType from '../../hooks/useDeviceType';
import PanelBodyControl from '../../components/PanelBody';
import SidebarImageInspectorControl from '../../components/SidebarImageInspectorControl';
import SidebarImageAdvancedInspectorControl from '../../components/SidebarImageAdvancedInspectorControl';
import getStyles from '../../blocks/photo-block/block-styles';
import GlobalStylesPicker from '../../components/GlobalStylesPicker';
import globalStylesStore from '../../store/global-styles';
import AlignmentToolbar from '../../components/AlignmentToolbar';

const EditScreen = forwardRef( ( props, ref ) => {
	const { setAttributes, innerBlockProps, clientId, blockUniqueId } = props;

	const attributes = props.attributes || {};

	const innerBlockCount = useSelect( ( coreSelect ) => coreSelect( 'core/block-editor' ).getBlock( clientId ).innerBlocks ).length;

	// Apply filters to attributes.
	useEffect( () => {
		const newAttributes = applyFilters( 'dlx_photo_block_attributes', props.attributes, props.attributes.globalStyle, clientId, 'photo' );

		setAttributes( {
			...props.attributes,
			...newAttributes,
		} );
	}, [] );

	const {
		uniqueId,
		imageSize,
		cssGramFilter,
		globalStyle,
		photoPosition,
		align,
	} = attributes;

	const { globalStyleCSSClassName } = useSelect( ( newSelect ) => {
		const maybeGlobalStyle = newSelect( globalStylesStore ).getGlobalStyleBySlug( globalStyle );
		if ( Object.keys( maybeGlobalStyle ).length === 0 ) {
			return '';
		}
		return {
			globalStyleCSSClassName: maybeGlobalStyle.css_class,
		};
	} );

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
		setJustCropped,
		setHideCaption,
		setPhotoMode,
	} = useDispatch( blockStore( blockUniqueId ) );

	const { createSuccessNotice, createInfoNotice } = useDispatch( 'core/notices' );

	// Get current block data.
	const {
		imageData,
		captionPosition,
		photoMode,
		originalImageData,
		isJustCropped,
		hideCaption,
	} = useSelect( ( select ) => {
		return {
			imageData: select( blockStore( blockUniqueId ) ).getImageData(),
			captionPosition: select( blockStore( blockUniqueId ) ).getCaptionPosition(),
			photoMode: select( blockStore( blockUniqueId ) ).getPhotoMode(),
			originalImageData: select( blockStore( blockUniqueId ) ).getOriginalImageData(),
			isJustCropped: select( blockStore( blockUniqueId ) ).getJustCropped(),
			hideCaption: select( blockStore( blockUniqueId ) ).getHideCaption( attributes.hideCaption ),
		};
	} );

	// Get global style data.
	const {
		hasGlobalStyle,
	} = useSelect( ( select ) => {
		return {
			hasGlobalStyle: select( globalStylesStore ).hasGlobalStyle,
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

	/**
	 * Get image whenever size changes.
	 */
	useEffect( () => {
		if ( 'photo' === photoMode ) {
			getImageFromSize( imageSize );
		}
	}, [ imageSize ] );

	/**
	 * Retrieve an image based on size from REST API.
	 *
	 * @param {string} size Image size.
	 */
	const getImageFromSize = async( size ) => {
		setImageSizeLoading( true );
		const imageId = imageData?.id || 0;
		if ( 0 === imageId ) {
			setImageSizeLoading( false );
			return;
		}
		await SendCommand(
			photoBlock.restNonce,
			{},
			`${ photoBlock.restUrl + '/get-image-by-size' }/id=${ imageData.id
			}/size=${ size }`,
			'GET'
		)
			.then( ( response ) => {
				const { success, data } = response.data;
				if ( ! success ) {
					// Image could not be found.
					// If a URL is found in imageData, set photoMode to url.
					if ( imageData.url ) {
						setAttributes( { photoMode: 'url' } );
						setPhotoMode( 'url' );
					}
					// Set image ID to 0 in image data.
					setImageData( { ...imageData, id: 0 } );
					return;
				}
				setImageData( { ...imageData, ...data } );
				setAttributes( { imageData: { ...imageData, ...data } } );
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
	 * Handle changes to the alt text.
	 *
	 * @param {string} altText The alt text.
	 */
	const handleAltChange = useCallback( debounce( async( altText ) => {
		// Ignore manual mode, which is direct URL input. Nothing to save to.
		if ( 'manual' === photoMode || 'url' === photoMode ) {
			return;
		}

		// Set snackbar notice.
		createInfoNotice( __( 'Saving alt text…', 'photo-block' ), {
			type: 'snackbar',
		} );

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
				createSuccessNotice( __( 'Alt text saved.', 'photo-block' ), {
					type: 'snackbar',
				} );
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
		if ( 'manual' === photoMode || 'url' === photoMode ) {
			return;
		}

		// Set snackbar notice.
		createInfoNotice( __( 'Saving title text…', 'photo-block' ), {
			type: 'snackbar',
		} );

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
				createSuccessNotice( __( 'Title text saved.', 'photo-block' ), {
					type: 'snackbar',
				} );
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
			<GlobalStylesPicker { ...props } />
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
							'Please enter a title for this photo.',
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
						placeholder={ __( 'Please describe this photo.', 'photo-block' ) }
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
				{
					<div className="photo-block__image-size-control">
						<SelectControl
							label={ __( 'Image Size', 'photo-block' ) }
							value={ imageSize }
							onChange={ ( size ) => {
								if ( hasGlobalStyle( globalStyle ) ) {
									setAttributes( { imageSizeOverride: true } );
								}
								setAttributes( { imageSize: size } );
								getImageFromSize( size );
							} }
							options={ imageSizeOptions }
							disabled={ 'photo' !== photoMode }
						/>
						{ imageSizeLoading && (
							<>
								<div className="photo-block__text-saving"><Spinner /> { __( 'Loading image size…', 'photo-block' ) }</div>
							</>
						) }
						<div className="photo-block__image-info">
							<div className="photo-block__image-info-item">
								<TextControl
									disabled={ true }
									value={ imageData.url }
									className="photo-block__image-info-item-text"
									label={ __( 'URL', 'photo-block' ) }
									help={ __( 'The URL of the image.', 'photo-block' ) }
								/>
								<Button
									variant="secondary"
									icon={ <ClipboardCheck /> }
									label={ __( 'Copy URL', 'photo-block' ) }
									onClick={ () => {
										if ( navigator.clipboard && window.isSecureContext ) {
											navigator.clipboard.writeText( imageData.url ).then( () => {
												createSuccessNotice( __( 'URL copied to clipboard.', 'photo-block' ), {
													type: 'snackbar',
												} );
											} ).catch( ( error ) => {
												console.error( error );
											} );
										} else {
											// Fallback for older browsers
											const textArea = document.createElement( 'textarea' );
											textArea.value = imageData.url;
											document.body.appendChild( textArea );
											textArea.select();
											try {
												document.execCommand( 'copy' );
												createSuccessNotice( __( 'URL copied to clipboard.', 'photo-block' ), {
													type: 'snackbar',
												} );
											} catch ( error ) {
												console.error( error );
											}
											document.body.removeChild( textArea );
										}
									} }
									className="photo-block__copy-url-button"
								/>
							</div>
							{
								( imageData.dimensions && imageData.file_size ) && (
									<div className="photo-block__image-info-items">
										{ imageData.file_size && (
											<div className="photo-block__image-info-item">
												<BaseControl id="photo-block__image-info-file-size" label={ __( 'File Size', 'photo-block' ) }>
													<p>{ imageData.file_size }</p>
												</BaseControl>
											</div>
										) }
										{ imageData.dimensions && (
											<div className="photo-block__image-info-item">
												<BaseControl id="photo-block__image-info-dimensions" label={ __( 'Dimensions', 'photo-block' ) }>
													<p>{ imageData.dimensions.width } x { imageData.dimensions.height }</p>
												</BaseControl>
											</div>
										) }
									</div>
								)
							}
						</div>
					</div>
				}
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
				globalStyle={ globalStyle }
				{ ...props }
			/>
		</>
	);

	// Set the local inspector controls.
	const localInspectorControls = (
		<InspectorControls>{ interfaceTabs }</InspectorControls>
	);

	// Set the advanced inspector controls.
	const advancedInspectorControls = (
		<>
			<SidebarImageAdvancedInspectorControl
				{ ...props }
				globalStyle={ globalStyle }
			/>
		</>
	);

	/**
	 * Get the center icon.
	 * @return {JSX.Element} The center icon.
	 */
	const getCenterIcon = () => {
		switch ( align ) {
			case 'none':
				return <AlignNone />;
			case 'left':
				return <AlignLeft />;
			case 'center':
				return <AlignCenter />;
			case 'right':
				return <AlignRight />;
			case 'wide':
				return 'align-full-width';
		}
	};

	const localToolbar = (
		<>
			<BlockControls>
				{
					! hasGlobalStyle( globalStyle ) && (
						<AlignmentToolbar { ...props } />
					)
				}
				{
					! hasGlobalStyle( globalStyle ) && (
						<ToolbarGroup>
							<ToolbarDropdownMenu
								icon={ getCenterIcon() }
								label={ __( 'Align', 'photo-block' ) }
								className="dlx-photo-block__alignment-dropdown"
							>
								{ ( { onClose } ) => (
									<>
										<MenuGroup className="dlx-photo-block__alignment-dropdown-group">

											<MenuItem
												icon="align-left"
												isSelected={ 'left' === align }
												onClick={ () => {
													setAttributes( { align: 'left' } );
													onClose();
												} }
												iconPosition="left"
												label={ __( 'Align Left', 'photo-block' ) }
												role="menuitemradio"
												className={
													classnames( {
														'is-active': 'left' === align,
													} )
												}
											>
												{ __( 'Left', 'photo-block' ) }
											</MenuItem>
											<MenuItem
												icon="align-center"
												isSelected={ 'center' === align }
												onClick={ () => {
													setAttributes( { align: 'center' } );
													onClose();
												} }
												iconPosition="left"
												label={ __( 'Align Center', 'photo-block' ) }
												role="menuitemradio"
												className={
													classnames( {
														'is-active': 'center' === align,
													} )
												}
											>
												{ __( 'Center', 'photo-block' ) }
											</MenuItem>
											<MenuItem
												icon="align-right"
												isSelected={ 'right' === align }
												onClick={ () => {
													setAttributes( { align: 'right' } );
													onClose();
												} }
												iconPosition="left"
												label={ __( 'Align Right', 'photo-block' ) }
												role="menuitemradio"
												className={
													classnames( {
														'is-active': 'right' === align,
													} )
												}
											>
												{ __( 'Right', 'photo-block' ) }
											</MenuItem>
										</MenuGroup>
									</>
								) }
							</ToolbarDropdownMenu>
						</ToolbarGroup>
					)
				}
				{
					innerBlockCount === 0 && (
						<ToolbarGroup>
							<ToolbarButton
								icon={ <CaptionsOff /> }
								label={ hideCaption ? __( 'Show Caption', 'photo-block' ) : __( 'Hide Caption', 'photo-block' ) }
								onClick={ () => {
									setAttributes( { hideCaption: ! hideCaption } );
									setHideCaption( ! hideCaption );
								} }
								isPressed={ true === hideCaption }
							/>
						</ToolbarGroup>
					)
				}
				<ToolbarGroup>
					{
						isJustCropped && (
							<ToolbarButton
								icon={ <Undo2 /> }
								label={ __( 'Undo Crop', 'photo-block' ) }
								onClick={ () => {
									setAttributes( { imageData: originalImageData } );
									setJustCropped( false );
									setImageData( originalImageData );
									setScreen( 'edit' );
								} }
							>
								{ __( 'Undo Crop', 'photo-block' ) }
							</ToolbarButton>
						)
					}
					<ToolbarButton
						icon={ <Crop /> }
						label={ __( 'Crop', 'photo-block' ) }
						onClick={ () => {
							setJustCropped( false );
							setScreen( 'crop' );
						} }
						disabled={ 'photo' !== photoMode }
					>
						{ __( 'Crop', 'photo-block' ) }
					</ToolbarButton>
				</ToolbarGroup>
				<ToolbarGroup>
					<ToolbarButton
						icon={ <Image /> }
						label={ __( 'Replace Photo', 'photo-block' ) }
						onClick={ () => {
							setScreen( 'initial' );
							setJustCropped( false );
						} }
					>
						{ __( 'Replace', 'photo-block' ) }
					</ToolbarButton>
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
					{
						<ToolbarButton
							icon={ <Link /> }
							label={ __( 'Set Link Options', 'photo-block' ) }
							onClick={ () => {
								setMediaLinkPopover( ! mediaLinkPopover );
							} }
							ref={ setMediaLinkRef }
						/>
					}
				</ToolbarGroup>
			</BlockControls>
			{ mediaLinkPopover && (
				<MediaLink
					attributes={ attributes }
					setAttributes={ setAttributes }
					anchorRef={ mediaLinkRef }
					blockUniqueId={ blockUniqueId }
					onClose={ () => {
						setMediaLinkPopover( false );
					} }
				/>
			) }
			{ a11yPopover && (
				<Popover
					position="bottom center"
					anchor={ a11yButton }
					onClose={ () => {
						setA11yPopover( false );
					} }
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
								'Please enter a title for this photo.',
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
						{ ( isSavingAlt ) && (
							<>
								<div className="photo-block__text-saving"><Spinner /> { __( 'Saving alt text…', 'photo-block' ) }</div>
							</>
						) }
					</div>
				</Popover>
			) }
		</>
	);

	const styles = useMemo( () => {
		if ( ! hasGlobalStyle( globalStyle ) ) {
			return getStyles( attributes, deviceType, uniqueId );
		}
		return '';
	}, [ attributes, deviceType, uniqueId, hasGlobalStyle, globalStyle ] );

	const photoImg = (
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
			width={ imageData.width }
			height={ imageData.height }
		/>
	);

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
				{ ( imageLoading ) && (
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
				<figure className={ `dlx-photo-block__screen-edit-image-wrapper dlx-photo-block__figure ${ globalStyleCSSClassName }` }>
					{ 'top' === captionPosition && (
						<div
							className="dlx-photo-block__screen-edit-caption dlx-photo-block__caption"
							{ ...innerBlockProps }
						/>
					) }
					<div className="dlx-photo-block__screen-edit-image dlx-photo-block__image-wrapper">
						<div className="dlx-photo-block__screen-edit-image-inner">
							{ photoImg }
							{ 'overlay' === captionPosition && (
								<div
									className="dlx-photo-block__screen-edit-caption dlx-photo-block__caption dlx-photo-block__caption--overlay"
									{ ...innerBlockProps }
								/>
							) }
						</div>
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
