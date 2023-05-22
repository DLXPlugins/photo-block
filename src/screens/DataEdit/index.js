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
	TabPanel,
	TextControl,
	TextareaControl,
	PanelRow,
	PanelBody,
	SelectControl,
	ButtonGroup,
	RangeControl,
	Button,
} from '@wordpress/components';
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import { __, sprintf } from '@wordpress/i18n';
import {
	Crop,
	Image,
	Accessibility,
	Link,
	Settings,
	Paintbrush,
	Shrink,
	CaseSensitive,
	Database,
	FileKey,
	Link2,
	FileText,
	File,
} from 'lucide-react';
import classnames from 'classnames';
import hexToRgba from 'hex-to-rgba';
import PropTypes from 'prop-types';

import UploaderContext from '../../contexts/UploaderContext';
import SendCommand from '../../utils/SendCommand';
import MediaLink from '../../components/MediaLink';
import ColorPickerControl from '../../components/ColorPicker';
import DropShadowControl from '../../components/DropShadow';
import CSSGramButtonGroup from '../../components/CSSGramButtonGroup';
import SizeResponsiveControl from '../../components/SizeResponsive';
import useDeviceType from '../../hooks/useDeviceType';
import DimensionsResponsiveControl from '../../components/DimensionsResponsive';
import BorderResponsiveControl from '../../components/BorderResponsive';
import PanelBodyControl from '../../components/PanelBody';
import SidebarImageInspectorControl from '../../components/SidebarImageInspectorControl';
import AdvancedSelectControl from '../../components/AdvancedSelect';
import { DataSelect, MetaFieldControl } from '../../components/DataSelect';

/**
 * Height units.
 */
const heightUnits = [ 'px', 'em', 'rem', '%', 'vh' ];

/**
 * Image size.
 */
const imageSizeOptions = [];
for ( const key in photoBlock.imageSizes ) {
	const size = photoBlock.imageSizes[ key ];
	imageSizeOptions.push( { value: key, label: size.label } );
}

const DataEditScreen = forwardRef( ( props, ref ) => {
	const { attributes, setAttributes, innerBlockProps, context } = props;

	const [ inspectorTab, setInspectorTab ] = useState( 'settings' ); // Can be settings|styles.
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
		dataMediaLinkTitle,
		imageSize,
		photoOpacity,
		photoBlur,
		photoDropShadow,
		photoBackgroundColor,
		cssGramFilter,
	} = attributes;

	const { screen, setScreen, captionPosition, inQueryLoop } = useContext( UploaderContext );

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
	 * Set up effect for loading the image initially using data.
	 */
	useEffect( () => {
		setImageLoading( true );
		SendCommand(
			photoBlock.restNonce,
			{
				dataSource,
				dataCurrentPostId: getPostId(),
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
					return;
				}

				// If object, set preview image.
				if ( data.url ) {
					setHasImage( true );
					setPreviewImage( data );
				}
			} )
			.catch( ( error ) => {
				// todo: error checking/display.
			} )
			.then( () => {
				setImageLoading( false );
			} );
	}, [ imageSize ] );

	// Set settings inspector Controls.
	const settingsInspectorControls = (
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
							setAttributes( { imageSize: size } );

							// Also set fallback image size.
							setAttributes( { dataFallbackImageSize: size } );
						} }
						options={ imageSizeOptions }
					/>
				</PanelRow>
			</PanelBodyControl>
		</>
	);

	const interfaceTabs = (
		<TabPanel
			className="dlx-photo-block__inspector-tabs"
			activeClass="active-tab"
			onSelect={ ( tab ) => {
				setInspectorTab( tab );
			} }
			children={ () => <></> }
			tabs={ [
				{
					name: 'settings',
					title: __( 'Settings', 'photo-block' ),
					className: 'dlx-photo-block__inspector-tab',
					icon: <Settings />,
				},
				{
					name: 'styles',
					title: __( 'Styles', 'photo-block' ),
					className: 'dlx-photo-block__inspector-tab',
					icon: <Paintbrush />,
				},
			] }
		>
			{ ( tab ) => {
				switch ( tab.name ) {
					case 'settings':
						return settingsInspectorControls;
					case 'styles':
						return ( <SidebarImageInspectorControl attributes={ attributes } setAttributes={ setAttributes } /> );
				}
			} }
		</TabPanel>
	);

	// Set the local inspector controls.
	const localInspectorControls = (
		<InspectorControls>{ interfaceTabs }</InspectorControls>
	);

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
					onClose={ () => {
						setMediaLinkPopover( false );
					} }
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
								<option value="postMeta">{ __( 'Post Meta', 'photo-block' ) }</option>
							</optgroup>
							<optgroup label={ __( 'Author', 'photo-block' ) }>
								<option value="authorPermalink">{ __( 'Author Permalink', 'photo-block' ) }</option>
								<option value="authorArchive">{ __( 'Author Archive', 'photo-block' ) }</option>
								<option value="authorMeta">{ __( 'Author Meta', 'photo-block' ) }</option>
							</optgroup>
						</SelectControl>
						{ dataMediaLinkSource === 'postMeta' && (
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
										label={ __( 'Link Title', 'photo-block' ) }
										value={ dataMediaLinkTitle }
										onChange={ ( value ) => {
											setAttributes( { dataMediaLinkTitle: value } );
										} }
										help={ __( 'The link title attribute is for SEO and accessibility purposes. It is used to describe the link.', 'photo-block' ) }
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
								<PanelRow>
									<TextControl
										label={ __( 'Link Anchor ID', 'photo-block' ) }
										value={ attributes.dataMediaLinkAnchorId }
										onChange={ ( value ) => {
											setAttributes( { dataMediaLinkAnchorId: value } );
										} }
										help={ __( 'This is the ID for the link, which you can use to link to the photo with an anchor. The ID for each link should be unique.', 'photo-block' ) }

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
					onClose={ () => {
						setA11yPopover( false );
					} }
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
					onClose={ () => {
						setTitlePopover( false );
					} }
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

	return (
		<>
			{ localInspectorControls }
			{ localToolbar }
			<style>{ styles }</style>
			<div className="dlx-photo-block__screen-edit">
				<figure className="dlx-photo-block__screen-edit-image-wrapper">
					{ 'top' === captionPosition && (
						<figcaption
							className="dlx-photo-block__screen-edit-caption"
							{ ...innerBlockProps }
						/>
					) }
					<div className="dlx-photo-block__screen-edit-image">
						{
							imageLoading && (
								<Spinner />
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
						{
							( ! imageLoading && ! hasImage ) && (
								<>
									Image not found.
								</>
							)
						}
					</div>
					{ 'bottom' === captionPosition && (
						<figcaption
							className="dlx-photo-block__screen-edit-caption"
							{ ...innerBlockProps }
						/>
					) }
				</figure>
			</div>
		</>
	);
} );

export default DataEditScreen;
