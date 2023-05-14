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
import { __ } from '@wordpress/i18n';
import {
	Crop,
	Image,
	Accessibility,
	Link,
	Settings,
	Paintbrush,
	Shrink,
	Stars,
	Palette,
	Wand2,
	Maximize,
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

	const { screen, setScreen } = useContext( UploaderContext );

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

	const stylesInspectorControls = (
		<>
			<PanelBodyControl
				title={ __( 'Image Styles', 'photo-block' ) }
				icon={ <Palette /> }
				className="photo-block__inspector-panel"
				id="photo-block__photo-image-styles"
				uniqueId={ uniqueId }
				initialOpen={ true }
				scrollAfterOpen={ false }
			>
				<ColorPickerControl
					value={ photoBackgroundColor }
					key={ 'background-color-photo' }
					onChange={ ( slug, newValue ) => {
						setAttributes( { photoBackgroundColor: newValue } );
					} }
					label={ __( 'Background Color', 'highlight-and-share' ) }
					defaultColors={ photoBlock.palette }
					defaultColor={ '#FFFFFF' }
					slug={ 'background-color-photo' }
				/>
				<RangeControl
					label={ __( 'Opacity', 'photo-block' ) }
					value={ photoOpacity }
					onChange={ ( newOpacity ) => {
						setAttributes( { photoOpacity: newOpacity } );
					} }
					min={ 0 }
					max={ 1 }
					step={ 0.01 }
				/>
				<RangeControl
					label={ __( 'Blur', 'photo-block' ) }
					value={ photoBlur }
					onChange={ ( newBlur ) => {
						setAttributes( { photoBlur: newBlur } );
					} }
					min={ 0 }
					max={ 10 }
					step={ 0.01 }
				/>
				<ToggleControl
					label={ __( 'Enable Dropshadow', 'photo-block' ) }
					checked={ photoDropShadow.enabled }
					onChange={ ( newDropShadowEnabled ) => {
						setAttributes( {
							photoDropShadow: {
								...photoDropShadow,
								enabled: newDropShadowEnabled,
							},
						} );
					} }
				/>
				{ photoDropShadow.enabled && (
					<DropShadowControl
						label={ __( 'Drop Shadow', 'photo-block' ) }
						attributes={ attributes }
						setAttributes={ setAttributes }
					/>
				) }
			</PanelBodyControl>
			<PanelBodyControl
				title={ __( 'CSS Styles', 'photo-block' ) }
				className="photo-block__inspector-panel"
				icon={ <Wand2 /> }
				id="photo-block__photo-css-gram"
				uniqueId={ uniqueId }
				initialOpen={ false }
				scrollAfterOpen={ false }
			>
				<CSSGramButtonGroup
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
			</PanelBodyControl>
			<PanelBodyControl
				title={ __( 'Padding, Margin, and Border', 'photo-block' ) }
				initialOpen={ false }
				icon={ <Maximize /> }
				className="photo-block__inspector-panel"
				id="photo-block__photo-dimensions-styles"
				uniqueId={ uniqueId }
				scrollAfterOpen={ false }
			>
				<DimensionsResponsiveControl
					label={ __( 'Photo Padding', 'photo-block' ) }
					values={ photoPaddingSize }
					onValuesChange={ ( values ) => {
						setAttributes( { photoPaddingSize: values } );
					} }
					labelTop={ __( 'Top Padding', 'photo-block' ) }
					labelRight={ __( 'Right Padding', 'photo-block' ) }
					labelBottom={ __( 'Bottom Padding', 'photo-block' ) }
					labelLeft={ __( 'Left Padding', 'photo-block' ) }
					labelAll={ __( 'Change Padding', 'photo-block' ) }
				/>
				<DimensionsResponsiveControl
					label={ __( 'Photo Margin', 'photo-block' ) }
					values={ photoMarginSize }
					onValuesChange={ ( values ) => {
						setAttributes( { photoMarginSize: values } );
					} }
					labelTop={ __( 'Top Margin', 'photo-block' ) }
					labelRight={ __( 'Right Margin', 'photo-block' ) }
					labelBottom={ __( 'Bottom Margin', 'photo-block' ) }
					labelLeft={ __( 'Left Margin', 'photo-block' ) }
					labelAll={ __( 'Change Margin', 'photo-block' ) }
					allowNegatives={ true }
				/>
				<BorderResponsiveControl
					label={ __( 'Photo Border', 'photo-block' ) }
					values={ photoBorder }
					onValuesChange={ ( values ) => {
						setAttributes( { photoBorder: values } );
					} }
					labelTop={ __( 'Top Border', 'photo-block' ) }
					labelRight={ __( 'Right Border', 'photo-block' ) }
					labelBottom={ __( 'Bottom Border', 'photo-block' ) }
					labelLeft={ __( 'Left Border', 'photo-block' ) }
					labelAll={ __( 'Change Border', 'photo-block' ) }
				/>
				<DimensionsResponsiveControl
					label={ __( 'Photo Border Radius', 'photo-block' ) }
					values={ photoBorderRadius }
					onValuesChange={ ( values ) => {
						setAttributes( { photoBorderRadius: values } );
					} }
					labelTop={ __( 'Top-left Radius', 'photo-block' ) }
					labelRight={ __( 'Top-right Radius', 'photo-block' ) }
					labelBottom={ __( 'Bottom-right Radius', 'photo-block' ) }
					labelLeft={ __( 'Bottom-left Radius', 'photo-block' ) }
					labelAll={ __( 'Change Border Radius', 'photo-block' ) }
					isBorderRadius={ true }
				/>

			</PanelBodyControl>
			<PanelBodyControl
				title={ __( 'Container Sizing', 'photo-block' ) }
				initialOpen={ false }
				icon={ <Shrink /> }
				className="photo-block__inspector-panel"
				id="photo-block__photo-container-styles"
				uniqueId={ uniqueId }
				scrollAfterOpen={ false }
			>
				<PanelRow>
					<SelectControl
						label={ __( 'Object Fit', 'photo-block' ) }
						value={ photoObjectFit }
						options={ [
							{ label: __( 'None', 'photo-block' ), value: 'none' },
							{ label: __( 'Inherit', 'photo-block' ), value: 'inherit' },
							{ label: __( 'Fill', 'photo-block' ), value: 'fill' },
							{ label: __( 'Contain', 'photo-block' ), value: 'contain' },
							{ label: __( 'Cover', 'photo-block' ), value: 'cover' },
							{ label: __( 'Scale Down', 'photo-block' ), value: 'scale-down' },
						] }
						onChange={ ( newObjectFit ) => {
							setAttributes( { photoObjectFit: newObjectFit } );
						} }
						help={ __(
							'How the image should be resized to fit its container.',
							'photo-block'
						) }
					/>
				</PanelRow>
				<div className="dlx-photo-block__container-width">
					<SizeResponsiveControl
						label={ __( 'Width', 'photo-block' ) }
						values={ containerWidth }
						screenSize={ deviceType }
						onValuesChange={ ( newValues ) => {
							setAttributes( { containerWidth: newValues } );
						} }
					/>
				</div>
				<div className="dlx-photo-block__container-height">
					<SizeResponsiveControl
						label={ __( 'Height', 'photo-block' ) }
						values={ containerHeight }
						screenSize={ deviceType }
						units={ heightUnits }
						onValuesChange={ ( newValues ) => {
							setAttributes( { containerHeight: newValues } );
						} }
					/>
				</div>
				<div className="dlx-photo-block__container-min-width">
					<SizeResponsiveControl
						label={ __( 'Min Width', 'photo-block' ) }
						values={ containerMinWidth }
						screenSize={ deviceType }
						onValuesChange={ ( newValues ) => {
							setAttributes( { containerMinWidth: newValues } );
						} }
					/>
				</div>
				<div className="dlx-photo-block__container-min-height">
					<SizeResponsiveControl
						label={ __( 'Min Height', 'photo-block' ) }
						values={ containerMinHeight }
						screenSize={ deviceType }
						units={ heightUnits }
						onValuesChange={ ( newValues ) => {
							setAttributes( { containerMinHeight: newValues } );
						} }
					/>
				</div>
				<div className="dlx-photo-block__container-max-width">
					<SizeResponsiveControl
						label={ __( 'Max Width', 'photo-block' ) }
						values={ containerMaxWidth }
						screenSize={ deviceType }
						onValuesChange={ ( newValues ) => {
							setAttributes( { containerMaxWidth: newValues } );
						} }
					/>
				</div>
				<div className="dlx-photo-block__containermax-height">
					<SizeResponsiveControl
						label={ __( 'Max Height', 'photo-block' ) }
						values={ containerMaxHeight }
						screenSize={ deviceType }
						units={ heightUnits }
						onValuesChange={ ( newValues ) => {
							setAttributes( { containerMaxHeight: newValues } );
						} }
					/>
				</div>
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
						return stylesInspectorControls;
				}
			} }
		</TabPanel>
	);

	// Set the local inspector controls.
	const localInspectorControls = (
		<InspectorControls>{ interfaceTabs }</InspectorControls>
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
					>
						{ __( 'Crop', 'photo-block' ) }
					</ToolbarButton>
					<ToolbarButton
						icon={ <Stars /> }
						label={ __( 'Effects', 'photo-block' ) }
						onClick={ () => {
							// setScreen( 'initial' );
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
				<figure className="dlx-photo-block__screen-edit-image-wrapper">
					<div className="dlx-photo-block__screen-edit-image">
						<img
							src={ url }
							className={ classnames( `photo-block-${ cssGramFilter }`, {
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
					<figcaption
						className="dlx-photo-block__screen-edit-caption"
						{ ...innerBlockProps }
					/>
				</figure>
			</div>
		</>
	);
} );
export default EditScreen;
