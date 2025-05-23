/**
 * Upload data row including Upload|Media Library|URL|Data.
 */
import './editor.scss';

import {
	Button,
	Popover,
} from '@wordpress/components';

import { useState } from '@wordpress/element';

import { createBlock } from '@wordpress/blocks';

import { useSelect, useDispatch, select } from '@wordpress/data';

import { store as blockEditorStore } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import globalStylesStore from '../../../store/global-styles';
import { blockStore } from '../../../store/index';
import PhotoBlockPreview from './photo-block-preview';
import ErrorBoundary from '../../ErrorBoundary';
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
		getGlobalStyleBySlug,
	} = useSelect( ( newSelect ) => {
		return {
			getGlobalStyleBySlug: newSelect( globalStylesStore ).getGlobalStyleBySlug,
		};
	} );

	const {
		setHasCaption,
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
			<ErrorBoundary
				fallback={
					<p>
						{ __( 'An error occurred while trying to load the preview.', 'photo-block' ) }
					</p>
				}
			>
				<Button
					variant={ globalStyle === globalStyle?.slug ? 'primary' : 'secondary' }
					onClick={ () => {
						// Try to see if photo has caption.
						let hasCaption = false;
						if ( globalStyle.content?.photoAttributes?.hasCaption || attributes.hasCaption ) {
							setHasCaption( true );
							hasCaption = true;
						}
						const globalStyleObject = getGlobalStyleBySlug( globalStyle.slug );
						props.setAttributes( {
							...globalStyleObject.content.photoAttributes,
							globalStyle: globalStyle.slug,
							hasCaption,
							mediaLinkOverride: false,
							imageSizeOverride: false,
							imageSize: globalStyleObject.content?.photoAttributes?.imageSize || 'full',
							mediaLinkType: globalStyleObject.content?.photoAttributes?.mediaLinkType || 'none',
							mediaLinkTitle: globalStyleObject.content?.photoAttributes?.mediaLinkTitle || '',
							mediaLinkUrl: globalStyleObject.content?.photoAttributes?.mediaLinkUrl || '',
							lightboxCaption: globalStyleObject.content?.photoAttributes?.lightboxCaption || '',
							lightboxEnabled: globalStyleObject.content?.photoAttributes?.lightboxEnabled || false,
							lightboxShowCaption: globalStyleObject.content?.photoAttributes?.lightboxShowCaption || false,
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
						if ( ! captionBlock && ( Object.keys( globalStyle.content.captionAttributes ).length > 1 || globalStyle.content.captionAttributes.length > 1 ) ) {
							const newBlocks = createBlock( 'dlxplugins/photo-caption-block', captionAttributes );
							insertBlock( newBlocks, undefined, props.clientId );
							props.setAttributes( { hasCaption: true } );
						}

						// If there is a caption block and attributes to apply, apply them.
						if ( captionBlock && ( Object.keys( captionAttributes ).length > 1 || captionAttributes.length > 1 ) ) {
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
							<div className="dlx-photo-block__global-styles-image-popover-wrapper">
								<PhotoBlockPreview
									uniqueId={ attributes.uniqueId }
									globalStyle={ globalStyle.slug }
									photoAttributes={ globalStyle.content.photoAttributes }
									captionAttributes={ globalStyle.content.captionAttributes }
								/>
							</div>
						</Popover>
					)
				}
			</ErrorBoundary>
		</>

	);
};
export default GlobalStylesButtonPreview;
