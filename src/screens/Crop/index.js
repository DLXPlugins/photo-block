import './editor.scss';
import 'react-image-crop/src/ReactCrop.scss';

import { useContext, useState, forwardRef, useEffect } from '@wordpress/element';
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
import { Check, RotateCcw, RotateCw, Save, X, Lock, Loader2 } from 'lucide-react';
import { useSelect, useDispatch } from '@wordpress/data';
import ReactCrop from 'react-image-crop';
import classnames from 'classnames';
import blockStore from '../../store';
import SendCommand from '../../utils/SendCommand';
import AspectRatioIcon from '../../components/Icons/AspectRatio';
import ToolbarAspectRatio from '../../components/ToolbarAspectRatio';
import CalculateAspectRatioFromPixels from '../../utils/CalculateAspectRatioFromPixels';
import CalculateDimensionsFromAspectRatio from '../../utils/CalculateDimensionsFromAspectRatio';

const CropScreen = ( props ) => {

	const { attributes, setAttributes, blockUniqueId } = props;

	const {
		setScreen,
		setImageData,
		setPhotoMode,
	} = useDispatch( blockStore( blockUniqueId ) );

	const [ shouldShowLoading, setShouldShowLoading ] = useState( true );
	const [ shouldFetchImage, setShouldFetchImage ] = useState( true );
	const [ fullsizePhoto, setFullsizePhoto ] = useState( {} );
	const [ modifiedPhoto, setModifiedPhoto ] = useState( null );
	const [ rotateDegrees, setRotateDegrees ] = useState( 0 );
	const [ crop, setCrop ] = useState( null );
	const [ lockCrop, setLockCrop ] = useState( true );
	const [ isSaving, setIsSaving ] = useState( false );
	const [ cropAspectRatio, setCropAspectRatio ] = useState( undefined );
	const [ cropMaxWidth, setCropMaxWidth ] = useState( null ); // Used for setting the max crop size when selecting pixel values for aspect ratio.
	const [ cropMaxHeight, setCropMaxHeight ] = useState( null ); // Used for setting the max crop size when selecting pixel values for aspect ratio.
	const [ reactCropImageRef, setReactCropImageRef ] = useState( null );

	const {
		imageData,
		uniqueId,
		aspectRatio,
		aspectRatioUnit,
		aspectRatioWidth,
		aspectRatioHeight,
		aspectRatioWidthPixels,
		aspectRatioHeightPixels,
	} = attributes;

	const { url, id, width, height } = imageData;

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

	/**
	 * Crop an image using the REST API.
	 *
	 * @param {Object} cropObject React crop object.
	 * @param {number} imageId    The image ID.
	 * @param {number} rotate     Image rotation in degrees.
	 *
	 * @return {Promise} The REST API promise.
	 */
	const cropImage = async( cropObject, imageId, rotate ) => {
		// Get image dimensions relative to viewport.
		const displayDimensionsWidth = reactCropImageRef.offsetWidth;
		const displayDimensionsHeight = reactCropImageRef.offsetHeight;
		const originalDimensionsWidth = reactCropImageRef.naturalWidth;
		const originalDimensionsHeight = reactCropImageRef.naturalHeight;

		// Get crop dimensions to send to server.
		const scaleX = originalDimensionsWidth / displayDimensionsWidth;
		const scaleY = originalDimensionsHeight / displayDimensionsHeight;

		// Scale crop coordinates
		const scaledCropX = cropObject.x * scaleX;
		const scaledCropY = cropObject.y * scaleY;
		const scaledCropWidth = cropObject.width * scaleX;
		const scaledCropHeight = cropObject.height * scaleY;
		return await SendCommand(
			photoBlock.restNonce,
			{
				cropX: scaledCropX,
				cropY: scaledCropY,
				cropWidth: scaledCropWidth,
				cropHeight: scaledCropHeight,
				imageId,
				rotateDegrees: rotate,
			},
			`${ photoBlock.restUrl + '/image/crop' }`,
			'POST'
		);
	};

	/**
	 * Set a new center crop based on the image dimensions.
	 *
	 * @param {number} imageWidth     The image width in pixels.
	 * @param {number} imageHeight    The image height in pixels.
	 * @param {number} newAspectRatio The aspect ratio.
	 * @param {number} maximumWidth   The maximum width in pixels.
	 * @param {number} maximumHeight  The maximum height in pixels.
	 */
	const setCenterCrop = ( imageWidth, imageHeight, newAspectRatio, maximumWidth = null, maximumHeight = null ) => {
		const initialCropRatio = 1;

		

		// Get the initial crop size.
		const minDimension = Math.min( imageWidth, imageHeight );
		const initialCropSize = minDimension * initialCropRatio;

		// Get the crop width/height.
		let cropWidth, cropHeight;
		if ( imageWidth < imageHeight ) {
			cropWidth = initialCropSize;
			cropHeight = cropWidth / newAspectRatio;
		} else {
			cropHeight = initialCropSize;
			cropWidth = cropHeight * newAspectRatio;
		}
		if ( maximumWidth && maximumHeight ) {
			cropWidth = maximumWidth;
			cropHeight = maximumHeight;
		}

		// Check if crop width/height exceed image dimensions.
		if ( cropWidth > imageWidth ) {
			cropWidth = imageWidth;
			cropHeight = cropWidth / newAspectRatio;
		}
		if ( cropHeight > imageHeight ) {
			cropHeight = imageHeight;
			cropWidth = cropHeight * newAspectRatio;
		}

		// Calculate X/Y vars.
		const x = Math.max( ( imageWidth - cropWidth ) / 2, 0 );
		const y = Math.max( ( imageHeight - cropHeight ) / 2, 0 );

		// Set crop object.
		const newCrop = {
			aspect: cropWidth / cropHeight,
			unit: 'px',
			x,
			y,
			width: cropWidth,
			height: cropHeight,
		};
		if ( maximumWidth && maximumHeight ) {
			newCrop.maxWidth = maximumWidth;
			newCrop.maxHeight = maximumHeight;
		}
		setCrop( newCrop );
	};

	/**
	 * Fetch the full size image for cropping.
	 */
	useEffect( () => {
		async function fetchImage() {
			const response = await SendCommand(
				photoBlock.restNonce,
				{},
				`${ photoBlock.restUrl + '/get-image' }/id=${ imageData.id }`,
				'GET'
			);
			const { data } = response;
			setFullsizePhoto( data );

			let newAspectRatio = aspectRatioWidth / aspectRatioHeight;
			if ( 'pixels' === aspectRatioUnit ) {
				const humanImageRatio = CalculateAspectRatioFromPixels(
					aspectRatioWidthPixels,
					aspectRatioHeightPixels
				);
				newAspectRatio = humanImageRatio.width / humanImageRatio.height;
			}

			// Set crop value.
			setShouldShowLoading( false );
			setCropAspectRatio( newAspectRatio );
		}
		fetchImage();
	}, [ shouldFetchImage ] );

	/* Set Center Crop when image has finished loading */
	useEffect( () => {
		if ( reactCropImageRef ) {
			setCenterCrop( reactCropImageRef.offsetWidth, reactCropImageRef.offsetHeight, cropAspectRatio );
		}
	}, [ reactCropImageRef ] );

	/**
	 * Create new crop object when aspect ratio changes.
	 *
	 * @param {number} newAspectRatioWidth  The aspect ratio width.
	 * @param {number} newAspectRatioHeight The aspect ratio height.
	 * @param {number} maximumWidth         The maximum width in pixels.
	 * @param {number} maximumHeight        The maximum height in pixels.
	 */
	const handleAspectRatioChange = ( newAspectRatioWidth, newAspectRatioHeight, maximumWidth = null, maximumHeight = null ) => {
		// Aspect ratio.
		let newAspectRatio = newAspectRatioWidth / newAspectRatioHeight;
		if ( null !== maximumWidth && null !== maximumHeight ) {
			newAspectRatio = maximumWidth / maximumHeight;
			setCropMaxWidth( maximumWidth );
			setCropMaxHeight( maximumHeight );
		} else {
			setCropMaxWidth( null );
			setCropMaxHeight( null );
		}
		setCropAspectRatio( newAspectRatio );
		setCenterCrop( reactCropImageRef.offsetWidth, reactCropImageRef?.offsetHeight, newAspectRatio, maximumWidth, maximumHeight );
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
										handleAspectRatioChange( fullsizePhoto?.width, fullsizePhoto?.height );
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
										handleAspectRatioChange( 1, 1 );
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
										handleAspectRatioChange( 16, 10 );
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
										handleAspectRatioChange( 16, 9 );
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
										handleAspectRatioChange( 4, 3 );
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
										handleAspectRatioChange( 3, 2 );
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
										handleAspectRatioChange( 10, 16 );
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
										handleAspectRatioChange( 9, 16 );
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
										handleAspectRatioChange( 3, 4 );
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
										handleAspectRatioChange( 2, 3 );
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
					className="dlx-photo-block__lock-crop-button"
					icon={ <Lock /> }
					label={ lockCrop ? __( 'UnLock Aspect Ratio', 'photo-block' ) : __( 'Lock Aspect Ratio', 'photo-block' ) }
					isActive={ lockCrop }
					onClick={ () => {
						setLockCrop( ! lockCrop );
					} }
				/>
				<ToolbarButton
					icon={ <RotateCcw /> }
					label={ __( 'Rotate Left', 'photo-block' ) }
					onClick={ () => {
						const degrees = getDegrees( -90 );
						setRotateDegrees( degrees );
						rotateImage( imageData.url, degrees ).then( ( newImage ) => {
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
						rotateImage( imageData.url, degrees ).then( ( newImage ) => {
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
							aspectRatioWidthPixels: values.aspectRatioWidthPixels,
							aspectRatioHeightPixels: values.aspectRatioHeightPixels,
						} );
						if ( 'pixels' === values.aspectRatioUnit ) {
							const humanImageRatio = CalculateAspectRatioFromPixels(
								values.aspectRatioWidthPixels,
								values.aspectRatioHeightPixels
							);
							setAttributes( {
								aspectRatioWidth: humanImageRatio.width,
								aspectRatioHeight: humanImageRatio.height,
							} );
							handleAspectRatioChange( humanImageRatio.width, humanImageRatio.height, values.aspectRatioWidthPixels, values.aspectRatioHeightPixels );
						} else {
							setAttributes( {
								aspectRatioWidth: values.aspectRatioWidth,
								aspectRatioHeight: values.aspectRatioHeight,
							} );
							handleAspectRatioChange( values.aspectRatioWidth, values.aspectRatioHeight );
						}
					} } /> ) ) } />
				</ToolbarGroup>
			) }
			<ToolbarGroup>
				<ToolbarButton
					icon={ isSaving ? <Loader2 /> : <Save /> }
					className={ classnames( 'dlx-photo-block__save-button', {
						'is-saving': isSaving } ) }
					variant="primary"
					label={ __( 'Apply Crop', 'photo-block' ) }
					onClick={ () => {
						if ( isSaving ) {
							return;
						}
						setIsSaving( true );

						const croppedImage = cropImage( crop, imageData.id, rotateDegrees );
						croppedImage.then( ( imageResponse ) => {
							const { data } = imageResponse;
							if ( data.success ) {
								setImageData( data.data.attachment );
								setAttributes( {
									photoMode: 'photo',
									imageData: data.data.attachment,
								} );
								setPhotoMode( 'photo' );
								setScreen( 'edit' );
							} else {
								// todo: error handling.
							}
						} ).catch( ( error ) => {
						} ).then( () => {
							setIsSaving( false );
						} );
					} }
				>
					{ isSaving ? __( 'Saving…', 'photo-block' ) : __( 'Apply Crop', 'photo-block' ) }
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
							aspect={ lockCrop ? cropAspectRatio : null }
							crop={ crop }
							onChange={ ( newCrop ) => {
								setCrop( newCrop );
							} }
							ruleOfThirds={ true }
							maxWidth={ cropMaxWidth ?? undefined }
							maxHeight={ cropMaxHeight ?? undefined }
						>
							<img
								src={ fullsizePhoto?.url ?? '' }
								width={ fullsizePhoto?.width }
								height={ fullsizePhoto?.height }
								style={ {
									maxWidth: '100%',
									height: 'auto',
								} }
								alt=""
								ref={ setReactCropImageRef }
							/>
						</ReactCrop>
					</>
				) }
			</div>
		</>
	);
};
export default CropScreen;
