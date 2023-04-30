import { useContext, forwardRef } from '@wordpress/element';
import UploaderContext from '../../contexts/UploaderContext';
import UploadTypes from '../../components/UploadTypes';
import UploadTarget from '../../components/UploadTarget';
import UploadStatus from '../../components/UploadStatus';

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
