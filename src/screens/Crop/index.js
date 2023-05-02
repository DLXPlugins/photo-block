import './editor.scss';

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
import {
	ZoomIn,
	RectangleHorizontal,
	RotateCcw,
	RotateCw,
	Save,
	X,
} from 'lucide-react';
import UploaderContext from '../../contexts/UploaderContext';
import { useEffect } from 'react';
import SendCommand from '../../utils/SendCommand';

const CropScreen = ( props ) => {
	const { screen, setScreen, setInspectorControls, setBlockToolbar } =
		useContext( UploaderContext );
	const { attributes, setAttributes } = props;
	const { photo } = attributes;
	const { url, id, width, height } = photo;
	const [ shouldShowLoading, setShouldShowLoading ] = useState( true );
	const [ shouldFetchImage, setShouldFetchImage ] = useState( true );
	const [ fullsizePhoto, setFullsizePhoto ] = useState( {} );

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
					icon={ <RectangleHorizontal /> }
					label={ __( 'Aspect Ratio', 'photo-block' ) }
				>
					{ ( { onClose } ) => (
						<>
							<MenuGroup>
								<MenuItem>{ __( 'Original', 'photo-block' ) }</MenuItem>
								<MenuItem>{ __( 'Square', 'photo-block' ) }</MenuItem>
							</MenuGroup>
							<MenuGroup label={ __( 'Landscape', 'photo-block' ) }>
								<MenuItem>{ __( '16:10', 'photo-block' ) }</MenuItem>
								<MenuItem>{ __( '16:9', 'photo-block' ) }</MenuItem>
								<MenuItem>{ __( '4:3', 'photo-block' ) }</MenuItem>
								<MenuItem>{ __( '3:2', 'photo-block' ) }</MenuItem>
							</MenuGroup>
							<MenuGroup label={ __( 'Portrait', 'photo-block' ) }>
								<MenuItem>{ __( '10:16', 'photo-block' ) }</MenuItem>
								<MenuItem>{ __( '9:16', 'photo-block' ) }</MenuItem>
								<MenuItem>{ __( '3:4', 'photo-block' ) }</MenuItem>
								<MenuItem>{ __( '2:3', 'photo-block' ) }</MenuItem>
							</MenuGroup>
						</>
					) }
				</ToolbarDropdownMenu>
				<ToolbarButton
					icon={ <RotateCcw /> }
					label={ __( 'Rotate Left', 'photo-block' ) }
					onClick={ () => {} }
				/>
				<ToolbarButton
					icon={ <RotateCw /> }
					label={ __( 'Rotate Right', 'photo-block' ) }
					onClick={ () => {} }
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
	);

	/**
	 * Get inspector controls for the screen.
	 */
	useEffect( () => {
		if ( 'crop' === screen ) {
			setInspectorControls( localInspectorControls );
			setBlockToolbar( localToolbar );
		}
	}, [ screen ] );

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
			setAttributes( { photo: data } );
			setShouldShowLoading( false );
		}
		fetchImage();
	}, [ shouldFetchImage ] );
	return (
		<>
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
						<img
							src={ fullsizePhoto?.url ?? '' }
							width={ width }
							height={ height }
							alt=""
						/>
					</>
				) }
			</div>
		</>
	);
};
export default CropScreen;
