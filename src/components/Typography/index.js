import './editor.scss';
import React, { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { ButtonGroup, Button, Tooltip, SelectControl, BaseControl, TextControl, Popover } from '@wordpress/components';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { Type } from 'lucide-react';
import { geHierarchicalPlaceholderValue } from '../../utils/TypographyHelper';
import useDeviceType from '../../hooks/useDeviceType';
import HeadingIconResponsive from '../HeadingIconResponsive';
import useUnits from '../../hooks/useUnits';

// Webfonts.
const fontFamilies = [
	{
		name: 'Arial',
		family: 'Arial, sans-serif',
		slug: 'arial',
		fallback: 'sans-serif',
		type: 'web',
	},
	{
		name: 'Courier New',
		family: 'Courier New, monospace',
		slug: 'courier-new',
		fallback: 'monospace',
		type: 'web',
	},
	{
		name: 'Garamond',
		family: 'Garamond, serif',
		slug: 'garamond',
		fallback: 'serif',
		type: 'web',
	},
	{
		name: 'Georgia',
		family: 'Georgia, serif',
		slug: 'georgia',
		fallback: 'serif',
		type: 'web',
	},
	{
		name: 'Helvetica',
		family: 'Helvetica, sans-serif',
		slug: 'helvetica',
		fallback: 'sans-serif',
		type: 'web',
	},
	{
		name: 'Lucida Console',
		family: 'Lucida Console, monospace',
		slug: 'lucida-console',
		fallback: 'monospace',
		type: 'web',
	},
	{
		name: 'Tahoma',
		family: 'Tahoma, sans-serif',
		slug: 'tahoma',
		fallback: 'sans-serif',
		type: 'web',
	},
	{
		name: 'Times New Roman',
		family: 'Times New Roman, serif',
		slug: 'times-new-roman',
		fallback: 'serif',
		type: 'web',
	},
	{
		name: 'Trebuchet MS',
		family: 'Trebuchet MS, sans-serif',
		slug: 'trebuchet-ms',
		fallback: 'sans-serif',
		type: 'web',
	},
	{
		name: 'Verdana',
		family: 'Verdana, sans-serif',
		slug: 'verdana',
		fallback: 'sans-serif',
		type: 'web',
	},
];

const TypographyControl = ( props ) => {
	const [ fontSizeUnitPopoverVisible, setFontSizeUnitPopoverVisible ] = useState( false );
	const [ fontSizeUnitPopoverAnchor, setFontSizeUnitPopoverAnchor ] = useState( null );
	const [ lineHeightUnitPopoverVisible, setLineHeightUnitPopoverVisible ] = useState( false );
	const [ lineHeightUnitPopoverAnchor, setLineHeightUnitPopoverAnchor ] = useState( null );
	const [ letterSpacingUnitPopoverVisible, setLetterSpacingUnitPopoverVisible ] = useState( false );
	const [ letterSpacingUnitPopoverAnchor, setLetterSpacingUnitPopoverAnchor ] = useState( null );
	const [ fontSettingsPopoverVisible, setFontSettingsPopoverVisible ] = useState( false );
	const [ fontSettingsPopoverAnchor, setFontSettingsPopoverAnchor ] = useState( null );
	const [ isVisible, setIsVisible ] = useState( false ); // for the main typography settings popup.
	const [ isToggled, setIsToggled ] = useState( false ); // for the main typography settings popup.

	const {
		onUnitChange,
		splitValues,
		getNumericValue,
		getUnitValue,
		startsWithNumber,
	} = useUnits();

	const [ screenSize ] = useDeviceType( 'Desktop' );

	const getDefaultValues = () => {
		return {
			mobile: {
				fontFamily: props.values.mobile.fontFamily,
				fontFamilySlug: props.values.mobile.fontFamilySlug,
				fontSize: props.values.mobile.fontSize,
				fontSizeUnit: props.values.mobile.fontSizeUnit,
				fontWeight: props.values.mobile.fontWeight,
				lineHeight: props.values.mobile.lineHeight,
				lineHeightUnit: props.values.mobile.lineHeightUnit,
				textTransform: props.values.mobile.textTransform,
				letterSpacing: props.values.mobile.letterSpacing,
				letterSpacingUnit: props.values.mobile.letterSpacingUnit,
				fontType: props.values.mobile.fontType,
				fontFallback: props.values.mobile.fontFallback,
			},
			tablet: {
				fontFamily: props.values.tablet.fontFamily,
				fontFamilySlug: props.values.tablet.fontFamilySlug,
				fontSize: props.values.tablet.fontSize,
				fontSizeUnit: props.values.tablet.fontSizeUnit,
				fontWeight: props.values.tablet.fontWeight,
				lineHeight: props.values.tablet.lineHeight,
				lineHeightUnit: props.values.tablet.lineHeightUnit,
				textTransform: props.values.tablet.textTransform,
				letterSpacing: props.values.tablet.letterSpacing,
				letterSpacingUnit: props.values.tablet.letterSpacingUnit,
				fontType: props.values.tablet.fontType,
				fontFallback: props.values.tablet.fontFallback,
			},
			desktop: {
				fontFamily: props.values.desktop.fontFamily,
				fontFamilySlug: props.values.desktop.fontFamilySlug,
				fontSize: props.values.desktop.fontSize,
				fontSizeUnit: props.values.desktop.fontSizeUnit,
				fontWeight: props.values.desktop.fontWeight,
				lineHeight: props.values.desktop.lineHeight,
				lineHeightUnit: props.values.desktop.lineHeightUnit,
				textTransform: props.values.desktop.textTransform,
				letterSpacing: props.values.desktop.letterSpacing,
				letterSpacingUnit: props.values.desktop.letterSpacingUnit,
				fontType: props.values.desktop.fontType,
				fontFallback: props.values.desktop.fontFallback,
			},
		};
	};

	const {
		control,
		setValue,
		getValues,
	} = useForm( {
		defaultValues: getDefaultValues(),
	} );

	const formValues = useWatch( { control } );

	const { label } = props;

	useEffect( () => {
		props.onValuesChange( formValues );
	}, [ formValues ] );

	useEffect( () => {
		setValue( props.screenSize, getValues( props.screenSize ) );
	}, [ props.screenSize ] );

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

	// Retrieve the list all available fonts.
	const getFonts = () => {
		const fonts = [];

		fontFamilies.forEach( ( fontFamily ) => {
			fonts.push( { label: fontFamily.name, value: fontFamily.slug, family: fontFamily.family, fallback: fontFamily.fallback, type: fontFamily.type } );
		} );

		// Add placeholder.
		fonts.unshift( { label: __( 'Custom', 'photo-block' ), value: 'custom' } );
		fonts.unshift( { label: __( 'Select a Font', 'photo-block' ), value: '' } );

		// Don't show font family on non-desktop sizes.
		if ( 'desktop' !== screenSize ) {
			return null;
		}
		return (
			<>
				<Controller
					name={ `${ screenSize }.fontFamilySlug` }
					control={ control }
					render={ ( { field: { onChange, value } } ) => (
						<SelectControl
							label={ __( 'Font Family', 'photo-block' ) }
							value={ geHierarchicalPlaceholderValue( props.values, screenSize, getValues( screenSize ).fontFamilySlug, 'fontFamilySlug' ) }
							options={ fonts }
							onChange={ ( newValue ) => {
								onChange( newValue );

								// Get font family name for CSS.
								fonts.forEach( ( font ) => {
									if ( font.value === newValue ) {
										setValue( `${ screenSize }.fontFamily`, font.family );
										setValue( `${ screenSize }.fontFamilySlug`, font.value );
										setValue( `${ screenSize }.fontFallback`, font.fallback );
										setValue( `${ screenSize }.fontType`, font.type );
									}
								} );
							} }
						/>
					) }
				/>
				<Controller
					name={ `${ screenSize }.fontFamily` }
					control={ control }
					render={ ( { field: { value } } ) => (
						<TextControl
							type="hidden"
							value={ getValues( screenSize ).fontFamily }
						/>
					) }
				/>
				<Controller
					name={ `${ screenSize }.fontFallback` }
					control={ control }
					render={ ( { field: { value } } ) => (
						<TextControl
							type="hidden"
							value={ getValues( screenSize ).fontFallback }
						/>
					) }
				/>
			</>
		);
	};

	const getTextTransform = () => {
		const textTransform = [
			{ label: __( 'None', 'photo-block' ), value: 'none' },
			{ label: __( 'Uppercase', 'photo-block' ), value: 'uppercase' },
			{ label: __( 'Lowercase', 'photo-block' ), value: 'lowercase' },
			{ label: __( 'Capitalize', 'photo-block' ), value: 'capitalize' },
		];
		return (
			<Controller
				name={ `${ screenSize }.textTransform` }
				control={ control }
				render={ ( { field: { onChange, value } } ) => (
					<SelectControl
						label={ __( 'Text Transform', 'photo-block' ) }
						value={ geHierarchicalPlaceholderValue( props.values, screenSize, getValues( screenSize ).textTransform, 'textTransform' ) }
						options={ textTransform }
						onChange={ ( newValue ) => {
							onChange( newValue );
						} }
					/>
				) }
			/>
		);
	};

	const getFontSize = () => {
		return (
			<>
				<Controller
					name={ `${ screenSize }.fontSize` }
					control={ control }
					render={ ( { field: { onChange } } ) => (
						<TextControl
							label={ __( 'Font Size', 'photo-block' ) }
							value={ getValues( screenSize ).fontSize }
							onChange={ ( newValue ) => {
								onChange( newValue );
								if ( startsWithNumber( newValue ) ) {
									const newValuesSplit = splitValues( newValue );
									const numericValue = getNumericValue( newValuesSplit );
									const unitValue = getUnitValue( newValuesSplit );
									setValue( `${ screenSize }.fontSize`, numericValue );
									setValue( `${ screenSize }.fontSizeUnit`, unitValue );
								} else {
									// Starts with a string, hide the unit.
									setValue( `${ screenSize }.fontSize`, newValue );
									setValue( `${ screenSize }.fontSizeUnit`, '' );
								}
							} }
							type="text"
							placeholder={ geHierarchicalPlaceholderValue( props.values, screenSize, getValues( screenSize ).fontSize, 'fontSize' ) }
						/>
					) }
				/>
				<Controller
					name={ `${ screenSize }.fontSizeUnit` }
					control={ control }
					render={ ( { field: { value } } ) => (
						<TextControl
							type="hidden"
							value={ getValues( screenSize ).fontSizeUnit }
						/>
					) }
				/>
				<Button
					variant="secondary"
					label={ getValues( `${ screenSize }.fontSizeUnit` ) }
					onClick={ () => {
						setFontSizeUnitPopoverVisible( ! fontSizeUnitPopoverVisible );
					} }
					ref={ setFontSizeUnitPopoverAnchor }
				>{ getValues( `${ screenSize }.fontSizeUnit` ) }
				</Button>
				{ true === fontSizeUnitPopoverVisible && (
					<Popover
						className="photo-block-component-font-unit-picker"
						noArrow={ true }
						anchor={ fontSizeUnitPopoverAnchor }
					>
						<ButtonGroup>
							<Button
								isPrimary={ getValues( `${ screenSize }.fontSizeUnit` ) === 'px' }
								onClick={ () => {
									setValue( `${ screenSize }.fontSizeUnit`, 'px' );
									setFontSizeUnitPopoverVisible( false );
								} }
							>px
							</Button>
							<Button
								isPrimary={ getValues( `${ screenSize }.fontSizeUnit` ) === 'em' }
								onClick={ () => {
									setValue( `${ screenSize }.fontSizeUnit`, 'em' );
									setFontSizeUnitPopoverVisible( false );
								} }
							>em
							</Button>
							<Button
								isPrimary={ getValues( `${ screenSize }.fontSizeUnit` ) === 'rem' }
								onClick={ () => {
									setValue( `${ screenSize }.fontSizeUnit`, 'rem' );
									setFontSizeUnitPopoverVisible( false );
								} }
							>rem
							</Button>
						</ButtonGroup>
					</Popover>
				) }
			</>
		);
	};

	const getFontWeights = () => {
		const fontWeights = [
			{ label: __( '100', 'photo-block' ), value: '100' },
			{ label: __( '200', 'photo-block' ), value: '200' },
			{ label: __( '300', 'photo-block' ), value: '300' },
			{ label: __( '400', 'photo-block' ), value: '400' },
			{ label: __( '500', 'photo-block' ), value: '500' },
			{ label: __( '600', 'photo-block' ), value: '600' },
			{ label: __( '700', 'photo-block' ), value: '700' },
			{ label: __( '800', 'photo-block' ), value: '800' },
			{ label: __( '900', 'photo-block' ), value: '900' },
		];
		return (
			<Controller
				name={ `${ screenSize }.fontWeight` }
				control={ control }
				render={ ( { field: { onChange, value } } ) => (
					<SelectControl
						label={ __( 'Font Weight', 'photo-block' ) }
						value={ getValues( screenSize ).fontWeight }
						options={ fontWeights }
						onChange={ ( newValue ) => {
							onChange( newValue );
						} }
					/>
				) }
			/>
		);
	};

	const getLineHeight = () => {
		return (
			<>
				<Controller
					name={ `${ screenSize }.lineHeight` }
					control={ control }
					render={ ( { field: { onChange, value } } ) => (
						<TextControl
							label={ __( 'Line Height', 'photo-block' ) }
							value={ getValues( screenSize ).lineHeight }
							onChange={ ( newValue ) => {
								onChange( newValue );
								if ( startsWithNumber( newValue ) ) {
									const newValuesSplit = splitValues( newValue );
									const numericValue = getNumericValue( newValuesSplit );
									const unitValue = getUnitValue( newValuesSplit );
									setValue( `${ screenSize }.lineHeight`, numericValue );
									setValue( `${ screenSize }.lineHeightUnit`, unitValue );
								} else {
									// Starts with a string, hide the unit.
									setValue( `${ screenSize }.lineHeight`, newValue );
									setValue( `${ screenSize }.lineHeightUnit`, '' );
								}
							} }
							type="text"
							placeholder={ geHierarchicalPlaceholderValue( props.values, screenSize, getValues( screenSize ).lineHeight, 'lineHeight' ) }
						/>
					) }
				/>
				<Controller
					name={ `${ screenSize }.lineHeightUnit` }
					control={ control }
					render={ ( { field: { value } } ) => (
						<TextControl
							type="hidden"
							value={ getValues( screenSize ).lineHeightUnit }
						/>
					) }
				/>
				<Button
					variant="secondary"
					label={ getValues( `${ screenSize }.lineHeightUnit` ) }
					onClick={ () => {
						setLineHeightUnitPopoverVisible( ! lineHeightUnitPopoverVisible );
					} }
					ref={ setLineHeightUnitPopoverAnchor }
				>{ getValues( `${ screenSize }.lineHeightUnit` ) }
				</Button>
				{ true === lineHeightUnitPopoverVisible && (
					<Popover
						className="photo-block-component-font-unit-picker"
						noArrow={ true }
						anchor={ lineHeightUnitPopoverAnchor }
					>
						<ButtonGroup>
							<Button
								isPrimary={ getValues( `${ screenSize }.lineHeightUnit` ) === 'px' }
								onClick={ () => {
									setValue( `${ screenSize }.lineHeightUnit`, 'px' );
									setLineHeightUnitPopoverVisible( false );
								} }
							>px
							</Button>
							<Button
								isPrimary={ getValues( `${ screenSize }.lineHeightUnit` ) === 'em' }
								onClick={ () => {
									setValue( `${ screenSize }.lineHeightUnit`, 'em' );
									setLineHeightUnitPopoverVisible( false );
								} }
							>em
							</Button>
							<Button
								isPrimary={ getValues( `${ screenSize }.lineHeightUnit` ) === 'rem' }
								onClick={ () => {
									setValue( `${ screenSize }.lineHeightUnit`, 'rem' );
									setLineHeightUnitPopoverVisible( false );
								} }
							>rem
							</Button>
						</ButtonGroup>
					</Popover>
				) }
			</>
		);
	};

	const getFontType = () => {
		return (
			<Controller
				name={ `${ screenSize }.fontType` }
				control={ control }
				render={ ( { field: { value } } ) => (
					<TextControl
						type="hidden"
						value={ getValues( screenSize ).fontType }
					/>
				) }
			/>
		);
	};

	const getFontFallback = () => {
		return (
			<Controller
				name={ `${ screenSize }.fontFallback` }
				control={ control }
				render={ ( { field: { value } } ) => (
					<TextControl
						type="hidden"
						value={ getValues( screenSize ).fontFallback }
					/>
				) }
			/>
		);
	};

	const getLetterSpacing = () => {
		return (
			<>
				<Controller
					name={ `${ screenSize }.letterSpacing` }
					control={ control }
					render={ ( { field: { onChange, value } } ) => (
						<TextControl
							label={ __( 'Letter Spacing', 'photo-block' ) }
							value={ getValues( screenSize ).letterSpacing }
							onChange={ ( newValue ) => {
								onChange( newValue );
								if ( startsWithNumber( newValue ) ) {
									const newValuesSplit = splitValues( newValue );
									const numericValue = getNumericValue( newValuesSplit );
									const unitValue = getUnitValue( newValuesSplit );
									setValue( `${ screenSize }.letterSpacing`, numericValue );
									setValue( `${ screenSize }.letterSpacingUnit`, unitValue );
								} else {
									// Starts with a string, hide the unit.
									setValue( `${ screenSize }.letterSpacing`, newValue );
									setValue( `${ screenSize }.letterSpacingUnit`, '' );
								}
							} }
							type="text"
							placeholder={ geHierarchicalPlaceholderValue( props.values, screenSize, getValues( screenSize ).letterSpacing, 'letterSpacing' ) }
						/>
					) }
				/>
				<Controller
					name={ `${ screenSize }.letterSpacingUnit` }
					control={ control }
					render={ ( { field: { value } } ) => (
						<TextControl
							type="hidden"
							value={ getValues( screenSize ).letterSpacingUnit }
						/>
					) }
				/>
				<Button
					variant="secondary"
					label={ getValues( `${ screenSize }.letterSpacingUnit` ) }
					onClick={ () => {
						setLetterSpacingUnitPopoverVisible( ! letterSpacingUnitPopoverVisible );
					} }
					ref={ setLetterSpacingUnitPopoverAnchor }
				>{ getValues( `${ screenSize }.letterSpacingUnit` ) }
				</Button>
				{ true === letterSpacingUnitPopoverVisible && (
					<Popover
						className="photo-block-component-font-unit-picker"
						noArrow={ true }
						anchor={ letterSpacingUnitPopoverAnchor }
					>
						<ButtonGroup>
							<Button
								isPrimary={ getValues( `${ screenSize }.letterSpacingUnit` ) === 'px' }
								onClick={ () => {
									setValue( `${ screenSize }.letterSpacingUnit`, 'px' );
									setLetterSpacingUnitPopoverVisible( false );
								} }
							>px
							</Button>
							<Button
								isPrimary={ getValues( `${ screenSize }.letterSpacingUnit` ) === 'em' }
								onClick={ () => {
									setValue( `${ screenSize }.letterSpacingUnit`, 'em' );
									setLetterSpacingUnitPopoverVisible( false );
								} }
							>em
							</Button>
							<Button
								isPrimary={ getValues( `${ screenSize }.letterSpacingUnit` ) === 'rem' }
								onClick={ () => {
									setValue( `${ screenSize }.letterSpacingUnit`, 'rem' );
									setLetterSpacingUnitPopoverVisible( false );
								} }
							>rem
							</Button>
						</ButtonGroup>
					</Popover>
				) }
			</>
		);
	};

	const getPopoverContent = () => {
		return (
			<BaseControl className="photo-block-typography-picker">
				<div className="photo-block-typography-picker__row photo-block-typography-picker__row__col-full">
					<div className="photo-block-typography-picker__row_item">
						{ getFonts() }
					</div>
				</div>
				<div className="photo-block-typography-picker__row photo-block-typography-picker__row__col-full">
					<div className="photo-block-typography-picker__row_item">
						{ getTextTransform() }
						{ getFontType() }
						{ getFontFallback() }
					</div>
				</div>
				<div className="photo-block-typography-picker__row photo-block-typography-picker__row__col-2">
					<div className="photo-block-typography-picker__row_item photo-block-units">
						{ getFontSize() }
					</div>
					<div className="photo-block-typography-picker__row_item">
						{ getFontWeights() }
					</div>
				</div>
				<div className="photo-block-typography-picker__row photo-block-typography-picker__row__col-2">
					<div className="photo-block-typography-picker__row_item photo-block-units">
						{ getLineHeight() }
					</div>
					<div className="photo-block-typography-picker__row_item photo-block-units">
						{ getLetterSpacing() }
					</div>
				</div>
			</BaseControl>
		);
	};

	return (
		<BaseControl className="photo-block-typography-picker-wrapper">
			<div className="photo-block-typography-component-devices">
				<HeadingIconResponsive heading={ label } screenSize={ screenSize } />
			</div>
			<div className="photo-block-typography-component-settings">
				<Button
					variant="secondary"
					label={ __( 'Font Settings', 'photo-block' ) }
					onClick={ () => {
						if ( isToggled ) {
							setIsToggled( false );
						} else {
							setIsVisible( ! isVisible );
						}
					} }
					icon={ <Type /> }
					ref={ setFontSettingsPopoverAnchor }
				>
					{ __( 'Font Settings', 'photo-block' ) }
				</Button>
				{ true === isVisible && (
					<Popover
						className="photo-block-component-typography-popup"
						noArrow={ false }
						anchor={ fontSettingsPopoverAnchor }
						placement="left"
						offset={ 10 }
						onClose={ toggleClose }
					>
						{ getPopoverContent() }
					</Popover>
				) }
			</div>
		</BaseControl>
	);
};
export default TypographyControl;
