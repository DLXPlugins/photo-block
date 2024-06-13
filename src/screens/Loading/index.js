/**
 * This is the loading screen of the block.
 * It has no interface, and it's an initializer of sorts.
 */

import { useState, useEffect } from 'react';
import { useDispatch, useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
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
		const { query, queryId } = context;

		// If vars aren't undefined or null, set data screen as we're in a query loop.
		if ( typeof query !== 'undefined' && typeof queryId !== 'undefined' ) {
			// We're in a loop.
			setInQueryLoop( true );
			setAttributes( { photoMode: 'data' } );
			setPhotoMode( 'data' );
			setDataScreen( 'edit' );
			setScreen( 'data' );
			return;
		}

		// Set the photo mode.
		setPhotoMode( attributes.photoMode );

		console.log( attributes.photoMode );


		// Load the appropriate screen. The main screen logic is in blocks/photo-block/edit.js.
		switch ( attributes.photoMode ) {
			case 'none':
				setScreen( 'initial' );
				break;
			case 'url':
			case 'image':
				setScreen( 'edit' );
				break;
			case 'data':
				if ( attributes.dataScreen === 'initial' ) {
					setDataScreen( 'initial' );
					setScreen( 'data' );
				} else {
					setDataScreen( 'edit' );
					setScreen( 'data-edit' );
				}
				break;
			default:
				setScreen( 'initial' );
				break;
		}
	}, [] );

	

	return null;
};
export default LoadingScreen;
