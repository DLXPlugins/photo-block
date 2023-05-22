/**
 * Uploading including showing Cancel and Retry buttons.
 */
import './editor.scss';
import {
	TextControl,
	Button,
} from '@wordpress/components';

import { X } from 'lucide-react';

import { useContext, forwardRef, useState } from '@wordpress/element';

import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';

import classnames from 'classnames';

import { __ } from '@wordpress/i18n';
import CalculateAspectRatioFromPixels from '../../utils/CalculateAspectRatioFromPixels';
import CalculateDimensionsFromAspectRatio from '../../utils/CalculateDimensionsFromAspectRatio';
import ColonIcon from '../Icons/ColonIcon';
/**
 * Upload Status component.
 *
 * @param {Object} props - Component props.
 * @return {Object} JSX markup for the component.
 */
const ToolbarAspectRatio = forwardRef( ( props, ref ) => {
	const { attributes, setAttributes } = props;

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
		control,
		handleSubmit,
		setValue,
		getValues,
	} = useForm( {
		defaultValues: getDefaultValues(),
	} );

	const { isDirty } = useFormState( {
		control,
	} );
	const formValues = useWatch( { control } );

	/**
	 * Swap from pixels to aspect ratio and back.
	 */
	const swapAspectRatio = () => {
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
		} else {
			const pixelsWidthHeight = CalculateDimensionsFromAspectRatio( `${ aspectRatioWidth }:${ aspectRatioHeight }`, getValues( 'aspectRatioWidthPixels' ) );
			setValue( 'aspectRatioWidthPixels', pixelsWidthHeight.width );
			setValue( 'aspectRatioHeightPixels', pixelsWidthHeight.height );
		}
	};

	/**
	 * The form has been submitted.
	 *
	 * @param {Object} formData form data.
	 */
	const onSubmit = ( formData ) => {
		props.onChange( { ...formData } );
	};
	return (
		<>
			<form onSubmit={ handleSubmit( onSubmit ) }>
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
								<Button
									variant="secondary"
									className="dlx-photo-block__component-aspect-ratio-splitter-button"
									label={ __(
										'Change between aspect ratio and pixels', 'photo-block'
									) }
									onClick={ () => {
										swapAspectRatio();
										if ( 'pixels' === getValues( 'aspectRatioUnit' ) ) {
											setValue( 'aspectRatioUnit', 'ratio' );
											setAttributes( { aspectRatioUnit: 'ratio' } );
										} else {
											setValue( 'aspectRatioUnit', 'pixels' );
											setAttributes( { aspectRatioUnit: 'pixels' } );
										}
									} }
									icon={ 'pixels' === getValues( 'aspectRatioUnit' ) ? <X /> : <ColonIcon /> }
								/>
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
								<Button
									variant="secondary"
									className="dlx-photo-block__component-aspect-ratio-splitter-button"
									label={ __(
										'Change between aspect ratio and pixels', 'photo-block'
									) }
									onClick={ () => {
										swapAspectRatio();
										if ( 'pixels' === getValues( 'aspectRatioUnit' ) ) {
											setValue( 'aspectRatioUnit', 'ratio' );
											setAttributes( { aspectRatioUnit: 'ratio' } );
										} else {
											setValue( 'aspectRatioUnit', 'pixels' );
											setAttributes( { aspectRatioUnit: 'pixels' } );
										}
									} }
									icon={ 'pixels' === getValues( 'aspectRatioUnit' ) ? <X width={ 16 } height={ 16 } /> : <ColonIcon width={ 16 } height={ 16 } /> }
								/>
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
						variant={ isDirty ? 'primary' : 'secondary' }
						type="submit"
						className="dlx-photo-block__component-aspect-ratio-apply"
						label={ __(
							'Apply the Aspect Ratio',
							'photo-block'
						) }
						tooltip={ __(
							'Switch modes from Aspect Ratio to Width and Height (pixels)',
							'photo-block'
						) }
						disabled={ ! isDirty }
					>
						{ __( 'Apply', 'photo-block' ) }
					</Button>

				</div>
			</form>
		</>
	);
} );
export default ToolbarAspectRatio;
