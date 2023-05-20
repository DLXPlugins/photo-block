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
import DataSelect from '../../components/DataSelect';

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

const MetaFieldControl = ( props ) => {
	const { setAttributes, attributeName, endpoint, params, label, placeholder, currentSuggestion, acceptDirectInput } = props;

	const [ currentMetaFieldSuggestion, setCurrentMetaFieldSuggestion ] = useState( currentSuggestion );

	return (
		<>
			<AdvancedSelectControl
				restNonce={ photoBlock.restNonce }
				restEndpoint={ photoBlock.restUrl + endpoint } /* '/search/types' */
				itemIcon={ <Link2 /> }
				params={ params }
				savedValue={ '' }
				placeholder={ placeholder }
				label={ label }
				currentSelectedSuggestion={ currentMetaFieldSuggestion }
				onItemSelect={ ( event, suggestionValue ) => {
					if ( null === suggestionValue ) {
						setAttributes( {
							[ attributeName ]: '',
						} );
					}
				} }
				acceptDirectInput={ acceptDirectInput }
			>
				{ ( showSuggestions, suggestions, selectedSuggestion ) => {
					if ( showSuggestions && suggestions.length > 0 ) {
						// Render the suggestions as button items.
						return (
							<div className="dlx-photo-block__post-suggestions">
								{ suggestions.map( ( suggestion, index ) => {
									const isSelected = selectedSuggestion === index;
									const suggestionClasses = classnames(
										'photo-block__post-suggestion',
										{
											'is-selected': isSelected,
										}
									);
									return (
										<Button
											key={ index }
											value={ suggestion }
											role="option"
											aria-selected={ suggestion === selectedSuggestion }
											className={ suggestionClasses }
											onClick={ ( e ) => {
												setCurrentMetaFieldSuggestion( suggestion );
												setAttributes( {
													[ attributeName ]: suggestion,
												} );
											} }
											icon={ <FileKey /> }
											iconSize={ 2 }
											iconPosition="left"
										>
											<span className="photo-block-search-item">
												<span className="photo-block-search-item-title no-margin">
													{ suggestion }
												</span>
											</span>
										</Button>
									);
								} ) }
							</div>
						);
					}
					return <></>;
				} }
			</AdvancedSelectControl>
		</>
	);
};

const DataEditScreen = forwardRef( ( props, ref ) => {
	const { attributes, setAttributes, innerBlockProps, context } = props;

	const [ inspectorTab, setInspectorTab ] = useState( 'settings' ); // Can be settings|styles.
	const [ a11yButton, setA11yButton ] = useState( null );
	const [ a11yPopover, setA11yPopover ] = useState( null );
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
		dataPostTitle,
		dataPostId,
		dataFallbackImage,
		dataHasFallbackImage,
		dataFallbackImageSize,
		dataScreen, /* can be `data` or `data-edit` */
		imageSize,
		imageDimensions,
		imageSizePercentage,
		photoOpacity,
		photoBlur,
		photoObjectFit,
		photoDropShadow,
		photoBackgroundColor,
		cssGramFilter,
		dataAltTextSource, /* can be none|currentImage|currentPost */
		dataAltTextTypeImage, /* can be altText, caption, imageTitle, customField */
		dataAltTextImageCustomField,
		dataAltTextTypePost, /* can be title, postAuthorName, postExcerpt, customField */
		dataAltTextPostTypeCustomField,
		dataAltTextTypePostCustomField,
		dataAltTextTypePostAuthorMeta,
		dataAltTextPostTypeAuthorMeta,
		dataAltTextPostType,
		dataAltTextPostId,
		dataAltTextPostTypeSource, /* can be title, postAuthorName, postExcerpt, customField */
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
							setMediaLinkPopover( ! mediaLinkPopover );
						} }
						ref={ setMediaLinkRef }
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
						<DataSelect
							attributes={ attributes }
							setAttributes={ setAttributes }
							title={ __( 'Alt Text', 'photo-block' ) }
							context={ context }
							prefix="dataAltText"
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

MetaFieldControl.propTypes = {
	setAttributes: PropTypes.func.isRequired,
	label: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	acceptDirectInput: PropTypes.bool,
	attributeName: PropTypes.string.isRequired,
	endpoint: PropTypes.string,
};

MetaFieldControl.defaultProps = {
	label: __( 'Select a Custom Field', 'photo-block' ),
	placeholder: __( 'Search by ID or title', 'photo-block' ),
	acceptDirectInput: true,
	endpoint: '/search/custom-fields',
};
export default DataEditScreen;
