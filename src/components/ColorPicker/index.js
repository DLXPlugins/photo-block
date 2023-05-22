/**
 * Color Picker.
 *
 * Credit: Forked from @generateblocks
 */
import './editor.scss';
import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import hexToRgba from 'hex-to-rgba';
import rgb2hex from 'rgb2hex';
import { __ } from '@wordpress/i18n';

import {
	Tooltip,
	BaseControl,
	ColorPicker,
	RangeControl,
	Popover,
	ColorPalette,
	Button,
} from '@wordpress/components';

const ColorPickerControl = ( props ) => {
	const [ colorKey, setColorKey ] = useState( props.slug );
	const [ isVisible, setIsVisible ] = useState( false );
	const [ color, setColor ] = useState( props.value );
	const [ opacity, setOpacity ] = useState( 1 );

	const {
		defaultColor,
		defaultColors,
		value,
		onChange,
		label,
		alpha = false,
		slug,
		hideLabelFromVision = false,
	} = props;

	useEffect( () => {
		setColor( value );
	}, [ value ] );

	/**
	 * Return a color based on passed alpha value.
	 *
	 * @param {string} colorValue   hex, rgb, rgba, or CSS var.
	 * @param {number} opacityValue The opacity (from 0 - 1).
	 * @return {string} The color in hex, rgba, or CSS var format.
	 */
	const getColor = ( colorValue, opacityValue = 1 ) => {
		// Test for CSS var values in color value.
		if ( colorValue.indexOf( 'var(' ) === 0 ) {
			return colorValue;
		}

		// Test for RGB at the beginning, and return hex if found.
		if ( colorValue.indexOf( 'rgb' ) === 0 ) {
			return rgb2hex( colorValue ).hex;
		}

		if ( alpha ) {
			return hexToRgba( colorValue, opacityValue );
		}

		return colorValue;
	};

	// Retrieve colors while avoiding duplicates.
	const getDefaultColors = () => {
		const existingColors = [];
		const newColors = [];
		defaultColors.forEach( ( maybeNewColor, index ) => {
			if ( ! existingColors.includes( maybeNewColor.color ) ) {
				existingColors.push( maybeNewColor.color );
				newColors.push( maybeNewColor );
			}
		} );
		return newColors;
	};

	const opacityIcon = (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={ 24 }
			height={ 24 }
			viewBox="0 0 488.47 488.47"
		>
			<path d="M244.235 0S61.058 174.454 61.058 314.016c0 96.347 82.011 174.454 183.177 174.454s183.177-78.107 183.177-174.454C427.412 174.454 244.235 0 244.235 0zm0 91.588c46.976 52.953 97.174 123.655 114.946 183.177H129.292c17.771-59.522 67.968-130.223 114.943-183.177z" />
		</svg>
	);

	/**
	 * Toggle whether the color popup is showing.
	 */
	const toggleVisible = () => {
		setIsVisible( true );
	};

	/**
	 * Close color popup if visible.
	 */
	const toggleClose = () => {
		if ( isVisible ) {
			setIsVisible( false );
		}
	};

	return (
		<BaseControl className="photo-block-component-color-picker-wrapper">
			{ ( !! label && ! hideLabelFromVision ) && (
				<h3 className="photo-block-color-component-label">
					<span>{ label }</span>
				</h3>
			) }
			<div className="photo-block-component-color-picker">
				<div className="photo-block-color-picker-area photo-block-component-color-picker-palette">
					{ ! isVisible && (
						<>
							<div
								className={ classnames(
									'components-color-palette__item-wrapper components-circular-option-picker__option-wrapper photo-block-color-picker-area photo-block-component-color-picker-palette',

									value ? '' : 'components-color-palette__custom-color'
								) }
							>
								<Tooltip text={ __( 'Choose Color', 'photo-block' ) }>
									<button
										type="button"
										aria-expanded={ isVisible }
										className="components-button components-circular-option-picker__option is-pressed"
										onClick={ toggleVisible }
										aria-label={ __(
											'Custom color picker',
											'photo-block'
										) }
										style={ {
											background: getColor( color, opacity ),
										} }
									>
										<span className="components-color-palette__custom-color-gradient" />
									</button>
								</Tooltip>
							</div>
						</>
					) }

					{ isVisible && (
						<div
							className={ classnames(
								'components-color-palette__item-wrapper components-circular-option-picker__option-wrapper photo-block-color-picker-area photo-block-component-color-picker-palette',

								value ? '' : 'components-color-palette__custom-color'
							) }
						>
							<Tooltip text={ __( 'Choose Color', 'photo-block' ) }>
								<button
									type="button"
									aria-expanded={ isVisible }
									className="components-button components-circular-option-picker__option is-pressed"
									onClick={ toggleClose }
									aria-label={ __(
										'Custom color picker',
										'photo-block'
									) }
									style={ {
										background: getColor( color, opacity ),
									} }
								>
									<span className="components-color-palette__custom-color-gradient" />
								</button>
							</Tooltip>
						</div>
					) }

					{ isVisible && (
						<Popover
							className="photo-block-component-color-picker"
							onClose={ toggleClose }
							noArrow={ false }
						>
							<BaseControl key={ colorKey }>
								<ColorPicker
									key={ colorKey }
									color={ color }
									onChangeComplete={ ( newColor ) => {
										const maybeNewColor = getColor( newColor.hex, opacity );
										setColor( maybeNewColor );
										setColorKey( maybeNewColor );
										onChange( slug, maybeNewColor );
									} }
									disableAlpha
									defaultValue={ defaultColor }
								/>
							</BaseControl>

							{ alpha && (
								<div className="photo-block-component-color-opacity">
									<Tooltip text={ __( 'Opacity', 'photo-block' ) }>
										{ opacityIcon }
									</Tooltip>

									<RangeControl
										value={ opacity ? opacity : 1 }
										onChange={ ( opacityValue ) => {
											const newColor = getColor( color, opacityValue );
											setOpacity( opacityValue );
											setColor( newColor );
											setColorKey( newColor );
											onChange( slug, getColor( color, opacityValue ) );
										} }
										min={ 0 }
										max={ 1 }
										step={ 0.01 }
										initialPosition={ 1 }
									/>
								</div>
							) }
							<BaseControl className="photo-block-component-color-picker-palette">
								<ColorPalette
									colors={ getDefaultColors() }
									value={ color }
									onChange={ ( newColor ) => {
										const maybeNewColor = getColor( newColor );
										onChange( slug, maybeNewColor );
										setColor( maybeNewColor );
										setColorKey( maybeNewColor );
									} }
									disableCustomColors={ true }
									clearable={ false }
								/>
							</BaseControl>
							<div className="components-color-clear-color">
								<Button
									onClick={ () => {
										onChange( slug, defaultColor );
										setColorKey( defaultColor );
										setColor( defaultColor );
									} }
								>
									{ __( 'Clear Color', 'photo-block' ) }
								</Button>
							</div>
						</Popover>
					) }
				</div>
			</div>
		</BaseControl>
	);
};

export default ColorPickerControl;
