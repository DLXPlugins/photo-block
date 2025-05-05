/**
 * Gradient Picker
 */
import './editor.scss';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';

import {
	BaseControl,
	Popover,
	Button,
	GradientPicker,
} from '@wordpress/components';

const GradientPickerControl = ( props ) => {
	const [ isVisible, setIsVisible ] = useState( false );
	const [ isToggled, setIsToggled ] = useState( false );
	const [ gradientPickerButtonAnchor, setGradientPickerButtonAnchor ] = useState( null );

	const {
		label,
		onChange,
		value,
		clearable,
	} = props;

	/**
	 * Get a gradient style object.
	 *
	 * @return {Object} Gradient style object.
	 */
	const getGradientStyles = () => {
		const hexRegex = /#?[0-9A-Fa-f]{6}/gm; // From: https://linuxhint.com/check-if-string-is-hex-in-javascript/
		if ( '' === value ) {
			return {
				background: '#FFFFFF',
			};
		}
		if ( value.match( hexRegex ) ) {
			return {
				backgroundColor: value,
			};
		}
		// Return gradient style value.
		return {
			backgroundImage: value,
		};
	};

	/**
	 * Close color popup if visible.
	 */
	const toggleClose = () => {
		setIsToggled( true );
		setIsVisible( ! isVisible );
		setTimeout( () => {
			setIsToggled( false );
		}, 500 );
	};

	return (
		<BaseControl className="photo-block-component-gradient-picker-wrapper">
			<h3>{ label }</h3>
			<Button
				className="photo-block-component-gradient-picker"
				label={ __( 'Open Gradient Picker', 'photo-block' ) }
				style={ getGradientStyles() }
				ref={ setGradientPickerButtonAnchor }
				onClick={ () => {
					if ( isToggled ) {
						setIsToggled( false );
					} else {
						setIsVisible( ! isVisible );
					}
				} }
			/>
			{ true === isVisible && (
				<Popover
					className="photo-block-component-gradient-picker-popover"
					noArrow={ false }
					anchor={ gradientPickerButtonAnchor }
					placement="left"
					offset={ 8 }
					onClose={ toggleClose }
				>
					<GradientPicker
						value={ value }
						onChange={ onChange }
						clearable={ clearable }
						gradients={ [] }
					/>
				</Popover>
			) }

		</BaseControl>
	);
};

GradientPickerControl.defaultProps = {
	label: __( 'Gradient Color', 'photo-block' ),
	clearable: false,
	value: '',
	onChange: () => {},
};

GradientPickerControl.propTypes = {
	clearable: PropTypes.bool,
	value: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};

export default GradientPickerControl;
