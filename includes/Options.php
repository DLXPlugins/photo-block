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
	 * Register the settings.
	 */
	public static function register_settings() {
		if ( ! self::$setting_registered ) {
			register_setting(
				'photo_block_options_group',
				self::$options_key,
				array(
					'type'              => 'string',
					'description'       => __( 'Config Photo Block options', 'photo-block' ),
					'sanitize_callback' => array( static::class, 'sanitize_options' ),
					'show_in_rest'      => true,
					'default'           => self::get_defaults(),
				)
			);
			self::$setting_registered = true;
		}
	}

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
		if ( false === $options || empty( $options ) || ! is_string( $options ) ) {
			$options = self::get_defaults();
		} else {
			$options_decoded = json_decode( $options, true );
			$options         = wp_parse_args( $options_decoded, self::get_defaults() );
		}
		if ( is_string( $options ) ) {
			$options = json_decode( $options, true );
		}
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
		$new_options = array();
		foreach ( $options as $index => $option_pair ) {
			// This ensures that we can process REST requests (indexed array) or standard update option (associative array).
			if ( is_array( $option_pair ) && is_numeric( $index ) ) {
				// Get array key.
				$key                 = sanitize_key( array_key_first( $option_pair ) );
				$value               = current( $option_pair );
				$new_options[ $key ] = $value;
			} else {
				if ( is_bool( $option_pair ) ) {
					$new_options[ $index ] = $option_pair ? 'true' : 'false';
				} else {
					$new_options[ $index ] = $option_pair;
				}
			}
		}

		// Get current options.
		$current_options = self::get_options();
		// Merge the current options with the new options.
		$options = wp_parse_args( $new_options, $current_options );

		// Remove any erronous values (values that are not flat).
		$options = array_filter(
			$options,
			function ( $value ) {
				return is_scalar( $value );
			}
		);

		// Sanitize the options.
		$options = Functions::sanitize_array_recursive( $options );
		$options = \wp_json_encode( $options );

		// Return the sanitized options.
		return $options;
	}

	/**
	 * Save options for the plugin.
	 *
	 * @param array $options array of options.
	 */
	public static function update_options( $options = array() ) {
		update_option( self::$options_key, $options );
	}

	/**
	 * Get the default options for Photo Block.
	 *
	 * @since 3.0.0
	 */
	private static function get_defaults() {
		$defaults = array(
			'hideCaptionAppender'                    => false,
			'screenshotOneAPIKey'                    => '',
			'screenshotOneAPIValid'                  => false,
			'screenshotOneDefaultImageFormat'        => 'jpg',
			'screenshotOneEnableAnimatedScreenshots' => false,
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
		$defaults = \wp_json_encode( $defaults );

		return $defaults;
	}
}
