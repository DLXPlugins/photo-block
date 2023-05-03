/**
 * This is the initial screen of the block. It is the first screen that the user sees when they add the block to the editor.
 */

import { useContext } from '@wordpress/element';
import {
	InspectorControls,
} from '@wordpress/block-editor';
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
import UploaderContext from '../../contexts/UploaderContext';
import UploadTypes from '../../components/UploadTypes';
import UploadTarget from '../../components/UploadTarget';
import UploadStatus from '../../components/UploadStatus';

/**
 * InitialScreen component.
 *
 * @param {Object} props - Component props.
 * @return {Function} Component.
 */
const InitialScreen = ( props ) => {
	const { screen, isUploading, isProcessingUpload, isUploadError } = useContext( UploaderContext );

	const { attributes, setAttributes } = props;
	const { mediaLibraryAspectRatio, mediaLibrarySuggestedWidth, mediaLibrarySuggestedHeight } = attributes;

	// Set the local inspector controls.
	const localInspectorControls = (
		<InspectorControls>
			<PanelBody
				title={ __( 'Media Library Settings', 'photo-block' ) }
				initialOpen={ true }
			>
				<PanelRow>
					<TextControl
						label={ __( 'Aspect Ratio', 'photo-block' ) }
						value={ mediaLibraryAspectRatio }
						onChange={ ( value ) => {
							setAttributes( { mediaLibraryAspectRatio: value } );
						} }
					/>
				</PanelRow>
				<PanelRow>
					<TextControl
						label={ __( 'Suggested Width', 'photo-block' ) }
						value={ mediaLibrarySuggestedWidth }
						type="number"
						onChange={ ( value ) => {
							setAttributes( { mediaLibrarySuggestedWidth: value } );
						} }
						help={ __( 'Suggested width in pixels for the image in the media library.', 'photo-block' ) }
					/>
				</PanelRow>
				<PanelRow>
					<TextControl
						label={ __( 'Suggested Height', 'photo-block' ) }
						value={ mediaLibrarySuggestedHeight }
						type="number"
						onChange={ ( value ) => {
							setAttributes( { mediaLibrarySuggestedHeight: value } );
						} }
						help={ __( 'Suggested height in pixels for the image in the media library.', 'photo-block' ) }
					/>
				</PanelRow>
			</PanelBody>
		</InspectorControls>
	);

	return (
		<>
			{ localInspectorControls }
			<div className="dlx-photo-block__screen-initial">
				{ ( ! isUploading && ! isProcessingUpload && ! isUploadError ) && (
					<UploadTypes attributes={ props.attributes } setAttributes={ props.setAttributes } />
				) }
				{ ( isUploading || isProcessingUpload || isUploadError ) && (
					<UploadStatus />
				) }
				<UploadTarget attributes={ props.attributes } setAttributes={ props.setAttributes } />
			</div>
		</>
	);
};
export default InitialScreen;
