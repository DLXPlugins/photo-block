/**
 * Upload data row including Upload|Media Library|URL|Data.
 */
import './editor.scss';

import {
	TextControl,
	BaseControl,
} from '@wordpress/components';

import { useState, useEffect, useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';

import { geHierarchicalPlaceholderValue } from '../../utils/TypographyHelper';
import HeadingIconResponsive from '../HeadingIconResponsive';
import { getAspectRatio, aspectRatioRegex } from '../../utils/AspectRatioHelper';

const AspectRatioResponsiveControl = ( props ) => {
	const [ screenSize, setScreenSize ] = useState( 'desktop' );
	const aspectRatioRef = useRef( null );
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
					pattern={ aspectRatioRegex }
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
								const aspectRatio = getAspectRatio( newValue );
								if ( aspectRatio || '' === aspectRatio ) {
									onChange( aspectRatio );
								} else {
									setError( screenSize, {
										message: __( 'Invalid aspect ratio', 'photo-block' ),
									} );
									aspectRatioRef.current.focus();
									onChange( '' );
								}
							} }
							className="dlx-photo-block__max-width-responsive-control__input"
							placeholder={ geHierarchicalPlaceholderValue(
								props.values,
								screenSize,
								getValues( screenSize )
							) }
							ref={ ( ref ) => {
								aspectRatioRef.current = ref;
							} }
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

