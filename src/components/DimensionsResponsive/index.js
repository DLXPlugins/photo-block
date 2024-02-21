import './editor.scss';

import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import {
	Button,
	BaseControl,
	TextControl,
	SelectControl,
	RangeControl,
} from '@wordpress/components';
import { Link, Unlink } from 'lucide-react';
import classnames from 'classnames';
import { useForm, Controller, useWatch } from 'react-hook-form';

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
	const [ deviceType ] = useDeviceType( 'Desktop' );
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

	const getDefaultValues = () => {
		return {
			mobile: {
				top: props.values.mobile.top,
				right: props.values.mobile.right,
				bottom: props.values.mobile.bottom,
				left: props.values.mobile.left,
				topUnit: props.values.mobile.topUnit,
				rightUnit: props.values.mobile.rightUnit,
				bottomUnit: props.values.mobile.bottomUnit,
				leftUnit: props.values.mobile.leftUnit,
				unitSync: props.values.mobile.unitSync,
			},
			tablet: {
				top: props.values.tablet.top,
				right: props.values.tablet.right,
				bottom: props.values.tablet.bottom,
				left: props.values.tablet.left,
				topUnit: props.values.tablet.topUnit,
				rightUnit: props.values.tablet.rightUnit,
				bottomUnit: props.values.tablet.bottomUnit,
				leftUnit: props.values.tablet.leftUnit,
				unitSync: props.values.tablet.unitSync,
			},
			desktop: {
				top: props.values.desktop.top,
				right: props.values.desktop.right,
				bottom: props.values.desktop.bottom,
				left: props.values.desktop.left,
				topUnit: props.values.desktop.topUnit,
				rightUnit: props.values.desktop.rightUnit,
				bottomUnit: props.values.desktop.bottomUnit,
				leftUnit: props.values.desktop.leftUnit,
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
	 */
	const changeAllValues = ( value ) => {
		if ( startsWithNumber( value ) ) {
			const newValuesSplit = splitValues( value );
			const numericValue = getNumericValue( newValuesSplit );
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
		setValue( deviceType, currentValues );
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
			getValues( deviceType ).unitSync,
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
								min={ 0 }
								step={ 1 }
								max="Infinity"
								onChange={ ( newValue ) => {
									onChange( newValue );
									onDimensionChange( newValue );
								} }
								hideLabelFromVision={ true }
								inputMode="numeric"
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
										value,
										'top'
									)
								) }
								min={ getRangeControlMin( 'topUnit' ) }
								max={ getRangeControlMax( 'topUnit' ) }
								step={ getRangeControlStep( 'topUnit' ) }
								onChange={ ( newValue ) => {
									onChange( newValue );
									onDimensionChange( newValue );
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
							setValue( deviceType, oldValues );
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
								inputMode="numeric"
								autoComplete="off"
							/>
						) }
					/>
					{
						getValues( `${ deviceType }.topUnit` ) && (
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
								inputMode="numeric"
								autoComplete="off"
							/>
						) }
					/>
					{
						getValues( `${ deviceType }.rightUnit` ) && (
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
								inputMode="numeric"
								autoComplete="off"
							/>
						) }
					/>
					{
						getValues( `${ deviceType }.bottomUnit` ) && (
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
								inputMode="numeric"
								autoComplete="off"
							/>
						) }
					/>
					{
						getValues( `${ deviceType }.leftUnit` ) && (
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
						setValue( deviceType, oldValues );
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
