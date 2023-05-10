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
import ColorPickerControl from '../ColorPicker';
import {
	getHierarchicalValueUnit,
	geHierarchicalPlaceholderValue,
} from '../../utils/TypographyHelper';

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
				},
				right: {
					width: props.values.mobile.right.width,
					unit: props.values.mobile.right.unit,
					color: props.values.mobile.right.color,
				},
				bottom: {
					width: props.values.mobile.bottom.width,
					unit: props.values.mobile.bottom.unit,
					color: props.values.mobile.bottom.color,
				},
				left: {
					width: props.values.mobile.left.width,
					unit: props.values.mobile.left.unit,
					color: props.values.mobile.left.color,
				},
				unitsSync: props.values.mobile.unitsSync,
			},
			tablet: {
				top: {
					width: props.values.tablet.top.width,
					unit: props.values.tablet.top.unit,
					color: props.values.tablet.top.color,
				},
				right: {
					width: props.values.tablet.right.width,
					unit: props.values.tablet.right.unit,
					color: props.values.tablet.right.color,
				},
				bottom: {
					width: props.values.tablet.bottom.width,
					unit: props.values.tablet.bottom.unit,
					color: props.values.tablet.bottom.color,
				},
				left: {
					width: props.values.tablet.left.width,
					unit: props.values.tablet.left.unit,
					color: props.values.tablet.left.color,
				},
				unitsSync: props.values.tablet.unitsSync,
			},
			desktop: {
				top: {
					width: props.values.desktop.top.width,
					unit: props.values.desktop.top.unit,
					color: props.values.desktop.top.color,
				},
				right: {
					width: props.values.desktop.right.width,
					unit: props.values.desktop.right.unit,
					color: props.values.desktop.right.color,
				},
				bottom: {
					width: props.values.desktop.bottom.width,
					unit: props.values.desktop.bottom.unit,
					color: props.values.desktop.bottom.color,
				},
				left: {
					width: props.values.desktop.left.width,
					unit: props.values.desktop.left.unit,
					color: props.values.desktop.left.color,
				},
				unitsSync: props.values.desktop.unitsSync,
			},
		};
	};

	const { control, setValue, getValues } = useForm( {
		defaultValues: getDefaultValues(),
	} );

	const formValues = useWatch( { control } );

	useEffect( () => {
		//onValuesChange( formValues );
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
					'dlx-photo-block__border-responsive-sync-interface'
				) }
			>
				<div className="dlx-photo-block__border-responsive-sync-interface-unit">
					<Controller
						name={ `${ deviceType }.top.color` }
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<ColorPickerControl
								value={ value }
								onChange={ ( slug, newValue ) => {
									onChange( newValue );
								} }
								label={ __( 'Border Color', 'photo-block' ) }
								defaultColors={ photoBlock.palette }
								defaultColor={ '#FFFFFF' }
								slug={ 'border-color-sync' }
							/>
						) }
					/>
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
									value,
									'top'
								) }
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
										'top'
									)
								) }
								min={ 0 }
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
									'top.unit'
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
					'dlx-photo-block__border-responsive-manual-interface',
				) }
			>
				<div className="dlx-photo-block__border-responsive-manual-interface-item dlx-photo-block__border-responsive-manual-interface-item-top">
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
									'top'
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
				</div>
				<div className="dlx-photo-block__border-responsive-manual-interface-item dlx-photo-block__border-responsive-manual-interface-item-right">
					<Controller
						name={ `${ deviceType }.right` }
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
									'right'
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
						name={ `${ deviceType }.rightUnit` }
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<SelectControl
								className="dlx-photo-block__border-responsive-sync-interface-select"
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
				</div>
				<div className="dlx-photo-block__border-responsive-manual-interface-item dlx-photo-block__border-responsive-manual-interface-item-bottom">
					<Controller
						name={ `${ deviceType }.bottom` }
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
									'bottom'
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
						name={ `${ deviceType }.bottomUnit` }
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<SelectControl
								className="dlx-photo-block__border-responsive-sync-interface-select"
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
				</div>
				<div className="dlx-photo-block__border-responsive-manual-interface-item dlx-photo-block__border-responsive-manual-interface-item-left">
					<Controller
						name={ `${ deviceType }.left` }
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
									'left'
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
						name={ `${ deviceType }.leftUnit` }
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<SelectControl
								className="dlx-photo-block__border-responsive-sync-interface-select"
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
			</div>
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
