import domReady from '@wordpress/dom-ready';
domReady( () => {
	if ( ! window.parent?.wp?.data ) {
		return;
	}

	const { subscribe, select, dispatch } = window.parent.wp.data;

	const seen = new Set();
	let initialized = false;

	/**
	 * Recursively process blocks and their innerBlocks.
	 *
	 * @param {Array}    blocks   Array of blocks to process.
	 * @param {Function} callback Callback function to execute for each block.
	 */
	const processBlocksRecursively = ( blocks, callback ) => {
		blocks.forEach( ( block ) => {
			callback( block );

			// Get innerBlocks for this block.
			const innerBlocks = select( 'core/block-editor' ).getBlocks( block.clientId );
			if ( innerBlocks && innerBlocks.length > 0 ) {
				processBlocksRecursively( innerBlocks, callback );
			}
		} );
	};

	const unsubscribe = subscribe( () => {
		const blocks = select( 'core/block-editor' ).getBlocks();

		// wait for all blocks.
		if ( ! initialized ) {
			if ( ! blocks.length || ! blocks.length > 0 ) {
				return;
			}

			// Prime seen set with all blocks including innerBlocks.
			processBlocksRecursively( blocks, ( block ) => {
				seen.add( block.clientId );
			} );

			initialized = true;
			return;
		}

		// React only to newly inserted blocks (including innerBlocks).
		processBlocksRecursively( blocks, ( block ) => {
			if ( seen.has( block.clientId ) ) {
				return;
			}

			seen.add( block.clientId );

			if ( block.name !== 'dlxplugins/photo-block' ) {
				return;
			}

			if ( block.attributes?.imageData?.url ) {
				dispatch( 'core/block-editor' ).updateBlockAttributes(
					block.clientId,
					{ checkImageSource: true }
				);
			}
		} );
	} );

	return () => {
		unsubscribe();
	};
} );
