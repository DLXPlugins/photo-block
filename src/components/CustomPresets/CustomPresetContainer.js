import React, { useRef, useEffect, useState, useContext } from 'react';
import {
	Spinner,
	Button,
	ButtonGroup,
	Modal,
	RadioControl,
	TextControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Save, Edit } from 'lucide-react';
import CustomPresetsContext from './context';
import CustomPresetSaveModal from './CustomPresetSaveModal';
import PresetButtonEdit from './PresetButtonEdit';
import CustomPresetEditModal from './CustomPresetEditModal';
import CustomPresetDeleteModal from './CustomPresetDeleteModal';

// Read in localized var and determine if user can save or edit presets.
const canSavePresets = photoBlock.presetCanEditor;

const CustomPresetContainer = ( props ) => {
	const [ loading, setLoading ] = useState( true );
	const [ presetSaveType, setPresetSaveType ] = useState( 'new' );
	const [ presetSaveLabel, setPresetSaveLabel ] = useState( '' );
	const { setAttributes, clientId } = props;
	const { uniqueId } = props.attributes;
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

	const presetContainer = useRef( null );

	useEffect( () => {
		if ( presetContainer.current ) {
			// Perform fetch request to ajax endpoint.
			const ajaxUrl = `${ ajaxurl }`; // eslint-disable-line no-undef
			const data = new FormData();
			data.append( 'action', 'dlx_photo_block_load_presets' );
			data.append( 'nonce', photoBlock.presetLoadNonce );
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
					setLoading( false );
					setSavedPresets( presets );

					// Loop through presets and set default.
					presets.forEach( ( preset ) => {
						if ( preset.is_default ) {
							setDefaultPreset( preset );
						}
					} );
				} )
				.catch( ( error ) => {
					setLoading( false );
				} );
		}
	}, [ presetContainer ] );

	/**
	 * Show a loading spinner.
	 *
	 * @param {string} label Label of the loading spinner.
	 * @return {JSX} Loading spinner.
	 */
	const showLoading = ( label ) => {
		return (
			<div className="photo-block-custom-preset-loading-container">
				<span className="photo-block-custom-preset-loading-label">{ label }</span>
				<Spinner />
			</div>
		);
	};
	const getSavedPresets = () => {
		if ( savedPresets.length > 0 ) {
			// Map to preset buttons.
			return (
				<div className="photo-block-presets">
					<ButtonGroup>
						{ savedPresets.map( ( preset ) => {
							return (
								<PresetButtonEdit
									key={ preset.id }
									editId={ preset.id }
									title={ preset.title }
									setAttributes={ setAttributes }
									uniqueId={ uniqueId }
									clientId={ clientId }
									slug={ preset.slug }
									photoAttributes={ preset.content.attributes.photoAttributes }
									captionAttributes={ preset.content.attributes.captionAttributes }
									saveNonce={ preset.save_nonce }
									deleteNonce={ preset.delete_nonce }
								/>
							);
						} ) }
					</ButtonGroup>
				</div>
			);
		}
		return (
			<>
				<p>
					{
						canSavePresets
							? __( 'No custom presets have been saved yet. Would you like to save a new one?', 'photo-block', )
							: __( 'No custom presets have been saved yet.', 'photo-block', )
					}
				</p>
			</>
		);
	};

	return (
		<>
			{ showEditModal && (
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
			) }
			<div className="photo-block-custom-preset-container" ref={ presetContainer }>
				{ loading && showLoading( 'Loading Presets' ) }
				{ ! loading && (
					<>
						{ getSavedPresets() }
						{ canSavePresets && (
							<div className="photo-block-custom-preset-actions">
								<h3>{ __( 'Preset Actions', 'photo-block' ) }</h3>
								{ ! editPresets && (
									<Button
										variant={ 'primary' }
										onClick={ ( e ) => {
											e.preventDefault();
											setSavingPreset( true );
										} }
										label={ __( 'Save New Preset', 'photo-block' ) }
									>
										{ __( 'Save New Preset', 'photo-block' ) }
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
						title={ __( 'Save Preset', 'photo-block' ) }
						{ ...props }
					/>
				) }
			</div>
		</>
	);
};
export default CustomPresetContainer;
