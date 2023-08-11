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

		// Enqueue any frontend assets.
		add_action( 'wp_footer', array( static::class, 'enqueue_footer_assets' ), 999 ); // Load late so other scripts have a chance to be enqueued.

		// Add inline styles to fancybox.
		add_action( 'wp_enqueue_scripts', array( static::class, 'add_fancybox_inline_styles' ), 999 );
	}

	/**
	 * Registers the block on server.
	 */
	public static function register_block() {

		register_block_type(
			Functions::get_plugin_dir( 'build/blocks/photo-block/block.json' ),
			array(
				'render_callback' => array( static::class, 'block_frontend' ),
				'uses_context'    => array( 'postType', 'postId' ), /* for determining if we're in a query loop */
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
	 * @param array    $attributes          Array of attributes for the Gutenberg block.
	 * @param string   $innerblocks_content The inner blocks content.
	 * @param WP_Block $block               The photo block content and attributes.
	 */
	public static function block_frontend( $attributes, $innerblocks_content, $block ) {
		// Determine if we want to execute this markup. Ignore for REST and admin requests.
		$can_output = true;
		if ( ( defined( 'REST_REQUEST' ) && REST_REQUEST ) || is_admin() ) {
			$can_output = false;
		}

		/**
		 * Filter whether the Photo block can output. Attempt not to load in admin.
		 *
		 * @param bool $can_output Whether the Photo block can output.
		 */
		$can_output = apply_filters( 'dlx_photo_block_can_output', $can_output );
		if ( ! $can_output ) {
			return;
		}

		// Let's sanitize the attributes.
		$attributes = Functions::sanitize_array_recursive( $attributes );

		// Get the unique ID for the image.
		$unique_id = $attributes['uniqueId'];

		// Begin buffer.
		ob_start();

		// First, let's determine if we're in a query loop.
		$is_in_query_loop    = false;
		$current_post_id     = get_queried_object_id();
		$maybe_query_post_id = $block->context['postId'] ?? 0;
		if ( $current_post_id === $maybe_query_post_id && 0 !== $maybe_query_post_id ) {
			$is_in_query_loop = true;
		}

		// Next, let's determine if we're in data mode.
		$is_in_data_mode = false;
		if ( true === $attributes['dataMode'] ) {
			$is_in_data_mode = true;
		}

		// Let's get the image information.
		$image_markup = '';
		if ( $is_in_data_mode ) {

		} else {
			// Get the image size.
			$image_size = $attributes['imageSize'] ?? 'full';

			// Get the image ID.
			$image_id = $attributes['imageDimensions']['id'] ?? 0;

			// Get any image classes.
			$image_classes = explode( ' ', $attributes['imageCSSClasses'] ) ?? array();

			// Determine if lazy loading is on.
			$skip_lazy_loading = $attributes['skipLazyLoading'] ?? false;

			// Get alt and title attributes.
			$image_alt   = $attributes['photo']['alt'] ?? '';
			$image_title = $attributes['photo']['title'] ?? '';

			// Get data attributes.
			$image_data_attributes = array();
			if ( ! empty( $attributes['customAttributes'] ) ) {
				foreach ( $attributes['customAttributes'] as $attribute ) {
					$image_data_attributes[ sanitize_key( $attribute['name'] ) ] = esc_attr( $attribute['value'] );
				}
			}

			// Get whether a CSS Gram filter is enabled.
			$css_gram_filter = $attributes['cssGramFilter'] ?? 'none';
			if ( 'none' !== $css_gram_filter ) {
				$image_classes[] = 'has-css-gram';
				$image_classes[] = 'photo-block-' . $css_gram_filter;

				// Register CSS Gram stylesheet.
				if ( ! wp_style_is( 'dlx-css-gram', 'registered' ) ) {
					wp_register_style(
						'dlx-css-gram',
						Functions::get_plugin_url( 'dist/dlx-css-gram.css' ),
						array(),
						Functions::get_plugin_version(),
						'all'
					);
				}

				// Print out the CSS Gram stylesheet.
				if ( ! wp_style_is( 'dlx-css-gram', 'done' ) ) {
					wp_print_styles( 'dlx-css-gram' );
				}
			}

			// Get the image markup.
			$image_markup = wp_get_attachment_image(
				$image_id,
				$image_size,
				false,
				array_merge(
					array(
						'class'   => 'dlx-photo-block__image ' . esc_attr( implode( ' ', $image_classes ) ),
						'loading' => $skip_lazy_loading ? false : 'lazy',
						'alt'     => $image_alt,
						'title'   => $image_title,
					),
					$image_data_attributes
				)
			);

			// Get the image link type.
			$media_link_type = $attributes['mediaLinkType'] ?? 'none';
			$media_link_url  = '';
			$media_link_atts = array();

			// If full, get the full link URL.
			if ( 'image' === $media_link_type ) {
				$media_link_img_src = wp_get_attachment_image_src( $image_id, 'full' );
				if ( $media_link_img_src ) {
					$media_link_url = $media_link_img_src[0];

					// Get lightbox attributes.
					$lightbox_enabled = (bool) $attributes['lightboxEnabled'] ?? false;
					if ( $lightbox_enabled ) {
						$media_link_atts['data-fancybox'] = 'true';

						// Register the lightbox script/style. Check wp_footer.
						wp_register_script(
							'dlx-photo-block-fancybox-js',
							Functions::get_plugin_url( 'assets/fancybox/fancybox.js' ),
							array(),
							Functions::get_plugin_version(),
							true
						);
						wp_add_inline_script(
							'dlx-photo-block-fancybox-js',
							'document.addEventListener("DOMContentLoaded", function() { if ( typeof Fancybox !== "undefined" ) { Fancybox.bind("#' . $unique_id . '[data-fancybox]"); });} if ( typeof jQuery.fancybox !== "undefined" ) { jQuery.fancybox.bind("#' . $unique_id . '[data-fancybox]"); }")'
						);

						// Get caption.
						$caption_enabled = (bool) $attributes['lightboxShowCaption'] ?? false;
						$caption_custom  = $attributes['lightboxCaption'] ?? '';
						if ( $caption_enabled && ! empty( $caption_custom ) ) {
							// todo - need to get regular single-line caption if available.
							$media_link_atts['data-caption'] = $caption_custom;
						}
					}
				}
			} elseif ( 'page' === $media_link_type ) {
				$media_link_url = wp_get_attachment_link( $image_id, 'full', true, false, false );
			} elseif ( 'custom' === $media_link_type ) {
				$media_link_url = $attributes['mediaLinkUrl'] ?? '';
			}

			// Fill in the link attributes.
			if ( 'none' !== $media_link_type ) {
				// Set new tab attribute.
				$open_new_tab = (bool) $attributes['mediaLinkNewTab'] ?? false;
				if ( $open_new_tab ) {
					$media_link_atts['target'] = '_blank';
				}

				// Set title attribute.
				$title_attr = $attributes['mediaLinkTitle'] ?? '';
				if ( ! empty( $title_attr ) ) {
					$media_link_atts['title'] = $title_attr;
				}

				// Set the rel attribute.
				$rel_attr = $attributes['mediaLinkRel'] ?? '';
				if ( ! empty( $rel_attr ) ) {
					$media_link_atts['rel'] = $rel_attr;
				}

				// Set the class attribute.
				$class_attr = $attributes['mediaLinkClass'] ?? '';
				if ( ! empty( $class_attr ) ) {
					$media_link_atts['class'] = $class_attr;
				}

				// Set the anchor ID attribute.
				$anchor_id_attr = $attributes['mediaLinkAnchorId'] ?? '';
				if ( ! empty( $anchor_id_attr ) ) {
					$media_link_atts['id'] = $anchor_id_attr;
				}
			}

			// Determine if there's a caption.
			$has_caption    = (bool) $attributes['hasCaption'] ?? false;
			$caption_markup = '';

			// Determine the caption position.
			$caption_position = $attributes['captionPosition'] ?? 'below';

			// Build caption markup if there's a caption.
			if ( $has_caption && ! empty( $innerblocks_content ) ) {

				$caption_classes = array(
					'dlx-photo-block__caption',
					'dlx-photo-block__caption--' . esc_attr( $caption_position ),
				);

				$caption_markup = sprintf(
					'<figcaption class="%2$s">%1$s</figcaption>',
					wp_kses_post( $innerblocks_content ),
					esc_attr( implode( ' ', $caption_classes ) )
				);
			}

			// If overlay, include at same level of image.
			if ( $has_caption && ! empty( $caption_markup ) && 'overlay' === $caption_position ) {
				$image_markup = $image_markup . $caption_markup;
			}

			// Output the link HTML around the image.
			if ( '' !== $media_link_url ) {
				$image_markup = sprintf(
					'<a data-fancybox href="%1$s" %2$s>%3$s</a>',
					esc_url( $media_link_url ),
					implode(
						' ',
						array_map(
							function( $v, $k ) {
								return sprintf( '%s="%s"', sanitize_key( $k ), esc_attr( $v ) ); },
							$media_link_atts,
							array_keys( $media_link_atts )
						)
					),
					$image_markup
				);
			}

			// Add image wrapper.
			$image_markup = sprintf(
				'<div class="dlx-photo-block__image-wrapper">%2$s</div>',
				esc_attr( $unique_id ),
				$image_markup
			);

			// If caption and top or bottom position, add in caption markup.
			if ( $has_caption && ! empty( $caption_markup ) && 'top' === $caption_position ) {
				$image_markup = $caption_markup . $image_markup;
			} elseif ( $has_caption && ! empty( $caption_markup ) && 'bottom' === $caption_position ) {
				$image_markup = $image_markup . $caption_markup;
			}

			// Get figure CSS advanced classes.
			$figure_css_classes   = explode( ' ', $attributes['figureCSSClasses'] ?? '' );
			$figure_css_classes[] = 'dlx-photo-block__figure';

			// Output figure markup.
			$image_markup = sprintf(
				'<figure class="%2$s">%1$s</figure>',
				$image_markup,
				esc_attr( implode( ' ', $figure_css_classes ) )
			);
		}

		// Wrap figure in section tag, gather classes from block props.
		$image_markup = sprintf(
			'<section id="%1$s" class="dlx-photo-block__container">%2$s</section>',
			$unique_id,
			$image_markup
		);

		// Begin frontend styles.
		$css_output = '';
		$css_helper = new CSS_Helper(
			$unique_id,
			'.dlx-photo-block__image-wrapper'
		);
		Functions::add_hierarchical_unit( $css_helper, $attributes['containerWidth'], 'width' );
		Functions::add_hierarchical_unit( $css_helper, $attributes['containerMaxWidth'], 'max-width' );
		Functions::add_hierarchical_unit( $css_helper, $attributes['containerMinWidth'], 'min-width' );
		Functions::add_hierarchical_unit( $css_helper, $attributes['containerHeight'], 'height' );
		Functions::add_hierarchical_unit( $css_helper, $attributes['containerMaxHeight'], 'max-height' );
		Functions::add_hierarchical_unit( $css_helper, $attributes['containerMinHeight'], 'min-height' );
		Functions::add_css_property( $css_helper, 'background-color', $attributes['photoBackgroundColor'] );
		$css_output .= $css_helper->get_css();

		// Determine if right+click protection is enabled.
		$right_click_protection_enabled = (bool) $attributes['imageProtectionEnabled'] ?? false;

		// If right+click protection is enabled, register dummy script and add inline image protection script.
		if ( $right_click_protection_enabled ) {
			wp_register_script(
				'dlx-photo-block-image-protection-js',
				null,
				array(),
				Functions::get_plugin_version(),
				true
			);
			wp_add_inline_script(
				'dlx-photo-block-image-protection-js',
				'document.getElementById("' . esc_js( $unique_id ) . '").addEventListener("contextmenu",function(e){e.preventDefault()},!1);'
			);
		}
		?>
			<style type="text/css">
				<?php echo esc_html( $css_output ); ?>
			</style>
		<?php
		// Output image markup.
		echo wp_kses( $image_markup, Functions::get_kses_allowed_html() );
		return ob_get_clean();
	}

	/**
	 * Add inline styles to Fancybox to override admin bar z-index.
	 */
	public static function add_fancybox_inline_styles() {
		// Register Fancybox for later if needed.
		wp_register_style(
			'dlx-photo-block-fancybox-css',
			Functions::get_plugin_url( 'assets/fancybox/fancybox.css' ),
			array(),
			Functions::get_plugin_version(),
			'all'
		);
		// Add CSS to override admin bar z-index.
		$fancybox_css_handles = array(
			'dlx-photo-block-fancybox-css', /* photo block */
			'jquery-fancybox', /* Easy Fancybox, jQuery Fancybox */
			'fancybox', /* Fancybox for WordPress */
		);
		foreach ( $fancybox_css_handles as $fancybox_css_handle ) {
			wp_add_inline_style(
				$fancybox_css_handle,
				'.fancybox__container{z-index:99999;}.fancybox-container{z-index:99999;}'
			);
		}
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

	/**
	 * Output any scripts/styles needed in the footer.
	 */
	public static function enqueue_footer_assets() {
		// If we've already enqueued fancybox, we don't need to do it again.
		// Compatible with other fancybox jquery plugins.
		if ( wp_script_is( 'fancybox', 'enqueued' ) || wp_script_is( 'jquery-fancybox', 'enqueued' ) || wp_script_is( 'has-fancybox-js', 'registered' ) ) {
			return;
		}

		// Make sure our fancybox scripts are registered.
		if ( wp_script_is( 'dlx-photo-block-fancybox-js', 'registered' ) ) {
			// Output our version of Fancybox.
			wp_print_scripts( array( 'dlx-photo-block-fancybox-js' ) );
		}

		// Make sure our fancybox styles are registered.
		if ( wp_style_is( 'dlx-photo-block-fancybox-css', 'registered' ) ) {
			wp_print_styles( array( 'dlx-photo-block-fancybox-css' ) );
		}

		// Print right+click protection script, if registered.
		if ( wp_script_is( 'dlx-photo-block-image-protection-js', 'registered' ) ) {
			wp_print_scripts( array( 'dlx-photo-block-image-protection-js' ) );
		}
	}
}
