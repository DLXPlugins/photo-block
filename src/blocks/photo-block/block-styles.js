import { getValueWithUnit, buildDimensionsCSS, buildBorderCSS } from '../../utils/TypographyHelper';
import hexToRgba from 'hex-to-rgba';
import rgb2hex from 'rgb2hex';

/**
 * Return a color based on passed alpha value.
 *
 * @param {string} colorValue   hex, rgb, rgba, or CSS var.
 * @param {number} opacityValue The opacity (from 0 - 1).
 * @return {string} The color in hex, rgba, or CSS var format.
 */
const getColor = ( colorValue, opacityValue = 1 ) => {
	// Test for CSS var values in color value.
	if ( colorValue.indexOf( 'var(' ) === 0 ) {
		return colorValue;
	}

	// Test for RGBA at the beginning, and return value.
	if ( colorValue.indexOf( 'rgba' ) === 0 ) {
		// Calculate hex value from rgba.
		const hex = rgb2hex( colorValue ).hex;
		return hexToRgba( hex, opacityValue );
	}

	// Test for RGB at the beginning, and return hex if found.
	if ( colorValue.indexOf( 'rgb' ) === 0 ) {
		return hexToRgba( rgb2hex( colorValue ).hex, opacityValue );
	}

	if ( opacityValue < 1 ) {
		return hexToRgba( colorValue, opacityValue );
	}

	return colorValue;
};

const getStyles = (attributes, deviceType, uniqueId, useClass = false ) => {
	// If attributes are empty, return empty string.
	if ( attributes.length === 0 ) {
		return '';
	}
	const {
		containerWidth,
		containerHeight,
		containerMinWidth,
		containerMinHeight,
		containerMaxWidth,
		containerMaxHeight,
		captionPosition,
		photoPaddingSize,
		photoMarginSize,
		photoBorderRadius,
		photoDropShadow,
		photoObjectPosition,
		photoOpacity,
		photoBackgroundColor,
		photoBackgroundColorOpacity,
		photoObjectPositionCustom,
		photoBorder,
		photoBlur,
		photoObjectFit,
		captionCustomTypography,

	} = attributes;
	let styles = '';
	if ( 'overlay' === captionPosition ) {
		styles += `
			${ useClass ? '.' : '#' }${ uniqueId } .dlx-photo-block__image-wrapper {
				--photo-block-photo-background-color: ${ photoBackgroundColor };
				--photo-block-photo-background-Color-opacity: ${ photoBackgroundColorOpacity };
				--photo-block-image-width: ${ getValueWithUnit( deviceType, containerWidth, 'width' ) }
				--photo-block-image-height: ${ getValueWithUnit( deviceType, containerHeight, 'height' ) }
				--photo-block-image-min-width: ${ getValueWithUnit( deviceType, containerMinWidth, 'min-width' ) }
				--photo-block-image-min-height: ${ getValueWithUnit( deviceType, containerMinHeight, 'min-height' ) }
				--photo-block-image-max-width: ${ getValueWithUnit( deviceType, containerMaxWidth, 'max-width' ) }
				--photo-block-image-max-height: ${ getValueWithUnit( deviceType, containerMaxHeight, 'max-height' ) }
				--photo-block-image-padding: ${ buildDimensionsCSS( photoPaddingSize, deviceType ) };
				--photo-block-image-margin: ${ buildDimensionsCSS( photoMarginSize, deviceType ) };
				${ buildBorderCSS( photoBorder, deviceType, '--photo-block-image' ) };
				--photo-block-photo-border-radius: ${ buildDimensionsCSS( photoBorderRadius, deviceType ) };
			}
			${ useClass ? '.' : '#' }${ uniqueId } .dlx-photo-block__image-wrapper img {
				--photo-block-image-opacity: ${ photoOpacity };
				--photo-block-image-object-fit: ${ photoObjectFit };
				--photo-block-blur: ${ photoBlur }px;
				--photo-block-image-width: ${ 'none' !== photoObjectFit ? '100%' : 'unset' };
				--photo-block-image-height: ${ 'none' !== photoObjectFit ? '100%' : 'unset' };
				--photo-block-image-object-position: ${ 'custom' === photoObjectPosition ? photoObjectPositionCustom : photoObjectPosition };
			}
		`;
		if ( photoDropShadow.enabled ) {
			styles += `
				${ useClass ? '.' : '#' }${ uniqueId } .dlx-photo-block__image-wrapper {
					--photo-block-image-drop-shadow-horizontal: ${ photoDropShadow.horizontal }px;
					--photo-block-image-drop-shadow-vertical: ${ photoDropShadow.vertical }px;
					--photo-block-image-drop-shadow-blur: ${ photoDropShadow.blur }px;
					--photo-block-image-drop-shadow-spread: ${ photoDropShadow.spread }px;
					--photo-block-image-drop-shadow-color: ${ getColor( photoDropShadow.color, photoDropShadow.opacity ) };
				}
			`;
		}
	} else {
		styles += `
			${ useClass ? '.' : '#' }${ uniqueId } .dlx-photo-block__image-wrapper {
				--photo-block-photo-background-color: ${ photoBackgroundColor };
				--photo-block-image-width: ${ getValueWithUnit( deviceType, containerWidth, 'width' ) }
				--photo-block-image-height: ${ getValueWithUnit( deviceType, containerHeight, 'height' ) }
				--photo-block-image-min-width: ${ getValueWithUnit( deviceType, containerMinWidth, 'min-width' ) }
				--photo-block-image-min-height: ${ getValueWithUnit( deviceType, containerMinHeight, 'min-height' ) }
				--photo-block-image-max-width: ${ getValueWithUnit( deviceType, containerMaxWidth, 'max-width' ) }
				--photo-block-image-max-height: ${ getValueWithUnit( deviceType, containerMaxHeight, 'max-height' ) }
				--photo-block-photo-border-radius: ${ buildDimensionsCSS( photoBorderRadius, deviceType ) };
			}
			${ useClass ? '.' : '#' }${ uniqueId } .dlx-photo-block__image-wrapper img {
				--photo-block-image-opacity: ${ photoOpacity };
				--photo-block-image-object-fit: ${ photoObjectFit };
				--photo-block-blur: ${ photoBlur }px;
				--photo-block-image-width: ${ 'none' !== photoObjectFit ? '100%' : 'unset' };
				--photo-block-image-height: ${ 'none' !== photoObjectFit ? '100%' : 'unset' };
				--photo-block-image-object-position: ${ 'custom' === photoObjectPosition ? photoObjectPositionCustom : photoObjectPosition };
				--photo-block-image-padding: ${ buildDimensionsCSS( photoPaddingSize, deviceType ) };
				--photo-block-image-margin: ${ buildDimensionsCSS( photoMarginSize, deviceType ) };
				${ buildBorderCSS( photoBorder, deviceType, '--photo-block-image' ) };
				--photo-block-photo-border-radius: ${ buildDimensionsCSS( photoBorderRadius, deviceType ) };
			}
		`;
	}

	// Apply outer margin to container.
	styles += `${ useClass ? '.' : '#' }${ uniqueId } .dlx-photo-block__figure { --photo-block-figure-margin: ${ buildDimensionsCSS( photoMarginSize, deviceType ) }; }`;
	if ( photoDropShadow.enabled ) {
		styles += `
			.dlx-has-drop-shadow ${ useClass ? '.' : '#' }${ uniqueId } img {
				--photo-block-image-drop-shadow-horizontal: ${ photoDropShadow.horizontal }px;
				--photo-block-image-drop-shadow-vertical: ${ photoDropShadow.vertical }px;
				--photo-block-image-drop-shadow-blur: ${ photoDropShadow.blur }px;
				--photo-block-image-drop-shadow-spread: ${ photoDropShadow.spread }px;
				--photo-block-image-drop-shadow-color: ${ getColor( photoDropShadow.color, photoDropShadow.opacity ) };
			}
		`;
	}
	return styles;
};

export default getStyles;
