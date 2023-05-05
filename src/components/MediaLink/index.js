/**
 * Upload data row including Upload|Media Library|URL|Data.
 */
import './editor.scss';

import {
	PanelBody,
	PanelRow,
	RangeControl,
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
import URLPicker from '../URLPicker';

/**
 * UploadTypes component.
 *
 * @param {Object} props - Component props.
 * @return {Function} Component.
 */
const MediaLink = ( props ) => {
	const { attributes, setAttributes, anchorRef } = props;

	// Get context.
	const {
		imageFile,
		setScreen,
		filepondInstance,
		setImageFile,
	} = useContext( UploaderContext );

	const { mediaLinkType, mediaLinkTitle, mediaLinkUrl } = attributes;

	return (
		<>
			<Popover
				position="bottom center"
				className="dlx-photo-block__media-link-popover"
				expandOnMobile={ true }
				focusOnMount={ true }
				onClose={ () => {
					props.onClose();
				} }
				anchor={ anchorRef }
			>
				<div className="dlx-photo-block__media-link-container">
					<h2>{ __( 'Select where to link to.', 'photo-block' ) }</h2>
					<ButtonGroup className="dlx-photo-block__media-link-button-group">
						<Button
							variant="secondary"
							icon={ <Link2Off /> }
							className={ classnames( {
								'is-pressed': 'none' === mediaLinkType,
							} ) }

							onClick={ () => {
								setAttributes( { mediaLinkType: 'none' } );
							} }
						>
							<span className="dlx-photo-block__media-link-button-text">{ __( 'No link', 'photo-block' ) }</span>
						</Button>
						<Button
							variant="secondary"
							icon={ <Image /> }
							className={ classnames( {
								'is-pressed': 'image' === mediaLinkType,
							} ) }
							onClick={ () => {
								setAttributes( { mediaLinkType: 'image' } );
							} }
						>
							{ __( 'The full size photo', 'photo-block' ) }
						</Button>
						<Button
							variant="secondary"
							icon={ <FileImage /> }
							className={ classnames( {
								'is-pressed': 'page' === mediaLinkType,
							} ) }
							onClick={ () => {
								setAttributes( { mediaLinkType: 'page' } );
							} }
						>
							{ __( 'The photo\'s page', 'photo-block' ) }
						</Button>
						<Button
							variant="secondary"
							icon={ <Link2 /> }
							className={ classnames( {
								'is-pressed': 'custom' === mediaLinkType,
							} ) }
							onClick={ () => {
								setAttributes( { mediaLinkType: 'custom' } );
							} }
						>
							{ __( 'Custom link', 'photo-block' ) }
						</Button>
					</ButtonGroup>
					{ 'custom' === mediaLinkType && (
						<>
							<URLPicker
								restNonce={ photoBlock.restNonce }
								restEndpoint={ photoBlock.restUrl + '/search/pages' }
								itemIcon={ <Link2 /> }
								onItemSelect={ ( e, url ) => {
									setAttributes( {
										mediaLinkUrl: url,
									} );
								} }
								savedValue={ mediaLinkUrl }
							/>
						</>
					) }
					{ 'image' === mediaLinkType && (
						<>
							<div className="pdlx-photo-block__media-link-media-external">
								<Button
									variant="link"
									icon={ <ExternalLink /> }
									iconSize={ 18 }
									iconPosition="right"
									label={ __( 'Open in new tab', 'archive-pages-pro' ) }
									href={ attributes.photo.full }
									target="_blank"
									rel="noopener noreferrer"
								>
									{ __( 'Media File', 'photo-block' ) }
								</Button>
							</div>
						</>
					) }
					{ 'page' === mediaLinkType && (
						<>
							<div className="pdlx-photo-block__media-link-media-page">
								<Button
									variant="link"
									icon={ <ExternalLink /> }
									iconSize={ 18 }
									iconPosition="right"
									label={ __( 'Open in new tab', 'archive-pages-pro' ) }
									href={ attributes.photo.attachment_link }
									target="_blank"
									rel="noopener noreferrer"
								>
									{ __( 'Attachment Page', 'photo-block' ) }
								</Button>
							</div>
						</>
					) }
					{ 'none' !== mediaLinkType && (
						<PanelBody
							title={ __( 'Advanced', 'photo-block' ) }
							initialOpen={ false }
						>
							<PanelRow>
								<ToggleControl
									label={ __( 'Open in new tab', 'photo-block' ) }
									checked={ attributes.mediaLinkNewTab }
									onChange={ ( value ) => {
										if ( '' === attributes.mediaLinkRel && value ) {
											setAttributes( { mediaLinkRel: 'noopener noreferrer' } );
										}
										setAttributes( { mediaLinkNewTab: value } );
									} }
								/>
							</PanelRow>
							<PanelRow>
								<TextControl
									label={ __( 'Link Title', 'photo-block' ) }
									value={ mediaLinkTitle }
									onChange={ ( value ) => {
										setAttributes( { mediaLinkTitle: value } );
									} }
									help={ __( 'The link title attribute is for SEO and accessibility purposes. It is used to describe the link.', 'photo-block' ) }
								/>
							</PanelRow>
							<PanelRow>
								<TextControl
									label={ __( 'Link Rel', 'photo-block' ) }
									value={ attributes.mediaLinkRel }
									onChange={ ( value ) => {
										setAttributes( { mediaLinkRel: value } );
									} }
									help={ __( 'The link rel attribute is for SEO and accessibility purposes. It is used to describe the relationship between the current document and the linked document.', 'photo-block' ) }

								/>
							</PanelRow>
							<PanelRow>
								<TextControl
									label={ __( 'Link Class', 'photo-block' ) }
									value={ attributes.mediaLinkClass }
									onChange={ ( value ) => {
										setAttributes( { mediaLinkClass: value } );
									} }
									help={ __( 'Add a CSS class to the link for styling purposes.', 'photo-block' ) }

								/>
							</PanelRow>
							<PanelRow>
								<TextControl
									label={ __( 'Link Anchor ID', 'photo-block' ) }
									value={ attributes.mediaLinkAnchorId }
									onChange={ ( value ) => {
										setAttributes( { mediaLinkAnchorId: value } );
									} }
									help={ __( 'This is the ID for the link, which you can use to link to the photo with an anchor. The ID for each link should be unique.', 'photo-block' ) }

								/>
							</PanelRow>
						</PanelBody>
					) }
				</div>
			</Popover>
		</>
	);
};
export default MediaLink;
