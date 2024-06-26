import './editor.scss';
import React, { useState } from 'react';
import { useSelect, useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	PanelRow
} from '@wordpress/components';
import globalStylesStore from '../../store/global-styles';
import GlobalStylesButtonPreview from './ButtonPreview';

const GlobalStylesPicker = ( props ) => {
	const { globalStyles } = useSelect( ( select ) => {
		return {
			globalStyles: select( globalStylesStore ).getGlobalStyles(),
		};
	} );

	// Exit if no global styles.
	if ( Object.keys( globalStyles ).length === 0 ) {
		return null;
	}
	console.log( 'global-styles-picker', globalStyles );
	return (
		<>
			<PanelBody
				title={ __( 'Global Styles' ) }
				initialOpen={ true }
			>
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
			</PanelBody>
		</>
	);
};

export default GlobalStylesPicker;
