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
	Modal,
	PlaceHolder,
	MenuGroup,
	MenuItem,
} from '@wordpress/components';

import { XCircle, Redo2, X } from 'lucide-react';

import { useContext, forwardRef, useState } from '@wordpress/element';
import classnames from 'classnames';

import { __ } from '@wordpress/i18n';
import UploaderContext from '../../contexts/UploaderContext';
import CalculateAspectRatioFromPixels from '../../utils/CalculateAspectRatioFromPixels';

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

	const [ isModalOpen, setIsModalOpen ] = useState( false );
	const [ modalRef, setModalRef ] = useState( null );

	const {
		aspectRatioWidth,
		aspectRatioHeight,
		aspectRatioWidthPixels,
		aspectRatioHeightPixels,
		aspectRatioUnit,
	} = attributes;

	return (
		<>
			<div
				className={ classnames( 'dlx-photo-block__component-aspect-ratio', {
					'dlx-photo-block__component-aspect-ratio--active':
						'ratio' === aspectRatioUnit,
					'dlx-photo-block__component-pixels--active':
						'pixels' === aspectRatioUnit,
				} ) }
			>
				<TextControl
					label={ __( 'Aspect Ratio Width', 'photo-block' ) }
					value={ aspectRatioWidth }
					onChange={ ( value ) => {
						setAttributes( { aspectRatioWidth: value } );
					} }
					type="number"
					placeholder={ 16 }
				/>
				<span className="dlx-photo-block__component-aspect-ratio-splitter">
					<X />
				</span>
				<TextControl
					label={ __( 'Aspect Ratio Height', 'photo-block' ) }
					value={ aspectRatioHeight }
					onChange={ ( value ) => {
						setAttributes( { aspectRatioHeight: value } );
					} }
					type="number"
					placeholder={ 9 }
				/>
				<Button
					variant="secondary"
					className="dlx-photo-block__component-aspect-ratio-switch"
					label={ __(
						'Switch modes from Aspect Ratio to Width and Height (pixels)',
						'photo-block'
					) }
					onClick={ () => {
						if ( aspectRatioUnit === 'pixels' ) {
							// Convert aspect width / height to ratio for display.
							const humanImageRatio = CalculateAspectRatioFromPixels(
								aspectRatioWidthPixels,
								aspectRatioHeightPixels
							);
							console.log( humanImageRatio );
							setAttributes( {
								aspectRatioWidth: humanImageRatio.width,
								aspectRatioHeight: humanImageRatio.height,
								aspectRatioUnit: 'ratio',
							} );
						} else {
							// Get 16:9 aspect ratio to pixels.
							const pxAspectRatioWidth =
								aspectRatioWidth * aspectRatioHeightPixels;
							const pxAspectRatioHeight =
								aspectRatioHeight * aspectRatioWidthPixels;
							setAttributes( {
								aspectRatioWidthPixels: pxAspectRatioWidth,
								aspectRatioHeightPixels: pxAspectRatioHeight,
								aspectRatioUnit: 'pixels',
							} );
						}
					} }
					tooltip={ __(
						'Switch modes from Aspect Ratio to Width and Height (pixels)',
						'photo-block'
					) }
				>
					{ 'ratio' === aspectRatioUnit
						? __( 'Aspect Ratio', 'photo-block' )
						: __( 'Pixels', 'photo-block' ) }
				</Button>
			</div>
		</>
	);
} );
export default ToolbarAspectRatio;
