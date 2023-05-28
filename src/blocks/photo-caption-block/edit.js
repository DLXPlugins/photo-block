import './editor.scss';

import classnames from 'classnames';
import { useEffect, useState, useRef, useContext } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import {
	BaseControl,
	PanelBody,
	PanelRow,
	SelectControl,
	ButtonGroup,
	Button,
	ToggleControl,
	ToolbarButton,
	ToolbarGroup,
	Modal,
	Popover,
	TabPanel,
	MenuGroup,
	Spinner,
	RangeControl,
	MenuItem,
} from '@wordpress/components';

import {
	InspectorControls,
	InspectorAdvancedControls,
	RichText,
	useBlockProps,
	BlockControls,
	useInnerBlocksProps,
	InnerBlocks,
	store,
} from '@wordpress/block-editor';

import {
	useDispatch,
} from '@wordpress/data';

import {
	Trash2,
	SeparatorHorizontal,
	Check,
	Shrink,
	Database,
	FormInput,
	Maximize,
	Settings,
	Paintbrush,
	AlignLeft,
	AlignCenter,
	AlignRight,
	Shuffle,
} from 'lucide-react';

import { useInstanceId } from '@wordpress/compose';
const HtmlToReactParser = require( 'html-to-react' ).Parser;

import UploaderContext from '../../contexts/UploaderContext';
import DimensionsResponsiveControl from '../../components/DimensionsResponsive';
import BorderResponsiveControl from '../../components/BorderResponsive';
import SizeResponsiveControl from '../../components/SizeResponsive';
import useDeviceType from '../../hooks/useDeviceType';
import { DataSelect } from '../../components/DataSelect';
import SendCommand from '../../utils/SendCommand';
import TypographyControl from '../../components/Typography';
import ColorPickerControl from '../../components/ColorPicker';
import GradientPickerControl from '../../components/GradientPicker';
import getRandomGradient from '../../utils/GetRandomGradient';
import RangeResponsiveControl from '../../components/RangeResponsive';
import { getValueWithUnit, buildBorderCSS, buildDimensionsCSS, geHierarchicalPlaceholderValue, getHierarchicalValueUnit } from '../../utils/TypographyHelper';

/**
 * Height units.
 */
const heightUnits = [ 'px', 'em', 'rem', '%', 'vh' ];

const fontFamilies = [
	{
		name: 'Arial',
		family: 'Arial, sans-serif',
		slug: 'arial',
		fallback: 'sans-serif',
		type: 'web',
	},
	{
		name: 'Courier New',
		family: 'Courier New, monospace',
		slug: 'courier-new',
		fallback: 'monospace',
		type: 'web',
	},
	{
		name: 'Garamond',
		family: 'Garamond, serif',
		slug: 'garamond',
		fallback: 'serif',
		type: 'web',
	},
	{
		name: 'Georgia',
		family: 'Georgia, serif',
		slug: 'georgia',
		fallback: 'serif',
		type: 'web',
	},
	{
		name: 'Helvetica',
		family: 'Helvetica, sans-serif',
		slug: 'helvetica',
		fallback: 'sans-serif',
		type: 'web',
	},
	{
		name: 'Lucida Console',
		family: 'Lucida Console, monospace',
		slug: 'lucida-console',
		fallback: 'monospace',
		type: 'web',
	},
	{
		name: 'Tahoma',
		family: 'Tahoma, sans-serif',
		slug: 'tahoma',
		fallback: 'sans-serif',
		type: 'web',
	},
	{
		name: 'Times New Roman',
		family: 'Times New Roman, serif',
		slug: 'times-new-roman',
		fallback: 'serif',
		type: 'web',
	},
	{
		name: 'Trebuchet MS',
		family: 'Trebuchet MS, sans-serif',
		slug: 'trebuchet-ms',
		fallback: 'sans-serif',
		type: 'web',
	},
	{
		name: 'Verdana',
		family: 'Verdana, sans-serif',
		slug: 'verdana',
		fallback: 'sans-serif',
		type: 'web',
	},
];
const fontFamiliesSelect = fontFamilies.map( ( font ) => ( {
	label: font.name,
	value: font.family,
} ) );

const PhotoCaptionBlock = ( props ) => {
	const generatedUniqueId = useInstanceId( PhotoCaptionBlock, 'photo-caption-block' );
	// Read in context values.
	const {
		dataMode,
		imageFile,
		hasCaption,
		setHasCaption,
		captionPosition,
		setCaptionPosition,
		inQueryLoop,
	} = useContext( UploaderContext );

	const [ caption, setCaption ] = useState( '' ); // Only applicable if in data mode.
	const [ captionLoading, setCaptionLoading ] = useState( false ); // Only applicable if in data mode.
	const [ captionPositionPopoverVisible, setCaptionPositionPopoverVisible ] = useState( false );
	const [ captionPopoverRef, setCaptionPopoverRef ] = useState( null );
	const [ modePopoverRef, setModePopoverRef ] = useState( null );
	const [ modePopoverVisible, setModePopoverVisible ] = useState( false );
	const [ removeCaptionModalVisible, setRemoveCaptionModalVisible ] = useState( false ); // only applicable if in data mode.
	const [ dataModalVisible, setDataModalVisible ] = useState( false ); // only applicable if in data mode.
	const [ switchModeModalVisible, setSwitchModeModalVisible ] = useState( false ); // only applicable if in data mode.
	const [ inspectorTab, setInspectorTab ] = useState( 'settings' ); // Can be settings|styles.
	const [ isCaptionVisible, setIsCaptionVisible ] = useState( false ); // Make sure caption is positioned correctly before visible render.

	// Set caption position context based on captionPosition attribute. After setting, show the caption.
	useEffect( () => {
		setCaptionPosition( props.attributes.captionPosition ); // Caption position can be top|bottom|overlay
		setIsCaptionVisible( true );
	}, [ props.attributes.captionPosition ] );

	const { removeBlocks } = useDispatch( store );

	// Get device.
	const [ deviceType, setDeviceType ] = useDeviceType( 'Desktop' );

	const blockProps = useBlockProps( {
		className: classnames(
			`dlx-photo-caption-block`,
		),
	} );

	const { attributes, setAttributes, clientId, context } = props;

	// Get query loop vars.
	const { postId } = context;

	const {
		uniqueId,
		mode,
		captionManual,
		enableSmartStyles,
		captionBaseFontSize,
		captionBackgroundColor,
		captionBackgroundColorOpacity,
		captionTextColor,
		captionAccentColor,
		captionSecondaryColor,
		captionLinkColor,
		captionLinkHoverColor,
		captionAlign,
		captionPaddingSize,
		captionMarginSize,
		captionTextFontFamily,
		captionHeadingsFontFamily,
		captionTypography,
		captionBorder,
		captionBorderRadius,
		containerWidth,
		containerHeight,
		containerMaxWidth,
		containerMinWidth,
		containerMaxHeight,
		containerMinHeight,
		dataCaptionPostTitle,
		dataCaptionPostId,
		dataCaptionSource,
		dataCaptionType,
		dataCaptionImageCustomField,
		dataCaptionTypePostCustomField,
		dataCaptionPostType,
		dataCaptionPostTypeCustomField,
		dataCaptionTypePost,
		dataCaptionTypePostAuthorMeta,
		dataCaptionPostTypeSource,
		dataCaptionPostTypeAuthorMeta,
		overlayCaptionVerticalPosition,
		overlayCaptionHorizontalPosition,
		overlayBackgroundType,
		overlayBackgroundColor,
		overlayBackgroundColorOpacity,
		overlayBorder,
		overlayBorderRadius,
		overlayBackgroundGradient,
		overlayBackgroundGradientOpacity,
	} = attributes;

	const innerBlocksRef = useRef( null );
	const innerBlockProps = useInnerBlocksProps(
		{
			className: classnames( 'dlx-photo-caption-block__inner-blocks dlx-photo-block__caption', { 'has-smart-styles': ( 'advanced' === mode && ! dataMode && enableSmartStyles ) } ),
			ref: innerBlocksRef,
		},
		{
			allowedBlocks: photoBlock.captionInnerBlocks,
			template: [ [ 'core/paragraph', { align: 'center', placeholder: __( 'Enter your caption here.', 'photo-block' ) } ] ],
			templateInsertUpdatesSelection: true,
			templateLock: false,
			renderAppender: InnerBlocks.DefaultBlockAppender,
		}
	);
	/**
	 * Get a post ID either from the block or attribute.
	 *
	 * @return {number} The post ID.
	 */
	const getPostId = () => {
		let currentPostId = 0;
		// If data type is current post, get the current post ID.
		if ( 'currentPost' === dataCaptionSource ) {
			// Determine if we're in a query block.
			if ( inQueryLoop ) {
				currentPostId = postId;
			} else {
				currentPostId = wp.data.select( 'core/editor' ).getCurrentPostId();
			}
			return currentPostId;
		}
		// If data type is post type, get the post ID from the attribute.
		if ( 'postType' === dataCaptionSource && '' !== dataCaptionPostId ) {
			return dataCaptionPostId;
		}
		return currentPostId;
	};

	/**
	 * Retrieve a caption from data.
	 */
	const getCaptionFromData = () => {
		setCaptionLoading( true );
		SendCommand(
			photoBlock.restNonce,
			{
				dataCaptionPostTitle,
				dataCaptionPostId,
				dataCaptionSource,
				dataCaptionType,
				dataCaptionImageCustomField,
				dataCaptionTypePostCustomField,
				dataCaptionPostType,
				dataCaptionPostTypeCustomField,
				dataCaptionTypePost,
				dataCaptionTypePostAuthorMeta,
				dataCaptionPostTypeSource,
				dataCaptionPostTypeAuthorMeta,
				imageId: imageFile.id,
				postId: getPostId(),
			},
			`${ photoBlock.restUrl + '/get-caption-by-data' }`,
			'POST'
		)
			.then( ( response ) => {
				const { data } = response;
				setCaption( data );
			} )
			.catch( ( error ) => {
				// todo: error checking/display.
			} )
			.then( () => {
				setCaptionLoading( false );
			} );
	};

	// Do REST request to get dynamic caption if needed.
	useEffect( () => {
		if ( dataMode ) {
			getCaptionFromData();
		}
	}, [] );

	const settingsInspectorControls = (
		<>
			{ 'overlay' === captionPosition && (
				<PanelBody
					title={ __( 'Overlay Settings', 'photo-block' ) }
					initialOpen={ true }
				>
					<SelectControl
						label={ __( 'Caption Vertical Position', 'photo-block' ) }
						value={ overlayCaptionVerticalPosition }
						options={ [
							{ label: __( 'Top', 'photo-block' ), value: 'top' },
							{ label: __( 'Middle', 'photo-block' ), value: 'middle' },
							{ label: __( 'Bottom', 'photo-block' ), value: 'bottom' },
						] }
						onChange={ ( value ) => {
							setAttributes( {
								overlayCaptionVerticalPosition: value,
							} );
						} }
					/>
					<SelectControl
						label={ __( 'Caption Horizontal Position', 'photo-block' ) }
						value={ overlayCaptionHorizontalPosition }
						options={ [
							{ label: __( 'Left', 'photo-block' ), value: 'left' },
							{ label: __( 'Center', 'photo-block' ), value: 'center' },
							{ label: __( 'Right', 'photo-block' ), value: 'right' },
						] }
						onChange={ ( value ) => {
							setAttributes( {
								overlayCaptionHorizontalPosition: value,
							} );
						} }
					/>
					<BaseControl id="dlx-photo-block__overlay-background-type" label={ __( 'Background Type', 'photo-block' ) }>
						<ButtonGroup className="dlx-photo-block__overlay-background-type">
							<Button
								variant={ 'none' === overlayBackgroundType ? 'primary' : 'secondary' }
								onClick={ () => {
									setAttributes( {
										overlayBackgroundType: 'none',
									} );
								} }
							>
								{ __( 'None', 'photo-block' ) }
							</Button>
							<Button
								variant={ 'solid' === overlayBackgroundType ? 'primary' : 'secondary' }
								onClick={ () => {
									setAttributes( {
										overlayBackgroundType: 'solid',
									} );
								} }
							>
								{ __( 'Solid', 'photo-block' ) }
							</Button>
							<Button
								variant={ 'gradient' === overlayBackgroundType ? 'primary' : 'secondary' }
								onClick={ () => {
									setAttributes( {
										overlayBackgroundType: 'gradient',
									} );
								} }
							>
								{ __( 'Gradient', 'photo-block' ) }
							</Button>
							<Button
								variant={ 'image' === overlayBackgroundType ? 'primary' : 'secondary' }
								onClick={ () => {
									setAttributes( {
										overlayBackgroundType: 'image',
									} );
								} }
							>
								{ __( 'Image', 'photo-block' ) }
							</Button>
						</ButtonGroup>
					</BaseControl>
					{ 'solid' === overlayBackgroundType && (
						<ColorPickerControl
							value={ overlayBackgroundColor }
							key={ 'overlay-background-color' }
							onChange={ ( slug, newValue ) => {
								setAttributes( { overlayBackgroundColor: newValue } );
							} }
							onOpacityChange={ ( newOpacity ) => {
								setAttributes( { overlayBackgroundColorOpacity: newOpacity } );
							} }
							label={ __( 'Overlay Color', 'highlight-and-share' ) }
							defaultColors={ photoBlock.palette }
							defaultColor={ 'rgba(0,0,0,0.5)' }
							slug={ 'overlay-background-color' }
							alpha={ true }
							opacity={ overlayBackgroundColorOpacity }
						/>
					) }
					{ 'gradient' === overlayBackgroundType && (
						<>
							<Button
								variant="secondary"
								className="dlx-photo-block__overlay-background-gradient-randomize"
								label={ __( 'Generate Random Gradient', 'photo-block' ) }
								onClick={ () => {
									setAttributes( {
										overlayBackgroundGradient: getRandomGradient(),
									} );
								} }
								icon={ <Shuffle /> }
							>
								{ __( 'Generate Random Gradient', 'photo-block' ) }
							</Button>
							<GradientPickerControl
								value={ overlayBackgroundGradient }
								onChange={ ( newValue ) => {
									setAttributes( { overlayBackgroundGradient: newValue } );
								} }
								label={ __( 'Overlay Gradient', 'photo-block' ) }
							/>
							<RangeControl
								label={ __( 'Gradient Opacity', 'photo-block' ) }
								value={ overlayBackgroundGradientOpacity }
								onChange={ ( newValue ) => {
									setAttributes( { overlayBackgroundGradientOpacity: newValue } );
								} }
								min={ 0 }
								max={ 1 }
								step={ 0.01 }
							/>
						</>
					) }
					<BorderResponsiveControl
						label={ __( 'Overlay Border', 'photo-block' ) }
						values={ overlayBorder }
						onValuesChange={ ( values ) => {
							setAttributes( { overlayBorder: values } );
						} }
						labelTop={ __( 'Top Border', 'photo-block' ) }
						labelRight={ __( 'Right Border', 'photo-block' ) }
						labelBottom={ __( 'Bottom Border', 'photo-block' ) }
						labelLeft={ __( 'Left Border', 'photo-block' ) }
						labelAll={ __( 'Change Border', 'photo-block' ) }
					/>
					<DimensionsResponsiveControl
						label={ __( 'Overlay Border Radius', 'photo-block' ) }
						values={ overlayBorderRadius }
						onValuesChange={ ( values ) => {
							setAttributes( { overlayBorderRadius: values } );
						} }
						labelTop={ __( 'Top-left Radius', 'photo-block' ) }
						labelRight={ __( 'Top-right Radius', 'photo-block' ) }
						labelBottom={ __( 'Bottom-right Radius', 'photo-block' ) }
						labelLeft={ __( 'Bottom-left Radius', 'photo-block' ) }
						labelAll={ __( 'Change Border Radius', 'photo-block' ) }
						isBorderRadius={ true }
					/>
				</PanelBody>
			) }
			<PanelBody
				title={ __( 'Caption Settings', 'photo-block' ) }
				initialOpen={ true }
			>
				{ ( dataMode || 'single' === mode ) && (
					<PanelRow className="has-typography-panel-row">
						<TypographyControl
							values={ captionTypography }
							screenSize={ deviceType }
							onValuesChange={ ( formValues ) => {
								setAttributes( {
									captionTypography: formValues,
								} );
							} }
							label={ __( 'Caption Typography', 'photo-block' ) }
						/>
					</PanelRow>
				) }
				{ 'advanced' === mode && (
					<>
						<PanelRow>
							<ToggleControl
								label={ __( 'Enable Smart Styles', 'photo-block' ) }
								checked={ enableSmartStyles }
								onChange={ ( newValue ) => {
									setAttributes( { enableSmartStyles: newValue } );
								} }
								help={ __( 'Enable smart styles to style the individual elements of the caption.', 'photo-block' ) }
							/>
						</PanelRow>
						{ enableSmartStyles && (
							<>
								<SelectControl
									label={ __( 'Text Font Family', 'photo-block' ) }
									value={ captionTextFontFamily }
									onChange={ ( newValue ) => {
										setAttributes( { captionTextFontFamily: newValue } );
									} }
									options={ fontFamiliesSelect }
									help={ __( 'Set the font family for common elements such as paragraphs and quotes.', 'photo-block' ) }
								/>
								<SelectControl
									label={ __( 'Headings Font Family', 'photo-block' ) }
									value={ captionHeadingsFontFamily }
									onChange={ ( newValue ) => {
										setAttributes( { captionHeadingsFontFamily: newValue } );
									} }
									options={ fontFamiliesSelect }
									help={ __( 'Set the font family for heading elements.', 'photo-block' ) }
								/>
								<RangeResponsiveControl
									label={ __( 'Base Font Size', 'photo-block' ) }
									help={ __( 'Set the base font size for the caption that all elements are based off of.', 'photo-block' ) }
									values={ captionBaseFontSize }
									screenSize={ deviceType }
									onValuesChange={ ( newValues ) => {
										setAttributes( { captionBaseFontSize: newValues } );
									} }
									min={ 0 }
									max={ 36 }
									step={ 1 }
									units={ [ 'px' ] }
								/>
								<ColorPickerControl
									value={ captionBackgroundColor }
									key={ 'background-color-caption' }
									onChange={ ( slug, newValue ) => {
										setAttributes( { captionBackgroundColor: newValue } );
									} }
									onOpacityChange={ ( newOpacity ) => {
										setAttributes( { captionBackgroundColorOpacity: newOpacity } );
									} }
									label={ __( 'Background Color', 'photo-block' ) }
									defaultColors={ photoBlock.palette }
									defaultColor={ 'transparent' }
									slug={ 'background-color-caption' }
									alpha={ true }
									opacity={ captionBackgroundColorOpacity }
								/>
								<ColorPickerControl
									value={ captionTextColor }
									key={ 'text-color-caption' }
									onChange={ ( slug, newValue ) => {
										setAttributes( { captionTextColor: newValue } );
									} }
									label={ __( 'Text Color', 'photo-block' ) }
									defaultColors={ photoBlock.palette }
									defaultColor={ 'transparent' }
									slug={ 'text-color-caption' }
								/>
								<ColorPickerControl
									value={ captionAccentColor }
									key={ 'accent-color-caption' }
									onChange={ ( slug, newValue ) => {
										setAttributes( { captionAccentColor: newValue } );
									} }
									label={ __( 'Accent Color', 'photo-block' ) }
									defaultColors={ photoBlock.palette }
									defaultColor={ 'transparent' }
									slug={ 'accent-color-caption' }
								/>
								<ColorPickerControl
									value={ captionSecondaryColor }
									key={ 'secondary-color-caption' }
									onChange={ ( slug, newValue ) => {
										setAttributes( { captionSecondaryColor: newValue } );
									} }
									label={ __( 'Secondary Color', 'photo-block' ) }
									defaultColors={ photoBlock.palette }
									defaultColor={ 'transparent' }
									slug={ 'secondary-color-caption' }
								/>
							</>
						) }
					</>
				) }
				{ ( dataMode || 'single' === mode ) && (
					<>
						<ColorPickerControl
							value={ captionBackgroundColor }
							key={ 'background-color-caption' }
							onChange={ ( slug, newValue ) => {
								setAttributes( { captionBackgroundColor: newValue } );
							} }
							onOpacityChange={ ( newOpacity ) => {
								setAttributes( { captionBackgroundColorOpacity: newOpacity } );
							} }
							label={ __( 'Background Color', 'photo-block' ) }
							defaultColors={ photoBlock.palette }
							defaultColor={ 'transparent' }
							slug={ 'background-color-caption' }
							alpha={ true }
							opacity={ captionBackgroundColorOpacity }
						/>
						<ColorPickerControl
							value={ captionTextColor }
							key={ 'text-color-caption' }
							onChange={ ( slug, newValue ) => {
								setAttributes( { captionTextColor: newValue } );
							} }
							label={ __( 'Text Color', 'photo-block' ) }
							defaultColors={ photoBlock.palette }
							defaultColor={ 'transparent' }
							slug={ 'text-color-caption' }
						/>
						<ColorPickerControl
							value={ captionLinkColor }
							key={ 'link-color-caption' }
							onChange={ ( slug, newValue ) => {
								setAttributes( { captionTextColor: newValue } );
							} }
							label={ __( 'Link Color', 'photo-block' ) }
							defaultColors={ photoBlock.palette }
							defaultColor={ 'transparent' }
							slug={ 'link-color-caption' }
						/>
						<ColorPickerControl
							value={ captionLinkHoverColor }
							key={ 'link-hover-color-caption' }
							onChange={ ( slug, newValue ) => {
								setAttributes( { captionLinkHoverColor: newValue } );
							} }
							label={ __( 'Link Color (Hover)', 'photo-block' ) }
							defaultColors={ photoBlock.palette }
							defaultColor={ 'transparent' }
							slug={ 'link-hover-color-caption' }
						/>
					</>
				) }
			</PanelBody>
		</>
	);

	// Set the local inspector controls.
	const styleInspectorControls = (
		<>
			<PanelBody
				title={ __( 'Padding, Margin, and Border', 'photo-block' ) }
				initialOpen={ false }
				icon={ <Maximize /> }
				className="photo-block__inspector-panel"
				id="photo-block__photo-dimensions-styles"
				uniqueId={ uniqueId }
				scrollAfterOpen={ false }
			>
				<DimensionsResponsiveControl
					label={ __( 'Caption Padding', 'photo-block' ) }
					values={ captionPaddingSize }
					onValuesChange={ ( values ) => {
						setAttributes( { captionPaddingSize: values } );
					} }
					labelTop={ __( 'Top Padding', 'photo-block' ) }
					labelRight={ __( 'Right Padding', 'photo-block' ) }
					labelBottom={ __( 'Bottom Padding', 'photo-block' ) }
					labelLeft={ __( 'Left Padding', 'photo-block' ) }
					labelAll={ __( 'Change Padding', 'photo-block' ) }
				/>
				<DimensionsResponsiveControl
					label={ __( 'Caption Margin', 'photo-block' ) }
					values={ captionMarginSize }
					onValuesChange={ ( values ) => {
						setAttributes( { captionMarginSize: values } );
					} }
					labelTop={ __( 'Top Margin', 'photo-block' ) }
					labelRight={ __( 'Right Margin', 'photo-block' ) }
					labelBottom={ __( 'Bottom Margin', 'photo-block' ) }
					labelLeft={ __( 'Left Margin', 'photo-block' ) }
					labelAll={ __( 'Change Margin', 'photo-block' ) }
					allowNegatives={ true }
				/>
				<BorderResponsiveControl
					label={ __( 'Caption Border', 'photo-block' ) }
					values={ captionBorder }
					onValuesChange={ ( values ) => {
						setAttributes( { captionBorder: values } );
					} }
					labelTop={ __( 'Top Border', 'photo-block' ) }
					labelRight={ __( 'Right Border', 'photo-block' ) }
					labelBottom={ __( 'Bottom Border', 'photo-block' ) }
					labelLeft={ __( 'Left Border', 'photo-block' ) }
					labelAll={ __( 'Change Border', 'photo-block' ) }
				/>
				<DimensionsResponsiveControl
					label={ __( 'Caption Border Radius', 'photo-block' ) }
					values={ captionBorderRadius }
					onValuesChange={ ( values ) => {
						setAttributes( { captionBorderRadius: values } );
					} }
					labelTop={ __( 'Top-left Radius', 'photo-block' ) }
					labelRight={ __( 'Top-right Radius', 'photo-block' ) }
					labelBottom={ __( 'Bottom-right Radius', 'photo-block' ) }
					labelLeft={ __( 'Bottom-left Radius', 'photo-block' ) }
					labelAll={ __( 'Change Border Radius', 'photo-block' ) }
					isBorderRadius={ true }
				/>

			</PanelBody>
			<PanelBody
				title={ __( 'Container Sizing', 'photo-block' ) }
				initialOpen={ false }
				icon={ <Shrink /> }
				className="photo-block__inspector-panel"
				id="photo-block__photo-container-styles"
				uniqueId={ uniqueId }
				scrollAfterOpen={ false }
			>
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
			</PanelBody>
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
						return styleInspectorControls;
				}
			} }
		</TabPanel>
	);

	const localToolbar = (
		<BlockControls>
			{
				( dataMode || 'single' === mode ) && (
					<ToolbarGroup className="dlx-photo-block__caption-align-toolbar-buttons">
						<ToolbarButton
							icon={ <AlignLeft /> }
							label={ __( 'Align Left', 'photo-block' ) }
							onClick={ () => {
								setAttributes( { captionAlign: 'left' } );
							} }
							isActive={ captionAlign === 'left' }
						/>
						<ToolbarButton
							icon={ <AlignCenter /> }
							label={ __( 'Align Center', 'photo-block' ) }
							onClick={ () => {
								setAttributes( { captionAlign: 'center' } );
							} }
							isActive={ captionAlign === 'center' }
						/>
						<ToolbarButton
							icon={ <AlignRight /> }
							label={ __( 'Align Right', 'photo-block' ) }
							onClick={ () => {
								setAttributes( { captionAlign: 'right' } );
							} }
							isActive={ captionAlign === 'right' }
						/>
					</ToolbarGroup>
				)
			}
			<ToolbarGroup>
				<ToolbarButton
					icon={ <SeparatorHorizontal /> }
					label={ __( 'Caption Position', 'photo-block' ) }
					onClick={ () => {
						setCaptionPositionPopoverVisible( true );
					} }
					ref={ setCaptionPopoverRef }
				>
					{ __( 'Position', 'photo-block' ) }
				</ToolbarButton>
			</ToolbarGroup>
			{ ! dataMode && (
				<ToolbarGroup>
					<ToolbarButton
						icon={ <FormInput /> }
						label={ __( 'Caption Mode', 'photo-block' ) }
						onClick={ () => {
							setModePopoverVisible( true );
						} }
						ref={ setModePopoverRef }
					>
						{ __( 'Mode', 'photo-block' ) }
					</ToolbarButton>
				</ToolbarGroup>
			) }
			<ToolbarGroup>
				<ToolbarButton
					icon={ <Trash2 /> }
					label={ __( 'Remove Caption', 'photo-block' ) }
					onClick={ () => {
						setRemoveCaptionModalVisible( true );
					} }
				>
					{ __( 'Remove', 'photo-block' ) }
				</ToolbarButton>
			</ToolbarGroup>
			{
				dataMode && (
					<ToolbarGroup>
						<ToolbarButton
							icon={ <Database /> }
							label={ __( 'Caption Data', 'photo-block' ) }
							onClick={ () => {
								setDataModalVisible( true );
							} }
						>
							{ __( 'Caption Data', 'photo-block' ) }
						</ToolbarButton>
					</ToolbarGroup>
				)
			}
			{ dataModalVisible && (
				<Modal
					title={ __( 'Caption Data', 'photo-block' ) }
					onRequestClose={ () => {
						setDataModalVisible( false );
					} }
					className="photo-block__remove-caption-modal"
				>
					<div className="dlx-photo-block__a11y-popover">
						<DataSelect
							attributes={ attributes }
							setAttributes={ setAttributes }
							context={ context }
							prefix="dataCaption"
						/>
						<ButtonGroup>
							<Button
								variant="primary"
								onClick={ () => {
									getCaptionFromData();
									setDataModalVisible( false );
								} }
							>
								{ __( 'Refresh Caption', 'photo-block' ) }
							</Button>
							<Button
								variant="secondary"
								onClick={ () => {
									setDataModalVisible( false );
								} }
							>
								{ __( 'Close', 'photo-block' ) }
							</Button>
						</ButtonGroup>
					</div>
				</Modal>
			) }
			{ switchModeModalVisible && (
				<Modal
					title={ 'single' === mode ? __( 'Switch to Multi-Line Mode', 'photo-block' ) : __( 'Switch to Single-Line Mode', 'photo-block' ) }
					onRequestClose={ () => {
						setSwitchModeModalVisible( false );
					} }
					className="photo-block__remove-caption-modal"
				>
					<div className="dlx-photo-block__a11y-popover">
						{
							'single' === mode && (
								<>
									<p>
										{ __( 'Switch to multi-line to enable a more freeform caption.', 'photo-block' ) }
									</p>
								</>
							) }
						{ 'advanced' === mode && (
							<>
								<p>
									{ __( 'Switch to a single-line caption format.', 'photo-block' ) }
								</p>
							</>
						)	}
						<ButtonGroup>
							<Button
								variant="primary"
								onClick={ () => {
									setAttributes( { mode: 'single' === mode ? 'advanced' : 'single' } );
									setSwitchModeModalVisible( false );
								} }
							>
								{ 'single' === mode ? __( 'Switch to Multi-Line', 'photo-block' ) : __( 'Switch to Single-Line', 'photo-block' ) }
							</Button>
							<Button
								variant="secondary"
								onClick={ () => {
									setSwitchModeModalVisible( false );
								} }
							>
								{ __( 'Cancel', 'photo-block' ) }
							</Button>
						</ButtonGroup>
					</div>
				</Modal>
			) }
			{ modePopoverVisible && (
				<Popover
					placement="bottom-start"
					onClose={ () => {
						setModePopoverVisible( false );
					} }
					anchor={ modePopoverRef }
					className="photo-block__caption-position-popover"
				>
					<MenuGroup>
						<MenuItem
							icon={ 'single' === mode ? <Check /> : null }
							onClick={ () => {
								if ( 'single' === mode ) {
									return;
								}
								setModePopoverVisible( false );
								setSwitchModeModalVisible( true );
							} }
						>
							{ __( 'Single Line', 'photo-block' ) }
						</MenuItem>
						<MenuItem
							icon={ 'advanced' === mode ? <Check /> : null }
							onClick={ () => {
								if ( 'advanced' === mode ) {
									return;
								}
								setModePopoverVisible( false );
								setSwitchModeModalVisible( true );
							} }
						>
							{ __( 'Multiple Lines', 'photo-block' ) }
						</MenuItem>
					</MenuGroup>
				</Popover>
			) }
			{ captionPositionPopoverVisible && (
				<Popover
					placement="bottom-start"
					onClose={ () => {
						setCaptionPositionPopoverVisible( false );
					} }
					anchor={ captionPopoverRef }
					className="photo-block__caption-position-popover"
				>
					<MenuGroup>
						<MenuItem
							icon={ 'top' === captionPosition ? <Check /> : null }
							onClick={ () => {
								setCaptionPosition( 'top' );
								setAttributes( { captionPosition: 'top' } );
								setCaptionPositionPopoverVisible( false );
							} }
						>
							{ __( 'Top', 'photo-block' ) }
						</MenuItem>
						<MenuItem
							icon={ 'overlay' === captionPosition ? <Check /> : null }
							onClick={ () => {
								setCaptionPosition( 'overlay' );
								setAttributes( { captionPosition: 'overlay' } );
								setCaptionPositionPopoverVisible( false );
							} }
						>
							{ __( 'Overlay', 'photo-block' ) }
						</MenuItem>
						<MenuItem
							icon={ 'bottom' === captionPosition ? <Check /> : null }
							onClick={ () => {
								setCaptionPosition( 'bottom' );
								setAttributes( { captionPosition: 'bottom' } );
								setCaptionPositionPopoverVisible( false );
							} }
						>
							{ __( 'Bottom', 'photo-block' ) }
						</MenuItem>
					</MenuGroup>
				</Popover>
			) }
			{ removeCaptionModalVisible && (
				<Modal
					title={ __( 'Remove Caption', 'photo-block' ) }
					onRequestClose={ () => {
						setRemoveCaptionModalVisible( false );
					} }
					className="photo-block__remove-caption-modal"
				>
					<p>{ __( 'Are you sure you want to remove the caption?', 'photo-block' ) }</p>
					<ButtonGroup>
						<Button
							variant="primary"
							onClick={ () => {
								removeBlocks( clientId );
								setRemoveCaptionModalVisible( false );
							} }
						>
							{ __( 'Remove Caption', 'photo-block' ) }
						</Button>
						<Button
							variant="secondary"
							onClick={ () => {
								setRemoveCaptionModalVisible( false );
							} }
						>
							{ __( 'Cancel', 'photo-block' ) }
						</Button>
					</ButtonGroup>
				</Modal>
			) }
		</BlockControls>
	);

	/**
	 * Get a unique ID for the block for inline styling if necessary.
	 */
	useEffect( () => {
		// Set unique ID for block (for styling).
		setAttributes( { uniqueId: generatedUniqueId } );
	}, [] );

	const htmlToReactParser = new HtmlToReactParser();

	/**
	 * Get the caption for display.
	 *
	 * @return {JSX.Element} The caption.
	 */
	const getCaption = () => {
		const figClasses = classnames( 'dlx-photo-block__caption', {
			'has-smart-styles': ( 'advanced' === mode && ! dataMode ),
		} );

		if ( dataMode ) {
			if ( captionLoading ) {
				return (
					<>
						{ __( 'Loading…', 'photo-block' ) }
						<Spinner />
					</>
				);
			} else if ( '' !== caption ) {
				return ( <figcaption className={ figClasses } id={ uniqueId }>{ htmlToReactParser.parse( caption ) }</figcaption> );
			}
			return __( 'No caption', 'photo-block' );
		}
		if ( 'single' === mode ) {
			return (
				<figcaption className={ figClasses } id={ uniqueId }>
					<RichText
						tagName="div"
						placeholder={ __( 'Write caption…', 'photo-block' ) }
						value={ captionManual }
						onChange={ ( value ) => {
							setAttributes( { captionManual: value } );
						} }
					/>
				</figcaption>
			);
		}
		return <figcaption id={ uniqueId } { ...innerBlockProps } />;
	};

	// Set the local inspector controls.
	const localInspectorControls = (
		<InspectorControls>{ interfaceTabs }</InspectorControls>
	);

	let styles = `
		figcaption#${ uniqueId } {
			background: ${ captionBackgroundColor };
			${ getValueWithUnit( deviceType, containerWidth, 'width' ) }
			${ getValueWithUnit( deviceType, containerHeight, 'height' ) }
			${ getValueWithUnit( deviceType, containerMinWidth, 'min-width' ) }
			${ getValueWithUnit( deviceType, containerMinHeight, 'min-height' ) }
			${ getValueWithUnit( deviceType, containerMaxWidth, 'max-width' ) }
			${ getValueWithUnit( deviceType, containerMaxHeight, 'max-height' ) }
		}
		figcaption#${ uniqueId } {
			padding: ${ buildDimensionsCSS( captionPaddingSize, deviceType ) };
			margin: ${ buildDimensionsCSS( captionMarginSize, deviceType ) };
			border-radius: ${ buildDimensionsCSS( captionBorderRadius, deviceType ) };
			${ buildBorderCSS( captionBorder, deviceType ) }
		}
	`;

	// Set colors and typography for single caption mode and data mode.
	if ( 'single' === mode || dataMode ) {
		styles += `
			figcaption#${ uniqueId } {
				color: ${ captionTextColor };
				font-family: ${ geHierarchicalPlaceholderValue( captionTypography, deviceType, captionTypography[ deviceType ].fontFamily, 'fontFamily' ) };
				font-size: ${ geHierarchicalPlaceholderValue( captionTypography, deviceType, captionTypography[ deviceType ].fontSize, 'fontSize' ) }${ getHierarchicalValueUnit( captionTypography, deviceType, captionTypography[ deviceType ].fontSizeUnit, 'fontSizeUnit' ) };
				font-weight: ${ geHierarchicalPlaceholderValue( captionTypography, deviceType, captionTypography[ deviceType ].fontWeight, 'fontWeight' ) };
				line-height: ${ geHierarchicalPlaceholderValue( captionTypography, deviceType, captionTypography[ deviceType ].lineHeight, 'lineHeight' ) }${ getHierarchicalValueUnit( captionTypography, deviceType, captionTypography[ deviceType ].lineHeightUnit, 'lineHeightUnit' ) };
				text-transform: ${ geHierarchicalPlaceholderValue( captionTypography, deviceType, captionTypography[ deviceType ].textTransform, 'textTransform' ) };
				letter-spacing: ${ geHierarchicalPlaceholderValue( captionTypography, deviceType, captionTypography[ deviceType ].letterSpacing, 'letterSpacing' ) }${ getHierarchicalValueUnit( captionTypography, deviceType, captionTypography[ deviceType ].letterSpacingUnit, 'letterSpacingUnit' ) };
				text-align: ${ captionAlign };
			}
			figcaption#${ uniqueId } a {
				color: ${ captionLinkColor };
			}
			figcaption#${ uniqueId } a:hover {
				color: ${ captionLinkHoverColor };
			}
		`;
	}

	// Set colors and typography for advanced caption mode.
	if ( 'advanced' === mode && ! dataMode ) {
		styles += `
			figcaption#${ uniqueId } {
				--dlx-photo-block__caption-text-color: ${ captionTextColor };
				--dlx-photo-block__caption-accent-color: ${ captionAccentColor };
				--dlx-photo-block__caption-secondary-color: ${ captionSecondaryColor };
				--dlx-photo-block__caption-font-family: ${ captionTextFontFamily };
				--dlx-photo-block__caption-headings-font-family: ${ captionHeadingsFontFamily };
				--dlx-photo-block__caption-font-size: ${ geHierarchicalPlaceholderValue( captionBaseFontSize, deviceType, captionBaseFontSize[ deviceType ].value, 'value' ) }${ getHierarchicalValueUnit( captionBaseFontSize, deviceType, captionBaseFontSize[ deviceType ].unit, 'unit' ) };
			}
		`;
	}

	// Set overlay background color if solid.
	if ( 'overlay' === captionPosition && 'solid' === overlayBackgroundType ) {
		styles += `
			#${ uniqueId }.dlx-photo-block__caption-overlay {
				background: ${ overlayBackgroundColor };
			}
		`;
	}

	// Set overlay background color if gradient.
	if ( 'overlay' === captionPosition && 'gradient' === overlayBackgroundType ) {
		styles += `
			#${ uniqueId }.dlx-photo-block__caption-overlay:before {
				display: block;
				content: '';
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-image: ${ overlayBackgroundGradient };
				opacity: ${ overlayBackgroundGradientOpacity };
				z-index: 1;
			}
		`;

		// The overlay background container needs to match overlay border radius in order to simulate masking.
		styles += `
			#${ uniqueId }.dlx-photo-block__caption-overlay:before {
				border-radius: ${ buildDimensionsCSS( overlayBorderRadius, deviceType ) };
			}
		`;
	}

	// Set overlay padding, border, and border radius.
	if ( 'overlay' === captionPosition ) {
		styles += `
			#${ uniqueId }.dlx-photo-block__caption-overlay {
				border-radius: ${ buildDimensionsCSS( overlayBorderRadius, deviceType ) };
				${ buildBorderCSS( overlayBorder, deviceType ) }
			}
		`;
	}

	/**
	 * Get overlay container classes.
	 */
	const overlayStyles = classnames(
		'dlx-photo-block__caption-overlay',
		{
			'is-overlay': 'overlay' === captionPosition,
			'caption-vertical-bottom': 'bottom' === overlayCaptionVerticalPosition,
			'caption-vertical-middle': 'middle' === overlayCaptionVerticalPosition,
			'caption-vertical-top': 'top' === overlayCaptionVerticalPosition,
			'caption-horizontal-left': 'left' === overlayCaptionHorizontalPosition,
			'caption-horizontal-center': 'center' === overlayCaptionHorizontalPosition,
			'caption-horizontal-right': 'right' === overlayCaptionHorizontalPosition,
		}
	);

	const block = (
		<>
			<style>{ styles }</style>
			{ localInspectorControls }
			{ localToolbar }
			<div className={ classnames( 'dlx-photo-block__caption-wrapper' ) }>
				{ 'overlay' === captionPosition && (
					<>
						<div className={ overlayStyles } id={ uniqueId }>
							{ getCaption() }
						</div>
					</>
				)
				}
				{ 'overlay' !== captionPosition && (
					<>
						{ getCaption() }
					</>
				) }

			</div>
		</>
	);

	// Return empty if caption isn't visible.
	if ( ! isCaptionVisible ) {
		return null;
	}

	return (
		<>
			<div { ...blockProps }>{ block }</div>
		</>
	);
};

export default PhotoCaptionBlock;
