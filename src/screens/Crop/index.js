import './editor.scss';

import { useContext, useState, forwardRef } from '@wordpress/element';
import { Spinner, PanelBody,
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
	MenuItem, } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
} from '@wordpress/block-editor';
import UploaderContext from '../../contexts/UploaderContext';
import { useEffect } from 'react';
import SendCommand from '../../utils/SendCommand';



const CropScreen = ( props ) => {
	const { screen, setScreen, setInspectorControls } = useContext( UploaderContext );
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
				<PanelRow>
					Options here.
				</PanelRow>
			</PanelBody>
		</InspectorControls>
	);

	/**
	 * Get a unique ID for the block for inline styling if necessary.
	 */
	useEffect( () => {
		if ( 'crop' === screen ) {
			setInspectorControls( localInspectorControls );
		}
	}, [ screen ] );

	useEffect( () => {
		async function fetchImage() {
			const response = await SendCommand( photoBlock.restNonce, {}, `${ photoBlock.restUrl + '/get-image' }/id=${ photo.id }`, 'GET' );
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
				{
					shouldShowLoading && (
						<div className="dlx-photo-block__screen-edit-spinner" style={ { minWidth: width, minHeight: height, maxWidth: '100%', maxHeight: '100%' } }><h3>{ __( 'Loading Full Size Image', 'photo-block' ) }</h3><Spinner /></div>
					)
				}
				{
					! shouldShowLoading && (
						<>
							<img src={ fullsizePhoto?.url ?? '' } width={ width } height={ height } alt="" />
						</>
					)
				}
			</div>
		</>
	);
};
export default CropScreen;
