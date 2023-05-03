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
	ArrowBigLeftDash,
} from 'lucide-react';

import { useContext, useCallback } from '@wordpress/element';

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
