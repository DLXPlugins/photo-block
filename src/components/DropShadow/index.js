/**
 * Upload data row including Upload|Media Library|URL|Data.
 */
import './editor.scss';
import { useMemo } from '@wordpress/element';
import {
	TextControl,
	ToggleControl,
	BaseControl,
	RangeControl,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import hexToRgba from 'hex-to-rgba';
import rgb2hex from 'rgb2hex';

import ColorPickerControl from '../ColorPicker';

const isRgba = ( color ) => {
	return color.startsWith( 'rgba' );
};

/**
 * DropShadow component.
 *
 * @param {Object} props - Component props.
 * @return {Function} Component.
 */
const DropShadowControl = ( props ) => {
	const { attributes, setAttributes } = props;

	const newColor = useMemo( () => {
		if ( isRgba( attributes.photoDropShadow.color ) ) {
			const hexParams = rgb2hex( attributes.photoDropShadow.color );
			return hexParams.hex;
		}
		return attributes.photoDropShadow.color;
	}, [ attributes.photoDropShadow.color ] );

	return (
		<>
			<BaseControl className="dlx-photo-block__drop-shadow-control">
				<h3 className="dlx-photo-block__drop-shadow-control__title">{ __( 'Drop Shadow', 'photo-block' ) }</h3>
				<div className="dlx-photo-block__drop-shadow-control__settings">
					<div className="dlx-photo-block__drop-shadow-control__settings__color">
						<ColorPickerControl
							label={ __( 'Color', 'photo-block' ) }
							value={ newColor }
							opacity={ attributes.photoDropShadow.opacity || 1 }
							onChange={ ( slug, color ) => {
								setAttributes( {
									photoDropShadow: {
										...attributes.photoDropShadow,
										color,
									},
								} );
							} }
							onOpacityChange={ ( value ) => {
								setAttributes( {
									photoDropShadow: {
										...attributes.photoDropShadow,
										opacity: value,
									},
								} );
							} }
							slug="photoDropShadow"
							defaultColors={ photoBlock.palette }
							defaultColor={ '#000000' }
							alpha={ true }
						/>
					</div>
					<div className="dlx-photo-block__drop-shadow-control__settings__offset">
						<div className="dlx-photo-block__drop-shadow-control__settings__offset__wrapper">
							<div className="dlx-photo-block__drop-shadow-control__settings__offset__x">
								<TextControl
									label={ __( 'X Offset', 'photo-block' ) }
									value={ attributes.photoDropShadow.horizontal }
									type="number"
									onChange={ ( value ) => {
										setAttributes( {
											photoDropShadow: {
												...attributes.photoDropShadow,
												horizontal: value,
											},
										} );
									} }
								/>
							</div>
							<div className="dlx-photo-block__drop-shadow-control__settings__offset__y">
								<TextControl
									label={ __( 'Y Offset', 'photo-block' ) }
									value={ attributes.photoDropShadow.vertical }
									type="number"
									onChange={ ( value ) => {
										setAttributes( {
											photoDropShadow: {
												...attributes.photoDropShadow,
												vertical: value,
											},
										} );
									} }
								/>
							</div>
						</div>
					</div>
					<div className="dlx-photo-block__drop-shadow-control__settings__blur">
						<div className="dlx-photo-block__drop-shadow-control__settings__blur__wrapper">
							<RangeControl
								label={ __( 'Blur', 'photo-block' ) }
								value={ attributes.photoDropShadow.blur }
								onChange={ ( value ) => {
									setAttributes( {
										photoDropShadow: {
											...attributes.photoDropShadow,
											blur: value,
										},
									} );
								} }
								min={ 0 }
								max={ 100 }
								step={ 1 }
							/>
						</div>
					</div>
					<div className="dlx-photo-block__drop-shadow-control__settings__spread">
						<div className="dlx-photo-block__drop-shadow-control__settings__spread__wrapper">
							<RangeControl
								label={ __( 'Spread', 'photo-block' ) }
								value={ attributes.photoDropShadow.spread }
								onChange={ ( value ) => {
									setAttributes( {
										photoDropShadow: {
											...attributes.photoDropShadow,
											spread: value,
										},
									} );
								} }
								min={ -25 }
								max={ 25 }
								step={ 1 }
							/>
						</div>
					</div>
					<div className="dlx-photo-block__drop-shadow-control__settings__inset">
						<ToggleControl
							label={ __( 'Inset', 'photo-block' ) }
							checked={ attributes.photoDropShadow.inset }
							onChange={ ( value ) => {
								setAttributes( {
									photoDropShadow: {
										...attributes.photoDropShadow,
										inset: value,
									},
								} );
							} }
						/>
					</div>
				</div>
			</BaseControl>
		</>
	);
};
export default DropShadowControl;
