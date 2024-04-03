import { getValueWithUnit, buildDimensionsCSS, buildBorderCSS } from '../../utils/TypographyHelper';

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
}px ${ photoDropShadow.color };
				-webkit-box-shadow: ${ photoDropShadow.inset ? 'inset ' : '' }${
	photoDropShadow.horizontal
}px ${ photoDropShadow.vertical }px ${ photoDropShadow.blur }px ${
	photoDropShadow.spread
}px ${ photoDropShadow.color };
			}
		`;
	}
	return styles;
}

export default getStyles;