import './editor.scss';

import classnames from 'classnames';
import { useEffect, useState, useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { escapeEditableHTML } from '@wordpress/escape-html';
import { applyFilters } from '@wordpress/hooks';
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
	MenuGroup,
	Spinner,
	RangeControl,
	MenuItem,
	TextControl,
} from '@wordpress/components';

import {
	useSettings,
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
	useSelect,
} from '@wordpress/data';

import {
	Trash2,
	SeparatorHorizontal,
	Check,
	Shrink,
	Info,
	FormInput,
	Maximize,
	AlignLeft,
	AlignCenter,
	AlignRight,
	Shuffle,
} from 'lucide-react';

const HtmlToReactParser = require( 'html-to-react' ).Parser;

import { blockStore } from '../../store';
import DimensionsResponsiveControl from '../../components/DimensionsResponsive';
import BorderResponsiveControl from '../../components/BorderResponsive';
import SizeResponsiveControl from '../../components/SizeResponsive';
import useDeviceType from '../../hooks/useDeviceType';
import SendCommand from '../../utils/SendCommand';
import TypographyControl from '../../components/Typography';
import ColorPickerControl from '../../components/ColorPicker';
import GradientPickerControl from '../../components/GradientPicker';
import getRandomGradient from '../../utils/GetRandomGradient';
import RangeResponsiveControl from '../../components/RangeResponsive';
import BackgroundSelectorControl from '../../components/BackgroundSelector';
import CustomAttributesControl from '../../components/CustomAttributes';
import getStyles from './block-styles';
import globalStylesStore from '../../store/global-styles';
import Notice from '../../components/Notice';

/**
 * Height units.
 */
const heightUnits = [ 'px', 'em', 'rem', '%', 'vh' ];

const fontFamilies = [
	{
		label: 'Arial',
		family: 'Arial, sans-serif',
		slug: 'arial',
		fallback: 'sans-serif',
		type: 'web',
	},
	{
		label: 'Courier New',
		family: 'Courier New, monospace',
		slug: 'courier-new',
		fallback: 'monospace',
		type: 'web',
	},
	{
		label: 'Garamond',
		family: 'Garamond, serif',
		slug: 'garamond',
		fallback: 'serif',
		type: 'web',
	},
	{
		label: 'Georgia',
		family: 'Georgia, serif',
		slug: 'georgia',
		fallback: 'serif',
		type: 'web',
	},
	{
		label: 'Helvetica',
		family: 'Helvetica, sans-serif',
		slug: 'helvetica',
		fallback: 'sans-serif',
		type: 'web',
	},
	{
		label: 'Lucida Console',
		family: 'Lucida Console, monospace',
		slug: 'lucida-console',
		fallback: 'monospace',
		type: 'web',
	},
	{
		label: 'Tahoma',
		family: 'Tahoma, sans-serif',
		slug: 'tahoma',
		fallback: 'sans-serif',
		type: 'web',
	},
	{
		label: 'Times New Roman',
		family: 'Times New Roman, serif',
		slug: 'times-new-roman',
		fallback: 'serif',
		type: 'web',
	},
	{
		label: 'Trebuchet MS',
		family: 'Trebuchet MS, sans-serif',
		slug: 'trebuchet-ms',
		fallback: 'sans-serif',
		type: 'web',
	},
	{
		label: 'Verdana',
		family: 'Verdana, sans-serif',
		slug: 'verdana',
		fallback: 'sans-serif',
		type: 'web',
	},
];

const PhotoCaptionBlock = ( props ) => {
	const {
		setAttributes,
		clientId,
		context,
		isSelected,
	} = props;

	const blockUniqueId = context[ 'photo-block/uniqueId' ];
	const globalStyle = context[ 'photo-block/globalStyle' ];

	let attributes = props.attributes || {};

	// Apply filters to attributes.
	useEffect( () => {
		const oldAttrs = { ...props.attributes };
		attributes = applyFilters( 'dlx_photo_block_attributes', props.attributes, globalStyle, clientId, 'caption' );

		// Determine if caption position changed.
		if ( oldAttrs.captionPosition !== attributes.captionPosition ) {
			setCaptionPosition( attributes.captionPosition );
		}
		// Determine if mode has changed.
		if ( oldAttrs.mode !== attributes.mode ) {
			setAttributes( { mode: attributes.mode } );
		}
	}, [ props.attributes ] );

	const {
		setCaptionPosition,
		setHasCaption,
	} = useDispatch( blockStore( blockUniqueId ) );

	// Get current block data.
	const {
		imageData,
		captionPosition,
		inQueryLoop,
		photoMode,
		currentScreen,
	} = useSelect( ( select ) => {
		return {
			imageData: select( blockStore( blockUniqueId ) ).getImageData(),
			captionPosition: select( blockStore( blockUniqueId ) ).getCaptionPosition(),
			inQueryLoop: select( blockStore( blockUniqueId ) ).inQueryLoop(),
			photoMode: select( blockStore( blockUniqueId ) ).getPhotoMode(),
			currentScreen: select( blockStore( blockUniqueId ) ).getCurrentScreen(),
		};
	} );

	const { globalStyleCSSClassName } = useSelect( ( select ) => {
		const maybeGlobalStyle = select( globalStylesStore ).getGlobalStyleBySlug( globalStyle );
		if ( Object.keys( maybeGlobalStyle ).length === 0 ) {
			return '';
		}
		return {
			globalStyleCSSClassName: maybeGlobalStyle.css_class,
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

	const [ caption, setCaption ] = useState( '' ); // Only applicable if in data mode.
	const [ captionLoading, setCaptionLoading ] = useState( false ); // Only applicable if in data mode.
	const [ captionPositionPopoverVisible, setCaptionPositionPopoverVisible ] = useState( false );
	const [ captionPopoverRef, setCaptionPopoverRef ] = useState( null );
	const [ modePopoverRef, setModePopoverRef ] = useState( null );
	const [ modePopoverVisible, setModePopoverVisible ] = useState( false );
	const [ removeCaptionModalVisible, setRemoveCaptionModalVisible ] = useState( false ); // only applicable if in data mode.
	const [ dataModalVisible, setDataModalVisible ] = useState( false ); // only applicable if in data mode.
	const [ switchModeModalVisible, setSwitchModeModalVisible ] = useState( false ); // only applicable if in data mode.
	const [ isCaptionVisible, setIsCaptionVisible ] = useState( false ); // Make sure caption is positioned correctly before visible render.
	const [ captionInputRef, setCaptionInputRef ] = useState( null );

	// Set caption position context based on captionPosition attribute. After setting, show the caption.
	useEffect( () => {
		setCaptionPosition( attributes.captionPosition ); // Caption position can be top|bottom|overlay
		setIsCaptionVisible( true );
	}, [ attributes.captionPosition ] );

	const { removeBlocks } = useDispatch( store );

	// Get device.
	const [ deviceType, setDeviceType ] = useDeviceType( 'Desktop' );

	const blockProps = useBlockProps( {
		className: classnames(
			`dlx-photo-caption-block`,
		),
	} );

	// Get query loop vars.
	const { postId } = context;

	const uniqueId = blockUniqueId;

	const {
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
		captionCustomTypography,
		captionBorder,
		captionBorderRadius,
		containerWidth,
		containerHeight,
		containerMaxWidth,
		containerMinWidth,
		containerMaxHeight,
		containerMinHeight,
		overlayVerticalPosition,
		overlayCaptionVerticalPosition,
		overlayHorizontalPosition,
		overlayCaptionHorizontalPosition,
		overlayBackgroundType,
		overlayBackgroundColor,
		overlayBackgroundColorHover,
		overlayBackgroundColorOpacity,
		overlayBackgroundColorOpacityHover,
		overlayBorder,
		overlayBorderRadius,
		overlayBackgroundGradient,
		overlayBackgroundGradientOpacity,
		overlayBackgroundGradientOpacityHover,
		overlayBackgroundImage,
		overlayDisplayOnHover,
		overlayDisplayAnimation,
		htmlAnchor,
		captionCSSClasses,
		hideOnMobile,
		hideOnTablet,
		hideOnDesktop,
	} = attributes;

	const innerBlockProps = useInnerBlocksProps(
		{
			className: classnames( `dlx-photo-caption-block__inner-blocks dlx-photo-block__caption ${ globalStyle }`, {
				'has-smart-styles': ( 'advanced' === mode && 'data' !== photoMode && 'featuredImage' !== photoMode && enableSmartStyles ),
			} ),
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
		if ( inQueryLoop ) {
			currentPostId = postId;
		} else {
			currentPostId = wp.data.select( 'core/editor' ).getCurrentPostId();
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
				postId: getPostId(),
			},
			`${ photoBlock.restUrl + '/get-caption-by-post-id' }`,
			'POST'
		)
			.then( ( response ) => {
				const { data, success } = response.data;
				if ( ! success ) {
					return;
				}
				setCaption( data.caption );
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
		if ( 'featuredImage' === currentScreen ) {
			getCaptionFromData();
		}
		if ( imageData.id === 0 ) {

		}
	}, [ photoMode, imageData, globalStyle ] );

	// Select the richtext input and focus on it if block is selected and mode is single line.
	useEffect( () => {
		if ( 'single' === mode && isSelected && null !== captionInputRef ) {
			captionInputRef.focus();
		}
	}, [ isSelected, captionInputRef ] );

	const [ blockFontFamilies, setBlockFamilies ] = useState( fontFamilies );

	const [ blockLevelFontFamilies ] = useSettings( 'typography.fontFamilies' );

	useEffect( () => {
		if ( blockLevelFontFamilies ) {
			const themeFontFamilies = [];
			const { theme } = blockLevelFontFamilies;
			theme.forEach( ( font ) => {
				themeFontFamilies.push( {
					label: font.name,
					value: font.fontFamily,
				} );
			} );
			const mergedFontFamilies = blockFontFamilies.concat( themeFontFamilies );
			/**
			 * Filter: Filter the font families available for the block.
			 *
			 * @param {Array} fontFamilies - The font families.
			 */
			setBlockFamilies(
				applyFilters(
					'dlx_photo_block_font_families',
					mergedFontFamilies
				)
			);
		}
	}, [ blockLevelFontFamilies ] );

	const settingsInspectorControls = (
		<>
			{ 'overlay' === captionPosition && (
				<PanelBody
					title={ __( 'Overlay Settings', 'photo-block' ) }
					initialOpen={ true }
				>
					<SelectControl
						label={ __( 'Overlay Vertical Position' ) }
						value={ overlayVerticalPosition }
						options={ [
							{ label: __( 'Top', 'photo-block' ), value: 'top' },
							{ label: __( 'Middle', 'photo-block' ), value: 'middle' },
							{ label: __( 'Bottom', 'photo-block' ), value: 'bottom' },
						] }
						onChange={ ( value ) => {
							setAttributes( {
								overlayVerticalPosition: value,
							} );
						} }
					/>
					<SelectControl
						label={ __( 'Overlay Horizontal Position', 'photo-block' ) }
						value={ overlayHorizontalPosition }
						options={ [
							{ label: __( 'Left', 'photo-block' ), value: 'left' },
							{ label: __( 'Center', 'photo-block' ), value: 'center' },
							{ label: __( 'Right', 'photo-block' ), value: 'right' },
						] }
						onChange={ ( value ) => {
							setAttributes( {
								overlayHorizontalPosition: value,
							} );
						} }
					/>
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
					<ToggleControl
						label={ __( 'Display Overlay on Hover', 'photo-block' ) }
						checked={ overlayDisplayOnHover }
						onChange={ ( value ) => {
							setAttributes( {
								overlayDisplayOnHover: value,
							} );
						} }
						help={ __( 'Display the overlay only when the image is hovered over.', 'photo-block' ) }
					/>
					{
						overlayDisplayAnimation && (
							<SelectControl
								label={ __( 'Display Animation', 'photo-block' ) }
								value={ overlayDisplayAnimation }
								options={ [
									{ label: __( 'Fade', 'photo-block' ), value: 'fade' },
									{ label: __( 'Slide Left', 'photo-block' ), value: 'slide-left' },
									{ label: __( 'Slide Right', 'photo-block' ), value: 'slide-right' },
									{ label: __( 'Slide Up', 'photo-block' ), value: 'slide-up' },
									{ label: __( 'Slide Down', 'photo-block' ), value: 'slide-down' },
								] }
								onChange={ ( value ) => {
									setAttributes( {
										overlayDisplayAnimation: value,
									} );
								} }
							/>
						)
					}
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
						<>
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
							<ColorPickerControl
								value={ overlayBackgroundColorHover }
								key={ 'overlay-background-color-hover' }
								onChange={ ( slug, newValue ) => {
									setAttributes( { overlayBackgroundColorHover: newValue } );
								} }
								onOpacityChange={ ( newOpacity ) => {
									setAttributes( { overlayBackgroundColorOpacityHover: newOpacity } );
								} }
								label={ __( 'Overlay Color (on Hover)', 'highlight-and-share' ) }
								defaultColors={ photoBlock.palette }
								defaultColor={ 'rgba(0,0,0,0.5)' }
								slug={ 'overlay-background-color-hover' }
								alpha={ true }
								opacity={ overlayBackgroundColorOpacityHover }
							/>
						</>
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
							<RangeControl
								label={ __( 'Gradient Opacity on Hover', 'photo-block' ) }
								value={ overlayBackgroundGradientOpacityHover }
								onChange={ ( newValue ) => {
									setAttributes( { overlayBackgroundGradientOpacityHover: newValue } );
								} }
								min={ 0 }
								max={ 1 }
								step={ 0.01 }
							/>
						</>
					) }
					{ 'image' === overlayBackgroundType && (
						<PanelRow>
							<BackgroundSelectorControl
								label={ __( 'Overlay Background Image', 'photo-block' ) }
								values={ overlayBackgroundImage }
								onValuesChange={ ( newValue ) => {
									setAttributes( { overlayBackgroundImage: newValue } );
								} }
							/>
						</PanelRow>
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
				{ ( 'data' === photoMode || 'single' === mode || 'featuredImage' === photoMode ) && (
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
									options={ blockFontFamilies }
									help={ __( 'Set the font family for common elements such as paragraphs and quotes.', 'photo-block' ) }
								/>
								<SelectControl
									label={ __( 'Headings Font Family', 'photo-block' ) }
									value={ captionHeadingsFontFamily }
									onChange={ ( newValue ) => {
										setAttributes( { captionHeadingsFontFamily: newValue } );
									} }
									options={ blockFontFamilies }
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
				{ ( 'data' === photoMode || 'single' === mode || 'featuredImage' === photoMode ) && (
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

	const advancedInspectorControls = (
		<>
			{
				! hasGlobalStyle( globalStyle ) && (
					<>
						<PanelRow>
							<TextControl
								label={ __( 'HTML Anchor', 'photo-block' ) }
								value={ htmlAnchor }
								onChange={ ( value ) => {
									setAttributes( { htmlAnchor: value } );
								} }
								help={ __( 'Enter a word or two — without spaces — to make a unique web address just for this caption, called an "anchor." Then, you\'ll be able to link directly to this caption on your page.', 'photo-block' ) }
							/>
						</PanelRow>
						<PanelRow>
							<TextControl
								label={ __( 'Caption CSS Class(es)', 'photo-block' ) }
								value={ captionCSSClasses }
								onChange={ ( value ) => {
									setAttributes( { imageCSSClasses: value } );
								} }
								help={ __( 'Add CSS class(es) directly to the figcaption tag.', 'photo-block' ) }
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
			}
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
		<>
			{ ! hasGlobalStyle( globalStyle ) && (
				<>
					{ settingsInspectorControls }
					{ styleInspectorControls }
				</>
			) }
			{ hasGlobalStyle( globalStyle ) && (
				<>
					<Notice
						message={ __( 'Caption settings are controlled by global styles.', 'photo-block' ) }
						status="info"
						politeness="polite"
						icon={ Info }
					/>
				</>
			) }
		</>
	);

	const localToolbar = (
		<BlockControls>
			{
				( ( 'data' === photoMode || 'single' === mode || 'featuredImage' === photoMode ) && 'overlay' !== captionPosition ) && (
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
			{
				! hasGlobalStyle( globalStyle ) && (
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
				)
			}
			{ ( 'data' !== photoMode && 'featuredImage' !== photoMode && ! hasGlobalStyle( globalStyle ) ) && (
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
						setHasCaption( false );
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
								setCaptionPosition( 'bottom' );
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
		if ( attributes.uniqueId !== uniqueId ) {
			setAttributes( { uniqueId } );
		}
	}, [ blockUniqueId ] );

	const htmlToReactParser = new HtmlToReactParser();

	/**
	 * Get the caption for display.
	 *
	 * @return {JSX.Element} The caption.
	 */
	const getCaption = () => {
		const figClasses = classnames( `dlx-photo-block__caption ${ globalStyle } align${ captionAlign } ${ globalStyleCSSClassName }`, {
			'has-smart-styles': ( 'advanced' === mode && 'data' !== photoMode && 'featuredImage' !== photoMode ),
		} );

		// If we're in data mode or a featured image, show the dynamic caption.
		if ( 'data' === photoMode || 'featuredImage' === currentScreen ) {
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
						id="search-dlx-caption"
						name="search-dlx-caption"
						ref={ setCaptionInputRef }
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

	let styles = '';
	if ( ! hasGlobalStyle( globalStyle ) ) {
		styles = getStyles( attributes, deviceType, uniqueId );
	}

	/**
	 * Get overlay container classes.
	 */
	const overlayStyles = classnames(
		'dlx-photo-block__caption-overlay',
		`overlay-type-${ overlayBackgroundType }`,
		{
			'is-overlay': 'overlay' === captionPosition,
			'overlay-vertical-bottom': 'bottom' === overlayVerticalPosition,
			'overlay-vertical-middle': 'middle' === overlayVerticalPosition,
			'overlay-vertical-top': 'top' === overlayVerticalPosition,
			'overlay-horizontal-left': 'left' === overlayHorizontalPosition,
			'overlay-horizontal-center': 'center' === overlayHorizontalPosition,
			'overlay-horizontal-right': 'right' === overlayHorizontalPosition,
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
			<InspectorAdvancedControls>{ advancedInspectorControls }</InspectorAdvancedControls>
			{ localInspectorControls }
			{ localToolbar }
			<div
				className={
					classnames(
						'dlx-photo-block__caption-wrapper',
						{
							'overlay-display-hover': 'overlay' === captionPosition && overlayDisplayOnHover,
							'overlay-slide-down': overlayDisplayAnimation === 'slide-down',
							'overlay-slide-up': overlayDisplayAnimation === 'slide-up',
							'overlay-slide-left': overlayDisplayAnimation === 'slide-left',
							'overlay-slide-right': overlayDisplayAnimation === 'slide-right',
						}
					)
				}
			>
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

	if ( null === blockUniqueId ) {
		return null;
	}

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
