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
import { useSelect, useDispatch } from '@wordpress/data';

import { blockStore } from '../../store';
import URLPicker from '../URLPicker';
import globalStylesStore from '../../store/global-styles';

/**
 * MediaLink component.
 *
 * @param {Object} props - Component props.
 * @return {Function} Component.
 */
const MediaLink = ( props ) => {
	const { attributes, setAttributes, anchorRef, blockUniqueId } = props;

	// Get context.
	const {
		photoMode,
		imageData,
	} = useSelect( ( select ) => {
		return {
			photoMode: select( blockStore( blockUniqueId ) ).getPhotoMode(),
			imageData: select( blockStore( blockUniqueId ) ).getImageData(),
		};
	} );

	// Get global style data.
	const {
		hasGlobalStyle,
	} = useSelect( ( select ) => {
		return {
			hasGlobalStyle: select( globalStylesStore ).hasGlobalStyle,
		};
	} );

	const { mediaLinkOverride, mediaLinkType, mediaLinkTitle, mediaLinkUrl, lightboxCaption, lightboxEnabled, lightboxShowCaption, globalStyle } = attributes;

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
								if ( hasGlobalStyle( globalStyle ) ) {
									setAttributes(
										{
											mediaLinkOverride: true,
										}
									);
								}
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
								if ( hasGlobalStyle( globalStyle ) ) {
									setAttributes(
										{
											mediaLinkOverride: true,
										}
									);
								}
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
								if ( hasGlobalStyle( globalStyle ) ) {
									setAttributes(
										{
											mediaLinkOverride: true,
										}
									);
								}
								setAttributes( { mediaLinkType: 'page' } );
							} }
							disabled={ 'photo' !== photoMode }
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
								if ( hasGlobalStyle( globalStyle ) ) {
									setAttributes(
										{
											mediaLinkOverride: true,
										}
									);
								}
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
									label={ __( 'Open in new tab', 'photo-block' ) }
									href={ imageData.full }
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
									label={ __( 'Open in new tab', 'photo-block' ) }
									href={ imageData.attachment_link }
									target="_blank"
									rel="noopener noreferrer"
									disabled={ 'photo' !== photoMode }
								>
									{ __( 'Attachment Page', 'photo-block' ) }
								</Button>
							</div>
						</>
					) }
					{ 'image' === mediaLinkType && (
						<>
							<PanelBody
								title={ __( 'Lightbox', 'photo-block' ) }
								initialOpen={ false }
							>
								<PanelRow>
									<ToggleControl
										label={ __( 'Enable lightbox', 'photo-block' ) }
										checked={ lightboxEnabled }
										onChange={ ( value ) => {
											setAttributes( { lightboxEnabled: value } );
										} }
										help={ __( 'Popup the full size photo in a lightbox when clicked.', 'photo-block' ) }
									/>
								</PanelRow>
								{ lightboxEnabled && (
									<>
										<PanelRow>
											<ToggleControl
												label={ __( 'Show caption', 'photo-block' ) }
												checked={ lightboxShowCaption }
												onChange={ ( value ) => {
													setAttributes( { lightboxShowCaption: value } );
												} }
											/>
										</PanelRow>
										{ lightboxShowCaption && (
											<PanelRow>
												<TextControl
													label={ __( 'Custom Caption (optional)', 'photo-block' ) }
													value={ lightboxCaption }
													onChange={ ( value ) => {
														setAttributes( { lightboxCaption: value } );
													} }
													help={ __( 'Leave blank to use the photo\'s caption.', 'photo-block' ) }
												/>
											</PanelRow>
										) }
									</>
								) }
							</PanelBody>
						</>
					) }
					{ ( 'none' !== mediaLinkType ) && (
						<PanelBody
							title={ __( 'Advanced', 'photo-block' ) }
							initialOpen={ false }
						>
							{
								( ! lightboxEnabled || 'image' !== mediaLinkType ) && (
									<PanelRow>
										<ToggleControl
											label={ __( 'Open in new tab', 'photo-block' ) }
											checked={ attributes.mediaLinkNewTab }
											onChange={ ( value ) => {
												if ( '' === attributes.mediaLinkRel && value ) {
													setAttributes( { mediaLinkRel: 'noopener noreferrer' } );
												}
												if ( 'noopener noreferrer' === attributes.mediaLinkRel && ! value ) {
													setAttributes( { mediaLinkRel: '' } );
												}
												setAttributes( { mediaLinkNewTab: value } );
											} }
										/>
									</PanelRow>
								)
							}
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
