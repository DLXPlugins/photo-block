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

import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	store,
} from '@wordpress/block-editor';
import { generateUniqueId } from '../../utils/Functions';

import { useSelect } from '@wordpress/data';

import { useInstanceId } from '@wordpress/compose';

import UploaderContext from '../../contexts/UploaderContext';
import InitialScreen from '../../screens/Initial';
//import EffectsScreen from '../../screens/Effects';
import CaptionAppender from '../../components/CaptionAppender';
import EditScreen from '../../screens/Edit';
import CropScreen from '../../screens/Crop';
import DataScreen from '../../screens/Data';
import DataEditScreen from '../../screens/DataEdit';

// For storing unique IDs.
const uniqueIds = [];

const PhotoBlock = ( props ) => {
	// Read in context values.
	const {
		imageFile,
		screen,
		setScreen,
		isUploading,
		setIsUploading,
		isProcessingUpload,
		setIsProcessingUpload,
		blockToolbar,
		isUploadError,
		hasCaption,
		setHasCaption,
		captionPosition,
		photoMode,
		setPhotoMode,
		setBlockUniqueId,
	} = useContext( UploaderContext );

	const blockProps = useBlockProps( {
		className: classnames(
			`dlx-photo-block`,
			`align${ align }`,
			`dlx-screen-${ screen }`,
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
	const filepondRef = useRef( null );
	const imageRef = useRef( null );
	const [ captionInnerBlocksRef, setCaptionInnerBlocksRef ] = useState( null );

	const { attributes, setAttributes, clientId, context } = props;

	// Get a function that'll give us the innerblocks count for a custom inserter.
	const { getBlockCount } = useSelect(
		( select ) => select( store ),
		[]
	);
	const innerBlocksCount = getBlockCount( clientId );

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
	} = attributes;

	// Set caption innerblocks classes.
	const captionInnerBlocksClasses = classnames(
		'dlx-photo-block__caption', {
			'dlx-photo-block__caption--has-overlay': 'overlay' === captionPosition,
		}
	);
	const captionInnerBlockProps = useInnerBlocksProps(
		{
			className: captionInnerBlocksClasses,
			ref: setCaptionInnerBlocksRef,
		},
		{
			allowedBlocks: [ 'dlxplugins/photo-caption-block' ],
			templateInsertUpdatesSelection: true,
			renderAppender: () => ( <CaptionAppender numBlocks={ innerBlocksCount } clientId={ clientId } /> ),
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
	useEffect( () => {
		setAttributes( {
			photoMode,
		} );
	}, [ photoMode ] );

	/**
	 * Get the screen to display.
	 *
	 * @return {Element} The screen to display.
	 */
	const getCurrentScreen = () => {
		// If in data mode, show the data screen.
		if ( 'data' === photoMode ) {
			if ( 'data' === dataScreen ) {
				return <DataScreen attributes={ attributes } setAttributes={ setAttributes } context={ context } />;
			}
			if ( 'data-edit' === dataScreen ) {
				return <DataEditScreen attributes={ attributes } setAttributes={ setAttributes } context={ context } innerBlockProps={ captionInnerBlockProps } />;
			}
		}

		// Otherwise get the screen based on the current screen.
		switch ( screen ) {
			case 'initial':
				return <InitialScreen attributes={ attributes } setAttributes={ setAttributes } />;
			case 'edit':
				return <EditScreen attributes={ attributes } setAttributes={ setAttributes } ref={ imageRef } innerBlockProps={ captionInnerBlockProps } clientId={ clientId } />;
			case 'crop':
				return <CropScreen attributes={ attributes } setAttributes={ setAttributes } />;
			case 'data':
				return <DataScreen attributes={ attributes } setAttributes={ setAttributes } context={ context } />;
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
				{ getCurrentScreen() }
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
