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
const InitialScreen = ( props ) => {
	const { screen, isUploading, isProcessingUpload, isUploadError }	= useContext( UploaderContext );

	// Set the local inspector controls.
	const localInspectorControls = (
		<InspectorControls />
	);

	return (
		<>
			{ localInspectorControls }
			<div className="dlx-photo-block__screen-initial">
				{ ( ! isUploading && ! isProcessingUpload && ! isUploadError ) && (
					<UploadTypes />
				) }
				{ ( isUploading || isProcessingUpload || isUploadError ) && (
					<UploadStatus />
				) }
				<UploadTarget attributes={ props.attributes } setAttributes={ props.setAttributes } />
			</div>
		</>
	);
};
export default InitialScreen;
