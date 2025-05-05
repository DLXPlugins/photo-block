import { useMemo, useState } from 'react';
import { registerPlugin } from '@wordpress/plugins';
import { addFilter } from '@wordpress/hooks';
import { useSelect, select } from '@wordpress/data';
import getStyles from '../../blocks/photo-block/block-styles';
import getStylesCaption from '../../blocks/photo-caption-block/block-styles';

import globalStylesStore from '../../store/global-styles';

registerPlugin(
	'photo-block-global-styles',
	{
		render: () => {
			const {
				getGlobalStyleBySlug,
				getGlobalStyleRefresh,
			} = useSelect( ( newSelect ) => {
				return {
					getGlobalStyleBySlug: newSelect( globalStylesStore ).getGlobalStyleBySlug,
					getGlobalStyleRefresh: newSelect( globalStylesStore ).getGlobalStyleRefresh,
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
					newAttributes = { ...maybeGlobalStyle.content.captionAttributes };
					newAttributes.globalStyle = globalStyle;
				} else {
					newAttributes = { ...maybeGlobalStyle.content.photoAttributes };
					// Ensure global styless are not applied if overriden.
					if ( propAttributes.imageSizeOverride ) {
						newAttributes.imageSize = propAttributes.imageSize;
					}
					if ( propAttributes.mediaLinkOverride )	{
						newAttributes.mediaLinkType = propAttributes.mediaLinkType;
						newAttributes.mediaLinkTitle = propAttributes.mediaLinkTitle;
						newAttributes.mediaLinkNewTab = propAttributes.mediaLinkNewTab;
						newAttributes.mediaLinkUrl = propAttributes.mediaLinkUrl;
						newAttributes.lightboxCaption = propAttributes.lightboxCaption;
						newAttributes.lightboxEnabled = propAttributes.lightboxEnabled;
						newAttributes.lightboxShowCaption = propAttributes.lightboxShowCaption;
					}
				}

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
					const globalStyleAttributes = { ...globalStyle.content.photoAttributes };

					// Ensure global styless are not applied if overriden.
					if ( true === attributes.imageSizeOverride ) {
						globalStyleAttributes.imageSize = attributes.imageSize;
					}
					if ( true === attributes.mediaLinkOverride )	{
						globalStyleAttributes.mediaLinkType = attributes.mediaLinkType;
						globalStyleAttributes.mediaLinkTitle = attributes.mediaLinkTitle;
						globalStyleAttributes.mediaLinkUrl = attributes.mediaLinkUrl;
						globalStyleAttributes.mediaLinkAnchorId = attributes.mediaLinkAnchorId;
						globalStyleAttributes.mediaLinkClass = attributes.mediaLinkClass;
						globalStyleAttributes.mediaLinkTitle = attributes.mediaLinkTitle;
						globalStyleAttributes.mediaLinkRel = attributes.mediaLinkRel;
						globalStyleAttributes.mediaLinkNewTab = attributes.mediaLinkNewTab;
						globalStyleAttributes.lightboxCaption = attributes.lightboxCaption;
						globalStyleAttributes.lightboxEnabled = attributes.lightboxEnabled;
						globalStyleAttributes.lightboxShowCaption = attributes.lightboxShowCaption;
					}

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
