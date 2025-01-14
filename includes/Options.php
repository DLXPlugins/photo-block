<?php
/**
 * Plugin Options.
 *
 * @package PhotoBlock
 */

namespace DLXPlugins\PhotoBlock;

/**
 * Class Options
 */
class Options {

	/**
	 * The options key.
	 *
	 * @var string $options_key
	 */
	private static $options_key = 'photo_block_options';

	/**
	 * A list of options cached for saving.
	 *
	 * @var array $options
	 */
	private static $options = array();

	/**
	 * A flag to check if the settings have been registered.
	 *
	 * @var bool $setting_registered
	 */
	private static $setting_registered = false;

	/**
	 * Get the options for Photo Block.
	 *
	 * @since 3.0.0
	 *
	 * @param bool   $force true to retrieve options directly, false to use cached version.
	 * @param string $key The option key to retrieve.
	 *
	 * @return string|array|bool Return a string if key is set, array of options (default), or false if key is set and option is not found.
	 */
	public static function get_options( $force = false, $key = '' ) {
		$options = self::$options;
		if ( ! is_array( $options ) || empty( $options ) || true === $force ) {
			$options = get_option( self::$options_key, array() );
		}
		if ( false === $options || empty( $options ) ) {
			$options = self::get_defaults();
		} else {
			$options = wp_parse_args( $options, self::get_defaults() );
		}
		$options       = Functions::sanitize_array_recursive( $options );
		self::$options = $options;

		// Return a key if set.
		if ( ! empty( $key ) ) {
			if ( isset( $options[ $key ] ) ) {
				return $options[ $key ];
			} else {
				return false;
			}
		}

		return self::$options;
	}

	/**
	 * Sanitize the options.
	 *
	 * @param string $options JSON encoded string of associative array options.
	 */
	public static function sanitize_options( $options = array() ) {

		if ( ! is_array( $options ) ) {
			$options = json_decode( $options, true );
		}

		// Get into option format.
		$options = Functions::sanitize_array_recursive( $options );

		// Get current options.
		$current_options = self::get_options();
		// Merge the current options with the new options.
		$options = wp_parse_args( $options, $current_options );

		// Remove any erronous values (values that are not flat).
		$options = array_filter(
			$options,
			function ( $value ) {
				return is_scalar( $value );
			}
		);

		// Return the sanitized options.
		return $options;
	}

	/**
	 * Save options for the plugin.
	 *
	 * @param array $options array of options.
	 */
	public static function update_options( $options = array() ) {
		$options       = self::sanitize_options( $options );
		self::$options = $options;
		update_option( self::$options_key, $options );
	}

	/**
	 * Get the default options for Photo Block.
	 *
	 * @since 3.0.0
	 */
	public static function get_defaults() {
		$defaults = array(
			'hideCaptionAppender'                    => false,
			'screenshotOneEnabled'                   => false,
			'screenshotOneAccessKey'                 => '',
			'screenshotOneSecretKey'                 => '',
			'screenshotOneAPIValid'                  => false,
			'screenshotOneEnableSignedRequests'      => false,
			'screenshotOneDefaultImageFormat'        => 'jpg',
			'screenshotOneEnableAnimatedScreenshots' => false,
			'screenshotOneTotalLimit'                => 0,
			'screenshotOneAvailableRequests'         => 0,
			'screenshotOneMaxImageWidth'             => 1400,
			'screenshotOneMaxImageHeight'            => 1200,
			'screenshotOneViewportWidth'             => 1200,
			'screenshotOneViewportHeight'            => 1024,
			'screenshotOneBlockCookieBanners'        => true,
		);

		/**
		 * Allow other plugins to add to the defaults.
		 *
		 * @since 1.1.0
		 *
		 * @param array $defaults An array of option defaults.
		 */
		$defaults = apply_filters( 'photo_block_options_defaults', $defaults );

		$defaults = Functions::sanitize_array_recursive( $defaults );

		return $defaults;
	}
}
