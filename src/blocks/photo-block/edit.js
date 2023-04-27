import './editor.scss';

import classnames from 'classnames';
import { useEffect, useState, useRef } from '@wordpress/element';
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

const PhotoBlock = ( props ) => {
	const generatedUniqueId = useInstanceId( PhotoBlock, 'photo-block' );
	const blockProps = useBlockProps( {
		className: classnames(
			`dlx-photo-block`,
			`align${ align }`,
			`dlx-screen-${ screen }`
		),
	} );

	// Store the filepond upload ref.
	const filepondRef = useRef( null );

	const [ screen, setScreen ] = useState( 'initial' ); // Can be initial, edit, crop, preview, data.

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
					<UploadTypes ref={ filepondRef } />
					<UploadTarget ref={ filepondRef } />
				</div>
			</>
		)
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
