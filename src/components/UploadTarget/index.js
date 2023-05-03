/**
 * Upload data row including Upload|Media Library|URL|Data.
 */
import './editor.scss';

import { Spinner } from '@wordpress/components';

import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond/dist/filepond.min.css';

import {
	useContext,
	useState,
} from '@wordpress/element';

import { Upload } from 'lucide-react';

import { __ } from '@wordpress/i18n';

import UploaderContext from '../../contexts/UploaderContext';

// Register filepond plugins.
registerPlugin(
	FilePondPluginImagePreview,
	FilePondPluginImageExifOrientation,
	FilePondPluginFileValidateType
);

import { redoSvg, processSvg } from '../../blocks/photo-block/icons/filepond';
const UploadTarget = ( props ) => {
	const {
		setImageFile,
		isUploading,
		setIsUploading,
		isProcessingUpload,
		setIsProcessingUpload,
		setIsUploadError,
		setScreen,
		setFilepondInstance,
	} = useContext( UploaderContext );

	const { setAttributes } = props;

	return (
		<>
			<div className="dlx-photo-block__upload-target__container">
				<div className="dlx-photo-block__upload-target__filepond">
					<FilePond
						allowMultiple={ false }
						maxFiles={ 1 }
						server={ {
							process: (
								fieldName,
								file,
								metadata,
								load,
								error,
								progress,
								abort,
								transfer,
								options
							) => {
								// todo - Need error checking and handling here.
								const formData = new FormData();
								// If file is not an object, treat as full URL.
								if ( 'object' !== typeof file ) {
									formData.append( 'url', file );
								} else {
									formData.append( 'file', file, file.name );
								}
								const request = new XMLHttpRequest();
								request.open( 'POST', photoBlock.restUrl + '/add-image' );
								request.setRequestHeader( 'X-WP-Nonce', photoBlock.restNonce );
								request.upload.onprogress = ( e ) => {
									progress( e.lengthComputable, e.loaded, e.total );
								};
								request.onload = function() {
									if ( request.status >= 200 && request.status < 300 ) {
										setAttributes(
											{
												photo: JSON.parse( request.responseText ),
											}
										);
										setImageFile( JSON.parse( request.responseText ) );
										load( request.responseText );
									} else {
										error( 'oh no' );
									}
								};
								console.log( formData );
								request.send( formData );
								return {
									abort: () => {
										request.abort();
										abort();
									},
								};
							},
						} }
						credits={ false }
						stylePanelLayout="integrated"
						labelIdle=""
						allowRemove={ false }
						allowRevert={ false }
						ref={ setFilepondInstance }
						labelFileTypeNotAllowed={ __( 'Invalid file type', 'photo-block' ) }
						labelTapToCancel={ __( 'Click to cancel', 'photo-block' ) }
						acceptedFileTypes={ [ 'image/*' ] }
						onaddfilestart={ () => {
							setIsUploading( true );
						} }
						onprocessfileabort={ () => {
							setIsUploading( false );
							setIsProcessingUpload( false );
						} }
						onerror={ ( error ) => {
							setIsUploadError( true );
							setIsUploading( false );
							setIsProcessingUpload( false );
						} }
						imagePreviewMaxFileSize="4MB"
						iconRetry={ redoSvg }
						iconProcess={ processSvg }
						onprocessfile={ ( error, file ) => {
							setIsProcessingUpload( false );
							setIsUploading( false );
							setScreen( 'edit' );
							setAttributes(
								{
									screen: 'edit',
								}
							);
						} }
					/>
				</div>
				{ ! isUploading && ! isProcessingUpload && (
					<div className="dlx-photo-block__upload-target__label">
						<div className="dlx-photo-block__upload-target__label-svg">
							<Upload />
						</div>
						<div className="dlx-photo-block__upload-target__label-text">
							{ __( 'Drag Photo Here or Upload', 'photo-block' ) }
						</div>
					</div>
				) }
			</div>
		</>
	);
};
export default UploadTarget;
