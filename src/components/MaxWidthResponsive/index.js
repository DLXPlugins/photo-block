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


import UploaderContext from '../../contexts/UploaderContext';
import ColorPickerControl from '../ColorPicker';
import UnitPicker from '../UnitPicker';
import { getHierarchicalValueUnit, geHierarchicalPlaceholderValue } from '../../utils/TypographyHelper';
import HeadingIconResponsive from '../HeadingIconResponsive';
const MaxWidthResponsiveControl = ( props ) => {
	const [ screenSize, setScreenSize ] = useState( 'desktop' );
	const getDefaultValues = () => {
		return {
			mobile: {
				width: props.values.mobile.width,
				unit: props.values.mobile.unit,
			},
			tablet: {
				width: props.values.tablet.width,
				unit: props.values.tablet.unit,
			},
			desktop: {
				width: props.values.desktop.width,
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
					heading={ __( 'Max Width', 'photo-block' ) }
				/>
				<Controller
					control={ control }
					name={ `${ screenSize }.unit` }
					render={ ( { field: { onChange, value } } ) => (
						<UnitPicker
							value={ getHierarchicalValueUnit( props.values, screenSize, getValues( screenSize ).unit, 'unit' ) }
							units={ [ 'px', 'em', 'rem', '%', 'vw' ] }
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
							type={ 'number' }
							value={ getValues( screenSize ).width }
							onChange={ ( newValue ) => {
								onChange( newValue );
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

export default MaxWidthResponsiveControl;

