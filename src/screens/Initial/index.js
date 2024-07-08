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
import { useDispatch, useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import UploadTypes from '../../components/UploadTypes';
import UploadTarget from '../../components/UploadTarget';
import UploadStatus from '../../components/UploadStatus';
import { blockStore } from '../../store';

/**
 * InitialScreen component.
 *
 * @param {Object} props - Component props.
 * @return {Function} Component.
 */
const InitialScreen = ( props ) => {
	const { blockUniqueId, clientId } = props;
	const {
		isUploading,
		isProcessingUpload,
		isUploadError,
	} = useSelect( ( select ) => {
		return {
			isUploading: select( blockStore( blockUniqueId ) ).isUploading(),
			isProcessingUpload: select( blockStore( blockUniqueId ) ).isProcessingUpload(),
			isUploadError: select( blockStore( blockUniqueId ) ).isUploadError(),
		};
	} );

	// Set the local inspector controls.
	const localInspectorControls = (
		<InspectorControls />
	);

	return (
		<>
			{ localInspectorControls }
			<div className="dlx-photo-block__screen-initial">
				{ ( ! isUploading && ! isProcessingUpload && ! isUploadError ) && (
					<UploadTypes attributes={ props.attributes } setAttributes={ props.setAttributes } blockUniqueId={ blockUniqueId } clientId={ clientId } />
				) }
				{ ( isUploading || isProcessingUpload || isUploadError ) && (
					<UploadStatus blockUniqueId={ blockUniqueId } />
				) }
				<UploadTarget attributes={ props.attributes } setAttributes={ props.setAttributes } blockUniqueId={ blockUniqueId } />
			</div>
		</>
	);
};
export default InitialScreen;
