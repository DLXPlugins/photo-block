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

const getStyles = (attributes, deviceType, uniqueId ) => {
	const {
		containerWidth,
		containerHeight,
		containerMinWidth,
		containerMinHeight,
		containerMaxWidth,
		containerMaxHeight,
		photoPaddingSize,
		photoMarginSize,
		photoBorderRadius,
		photoDropShadow,
		photoObjectPosition,
		photoOpacity,
		photoBackgroundColor,
		photoObjectPositionCustom,
		photoBorder,
		photoBlur,
		photoObjectFit,
		captionCustomTypography,

	} = attributes;
	let styles = `
		#${ uniqueId } .dlx-photo-block__image-wrapper {
			background: ${ photoBackgroundColor };
			${ getValueWithUnit( deviceType, containerWidth, 'width' ) }
			${ getValueWithUnit( deviceType, containerHeight, 'height' ) }
			${ getValueWithUnit( deviceType, containerMinWidth, 'min-width' ) }
			${ getValueWithUnit( deviceType, containerMinHeight, 'min-height' ) }
			${ getValueWithUnit( deviceType, containerMaxWidth, 'max-width' ) }
			${ getValueWithUnit( deviceType, containerMaxHeight, 'max-height' ) }
			border-radius: ${ buildDimensionsCSS( photoBorderRadius, deviceType ) };
		}
		#${ uniqueId } img {
			opacity: ${ photoOpacity };
			${ photoBlur ? `filter: blur(${ photoBlur }px);` : '' }
			object-fit: ${ photoObjectFit };
			${ 'none' !== photoObjectFit ? 'height: 100%; width: 100%;' : '' }
			${
	'none' !== photoObjectFit && 'custom' !== photoObjectPosition
		? 'object-position:' + photoObjectPosition + ';'
		: ''
}
			${
	'none' !== photoObjectFit &&
				'custom' === photoObjectPosition &&
				'' !== photoObjectPositionCustom
		? 'object-position:' + photoObjectPositionCustom + ';'
		: ''
}
			padding: ${ buildDimensionsCSS( photoPaddingSize, deviceType ) };
			margin: ${ buildDimensionsCSS( photoMarginSize, deviceType ) };
			border-radius: ${ buildDimensionsCSS( photoBorderRadius, deviceType ) };
			${ buildBorderCSS( photoBorder, deviceType ) }
		}
	`;
	// Apply outer margin to container.
	styles += `#${ uniqueId } .dlx-photo-block__figure { margin: ${ buildDimensionsCSS( photoMarginSize, deviceType ) }; }`;
	if ( photoDropShadow.enabled ) {
		styles += `
			#${ uniqueId } img {
				box-sizing: border-box;
				box-shadow: ${ photoDropShadow.inset ? 'inset ' : '' }${
	photoDropShadow.horizontal
}px ${ photoDropShadow.vertical }px ${ photoDropShadow.blur }px ${
	photoDropShadow.spread
}px ${ getColor( photoDropShadow.color, photoDropShadow.opacity ) };
				-webkit-box-shadow: ${ photoDropShadow.inset ? 'inset ' : '' }${
	photoDropShadow.horizontal
}px ${ photoDropShadow.vertical }px ${ photoDropShadow.blur }px ${
	photoDropShadow.spread
}px ${ getColor( photoDropShadow.color, photoDropShadow.opacity ) };
			}
		`;
	}
	return styles;
}

export default getStyles;
