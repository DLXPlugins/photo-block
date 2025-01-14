// eslint-disable-next-line no-unused-vars
import React, { Suspense, useState, useMemo } from 'react';
import {
	ToggleControl,
	TextControl,
	SelectControl,
	Button,
} from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';
import apiRequest from '@wordpress/api-fetch';
import SendCommandAjax from '../utils/SendCommandAjax';
import { Loader2 } from 'lucide-react';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation as TriangleExclamation, faCircleCheck as CircleCheck, faInfoCircle as Info } from '@fortawesome/free-solid-svg-icons';

// Local imports.
import Notice from './components/Notice';
import SaveResetButtons from './components/SaveResetButtons';

const imageFormats = [
	{
		label: 'JPEG',
		value: 'jpg',
	},
	{
		label: 'PNG',
		value: 'png',
	},
	{
		label: 'WebP',
		value: 'webp',
	},
];
const Settings = ( props ) => {
	const [ saveAccessKeyLoading, setSaveAccessKeyLoading ] = useState( false );
	const [ refreshAccessKeyLoading, setRefreshAccessKeyLoading ] = useState( false );
	const [ revokeAccessKeyLoading, setRevokeAccessKeyLoading ] = useState( false );
	const [ screenshotOneTotalLimit, setScreenshotOneTotalLimit ] = useState( dlxPBAdmin.screenshotOneTotalLimit );
	const [ screenshotOneAvailableRequests, setScreenshotOneAvailableRequests ] = useState( dlxPBAdmin.screenshotOneAvailableRequests );

	const {
		control,
		getValues,
		reset,
		setError,
		trigger,
		handleSubmit,
		setValue,
		clearErrors,
	} = useForm( {
		defaultValues: {
			saveNonce: dlxPBAdmin.saveNonce,
			resetNonce: dlxPBAdmin.resetNonce,
			hideCaptionAppender: dlxPBAdmin.hideCaptionAppender,
			screenshotOneEnabled: dlxPBAdmin.screenshotOneEnabled,
			screenshotOneAccessKey: dlxPBAdmin.screenshotOneAccessKey,
			screenshotOneAPIValid: dlxPBAdmin.screenshotOneAPIValid,
			screenshotOneEnableSignedRequests: dlxPBAdmin.screenshotOneEnableSignedRequests,
			screenshotOneSecretKey: dlxPBAdmin.screenshotOneSecretKey,
			screenshotOneDefaultImageFormat: dlxPBAdmin.screenshotOneDefaultImageFormat,
			screenshotOneEnableAnimatedScreenshots: dlxPBAdmin.screenshotOneEnableAnimatedScreenshots,
			screenshotOneMaxImageWidth: dlxPBAdmin.screenshotOneMaxImageWidth,
			screenshotOneMaxImageHeight: dlxPBAdmin.screenshotOneMaxImageHeight,
			screenshotOneViewportWidth: dlxPBAdmin.screenshotOneViewportWidth,
			screenshotOneViewportHeight: dlxPBAdmin.screenshotOneViewportHeight,
			screenshotOneBlockCookieBanners: dlxPBAdmin.screenshotOneBlockCookieBanners,
		},
	} );
	const formValues = useWatch( { control } );
	const { errors, isDirty, dirtyFields } = useFormState( {
		control,
	} );

	/**
	 * Save the option to the database.
	 */
	const onSubmit = () => {
		// do nothing.
	};

	/**
	 * Saves or updates the ScreenshotOne API key.
	 */
	const saveApiKey = async() => {
		const response = await SendCommandAjax( 'dlx_pb_save_screenshot_one_api_key', {
			nonce: dlxPBAdmin.savescreenshotOneAccessKeyNonce,
			apiKey: getValues( 'screenshotOneAccessKey' ),
			secretKey: getValues( 'screenshotOneSecretKey' ),
		} );

		const { success, data } = response.data;
		if ( success ) {
			setValue( 'screenshotOneAPIValid', true );
			setScreenshotOneTotalLimit( data.screenshotOneTotalLimit );
			setScreenshotOneAvailableRequests( data.screenshotOneAvailableRequests );
		} else {
			setValue( 'screenshotOneAPIValid', false );
			setError( 'screenshotOneAccessKey', { type: 'apiKeyError', message: data } );
		}

		return response;
	};

	const onHandleResetAccessKey = async() => {
		setRevokeAccessKeyLoading( true );
		const response = await SendCommandAjax( 'dlx_pb_revoke_screenshot_one_api_key', {
			nonce: dlxPBAdmin.revokescreenshotOneAccessKeyNonce,
		} );

		const { success } = response.data;
		if ( success ) {
			reset( {
				screenshotOneAPIValid: false,
				screenshotOneAccessKey: '',
				screenshotOneSecretKey: '',
				screenshotOneTotalLimit: 0,
				screenshotOneAvailableRequests: 0,
				screenshotOneEnabled: false,
			} );
		} else {
			setError( 'screenshotOneAccessKey', { type: 'apiKeyError', message: response.data.data } );
		}

		setRevokeAccessKeyLoading( false );
	};

	/**
	 * Save the ScreenshotOne API key.
	 */
	const onHandleSaveAPIKey = async() => {
		trigger( 'screenshotOneAccessKey' );
		trigger( 'screenshotOneSecretKey' );
		if ( errors.screenshotOneAccessKey || errors.screenshotOneSecretKey ) {
			return;
		}

		setSaveAccessKeyLoading( true );

		await saveApiKey();

		setSaveAccessKeyLoading( false );
	};

	/**
	 * Refresh the API values.
	 */
	const onHandleRefreshAPIValues = async() => {
		trigger( 'screenshotOneAccessKey' );
		trigger( 'screenshotOneSecretKey' );
		if ( errors.screenshotOneAccessKey || errors.screenshotOneSecretKey ) {
			return;
		}

		setRefreshAccessKeyLoading( true );

		await saveApiKey();

		setRefreshAccessKeyLoading( false );
	};

	return (
		<>
			<div className="dlx-pb-admin-content-heading">
				<h1><span className="dlx-pb-content-heading-text">{ __( 'Settings for Photo Block', 'photo-block' ) }</span></h1>
				<p className="description">
					{
						__( 'Configure the settings below for Photo Block.', 'photo-block' )
					}
				</p>
			</div>
			{ /* eslint-disable-next-line no-unused-vars */ }
			<form onSubmit={ handleSubmit( onSubmit ) }>
				<div id="dlx-pb-admin-table">
					<table className="form-table form-table-row-sections">
						<tbody>
							<tr>
								<th scope="row">
									{ __( 'Block Settings', 'photo-block' ) }
								</th>
								<td>
									<div className="dlx-admin__row">
										<Controller
											control={ control }
											name="hideCaptionAppender"
											render={ ( { field } ) => (
												<ToggleControl
													{ ...field }
													checked={ field.value }
													onChange={ ( value ) => {
														field.onChange( value );
													} }
													label={ __( 'Hide Caption Appender by Default', 'photo-block' ) }
													help={ __( 'If hidden, you can still show the caption by enabling it in the block toolbar.', 'photo-block' ) }
												/>
											) }
										/>
									</div>
								</td>
							</tr>
							<tr>
								<th scope="row">
									{ __( 'ScreenshotOne', 'photo-block' ) }
								</th>
								<td>
									<div className="dlx-admin__row">
										<Controller
											control={ control }
											name="screenshotOneEnabled"
											render={ ( { field } ) => (
												<ToggleControl
													{ ...field }
													checked={ field.value }
													onChange={ ( value ) => {
														field.onChange( value );
													} }
													label={ __( 'Enable ScreenshotOne', 'photo-block' ) }
												/>
											) }
										/>
									</div>
									{
										getValues( 'screenshotOneEnabled' ) && (
											<>
												{
													getValues( 'screenshotOneAPIValid' ) && (
														<>
															<div className="dlx-admin__row">
																<Notice
																	message={
																		__( 'Successfully connected to ScreenshotOne.', 'photo-block' )
																	}
																	status="success"
																	icon={ () => <FontAwesomeIcon icon={ CircleCheck } /> }
																>
																	<p className="description">
																		{
																			sprintf(
																				/* translators: 1: Available requests, 2: Total limit */
																				__( 'You have used %1$s of %2$s available requests.', 'photo-block' ),
																				screenshotOneTotalLimit - screenshotOneAvailableRequests,
																				screenshotOneTotalLimit
																			)
																		}
																	</p>
																</Notice>
															</div>
														</>
													)
												}
												<div className="dlx-admin__row">
													<Controller
														control={ control }
														name="screenshotOneAccessKey"
														rules={ { required: true } }
														render={ ( { field } ) => (
															<>
																<TextControl
																	label={ __( 'API Key', 'photo-block' ) }
																	value={ field.value }
																	id="search-sso-api-key"
																	name="search-sso-api-key"
																	className={
																		classnames(
																			{
																				'has-error': errors.screenshotOneAccessKey,
																				'is-required': true,
																			}
																		)
																	}
																	disabled={ getValues( 'screenshotOneAPIValid' ) }
																	type="password"
																	onChange={ ( newValue ) => {
																		field.onChange( newValue );
																		clearErrors( 'screenshotOneAccessKey' );
																		clearErrors( 'apiKeyError' );
																	} }
																	help={ __( 'Enter your ScreenshotOne API key.', 'photo-block' ) }
																/>
																{
																	'required' === errors.screenshotOneAccessKey?.type && (
																		<Notice
																			message={ __( 'An API key is required.', 'photo-block' ) }
																			status="error"
																			icon={ () => <FontAwesomeIcon icon={ TriangleExclamation } /> }
																		/>
																	)
																}
																{
																	'apiKeyError' === errors.screenshotOneAccessKey?.type && (
																		<Notice
																			message={ errors.screenshotOneAccessKey.message }
																			status="error"
																			icon={ () => <FontAwesomeIcon icon={ TriangleExclamation } /> }
																		/>
																	)
																}
															</>
														) }
													/>
												</div>
												<div className="dlx-admin__row">
													<Controller
														control={ control }
														name="screenshotOneSecretKey"
														rules={ { required: true } }
														render={ ( { field } ) => (
															<>
																<TextControl
																	label={ __( 'Secret Key', 'photo-block' ) }
																	value={ field.value }
																	type="password"
																	id="search-sso-secret-key"
																	name="search-sso-secret-key"
																	className={
																		classnames(
																			{
																				'has-error': errors.screenshotOneSecretKey,
																				'is-required': true,
																			}
																		)
																	}
																	disabled={ getValues( 'screenshotOneAPIValid' ) }
																	onChange={ ( newValue ) => {
																		field.onChange( newValue );
																		clearErrors( 'screenshotOneSecretKey' );
																	} }
																	help={ __( 'Enter your ScreenshotOne secret key for signed requests.', 'photo-block' ) }
																/>
															</>
														) }
													/>
												</div>
												{
													'required' === errors.screenshotOneSecretKey?.type && (
														<div className="dlx-admin__row">
															<Notice
																message={ __( 'A secret key is required when signed requests are enabled.', 'photo-block' ) }
																status="error"
																icon={ () => <FontAwesomeIcon icon={ TriangleExclamation } /> }
															/>
														</div>
													)
												}
												<div className="dlx-admin__row">
													{
														getValues( 'screenshotOneAPIValid' ) && (
															<>
																<div className="dlx-admin__row dlx-admin__button-row dlx-admin-component-row-button">
																	<Button
																		variant="secondary"
																		onClick={ () => {
																			onHandleRefreshAPIValues();
																		} }
																		icon={ refreshAccessKeyLoading ? () => <Loader2 /> : null }
																		iconSize="18"
																		iconPosition="right"
																		className={ classnames(
																			'dlx-pb__btn dlx-pb__btn-primary dlx-pb__btn--icon-right',
																			{ 'has-icon': refreshAccessKeyLoading },
																			{ 'is-saving': refreshAccessKeyLoading },
																			{ 'is-saved': ! refreshAccessKeyLoading },
																		) }
																		disabled={ refreshAccessKeyLoading || revokeAccessKeyLoading }
																	>
																		{ refreshAccessKeyLoading ? __( 'Refreshing…', 'photo-block' ) : __( 'Refresh API Values', 'photo-block' ) }
																	</Button>
																	<Button
																		variant="secondary"
																		isDestructive={ true }
																		icon={ revokeAccessKeyLoading ? () => <Loader2 /> : null }
																		className={ classnames(
																			'dlx-pb__btn dlx-pb__btn-primary dlx-pb__btn--icon-right',
																			{ 'has-icon': revokeAccessKeyLoading },
																			{ 'is-saving': revokeAccessKeyLoading },
																			{ 'is-saved': ! revokeAccessKeyLoading },
																		) }
																		onClick={ () => {
																			onHandleResetAccessKey();
																		} }
																		disabled={ revokeAccessKeyLoading || refreshAccessKeyLoading }
																		iconSize="18"
																		iconPosition="right"
																	>
																		{ revokeAccessKeyLoading ? __( 'Revoking…', 'photo-block' ) : __( 'Revoke Access Token', 'photo-block' ) }
																	</Button>
																</div>
															</>
														)
													}
													{ ! getValues( 'screenshotOneAPIValid' ) && (
														<div className="dlx-admin__row dlx-admin__button-row dlx-admin-component-row-button">
															<Button
																variant="secondary"
																onClick={ () => {
																	onHandleSaveAPIKey();
																} }
																className={ classnames(
																	'dlx-pb__btn dlx-pb__btn-primary dlx-pb__btn--icon-right',
																	{ 'has-icon': saveAccessKeyLoading },
																	{ 'is-saving': saveAccessKeyLoading },
																	{ 'is-saved': ! saveAccessKeyLoading },
																) }
																iconSize="18"
																iconPosition="right"
																disabled={ saveAccessKeyLoading }
																icon={ saveAccessKeyLoading ? () => <Loader2 /> : null }
															>
																{ saveAccessKeyLoading ? __( 'Saving…', 'photo-block' ) : __( 'Save API Key', 'photo-block' ) }
															</Button>
														</div>
													) }
												</div>
												{
													getValues( 'screenshotOneAPIValid' ) && (
														<>
															<div className="dlx-admin__row">
																<Controller
																	control={ control }
																	name="screenshotOneDefaultImageFormat"
																	render={ ( { field } ) => (
																		<SelectControl
																			{ ...field }
																			options={ imageFormats }
																			label={ __( 'Default Image Format', 'photo-block' ) }
																			help={ __( 'Select the default image format for ScreenshotOne.', 'photo-block' ) }
																		/>
																	) }
																/>
															</div>
															<div className="dlx-admin__row">
																<Controller
																	name="screenshotOneMaxImageWidth"
																	rules={ { required: true, pattern: { value: /^\d+$/, message: __( 'Please enter a valid number.', 'photo-block' ) } } }
																	control={ control }
																	render={ ( { field } ) => (
																		<TextControl
																			{ ...field }
																			label={ __( 'Max Image Width', 'photo-block' ) }
																			help={ __( 'Enter the maximum image width for ScreenshotOne.', 'photo-block' ) }
																		/>
																	) }
																/>
															</div>
															{
																'required' === errors.screenshotOneMaxImageWidth?.type && (
																	<div className="dlx-admin__row">
																		<Notice
																			message={ errors.screenshotOneMaxImageWidth.message }
																			status="error"
																			icon={ () => <FontAwesomeIcon icon={ TriangleExclamation } /> }
																		/>
																	</div>
																)
															}
															{
																'pattern' === errors.screenshotOneMaxImageWidth?.type && (
																	<div className="dlx-admin__row">
																		<Notice
																			message={ errors.screenshotOneMaxImageWidth.message }
																			status="error"
																			icon={ () => <FontAwesomeIcon icon={ TriangleExclamation } /> }
																		/>
																	</div>
																)
															}
															<div className="dlx-admin__row">
																<Controller
																	name="screenshotOneMaxImageHeight"
																	control={ control }
																	rules={ { required: true, pattern: { value: /^\d+$/, message: __( 'Please enter a valid number.', 'photo-block' ) } } }
																	render={ ( { field } ) => (
																		<TextControl
																			{ ...field }
																			label={ __( 'Max Image Height', 'photo-block' ) }
																			help={ __( 'Enter the maximum image height for ScreenshotOne.', 'photo-block' ) }
																		/>
																	) }
																/>
															</div>
															{
																'required' === errors.screenshotOneMaxImageHeight?.type && (
																	<div className="dlx-admin__row">
																		<Notice
																			message={ errors.screenshotOneMaxImageHeight.message }
																			status="error"
																			icon={ () => <FontAwesomeIcon icon={ TriangleExclamation } /> }
																		/>
																	</div>
																)
															}
															{
																'pattern' === errors.screenshotOneMaxImageHeight?.type && (
																	<div className="dlx-admin__row">
																		<Notice
																			message={ errors.screenshotOneMaxImageHeight.message }
																			status="error"
																			icon={ () => <FontAwesomeIcon icon={ TriangleExclamation } /> }
																		/>
																	</div>
																)
															}
															<div className="dlx-admin__row">
																<Controller
																	name="screenshotOneViewportWidth"
																	control={ control }
																	rules={ { required: true, pattern: { value: /^\d+$/, message: __( 'Please enter a valid number.', 'photo-block' ) } } }
																	render={ ( { field } ) => (
																		<TextControl
																			{ ...field }
																			label={ __( 'Viewport Width', 'photo-block' ) }
																			help={ __( 'Enter the viewport width for ScreenshotOne.', 'photo-block' ) }
																		/>
																	) }
																/>
															</div>
															{
																'required' === errors.screenshotOneViewportWidth?.type && (
																	<div className="dlx-admin__row">
																		<Notice
																			message={ errors.screenshotOneViewportWidth.message }
																			status="error"
																			icon={ () => <FontAwesomeIcon icon={ TriangleExclamation } /> }
																		/>
																	</div>
																)
															}
															{
																'pattern' === errors.screenshotOneViewportWidth?.type && (
																	<div className="dlx-admin__row">
																		<Notice
																			message={ errors.screenshotOneViewportWidth.message }
																			status="error"
																			icon={ () => <FontAwesomeIcon icon={ TriangleExclamation } /> }
																		/>
																	</div>
																)
															}
															<div className="dlx-admin__row">
																<Controller
																	name="screenshotOneViewportHeight"
																	control={ control }
																	rules={ { required: true, pattern: { value: /^\d+$/, message: __( 'Please enter a valid number.', 'photo-block' ) } } }
																	render={ ( { field } ) => (
																		<TextControl
																			{ ...field }
																			label={ __( 'Viewport Height', 'photo-block' ) }
																			help={ __( 'Enter the viewport height for ScreenshotOne.', 'photo-block' ) }
																		/>
																	) }
																/>
															</div>
															{
																'required' === errors.screenshotOneViewportHeight?.type && (
																	<div className="dlx-admin__row">
																		<Notice
																			message={ errors.screenshotOneViewportHeight.message }
																			status="error"
																			icon={ () => <FontAwesomeIcon icon={ TriangleExclamation } /> }
																		/>
																	</div>
																)
															}
															{
																'pattern' === errors.screenshotOneViewportHeight?.type && (
																	<div className="dlx-admin__row">
																		<Notice
																			message={ errors.screenshotOneViewportHeight.message }
																			status="error"
																			icon={ () => <FontAwesomeIcon icon={ TriangleExclamation } /> }
																		/>
																	</div>
																)
															}
															<div className="dlx-admin__row">
																<Controller
																	name="screenshotOneBlockCookieBanners"
																	control={ control }
																	render={ ( { field } ) => (
																		<ToggleControl
																			{ ...field }
																			checked={ field.value }
																			onChange={ ( value ) => {
																				field.onChange( value );
																			} }
																			label={ __( 'Block Cookie Banners', 'photo-block' ) }
																			help={ __( 'If enabled, ScreenshotOne will block cookie banners from showing.', 'photo-block' ) }
																		/>
																	) }
																/>
															</div>
														</>
													)
												}
											</>
										)
									}
								</td>
							</tr>
						</tbody>
					</table>
					<SaveResetButtons
						formValues={ formValues }
						setError={ setError }
						reset={ reset }
						errors={ errors }
						isDirty={ isDirty }
						dirtyFields={ dirtyFields }
						trigger={ trigger }
					/>
				</div>
			</form>
		</>
	);
};

export default Settings;
