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
import { Trash } from 'lucide-react';
import { store as blockEditorStore } from '@wordpress/block-editor';
import globalStylesStore from '../../store/global-styles';
import GlobalStylesButtonPreview from './ButtonPreview';

const GlobalStylesPicker = ( props ) => {
	const [ isRemoveModalOpen, setIsRemoveModalOpen ] = useState( false );
	const [ isKeepStyleSettings, setIsKeepStyleSettings ] = useState( false );

	const { globalStyles, getGlobalStyleBySlug } = useSelect( ( select ) => {
		return {
			globalStyles: select( globalStylesStore ).getGlobalStyles(),
			getGlobalStyleBySlug: select( globalStylesStore ).getGlobalStyleBySlug,
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

	/**
	 * Determines if there's a global style or not.
	 *
	 * @return {boolean} True if there's a global style, false otherwise.
	 */
	const hasGlobalStyle = () => {
		if ( 'none' !== props.attributes.globalStyle && Object.keys( getGlobalStyleBySlug( props.attributes.globalStyle ) ).length > 0 ) {
			return true;
		}
		return false;
	};

	const getGlobalStyles = () => {
		if ( hasGlobalStyle() ) {
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
							icon={ <Trash /> }
							label={ __( 'Remove', 'photo-block' ) }
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
	if ( isRemoveModalOpen ) {
		return (
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
								if ( hasGlobalStyle() ) {
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

									// Get the caption block.
									const block = getBlock( props.clientId );
									const captionBlockClientId = block.innerBlocks[ 0 ].clientId;

									// Need to apply global styles to the caption.
									updateBlockAttributes( captionBlockClientId, captionAttributes );
								}
							} else {
								props.setAttributes( {
									globalStyle: 'none',
								} );
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
		);
	}
	return (
		<>
			<PanelBody
				title={ __( 'Global Styles' ) }
				initialOpen={ true }
			>
				{ getGlobalStyles() }
			</PanelBody>
		</>
	);
};

export default GlobalStylesPicker;
