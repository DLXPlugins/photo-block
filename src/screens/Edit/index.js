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
import { InspectorControls, BlockControls, InspectorAdvancedControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import {
	Crop,
	Image,
	Accessibility,
	Link,
	Settings,
	Paintbrush,
	Undo2,
	Stars,
} from 'lucide-react';
import classnames from 'classnames';
import hexToRgba from 'hex-to-rgba';

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
import CustomAttributesControl from '../../components/CustomAttributes';
import { buildDimensionsCSS, getValueWithUnit, buildBorderCSS } from '../../utils/TypographyHelper';

/**
 * Height units.
 */
const heightUnits = [ 'px', 'em', 'rem', '%', 'vh' ];

const EditScreen = forwardRef( ( props, ref ) => {
	const { attributes, setAttributes, innerBlockProps } = props;
	const {
		uniqueId,
		photo,
		imageSize,
		imageDimensions,
		imageSizePercentage,
		photoOpacity,
		photoBlur,
		photoObjectFit,
		photoObjectPosition,
		photoObjectPositionCustom,
		photoDropShadow,
		photoBackgroundColor,
		cssGramFilter,
		photoMaximumWidth,
		containerWidth,
		containerHeight,
		containerMaxWidth,
		containerMaxHeight,
		containerMinWidth,
		containerMinHeight,
		photoPaddingSize,
		photoMarginSize,
		photoBorderRadius,
		photoBorder,
	} = attributes;
	const { url, id, width, height } = photo;
	const [ imageLoading, setImageLoading ] = useState( true );
	const [ a11yButton, setA11yButton ] = useState( null );
	const [ a11yPopover, setA11yPopover ] = useState( null );
	const [ inspectorTab, setInspectorTab ] = useState( 'settings' ); // Can be settings|styles.
	const [ imageSizeLoading, setImageSizeLoading ] = useState( false );
	const [ mediaLinkPopover, setMediaLinkPopover ] = useState( false );
	const [ mediaLinkRef, setMediaLinkRef ] = useState( null );

	const { screen, setScreen, captionPosition, setImageFile, imageFile, originalImageFile } = useContext( UploaderContext );

	const [ deviceType, setDeviceType ] = useDeviceType( 'Desktop' );

	// Setup useEffect to update image dimensions if empty.
	useEffect( () => {
		if ( ! imageDimensions.width || ! imageDimensions.height ) {
			setAttributes( {
				imageDimensions: {
					...photo,
				},
			} );
		}
		if ( photo.url ) {
			setImageFile( photo );
		}
	}, [] );

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
				setAttributes( {
					imageDimensions: { ...imageDimensions, ...response.data },
				} );
				setAttributes( { imageSizePercentage: '100' } );
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
					/>
				</PanelRow>
				<PanelRow className="dlx-photo-block__image-dimensions-row">
					<h3>{ __( 'Image Dimensions', 'photo-block' ) }</h3>
					{ imageSizeLoading && <Spinner /> }
					{ ! imageSizeLoading && (
						<>
							<div className="dlx-photo-block__image-dimensions">
								<TextControl
									label={ __( 'Width', 'photo-block' ) }
									value={ imageDimensions.width ? imageDimensions.width : width }
									onChange={ ( newWidth ) => {
										// Get new height based on new width.
										const calcHeight = calculateHeight(
											photo.width,
											photo.height,
											newWidth
										);
										const newDimensions = {
											width: newWidth,
											height: calcHeight,
										};
										setAttributes( {
											imageDimensions: { ...imageDimensions, ...newDimensions },
										} );
									} }
									type="number"
								/>
								<TextControl
									label={ __( 'Height', 'photo-block' ) }
									value={
										imageDimensions.height ? imageDimensions.height : height
									}
									onChange={ ( newHeight ) => {
										const calcWidth = calculateWidth(
											photo.width,
											photo.height,
											newHeight
										);
										const newDimensions = {
											width: calcWidth,
											height: newHeight,
										};
										setAttributes( {
											imageDimensions: { ...imageDimensions, ...newDimensions },
										} );
									} }
									type="number"
								/>
							</div>
							<div className="dlx-photo-block__image-dimensions-buttons">
								<ButtonGroup className="dlx-photo-block__image-dimensions-buttons-group">
									<Button
										isSmall
										variant="secondary"
										className={ classnames(
											'dlx-photo-block__image-dimensions-buttons-group-button',
											{
												'is-pressed': imageSizePercentage === '25',
											}
										) }
										onClick={ () => {
											// Calc width/height based on percentage.
											const calcWidth = Math.round( photo.width * 0.25 );
											const calcHeight = Math.round( photo.height * 0.25 );
											setAttributes( {
												imageSizePercentage: '25',
												imageDimensions: {
													...imageDimensions,
													width: calcWidth,
													height: calcHeight,
												},
											} );
										} }
									>
										{ __( '25%', 'photo-block' ) }
									</Button>
									<Button
										isSmall
										className={ classnames(
											'dlx-photo-block__image-dimensions-buttons-group-button',
											{
												'is-pressed': imageSizePercentage === '50',
											}
										) }
										variant="secondary"
										onClick={ () => {
											// Calc width/height based on percentage.
											const calcWidth = Math.round( photo.width * 0.5 );
											const calcHeight = Math.round( photo.height * 0.5 );
											setAttributes( {
												imageSizePercentage: '50',
												imageDimensions: {
													...imageDimensions,
													width: calcWidth,
													height: calcHeight,
												},
											} );
										} }
									>
										{ __( '50%', 'photo-block' ) }
									</Button>
									<Button
										isSmall
										variant="secondary"
										className={ classnames(
											'dlx-photo-block__image-dimensions-buttons-group-button',
											{
												'is-pressed': imageSizePercentage === '75',
											}
										) }
										onClick={ () => {
											// Calc width/height based on percentage.
											const calcWidth = Math.round( photo.width * 0.75 );
											const calcHeight = Math.round( photo.height * 0.75 );
											setAttributes( {
												imageSizePercentage: '75',
												imageDimensions: {
													...imageDimensions,
													width: calcWidth,
													height: calcHeight,
												},
											} );
										} }
									>
										{ __( '75%', 'photo-block' ) }
									</Button>
									<Button
										isSmall
										variant="secondary"
										className={ classnames(
											'dlx-photo-block__image-dimensions-buttons-group-button',
											{
												'is-pressed': imageSizePercentage === '100',
											}
										) }
										onClick={ () => {
											// Calc width/height based on percentage.
											const calcWidth = Math.round( photo.width );
											const calcHeight = Math.round( photo.height );
											setAttributes( {
												imageSizePercentage: '100',
												imageDimensions: {
													...imageDimensions,
													width: calcWidth,
													height: calcHeight,
												},
											} );
										} }
									>
										{ __( '100%', 'photo-block' ) }
									</Button>
								</ButtonGroup>
							</div>
							<div className="dlx-photo-block__image-max-width">
								<SizeResponsiveControl
									label={ __( 'Image Max Width', 'photo-block' ) }
									values={ photoMaximumWidth }
									screenSize={ deviceType }
									onValuesChange={ ( newValues ) => {
										setAttributes( { photoMaximumWidth: newValues } );
									} }
								/>
							</div>
						</>
					) }
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

	const { imageCSSClasses, figureCSSClasses, htmlAnchor, hideOnMobile, hideOnTablet, hideOnDesktop } = attributes;
	const advancedInspectorControls = (
		<>
			<PanelRow>
				<TextControl
					label={ __( 'HTML Anchor', 'photo-block' ) }
					value={ htmlAnchor }
					onChange={ ( value ) => {
						setAttributes( { htmlAnchor: value } );
					} }
					help={ __( 'Enter a word or two — without spaces — to make a unique web address just for this photo, called an "anchor." Then, you\'ll be able to link directly to this photo on your page.', 'photo-block' ) }
				/>
			</PanelRow>
			<PanelRow>
				<TextControl
					label={ __( 'Figure CSS Class(es)', 'photo-block' ) }
					value={ figureCSSClasses }
					onChange={ ( value ) => {
						setAttributes( { figureCSSClasses: value } );
					} }
					help={ __( 'Add CSS class(es) directly to the figure tag, which wraps the image.', 'photo-block' ) }
				/>
			</PanelRow>
			<PanelRow>
				<TextControl
					label={ __( 'Image CSS Class(es)', 'photo-block' ) }
					value={ imageCSSClasses }
					onChange={ ( value ) => {
						setAttributes( { imageCSSClasses: value } );
					} }
					help={ __( 'Add CSS class(es) directly to the image tag.', 'photo-block' ) }
				/>
			</PanelRow>
			<PanelRow>
				<CustomAttributesControl
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
			</PanelRow>
			<PanelRow>
				<ToggleControl
					label={ __( 'Hide on Mobile', 'photo-block' ) }
					checked={ hideOnMobile }
					onChange={ ( value ) => {
						setAttributes( { hideOnMobile: value } );
					} }
					help={ __( 'Hide this photo on mobile devices.', 'photo-block' ) }
				/>
			</PanelRow>
			<PanelRow>
				<ToggleControl
					label={ __( 'Hide on Tablet', 'photo-block' ) }
					checked={ hideOnTablet }
					onChange={ ( value ) => {
						setAttributes( { hideOnTablet: value } );
					} }
					help={ __( 'Hide this photo on tablet devices.', 'photo-block' ) }
				/>
			</PanelRow>
			<PanelRow>
				<ToggleControl
					label={ __( 'Hide on Desktop', 'photo-block' ) }
					checked={ hideOnDesktop }
					onChange={ ( value ) => {
						setAttributes( { hideOnDesktop: value } );
					} }
					help={ __( 'Hide this photo on desktop devices.', 'photo-block' ) }
				/>
			</PanelRow>
		</>
	)

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
					>
						{ __( 'Crop', 'photo-block' ) }
					</ToolbarButton>
					<ToolbarButton
						icon={ <Stars /> }
						label={ __( 'Effects', 'photo-block' ) }
						onClick={ () => {
							setScreen( 'effects' );
						} }
					>
						{ __( 'Effects', 'photo-block' ) }
					</ToolbarButton>
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
									imageDimensions: {
										width: originalImageFile.width,
										height: originalImageFile.height,
									}
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

	let styles = `
		#${ uniqueId } .dlx-photo-block__image-wrapper {
			background: ${ photoBackgroundColor };
			${ getValueWithUnit( deviceType, containerWidth, 'width' ) }
			${ getValueWithUnit( deviceType, containerHeight, 'height' ) }
			${ getValueWithUnit( deviceType, containerMinWidth, 'min-width' ) }
			${ getValueWithUnit( deviceType, containerMinHeight, 'min-height' ) }
			${ getValueWithUnit( deviceType, containerMaxWidth, 'max-width' ) }
			${ getValueWithUnit( deviceType, containerMaxHeight, 'max-height' ) }
		}
		#${ uniqueId } img {
			opacity: ${ photoOpacity };
			${ photoBlur ? `filter: blur(${ photoBlur }px);` : '' }
			object-fit: ${ photoObjectFit };
			${ 'none' !== photoObjectFit ? 'height: 100%; width: 100%;' : '' }
			${ ( 'none' !== photoObjectFit && 'custom' !== photoObjectPosition ) ? 'object-position:' + photoObjectPosition + ';' : '' }
			${ ( 'none' !== photoObjectFit && 'custom' === photoObjectPosition && '' !== photoObjectPositionCustom ) ? 'object-position:' + photoObjectPositionCustom + ';' : '' }
			padding: ${ buildDimensionsCSS( photoPaddingSize, deviceType ) };
			margin: ${ buildDimensionsCSS( photoMarginSize, deviceType ) };
			border-radius: ${ buildDimensionsCSS( photoBorderRadius, deviceType ) };
			${ buildBorderCSS( photoBorder, deviceType ) }
		}
	`;
	if ( photoDropShadow.enabled ) {
		styles += `
			#${ uniqueId } img {
				box-sizing: border-box;
				box-shadow: ${ photoDropShadow.inset ? 'inset ' : '' }${
	photoDropShadow.horizontal
}px ${ photoDropShadow.vertical }px ${ photoDropShadow.blur }px ${
	photoDropShadow.spread
}px ${ photoDropShadow.color };
				-webkit-box-shadow: ${ photoDropShadow.inset ? 'inset ' : '' }${
	photoDropShadow.horizontal
}px ${ photoDropShadow.vertical }px ${ photoDropShadow.blur }px ${
	photoDropShadow.spread
}px ${ photoDropShadow.color };
			}
		`;
	}

	return (
		<>
			{ localInspectorControls }
			{ localToolbar }
			{ <InspectorAdvancedControls>{ advancedInspectorControls }</InspectorAdvancedControls> }
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
							className={ classnames( `photo-block-${ cssGramFilter } dlx-photo-block__image`, {
								'has-css-gram': cssGramFilter !== 'none',
							} ) }
							width={ imageDimensions.width }
							height={ imageDimensions.height }
							alt=""
							onLoad={ () => {
								setImageLoading( false );
							} }
							ref={ ref }
						/>
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
