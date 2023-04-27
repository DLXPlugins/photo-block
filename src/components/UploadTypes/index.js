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
	Database,
	Link,
	Image,
	Upload,
} from 'lucide-react';

import { __ } from '@wordpress/i18n';

const UploadTypes = ( props ) => {
	return (
		<>
			<div className="dlx-photo-block__upload-types__container">
				<Button
					variant="secondary"
					icon={ <Upload /> }
				>
					{ __( 'Upload', 'photo-block' ) }
				</Button>
				<Button
					variant="secondary"
					icon={ <Image /> }
				>
					{ __( 'Media Library', 'photo-block' ) }
				</Button>
				<Button
					variant="secondary"
					icon={ <Link /> }
				>
					{ __( 'URL', 'photo-block' ) }
				</Button>
				<Button
					variant="secondary"
					icon={ <Database /> }
				>
					{ __( 'Data', 'photo-block' ) }
				</Button>
			</div>
		</>
	);
};
export default UploadTypes;
