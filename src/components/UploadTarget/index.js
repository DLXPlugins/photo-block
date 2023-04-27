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

import {
	Upload,
} from 'lucide-react';

import { __ } from '@wordpress/i18n';

const UploadTarget = ( props ) => {
	return (
		<>
			<div className="dlx-photo-block__upload-target__container">
				<Button
					variant="secondary"
					icon={ <Upload /> }
				>
					{ __( 'Drop Photo Here or Upload', 'photo-block' ) }
				</Button>
			</div>
		</>
	);
};
export default UploadTarget;
