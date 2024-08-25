import './editor.scss';
import React, { useState } from 'react';
import { useSelect, useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	Modal,
	Button,
	CheckboxControl,
} from '@wordpress/components';
import { CircleMinus, Palette } from 'lucide-react';
import { store as blockEditorStore } from '@wordpress/block-editor';
import globalStylesStore from '../../store/global-styles';
import GlobalStylesButtonPreview from './ButtonPreview';

const GlobalStylesPicker = ( props ) => {
	const [ isRemoveModalOpen, setIsRemoveModalOpen ] = useState( false );
	const [ isKeepStyleSettings, setIsKeepStyleSettings ] = useState( false );

	const {
		globalStyles,
		getGlobalStyleBySlug,
		hasGlobalStyle
	} = useSelect( ( select ) => {
		return {
			globalStyles: select( globalStylesStore ).getGlobalStyles(),
			getGlobalStyleBySlug: select( globalStylesStore ).getGlobalStyleBySlug,
			hasGlobalStyle: select( globalStylesStore ).hasGlobalStyle,
		};
	} );

	const {	updateBlockAttributes } = useDispatch( blockEditorStore );
	const { getBlock } = useSelect( ( select ) => {
		return {
			getBlock: select( blockEditorStore ).getBlock,
		};
	} );

	// Exit if no global styles.
	if ( Object.keys( globalStyles ).length === 0 ) {
		return null;
	}

	const getGlobalStyles = () => {
		if ( hasGlobalStyle( props.attributes.globalStyle ) ) {
			const globalStyle = getGlobalStyleBySlug( props.attributes.globalStyle );

			// Make sure the global style is not empty.
			if ( Object.keys( globalStyle ).length === 0 ) {
				return null;
			}

			// Return global style interface.
			return (
				<div className="photo-block-global-styles-selected">
					<div className="photo-block-global-styles-selected-title">
						{ globalStyle.title }
					</div>
					<div className="photo-block-global-styles-selected-actions">
						<Button
							onClick={ () => {
								setIsRemoveModalOpen( true );
							} }
							icon={ <CircleMinus /> }
							label={ __( 'Remove the Global Style', 'photo-block' ) }
						/>
					</div>
				</div>
			)
		}
		return (
			<div className="photo-block-global-styles-picker-button-group">
				{
					Object.values( globalStyles ).map( ( globalStyle ) => {
						return (
							<GlobalStylesButtonPreview
								key={ globalStyle.slug }
								globalStyle={ globalStyle }
								{ ...props }
							/>
						);
					} )
				}
			</div>
		);
	};
	return (
		<>
			{
				isRemoveModalOpen && (
					<Modal
						title={ __( 'Remove Global Style', 'photo-block' ) }
						onRequestClose={ () => setIsRemoveModalOpen( false ) }
						className="photo-block-global-styles-modal"
						shouldCloseOnClickOutside={ false }
					>
						<form>
							<p className="description">
								{ __( 'Remove the global style from this photo.', 'photo-block' ) }
							</p>
							<CheckboxControl
								label={ __( 'Keep current style settings', 'photo-block' ) }
								checked={ isKeepStyleSettings }
								onChange={ () => {
									setIsKeepStyleSettings( ! isKeepStyleSettings );
								} }
							/>
							<Button
								onClick={ () => {
									if ( isKeepStyleSettings ) {
										if ( hasGlobalStyle( props.attributes.globalStyle ) ) {
											const globalStyle = getGlobalStyleBySlug( props.attributes.globalStyle );

											// Reset global style in attributes.
											const newGlobalStyle = {
												globalStyle: 'none',
											};
											const photoAttributes = {
												...globalStyle.content.photoAttributes,
												...newGlobalStyle,
											};
											const captionAttributes = {
												...globalStyle.content.captionAttributes,
												...newGlobalStyle,
											};

											// Need to apply global styles to the photo.
											updateBlockAttributes( props.clientId, photoAttributes );

											// Get the caption block. No need to create caption block here.
											const block = getBlock( props.clientId );
											const captionInnerBlocks = block?.innerBlocks;
											if ( captionInnerBlocks.length > 0 ) {
												const captionBlockClientId = block?.innerBlocks[ 0 ].clientId || null;
												// Need to apply global styles to the caption.
												updateBlockAttributes( captionBlockClientId, captionAttributes );
											}
										}
									} else {
										props.setAttributes( {
											globalStyle: 'none',
										} );
										// Updatge caption block if any.
										const block = getBlock( props.clientId );
										const captionInnerBlocks = block?.innerBlocks;
										if ( captionInnerBlocks.length > 0 ) {
											const captionBlockClientId = block?.innerBlocks[ 0 ].clientId || null;
											// Need to apply global styles to the caption.
											updateBlockAttributes( captionBlockClientId, {
												globalStyle: 'none',
											} );
										}
									}
									setIsRemoveModalOpen( false );
								} }
								variant="primary"
								className="photo-block-global-styles-modal-apply-button"
							>
								{ __( 'Remove Global Style', 'photo-block' ) }
							</Button>
							<Button
								onClick={ () => setIsRemoveModalOpen( false ) }
								variant="secondary"
							>
								{ __( 'Cancel', 'photo-block' ) }
							</Button>
						</form>
					</Modal>
				)
			}
			<PanelBody
				title={ __( 'Available Global Styles' ) }
				initialOpen={ true }
				icon={ <Palette /> }
				className="photo-block__inspector-panel"
			>
				{ getGlobalStyles() }
			</PanelBody>
		</>
	);
};

export default GlobalStylesPicker;
