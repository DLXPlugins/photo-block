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
import { useSelect, useDispatch } from '@wordpress/data';

import classnames from 'classnames';

import { __ } from '@wordpress/i18n';
import CalculateAspectRatioFromPixels from '../../utils/CalculateAspectRatioFromPixels';
import CalculateDimensionsFromAspectRatio from '../../utils/CalculateDimensionsFromAspectRatio';
import ColonIcon from '../Icons/ColonIcon';
import blockStore from '../../store';

/**
 * Upload Status component.
 *
 * @param {Object} props - Component props.
 * @return {Object} JSX markup for the component.
 */
const ToolbarAspectRatio = forwardRef( ( props, ref ) => {
	const {
		aspectRatioWidth,
		aspectRatioHeight,
		aspectRatioWidthPixels,
		aspectRatioHeightPixels,
		aspectRatioToolbarSelection,
		aspectRatioUnit,
	} = useSelect( ( select ) => {
		return {
			aspectRatioWidth: select( blockStore( props.uniqueId ) ).getAspectRatioWidth(),
			aspectRatioHeight: select( blockStore( props.uniqueId ) ).getAspectRatioHeight(),
			aspectRatioWidthPixels: select( blockStore( props.uniqueId ) ).getAspectRatioWidthPixels(),
			aspectRatioHeightPixels: select( blockStore( props.uniqueId ) ).getAspectRatioHeightPixels(),
			aspectRatioToolbarSelection: select( blockStore( props.uniqueId ) ).getAspectRatioToolbarSelection(),
			aspectRatioUnit: select( blockStore( props.uniqueId ) ).getAspectRatioUnit(),
		};
	} );

	const {
		setAspectRatio,
		setAspectRatioPixels,
		setAspectRatioUnit,
	} = useDispatch( blockStore( props.uniqueId ) );

	const {
		control,
		handleSubmit,
		setValue,
		getValues,
	} = useForm( {
		defaultValues: {
			aspectRatioWidthRatio: aspectRatioWidth,
			aspectRatioHeightRatio: aspectRatioHeight,
			aspectRatioWidthPixels: aspectRatioWidthPixels,
			aspectRatioHeightPixels: aspectRatioHeightPixels,
			aspectRatioUnit: aspectRatioUnit,
		},
	} );


	const { isDirty } = useFormState( {
		control,
	} );
	const formValues = useWatch( { control } );


	/**
	 * Swap from pixels to aspect ratio and back.
	 *
	 * @param {string} ratioToCalculate - 'pixels' or 'ratio'.
	 */
	const swapAspectRatio = ( ratioToCalculate ) => {
		const aspectRatioWidthRatio = getValues( 'aspectRatioWidthRatio' );
		const aspectRatioHeightRatio = getValues( 'aspectRatioHeightRatio' );
		if ( ratioToCalculate === 'ratio' ) {
			// Convert aspect width / height to ratio for display.
			const newAspectRatio = CalculateAspectRatioFromPixels( getValues( 'aspectRatioWidthPixels' ), getValues( 'aspectRatioHeightPixels' ) );
			setValue( 'aspectRatioWidthRatio', newAspectRatio.width );
			setValue( 'aspectRatioHeightRatio', newAspectRatio.height );
			setAspectRatio( newAspectRatio.width, newAspectRatio.height );
		} else {
			const imageRatioPixels = CalculateDimensionsFromAspectRatio(
				`${ aspectRatioWidthRatio }:${ aspectRatioHeightRatio }`,
				props?.fullsizePhoto?.width,
			);
			setValue( 'aspectRatioWidthPixels', imageRatioPixels.width );
			setValue( 'aspectRatioHeightPixels', imageRatioPixels.height );
			setAspectRatioPixels( imageRatioPixels.width, imageRatioPixels.height );
		}
	};

	/**
	 * The form has been submitted.
	 *
	 * @param {Object} formData form data.
	 */
	const onSubmit = ( formData ) => {
		let humanImageRatio = {};
		// Calculate human aspect ratio.
		if ( 'pixels' === getValues( 'aspectRatioUnit' ) ) {
			humanImageRatio = CalculateAspectRatioFromPixels(
				formData.aspectRatioWidthPixels,
				formData.aspectRatioHeightPixels
			);
		} else {
			humanImageRatio = {
				width: formData.aspectRatioWidthRatio,
				height: formData.aspectRatioHeightRatio,
			};
		}
		// Set global values.
		setAspectRatio( formData.aspectRatioWidthRatio, formData.aspectRatioHeightRatio );
		setAspectRatioPixels( formData.aspectRatioWidthPixels, formData.aspectRatioHeightPixels );
		props.onChange( humanImageRatio );
		return formData;
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
								name="aspectRatioWidthRatio"
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
										if ( 'pixels' === getValues( 'aspectRatioUnit' ) ) {
											setValue( 'aspectRatioUnit', 'ratio' );
											swapAspectRatio( 'ratio' );
											setAspectRatioUnit( 'ratio' );
										} else {
											setValue( 'aspectRatioUnit', 'pixels' );
											swapAspectRatio( 'pixels' );
											setAspectRatioUnit( 'pixels' );
										}
									} }
									icon={ 'pixels' === getValues( 'aspectRatioUnit' ) ? <X /> : <ColonIcon /> }
								/>
							</span>
							<Controller
								name="aspectRatioHeightRatio"
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
										if ( 'pixels' === getValues( 'aspectRatioUnit' ) ) {
											setAspectRatioUnit( 'ratio' );
											setValue( 'aspectRatioUnit', 'ratio' );
											swapAspectRatio( 'ratio' );
										} else {
											setAspectRatioUnit( 'pixels' );
											setValue( 'aspectRatioUnit', 'pixels' );
											swapAspectRatio( 'pixels' );
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
						variant={ 'secondary' }
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
					>
						{ __( 'Set Crop Area', 'photo-block' ) }
					</Button>

				</div>
			</form>
		</>
	);
} );
export default ToolbarAspectRatio;
