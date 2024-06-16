/**
 * Upload data row including Upload|Media Library|URL|Data.
 */
import './editor.scss';

import {
	BaseControl,
	RangeControl,
} from '@wordpress/components';

import { useState, useEffect } from '@wordpress/element';

import { __ } from '@wordpress/i18n';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';


import UnitPicker from '../UnitPicker';
import { getHierarchicalValueUnit, geHierarchicalPlaceholderValue } from '../../utils/TypographyHelper';
import HeadingIconResponsive from '../HeadingIconResponsive';
const RangeResponsiveControl = ( props ) => {
	const [ screenSize, setScreenSize ] = useState( 'desktop' );
	const getDefaultValues = () => {
		return {
			mobile: {
				value: props.values.mobile.value,
				unit: props.values.mobile.unit,
			},
			tablet: {
				value: props.values.tablet.value,
				unit: props.values.tablet.unit,
			},
			desktop: {
				value: props.values.desktop.value,
				unit: props.values.desktop.unit,
			},
		};
	};

	const { control, setValue, getValues } = useForm( {
		defaultValues: getDefaultValues(),
	} );

	const formValues = useWatch( { control } );

	const {
		onValuesChange,
	} = props;

	useEffect( () => {
		onValuesChange( formValues );
	}, [ formValues ] );

	useEffect( () => {
		setScreenSize( props.screenSize );
		setValue(
			props.screenSize,
			getValues( props.screenSize )
		);
	}, [ props.screenSize ] );

	return (
		<>
			<BaseControl className="dlx-photo-block__max-width-responsive-control">
				<HeadingIconResponsive
					screenSize={ screenSize }
					heading={ props.label }
				/>
				<Controller
					control={ control }
					name={ `${ screenSize }.unit` }
					render={ ( { field: { onChange, value } } ) => (
						<UnitPicker
							value={ getHierarchicalValueUnit( props.values, screenSize, getValues( screenSize ).unit, 'unit' ) }
							units={ props?.units ? props.units : [ 'px', 'em', 'rem', '%', 'vw' ] }
							onClick={ ( newValue ) => {
								onChange( newValue );
							} }
							className="dlx-photo-block__max-width-responsive-control__unit-picker"
						/>
					) }
				/>
				<Controller
					control={ control }
					name={ `${ screenSize }.value` }
					render={ ( { field: { onChange, value } } ) => (
						<RangeControl
							value={ parseInt( geHierarchicalPlaceholderValue( props.values, screenSize, getValues( screenSize ).value, 'value' ) || 0 ) }
							onChange={ ( newValue ) => {
								onChange( newValue );
							} }
							min={ props.min }
							max={ props.max }
							step={ props.step }
							className="dlx-photo-block__responsive-range-control"
							help={ props.help }
						/>
					) }
				/>
			</BaseControl>
		</>
	);
};

export default RangeResponsiveControl;

