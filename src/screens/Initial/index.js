/**
 * This is the initial screen of the block. It is the first screen that the user sees when they add the block to the editor.
 */

import { useContext, forwardRef, useEffect } from '@wordpress/element';
import {
	InspectorControls,
} from '@wordpress/block-editor';
import UploaderContext from '../../contexts/UploaderContext';
import UploadTypes from '../../components/UploadTypes';
import UploadTarget from '../../components/UploadTarget';
import UploadStatus from '../../components/UploadStatus';

/**
 * InitialScreen component.
 *
 * @param {Object} props - Component props.
 * @param {Object} ref   - Filepond uploader reference.
 */
const InitialScreen = forwardRef( ( props, ref ) => {
	const { screen, setInspectorControls, isUploading, isProcessingUpload, isUploadError }	= useContext( UploaderContext );

	// Set the local inspector controls.
	const localInspectorControls = (
		<InspectorControls />
	);

	/**
	 * Set inspector controls for the screen.
	 */
	useEffect( () => {
		if ( 'initial' === screen ) {
			setInspectorControls( localInspectorControls );
		}
	}, [ screen ] );

	return (
		<div className="dlx-photo-block__screen-initial">
			{ ( ! isUploading && ! isProcessingUpload && ! isUploadError ) && (
				<UploadTypes forwardRef={ ref } />
			) }
			{ ( isUploading || isProcessingUpload || isUploadError ) && (
				<UploadStatus forwardRef={ ref } />
			) }
			<UploadTarget forwardRef={ ref } attributes={ props.attributes } setAttributes={ props.setAttributes } />
		</div>
	);
} );
export default InitialScreen;
