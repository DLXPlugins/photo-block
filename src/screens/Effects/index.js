import './editor.scss';
import 'react-image-crop/src/ReactCrop.scss';

import { useContext, useState, forwardRef } from '@wordpress/element';
import {
	Spinner,
	PanelBody,
	PanelRow,
	RangeControl,
	TextControl,
	TextareaControl,
	ButtonGroup,
	Button,
	ToggleControl,
	Toolbar,
	ToolbarItem,
	ToolbarButton,
	ToolbarGroup,
	ToolbarDropdownMenu,
	Popover,
	PlaceHolder,
	MenuGroup,
	MenuItem,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import { ZoomIn, Check, RotateCcw, RotateCw, Save, X, Lock, Loader2, Paintbrush2 } from 'lucide-react';
import ReactCrop from 'react-image-crop';
import classnames from 'classnames';
import UploaderContext from '../../contexts/UploaderContext';
import { useEffect } from 'react';
import SendCommand from '../../utils/SendCommand';
import AspectRatioIcon from '../../components/Icons/AspectRatio';
import ToolbarAspectRatio from '../../components/ToolbarAspectRatio';
import CalculateAspectRatioFromPixels from '../../utils/CalculateAspectRatioFromPixels';
import CalculateDimensionsFromAspectRatio from '../../utils/CalculateDimensionsFromAspectRatio';

const EffectsScreen = ( props ) => {
	const { screen, setScreen, setImageFile } =
		useContext( UploaderContext );
	const { attributes, setAttributes } = props;

	const [ shouldShowLoading, setShouldShowLoading ] = useState( true );
	const [ shouldFetchImage, setShouldFetchImage ] = useState( true );
	const [ fullsizePhoto, setFullsizePhoto ] = useState( {} );
	const [ imageElement, setImageElement ] = useState( null );
	const [ showCanvas, setShowCanvas ] = useState( false );
	const [ canvasRef, setCanvasRef ] = useState( null );
	const [ effectsButtonRef, setEffectsButtonRef ] = useState( null );
	const [ effectsPopover, setEffectsPopover ] = useState( false );
	const [ isSaving, setIsSaving ] = useState( false );

	const {
		photo,
		uniqueId,
	} = attributes;

	const { url, id, width, height } = photo;

	/**
	 * Fetch the full size image for cropping.
	 */
	useEffect( () => {
		async function fetchImage() {
			const response = await SendCommand(
				photoBlock.restNonce,
				{},
				`${ photoBlock.restUrl + '/get-image' }/id=${ photo.id }`,
				'GET'
			);
			const { data } = response;
			setFullsizePhoto( data );

			// Set the image object to Canvas.
			const image = new Image();
			image.src = data.url;
			image.onload = () => {
				setShouldShowLoading( false );
				setImageElement( image );
				setShowCanvas( true );
			};
		}
		fetchImage();
	}, [ shouldFetchImage ] );

	/**
	 * Set the image for the canvas.
	 */
	useEffect( () => {
		if ( ! imageElement ) {
			return;
		}
		const canvas = canvasRef;
		if ( null === canvas ) {
			return;
		}
		canvas.width = imageElement.width;
		canvas.height = imageElement.height;
		const ctx = canvas.getContext( '2d' );
		ctx.drawImage( imageElement, 0, 0 );
	}, [ canvasRef ] );

	/**
	 * Set canvas to grayscale.
	 */
	const setGrayscale = () => {
		const canvas = canvasRef;
		if ( null === canvas ) {
			return;
		}
		const ctx = canvas.getContext( '2d' );
		ctx.drawImage( imageElement, 0, 0 ); // Draw original image first before replacing with Grayscale.
		const imgData = ctx.getImageData( 0, 0, canvas.width, canvas.height );
		const pixels = imgData.data;

		// Set pixels to grayscale.
		for ( let i = 0; i < pixels.length; i += 4 ) {
			const r = pixels[ i ];
			const g = pixels[ i + 1 ];
			const b = pixels[ i + 2 ];

			// Calculate the grayscale value
			const grayscale = 0.3 * r + 0.59 * g + 0.11 * b;

			// Set the red, green and blue pixels to the grayscale value
			pixels[ i ] = grayscale;
			pixels[ i + 1 ] = grayscale;
			pixels[ i + 2 ] = grayscale;
		}

		// Modify image.
		ctx.putImageData( imgData, 0, 0 );
	};

	/**
	 * Set canvas to sepia.
	 */
	const setSepia = () => {
		const canvas = canvasRef;
		if ( null === canvas ) {
			return;
		}
		const ctx = canvas.getContext( '2d' );
		ctx.drawImage( imageElement, 0, 0 ); // Draw original image first before replacing with Grayscale.
		const imgData = ctx.getImageData( 0, 0, canvas.width, canvas.height );
		const pixels = imgData.data;

		for ( let i = 0; i < pixels.length; i += 4 ) {
			const r = pixels[ i ];
			const g = pixels[ i + 1 ];
			const b = pixels[ i + 2 ];

			// Calculate the sepia tone value
			pixels[ i ] = ( r * .393 ) + ( g * .769 ) + ( b * .189 ); // Red
			pixels[ i + 1 ] = ( r * .349 ) + ( g * .686 ) + ( b * .168 ); // Green
			pixels[ i + 2 ] = ( r * .272 ) + ( g * .534 ) + ( b * .131 ); // Blue
		}

		// Modify image.
		ctx.putImageData( imgData, 0, 0 );
	};

	/**
	 * Set canvas to invert colors.
	 */
	const setInvertColors = () => {
		const canvas = canvasRef;
		if ( null === canvas ) {
			return;
		}
		const ctx = canvas.getContext( '2d' );
		ctx.drawImage( imageElement, 0, 0 ); // Draw original image first before replacing with Grayscale.
		const imgData = ctx.getImageData( 0, 0, canvas.width, canvas.height );
		const pixels = imgData.data;

		for ( let i = 0; i < pixels.length; i += 4 ) {
			// Calculate the sepia tone value
			pixels[ i ] = 255 - pixels[ i ]; // Red
			pixels[ i + 1 ] = 255 - pixels[ i + 1 ]; // Green
			pixels[ i + 2 ] = 255 - pixels[ i + 2 ]; // Blue
		}

		// Modify image.
		ctx.putImageData( imgData, 0, 0 );
	};

	// Set the local inspector controls.
	const localInspectorControls = (
		<InspectorControls>
			<PanelBody title={ __( 'Effect Settings', 'photo-block' ) }>
				<PanelRow>Crop options here</PanelRow>
			</PanelBody>
		</InspectorControls>
	);

	const localToolbar = (
		<BlockControls>
			<ToolbarGroup>
				<ToolbarButton
					icon={ <Paintbrush2 /> }
					label={ __( 'Image Effects', 'photo-block' ) }
					onClick={ () => {
						setEffectsPopover( ! effectsPopover );
					} }
					ref={ setEffectsButtonRef }
				>
					{ __( 'Image Effects', 'photo-block' ) }
				</ToolbarButton>
			</ToolbarGroup>
			<ToolbarGroup>
				<ToolbarButton
					icon={ isSaving ? <Loader2 /> : <Save /> }
					className={ classnames( 'dlx-photo-block__save-button', {
						'is-saving': isSaving,
					} ) }
					label={ __( 'Save Changes', 'photo-block' ) }
					onClick={ () => {
						if ( isSaving ) {
							return;
						}
						setIsSaving( true );
						// const croppedImage = cropImage( crop, photo.id, rotateDegrees, zoom );
						// croppedImage.then( ( imageResponse ) => {
						// 	const { data } = imageResponse;
						// 	if ( data.success ) {
						// 		setImageFile( data.data.attachment );
						// 		setAttributes( {
						// 			photo: data.data.attachment,
						// 			imageDimensions: {
						// 				width: data.data.width,
						// 				height: data.data.height,
						// 			},
						// 		} );
						// 		setScreen( 'edit' );
						// 	} else {
						// 		// todo: error handling.
						// 	}
						// } ).catch( ( error ) => {
						// 	console.log( error );
						// } ).then( () => {
						// 	setIsSaving( false );
						// } );
					} }
				>
					{ isSaving ? __( 'Saving…', 'photo-block' ) : __( 'Save Changes', 'photo-block' ) }
				</ToolbarButton>
				<ToolbarButton
					icon={ <X /> }
					label={ __( 'Cancel', 'photo-block' ) }
					onClick={ () => {
						setScreen( 'edit' );
					} }
					disabled={ isSaving }
				>
					{ __( 'Cancel', 'photo-block' ) }
				</ToolbarButton>
			</ToolbarGroup>
		</BlockControls>
	);

	return (
		<>
			{ localInspectorControls }
			{ localToolbar }
			{ effectsPopover && (
				<Popover
					placement="bottom"
					className="dlx-photo-block__effects-popover"
					onClose={ () => {
						setEffectsPopover( false );
					} }
					anchor={ effectsButtonRef }
				>
					<ButtonGroup className="dlx-photo-block__effects-popover-button-group">
						<Button
							label={ __( 'Set Grayscale', 'photo-block' ) }
							onClick={ () => {
								setGrayscale();
								setEffectsPopover( false );
							} }
						>
							{ __( 'Set Grayscale', 'photo-block' ) }
						</Button>
						<Button
							label={ __( 'Set Sepia', 'photo-block' ) }
							onClick={ () => {
								setSepia();
								setEffectsPopover( false );
							} }
						>
							{ __( 'Set Sepia', 'photo-block' ) }
						</Button>
						<Button
							label={ __( 'Invert Colors', 'photo-block' ) }
							onClick={ () => {
								setInvertColors();
								setEffectsPopover( false );
							} }
						>
							{ __( 'Invert Colors', 'photo-block' ) }
						</Button>
					</ButtonGroup>
				</Popover>
			) }
			<div className="dlx-photo-block__screen-edit">
				{ shouldShowLoading && (
					<div
						className="dlx-photo-block__screen-edit-spinner"
						style={ {
							minWidth: width,
							minHeight: height,
							maxWidth: '100%',
							maxHeight: '100%',
						} }
					>
						<h3>{ __( 'Loading Full Size Image', 'photo-block' ) }</h3>
						<Spinner />
					</div>
				) }
				{ ( ! shouldShowLoading && showCanvas ) && (
					<>
						<canvas ref={ setCanvasRef } />
					</>
				) }
			</div>
		</>
	);
};
export default EffectsScreen;
