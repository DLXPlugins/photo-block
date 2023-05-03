/**
 * Upload data row including Upload|Media Library|URL|Data.
 */
import './editor.scss';

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

import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

import {
	Database,
	Link,
	Image,
	Upload,
	CheckCircle2,
	XCircle,
	ArrowBigLeftDash,
} from 'lucide-react';

import { useContext, useState, useEffect, useRef } from '@wordpress/element';

import { __ } from '@wordpress/i18n';

import UploaderContext from '../../contexts/UploaderContext';

/**
 * UploadTypes component.
 *
 * @param {Object} props - Component props.
 * @return {Function} Component.
 */
const UploadTypes = ( props ) => {
	const { attributes, setAttributes } = props;

	// Get context.
	const {
		imageFile,
		setScreen,
		filepondInstance,
		setImageFile,
	} = useContext( UploaderContext );

	const [ isUrlSelected, setIsUrlSelected ] = useState( false );
	const [ url, setUrl ] = useState( '' );
	const [ urlInput, setUrlInput ] = useState( null );

	/**
	 * Focus on url when entered.
	 */
	useEffect( () => {
		if ( null !== urlInput ) {
			urlInput.focus();
		}
	}, [ urlInput ] );

	if ( isUrlSelected ) {
		return (
			<>
				<div className="dlx-photo-block__upload-types-url__container">
					<TextControl
						type="url"
						label={ __( 'Photo URL', 'photo-block' ) }
						value={ url }
						onChange={ ( value ) => {
							setUrl( value );
						} }
						ref={ setUrlInput }
						placeholder={ __( 'Please enter a valid image URL', 'photo-block' ) }
					/>
					<Button
						variant="primary"
						icon={ <CheckCircle2 /> }
						className="dlx-photo-block__upload-types-url__upload"
						onClick={ () => {
							console.log( url );
							filepondInstance.addFile( url );
						} }
						label={ __( 'Upload', 'photo-block' ) }
					/>
					<Button
						variant="secondary"
						icon={ <XCircle /> }
						className="dlx-photo-block__upload-types-url__cancel"
						onClick={ () => {
							setIsUrlSelected( false );
						} }
						label={ __( 'Cancel', 'photo-block' ) }
					/>
				</div>
			</>
		);
	}

	return (
		<>
			<div className="dlx-photo-block__upload-types__container">
				{
					imageFile && (
						<Button
							variant="primary"
							icon={ <ArrowBigLeftDash /> }
							className="dlx-photo-block__upload-types__back"
							onClick={ () => {
								setScreen( 'edit' );
							} }
						>
							{ __( 'Back', 'photo-block' ) }
						</Button>
					)
				}
				<Button
					variant="secondary"
					icon={ <Upload /> }
					onClick={ () => {
						filepondInstance.browse();
					} }
				>
					{ __( 'Upload', 'photo-block' ) }
				</Button>
				<MediaUploadCheck>
					<MediaUpload
						allowedTypes="image"
						mode="browse"
						multiple={ false }
						title={ __( 'Please select a Photo', 'photo-block' ) }
						render={ ( { open } ) => (
							<Button
								variant="secondary"
								icon={ <Image /> }
								onClick={ () => {
									open();
								} }
							>
								{ __( 'Media Library', 'photo-block' ) }
							</Button>
						) }
						onSelect={ ( media ) => {
							const selectedMedia = {
								id: media.id,
								url: media.sizes?.large?.url ?? media.sizes.full.url,
								width: media.sizes?.large?.width ?? media.sizes.full.width,
								height: media.sizes?.large?.height ?? media.sizes.full.height,
								alt: media.alt,
								caption: media.caption,
							};
							setAttributes( {
								photo: selectedMedia,
							} );
							setImageFile( selectedMedia );
							setScreen( 'edit' );
						} }
					/>
				</MediaUploadCheck>

				<Button
					variant="secondary"
					icon={ <Link /> }
					onClick={ () => {
						setIsUrlSelected( true );
					} }
				>
					{ __( 'URL', 'photo-block' ) }
				</Button>
				<Button
					variant="secondary"
					icon={ <Database /> }
					onClick={ () => {
						setScreen( 'data' );
					} }
				>
					{ __( 'Data', 'photo-block' ) }
				</Button>
			</div>
		</>
	);
};
export default UploadTypes;
