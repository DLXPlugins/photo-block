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

import { FilePond, registerPlugin } from 'react-filepond';

import { forwardRef } from '@wordpress/element';


import {
	Upload,
} from 'lucide-react';

import { __ } from '@wordpress/i18n';

const UploadTarget = forwardRef( ( props, ref ) => {
	return (
		<>
			<div className="dlx-photo-block__upload-target__container">
				<div className="dlx-photo-block__upload-target__filepond">
					<FilePond
						allowMultiple={ false }
						maxFiles={ 3 }
						server="/api"
						credits={ false }
						stylePanelLayout="integrated"
						labelIdle=""
						labelFileLoading={ false }
						allowRemove={ false }
						allowRevert={ false }
						ref={ ref }
					/>
				</div>
				<div className="dlx-photo-block__upload-target__label">
					<div className="dlx-photo-block__upload-target__label-svg"><Upload /></div>
					<div className="dlx-photo-block__upload-target__label-text">
						{ __( 'Drag Photo Here or Upload', 'photo-block' ) }
					</div>
				</div>
			</div>
		</>
	);
} );
export default UploadTarget;
