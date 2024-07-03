// eslint-disable-next-line no-unused-vars
import './editor.scss';
import React, { useContext } from 'react';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { createBlock } from '@wordpress/blocks';

import { useDispatch } from '@wordpress/data';
import { Subtitles } from 'lucide-react';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { blockStore } from '../../store';

const CaptionAppender = ( {
	numBlocks,
	clientId,
	blockUniqueId,
} ) => {
	const { insertBlock, updateBlockAttributes } = useDispatch( blockEditorStore );
	const {
		setHasCaption,
	} = useDispatch( blockStore( blockUniqueId ) );

	/**
	 * Add a caption block to the main block.
	 */
	const appendBlock = () => {
		const newBlocks = createBlock( 'dlxplugins/photo-caption-block' );
		insertBlock( newBlocks, undefined, clientId );
		updateBlockAttributes( clientId, { hasCaption: true } );
	};

	// Exit if there are innerblocks.
	if ( numBlocks !== 0 ) {
		return null;
	}

	return (
		<div className="photo-block-admin__caption-appender">
			<Button
				variant="primary"
				className="dlx-photo-block__add-caption"
				label={ __( 'Add Caption', 'photo-block' ) }
				onClick={ () => {
					setHasCaption( true );
					appendBlock();
				} }
				icon={ <Subtitles /> }
			>
				{ __( 'Add Caption', 'photo-block' ) }
			</Button>
		</div>
	);
};
export default CaptionAppender;
