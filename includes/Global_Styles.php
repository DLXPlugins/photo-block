<?php
/**
 * Set up Preset post type and functionality.
 *
 * @package PhotoBlock
 */

namespace DLXPlugins\PhotoBlock;

/**
 * Global Styles class.
 */
class Global_Styles {


	/**
	 * Main class runner.
	 */
	public static function run() {
		$self = new self();
		add_action( 'init', array( static::class, 'register_post_type' ) );
		add_action( 'wp_ajax_dlx_photo_block_load_global_styles', array( static::class, 'ajax_load_global_styles' ) );
		add_action( 'wp_ajax_dlx_photo_block_save_edited_global_style', array( static::class, 'ajax_save_edited_global_style' ) ); // For Updating an existing global style (like title).
		add_action( 'wp_ajax_dlx_photo_block_save_global_styles', array( static::class, 'ajax_save_global_styles' ) ); // For saving new global styles.
		add_action( 'wp_ajax_dlx_photo_block_delete_global_style', array( static::class, 'ajax_delete_global_style' ) );
		add_action( 'wp_ajax_dlx_photo_block_override_global_style', array( static::class, 'ajax_override_global_style' ) ); // For overwriting an existing global style.

		// For generating a new global styles file.
		add_action( 'wp_ajax_dlx_photo_block_generate_global_styles', array( static::class, 'generate_global_styles' ) );

		// Filter for adding localized vars to output.
		add_filter( 'dlx_photo_block_localized_vars', array( static::class, 'add_localized_vars' ) );

		return $self;
	}

	/**
	 * Return localized vars for use when saving and retrieving presets.
	 *
	 * @param array $vars The existing localized vars.
	 *
	 * @return array $vars The updated localized vars.
	 */
	public static function add_localized_vars( $vars ) {
		$vars['globalStylesLoadNonce']     = wp_create_nonce( 'dlx_photo_block_load_global_styles' );
		$vars['globalStylesSaveNewNonce']  = wp_create_nonce( 'dlx_photo_block_save_new_global_styles' );
		$vars['globalStylesCanEditor']     = current_user_can( 'edit_others_posts' );
		$vars['globalStylesGenerateNonce'] = wp_create_nonce( 'dlx_photo_block_generate_global_styles' );

		// Get the default preset (if any), and return it as localized variable.
		$default_global_styles = wp_cache_get( 'dlx_pb_global_styles' ); // can be false (empty) or array.
		if ( ! empty( $default_global_styles ) ) {
			$vars['globalStyles'] = $default_global_styles;
		}
		if ( false === $default_global_styles ) {
			$post_args = array(
				'post_type'      => 'dlx_pb_global_styles',
				'post_status'    => 'publish',
				'posts_per_page' => 50, /* lets hope there's not more than this */
				'order'          => 'ASC',
				'orderby'        => 'title',
			);
			$posts     = get_posts( $post_args );
			$preset    = array();
			if ( $posts ) {
				$global_styles = array();
				foreach ( $posts as $post ) {
					$content   = json_decode( $post->post_content, true );
					$css_class = get_post_meta( $post->ID, '_dlx_pb_css_class', true );
					$global_styles[ sanitize_key( $post->post_name ) ] = array(
						'id'           => $post->ID,
						'title'        => $post->post_title,
						'slug'         => $post->post_name,
						'css_class'    => $css_class ? $css_class : '',
						'content'      => Functions::sanitize_array_recursive( $content ),
						'delete_nonce' => wp_create_nonce( 'dlx_photo_block_delete_global_styles_' . $post->ID ),
						'save_nonce'   => wp_create_nonce( 'dlx_photo_block_save_global_styles_' . $post->ID ),
					);
				}
				wp_cache_set( 'dlx_pb_global_styles', $global_styles ); // Content would be attributes with key values `photoAttributes` and `captionAttributes`.
				$vars['globalStyles'] = $global_styles;
			} else {
				wp_cache_set( 'dlx_pb_default_global_styles', array() );
			}
		}
		return $vars;
	}

	/**
	 * Loads the presets and returns via Ajax.
	 */
	public static function ajax_load_global_styles() {
		// Verify nonce.
		if ( ! wp_verify_nonce( sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_SANITIZE_SPECIAL_CHARS ) ), 'dlx_photo_block_load_global_styles' ) || ! current_user_can( 'edit_posts' ) ) {
			wp_send_json_error( array() );
		}

		$return = self::return_saved_global_styles();

		wp_send_json_success( array( 'globalStyles' => $return ) );
	}

	/**
	 * Return saved presets.
	 *
	 * @return array $return The saved presets.
	 */
	private static function return_saved_global_styles() {
		// Get the presets.
		$args          = array(
			'post_type'      => 'dlx_pb_global_styles',
			'post_status'    => 'publish',
			'posts_per_page' => 100,
			'order'          => 'ASC',
			'orderby'        => 'title',
		);
		$global_styles = get_posts( $args );

		// Build the return array.
		$return = array();
		if ( $global_styles ) {
			foreach ( $global_styles as $global_style ) {
				// Format content that is JSON into an array.
				$content = json_decode( $global_style->post_content, true ); // Decode JSON here, then $content will be re-encoded in the return array.
				if ( isset( $content['attributes'] ) ) {
					$content = $content['attributes'];
				} else {
					continue;
				}
				$css_class_name = get_post_meta( $global_style->ID, '_dlx_pb_css_class', true );
				$content        = Functions::sanitize_array_recursive( $content );
				$return[]       = array(
					'id'           => $global_style->ID,
					'title'        => $global_style->post_title,
					'slug'         => $global_style->post_name,
					'css_class'    => $css_class_name ? $css_class_name : '',
					'content'      => $content, // No need to escape here because it will be re-encoded in the return array.
					'delete_nonce' => wp_create_nonce( 'dlx_photo_block_delete_global_styles_' . $global_style->ID ),
					'save_nonce'   => wp_create_nonce( 'dlx_photo_block_save_global_styles_' . $global_style->ID ),
				);
			}
		}
		return $return;
	}

	/**
	 * Saves a new preset and returns all via Ajax.
	 */
	public static function ajax_save_global_styles() {
		// Verify nonce.
		if ( ! wp_verify_nonce( sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_SANITIZE_SPECIAL_CHARS ) ), 'dlx_photo_block_save_new_global_styles' ) || ! current_user_can( 'publish_posts' ) ) {
			wp_send_json_error( array( 'message' => __( 'You do not have permissions to save global styles.', 'photo-block' ) ) );
		}

		// Get attributes JSON.
		$attributes = json_decode( sanitize_text_field( wp_unslash( $_POST['attributes'] ) ), true );

		// Get photo attributes and strip out data.
		$photo_attributes = array();
		foreach ( $attributes['photoAttributes'] as $key => $value ) {
			// If data makes up the first part of the key, then we want to strip it out.
			if ( 0 === strpos( $key, 'data' ) ) {
				continue;
			}
			$photo_keys_to_ignore = array(
				'uniqueId',
				'screen',
				'imageData',
				'globalStyle',
				'dataScreen',
				'altText',
				'htmlAnchor',
				'photoMode',
				'hideCaption',
			);
			/**
			 * Filter the photo keys to ignore when saving presets.
			 * This prevents attribute overrides.
			 *
			 * @param array $photo_keys_to_ignore Array of keys to ignore.
			 */
			$photo_keys_to_ignore = apply_filters( 'dlx_photo_block_photo_keys_to_ignore', $photo_keys_to_ignore );
			if ( in_array( $key, $photo_keys_to_ignore, true ) ) {
				continue;
			}
			$photo_attributes[ $key ] = $value;
		}
		$photo_attributes = Functions::sanitize_array_recursive( $photo_attributes );

		// Get caption attributes and strip out data.
		$caption_attributes = array();
		foreach ( $attributes['captionAttributes'] as $key => $value ) {
			// If data makes up the first part of the key, then we want to strip it out.
			if ( 0 === strpos( $key, 'data' ) ) {
				continue;
			}
			$caption_keys_to_ignore = array(
				'captionManual',
				'uniqueId',
			);
			/**
			 * Filter the caption keys to ignore when saving presets.
			 * This prevents attribute overrides.
			 *
			 * @param array $caption_keys_to_ignore Array of keys to ignore.
			 */
			$caption_keys_to_ignore = apply_filters( 'dlx_photo_block_caption_keys_to_ignore', $caption_keys_to_ignore );
			if ( in_array( $key, $caption_keys_to_ignore, true ) ) {
				continue;
			}
			$caption_attributes[ $key ] = $value;
		}
		$caption_attributes = Functions::sanitize_array_recursive( $caption_attributes );

		// Get form data.
		$form_data = json_decode( sanitize_text_field( wp_unslash( $_POST['formData'] ) ), true );

		// Get the preset title.
		$title          = isset( $form_data['globalStyleLabel'] ) ? sanitize_text_field( $form_data['globalStyleLabel'] ) : '';
		$slug           = isset( $form_data['globalStyleCSSClass'] ) ? sanitize_text_field( $form_data['globalStyleCSSClass'] ) : '';
		$slug_sanitized = sanitize_title( $slug );
		$css_class_name = isset( $form_data['globalStyleCSSClass'] ) ? sanitize_text_field( $form_data['globalStyleCSSClass'] ) : '';

		// Check if slug already exists.
		$maybe_slug_exists = get_page_by_path( $slug_sanitized, OBJECT, 'dlx_pb_global_styles' );
		if ( $maybe_slug_exists ) {
			wp_send_json_error( array( 'message' => __( 'A global style with that slug already exists.', 'photo-block' ) ) );
		}

		// Gather attributes.
		$attributes = array(
			'photoAttributes'   => $photo_attributes,
			'captionAttributes' => $caption_attributes,
		);

		// Insert new post with preset data.
		$post_id = wp_insert_post(
			array(
				'post_title'   => $title,
				'post_name'    => $slug_sanitized,
				'post_content' => wp_json_encode( $attributes, 1048 ),
				'post_status'  => 'publish',
				'post_type'    => 'dlx_pb_global_styles',
			)
		);
		if ( is_wp_error( $post_id ) ) {
			wp_send_json_error( array( 'message' => $post_id->get_error_message() ) );
		}

		// Add CSS class to post meta.
		if ( ! empty( $css_class_name ) ) {
			update_post_meta( $post_id, '_dlx_pb_css_class', $css_class_name );
		}

		// Get post.
		$global_style = get_post( $post_id );

		$return_global_style = array(
			'id'           => $global_style->ID,
			'title'        => $global_style->post_title,
			'slug'         => $global_style->post_name,
			'css_class'    => $css_class_name ? $css_class_name : '',
			'content'      => Functions::sanitize_array_recursive( json_decode( $global_style->post_content, true ), ),
			'delete_nonce' => wp_create_nonce( 'dlx_photo_block_delete_global_styles_' . $global_style->ID ),
			'save_nonce'   => wp_create_nonce( 'dlx_photo_block_save_global_styles_' . $global_style->ID ),
		);

		// Return the preset name and slug.
		wp_send_json_success( $return_global_style );
	}

	/**
	 * Purge defaults from the presets.
	 */
	private static function remove_default_global_styles() {
		if ( ! current_user_can( 'edit_others_posts' ) ) {
			return;
		}
		$args    = array(
			'post_type'      => 'dlx_pb_global_styles',
			'post_status'    => 'publish',
			'posts_per_page' => 100, /* if there's more presets than that, we have issues */
			'order'          => 'ASC',
			'orderby'        => 'title',
		);
		$presets = get_posts( $args );
		if ( $presets ) {
			foreach ( $presets as $preset ) {
				delete_post_meta( $preset->ID, '_dlx_pb_is_default' );
			}
		}
	}

	/**
	 * Overrides a global style and returns all saved presets.
	 */
	public static function ajax_override_global_style() {
		// Get preset post ID.
		$global_style_id = absint( filter_input( INPUT_POST, 'editId', FILTER_VALIDATE_INT ) );

		// Verify nonce.
		if ( ! wp_verify_nonce( sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_SANITIZE_SPECIAL_CHARS ) ), 'dlx_photo_block_save_new_global_styles' ) || ! current_user_can( 'edit_others_posts' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'You do not have permissions to save global styles.', 'photo-block' ),
				)
			);
		}

		// Get attributes JSON.
		$attributes = json_decode( sanitize_text_field( wp_unslash( $_POST['attributes'] ) ), true );

		// Get photo attributes and strip out data.
		$photo_attributes = array();
		foreach ( $attributes['photoAttributes'] as $key => $value ) {
			// If data makes up the first part of the key, then we want to strip it out.
			if ( 0 === strpos( $key, 'data' ) ) {
				continue;
			}
			$photo_keys_to_ignore = array(
				'uniqueId',
				'screen',
				'imageData',
				'dataScreen',
				'altText',
				'htmlAnchor',
				'globalStyle',
				'photoMode',
				'hideCaption',
			);
			/**
			 * Filter the photo keys to ignore when saving presets.
			 * This prevents attribute overrides.
			 *
			 * @param array $photo_keys_to_ignore Array of keys to ignore.
			 */
			$photo_keys_to_ignore = apply_filters( 'dlx_photo_block_photo_keys_to_ignore', $photo_keys_to_ignore );
			if ( in_array( $key, $photo_keys_to_ignore, true ) ) {
				continue;
			}
			$photo_attributes[ $key ] = $value;
		}
		$photo_attributes = Functions::sanitize_array_recursive( $photo_attributes );

		// Get caption attributes and strip out data.
		$caption_attributes = array();
		foreach ( $attributes['captionAttributes'] as $key => $value ) {
			// If data makes up the first part of the key, then we want to strip it out.
			if ( 0 === strpos( $key, 'data' ) ) {
				continue;
			}
			$caption_keys_to_ignore = array(
				'captionManual',
				'uniqueId',
				'globalStyle',
			);
			/**
			 * Filter the caption keys to ignore when saving presets.
			 * This prevents attribute overrides.
			 *
			 * @param array $caption_keys_to_ignore Array of keys to ignore.
			 */
			$caption_keys_to_ignore = apply_filters( 'dlx_photo_block_caption_keys_to_ignore', $caption_keys_to_ignore );
			if ( in_array( $key, $caption_keys_to_ignore, true ) ) {
				continue;
			}
			$caption_attributes[ $key ] = $value;
		}
		$caption_attributes = Functions::sanitize_array_recursive( $caption_attributes );

		// Gather attributes.
		$attributes = array(
			'photoAttributes'   => $photo_attributes,
			'captionAttributes' => $caption_attributes,
		);

		// Update post with new attribute data.
		wp_update_post(
			array(
				'ID'           => $global_style_id,
				'post_content' => wp_json_encode( $attributes, 1048 ),
			)
		);

		// Get the post.
		$global_style = get_post( $global_style_id );

		// Get the default CSS class.
		$css_class_name = get_post_meta( $global_style_id, '_dlx_pb_css_class', true );

		// Get the presets.
		$return_global_style = array(
			'id'           => $global_style_id,
			'title'        => sanitize_text_field( $global_style->post_title ),
			'slug'         => sanitize_text_field( $global_style->post_name ),
			'css_class'    => $css_class_name ? $css_class_name : '',
			'content'      => Functions::sanitize_array_recursive( json_decode( $global_style->post_content, true ), ),
			'delete_nonce' => wp_create_nonce( 'dlx_photo_block_delete_global_styles_' . $global_style_id ),
			'save_nonce'   => wp_create_nonce( 'dlx_photo_block_save_global_styles_' . $global_style_id ),
		);

		// Send json response.
		wp_send_json_success( $return_global_style );
	}

	/**
	 * Save a preset and return all via Ajax.
	 */
	public static function ajax_save_edited_global_style() {
		// Get preset post ID.
		$global_style_id = absint( filter_input( INPUT_POST, 'editId', FILTER_VALIDATE_INT ) );

		// Verify nonce.
		if ( ! wp_verify_nonce( sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_SANITIZE_SPECIAL_CHARS ) ), 'dlx_photo_block_save_global_styles_' . $global_style_id ) || ! current_user_can( 'edit_others_posts' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'You do not have permissions to save global styles.', 'photo-block' ),
				)
			);
		}

		// Get the preset title.
		$title = sanitize_text_field( filter_input( INPUT_POST, 'title', FILTER_SANITIZE_SPECIAL_CHARS ) );

		// Get the default CSS class.
		$css_class_name = sanitize_text_field( filter_input( INPUT_POST, 'cssClass', FILTER_SANITIZE_SPECIAL_CHARS ) );

		// Update the post title.
		wp_update_post(
			array(
				'ID'         => $global_style_id,
				'post_title' => $title,
			)
		);

		// Get the post.
		$global_style = get_post( $global_style_id );

		// Add CSS class to post meta.
		if ( ! empty( $css_class_name ) ) {
			update_post_meta( $global_style_id, '_dlx_pb_css_class', $css_class_name );
		}

		$return_global_style = array(
			'id'           => $global_style_id,
			'title'        => $title,
			'slug'         => $global_style->post_name,
			'css_class'    => $css_class_name ? $css_class_name : '',
			'content'      => Functions::sanitize_array_recursive( json_decode( $global_style->post_content, true ), ),
			'delete_nonce' => wp_create_nonce( 'dlx_photo_block_delete_global_styles_' . $global_style_id ),
			'save_nonce'   => wp_create_nonce( 'dlx_photo_block_save_global_styles_' . $global_style_id ),
		);

		// Send json response.
		wp_send_json_success( $return_global_style );
	}

	/**
	 * Delete a preset and return all via Ajax.
	 */
	public static function ajax_delete_global_style() {
		// Get preset post ID.
		$group_id = absint( filter_input( INPUT_POST, 'editId', FILTER_VALIDATE_INT ) );

		// Verify nonce.
		if ( ! wp_verify_nonce( sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_SANITIZE_SPECIAL_CHARS ) ), 'dlx_photo_block_delete_global_styles_' . $group_id ) || ! current_user_can( 'edit_others_posts' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'You do not have permissions to save global styles.', 'photo-block' ),
				)
			);
		}

		// Remove the post.
		wp_delete_post( $group_id, true );

		// Retrieve all presets.
		$return = self::return_saved_global_styles();

		// Send json response.
		wp_send_json_success( array( 'globalStyles' => $return ) );
	}

	/**
	 * Registers the Global Styles Post type.
	 */
	public static function register_post_type() {
		$labels = array(
			'name'               => __( 'Global Styles (Photo Block)', 'photo-block' ),
			'singular_name'      => __( 'Global Styles', 'photo-block' ),
			'add_new'            => __( 'Add New', 'photo-block' ),
			'add_new_item'       => __( 'Add New Global Style', 'photo-block' ),
			'edit_item'          => __( 'Edit Global Style', 'photo-block' ),
			'new_item'           => __( 'New Global Style', 'photo-block' ),
			'all_items'          => __( 'All Global Styles', 'photo-block' ),
			'view_item'          => __( 'View Global Style', 'photo-block' ),
			'search_items'       => __( 'Search Global Styles', 'photo-block' ),
			'not_found'          => __( 'No presets found', 'photo-block' ),
			'not_found_in_trash' => __( 'No presets found in Trash', 'photo-block' ),
			'parent_item_colon'  => '',
			'menu_name'          => __( 'Global Styles', 'photo-block' ),
		);

		$args = array(
			'labels'                  => $labels,
			'public'                  => false,
			'publicly_queryable'      => false,
			'show_ui'                 => false,
			'show_in_menu'            => false,
			'query_var'               => false,
			'rewrite'                 => false,
			'dlx_photo_block_archive' => false,
			'hierarchical'            => false,
		);

		register_post_type( 'dlx_pb_global_styles', $args );
	}

	/**
	 * Generate the global styles.
	 */
	public static function generate_global_styles() {
		// Verify nonce.
		if ( ! wp_verify_nonce( sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_SANITIZE_SPECIAL_CHARS ) ), 'dlx_photo_block_generate_global_styles' ) || ! current_user_can( 'edit_others_posts' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'You do not have permissions to save global styles.', 'photo-block' ),
				)
			);
		}
		// Let's see if there's already a global styles file.
		$upload_dir = wp_upload_dir();
		$upload_dir = trailingslashit( $upload_dir['basedir'] );
		$upload_dir = trailingslashit( $upload_dir . 'photo-block/' );

		if ( file_exists( $upload_dir . 'global-styles.css' ) ) {
			// Check to see if we need to cache bust based on constant and option.
			$cache_bust              = defined( 'DLX_PHOTO_BLOCK_CACHE_VERSION' ) ? DLX_PHOTO_BLOCK_CACHE_VERSION : false;
			$last_cache_bust_version = get_option( 'dlx_pb_cache_bust_version', false );

			/**
			 * Filter to allow clearing the global styles cache.
			 *
			 * @param bool $can_clear_cache Whether or not to clear the cache.
			 *
			 * @since 1.0.0
			 */
			$can_clear_cache = apply_filters( 'dlx_photo_block_clear_global_styles_cache', false );

			// Remove file if can clear cache or cache bust version is different.
			if ( $cache_bust !== $last_cache_bust_version || $can_clear_cache ) {
				wp_delete_file( $upload_dir . 'global-styles.css' );
				// Update the option.
				update_option( 'dlx_pb_cache_bust_version', $cache_bust );
			}
		}

		// Get the global styles from cache.
		$global_styles = wp_cache_get( 'dlx_pb_global_styles' );

		if ( false === $global_styles ) {
			// Begin generating global styles for the file.
			$post_args = array(
				'post_type'      => 'dlx_pb_global_styles',
				'post_status'    => 'publish',
				'posts_per_page' => 50, /* lets hope there's not more than this */
				'order'          => 'ASC',
				'orderby'        => 'title',
			);
			$posts     = get_posts( $post_args );

			wp_cache_set( 'dlx_pb_global_styles', $posts );
			$global_styles = $posts;

			// If there are no global styles, return.
			if ( empty( $posts ) ) {
				return;
			}
		}

		// Loop through global styles, extract attributes.
		$css_string = '';
		foreach ( $global_styles as $global_style ) {
			$content_attributes = json_decode( $global_style->post_content, true );
			$photo_attributes   = Functions::sanitize_array_recursive( $content_attributes['photoAttributes'] );
			$caption_attributes = Functions::sanitize_array_recursive( $content_attributes['captionAttributes'] );
			$css_class          = sanitize_text_field( get_post_meta( $global_style->ID, '_dlx_pb_css_class', true ) );
			$css_string        .= Functions::generate_photo_block_css( $photo_attributes, $css_class, true );
			$css_string        .= Functions::generate_photo_block_caption_css( $caption_attributes, $css_class, true );
		}

		/**
		 * Filter to allow adding additional global styles.
		 *
		 * @param string $css_string The CSS string.
		 * @param array  $photo_attributes The photo attributes.
		 * @param array  $caption_attributes The caption attributes.
		 *
		 * @since 1.0.0
		 */
		$css_string = apply_filters( 'dlx_photo_block_global_styles_css', $css_string, $photo_attributes, $caption_attributes );

		// Strip all excess whitespace.
		$css_string = preg_replace( '/\s+/', ' ', $css_string );

		// Write the CSS to the file.
		global $wp_filesystem;
		if ( ! is_a( $wp_filesystem, 'WP_Filesystem_Base' ) ) {
			require_once ABSPATH . '/wp-admin/includes/file.php';
			WP_Filesystem();
		}

		// Check if photo-block directory exists, if not create it.
		if ( ! $wp_filesystem->is_dir( $upload_dir ) ) {
			$wp_filesystem->mkdir( $upload_dir );
		}

		$wp_filesystem->put_contents( $upload_dir . 'global-styles.css', $css_string, FS_CHMOD_FILE );

		// Generate new version number for version caching.
		$new_version = sanitize_text_field( \wp_generate_password( 12, false, false ) );
		update_option( 'dlx_pb_global_style_version', $new_version );

		// Send json response.
		wp_send_json_success( array( 'message' => __( 'Global styles generated.', 'photo-block' ) ) );
	}
}
