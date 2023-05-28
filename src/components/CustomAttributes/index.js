/**
 * Add custom attributes repeater.
 */
import './editor.scss';

import {
	TextControl,
	Button,
	BaseControl,
} from '@wordpress/components';

import {
	X,

} from 'lucide-react';

import { useContext } from '@wordpress/element';

import { __ } from '@wordpress/i18n';

import UploaderContext from '../../contexts/UploaderContext';
/**
 * DropShadow component.
 *
 * @param {Object} props - Component props.
 * @return {Function} Component.
 */
const CustomAttributesControl = ( props ) => {
	const { attributes, setAttributes } = props;

	// Get context.
	const {
	} = useContext( UploaderContext );

	const { customAttributes } = attributes;

	/**
	 * Iterate through the custom attributes and show controls.
	 *
	 * @return {Function} Component.
	 */
	const showCustomAttributes = () => {
		const customAttributeOutput = customAttributes.map( ( attributeValues, index ) => {
			return (
				<div className="dlx-photo-block__custom-attributes-control__attribute" key={ index }>
					<TextControl
						label={ __( 'Name', 'photo-block' ) }
						value={ attributeValues.name }
						placeholder="data-"
						onChange={ ( value ) => {
							const newCustomAttributes = [ ...customAttributes ];
							newCustomAttributes[ index ].name = value;
							setAttributes( { customAttributes: newCustomAttributes } );
						} }
					/>
					<TextControl
						label={ __( 'Value', 'photo-block' ) }
						value={ attributeValues.value }
						onChange={ ( value ) => {
							const newCustomAttributes = [ ...customAttributes ];
							newCustomAttributes[ index ].value = value;
							setAttributes( { customAttributes: newCustomAttributes } );
						} }
					/>
					<Button
						variant="secondary"
						label={ __( 'Remove Attribute', 'photo-block' ) }
						onClick={ () => {
							const newCustomAttributes = [ ...customAttributes ];
							newCustomAttributes.splice( index, 1 );
							setAttributes( { customAttributes: newCustomAttributes } );
						} }
						icon={ <X /> }
					/>
				</div>
			);
		} );
		return customAttributeOutput;
	};

	return (
		<>
			<BaseControl className="dlx-photo-block__custom-attributes-control">
				<h3>{ __( 'Custom Attributes', 'photo-block' ) }</h3>
				<Button
					variant="secondary"
					label={ __( 'Add Attribute', 'photo-block' ) }
					onClick={ () => {
						const newCustomAttributes = [ ...customAttributes ];
						newCustomAttributes.push( { name: '', value: '' } );
						setAttributes( { customAttributes: newCustomAttributes } );
					} }
				>
					{ __( 'Add Attribute', 'photo-block' ) }
				</Button>
				{ showCustomAttributes() }
			</BaseControl>
		</>
	);
};
export default CustomAttributesControl;
