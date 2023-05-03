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

	// Set the local inspector controls.
	const localInspectorControls = (
		<InspectorControls />
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
