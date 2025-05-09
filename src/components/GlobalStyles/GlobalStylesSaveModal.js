import React, { useState, useContext } from 'react';
import {
	Button,
	Modal,
	RadioControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { cleanForSlug } from '@wordpress/url';
import classnames from 'classnames';
import { createBlock } from '@wordpress/blocks';
import { useForm, Controller, useFormState } from 'react-hook-form';
import { __ } from '@wordpress/i18n';
import { useDispatch, useSelect, select } from '@wordpress/data';
import { AlertCircle, Save } from 'lucide-react';
import CustomPresetsContext from './context';
import Notice from '../Notice';
import globalStylesStore from '../../store/global-styles';
import { store as blockEditorStore } from '@wordpress/block-editor';

const canSaveDefaultPresets = photoBlockUser.canSetDefaultPresets;

const GlobalStylesSaveModal = ( props ) => {
	const [ presetSaveType, setPresetSaveType ] = useState( 'new' );
	const [ isSaving, setIsSaving ] = useState( false );
	const { title, setAttributes, attributes, clientId } = props;

	const { setSavingPreset } =
		useContext( CustomPresetsContext );

	const {
		setGlobalStyle,
		setGlobalStyleRefresh,
	} = useDispatch( globalStylesStore );

	const {
		insertBlock,
		updateBlockAttributes,
	} = useDispatch( blockEditorStore );

	const {
		globalStyles,
	} = useSelect( ( groupSelect ) => {
		return {
			globalStyles: groupSelect( globalStylesStore ).getGlobalStyles(),
		};
	} );

	const getDefaultValues = () => {
		return {
			globalStyleLabel: '',
			globalStyleSlug: '',
			globalStyleCSSClass: '',
			selectedGlobalStyle: null,
			globalStyleApplyToBlock: true,
		};
	};
	const { control, handleSubmit, setValue, trigger, setError, clearErrors, getValues } = useForm( {
		defaultValues: getDefaultValues(),
	} );

	const { errors } = useFormState( {
		control,
	} );

	const { createSuccessNotice, createWarningNotice } = useDispatch( 'core/notices' );
	/**
	 * Retrieve a list of parent and child attributes for the current block.
	 *
	 * @return {Object} Object of attributes with keys photoAttributes, captionAttributes..
	 */
	const getCurrentAttributes = () => {
		// Get the caption block attributes, if any.
		let currentBlock = select( 'core/block-editor' ).getBlocksByClientId( clientId )[ 0 ];
		let parentClientId = currentBlock.clientId;

		// If the current block is a caption, select the parent block's clientId instead.
		if ( 'dlxplugins/photo-caption-block' === currentBlock.name ) {
			// Select the last parent block.
			const currentBlockClientId = select( 'core/block-editor' ).getBlockParents( clientId ).pop();
			currentBlock = select( 'core/block-editor' ).getBlocksByClientId( currentBlockClientId )[ 0 ];
			parentClientId = currentBlock.clientId;
		}
		if ( 'dlxplugins/photo-block' !== currentBlock.name ) {
			return {
				photoAttributes: {},
				captionAttributes: {},
			};
		}
		const children = select( 'core/block-editor' ).getBlocksByClientId( parentClientId )[ 0 ]?.innerBlocks || [];
		const captionBlock = children.find( ( block ) => 'dlxplugins/photo-caption-block' === block.name );
		const captionAttributes = captionBlock ? captionBlock.attributes : {};

		// Get the parent block attributes.
		const parentAttributes = select( 'core/block-editor' ).getBlockAttributes( parentClientId );

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

	const hasErrors = () => {
		return Object.keys( errors ).length > 0;
	};

	/**
	 * Apply Global Style to current block.
	 *
	 * @param {Object} globalStyle Global Style slug.
	 */
	const applyGlobalStyle = ( globalStyle ) => {
		if ( ! getValues( 'globalStyleApplyToBlock' ) ) {
			return;
		}
		let hasCaption = false;
		if ( globalStyle.content?.photoAttributes?.hasCaption || attributes.hasCaption ) {
			hasCaption = true;
		}

		let currenBlockClientId = props.clientId;

		// Get the parent photo block.
		let currentBlock = select( 'core/block-editor' ).getBlocksByClientId( currenBlockClientId )[ 0 ];
		if ( 'dlxplugins/photo-caption-block' === currentBlock.name ) {
			const newParentClientId = select( 'core/block-editor' ).getBlockParents( currenBlockClientId )[ 0 ];
			currentBlock = select( 'core/block-editor' ).getBlocksByClientId( newParentClientId )[ 0 ];
			currenBlockClientId = newParentClientId;
		}

		// Try to get children of the block (caption).
		const children = select( 'core/block-editor' ).getBlocksByClientId( currenBlockClientId )[ 0 ]?.innerBlocks || [];

		// Get any exising caption blocks.
		const captionBlock = children.find( ( block ) => 'dlxplugins/photo-caption-block' === block.name );

		// Get unique ID for the photo block.
		const uniqueIdAttribute = currentBlock.attributes.uniqueId;
		const captionAttributes = {
			...globalStyle.content.captionAttributes,
			...{ globalStyle: globalStyle.slug },
		};

		// Set global style for parent block.
		updateBlockAttributes( currenBlockClientId, {
			date: new Date().getTime(),
			globalStyle: globalStyle.slug,
			hasCaption,
		} );

		// If there is no caption block, but there are attributes to apply, create one.
		if ( ! captionBlock && ( Object.keys( globalStyle.content.captionAttributes ).length > 1 || globalStyle.content.captionAttributes.length > 1 ) ) {
			const newBlocks = createBlock( 'dlxplugins/photo-caption-block', captionAttributes );
			insertBlock( newBlocks, undefined, currenBlockClientId );
		}

		// If there is a caption block and attributes to apply, apply them.
		if ( captionBlock && ( captionAttributes || captionAttributes.length > 0 ) ) {
			const captionBlockAttributes = { ...captionAttributes, ...uniqueIdAttribute };
			updateBlockAttributes( captionBlock.clientId, captionBlockAttributes );
		}
	};

	/**
	 * Save a new preset via Ajax.
	 *
	 * @param {Array} formData Form data array.
	 */
	const saveNewPreset = ( formData ) => {
		setIsSaving( true );
		const ajaxUrl = `${ ajaxurl }`; // eslint-disable-line no-undef
		const formDataNew = new FormData();
		formDataNew.append( 'action', 'dlx_photo_block_save_global_styles' );
		formDataNew.append( 'nonce', photoBlock.globalStylesSaveNewNonce );
		formDataNew.append( 'attributes', JSON.stringify( getCurrentAttributes() ) );
		formDataNew.append( 'formData', JSON.stringify( formData ) );
		fetch( ajaxUrl, {
			method: 'POST',
			body: formDataNew,
			/* get return in json */
			headers: {
				Accept: 'application/json',
			},
		} )
			.then( ( response ) => response.json() )
			.then( ( json ) => {
				const { success, data } = json;
				if ( ! success ) {
					setError( 'formAjaxError', {
						type: 'ajax',
						message: data.message,
					} );
					createWarningNotice(
						__( 'There was an error saving the global style.', 'photo-block' ),
						{
							type: 'snackbar',
						}
					);
					setIsSaving( false );
					return;
				}
				createSuccessNotice(
					__( 'Global style saved successfully.', 'photo-block' ),
					{
						type: 'snackbar',
					}
				);
				applyGlobalStyle( data, data.slug );
				setGlobalStyleRefresh( new Date().getTime() );
				setGlobalStyle( data, data.slug );
				setIsSaving( false );
				setSavingPreset( false );

				props.generateGlobalStyle();
			} )
			.catch( ( error ) => {
				setIsSaving( false );
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
		data.append( 'action', 'dlx_photo_block_override_global_style' );
		data.append( 'nonce', photoBlock.globalStylesSaveNewNonce );
		data.append( 'attributes', JSON.stringify( getCurrentAttributes() ) );
		data.append( 'editId', formData.selectedGlobalStyle );
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
				const newData = json.data;
				if ( ! success ) {
					setError( 'formAjaxError', {
						type: 'ajax',
						message: newData.message,
					} );
					createWarningNotice(
						__( 'There was an error saving the global style override.', 'photo-block' ),
						{
							type: 'snackbar',
						}
					);
					setIsSaving( false );
					return;
				}
				applyGlobalStyle( newData, newData.slug );
				setGlobalStyle( newData, newData.slug );
				setIsSaving( false );
				setSavingPreset( false );
				props.generateGlobalStyle();
				setGlobalStyleRefresh( new Date().getTime() );
				maybeRefreshBlocks( newData );

				createSuccessNotice(
					__( 'Global style saved successfully.', 'photo-block' ),
					{
						type: 'snackbar',
					}
				);
			} )
			.catch( ( error ) => {
				setSavingPreset( false );
			} );
	};

	/**
	 * Refresh blocks upon a global style override.
	 *
	 * @param {Object} incomingData Incoming data from the server.
	 */
	const maybeRefreshBlocks = ( incomingData ) => {
		// Get a list of all photo blocks.
		const photoBlocks = select( 'core/block-editor' ).getBlocks().filter( ( block ) => {
			return 'dlxplugins/photo-block' === block.name;
		} );
		// Now for each that has a global style, let's force an attribute update.
		photoBlocks.forEach( ( block ) => {
			const { globalStyle, uniqueId } = block.attributes;
			const captionPosition = incomingData.content.captionAttributes.captionPosition;

			// Get the caption block attributes, if any.
			let currentBlock = select( 'core/block-editor' ).getBlocksByClientId( parentClientId )[ 0 ];
			let parentClientId = currentBlock.clientId;

			// If the current block is a caption, select the parent block's clientId instead.
			if ( 'dlxplugins/photo-caption-block' === currentBlock.name ) {
				const currentBlockClientId = select( 'core/block-editor' ).getBlockParents( clientId )[ 0 ];
				currentBlock = select( 'core/block-editor' ).getBlocksByClientId( currentBlockClientId )[ 0 ];
				parentClientId = currentBlock.clientId;
			}

			if ( globalStyle !== 'none' && '' !== globalStyle ) {
				updateBlockAttributes( parentClientId, {
					date: new Date().getTime(),
					globalStyle,
					captionPosition,
				} );

				// Now get caption blocks and refresh.
				const children = currentBlock.innerBlocks || [];
				const captionBlock = children.find( ( innerBlock ) => 'dlxplugins/photo-caption-block' === innerBlock.name );
				if ( captionBlock ) {
					updateBlockAttributes( captionBlock.clientId, {
						date: new Date().getTime(),
						globalStyle,
						captionPosition,
					} );
				}
			}
		} );
	};

	/**
	 * Get the preset options in radio group format.
	 *
	 * @return {Array} Array of objects with label and value properties.
	 */
	const getPresetRadioOptions = () => {
		const options = [];
		Object.values( globalStyles ).forEach( ( globalStyle ) => {
			options.push( {
				label: globalStyle.title,
				value: globalStyle.id + '',
			} );
		} );
		return options;
	};

	let radioOptions = [
		{
			label: __( 'Save Global Style', 'photo-block' ),
			value: 'new',
		},
		{
			label: __( 'Override Global Style', 'photo-block' ),
			value: 'override',
		},
	];
	if ( Object.keys( globalStyles ).length === 0 || ! canSaveDefaultPresets ) {
		radioOptions = [
			{
				label: __( 'Save Global Style', 'photo-block' ),
				value: 'new',
			},
		];
	}

	return (
		<div className="photo-block-global-styles-modal">
			<Modal
				title={ title }
				onRequestClose={ () => setSavingPreset( false ) }
				className="photo-block-global-styles-modal"
				shouldCloseOnClickOutside={ false }
			>
				{ radioOptions.length > 1 && (
					<RadioControl
						label={ __(
							'Save a new global style or override an existing one.',
							'photo-block'
						) }
						className="photo-block-global-styles-modal-radio-control"
						selected={ presetSaveType }
						options={ radioOptions }
						onChange={ ( value ) => {
							setPresetSaveType( value );
						} }
					/>
				) }
				<form onSubmit={ handleSubmit( onSubmit ) }>
					{ 'new' === presetSaveType && (
						<>
							<div className="photo-block-global-styles-modal-new-preset">
								<div className="photo-block-global-styles-row">
									<Controller
										name="globalStyleLabel"
										control={ control }
										rules={ {
											required: true,
											pattern: /^(?=[^0-9-_])[a-zA-Z0-9-_ ]+$/,
										} }
										render={ ( { field } ) => (
											<TextControl
												{ ...field }
												label={ __( 'Global Style Name', 'photo-block' ) }
												className={ classnames( 'photo-block-admin__text-control', {
													'is-required': true,
													'has-error': 'required' === errors.globalStyleLabel?.type,
												} ) }
												onBlur={ () => {
													if ( getValues( 'globalStyleCSSClass' ) === '' ) {
														setValue(
															'globalStyleCSSClass',
															cleanForSlug( field.value )
														);
														trigger( 'globalStyleCSSClass' );
													}
												} }
												onChange={ ( newValue ) => {
													clearErrors();
													field.onChange( newValue );
												} }
												help={ __(
													'Enter a descriptive label for this global style. A unique slug will be generated automatically.',
													'photo-block'
												) }
											/>
										) }
									/>
									{ 'required' === errors.globalStyleLabel?.type && (
										<Notice
											message={ __( 'The Global Style Name field is required.' ) }
											status="error"
											politeness="assertive"
											icon={ AlertCircle }
										/>
									) }
									{ 'pattern' === errors.globalStyleLabel?.type && (
										<Notice
											message={ __( 'This Global Style label contains invalid characters.' ) }
											status="error"
											politeness="assertive"
											icon={ AlertCircle }
										/>
									) }
								</div>
								<div className="photo-block-global-styles-row">
									<Controller
										name="globalStyleCSSClass"
										control={ control }
										rules={
											{
												required: true,
												pattern: /^-?[_a-zA-Z]+[_a-zA-Z0-9-]*$/,
											}
										}
										render={ ( { field: { onChange, value } } ) => (
											<TextControl
												label={ __( 'Global Style CSS Class', 'photo-block' ) }
												value={ value }
												className={ classnames( 'photo-block-admin__text-control', {
													'is-required': true,
													'has-error': 'required' === errors.globalStyleCSSClass?.type,
												} ) }
												help={ __(
													'The CSS class used when outputting the block.',
													'photo-block'
												) }
												onChange={ ( newValue ) => {
													clearErrors();
													onChange( newValue );
												} }
											/>
										) }
									/>
									{ 'pattern' === errors.globalStyleCSSClass?.type && (
										<Notice
											message={ __( 'The CSS class contains invalid characters and must be a CSS friendly name.' ) }
											status="error"
											politeness="assertive"
											icon={ AlertCircle }
										/>
									) }
									{ 'required' === errors.globalStyleCSSClass?.type && (
										<Notice
											message={ __( 'The Global Style CSS Class field is required.' ) }
											status="error"
											politeness="assertive"
											icon={ AlertCircle }
										/>
									) }
								</div>
							</div>
						</>
					) }
					{ ( 'override' === presetSaveType && canSaveDefaultPresets ) && (
						<>
							{ Object.keys( globalStyles ).length > 0 && (
								<div className="photo-block-global-styles-modal-override-preset">
									<Controller
										name="selectedGlobalStyle"
										control={ control }
										rules={ {
											required: true,
										} }
										render={ ( { field: { onChange, value } } ) => (
											<RadioControl
												label={ __(
													'Select a global style to override',
													'photo-block'
												) }
												className="is-required"
												selected={ value }
												options={ getPresetRadioOptions() }
												onChange={ ( radioValue ) => onChange( radioValue ) }
											/>
										) }
									/>
									{ 'required' === errors.selectedGlobalStyle?.type && (
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
					<div className="photo-block-global-styles-row photo-block-global-styles-apply-option">
						<Controller
							name="globalStyleApplyToBlock"
							control={ control }
							render={ ( { field } ) => (
								<ToggleControl
									label={ __(
										'Apply this global style to the selected block.',
										'photo-block'
									) }
									checked={ field.value }
									onChange={ () => {
										field.onChange( ! field.value );
									} }
								/>
							) }
						/>
					</div>
					<div className="photo-block-global-styles-modal-button-group">
						<Button
							type="submit"
							variant="primary"
							className="photo-block-global-styles-modal-apply-button"
							disabled={ isSaving || hasErrors() }
							icon={ <Save /> }
						>
							{ isSaving
								? __( 'Saving…', 'photo-block' )
								: __( 'Save Global Style', 'photo-block' ) }
						</Button>
						<Button
							variant="secondary"
							onClick={ () => {
								setSavingPreset( false );
							} }
							className="photo-block-global-styles-modal-cancel-button"
							disabled={ isSaving }
						>
							{ __( 'Cancel', 'photo-block' ) }
						</Button>
					</div>
					{
						errors?.formAjaxError && (
							<div className="photo-block-global-styles-row">
								<Notice
									message={ errors.formAjaxError.message }
									status="error"
									politeness="assertive"
									icon={ AlertCircle }
								/>
							</div>
						)
					}
				</form>
			</Modal>
		</div>
	);
};
export default GlobalStylesSaveModal;
