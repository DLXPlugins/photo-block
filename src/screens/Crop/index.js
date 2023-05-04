import './editor.scss';
import 'react-image-crop/src/ReactCrop.scss'

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
import { ZoomIn, Check, RotateCcw, RotateCw, Save, X } from 'lucide-react';
import ReactCrop from 'react-image-crop';
import UploaderContext from '../../contexts/UploaderContext';
import { useEffect } from 'react';
import SendCommand from '../../utils/SendCommand';
import AspectRatioIcon from '../../components/Icons/AspectRatio';
import ToolbarAspectRatio from '../../components/ToolbarAspectRatio';

const CropScreen = ( props ) => {
	const { screen, setScreen } =
		useContext( UploaderContext );
	const { attributes, setAttributes } = props;
	
	const [ shouldShowLoading, setShouldShowLoading ] = useState( true );
	const [ shouldFetchImage, setShouldFetchImage ] = useState( true );
	const [ fullsizePhoto, setFullsizePhoto ] = useState( {} );
	const [ modifiedPhoto, setModifiedPhoto ] = useState( null );
	const [ rotateDegrees, setRotateDegrees ] = useState( 0 );
	const [ crop, setCrop ] = useState( null );

	const {
		photo,
		aspectRatio,
		aspectRatioUnit,
		aspectRatioWidth,
		aspectRatioHeight,
		aspectRatioWidthPixels,
		aspectRatioHeightPixels,
	} = attributes;

	const { url, id, width, height } = photo;

	/**
	 * Rotate an image.
	 *
	 * @param {string} imgSrc  The Image URL.
	 * @param {number} degrees The degrees in which to rotate the image.
	 * @return {Promise} A promise that resolves with the new image URL.
	 */
	const rotateImage = ( imgSrc, degrees ) => {
		return new Promise( ( resolve, reject ) => {
			const canvas = document.createElement( 'canvas' );
			const context = canvas.getContext( '2d' );
			const image = new Image();
			image.crossOrigin = 'anonymous';
			image.src = imgSrc;
			image.onload = () => {
				// Get canvas dimensions from image.
				const radian = ( degrees * Math.PI ) / 180;
				const sin = Math.sin( radian );
				const cos = Math.cos( radian );
				const imgWidth =
					Math.abs( image.width * cos ) + Math.abs( image.height * sin );
				const imgHeight =
					Math.abs( image.width * sin ) + Math.abs( image.height * cos );

				// Begin to rotate.
				canvas.width = imgWidth;
				canvas.height = imgHeight;
				context.translate( canvas.width / 2, canvas.height / 2 );
				context.rotate( ( degrees * Math.PI ) / 180 );
				context.drawImage( image, -image.width / 2, -image.height / 2 );
				canvas.toBlob( ( blob ) => {
					const newImageUrl = URL.createObjectURL( blob );
					resolve( {
						url: newImageUrl,
						width: canvas.width,
						height: canvas.height,
					} );
				}, 'image/png' );
			};
			image.onerror = ( error ) => {
				reject( error );
			};
		} );
	};

	/**
	 * Return the current degree for the rotation items.
	 *
	 * @param {number} degrees The degree to add/subtract.
	 * @return {number} The new degree.
	 */
	const getDegrees = ( degrees ) => {
		const newDegrees = rotateDegrees + degrees;
		if ( newDegrees === 360 ) {
			return 0;
		}
		if ( newDegrees === -360 ) {
			return 0;
		}
		return newDegrees;
	};

	// Set the local inspector controls.
	const localInspectorControls = (
		<InspectorControls>
			<PanelBody title={ __( 'Crop Settings', 'photo-block' ) }>
				<PanelRow>Crop options here</PanelRow>
			</PanelBody>
		</InspectorControls>
	);

	const localToolbar = (
		<BlockControls>
			<ToolbarGroup>
				<ToolbarButton
					icon={ <ZoomIn /> }
					label={ __( 'Zoom In', 'photo-block' ) }
					onClick={ () => {} }
				/>
				<ToolbarDropdownMenu
					icon={ <AspectRatioIcon /> }
					label={ __( 'Aspect Ratio', 'photo-block' ) }
				>
					{ ( { onClose } ) => (
						<>
							<MenuGroup className="dlx-photo-block__aspect-ratio-group">
								<MenuItem
									icon={ 'original' === aspectRatio ? <Check /> : null }
									isSelected={ 'original' === aspectRatio }
									onClick={ () => {
										setAttributes( { aspectRatio: 'original' } );
										onClose();
									} }
								>
									{ __( 'Original', 'photo-block' ) }
								</MenuItem>
								<MenuItem
									icon={ 'square' === aspectRatio ? <Check /> : null }
									isSelected={ 'square' === aspectRatio }
									onClick={ () => {
										setAttributes( { aspectRatio: 'square' } );
										onClose();
									} }
								>
									{ __( 'Square', 'photo-block' ) }
								</MenuItem>
								<MenuItem
									icon={ 'custom' === aspectRatio ? <Check /> : null }
									isSelected={ 'custom' === aspectRatio }
									onClick={ () => {
										setAttributes( { aspectRatio: 'custom' } );
										onClose();
									} }
								>
									{ __( 'Custom', 'photo-block' ) }
								</MenuItem>
							</MenuGroup>
							<MenuGroup
								label={ __( 'Landscape', 'photo-block' ) }
								className="dlx-photo-block__aspect-ratio-group"
							>
								<MenuItem
									icon={ '16:10' === aspectRatio ? <Check /> : null }
									isSelected={ '16:10' === aspectRatio }
									onClick={ () => {
										setAttributes( { aspectRatio: '16:10' } );
										onClose();
									} }
								>
									{ __( '16:10', 'photo-block' ) }
								</MenuItem>
								<MenuItem
									icon={ '16:9' === aspectRatio ? <Check /> : null }
									isSelected={ '16:9' === aspectRatio }
									onClick={ () => {
										setAttributes( { aspectRatio: '16:9' } );
										onClose();
									} }
								>
									{ __( '16:9', 'photo-block' ) }
								</MenuItem>
								<MenuItem
									icon={ '4:3' === aspectRatio ? <Check /> : null }
									isSelected={ '4:3' === aspectRatio }
									onClick={ () => {
										setAttributes( { aspectRatio: '4:3' } );
										onClose();
									} }
								>
									{ __( '4:3', 'photo-block' ) }
								</MenuItem>
								<MenuItem
									icon={ '3:2' === aspectRatio ? <Check /> : null }
									isSelected={ '3:2' === aspectRatio }
									onClick={ () => {
										setAttributes( { aspectRatio: '3:2' } );
										onClose();
									} }
								>
									{ __( '3:2', 'photo-block' ) }
								</MenuItem>
							</MenuGroup>
							<MenuGroup
								label={ __( 'Portrait', 'photo-block' ) }
								className="dlx-photo-block__aspect-ratio-group"
							>
								<MenuItem
									icon={ '10:16' === aspectRatio ? <Check /> : null }
									isSelected={ '10:16' === aspectRatio }
									onClick={ () => {
										setAttributes( { aspectRatio: '10:16' } );
										onClose();
									} }
								>
									{ __( '10:16', 'photo-block' ) }
								</MenuItem>
								<MenuItem
									icon={ '9:16' === aspectRatio ? <Check /> : null }
									isSelected={ '9:16' === aspectRatio }
									onClick={ () => {
										setAttributes( { aspectRatio: '9:16' } );
										onClose();
									} }
								>
									{ __( '9:16', 'photo-block' ) }
								</MenuItem>
								<MenuItem
									icon={ '3:4' === aspectRatio ? <Check /> : null }
									isSelected={ '3:4' === aspectRatio }
									onClick={ () => {
										setAttributes( { aspectRatio: '3:4' } );
										onClose();
									} }
								>
									{ __( '3:4', 'photo-block' ) }
								</MenuItem>
								<MenuItem
									icon={ '2:3' === aspectRatio ? <Check /> : null }
									isSelected={ '2:3' === aspectRatio }
									onClick={ () => {
										setAttributes( { aspectRatio: '2:3' } );
										onClose();
									} }
								>
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
						const degrees = getDegrees( -90 );
						setRotateDegrees( degrees );
						rotateImage( photo.url, degrees ).then( ( newImage ) => {
							setFullsizePhoto( newImage );
							setModifiedPhoto( newImage );
						} );
					} }
				/>
				<ToolbarButton
					icon={ <RotateCw /> }
					label={ __( 'Rotate Right', 'photo-block' ) }
					onClick={ () => {
						const degrees = getDegrees( 90 );
						setRotateDegrees( degrees );
						rotateImage( photo.url, degrees ).then( ( newImage ) => {
							setFullsizePhoto( newImage );
							setModifiedPhoto( newImage );
						} );
					} }
				/>
			</ToolbarGroup>
			{ 'custom' === aspectRatio && (
				<ToolbarGroup>
					<ToolbarItem as={ forwardRef( ( args, ref ) => ( <ToolbarAspectRatio attributes={ attributes } setAttributes={ setAttributes } forwardRef={ ref } onChange={ ( values ) => {
						setAttributes( {
							aspectRatioWidth: values.aspectRatioWidth,
							aspectRatioHeight: values.aspectRatioHeight,
							aspectRatioWidthPixels: values.aspectRatioWidthPixels,
							aspectRatioHeightPixels: values.aspectRatioHeightPixels,
						})
					  } }/> ) ) } />
				</ToolbarGroup>
			) }
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
	);

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
			setShouldShowLoading( false );
		}
		fetchImage();
	}, [ shouldFetchImage ] );
	return (
		<>
			{ localInspectorControls }
			{ localToolbar }
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
				{ ! shouldShowLoading && (
					<>
						<ReactCrop
							crop={ crop }
							aspect={ ( aspectRatioWidth / aspectRatioHeight ) }
							onChange={ ( newCrop ) => {
								setCrop( newCrop );
							} }
						>
							<img
								src={ fullsizePhoto?.url ?? '' }
								width={ fullsizePhoto?.width }
								height={ fullsizePhoto?.height }
								alt=""
							/>
						</ReactCrop>
					</>
				) }
			</div>
		</>
	);
};
export default CropScreen;
