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
	Spinner,
} from '@wordpress/components';

import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

import { forwardRef } from '@wordpress/element';


import {
	Upload,
} from 'lucide-react';

import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

const UploadTarget = forwardRef( ( props, ref ) => {

	const [ isLoadingImage, setIsLoadingImage ] = useState( false );
	return (
		<>
			<div className="dlx-photo-block__upload-target__container">
				<div className="dlx-photo-block__upload-target__filepond">
					{ isLoadingImage && (
						<>
							<div className="dlx-photo-block__upload-target__filepond__loading">
								<Spinner />
							</div>
							<div className="dlx-photo-block__upload-target__filepond__loading-label">
								{ __( 'Uploading Image', 'photo-block' ) }
							</div>
						</>
					) }
					<FilePond
						allowMultiple={ false }
						maxFiles={ 1 }
						server="/api"
						credits={ false }
						stylePanelLayout="integrated"
						labelIdle=""
						labelFileLoading={ false }
						allowRemove={ false }
						allowRevert={ false }
						ref={ ref }
						onaddfilestart={ ( file ) => {
							setIsLoadingImage( true );
						} }
					/>
				</div>
				{ ! isLoadingImage && (
					<div className="dlx-photo-block__upload-target__label">
						<div className="dlx-photo-block__upload-target__label-svg"><Upload /></div>
						<div className="dlx-photo-block__upload-target__label-text">
							{ __( 'Drag Photo Here or Upload', 'photo-block' ) }
						</div>
					</div>
				) }
				
			</div>
		</>
	);
} );
export default UploadTarget;
