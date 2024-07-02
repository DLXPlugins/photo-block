import { useMemo, useState } from 'react';
import { registerPlugin } from '@wordpress/plugins';
import { addFilter } from '@wordpress/hooks';
import { useDispatch, useSelect, select } from '@wordpress/data';
import getStyles from '../../blocks/photo-block/block-styles';
import getStylesCaption from '../../blocks/photo-caption-block/block-styles';

const globalStyles = photoBlock?.globalStyles || [];

import globalStylesStore from '../../store/global-styles';
import { blockStore } from '../../store';

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

			const returnRealtimeBlockAttributes = ( propAttributes, globalStyle, clientId, type ) => {
				// Return if global style is defined, none, or empty.
				if ( 'undefined' === typeof ( globalStyle ) || 'none' === globalStyle || '' === globalStyle ) {
					return propAttributes;
				}

				// Get global style.
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

			addFilter( 'dlx_photo_block_attributes', 'dlx_photo_block', returnRealtimeBlockAttributes );
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

const returnBlockAttributes = ( attributes, blockType, innerBlocks ) => {
	const { name } = blockType;
	// Get attributes from settings.
	switch ( name ) {
		case 'dlxplugins/photo-block':
			// Get global style.
			if ( 'undefined' !== typeof ( attributes.globalStyle ) && 'none' !== attributes.globalStyle && '' !== attributes.globalStyle ) {
				const globalStyle = select( globalStylesStore ).getGlobalStyleBySlug( attributes.globalStyle );

				if ( Object.keys( globalStyle ).length > 0 ) {
					// Get photo block global style attributes.
					const globalStyleAttributes = globalStyle.content.photoAttributes;

					return {
						...attributes,
						...globalStyleAttributes,
					};
				}
			}

			break;
		case 'dlxplugins/photo-caption-block':
			// Get global style.
			if ( 'undefined' !== typeof ( attributes.globalStyle ) && 'none' !== attributes.globalStyle && '' !== attributes.globalStyle ) {
				const globalStyle = select( globalStylesStore ).getGlobalStyleBySlug( attributes.globalStyle );

				console.log( attributes );
				if ( Object.keys( globalStyle ).length > 0 ) {
					// Get photo block global style attributes.
					const globalStyleAttributes = globalStyle.content.captionAttributes;
					return {
						...attributes,
						...globalStyleAttributes,
					};
				}
			}
			break;
		default:
			break;
	}
	return attributes;
};
addFilter(
    'blocks.getBlockAttributes',
    'dlxplugins/photo-block',
    returnBlockAttributes
);
