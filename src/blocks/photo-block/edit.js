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
	Popover,
	PlaceHolder,
} from '@wordpress/components';

import {
	InspectorControls,
	useBlockProps,
	BlockControls,
} from '@wordpress/block-editor';

import { useInstanceId } from '@wordpress/compose';

import UploadTypes from '../../components/UploadTypes';
import UploadTarget from '../../components/UploadTarget';
import UploadStatus from '../../components/UploadStatus';

import UploaderContext from '../../contexts/UploaderContext';

const PhotoBlock = ( props ) => {
	const generatedUniqueId = useInstanceId( PhotoBlock, 'photo-block' );
	const blockProps = useBlockProps( {
		className: classnames(
			`dlx-photo-block`,
			`align${ align }`,
			`dlx-screen-${ screen }`
		),
	} );

	// Read in context values.
	const { imageFile, screen, setScreen, isUploading, setIsUploading, isProcessingUpload, setIsProcessingUpload, isUploadError  }	= useContext( UploaderContext );

	// Store the filepond upload ref.
	const filepondRef = useRef( null );

	const { attributes, setAttributes, clientId } = props;

	const {
		uniqueId,
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

	const getInitialScreen = () => {
		return (
			<>
				<div className="dlx-photo-block__screen-initial">
					{ ( ! isUploading && ! isProcessingUpload && ! isUploadError ) && (
						<UploadTypes ref={ filepondRef } />
					) }
					{ ( isUploading || isProcessingUpload || isUploadError ) && (
						<UploadStatus ref={ filepondRef } />
					) }
					<UploadTarget ref={ filepondRef } />
				</div>
			</>
		)
	};

	const getEditScreen = () => {
		const { url, id, width, height } = imageFile;
		return (
			<>
				<div className="dlx-photo-block__screen-edit">
					<img src={ url } width={ width } height={ height } alt="" />
				</div>
			</>
		);
	};

	/**
	 * Get the screen to display.
	 *
	 * @return {Element} The screen to display.
	 */
	const getCurrentScreen = () => {
		switch ( screen ) {
			case 'initial':
				return getInitialScreen();
			case 'edit':
				return getEditScreen();
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
