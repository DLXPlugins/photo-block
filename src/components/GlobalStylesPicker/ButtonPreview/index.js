/**
 * Upload data row including Upload|Media Library|URL|Data.
 */
import './editor.scss';

import {
	Button,
	Popover,
} from '@wordpress/components';

import { useContext, useState, useEffect } from '@wordpress/element';

import { createBlock } from '@wordpress/blocks';

import classnames from 'classnames';

import { useSelect, useDispatch, select } from '@wordpress/data';

import { store as blockEditorStore } from '@wordpress/block-editor';

import { blockStore } from '../../../store/index';
import PhotoBlockPreview from './photo-block-preview';
/**
 * CSSGramButtonGroup component.
 *
 * @param {Object} props - Component props.
 * @return {Function} Component.
 */
const GlobalStylesButtonPreview = ( props ) => {
	const { attributes, globalStyle } = props;

	const [ buttonRef, setButtonRef ] = useState( null );
	const [ showPopOver, setShowPopOver ] = useState( false );
	const [ blockPreview, setBlockPreview ] = useState( null );

	const {
		setHasCaption
	} = useDispatch( blockStore( props.attributes.uniqueId ? props.attributes.uniqueId : null ) );

	const {
		insertBlock,
		updateBlockAttributes,
	} = useDispatch( blockEditorStore );
	const handlePopoverOpen = () => {
		setShowPopOver( true );
		buttonRef.focus();
	};

	const handlePopoverClose = () => {
		setShowPopOver( false );
	};

	return (
		<>

			<Button
				variant={ globalStyle === globalStyle?.slug ? 'primary' : 'secondary' }
				onClick={ () => {
					// Try to see if photo has caption.
					let hasCaption = false;
					if ( globalStyle.content?.photoAttributes?.hasCaption ) {
						setHasCaption( true );
						hasCaption = true;
					}
					props.setAttributes( {
						globalStyle: globalStyle.slug,
						hasCaption,
					} );

					// Try to get children of the block (caption).
					const children = select( 'core/block-editor' ).getBlocksByClientId( props.clientId )[ 0 ]?.innerBlocks || [];

					// Get any exising caption blocks.
					const captionBlock = children.find( ( block ) => 'dlxplugins/photo-caption-block' === block.name );

					// Get unique ID for the photo block.
					const uniqueIdAttribute = props.attributes.uniqueId;
					const captionAttributes = {
						...globalStyle.content.captionAttributes,
						...{ globalStyle: globalStyle.slug },
					};

					// If there is no caption block, but there are attributes to apply, create one.
					if ( ! captionBlock && captionAttributes.length > 0 ) {
						const newBlocks = createBlock( 'dlxplugins/photo-caption-block', captionAttributes );
						insertBlock( newBlocks, undefined, props.clientId );
						props.setAttributes( { hasCaption: true } );
					}

					// If there is a caption block and attributes to apply, apply them.
					if ( captionBlock && captionAttributes ) {
						const captionBlockAttributes = { ...captionAttributes, ...uniqueIdAttribute };
						updateBlockAttributes( captionBlock.clientId, captionBlockAttributes );
					}
				} }
				onMouseEnter={ () => handlePopoverOpen( true ) }
				onMouseLeave={ () => handlePopoverClose( false ) }
				ref={ setButtonRef }
			>
				{ globalStyle.title }
			</Button>
			{
				showPopOver && (
					<Popover
						className="dlx-photo-block__global-styles-image-popover"
						placement="left-start"
						anchor={ buttonRef }
						onClose={ () => {
							setShowPopOver( false );
						} }
						offset={ 10 }
						noArrow={ false }
					>
						<div className="dlx-photo-block__css-gram-image-popover-wrapper">
							<PhotoBlockPreview
								uniqueId={ attributes.uniqueId }
								photoAttributes={ globalStyle.content.photoAttributes }
								captionAttributes={ globalStyle.content.captionAttributes }
							/>
						</div>
					</Popover>
				)
			}
		</>
	);
};
export default GlobalStylesButtonPreview;
