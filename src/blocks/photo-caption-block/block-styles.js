import { getValueWithUnit, buildDimensionsCSS, buildBorderCSS, geHierarchicalPlaceholderValue, getHierarchicalValueUnit } from '../../utils/TypographyHelper';
import hexToRgba from 'hex-to-rgba';
import rgb2hex from 'rgb2hex';
import { escapeEditableHTML } from '@wordpress/escape-html';
import { isURL } from '@wordpress/url';

const getStyles = ( attributes, deviceType, uniqueId, useClass = false ) => {
	const {
		containerWidth,
		containerHeight,
		containerMinWidth,
		containerMinHeight,
		containerMaxWidth,
		captionBackgroundColor,
		captionPaddingSize,
		captionMarginSize,
		captionBorderRadius,
		captionBorder,
		captionTextColor,
		captionTypography,
		captionAlign,
		captionLinkColor,
		captionLinkHoverColor,
		captionAccentColor,
		captionSecondaryColor,
		captionTextFontFamily,
		captionHeadingsFontFamily,
		captionBaseFontSize,
		overlayBackgroundType,
		overlayBackgroundColor,
		overlayBackgroundColorHover,
		overlayBackgroundGradient,
		overlayBackgroundGradientOpacity,
		overlayBackgroundGradientOpacityHover,
		overlayBackgroundImage,
		overlayBorderRadius,
		overlayBorder,
		mode,
		photoMode,
		captionPosition,
	} = attributes;
	let styles = `
		figcaption${ useClass ? '.' : '#' }${ uniqueId } {
			--photo-block-caption-background-color: ${ captionBackgroundColor };
			--photo-block-caption-width: ${ getValueWithUnit( deviceType, containerWidth, 'width' ) }
			--photo-block-caption-height: ${ getValueWithUnit( deviceType, containerHeight, 'height' ) }
			--photo-block-caption-min-width: ${ getValueWithUnit( deviceType, containerMinWidth, 'min-width' ) }
			--photo-block-caption-min-height: ${ getValueWithUnit( deviceType, containerMinHeight, 'min-height' ) }
			--photo-block-caption-max-width: ${ getValueWithUnit( deviceType, containerMaxWidth, 'max-width' ) }
		}
		figcaption${ useClass ? '.' : '#' }${ uniqueId } {
			--photo-block-caption-padding: ${ buildDimensionsCSS( captionPaddingSize, deviceType ) };
			--photo-block-caption-margin: ${ buildDimensionsCSS( captionMarginSize, deviceType ) };
			--photo-block-caption-border-radius: ${ buildDimensionsCSS( captionBorderRadius, deviceType ) };
			--photo-block-caption-padding: ${ buildDimensionsCSS( captionPaddingSize, deviceType ) };
			--photo-block-caption-margin: ${ buildDimensionsCSS( captionMarginSize, deviceType ) };
			--photo-block-caption-border-radius: ${ buildDimensionsCSS( captionBorderRadius, deviceType ) };
			${ buildBorderCSS( captionBorder, deviceType, '--photo-block-caption' ) };
		}
	`;

	// Set colors and typography for single caption mode and data mode.
	if ( 'single' === mode || 'data' === photoMode || 'featuredImage' === photoMode ) {
		styles += `
			figcaption${ useClass ? '.' : '#' }${ uniqueId } {
				--photo-block-caption-text-color: ${ captionTextColor };
				--photo-block-caption-font-size: ${ geHierarchicalPlaceholderValue( captionTypography, deviceType, captionTypography[ deviceType ].fontSize, 'fontSize' ) }${ getHierarchicalValueUnit( captionTypography, deviceType, captionTypography[ deviceType ].fontSizeUnit, 'fontSizeUnit' ) };
				--photo-block-caption-font-weight: ${ geHierarchicalPlaceholderValue( captionTypography, deviceType, captionTypography[ deviceType ].fontWeight, 'fontWeight' ) };
				--photo-block-caption-line-height: ${ geHierarchicalPlaceholderValue( captionTypography, deviceType, captionTypography[ deviceType ].lineHeight, 'lineHeight' ) }${ getHierarchicalValueUnit( captionTypography, deviceType, captionTypography[ deviceType ].lineHeightUnit, 'lineHeightUnit' ) };
				--photo-block-caption-text-transform: ${ geHierarchicalPlaceholderValue( captionTypography, deviceType, captionTypography[ deviceType ].textTransform, 'textTransform' ) };
				--photo-block-caption-letter-spacing: ${ geHierarchicalPlaceholderValue( captionTypography, deviceType, captionTypography[ deviceType ].letterSpacing, 'letterSpacing' ) }${ getHierarchicalValueUnit( captionTypography, deviceType, captionTypography[ deviceType ].letterSpacingUnit, 'letterSpacingUnit' ) };
				--photo-block-caption-text-align: ${ captionAlign };
			}
			figcaption${ useClass ? '.' : '#' }${ uniqueId } a {
				--photo-block-caption-link-color: ${ captionLinkColor };
			}
			figcaption${ useClass ? '.' : '#' }${ uniqueId } a:hover {
				--photo-block-caption-link-color-hover: ${ captionLinkHoverColor };
			}
		`;
	}
	// Add custom caption.
	if ( 'custom' === captionTypography[ deviceType ].fontFamilySlug ) {
		styles += `
			figcaption${ useClass ? '.' : '#' }${ uniqueId } {
				--photo-block-caption-font-family: ${ captionTypography?.captionCustomTypography };
			}
		`;
	} else {
		styles += `
			figcaption${ useClass ? '.' : '#' }${ uniqueId } {
				--photo-block-caption-font-family: ${ geHierarchicalPlaceholderValue( captionTypography, deviceType, captionTypography[ deviceType ].fontFamily, 'fontFamily' ) };
			}
		`;
	}

	// Set colors and typography for advanced caption mode.
	if ( 'advanced' === mode && 'data' !== photoMode && 'featuredImage' !== photoMode ) {
		styles += `
			figcaption${ useClass ? '.' : '#' }${ uniqueId } {
				--photo-block-caption-text-color: ${ captionTextColor };
				--photo-block-caption-link-color: ${ captionAccentColor };
				--photo-block-caption-link-color-hover: ${ captionSecondaryColor };
				--photo-block-caption-font-family: ${ captionTextFontFamily };
				--photo-block-caption-headings-font-family: ${ captionHeadingsFontFamily };
				--photo-block-caption-font-size: ${ geHierarchicalPlaceholderValue( captionBaseFontSize, deviceType, captionBaseFontSize[ deviceType ].value, 'value' ) }${ getHierarchicalValueUnit( captionBaseFontSize, deviceType, captionBaseFontSize[ deviceType ].unit, 'unit' ) };
			}
		`;
	}

	// Set overlay background color if gradient.
	if ( 'overlay' === captionPosition && 'solid' === overlayBackgroundType ) {
		styles += `
			${ useClass ? '.' : '#' }${ uniqueId }.dlx-photo-block__caption-overlay:before {
				--photo-block-caption-overlay-background-color: ${ overlayBackgroundColor };
			}
			${ useClass ? '.' : '#' }${ uniqueId }.dlx-photo-block__caption-overlay:hover:before {
				--photo-block-caption-overlay-background-color-hover: ${ overlayBackgroundColorHover };
			}
		`;

		// The overlay background container needs to match overlay border radius in order to simulate masking.
		styles += `
			${ useClass ? '.' : '#' }${ uniqueId }.dlx-photo-block__caption-overlay:before {
				--photo-block-caption-overlay-border-radius: ${ buildDimensionsCSS( overlayBorderRadius, deviceType ) };
			}
		`;
	}

	// Set overlay background color if gradient.
	if ( 'overlay' === captionPosition && 'gradient' === overlayBackgroundType ) {
		styles += `
			${ useClass ? '.' : '#' }${ uniqueId }.dlx-photo-block__caption-overlay:before {
				--photo-block-caption-overlay-background-gradient: ${ overlayBackgroundGradient };
				--photo-block-caption-overlay-background-gradient-opacity: ${ overlayBackgroundGradientOpacity };
				z-index: 1;
			}
			${ useClass ? '.' : '#' }${ uniqueId }.dlx-photo-block__caption-overlay:hover:before {
				--photo-block-caption-overlay-background-gradient-opacity-hover: ${ overlayBackgroundGradientOpacityHover };
			}
		`;

		// The overlay background container needs to match overlay border radius in order to simulate masking.
		styles += `
			${ useClass ? '.' : '#' }${ uniqueId }.dlx-photo-block__caption-overlay:before {
				--photo-block-caption-overlay-border-radius: ${ buildDimensionsCSS( overlayBorderRadius, deviceType ) };
			}
		`;
	}


	// Set overlay background color if background image.
	if ( 'overlay' === captionPosition && 'image' === overlayBackgroundType && isURL( overlayBackgroundImage.url ) ) {
		styles += `
			${ useClass ? '.' : '#' }${ uniqueId }.dlx-photo-block__caption-overlay:before {
				--photo-block-caption-overlay-background-color: ${ overlayBackgroundImage.backgroundColor };
				--photo-block-caption-overlay-image: url('${ decodeURIComponent( encodeURIComponent( overlayBackgroundImage.url ) ) } ');
				--photo-block-caption-overlay-background-position: ${ escapeEditableHTML( overlayBackgroundImage.backgroundPosition ) };
				--photo-block-caption-overlay-background-repeat: ${ escapeEditableHTML( overlayBackgroundImage.backgroundRepeat ) };
				--photo-block-caption-overlay-background-size: ${ escapeEditableHTML( overlayBackgroundImage.backgroundSize ) };
				--photo-block-caption-overlay-opacity: ${ parseFloat( overlayBackgroundImage.backgroundOpacity ) };
			}
			${ useClass ? '.' : '#' }${ uniqueId }.dlx-photo-block__caption-overlay:hover:before {
				--photo-block-caption-overlay-opacity-hover: ${ parseFloat( overlayBackgroundImage.backgroundOpacityHover ) };
			}
		`;

		// The overlay background container needs to match overlay border radius in order to simulate masking.
		styles += `
			${ useClass ? '.' : '#' }${ uniqueId }.dlx-photo-block__caption-overlay:before {
				--photo-block-caption-overlay-border-radius: ${ buildDimensionsCSS( overlayBorderRadius, deviceType ) };
			}
		`;
	}

	// Set overlay padding, border, and border radius.
	if ( 'overlay' === captionPosition ) {
		styles += `
			${ useClass ? '.' : '#' }${ uniqueId }.dlx-photo-block__caption-overlay {
				--photo-block-caption-overlay-border-radius: ${ buildDimensionsCSS( captionBorderRadius, deviceType ) };
				${ buildBorderCSS( overlayBorder, deviceType, '--photo-block-caption' ) }
				overflow: hidden;
			}
		`;
	}

	return styles;
};

export default getStyles;
