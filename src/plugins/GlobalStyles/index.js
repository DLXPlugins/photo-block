import { registerPlugin } from '@wordpress/plugins';
import { addFilter } from '@wordpress/hooks';
import { useDispatch, useSelect } from '@wordpress/data';

const globalStyles = photoBlock?.globalStyles || [];

import globalStylesStore from '../../store/global-styles';

registerPlugin(
	'photo-block-global-styles',
	{
		render: () => {

			const {
				getGlobalStyleBySlug,
			} = useSelect( ( select ) => {
				return {
					getGlobalStyleBySlug: select( globalStylesStore ).getGlobalStyleBySlug,
				};
			} );
			const returnBlockAttributes = ( propAttributes, globalStyle, clientId, type ) => {
				const maybeGlobalStyle = getGlobalStyleBySlug( globalStyle );
				if ( Object.keys( maybeGlobalStyle ).length === 0 ) {
					return propAttributes;
				}
				// Found a global style.
				let newAttributes = {};
				if ( 'caption' === type ) {
					newAttributes = maybeGlobalStyle.content.captionAttributes;
				} else {
					newAttributes = maybeGlobalStyle.content.photoAttributes;
				}

				// Overwrite attributes with new ones.
				return {
					...propAttributes,
					...newAttributes,
				};
			};

			addFilter( 'dlx_photo_block_attributes', 'dlx_photo_block', returnBlockAttributes );
			return null;
		},
	}
);