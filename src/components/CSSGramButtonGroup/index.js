/**
 * Upload data row including Upload|Media Library|URL|Data.
 */
import './editor.scss';

import {
	ButtonGroup,
	BaseControl,
} from '@wordpress/components';

import { useContext, useState } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import blockStore from '../../store';
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

	const { cssGramFilter } = attributes;

	const {
		imageData,
	} = useSelect( ( select ) => {
		const { getImageData } = select( blockStore );
		return {
			imageData: getImageData(),
		};
	} );

	const [ currentFilter, setCurrentFilter ] = useState( cssGramFilter );

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
									fullUrl={ imageData.url }
									photo={ attributes.imageData }
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
