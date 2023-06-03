<?php
/**
 * Set up Preset post type and functionality.
 *
 * @package PhotoBlock
 */

namespace DLXPlugins\PhotoBlock;

/**
 * Presets class.
 */
class Presets {


	/**
	 * Main class runner.
	 */
	public static function run() {
		$self = new self();
		add_action( 'init', array( static::class, 'register_post_type' ) );
		add_action( 'wp_ajax_dlx_photo_block_load_presets', array( static::class, 'ajax_load_presets' ) );
		add_action( 'wp_ajax_dlx_photo_block_save_preset', array( static::class, 'ajax_save_preset' ) ); // For Updating an existing preset (like title).
		add_action( 'wp_ajax_dlx_photo_block_save_presets', array( static::class, 'ajax_save_presets' ) ); // For saving new presets.
		add_action( 'wp_ajax_dlx_photo_block_delete_preset', array( static::class, 'ajax_delete_preset' ) );
		add_action( 'wp_ajax_dlx_photo_block_override_preset', array( static::class, 'ajax_override_preset' ) ); // For overwriting an existing preset.

		// Filter for adding localized vars to output.
		add_filter( 'photo_block_localized_vars', array( static::class, 'add_localized_vars' ) );
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
		$vars['presetLoadNonce']    = wp_create_nonce( 'dlx_photo_block_load_presets' );
		$vars['presetSaveNewNonce'] = wp_create_nonce( 'dlx_photo_block_save_new_preset' );
		$vars['presetCanEditor']    = current_user_can( 'edit_others_posts' );
		return $vars;
	}

	/**
	 * Loads the presets and returns via Ajax.
	 */
	public static function ajax_load_presets() {
		// Verify nonce.
		if ( ! wp_verify_nonce( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ), 'dlx_photo_block_load_presets' ) || ! current_user_can( 'edit_posts' ) ) {
			wp_send_json_error( array() );
		}

		$return = self::return_saved_presets();

		wp_send_json_success( array( 'presets' => $return ) );
	}

	/**
	 * Return saved presets.
	 *
	 * @return array $return The saved presets.
	 */
	private static function return_saved_presets() {
		// Get the presets.
		$args    = array(
			'post_type'      => 'dlx_pb_presets',
			'post_status'    => 'publish',
			'posts_per_page' => 100,
			'order'          => 'ASC',
			'orderby'        => 'title',
		);
		$presets = get_posts( $args );

		// Build the return array.
		$return = array();
		if ( $presets ) {
			foreach ( $presets as $preset ) {
				// Format content that is JSON into an array.
				$content           = json_decode( $preset->post_content, true ); // Decode JSON here, then $content will be re-encoded in the return array.
				$content           = Functions::sanitize_array_recursive( $content );
				$is_default_preset = get_post_meta( $preset->ID, '_dlx_pb_is_default', true );
				$return[]          = array(
					'id'           => $preset->ID,
					'title'        => $preset->post_title,
					'slug'         => $preset->post_name,
					'is_default'   => $is_default_preset ? true : false,
					'content'      => $content, // No need to escape here because it will be re-encoded in the return array.
					'delete_nonce' => wp_create_nonce( 'dlx_photo_block_delete_preset_' . $preset->ID ),
					'save_nonce'   => wp_create_nonce( 'dlx_photo_block_save_preset_' . $preset->ID ),
				);
			}
		}
		return $return;
	}

	/**
	 * Saves a new preset and returns all via Ajax.
	 */
	public static function ajax_save_presets() {
		// Verify nonce.
		if ( ! wp_verify_nonce( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ), 'dlx_photo_block_save_new_preset' ) || ! current_user_can( 'edit_others_posts' ) ) {
			wp_send_json_error( array() );
		}

		// Get attributes JSON.
		$attributes = json_decode( filter_input( INPUT_POST, 'attributes', FILTER_DEFAULT ), true );

		// Get photo attributes and strip out data.
		$photo_attributes = array();
		foreach ( $attributes['photoAttributes'] as $key => $value ) {
			// If data makes up the first part of the key, then we want to strip it out.
			if ( 0 === strpos( $key, 'data' ) ) {
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
		$form_data = json_decode( filter_input( INPUT_POST, 'formData', FILTER_DEFAULT ), true );

		// Get the preset title.
		$title           = isset( $form_data['presetTitle'] ) ? sanitize_text_field( $form_data['presetTitle'] ) : '';
		$title_sanitized = sanitize_title( $title );

		// Gather attributes.
		$attributes = array(
			'photoAttributes'   => $photo_attributes,
			'captionAttributes' => $caption_attributes,
		);

		// Insert new post with preset data.
		$post_id = wp_insert_post(
			array(
				'post_title'   => $title,
				'post_name'    => $title_sanitized,
				'post_content' => wp_json_encode( array( 'attributes' => $attributes ), 1048 ),
				'post_status'  => 'publish',
				'post_type'    => 'dlx_pb_presets',
			)
		);

		// Check if preset should be default.
		$is_default = false;
		if ( isset( $form_data['isDefault'] ) ) {
			$is_default = filter_var( $form_data['isDefault'], FILTER_VALIDATE_BOOLEAN );
		}
		if ( $is_default ) {
			// Remove default from all other presets.
			self::remove_default_presets();

			// Set this preset as default.
			update_post_meta( $post_id, '_dlx_pb_is_default', true );
		}

		// Get the presets.
		$return = self::return_saved_presets();
		wp_send_json_success( array( 'presets' => $return ) );
	}

	/**
	 * Purge defaults from the presets.
	 */
	private static function remove_default_presets() {
		$args    = array(
			'post_type'      => 'dlx_pb_presets',
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
	 * Overrides a preset and returns all saved presets.
	 */
	public static function ajax_override_preset() {
		// Get preset post ID.
		$preset_id = absint( filter_input( INPUT_POST, 'editId', FILTER_DEFAULT ) );

		// Verify nonce.
		if ( ! wp_verify_nonce( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ), 'dlx_photo_block_save_presets' ) || ! current_user_can( 'edit_others_posts' ) ) {
			wp_send_json_error( array() );
		}

		// Get attributes JSON.
		$attributes = json_decode( filter_input( INPUT_POST, 'attributes', FILTER_DEFAULT ), true );

		// Get isdefault value for presets.
		$is_default = filter_var( filter_input( INPUT_POST, 'isDefault', FILTER_DEFAULT ), FILTER_VALIDATE_BOOLEAN );

		// Get photo attributes and strip out data.
		$photo_attributes = array();
		foreach ( $attributes['photoAttributes'] as $key => $value ) {
			// If data makes up the first part of the key, then we want to strip it out.
			if ( 0 === strpos( $key, 'data' ) ) {
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
				'ID'           => $preset_id,
				'post_content' => wp_json_encode( array( 'attributes' => $attributes ), 1048 ),
			)
		);

		// Check if preset should be default.
		if ( $is_default ) {
			// Remove default from all other presets.
			self::remove_default_presets();

			// Set this preset as default.
			update_post_meta( $preset_id, '_dlx_pb_is_default', true );
		}

		// Get the presets.
		$return = self::return_saved_presets();
		wp_send_json_success( array( 'presets' => $return ) );
	}

	/**
	 * Save a preset and return all via Ajax.
	 */
	public static function ajax_save_preset() {
		// Get preset post ID.
		$preset_id  = absint( filter_input( INPUT_POST, 'editId', FILTER_DEFAULT ) );
		$is_default = filter_var( filter_input( INPUT_POST, 'isDefault', FILTER_DEFAULT ), FILTER_VALIDATE_BOOLEAN );

		// Verify nonce.
		if ( ! wp_verify_nonce( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ), 'dlx_photo_block_save_preset_' . $preset_id ) || ! current_user_can( 'edit_others_posts' ) ) {
			wp_send_json_error( array() );
		}

		// Get the preset title.
		$title = sanitize_text_field( filter_input( INPUT_POST, 'title', FILTER_DEFAULT ) );

		// Update the post title.
		wp_update_post(
			array(
				'ID'         => $preset_id,
				'post_title' => $title,
			)
		);

		// If default, clear all other defaults.
		if ( $is_default ) {
			// Remove default from all other presets.
			self::remove_default_presets();

			// Set this preset as default.
			update_post_meta( $preset_id, '_dlx_pb_is_default', true );
		} else {
			// Remove default from this preset.
			delete_post_meta( $preset_id, '_dlx_pb_is_default' );
		}

		// Retrieve all presets.
		$return = self::return_saved_presets();

		// Send json response.
		wp_send_json_success( array( 'presets' => $return ) );
	}

	/**
	 * Delete a preset and return all via Ajax.
	 */
	public static function ajax_delete_preset() {
		// Get preset post ID.
		$preset_id = absint( filter_input( INPUT_POST, 'editId', FILTER_DEFAULT ) );

		// Verify nonce.
		if ( ! wp_verify_nonce( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ), 'dlx_photo_block_delete_preset_' . $preset_id ) || ! current_user_can( 'edit_others_posts' ) ) {
			wp_send_json_error( array() );
		}

		// Remove the post.
		wp_delete_post( $preset_id, true );

		// Retrieve all presets.
		$return = self::return_saved_presets();

		// Send json response.
		wp_send_json_success( array( 'presets' => $return ) );
	}

	/**
	 * Registers the Presets Post type.
	 */
	public static function register_post_type() {
		$labels = array(
			'name'               => __( 'Presets', 'photo-block' ),
			'singular_name'      => __( 'Presets', 'photo-block' ),
			'add_new'            => __( 'Add New', 'photo-block' ),
			'add_new_item'       => __( 'Add New Preset', 'photo-block' ),
			'edit_item'          => __( 'Edit Preset', 'photo-block' ),
			'new_item'           => __( 'New Preset', 'photo-block' ),
			'all_items'          => __( 'All Presets', 'photo-block' ),
			'view_item'          => __( 'View Preset', 'photo-block' ),
			'search_items'       => __( 'Search Presets', 'photo-block' ),
			'not_found'          => __( 'No presets found', 'photo-block' ),
			'not_found_in_trash' => __( 'No presets found in Trash', 'photo-block' ),
			'parent_item_colon'  => '',
			'menu_name'          => __( 'Presets', 'photo-block' ),
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

		register_post_type( 'dlx_pb_presets', $args );
	}
}
