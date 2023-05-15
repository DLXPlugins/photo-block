/**
 * PanelBody but with local storage state.
 */
import './editor.scss';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { PanelBody } from '@wordpress/components';
import useDeviceType from '../../hooks/useDeviceType';

const PanelBodyControl = ( props ) => {
	const { uniqueId, initialOpen = true, id = '' } = props;

	const [ isPanelOpen, setIsPanelOpen ] = useState( initialOpen );

	const [ deviceType ] = useDeviceType();

	// Set up use effect to read in local storage and set panels appropriately. Runs on device type change too.
	useEffect( () => {
		const stored = localStorage.getItem( `photo-block-panel-body-${ uniqueId }` );

		// Retrieve ID from local storage if set.
		if ( stored ) {
			const storedValue = JSON.parse( stored );
			if ( storedValue[ `${ id }` ] ) {
				const { isOpen } = storedValue[ `${ id }` ];
				setIsPanelOpen( isOpen );
			}
		}
	}, [ deviceType ] );

	return (
		<PanelBody
			{ ...props }
			onToggle={ ( next ) => {
				// get local storage value.
				const stored = localStorage.getItem( `photo-block-panel-body-${ uniqueId }` );

				let storageValueToSave = {
					[ `${ id }` ]: {
						isOpen: next,
					},
				};
				if ( stored ) {
					const storedValue = JSON.parse( stored );
					storageValueToSave = {
						...storedValue,
						[ `${ id }` ]: {
							isOpen: next,
						},
					};
				}

				localStorage.setItem( `photo-block-panel-body-${ uniqueId }`, JSON.stringify( storageValueToSave ) );
			} }
			initialOpen={ isPanelOpen }
		>
			{ props.children }
		</PanelBody>
	);
};

PanelBodyControl.defaultProps = {
	uniqueId: '',
	initialOpen: true,
	id: '',
};

PanelBodyControl.propTypes = {
	uniqueId: PropTypes.string.isRequired,
	initialOpen: PropTypes.bool,
	id: PropTypes.string.isRequired,
};

export default PanelBodyControl;
