import './editor.scss';
import React, { useState } from 'react';
import GlobalStylesContext from './context';
import GlobalStylesContainer from './GlobalStylesContainer';

const GlobalStyles = ( props ) => {
	const [ savedPresets, setSavedPresets ] = useState( [] );
	const [ savingPreset, setSavingPreset ] = useState( false );
	const [ editPresets, setEditPresets ] = useState( false );
	const [ showEditModal, setShowEditModal ] = useState( false );
	const [ showDeleteModal, setShowDeleteModal ] = useState( false );
	const [ defaultPreset, setDefaultPreset ] = useState( null );

	return (
		<GlobalStylesContext.Provider
			value={ {
				savedPresets,
				setSavedPresets,
				savingPreset,
				setSavingPreset,
				editPresets,
				setEditPresets,
				showEditModal,
				setShowEditModal,
				showDeleteModal,
				setShowDeleteModal,
				defaultPreset,
				setDefaultPreset,
			} }
		>
			<GlobalStylesContainer { ...props } />
		</GlobalStylesContext.Provider>
	);
};

export default GlobalStyles;
