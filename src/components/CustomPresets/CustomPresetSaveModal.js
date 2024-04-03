import React, { useRef, useEffect, useState, useContext } from 'react';
import {
	Button,
	Modal,
	RadioControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import classnames from 'classnames';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import { __ } from '@wordpress/i18n';
import { useSelect, select } from '@wordpress/data';
import { AlertCircle, Save } from 'lucide-react';
import CustomPresetsContext from './context';
import Notice from '../Notice';

const canSaveDefaultPresets = photoBlockUser.canSaveDefaultPresets;

const CustomPresetSaveModal = ( props ) => {
	const [ presetSaveType, setPresetSaveType ] = useState( 'new' );
	const [ isSaving, setIsSaving ] = useState( false );
	const { title, attributes, setAttributes, clientId } = props;

	const { savedPresets, setSavedPresets, savingPreset, setSavingPreset, defaultPreset, setDefaultPreset } =
		useContext( CustomPresetsContext );

	const getDefaultValues = () => {
		return {
			presetTitle: '',
			selectedPreset: null,
			defaultPreset: false,
		};
	};
	const { control, handleSubmit, setValue } = useForm( {
		defaultValues: getDefaultValues(),
	} );

	const { errors } = useFormState( {
		control,
	} );

	/**
	 * Retrieve a list of parent and child attributes for the current block.
	 *
	 * @return {Object} Object of attributes with keys photoAttributes, captionAttributes..
	 */
	const getCurrentAttributes = () => {
		// Get the caption block attributes, if any.
		const children = select( 'core/block-editor' ).getBlocksByClientId( clientId )[ 0 ]?.innerBlocks || [];
		const captionBlock = children.find( ( block ) => 'dlxplugins/photo-caption-block' === block.name );
		const captionAttributes = captionBlock ? captionBlock.attributes : {};

		// Get the parent block attributes.
		const parentAttributes = select( 'core/block-editor' ).getBlockAttributes( clientId );

		// Merge the parent and child attributes.
		const allAttributes = {
			photoAttributes: parentAttributes,
			captionAttributes,
		};
		return allAttributes;
	};

	const onSubmit = ( formData ) => {
		if ( 'new' === presetSaveType ) {
			saveNewPreset( formData );
		} else {
			overridePreset( formData );
		}
	};

	/**
	 * Set a default preset if any are set to default. null if no presets are defaults.
	 *
	 * @param {Array} presets Presets array.
	 */
	const setDefaultFromPresets = ( presets ) => {
		// Loop through presets and assign default if needed.
		presets.forEach( ( preset ) => {
			if ( preset.is_default ) {
				setDefaultPreset( preset );
			}

			// If none are default, clear default presets.
			if ( ! presets.some( ( presetValue ) => presetValue.is_default ) ) {
				setDefaultPreset( null );
			}
		} );
	};

	/**
	 * Save a new preset via Ajax.
	 *
	 * @param {Array} formData Form data array.
	 */
	const saveNewPreset = ( formData ) => {
		setIsSaving( true );
		const ajaxUrl = `${ ajaxurl }`; // eslint-disable-line no-undef
		const data = new FormData();
		data.append( 'action', 'dlx_photo_block_save_presets' );
		data.append( 'nonce', photoBlock.presetSaveNewNonce );
		data.append( 'attributes', JSON.stringify( getCurrentAttributes() ) );
		data.append( 'formData', JSON.stringify( formData ) );
		fetch( ajaxUrl, {
			method: 'POST',
			body: data,
			/* get return in json */
			headers: {
				Accept: 'application/json',
			},
		} )
			.then( ( response ) => response.json() )
			.then( ( json ) => {
				const { presets } = json.data;
				setIsSaving( false );
				setSavingPreset( false );
				setSavedPresets( presets );
				setDefaultFromPresets( presets );
			} )
			.catch( ( error ) => {
				setSavingPreset( false );
			} );
	};

	/**
	 * Save a new preset via Ajax.
	 *
	 * @param {Array} formData Form data array.
	 */
	const overridePreset = ( formData ) => {
		setIsSaving( true );
		const ajaxUrl = `${ ajaxurl }`; // eslint-disable-line no-undef
		const data = new FormData();
		data.append( 'action', 'dlx_photo_block_override_preset' );
		data.append( 'nonce', photoBlock.presetSaveNewNonce );
		data.append( 'attributes', JSON.stringify( getCurrentAttributes() ) );
		data.append( 'editId', formData.selectedPreset );
		data.append( 'isDefault', formData.defaultPreset );
		fetch( ajaxUrl, {
			method: 'POST',
			body: data,
			/* get return in json */
			headers: {
				Accept: 'application/json',
			},
		} )
			.then( ( response ) => response.json() )
			.then( ( json ) => {
				const { presets } = json.data;
				setIsSaving( false );
				setSavingPreset( false );
				setSavedPresets( presets );
				setDefaultFromPresets( presets );
			} )
			.catch( ( error ) => {
				setSavingPreset( false );
			} );
	};

	/**
	 * Get the preset options in radio group format.
	 *
	 * @return {Array} Array of objects with label and value properties.
	 */
	const getPresetRadioOptions = () => {
		const options = [];
		savedPresets.forEach( ( preset ) => {
			options.push( {
				label: preset.title,
				value: preset.id + '',
			} );
		} );
		return options;
	};

	let radioOptions = [
		{
			label: __( 'Save Preset', 'photo-block' ),
			value: 'new',
		},
		{
			label: __( 'Override Preset', 'photo-block' ),
			value: 'override',
		},
	];
	if ( savedPresets.length === 0 || ! canSaveDefaultPresets ) {
		radioOptions = [
			{
				label: __( 'Save Preset', 'photo-block' ),
				value: 'new',
			},
		];
	}

	return (
		<div className="photo-block-custom-preset-modal">
			<Modal
				title={ title }
				onRequestClose={ () => setSavingPreset( false ) }
				className="photo-block-preset-modal"
				shouldCloseOnClickOutside={ false }
			>
				<RadioControl
					label={ __(
						'Save a new preset or override an existing one.',
						'photo-block'
					) }
					className="photo-block-preset-modal-radio-control"
					selected={ presetSaveType }
					options={ radioOptions }
					onChange={ ( value ) => {
						setPresetSaveType( value );
					} }
				/>
				<form onSubmit={ handleSubmit( onSubmit ) }>
					{ 'new' === presetSaveType && (
						<>
							<div className="photo-block-preset-modal-new-preset">
								<Controller
									name="presetTitle"
									control={ control }
									rules={ {
										required: true,
										pattern: /^[a-zA-Z0-9-_ ]+$/,
									} }
									render={ ( { field } ) => (
										<TextControl
											{ ...field }
											label={ __( 'Preset Name', 'photo-block' ) }
											className={ classnames( 'photo-block-admin__text-control', {
												'is-required': true,
												'has-error': 'required' === errors.presetTitle?.type,
											} ) }
										/>
									) }
								/>
								{ 'required' === errors.presetTitle?.type && (
									<Notice
										message={ __( 'The Preset Name field is required.' ) }
										status="error"
										politeness="assertive"
										icon={ AlertCircle }
									/>
								) }
								{ 'pattern' === errors.presetTitle?.type && (
									<Notice
										message={ __( 'This Preset Name field contains invalid characters.' ) }
										status="error"
										politeness="assertive"
										icon={ AlertCircle }
									/>
								) }
							</div>
						</>
					) }
					{ ( 'override' === presetSaveType && canSaveDefaultPresets ) && (
						<>
							{ savedPresets.length > 0 && (
								<div className="photo-block-preset-modal-override-preset">
									<Controller
										name="selectedPreset"
										control={ control }
										rules={ {
											required: true,
										} }
										render={ ( { field: { onChange, value } } ) => (
											<RadioControl
												label={ __(
													'Select a preset to override',
													'photo-block'
												) }
												className="is-required"
												selected={ value }
												options={ getPresetRadioOptions() }
												onChange={ ( radioValue ) => onChange( radioValue ) }
											/>
										) }
									/>
									{ 'required' === errors.selectedPreset?.type && (
										<Notice
											message={ __( 'This field is required.' ) }
											status="error"
											politeness="assertive"
											icon={ AlertCircle }
										/>
									) }
								</div>
							) }
						</>
					) }
					{ canSaveDefaultPresets && (
						<Controller
							name="defaultPreset"
							control={ control }
							render={ ( { field: { onChange, value } } ) => (
								<ToggleControl
									label={ __( 'Make This Preset the Default', 'photo-block' ) }
									checked={ value }
									onChange={ ( newValue ) => onChange( newValue ) }
									help={ __(
										'If this preset is selected as the default, it will be applied to all new photo blocks.',
										'photo-block'
									) }
								/>
							) }
						/>
					) }
					<div className="photo-block-preset-modal-button-group">
						<Button
							type="submit"
							variant="primary"
							className="photo-block-preset-modal-apply-button"
							disabled={ isSaving }
							icon={ <Save /> }
						>
							{ isSaving
								? __( 'Saving…', 'photo-block' )
								: __( 'Save Preset', 'photo-block' ) }
						</Button>
						<Button
							variant="secondary"
							onClick={ () => {
								setSavingPreset( false );
							} }
							className="photo-block-preset-modal-cancel-button"
							disabled={ isSaving }
						>
							{ __( 'Cancel', 'photo-block' ) }
						</Button>
					</div>
				</form>
			</Modal>
		</div>
	);
};
export default CustomPresetSaveModal;
