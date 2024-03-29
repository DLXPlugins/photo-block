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
		register_block_type(
			Functions::get_plugin_dir( 'build/blocks/photo-caption-block/block.json' ),
			array(
				'render_callback' => array( static::class, 'caption_frontend' ),
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
	 * Output Photo caption block on the front-end.
	 *
	 * @param array    $attributes          Array of attributes for the Gutenberg block.
	 * @param string   $innerblocks_content The inner blocks content.
	 * @param WP_Block $block               The caption block content and attributes.
	 */
	public static function caption_frontend( $attributes, $innerblocks_content, $block ) {
		// Let's sanitize the attributes.
		$attributes = Functions::sanitize_array_recursive( $attributes );

		// First, let's determine if we're in a query loop.
		$is_in_query_loop    = false;
		$current_post_id     = get_queried_object_id();
		$maybe_query_post_id = $block->context['postId'] ?? 0;
		if ( $current_post_id === $maybe_query_post_id && 0 !== $maybe_query_post_id ) {
			$is_in_query_loop = true;
			$current_post_id  = $maybe_query_post_id;
		}

		// Override with data mode attribute.
		$is_in_data_mode = false;
		if ( true === (bool) $attributes['dataMode'] ) {
			$is_in_data_mode = true;
		}

		// Get caption mode.
		$mode = $attributes['mode'];

		// Begin caption classes.
		$caption_classes = array(
			'dlx-photo-block__caption',
		);
		// See if smart styles are enabled.
		if ( 'advanced' === $mode && ! (bool) $attributes['dataMode'] ) {
			$caption_classes[] = 'has-smart-styles';
		}

		$caption = '';
		if ( $is_in_query_loop && $is_in_data_mode ) {
			$caption = Functions::get_caption_from_source( $attributes, $current_post_id );
		} else {
			if ( 'single' === $mode ) {
				$caption = $attributes['captionManual'];
			} else {
				$caption = $innerblocks_content;
			}
		}
		

		// Begin caption overlay classes.
		$caption_overlay_styles   = array( 'dlx-photo-block__caption-overlay' );
		$caption_overlay_styles[] = 'is-overlay' === $attributes['captionPosition'] ? 'is-overlay' : '';
		$caption_overlay_styles[] = 'bottom' === $attributes['overlayCaptionVerticalPosition'] ? 'caption-vertical-bottom' : '';
		$caption_overlay_styles[] = 'middle' === $attributes['overlayCaptionVerticalPosition'] ? 'caption-vertical-middle' : '';
		$caption_overlay_styles[] = 'top' === $attributes['overlayCaptionVerticalPosition'] ? 'caption-vertical-top' : '';
		$caption_overlay_styles[] = 'left' === $attributes['overlayCaptionHorizontalPosition'] ? 'caption-horizontal-left' : '';
		$caption_overlay_styles[] = 'center' === $attributes['overlayCaptionHorizontalPosition'] ? 'caption-horizontal-center' : '';
		$caption_overlay_styles[] = 'right' === $attributes['overlayCaptionHorizontalPosition'] ? 'caption-horizontal-right' : '';
		$caption_overlay_styles[] = 'bottom' === $attributes['overlayVerticalPosition'] ? 'overlay-vertical-bottom' : '';
		$caption_overlay_styles[] = 'middle' === $attributes['overlayVerticalPosition'] ? 'overlay-vertical-middle' : '';
		$caption_overlay_styles[] = 'top' === $attributes['overlayVerticalPosition'] ? 'overlay-vertical-top' : '';
		$caption_overlay_styles[] = 'left' === $attributes['overlayHorizontalPosition'] ? 'overlay-horizontal-left' : '';
		$caption_overlay_styles[] = 'center' === $attributes['overlayHorizontalPosition'] ? 'overlay-horizontal-center' : '';
		$caption_overlay_styles[] = 'right' === $attributes['overlayHorizontalPosition'] ? 'overlay-horizontal-right' : '';

		ob_start();
		?>
		<?php
		if ( 'overlay' === $attributes['captionPosition'] ) {
			?>
				<div class="<?php echo esc_attr( implode( ' ', $caption_overlay_styles ) ); ?>">
			<?php
		}
		?>
			<figcaption class="<?php echo esc_attr( implode( ' ', $caption_classes ) ); ?>">
				<?php echo wp_kses_post( trim( $caption ) ); ?>
			</figcaption>
		<?php
		if ( 'overlay' === $attributes['captionPosition'] ) {
			?>
				</div>
			<?php
		}

		// Begin styles.
		$css_output = '';
		$css_helper = new CSS_Helper(
			$attributes['uniqueId'],
			'figcaption'
		);
		Functions::add_hierarchical_unit( $css_helper, $attributes['containerWidth'], 'width' );
		Functions::add_hierarchical_unit( $css_helper, $attributes['containerMaxWidth'], 'max-width' );
		Functions::add_hierarchical_unit( $css_helper, $attributes['containerMinWidth'], 'min-width' );
		Functions::add_hierarchical_unit( $css_helper, $attributes['containerHeight'], 'height' );
		Functions::add_hierarchical_unit( $css_helper, $attributes['containerMaxHeight'], 'max-height' );
		Functions::add_hierarchical_unit( $css_helper, $attributes['containerMinHeight'], 'min-height' );
		Functions::add_css_property( $css_helper, 'background-color', $attributes['captionBackgroundColor'] );
		Functions::build_dimension_css( $css_helper, $attributes['captionBorderRadius'], 'border-radius' );
		Functions::build_dimension_css( $css_helper, $attributes['captionPaddingSize'], 'padding' );
		Functions::build_dimension_css( $css_helper, $attributes['captionMarginSize'], 'margin' );

		$attributes['dataMode'] = false;
		if ( 'single' === $mode && ! (bool) $attributes['dataMode'] ) {
			Functions::add_css_property( $css_helper, 'color', $attributes['captionTextColor'] );
			Functions::build_typography_css( $css_helper, $attributes['captionTypography'] );
			Functions::add_css_property( $css_helper, 'text-align', $attributes['captionAlign'] );

			if ( 'custom' === $attributes['captionTypography']['desktop']['fontFamilySlug'] ) {
				// Fill in anchor CSS.
				$custom_caption_font = new CSS_Helper(
					$attributes['uniqueId'],
					'figcaption'
				);
				$custom_font_family = $attributes['captionTypography']['captionCustomTypography'] ?? null;
				Functions::add_css_property( $custom_caption_font, 'font-family', $custom_font_family );
				$css_output .= $custom_caption_font->get_css();
			}

			// Fill in anchor CSS.
			$figcaption_anchor = new CSS_Helper(
				$attributes['uniqueId'],
				'figcaption a'
			);
			Functions::add_css_property( $figcaption_anchor, 'color', $attributes['captionLinkColor'] );
			$css_output .= $figcaption_anchor->get_css();

			// Get anchor hover state.
			$figcaption_anchor_hover = new CSS_Helper(
				$attributes['uniqueId'],
				'figcaption a:hover'
			);
			Functions::add_css_property( $figcaption_anchor_hover, 'color', $attributes['captionLinkHoverColor'] );
			$css_output .= $figcaption_anchor_hover->get_css();
		}
		$css_output .= $css_helper->get_css();

		if ( 'overlay' === $attributes['captionPosition'] ) {
			$overlay_css_helper = new CSS_Helper(
				$attributes['uniqueId'],
				'.dlx-photo-block__caption-overlay'
			);
			Functions::build_dimension_css( $overlay_css_helper, $attributes['captionBorderRadius'], 'border-radius' );
			Functions::add_css_property( $overlay_css_helper, 'overflow', 'hidden' );
			$css_output .= $overlay_css_helper->get_css();
		}

		if ( 'advanced' === $mode && ! (bool) $attributes['dataMode'] ) {
			$smart_styles = new CSS_Helper(
				$attributes['uniqueId'],
				'figcaption'
			);
			Functions::add_css_property( $smart_styles, '--dlx-photo-block__caption-text-color', $attributes['captionTextColor'] );
			Functions::add_css_property( $smart_styles, '--dlx-photo-block__caption-accent-color', $attributes['captionAccentColor'] );
			Functions::add_css_property( $smart_styles, '--dlx-photo-block__caption-secondary-color', $attributes['captionSecondaryColor'] );
			Functions::add_css_property( $smart_styles, '--dlx-photo-block__caption-font-family', $attributes['captionTextFontFamily'] );
			Functions::add_css_property( $smart_styles, '--dlx-photo-block__caption-headings-font-family', $attributes['captionHeadingsFontFamily'] );
			Functions::build_font_size_css( $smart_styles, $attributes['captionBaseFontSize'], '--dlx-photo-block__caption-font-size' );
			$css_output .= $smart_styles->get_css();
		}

		/* Overlay solid color styles */
		if ( 'overlay' === $attributes['captionPosition'] && 'solid' === $attributes['overlayBackgroundType'] ) {
			$caption_overlay_styles = new CSS_Helper(
				$attributes['uniqueId'],
				'.dlx-photo-block__caption-overlay:before'
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
			Functions::add_css_property( $caption_overlay_styles, 'background', $attributes['overlayBackgroundColor'] );
			Functions::add_css_property( $caption_overlay_styles, 'z-index', '1' );
			Functions::build_dimension_css( $caption_overlay_styles, $attributes['overlayBorderRadius'], 'border-radius' );
			$css_output .= $caption_overlay_styles->get_css();

			$caption_overlay_hover_styles = new CSS_Helper(
				$attributes['uniqueId'],
				'.dlx-photo-block__caption-overlay:hover:before'
			);
			Functions::add_css_property( $caption_overlay_hover_styles, 'background', $attributes['overlayBackgroundColorHover'] );
			$css_output .= $caption_overlay_hover_styles->get_css();
		}

		/* overlay gradient styles */
		if ( 'overlay' === $attributes['captionPosition'] && 'gradient' === $attributes['overlayBackgroundType'] ) {
			$caption_overlay_gradient_styles = new CSS_Helper(
				$attributes['uniqueId'],
				'.dlx-photo-block__caption-overlay:before'
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
			Functions::add_css_property( $caption_overlay_gradient_styles, 'background-image', $attributes['overlayBackgroundGradient'] );
			Functions::add_css_property( $caption_overlay_gradient_styles, 'opacity', $attributes['overlayBackgroundGradientOpacity'] );
			Functions::add_css_property( $caption_overlay_gradient_styles, 'z-index', '1' );
			Functions::build_dimension_css( $caption_overlay_gradient_styles, $attributes['overlayBorderRadius'], 'border-radius' );
			$css_output .= $caption_overlay_gradient_styles->get_css();

			$caption_overlay_gradient_hover_styles = new CSS_Helper(
				$attributes['uniqueId'],
				'.dlx-photo-block__caption-overlay:hover:before'
			);
			Functions::add_css_property( $caption_overlay_gradient_hover_styles, 'opacity', $attributes['overlayBackgroundGradientOpacityHover'] );
			$css_output .= $caption_overlay_gradient_hover_styles->get_css();
		}

		/* overlay image styles */
		if ( 'overlay' === $attributes['captionPosition'] && 'image' === $attributes['overlayBackgroundType'] && ! empty( $attributes['overlayBackgroundImage']['url'] ) ) {
			$caption_overlay_image_styles = new CSS_Helper(
				$attributes['uniqueId'],
				'.dlx-photo-block__caption-overlay:before'
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
			Functions::add_css_property( $caption_overlay_image_styles, 'background-color', $attributes['overlayBackgroundImage']['backgroundColor'] );
			Functions::add_css_property( $caption_overlay_image_styles, 'background-image', 'url(\'' . $attributes['overlayBackgroundImage']['url'] . '\')' );
			Functions::add_css_property( $caption_overlay_image_styles, 'background-position', $attributes['overlayBackgroundImage']['backgroundPosition'] );
			Functions::add_css_property( $caption_overlay_image_styles, 'background-repeat', $attributes['overlayBackgroundImage']['backgroundRepeat'] );
			Functions::add_css_property( $caption_overlay_image_styles, 'opacity', $attributes['overlayBackgroundImage']['backgroundOpacity'] );
			Functions::add_css_property( $caption_overlay_image_styles, 'z-index', '1' );
			Functions::build_dimension_css( $caption_overlay_image_styles, $attributes['overlayBorderRadius'], 'border-radius' );
			$css_output .= $caption_overlay_image_styles->get_css();

			$caption_overlay_image_hover_styles = new CSS_Helper(
				$attributes['uniqueId'],
				'.dlx-photo-block__caption-overlay:hover:before'
			);
			Functions::add_css_property( $caption_overlay_image_hover_styles, 'opacity', $attributes['overlayBackgroundImage']['backgroundOpacityHover'] );
			$css_output .= $caption_overlay_image_hover_styles->get_css();
		}

		?>
		<style type="text/css"><?php echo $css_output; ?></style>
		<?php
		$caption = ob_get_clean();
		return $caption;
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
			$current_post_id  = $maybe_query_post_id;
		}

		// Get the post author for later (if applicable).
		$post_author_id = 0;
		if ( $is_in_query_loop && $current_post_id ) {
			$post_author_id = get_post_field( 'post_author', $current_post_id );
		}

		// Next, let's determine if we're in data mode.
		$is_in_data_mode = false;
		if ( true === $attributes['dataMode'] ) {
			$is_in_data_mode = true;
		}

		// Get the image size.
		$image_size = $attributes['imageSize'] ?? 'full';

		// Placeholder to tell if image is avatar (no image ID).
		$is_avatar = false;

		// Build image data. (only applicable if in data mode).
		$image_data = false;

		// Let's get image data and modify the attributes if in query loop or data mode.
		if ( $is_in_data_mode ) {

			// Get the image data.
			$image_data_source = $attributes['dataSource'] ?? 'currentPost'; /* can be currentPost, postType */
			$image_source      = $attributes['dataImageSource'] ?? 'featuredImage'; /* can be featuredImage, customField, authorAvatar, authorMeta */

			// Placeholdr for image ID and src.
			$image_id        = 0;
			$maybe_image_src = false;

			// Get the image ID if current post.
			if ( 'currentPost' === $image_data_source || 'postType' === $image_data_source ) {

				// If post type, get the post ID.
				if ( 'postType' === $image_data_source ) {
					$post_type      = $attributes['dataPostType'] ?? 'post';
					$post_type_id   = $attributes['dataPostId'] ?? 0;
					$post_type_post = get_post( $post_type_id );
					if ( $post_type_post ) {
						$current_post_id = $post_type_post->ID;
						$post_author_id  = $post_type_post->post_author;
					}
				}

				switch ( $image_source ) {
					case 'featuredImage':
						$image_id = get_post_thumbnail_id( $current_post_id );
						break;
					case 'customField':
						// We need to get the post meta.
						$data_post_meta_key = $attributes['dataImageSourceCustomField'] ?? '';
						$custom_field_value = get_post_meta( $current_post_id, $data_post_meta_key, true );
						$image_id           = Functions::get_image_id_or_url_from_custom_field( $custom_field_value, $data_post_meta_key );
						break;
					case 'authorAvatar':
						$image_id = 0;
						break;
					case 'authorMeta':
						$author_meta_field = $attributes['dataImageSourceAuthorMeta'] ?? 'avatar';
						$image_id          = Functions::get_author_image_from_meta( $image_size, $author_meta_field, $post_author_id );
						break;
				}
			}

			// Check for avatar.
			if ( 'authorAvatar' === $image_source && 0 === $image_id ) {
				$avatar = get_avatar_url( $post_author_id, array( 'size' => $image_size ) );
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

			// Overwrite attributes so we can use the same output code.
			if ( false !== $image_data ) {
				$attributes['imageDimensions'] = $image_data;
				$attributes['photo']           = $image_data;
			}
		}

		// Get alt/title attributes.
		$image_alt   = $attributes['photo']['alt'] ?? '';
		$image_title = $attributes['photo']['title'] ?? '';

		// Replace image alt with data (if needed).
		if ( $is_in_data_mode ) {
			$image_alt   = Functions::get_alt_text_from_source( $attributes, $current_post_id, $image_alt );
			$image_title = Functions::get_title_text_from_source( $attributes, $current_post_id, $image_title );
		}

		// Let's get the image information.
		$image_markup = '';
		if ( ! $image_data && $is_in_data_mode ) {
			// Bail if no image data and in data mode.
			return;
		} else {

			// Get the image ID.
			$image_id = absint( $attributes['photo']['id'] ?? 0 );

			// Get any image classes.
			$image_classes = explode( ' ', $attributes['imageCSSClasses'] ) ?? array();

			// Determine if lazy loading is on.
			$skip_lazy_loading = $attributes['skipLazyLoading'] ?? false;

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
			if ( ! $is_avatar ) {
				if ( 0 === $image_id && ! empty( $attributes['photo']['url'] ) ) {
					// Manual URL entry.
					$image_markup = '<img src="' . esc_url( $attributes['photo']['url'] ) . '" alt="' . esc_attr( $image_alt ) . '" class="dlx-photo-block__image ' . esc_attr( implode( ' ', $image_classes ) ) . '" loading="' . ( $skip_lazy_loading ? 'auto' : 'lazy' ) . '">';
				} elseif ( $image_id ) {
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
				}
			} else {
				
				$image_markup = get_avatar(
					$post_author_id,
					$image_size,
					'',
					$image_alt,
					array(
						'class'   => 'dlx-photo-block__image ' . esc_attr( implode( ' ', $image_classes ) ),
						'loading' => $skip_lazy_loading ? false : 'lazy',
					)
				);
			}

			// Get the caption.
			if ( $attributes['lightboxCaption'] ) {
				$caption = $attributes['lightboxCaption'];
			} else {
				$caption = wp_strip_all_tags( $innerblocks_content );
			}

			// Get the image link type.
			$media_link_type = $attributes['mediaLinkType'] ?? 'none';
			$media_link_url  = '';
			$media_link_atts = array();
			if ( $is_in_data_mode ) {
				$media_link_type = $attributes['dataMediaLinkSource'] ?? 'none';
			}

			switch ( $media_link_type ) {
				case 'none':
					$media_link_url = '';
					break;
				case 'image':
				case 'imageFile':
					if ( 0 === $image_id ) {
						$media_link_url = $attributes['photo']['url'] ?? '';
					} else {
						$media_link_url = wp_get_attachment_url( $image_id );
					}
					if ( $media_link_url ) {

						// Get lightbox attributes.
						$lightbox_enabled = (bool) $attributes['lightboxEnabled'] ?? false;
						if ( $lightbox_enabled ) {
							$media_link_atts['data-fancybox'] = 'true';
							$media_link_atts['data-caption']  = esc_attr( $caption );

							// Register the lightbox script/style. Check wp_footer.
							wp_register_script(
								'dlx-photo-block-fancybox-js',
								Functions::get_plugin_url( 'assets/fancybox/fancybox.js' ),
								array(),
								Functions::get_plugin_version(),
								true
							);
							wp_register_script(
								'dlx-photo-block-fancybox-js-inline',
								false
							);
							wp_add_inline_script(
								'dlx-photo-block-fancybox-js-inline',
								'document.addEventListener("DOMContentLoaded", function() { if ( typeof Fancybox !== "undefined" ) { Fancybox.bind("#' . $unique_id . ' [data-fancybox]"); }; if ( typeof jQuery.fancybox !== "undefined" ) { jQuery.fancybox.bind("#' . $unique_id . '[data-fancybox]"); } });'
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
					break;
				case 'authorMeta':
					$media_link_author_meta_field = $attributes['dataMediaLinkAuthorMeta'] ?? '';
					$media_link_author_meta_field = sanitize_key( $media_link_author_meta_field );
					$media_link_value             = sanitize_text_field( get_the_author_meta( $media_link_author_meta_field, $post_author_id ) );
					$media_link_url               = esc_url( $media_link_value );
					break;
				case 'authorArchive':
				case 'authorPermalink':
					$media_link_url = get_author_posts_url( $post_author_id );
					break;
				case 'customField':
					$media_link_custom_field = $attributes['dataMediaLinkPostMeta'] ?? '';
					$media_link_custom_field = sanitize_key( $media_link_custom_field );
					$media_link_value        = sanitize_text_field( get_post_meta( $current_post_id, $media_link_custom_field, true ) );
					$media_link_url          = esc_url( $media_link_value );
					break;
				case 'postPermalink':
					$media_link_url = get_permalink( $current_post_id );
					break;
				case 'imageMeta':
					$image_meta_custom_field = $attributes['dataMediaLinkImageCustomField'] ?? '';
					$image_meta_custom_field = sanitize_key( $image_meta_custom_field );
					$image_meta_value        = sanitize_text_field( get_post_meta( $current_post_id, $image_meta_custom_field, true ) );
					$media_link_url          = esc_url( $image_meta_value );
					break;
				case 'page':
				case 'imageAttachmentPage':
					$media_link_url = wp_get_attachment_url( $image_id );
					break;
				case 'custom':
					$media_link_url = $attributes['mediaLinkUrl'] ?? '';
					break;
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

				$caption_markup = wp_kses( $innerblocks_content, Functions::get_kses_allowed_html() );
			}

			// If overlay, include at same level of image.
			if ( $has_caption && ! empty( $caption_markup ) && 'overlay' === $caption_position ) {
				$image_markup = $image_markup . $caption_markup;
			}

			// Output the link HTML around the image.
			if ( '' !== $media_link_url ) {
				$image_markup = sprintf(
					'<a data-fancybox data-caption-"%4$s" href="%1$s" %2$s>%3$s</a>',
					esc_url( $media_link_url ),
					implode(
						' ',
						array_map(
							function ( $v, $k ) {
								return sprintf( '%s="%s"', sanitize_key( $k ), esc_attr( $v ) ); },
							$media_link_atts,
							array_keys( $media_link_atts )
						)
					),
					$image_markup,
					esc_attr( $caption )
					
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
			'<section id="%1$s" class="dlx-photo-block__container align%3$s">%2$s</section>',
			$unique_id,
			$image_markup,
			esc_attr( $attributes['align'] )
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
		Functions::build_dimension_css( $css_helper, $attributes['photoBorderRadius'], 'border-radius' );
		$css_output .= $css_helper->get_css();

		// Output image styles.
		$image_css_helper = new CSS_Helper(
			$unique_id,
			'img'
		);
		Functions::add_css_property( $image_css_helper, 'opacity', (float) $attributes['photoOpacity'] );
		if ( $attributes['photoBlur'] ) {
			Functions::add_css_property( $image_css_helper, 'filter', 'blur(' . (int) $attributes['photoBlur'] . 'px)' );
		}
		if ( 'none' !== $attributes['photoObjectFit'] ) {
			Functions::add_css_property( $image_css_helper, 'object-fit', $attributes['photoObjectFit'] );
			Functions::add_css_property( $image_css_helper, 'width', '100%' );
			Functions::add_css_property( $image_css_helper, 'height', '100%' );
		}
		if ( 'none' !== $attributes['photoObjectFit'] && 'none' !== $attributes['photoObjectPosition'] ) {
			Functions::add_css_property( $image_css_helper, 'object-position', $attributes['photoObjectPosition'] );
		}
		if ( 'none' !== $attributes['photoObjectFit'] && 'custom' === $attributes['photoObjectPosition'] && '' !== $attributes['photoObjectPositionCustom'] ) {
			Functions::add_css_property( $image_css_helper, 'object-position', $attributes['photoObjectPositionCustom'] );
		}
		Functions::build_dimension_css( $image_css_helper, $attributes['photoPaddingSize'], 'padding' );
		Functions::build_dimension_css( $image_css_helper, $attributes['photoMarginSize'], 'margin' );
		Functions::build_dimension_css( $image_css_helper, $attributes['photoBorderRadius'], 'border-radius' );
		$css_output .= $image_css_helper->get_css();

		// Add photo drop shadow.
		if ( (bool) $attributes['photoDropShadow']['enabled'] ) {
			$css_output .= sprintf(
				'#%1$s img {
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
				$attributes['photoDropShadow']['color']
			);
		}

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
			if ( wp_script_is( 'dlx-photo-block-fancybox-js', 'registered' ) ) {
				wp_register_script( 'dlx-photo-block-fancybox-js-inline', false );
				
				wp_print_scripts( 'dlx-photo-block-fancybox-js-inline' );
			}
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
