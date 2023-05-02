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
	BlockControls,
} from '@wordpress/block-editor';

import { Crop, Image, Accessibility, Link, ZoomIn, RectangleHorizontal, RotateCcw, RotateCw, Save, X } from 'lucide-react';

import { useInstanceId } from '@wordpress/compose';

import UploaderContext from '../../contexts/UploaderContext';
import InitialScreen from '../../screens/Initial';
import EditScreen from '../../screens/Edit';
import CropScreen from '../../screens/Crop';
import DataScreen from '../../screens/Data';
import SendCommand from '../../utils/SendCommand';

const PhotoBlock = ( props ) => {
	const generatedUniqueId = useInstanceId( PhotoBlock, 'photo-block' );
	// Read in context values.
	const {
		imageFile,
		screen,
		setScreen,
		isUploading,
		inspectorControls,
		setInspectorControls,
		setIsUploading,
		isProcessingUpload,
		setIsProcessingUpload,
		blockToolbar,
		isUploadError,
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

	const { attributes, setAttributes, clientId } = props;

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
	} = attributes;

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
	 * Get a unique ID for the block for inline styling if necessary.
	 */
	useEffect( () => {
		if ( 'edit' === screen ) {
			setInspectorControls( localInspectorControls );
		}
	}, [ screen ] );

	/**
	 * Retrieve a full image via the REST API.
	 */
	const getFullImage = async () => {
		const response = await SendCommand( photoBlock.restNonce, {}, `${ photoBlock.restUrl + '/get-image' }/id=${ photo.id }`, 'GET' );
		return response;
	};

	/**
	 * Get the screen to display.
	 *
	 * @return {Element} The screen to display.
	 */
	const getCurrentScreen = () => {
		switch ( screen ) {
			case 'initial':
				return (
					<InitialScreen
						forwardRef={ filepondRef }
						attributes={ attributes }
						setAttributes={ setAttributes }
					/>
				);
			case 'edit':
				return (
					<EditScreen ref={ imageRef } attributes={ attributes } setAttributes={ setAttributes } />
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

	const block = (
		<>
			<section className="dlx-photo-block__container">
				{ inspectorControls }
				{ blockToolbar }
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
