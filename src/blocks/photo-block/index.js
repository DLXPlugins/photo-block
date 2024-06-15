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
		],
		to: [],
	},
} );
