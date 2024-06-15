/**
 * This is the loading screen of the block.
 * It has no interface, and it's an initializer of sorts.
 */

import { useState, useEffect } from 'react';
import { useDispatch, useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { applyFilters, doAction } from '@wordpress/hooks';
import blockStore from '../../store';

// Get screens.
import InitialScreen from '../../screens/Initial';
//import EffectsScreen from '../../screens/Effects';
import EditScreen from '../../screens/Edit';
import CropScreen from '../../screens/Crop';
import DataScreen from '../../screens/Data';
import DataEditScreen from '../../screens/DataEdit';

/**
 * InitialScreen component.
 *
 * @param {Object} props - Component props.
 * @return {Function} Component.
 */
const LoadingScreen = ( props ) => {
	const [ isLoading, setIsLoading ] = useState( true );

	const {
		setImageData,
		setFilepondInstance,
		setIsUploading,
		setIsProcessingUpload,
		setPhotoMode,
		setIsUploadError,
		setInQueryLoop,
		setScreen,
		setDataScreen, /* can be 'initial' or 'edit' */
	} = useDispatch( blockStore );

	// Get current block data.
	const {
		currentScreen,
		isUploading,
		isProcessingUpload,
		isUploadError,
		filepondInstance,
		hasCaption,
		captionPosition,
		inQueryLoop,
		photoMode,
		blockUniqueId,
		dataScreen,
	} = useSelect( ( select ) => {
		return {
			currentScreen: select( blockStore ).getCurrentScreen(),
			isUploading: select( blockStore ).isUploading(),
			isProcessingUpload: select( blockStore ).isProcessingUpload(),
			isUploadError: select( blockStore ).isUploadError(),
			filepondInstance: select( blockStore ).getFilepondInstance(),
			hasCaption: select( blockStore ).hasCaption(),
			captionPosition: select( blockStore ).getCaptionPosition(),
			inQueryLoop: select( blockStore ).inQueryLoop(),
			photoMode: select( blockStore ).getPhotoMode(),
			blockUniqueId: select( blockStore ).getBlockUniqueId(),
			dataScreen: select( blockStore ).getDataScreen(),
		};
	} );

	const {
		context,
		attributes,
		setAttributes,
	} = props;

	/**
	 * Set up the initial screen.
	 */
	useEffect( () => {
		// Determine if we're in a query loop based on context.
		const { query, queryId, postId } = context;

		// If vars aren't undefined or null, set data screen as we're in a query loop.
		if ( typeof query !== 'undefined' && typeof postId !== 'undefined' ) {
			if ( 0 !== postId && 'none' !== query && 'undefined' !== query ) {
				setInQueryLoop( true );
				/**
				 * Filter: Determine if we're in the premium version of the plugin.
				 */
				const isPremium = applyFilters( 'dlx_photo_block_is_premium', false );
				if ( ! isPremium ) {
					// Check if attribute imageData is found, and if so, set the image data.
					if ( attributes.imageData.id !== 0 && attributes.imageData.id !== '' ) {
						setImageData( attributes.imageData );
					}
					setAttributes( { photoMode: 'featuredImage' } );
					setPhotoMode( 'featurdImage' );
					setDataScreen( 'featuredImage' );
					setScreen( 'featuredImage' );

					
					return;
				}

				/**
				 * Action: Load the initial screen if in a data request.
				 *
				 * @param {Object}  props     - The block props.
				 * @param {boolean} isPremium - Whether or not the user is using the premium version.
				 * @param {Object}  query     - The query object.
				 */
				doAction(
					'dlx_photo_block_loading_screen_data_premium',
					{
						...props,
						isPremium,
						query,
					}
				);
				return;
			}
		}

		// Set the photo mode.
		setPhotoMode( attributes.photoMode );

		console.log( 'photoMode: ' + attributes.photoMode);

		// Load the appropriate screen. The main screen logic is in blocks/photo-block/edit.js.
		switch ( attributes.photoMode ) {
			case 'none':
				setScreen( 'initial' );
				break;
			case 'url':
			case 'image':
			case 'photo':
				setScreen( 'edit' );
				break;
			case 'featuredImage':
				setScreen( 'featuredImage' );
				break;
			case 'data':
				/**
				 * Action: Set the initial screen params if data is the mode and not in a query loop
				 *
				 * @param {Object} props - The block props.
				 */
				doAction(
					'dlx_photo_block_loading_screen_data',
					{
						...props,
					}
				);
				break;
			default:
				setScreen( 'initial' );
				break;
		}
	}, [] );

	return null;
};
export default LoadingScreen;
