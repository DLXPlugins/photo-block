import './editor.scss';
import {
	ToggleControl,
	PanelRow,
	TextControl,
} from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import CustomAttributesControl from '../../components/CustomAttributes';

const SidebarImageAdvancedInspectorControl = ( props ) => {
	const { attributes, setAttributes } = props;
	const {
		htmlAnchor,
		figureCSSClasses,
		imageCSSClasses,
		skipLazyLoading,
		imageProtectionEnabled,
		hideOnMobile,
		hideOnTablet,
		hideOnDesktop,
	} = attributes;

	const stylesInspectorControls = (
		<>
			<PanelRow>
				<TextControl
					label={ __( 'HTML Anchor', 'photo-block' ) }
					value={ htmlAnchor }
					onChange={ ( value ) => {
						setAttributes( { htmlAnchor: value } );
					} }
					help={ __( 'Enter a word or two — without spaces — to make a unique web address just for this photo, called an "anchor." Then, you\'ll be able to link directly to this photo on your page.', 'photo-block' ) }
				/>
			</PanelRow>
			<PanelRow>
				<TextControl
					label={ __( 'Figure CSS Class(es)', 'photo-block' ) }
					value={ figureCSSClasses }
					onChange={ ( value ) => {
						setAttributes( { figureCSSClasses: value } );
					} }
					help={ __( 'Add CSS class(es) directly to the figure tag, which wraps the image.', 'photo-block' ) }
				/>
			</PanelRow>
			<PanelRow>
				<TextControl
					label={ __( 'Image CSS Class(es)', 'photo-block' ) }
					value={ imageCSSClasses }
					onChange={ ( value ) => {
						setAttributes( { imageCSSClasses: value } );
					} }
					help={ __( 'Add CSS class(es) directly to the image tag.', 'photo-block' ) }
				/>
			</PanelRow>
			<PanelRow>
				<CustomAttributesControl
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
			</PanelRow>
			<PanelRow>
				<ToggleControl
					label={ __( 'Skip Lazy Loading', 'photo-block' ) }
					checked={ skipLazyLoading }
					onChange={ ( value ) => {
						setAttributes( { skipLazyLoading: value } );
					} }
					help={ __( 'Set a flag which will signal that the image should not be lazy loaded.', 'photo-block' ) }
				/>
			</PanelRow>
			<PanelRow>
				<ToggleControl
					label={ __( 'Enable Image Protection', 'photo-block' ) }
					checked={ imageProtectionEnabled }
					onChange={ ( value ) => {
						setAttributes( { imageProtectionEnabled: value } );
					} }
					help={ __( 'Prevent this photo from being downloaded by using the right+click button.', 'photo-block' ) }
				/>
			</PanelRow>
			<PanelRow>
				<ToggleControl
					label={ __( 'Hide on Mobile', 'photo-block' ) }
					checked={ hideOnMobile }
					onChange={ ( value ) => {
						setAttributes( { hideOnMobile: value } );
					} }
					help={ __( 'Hide this photo on mobile devices.', 'photo-block' ) }
				/>
			</PanelRow>
			<PanelRow>
				<ToggleControl
					label={ __( 'Hide on Tablet', 'photo-block' ) }
					checked={ hideOnTablet }
					onChange={ ( value ) => {
						setAttributes( { hideOnTablet: value } );
					} }
					help={ __( 'Hide this photo on tablet devices.', 'photo-block' ) }
				/>
			</PanelRow>
			<PanelRow>
				<ToggleControl
					label={ __( 'Hide on Desktop', 'photo-block' ) }
					checked={ hideOnDesktop }
					onChange={ ( value ) => {
						setAttributes( { hideOnDesktop: value } );
					} }
					help={ __( 'Hide this photo on desktop devices.', 'photo-block' ) }
				/>
			</PanelRow>
		</>
	);
	return ( stylesInspectorControls );
};

SidebarImageAdvancedInspectorControl.defaultProps = {
	attributes: {},
	setAttributes: () => {},
};

SidebarImageAdvancedInspectorControl.propTypes = {
	attributes: PropTypes.object,
};

export default SidebarImageAdvancedInspectorControl;
