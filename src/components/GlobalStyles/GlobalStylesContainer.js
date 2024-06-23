import React, { useRef, useEffect, useState, useContext } from 'react';
import {
	Spinner,
	Button,
	ButtonGroup,
	Modal,
	RadioControl,
	TextControl,
	SelectControl,
	CheckboxControl,
	PanelBody,
} from '@wordpress/components';
import { createBlock } from '@wordpress/blocks';
import { useDispatch, useSelect, select } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { Save, Edit, Layers } from 'lucide-react';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import CustomPresetsContext from './context';
import CustomPresetSaveModal from './GlobalStylesSaveModal';
import globalStylesStore from '../../store/global-styles';
// import PresetButtonEdit from './PresetButtonEdit';
// import CustomPresetEditModal from './CustomPresetEditModal';
// import CustomPresetDeleteModal from './CustomPresetDeleteModal';

// Read in localized var and determine if user can save or edit presets.
const canSavePresets = photoBlockUser.canSavePresets;

const GlobalStylesContainer = ( props ) => {
	const [ loading, setLoading ] = useState( false );
	const [ presetSaveType, setPresetSaveType ] = useState( 'new' );
	const [ presetSaveLabel, setPresetSaveLabel ] = useState( '' );
	const { setAttributes, clientId } = props;
	const { uniqueId, globalStyle } = props.attributes;
	const {
		savedPresets,
		setSavedPresets,
		savingPreset,
		setSavingPreset,
		editPresets,
		setEditPresets,
		showEditModal,
		showDeleteModal,
		setDefaultPreset,
	} = useContext( CustomPresetsContext );

	const {
		getGlobalStyles,
		getGlobalStyleBySlug,
	} = useSelect( ( select ) => {
		return {
			getGlobalStyles: select( globalStylesStore ).getGlobalStyles,
			getGlobalStyleBySlug: select( globalStylesStore ).getGlobalStyleBySlug,
		};
	} );

	const { setGlobalStyle } = useDispatch( globalStylesStore );

	const { updateBlockAttributes, insertBlock } = useDispatch( blockEditorStore );

	const getDefaultValues = () => {
		return {
			selectedGlobalStyle: '',
			applyAsPreset: false,
		};
	};

	const { control, handleSubmit, setValue, trigger, setError, clearErrors, getValues } = useForm( {
		defaultValues: getDefaultValues(),
	} );

	const { errors } = useFormState( {
		control,
	} );

	const globalStyleContainer = useRef( null );

	/**
	 * Show a loading spinner.
	 *
	 * @param {string} label Label of the loading spinner.
	 * @return {JSX} Loading spinner.
	 */
	const showLoading = ( label ) => {
		return (
			<div className="photo-block-global-styles-loading-container">
				<span className="photo-block-global-styles-loading-label">{ label }</span>
				<Spinner />
			</div>
		);
	};
	const onSubmit = ( formData ) => {
		const globalStyleSlug = formData.selectedGlobalStyle;
		if ( 'none' === globalStyleSlug ) {
			setError( 'selectedGlobalStyle', {
				type: 'manual',
				message: __( 'Please select a global style.', 'photo-block' ),
			} );
			return;
		}

		// Get the global style data.
		const currentGlobalStyle = getGlobalStyleBySlug( globalStyleSlug );

		// IF the global style is not found, return.
		if ( ! currentGlobalStyle?.content ) {
			setError( 'selectedGlobalStyle', {
				type: 'manual',
				message: __( 'Global style not found.', 'photo-block' ),
			} );
			return;
		}

		// Get unique ID for the caption block.
		const children = select( 'core/block-editor' ).getBlocksByClientId( clientId )[ 0 ]?.innerBlocks || [];
		const captionBlock = children.find( ( block ) => 'dlxplugins/photo-caption-block' === block.name );

		// Get unique ID for the photo block.
		const uniqueIdAttribute = { uniqueId };
		const photoBlockAttributes = { ...currentGlobalStyle.content.photoAttributes, ...uniqueIdAttribute };
		const captionAttributes = currentGlobalStyle.content.captionAttributes;

		// Apply attributes for current photo block.
		setAttributes( photoBlockAttributes );

		// Set the global style attribute.
		setAttributes( { globalStyle: globalStyleSlug } );

		// If there is no caption block, but there are attributes to apply, create one.
		if ( ! captionBlock && captionAttributes ) {
			const newBlocks = createBlock( 'dlxplugins/photo-caption-block', captionAttributes );
			insertBlock( newBlocks, undefined, clientId );
		}

		// If there is a caption block and attributes to apply, apply them.
		if ( captionBlock && captionAttributes ) {
			const captionBlockAttributes = { ...captionAttributes, ...uniqueIdAttribute };
			updateBlockAttributes( captionBlock.clientId, captionBlockAttributes );
		}
	};
	const getSavedPresets = () => {
		const styles = getGlobalStyles();
		const styleSelect = [
			{
				value: 'none',
				label: __( 'Select a Global Style', 'photo-block' ),
			},
		];
		if ( Object.keys( styles ).length > 0 ) {
			// Append to the select options.
			Object.keys( styles ).forEach( ( key ) => {
				styleSelect.push( {
					value: styles[ key ].slug,
					label: styles[ key ].title,
				} );
			} );

			return (
				<>
					<form onSubmit={ handleSubmit( onSubmit ) }>
						<Controller
							name="selectedGlobalStyle"
							control={ control }
							render={ ( { field } ) => (
								<SelectControl
									{ ...field }
									label={ __( 'Select a Global Style', 'photo-block' ) }
									options={ styleSelect }
									onChange={ ( newValue ) => {
										field.onChange( newValue );
									} }
									value={ globalStyle || 'none' }
								/>
							) }
						/>
						<Controller
							name="applyAsPreset"
							control={ control }
							render={ ( { field } ) => (
								<CheckboxControl
									{ ...field }
									label={ __( 'Apply as a Preset Only', 'photo-block' ) }
									onChange={ ( newValue ) => {
										field.onChange( newValue );
									} }
								/>
							) }
						/>
						<Button
							type="submit"
							variant="secondary"
							className="photo-block-global-styles-modal-apply-button"
							disabled={ getValues( 'selectedGlobalStyle' ) === 'none' }
						>
							{ __( 'Apply Global Style', 'photo-block' ) }
						</Button>
					</form>
				</>
			);
		}

		return (
			<>
				<p>
					{
						canSavePresets
							? __( 'No global styles have been saved yet. Would you like to save a new one?', 'photo-block', )
							: __( 'No global styles have been saved yet.', 'photo-block', )
					}
				</p>
			</>
		);
	};

	return (
		<>
			{ /* { showEditModal && (
				<CustomPresetEditModal
					editId={ showEditModal.editId }
					title={ showEditModal.title }
					saveNonce={ showEditModal.saveNonce }
				/>
			) }
			{ showDeleteModal && (
				<CustomPresetDeleteModal
					editId={ showDeleteModal.editId }
					title={ showDeleteModal.title }
					deleteNonce={ showDeleteModal.deleteNonce }
				/>
			) } */ }
			<PanelBody
				title={ __( 'Global Styles', 'photo-block' ) }
				initialOpen={ true }
				icon={ <Layers /> }
				className="photo-block__inspector-panel"
			>
				<div className="photo-block-global-styles-container" ref={ globalStyleContainer }>
					{ ! loading && (
						<>
							{ getSavedPresets() }
							{ canSavePresets && (
								<div className="photo-block-global-styles-actions">
									{ ! editPresets && (
										<Button
											variant={ 'secondary' }
											onClick={ ( e ) => {
												e.preventDefault();
												setSavingPreset( true );
											} }
											label={ __( 'Save New Global Style', 'photo-block' ) }
										>
											{ __( 'Save New Global Style', 'photo-block' ) }
										</Button>
									) }
									{ ( ! editPresets && ! savingPreset && savedPresets.length > 0 ) && (
										<Button
											variant={ 'secondary' }
											onClick={ ( e ) => {
												e.preventDefault();
												setEditPresets( true );
											} }
											label={ __( 'Edit Presets', 'photo-block' ) }
										>
											{ __( 'Edit Presets', 'photo-block' ) }
										</Button>
									) }
									{ editPresets && ! savingPreset && (
										<Button
											variant={ 'primary' }
											onClick={ ( e ) => {
												e.preventDefault();
												setEditPresets( false );
											} }
											label={ __( 'Exit Edit Mode', 'photo-block' ) }
										>
											{ __( 'Exit Edit Mode', 'photo-block' ) }
										</Button>
									) }
								</div>
							) }
						</>
					) }
					{ savingPreset && (
						<CustomPresetSaveModal
							title={ __( 'Save Global Style', 'photo-block' ) }
							{ ...props }
						/>
					) }
				</div>
			</PanelBody>

		</>
	);
};
export default GlobalStylesContainer;
