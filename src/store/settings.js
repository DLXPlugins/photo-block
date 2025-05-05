
import { createReduxStore, register } from '@wordpress/data';
const DEFAULT_STATE = {
	hideCaptionAppender: photoBlock.settings.hideCaptionAppender,
	screenshotOneEnabled: photoBlock.settings.screenshotOneEnabled,
	screenshotOneAPIValid: photoBlock.settings.screenshotOneAPIValid,
	screenshotOneEnableSignedRequests: photoBlock.settings.screenshotOneEnableSignedRequests,
	screenshotOneDefaultImageFormat: photoBlock.settings.screenshotOneDefaultImageFormat,
	screenshotOneEnableAnimatedScreenshots: photoBlock.settings.screenshotOneEnableAnimatedScreenshots,
	screenshotOneTotalLimit: photoBlock.settings.screenshotOneTotalLimit,
	screenshotOneAvailableRequests: photoBlock.settings.screenshotOneAvailableRequests,
	screenshotOneMaxImageWidth: photoBlock.settings.screenshotOneMaxImageWidth,
	screenshotOneMaxImageHeight: photoBlock.settings.screenshotOneMaxImageHeight,
	screenshotOneViewportWidth: photoBlock.settings.screenshotOneViewportWidth,
	screenshotOneViewportHeight: photoBlock.settings.screenshotOneViewportHeight,
	screenshotOneBlockCookieBanners: photoBlock.settings.screenshotOneBlockCookieBanners,
	screenshotOneBlockAds: photoBlock.settings.screenshotOneBlockAds,
	screenshotOneIgnoreHostErrors: photoBlock.settings.screenshotOneIgnoreHostErrors,
};
const actions = {
	/**
	 * Set the settings in the settings store.
	 *
	 * @param {Object} settings The settings to set.
	 * @return {Object} The action object.
	 */
	setSettings( settings ) {
		return {
			type: 'SET_SETTINGS',
			settings,
		};
	},
};

const settingsStore = createReduxStore( 'dlxplugins/photo-block/settings', {
	reducer( state = DEFAULT_STATE, action ) {
		switch ( action.type ) {
			case 'SET_SETTINGS':
				return {
					...state,
					...action.settings,
				};
			default:
				return state;
		}
	},
	actions,
	selectors: {
		/**
		 * Get all settings from the settings store.
		 *
		 * @param {Object} state The current state of the settings store.
		 * @return {Object} The current state of the settings store.
		 */
		getSettings( state ) {
			return state;
		},
		/**
		 * Get a setting from the settings store.
		 *
		 * @param {Object} state The current state of the settings store.
		 * @param {string} key   The key of the setting to get.
		 * @return {any} The value of the setting, or null if the setting does not exist.
		 */
		getSetting( state, key ) {
			if ( state.hasOwnProperty( key ) ) {
				return state[ key ];
			}
			return null;
		},
		/**
		 * Check if screenshot one is enabled by checking if the API is valid and the setting is enabled.
		 *
		 * @param {Object} state The current state of the settings store.
		 * @return {boolean} True if screenshot one is enabled, false otherwise.
		 */
		isScreenshotOneEnabled( state ) {
			return state.screenshotOneAPIValid && state.screenshotOneEnabled;
		},
	},
} );

register( settingsStore );

export default settingsStore;
