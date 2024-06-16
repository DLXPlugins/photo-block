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
	Accessibility,
	Link,
	CaseSensitive,
	Database,
	Layers,
} from 'lucide-react';
import { useSelect, useDispatch } from '@wordpress/data';
import classnames from 'classnames';
import hexToRgba from 'hex-to-rgba';

import blockStore from '../../store';
import SendCommand from '../../utils/SendCommand';
import useDeviceType from '../../hooks/useDeviceType';
import PanelBodyControl from '../../components/PanelBody';
import SidebarImageInspectorControl from '../../components/SidebarImageInspectorControl';
import SidebarImageAdvancedInspectorControl from '../../components/SidebarImageAdvancedInspectorControl';
import { DataSelect, MetaFieldControl } from '../../components/DataSelect';
import CustomPresets from '../../components/CustomPresets';
import getStyles from '../../blocks/photo-block/block-styles';

/**
 * Image size.
 */
const imageSizeOptions = [];
for ( const key in photoBlock.imageSizes ) {
	const size = photoBlock.imageSizes[ key ];
	imageSizeOptions.push( { value: key, label: size.label } );
}

let dataImage = [];

const DataEditScreen = forwardRef( ( props, ref ) => {
	const { attributes, setAttributes, innerBlockProps, context, blockUniqueId } = props;
	const [ a11yButton, setA11yButton ] = useState( null );
	const [ a11yPopover, setA11yPopover ] = useState( null );
	const [ titleButton, setTitleButton ] = useState( null );
	const [ titlePopover, setTitlePopover ] = useState( null );
	const [ mediaLinkPopover, setMediaLinkPopover ] = useState( false );
	const [ mediaLinkRef, setMediaLinkRef ] = useState( null );
	const [ imageLoading, setImageLoading ] = useState( true );
	const [ hasImage, setHasImage ] = useState( false );
	const [ previewImage, setPreviewImage ] = useState( null );
	const {
		uniqueId,
		dataSource,
		dataImageSource,
		dataImageSourceCustomField,
		dataImageSourceAuthorMeta,
		dataPostType,
		dataPostId,
		dataFallbackImage,
		dataHasFallbackImage,
		dataFallbackImageSize,
		dataMediaLinkSource,
		dataMediaLinkPostMeta,
		dataMediaLinkImageCustomField,
		dataMediaLinkAuthorMeta,
		imageSize,
		imageData,
		photoOpacity,
		photoBlur,
		photoDropShadow,
		photoBackgroundColor,
		cssGramFilter,
		lightboxEnabled,
		lightboxShowCaption,
	} = attributes;

	const {
		setScreen,
		setImageData,
	} = useDispatch( blockStore( blockUniqueId ) );

	// Get current block data.
	const {
		captionPosition,
		inQueryLoop,
	} = useSelect( ( select ) => {
		return {
			captionPosition: select( blockStore( blockUniqueId ) ).getCaptionPosition(),
			inQueryLoop: select( blockStore( blockUniqueId ) ).inQueryLoop(),
		};
	} );

	// Get query loop vars.
	const { postId, postType } = context;

	const [ deviceType, setDeviceType ] = useDeviceType( 'Desktop' );

	/**
	 * Get a post ID either from the block or attribute.
	 *
	 * @return {number} The post ID.
	 */
	const getPostId = () => {
		let currentPostId = 0;
		// If data type is current post, get the current post ID.
		if ( 'currentPost' === dataSource ) {
			// Determine if we're in a query block.
			if ( inQueryLoop ) {
				currentPostId = postId;
			} else {
				currentPostId = wp.data.select( 'core/editor' ).getCurrentPostId();
			}
			return currentPostId;
		}
		// If data type is post type, get the post ID from the attribute.
		if ( 'postType' === dataSource && '' !== dataPostId ) {
			return dataPostId;
		}
		return currentPostId;
	};

	/**
	 * Set data image to empty array on mount in case someone changes data types.
	 */
	useEffect( () => {
		dataImage = [];
	}, [] );

	/**
	 * Set up effect for loading the image initially using data.
	 */
	useEffect( () => {
		const currentPostId = getPostId();

		// Check for array key in dataImage.
		if ( dataImage[ currentPostId ] ) {
			setPreviewImage( dataImage[ currentPostId ] );
			setHasImage( true );
			setImageLoading( false );
			return;
		}

		setImageLoading( true );
		SendCommand(
			photoBlock.restNonce,
			{
				dataSource,
				dataCurrentPostId: currentPostId,
				dataImageSize: imageSize,
				dataImageSource,
				dataImageSourceCustomField,
				dataPostType,
				dataPostId,
				dataFallbackImage,
				dataHasFallbackImage,
				dataFallbackImageSize,
				dataImageSourceAuthorMeta,
			},
			`${ photoBlock.restUrl + '/get-image-by-data' }`,
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

					// Image must be URL.
					setHasImage( true );
					setPreviewImage( data );
					setImageData( data );
					dataImage[ currentPostId ] = data;
					setAttributes( { imageData: data } );
					return;
				}

				// If object, set preview image.
				if ( data.url ) {
					setHasImage( true );
					setImageData( data );
					setPreviewImage( data );
					dataImage[ currentPostId ] = data;
					setAttributes( { imageData: data } );
				}
			} )
			.catch( ( error ) => {
				// todo: error checking/display.
			} )
			.then( () => {
				setImageLoading( false );
			} );
	}, [ imageSize, dataFallbackImage, dataFallbackImageSize, dataHasFallbackImage ] );

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
					<SelectControl
						label={ __( 'Image Size', 'photo-block' ) }
						value={ imageSize }
						onChange={ ( size ) => {
							setAttributes( { imageSize: size } );

							// Also set fallback image size.
							setAttributes( { dataFallbackImageSize: size } );
						} }
						options={ imageSizeOptions }
					/>
				</PanelRow>
			</PanelBodyControl>
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
	);

	// Set the local inspector controls.
	const localInspectorControls = (
		<InspectorControls>
			{ settingsInspectorControls }
			<SidebarImageInspectorControl attributes={ attributes } setAttributes={ setAttributes } blockUniqueId={ blockUniqueId } /> 
		</InspectorControls>
	);

	// Set the advanced inspector controls.
	const advancedInspectorControls = ( <SidebarImageAdvancedInspectorControl attributes={ attributes } setAttributes={ setAttributes } /> );

	/**
	 * Get a post type label.
	 *
	 * @param {string} postTypeValue The post type.
	 * @return {string} The post type label.
	 */
	const getPostTypeLabel = ( postTypeValue ) => {
		let postTypeLabel = '';
		photoBlock.postTypes.forEach( ( postTypeOption ) => {
			if ( postTypeOption.value === postTypeValue ) {
				postTypeLabel = postTypeOption?.singular ?? postTypeOption.label;
			}
		} );
		return postTypeLabel;
	};

	const localToolbar = (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon={ <Database /> }
						label={ __( 'Edit Data', 'photo-block' ) }
						onClick={ () => {
							setAttributes( { dataScreen: 'data' } );
							setScreen( 'data' );
						} }
					>
						{ __( 'Edit Data', 'photo-block' ) }
					</ToolbarButton>
				</ToolbarGroup>
				<ToolbarGroup>
					<ToolbarButton
						icon={ <Accessibility /> }
						label={ __( 'Set Alt Text Dynamic Data', 'photo-block' ) }
						onClick={ () => {
							setA11yPopover( ! a11yPopover );
						} }
						ref={ setA11yButton }
					/>
					<ToolbarButton
						icon={ <CaseSensitive /> }
						label={ __( 'Set Title Options', 'photo-block' ) }
						onClick={ () => {
							setTitlePopover( ! titlePopover );
						} }
						ref={ setTitleButton }
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
				<Popover
					placement="top-start"
					anchor={ mediaLinkRef }
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
								<option value="imageFile">{ __( 'Image File', 'photo-block' ) }</option>
								<option value="imageAttachmentPage">{ __( 'Image Attachment Page', 'photo-block' ) }</option>
								<option value="imageMeta">{ __( 'Image Meta', 'photo-block' ) }</option>
							</optgroup>
							<optgroup label={ __( 'Post', 'photo-block' ) }>
								<option value="postPermalink">{ __( 'Post Permalink', 'photo-block' ) }</option>
								<option value="customField">{ __( 'Post Meta', 'photo-block' ) }</option>
							</optgroup>
							<optgroup label={ __( 'Author', 'photo-block' ) }>
								<option value="authorPermalink">{ __( 'Author Permalink', 'photo-block' ) }</option>
								<option value="authorArchive">{ __( 'Author Archive', 'photo-block' ) }</option>
								<option value="authorMeta">{ __( 'Author Meta', 'photo-block' ) }</option>
							</optgroup>
						</SelectControl>
						{ dataMediaLinkSource === 'customField' && (
							<MetaFieldControl
								setAttributes={ setAttributes }
								attributeName={ 'dataMediaLinkPostMeta' }
								endpoint={ '/search/custom-fields' }
								params={ {
									postType: dataPostType,
									postId: getPostId(),
								} }
								label={ __( 'Select a custom field', 'photo-block' ) }
								placeholder={ __(
									'Search for or enter a custom field name',
									'photo-block'
								) }
								currentSuggestion={ dataMediaLinkPostMeta }
							/>
						) }
						{ dataMediaLinkSource === 'imageMeta' && (
							<MetaFieldControl
								setAttributes={ setAttributes }
								attributeName={ 'dataMediaLinkImageCustomField' }
								params={ {
									postType: 'attachment',
									postId: 0,
								} }
								currentSuggestion={ dataMediaLinkImageCustomField }
							/>
						) }
						{ dataMediaLinkSource === 'authorMeta' && (
							<MetaFieldControl
								setAttributes={ setAttributes }
								attributeName={ 'dataMediaLinkAuthorMeta' }
								endpoint={ '/search/author-meta' }
								params={ {
									postType: dataPostType,
									postId: getPostId(),
								} }
								label={ __( 'Select an author meta field', 'photo-block' ) }
								placeholder={ __(
									'Search for or enter an author meta field',
									'photo-block'
								) }
								currentSuggestion={ dataMediaLinkAuthorMeta }
							/>
						) }
						{ 'imageFile' === dataMediaLinkSource && (
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
													label={ __( 'Show caption', 'photo-block' ) }
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
										checked={ attributes.dataMediaLinkNewTab }
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
			{ a11yPopover && (
				<Popover
					placement="top-start"
					anchor={ a11yButton }
				>
					<div className="dlx-photo-block__a11y-popover">
						<DataSelect
							attributes={ attributes }
							setAttributes={ setAttributes }
							title={ __( 'Alt Text Data', 'photo-block' ) }
							context={ context }
							prefix="dataAltText"
						/>
					</div>
				</Popover>
			) }
			{ titlePopover && (
				<Popover
					placement="top-start"
					anchor={ titleButton }
				>
					<div className="dlx-photo-block__a11y-popover">
						<DataSelect
							attributes={ attributes }
							setAttributes={ setAttributes }
							title={ __( 'Image Title Data', 'photo-block' ) }
							context={ context }
							prefix="dataImageTitle"
						/>
					</div>
				</Popover>
			) }
		</>
	);

	let styles = `
		#${ uniqueId } .dlx-photo-block__screen-edit-image {
			background: ${ photoBackgroundColor };
		}
		#${ uniqueId } img {
			opacity: ${ photoOpacity };
			${ photoBlur ? `filter: blur(${ photoBlur }px);` : '' }
		}
	`;
	if ( photoDropShadow.enabled ) {
		styles += `
			#${ uniqueId } img {
				box-shadow: ${ photoDropShadow.inset ? 'inset ' : '' }${
	photoDropShadow.horizontal
}px ${ photoDropShadow.vertical }px ${ photoDropShadow.blur }px ${
	photoDropShadow.spread
}px ${ hexToRgba( photoDropShadow.color, photoDropShadow.opacity ) };
				-webkit-box-shadow: ${ photoDropShadow.inset ? 'inset ' : '' }${
	photoDropShadow.horizontal
}px ${ photoDropShadow.vertical }px ${ photoDropShadow.blur }px ${
	photoDropShadow.spread
}px ${ hexToRgba( photoDropShadow.color, photoDropShadow.opacity ) };
			}
		`;
	}
	const imageStyles = getStyles( attributes, deviceType, uniqueId );
	return (
		<>
			{ localInspectorControls }
			{ <InspectorAdvancedControls>{ advancedInspectorControls }</InspectorAdvancedControls> }
			{ localToolbar }
			<style>{ styles }{ imageStyles }</style>
			<div className="dlx-photo-block__screen-edit">
				<figure className="dlx-photo-block__screen-edit-image-wrapper dlx-photo-block__figure">
					{ 'top' === captionPosition && (
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
										minWidth: previewImage?.width ?? 500,
										minHeight: previewImage?.height ?? 500,
										maxWidth: '100%',
										maxHeight: '100%',
									} }
								>
									<Spinner />
								</div>
							)
						}
						{
							( ! imageLoading && hasImage && typeof previewImage.url !== 'undefined' ) && (
								<img
									src={ previewImage.url }
									className={ classnames( `photo-block-${ cssGramFilter }`, {
										'has-css-gram': cssGramFilter !== 'none',
									} ) }
									width={ previewImage.width }
									height={ previewImage.height }
									alt=""
								/>
							)
						}
						{
							( ! imageLoading && hasImage && typeof previewImage === 'string' ) && (
								<img
									src={ previewImage }
									className={ classnames( `photo-block-${ cssGramFilter }`, {
										'has-css-gram': cssGramFilter !== 'none',
									} ) }
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
						{
							( ! imageLoading && ! hasImage ) && (
								<>
									Image not found.
								</>
							)
						}
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

export default DataEditScreen;
