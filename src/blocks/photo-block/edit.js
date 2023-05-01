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

	/**
	 * Get the current toolbar for the screen.
	 *
	 * @return {Element} The toolbar to display.
	 */
	const getCurrentToolbar = () => {
		switch ( screen ) {
			case 'edit':
				return (
					<BlockControls>
						<ToolbarGroup>
							<ToolbarButton
								icon={ <Crop /> }
								label={ __( 'Crop and Edit', 'photo-block' ) }
								onClick={ () => {
									setScreen( 'crop' );
								} }
							>
								{ __( 'Crop and Edit', 'photo-block' ) }
							</ToolbarButton>
							<ToolbarButton
								icon={ <Image /> }
								label={ __( 'Replace Image', 'photo-block' ) }
								onClick={ () => {
									setScreen( 'initial' );
								} }
							>
								{ __( 'Replace Image', 'photo-block' ) }
							</ToolbarButton>
						</ToolbarGroup>
						<ToolbarGroup>
							<ToolbarButton
								icon={ <Accessibility /> }
								label={ __( 'Set Accessibility Options', 'photo-block' ) }
								onClick={ () => {} }
							/>
							<ToolbarButton
								icon={ <Link /> }
								label={ __( 'Set Link Options', 'photo-block' ) }
								onClick={ () => {} }
							/>
						</ToolbarGroup>
					</BlockControls>
				);
			case 'crop':
				return (
					<BlockControls>
						<ToolbarGroup>
							<ToolbarButton
								icon={ <ZoomIn /> }
								label={ __( 'Zoom In', 'photo-block' ) }
								onClick={ () => {
								} }
							/>
							<ToolbarDropdownMenu
								icon={ <RectangleHorizontal /> }
								label={ __( 'Aspect Ratio', 'photo-block' ) }
							>
								{ ( { onClose } ) => (
									<>
										<MenuGroup>
											<MenuItem>
												{ __( 'Original', 'photo-block' ) }
											</MenuItem>
											<MenuItem>
												{ __( 'Square', 'photo-block' ) }
											</MenuItem>
										</MenuGroup>
										<MenuGroup
											label={ __( 'Landscape', 'photo-block' ) }
										>
											<MenuItem>
												{ __( '16:10', 'photo-block' ) }
											</MenuItem>
											<MenuItem>
												{ __( '16:9', 'photo-block' ) }
											</MenuItem>
											<MenuItem>
												{ __( '4:3', 'photo-block' ) }
											</MenuItem>
											<MenuItem>
												{ __( '3:2', 'photo-block' ) }
											</MenuItem>
										</MenuGroup>
										<MenuGroup
											label={ __( 'Portrait', 'photo-block' ) }
										>
											<MenuItem>
												{ __( '10:16', 'photo-block' ) }
											</MenuItem>
											<MenuItem>
												{ __( '9:16', 'photo-block' ) }
											</MenuItem>
											<MenuItem>
												{ __( '3:4', 'photo-block' ) }
											</MenuItem>
											<MenuItem>
												{ __( '2:3', 'photo-block' ) }
											</MenuItem>
										</MenuGroup>
									</>
								) }
							</ToolbarDropdownMenu>
							<ToolbarButton
								icon={ <RotateCcw /> }
								label={ __( 'Rotate Left', 'photo-block' ) }
								onClick={ () => {
								} }
							/>
							<ToolbarButton
								icon={ <RotateCw /> }
								label={ __( 'Rotate Right', 'photo-block' ) }
								onClick={ () => {
								} }
							/>
						</ToolbarGroup>
						<ToolbarGroup>
							<ToolbarButton
								icon={ <Save /> }
								label={ __( 'Save Changes', 'photo-block' ) }
								onClick={ () => {
									setScreen( 'edit' );
								} }
							>
								{ __( 'Save Changes', 'photo-block' ) }
							</ToolbarButton>
							<ToolbarButton
								icon={ <X /> }
								label={ __( 'Cancel', 'photo-block' ) }
								onClick={ () => {
									setScreen( 'edit' );
								} }
							>
								{ __( 'Cancel', 'photo-block' ) }
							</ToolbarButton>
						</ToolbarGroup>
					</BlockControls>
				)
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
				{ getCurrentToolbar() }
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
