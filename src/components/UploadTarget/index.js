/**
 * Upload data row including Upload|Media Library|URL|Data.
 */
import './editor.scss';

import { useEffect, useRef } from 'react';

import {
	useContext,
	useState,
} from '@wordpress/element';

import { Upload } from 'lucide-react';

import { __ } from '@wordpress/i18n';

import { useDispatch, useSelect } from '@wordpress/data';

import { blockStore } from '../../store';

const UploadTarget = ( props ) => {

	const { blockUniqueId, clientId } = props;

	const filePondPlaceholderRef = useRef( null );
	/**
	 * This runs relative to the placeholder ref's element's document and 
	 * acts as a trigger to load the filepond instance into the placeholder.
	 */
	useEffect( () => {
		if ( ! filePondPlaceholderRef.current ) {
			return;
		}
		const document = filePondPlaceholderRef.current.ownerDocument;
		const loadUploadTargetEvent = new CustomEvent( 'dlxPhotoBlockLoadUploadTarget', {
			detail: {
				blockUniqueId,
				clientId,
				document,
			},
		} );
		document.dispatchEvent( loadUploadTargetEvent );
	}, [ filePondPlaceholderRef ] );


	const {
		setImageData,
		setFilepondInstance,
		setIsUploading,
		setIsProcessingUpload,
		setPhotoMode,
		setIsUploadError,
		setScreen,
	} = useDispatch( blockStore( blockUniqueId ) );

	const {
		currentScreen,
		isUploading,
		isProcessingUpload,
		isUploadError,
	} = useSelect( ( select ) => {
		return {
			currentScreen: select( blockStore( blockUniqueId ) ).getCurrentScreen(),
			isUploading: select( blockStore( blockUniqueId ) ).isUploading(),
			isProcessingUpload: select( blockStore( blockUniqueId ) ).isProcessingUpload(),
			isUploadError: select( blockStore( blockUniqueId ) ).isUploadError(),
		};
	} );

	return (
		<>
			<div className="dlx-photo-block__upload-target__container">
				<div className="dlx-photo-block__upload-target__filepond">
					<div className="dlx-photo-block-filepond" data-block-id={ blockUniqueId } data-client-id={ clientId } ref={ filePondPlaceholderRef }></div>
				</div>
				{ ! isUploading && ! isProcessingUpload && (
					<div className="dlx-photo-block__upload-target__label">
						<div className="dlx-photo-block__upload-target__label-svg">
							<Upload />
						</div>
						<div className="dlx-photo-block__upload-target__label-text">
							{ __( 'Drag Photo Here or Click to Upload', 'photo-block' ) }
						</div>
					</div>
				) }
			</div>
		</>
	);
};
export default UploadTarget;
