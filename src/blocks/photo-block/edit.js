import './editor.scss';

import classnames from 'classnames';
import { useEffect, useState, useRef, useContext } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import {
	PanelBody,
	PanelRow,
	RangeControl,
	TextControl,
	TextareaControl,
	ButtonGroup,
	Button,
	ToggleControl,
	Toolbar,
	ToolbarButton,
	ToolbarGroup,
	ToolbarDropdownMenu,
	Popover,
	PlaceHolder,
	MenuGroup,
	MenuItem,
} from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { generateUniqueId } from '../../utils/Functions';

import blockStore from '../../store';


import InitialScreen from '../../screens/Initial';
//import EffectsScreen from '../../screens/Effects';
import CaptionAppender from '../../components/CaptionAppender';
import EditScreen from '../../screens/Edit';
import CropScreen from '../../screens/Crop';
import DataScreen from '../../screens/Data';
import DataEditScreen from '../../screens/DataEdit';
import LoadingScreen from '../../screens/Loading';
import FeaturedImageScreen from '../../screens/FeaturedImageEdit';

// For storing unique IDs.
const uniqueIds = [];

const PhotoBlock = ( props ) => {

	const {
		attributes,
		setAttributes,
		clientId,
		context,
		isSelected,
	} = props;

	const innerBlockCount = useSelect( ( select ) => select( 'core/block-editor' ).getBlock( clientId ).innerBlocks ).length;

	const {
		uniqueId,
		photo,
		align,
		caption,
		altText,
		overlayText,
		overlayTextPosition,
		paddingSize,
		marginSize,
		borderWidth,
		borderRadiusSize,
		typographyCaption,
		dataScreen, /* can be `data`, `data-edit`. */
	} = props.attributes;

	// Read in context values.
	const {
		setImageFile,
		setFilepondInstance,
		setIsUploading,
		setIsProcessingUpload,
		setPhotoMode,
		setIsUploadError,
		setScreen,
		setBlockUniqueId,
	} = useDispatch( blockStore );

	// Get current block data.
	const {
		currentScreen,
		isUploading,
		isProcessingUpload,
		isUploadError,
		filepondInstance,
		hasCaption,
		captionPosition,
		inQueryLoop,
		photoMode,
		blockUniqueId,
	} = useSelect( ( select ) => {
		return {
			currentScreen: select( blockStore ).getCurrentScreen(),
			isUploading: select( blockStore ).isUploading(),
			isProcessingUpload: select( blockStore ).isProcessingUpload(),
			isUploadError: select( blockStore ).isUploadError(),
			filepondInstance: select( blockStore ).getFilepondInstance(),
			hasCaption: select( blockStore ).hasCaption(),
			captionPosition: select( blockStore ).getCaptionPosition(),
			inQueryLoop: select( blockStore ).inQueryLoop(),
			photoMode: select( blockStore ).getPhotoMode(),
			blockUniqueId: select( blockStore ).getBlockUniqueId(),
		};
	} );

	const blockProps = useBlockProps( {
		className: classnames(
			`dlx-photo-block`,
			`align${ align }`,
			`dlx-screen-${ currentScreen }`,
			`dlx-caption-position-${ captionPosition }`,
		),
	} );

	// Set caption position attribute as captionPosition context is updated so the parent knows the caption position.
	useEffect( () => {
		if ( props.attributes.captionPosition !== captionPosition ) {
			props.setAttributes( { captionPosition } );
		}
	}, [ captionPosition ] );

	// Set whether there's a caption or not.
	useEffect( () => {
		if ( props.attributes.hasCaption !== hasCaption ) {
			props.setAttributes( { hasCaption } );
		}
	}, [ hasCaption ] );

	// Store the filepond upload ref.
	const imageRef = useRef( null );

	

	// Set caption innerblocks classes.
	const captionInnerBlocksClasses = classnames(
		'dlx-photo-block__caption', {
			'dlx-photo-block__caption--has-overlay': 'overlay' === captionPosition,
		}
	);
	const captionInnerBlockProps = useInnerBlocksProps(
		{
			className: captionInnerBlocksClasses,
		},
		{
			allowedBlocks: [ 'dlxplugins/photo-caption-block' ],
			templateInsertUpdatesSelection: true,
			renderAppender: () => ( isSelected ? <CaptionAppender numBlocks={ innerBlockCount } clientId={ clientId } /> : null ),
		}
	);

	/**
	 * Get a unique ID for the block for inline styling if necessary.
	 */
	useEffect( () => {
		if ( null === uniqueId || uniqueIds.includes( uniqueId ) ) {
			const newUniqueId = 'photo-block-' + clientId.substr( 2, 9 ).replace( '-', '' );

			setAttributes( { uniqueId: newUniqueId } );
			setBlockUniqueId( newUniqueId );
			uniqueIds.push( newUniqueId );
		} else {
			uniqueIds.push( uniqueId );
		}
	}, [] );

	// Set data mode when setting or exiting data mode.
	// useEffect( () => {
	// 	setAttributes( {
	// 		photoMode,
	// 	} );
	// }, [ photoMode ] );

	/**
	 * Get the screen to display.
	 *
	 * @return {Element} The screen to display.
	 */
	const initCurrentScreen = () => {
		// Otherwise get the screen based on the current screen.
		switch ( currentScreen ) {
			case 'loading':
				return <LoadingScreen { ...props } />;
			case 'initial':
				return <InitialScreen attributes={ attributes } setAttributes={ setAttributes } />;
			case 'edit':
				return <EditScreen attributes={ attributes } setAttributes={ setAttributes } ref={ imageRef } innerBlockProps={ captionInnerBlockProps } clientId={ clientId } />;
			case 'crop':
				return <CropScreen attributes={ attributes } setAttributes={ setAttributes } />;
			case 'featuredImage':
				return <FeaturedImageScreen attributes={ attributes } setAttributes={ setAttributes } context={ context } innerBlockProps={ captionInnerBlockProps } />;
			case 'data':
				return <DataScreen attributes={ attributes } setAttributes={ setAttributes } context={ context } />;
			case 'data-edit':
				return <DataEditScreen attributes={ attributes } setAttributes={ setAttributes } context={ context } innerBlockProps={ captionInnerBlockProps } />;
			case 'effects':
				return null;
				// return (
				// 	<EffectsScreen attributes={ attributes } setAttributes={ setAttributes } />
				// );
		}
		return null;
	};

	const block = (
		<>
			<section className="dlx-photo-block__container dlx-photo-block__block-wrapper" id={ uniqueId }>
				{ initCurrentScreen() }
			</section>
		</>
	);

	return (
		<>
			<div { ...blockProps }>{ block }</div>
		</>
	);
};

export default PhotoBlock;
