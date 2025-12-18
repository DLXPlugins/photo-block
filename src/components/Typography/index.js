import './editor.scss';
import React, { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { ButtonGroup, Button, Tooltip, SelectControl, BaseControl, TextControl, Popover, PanelRow } from '@wordpress/components';
import { useSettings } from '@wordpress/block-editor';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
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

	const [ screenSize, setScreenSize ] = useState( 'desktop' );

	const getDefaultValues = ( newProps ) => {
		return {
			mobile: {
				fontFamily: newProps.values.mobile.fontFamily,
				fontFamilySlug: newProps.values.mobile.fontFamilySlug,
				fontSize: newProps.values.mobile.fontSize,
				fontSizeUnit: newProps.values.mobile.fontSizeUnit,
				fontWeight: newProps.values.mobile.fontWeight,
				lineHeight: newProps.values.mobile.lineHeight,
				lineHeightUnit: newProps.values.mobile.lineHeightUnit,
				textTransform: newProps.values.mobile.textTransform,
				letterSpacing: newProps.values.mobile.letterSpacing,
				letterSpacingUnit: newProps.values.mobile.letterSpacingUnit,
				fontType: newProps.values.mobile.fontType,
				fontFallback: newProps.values.mobile.fontFallback,
			},
			tablet: {
				fontFamily: newProps.values.tablet.fontFamily,
				fontFamilySlug: newProps.values.tablet.fontFamilySlug,
				fontSize: newProps.values.tablet.fontSize,
				fontSizeUnit: newProps.values.tablet.fontSizeUnit,
				fontWeight: newProps.values.tablet.fontWeight,
				lineHeight: newProps.values.tablet.lineHeight,
				lineHeightUnit: newProps.values.tablet.lineHeightUnit,
				textTransform: newProps.values.tablet.textTransform,
				letterSpacing: newProps.values.tablet.letterSpacing,
				letterSpacingUnit: newProps.values.tablet.letterSpacingUnit,
				fontType: newProps.values.tablet.fontType,
				fontFallback: newProps.values.tablet.fontFallback,
			},
			desktop: {
				fontFamily: newProps.values.desktop.fontFamily,
				fontFamilySlug: newProps.values.desktop.fontFamilySlug,
				fontSize: newProps.values.desktop.fontSize,
				fontSizeUnit: newProps.values.desktop.fontSizeUnit,
				fontWeight: newProps.values.desktop.fontWeight,
				lineHeight: newProps.values.desktop.lineHeight,
				lineHeightUnit: newProps.values.desktop.lineHeightUnit,
				textTransform: newProps.values.desktop.textTransform,
				letterSpacing: newProps.values.desktop.letterSpacing,
				letterSpacingUnit: newProps.values.desktop.letterSpacingUnit,
				fontType: newProps.values.desktop.fontType,
				fontFallback: newProps.values.desktop.fontFallback,
			},
			captionCustomTypography: newProps.values.captionCustomTypography,
		};
	};

	const [ blockLevelFontFamilies ] = useSettings( 'typography.fontFamilies' ); // This may be undefined.
	
	const {
		control,
		setValue,
		getValues,
		reset,
	} = useForm( {
		defaultValues: getDefaultValues( props ),
	} );

	const formValues = useWatch( { control } );

	const { isDirty } = useFormState( { control } );


	const { label } = props;

	useEffect( () => {
		if ( isDirty ) {
			props.onValuesChange( formValues );
			reset( formValues, {
				keepDirty: false,
			} );
		}
	}, [ formValues ] );

	useEffect( () => {
		setScreenSize( props.screenSize.toLowerCase() );
		const newDefaultValues = getDefaultValues( props );
		setValue(
			props.screenSize.toLowerCase(),
			newDefaultValues[ props.screenSize.toLowerCase() ],
			{
				shouldDirty: false,
			}
		);
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
		if ( blockLevelFontFamilies ) {
			const { theme } = blockLevelFontFamilies;

			if ( theme ) {
				theme.forEach( ( fontFamily ) => {
					fonts.push( { label: fontFamily.name, value: fontFamily.slug, family: fontFamily.fontFamily, fallback: fontFamily.fallback, type: 'web' } );
				} );
			}
		}

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
				{ 'custom' === getValues( `${ screenSize }.fontFamilySlug` ) && (
					<>
						<PanelRow>
							<Controller
								name={ `captionCustomTypography` }
								control={ control }
								render={ ( { field: { onChange, value } } ) => (
									<TextControl
										__next40pxDefaultSize={ true }
										__nextHasNoMarginBottom={ true }
										label={ __( 'Font Family', 'photo-block' ) }
										value={ getValues( 'captionCustomTypography' ) }
										onChange={ ( newValue ) => {
											onChange( newValue );
										} }
										type="text"
									/>
								) }
							/>
						</PanelRow>
					</>
				) }
				<Controller
					name={ `${ screenSize }.fontFamily` }
					control={ control }
					render={ ( { field: { newValue } } ) => (
						<TextControl
							__next40pxDefaultSize={ true }
							__nextHasNoMarginBottom={ true }
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
							__next40pxDefaultSize={ true }
							__nextHasNoMarginBottom={ true }
							type="hidden"
							value={ getValues( screenSize ).fontFallback }
						/>
					) }
				/>
				<Controller
					name={ `captionCustomTypography` }
					control={ control }
					render={ ( { field: { value } } ) => (
						<TextControl
							__next40pxDefaultSize={ true }
							__nextHasNoMarginBottom={ true }
							type="hidden"
							value={ getValues( 'captionCustomTypography' ) }
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
							__next40pxDefaultSize={ true }
							__nextHasNoMarginBottom={ true }
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
							__next40pxDefaultSize={ true }
							__nextHasNoMarginBottom={ true }
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
							__next40pxDefaultSize={ true }
							__nextHasNoMarginBottom={ true }
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
							__next40pxDefaultSize={ true }
							__nextHasNoMarginBottom={ true }
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
						__next40pxDefaultSize={ true }
						__nextHasNoMarginBottom={ true }
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
						__next40pxDefaultSize={ true }
						__nextHasNoMarginBottom={ true }
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
							__next40pxDefaultSize={ true }
							__nextHasNoMarginBottom={ true }
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
							__next40pxDefaultSize={ true }
							__nextHasNoMarginBottom={ true }
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
				{ getPopoverContent() }
			</div>
		</BaseControl>
	);
};
export default TypographyControl;
