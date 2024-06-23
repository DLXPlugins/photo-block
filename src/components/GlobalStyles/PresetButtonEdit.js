import React, { useRef, useState, useContext } from 'react';
import { Button, Popover, Modal } from '@wordpress/components';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';
import { Edit3, Trash2, Star } from 'lucide-react';
import PresetButton from './PresetButton';
import CustomPresetsContext from './context';
import { useEffect } from 'react';

const PresetButtonEdit = ( props ) => {
	const {
		title,
		setAttributes,
		photoAttributes,
		captionAttributes,
		uniqueId,
		editId,
		clientId,
		saveNonce,
		deleteNonce,
	} = props;
	const { editPresets, setShowEditModal, setShowDeleteModal, defaultPreset } = useContext( CustomPresetsContext );

	// Detect when a default preset has been changed, and update the preset ID in state.
	const [ defaultPresetId, setDefaultPresetId ] = useState( defaultPreset?.id ?? 0 );

	useEffect( () => {
		if ( defaultPreset?.id !== defaultPresetId ) {
			setDefaultPresetId( defaultPreset?.id ?? 0 );
		}
	}, [ defaultPreset ] );

	/**
	 * Check whether a preset is a default or not.
	 *
	 * @return {boolean} Whether the preset is the default preset
	 */
	const isPresetDefault = () => {
		return defaultPresetId === editId && 0 !== defaultPresetId;
	};
	return (
		<>
			<div
				className={ classNames( 'photo-block-global-styles-edit-container', {
					'photo-block-global-styles-edit-container--edit': editPresets,
				} ) }
			>
				{ editPresets && (
					<div className="photo-block-global-styles-edit-buttons">
						<Button
							variant={ 'secondary' }
							onClick={ ( e ) => {
								setShowEditModal( {
									show: true,
									editId,
									title,
									saveNonce,
									isDefault: isPresetDefault(),
								} );
							} }
							label={ __( 'Edit Preset', 'photo-block' ) }
							icon={ <Edit3 /> }
							className="photo-block-global-styles-edit-button"
						/>
						<Button
							variant={ 'secondary' }
							onClick={ ( e ) => {
								setShowDeleteModal( {
									show: true,
									editId,
									deleteNonce,
								} );
							} }
							label={ __( 'Delete Preset', 'photo-block' ) }
							icon={ <Trash2 /> }
							className="photo-block-global-styles-delete-button"
						/>
					</div>
				) }
				<PresetButton
					key={ editId }
					label={
						'' === title ? __( 'Untitled Preset', 'photo-block' ) : title
					}
					setAttributes={ setAttributes }
					uniqueId={ uniqueId }
					className="photo-block-global-styles-button"
					clientId={ clientId }
					photoAttributes={ photoAttributes }
					captionAttributes={ captionAttributes }
					disabled={ editPresets }
					icon={ isPresetDefault() ? <Star /> : null }
				/>
			</div>
		</>
	);
};

export default PresetButtonEdit;
