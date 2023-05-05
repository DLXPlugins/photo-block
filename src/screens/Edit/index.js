import './editor.scss';

import {
	useContext,
	useState,
	useEffect,
	forwardRef,
} from '@wordpress/element';
import {
	Spinner,
	ToolbarGroup,
	ToolbarButton,
	ToolbarItem,
	Popover,
	TabPanel,
	TextControl,
	TextareaControl,
	PanelBody,
	PanelRow,
	SelectControl,
	ButtonGroup,
	Button,
} from '@wordpress/components';
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import {
	Crop,
	Image,
	Accessibility,
	Link,
	Settings,
	Paintbrush,
	Stars,
} from 'lucide-react';
import classnames from 'classnames';

import UploaderContext from '../../contexts/UploaderContext';
import SendCommand from '../../utils/SendCommand';
import MediaLink from '../../components/MediaLink';

const EditScreen = forwardRef( ( props, ref ) => {
	const { attributes, setAttributes } = props;
	const { photo, imageSize, imageDimensions, imageSizePercentage } = attributes;
	const { url, id, width, height } = photo;
	const [ imageLoading, setImageLoading ] = useState( true );
	const [ a11yButton, setA11yButton ] = useState( null );
	const [ a11yPopover, setA11yPopover ] = useState( null );
	const [ inspectorTab, setInspectorTab ] = useState( 'settings' ); // Can be settings|styles.
	const [ imageSizeLoading, setImageSizeLoading ] = useState( false );
	const [ mediaLinkPopover, setMediaLinkPopover ] = useState( false );
	const [ mediaLinkRef, setMediaLinkRef ] = useState( null );

	const { screen, setScreen } = useContext( UploaderContext );

	// Setup useEffect to update image dimensions if empty.
	useEffect( () => {
		if ( ! imageDimensions.width || ! imageDimensions.height ) {
			setAttributes( {
				imageDimensions: {
					...photo,
				},
			} );
		}
	}, [] );

	/**
	 * Retrieve an image based on size from REST API.
	 *
	 * @param {string} size Image size.
	 */
	const getImageFromSize = async( size ) => {
		setImageSizeLoading( true );
		await SendCommand( photoBlock.restNonce, {},
			`${ photoBlock.restUrl + '/get-image-by-size' }/id=${ photo.id }/size=${ size }`, 'GET' ).
			then( ( response ) => {
				setAttributes( { photo: { ...photo, ...response.data } } );
				setAttributes( { imageDimensions: { ...imageDimensions, ...response.data } } );
				setAttributes( { imageSizePercentage: '100' } );
			} ).
			catch( ( error ) => {
				// todo: error checking/display.
				console.error( error );
			} ).then( () => {
				setImageSizeLoading( false );
			} );
	};

	// Take a width/height and calculate the width based on the aspect ratio.
	const calculateWidth = ( imageWidth, imageHeight, newHeight ) => {
		const aspectRatio = imageWidth / imageHeight;

		return Math.round( newHeight * aspectRatio );
	};

	// Take a width/height and calculate the height based on the aspect ratio.
	const calculateHeight = ( imageWidth, imageHeight, newWidth ) => {
		const aspectRatio = imageWidth / imageHeight;
		return Math.round( newWidth / aspectRatio );
	};

	// Image Sizes.
	const imageSizeOptions = [];
	for ( const key in photoBlock.imageSizes ) {
		const size = photoBlock.imageSizes[ key ];
		imageSizeOptions.push( { value: key, label: size.label } );
	}

	// Set settings inspector Controls.
	const settingsInspectorControls = (
		<>
			<PanelBody title={ __( 'Photo Settings', 'photo-block' ) }>
				<PanelRow>
					<TextControl
						label={ __( 'Photo Title', 'photo-block' ) }
						value={ photo.title }
						onChange={ ( title ) => {
							setAttributes( { photo: { ...photo, title } } );
						} }
						placeholder={ __(
							'Please enter a title for this photo.',
							'photo-block'
						) }
					/>
				</PanelRow>
				<PanelRow>
					<TextareaControl
						label={ __( 'Alt Text', 'photo-block' ) }
						value={ photo.alt }
						onChange={ ( alt ) => {
							setAttributes( { photo: { ...photo, alt } } );
						} }
						placeholder={ __( 'Please describe this photo.', 'photo-block' ) }
						help={ __(
							'Alt text provides a description of the photo for screen readers and search engines.',
							'photo-block'
						) }
					/>
				</PanelRow>
				<PanelRow>
					<SelectControl
						label={ __( 'Image Size', 'photo-block' ) }
						value={ imageSize }
						onChange={ ( size ) => {
							setAttributes( { imageSize: size } );
							getImageFromSize( size );
						} }
						options={ imageSizeOptions }
					/>
				</PanelRow>
				<PanelRow className="dlx-photo-block__image-dimensions-row">
					<h2>{ __( 'Image Dimensions', 'photo-block' ) }</h2>
					{ imageSizeLoading && <Spinner /> }
					{ ! imageSizeLoading && (
						<>
							<div className="dlx-photo-block__image-dimensions">
								<TextControl
									label={ __( 'Width', 'photo-block' ) }
									value={ imageDimensions.width ? imageDimensions.width : width }
									onChange={ ( newWidth ) => {
									// Get new height based on new width.
										const calcHeight = calculateHeight( photo.width, photo.height, newWidth );
										const newDimensions = {
											width: newWidth,
											height: calcHeight,
										};
										setAttributes( {
											imageDimensions: { ...imageDimensions, ...newDimensions },
										} );
									} }
									type="number"
								/>
								<TextControl
									label={ __( 'Height', 'photo-block' ) }
									value={ imageDimensions.height ? imageDimensions.height : height }
									onChange={ ( newHeight ) => {
										const calcWidth = calculateWidth( photo.width, photo.height, newHeight );
										const newDimensions = {
											width: calcWidth,
											height: newHeight,
										};
										setAttributes( {
											imageDimensions: { ...imageDimensions, ...newDimensions },
										} );
									} }
									type="number"
								/>
							</div>
							<div className="dlx-photo-block__image-dimensions-buttons">
								<ButtonGroup
									className="dlx-photo-block__image-dimensions-buttons-group"
								>
									<Button
										isSmall
										variant="secondary"
										className={ 
											classnames( 'dlx-photo-block__image-dimensions-buttons-group-button', {
												'is-pressed': imageSizePercentage === '25' } )
										}
										onClick={ () => {
											// Calc width/height based on percentage.
											const calcWidth = Math.round( photo.width * 0.25 );
											const calcHeight = Math.round( photo.height * 0.25 );
											setAttributes( {
												imageSizePercentage: '25',
												imageDimensions: {
													...imageDimensions,
													width: calcWidth,
													height: calcHeight,
												},
											} );
										} }
									>
										{ __( '25%', 'photo-block' ) }
									</Button>
									<Button
										isSmall
										className={ 
											classnames( 'dlx-photo-block__image-dimensions-buttons-group-button', {
												'is-pressed': imageSizePercentage === '50' } )
										}
										variant="secondary"
										onClick={ () => {
											// Calc width/height based on percentage.
											const calcWidth = Math.round( photo.width * 0.50 );
											const calcHeight = Math.round( photo.height * 0.50 );
											setAttributes( {
												imageSizePercentage: '50',
												imageDimensions: {
													...imageDimensions,
													width: calcWidth,
													height: calcHeight,
												},
											} );
										} }
									>
										{ __( '50%', 'photo-block' ) }
									</Button>
									<Button
										isSmall
										variant="secondary"
										className={ 
											classnames( 'dlx-photo-block__image-dimensions-buttons-group-button', {
												'is-pressed': imageSizePercentage === '75' } )
										}
										onClick={ () => {
											// Calc width/height based on percentage.
											const calcWidth = Math.round( photo.width * 0.75 );
											const calcHeight = Math.round( photo.height * 0.75 );
											setAttributes( {
												imageSizePercentage: '75',
												imageDimensions: {
													...imageDimensions,
													width: calcWidth,
													height: calcHeight,
												},
											} );
										} }
									>
										{ __( '75%', 'photo-block' ) }
									</Button>
									<Button
										isSmall
										variant="secondary"
										className={ 
											classnames( 'dlx-photo-block__image-dimensions-buttons-group-button', {
												'is-pressed': imageSizePercentage === '100' } )
										}
										onClick={ () => {
											// Calc width/height based on percentage.
											const calcWidth = Math.round( photo.width );
											const calcHeight = Math.round( photo.height );
											setAttributes( {
												imageSizePercentage: '100',
												imageDimensions: {
													...imageDimensions,
													width: calcWidth,
													height: calcHeight,
												},
											} );
										} }
									>
										{ __( '100%', 'photo-block' ) }
									</Button>
								</ButtonGroup>
							</div>
						</>
					) }
				</PanelRow>
			</PanelBody>
		</>
	);

	const stylesInspectorControls = <>styles go here</>;

	const interfaceTabs = (
		<TabPanel
			className="dlx-photo-block__inspector-tabs"
			activeClass="active-tab"
			onSelect={ ( tab ) => {
				setInspectorTab( tab );
			} }
			children={ () => <></> }
			tabs={ [
				{
					name: 'settings',
					title: __( 'Settings', 'photo-block' ),
					className: 'dlx-photo-block__inspector-tab',
					icon: <Settings />,
				},
				{
					name: 'styles',
					title: __( 'Styles', 'photo-block' ),
					className: 'dlx-photo-block__inspector-tab',
					icon: <Paintbrush />,
				},
			] }
		/>
	);

	// Set the local inspector controls.
	const localInspectorControls = (
		<InspectorControls>
			{ interfaceTabs }
			{ inspectorTab === 'settings' && settingsInspectorControls }
			{ inspectorTab === 'styles' && stylesInspectorControls }
		</InspectorControls>
	);

	const localToolbar = (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon={ <Crop /> }
						label={ __( 'Crop', 'photo-block' ) }
						onClick={ () => {
							setScreen( 'crop' );
						} }
					>
						{ __( 'Crop', 'photo-block' ) }
					</ToolbarButton>
					<ToolbarButton
						icon={ <Stars /> }
						label={ __( 'Edit Photo', 'photo-block' ) }
						onClick={ () => {
							// setScreen( 'initial' );
						} }
					>
						{ __( 'Edit', 'photo-block' ) }
					</ToolbarButton>
				</ToolbarGroup>
				<ToolbarGroup>
					<ToolbarButton
						icon={ <Image /> }
						label={ __( 'Replace Photo', 'photo-block' ) }
						onClick={ () => {
							setScreen( 'initial' );
						} }
					>
						{ __( 'Replace', 'photo-block' ) }
					</ToolbarButton>
				</ToolbarGroup>
				<ToolbarGroup>
					<ToolbarButton
						icon={ <Accessibility /> }
						label={ __( 'Set Accessibility Options', 'photo-block' ) }
						onClick={ () => {
							setA11yPopover( ! a11yPopover );
						} }
						ref={ setA11yButton }
					/>
					<ToolbarButton
						icon={ <Link /> }
						label={ __( 'Set Link Options', 'photo-block' ) }
						onClick={ () => {
							setMediaLinkPopover( ! mediaLinkPopover );
						} }
						ref={ setMediaLinkRef }
					/>
				</ToolbarGroup>
			</BlockControls>
			{ mediaLinkPopover && (
				<MediaLink attributes={ attributes } setAttributes={ setAttributes } anchorRef={ mediaLinkRef } onClose={ () => {
					setMediaLinkPopover( false );
				}} />
			) }
			{ a11yPopover && (
				<Popover
					position="bottom center"
					onClose={ () => {
						setA11yPopover( false );
					} }
					anchor={ a11yButton }
				>
					<div className="dlx-photo-block__a11y-popover">
						<h3>{ __( 'Accessibility Options', 'photo-block' ) }</h3>
						<TextControl
							label={ __( 'Photo Title', 'photo-block' ) }
							value={ photo.title }
							onChange={ ( title ) => {
								setAttributes( { photo: { ...photo, title } } );
							} }
							placeholder={ __(
								'Please enter a title for this photo.',
								'photo-block'
							) }
							help={ __(
								'The title is used as a tooltip when hovering over the image.', 'photo-block' ) }
						/>
						<TextareaControl
							label={ __( 'Alt Text', 'photo-block' ) }
							value={ photo.alt }
							onChange={ ( alt ) => {
								setAttributes( { photo: { ...photo, alt } } );
							} }
							placeholder={ __( 'Please describe this image.', 'photo-block' ) }
							help={ __(
								'Alt text provides a description of the image for screen readers and search engines.',
								'photo-block'
							) }
						/>
					</div>
				</Popover>
			) }
		</>
	);

	return (
		<>
			{ localInspectorControls }
			{ localToolbar }
			<div className="dlx-photo-block__screen-edit">
				{ imageLoading && (
					<div
						className="dlx-photo-block__screen-edit-spinner"
						style={ {
							minWidth: width,
							minHeight: height,
							maxWidth: '100%',
							maxHeight: '100%',
						} }
					>
						<Spinner />
					</div>
				) }
				<img
					src={ url }
					width={ imageDimensions.width }
					height={ imageDimensions.height }
					alt=""
					onLoad={ () => {
						setImageLoading( false );
					} }
					ref={ ref }
				/>
			</div>
		</>
	);
} );
export default EditScreen;
