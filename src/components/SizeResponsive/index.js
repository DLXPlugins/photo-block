/**
 * Upload data row including Upload|Media Library|URL|Data.
 */
import './editor.scss';

import {
	PanelBody,
	PanelRow,
	TextControl,
	TextareaControl,
	ButtonGroup,
	Button,
	ToggleControl,
	Toolbar,
	ToolbarButton,
	Popover,
	Tooltip,
	PlaceHolder,
	BaseControl,
	RangeControl,
} from '@wordpress/components';

import { isURL, filterURLForDisplay } from '@wordpress/url';

import {
	Monitor,
	Tablet,
	Smartphone,

} from 'lucide-react';

import { useContext, useState, useEffect, useRef } from '@wordpress/element';

import { __ } from '@wordpress/i18n';
import classnames from 'classnames';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';


import UnitPicker from '../UnitPicker';
import { getHierarchicalValueUnit, geHierarchicalPlaceholderValue } from '../../utils/TypographyHelper';
import HeadingIconResponsive from '../HeadingIconResponsive';
import useUnits from '../../hooks/useUnits';

const SizeResponsiveControl = ( props ) => {
	const [ screenSize, setScreenSize ] = useState( 'desktop' );
	const getDefaultValues = ( newProps ) => {
		return {
			mobile: {
				width: newProps.values.mobile.width,
				unit: newProps.values.mobile.unit,
			},
			tablet: {
				width: newProps.values.tablet.width,
				unit: newProps.values.tablet.unit,
			},
			desktop: {
				width: newProps.values.desktop.width,
				unit: newProps.values.desktop.unit,
			},
		};
	};

	const {
		startsWithNumber,
		splitValues,
		getNumericValue,
		getUnitValue,
	} = useUnits();

	const { control, setValue, getValues, reset } = useForm( {
		defaultValues: getDefaultValues( props ),
	} );

	const { isDirty } = useFormState( { control } );

	const formValues = useWatch( { control } );

	const {
		onValuesChange,
	} = props;

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
					name={ `${ screenSize }.width` }
					render={ ( { field: { onChange, value } } ) => (
						<TextControl
							__next40pxDefaultSize={ true }
							__nextHasNoMarginBottom={ true }
							type={ 'text' }
							value={ getValues( screenSize ).width }
							onChange={ ( newValue ) => {
								if ( ! startsWithNumber( newValue ) ) {
									// Unit should be blank here.
									setValue( `${ screenSize }.unit`, '' );
									onChange( newValue );
								} else {
									const newValuesSplit = splitValues( newValue );
									const numericValue = getNumericValue( newValuesSplit );
									const unitValue = getUnitValue( newValuesSplit );
									setValue( `${ screenSize }.unit`, unitValue );
									onChange( numericValue );
								}
							} }
							placeholder={ geHierarchicalPlaceholderValue(
								props.values,
								screenSize,
								getValues( screenSize ).width,
								'width'
							) }
						/>
					) }
				/>
			</BaseControl>
		</>
	);
};

export default SizeResponsiveControl;

