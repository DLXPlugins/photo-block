/**
 * This plugin adds a toolbar to the caption block that allows you to select the parent caption block.
 * It also adds a toolbar to the caption block that allows you to select the parent photo block.
 */

import { addFilter } from '@wordpress/hooks';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { useSelect, dispatch } from '@wordpress/data';
import { createHigherOrderComponent } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { ArrowUpLeft } from 'lucide-react';

const CAPTION_BLOCK_NAME = 'dlxplugins/photo-caption-block';
const PHOTO_BLOCK_NAME = 'dlxplugins/photo-block';

const withCaptionToolbar = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const { isParentCaptionBlock, isParentPhotoBlock, captionBlockClientId, photoBlockClientId } = useSelect( ( select ) => {
			const editor = select( 'core/block-editor' );
			const clientId = editor.getSelectedBlockClientId();
			const maybeCaptionBlock = editor.getBlock( clientId );
			const maybeCaptionBlockClientIds = select( 'core/block-editor' ).getBlockParentsByBlockName( clientId, CAPTION_BLOCK_NAME );
			let parentBlock = null;
			let parentPhotoBlock = null;
			let hasPhotoBlockAsParent = false;
			if ( null !== maybeCaptionBlockClientIds && maybeCaptionBlockClientIds.length > 0 ) {
				parentBlock = select( 'core/block-editor' ).getBlock( maybeCaptionBlockClientIds[ 0 ] );
			}
			if ( null !== maybeCaptionBlock && maybeCaptionBlock.name === CAPTION_BLOCK_NAME ) {
				hasPhotoBlockAsParent = true;
				const maybePhotoBlockClientIds = select( 'core/block-editor' ).getBlockParentsByBlockName( maybeCaptionBlock.clientId, PHOTO_BLOCK_NAME );
				if ( null !== maybePhotoBlockClientIds && maybePhotoBlockClientIds.length > 0 ) {
					parentPhotoBlock = select( 'core/block-editor' ).getBlock( maybePhotoBlockClientIds[ 0 ] );
				}
			}
			return {
				isParentCaptionBlock: parentBlock?.name === CAPTION_BLOCK_NAME,
				captionBlockClientId: parentBlock?.clientId,
				isParentPhotoBlock: false, //hasPhotoBlockAsParent,
				photoBlockClientId: parentPhotoBlock?.clientId,
			};
		}, [] );
		return (
			<>
				<BlockEdit key="edit" { ...props } />
				{ isParentCaptionBlock && (
					<>
						<BlockControls>
							<ToolbarGroup>
								<ToolbarButton
									icon={ <ArrowUpLeft /> }
									label={ __( 'Select Parent Caption Block', 'photo-block' ) }
									showTooltip={ true }
									onClick={ () => {
										dispatch( 'core/block-editor' ).selectBlock( captionBlockClientId );
									} }
								>
									{ __( 'Caption', 'photo-block' ) }
								</ToolbarButton>
							</ToolbarGroup>
						</BlockControls>
					</>
				) }
				{ isParentPhotoBlock && (
					<>
						<BlockControls>
							<ToolbarGroup>
								<ToolbarButton
									icon={ <ArrowUpLeft /> }
									label={ __( 'Select Parent Photo Block', 'photo-block' ) }
									showTooltip={ true }
									onClick={ () => {
										dispatch( 'core/block-editor' ).selectBlock( photoBlockClientId );
									} }
								>
									{ __( 'Photo', 'photo-block' ) }
								</ToolbarButton>
							</ToolbarGroup>
						</BlockControls>
					</>
				) }
			</>
		);
	};
}, 'withMyPluginControls' );

addFilter(
	'editor.BlockEdit',
	'dlxplugins/photo-caption-toolbar',
	withCaptionToolbar,
	1
);
