
import { createReduxStore, register, select } from '@wordpress/data';
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
	justCropped: false,
	aspectRatioWidth: 16,
	aspectRatioHeight: 9,
	aspectRatioWidthPixels: 0,
	aspectRatioHeightPixels: 0,
	aspectRatioToolbarSelection: '16:9',
	aspectRatioUnit: 'ratio',
	hideCaption: photoBlock.settings.hideCaptionAppender,
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
	setAspectRatio( aspectRatioWidth, aspectRatioHeight ) {
		return {
			type: 'SET_ASPECT_RATIO',
			aspectRatioWidth,
			aspectRatioHeight,
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
	setJustCropped( justCropped ) {
		return {
			type: 'SET_JUST_CROPPED',
			justCropped,
		};
	},
	setAspectRatioToolbarSelection( aspectRatioToolbarSelection ) {
		return {
			type: 'SET_ASPECT_RATIO_TOOLBAR_SELECTION',
			aspectRatioToolbarSelection,
		};
	},
	setAspectRatioPixels( aspectRatioWidthPixels, aspectRatioHeightPixels ) {
		return {
			type: 'SET_ASPECT_RATIO_PIXELS',
			aspectRatioWidthPixels,
			aspectRatioHeightPixels,
		};
	},
	setAspectRatioUnit( aspectRatioUnit ) {
		return {
			type: 'SET_ASPECT_RATIO_UNIT',
			aspectRatioUnit,
		};
	},
	setHideCaption( hideCaption ) {
		return {
			type: 'SET_HIDE_CAPTION',
			hideCaption,
		};
	},
};

const createBlockStore = ( uniqueId ) => {
	return createReduxStore( `dlxplugins/photo-block/${ uniqueId }`, {
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
				case 'SET_ASPECT_RATIO':
					return {
						...state,
						aspectRatioWidth: action.aspectRatioWidth,
						aspectRatioHeight: action.aspectRatioHeight,
					};
				case 'SET_ASPECT_RATIO_PIXELS':
					return {
						...state,
						aspectRatioWidthPixels: action.aspectRatioWidthPixels,
						aspectRatioHeightPixels: action.aspectRatioHeightPixels,
					};
				case 'SET_ASPECT_RATIO_TOOLBAR_SELECTION':
					return {
						...state,
						aspectRatioToolbarSelection: action.aspectRatioToolbarSelection,
					};
				case 'SET_ASPECT_RATIO_UNIT':
					return {
						...state,
						aspectRatioUnit: action.aspectRatioUnit,
					};
				case 'SET_JUST_CROPPED':
					return {
						...state,
						justCropped: action.justCropped,
					};
				case 'SET_HIDE_CAPTION':
					return {
						...state,
						hideCaption: action.hideCaption,
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
			getJustCropped( state ) {
				return state.justCropped;
			},
			getAspectRatioWidth( state ) {
				return state.aspectRatioWidth;
			},
			getAspectRatioHeight( state ) {
				return state.aspectRatioHeight;
			},
			getAspectRatioWidthPixels( state ) {
				return state.aspectRatioWidthPixels;
			},
			getAspectRatioHeightPixels( state ) {
				return state.aspectRatioHeightPixels;
			},
			getAspectRatioToolbarSelection( state ) {
				return state.aspectRatioToolbarSelection;
			},
			getAspectRatioUnit( state ) {
				return state.aspectRatioUnit;
			},
			getHideCaption( state, hideCaption ) {
				if ( true === hideCaption ) {
					return true;
				}
				return state.hideCaption;
			},
		},
	} );
};
const blockStores = [];
const blockStore = ( uniqueId ) => {
	if ( ! uniqueId ) {
		return null;
	}
	const storeName = `dlxplugins/photo-block/${ uniqueId }`;
	// Attempt to select the store to check if it's already registered
	const isStoreRegistered = select( storeName ); // can be undefined.

	if ( ! isStoreRegistered ) {
		const store = createBlockStore( uniqueId );

		// Make sure store is initialized. Check for instantiate function and return null if it doesn't exist.
		if ( ! store.instantiate ) {
			return storeName;
		}

		register( store );
		blockStores.push( store );
		return storeName;
	}

	// If the store is already registered, return its instance
	return storeName;
};
/**
 * Retrieve a current list of all registered blocks.
 *
 * @return {Array} Array of block stores
 */
const getBlockStores = () => {
	return blockStores;
};

export { blockStore, getBlockStores };
