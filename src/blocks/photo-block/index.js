import metadata from './block.json';
import { registerBlockType, createBlock } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import Edit from './edit';
import PhotoBlockIcon from '../../components/Icons/PhotoBlockIcon';

registerBlockType( metadata, {
	icon: PhotoBlockIcon,
	edit: Edit,

	// Render via PHP
	save() {
		return <InnerBlocks.Content />;
	},
	transforms: {
		from: [
			{
				type: 'enter',
				regExp: /^photoblock$/,
				transform: () => createBlock( 'dlxplugins/photo-block' ),
			},
			{
				type: 'block',
				blocks: [ 'generateblocks/media' ],
				transform: ( attributes ) => {		// Try to get the featured image from the media block.
					const maybeFeaturedImage = attributes?.htmlAttributes?.src || '';
					let inQueryLoop = false;

					// If src has featured_image string, then we can use it as a featured image.
					if ( maybeFeaturedImage.includes( 'featured_image' ) ) {
						inQueryLoop = true;
					}

					const newAttributes = {
						uniqueId: attributes?.uniqueId || '',
						mediaLinkNewTab: attributes?.linkHtmlAttributes?.target === '_blank',
						imageSize: 'large', /* GB 2.0 doesn't store image size */
						photoMode: 'featuredImage',
						inQueryLoop,
						screen: 'featuredImage',
						imageData: {
							id: 0,
							url: '',
							alt: '',
							full: '',
							width: '',
							height: '',
							attachment_link: '',
							title: '',
							caption: '',
						},
					};
					if ( ! inQueryLoop ) {
						newAttributes.imageData = {
							id: attributes.mediaId,
							url: attributes?.htmlAttributes?.src,
							alt: attributes?.htmlAttributes?.alt || '',
							full: attributes?.htmlAttributes?.src,
							title: attributes?.htmlAttributes?.title || '',
						};
						newAttributes.photoMode = 'photo';
						newAttributes.screen = 'edit';
					}
					return createBlock( 'dlxplugins/photo-block', {
						...newAttributes,
					} );
				},
			},
			{
				type: 'block',
				blocks: [ 'kadence/image' ],
				transform: ( attributes ) => {
					const inQueryLoop = attributes.inQueryBlock || false;
					const newAttributes = {
						uniqueId: attributes.uniqueID,
						photoMode: 'featuredImage',
						inQueryLoop,
						screen: 'featuredImage',
						photoOpacity: attributes.overlayOpacity * 100, // Assuming overlayOpacity is 0-1, converting to percentage
						photoDropShadow: {
							enabled: attributes.displayDropShadow,
							color: attributes.dropShadow[ 0 ]?.color,
							blur: attributes.dropShadow[ 0 ]?.blur,
							opacity: attributes.dropShadow[ 0 ]?.opacity,
							horizontal: attributes.dropShadow[ 0 ]?.hOffset,
							vertical: attributes.dropShadow[ 0 ]?.vOffset,
						},
						photoBackgroundColor: attributes.backgroundColor,
						mediaLinkUrl: attributes.link,
						mediaLinkNewTab: attributes.linkTarget,
						imageData: {
							id: 0,
							url: '',
							alt: '',
							full: '',
							width: '',
							height: '',
							attachment_link: '',
							title: '',
							caption: '',
						},
					};
					if ( ! inQueryLoop ) {
						newAttributes.imageData = {
							id: attributes.id,
							url: attributes.url,
							alt: attributes.alt,
							full: attributes.url,
							width: attributes.width,
							height: attributes.height,
							title: '',
							caption: attributes.caption,
						};
						newAttributes.photoMode = 'photo';
						newAttributes.screen = 'edit';
					}
					return createBlock( 'dlxplugins/photo-block', {
						...newAttributes,
					} );
				},
			},
			{
				type: 'block',
				blocks: [ 'generateblocks/image' ],
				transform: ( attributes ) => {
					const dynamicType = attributes?.dynamicContentType || 'none';
					let inQueryLoop = false;
					if ( dynamicType === 'featured-image' ) {
						inQueryLoop = true;
					}
					const newAttributes = {
						uniqueId: attributes.uniqueId,
						mediaLinkNewTab: attributes.openInNewWindow,
						imageSize: attributes.sizeSlug,
						hideOnDesktop: attributes.hideOnDesktop,
						hideOnTablet: attributes.hideOnTablet,
						hideOnMobile: attributes.hideOnMobile,
						photoMode: 'featuredImage',
						inQueryLoop,
						screen: 'featuredImage',
						imageData: {
							id: 0,
							url: '',
							alt: '',
							full: '',
							width: '',
							height: '',
							attachment_link: '',
							title: '',
							caption: '',
						},
					};
					if ( ! inQueryLoop ) {
						newAttributes.imageData = {
							id: attributes.mediaId,
							url: attributes.mediaUrl,
							alt: attributes.alt,
							full: attributes.mediaUrl,
							width: attributes?.width || '',
							height: attributes?.height || '',
							title: '',
							caption: attributes?.caption || '',
						};
						newAttributes.photoMode = 'photo';
						newAttributes.screen = 'edit';
					}
					return createBlock( 'dlxplugins/photo-block', {
						...newAttributes,
					} );
				},
			},
			{
				type: 'block',
				blocks: [ 'core/image' ],
				transform: ( attributes ) => {
					const imageData = {
						id: attributes.id,
						url: attributes.url,
						alt: attributes.alt,
						full: attributes.url,
						width: attributes.width,
						height: attributes.height,
						title: '',
						caption: attributes.caption,
					};
					const imageAttributes = {
						photoMode: 'photo',
						screen: 'loading',
						imageData,
					};
					return createBlock( 'dlxplugins/photo-block', imageAttributes );
				},
			},
			{
				type: 'block',
				blocks: [ 'core/post-featured-image' ],
				transform: ( attributes ) => {
					const imageData = {
						id: attributes.id,
						url: attributes.url,
						alt: attributes.alt,
						full: attributes.url,
						width: attributes.width,
						height: attributes.height,
						title: '',
						caption: attributes.caption,
					};
					const imageAttributes = {
						photoMode: 'featuredImage',
						screen: 'loading',
						imageData,
					};
					return createBlock( 'dlxplugins/photo-block', imageAttributes );
				},
			},
		],
		to: [],
	},
} );
