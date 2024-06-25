import React, { useState, useContext } from 'react';
import {
	Button,
	Modal,
	TextControl,
} from '@wordpress/components';
import { useDispatch } from '@wordpress/data';
import { useForm, Controller, useFormState } from 'react-hook-form';
import { __ } from '@wordpress/i18n';
import { AlertCircle } from 'lucide-react';
import CustomPresetsContext from './context';
import Notice from '../Notice';
import globalStylesStore from '../../store/global-styles';

const GlobalStylesDeleteModal = ( props ) => {
	const { title, editId, deleteNonce, slug } = props;
	const [ isDeleting, setIsDeleting ] = useState( false );

	const { setSavedPresets, showDeleteModal, setShowDeleteModal } =
		useContext( CustomPresetsContext );

	const getDefaultValues = () => {
		return {
			editId,
		};
	};
	const { control, handleSubmit, setError } = useForm( {
		defaultValues: getDefaultValues(),
	} );

	const { errors } = useFormState( {
		control,
	} );

	const { removeGlobalStyle } = useDispatch( globalStylesStore );

	const onSubmit = ( formData ) => {
		setIsDeleting( true );
		const ajaxUrl = `${ ajaxurl }`; // eslint-disable-line no-undef
		const data = new FormData();
		data.append( 'action', 'dlx_photo_block_delete_global_style' );
		data.append( 'nonce', deleteNonce );
		data.append( 'editId', formData.editId );
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
				if ( ! success ) {
					setError( 'deletionFailed', {
						type: 'manual',
						message: data.message,
					} );
					setIsDeleting( false );
					return;
				}
				removeGlobalStyle( slug );
				setIsDeleting( false );
				setShowDeleteModal( false );
			} )
			.catch( ( error ) => {
				setError( 'deletionFailed', {
					type: 'manual',
					message: error.message,
				} );
				setIsDeleting( false );
			} );
	};

	// Don't show modal unless explicitly set.
	if ( ! showDeleteModal ) {
		return null;
	}

	return (
		<Modal
			title={ __( 'Delete Global Style', 'photo-block' ) }
			onRequestClose={ () => setShowDeleteModal( false ) }
			className="photo-block-global-styles-modal"
			shouldCloseOnClickOutside={ false }
		>
			<form onSubmit={ handleSubmit( onSubmit ) }>
				<p className="description">
					{ __( 'Removing this global style will remove it from all blocks using it.', 'photo-block' ) }
				</p>
				<Controller
					name="editId"
					control={ control }
					render={ ( { field } ) => <TextControl type="hidden" { ...field } /> }
				/>
				<Button
					type="submit"
					variant="primary"
					className="photo-block-global-styles-modal-apply-button"
					disabled={ isDeleting }
				>
					{ isDeleting
						? __( 'Deleting…', 'photo-block' )
						: __( 'Delete Global Style', 'photo-block' ) }
				</Button>
				{ ! isDeleting && (
					<Button
						variant="secondary"
						onClick={ () => {
							setShowDeleteModal( false );
						} }
					>
						{ __( 'Cancel', 'photo-block' ) }
					</Button>
				) }
				{ errors.deletionFailed && (
					<Notice
						message={ errors.deletionFailed.message }
						status="error"
						politeness="assertive"
						icon={ AlertCircle }
					/>
				) }
			</form>
		</Modal>
	);
};
export default GlobalStylesDeleteModal;
