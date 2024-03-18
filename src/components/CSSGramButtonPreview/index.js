/**
 * Upload data row including Upload|Media Library|URL|Data.
 */
import './editor.scss';

import {
	Button,
	Popover,
} from '@wordpress/components';

import { useContext, useState, useEffect } from '@wordpress/element';

import classnames from 'classnames';

import UploaderContext from '../../contexts/UploaderContext';

/**
 * CSSGramButtonGroup component.
 *
 * @param {Object} props - Component props.
 * @return {Function} Component.
 */
const CSSGramButtonPreview = ( props ) => {
	const { filter, label, isSelected, fullUrl, photo } = props;

	// Get context.
	const {
	} = useContext( UploaderContext );

	const [ buttonRef, setButtonRef ] = useState( null );
	const [ showPopOver, setShowPopOver ] = useState( false );

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
				variant={ isSelected ? 'primary' : 'secondary' }
				onClick={ () => props.onClick( filter ) }
				onMouseEnter={ () => handlePopoverOpen( true ) }
				onMouseLeave={ () => handlePopoverClose( false ) }
				ref={ setButtonRef }
			>
				{ label }
			</Button>
			{
				showPopOver && (
					<Popover
						className="dlx-photo-block__css-gram-image-popover"
						placement="left-start"
						anchor={ buttonRef }
						onClose={ () => {
							setShowPopOver( false );
						} }
						offset={ 10 }
						noArrow={ false }
					>
						<div className="dlx-photo-block__css-gram-image-popover-wrapper">
							<img
								src={ fullUrl }
								className={ classnames(
									`photo-block-${ filter }`,
									{
										'has-css-gram': filter !== 'none',
									}
								) }
								width={ photo.width }
								height={ photo.height }
								style={ { maxWidth: '100%', height: 'auto' } }
								alt=""
							/>
						</div>
					</Popover>
				)
			}
		</>
	);
};
export default CSSGramButtonPreview;
