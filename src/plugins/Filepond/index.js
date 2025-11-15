import domReady from '@wordpress/dom-ready';
import { __ } from '@wordpress/i18n';

import * as FilePond from 'filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

// CSS imports (webpack will handle bundling)
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond/dist/filepond.min.css';

// If you still have these SVGs:
import { redoSvg, processSvg } from '../../blocks/photo-block/icons/filepond';

// Register plugins (same as in React)
FilePond.registerPlugin(
	FilePondPluginImagePreview,
	FilePondPluginImageExifOrientation,
	FilePondPluginFileValidateType
);

// todo - create synthetic event for filepond to show when toggled into.

const attachFilepond = ( filepondDocument ) => {
	const blocks = filepondDocument.querySelectorAll( '.dlx-photo-block-filepond' );


	if ( ! blocks.length ) {
		return;
	}

	blocks.forEach( ( inputEl ) => {
		const clientId = inputEl.getAttribute( 'data-client-id' );
		const blockUniqueId = inputEl.getAttribute( 'data-block-id' );

		// Helper for updating block attributes from here.
		const updateAttrs = ( attrs ) => {
			if ( ! clientId ) {
				return;
			}
			window.parent.wp.data.dispatch( 'core/block-editor' ).updateBlockAttributes( clientId, attrs );
		};

		const setIsUploading = ( value ) => {
			if ( ! blockUniqueId ) {
				return;
			}
			window.parent.wp.data.dispatch( 'dlxplugins/photo-block/' + blockUniqueId ).setIsUploading( value );
		};
		const setIsProcessingUpload = ( value ) => {
			if ( ! blockUniqueId ) {
				return;
			}
			window.parent.wp.data.dispatch( 'dlxplugins/photo-block/' + blockUniqueId ).setIsProcessingUpload( value );
		};
		const setIsUploadError = ( value ) => {
			if ( ! blockUniqueId ) {
				return;
			}
			window.parent.wp.data.dispatch( 'dlxplugins/photo-block/' + blockUniqueId ).setIsUploadError( value );
		};
		const setPhotoMode = ( mode ) => {
			if ( ! blockUniqueId ) {
				return;
			}
			updateAttrs( { photoMode: mode } );
			window.parent.wp.data.dispatch( 'dlxplugins/photo-block/' + blockUniqueId ).setPhotoMode( mode );
		};
		const setScreen = ( screen ) => {
			if ( ! blockUniqueId ) {
				return;
			}
			updateAttrs( { screen } );
			window.parent.wp.data.dispatch( 'dlxplugins/photo-block/' + blockUniqueId ).setScreen( screen );
		};
		const setImageData = ( data ) => {
			if ( ! blockUniqueId ) {
				return;
			}
			window.parent.wp.data.dispatch( 'dlxplugins/photo-block/' + blockUniqueId ).setImageData( data );
		};

		const pond = FilePond.create( inputEl, {
			allowMultiple: false,
			maxFiles: 1,
			credits: false,
			stylePanelLayout: 'integrated',
			labelIdle: '',
			allowRemove: false,
			allowRevert: false,
			acceptedFileTypes: [ 'image/*' ],
			labelFileTypeNotAllowed: __( 'Invalid file type', 'photo-block' ),
			labelTapToCancel: __( 'Click to cancel', 'photo-block' ),
			imagePreviewMaxFileSize: '4MB',
			iconRetry: redoSvg,
			iconProcess: processSvg,

			// ---- server config (straight port from your React version) ----
			server: {
				process(
					fieldName,
					file,
					metadata,
					load,
					error,
					progress,
					abort
				) {
					const formData = new FormData();

					// If file is not an object, treat as full URL.
					if ( typeof file !== 'object' ) {
						formData.append( 'url', file );
					} else {
						formData.append( 'file', file, file.name );
					}

					const request = new XMLHttpRequest();
					request.open( 'POST', dlxFilepond.restUrl + '/add-image' );
					request.setRequestHeader( 'X-WP-Nonce', dlxFilepond.restNonce );

					request.upload.onprogress = ( e ) => {
						progress( e.lengthComputable, e.loaded, e.total );
					};

					request.onload = function () {
						if ( request.status >= 200 && request.status < 300 ) {
							const responseData = JSON.parse( request.responseText );

							setImageData( responseData );
							setPhotoMode( 'photo' );

							updateAttrs( {
								imageData: responseData,
								photoMode: 'photo',
							} );

							load( request.responseText );
						} else {
							error( 'oh no' );
						}
					};

					request.send( formData );

					return {
						abort: () => {
							request.abort();
							abort();
						},
					};
				},
			},

			// ---- event callbacks (same semantics as your React props) ----
			onaddfilestart() {
				setIsUploading( true );
			},

			onprocessfileabort() {
				setIsUploading( false );
				setIsProcessingUpload( false );
			},

			onerror() {
				setIsUploadError( true );
				setIsUploading( false );
				setIsProcessingUpload( false );
			},
		} );

		// FilePond "processfile" is easier to handle using the event API:
		pond.on( 'processfile', ( error, file ) => {
			setIsProcessingUpload( false );
			setIsUploading( false );
			setScreen( 'edit' );
		} );

		// If you still want to stash the instance somewhere:
		window.dlxPhotoBlockFilePonds ??= {};
		window.dlxPhotoBlockFilePonds[ blockUniqueId ] = pond;

		// If in an iframe, store the instance in the parent window.
		if ( window.parent ) {
			window.parent.dlxPhotoBlockFilePonds ??= {};
			window.parent.dlxPhotoBlockFilePonds[ blockUniqueId ] = pond;
		}
	} );
}

domReady( () => {
	document.addEventListener( 'dlxPhotoBlockLoadUploadTarget', ( event ) => {
		attachFilepond( event.detail.document );
	} );

	attachFilepond( document );
} );
