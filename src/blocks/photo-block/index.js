import metadata from './block.json';
import { registerBlockType, createBlock } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import UploaderContext from '../../contexts/UploaderContext';
import Edit from './edit';
import PhotoBlockIcon from '../../components/Icons/PhotoBlockIcon';

import LoadingScreen from '../../screens/Loading';
// import InitialScreen from '../../screens/Initial';
// //import EffectsScreen from '../../screens/Effects';
// import CaptionAppender from '../../components/CaptionAppender';
// import EditScreen from '../../screens/Edit';
// import CropScreen from '../../screens/Crop';
// import DataScreen from '../../screens/Data';
// import DataEditScreen from '../../screens/DataEdit';

/**
 * Determine if we're in a query loop or not.
 *
 * @param {Object} context The block context.
 *
 * @return {boolean} Whether or not we're in a query block.
 */
const isInQueryLoop = ( context ) => {
	// Determine if we're in a query block.
	const { query, queryId } = context;
	if ( null !== query && null !== queryId ) {
		return true;
	}
	return false;
};

const PhotoBlock = ( props ) => {
	
	






	// const [ imageFile, setImageFile ] = useState( props.attributes.photo ?? null );
	// const [ originalImageFile ] = useState( props.attributes.photo ?? null ); // For reverting crops/image adjustments.
	// const [ screen, setScreen ] = useState( props.attributes.screen ); // Can be initial, edit, crop, preview, data.
	// const [ isUploading, setIsUploading ] = useState( false );
	// const [ isProcessingUpload, setIsProcessingUpload ] = useState( false );
	// const [ isUploadError, setIsUploadError ] = useState( false );
	// const [ filepondInstance, setFilepondInstance ] = useState( null );
	// const [ hasCaption, setHasCaption ] = useState( props.attributes.hasCaption ? true : false );
	// const [ captionPosition, setCaptionPosition ] = useState( 'bottom' );
	// const [ inQueryLoop ] = useState( isInQueryLoop( props.context ) );
	// const [ photoMode, setPhotoMode ] = useState( props.attributes.photoMode ?? 'none' );
	// const [ blockUniqueId, setBlockUniqueId ] = useState( props.attributes.uniqueId );

	return (
		<Edit { ...props } />
	);
};

// Import JS



registerBlockType( metadata, {
	icon: PhotoBlockIcon,
	edit: PhotoBlock,

	// Render via PHP
	save() {
		return <InnerBlocks.Content />;
	},
	transforms: {
		from: [
			{
				type: 'enter',
				regExp: /^photoblock$/,
				transform: () => createBlock( 'dlxplugins/photo-block' ),
			},
		],
		to: [],
	},
} );
