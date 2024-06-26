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

import { useSelect, useDispatch } from '@wordpress/data';

import globalStylesStore from '../../../store/global-styles';
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

	const handlePopoverOpen = () => {
		setShowPopOver( true );
		buttonRef.focus();
	};

	const handlePopoverClose = () => {
		setShowPopOver( false );
	};

	console.log( 'button-preview', globalStyle );

	return (
		<>

			<Button
				variant={ globalStyle === globalStyle?.slug ? 'primary' : 'secondary' }
				onClick={ () => {
					props.setAttributes( {
						globalStyle: globalStyle.slug,
					} );
					props.attributes.globalStyle = globalStyle.slug;
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
