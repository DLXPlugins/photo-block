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
			}
		],
		to: [],
	},
} );
