<?php
/**
 * Helper functions for the plugin.
 *
 * @package PhotoBlock
 */

namespace DLXPlugins\PhotoBlock;

/**
 * Class Functions
 */
class Functions {

	/**
	 * Checks if the plugin is on a multisite install.
	 *
	 * @since 1.0.0
	 *
	 * @param bool $network_admin Check if in network admin.
	 *
	 * @return true if multisite, false if not.
	 */
	public static function is_multisite( $network_admin = false ) {
		if ( ! function_exists( 'is_plugin_active_for_network' ) ) {
			require_once ABSPATH . '/wp-admin/includes/plugin.php';
		}
		$is_network_admin = false;
		if ( $network_admin ) {
			if ( is_network_admin() ) {
				if ( is_multisite() && is_plugin_active_for_network( self::get_plugin_slug() ) ) {
					return true;
				}
			} else {
				return false;
			}
		}
		if ( is_multisite() && is_plugin_active_for_network( self::get_plugin_slug() ) ) {
			return true;
		}
		return false;
	}

	/**
	 * Sanitize an attribute based on type.
	 *
	 * @param array  $attributes Array of attributes.
	 * @param string $attribute  The attribute to sanitize.
	 * @param string $type       The type of sanitization you need (values can be integer, text, float, boolean, url).
	 *
	 * @return mixed Sanitized attribute. wp_error on failure.
	 */
	public static function sanitize_attribute( $attributes, $attribute, $type = 'text' ) {
		if ( isset( $attributes[ $attribute ] ) ) {
			switch ( $type ) {
				case 'raw':
					return $attributes[ $attribute ];
				case 'post_text':
				case 'post':
					return wp_kses_post( $attributes[ $attribute ] );
				case 'string':
				case 'text':
					return sanitize_text_field( $attributes[ $attribute ] );
				case 'bool':
				case 'boolean':
					return filter_var( $attributes[ $attribute ], FILTER_VALIDATE_BOOLEAN );
				case 'int':
				case 'integer':
					return absint( $attributes[ $attribute ] );
				case 'float':
					if ( is_float( $attributes[ $attribute ] ) ) {
						return $attributes[ $attribute ];
					}
					return 0;
				case 'url':
					return esc_url( $attributes[ $attribute ] );
				case 'default':
					return new \WP_Error( 'photo_block_unknown_type', __( 'Unknown type.', 'highlight-and-share' ) );
			}
		}
		return new \WP_Error( 'photo_block_attribute_not_found', __( 'Attribute not found.', 'highlight-and-share' ) );
	}

	/**
	 * Checks to see if an asset is activated or not.
	 *
	 * @since 1.0.0
	 *
	 * @param string $path Path to the asset.
	 * @param string $type Type to check if it is activated or not.
	 *
	 * @return bool true if activated, false if not.
	 */
	public static function is_activated( $path, $type = 'plugin' ) {

		// Gets all active plugins on the current site.
		$active_plugins = self::is_multisite() ? get_site_option( 'active_sitewide_plugins' ) : get_option( 'active_plugins', array() );
		if ( in_array( $path, $active_plugins, true ) ) {
			return true;
		}
		return false;
	}

	/**
	 * Get the plugin's supported mime types.
	 *
	 * @since 1.0.0
	 *
	 * @return array The supported mime types.
	 */
	public static function get_supported_mime_types() {
		$valid_mime_types = array(
			'image/jpeg',
			'image/png',
			'image/gif',
			'image/webp',
		);
		/**
		 * Filter the valid mime types for the photo block.
		 *
		 * @param array $valid_mime_types The valid mime types.
		 */
		$valid_mime_types = apply_filters( 'photo_block_valid_mime_types', $valid_mime_types );

		return $valid_mime_types;
	}

	/**
	 * Get all the registered image sizes along with their dimensions
	 *
	 * @global array $_wp_additional_image_sizes
	 *
	 * @link http://core.trac.wordpress.org/ticket/18947 Reference ticket
	 *
	 * @return array $image_sizes The image sizes
	 */
	public static function get_all_image_sizes() {
		global $_wp_additional_image_sizes;

		$default_image_sizes = get_intermediate_image_sizes();

		$image_sizes = array();
		foreach ( $default_image_sizes as $size ) {
			$image_sizes[ $size ]['label']  = ucfirst( str_replace( array( '-', '_' ), ' ', $size ) );
			$image_sizes[ $size ]['width']  = intval( get_option( "{$size}_size_w" ) );
			$image_sizes[ $size ]['height'] = intval( get_option( "{$size}_size_h" ) );
			$image_sizes[ $size ]['crop']   = get_option( "{$size}_crop" ) ? get_option( "{$size}_crop" ) : false;
		}

		if ( isset( $_wp_additional_image_sizes ) && count( $_wp_additional_image_sizes ) ) {
			foreach ( $_wp_additional_image_sizes as $size => $image_size ) {
				$image_sizes[ $size ]['label']  = ucfirst( str_replace( array( '-', '_' ), ' ', $size ) );
				$image_sizes[ $size ]['width']  = intval( $image_size['width'] );
				$image_sizes[ $size ]['height'] = intval( $image_size['height'] );
				$image_sizes[ $size ]['crop']   = $image_size['crop'] ? $image_size['crop'] : false;
			}
		}

		$image_sizes['full'] = array(
			'label'  => _x( 'Full', 'Full image size', 'photo-block' ),
			'width'  => 0,
			'height' => 0,
			'crop'   => false,
		);

		return $image_sizes;
	}

	/**
	 * Get the plugin's supported file extensions.
	 *
	 * @since 1.0.0
	 *
	 * @return array The supported file extensions.
	 */
	public static function get_supported_file_extensions() {
		$file_extensions = array(
			'jpeg',
			'jpg',
			'gif',
			'png',
			'webp',
		);
		/**
		 * Filter the valid file extensions for the photo block.
		 *
		 * @param array $file_extensions The valid mime types.
		 */
		$file_extensions = apply_filters( 'photo_block_file_extensions', $file_extensions );

		return $file_extensions;
	}

	/**
	 * Array data that must be sanitized.
	 *
	 * @param array $data Data to be sanitized.
	 *
	 * @return array Sanitized data.
	 */
	public static function sanitize_array_recursive( array $data ) {
		$sanitized_data = array();
		foreach ( $data as $key => $value ) {
			if ( '0' === $value ) {
				$value = 0;
			}
			if ( 'true' === $value ) {
				$value = true;
			} elseif ( 'false' === $value ) {
				$value = false;
			}
			if ( is_array( $value ) ) {
				$value                  = self::sanitize_array_recursive( $value );
				$sanitized_data[ $key ] = $value;
				continue;
			}
			if ( is_bool( $value ) ) {
				$sanitized_data[ $key ] = (bool) $value;
				continue;
			}
			if ( is_int( $value ) ) {
				$sanitized_data[ $key ] = (int) $value;
				continue;
			}
			if ( is_string( $value ) ) {
				$sanitized_data[ $key ] = sanitize_text_field( $value );
				continue;
			}
		}
		return $sanitized_data;
	}

	/**
	 * Retrieve the image data for a given attachment ID.
	 *
	 * @param int    $attachment_id The attachment ID.
	 * @param string $size          The image size.
	 *
	 * @return array {
	 *    @type string $url The image URL.
	 *    @type int $width The image width.
	 *    @type int $height The image height.
	 *    @type string $alt The image alt text.
	 *    @type string $full The link to the full image.
	 *    @type string $attachment_link The link to the attachment page.
	 * }
	 */
	public static function get_image_data( $attachment_id, $size = 'full' ) {

		// Get requested size.
		$image_attachment = wp_get_attachment_image_src( $attachment_id, $size );
		if ( ! $image_attachment ) {
			return array();
		}
		$full_image_attachment = wp_get_attachment_image_src( $attachment_id, 'full' );

		$return = array(
			'url'             => $image_attachment[0],
			'width'           => $image_attachment[1],
			'height'          => $image_attachment[2],
			'alt'             => get_post_meta( $attachment_id, '_wp_attachment_image_alt', true ),
			'full'            => $full_image_attachment[0],
			'attachment_link' => get_attachment_link( $attachment_id ),
		);

		return $return;
	}

	/**
	 * Retrieve an image ID from a custom field value.
	 *
	 * @param int|Object|Array $custom_field_value The custom field value.
	 *
	 * @return int|string|WP_Error The image ID or WP_Error if not found.
	 */
	public static function get_image_id_or_url_from_custom_field( $custom_field_value ) {
		// Check for numeric.
		if ( is_numeric( $custom_field_value ) ) {
			return absint( $custom_field_value );
		}

		// Check for string value.
		if ( is_string( $custom_field_value ) ) {
			// Check for URL.
			if ( filter_var( $custom_field_value, FILTER_VALIDATE_URL ) ) {
				return $custom_field_value;
			}
		}

		// Check for object.
		if ( is_object( $custom_field_value ) ) {
			if ( isset( $custom_field_value->ID ) ) {
				return absint( $custom_field_value->ID );
			}
			if ( isset( $custom_field_value->id ) ) {
				return absint( $custom_field_value->id );
			}
			if ( isset( $custom_field_value->url ) ) {
				return absint( $custom_field_value->url );
			}
		}

		// Check for array.
		if ( is_array( $custom_field_value ) ) {
			if ( isset( $custom_field_value['ID'] ) ) {
				return absint( $custom_field_value['ID'] );
			}
			if ( isset( $custom_field_value['id'] ) ) {
				return absint( $custom_field_value['id'] );
			}
			if ( isset( $custom_field_value['url'] ) ) {
				return $custom_field_value['url'];
			}
		}

		return new \WP_Error( 'invalid_custom_field_value', __( 'Invalid custom field value.', 'photo-block' ) );
	}

	/**
	 * Get an image from post meta.
	 *
	 * @param string $size       The image size.
	 * @param string $meta_field The meta field to query.
	 * @param int    $post_id    The post to retrieve data for.
	 *
	 * @return string|boolean Image URL or false if not found.
	 */
	public static function get_post_image( $size = 'large', $meta_field = '', $post_id = 0 ) {

		$image_id_or_url = false;
		// Let's check regular post meta for the image first. This also includes Pods support.
		$maybe_custom_field_result = get_post_meta( $post_id, $meta_field, true );
		if ( $maybe_custom_field_result ) {
			// Check if object, and if so, try to get image ID.
			$maybe_image_id_or_url = self::get_image_id_or_url_from_custom_field( $maybe_custom_field_result );
			if ( ! is_wp_error( $maybe_image_id_or_url ) ) {
				$image_id_or_url = $maybe_image_id_or_url;
			}
		}

		// If image id is still blank, try ACF.
		if ( ! $image_id_or_url && function_exists( 'get_field' ) ) {
			$acf_value = \get_field( $meta_field, $post_id );
			if ( $acf_value ) {
				$maybe_image_id_or_url = self::get_image_id_or_url_from_custom_field( $acf_value );
				if ( ! is_wp_error( $maybe_image_id_or_url ) ) {
					$image_id_or_url = $maybe_image_id_or_url;
				}
			}
		}

		// Now return the image if set.
		if ( $image_id_or_url && is_numeric( $image_id_or_url ) ) {
			return self::get_image_data( $image_id_or_url, $size );
		} elseif ( $image_id_or_url && is_string( $image_id_or_url ) ) {
			return $image_id_or_url;
		}
		return false;
	}

	/**
	 * Retrieve a theme's color palette.
	 *
	 * @return array {
	 *   @type string $name  The color name.
	 *   @type string $slug  The color slug.
	 *   @type string $color The color hex value.
	 * }
	 */
	public static function get_theme_color_palette() {
		$color_palette = array();
		$settings      = \WP_Theme_JSON_Resolver::get_theme_data()->get_settings();
		if ( isset( $settings['color']['palette']['theme'] ) ) {
			$color_palette = $settings['color']['palette']['theme'];
		}

		// If empty color palette, try to get from theme supports.
		if ( empty( $color_palette ) ) {
			$color_palette = get_theme_support( 'editor-color-palette' );
			if ( ! empty( $color_palette ) ) {
				$color_palette = $color_palette[0];
			}
		}

		/**
		 * Filter the color palette used by the plugin.
		 *
		 * @param array $color_palette {
		 *   @type string $name  The color name.
		 *   @type string $slug  The color slug.
		 *   @type string $color The color hex value.
		 * }
		 */
		$color_palette = apply_filters( 'photo_block_color_palette', $color_palette );
		return $color_palette;
	}

	/**
	 * Take a _ separated field and convert to camelcase.
	 *
	 * @param string $field Field to convert to camelcase.
	 *
	 * @return string camelCased field.
	 */
	public static function to_camelcase( string $field ) {
		return str_replace( '_', '', lcfirst( ucwords( $field, '_' ) ) );
	}

	/**
	 * Take a camelcase field and converts it to underline case.
	 *
	 * @param string $field Field to convert to camelcase.
	 *
	 * @return string $field Field name in camelCase..
	 */
	public static function to_underlines( string $field ) {
		$field = strtolower( preg_replace( '/([a-z])([A-Z])/', '$1_$2', $field ) );
		return $field;
	}

	/**
	 * Return the plugin slug.
	 *
	 * @return string plugin slug.
	 */
	public static function get_plugin_slug() {
		return dirname( plugin_basename( PHOTO_BLOCK_FILE ) );
	}

	/**
	 * Return the basefile for the plugin.
	 *
	 * @return string base file for the plugin.
	 */
	public static function get_plugin_file() {
		return plugin_basename( PHOTO_BLOCK_FILE );
	}

	/**
	 * Return the version for the plugin.
	 *
	 * @return float version for the plugin.
	 */
	public static function get_plugin_version() {
		return PHOTO_BLOCK_VERSION;
	}

	/**
	 * Retrieve the plugin URI.
	 */
	public static function get_plugin_uri() {
		/**
		 * Filer the output of the plugin URI.
		 *
		 * Potentially change branding of the plugin.
		 *
		 * @since 1.0.0
		 *
		 * @param string Plugin URI.
		 */
		return apply_filters( 'photo_block_plugin_uri', 'https://dlxplugins.com/plugins/photo-block/' );
	}

	/**
	 * Retrieve the plugin support URI.
	 */
	public static function get_plugin_support_uri() {
		/**
		 * Filer the output of the plugin support URI.
		 *
		 * Potentially change branding of the plugin.
		 *
		 * @since 1.0.0
		 *
		 * @param string Plugin Support URI.
		 */
		return apply_filters( 'photo_block_plugin_support_uri', 'https://dlxplugins.com/support/' );
	}

	/**
	 * Retrieve the plugin documentation URI.
	 */
	public static function get_plugin_docs_uri() {
		/**
		 * Filer the output of the plugin docs URI.
		 *
		 * Potentially change branding of the plugin.
		 *
		 * @since 1.0.0
		 *
		 * @param string Plugin Docs URI.
		 */
		return apply_filters( 'photo_block_plugin_docs_uri', 'https://photoblock.dlxplugins.com/' );
	}

	/**
	 * Returns appropriate html for KSES.
	 *
	 * @param bool $svg         Whether to add SVG data to KSES.
	 * @param bool $with_tables Whether to add tables to KSES.
	 */
	public static function get_kses_allowed_html( $svg = true, $with_tables = false ) {
		$allowed_tags = wp_kses_allowed_html( 'post' );

		$allowed_tags['nav']        = array(
			'class' => array(),
		);
		$allowed_tags['a']['class'] = array();

		// Add form input fields.
		$allowed_tags['input'] = array(
			'type'        => array(),
			'class'       => array(),
			'id'          => array(),
			'name'        => array(),
			'value'       => array(),
			'placeholder' => array(),
			'required'    => array(),
			'checked'     => array(),
		);

		// Add button fields.
		$allowed_tags['button'] = array(
			'type'      => array(),
			'class'     => array(),
			'id'        => array(),
			'name'      => array(),
			'data-type' => array(),
		);

		// Add select field.
		$allowed_tags['select'] = array(
			'class' => array(),
			'id'    => array(),
			'name'  => array(),
		);

		// Add options field.
		$allowed_tags['option'] = array(
			'value'    => array(),
			'selected' => array(),
		);

		if ( ! $svg && ! $with_tables ) {
			return $allowed_tags;
		}
		if ( $svg ) {
			$allowed_tags['svg'] = array(
				'xmlns'       => array(),
				'fill'        => array(),
				'viewbox'     => array(),
				'role'        => array(),
				'aria-hidden' => array(),
				'focusable'   => array(),
				'class'       => array(),
				'width'       => array(),
				'height'      => array(),
			);

			$allowed_tags['path'] = array(
				'd'       => array(),
				'fill'    => array(),
				'opacity' => array(),
			);

			$allowed_tags['g'] = array();

			$allowed_tags['circle'] = array(
				'cx'     => array(),
				'cy'     => array(),
				'r'      => array(),
				'fill'   => array(),
				'stroke' => array(),
			);

			$allowed_tags['use'] = array(
				'xlink:href' => array(),
			);

			$allowed_tags['symbol'] = array(
				'aria-hidden' => array(),
				'viewBox'     => array(),
				'id'          => array(),
				'xmls'        => array(),
			);
		}

		// Add HTML table markup.
		if ( $with_tables ) {
			$allowed_tags['html']  = array(
				'lang' => array(),
			);
			$allowed_tags['head']  = array();
			$allowed_tags['title'] = array();
			$allowed_tags['meta']  = array(
				'http-equiv' => array(),
				'content'    => array(),
				'name'       => array(),
			);
			$allowed_tags['body']  = array(
				'style' => array(),
			);
			$allowed_tags['style'] = array();
			$allowed_tags['table'] = array(
				'class'        => array(),
				'width'        => array(),
				'border'       => array(),
				'cellpadding'  => array(),
				'cellspacing'  => array(),
				'role'         => array(),
				'presentation' => array(),
				'align'        => array(),
				'bgcolor'      => array(),
			);
			$allowed_tags['tbody'] = array();
			$allowed_tags['thead'] = array();
			$allowed_tags['tr']    = array(
				'bgcolor' => array(),
				'align'   => array(),
				'style'   => array(),
			);
			$allowed_tags['th']    = array();
			$allowed_tags['td']    = array(
				'class' => array(),
				'width' => array(),
				'style' => array(),
			);
			if ( ! isset( $allowed_tags['div'] ) ) {
				$allowed_tags['div'] = array(
					'style' => array(),
					'align' => array(),
					'class' => array(),
				);
			} else {
				$allowed_tags['div']['style'] = array();
				$allowed_tags['div']['align'] = array();
				$allowed_tags['div']['class'] = array();
			}
			if ( ! isset( $allowed_tags['p'] ) ) {
				$allowed_tags['p'] = array(
					'style' => array(),
				);
			} else {
				$allowed_tags['p']['style'] = array();
			}
			$allowed_tags['h1'] = array(
				'style' => array(),
			);
			$allowed_tags['h2'] = array(
				'style' => array(),
			);
		}

		return $allowed_tags;
	}

	/**
	 * Get the plugin directory for a path.
	 *
	 * @param string $path The path to the file.
	 *
	 * @return string The new path.
	 */
	public static function get_plugin_dir( $path = '' ) {
		$dir = rtrim( plugin_dir_path( PHOTO_BLOCK_FILE ), '/' );
		if ( ! empty( $path ) && is_string( $path ) ) {
			$dir .= '/' . ltrim( $path, '/' );
		}
		return $dir;
	}

	/**
	 * Return a plugin URL path.
	 *
	 * @param string $path Path to the file.
	 *
	 * @return string URL to to the file.
	 */
	public static function get_plugin_url( $path = '' ) {
		$dir = rtrim( plugin_dir_url( PHOTO_BLOCK_FILE ), '/' );
		if ( ! empty( $path ) && is_string( $path ) ) {
			$dir .= '/' . ltrim( $path, '/' );
		}
		return $dir;
	}

	/**
	 * Gets the highest priority for a filter.
	 *
	 * @param int $subtract The amount to subtract from the high priority.
	 *
	 * @return int priority.
	 */
	public static function get_highest_priority( $subtract = 0 ) {
		$highest_priority = PHP_INT_MAX;
		$subtract         = absint( $subtract );
		if ( 0 === $subtract ) {
			--$highest_priority;
		} else {
			$highest_priority = absint( $highest_priority - $subtract );
		}
		return $highest_priority;
	}
}

