import './editor.scss';

import {
	useState,
	useEffect,
	forwardRef,
} from '@wordpress/element';
import {
	Spinner,
	ToolbarGroup,
	ToolbarButton,
	ToggleControl,
	Popover,
	TextControl,
	PanelRow,
	PanelBody,
	SelectControl,
	Button,
} from '@wordpress/components';
import { InspectorControls, InspectorAdvancedControls, BlockControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import {
	Image,
	Link,
	Layers,
} from 'lucide-react';
import classnames from 'classnames';
import hexToRgba from 'hex-to-rgba';
import { useDispatch, useSelect } from '@wordpress/data';

import SendCommand from '../../utils/SendCommand';
import useDeviceType from '../../hooks/useDeviceType';
import PanelBodyControl from '../../components/PanelBody';
import SidebarImageInspectorControl from '../../components/SidebarImageInspectorControl';
import SidebarImageAdvancedInspectorControl from '../../components/SidebarImageAdvancedInspectorControl';
import GlobalStyles from '../../components/GlobalStyles';
import getStyles from '../../blocks/photo-block/block-styles';
import { blockStore } from '../../store';
import PhotoBlockIcon from '../../components/Icons/PhotoBlockIcon';
import GlobalStylesPicker from '../../components/GlobalStylesPicker';
import globalStylesStore from '../../store/global-styles';
import AlignmentToolbar from '../../components/AlignmentToolbar';

const dataImages = [];

/**
 * Image size.
 */
const imageSizeOptions = [];
for ( const key in photoBlock.imageSizes ) {
	const size = photoBlock.imageSizes[ key ];
	imageSizeOptions.push( { value: key, label: size.label } );
}

const FeaturedImageScreen = forwardRef( ( props, ref ) => {
	const { attributes, setAttributes, innerBlockProps, context, blockUniqueId, clientId } = props;
	const { postId } = context;
	const [ mediaLinkPopover, setMediaLinkPopover ] = useState( false );
	const [ mediaLinkRef, setMediaLinkRef ] = useState( null );
	const [ imageLoading, setImageLoading ] = useState( true );
	const [ hasImage, setHasImage ] = useState( false );
	const {
		uniqueId,
		dataFallbackImage,
		dataHasFallbackImage,
		dataFallbackImageSize,
		dataMediaLinkSource,
		dataMediaLinkNewTab,
		imageSize,
		photoOpacity,
		photoBlur,
		photoDropShadow,
		photoBackgroundColor,
		cssGramFilter,
		lightboxEnabled,
		lightboxShowCaption,
	} = attributes;

	const {
		setImageData,
		setScreen,
	} = useDispatch( blockStore( blockUniqueId ) );

	// Get current block data.
	const {
		captionPosition,
	} = useSelect( ( select ) => {
		return {
			imageData: select( blockStore( blockUniqueId ) ).getImageData(),
			captionPosition: select( blockStore( blockUniqueId ) ).getCaptionPosition(),
		};
	} );

	const {
		hasGlobalStyle,
	} = useSelect( ( select ) => {
		return {
			hasGlobalStyle: select( globalStylesStore ).hasGlobalStyle,
		};
	} );

	const [ deviceType, setDeviceType ] = useDeviceType( 'Desktop' );

	/**
	 * Get the image from REST.
	 */
	const getImage = () => {
		setImageLoading( true );
		SendCommand(
			photoBlock.restNonce,
			{
				postId,
				dataImageSize: imageSize,
				dataFallbackImage,
				dataHasFallbackImage,
				dataFallbackImageSize,
			},
			`${ photoBlock.restUrl + '/get-featured-image-by-post-id' }`,
			'POST'
		)
			.then( ( response ) => {
				const { data } = response;

				// Check if data is string or object.
				if ( 'string' === typeof data ) {
					if ( '' === data ) {
						// No image.
						setHasImage( false );
						return;
					}
				}

				// If object, set preview image.
				if ( data.url ) {
					setHasImage( true );
					dataImages[ postId ] = data;
				}
			} )
			.catch( ( error ) => {
				// todo: error checking/display.
			} )
			.then( () => {
				setImageLoading( false );
			} );
	};

	/**
	 * Set up effect for loading the image initially using data.
	 */
	useEffect( () => {
		// Post ID may not be valid when loaded in.
		if ( 0 === postId ) {
			return;
		}
		// Check for array key in stored data.
		if ( 'undefined' !== dataImages[ postId ] && 'object' === typeof dataImages[ postId ] ) {
			setHasImage( true );
			setImageLoading( false );
			return;
		}
		setImageLoading( true );
		getImage();
	}, [ postId ] );

	/**
	 * Refresh the image when the image size changes or fallback attributes change.
	 */
	useEffect( () => {
		if ( ! imageLoading ) {
			getImage();
		}
	}, [ imageSize, dataFallbackImage, dataFallbackImageSize, dataHasFallbackImage ] );

	// Set settings inspector Controls.
	const settingsInspectorControls = (
		<>
			<GlobalStylesPicker { ...props } />
			{
				<>
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
							<SelectControl
								label={ __( 'Image Size', 'photo-block' ) }
								value={ imageSize }
								onChange={ ( size ) => {
									if ( hasGlobalStyle( attributes.globalStyle ) ) {
										setAttributes( { imageSizeOverride: true } );
									}
									setAttributes( { imageSize: size } );

									// Also set fallback image size.
									setAttributes( { dataFallbackImageSize: size } );
								} }
								options={ imageSizeOptions }
							/>
						</PanelRow>
					</PanelBodyControl>
					{ ! hasGlobalStyle( attributes.globalStyle ) && (
						<>
							<PanelBody
								icon={ <Image /> }
								title={ __( 'Fallback Image', 'photo-block' ) }
								initialOpen={ true }
								className="photo-block__inspector-panel"
							>
								<div className="dlx-photo-block__data-row">
									<ToggleControl
										label={ __( 'Enable a Fallback Image', 'photo-block' ) }
										checked={ dataHasFallbackImage }
										onChange={ ( value ) => {
											setAttributes( { dataHasFallbackImage: value } );
										} }
									/>
								</div>
								{ dataHasFallbackImage && (
									<>
										<div className="dlx-photo-block__data-row">
											<SelectControl
												label={ __( 'Select the Fallback Image Size', 'photo-block' ) }
												value={ dataFallbackImageSize }
												onChange={ ( size ) => {
													setAttributes( { dataFallbackImageSize: size } );
												} }
												options={ imageSizeOptions }
											/>
										</div>
										<div className="dlx-photo-block__data-row">
											<MediaUploadCheck>
												<MediaUpload
													allowedTypes="image"
													mode="browse"
													multiple={ false }
													title={ __( 'Please select a Fallback Image', 'photo-block' ) }
													render={ ( { open } ) => (
														<Button
															variant="secondary"
															icon={ <Image /> }
															onClick={ () => {
																open();
															} }
														>
															{ __( 'Set Fallback Image', 'photo-block' ) }
														</Button>
													) }
													onSelect={ ( media ) => {
														const selectedMedia = {
															id: media.id,
															url: media.sizes?.large?.url ?? media.sizes.full.url,
															width:
														media.sizes?.large?.width ?? media.sizes.full.width,
															height:
														media.sizes?.large?.height ?? media.sizes.full.height,
															alt: media.alt,
															caption: media.caption,
														};
														setAttributes( {
															dataFallbackImage: selectedMedia,
														} );
													} }
												/>
											</MediaUploadCheck>
										</div>
										{ dataFallbackImage?.url && (
											<>
												<div className="dlx-photo-block__data-row">
													<img
														src={ dataFallbackImage.url }
														alt={ dataFallbackImage.alt }
														width={ dataFallbackImage.width }
														height={ dataFallbackImage.height }
														style={ {
															maxWidth: '175px',
															height: 'auto',
															border: '1px solid #ddd',
														} }
													/>
												</div>
												<Button
													isDestructive={ true }
													variant="secondary"
													onClick={ () => {
														setAttributes( { dataFallbackImage: {} } );
													} }
												>
													{ __( 'Remove Fallback Image', 'photo-block' ) }
												</Button>
											</>
										) }
									</>
								) }
							</PanelBody>
						</>
					) }
				</>
			}

		</>
	);

	// Set the local inspector controls.
	const localInspectorControls = (
		<InspectorControls>
			{ settingsInspectorControls }
			<>
				<SidebarImageInspectorControl attributes={ attributes } setAttributes={ setAttributes } globalstyle={ attributes.globalStyle } { ...props } />
			</>
		</InspectorControls>
	);

	// Set the advanced inspector controls.
	const advancedInspectorControls = ( <SidebarImageAdvancedInspectorControl attributes={ attributes } setAttributes={ setAttributes } /> );

	const localToolbar = (
		<>
			<BlockControls>
				{
					! hasGlobalStyle( attributes.globalStyle ) && (
						<AlignmentToolbar { ...props } />
					)
				}
				<ToolbarGroup>
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
				<Popover
					placement="top-start"
					anchor={ mediaLinkRef }
					onClose={ () => {
						setMediaLinkPopover( false );
					} }
				>
					<div className="dlx-photo-block__a11y-popover">
						<h3>{ __( 'Select a Link Source', 'photo-block' ) }</h3>
						<SelectControl
							label={ __( 'Link To', 'photo-block' ) }
							value={ dataMediaLinkSource }
							onChange={ ( value ) => {
								setAttributes( { dataMediaLinkSource: value } );
							} }
						>
							<option value="none">{ __( 'None', 'photo-block' ) }</option>
							<optgroup label={ __( 'Media', 'photo-block' ) }>
								<option value="imageData">{ __( 'Image File', 'photo-block' ) }</option>
								<option value="imageAttachmentPage">{ __( 'Image Attachment Page', 'photo-block' ) }</option>
							</optgroup>
							<optgroup label={ __( 'Post', 'photo-block' ) }>
								<option value="postPermalink">{ __( 'Post Permalink', 'photo-block' ) }</option>
							</optgroup>
						</SelectControl>
						{ 'imageData' === dataMediaLinkSource && (
							<>
								<PanelBody
									title={ __( 'Lightbox', 'photo-block' ) }
									initialOpen={ false }
								>
									<PanelRow>
										<ToggleControl
											label={ __( 'Enable lightbox', 'photo-block' ) }
											checked={ lightboxEnabled }
											onChange={ ( value ) => {
												setAttributes( { lightboxEnabled: value } );
											} }
											help={ __( 'Popup the full size photo in a lightbox when clicked.', 'photo-block' ) }
										/>
									</PanelRow>
									{ lightboxEnabled && (
										<>
											<PanelRow>
												<ToggleControl
													label={ __( 'Show caption in Lightbox', 'photo-block' ) }
													checked={ lightboxShowCaption }
													onChange={ ( value ) => {
														setAttributes( { lightboxShowCaption: value } );
													} }
												/>
											</PanelRow>
										</>
									) }
								</PanelBody>
							</>
						) }
						{ 'none' !== dataMediaLinkSource && (
							<PanelBody
								title={ __( 'Advanced', 'photo-block' ) }
								initialOpen={ false }
							>
								<PanelRow>
									<ToggleControl
										label={ __( 'Open in new tab', 'photo-block' ) }
										checked={ dataMediaLinkNewTab }
										onChange={ ( value ) => {
											if ( '' === attributes.dataMediaLinkRel && value ) {
												setAttributes( { dataMediaLinkRel: 'noopener noreferrer' } );
											}
											if ( 'noopener noreferrer' === attributes.dataMediaLinkRel && ! value ) {
												setAttributes( { dataMediaLinkRel: '' } );
											}
											setAttributes( { dataMediaLinkNewTab: value } );
										} }
									/>
								</PanelRow>
								<PanelRow>
									<TextControl
										label={ __( 'Link Rel', 'photo-block' ) }
										value={ attributes.dataMediaLinkRel }
										onChange={ ( value ) => {
											setAttributes( { dataMediaLinkRel: value } );
										} }
										help={ __( 'The link rel attribute is for SEO and accessibility purposes. It is used to describe the relationship between the current document and the linked document.', 'photo-block' ) }

									/>
								</PanelRow>
								<PanelRow>
									<TextControl
										label={ __( 'Link Class', 'photo-block' ) }
										value={ attributes.dataMediaLinkClass }
										onChange={ ( value ) => {
											setAttributes( { dataMediaLinkClass: value } );
										} }
										help={ __( 'Add a CSS class to the link for styling purposes.', 'photo-block' ) }

									/>
								</PanelRow>
							</PanelBody>
						) }
					</div>
				</Popover>
			) }
		</>
	);

	const styles = `
		#${ uniqueId } .dlx-photo-block__screen-edit-image {
			background: ${ photoBackgroundColor };
		}
		#${ uniqueId } img {
			opacity: ${ photoOpacity };
			${ photoBlur ? `filter: blur(${ photoBlur }px);` : '' }
		}
	`;
	const imageStyles = getStyles( attributes, deviceType, uniqueId );
	return (
		<>
			{ localInspectorControls }
			{
				! hasGlobalStyle( attributes.globalStyle ) && (
					<>
						<InspectorAdvancedControls>
							{ advancedInspectorControls }
						</InspectorAdvancedControls>
						{ localToolbar }
					</>
				)
			}
			<style>{ styles }{ imageStyles }</style>
			<div className="dlx-photo-block__screen-edit">
				<figure className="dlx-photo-block__screen-edit-image-wrapper dlx-photo-block__figure">
					{ ( 'top' === captionPosition && ! imageLoading ) && (
						<div
							className="dlx-photo-block__screen-edit-caption dlx-photo-block__caption"
							{ ...innerBlockProps }
						/>
					) }
					<div className="dlx-photo-block__screen-edit-image dlx-photo-block__image-wrapper">
						{
							imageLoading && (
								<div
									className="dlx-photo-block__screen-edit-spinner"
									style={ {
										width: '100%',
										height: '100%',
										minWidth: '250px',
										minHeight: '250px',
										maxWidth: '100%',
										maxHeight: '100%',
									} }
								>
									<div className="dlx-photo-block__screen-edit-spinner__logo">
										<PhotoBlockIcon />
									</div>
									<h3 className="dlx-photo-block__screen-edit-spinner__label">
										{ __( 'Loading Featured Image…', 'photo-block' ) }
									</h3>
									<div className="dlx-photo-block__screen-edit-spinner__spinner">
										<Spinner />
									</div>
								</div>
							)
						}
						<div className="dlx-photo-block__screen-edit-image-inner">
							{
								( ! imageLoading && hasImage && typeof dataImages[ postId ] !== 'undefined' ) && (
									<img
										src={ dataImages[ postId ].url }
										className={ classnames( `photo-block-${ cssGramFilter }`, {
											'has-css-gram': cssGramFilter !== 'none',
										} ) }
										width={ dataImages[ postId ].width }
										height={ dataImages[ postId ].height }
										alt=""
									/>
								)
							}
							{ ( 'overlay' === captionPosition && ! imageLoading && hasImage ) && (
								<div
									className="dlx-photo-block__screen-edit-caption dlx-photo-block__caption dlx-photo-block__caption--overlay"
									{ ...innerBlockProps }
								/>
							) }
						</div>
						{
							( ! imageLoading && ( ! hasImage || typeof dataImages[ postId ] === 'undefined' ) ) && (
								<>
									Image not found.
								</>
							)
						}
					</div>
					{ ( 'bottom' === captionPosition && ! imageLoading ) && (
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

export default FeaturedImageScreen;
