import './editor.scss';

import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import {
	Button,
	ButtonGroup,
	BaseControl,
	TextControl,
	SelectControl,
	RangeControl,
	Popover,
} from '@wordpress/components';
import { Link, Unlink } from 'lucide-react';
import classnames from 'classnames';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';

import useDeviceType from '../../hooks/useDeviceType';
import HeadingIconResponsive from '../HeadingIconResponsive';
import ColorPickerControl from '../ColorPicker';
import {
	getHierarchicalValueUnit,
	geHierarchicalPlaceholderValue,
} from '../../utils/TypographyHelper';
import BorderStyleSolidIcon from '../Icons/BorderStyleSolid';
import BorderStyleDashedIcon from '../Icons/BorderStyleDashed';
import BorderStyleDottedIcon from '../Icons/BorderStyleDotted';
import BorderStyleDoubleIcon from '../Icons/BorderStyleDouble';
import useUnits from '../../hooks/useUnits';

import rgb2hex from 'rgb2hex';

const isRgba = ( color ) => {
	return color.startsWith( 'rgba' );
};

const BorderResponsiveControl = ( props ) => {
	const {
		label,
		onValuesChange,
		values,
		labelTop,
		labelRight,
		labelBottom,
		labelLeft,
		labelAll,
	} = props;
	const [ deviceType, setScreenSize ] = useState( props.screenSize );

	const {
		onUnitChange,
		splitValues,
		getNumericValue,
		getUnitValue,
		startsWithNumber,
	} = useUnits();

	const [ showBorderStylePopoverSync, setShowBorderStylePopoverSync ] =
		useState( false );
	const [ showBorderStylePopoverTop, setShowBorderStylePopoverTop ] =
		useState( false );
	const [ showBorderStylePopoverRight, setShowBorderStylePopoverRight ] =
		useState( false );
	const [ showBorderStylePopoverBottom, setShowBorderStylePopoverBottom ] =
		useState( false );
	const [ showBorderStylePopoverLeft, setShowBorderStylePopoverLeft ] =
		useState( false );
	const [ borderStyleSyncButtonRef, setBorderSyncStyleButtonRef ] = useState();
	const [ borderStyleTopButtonRef, setBorderStyleTopButtonRef ] = useState();
	const [ borderStyleRightButtonRef, setBorderStyleRightButtonRef ] = useState();
	const [ borderStyleBottomButtonRef, setBorderStyleBottomButtonRef ] =
		useState();
	const [ borderStyleLeftButtonRef, setBorderStyleLeftButtonRef ] = useState();

	const units = props?.units
		? props.units
		: [
			{ label: 'PX', value: 'px' },
			{ label: 'EM', value: 'em' },
			{ label: 'REM', value: 'rem' },
		];

	const getColor = ( colorValue ) => {
		if ( ! colorValue ) {
			return '';
		}
		if ( isRgba( colorValue ) ) {
			const hexParams = rgb2hex( colorValue );
			return hexParams.hex;
		}
		return colorValue;
	};

	const getDefaultValues = ( newProps ) => {
		return {
			mobile: {
				top: {
					width: newProps.values.mobile.top.width,
					unit: newProps.values.mobile.top.unit,
					opacity: newProps.values.mobile.top.opacity,
					color: getColor( newProps.values.mobile.top.color ),
					borderStyle: newProps.values.mobile.top.borderStyle,
				},
				right: {
					width: newProps.values.mobile.right.width,
					unit: newProps.values.mobile.right.unit,
					opacity: newProps.values.mobile.right.opacity,
					color: getColor( newProps.values.mobile.right.color ),
					borderStyle: newProps.values.mobile.right.borderStyle,
				},
				bottom: {
					width: newProps.values.mobile.bottom.width,
					unit: newProps.values.mobile.bottom.unit,
					opacity: newProps.values.mobile.bottom.opacity,
					color: getColor( newProps.values.mobile.bottom.color ),
					borderStyle: newProps.values.mobile.bottom.borderStyle,
				},
				left: {
					width: newProps.values.mobile.left.width,
					unit: newProps.values.mobile.left.unit,
					opacity: newProps.values.mobile.left.opacity,
					color: getColor( newProps.values.mobile.left.color ),
					borderStyle: newProps.values.mobile.left.borderStyle,
				},
				unitSync: newProps.values.mobile.unitSync,
			},
			tablet: {
				top: {
					width: newProps.values.tablet.top.width,
					unit: newProps.values.tablet.top.unit,
					opacity: newProps.values.tablet.top.opacity,
					color: getColor( newProps.values.tablet.top.color ),
					borderStyle: newProps.values.tablet.top.borderStyle,
				},
				right: {
					width: newProps.values.tablet.right.width,
					unit: newProps.values.tablet.right.unit,
					opacity: newProps.values.tablet.right.opacity,
					color: getColor( newProps.values.tablet.right.color ),
					borderStyle: newProps.values.tablet.right.borderStyle,
				},
				bottom: {
					width: newProps.values.tablet.bottom.width,
					unit: newProps.values.tablet.bottom.unit,
					opacity: newProps.values.tablet.bottom.opacity,
					color: getColor( newProps.values.tablet.bottom.color ),
					borderStyle: newProps.values.tablet.bottom.borderStyle,
				},
				left: {
					width: newProps.values.tablet.left.width,
					unit: newProps.values.tablet.left.unit,
					opacity: newProps.values.tablet.left.opacity,
					color: getColor( newProps.values.tablet.left.color ),
					borderStyle: newProps.values.tablet.left.borderStyle,
				},
				unitSync: newProps.values.tablet.unitSync,
			},
			desktop: {
				top: {
					width: newProps.values.desktop.top.width,
					unit: newProps.values.desktop.top.unit,
					opacity: newProps.values.desktop.top.opacity,
					color: getColor( newProps.values.desktop.top.color ),
					borderStyle: newProps.values.desktop.top.borderStyle,
				},
				right: {
					width: newProps.values.desktop.right.width,
					unit: newProps.values.desktop.right.unit,
					opacity: newProps.values.desktop.right.opacity,
					color: getColor( newProps.values.desktop.right.color ),
					borderStyle: newProps.values.desktop.right.borderStyle,
				},
				bottom: {
					width: newProps.values.desktop.bottom.width,
					unit: newProps.values.desktop.bottom.unit,
					opacity: newProps.values.desktop.bottom.opacity,
					color: getColor( newProps.values.desktop.bottom.color ),
					borderStyle: newProps.values.desktop.bottom.borderStyle,
				},
				left: {
					width: newProps.values.desktop.left.width,
					unit: newProps.values.desktop.left.unit,
					opacity: newProps.values.desktop.left.opacity,
					color: getColor( newProps.values.desktop.left.color ),
					borderStyle: newProps.values.desktop.left.borderStyle,
				},
				unitSync: newProps.values.desktop.unitSync,
			},
		};
	};

	const { control, setValue, getValues, reset } = useForm( {
		defaultValues: getDefaultValues( props ),
	} );

	const formValues = useWatch( { control } );

	const { isDirty } = useFormState( { control } );

	useEffect( () => {
		if ( isDirty ) {
			onValuesChange( formValues );
			reset( formValues, {
				keepDirty: false,
			} );
		}
	}, [ formValues ] );

	useEffect( () => {
		setScreenSize( props.screenSize );
		const newDefaultValues = getDefaultValues( props );
		setValue(
			props.screenSize,
			newDefaultValues[ props.screenSize ],
			{
				shouldDirty: false,
			}
		);
	}, [ props.screenSize ] );

	/**
	 * Change the all values in parent.
	 *
	 * @param {number} value Value to change to.
	 * @param {string} key   The key to change.
	 */
	const changeAllValues = ( value, key ) => {
		if ( 'color' === key ) {
			const oldValues = getValues( deviceType );
			oldValues.top[ key ] = value;
			oldValues.right[ key ] = value;
			oldValues.bottom[ key ] = value;
			oldValues.left[ key ] = value;
			setValue( deviceType, oldValues );
			return;
		}
		if ( startsWithNumber( value ) ) {
			const newValuesSplit = splitValues( value );
			const numericValue = getNumericValue( newValuesSplit );
			const unitValue = getUnitValue( newValuesSplit );
			const oldValues = getValues( deviceType );
			oldValues.top[ key ] = numericValue;
			oldValues.right[ key ] = numericValue;
			oldValues.bottom[ key ] = numericValue;
			oldValues.left[ key ] = numericValue;
			setValue( deviceType, oldValues );
			syncUnits( unitValue );
		} else {
			const oldValues = getValues( deviceType );
			oldValues.top[ key ] = value;
			oldValues.right[ key ] = value;
			oldValues.bottom[ key ] = value;
			oldValues.left[ key ] = value;
			setValue( deviceType, oldValues );
			syncUnits( getHierarchicalValueUnit( props.values, deviceType, oldValues.top.unit, 'top', 'unit' ) );
		}
	};

	/**
	 * When someone hits the sync button, we need to sync the values.
	 */
	const syncValues = () => {
		const currentValues = getValues( deviceType );

		// Get the top value.
		const topValues = currentValues.top;

		// Set the values.
		setValue( `${ deviceType }.top`, topValues, { shouldDirty: true } );
		setValue( `${ deviceType }.right`, topValues, { shouldDirty: true } );
		setValue( `${ deviceType }.bottom`, topValues, { shouldDirty: true } );
		setValue( `${ deviceType }.left`, topValues, { shouldDirty: true } );
	};

	/**
	 * Sync all unit values at once.
	 *
	 * @param {string} newUnit The new unit value.
	 */
	const syncUnits = ( newUnit ) => {
		if ( newUnit?.unit ) {
			newUnit = newUnit.unit;
		}
		// Toggle unit sync value.
		const currentValues = getValues( deviceType );
		currentValues.top.unit = newUnit;
		currentValues.right.unit = newUnit;
		currentValues.bottom.unit = newUnit;
		currentValues.left.unit = newUnit;
		setValue( deviceType, currentValues, { shouldDirty: true } );
	};

	/**
	 * Change the unit for a given key.
	 *
	 * @param {string} value The new unit value.
	 * @param {string} key   The key to change.
	 *
	 * @return {void}
	 */
	const onDimensionChange = ( value, key ) => {
		changeAllValues( value, key );
	};

	/**
	 * Get the sync value for the current device type.
	 *
	 * @return {boolean} The sync value.
	 */
	const isSync = () => {
		const sync = geHierarchicalPlaceholderValue(
			values,
			deviceType,
			getValues( deviceType ).unitSync,
			'unitSync'
		);
		return sync;
	};

	/**
	 * Get the max unit for a given unit.
	 *
	 * @param {string} unitVar The unit to get the max value for.
	 * @param {string} subUnit The sub unit to get the max value for.
	 *
	 * @return {number} The max value for the current unit.
	 */
	const getRangeControlMax = ( unitVar, subUnit = '' ) => {
		// Get current unit.
		const unit = getHierarchicalValueUnit(
			props.values,
			deviceType,
			getValues( deviceType )[ unitVar ][ subUnit ],
			unitVar,
			subUnit
		);

		// Get the max value for the current unit.
		let max = 100;
		switch ( unit ) {
			case 'px':
				max = 1000;
				break;
			case '%':
				max = 100;
				break;
			case 'em':
				max = 10;
				break;
			case 'rem':
				max = 10;
				break;
			case 'vw':
				max = 100;
				break;
			default:
				max = 100;
				break;
		}
		return max;
	};

	/**
	 * Get the range control step for a given unit.
	 *
	 * @param {string} unitVar The unit variable to get the step for.
	 * @param {string} subUnit The sub unit to get the step for.
	 *
	 * @return {number} The max value for the current unit.
	 */
	const getRangeControlStep = ( unitVar, subUnit = '' ) => {
		// Get current unit.
		const unit = getHierarchicalValueUnit(
			props.values,
			deviceType,
			getValues( deviceType )[ unitVar ][ subUnit ],
			unitVar,
			subUnit
		);

		// Get the max value for the current unit.
		let step = 1;

		switch ( unit ) {
			case 'px':
				step = 1;
				break;
			case '%':
				step = 1;
				break;
			case 'em':
				step = 0.1;
				break;
			case 'rem':
				step = 0.1;
				break;
			case 'vw':
				step = 1;
				break;
			default:
				step = 1;
				break;
		}
		return step;
	};

	/**
	 * Get the border style being used (solid, dashed, dotted, double).
	 *
	 * @param {string} unitVar Var used to check relative to device type (typically top, left, right, bottom).
	 * @return {string} border style (solid, dashed, dotted, double).
	 */
	const getBorderStyle = ( unitVar ) => {
		// Get current unit.
		const borderStyle = getHierarchicalValueUnit(
			props.values,
			deviceType,
			getValues( deviceType )[ unitVar ].borderStyle,
			unitVar,
			'borderStyle'
		);
		return borderStyle;
	};

	/**
	 * Get the border icon for the border style being used (solid, dashed, dotted, double).
	 *
	 * @param {string} unitVar Var used to check relative to device type (typically top, left, right, bottom).
	 *
	 * @return {Element} The border icon.
	 */
	const getBorderStyleIcon = ( unitVar ) => {
		switch ( getBorderStyle( unitVar ) ) {
			case 'dashed':
				return BorderStyleDashedIcon;
			case 'dotted':
				return BorderStyleDottedIcon;
			case 'double':
				return BorderStyleDoubleIcon;
			default:
				return BorderStyleSolidIcon;
		}
	};

	/**
	 * Get the button group used for choosing border style.
	 *
	 * @param {string}   unitVar          The unit variable to get the button group for.
	 * @param {Function} setPopoverClosed Reference to closing the popover.
	 * @return { Element } button group
	 */
	const getPopoverButtonGroup = ( unitVar, setPopoverClosed ) => {
		return (
			<div className="dlx-photo-block__border-responsive-sync-interface-border-style-popover">
				<BaseControl>
					<h3>{ __( 'Border Style', 'photo-block' ) }</h3>
					<ButtonGroup className="dlx-photo-block__border-responsive-sync-interface-border-style-popover-buttons">
						<Controller
							name={ `${ deviceType }.${ unitVar }.borderStyle` }
							control={ control }
							render={ ( { field: { onChange, value } } ) => (
								<>
									<Button
										icon={ BorderStyleSolidIcon }
										label={ __( 'Solid', 'photo-block' ) }
										onClick={ () => {
											onChange( 'solid' );
											setValue( `${ deviceType }.${ unitVar }.borderStyle`, 'solid', { shouldDirty: true } );
											setPopoverClosed( true );
										} }
										isPressed={ 'solid' === getBorderStyle( unitVar ) }
									>
										{ __( 'Solid', 'photo-block' ) }
									</Button>
									<Button
										icon={ BorderStyleDashedIcon }
										label={ __( 'Dashed', 'photo-block' ) }
										isPressed={ 'dashed' === getBorderStyle( unitVar ) }
										onClick={ () => {
											onChange( 'dashed' );
											setValue( `${ deviceType }.${ unitVar }.borderStyle`, 'dashed', { shouldDirty: true } );
											setPopoverClosed( true );
										} }
									>
										{ __( 'Dashed', 'photo-block' ) }
									</Button>
									<Button
										icon={ BorderStyleDottedIcon }
										label={ __( 'Dotted', 'photo-block' ) }
										isPressed={ 'dotted' === getBorderStyle( unitVar ) }
										onClick={ () => {
											onChange( 'dotted' );
											setValue( `${ deviceType }.${ unitVar }.borderStyle`, 'dotted', { shouldDirty: true } );
											setPopoverClosed( true );
										} }
									>
										{ __( 'Dotted', 'photo-block' ) }
									</Button>
									<Button
										icon={ BorderStyleDoubleIcon }
										label={ __( 'Double', 'photo-block' ) }
										isPressed={ 'double' === getBorderStyle( unitVar ) }
										onClick={ () => {
											onChange( 'double' );
											setValue( `${ deviceType }.${ unitVar }.borderStyle`, 'double', { shouldDirty: true } );
											setPopoverClosed( true );
										} }
									>
										{ __( 'Double', 'photo-block' ) }
									</Button>
								</>
							) }
						/>
					</ButtonGroup>
				</BaseControl>
			</div>
		);
	};

	/**
	 * Get the opacity value.
	 *
	 * @param {string} value The value to get the opacity for.
	 * @return {number} The opacity value.
	 */
	const getOpacity = ( value ) => {
		let opacity = geHierarchicalPlaceholderValue(
			values,
			deviceType,
			value,
			'top',
			'opacity'
		);
		if ( typeof opacity === 'undefined' ) {
			opacity = 1;
		} else {
			opacity = parseFloat( opacity );
		}
		return opacity;
	};
	const getSyncInterface = () => {
		if ( ! isSync() ) {
			return null;
		}
		return (
			<div
				className={ classnames(
					'dlx-photo-block__border-responsive-sync-interface'
				) }
			>
				<div className="dlx-photo-block__border-responsive-sync-interface-unit">
					<Controller
						name={ `${ deviceType }.top.color` }
						control={ control }
						render={ ( { field: { onChange, value } } ) => {
							return (
								<ColorPickerControl
									value={ getColor(
										geHierarchicalPlaceholderValue(
											values,
											deviceType,
											value,
											'top',
											'color'
										)
									) }
									opacity={ getOpacity( getValues( `${ deviceType }.top.opacity` ) ) }
									onChange={ ( slug, newValue ) => {
										onChange( newValue );
										onDimensionChange( newValue, 'color' );
									} }
									onOpacityChange={ ( newValue ) => {
										setValue( `${ deviceType }.top.opacity`, newValue );
										onDimensionChange( newValue, 'opacity' );
									} }
									label={ __( 'Border Color', 'photo-block' ) }
									defaultColors={ photoBlock.palette }
									defaultColor={ '#FFFFFF' }
									slug={ 'border-color-sync' }
									hideLabelFromVision={ true }
									alpha={ true }
								/>
							);
						} }
					/>
					<Button
						className="dlx-photo-block__border-responsive-sync-interface-border-style"
						label={ __( 'Border Style', 'photo-block' ) }
						icon={ getBorderStyleIcon( 'top' ) }
						onClick={ () => {
							setShowBorderStylePopoverSync( ! showBorderStylePopoverSync );
						} }
						ref={ setBorderSyncStyleButtonRef }
					/>
					{ showBorderStylePopoverSync && (
						<Popover
							position="bottom center"
							onClose={ () => {
								setShowBorderStylePopoverSync( false );
							} }
							anchorRef={ borderStyleSyncButtonRef }
							noArrow={ false }
						>
							<div className="dlx-photo-block__border-responsive-sync-interface-border-style-popover">
								<BaseControl>
									<h3>{ __( 'Border Style', 'photo-block' ) }</h3>
									<ButtonGroup className="dlx-photo-block__border-responsive-sync-interface-border-style-popover-buttons">
										<Controller
											name={ `${ deviceType }.top.borderStyle` }
											control={ control }
											render={ ( { field: { onChange, value } } ) => (
												<>
													<Button
														icon={ BorderStyleSolidIcon }
														label={ __( 'Solid', 'photo-block' ) }
														onClick={ () => {
															onChange( 'solid' );
															changeAllValues( 'solid', 'borderStyle' );

															// Close the popover.
															setShowBorderStylePopoverSync( false );
														} }
														isPressed={ 'solid' === getBorderStyle( 'top' ) }
													>
														{ __( 'Solid', 'photo-block' ) }
													</Button>
													<Button
														icon={ BorderStyleDashedIcon }
														label={ __( 'Dashed', 'photo-block' ) }
														isPressed={ 'dashed' === getBorderStyle( 'top' ) }
														onClick={ () => {
															onChange( 'dashed' );
															changeAllValues( 'dashed', 'borderStyle' );

															// Close the popover.
															setShowBorderStylePopoverSync( false );
														} }
													>
														{ __( 'Dashed', 'photo-block' ) }
													</Button>
													<Button
														icon={ BorderStyleDottedIcon }
														label={ __( 'Dotted', 'photo-block' ) }
														isPressed={ 'dotted' === getBorderStyle( 'top' ) }
														onClick={ () => {
															onChange( 'dotted' );
															changeAllValues( 'dotted', 'borderStyle' );

															// Close the popover.
															setShowBorderStylePopoverSync( false );
														} }
													>
														{ __( 'Dotted', 'photo-block' ) }
													</Button>
													<Button
														icon={ BorderStyleDoubleIcon }
														label={ __( 'Double', 'photo-block' ) }
														isPressed={ 'double' === getBorderStyle( 'top' ) }
														onClick={ () => {
															onChange( 'double' );
															changeAllValues( 'double', 'borderStyle' );

															// Close the popover.
															setShowBorderStylePopoverSync( false );
														} }
													>
														{ __( 'Double', 'photo-block' ) }
													</Button>
												</>
											) }
										/>
									</ButtonGroup>
								</BaseControl>
							</div>
						</Popover>
					) }
					<Controller
						name={ `${ deviceType }.top.width` }
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<TextControl
								__next40pxDefaultSize={ true }
								label={ labelAll }
								className="dlx-photo-block__border-responsive-sync-interface-input"
								value={ value }
								placeholder={ geHierarchicalPlaceholderValue(
									values,
									deviceType,
									getValues( `${ deviceType }.top.width` ),
									'top',
									'width'
								) }
								type="text"
								min={ 0 }
								step={ 1 }
								max="Infinity"
								onChange={ ( newValue ) => {
									onChange( newValue );
									onDimensionChange( newValue, 'width' );
								} }
								hideLabelFromVision={ true }
								inputMode="numeric"
								autoComplete="off"
							/>
						) }
					/>
					<Controller
						name={ `${ deviceType }.top.unit` }
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<SelectControl
								className="dlx-photo-block__border-responsive-sync-interface-select"
								label={ __( 'Unit', 'photo-block' ) }
								value={ getHierarchicalValueUnit(
									props.values,
									deviceType,
									getValues( `${ deviceType }.top.unit` ),
									'top',
									'unit'
								) }
								options={ units }
								onChange={ ( newValue ) => {
									onChange( newValue );
									syncUnits( newValue );
								} }
								hideLabelFromVision={ true }
							/>
						) }
					/>
				</div>
				<div className="dlx-photo-block__border-responsive-sync-interface-range-sync">
					<Controller
						name={ `${ deviceType }.top.width` }
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<RangeControl
								className="dlx-photo-block__border-responsive-sync-interface-range"
								label={ labelAll }
								value={ Number(
									geHierarchicalPlaceholderValue(
										values,
										deviceType,
										value,
										'top',
										'width'
									)
								) }
								min={ 0 }
								max={ getRangeControlMax( 'top', 'unit' ) }
								step={ getRangeControlStep( 'top', 'unit' ) }
								onChange={ ( newValue ) => {
									onChange( newValue );
									onDimensionChange( newValue + getHierarchicalValueUnit( props.values, deviceType, getValues( `${ deviceType }.top.unit` ), 'top', 'unit' ), 'width' );
								} }
								withInputField={ false }
								hideLabelFromVision={ true }
							/>
						) }
					/>
					<Button
						variant="secondary"
						className="dlx-photo-block__border-responsive-sync-interface-button"
						onClick={ () => {
							// Disable syncing.
							const oldValues = getValues( deviceType );
							oldValues.unitSync = false;
							setValue( deviceType, oldValues, { shouldDirty: false } );
							syncUnits(
								getHierarchicalValueUnit(
									props.values,
									deviceType,
									getValues( `${ deviceType }.top.unit` ),
									'top',
									'unit'
								)
							);
						} }
						label={ __( 'Modify all values separately.', 'photo-block' ) }
						icon={ <Unlink /> }
					/>
				</div>
			</div>
		);
	};

	/**
	 * Get the manual interface.
	 *
	 * @return {Element} The manual interface.
	 */
	const getManualInterface = () => {
		if ( isSync() ) {
			return null;
		}
		return (
			<>
				<div
					className={ classnames(
						'dlx-photo-block__border-responsive-manual-interface'
					) }
				>
					<>
						<div className="dlx-photo-block__border-responsive-manual-interface-item dlx-photo-block__border-responsive-manual-interface-item-top">
							<Controller
								name={ `${ deviceType }.top.color` }
								control={ control }
								render={ ( { field: { onChange, value } } ) => {
									return (
										<ColorPickerControl
											value={ getColor(
												geHierarchicalPlaceholderValue(
													values,
													deviceType,
													value,
													'top',
													'color'
												)
											) }
											opacity={ getOpacity( getValues( `${ deviceType }.top.opacity` ) ) }
											onOpacityChange={ ( newValue ) => {
												setValue( `${ deviceType }.top.opacity`, newValue );
												if ( isSync() ) {
													onDimensionChange( newValue, 'opacity' );
												}
											} }
											onChange={ ( slug, color ) => {
												onChange( color );
												if ( isSync() ) {
													onDimensionChange( color, 'color' );
												}
											} }
											label={ __( 'Border Color', 'photo-block' ) }
											defaultColors={ photoBlock.palette }
											defaultColor={ '#000000' }
											slug={ 'border-color-top' }
											hideLabelFromVision={ true }
											alpha={ true }
										/>
									);
								} }
							/>
							<Button
								className="dlx-photo-block__border-responsive-sync-interface-border-style"
								label={ __( 'Border Style', 'photo-block' ) }
								icon={ getBorderStyleIcon( 'top' ) }
								onClick={ () => {
									setShowBorderStylePopoverTop( ! showBorderStylePopoverTop );
								} }
								ref={ setBorderStyleTopButtonRef }
							/>
							{ showBorderStylePopoverTop && (
								<Popover
									position="bottom center"
									onClose={ () => {
										setShowBorderStylePopoverTop( false );
									} }
									anchorRef={ borderStyleTopButtonRef }
									noArrow={ false }
								>
									{ getPopoverButtonGroup( 'top', setShowBorderStylePopoverTop ) }
								</Popover>
							) }
							<Controller
								name={ `${ deviceType }.top.width` }
								control={ control }
								render={ ( { field: { onChange, value } } ) => (
									<TextControl
										__next40pxDefaultSize={ true }
										label={ labelTop }
										className="dlx-photo-block__border-responsive-sync-interface-input"
										value={ value }
										placeholder={ geHierarchicalPlaceholderValue(
											values,
											deviceType,
											value,
											'top',
											'width'
										) }
										type="text"
										min={ 0 }
										onChange={ ( newValue ) => {
											onUnitChange( newValue, onChange, setValue, deviceType, 'top.unit' );
										} }
										hideLabelFromVision={ true }
										inputMode="numeric"
										autoComplete="off"
									/>
								) }
							/>
							<Controller
								name={ `${ deviceType }.top.unit` }
								control={ control }
								render={ ( { field: { onChange, value } } ) => (
									<SelectControl
										className="dlx-photo-block__border-responsive-sync-interface-select"
										label={ __( 'Unit', 'photo-block' ) }
										value={ getHierarchicalValueUnit(
											props.values,
											deviceType,
											value,
											'top',
											'unit'
										) }
										options={ units }
										onChange={ ( newValue ) => {
											onChange( newValue );
										} }
										hideLabelFromVision={ true }
									/>
								) }
							/>
						</div>
						<div className="dlx-photo-block__border-responsive-manual-interface-item dlx-photo-block__border-responsive-manual-interface-item-right">
							<Controller
								name={ `${ deviceType }.right.color` }
								control={ control }
								render={ ( { field: { onChange, value } } ) => (
									<ColorPickerControl
										value={ getColor(
											geHierarchicalPlaceholderValue(
												values,
												deviceType,
												value,
												'right',
												'color'
											)
										) }
										opacity={ getOpacity( getValues( `${ deviceType }.right.opacity` ) ) }
										onChange={ ( slug, color ) => {
											onChange( color );
										} }
										onOpacityChange={ ( newValue ) => {
											setValue( `${ deviceType }.right.opacity`, newValue );
										} }
										label={ __( 'Border Color', 'photo-block' ) }
										defaultColors={ photoBlock.palette }
										defaultColor={ '#000000' }
										slug={ 'border-color-right' }
										hideLabelFromVision={ true }
										alpha={ true }
									/>
								) }
							/>
							<Button
								className="dlx-photo-block__border-responsive-sync-interface-border-style"
								label={ __( 'Border Style', 'photo-block' ) }
								icon={ getBorderStyleIcon( 'right' ) }
								onClick={ () => {
									setShowBorderStylePopoverRight( ! showBorderStylePopoverRight );
								} }
								ref={ setBorderStyleRightButtonRef }
							/>
							{ showBorderStylePopoverRight && (
								<Popover
									placement="left"
									onClose={ () => {
										setShowBorderStylePopoverRight( false );
									} }
									anchorRef={ borderStyleRightButtonRef }
									noArrow={ false }
								>
									{ getPopoverButtonGroup( 'right', setShowBorderStylePopoverRight ) }
								</Popover>
							) }
							<Controller
								name={ `${ deviceType }.right.width` }
								control={ control }
								render={ ( { field: { onChange, value } } ) => (
									<TextControl
										__next40pxDefaultSize={ true }
										label={ labelRight }
										className="dlx-photo-block__border-responsive-sync-interface-input"
										value={ value }
										placeholder={ geHierarchicalPlaceholderValue(
											values,
											deviceType,
											value,
											'right',
											'width'
										) }
										type="text"
										min={ 0 }
										onChange={ ( newValue ) => {
											onUnitChange( newValue, onChange, setValue, deviceType, 'right.unit' );
										} }
										hideLabelFromVision={ true }
										inputMode="numeric"
										autoComplete="off"
									/>
								) }
							/>
							<Controller
								name={ `${ deviceType }.right.unit` }
								control={ control }
								render={ ( { field: { onChange, value } } ) => (
									<SelectControl
										className="dlx-photo-block__border-responsive-sync-interface-select"
										label={ __( 'Unit', 'photo-block' ) }
										value={ getHierarchicalValueUnit(
											props.values,
											deviceType,
											value,
											'right',
											'unit'
										) }
										options={ units }
										onChange={ ( newValue ) => {
											onChange( newValue );
										} }
										hideLabelFromVision={ true }
									/>
								) }
							/>
						</div>
						<div className="dlx-photo-block__border-responsive-manual-interface-item dlx-photo-block__border-responsive-manual-interface-item-bottom">
							<Controller
								name={ `${ deviceType }.bottom.color` }
								control={ control }
								render={ ( { field: { onChange, value } } ) => (
									<ColorPickerControl
										value={ getColor(
											geHierarchicalPlaceholderValue(
												values,
												deviceType,
												value,
												'bottom',
												'color'
											)
										) }
										opacity={ getOpacity( getValues( `${ deviceType }.bottom.opacity` ) ) }
										onOpacityChange={ ( newValue ) => {
											setValue( `${ deviceType }.bottom.opacity`, newValue );
										} }
										onChange={ ( slug, color ) => {
											onChange( color );
										} }
										label={ __( 'Border Color', 'photo-block' ) }
										defaultColors={ photoBlock.palette }
										defaultColor={ '#000000' }
										slug={ 'border-color-bottom' }
										hideLabelFromVision={ true }
										alpha={ true }
									/>
								) }
							/>
							<Button
								className="dlx-photo-block__border-responsive-sync-interface-border-style"
								label={ __( 'Border Style', 'photo-block' ) }
								icon={ getBorderStyleIcon( 'bottom' ) }
								onClick={ () => {
									setShowBorderStylePopoverBottom( ! showBorderStylePopoverBottom );
								} }
								ref={ setBorderStyleBottomButtonRef }
							/>
							{ showBorderStylePopoverBottom && (
								<Popover
									position="bottom center"
									onClose={ () => {
										setShowBorderStylePopoverBottom( false );
									} }
									anchorRef={ borderStyleBottomButtonRef }
									noArrow={ false }
								>
									{ getPopoverButtonGroup( 'bottom', setShowBorderStylePopoverBottom ) }
								</Popover>
							) }
							<Controller
								name={ `${ deviceType }.bottom.width` }
								control={ control }
								render={ ( { field: { onChange, value } } ) => (
									<TextControl
										__next40pxDefaultSize={ true }
										label={ labelBottom }
										className="dlx-photo-block__border-responsive-sync-interface-input"
										value={ value }
										placeholder={ geHierarchicalPlaceholderValue(
											values,
											deviceType,
											value,
											'bottom',
											'width'
										) }
										type="text"
										min={ 0 }
										step={ 1 }
										max="Infinity"
										onChange={ ( newValue ) => {
											onUnitChange( newValue, onChange, setValue, deviceType, 'bottom.unit' );
										} }
										hideLabelFromVision={ true }
										inputMode="numeric"
										autoComplete="off"
									/>
								) }
							/>
							<Controller
								name={ `${ deviceType }.bottom.unit` }
								control={ control }
								render={ ( { field: { onChange, value } } ) => (
									<SelectControl
										className="dlx-photo-block__border-responsive-sync-interface-select"
										label={ __( 'Unit', 'photo-block' ) }
										value={ getHierarchicalValueUnit(
											props.values,
											deviceType,
											value,
											'bottom',
											'unit'
										) }
										options={ units }
										onChange={ ( newValue ) => {
											onChange( newValue );
										} }
										hideLabelFromVision={ true }
									/>
								) }
							/>
						</div>
						<div className="dlx-photo-block__border-responsive-manual-interface-item dlx-photo-block__border-responsive-manual-interface-item-left">
							<Controller
								name={ `${ deviceType }.left.color` }
								control={ control }
								render={ ( { field: { onChange, value } } ) => (
									<ColorPickerControl
										value={ getColor(
											geHierarchicalPlaceholderValue(
												values,
												deviceType,
												value,
												'left',
												'color'
											)
										) }
										opacity={ getOpacity( getValues( `${ deviceType }.left.opacity` ) ) }
										onOpacityChange={ ( newValue ) => {
											setValue( `${ deviceType }.left.opacity`, newValue );
										} }
										onChange={ ( slug, color ) => {
											onChange( color );
										} }
										label={ __( 'Border Color', 'photo-block' ) }
										defaultColors={ photoBlock.palette }
										defaultColor={ '#000000' }
										slug={ 'border-color-left' }
										hideLabelFromVision={ true }
										alpha={ true }
									/>
								) }
							/>
							<Button
								className="dlx-photo-block__border-responsive-sync-interface-border-style"
								label={ __( 'Border Style', 'photo-block' ) }
								icon={ getBorderStyleIcon( 'left' ) }
								onClick={ () => {
									setShowBorderStylePopoverLeft( ! showBorderStylePopoverLeft );
								} }
								ref={ setBorderStyleLeftButtonRef }
							/>
							{ showBorderStylePopoverLeft && (
								<Popover
									position="Left center"
									onClose={ () => {
										setShowBorderStylePopoverLeft( false );
									} }
									anchorRef={ borderStyleLeftButtonRef }
									noArrow={ false }
								>
									{ getPopoverButtonGroup( 'left', setShowBorderStylePopoverLeft ) }
								</Popover>
							) }
							<Controller
								name={ `${ deviceType }.left.width` }
								control={ control }
								render={ ( { field: { onChange, value } } ) => (
									<TextControl
										label={ labelLeft }
										className="dlx-photo-block__border-responsive-sync-interface-input"
										value={ value }
										placeholder={ geHierarchicalPlaceholderValue(
											values,
											deviceType,
											value,
											'left',
											'width'
										) }
										type="text"
										min={ 0 }
										step={ 1 }
										max="Infinity"
										onChange={ ( newValue ) => {
											onUnitChange( newValue, onChange, setValue, deviceType, 'left.unit' );
										} }
										hideLabelFromVision={ true }
										inputMode="numeric"
										autoComplete="off"
									/>
								) }
							/>
							<Controller
								name={ `${ deviceType }.left.unit` }
								control={ control }
								render={ ( { field: { onChange, value } } ) => (
									<SelectControl
										className="dlx-photo-block__border-responsive-sync-interface-select"
										label={ __( 'Unit', 'photo-block' ) }
										value={ getHierarchicalValueUnit(
											props.values,
											deviceType,
											value,
											'left',
											'unit'
										) }
										options={ units }
										onChange={ ( newValue ) => {
											onChange( newValue );
										} }
										hideLabelFromVision={ true }
									/>
								) }
							/>
						</div>
						<Button
							variant="secondary"
							className="dlx-photo-block__border-responsive-sync-manual-button"
							onClick={ () => {
								const oldValues = getValues( deviceType );
								oldValues.unitSync = true;
								setValue( deviceType, oldValues, { shouldDirty: false } );
								syncValues();
							} }
							isPressed={ false }
							icon={ <Link /> }
							label={ __( 'Edit all values together', 'photo-block' ) }
						/>
					</>
				</div>
			</>
		);
	};

	return (
		<>
			<BaseControl className="dlx-photo-block__border-responsive">
				<HeadingIconResponsive heading={ label } screenSize={ deviceType } />
				{ getSyncInterface() }
				{ getManualInterface() }
			</BaseControl>
		</>
	);
};
export default BorderResponsiveControl;
