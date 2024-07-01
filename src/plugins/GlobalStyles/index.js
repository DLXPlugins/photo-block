import { useMemo, useState } from 'react';
import { registerPlugin } from '@wordpress/plugins';
import { addFilter } from '@wordpress/hooks';
import { useDispatch, useSelect } from '@wordpress/data';
import getStyles from '../../blocks/photo-block/block-styles';
import getStylesCaption from '../../blocks/photo-caption-block/block-styles';

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

const devices = [ 'desktop', 'tablet', 'mobile' ];

registerPlugin(
	'photo-block-print-global-styles',
	{
		render: () => {
			const [ styles, setStyles ] = useState( '' );
			const {
				globalStyles,
			} = useSelect( ( select ) => {
				return {
					globalStyles: select( globalStylesStore ).getGlobalStyles(),
				};
			} );

			useMemo( () => {
				if ( Object.keys( globalStyles ).length === 0 ) {
					return;
				}
				const globalStylesCSS = Object.values( globalStyles ).map( ( globalStyle ) => {
					const photoAttributes = globalStyle.content.photoAttributes;
					const captionAttributes = globalStyle.content.captionAttributes;

					let photoStyles = '';
					devices.forEach( ( device ) => {
						let deviceStyles = getStyles( photoAttributes, device, globalStyle.slug, true );
						deviceStyles += getStylesCaption( captionAttributes, device, globalStyle.slug, true );
						switch ( device ) {
							case 'desktop':
								deviceStyles = '@media (min-width: 1025px) {' + deviceStyles + '}';
								break;
							case 'tablet':
								deviceStyles = '@media (min-width: 768px) and (max-width: 1024px) {' + deviceStyles + '}';
								break;
							case 'mobile':
								deviceStyles = '@media (max-width: 767px) {' + deviceStyles + '}';
								break;
						}
						photoStyles += deviceStyles;
					} );
					setStyles( photoStyles );
				} );
			}, [ globalStyles ] );

			// Don't return anything if no global styles.
			if ( '' === styles ) {
				return null;
			}

			return <style>{ styles }</style>;
		},
	}
);