/**
 * This is the loading screen of the block.
 * It has no interface, and it's an initializer of sorts.
 */

import { useState, useEffect } from 'react';
import { useDispatch, useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { applyFilters, doAction } from '@wordpress/hooks';
import { blockStore } from '../../store';

// Get screens.
import InitialScreen from '../../screens/Initial';
//import EffectsScreen from '../../screens/Effects';
import EditScreen from '../../screens/Edit';
import CropScreen from '../../screens/Crop';

/**
 * InitialScreen component.
 *
 * @param {Object} props - Component props.
 * @return {Function} Component.
 */
const LoadingScreen = ( props ) => {
	const [ isLoading, setIsLoading ] = useState( true );

	const { blockUniqueId } = props;

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
	} = useDispatch( blockStore( blockUniqueId ) );

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
		dataScreen,
	} = useSelect( ( select ) => {
		return {
			currentScreen: select( blockStore( blockUniqueId ) ).getCurrentScreen(),
			isUploading: select( blockStore( blockUniqueId ) ).isUploading(),
			isProcessingUpload: select( blockStore( blockUniqueId ) ).isProcessingUpload(),
			isUploadError: select( blockStore( blockUniqueId ) ).isUploadError(),
			filepondInstance: select( blockStore( blockUniqueId ) ).getFilepondInstance(),
			hasCaption: select( blockStore( blockUniqueId ) ).hasCaption(),
			captionPosition: select( blockStore( blockUniqueId ) ).getCaptionPosition(),
			inQueryLoop: select( blockStore( blockUniqueId ) ).inQueryLoop(),
			photoMode: select( blockStore( blockUniqueId ) ).getPhotoMode(),
			blockUniqueId: select( blockStore( blockUniqueId ) ).getBlockUniqueId(),
			dataScreen: select( blockStore( blockUniqueId ) ).getDataScreen(),
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
		// If vars aren't undefined or null, set data screen as we're in a query loop.
		if ( inQueryLoop || attributes.inQueryLoop ) {
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

		// Set the photo mode.
		setPhotoMode( attributes.photoMode );
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
