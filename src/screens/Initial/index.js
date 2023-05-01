/**
 * This is the initial screen of the block. It is the first screen that the user sees when they add the block to the editor.
 */

import { useContext, forwardRef } from '@wordpress/element';
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
	const { isUploading, isProcessingUpload, isUploadError }	= useContext( UploaderContext );

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
