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
	Popover,
	PlaceHolder,
} from '@wordpress/components';

import {
	InspectorControls,
	useBlockProps,
	BlockControls,
} from '@wordpress/block-editor';

import { useInstanceId } from '@wordpress/compose';

import UploaderContext from '../../contexts/UploaderContext';
import InitialScreen from '../../screens/Initial';
import EditScreen from '../../screens/Edit';
import { Crop, Image, Accessibility, Link } from 'lucide-react';

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
					<EditScreen attributes={ attributes } setAttributes={ setAttributes } />
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
									setScreen( 'edit' );
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
