import './editor.scss';

import { useContext, useState, useEffect, forwardRef } from '@wordpress/element';
import { Spinner } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import UploaderContext from '../../contexts/UploaderContext';



const DataScreen = forwardRef( ( props, ref ) => {
	const { attributes, setAttributes } = props;
	const { photo } = attributes;
	const { url, id, width, height } = photo;

	const { screen, setScreen, setInspectorControls } = useContext( UploaderContext );


	// Set the local inspector controls.
	const localInspectorControls = (
		<InspectorControls>
			Data options here
		</InspectorControls>
	);

	/**
	 * Get inspector controls for the screen.
	 */
	useEffect( () => {
		if ( 'data' === screen ) {
			setInspectorControls( localInspectorControls );
		}
	}, [ screen ] );

	return (
		<>
			<div className="dlx-photo-block__screen-data">
				data stuff here.
			</div>
		</>
	);
} );
export default DataScreen;
