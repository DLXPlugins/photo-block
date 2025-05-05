import './editor.scss';
import React, { useState, useEffect, useRef } from 'react';
import { __ } from '@wordpress/i18n';
import {
	RangeControl,
	Button,
	SelectControl,
	BaseControl,
	TextControl,
	Popover,
} from '@wordpress/components';
import { MediaUploadCheck, MediaUpload } from '@wordpress/block-editor';
import { useForm, Controller, useWatch } from 'react-hook-form';
import ColorPickerControl from '../ColorPicker';
import classNames from 'classnames';

const BackgroundSelectorControl = ( props ) => {

	const mediaUploadButton = useRef( null );

	const [ backgroundSettingsVisible, setBackgroundSettingsVisible ] =
		useState( false );
	const [ backgroundSettingsPopoverAnchor, setBackgroundSettingsPopoverAnchor ] =
		useState( null );

	const [ isVisible, setIsVisible ] = useState( false );
	const [ isToggled, setIsToggled ] = useState( false );

	// Background error image state.
	const [ errorImage, setErrorImage ] = useState( false );
	

	const getDefaultValues = () => {
		return {
			url: props.values.url,
			id: props.values.id,
			backgroundColor: props.values.backgroundColor,
			backgroundSize: props.values.backgroundSize,
			backgroundPosition: props.values.backgroundPosition,
			backgroundRepeat: props.values.backgroundRepeat,
			backgroundOpacity: props.values.backgroundOpacity,
			backgroundOpacityHover: props.values.backgroundOpacityHover,
		};
	};

	const { control, setValue, getValues } = useForm( {
		defaultValues: getDefaultValues(),
	} );

	const formValues = useWatch( { control } );

	const { label } = props;

	useEffect( () => {
		props.onValuesChange( formValues );
	}, [ formValues ] );

	const getBackgroundRepeat = () => {
		const backgroundRepeat = [
			{ label: __( 'repeat-x', 'photo-block' ), value: 'repeat-x' },
			{ label: __( 'repeat-y', 'photo-block' ), value: 'repeat-y' },
			{ label: __( 'repeat', 'photo-block' ), value: 'repeat' },
			{ label: __( 'no-repeat', 'photo-block' ), value: 'no-repeat' },
		];
		return (
			<Controller
				name={ 'backgroundRepeat' }
				control={ control }
				render={ ( { field: { onChange, value } } ) => (
					<SelectControl
						label={ __( 'Background Repeat', 'photo-block' ) }
						value={ value }
						options={ backgroundRepeat }
						onChange={ ( newValue ) => {
							onChange( newValue );
						} }
					/>
				) }
			/>
		);
	};

	/**
	 * Close color popup if visible.
	 */
	 const toggleClose = () => {
		setIsToggled( true );
		setIsVisible( ! isVisible );
		setTimeout( () => {
			setIsToggled( false );
		}, 500 );
	};

	const getPopoverContent = () => {
		return (
			<BaseControl className="photo-block-background-settings-popover">
				<div className="photo-block-background-selector__row_item">
					{ getBackgroundRepeat() }
				</div>
				<div className="photo-block-background-selector__row_item">
					<Controller
						name={ 'backgroundSize' }
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<TextControl
								label={ __( 'Background Size', 'photo-block' ) }
								value={ value }
								onChange={ ( newValue ) => {
									onChange( newValue );
								} }
							/>
						) }
					/>
				</div>
				<div className="photo-block-background-selector__row_item">
					<Controller
						name={ 'backgroundPosition' }
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<TextControl
								label={ __( 'Background Position', 'photo-block' ) }
								value={ value }
								onChange={ ( newValue ) => {
									onChange( newValue );
								} }
							/>
						) }
					/>
				</div>
			</BaseControl>
		);
	};

	const getBackgroundUploader = () => {
		return (
			<div className="photo-block-background-selector-upload-row">
				<Controller
					name={ 'url' }
					control={ control }
					render={ ( { field: { onChange, value } } ) => (
						<TextControl
							label={ __( 'Background Image', 'photo-block' ) }
							value={ value }
							onChange={ ( newValue ) => {
								onChange( newValue );
							} }
							placeholder={ __( 'Enter URL', 'photo-block' ) }
						/>
					) }
				/>
				<div className="photo-block-background-selector-upload-button">
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( media ) => {
								if ( 'image' === media.type ) {
									setValue( 'url', media.url );
									setValue( 'id', media.id );
								} else {
									setErrorImage( true );
									setValue( 'url', '' );
									setValue( 'id', '0' );
									mediaUploadButton.current.focus();
									setTimeout(() => {
										setErrorImage( false );
									}, 8000 );
								}
							} }
							title={ __( 'Select Background Image', 'photo-block' ) }
							mode={ 'upload' }
							multiple={ false }
							allowedTypes={ [ 'image' ] }
							value={ getValues( 'id' ) }
							render={ ( { open } ) => (
								<Button
									variant="secondary"
									className={ classNames( { 'photo-block-background-selector-image-button-error': errorImage } ) }
									onClick={ () => {
										setErrorImage( false );
										open();
									} }
									label={ ! errorImage ? __( 'Upload Background Image', 'photo-block' ) : __( 'Please choose only images.', 'photo-block' ) }
									icon="format-image"
									showTooltip={ errorImage }
									tooltipPosition="top center"
									ref={ mediaUploadButton }
								/>
							) }
						/>
					</MediaUploadCheck>
				</div>
			</div>
		);
	};

	return (
		<BaseControl className="photo-block-background-selector-wrapper">
			<div className="photo-block-background-selector__row_item">
				{ getBackgroundUploader() }
			</div>
			<div className="photo-block-background-selector__row_item photo-block-background-selector__row_item-2">
				<h3>{ __( 'Background Settings', 'photo-block' ) }</h3>
				<Button
					variant="secondary"
					label={ __( 'Background Settings', 'photo-block' ) }
					onClick={ () => {
						if ( isToggled ) {
							setIsToggled( false );
						} else {
							setIsVisible( ! isVisible );
						}
					} }
					icon="admin-settings"
					ref={ setBackgroundSettingsPopoverAnchor }
				/>
				{ true === isVisible && (
					<Popover
						className="photo-block-component-background-settings-popup"
						noArrow={ false }
						anchorRef={ backgroundSettingsPopoverAnchor }
						placement="left"
						offset={ 10 }
						headerTitle={ __( 'Background Settings', 'photo-block' ) }
						onClose={ toggleClose }
					>
						{ getPopoverContent() }
					</Popover>
				) }
			</div>
			<div className="photo-block-background-selector__row_item">
				<Controller
					name={ 'backgroundColor' }
					control={ control }
					render={ ( { field: { onChange, value } } ) => (
						<ColorPickerControl
							value={ value }
							key={ 'background-color-image' }
							onChange={ ( slug, newValue ) => {
								onChange( newValue );
							} }
							label={ __( 'Background Color', 'photo-block' ) }
							defaultColors={ photoBlock.palette }
							defaultColor={ 'transparent' }
							slug={ 'background-color-image' }
						/>
					) }
				/>
			</div>
			<div className="photo-block-background-selector__row_item">
				<Controller
					name={ 'backgroundOpacity' }
					control={ control }
					render={ ( { field: { onChange, value } } ) => (
						<RangeControl
							label={ __( 'Background Opacity', 'photo-block' ) }
							value={ value }
							onChange={ ( newValue ) => onChange( newValue ) }
							min={ 0 }
							max={ 1 }
							step={ 0.01 }
						/>
					) }
				/>
			</div>
			<div className="photo-block-background-selector__row_item">
				<Controller
					name={ 'backgroundOpacityHover' }
					control={ control }
					render={ ( { field: { onChange, value } } ) => (
						<RangeControl
							label={ __( 'Background Opacity Hover', 'photo-block' ) }
							value={ value }
							onChange={ ( newValue ) => onChange( newValue ) }
							min={ 0 }
							max={ 1 }
							step={ 0.01 }
						/>
					) }
				/>
			</div>
		</BaseControl>
	);
};
export default BackgroundSelectorControl;
