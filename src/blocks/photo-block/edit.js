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

import { useDispatch, useSelect } from '@wordpress/data';


import { Crop, Image, Accessibility, Link, ZoomIn, RectangleHorizontal, RotateCcw, RotateCw, Save, X } from 'lucide-react';

import { useInstanceId } from '@wordpress/compose';

import UploaderContext from '../../contexts/UploaderContext';
import InitialScreen from '../../screens/Initial';
import EditScreen from '../../screens/Edit';
import CropScreen from '../../screens/Crop';
import DataScreen from '../../screens/Data';
import DataEditScreen from '../../screens/DataEdit';
//import EffectsScreen from '../../screens/Effects';
import CaptionAppender from '../../components/CaptionAppender';

const PhotoBlock = ( props ) => {
	const generatedUniqueId = useInstanceId( PhotoBlock, 'photo-block' );

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
		dataMode,
		setDataMode,
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
	 * Detect when innerblock has changed.
	 */
	// useEffect( () => {
	// 	console.log( innerBlocksCount );
	// }, [ innerBlocksCount ] );

	// Set the local inspector controls.
	const localInspectorControls = (
		<InspectorControls>
			<PanelBody title={ __( 'Photo Block Settings', 'photo-block' ) }>
				<PanelRow>
					<TextControl
						label={ __( 'Caption', 'photo-block' ) }
						value={ caption }
						onChange={ ( value ) => setAttributes( { caption: value } ) }
					/>
				</PanelRow>
			</PanelBody>
		</InspectorControls>
	);

	/**
	 * Get a unique ID for the block for inline styling if necessary.
	 */
	useEffect( () => {
		// Set unique ID for block (for styling).
		setAttributes( { uniqueId: generatedUniqueId } );
	}, [] );

	/**
	 * Get the screen to display.
	 *
	 * @return {Element} The screen to display.
	 */
	const getCurrentScreen = () => {
		// If in data mode, show the data screen.
		if ( dataMode ) {
			if ( 'data' === dataScreen ) {
				return (
					<DataScreen attributes={ attributes } setAttributes={ setAttributes } context={ context } />
				);
			}
			if ( 'data-edit' === dataScreen ) {
				return (
					<DataEditScreen attributes={ attributes } setAttributes={ setAttributes } innerBlockProps={ captionInnerBlockProps } context={ context } />
				);
			}
		}

		// Otherwise get the screen based on the current screen.
		switch ( screen ) {
			case 'initial':
				return (
					<InitialScreen
						attributes={ attributes }
						setAttributes={ setAttributes }
					/>
				);
			case 'edit':
				return (
					<EditScreen ref={ imageRef } attributes={ attributes } setAttributes={ setAttributes } innerBlockProps={ captionInnerBlockProps } />
				);
			case 'crop':
				return (
					<CropScreen attributes={ attributes } setAttributes={ setAttributes } />
				);
			case 'data':
				return (
					<DataScreen attributes={ attributes } setAttributes={ setAttributes } />
				);
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
			<section className="dlx-photo-block__container" id={ uniqueId }>
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
