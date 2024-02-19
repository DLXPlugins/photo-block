import React from 'react';
import shorthandCSS from './ShorthandCSS';

const shorthandCSSUnits = ( top, topUnit, right, rightUnit, bottom, bottomUnit, left, leftUnit ) => {
	if ( '' === top && '' === right && '' === bottom && '' === left ) {
		return;
	}

	// Check if top, right, bottom, left are the strings.
	if ( 'string' !== typeof top ) {
		top = ( parseFloat( top ) != 0 && '' !== top ) ? parseFloat( top ) + topUnit + ' ' : '0 '; // eslint-disable-line eqeqeq
	} else {
		top = `${ top }${ topUnit } `;
	}
	if ( 'string' !== typeof right ) {
		right = ( parseFloat( right ) != 0 && '' !== right ) ? parseFloat( right ) + rightUnit + ' ' : '0 '; // eslint-disable-line eqeqeq
	} else {
		right = `${ right }${ rightUnit } `;
	}
	if ( 'string' !== typeof bottom ) {
		bottom = ( parseFloat( bottom ) != 0 && '' !== bottom ) ? parseFloat( bottom ) + bottomUnit + ' ' : '0 '; // eslint-disable-line eqeqeq
	} else {
		bottom = `${ bottom }${ bottomUnit } `;
	}
	if ( 'string' !== typeof left ) {
		left = ( parseFloat( left ) != 0 && '' !== left ) ? parseFloat( left ) + leftUnit + ' ' : '0 '; // eslint-disable-line eqeqeq
	} else {
		left = `${ left }${ leftUnit } `;
	}

	if ( right === left ) {
		left = '';

		if ( top === bottom ) {
			bottom = '';

			if ( top === right ) {
				right = '';
			}
		}
	}

	const output = top + right + bottom + left;

	return output.trim();
};

/**
 * Get a value with unit based on screen size.
 *
 * @param {string} screenSize  desktop|tablet|mobile.
 * @param {Object} valueObject Value object with unit.
 * @param {string} cssValue    CSS value. (e.g., width, height). Empty string if width is empty.
 *
 * @return {string} CSS value for screen size.
 */
export const getValueWithUnit = ( screenSize, valueObject, cssValue = 'width' ) => {
	const width = geHierarchicalPlaceholderValue( valueObject, screenSize, valueObject[ screenSize ].width, 'width' ); // Width is misleading as it can also be height.
	const unit = getHierarchicalValueUnit( valueObject, screenSize, valueObject[ screenSize ].unit, 'unit' );

	if ( ( '' === width || '0' === width ) || '' === unit ) {
		return '';
	}
	// Build CSS.
	return `${ cssValue }: ${ width }${ unit };`;
};

/**
 * Build CSS rules for dimensions and screen size.
 *
 * @param {Object} props      Dimensions object.
 * @param {string} screenSize mobile|tablet|desktop.
 *
 * @return {string} CSS rules.
 */
export function buildDimensionsCSS( props, screenSize ) {
	screenSize = screenSize.toLowerCase();
	const dimensions = props[ screenSize ];

	if ( 'desktop' === screenSize ) {
		const unitSync = dimensions.unitSync;
		if ( unitSync ) {
			return shorthandCSS( dimensions.top, dimensions.top, dimensions.top, dimensions.top, dimensions.topUnit );
		}
		const top = dimensions.top;
		const topUnit = dimensions.topUnit;
		const right = dimensions.right;
		const rightUnit = dimensions.rightUnit;
		const bottom = dimensions.bottom;
		const bottomUnit = dimensions.bottomUnit;
		const left = dimensions.left;
		const leftUnit = dimensions.leftUnit;

		return shorthandCSSUnits( top, topUnit, right, rightUnit, bottom, bottomUnit, left, leftUnit );
	}

	if ( 'tablet' === screenSize || 'mobile' === screenSize ) {
		if ( true === getHierarchicalValueUnit( props, screenSize, dimensions.unitSync ) ) {
			const topValue = geHierarchicalPlaceholderValue( props, screenSize, dimensions.top, 'top' );
			const topUnit = geHierarchicalPlaceholderValue( props, screenSize, dimensions.top, 'topUnit' );
			return shorthandCSS( topValue, topValue, topValue, topValue, topUnit );
		}
		const top = geHierarchicalPlaceholderValue( props, screenSize, dimensions.top, 'top' );
		const topUnit = geHierarchicalPlaceholderValue( props, screenSize, dimensions.topUnit, 'topUnit' );
		const right = geHierarchicalPlaceholderValue( props, screenSize, dimensions.right, 'right' );
		const rightUnit = geHierarchicalPlaceholderValue( props, screenSize, dimensions.rightUnit, 'rightUnit' );
		const bottom = geHierarchicalPlaceholderValue( props, screenSize, dimensions.bottom, 'bottom' );
		const bottomUnit = geHierarchicalPlaceholderValue( props, screenSize, dimensions.bottomUnit, 'bottomUnit' );
		const left = geHierarchicalPlaceholderValue( props, screenSize, dimensions.left, 'left' );
		const leftUnit = geHierarchicalPlaceholderValue( props, screenSize, dimensions.leftUnit, 'leftUnit' );

		return shorthandCSSUnits( top, topUnit, right, rightUnit, bottom, bottomUnit, left, leftUnit );
	}

	return '';
}

/**
 * Build CSS rules for border and screen size.
 *
 * @param {Object} props      Dimensions object.
 * @param {string} screenSize mobile|tablet|desktop.
 *
 * @return {string} CSS rules.
 */
export function buildBorderCSS( props, screenSize ) {
	screenSize = screenSize.toLowerCase();
	const border = props[ screenSize ];

	if ( true === getHierarchicalValueUnit( props, screenSize, border.unitSync, 'unitSync' ) ) {
		const topValue = geHierarchicalPlaceholderValue( props, screenSize, border.top.width, 'top', 'width' );
		const topUnit = geHierarchicalPlaceholderValue( props, screenSize, border.top.unit, 'top', 'unit' );
		const topColor = geHierarchicalPlaceholderValue( props, screenSize, border.top.color, 'top', 'color' );
		const topBorderStyle = geHierarchicalPlaceholderValue( props, screenSize, border.top.borderStyle, 'top', 'borderStyle' );
		return `border: ${ topValue }${ topUnit } ${ topBorderStyle } ${ topColor };`;
	}

	const top = geHierarchicalPlaceholderValue( props, screenSize, border.top.width, 'top', 'width' );
	const topUnit = geHierarchicalPlaceholderValue( props, screenSize, border.top.unit, 'top', 'unit' );
	const topColor = geHierarchicalPlaceholderValue( props, screenSize, border.top.color, 'top', 'color' );
	const topBorderStyle = geHierarchicalPlaceholderValue( props, screenSize, border.top.borderStyle, 'top', 'borderStyle' );
	const right = geHierarchicalPlaceholderValue( props, screenSize, border.right.width, 'right', 'width' );
	const rightUnit = geHierarchicalPlaceholderValue( props, screenSize, border.right.unit, 'right', 'unit' );
	const rightColor = geHierarchicalPlaceholderValue( props, screenSize, border.right.color, 'right', 'color' );
	const rightBorderStyle = geHierarchicalPlaceholderValue( props, screenSize, border.right.borderStyle, 'right', 'borderStyle' );
	const bottom = geHierarchicalPlaceholderValue( props, screenSize, border.bottom.width, 'bottom', 'width' );
	const bottomUnit = geHierarchicalPlaceholderValue( props, screenSize, border.bottom.unit, 'bottom', 'unit' );
	const bottomColor = geHierarchicalPlaceholderValue( props, screenSize, border.bottom.color, 'bottom', 'color' );
	const bottomBorderStyle = geHierarchicalPlaceholderValue( props, screenSize, border.bottom.borderStyle, 'bottom', 'borderStyle' );
	const left = geHierarchicalPlaceholderValue( props, screenSize, border.left.width, 'left', 'width' );
	const leftUnit = geHierarchicalPlaceholderValue( props, screenSize, border.left.unit, 'left', 'unit' );
	const leftColor = geHierarchicalPlaceholderValue( props, screenSize, border.left.color, 'left', 'color' );
	const leftBorderStyle = geHierarchicalPlaceholderValue( props, screenSize, border.left.borderStyle, 'left', 'borderStyle' );

	let CSSRule = '';
	CSSRule += `border-top: ${ top }${ topUnit } ${ topBorderStyle } ${ topColor };`;
	CSSRule += `border-right: ${ right }${ rightUnit } ${ rightBorderStyle } ${ rightColor };`;
	CSSRule += `border-bottom: ${ bottom }${ bottomUnit } ${ bottomBorderStyle } ${ bottomColor };`;
	CSSRule += `border-left: ${ left }${ leftUnit } ${ leftBorderStyle } ${ leftColor };`;
	return CSSRule;
}

/**
 * Get a value placeholder based on hierarchy. If the value is not set, get the value from the parent.
 *
 * @param {Object} props      Values object.
 * @param {string} screenSize mobile|tablet|desktop.
 * @param {string} value      Current value.
 * @param {string} type       Type of value (fontFamily, fontSize, fontWeight, letterSpacing, etc.).
 * @param {string} subType    Sub type of value (top: width, unit, color).
 *
 * @return {string} Value placeholder.
 */
export function geHierarchicalPlaceholderValue( props, screenSize, value, type, subType = '' ) {
	// Check mobile screen size.
	if ( 'mobile' === screenSize && '' === value ) {
		// Check tablet.
		if ( subType && props.tablet[ type ][ subType ] !== '' ) {
			return props.tablet[ type ][ subType ];
		} else if ( subType && props.desktop[ type ][ subType ] !== '' ) {
			// Check desktop.
			return props.desktop[ type ][ subType ];
		} else if ( props.tablet[ type ] !== '' ) {
			return props.tablet[ type ];
		} else if ( props.desktop[ type ] !== '' ) {
			return props.desktop[ type ];
		}
	}

	// Check tablet screen size.
	if ( 'tablet' === screenSize && '' === value ) {
		if ( subType && props.desktop[ type ][ subType ] !== '' ) {
			// Check desktop.
			return props.desktop[ type ][ subType ];
		} else if ( props.desktop[ type ] !== '' ) {
			return props.desktop[ type ];
		}
	}

	if ( '' !== value ) {
		return value;
	}

	return '';
}

/**
 * Get a value placeholder based on hierarchy. If the value is not set, get the value from the parent.
 *
 * @param {Object} props      Values object.
 * @param {string} screenSize mobile|tablet|desktop.
 * @param {string} value      Current value.
 * @param {string} type       Type of value (fontSizeUnit, etc.).
 * @param {string} subType    Sub type of value (top: width, unit, color).
 *
 * @return {string} Value default or hierarchical value.
 */
export function getHierarchicalValueUnit( props, screenSize, value, type, subType = '' ) {
	// Check mobile screen size.
	if ( 'mobile' === screenSize && null === value ) {
		if ( subType && props.tablet[ type ][ subType ] !== null ) {
			return props.tablet[ type ][ subType ];
		} else if ( subType && props.desktop[ type ][ subType ] !== null ) {
			return props.desktop[ type ][ subType ];
		} else if ( props.tablet[ type ] !== null ) {
			return props.tablet[ type ];
		} else if ( props.desktop[ type ] !== null ) {
			return props.desktop[ type ];
		}
	}

	if ( 'tablet' === screenSize && null === value ) {
		if ( subType && props.desktop[ type ][ subType ] !== null ) {
			return props.desktop[ type ][ subType ];
		} else if ( props.desktop[ type ] !== null ) {
			return props.desktop[ type ];
		}
	}

	if ( null === value ) {
		return 'px';
	}

	return value;
}

/**
 * Get a value based on hierarchy. If the value is not set, get the value from the parent.
 *
 * @param {Object} props      Values object.
 * @param {string} screenSize mobile|tablet|desktop.
 * @param {string} value      Current value.
 *
 * @return {boolean} Value default or hierarchical value.
 */
export function getHierarchicalValueUnitSync( props, screenSize, value ) {
	// Check mobile screen size.
	if ( 'mobile' === screenSize && null === value ) {
		if ( null === props.tablet.unitSync ) {
			return props.desktop.unitSync;
		}
		return props.tablet.unitSync;
	}
	if ( 'tablet' === screenSize && null === value ) {
		return props.desktop.unitSync;
	}
	if ( null === value ) {
		return true;
	}
	return value;
}
