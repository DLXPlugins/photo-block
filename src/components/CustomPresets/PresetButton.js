import React, { useState } from 'react';
import Proptypes from 'prop-types';
import { Button, Modal } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { select } from '@wordpress/data';

const PresetButton = ( props ) => {
	const { setAttributes, label, photoAttributes, captionAttributes, uniqueId, clientId } = props;

	// Define state for modal options.
	const [ showModal, setShowModal ] = useState( false );

	return (
		<>
			<Button
				variant={ 'secondary' }
				onClick={ ( e ) => {
					e.preventDefault();
					setShowModal( true );
				} }
				className="photo-block-preset-button"
				label={ props?.icon ? __( 'This is your default preset.', 'photo-block' ) : null }
				disabled={ props.disabled ?? false }
				icon={ props?.icon ?? null }
				showTooltip={ props?.icon ? true : false }
			>
				{ label }
			</Button>
			{ showModal && (
				<>
					<Modal
						title={ __( 'Apply Preset?', 'photo-block' ) }
						onRequestClose={ () => setShowModal( false ) }
						className="photo-block-preset-modal"
					>
						<p>{ __( 'Are you sure you want to apply this preset? This will override your existing settings.', 'photo-block' ) }</p>
						<Button
							variant="primary"
							onClick={ () => {
								// Get unique ID for the caption block.
								const children = select( 'core/block-editor' ).getBlocksByClientId( clientId )[ 0 ]?.innerBlocks || [];
								const captionBlock = children.find( ( block ) => 'dlxplugins/photo-caption-block' === block.name );
								const existingCaptionAttributes = captionBlock ? captionBlock.attributes : {};
								const captionUniqueId = existingCaptionAttributes?.uniqueId || null;
								const captionClientId = existingCaptionAttributes?.clientId || null;

								// Get unique ID for the photo block.
								const uniqueIdAttribute = { uniqueId };
								const photoBlockAttributes = { ...photoAttributes, ...uniqueIdAttribute };

								// Apply attributes for photo block.
								setAttributes( photoBlockAttributes );

								// Apply attributes for caption block.
								if ( captionUniqueId && captionClientId ) {
									const captuinUniqueAttrs = { uniqueId: captionUniqueId };
									const captionBlockAttributes = { ...captionAttributes, ...captuinUniqueAttrs };
									select( 'core/editor' ).updateBlockAttributes( captionClientId, captionBlockAttributes );
								}
								setShowModal( false );
							} }
							className="photo-block-preset-modal-apply-button"
						>
							{ __( 'Apply Preset', 'photo-block' ) }
						</Button>
						<Button
							variant="secondary"
							onClick={ () => {
								setShowModal( false );
							} }
						>
							{ __( 'Cancel', 'photo-block' ) }
						</Button>
					</Modal>
				</>
			) }
		</>
	);
};

PresetButton.propTypes = {
	setAttributes: Proptypes.func.isRequired,
	label: Proptypes.string.isRequired,
	presetData: Proptypes.object.isRequired,
};
PresetButton.defaultProps = {
	label: 'Purple',
	setAttributes: () => {},
	presetData: {},
};
export default PresetButton;
