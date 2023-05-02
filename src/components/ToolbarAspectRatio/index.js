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

import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';

import classnames from 'classnames';

import { __ } from '@wordpress/i18n';
import UploaderContext from '../../contexts/UploaderContext';
import CalculateAspectRatioFromPixels from '../../utils/CalculateAspectRatioFromPixels';
import CalculateDimensionsFromAspectRatio from '../../utils/CalculateDimensionsFromAspectRatio';
import { useEffect } from 'react';

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

	const getDefaultValues = () => {
		return {
			aspectRatioWidth: attributes.aspectRatioWidth,
			aspectRatioHeight: attributes.aspectRatioHeight,
			aspectRatioWidthPixels: attributes.aspectRatioWidthPixels,
			aspectRatioHeightPixels: attributes.aspectRatioHeightPixels,
			aspectRatioUnit: attributes.aspectRatioUnit,
		};
	};

	const {
		register,
		control,
		handleSubmit,
		setValue,
		getValues,
		reset,
		trigger,
		setError,
		clearErrors,
	} = useForm( {
		defaultValues: getDefaultValues(),
	} );

	const { errors } = useFormState( {
		control,
	} );
	const formValues = useWatch( { control } );
	
	// Broadcast when values are changed.
	useEffect( () => {
		props.onChange( { ...formValues } );
	}, [ formValues ] );

	return (
		<>
			<div
				className={ classnames( 'dlx-photo-block__component-aspect-ratio', {
					'dlx-photo-block__component-aspect-ratio--active':
						'ratio' === getValues( 'aspectRatioUnit' ),
					'dlx-photo-block__component-pixels--active':
						'pixels' === getValues( 'aspectRatioUnit' ),
				} ) }
			>
				{ getValues( 'aspectRatioUnit' ) === 'ratio' && (
					<>
						<Controller
							name="aspectRatioWidth"
							control={ control }
							render={ ( { field: { onChange, value } } ) => (
								<TextControl
									label={ __( 'Aspect Ratio Width', 'photo-block' ) }
									value={ value }
									onChange={ ( newValue ) => {
										onChange( newValue );
									} }
									type="number"
									placeholder={ 16 }
								/>
							) }
						/>
						<span className="dlx-photo-block__component-aspect-ratio-splitter">
							<X />
						</span>
						<Controller
							name="aspectRatioHeight"
							control={ control }
							render={ ( { field: { onChange, value } } ) => (
								<TextControl
									label={ __( 'Aspect Ratio Height', 'photo-block' ) }
									value={ value }
									onChange={ ( newValue ) => {
										onChange( newValue );
									} }
									type="number"
									placeholder={ 9 }
								/>
							) }
						/>
					</>
				) }
				{ getValues( 'aspectRatioUnit' ) === 'pixels' && (
					<>
						<Controller
							name="aspectRatioWidthPixels"
							control={ control }
							render={ ( { field: { onChange, value } } ) => (
								<TextControl
									label={ __( 'Pixel Width', 'photo-block' ) }
									value={ value }
									onChange={ ( newValue ) => {
										onChange( newValue );
									} }
									type="number"
									placeholder={ 16 }
								/>
							) }
						/>
						<span className="dlx-photo-block__component-aspect-ratio-splitter">
							<X />
						</span>
						<Controller
							name="aspectRatioHeightPixels"
							control={ control }
							render={ ( { field: { onChange, value } } ) => (
								<TextControl
									label={ __( 'Pixel Height', 'photo-block' ) }
									value={ value }
									onChange={ ( newValue ) => {
										onChange( newValue );
									} }
									type="number"
									placeholder={ 9 }
								/>
							) }
						/>
					</>
				) }
				<Button
					variant="secondary"
					className="dlx-photo-block__component-aspect-ratio-switch"
					label={ __(
						'Switch modes from Aspect Ratio to Width and Height (pixels)',
						'photo-block'
					) }
					onClick={ () => {
						const aspectRatioWidthPixels = getValues( 'aspectRatioWidthPixels' );
						const aspectRatioHeightPixels = getValues( 'aspectRatioHeightPixels' );
						const aspectRatioWidth = getValues( 'aspectRatioWidth' );
						const aspectRatioHeight = getValues( 'aspectRatioHeight' );
						if ( getValues( 'aspectRatioUnit' ) === 'pixels' ) {
							// Convert aspect width / height to ratio for display.
							const humanImageRatio = CalculateAspectRatioFromPixels(
								aspectRatioWidthPixels,
								aspectRatioHeightPixels
							);
							setValue( 'aspectRatioWidth', humanImageRatio.width );
							setValue( 'aspectRatioHeight', humanImageRatio.height );
							setValue( 'aspectRatioUnit', 'ratio' );
						} else {
							const pixelsWidthHeight = CalculateDimensionsFromAspectRatio( `${ aspectRatioWidth }:${ aspectRatioHeight }`, getValues( 'aspectRatioWidthPixels' ) );
							setValue( 'aspectRatioWidthPixels', pixelsWidthHeight.width );
							setValue( 'aspectRatioHeightPixels', pixelsWidthHeight.height );
							setValue( 'aspectRatioUnit', 'pixels' );
						}
					} }
					tooltip={ __(
						'Switch modes from Aspect Ratio to Width and Height (pixels)',
						'photo-block'
					) }
				>
					{ 'ratio' === getValues( 'aspectRatioUnit' )
						? __( 'Aspect Ratio', 'photo-block' )
						: __( 'Pixels', 'photo-block' ) }
				</Button>
			</div>
		</>
	);
} );
export default ToolbarAspectRatio;
