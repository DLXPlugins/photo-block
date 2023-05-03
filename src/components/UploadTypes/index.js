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
	ArrowBigLeftDash,
} from 'lucide-react';

import { forwardRef, useContext } from '@wordpress/element';

import { __ } from '@wordpress/i18n';

import UploaderContext from '../../contexts/UploaderContext';

/**
 * UploadTypes component.
 *
 * @param {Object} props - Component props.
 * @return {Function} Component.
 */
const UploadTypes = ( props ) => {

	// Get context.
	const {
		imageFile,
		setScreen,
		filepondInstance,
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
