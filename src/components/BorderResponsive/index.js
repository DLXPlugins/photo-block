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
import { useForm, Controller, useWatch } from 'react-hook-form';

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
	const [ deviceType ] = useDeviceType( 'Desktop' );
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
			{ label: '%', value: '%' },
			{ label: 'EM', value: 'em' },
			{ label: 'REM', value: 'rem' },
		  ];

	const getDefaultValues = () => {
		return {
			mobile: {
				top: {
					width: props.values.mobile.top.width,
					unit: props.values.mobile.top.unit,
					color: props.values.mobile.top.color,
					borderStyle: props.values.mobile.top.borderStyle,
				},
				right: {
					width: props.values.mobile.right.width,
					unit: props.values.mobile.right.unit,
					color: props.values.mobile.right.color,
					borderStyle: props.values.mobile.right.borderStyle,
				},
				bottom: {
					width: props.values.mobile.bottom.width,
					unit: props.values.mobile.bottom.unit,
					color: props.values.mobile.bottom.color,
					borderStyle: props.values.mobile.bottom.borderStyle,
				},
				left: {
					width: props.values.mobile.left.width,
					unit: props.values.mobile.left.unit,
					color: props.values.mobile.left.color,
					borderStyle: props.values.mobile.left.borderStyle,
				},
				unitSync: props.values.mobile.unitSync,
			},
			tablet: {
				top: {
					width: props.values.tablet.top.width,
					unit: props.values.tablet.top.unit,
					color: props.values.tablet.top.color,
					borderStyle: props.values.tablet.top.borderStyle,
				},
				right: {
					width: props.values.tablet.right.width,
					unit: props.values.tablet.right.unit,
					color: props.values.tablet.right.color,
					borderStyle: props.values.tablet.right.borderStyle,
				},
				bottom: {
					width: props.values.tablet.bottom.width,
					unit: props.values.tablet.bottom.unit,
					color: props.values.tablet.bottom.color,
					borderStyle: props.values.tablet.bottom.borderStyle,
				},
				left: {
					width: props.values.tablet.left.width,
					unit: props.values.tablet.left.unit,
					color: props.values.tablet.left.color,
					borderStyle: props.values.tablet.left.borderStyle,
				},
				unitSync: props.values.tablet.unitSync,
			},
			desktop: {
				top: {
					width: props.values.desktop.top.width,
					unit: props.values.desktop.top.unit,
					color: props.values.desktop.top.color,
					borderStyle: props.values.desktop.top.borderStyle,
				},
				right: {
					width: props.values.desktop.right.width,
					unit: props.values.desktop.right.unit,
					color: props.values.desktop.right.color,
					borderStyle: props.values.desktop.right.borderStyle,
				},
				bottom: {
					width: props.values.desktop.bottom.width,
					unit: props.values.desktop.bottom.unit,
					color: props.values.desktop.bottom.color,
					borderStyle: props.values.desktop.bottom.borderStyle,
				},
				left: {
					width: props.values.desktop.left.width,
					unit: props.values.desktop.left.unit,
					color: props.values.desktop.left.color,
					borderStyle: props.values.desktop.left.borderStyle,
				},
				unitSync: props.values.desktop.unitSync,
			},
		};
	};

	const { control, setValue, getValues } = useForm( {
		defaultValues: getDefaultValues(),
	} );

	const formValues = useWatch( { control } );

	useEffect( () => {
		onValuesChange( formValues );
	}, [ formValues ] );

	/**
	 * Change the all values in parent.
	 *
	 * @param {number} value Value to change to.
	 * @param {string} key   The key to change.
	 */
	const changeAllValues = ( value, key ) => {
		const oldValues = getValues( deviceType );
		oldValues.top[ key ] = value;
		oldValues.right[ key ] = value;
		oldValues.bottom[ key ] = value;
		oldValues.left[ key ] = value;
		setValue( deviceType, oldValues );
	};

	/**
	 * Sync all unit values at once.
	 *
	 * @param {string} newUnit The new unit value.
	 */
	const syncUnits = ( newUnit ) => {
		// Toggle unit sync value.
		const currentValues = getValues( deviceType );
		currentValues.top.unit = newUnit;
		currentValues.right.unit = newUnit;
		currentValues.bottom.unit = newUnit;
		currentValues.left.unit = newUnit;
		setValue( deviceType, currentValues );
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
						render={ ( { field: { onChange, value } } ) => (
							<ColorPickerControl
								value={ geHierarchicalPlaceholderValue(
									values,
									deviceType,
									value,
									'top',
									'color'
								) }
								onChange={ ( slug, newValue ) => {
									onChange( newValue );
									onDimensionChange( newValue, 'color' );
								} }
								label={ __( 'Border Color', 'photo-block' ) }
								defaultColors={ photoBlock.palette }
								defaultColor={ '#FFFFFF' }
								slug={ 'border-color-sync' }
								hideLabelFromVision={ true }
							/>
						) }
					/>
					<Button
						className="dlx-photo-block__border-responsive-sync-interface-border-style"
						hideLabelFromVision={ true }
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
								type="number"
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
									onDimensionChange( newValue, 'width' );
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
							setValue( deviceType, oldValues );
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
								render={ ( { field: { onChange, value } } ) => (
									<ColorPickerControl
										value={ geHierarchicalPlaceholderValue(
											values,
											deviceType,
											value,
											'top',
											'color'
										) }
										onChange={ ( slug, newValue ) => {
											onChange( newValue );
										} }
										label={ __( 'Border Color', 'photo-block' ) }
										defaultColors={ photoBlock.palette }
										defaultColor={ '#000000' }
										slug={ 'border-color-top' }
										hideLabelFromVision={ true }
									/>
								) }
							/>
							<Button
								className="dlx-photo-block__border-responsive-sync-interface-border-style"
								hideLabelFromVision={ true }
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
										type="number"
										min={ 0 }
										onChange={ ( newValue ) => {
											onChange( newValue );
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
										value={ geHierarchicalPlaceholderValue(
											values,
											deviceType,
											value,
											'right',
											'color'
										) }
										onChange={ ( slug, newValue ) => {
											onChange( newValue );
										} }
										label={ __( 'Border Color', 'photo-block' ) }
										defaultColors={ photoBlock.palette }
										defaultColor={ '#000000' }
										slug={ 'border-color-right' }
										hideLabelFromVision={ true }
									/>
								) }
							/>
							<Button
								className="dlx-photo-block__border-responsive-sync-interface-border-style"
								hideLabelFromVision={ true }
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
										type="number"
										min={ 0 }
										onChange={ ( newValue ) => {
											onChange( newValue );
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
										value={ geHierarchicalPlaceholderValue(
											values,
											deviceType,
											value,
											'bottom',
											'color'
										) }
										onChange={ ( slug, newValue ) => {
											onChange( newValue );
										} }
										label={ __( 'Border Color', 'photo-block' ) }
										defaultColors={ photoBlock.palette }
										defaultColor={ '#000000' }
										slug={ 'border-color-bottom' }
										hideLabelFromVision={ true }
									/>
								) }
							/>
							<Button
								className="dlx-photo-block__border-responsive-sync-interface-border-style"
								hideLabelFromVision={ true }
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
										type="number"
										min={ 0 }
										step={ 1 }
										max="Infinity"
										onChange={ ( newValue ) => {
											onChange( newValue );
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
										value={ geHierarchicalPlaceholderValue(
											values,
											deviceType,
											value,
											'left',
											'color'
										) }
										onChange={ ( slug, newValue ) => {
											onChange( newValue );
										} }
										label={ __( 'Border Color', 'photo-block' ) }
										defaultColors={ photoBlock.palette }
										defaultColor={ '#000000' }
										slug={ 'border-color-left' }
										hideLabelFromVision={ true }
									/>
								) }
							/>
							<Button
								className="dlx-photo-block__border-responsive-sync-interface-border-style"
								hideLabelFromVision={ true }
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
										type="number"
										min={ 0 }
										step={ 1 }
										max="Infinity"
										onChange={ ( newValue ) => {
											onChange( newValue );
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
								setValue( deviceType, oldValues );
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
