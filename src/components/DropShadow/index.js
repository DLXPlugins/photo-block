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
	Link2Off,
	Link2,
	Image,
	FileImage,
	ExternalLink,

} from 'lucide-react';

import { useContext, useState, useEffect, useRef } from '@wordpress/element';

import { __ } from '@wordpress/i18n';
import classnames from 'classnames';

import UploaderContext from '../../contexts/UploaderContext';
import ColorPickerControl from '../ColorPicker';
/**
 * DropShadow component.
 *
 * @param {Object} props - Component props.
 * @return {Function} Component.
 */
const DropShadowControl = ( props ) => {
	const { attributes, setAttributes, anchorRef } = props;

	// Get context.
	const {
	} = useContext( UploaderContext );

	const { mediaLinkType, mediaLinkTitle, mediaLinkUrl } = attributes;

	return (
		<>
			<BaseControl className="dlx-photo-block__drop-shadow-control">
				<h3 className="dlx-photo-block__drop-shadow-control__title">{ __( 'Drop Shadow', 'photo-block' ) }</h3>
				<div className="dlx-photo-block__drop-shadow-control__settings">
					<div className="dlx-photo-block__drop-shadow-control__settings__color">
						<ColorPickerControl
							label={ __( 'Color', 'photo-block' ) }
							value={ attributes.photoDropShadow.color }
							valueOpacity={ attributes.photoDropShadow.opacity }
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
