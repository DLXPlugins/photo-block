/**
 * Upload data row including Upload|Media Library|URL|Data.
 */
import './editor.scss';

import {
	PanelBody,
	PanelRow,
	TextControl,
	TextareaControl,
	ButtonGroup,
	Button,
	ToggleControl,
	Toolbar,
	ToolbarButton,
	Popover,
	Tooltip,
	PlaceHolder,
	BaseControl,
	RangeControl,
} from '@wordpress/components';

import { isURL, filterURLForDisplay } from '@wordpress/url';

import {
	Link2Off,
	Link2,
	Image,
	FileImage,
	ExternalLink,

} from 'lucide-react';

import { useContext, useState, useEffect, useRef } from '@wordpress/element';

import { __ } from '@wordpress/i18n';
import classnames from 'classnames';

import UploaderContext from '../../contexts/UploaderContext';
import ColorPickerControl from '../ColorPicker';
import CSSGramButtonPreview from '../CSSGramButtonPreview';

const cssGramOptions = [
	{ value: 'none', label: __( 'None', 'photo-block' ) },
	{ value: '1977', label: __( '1977', 'photo-block' ) },
	{ value: 'aden', label: __( 'Aden', 'photo-block' ) },
	{ value: 'brannan', label: __( 'Brannan', 'photo-block' ) },
	{ value: 'brooklyn', label: __( 'Brooklyn', 'photo-block' ) },
	{ value: 'clarendon', label: __( 'Clarendon', 'photo-block' ) },
	{ value: 'earlybird', label: __( 'Earlybird', 'photo-block' ) },
	{ value: 'gingham', label: __( 'Gingham', 'photo-block' ) },
	{ value: 'hudson', label: __( 'Hudson', 'photo-block' ) },
	{ value: 'inkwell', label: __( 'Inkwell', 'photo-block' ) },
	{ value: 'kelvin', label: __( 'Kelvin', 'photo-block' ) },
	{ value: 'lark', label: __( 'Lark', 'photo-block' ) },
	{ value: 'lofi', label: __( 'Lo-Fi', 'photo-block' ) },
	{ value: 'maven', label: __( 'Maven', 'photo-block' ) },
	{ value: 'mayfair', label: __( 'Mayfair', 'photo-block' ) },
	{ value: 'moon', label: __( 'Moon', 'photo-block' ) },
	{ value: 'nashville', label: __( 'Nashville', 'photo-block' ) },
	{ value: 'perpetua', label: __( 'Perpetua', 'photo-block' ) },
	{ value: 'reyes', label: __( 'Reyes', 'photo-block' ) },
	{ value: 'rise', label: __( 'Rise', 'photo-block' ) },
	{ value: 'slumber', label: __( 'Slumber', 'photo-block' ) },
	{ value: 'stinson', label: __( 'Stinson', 'photo-block' ) },
	{ value: 'toaster', label: __( 'Toaster', 'photo-block' ) },
	{ value: 'valencia', label: __( 'Valencia', 'photo-block' ) },
	{ value: 'walden', label: __( 'Walden', 'photo-block' ) },
	{ value: 'willow', label: __( 'Willow', 'photo-block' ) },
	{ value: 'xpro2', label: __( 'X-Pro II', 'photo-block' ) },
];
/**
 * CSSGramButtonGroup component.
 *
 * @param {Object} props - Component props.
 * @return {Function} Component.
 */
const CSSGramButtonGroup = ( props ) => {
	const { attributes, setAttributes } = props;

	const { photo, imageDimensions } = attributes;

	// Get context.
	const {
		imageFile,
	} = useContext( UploaderContext );

	const [ currentFilter, setCurrentFilter ] = useState( 'none' );

	return (
		<>
			<BaseControl className="dlx-photo-block__css-gram-button-group">
				<h3>{ __( 'Select a CSS Filter', 'photo-block' ) }</h3>
				<ButtonGroup>
					{
						cssGramOptions.map( ( option ) => {
							return (
								<CSSGramButtonPreview
									key={ option.value }
									isSelected={ currentFilter === option.value }
									onClick={ () => {
										setAttributes( {
											cssGramFilter: option.value,
										} );
										setCurrentFilter( option.value );
									} }
									label={ option.label }
									filter={ option.value }
									fullUrl={ imageFile.url }
									imageDimensions={ imageDimensions }
								/>
							);
						} )
					}
				</ButtonGroup>
			</BaseControl>
		</>
	);
};
export default CSSGramButtonGroup;
