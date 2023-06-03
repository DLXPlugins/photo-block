<?php
/**
 * Set up the blocks and their attributes.
 *
 * @package PhotoBlock
 */

namespace DLXPlugins\PhotoBlock;

/**
 * Helper class for registering blocks.
 */
class Blocks {

	/**
	 * Main class runner.
	 */
	public static function run() {
		// Register the PhotoBlock.
		add_action( 'init', array( static::class, 'register_block' ) );
		add_action( 'enqueue_block_editor_assets', array( static::class, 'register_block_assets' ) );
		add_action( 'enqueue_block_assets', array( static::class, 'enqueue_frontend_assets' ) );
	}

	/**
	 * Registers the block on server.
	 */
	public static function register_block() {

		register_block_type(
			Functions::get_plugin_dir( 'build/blocks/photo-block/block.json' ),
			array(
				'render_callback' => array( static::class, 'block_frontend' ),
			)
		);
	}

	/**
	 * Register frontend scripts/styles.
	 */
	public static function enqueue_frontend_assets() {
		if ( ! is_admin() && has_block( 'dlxplugins/photo-block' ) ) {
			wp_register_style(
				'dlx-photo-block-frontend-and-editor',
				Functions::get_plugin_url( 'dist/dlx-photo-block-style.css' ),
				array(),
				Functions::get_plugin_version(),
				'all'
			);
		}
	}

	/**
	 * Register all block assets.
	 */
	public static function register_block_assets() {
		wp_register_style(
			'dlx-photo-block-frontend-and-editor',
			Functions::get_plugin_url( 'dist/dlx-photo-block-style.css' ),
			array(),
			Functions::get_plugin_version(),
			'all'
		);

		wp_register_script(
			'dlx-photo-block-editor',
			Functions::get_plugin_url( 'build/index.js' ),
			array(),
			Functions::get_plugin_version(),
			true
		);

		// Get supported innerBlocks for the Photo Caption Block.
		$caption_innerblocks_supported = array(
			'core/paragraph',
			'core/heading',
			'core/list',
			'core/quote',
			'core/pullquote',
			'core/verse',
			'core/preformatted',
			'core/spacer',
			'core/separator',
			'core/button',
			'core/columns',
			'core/group',
		);
		/**
		 * Filter the supported innerBlocks for the Photo Caption Block.
		 *
		 * @param array $caption_innerblocks_supported Array of supported innerBlocks.
		 */
		$caption_innerblocks_supported = apply_filters( 'photo_block_caption_innerblocks_supported', $caption_innerblocks_supported );

		// Get post types.
		$post_types       = get_post_types(
			array(
				'public' => true,
			)
		);
		$post_type_return = array();
		foreach ( $post_types as $index => $post_type ) {
			// Exclude non-standard post types.
			if ( in_array( $post_type, array( 'attachment', 'revision', 'nav_menu_item' ), true ) ) {
				continue;
			}
			$post_type_label          = $post_type;
			$post_type_label_singular = $post_type;
			$post_type_data           = get_post_type_object( $post_type );
			if ( isset( $post_type_data->label ) && ! empty( $post_type_data->label ) ) {
				$post_type_label = $post_type_data->label;
			}
			// Get singular label (if exists).
			if ( isset( $post_type_data->labels->singular_name ) && ! empty( $post_type_data->labels->singular_name ) ) {
				$post_type_label_singular = $post_type_data->labels->singular_name;
			}
			// If post type singular is still empty, get uppercase of post type slug.
			if ( empty( $post_type_label_singular ) ) {
				$post_type_label_singular = ucwords( str_replace( '_', ' ', $post_type ) );
			}
			$post_type_return[] = array(
				'value'    => $post_type,
				'label'    => $post_type_label,
				'singular' => $post_type_label_singular,
			);
		}

		// Get localised vars to return for JS parsing.
		$localized_vars = array(
			'restUrl'            => rest_url( 'dlxplugins/photo-block/v1' ),
			'restNonce'          => wp_create_nonce( 'wp_rest' ),
			'captionInnerBlocks' => $caption_innerblocks_supported,
			'imageSizes'         => Functions::get_all_image_sizes(),
			'palette'            => functions::get_theme_color_palette(),
			'postTypes'          => $post_type_return,
		);
		/**
		 * Filter the localized variables for the Photo Block.
		 *
		 * @param array $localized_vars Array of localized variables.
		 */
		$localized_vars = apply_filters( 'photo_block_localized_vars', $localized_vars );

		wp_localize_script(
			'dlx-photo-block-editor',
			'photoBlock',
			$localized_vars
		);

		wp_register_style(
			'dlx-photo-block-editor-css',
			Functions::get_plugin_url( 'build/index.css' ),
			array(),
			Functions::get_plugin_version(),
			'all'
		);
	}

	/**
	 * Output Photo block on the front-end.
	 *
	 * @param array $attributes Array of attributes for the Gutenberg block.
	 */
	public static function block_frontend( $attributes ) {
		return 'hello PhotoBlock frontend';
	}

	/**
	 * Build the CSS for the dimensions components.
	 *
	 * @param array  $sizes {
	 *   An array of sizes.
	 *
	 *   @type string $top The top dimension.
	 *   @type string $right The right dimension.
	 *   @type string $bottom The bottom dimension.
	 *   @type string $left The left dimension.
	 *   @type string $unit The dimensions's unit.
	 * }
	 * @param string $screen_size Screen size (desktop|mobile|tablet).
	 * @param bool   $is_margin   Whether the dimension is a margin or not (so we do not set left/right margins).
	 *
	 * @return string The CSS for the dimensions.
	 */
	public static function build_dimensions_css( $sizes, $screen_size = 'desktop', $is_margin = false ) {
		$dimensions = $sizes[ $screen_size ];

		if ( 'desktop' === $screen_size ) {
			$css = self::get_dimensions_shorthand(
				$dimensions['top'],
				$dimensions['right'],
				$dimensions['bottom'],
				$dimensions['left'],
				$dimensions['unit'],
				$is_margin
			);
			return $css;
		}
		if ( 'tablet' === $screen_size || 'mobile' === $screen_size ) {
			$css = self::get_dimensions_shorthand(
				self::get_hierarchical_value( $sizes, $screen_size, $dimensions['top'], 'top' ),
				self::get_hierarchical_value( $sizes, $screen_size, $dimensions['right'], 'right' ),
				self::get_hierarchical_value( $sizes, $screen_size, $dimensions['bottom'], 'bottom' ),
				self::get_hierarchical_value( $sizes, $screen_size, $dimensions['left'], 'left' ),
				self::get_hierarchical_value_unit( $sizes, $screen_size, $dimensions['unit'], 'unit' ),
				$is_margin
			);
			return $css;
		}

		return '';
	}

	/**
	 * Return a hierarchical unit value.
	 *
	 * @param array  $sizes {
	 *   An array of sizes.
	 *
	 *   @type string $top The top dimension.
	 *   @type string $right The right dimension.
	 *   @type string $bottom The bottom dimension.
	 *   @type string $left The left dimension.
	 *   @type string $unit The dimensikon's unit.
	 * }
	 * @param string $screen_size Screen size (desktop|mobile|tablet).
	 * @param string $value       The unit value (px, em, rem).
	 *
	 * @return string The unit to use.
	 */
	public static function get_hierarchical_value_unit( $sizes, $screen_size, $value ) {
		// Check mobile screen size.
		if ( 'mobile' === $screen_size && null === $value ) {
			if ( null === $sizes['tablet']['unit'] ) {
				return $sizes['desktop']['unit'];
			}
			return $sizes['tablet']['unit'];
		}
		if ( 'tablet' === $screen_size && null === $value ) {
			return $sizes['desktop']['unit'];
		}
		if ( null === $value ) {
			return 'px';
		}
		return $value;
	}

	/**
	 * Get the hierarchical value for the dimension and screen size.
	 *
	 * @param array  $sizes {
	 *   An array of sizes.
	 *
	 *   @type string $top The top dimension.
	 *   @type string $right The right dimension.
	 *   @type string $bottom The bottom dimension.
	 *   @type string $left The left dimension.
	 *   @type string $unit The dimensikon's unit.
	 * }
	 * @param string $screen_size Screen size (desktop|mobile|tablet).
	 * @param string $value       The dimension value.
	 * @param string $type        The dimension type (top|right|bottom|left).
	 *
	 * @return string The value of the dimension type.
	 */
	public static function get_hierarchical_value( $sizes, $screen_size, $value, $type ) {
		// Check mobile screen size.
		if ( 'mobile' === $screen_size && '' === $value ) {
			// Check tablet.
			if ( '' !== $sizes['tablet'][ $type ] ) {
				return $sizes['tablet'][ $type ];
			} elseif ( '' !== $sizes['desktop'][ $type ] ) {
				// Check desktop.
				return $sizes['desktop'][ $type ];
			}
		}

		// Check tablet screen size.
		if ( 'tablet' === $screen_size && '' === $value ) {
			if ( '' !== $sizes['desktop'][ $type ] ) {
				// Check desktop.
				return $sizes['desktop'][ $type ];
			}
		}

		if ( '' !== $value ) {
			return $value;
		}

		return '0';
	}

	/**
	 * Get the hierarchical value for the dimension and screen size.
	 *
	 * @param array  $typography_settings {
	 *   An array of typography settings.
	 *
	 *   @type string $fontFamily        The Font Family.
	 *   @type string $fontFamilySlug    Font Family slug.
	 *   @type string $fontSize          The font size.
	 *   @type string $fontSizeUnit      The font size unit.
	 *   @type string $fontWeight        Font weight (100, 200, etc.).
	 *   @type string $lineHeight        The line height.
	 *   @type string $lineHeightUnit    The line height unit.
	 *   @type string $textTransform     The text transform (uppercase, lowercase, etc.).
	 *   @type string $letterSpacing     The letter spacing.
	 *   @type string $letterSpacingUnit The letter spacing unit.
	 *   @type string $fontType          The font type (google|adobe|web).
	 *   @type string $fontFallback      The font fallback.
	 * }
	 * @param string $screen_size Screen size (desktop|mobile|tablet).
	 * @param string $type        The dimension type (top|right|bottom|left).
	 *
	 * @return string The value of the typography type.
	 */
	public static function get_hierarchical_typography( $typography_settings, $screen_size, $type ) {
		// Check mobile screen size.
		if ( 'mobile' === $screen_size && '' === $typography_settings[ $screen_size ][ $type ] ) {
			// Check tablet.
			if ( '' !== $typography_settings['tablet'][ $type ] ) {
				return $typography_settings['tablet'][ $type ];
			} elseif ( '' !== $typography_settings['desktop'][ $type ] ) {
				// Check desktop.
				return $typography_settings['desktop'][ $type ];
			}
		}

		// Check tablet screen size.
		if ( 'tablet' === $screen_size && '' === $typography_settings[ $screen_size ][ $type ] ) {
			if ( '' !== $typography_settings['desktop'][ $type ] ) {
				// Check desktop.
				return $typography_settings['desktop'][ $type ];
			}
		}

		if ( '' !== $typography_settings[ $screen_size ][ $type ] ) {
			return $typography_settings[ $screen_size ][ $type ];
		}

		return '';
	}

	/**
	 * Return dimensions shorthand.
	 *
	 * @param string $top   The top dimension.
	 * @param string $right The right dimension.
	 * @param string $bottom The bottom dimension.
	 * @param string $left The left dimension.
	 * @param string $unit The dimensions's unit.
	 * @param bool   $is_margin Whether margin is set so left right values are not set.
	 *
	 * @return string The shorthand CSS for the dimensions.
	 */
	public static function get_dimensions_shorthand( $top, $right, $bottom, $left, $unit, $is_margin = false ) {
		if ( '' === $top && '' === $right && '' === $bottom && '' === $left ) {
			return;
		}

		$top    = ( 0 !== (float) $top && '' !== $top ) ? (float) $top . $unit . ' ' : '0 ';
		$right  = ( 0 !== (float) $right && '' !== $right ) ? (float) $right . $unit . ' ' : '0 ';
		$bottom = ( 0 !== (float) $bottom && '' !== $bottom ) ? (float) $bottom . $unit . ' ' : '0 ';
		$left   = ( 0 !== (float) $left && '' !== $left ) ? (float) $left . $unit . ' ' : '0 ';

		if ( $right === $left ) {
			$left = '';

			if ( $top === $bottom ) {

				if ( $top === $right ) {
					$right = '';
				}
			}
		}

		if ( $is_margin ) {
			$right = ' auto ';
			$left  = ' auto ';
		}

		$output = $top . $right . $bottom . $left;
		return trim( $output );
	}
}
