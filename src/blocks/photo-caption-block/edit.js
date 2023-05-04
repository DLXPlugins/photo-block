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
	useInnerBlocksProps,
	InnerBlocks,
} from '@wordpress/block-editor';

import { Crop, Image, Accessibility, Link, ZoomIn, RectangleHorizontal, RotateCcw, RotateCw, Save, X } from 'lucide-react';

import { useInstanceId } from '@wordpress/compose';

import UploaderContext from '../../contexts/UploaderContext';

const PhotoCaptionBlock = ( props ) => {
	const generatedUniqueId = useInstanceId( PhotoCaptionBlock, 'photo-caption-block' );
	// Read in context values.
	const {
		hasCaption,
		setHasCaption,
		captionPosition,
		setCaptionPosition,
	} = useContext( UploaderContext );

	const innerBlocksRef = useRef( null );
	const innerBlockProps = useInnerBlocksProps(
		{
			className: 'has-click-to-share-text has-click-to-share__share-text',
			ref: innerBlocksRef,
		},
		{
			allowedBlocks: photoBlock.captionInnerBlocks,
			template: [ [ 'core/paragraph', { placeholder: __( 'Enter your caption here.', 'photo-block' ) } ] ],
			templateInsertUpdatesSelection: true,
			templateLock: false,
			renderAppender: InnerBlocks.DefaultBlockAppender,
		}
	);


	const blockProps = useBlockProps( {
		className: classnames(
			`dlx-photo-caption-block`,
		),
	} );

	const { attributes, setAttributes, clientId } = props;

	const {
		uniqueId,
		captionPosition: blockCaptionPosition,

	} = attributes;

	// Set the local inspector controls.
	const localInspectorControls = (
		<InspectorControls>
			<PanelBody title={ __( 'Caption Block Settings', 'photo-block' ) }>
				settings go here.
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

	const block = (
		<>
			<div { ...innerBlockProps } />
		</>
	);

	return (
		<>
			<div { ...blockProps }>{ block }</div>
		</>
	);
};

export default PhotoCaptionBlock;
