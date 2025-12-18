import './editor.scss';

import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import {
	Button,
	BaseControl,
	TextControl,
	SelectControl,
	RangeControl,
} from '@wordpress/components';
import { Link, Unlink } from 'lucide-react';
import classnames from 'classnames';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import useDeviceType from '../../hooks/useDeviceType';
import HeadingIconResponsive from '../HeadingIconResponsive';
import {
	getHierarchicalValueUnit,
	geHierarchicalPlaceholderValue,
} from '../../utils/TypographyHelper';
import useUnits from '../../hooks/useUnits';

const DimensionsResponsiveControl = ( props ) => {
	const {
		label,
		onValuesChange,
		values,
		labelTop,
		labelRight,
		labelBottom,
		labelLeft,
		labelAll,
		isBorderRadius = false,
		allowNegatives = false,
	} = props;
	const [ deviceType, setScreenSize ] = useState( props.screenSize );
	const {
		onUnitChange,
		splitValues,
		getNumericValue,
		getUnitValue,
		startsWithNumber,
	} = useUnits();

	const units = props?.units
		? props.units
		: [
			{ label: 'PX', value: 'px' },
			{ label: '%', value: '%' },
			{ label: 'EM', value: 'em' },
			{ label: 'REM', value: 'rem' },
			{ label: 'VW', value: 'vw' },
		];

	const getDefaultValues = ( newProps ) => {
		return {
			mobile: {
				top: newProps.values.mobile.top,
				right: newProps.values.mobile.right,
				bottom: newProps.values.mobile.bottom,
				left: newProps.values.mobile.left,
				topUnit: newProps.values.mobile.topUnit,
				rightUnit: newProps.values.mobile.rightUnit,
				bottomUnit: newProps.values.mobile.bottomUnit,
				leftUnit: newProps.values.mobile.leftUnit,
				unitSync: newProps.values.mobile.unitSync,
			},
			tablet: {
				top: newProps.values.tablet.top,
				right: newProps.values.tablet.right,
				bottom: newProps.values.tablet.bottom,
				left: newProps.values.tablet.left,
				topUnit: newProps.values.tablet.topUnit,
				rightUnit: newProps.values.tablet.rightUnit,
				bottomUnit: newProps.values.tablet.bottomUnit,
				leftUnit: newProps.values.tablet.leftUnit,
				unitSync: newProps.values.tablet.unitSync,
			},
			desktop: {
				top: newProps.values.desktop.top,
				right: newProps.values.desktop.right,
				bottom: newProps.values.desktop.bottom,
				left: newProps.values.desktop.left,
				topUnit: newProps.values.desktop.topUnit,
				rightUnit: newProps.values.desktop.rightUnit,
				bottomUnit: newProps.values.desktop.bottomUnit,
				leftUnit: newProps.values.desktop.leftUnit,
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
			props.screenSize.toLowerCase(),
			newDefaultValues[ props.screenSize.toLowerCase() ],
			{
				shouldDirty: false,
			}
		);
	}, [ props.screenSize ] );

	/**
	 * Change the all values in parent.
	 *
	 * @param {number} value Value to change to.
	 */
	const changeAllValues = ( value ) => {
		if ( startsWithNumber( value ) ) {
			const newValuesSplit = splitValues( value );
			const numericValue = parseFloat( getNumericValue( newValuesSplit ) );
			const unitValue = getUnitValue( newValuesSplit );
			const oldValues = getValues( deviceType );
			oldValues.top = numericValue;
			oldValues.right = numericValue;
			oldValues.bottom = numericValue;
			oldValues.left = numericValue;
			oldValues.topUnit = unitValue;
			oldValues.rightUnit = unitValue;
			oldValues.bottomUnit = unitValue;
			oldValues.leftUnit = unitValue;
			setValue( deviceType, oldValues );
			syncUnits( getHierarchicalValueUnit( props.values, deviceType, unitValue, 'top' ) );
		} else {
			const oldValues = getValues( deviceType );
			oldValues.top = value;
			oldValues.right = value;
			oldValues.bottom = value;
			oldValues.left = value;
			setValue( deviceType, oldValues );
			syncUnits( getHierarchicalValueUnit( props.values, deviceType, value, 'top' ) );
		}
	};

	/**
	 * Sync all unit values at once.
	 *
	 * @param {string} newUnit The new unit value.
	 */
	const syncUnits = ( newUnit ) => {
		// Toggle unit sync value.
		const currentValues = getValues( deviceType );
		currentValues.topUnit = newUnit;
		currentValues.rightUnit = newUnit;
		currentValues.bottomUnit = newUnit;
		currentValues.leftUnit = newUnit;
		setValue( deviceType, currentValues, { shouldDirty: true } );
	};

	const onDimensionChange = ( value ) => {
		changeAllValues( value );
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
			formValues[ deviceType ].unitSync,
			'unitSync'
		);
		return sync;
	};

	/**
	 * Get the min unit for a given unit.
	 *
	 * @param {string} unitVar The unit to get the min value for.
	 *
	 * @return {number} The min value for the current unit.
	 */
	const getRangeControlMin = ( unitVar ) => {
		if ( ! allowNegatives ) {
			return 0;
		}

		// Get current unit.
		const unit = getHierarchicalValueUnit(
			props.values,
			deviceType,
			getValues( deviceType )[ unitVar ],
			unitVar
		);

		// Get the max value for the current unit.
		let min = -100;
		switch ( unit ) {
			case 'px':
				min = -1000;
				break;
			case '%':
				min = -100;
				break;
			case 'em':
				min = -10;
				break;
			case 'rem':
				min = -10;
				break;
			case 'vw':
				min = -100;
				break;
			default:
				min = -100;
				break;
		}
		return min;
	};

	/**
	 * Get the max unit for a given unit.
	 *
	 * @param {string} unitVar The unit to get the max value for.
	 *
	 * @return {number} The max value for the current unit.
	 */
	const getRangeControlMax = ( unitVar ) => {
		// Get current unit.
		const unit = getHierarchicalValueUnit(
			props.values,
			deviceType,
			getValues( deviceType )[ unitVar ],
			unitVar
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
	 *
	 * @return {number} The max value for the current unit.
	 */
	const getRangeControlStep = ( unitVar ) => {
		// Get current unit.
		const unit = getHierarchicalValueUnit(
			props.values,
			deviceType,
			getValues( deviceType )[ unitVar ],
			unitVar
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

	const getSyncInterface = () => {
		if ( ! isSync() ) {
			return null;
		}
		return (
			<div
				className={ classnames(
					'dlx-photo-block__dimensions-responsive-sync-interface',
					{
						'is-border-radius': isBorderRadius,
					}
				) }
			>
				<div className="dlx-photo-block__dimensions-responsive-sync-interface-unit">
					<Controller
						name={ `${ deviceType }.top` }
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<TextControl
								__next40pxDefaultSize={ true }
								label={ labelAll }
								className="dlx-photo-block__dimensions-responsive-sync-interface-input"
								value={ value }
								placeholder={ geHierarchicalPlaceholderValue(
									values,
									deviceType,
									value,
									'top'
								) }
								type="text"
								onChange={ ( newValue ) => {
									onDimensionChange( newValue );
									onUnitChange( newValue, onChange, setValue, deviceType, 'topUnit' );
								} }
								hideLabelFromVision={ true }
								autoComplete="off"
							/>
						) }
					/>
					<Controller
						name={ `${ deviceType }.topUnit` }
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<SelectControl
								className="dlx-photo-block__dimensions-responsive-sync-interface-select"
								label={ __( 'Unit', 'photo-block' ) }
								value={ getHierarchicalValueUnit(
									props.values,
									deviceType,
									getValues( `${ deviceType }.topUnit` ),
									'topUnit'
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
				<div className="dlx-photo-block__dimensions-responsive-sync-interface-range-sync">
					<Controller
						name={ `${ deviceType }.top` }
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<RangeControl
								className="dlx-photo-block__dimensions-responsive-sync-interface-range"
								label={ labelAll }
								value={ Number(
									geHierarchicalPlaceholderValue(
										values,
										deviceType,
										'' !== value ? value : 0,
										'top'
									)
								) }
								min={ allowNegatives ? getRangeControlMin( 'topUnit' ) : 0 }
								max={ getRangeControlMax( 'topUnit' ) }
								step={ getRangeControlStep( 'topUnit' ) }
								onChange={ ( newValue ) => {
									onChange( newValue );
									onDimensionChange( newValue + getHierarchicalValueUnit( props.values, deviceType, getValues( `${ deviceType }.topUnit` ), 'topUnit' ) );
								} }
								withInputField={ false }
								hideLabelFromVision={ true }
							/>
						) }
					/>
					<Button
						variant="secondary"
						className="dlx-photo-block__dimensions-responsive-sync-interface-button"
						onClick={ () => {
							// Disable syncing.
							const oldValues = getValues( deviceType );
							oldValues.unitSync = false;
							setValue( deviceType, oldValues, { shouldDirty: false } );
							syncUnits(
								getHierarchicalValueUnit(
									props.values,
									deviceType,
									getValues( `${ deviceType }.topUnit` ),
									'topUnit'
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
			<div
				className={ classnames(
					'dlx-photo-block__dimensions-responsive-manual-interface',
					{
						'is-border-radius': isBorderRadius,
					}
				) }
			>
				<div className="dlx-photo-block__dimensions-responsive-manual-interface-item dlx-photo-block__dimensions-responsive-manual-interface-item-top">
					<Controller
						name={ `${ deviceType }.top` }
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<TextControl
								__next40pxDefaultSize={ true }
								label={ labelTop }
								className="dlx-photo-block__dimensions-responsive-sync-interface-input"
								value={ value }
								placeholder={ geHierarchicalPlaceholderValue(
									values,
									deviceType,
									value,
									'top'
								) }
								type="text"
								min={ 0 }
								step={ 1 }
								max="Infinity"
								onChange={ ( newValue ) => {
									onUnitChange( newValue, onChange, setValue, deviceType, 'topUnit' );
								} }
								hideLabelFromVision={ true }
								autoComplete="off"
							/>
						) }
					/>
					{
						'' !== getHierarchicalValueUnit(
							props.values,
							deviceType,
							getValues( `${ deviceType }.topUnit` ),
							'topUnit'
						) && (
							<Controller
								name={ `${ deviceType }.topUnit` }
								control={ control }
								render={ ( { field: { onChange, value } } ) => (
									<SelectControl
										className="dlx-photo-block__dimensions-responsive-sync-interface-select"
										label={ __( 'Unit', 'photo-block' ) }
										value={ getHierarchicalValueUnit(
											props.values,
											deviceType,
											value,
											'topUnit'
										) }
										options={ units }
										onChange={ ( newValue ) => {
											onChange( newValue );
										} }
										hideLabelFromVision={ true }
									/>
								) }
							/>
						)
					}
				</div>
				<div className="dlx-photo-block__dimensions-responsive-manual-interface-item dlx-photo-block__dimensions-responsive-manual-interface-item-right">
					<Controller
						name={ `${ deviceType }.right` }
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<TextControl
								__next40pxDefaultSize={ true }
								label={ labelRight }
								className="dlx-photo-block__dimensions-responsive-sync-interface-input"
								value={ value }
								placeholder={ geHierarchicalPlaceholderValue(
									values,
									deviceType,
									value,
									'right'
								) }
								type="text"
								min={ 0 }
								step={ 1 }
								max="Infinity"
								onChange={ ( newValue ) => {
									onUnitChange( newValue, onChange, setValue, deviceType, 'rightUnit' );
								} }
								hideLabelFromVision={ true }
								autoComplete="off"
							/>
						) }
					/>
					{
						'' !== getHierarchicalValueUnit(
							props.values,
							deviceType,
							getValues( `${ deviceType }.rightUnit` ),
							'rightUnit'
						) && (
							<Controller
								name={ `${ deviceType }.rightUnit` }
								control={ control }
								render={ ( { field: { onChange, value } } ) => (
									<SelectControl
										className="dlx-photo-block__dimensions-responsive-sync-interface-select"
										label={ __( 'Unit', 'photo-block' ) }
										value={ getHierarchicalValueUnit(
											props.values,
											deviceType,
											value,
											'rightUnit'
										) }
										options={ units }
										onChange={ ( newValue ) => {
											onChange( newValue );
										} }
										hideLabelFromVision={ true }
									/>
								) }
							/>
						)
					}
				</div>
				<div className="dlx-photo-block__dimensions-responsive-manual-interface-item dlx-photo-block__dimensions-responsive-manual-interface-item-bottom">
					<Controller
						name={ `${ deviceType }.bottom` }
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<TextControl
								__next40pxDefaultSize={ true }
								label={ labelBottom }
								className="dlx-photo-block__dimensions-responsive-sync-interface-input"
								value={ value }
								placeholder={ geHierarchicalPlaceholderValue(
									values,
									deviceType,
									value,
									'bottom'
								) }
								type="text"
								min={ 0 }
								step={ 1 }
								max="Infinity"
								onChange={ ( newValue ) => {
									onUnitChange( newValue, onChange, setValue, deviceType, 'bottomUnit' );
								} }
								hideLabelFromVision={ true }
								autoComplete="off"
							/>
						) }
					/>
					{
						'' !== getHierarchicalValueUnit(
							props.values,
							deviceType,
							getValues( `${ deviceType }.bottomUnit` ),
							'bottomUnit'
						) && (
							<Controller
								name={ `${ deviceType }.bottomUnit` }
								control={ control }
								render={ ( { field: { onChange, value } } ) => (
									<SelectControl
										className="dlx-photo-block__dimensions-responsive-sync-interface-select"
										label={ __( 'Unit', 'photo-block' ) }
										value={ getHierarchicalValueUnit(
											props.values,
											deviceType,
											value,
											'bottomUnit'
										) }
										options={ units }
										onChange={ ( newValue ) => {
											onChange( newValue );
										} }
										hideLabelFromVision={ true }
									/>
								) }
							/>
						)
					}
				</div>
				<div className="dlx-photo-block__dimensions-responsive-manual-interface-item dlx-photo-block__dimensions-responsive-manual-interface-item-left">
					<Controller
						name={ `${ deviceType }.left` }
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<TextControl
								__next40pxDefaultSize={ true }
								label={ labelLeft }
								className="dlx-photo-block__dimensions-responsive-sync-interface-input"
								value={ value }
								placeholder={ geHierarchicalPlaceholderValue(
									values,
									deviceType,
									value,
									'left'
								) }
								type="text"
								min={ 0 }
								step={ 1 }
								max="Infinity"
								onChange={ ( newValue ) => {
									onUnitChange( newValue, onChange, setValue, deviceType, 'leftUnit' );
								} }
								hideLabelFromVision={ true }
								autoComplete="off"
							/>
						) }
					/>
					{
						'' !== getHierarchicalValueUnit(
							props.values,
							deviceType,
							getValues( `${ deviceType }.leftUnit` ),
							'leftUnit'
						) && (
							<Controller
								name={ `${ deviceType }.leftUnit` }
								control={ control }
								render={ ( { field: { onChange, value } } ) => (
									<SelectControl
										className="dlx-photo-block__dimensions-responsive-sync-interface-select"
										label={ __( 'Unit', 'photo-block' ) }
										value={ getHierarchicalValueUnit(
											props.values,
											deviceType,
											value,
											'leftUnit'
										) }
										options={ units }
										onChange={ ( newValue ) => {
											onChange( newValue );
										} }
										hideLabelFromVision={ true }
									/>
								) }
							/>
						)
					}
				</div>
				<Button
					variant="secondary"
					className="dlx-photo-block__dimensions-responsive-sync-manual-button"
					onClick={ () => {
						const oldValues = getValues( deviceType );
						oldValues.unitSync = true;
						setValue( deviceType, oldValues, { shouldDirty: false } );
					} }
					isPressed={ false }
					icon={ <Link /> }
					label={ __( 'Edit all values together', 'photo-block' ) }
				/>
			</div>
		);
	};

	return (
		<>
			<BaseControl className="dlx-photo-block__dimensions-responsive">
				<HeadingIconResponsive heading={ label } screenSize={ deviceType } />
				{ getSyncInterface() }
				{ getManualInterface() }
			</BaseControl>
		</>
	);
};
export default DimensionsResponsiveControl;
