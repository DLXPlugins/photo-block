import './editor.scss';
import {
	ToggleControl,
	SelectControl,
	RangeControl,
	PanelRow,
	TextControl,
	BaseControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import {
	Shrink,
	Droplet,
	Wand2,
	Maximize,
	Globe,
} from 'lucide-react';
import PropTypes from 'prop-types';
import { useSelect } from '@wordpress/data';
import ColorPickerControl from '../../components/ColorPicker';
import DropShadowControl from '../../components/DropShadow';
import CSSGramButtonGroup from '../../components/CSSGramButtonGroup';
import SizeResponsiveControl from '../../components/SizeResponsive';
import useDeviceType from '../../hooks/useDeviceType';
import DimensionsResponsiveControl from '../../components/DimensionsResponsive';
import BorderResponsiveControl from '../../components/BorderResponsive';
import PanelBodyControl from '../../components/PanelBody';
import GlobalStyles from '../GlobalStyles';
import globalStylesStore from '../../store/global-styles';

const canSavePresets = photoBlockUser.canSavePresets;

/**
 * Height units.
 */
const heightUnits = [ 'px', 'em', 'rem', '%', 'vh' ];

const SidebarImageInspectorControl = ( props ) => {
	const { attributes, setAttributes, blockUniqueId } = props;
	const {
		uniqueId,
		photoOpacity,
		photoBlur,
		photoObjectFit,
		photoObjectPosition,
		photoObjectPositionCustom,
		photoDropShadow,
		photoBackgroundColor,
		photoBackgroundColorOpacity,
		containerHeight,
		containerMaxWidth,
		containerMaxHeight,
		containerMinWidth,
		containerMinHeight,
		photoPaddingSize,
		photoMarginSize,
		globalStyle,
		photoBorderRadius,
		photoBorder,
		containerWidth,
	} = attributes;

	const [ deviceType ] = useDeviceType( 'Desktop' );

	// Get global style data.
	const {
		hasGlobalStyle,
	} = useSelect( ( select ) => {
		return {
			hasGlobalStyle: select( globalStylesStore ).hasGlobalStyle,
		};
	} );

	const stylesInspectorControls = (
		<>
			{ ! hasGlobalStyle( globalStyle ) && (
				<>
					<PanelBodyControl
						title={ __( 'Image Styles', 'photo-block' ) }
						icon={ <Droplet /> }
						className="photo-block__inspector-panel"
						id="photo-block__photo-image-styles"
						uniqueId={ uniqueId }
						initialOpen={ true }
						scrollAfterOpen={ false }
					>
						<ColorPickerControl
							value={ photoBackgroundColor }
							key={ 'background-color-photo' }
							onChange={ ( slug, newValue, color ) => {
								setAttributes( { photoBackgroundColor: newValue } );
							} }
							label={ __( 'Background Color', 'highlight-and-share' ) }
							defaultColors={ photoBlock.palette }
							defaultColor={ 'transparent' }
							slug={ 'background-color-photo' }
							alpha={ true }
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
							blockUniqueId={ blockUniqueId }
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
							allowNegatives={ false }
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
							allowNegatives={ false }
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
							allowNegatives={ false }
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
						{ 'none' !== photoObjectFit && (
							<PanelRow>
								<SelectControl
									label={ __( 'Object Position', 'photo-block' ) }
									value={ photoObjectPosition }
									options={ [
										{ label: __( 'None', 'photo-block' ), value: 'none' },
										{ label: __( 'Top', 'photo-block' ), value: 'top' },
										{ label: __( 'Right', 'photo-block' ), value: 'right' },
										{ label: __( 'Bottom', 'photo-block' ), value: 'bottom' },
										{ label: __( 'Left', 'photo-block' ), value: 'left' },
										{ label: __( 'Custom', 'photo-block' ), value: 'custom' },
									] }
									onChange={ ( newObjectPosition ) => {
										setAttributes( { photoObjectPosition: newObjectPosition } );
									} }
									help={ __(
										'How the image should be positioned inside the container.',
										'photo-block'
									) }
								/>
							</PanelRow>
						) }
						{ ( 'none' !== photoObjectFit && 'custom' === photoObjectPosition ) && (
							<PanelRow>
								<TextControl
									label={ __( 'Custom Object Position', 'photo-block' ) }
									value={ photoObjectPositionCustom }
									onChange={ ( newObjectPositionCustom ) => {
										setAttributes( {
											photoObjectPositionCustom: newObjectPositionCustom,
										} );
									} }
									help={ __(
										'Enter a custom object position in CSS format.',
										'photo-block'
									) }
								/>
							</PanelRow>
						) }
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
			) }
			{ canSavePresets && (
				<PanelBodyControl
					title={ __( 'Global Styles', 'photo-block' ) }
					initialOpen={ false }
					icon={ <Globe /> }
					className="photo-block__inspector-panel"
					id="photo-block__photo-global-styles"
					uniqueId={ uniqueId }
					scrollAfterOpen={ false }
				>
					<PanelRow>
						<BaseControl
							label={ __( 'Global Styles', 'photo-block' ) }
							id="photo-block-global-styles"
							className="photo-block-global-styles"
						>
							<GlobalStyles { ...props } globalStyle={ props.globalStyle } />
						</BaseControl>
					</PanelRow>
				</PanelBodyControl>
			) }
		</>
	);
	return (
		<>
			{ stylesInspectorControls }
		</>
	);
};

SidebarImageInspectorControl.defaultProps = {
	attributes: {},
	setAttributes: () => {},
};

SidebarImageInspectorControl.propTypes = {
	attributes: PropTypes.object,
};

export default SidebarImageInspectorControl;
