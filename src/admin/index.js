import React from 'react';
import { createRoot } from 'react-dom/client';
import Settings from './settings';

const container = document.getElementById( 'dlx-pb-settings' );

if ( null !== container ) {
	const root = createRoot( container );
	root.render(
		<React.StrictMode>
			<Settings />
		</React.StrictMode>
	);
}
