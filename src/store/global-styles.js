
import { createReduxStore, register, select } from '@wordpress/data';
import { create } from 'filepond';
const DEFAULT_STATE = {
	globalStyles: photoBlock?.globalStyles || [],
};

const actions = {
	setGlobalStyle( globalStyle, slug ) {
		return {
			type: 'SET_GLOBAL_STYLE',
			globalStyle,
			slug,
		};
	},
	removeGlobalStyle( slug ) {
		return {
			type: 'REMOVE_GLOBAL_STYLE',
			slug,
		};
	}
};

const globalStylesStore = createReduxStore( 'dlxplugins/photo-block/global-styles', {
	reducer( state = DEFAULT_STATE, action ) {
		switch ( action.type ) {
			case 'SET_GLOBAL_STYLE':
				const slug = action.slug;

				// Global styles are stored in [slug] => attributes format.
				const globalStyles = {
					...state.globalStyles,
					[ slug ]: action.globalStyle,
				};
				return {
					...state,
					globalStyles,
				};
			case 'REMOVE_GLOBAL_STYLE':
				const newGlobalStyles = { ...state.globalStyles };
				delete newGlobalStyles[ action.slug ];
				return {
					...state,
					globalStyles: newGlobalStyles,
				};
			default:
				return state;
		}
	},
	actions,
	selectors: {
		getGlobalStyleBySlug( state, slug ) {
			return state.globalStyles[ slug ] || {};
		},
		getGlobalStyles( state ) {
			return state.globalStyles;
		},
	},
} );

register( globalStylesStore );

export default globalStylesStore;
