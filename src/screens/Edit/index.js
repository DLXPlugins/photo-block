import './editor.scss';

import { useContext, useState, useEffect, forwardRef } from '@wordpress/element';
import { Spinner } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import UploaderContext from '../../contexts/UploaderContext';



const EditScreen = forwardRef( ( props, ref ) => {
	const { attributes, setAttributes } = props;
	const { photo } = attributes;
	const { url, id, width, height } = photo;
	const [ imageLoading, setImageLoading ] = useState( true );

	const { screen, setScreen, setInspectorControls } = useContext( UploaderContext );


	// Set the local inspector controls.
	const localInspectorControls = (
		<InspectorControls>
			Edit options here
		</InspectorControls>
	);

	/**
	 * Get inspector controls for the screen.
	 */
	useEffect( () => {
		if ( 'edit' === screen ) {
			setInspectorControls( localInspectorControls );
		}
	}, [ screen ] );

	return (
		<>
			<div className="dlx-photo-block__screen-edit">
				{
					imageLoading && (
						<div className="dlx-photo-block__screen-edit-spinner" style={ { minWidth: width, minHeight: height, maxWidth: '100%', maxHeight: '100%' } }><Spinner /></div>
					)
				}
				<img src={ url } width={ width } height={ height } alt="" onLoad={ () => {
					setImageLoading( false );
				}} ref={ ref } />
			</div>
		</>
	);
} );
export default EditScreen;
