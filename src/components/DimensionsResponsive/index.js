import './editor.scss';

import {
	Monitor,
	Tablet,
	Smartphone,
	Link,

} from 'lucide-react';
import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import { ButtonGroup, Button, BaseControl, TextControl, SelectControl, RangeControl } from '@wordpress/components';
import classnames from 'classnames';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';

import useDeviceType from '../../hooks/useDeviceType';
import HeadingIconResponsive from '../HeadingIconResponsive';
import { getHierarchicalValueUnit, geHierarchicalPlaceholderValue } from '../../utils/TypographyHelper';

const DimensionsResponsive = ( props ) => {
	const { label, onValuesChange, values, labelTop, labelRight, labelBottom, labelLeft, labelAll } = props;
	const [ deviceType, setDeviceType ] = useDeviceType( 'Desktop' );
	const units = props?.units ? props.units : [
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
				unit: props.values.mobile.unit,
				unitSync: props.values.mobile.unitSync,
			},
			tablet: {
				top: props.values.tablet.top,
				right: props.values.tablet.right,
				bottom: props.values.tablet.bottom,
				left: props.values.tablet.left,
				unit: props.values.tablet.unit,
				unitSync: props.values.tablet.unitSync,
			},
			desktop: {
				top: props.values.desktop.top,
				right: props.values.desktop.right,
				bottom: props.values.desktop.bottom,
				left: props.values.desktop.left,
				unit: props.values.desktop.unit,
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
		const oldValues = getValues( deviceType );
		oldValues.top = value;
		oldValues.right = value;
		oldValues.bottom = value;
		oldValues.left = value;
		setValue( deviceType, oldValues );
	};

	/**
	 * When the sync value is selected, sync all values to the maximum number.
	 */
	const syncUnits = () => {
		// Toggle unit sync value.
		const currentValues = getValues( deviceType );
		currentValues.unitSync = ! currentValues.unitSync;
		setValue( deviceType, currentValues );

		// If we're syncing, set all values to the maximum.
		if ( currentValues.unitSync ) {
			const numbers = [
				getValues( deviceType ).top,
				getValues( deviceType ).right,
				getValues( deviceType ).bottom,
				getValues( deviceType ).left,
			];
			const syncValue = Math.max.apply( null, numbers );
			changeAllValues( syncValue );
		}
	};

	/**
	 * Change the units.
	 *
	 * @param {string} value Unit changing (px, em, rem, vh).
	 */
	const onChangeUnits = ( value ) => {
		const currentValues = getValues( deviceType );
		currentValues.unit = value;
		setValue( deviceType, currentValues );
	};

	const onDimensionChange = ( value ) => {
		if (
			geHierarchicalPlaceholderValue(
				props.values,
				deviceType,
				getValues( deviceType ).unitSync,
				'unitSync'
			)
		) {
			changeAllValues( value );
		}
	};

	/**
	 * Get the sync value for the current device type.
	 *
	 * @return {boolean} The sync value.
	 */
	const isSync = () => {
		const sync = geHierarchicalPlaceholderValue( values, deviceType, '', 'unitSync' );
		return sync;
	};

	/**
	 * Get the max unit for a given unit.
	 *
	 * @return {number} The max value for the current unit.
	 */
	const getRangeControlMax = () => {
		// Get current unit.
		const unit = geHierarchicalPlaceholderValue( values, deviceType, '', 'unit' );

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
	 * @return {number} The max value for the current unit.
	 */
	const getRangeControlStep = () => {
		// Get current unit.
		const unit = geHierarchicalPlaceholderValue( values, deviceType, '', 'unit' );

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

	console.log( geHierarchicalPlaceholderValue( values, deviceType, 10, 'top' ) );

	const getSyncInterface = () => {
		if ( ! isSync() ) {
			//return null;
		}
		return (
			<div className="dlx-photo-block__dimensions-responsive-sync-interface">
				<div className="dlx-photo-block__dimensions-responsive-sync-interface-unit">
					<Controller
						name={ `${ deviceType }.top` }
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<TextControl

								label={ labelAll }
								className="dlx-photo-block__dimensions-responsive-sync-interface-input"
								value={ value }
								placeholder={ geHierarchicalPlaceholderValue( values, deviceType, value, 'top' ) }
								type="number"
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
						name={ `${ deviceType }.unit` }
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<SelectControl
								className="dlx-photo-block__dimensions-responsive-sync-interface-select"
								label={ __( 'Unit', 'photo-block' ) }
								value={ getHierarchicalValueUnit(
									props.values,
									deviceType,
									getValues( deviceType ).unit,
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
				<div className="dlx-photo-block__dimensions-responsive-sync-interface-range-sync">
					<Controller
						name={ `${ deviceType }.top` }
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<RangeControl
								className="dlx-photo-block__dimensions-responsive-sync-interface-range"
								label={ labelAll }
								value={ Number( geHierarchicalPlaceholderValue( values, deviceType, value, 'top' ) ) }
								min={ 0 }
								max={ getRangeControlMax() }
								step={ getRangeControlStep() }
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
						variant="primary"
						className="dlx-photo-block__dimensions-responsive-sync-interface-button"
						onClick={ () => {
						// Disable syncing.
							setValue( `${ deviceType }.unitSync`, false );
						} }
						isPressed={ true }
					>
						{ __( 'Sync', 'photo-block' ) }
					</Button>
				</div>

			</div>
		);
	};

	return (
		<>
			<BaseControl
				className="dlx-photo-block__dimensions-responsive"
			>
				<HeadingIconResponsive heading={ label } screenSize={ deviceType } />
				{ getSyncInterface() }
			</BaseControl>

		</>
	);
};
export default DimensionsResponsive;
