<?php
/**
 * Set up REST endpoints for the plugin.
 *
 * @package PhotoBlock
 */

namespace DLXPlugins\PhotoBlock;

/**
 * Helper class for Rest integration.
 */
class Rest {

	/**
	 * Main class runner.
	 */
	public static function run() {
		add_action( 'rest_api_init', array( static::class, 'register_rest_routes' ) );
	}

	/**
	 * Register any REST routes for the photo block plugin.
	 */
	public static function register_rest_routes() {
		// Register rest route for saving the image when uploading.
		register_rest_route(
			'dlxplugins/photo-block/v1',
			'/add-image',
			array(
				'methods'             => 'POST',
				'callback'            => array( static::class, 'rest_save_image' ),
				'permission_callback' => function () {
					return current_user_can( 'upload_files' );
				},
			),
		);
		// Register a rest route for getting an image.
		register_rest_route(
			'dlxplugins/photo-block/v1',
			'/get-image/id=(?P<id>\d+)',
			array(
				'methods'             => 'GET',
				'callback'            => array( static::class, 'rest_get_image' ),
				'permission_callback' => function () {
					return current_user_can( 'upload_files' );
				},
			),
		);

		// Register rest route for accepting an image URL and processing it.
		register_rest_route(
			'dlxplugins/photo-block/v1',
			'/add-image-from-url',
			array(
				'methods'             => 'POST',
				'callback'            => array( static::class, 'rest_add_image_from_url' ),
				'permission_callback' => function () {
					return current_user_can( 'upload_files' );
				},
			),
		);

		// Register a rest route for getting an image.
		register_rest_route(
			'dlxplugins/photo-block/v1',
			'/get-image-by-size/id=(?P<id>\d+)/size=(?P<size>\w+)',
			array(
				'methods'             => 'GET',
				'callback'            => array( static::class, 'rest_get_image_by_size' ),
				'permission_callback' => function () {
					return current_user_can( 'upload_files' );
				},
			),
		);

		// Register a route for searching posts/pages.
		register_rest_route(
			'dlxplugins/photo-block/v1',
			'/search/pages',
			array(
				'methods'             => 'POST',
				'permission_callback' => function () {
					return current_user_can( 'publish_posts' );
				},
				'callback'            => array( static::class, 'rest_get_pages' ),
			)
		);

		// Register a route for searching within a post type by ID or search term.
		register_rest_route(
			'dlxplugins/photo-block/v1',
			'/search/types',
			array(
				'methods'             => 'POST',
				'permission_callback' => function () {
					return current_user_can( 'publish_posts' );
				},
				'callback'            => array( static::class, 'rest_get_results_by_type' ),
			)
		);

		// Register a route for searching within a post type by ID or search term.
		register_rest_route(
			'dlxplugins/photo-block/v1',
			'/search/custom-fields',
			array(
				'methods'             => 'POST',
				'permission_callback' => function () {
					return current_user_can( 'publish_posts' );
				},
				'callback'            => array( static::class, 'rest_get_custom_fields' ),
			)
		);
	}

	/**
	 * Returns the 20 most recent custom fields by post type and/or post ID.
	 *
	 * @param WP_REST_Request $request The REST request object.
	 **/
	public function rest_get_custom_fields( $request ) {
		$search        = sanitize_text_field( urldecode( $request->get_param( 'search' ) ) ); // should only be a string.
		$maybe_post_id = absint( $request->get_param( 'postId' ) );

		// If ID is set, then get the custom keys for that post and return them.
		if ( $maybe_post_id && '' === $search ) {
			$post_id       = absint( $maybe_post_id );
			$custom_fields = get_post_custom_keys( $post_id );
			wp_send_json_success( $custom_fields );
		}

		// Do a search for the custom fields for a post.
		if ( $maybe_post_id && '' !== $search ) {
			global $wpdb;
			$custom_fields = $wpdb->get_col(
				$wpdb->prepare(
					"SELECT DISTINCT meta_key FROM $wpdb->postmeta WHERE post_id = %d AND meta_key LIKE %s",
					$maybe_post_id,
					'%' . $wpdb->esc_like( $search ) . '%'
				)
			);

			// Format results for return (if any).
			if ( ! empty( $custom_fields ) ) {
				wp_send_json_success( $custom_fields );
			}
		}

		// No ID or search term, so let's return empty JSON.
		wp_send_json_success( array() );
	}

	/**
	 * Returns the 20 most recent posts for the user by post type.
	 *
	 * @param WP_REST_Request $request The REST request object.
	 **/
	public function rest_get_results_by_type( $request ) {
		$search    = urldecode( $request->get_param( 'search' ) ); // could be int or string.
		$post_type = sanitize_text_field( $request->get_param( 'postType' ) );

		// If $search is numeric, try to get the post by ID and return JSON response.
		if ( is_numeric( $search ) ) {
			$post = get_post( $search );
			if ( ! empty( $post ) ) {
				$app_data   = array();
				$app_data[] = array(
					'value'     => $post->ID,
					'label'     => html_entity_decode( get_the_title( $post ) ),
					'permalink' => get_the_permalink( $post ),
					'slug'      => get_post_field( 'post_name', $post ),
					'type'      => get_post_type( $post ),
				);
				wp_send_json_success( $app_data );
			}
		}

		// Sanitize search.
		$search = sanitize_text_field( $search );

		// Get search query.
		$args = array(
			'post_type'      => $post_type,
			'post_status'    => 'publish',
			'posts_per_page' => 20,
			's'              => $search,
			'orderby'        => 'title',
			'order'          => 'ASC',
		);
		if ( empty( $search ) ) {
			$args['orderby'] = 'date';
			$args['order']   = 'DESC';
		}

		// Perform Search Query.
		$app_query = new \WP_Query( $args );

		// Return array of found posts/pages.
		$app_data = array();
		if ( $app_query->have_posts() ) {
			while ( $app_query->have_posts() ) {
				$app_query->the_post();
				$app_data[] = array(
					'value'     => get_the_ID(),
					'label'     => html_entity_decode( get_the_title() ),
					'permalink' => get_the_permalink(),
					'slug'      => get_post_field( 'post_name', get_the_ID() ),
					'type'      => get_post_type(),
				);
			}
		}

		wp_send_json_success( $app_data );
	}

	/**
	 * Returns the 20 most recent posts for the user
	 *
	 * @param WP_REST_Request $request The REST request object.
	 **/
	public function rest_get_pages( $request ) {
		$search = sanitize_text_field( urldecode( $request->get_param( 'search' ) ) );

		$post_types_to_search = array(
			'post',
			'page',
		);
		/**
		 * Filter the post types to search.
		 *
		 * @param array $post_types_to_search The post types to search.
		 */
		$post_types_to_search = apply_filters( 'photo_block_rest_post_types_to_search', $post_types_to_search );

		// Get search query.
		$args = array(
			'post_type'      => $post_types_to_search,
			'post_status'    => 'publish',
			'posts_per_page' => 20,
			's'              => $search,
			'orderby'        => 'title',
			'order'          => 'ASC',
		);
		if ( empty( $search ) ) {
			$args['orderby'] = 'date';
			$args['order']   = 'DESC';
		}

		// Perform Search Query.
		$app_query = new \WP_Query( $args );

		// Return array of found posts/pages.
		$app_data = array();
		if ( $app_query->have_posts() ) {
			while ( $app_query->have_posts() ) {
				$app_query->the_post();
				$app_data[] = array(
					'value'     => get_the_ID(),
					'label'     => html_entity_decode( get_the_title() ),
					'permalink' => get_the_permalink(),
					'slug'      => get_post_field( 'post_name', get_the_ID() ),
					'type'      => get_post_type(),
				);
			}
		}

		wp_send_json_success( $app_data );
	}

	/**
	 * Callback function for getting an image by size.
	 *
	 * @param WP_REST_Request $request The REST request object.
	 */
	public static function rest_get_image_by_size( $request ) {
		$id   = $request->get_param( 'id' );
		$size = $request->get_param( 'size' );

		// Check image ID.
		if ( ! $id ) {
			return new \WP_Error( 'no_image', __( 'No image ID was provided.', 'photo-block' ), array( 'status' => 400 ) );
		}

		// Check image size.
		if ( ! $size ) {
			return new \WP_Error( 'no_size', __( 'No image size was provided.', 'photo-block' ), array( 'status' => 400 ) );
		}

		// Get the Image data.
		$image_attachment = Functions::get_image_data( $id, $size );
		if ( empty( $image_attachment ) ) {
			return new \WP_Error( 'no_image', __( 'No image was found.', 'photo-block' ), array( 'status' => 400 ) );
		}

		// Return the image URL and ID.
		return $image_attachment;
	}

	/**
	 * Callback function for the add image from URL REST route.
	 *
	 * @param WP_REST_Request $request The REST request object.
	 */
	public static function rest_add_image_from_url( $request ) {
		$url = $request->get_param( 'url' );

		// Do basic validation on the URL.
		if ( ! $url || ! filter_var( $url, FILTER_VALIDATE_URL ) ) {
			return new \WP_Error( 'invalid_url', __( 'Invalid URL provided.', 'photo-block' ), array( 'status' => 400 ) );
		}

		// Check file extension.
		$extension = pathinfo( $url, PATHINFO_EXTENSION );
		if ( ! $extension ) {
			return new \WP_Error( 'invalid_url', __( 'File extension not found.', 'photo-block' ), array( 'status' => 400 ) );
		}
		$valid_extensions = Functions::get_supported_file_extensions();
		if ( ! in_array( $extension, $valid_extensions, true ) ) {
			return new \WP_Error( 'invalid_url', __( 'Invalid file extension.', 'photo-block' ), array( 'status' => 400 ) );
		}

		// Get the file.
		// Save the image to the media library.
		if ( ! function_exists( 'media_sideload_image' ) ) {
			require_once ABSPATH . 'wp-admin/includes/image.php';
			require_once ABSPATH . 'wp-admin/includes/file.php';
			require_once ABSPATH . 'wp-admin/includes/media.php';
		}
		$attachment_id = media_sideload_image( $url, 0, '', 'id' );

		// Check uploaded file for errors.
		if ( is_wp_error( $attachment_id ) ) {
			return $attachment_id;
		}

		// Get the Image URL.
		$attachment_image = Functions::get_image_data( $attachment_id, 'large' );

		// Return the image URL and ID.
		return $attachment_image;
	}

	/**
	 * Callback function for the get image REST route.
	 *
	 * @param WP_REST_Request $request The REST request object.
	 *
	 * @return mixed|array|WP_Error Returns an array with the image URL on success, or a WP_Error object on failure.
	 */
	public static function rest_get_image( $request ) {
		$id = $request->get_param( 'id' );

		// Check image ID.
		if ( ! $id ) {
			return new \WP_Error( 'no_image', __( 'No image ID was provided.', 'photo-block' ), array( 'status' => 400 ) );
		}

		// Get the Image data.
		$attachment_data = Functions::get_image_data( $id, 'large' );

		// Check image URL.
		if ( empty( $attachment_data ) ) {
			return new \WP_Error( 'no_image', __( 'No image was found.', 'photo-block' ), array( 'status' => 400 ) );
		}

		// Return the image URL and ID.
		return $attachment_data;
	}

	/**
	 * Callback function for the save image REST route.
	 *
	 * @param WP_REST_Request $request The REST request object.
	 *
	 * @return mixed|array|WP_Error Returns an array with the image URL on success, or a WP_Error object on failure.
	 */
	public static function rest_save_image( $request ) {
		$image = $request->get_file_params();

		// Check image.
		if ( ! $image || ! isset( $image['file'] ) ) {
			return new \WP_Error( 'no_image', __( 'No image was uploaded.', 'photo-block' ), array( 'status' => 400 ) );
		}

		$file       = $image['file'];
		$file_types = $image['file']['type'] ?? '';

		// Validate the image.
		$valid_mime_types = Functions::get_supported_mime_types();
		if ( ! in_array( $file_types, $valid_mime_types, true ) ) {
			return new \WP_Error(
				'invalid_image_type',
				__( 'Invalid image type. Only JPG, PNG, GIF, and WEBP files are supported.', 'photo-block' ),
				array( 'status' => 400 )
			);
		}

		// Save the image to the media library.
		if ( ! function_exists( 'media_handle_sideload' ) ) {
			require_once ABSPATH . 'wp-admin/includes/image.php';
			require_once ABSPATH . 'wp-admin/includes/file.php';
			require_once ABSPATH . 'wp-admin/includes/media.php';
		}
		$uploaded_file = media_handle_sideload( $file );

		// Check uploaded file for errors.
		if ( is_wp_error( $uploaded_file ) ) {
			return $uploaded_file;
		}

		// Get the attachment ID.
		$attachment_id = $uploaded_file;

		// Get the Image URL.
		$attachment_data = Functions::get_image_data( $attachment_id, 'large' );

		// Return the image URL and ID.
		return $attachment_data;
	}
}
