/**
 * Uploading including showing Cancel and Retry buttons.
 */
import './editor.scss';

import { Button } from '@wordpress/components';

import { XCircle, Redo2 } from 'lucide-react';

import { forwardRef, useContext } from '@wordpress/element';

import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';
import blockStore from '../../store';

/**
 * Upload Status component.
 *
 * @param {Object} props - Component props.
 */
const UploadStatus = ( props ) => {
	// Read in context values.

	const {
		setIsUploading,
		setIsUploadError,
		setIsProcessingUpload,
	} = useDispatch( blockStore );
	const {
		imageData,
		isUploadError,
		filepondInstance,
	} = useSelect( ( select ) => {
		return {
			imageData: select( blockStore ).getImageData(),
			isUploadError: select( blockStore ).isUploadError(),
			filepondInstance: select( blockStore ).getFilepondInstance(),
		};
	} );

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
						filepondInstance.removeFile(); // start over. Go back to initial view.
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
							filepondInstance.addFile( imageData.file ); // Start upload process again.
						} }
					>
						{ __( 'Retry Image', 'photo-block' ) }
					</Button>
				) }
			</div>
		</>
	);
};
export default UploadStatus;
