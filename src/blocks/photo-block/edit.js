/**
 * External dependencies
 */

import classnames from 'classnames';
import { useEffect, useState } from '@wordpress/element';
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

const PhotoBlock = ( props ) => {
	const generatedUniqueId = useInstanceId( PhotoBlock, 'photo-block' );
	const blockProps = useBlockProps( {
		className: classnames(
			`dlx-photo-block`,
			`align${ align }`,
			`dlx-screen-${ screen }`
		),
	} );

	const [ screen, setScreen ] = useState( 'initial' ); // Can be initial, edit, crop, preview.

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
				<h2>{ __( 'Add a Photo', 'photo-block' ) }</h2>
				<p className="description">{ __( 'Upload an image file, pick one from your media library, or add one with a URL.', 'photo-block' ) }</p>
				<div className="dlx-photo-block__initial-screen-buttons">
					<Button
						variant="primary"
					>
						{ __( 'Upload', 'photo-block' ) }
					</Button>
					<Button
						variant="primary"
					>
						{ __( 'Media Library', 'photo-block' ) }
					</Button>
					<Button
						variant="primary"
					>
						{ __( 'Add Photo from URL', 'photo-block' ) }
					</Button>
				</div>
			</>
		)
	};

	/**
	 * Get the screen to display.
	 *
	 * @return {Element} The screen to display.
	 */
	const getScreen = () => {
		switch ( screen ) {
			case 'initial':
				return getInitialScreen();
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
				<div className="dlx-photo-block__block-title">
					<h2>{ __( 'Photo Block', 'photo-block' ) }</h2>
				</div>
				<div className="dlx-photo-block__block-content">{ getScreen() }</div>
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
