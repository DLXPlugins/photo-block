import metadata from './block.json';
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { Subtitles } from 'lucide-react';

import Edit from './edit';

registerBlockType( metadata, {
	icon: <Subtitles fill="none" />,
	edit: Edit,

	// Render via PHP
	save() {
		return <InnerBlocks.Content />;
	},
} );
