
import { createReduxStore, register } from '@wordpress/data';
const DEFAULT_STATE = {
	originalImageData: {
		id: 0,
		url: '',
		alt: '',
		full: '',
		width: '',
		height: '',
		attachment_link: '',
		caption: '',
	},
	imageData: {
		id: 0,
		url: '',
		alt: '',
		full: '',
		width: '',
		height: '',
		attachment_link: '',
		caption: '',
	},
	currentScreen: 'loading', /* can be loading, initial, edit, crop, data, featuredImage, effects. */
	isUploading: false,
	isProcessingUpload: false,
	isUploadError: false,
	filepondInstance: null,
	hasCaption: false,
	captionPosition: 'bottom', /* can be bottom, top, or overlay */
	inQueryLoop: false,
	photoMode: 'image', /* can be image, featuredImage, data, or url. */
	blockUniqueId: null,
	dataScreen: 'data', /* can be `initial`, `edit`. */
};

const actions = {
	setOriginalImageData( originalImageData ) {
		return {
			type: 'SET_ORIGINAL_IMAGE_DATA',
			originalImageData,
		};
	},
	setImageData( imageData ) {
		return {
			type: 'SET_IMAGE_DATA',
			imageData,
		};
	},
	setScreen( screen ) {
		return {
			type: 'SET_SCREEN',
			screen,
		};
	},
	setIsUploading( isUploading ) {
		return {
			type: 'SET_IS_UPLOADING',
			isUploading,
		};
	},
	setIsProcessingUpload( isProcessingUpload ) {
		return {
			type: 'SET_IS_PROCESSING_UPLOAD',
			isProcessingUpload,
		};
	},
	setIsUploadError( isUploadError ) {
		return {
			type: 'SET_IS_UPLOAD_ERROR',
			isUploadError,
		};
	},
	setFilepondInstance( filepondInstance ) {
		return {
			type: 'SET_FILEPOND_INSTANCE',
			filepondInstance,
		};
	},
	setHasCaption( hasCaption ) {
		return {
			type: 'SET_HAS_CAPTION',
			hasCaption,
		};
	},
	setCaptionPosition( captionPosition ) {
		return {
			type: 'SET_CAPTION_POSITION',
			captionPosition,
		};
	},
	setInQueryLoop( inQueryLoop ) {
		return {
			type: 'SET_IN_QUERY_LOOP',
			inQueryLoop,
		};
	},
	setPhotoMode( photoMode ) {
		return {
			type: 'SET_PHOTO_MODE',
			photoMode,
		};
	},
	setBlockUniqueId( blockUniqueId ) {
		return {
			type: 'SET_BLOCK_UNIQUE_ID',
			blockUniqueId,
		};
	},
	setDataScreen( dataScreen ) {
		return {
			type: 'SET_DATA_SCREEN',
			dataScreen,
		};
	},
};

const blockStore = createReduxStore( 'dlxplugins/photo-block', {
	reducer( state = DEFAULT_STATE, action ) {
		switch ( action.type ) {
			case 'SET_ORIGINAL_IMAGE_DATA':
				return {
					...state,
					originalImageData: action.originalImageData,
				};
			case 'SET_IMAGE_DATA':
				return {
					...state,
					imageData: action.imageData,
				};
			case 'SET_SCREEN':
				return {
					...state,
					currentScreen: action.screen,
				};
			case 'SET_IS_UPLOADING':
				return {
					...state,
					isUploading: action.isUploading,
				};
			case 'SET_IS_PROCESSING_UPLOAD':
				return {
					...state,
					isProcessingUpload: action.isProcessingUpload,
				};
			case 'SET_IS_UPLOAD_ERROR':
				return {
					...state,
					isUploadError: action.isUploadError,
				};
			case 'SET_FILEPOND_INSTANCE':
				return {
					...state,
					filepondInstance: action.filepondInstance,
				};
			case 'SET_HAS_CAPTION':
				return {
					...state,
					hasCaption: action.hasCaption,
				};
			case 'SET_CAPTION_POSITION':
				return {
					...state,
					captionPosition: action.captionPosition,
				};
			case 'SET_IN_QUERY_LOOP':
				return {
					...state,
					inQueryLoop: action.inQueryLoop,
				};
			case 'SET_PHOTO_MODE':
				return {
					...state,
					photoMode: action.photoMode,
				};
			case 'SET_BLOCK_UNIQUE_ID':
				return {
					...state,
					blockUniqueId: action.blockUniqueId,
				};
			case 'SET_DATA_SCREEN':
				return {
					...state,
					dataScreen: action.dataScreen,
				};
			default:
				return state;
		}
	},
	actions,
	selectors: {
		getCurrentScreen( state ) {
			return state.currentScreen;
		},
		isUploading( state ) {
			return state.isUploading;
		},
		isProcessingUpload( state ) {
			return state.isProcessingUpload;
		},
		isUploadError( state ) {
			return state.isUploadError;
		},
		getFilepondInstance( state ) {
			return state.filepondInstance;
		},
		hasCaption( state ) {
			return state.hasCaption;
		},
		getCaptionPosition( state ) {
			return state.captionPosition;
		},
		inQueryLoop( state ) {
			return state.inQueryLoop;
		},
		getPhotoMode( state ) {
			return state.photoMode;
		},
		getBlockUniqueId( state ) {
			return state.blockUniqueId;
		},
		getDataScreen( state ) {
			return state.dataScreen;
		},
		getImageData( state ) {
			return state.imageData;
		},
		getOriginalImageData( state ) {
			return state.originalImageData;
		},
	},
} );

register( blockStore );

export default blockStore;
