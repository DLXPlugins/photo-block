import React, { useState, useContext } from 'react';
import {
	Button,
	Modal,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { useForm, Controller, useFormState } from 'react-hook-form';
import { __ } from '@wordpress/i18n';
import { useDispatch } from '@wordpress/data';
import { AlertCircle } from 'lucide-react';
import Notice from '../Notice';
import CustomPresetsContext from './context';
import globalStylesStore from '../../store/global-styles';

const canSaveDefaultPresets = photoBlockUser.canSaveDefaultPresets;

const GlobalStylesEditModal = ( props ) => {
	const { title, editId, saveNonce, cssClass } = props;
	const [ isSaving, setIsSaving ] = useState( false );

	console.log( props );
	const { setSavedPresets, showEditModal, setShowEditModal, defaultPreset, setDefaultPreset } =
		useContext( CustomPresetsContext );

	const getDefaultValues = () => {
		return {
			title,
			editId,
			cssClass,
		};
	};
	const { control, handleSubmit, getValues, setError } = useForm( {
		defaultValues: getDefaultValues(),
	} );

	const { errors } = useFormState( {
		control,
	} );

	const {setGlobalStyle } = useDispatch( globalStylesStore );

	const { createSuccessNotice } = useDispatch( 'core/notices' );

	const onSubmit = ( formData ) => {
		setIsSaving( true );
		const ajaxUrl = `${ ajaxurl }`; // eslint-disable-line no-undef
		const data = new FormData();
		data.append( 'action', 'dlx_photo_block_save_edited_global_style' );
		data.append( 'nonce', saveNonce );
		data.append( 'editId', formData.editId );
		data.append( 'title', formData.title );
		data.append( 'cssClass', formData.cssClass );
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
				const { success } = json;
				setIsSaving( false );
				if ( ! success ) {
					setError(
						'saveError',
						{
							type: 'manual',
							message: data.message,
						}
					);
					return;
				}
				setGlobalStyle( json.data, json.data.slug );

				// Show a success notice.
				createSuccessNotice(
					__( 'Global style updated successfully.', 'photo-block' ),
					{
						type: 'snackbar',
					}
				);

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
			title={ __( 'Update Global Style', 'photo-block' ) }
			onRequestClose={ () => setShowEditModal( false ) }
			className="photo-block-global-styles-modal"
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
							label={ __( 'Global Style Label', 'photo-block' ) }
							className="is-required"
						/>
					) }
				/>
				{ 'required' === errors.title?.type && (
					<Notice
						message={ __( 'This field is required.' ) }
						status="error"
						politeness="assertive"
						icon={ AlertCircle }
					/>
				) }
				{ 'pattern' === errors.title?.type && (
					<Notice
						message={ __( 'This field contains invalid characters.' ) }
						status="error"
						politeness="assertive"
						icon={ AlertCircle }
					/>
				) }
				<Controller
					name="cssClass"
					control={ control }
					rules={
						{
							required: true,
							pattern: /^-?[_a-zA-Z]+[_a-zA-Z0-9-]*$/,
						}
					}
					render={ ( { field } ) => (
						<TextControl
							{ ...field }
							label={ __( 'Global Style CSS Class Name', 'photo-block' ) }
							className="is-required"
						/>
					) }
				/>
				{ 'required' === errors.cssClass?.type && (
					<Notice
						message={ __( 'This field is required.' ) }
						status="error"
						politeness="assertive"
						icon={ AlertCircle }
					/>
				) }
				{ 'pattern' === errors.cssClass?.type && (
					<Notice
						message={ __( 'This field contains invalid characters.' ) }
						status="error"
						politeness="assertive"
						icon={ AlertCircle }
					/>
				) }
				<Controller
					name="editId"
					control={ control }
					render={ ( { field } ) => <TextControl type="hidden" { ...field } /> }
				/>
				<Button
					type="submit"
					variant="primary"
					className="photo-block-global-styles-modal-apply-button"
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
				{
					errors?.saveError && (
						<Notice
							message={ errors.saveError.message }
							status="error"
							politeness="assertive"
							icon={ AlertCircle }
						/>
					)
				}
			</form>
		</Modal>
	);
};
export default GlobalStylesEditModal;
