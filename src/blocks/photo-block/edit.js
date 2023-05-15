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
import SendCommand from '../../utils/SendCommand';
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
	} = useContext( UploaderContext );

	const blockProps = useBlockProps( {
		className: classnames(
			`dlx-photo-block`,
			`align${ align }`,
			`dlx-screen-${ screen }`
		),
	} );

	// Store the filepond upload ref.
	const filepondRef = useRef( null );
	const imageRef = useRef( null );
	const [ captionInnerBlocksRef, setCaptionInnerBlocksRef ] = useState( null );

	const { attributes, setAttributes, clientId } = props;

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
		dataMode,
	} = attributes;

	const captionInnerBlockProps = useInnerBlocksProps(
		{
			className: 'dlx-photo-block__caption',
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
			return (
				<DataScreen attributes={ attributes } setAttributes={ setAttributes } />
			);
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
			// case 'edit':
			// 	return getEditScreen();
			// case 'crop':
			// 	return getCropScreen();
			// case 'preview':
			// 	return getPreviewScreen();
		}
		return null;
	};

	/**
	 * Returns a caption placeholder or caption if available.
	 *
	 * @return {Element} The caption placeholder or caption if available.
	 */
	const getCaption = () => {
		return (
			<div { ...captionInnerBlockProps } />
		);
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
