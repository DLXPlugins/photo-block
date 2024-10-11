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
					return new \WP_Error( 'dlx_photo_block_unknown_type', __( 'Unknown type.', 'photo-block' ) );
			}
		}
		return new \WP_Error( 'dlx_photo_block_attribute_not_found', __( 'Attribute not found.', 'photo-block' ) );
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
		$valid_mime_types = apply_filters( 'dlx_photo_block_valid_mime_types', $valid_mime_types );

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
			'avif',
		);
		/**
		 * Filter the valid file extensions for the photo block.
		 *
		 * @param array $file_extensions The valid mime types.
		 */
		$file_extensions = apply_filters( 'dlx_photo_block_file_extensions', $file_extensions );

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
				$sanitized_data[ $key ] = 0;
				continue;
			}
			if ( 'true' === $value ) {
				$sanitized_data[ $key ] = true;
				continue;
			} elseif ( 'false' === $value ) {
				$sanitized_data[ $key ] = false;
				continue;
			}
			if ( is_array( $value ) ) {
				$value                  = self::sanitize_array_recursive( $value );
				$sanitized_data[ $key ] = $value;
				continue;
			}
			if ( is_null( $value ) ) {
				$sanitized_data[ $key ] = null;
				continue;
			}
			if ( is_bool( $value ) ) {
				$sanitized_data[ $key ] = filter_var( $value, FILTER_VALIDATE_BOOLEAN );
				continue;
			}
			if ( is_float( $value ) ) {
				$sanitized_data[ $key ] = filter_var( $value, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION );
				continue;
			}
			if ( is_int( $value ) ) {
				$sanitized_data[ $key ] = filter_var( $value, FILTER_SANITIZE_NUMBER_INT );
				continue;
			}
			if ( is_numeric( $value ) ) {
				$sanitized_data[ $key ] = (float) filter_var( $value, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION );
				continue;
			}
			if ( is_string( $value ) ) {
				$sanitized_data[ $key ] = sanitize_text_field( $value );
				continue;
			}
			$sanitized_data[ $key ] = sanitize_text_field( $value );
		}
		return $sanitized_data;
	}

	/**
	 * Retrieve the image data for a given attachment ID.
	 *
	 * @param int    $attachment_id The attachment ID.
	 * @param string $size          The image size.
	 *
	 * @return false|array {
	 *    @type int    $id  The attachment ID.
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
			return false;
		}
		$full_image_attachment = wp_get_attachment_image_src( $attachment_id, 'full' );

		$return = array(
			'id'              => $attachment_id,
			'url'             => $image_attachment[0],
			'width'           => $image_attachment[1],
			'height'          => $image_attachment[2],
			'alt'             => get_post_meta( $attachment_id, '_wp_attachment_image_alt', true ),
			'caption'         => wp_get_attachment_caption( $attachment_id ),
			'full'            => $full_image_attachment[0],
			'attachment_link' => get_attachment_link( $attachment_id ),
			'title'           => get_the_title( $attachment_id ),
		);

		return $return;
	}

	/**
	 * Determine if the block is in the block's query block loop.
	 *
	 * @param \WP_Block_Parser_Block $block The block object.
	 *
	 * @return bool True if in the block's query loop, false if not.
	 */
	public static function is_in_query_loop( $block ) {
		// Get the main queried object for the page.
		$queried_object  = get_queried_object();
		$current_post_id = $block->context['postId'] ?? 0;

		// If it's a post, get the post ID.
		if ( is_a( $queried_object, 'WP_Post' ) ) {
			// If the current post ID and queried post ID are the same, then we're in the main loop, but not in a block query loop.
			if ( $queried_object->ID === $current_post_id ) {
				return false;
			}
		}
		global $wp_query;

		if ( $current_post_id && $wp_query->in_the_loop ) {
			return true;
		}
		return false;
	}

	/**
	 * Retrieve an image ID from a custom field value.
	 *
	 * @param int|Object|Array $custom_field_value The custom field value.
	 * @param string           $meta_key           The meta key to query.
	 *
	 * @return int|string|WP_Error The image ID or WP_Error if not found.
	 */
	public static function get_image_id_or_url_from_custom_field( $custom_field_value, $meta_key = '' ) {
		// Check for ACF `field_` prefix. If so, we need to grab the field via `get_field`.
		if ( function_exists( 'get_field' ) && ! is_array( $custom_field_value ) && ! is_object( $custom_field_value ) ) {
			if ( strpos( $custom_field_value, 'field_' ) !== false ) {
				$custom_field_value = \get_field( $custom_field_value );
			}
		}

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
	 * Generate the main photo block's CSS.
	 *
	 * @param array  $attributes The block attributes.
	 * @param string $unique_id  The unique ID for the block.
	 * @param bool   $is_class   If true, the uniqueId is a class name, if false, it is an ID.
	 *
	 * @return string The generated CSS.
	 */
	public static function generate_photo_block_css( $attributes, $unique_id, $is_class = false ) {
		// Placeholder for all CSS styles generated.
		$css_output = '';

		// Get CSS helper and build our CSS.
		$css_helper = new CSS_Helper(
			$unique_id,
			'.dlx-photo-block__image-wrapper',
			$is_class
		);

		Functions::add_hierarchical_unit( $css_helper, $attributes['containerWidth'], 'width', 'width', '', '--photo-block-image-width' );
		Functions::add_hierarchical_unit( $css_helper, $attributes['containerMaxWidth'], 'max-width', 'width', '', '--photo-block-image-max-width' );
		Functions::add_hierarchical_unit( $css_helper, $attributes['containerMinWidth'], 'min-width', 'width', '', '--photo-block-image-min-width' );
		Functions::add_hierarchical_unit( $css_helper, $attributes['containerHeight'], 'height', 'width', '', '--photo-block-image-height' );
		Functions::add_hierarchical_unit( $css_helper, $attributes['containerMaxHeight'], 'max-height', 'width', '', '--photo-block-image-max-height' );
		Functions::add_hierarchical_unit( $css_helper, $attributes['containerMinHeight'], 'min-height', 'width', '', '--photo-block-image-min-height' );
		Functions::add_css_property( $css_helper, 'background-color', $attributes['photoBackgroundColor'], '--photo-block-photo-background-color' );
		Functions::build_dimension_css( $css_helper, $attributes['photoBorderRadius'], 'border-radius', '--photo-block-photo-border-radius' );
		Functions::build_border_css( $css_helper, $attributes['photoBorder'], '--photo-block-image-border' );
		Functions::build_dimension_css( $css_helper, $attributes['photoPaddingSize'], 'padding', '--photo-block-image-padding' );
		Functions::build_dimension_css( $css_helper, $attributes['photoMarginSize'], 'margin', '--photo-block-image-margin' );
		$css_output .= $css_helper->get_css();

		// Output image styles.
		$image_css_helper = new CSS_Helper(
			$unique_id,
			'img',
			$is_class
		);
		Functions::add_css_property( $image_css_helper, 'opacity', (float) $attributes['photoOpacity'] );
		if ( $attributes['photoBlur'] && $attributes['photoBlur'] > 0 ) {
			Functions::add_css_property( $image_css_helper, 'filter', (int) $attributes['photoBlur'] . 'px', '--photo-block-blur' );
		}
		if ( 'none' !== $attributes['photoObjectFit'] ) {
			Functions::add_css_property( $image_css_helper, 'object-fit', $attributes['photoObjectFit'], '--photo-block-image-object-fit' );
			Functions::add_css_property( $image_css_helper, 'width', '100%' );
			Functions::add_css_property( $image_css_helper, 'height', '100%' );
		}
		if ( 'none' !== $attributes['photoObjectFit'] && 'none' !== $attributes['photoObjectPosition'] ) {
			if ( 'custom' === $attributes['photoObjectPosition'] && '' !== $attributes['photoObjectPositionCustom'] ) {
				Functions::add_css_property( $image_css_helper, 'object-position', $attributes['photoObjectPositionCustom'], '--photo-block-image-object-position' );
			} else {
				Functions::add_css_property( $image_css_helper, 'object-position', $attributes['photoObjectPosition'], '--photo-block-image-object-position' );
			}
		}
		if ( 'none' !== $attributes['photoObjectFit'] && 'custom' === $attributes['photoObjectPosition'] && '' !== $attributes['photoObjectPositionCustom'] ) {
			Functions::add_css_property( $image_css_helper, 'object-position', $attributes['photoObjectPositionCustom'] );
		}
		if ( 'overlay' !== $attributes['captionPosition'] ) {
			Functions::build_dimension_css( $image_css_helper, $attributes['photoPaddingSize'], 'padding', '--photo-block-image-padding' );
			Functions::build_dimension_css( $image_css_helper, $attributes['photoMarginSize'], 'margin', '--photo-block-image-margin' );
			Functions::build_dimension_css( $image_css_helper, $attributes['photoBorderRadius'], 'border-radius', '--photo-block-photo-border-radius' );
		}

		$css_output .= $image_css_helper->get_css();

		// Add photo drop shadow.
		if ( (bool) $attributes['photoDropShadow']['enabled'] && 'overlay' !== $attributes['captionPosition'] ) {
			$css_output .= sprintf(
				'%8$s%1$s img {
					box-sizing: border-box;
					box-shadow: %2$s %3$spx %4$spx %5$spx %6$spx %7$s;
					-webkit-box-shadow: %2$s %3$spx %4$spx %5$spx %6$spx %7$s;
				}',
				$unique_id,
				( (bool) $attributes['photoDropShadow']['inset'] ? 'inset' : '' ),
				$attributes['photoDropShadow']['horizontal'],
				$attributes['photoDropShadow']['vertical'],
				$attributes['photoDropShadow']['blur'],
				$attributes['photoDropShadow']['spread'],
				$attributes['photoDropShadow']['color'],
				$is_class ? '.' : '#'
			);
		}
		if ( (bool) $attributes['photoDropShadow']['enabled'] && 'overlay' === $attributes['captionPosition'] ) {
			$css_output .= sprintf(
				'%8$s%1$s .dlx-photo-block__image-wrapper {
					box-sizing: border-box;
					box-shadow: %2$s %3$spx %4$spx %5$spx %6$spx %7$s;
					-webkit-box-shadow: %2$s %3$spx %4$spx %5$spx %6$spx %7$s;
				}',
				$unique_id,
				( (bool) $attributes['photoDropShadow']['inset'] ? 'inset' : '' ),
				$attributes['photoDropShadow']['horizontal'],
				$attributes['photoDropShadow']['vertical'],
				$attributes['photoDropShadow']['blur'],
				$attributes['photoDropShadow']['spread'],
				$attributes['photoDropShadow']['color'],
				$is_class ? '.' : '#'
			);
		}

		/**
		 * Filter CSS output for the photo block.
		 */
		$css_output = apply_filters( 'dlx_photo_block_css_output', $css_output, $attributes, $unique_id, $is_class );

		// Strip whitespace from CSS output.
		$css_output = preg_replace( '/\s+/', ' ', $css_output );

		return $css_output;
	}

	/**
	 * Generate the photo block caption CSS.
	 *
	 * @param array  $attributes The block attributes.
	 * @param string $unique_id  The unique ID for the block.
	 * @param bool   $is_class   If true, the uniqueId is a class name, if false, it is an ID.
	 *
	 * @return string The generated CSS.
	 */
	public static function generate_photo_block_caption_css( $attributes, $unique_id, $is_class = false ) {
		// Begin styles.
		$css_output = '';
		$css_helper = new CSS_Helper(
			$unique_id,
			'.dlx-photo-block__caption-wrapper figcaption.dlx-photo-block__caption',
			$is_class
		);
		$mode       = $attributes['mode'] ?? 'single';
		Functions::add_hierarchical_unit( $css_helper, $attributes['containerWidth'], 'width', 'width', '', '--photo-block-caption-width' );
		Functions::add_hierarchical_unit( $css_helper, $attributes['containerMaxWidth'], 'max-width', 'width', '', '--photo-block-caption-max-width' );
		Functions::add_hierarchical_unit( $css_helper, $attributes['containerMinWidth'], 'min-width', 'width', '', '--photo-block-caption-min-width' );
		Functions::add_hierarchical_unit( $css_helper, $attributes['containerHeight'], 'height', 'width', '', '--photo-block-caption-height' );
		Functions::add_hierarchical_unit( $css_helper, $attributes['containerMaxHeight'], 'max-height', 'width', '', '--photo-block-caption-max-height' );
		Functions::add_hierarchical_unit( $css_helper, $attributes['containerMinHeight'], 'min-height', 'width', '', '--photo-block-caption-min-height' );
		Functions::add_css_property( $css_helper, 'background-color', $attributes['captionBackgroundColor'], '--photo-block-caption-background-color' );
		Functions::build_dimension_css( $css_helper, $attributes['captionBorderRadius'], 'border-radius', '--photo-block-caption-border-radius' );
		Functions::build_dimension_css( $css_helper, $attributes['captionPaddingSize'], 'padding', '--photo-block-caption-padding' );
		Functions::build_dimension_css( $css_helper, $attributes['captionMarginSize'], 'margin', '--photo-block-caption-margin' );
		Functions::build_border_css( $css_helper, $attributes['captionBorder'], '--photo-block-caption-border' );

		$attributes['dataMode'] = false;
		if ( 'single' === $mode ) {
			Functions::add_css_property( $css_helper, 'color', 'overlay' === $attributes['captionPosition'] ? $attributes['captionTextColorOverlay'] : $attributes['captionTextColor'], '--photo-block-caption-text-color' );
			Functions::build_typography_css( $css_helper, $attributes['captionTypography'] );
			Functions::add_css_property( $css_helper, 'text-align', $attributes['captionAlign'], '--photo-block-caption-text-align' );

			if ( 'custom' === $attributes['captionTypography']['desktop']['fontFamilySlug'] ) {
				// Fill in anchor CSS.
				$custom_caption_font = new CSS_Helper(
					$unique_id,
					'.dlx-photo-block__caption-wrapper figcaption.dlx-photo-block__caption',
					$is_class
				);
				$custom_font_family  = $attributes['captionTypography']['captionCustomTypography'] ?? null;
				Functions::add_css_property( $custom_caption_font, 'font-family', $custom_font_family );
				$css_output .= $custom_caption_font->get_css();
			}

			// Fill in anchor CSS.
			$figcaption_anchor = new CSS_Helper(
				$unique_id,
				'figcaption a',
				$is_class
			);
			Functions::add_css_property( $figcaption_anchor, 'color', $attributes['captionLinkColor'], '--photo-block-caption-link-color' );
			$css_output .= $figcaption_anchor->get_css();

			// Get anchor hover state.
			$figcaption_anchor_hover = new CSS_Helper(
				$unique_id,
				'figcaption a:hover',
				$is_class
			);
			Functions::add_css_property( $figcaption_anchor_hover, 'color', $attributes['captionLinkHoverColor'], '--photo-block-caption-link-hover-color' );
			$css_output .= $figcaption_anchor_hover->get_css();
		}
		$css_output .= $css_helper->get_css();

		if ( 'overlay' === $attributes['captionPosition'] ) {
			$overlay_css_helper = new CSS_Helper(
				$unique_id,
				'.dlx-photo-block__caption-overlay',
				$is_class
			);
			Functions::build_dimension_css( $overlay_css_helper, $attributes['captionBorderRadius'], 'border-radius' );
			Functions::add_css_property( $overlay_css_helper, 'overflow', 'hidden' );
			$css_output .= $overlay_css_helper->get_css();
		}

		if ( 'advanced' === $mode && ! (bool) $attributes['dataMode'] ) {
			$smart_styles = new CSS_Helper(
				$unique_id,
				'.dlx-photo-block__caption-wrapper figcaption.dlx-photo-block__caption',
				$is_class
			);
			Functions::add_css_property( $smart_styles, '--dlx-photo-block__caption-text-color', 'overlay' === $attributes['captionPosition'] ? $attributes['captionTextColorOverlay'] : $attributes['captionTextColor'], '--photo-block-caption-text-color' );
			Functions::add_css_property( $smart_styles, '--dlx-photo-block__caption-accent-color', $attributes['captionAccentColor'], '--photo-block-caption-accent-color' );
			Functions::add_css_property( $smart_styles, '--dlx-photo-block__caption-secondary-color', $attributes['captionSecondaryColor'], '--photo-block-caption-secondary-color' );
			Functions::add_css_property( $smart_styles, '--dlx-photo-block__caption-font-family', $attributes['captionTextFontFamily'], '--photo-block-caption-font-family' );
			Functions::add_css_property( $smart_styles, '--dlx-photo-block__caption-headings-font-family', $attributes['captionHeadingsFontFamily'], '--photo-block-caption-headings-font-family' );
			Functions::build_font_size_css( $smart_styles, $attributes['captionBaseFontSize'], '--dlx-photo-block__caption-font-size' );
			$css_output .= $smart_styles->get_css();
		}

		// Determine if hover overlay is enabled.
		$is_hover_overlay = (bool) $attributes['overlayDisplayOnHover'];

		/* Overlay solid color styles */
		if ( 'overlay' === $attributes['captionPosition'] && 'solid' === $attributes['overlayBackgroundType'] ) {
			$selector = '.dlx-photo-block__caption-wrapper figcaption:before';
			if ( $is_hover_overlay ) {
				$selector = '.dlx-photo-block__caption-wrapper:hover figcaption:before';
			}
			$caption_overlay_styles = new CSS_Helper(
				$unique_id,
				$selector,
				$is_class
			);
			Functions::add_css_property( $caption_overlay_styles, 'transition', 'background 0.35s ease-in-out' );
			Functions::add_css_property( $caption_overlay_styles, 'display', 'block' );
			Functions::add_css_property( $caption_overlay_styles, 'content', '' );
			Functions::add_css_property( $caption_overlay_styles, 'position', 'absolute' );
			Functions::add_css_property( $caption_overlay_styles, 'top', '0' );
			Functions::add_css_property( $caption_overlay_styles, 'right', '0' );
			Functions::add_css_property( $caption_overlay_styles, 'bottom', '0' );
			Functions::add_css_property( $caption_overlay_styles, 'left', '0' );
			Functions::add_css_property( $caption_overlay_styles, 'width', '100%' );
			Functions::add_css_property( $caption_overlay_styles, 'height', '100%' );
			Functions::add_css_property( $caption_overlay_styles, 'background', $attributes['overlayBackgroundColor'], '--photo-block-caption-overlay-background-color' );
			Functions::add_css_property( $caption_overlay_styles, 'z-index', '1' );
			Functions::build_dimension_css( $caption_overlay_styles, $attributes['overlayBorderRadius'], 'border-radius', '--photo-block-caption-overlay-border-radius' );
			$css_output .= $caption_overlay_styles->get_css();

			$caption_overlay_hover_styles = new CSS_Helper(
				$unique_id,
				'.dlx-photo-block__caption-wrapper:hover figcaption:before',
				$is_class
			);
			Functions::add_css_property( $caption_overlay_hover_styles, 'background', $attributes['overlayBackgroundColorHover'], '--photo-block-caption-overlay-background-color-hover' );
			$css_output .= $caption_overlay_hover_styles->get_css();
		}

		/* overlay gradient styles */
		if ( 'overlay' === $attributes['captionPosition'] && 'gradient' === $attributes['overlayBackgroundType'] ) {
			$selector = '.dlx-photo-block__caption-wrapper figcaption:before';
			if ( $is_hover_overlay ) {
				$selector = '.dlx-photo-block__caption-wrapper:hover figcaption:before';
			}
			$caption_overlay_gradient_styles = new CSS_Helper(
				$unique_id,
				$selector,
				$is_class
			);
			Functions::add_css_property( $caption_overlay_gradient_styles, 'transition', 'opacity 0.35s ease-in-out' );
			Functions::add_css_property( $caption_overlay_gradient_styles, 'display', 'block' );
			Functions::add_css_property( $caption_overlay_gradient_styles, 'content', '' );
			Functions::add_css_property( $caption_overlay_gradient_styles, 'position', 'absolute' );
			Functions::add_css_property( $caption_overlay_gradient_styles, 'top', '0' );
			Functions::add_css_property( $caption_overlay_gradient_styles, 'right', '0' );
			Functions::add_css_property( $caption_overlay_gradient_styles, 'bottom', '0' );
			Functions::add_css_property( $caption_overlay_gradient_styles, 'left', '0' );
			Functions::add_css_property( $caption_overlay_gradient_styles, 'width', '100%' );
			Functions::add_css_property( $caption_overlay_gradient_styles, 'height', '100%' );
			Functions::add_css_property( $caption_overlay_gradient_styles, 'background-image', $attributes['overlayBackgroundGradient'], '--photo-block-caption-overlay-background-gradient' );
			Functions::add_css_property( $caption_overlay_gradient_styles, 'opacity', $attributes['overlayBackgroundGradientOpacity'], '--photo-block-caption-overlay-background-gradient-opacity' );
			Functions::add_css_property( $caption_overlay_gradient_styles, 'z-index', '1' );
			Functions::build_dimension_css( $caption_overlay_gradient_styles, $attributes['overlayBorderRadius'], 'border-radius', '--photo-block-caption-overlay-border-radius' );
			$css_output .= $caption_overlay_gradient_styles->get_css();

			$caption_overlay_gradient_hover_styles = new CSS_Helper(
				$unique_id,
				'.dlx-photo-block__caption-overlay:hover:before',
				$is_class
			);
			Functions::add_css_property( $caption_overlay_gradient_hover_styles, 'opacity', $attributes['overlayBackgroundGradientOpacityHover'] );
			$css_output .= $caption_overlay_gradient_hover_styles->get_css();
		}

		/* overlay image styles */
		if ( 'overlay' === $attributes['captionPosition'] && 'image' === $attributes['overlayBackgroundType'] && ! empty( $attributes['overlayBackgroundImage']['url'] ) ) {
			$caption_overlay_image_styles = new CSS_Helper(
				$unique_id,
				'.dlx-photo-block__caption-overlay:before',
				$is_class
			);
			Functions::add_css_property( $caption_overlay_image_styles, 'transition', 'opacity 0.35s ease-in-out' );
			Functions::add_css_property( $caption_overlay_image_styles, 'display', 'block' );
			Functions::add_css_property( $caption_overlay_image_styles, 'content', '' );
			Functions::add_css_property( $caption_overlay_image_styles, 'position', 'absolute' );
			Functions::add_css_property( $caption_overlay_image_styles, 'top', '0' );
			Functions::add_css_property( $caption_overlay_image_styles, 'right', '0' );
			Functions::add_css_property( $caption_overlay_image_styles, 'bottom', '0' );
			Functions::add_css_property( $caption_overlay_image_styles, 'left', '0' );
			Functions::add_css_property( $caption_overlay_image_styles, 'width', '100%' );
			Functions::add_css_property( $caption_overlay_image_styles, 'height', '100%' );
			Functions::add_css_property( $caption_overlay_image_styles, 'background-color', $attributes['overlayBackgroundImage']['backgroundColor'], '--photo-block-caption-overlay-background-image-color' );
			Functions::add_css_property( $caption_overlay_image_styles, 'background-image', 'url(' . $attributes['overlayBackgroundImage']['url'] . ')', '--photo-block-caption-overlay-background-image-url' );
			Functions::add_css_property( $caption_overlay_image_styles, 'background-position', $attributes['overlayBackgroundImage']['backgroundPosition'], '--photo-block-caption-overlay-background-image-position' );
			Functions::add_css_property( $caption_overlay_image_styles, 'background-repeat', $attributes['overlayBackgroundImage']['backgroundRepeat'], '--photo-block-caption-overlay-background-image-repeat' );
			Functions::add_css_property( $caption_overlay_image_styles, 'opacity', $attributes['overlayBackgroundImage']['backgroundOpacity'], '--photo-block-caption-overlay-background-image-opacity' );
			Functions::add_css_property( $caption_overlay_image_styles, 'opacity', $attributes['overlayBackgroundImage']['backgroundOpacityHover'], '--photo-block-caption-overlay-background-image-opacity-hover' );
			Functions::add_css_property( $caption_overlay_image_styles, 'z-index', '1' );
			Functions::build_dimension_css( $caption_overlay_image_styles, $attributes['overlayBorderRadius'], 'border-radius', '--photo-block-caption-overlay-border-radius' );
			$css_output .= $caption_overlay_image_styles->get_css();

			$caption_overlay_image_hover_styles = new CSS_Helper(
				$unique_id,
				'.dlx-photo-block__caption-overlay:hover:before',
				$is_class
			);
			Functions::add_css_property( $caption_overlay_image_hover_styles, 'opacity', $attributes['overlayBackgroundImage']['backgroundOpacityHover'], '--photo-block-caption-overlay-background-image-opacity-hover' );
			$css_output .= $caption_overlay_image_hover_styles->get_css();
		}
		return $css_output;
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
	 * Get an image caption from a dynamic source.
	 *
	 * @param array $attributes The block attributes.
	 * @param int   $post_id    The post to retrieve data for.
	 */
	public static function get_caption_from_source( $attributes, $post_id ) {
		$caption        = '';
		$caption_source = $attributes['dataCaptionSource'] ?? 'currentImage'; /* can be currentImage, currentPost, postType, none */
		if ( 'none' === $caption_source ) {
			return $caption;
		}

		switch ( $caption_source ) {
			case 'currentImage':
				// Get image ID from attributes.
				$image_id = $attributes['imageDimensions']['id'] ?? 0;

				// Determine data type.
				$caption_type = $attributes['dataCaptionType']; // Can be altText, caption, title, customField.

				switch ( $caption_type ) {
					case 'altText':
						$caption = get_post_meta( $image_id, '_wp_attachment_image_alt', true );
						break;
					case 'caption':
						$caption = wp_get_attachment_caption( $image_id );
						break;
					case 'imageTitle':
						$caption = get_the_title( $image_id );
						break;
					case 'customField':
						// Get the custom field name.
						$custom_field_name = $attributes['dataCaptionImageCustomField'] ?? '';

						// Retrieve custom field data.
						$custom_field_data = get_post_meta( $image_id, $custom_field_name, true );
						if ( ! $custom_field_data || ! is_string( $custom_field_data ) ) {
							$caption = '';
						} else {
							$caption = $custom_field_data;
						}
						break;
				}
				break;
			case 'currentPost':
			case 'postType':
				if ( 'postType' === $caption_source ) {
					$caption_type = $attributes['dataCaptionPostTypeSource'] ?? 'title'; // Can be title, postExcerpt, postAuthorName, postAuthorMeta, customField.
					$post_id      = $attributes['dataCaptionPostId'] ?? 0;
				} else {
					$caption_type = $attributes['dataCaptionTypePost'] ?? 'title'; // Can be title, postExcerpt, postAuthorName, postAuthorMeta, customField.
				}

				switch ( $caption_type ) {
					case 'title':
						$caption = get_the_title( $post_id );
						break;
					case 'postExcerpt':
						$caption = get_the_excerpt( $post_id );
						break;
					case 'postAuthorName':
						$author_id = get_post_field( 'post_author', $post_id );
						$caption   = get_the_author_meta( 'display_name', $author_id );
						break;
					case 'postAuthorMeta':
						// Get the current uathor ID.
						$author_id = get_post_field( 'post_author', $post_id );
						if ( 'postType' === $caption_source ) {
							$maybe_caption = get_the_author_meta( $attributes['dataCaptionPostTypeAuthorMeta'], $author_id );
						} else {
							$maybe_caption = get_the_author_meta( $attributes['dataCaptionTypePostAuthorMeta'], $author_id );
						}
						if ( $maybe_caption ) {
							$caption = sanitize_text_field( $maybe_caption );
						} else {
							$caption = '';
						}
						break;
					case 'customField':
						// Get the custom field name.
						if ( 'postType' === $caption_source ) {
							$custom_field_name = $attributes['dataCaptionPostTypeCustomField'] ?? '';
						} else {
							$custom_field_name = $attributes['dataCaptionTypePostCustomField'] ?? '';
						}

						// Retrieve custom field data.
						$custom_field_data = get_post_meta( $post_id, $custom_field_name, true );
						if ( ! $custom_field_data || ! is_string( $custom_field_data ) ) {
							$caption = '';
						} else {
							$caption = $custom_field_data;
						}
						break;
				}
				break;
		}
		return $caption;
	}

	/**
	 * Get an image from a dynamic source.
	 *
	 * @param string $image_data_source The image data source.
	 * @param string $image_source      The image source.
	 * @param int    $post_id           The post ID.
	 * @param string $image_size        The image size.
	 *
	 * @return array {
	 *   @type int    $id              The attachment ID.
	 *   @type string $url             The image URL.
	 *   @type int    $width           The image width.
	 *   @type int    $height          The image height.
	 *   @type string $alt             The image alt text.
	 *   @type string $full            The link to the full image.
	 *   @type string $attachment_link The link to the attachment page.
	 * }
	 */
	public static function get_image_data_from_source( $image_data_source, $image_source, $post_id, $image_size ) {
		// Get the image ID if current post.
		if ( 'currentPost' === $image_data_source || 'postType' === $image_data_source ) {

			switch ( $image_source ) {
				case 'featuredImage':
					$image_id = get_post_thumbnail_id( $post_id );
					break;
				case 'customField':
					// We need to get the post meta.
					$data_post_meta_key = $attributes['dataImageSourceCustomField'] ?? '';
					$custom_field_value = get_post_meta( $post_id, $data_post_meta_key, true );
					$image_id           = Functions::get_image_id_or_url_from_custom_field( $custom_field_value, $data_post_meta_key );
					break;
				case 'authorAvatar':
					$image_id = 0;
					break;
				case 'authorMeta':
					// Get the current author ID.
					$post_author_id    = get_post_field( 'post_author', $post_id );
					$author_meta_field = $attributes['dataImageSourceAuthorMeta'] ?? 'avatar';
					$image_id          = Functions::get_author_image_from_meta( $image_size, $author_meta_field, $post_author_id );
					break;
			}
		}

		// Check for avatar.
		if ( 'authorAvatar' === $image_source && 0 === $image_id ) {
			$post_author_id = get_post_field( 'post_author', $post_id );
			$avatar         = get_avatar_url( $post_author_id, array( 'size' => $image_size ) );
			if ( $avatar ) {
				$image_data = array(
					'id'              => 0,
					'url'             => $avatar,
					'alt'             => '',
					'full'            => $avatar,
					'attachment_link' => '',
				);
				$is_avatar  = true;
			}
		} else {
			$image_data = Functions::get_image_data( $image_id, $image_size );
		}

		// Get the image URL.
		if ( false === $image_data ) {
			$has_fallback_image = $attributes['dataHasFallbackImage'] ?? false;
			if ( $has_fallback_image ) {
				$image_data               = $attributes['dataFallbackImage'] ?? array();
				$data_fallback_image_size = $attributes['dataFallbackImageSize'] ?? 'large';
				$maybe_data_image_id      = $attributes['dataFallbackImage']['id'] ?? 0;
				if ( $maybe_data_image_id ) {
					$image_data = Functions::get_image_data( $maybe_data_image_id, $data_fallback_image_size );
				}
			}
		}
		return $image_data;
	}

	/**
	 * Get an image from a dynamic source.
	 *
	 * @param array $attributes       The block attributes.
	 * @param int   $post_id          The post to retrieve data for.
	 * @param array $default_alt_text The alt text to use if none (default).
	 */
	public static function get_alt_text_from_source( $attributes, $post_id, $default_alt_text = '' ) {
		$alt_source = $attributes['dataAltTextSource'] ?? 'currentImage'; /* can be currentImage, currentPost, postType, none */
		if ( 'none' === $alt_source ) {
			return $default_alt_text;
		}

		$alt_text = '';
		switch ( $alt_source ) {
			case 'currentImage':
				// Get image ID from attributes.
				$image_id = $attributes['imageDimensions']['id'] ?? 0;

				// Determine data type.
				$alt_type = $attributes['dataAltTextType']; // Can be altText, caption, title, customField.

				switch ( $alt_type ) {
					case 'altText':
						if ( ! empty( $default_alt_text ) ) {
							$alt_text = $default_alt_text;
						} else {
							$alt_text = get_post_meta( $image_id, '_wp_attachment_image_alt', true );
						}
						break;
					case 'caption':
						$alt_text = wp_get_attachment_caption( $image_id );
						break;
					case 'imageTitle':
						$alt_text = get_the_title( $image_id );
						break;
					case 'customField':
						// Get the custom field name.
						$custom_field_name = $attributes['dataAltTextImageCustomField'] ?? '';

						// Retrieve custom field data.
						$custom_field_data = get_post_meta( $image_id, $custom_field_name, true );
						if ( ! $custom_field_data || ! is_string( $custom_field_data ) ) {
							$alt_text = $default_alt_text;
						} else {
							$alt_text = $custom_field_data;
						}
						break;
				}
				break;
			case 'currentPost':
			case 'postType':
				$alt_type = $attributes['dataAltTextTypePost'] ?? 'title'; // Can be title, postExcerpt, postAuthorName, postAuthorMeta, customField.

				if ( 'postType' === $alt_source ) {
					$post_id  = $attributes['dataAltTextPostId'] ?? 0;
					$alt_type = $attributes['dataAltTextPostTypeSource'] ?? 'title'; // Can be title, postExcerpt, postAuthorName, postAuthorMeta, customField.
				}

				switch ( $alt_type ) {
					case 'title':
						$alt_text = get_the_title( $post_id );
						break;
					case 'postExcerpt':
						$alt_text = get_the_excerpt( $post_id );
						break;
					case 'postAuthorName':
						$author_id = get_post_field( 'post_author', $post_id );
						$alt_text  = get_the_author_meta( 'display_name', $author_id );
						break;
					case 'postAuthorMeta':
						// Get the current uathor ID.
						$author_id = get_post_field( 'post_author', $post_id );

						if ( 'postType' === $alt_source ) {
							$maybe_alt_text = get_the_author_meta( $attributes['dataAltTextPostTypeAuthorMeta'], $author_id );
						} else {
							$maybe_alt_text = get_the_author_meta( $attributes['dataAltTextTypePostAuthorMeta'], $author_id );
						}
						if ( $maybe_alt_text ) {
							$alt_text = sanitize_text_field( $maybe_alt_text );
						} else {
							$alt_text = $default_alt_text;
						}
						break;
					case 'customField':
						// Get the custom field name.
						$custom_field_name = $attributes['dataAltTextTypePostCustomField'] ?? '';

						if ( 'postType' === $alt_source ) {
							$custom_field_name = $attributes['dataAltTextPostTypeCustomField'] ?? '';
						} else {
							$custom_field_name = $attributes['dataAltTextTypePostCustomField'] ?? '';
						}

						// Retrieve custom field data.
						$custom_field_data = get_post_meta( $post_id, $custom_field_name, true );
						if ( ! $custom_field_data || ! is_string( $custom_field_data ) ) {
							$alt_text = $default_alt_text;
						} else {
							$alt_text = $custom_field_data;
						}
						break;
				}
				break;
		}
		return ! empty( $alt_text ) ? $alt_text : $default_alt_text;
	}

	/**
	 * Get an image from a dynamic source.
	 *
	 * @param array $attributes         The block attributes.
	 * @param int   $post_id            The post to retrieve data for.
	 * @param array $default_title_text The alt text to use if none (default).
	 */
	public static function get_title_text_from_source( $attributes, $post_id, $default_title_text = '' ) {
		$title_source = $attributes['dataImageTitleSource'] ?? 'currentImage'; /* can be currentImage, currentPost, postType, none */
		if ( 'none' === $title_source ) {
			return $default_title_text;
		}

		$title_text = '';
		switch ( $title_source ) {
			case 'currentImage':
				// Get image ID from attributes.
				$image_id = $attributes['imageDimensions']['id'] ?? 0;

				// Determine data type.
				$title_type = $attributes['dataImageTitleType']; // Can be altText, caption, title, customField.

				switch ( $title_type ) {
					case 'altText':
						if ( ! empty( $default_title_text ) ) {
							$title_text = $default_title_text;
						} else {
							$title_text = get_post_meta( $image_id, '_wp_attachment_image_alt', true );
						}
						break;
					case 'caption':
						$title_text = wp_get_attachment_caption( $image_id );
						break;
					case 'imageTitle':
						$title_text = get_the_title( $image_id );
						break;
					case 'customField':
						// Get the custom field name.
						$custom_field_name = $attributes['dataImageTitleImageCustomField'] ?? '';

						// Retrieve custom field data.
						$custom_field_data = get_post_meta( $image_id, $custom_field_name, true );
						if ( ! $custom_field_data || ! is_string( $custom_field_data ) ) {
							$title_text = $default_title_text;
						} else {
							$title_text = $custom_field_data;
						}
						break;
				}
				break;
			case 'currentPost':
			case 'postType':
				$title_type = $attributes['dataImageTitleTypePost'] ?? 'title'; // Can be title, postExcerpt, postAuthorName, postAuthorMeta, customField.

				if ( 'postType' === $title_source ) {
					$post_id    = $attributes['dataImageTitlePostId'] ?? 0;
					$title_type = $attributes['dataImageTitlePostTypeSource'] ?? 'title'; // Can be title, postExcerpt, postAuthorName, postAuthorMeta, customField.
				}

				switch ( $title_type ) {
					case 'title':
						$title_text = get_the_title( $post_id );
						break;
					case 'postExcerpt':
						$title_text = get_the_excerpt( $post_id );
						break;
					case 'postAuthorName':
						$author_id  = get_post_field( 'post_author', $post_id );
						$title_text = get_the_author_meta( 'display_name', $author_id );
						break;
					case 'postAuthorMeta':
						// Get the current uathor ID.
						$author_id = get_post_field( 'post_author', $post_id );
						if ( 'postType' === $title_source ) {
							$maybe_alt_text = get_the_author_meta( $attributes['dataImageTitlePostTypeAuthorMeta'], $author_id );
						} else {
							$maybe_alt_text = get_the_author_meta( $attributes['dataImageTitleTypePostAuthorMeta'], $author_id );
						}

						if ( $maybe_alt_text && is_string( $maybe_alt_text ) ) {
							$title_text = $maybe_alt_text;
						} else {
							$title_text = $default_title_text;
						}
						break;
					case 'customField':
						// Get the custom field name.
						if ( 'postType' === $title_source ) {
							$custom_field_name = $attributes['dataImageTitlePostTypeCustomField'] ?? '';
						} else {
							$custom_field_name = $attributes['dataImageTitleTypePostCustomField'] ?? '';
						}

						// Retrieve custom field data.
						$custom_field_data = get_post_meta( $post_id, $custom_field_name, true );
						if ( ! $custom_field_data ) {
							$title_text = $default_title_text;
						} else {
							$title_text = $custom_field_data;
						}
						break;
				}
				break;
		}
		$title_text = sanitize_text_field( $title_text );
		return ! empty( $title_text ) ? $title_text : $default_title_text;
	}

	/**
	 * Get an image from author meta.
	 *
	 * @param string $size       The image size.
	 * @param string $meta_field The meta field to query.
	 * @param int    $author_id  The author to retrieve data for.
	 *
	 * @return string|boolean Image URL or false if not found.
	 */
	public static function get_author_image_from_meta( $size = 'large', $meta_field = '', $author_id = 0 ) {

		$image_id_or_url = false;
		// Let's check regular post meta for the image first. This also includes Pods support.
		$maybe_custom_field_result = get_user_meta( $author_id, $meta_field, true );

		if ( function_exists( 'get_field' ) && ! is_array( $maybe_custom_field_result ) && ! is_object( $maybe_custom_field_result ) ) {
			if ( strpos( $maybe_custom_field_result, 'field_' ) !== false ) {
				$maybe_custom_field_result = \get_field( $maybe_custom_field_result, 'user_' . $author_id );
			}
		}

		if ( $maybe_custom_field_result ) {
			// Check if object, and if so, try to get image ID.
			$maybe_image_id_or_url = self::get_image_id_or_url_from_custom_field( $maybe_custom_field_result, $meta_field );
			if ( ! is_wp_error( $maybe_image_id_or_url ) ) {
				$image_id_or_url = $maybe_image_id_or_url;
			}
		}

		// Now return the image if set.
		if ( $image_id_or_url && is_numeric( $image_id_or_url ) ) {
			return $image_id_or_url;
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
		$color_palette = apply_filters( 'dlx_photo_block_color_palette', $color_palette );
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
	 * Take a camelcase field and converts it a dash case.
	 *
	 * @param string $field Field to convert to dash case.
	 *
	 * @return string $field Field name in camelCase.
	 */
	public static function to_dashes( string $field ) {
		$field = strtolower( preg_replace( '/([a-z])([A-Z])/', '$1-$2', $field ) );
		return $field;
	}

	/**
	 * Return the plugin slug.
	 *
	 * @return string plugin slug.
	 */
	public static function get_plugin_slug() {
		return dirname( plugin_basename( DLX_PHOTO_BLOCK_FILE ) );
	}

	/**
	 * Return the basefile for the plugin.
	 *
	 * @return string base file for the plugin.
	 */
	public static function get_plugin_file() {
		return plugin_basename( DLX_PHOTO_BLOCK_FILE );
	}

	/**
	 * Return the version for the plugin.
	 *
	 * @return float version for the plugin.
	 */
	public static function get_plugin_version() {
		return DLX_PHOTO_BLOCK_VERSION;
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
		return apply_filters( 'dlx_photo_block_plugin_uri', 'https://dlxplugins.com/plugins/photo-block/' );
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
		return apply_filters( 'dlx_photo_block_plugin_support_uri', 'https://dlxplugins.com/support/' );
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
		return apply_filters( 'dlx_photo_block_plugin_docs_uri', 'https://photoblock.dlxplugins.com/' );
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

		// Add figure style classes.
		$allowed_tags['style'] = array();

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
		$dir = rtrim( plugin_dir_path( DLX_PHOTO_BLOCK_FILE ), '/' );
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
		$dir = rtrim( plugin_dir_url( DLX_PHOTO_BLOCK_FILE ), '/' );
		if ( ! empty( $path ) && is_string( $path ) ) {
			$dir .= '/' . ltrim( $path, '/' );
		}
		return $dir;
	}

	/**
	 * Shortcut for retrieving the screen sizes.
	 */
	public static function get_screen_sizes() {
		return array(
			'mobile',
			'tablet',
			'desktop',
		);
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

	/**
	 * Adds a unit value into CSS helper.
	 *
	 * @param CSS_Helper $css_helper    CSS Helper object.
	 * @param object     $props         Props object.
	 * @param string     $css_property  CSS property to add (font-family, font-size, etc).
	 * @param string     $type          The type of array key to look for in $props.
	 * @param string     $sub_type      Unit to retrieve data for (optional).
	 * @param string     $css_var       CSS variable to use.
	 */
	public static function add_hierarchical_unit( $css_helper, $props, $css_property, $type = 'width', $sub_type = '', $css_var = '' ) {
		// Gather screen sizes.
		$screen_sizes = self::get_screen_sizes();

		// Make sure type isn't blank.
		if ( '' === $type ) {
			$type = 'width';
		}

		foreach ( $screen_sizes as $screen_size ) {
			$current_value = $props[ $screen_size ][ $type ];
			$css_value     = self::get_hierarchical_placeholder_value( $props, $screen_size, $current_value, self::to_dashes( $type ), $sub_type, $css_var );

			// Start getting the unit.
			$css_unit = '';
			if ( 'mobile' === $screen_size && '' !== $sub_type ) {
				if ( $sub_type && null !== $props['tablet']['unit'][ $sub_type ] ) {
					$css_unit = $props['tablet']['unit'][ $sub_type ];
				} elseif ( $sub_type && null !== $props['desktop']['unit'][ $sub_type ] ) {
					$css_unit = $props['desktop']['unit'][ $sub_type ];
				} elseif ( null !== $props['tablet']['unit'] ) {
					$css_unit = $props['tablet']['unit'];
				} elseif ( null !== $props['desktop']['unit'] ) {
					$css_unit = $props['desktop']['unit'];
				}
			}

			// Get tablet.
			if ( 'tablet' === $screen_size && '' !== $sub_type ) {
				if ( $sub_type && null !== $props['desktop']['unit'][ $sub_type ] ) {
					$css_unit = $props['desktop']['unit'][ $sub_type ];
				} elseif ( null !== $props['desktop']['unit'] ) {
					$css_unit = $props['desktop']['unit'];
				}
			}

			// Get desktop.
			if ( 'desktop' === $screen_size ) {
				if ( null !== $props['desktop']['unit'] ) {
					$css_unit = $props['desktop']['unit'];
				}
			}

			// Add to CSS Helper.
			if ( ( '' === $css_value || '0' === $css_value ) ) {
				continue;
			}
			// Build CSS.
			$css_to_return = sprintf(
				'%s: %s%s;',
				$css_var ?? $css_property,
				$css_value,
				$css_unit
			);
			$css_helper->add_css( $css_to_return, $screen_size );
		}
	}

	/**
	 * Adds a CSS Property and value that doesn't need a screen size.
	 *
	 * @param CSS_Helper $css_helper    CSS Helper object.
	 * @param string     $css_property  CSS property to add (font-family, font-size, etc).
	 * @param string     $css_value     CSS value to add.
	 * @param string     $css_var       CSS variable to use.
	 */
	public static function add_css_property( $css_helper, $css_property, $css_value, $css_var = '' ) {
		// Special case for content.
		if ( 'content' === $css_property ) {
			$css_helper->add_css( sprintf( '%s: "%s";', $css_var ?? $css_property, $css_value ) );
			return;
		}
		$css_helper->add_css( sprintf( '%s: %s;', $css_var ?? $css_property, $css_value ) );
	}

	/**
	 * Build shorthand CSS for a dimension property.
	 *
	 * @param float  $top Top value.
	 * @param float  $right Right value.
	 * @param float  $bottom Bottom value.
	 * @param float  $left Left value.
	 * @param string $unit Unit to use.
	 *
	 * @return string Shorthand CSS.
	 */
	public static function build_shorthand_css( $top, $right, $bottom, $left, $unit ) {
		/* Credits: Forked from GenerateBlocks */
		if ( '' === $top && '' === $right && '' === $bottom && '' === $left ) {
			return;
		}

		$top    = ( floatval( $top ) !== 0 && '' !== $top ) ? floatval( $top ) . $unit . ' ' : '0 ';
		$right  = ( floatval( $right ) !== 0 && '' !== $right ) ? floatval( $right ) . $unit . ' ' : '0 ';
		$bottom = ( floatval( $bottom ) !== 0 && '' !== $bottom ) ? floatval( $bottom ) . $unit . ' ' : '0 ';
		$left   = ( floatval( $left ) !== 0 && '' !== $left ) ? floatval( $left ) . $unit . ' ' : '0 ';

		if ( $right === $left ) {
			$left = '';

			if ( $top === $bottom ) {
				$bottom = '';

				if ( $top === $right ) {
					$right = '';
				}
			}
		}

		$output = $top . $right . $bottom . $left;

		return trim( $output );
	}

	/**
	 * Build shorthand CSS for a dimension property.
	 *
	 * @param float  $top Top value.
	 * @param string $top_unit Top unit.
	 * @param float  $right Right value.
	 * @param string $right_unit Right unit.
	 * @param float  $bottom Bottom value.
	 * @param string $bottom_unit Bottom unit.
	 * @param float  $left Left value.
	 * @param string $left_unit Left unit.
	 *
	 * @return string Shorthand CSS.
	 */
	public static function build_shorthand_css_units( $top, $top_unit, $right, $right_unit, $bottom, $bottom_unit, $left, $left_unit ) {
		if ( '' === $top && '' === $right && '' === $bottom && '' === $left ) {
			return;
		}

		$pattern_for_numbers = '/^[-+]?[0-9]*\.?[0-9]+$/';

		if ( preg_match( $pattern_for_numbers, $top ) ) {
			$top = ( floatval( $top ) !== 0 && '' !== $top ) ? floatval( $top ) . $top_unit . ' ' : '0 ';
		}
		if ( preg_match( $pattern_for_numbers, $right ) ) {
			$right = ( floatval( $right ) !== 0 && '' !== $right ) ? floatval( $right ) . $right_unit . ' ' : '0 ';
		}
		if ( preg_match( $pattern_for_numbers, $bottom ) ) {
			$bottom = ( floatval( $bottom ) !== 0 && '' !== $bottom ) ? floatval( $bottom ) . $bottom_unit . ' ' : '0 ';
		}
		if ( preg_match( $pattern_for_numbers, $left ) ) {
			$left = ( floatval( $left ) !== 0 && '' !== $left ) ? floatval( $left ) . $left_unit . ' ' : '0 ';
		}

		if ( $right === $left ) {
			$left = '';

			if ( $top === $bottom ) {
				$bottom = '';

				if ( $top === $right ) {
					$right = '';
				}
			}
		}

		$output = $top . $right . $bottom . $left;

		return trim( $output );
	}

	/**
	 * Build dimension CSS from a CSS helper and dimensions object.
	 *
	 * @param CSS_Helper $css_helper CSS helper object.
	 * @param array      $dimensions Dimensions array.
	 * @param string     $dimension_type Dimension type (margin, padding, etc).
	 * @param string     $css_var CSS variable to use.
	 */
	public static function build_dimension_css( $css_helper, $dimensions, $dimension_type, $css_var = '' ) {
		$screen_sizes = self::get_screen_sizes();

		foreach ( $screen_sizes as $screen_size ) {
			// Check unit sync.
			if ( 'desktop' === $screen_size ) {
				if ( $dimensions[ $screen_size ]['unitSync'] ) {
					$css = sprintf(
						'%s: %s;',
						$css_var ?? $dimension_type,
						self::build_shorthand_css( $dimensions[ $screen_size ]['top'], $dimensions[ $screen_size ]['top'], $dimensions[ $screen_size ]['top'], $dimensions[ $screen_size ]['top'], $dimensions[ $screen_size ]['topUnit'] )
					);
					$css_helper->add_css( $css, $screen_size );
					continue;
				} else {
					$css = sprintf(
						'%s: %s;',
						$css_var ?? $dimension_type,
						self::build_shorthand_css_units(
							$dimensions[ $screen_size ]['top'],
							$dimensions[ $screen_size ]['topUnit'],
							$dimensions[ $screen_size ]['right'],
							$dimensions[ $screen_size ]['rightUnit'],
							$dimensions[ $screen_size ]['bottom'],
							$dimensions[ $screen_size ]['bottomUnit'],
							$dimensions[ $screen_size ]['left'],
							$dimensions[ $screen_size ]['leftUnit']
						)
					);
					$css_helper->add_css( $css, $screen_size );
				}
			} elseif ( 'tablet' === $screen_size || 'mobile' === $screen_size ) {
				if ( true === self::get_hierarchical_placeholder_value( $dimensions, $screen_size, $dimensions[ $screen_size ]['unitSync'], $dimension_type, 'unitSync' ) ) {
					$top_value = self::get_hierarchical_placeholder_value( $dimensions, $screen_size, $dimensions[ $screen_size ]['top'], 'top' );
					$top_unit  = self::get_hierarchical_placeholder_value( $dimensions, $screen_size, $dimensions[ $screen_size ]['topUnit'], 'topUnit' );

					// Build CSS.
					$css = sprintf(
						'%s: %s;',
						$css_var ?? $dimension_type,
						self::build_shorthand_css( $top_value, $top_value, $top_value, $top_value, $top_unit )
					);
					$css_helper->add_css( $css, $screen_size );
				} else {
					$top         = self::get_hierarchical_placeholder_value( $dimensions, $screen_size, $dimensions[ $screen_size ]['top'], $dimension_type, 'top' );
					$top_unit    = self::get_hierarchical_placeholder_value( $dimensions, $screen_size, $dimensions[ $screen_size ]['topUnit'], $dimension_type, 'topUnit' );
					$right       = self::get_hierarchical_placeholder_value( $dimensions, $screen_size, $dimensions[ $screen_size ]['right'], $dimension_type, 'right' );
					$right_unit  = self::get_hierarchical_placeholder_value( $dimensions, $screen_size, $dimensions[ $screen_size ]['rightUnit'], $dimension_type, 'rightUnit' );
					$bottom      = self::get_hierarchical_placeholder_value( $dimensions, $screen_size, $dimensions[ $screen_size ]['bottom'], $dimension_type, 'bottom' );
					$bottom_unit = self::get_hierarchical_placeholder_value( $dimensions, $screen_size, $dimensions[ $screen_size ]['bottomUnit'], $dimension_type, 'bottomUnit' );
					$left        = self::get_hierarchical_placeholder_value( $dimensions, $screen_size, $dimensions[ $screen_size ]['left'], $dimension_type, 'left' );
					$left_unit   = self::get_hierarchical_placeholder_value( $dimensions, $screen_size, $dimensions[ $screen_size ]['leftUnit'], $dimension_type, 'leftUnit' );

					$css = sprintf(
						'%s: %s;',
						$css_var ?? $dimension_type,
						self::build_shorthand_css_units( $top, $top_unit, $right, $right_unit, $bottom, $bottom_unit, $left, $left_unit )
					);
					$css_helper->add_css( $css, $screen_size );
				}
			}
		}
	}

	/**
	 * Build dimension CSS from a CSS helper and dimensions object.
	 *
	 * @param CSS_Helper $css_helper CSS helper object.
	 * @param array      $border The border dimension.
	 * @param string     $css_var CSS variable to use.
	 */
	public static function build_border_css( $css_helper, $border, $css_var = '' ) {
		$screen_sizes = self::get_screen_sizes();

		$dimensions = array(
			'top',
			'right',
			'bottom',
			'left',
		);

		foreach ( $screen_sizes as $screen_size ) {
			// Check unit sync.
			if ( 'desktop' === $screen_size ) {
				if ( $border[ $screen_size ]['unitSync'] ) {
					foreach ( $dimensions as $dimension ) {
						$top_width        = self::get_hierarchical_placeholder_value( $border, $screen_size, $border[ $screen_size ]['top']['width'], 'top', 'width' );
						$top_unit         = self::get_hierarchical_placeholder_value( $border, $screen_size, $border[ $screen_size ]['top']['unit'], 'top', 'unit' );
						$top_color        = self::get_hierarchical_placeholder_value( $border, $screen_size, $border[ $screen_size ]['top']['color'], 'top', 'color' );
						$top_border_style = self::get_hierarchical_placeholder_value( $border, $screen_size, $border[ $screen_size ]['top']['borderStyle'], 'top', 'borderStyle' );
						$css_helper->add_css(
							sprintf(
								'%s: %s;',
								$css_var . '-' . $dimension,
								$top_width . $top_unit . ' ' . $top_border_style . ' ' . $top_color
							),
							$screen_size
						);
					}
				} else {
					$top_width        = self::get_hierarchical_placeholder_value( $border, $screen_size, $border[ $screen_size ]['top']['width'], 'top', 'width' );
					$top_unit         = self::get_hierarchical_placeholder_value( $border, $screen_size, $border[ $screen_size ]['top']['unit'], 'top', 'unit' );
					$top_color        = self::get_hierarchical_placeholder_value( $border, $screen_size, $border[ $screen_size ]['top']['color'], 'top', 'color' );
					$top_border_style = self::get_hierarchical_placeholder_value( $border, $screen_size, $border[ $screen_size ]['top']['borderStyle'], 'top', 'borderStyle' );

					$right_width        = self::get_hierarchical_placeholder_value( $border, $screen_size, $border[ $screen_size ]['right']['width'], 'right', 'width' );
					$right_unit         = self::get_hierarchical_placeholder_value( $border, $screen_size, $border[ $screen_size ]['right']['unit'], 'right', 'unit' );
					$right_color        = self::get_hierarchical_placeholder_value( $border, $screen_size, $border[ $screen_size ]['right']['color'], 'right', 'color' );
					$right_border_style = self::get_hierarchical_placeholder_value( $border, $screen_size, $border[ $screen_size ]['right']['borderStyle'], 'right', 'borderStyle' );

					$bottom_width        = self::get_hierarchical_placeholder_value( $border, $screen_size, $border[ $screen_size ]['bottom']['width'], 'bottom', 'width' );
					$bottom_unit         = self::get_hierarchical_placeholder_value( $border, $screen_size, $border[ $screen_size ]['bottom']['unit'], 'bottom', 'unit' );
					$bottom_color        = self::get_hierarchical_placeholder_value( $border, $screen_size, $border[ $screen_size ]['bottom']['color'], 'bottom', 'color' );
					$bottom_border_style = self::get_hierarchical_placeholder_value( $border, $screen_size, $border[ $screen_size ]['bottom']['borderStyle'], 'bottom', 'borderStyle' );

					$left_width        = self::get_hierarchical_placeholder_value( $border, $screen_size, $border[ $screen_size ]['left']['width'], 'left', 'width' );
					$left_unit         = self::get_hierarchical_placeholder_value( $border, $screen_size, $border[ $screen_size ]['left']['unit'], 'left', 'unit' );
					$left_color        = self::get_hierarchical_placeholder_value( $border, $screen_size, $border[ $screen_size ]['left']['color'], 'left', 'color' );
					$left_border_style = self::get_hierarchical_placeholder_value( $border, $screen_size, $border[ $screen_size ]['left']['borderStyle'], 'left', 'borderStyle' );

					$css_helper->add_css(
						sprintf(
							'%s: %s;',
							$css_var . '-top',
							$top_width . $top_unit . ' ' . $top_border_style . ' ' . $top_color
						),
						$screen_size
					);
					$css_helper->add_css(
						sprintf(
							'%s: %s;',
							$css_var . '-right',
							$right_width . $right_unit . ' ' . $right_border_style . ' ' . $right_color
						),
						$screen_size
					);
					$css_helper->add_css(
						sprintf(
							'%s: %s;',
							$css_var . '-bottom',
							$bottom_width . $bottom_unit . ' ' . $bottom_border_style . ' ' . $bottom_color
						),
						$screen_size
					);
					$css_helper->add_css(
						sprintf(
							'%s: %s;',
							$css_var . '-left',
							$left_width . $left_unit . ' ' . $left_border_style . ' ' . $left_color
						),
						$screen_size
					);
				}
			} elseif ( 'tablet' === $screen_size || 'mobile' === $screen_size ) {
				if ( true === self::get_hierarchical_placeholder_value( $border, $screen_size, $border[ $screen_size ]['unitSync'], 'border', 'unitSync' ) ) {
					foreach ( $dimensions as $dimension ) {
						$top_width        = self::get_hierarchical_placeholder_value( $border, $screen_size, $border[ $screen_size ]['top']['width'], 'top', 'width' );
						$top_unit         = self::get_hierarchical_placeholder_value( $border, $screen_size, $border[ $screen_size ]['top']['unit'], 'top', 'unit' );
						$top_color        = self::get_hierarchical_placeholder_value( $border, $screen_size, $border[ $screen_size ]['top']['color'], 'top', 'color' );
						$top_border_style = self::get_hierarchical_placeholder_value( $border, $screen_size, $border[ $screen_size ]['top']['borderStyle'], 'top', 'borderStyle' );
						$css_helper->add_css(
							sprintf(
								'%s: %s;',
								$css_var . '-' . $dimension,
								$top_width . $top_unit . ' ' . $top_border_style . ' ' . $top_color
							),
							$screen_size
						);
					}
				} else {
					$top_width        = self::get_hierarchical_placeholder_value( $border, $screen_size, $border[ $screen_size ]['top']['width'], 'top', 'width' );
					$top_unit         = self::get_hierarchical_placeholder_value( $border, $screen_size, $border[ $screen_size ]['top']['unit'], 'top', 'unit' );
					$top_color        = self::get_hierarchical_placeholder_value( $border, $screen_size, $border[ $screen_size ]['top']['color'], 'top', 'color' );
					$top_border_style = self::get_hierarchical_placeholder_value( $border, $screen_size, $border[ $screen_size ]['top']['borderStyle'], 'top', 'borderStyle' );

					$right_width        = self::get_hierarchical_placeholder_value( $border, $screen_size, $border[ $screen_size ]['right']['width'], 'right', 'width' );
					$right_unit         = self::get_hierarchical_placeholder_value( $border, $screen_size, $border[ $screen_size ]['right']['unit'], 'right', 'unit' );
					$right_color        = self::get_hierarchical_placeholder_value( $border, $screen_size, $border[ $screen_size ]['right']['color'], 'right', 'color' );
					$right_border_style = self::get_hierarchical_placeholder_value( $border, $screen_size, $border[ $screen_size ]['right']['borderStyle'], 'right', 'borderStyle' );

					$bottom_width        = self::get_hierarchical_placeholder_value( $border, $screen_size, $border[ $screen_size ]['bottom']['width'], 'bottom', 'width' );
					$bottom_unit         = self::get_hierarchical_placeholder_value( $border, $screen_size, $border[ $screen_size ]['bottom']['unit'], 'bottom', 'unit' );
					$bottom_color        = self::get_hierarchical_placeholder_value( $border, $screen_size, $border[ $screen_size ]['bottom']['color'], 'bottom', 'color' );
					$bottom_border_style = self::get_hierarchical_placeholder_value( $border, $screen_size, $border[ $screen_size ]['bottom']['borderStyle'], 'bottom', 'borderStyle' );

					$left_width        = self::get_hierarchical_placeholder_value( $border, $screen_size, $border[ $screen_size ]['left']['width'], 'left', 'width' );
					$left_unit         = self::get_hierarchical_placeholder_value( $border, $screen_size, $border[ $screen_size ]['left']['unit'], 'left', 'unit' );
					$left_color        = self::get_hierarchical_placeholder_value( $border, $screen_size, $border[ $screen_size ]['left']['color'], 'left', 'color' );
					$left_border_style = self::get_hierarchical_placeholder_value( $border, $screen_size, $border[ $screen_size ]['left']['borderStyle'], 'left', 'borderStyle' );

					$css_helper->add_css(
						sprintf(
							'%s: %s;',
							$css_var . '-top',
							$top_width . $top_unit . ' ' . $top_border_style . ' ' . $top_color
						),
						$screen_size
					);
					$css_helper->add_css(
						sprintf(
							'%s: %s;',
							$css_var . '-right',
							$right_width . $right_unit . ' ' . $right_border_style . ' ' . $right_color
						),
						$screen_size
					);
					$css_helper->add_css(
						sprintf(
							'%s: %s;',
							$css_var . '-bottom',
							$bottom_width . $bottom_unit . ' ' . $bottom_border_style . ' ' . $bottom_color
						),
						$screen_size
					);
					$css_helper->add_css(
						sprintf(
							'%s: %s;',
							$css_var . '-left',
							$left_width . $left_unit . ' ' . $left_border_style . ' ' . $left_color
						),
						$screen_size
					);
				}
			}
		}
	}

	/**
	 * Build dimension CSS from a CSS helper and dimensions object.
	 *
	 * @param CSS_Helper $css_helper CSS helper object.
	 * @param array      $typography Typography array.
	 */
	public static function build_typography_css( $css_helper, $typography ) {
		$screen_sizes = self::get_screen_sizes();

		$font_family_keys = array(
			'fontFamily'    => 'font-family',
			'fontSize'      => 'font-size',
			'fontWeight'    => 'font-weight',
			'lineHeight'    => 'line-height',
			'textTransform' => 'text-transform',
			'letterSpacing' => 'letter-spacing',
		);

		foreach ( $screen_sizes as $screen_size ) {
			foreach ( $font_family_keys as $key => $value ) {
				$default_value      = ( isset( $typography[ $screen_size ][ $key ] ) && ! empty( $typography[ $screen_size ][ $key ] ) ) ? $typography[ $screen_size ][ $key ] : $typography['desktop'][ $key ] ?? '';
				$hierarchical_value = self::get_hierarchical_placeholder_value( $typography, $screen_size, $default_value, $key );
				$hierarchical_unit  = '';
				if ( isset( $typography[ $screen_size ][ $key . 'Unit' ] ) ) {
					$hierarchical_unit .= self::get_hierarchical_placeholder_value( $typography, $screen_size, $typography[ $screen_size ][ $key . 'Unit' ], $key . 'Unit' );
				}
				if ( ! empty( $hierarchical_value ) ) {
					$css = sprintf(
						'%s: %s;',
						$value,
						$hierarchical_value . $hierarchical_unit
					);
					$css_helper->add_css( $css, $screen_size );
				}
			}
		}
	}

	/**
	 * Build dimension CSS from a CSS helper and dimensions object.
	 *
	 * @param CSS_Helper $css_helper CSS helper object.
	 * @param array      $font_size_array [device][value], [device][unit].
	 * @param string     $css_property CSS property to use.
	 */
	public static function build_font_size_css( $css_helper, $font_size_array, $css_property = '--dlx-photo-block__caption-font-size' ) {
		$screen_sizes = self::get_screen_sizes();

		foreach ( $screen_sizes as $screen_size ) {
			$font_size = self::get_hierarchical_placeholder_value( $font_size_array, $screen_size, $font_size_array[ $screen_size ]['value'], 'value' );
			$unit      = self::get_hierarchical_placeholder_value( $font_size_array, $screen_size, $font_size_array[ $screen_size ]['unit'], 'unit' );

			if ( ! empty( $font_size ) ) {
				$css = sprintf(
					'%s: %s;',
					$css_property,
					$font_size . $unit
				);
				$css_helper->add_css( $css, $screen_size );
			}
		}
	}

	/**
	 * Get a value from a hierarchy.
	 *
	 * @param object $props         Props object.
	 * @param string $screen_size   Screen size (desktop|tablet|mobile).
	 * @param string $current_value The current value as a fallback.
	 * @param string $type          Type of value to look for in props (width, height, border, etc.).
	 * @param string $sub_type      Unit to retrieve data for.
	 * @param string $css_var       CSS variable to use.
	 *
	 * @return string CSS unit value.
	 */
	public static function get_hierarchical_placeholder_value( $props, $screen_size, $current_value, $type, $sub_type = '', $css_var = '' ) {
		if ( null === $current_value ) {
			$current_value = '';
		}

		// Adjust current value for margin, padding, and border.
		if ( 'unitSync' === $sub_type ) {
			switch ( $type ) {
				case 'margin':
				case 'padding':
					if ( ( 'mobile' === $screen_size || 'tablet' === $screen_size ) && true === $current_value ) {
						// Check to see if units are blank.
						if ( '' === $props[ $screen_size ]['top'] ) {
							$current_value = false;
						}
					}
			}
		}

		// Check mobile screen size.
		if ( 'mobile' === $screen_size && '' === $current_value ) {
			if ( ! empty( $sub_type ) && isset( $props['tablet'][ $type ][ $sub_type ] ) && $props['tablet'][ $type ][ $sub_type ] ) {
				return $props['tablet'][ $type ][ $sub_type ];
			} elseif ( ! empty( $sub_type ) && isset( $props['desktop'][ $type ][ $sub_type ] ) && '' !== $props['desktop'][ $type ][ $sub_type ] ) {
				// Check desktop.
				return $props['desktop'][ $type ][ $sub_type ];
			} elseif ( ! empty( $sub_type ) && isset( $props['tablet'][ $type ] ) && '' !== $props['tablet'][ $type ] ) {
				return $props['tablet'][ $type ];
			} elseif ( empty( $sub_type ) && isset( $props['desktop'][ $type ] ) && '' !== $props['desktop'][ $type ] ) {
				return $props['desktop'][ $type ];
			} elseif ( ! empty( $sub_type ) && isset( $props['tablet'][ $sub_type ] ) && '' !== $props['tablet'][ $sub_type ] ) {
				return $props['tablet'][ $sub_type ];
			} elseif ( ! empty( $sub_type ) && isset( $props['desktop'][ $sub_type ] ) && '' !== $props['desktop'][ $sub_type ] ) {
				return $props['desktop'][ $sub_type ];
			}
		}

		// Get the tablet screen size properties.
		if ( 'tablet' === $screen_size && '' === $current_value ) {
			// Check desktop.
			if ( ! empty( $sub_type ) && isset( $props['desktop'][ $type ][ $sub_type ] ) && '' !== $props['desktop'][ $type ][ $sub_type ] ) {
				return $props['desktop'][ $type ][ $sub_type ];
			} elseif ( empty( $sub_type ) && isset( $props['desktop'][ $type ] ) && '' !== $props['desktop'][ $type ] ) {
				return $props['desktop'][ $type ];
			} elseif ( ! empty( $sub_type ) && isset( $props['desktop'][ $sub_type ] ) && '' !== $props['desktop'][ $sub_type ] ) {
				return $props['desktop'][ $sub_type ];
			}
		}

		// Get fallback value if no matches by this point.
		if ( ! empty( $current_value ) ) {
			return $current_value;
		}

		// Nothing found, return empty value.
		return '';
	}
}
