
import { createReduxStore, register } from '@wordpress/data';
const DEFAULT_STATE = {
	globalStyles: photoBlock?.globalStyles || [],
	globalStyleRefresh: null,
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
	},
	setGlobalStyleRefresh( refresh ) {
		return {
			type: 'SET_GLOBAL_STYLE_REFRESH',
			refresh,
		};
	},
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
			case 'SET_GLOBAL_STYLE_REFRESH':
				return {
					...state,
					globalStyleRefresh: action.refresh,
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
		hasGlobalStyle( state, slug ) {
			if ( 'none' === slug || ! slug ) {
				return false;
			}
			return Object.keys( state.globalStyles ).includes( slug );
		},
		getGlobalStyleRefresh( state ) {
			return state.globalStyleRefresh;
		},
	},
} );

register( globalStylesStore );

export default globalStylesStore;
