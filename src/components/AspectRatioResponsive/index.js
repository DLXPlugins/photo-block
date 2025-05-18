/**
 * Upload data row including Upload|Media Library|URL|Data.
 */
import './editor.scss';

import {
	TextControl,
	BaseControl,
} from '@wordpress/components';

import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';

import { geHierarchicalPlaceholderValue } from '../../utils/TypographyHelper';
import HeadingIconResponsive from '../HeadingIconResponsive';

const AspectRatioResponsiveControl = ( props ) => {
	const [ screenSize, setScreenSize ] = useState( 'desktop' );
	const getDefaultValues = () => {
		return {
			mobile: props.values.mobile ?? '',
			tablet: props.values.tablet ?? '',
			desktop: props.values.desktop ?? '',
		};
	};


	const { control, setValue, getValues, setError, clearErrors } = useForm( {
		defaultValues: getDefaultValues(),
	} );

	const formValues = useWatch( { control } );

	const { errors } = useFormState( { control } );


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
					name={ `${ screenSize }` }
					pattern={ /^(\d+)\s?(?:\/|:)\s?(\d+)$/ }
					render={ ( { field: { onChange, value } } ) => (
						<TextControl
							type={ 'text' }
							value={ value }
							onChange={ ( newValue ) => {
								clearErrors( screenSize );
								onChange( newValue );
							} }
							onBlur={ () => {
								const newValue = getValues( screenSize );
								// Get into n / n format.
								const regex = /^(\d+)\s?(?:\/|:)\s?(\d+)$/;
								const match = newValue.match( regex );
								if ( match ) {
									onChange( `${ match[ 1 ] } / ${ match[ 2 ] }` );
								} else {
									setError( screenSize, {
										message: __( 'Invalid aspect ratio', 'photo-block' ),
									} );
									onChange( '' );
								}
							} }
							placeholder={ geHierarchicalPlaceholderValue(
								props.values,
								screenSize,
								getValues( screenSize )
							) }
						/>
					) }
				/>
				{ errors[ screenSize ] && (
					<p className="dlx-photo-block__max-width-responsive-control__error">
						{ errors[ screenSize ].message }
					</p>
				) }
			</BaseControl>
		</>
	);
};

export default AspectRatioResponsiveControl;

