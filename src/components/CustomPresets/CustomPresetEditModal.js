import React, { useState, useContext } from 'react';
import {
	Button,
	Modal,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { useForm, Controller, useFormState } from 'react-hook-form';
import { __ } from '@wordpress/i18n';
import { AlertCircle } from 'lucide-react';
import Notice from '../Notice';
import CustomPresetsContext from './context';

const canSaveDefaultPresets = photoBlockUser.canSaveDefaultPresets;

const CustomPresetEditModal = ( props ) => {
	const { title, editId, saveNonce } = props;
	const [ isSaving, setIsSaving ] = useState( false );

	const { setSavedPresets, showEditModal, setShowEditModal, defaultPreset, setDefaultPreset } =
		useContext( CustomPresetsContext );

	const getDefaultValues = () => {
		return {
			title,
			editId,
			isDefault: defaultPreset?.id === editId ? true : false,
		};
	};
	const { control, handleSubmit, getValues } = useForm( {
		defaultValues: getDefaultValues(),
	} );

	const { errors } = useFormState( {
		control,
	} );

	const onSubmit = ( formData ) => {
		setIsSaving( true );
		const ajaxUrl = `${ ajaxurl }`; // eslint-disable-line no-undef
		const data = new FormData();
		data.append( 'action', 'dlx_photo_block_save_preset' );
		data.append( 'nonce', saveNonce );
		data.append( 'editId', formData.editId );
		data.append( 'title', formData.title );
		data.append( 'isDefault', formData.isDefault ? true : false );
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
				setSavedPresets( presets );
				setIsSaving( false );

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

				// Close the modal.
				setShowEditModal( false );
			} )
			.catch( ( error ) => {
				setIsSaving( false );
			} );
	};

	// Don't show modal unless explicitly set.
	if ( ! showEditModal ) {
		return null;
	}

	return (
		<Modal
			title={ __( 'Update Preset', 'photo-block' ) }
			onRequestClose={ () => setShowEditModal( false ) }
			className="photo-block-preset-modal"
			shouldCloseOnClickOutside={ false }
		>
			<form onSubmit={ handleSubmit( onSubmit ) }>
				<Controller
					name="title"
					control={ control }
					rules={ {
						required: true,
						pattern: /^[a-zA-Z0-9-_ ]+$/,
					} }
					render={ ( { field } ) => (
						<TextControl
							{ ...field }
							label={ __( 'Preset Name', 'photo-block' ) }
							className="is-required"
						/>
					) }
				/>
				{ 'required' === errors.title?.type && (
					<Notice
						message={ __( 'This field is required.' ) }
						status="error"
						politeness="assertive"
						icon={ <AlertCircle /> }
					/>
				) }
				{ 'pattern' === errors.title?.type && (
					<Notice
						message={ __( 'This field contains invalid characters.' ) }
						status="error"
						politeness="assertive"
						icon={ <AlertCircle /> }
					/>
				) }
				{ canSaveDefaultPresets && (
					<>
						<Controller
							name="isDefault"
							control={ control }
							render={ ( { field: { onChange, value } } ) => (
								<ToggleControl
									label={ __( 'Set Default Preset', 'photo-block' ) }
									checked={ value }
									onChange={ ( newValue ) => onChange( newValue ) }
									help={
										__( 'This preset will be applied to all new Photo Blocks.', 'photo-block' )
									}
								/>
							) }
						/>
					</>
				) }
				<Controller
					name="editId"
					control={ control }
					render={ ( { field } ) => <TextControl type="hidden" { ...field } /> }
				/>
				<Button
					type="submit"
					variant="primary"
					className="photo-block-preset-modal-apply-button"
					disabled={ isSaving }
				>
					{ isSaving
						? __( 'Saving…', 'photo-block' )
						: __( 'Apply Changes', 'photo-block' ) }
				</Button>
				{ ! isSaving && (
					<Button
						variant="secondary"
						onClick={ () => {
							setShowEditModal( false );
						} }
					>
						{ __( 'Cancel', 'photo-block' ) }
					</Button>
				) }
			</form>
		</Modal>
	);
};
export default CustomPresetEditModal;
