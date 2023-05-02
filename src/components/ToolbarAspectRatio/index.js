/**
 * Uploading including showing Cancel and Retry buttons.
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
	ToolbarGroup,
	ToolbarDropdownMenu,
	Popover,
	PlaceHolder,
	MenuGroup,
	MenuItem,
} from '@wordpress/components';

import { XCircle, Redo2 } from 'lucide-react';

import { useContext, forwardRef } from '@wordpress/element';

import { __ } from '@wordpress/i18n';
import UploaderContext from '../../contexts/UploaderContext';

/**
 * Upload Status component.
 *
 * @param {Object} props - Component props.
 * @return {Object} JSX markup for the component.
 */
const ToolbarAspectRatio = forwardRef( ( props, ref ) => {

	const { attributes, setAttributes } = props;
	// Read in context values.
	const {
		imageFile,
		setIsUploading,
		setIsProcessingUpload,
		isUploadError,
		setIsUploadError,
	} = useContext( UploaderContext );

	const {
		aspectRatioWidth,
		aspectRatioHeight,
		aspectRatioWidthPixels,
		aspectRatioHeightPixels,
		aspectRatioUnit,
	} = attributes;

	return (
		<>
			<div className="dlx-photo-block__component-aspect-ratio">
				<TextControl
					label={ __( 'Aspect Ratio Width', 'photo-block' ) }
					value={ aspectRatioWidth }
					onChange={ ( value ) => {
						setAttributes( { aspectRatioWidth: value } );
					} }
					type="number"
					placeholder={ 16 }
				/>
				<TextControl
					label={ __( 'Aspect Ratio Height', 'photo-block' ) }
					value={ aspectRatioHeight }
					onChange={ ( value ) => {
						setAttributes( { aspectRatioHeight: value } );
					} }
					type="number"
					placeholder={ 9 }
				/>
			</div>
		</>
	);
} );
export default ToolbarAspectRatio;
