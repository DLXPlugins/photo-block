/**
 * Uploading including showing Cancel and Retry buttons.
 */
import './editor.scss';

import { Button } from '@wordpress/components';

import { XCircle, Redo2 } from 'lucide-react';

import { forwardRef, useContext } from '@wordpress/element';

import { __ } from '@wordpress/i18n';
import UploaderContext from '../../contexts/UploaderContext';

/**
 * Upload Status component.
 *
 * @param {Object} props - Component props.
 * @param {Object} ref   - Filepond uploader reference.
 */
const UploadStatus = forwardRef( ( props, ref ) => {
	// Read in context values.
	const {
		imageFile,
		setIsUploading,
		setIsProcessingUpload,
		isUploadError,
		setIsUploadError,
	} = useContext( UploaderContext );
	return (
		<>
			<div className="dlx-photo-block__upload-status">
				<Button
					variant="secondary"
					icon={ <XCircle /> }
					onClick={ () => {
						setIsUploadError( false );
						setIsUploading( false );
						setIsProcessingUpload( false );
						ref.current.removeFile(); // start over. Go back to initial view.
					} }
				>
					{ __( 'Cancel', 'photo-block' ) }
				</Button>
				{ isUploadError && (
					<Button
						variant="secondary"
						icon={ <Redo2 /> }
						onClick={ () => {
							setIsUploading( true );
							setIsUploadError( false );
							ref.current.addFile( imageFile.file ); // Start upload process again.
						} }
					>
						{ __( 'Retry Image', 'photo-block' ) }
					</Button>
				) }
			</div>
		</>
	);
} );
export default UploadStatus;
