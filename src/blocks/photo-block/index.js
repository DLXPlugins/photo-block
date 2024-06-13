import metadata from './block.json';
import { registerBlockType, createBlock } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import UploaderContext from '../../contexts/UploaderContext';
import Edit from './edit';

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

const PhotoBlockIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlSpace="preserve"
		viewBox="0 0 1305 1305"
		width="20"
		height="20"
	>
		<path
			fill="currentColor"
			d="M652.492 1302.95c-359.692 0-651.275-291.583-651.275-651.275C1.217 291.983 292.8.4 652.492.4c359.687 0 651.275 291.583 651.275 651.275 0 359.692-291.588 651.275-651.275 651.275Z"
		/>
		<path
			fill="#FFF"
			d="M652.492 1238.55c-324.125 0-586.879-262.754-586.879-586.879S328.367 64.792 652.492 64.792s586.879 262.754 586.879 586.879-262.754 586.879-586.879 586.879Z"
		/>
		<path
			fill="currentColor"
			d="M345.942 498.429 113.458 631.583c-.246 6.671-.412 13.363-.412 20.092 0 183.908 92.054 346.292 232.575 443.671l.321-596.917Zm592.429-35.779.771-268c-83.055-52.2-181.317-82.421-286.65-82.421-82.734 0-161.105 18.65-231.175 51.933L938.371 462.65ZM366.612 840.7l-.77 268c83.05 52.2 181.312 82.421 286.65 82.421 82.737 0 161.104-18.65 231.175-51.934L366.612 840.7Zm264.855-531.1-516.7 298.883c14.916-188.166 126.379-349.133 284.854-433.396L631.467 309.6Zm42.05 684.146 516.7-298.875C1175.3 883.033 1063.842 1044 905.362 1128.262L673.517 993.746Zm285.521-188.829 232.487-133.15c.246-6.671.413-13.363.413-20.092 0-183.908-92.055-346.292-232.571-443.671l-.329 596.913ZM578.938 398.8c139.62-40.6 285.816 39.662 326.42 179.329 40.654 139.617-39.666 285.763-179.333 326.421-139.675 40.6-285.817-39.667-326.421-179.338-40.6-139.67 39.663-285.812 179.334-326.412Z"
		/>
		<path
			fill="#FFF"
			d="M473.954 596.729c-.562 12.3-10.758 22.063-23.179 21.975-12.687-.087-24.004-10.933-22.854-23.921 5.15-58.075 50.75-111.021 101.45-136.596 11.6-5.849 25.687.034 30.775 11.738 5.017 11.546-.463 24.512-11.483 30.1-33.117 16.783-67.392 59.958-74.709 96.704ZM603.883 422.104c12.884 0 23.33 10.446 23.33 23.333 0 12.884-10.446 23.33-23.33 23.33-12.887 0-23.329-10.446-23.329-23.33 0-12.887 10.442-23.333 23.329-23.333Z"
		/>
	</svg>
);

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
