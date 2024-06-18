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

		// Register a rest route for getting an image.
		register_rest_route(
			'dlxplugins/photo-block/v1',
			'/get-image-by-data',
			array(
				'methods'             => 'POST',
				'callback'            => array( static::class, 'rest_get_image_by_data' ),
				'permission_callback' => function () {
					return current_user_can( 'upload_files' );
				},
			),
		);

		register_rest_route(
			'dlxplugins/photo-block/v1',
			'/get-featured-image-by-post-id',
			array(
				'methods'             => 'POST',
				'callback'            => array( static::class, 'rest_get_featured_image_by_post_id' ),
				'permission_callback' => function () {
					return current_user_can( 'upload_files' );
				},
			),
		);

		// Register a rest route for getting a caption.
		register_rest_route(
			'dlxplugins/photo-block/v1',
			'/get-caption-by-data',
			array(
				'methods'             => 'POST',
				'callback'            => array( static::class, 'rest_get_caption_by_data' ),
				'permission_callback' => function () {
					return current_user_can( 'upload_files' );
				},
			),
		);

		// Register a rest route for getting a caption.
		register_rest_route(
			'dlxplugins/photo-block/v1',
			'/get-caption-by-post-id',
			array(
				'methods'             => 'POST',
				'callback'            => array( static::class, 'rest_get_caption_by_post_id' ),
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

		// Register a route for searching for custom fields in a post type.
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

		// Register a route for searching for author meta fields.
		register_rest_route(
			'dlxplugins/photo-block/v1',
			'/search/author-meta',
			array(
				'methods'             => 'POST',
				'permission_callback' => function () {
					return current_user_can( 'publish_posts' );
				},
				'callback'            => array( static::class, 'rest_get_author_meta' ),
			)
		);

		// Register a route for cropping an image.
		register_rest_route(
			'dlxplugins/photo-block/v1',
			'/image/crop',
			array(
				'methods'             => 'POST',
				'permission_callback' => function () {
					return current_user_can( 'upload_files' );
				},
				'callback'            => array( static::class, 'rest_crop_image' ),
			)
		);

		// Register a route for saving alt-text for image.
		register_rest_route(
			'dlxplugins/photo-block/v1',
			'/image/save-alt',
			array(
				'methods'             => 'POST',
				'permission_callback' => function () {
					return current_user_can( 'upload_files' );
				},
				'callback'            => array( static::class, 'rest_save_alt_text' ),
			)
		);

		// Register a route for saving alt-text for image.
		register_rest_route(
			'dlxplugins/photo-block/v1',
			'/image/save-title',
			array(
				'methods'             => 'POST',
				'permission_callback' => function () {
					return current_user_can( 'upload_files' );
				},
				'callback'            => array( static::class, 'rest_save_title_text' ),
			)
		);
	}

	/**
	 * Saves alt-text for an image.
	 *
	 * @param WP_REST_Request $request The REST request object.
	 **/
	public static function rest_save_alt_text( $request ) {
		$image_id = absint( $request->get_param( 'imageId' ) );
		$alt_text = sanitize_textarea_field( $request->get_param( 'altText' ) );

		// Bail early if no image id or if zero.
		if ( ! $image_id ) {
			wp_send_json_error(
				array(
					'message' => __( 'No image ID provided.', 'photo-block' ),
				)
			);
		}

		// Update the alt text.
		update_post_meta( $image_id, '_wp_attachment_image_alt', $alt_text );

		wp_send_json_success(
			array(
				'message' => __( 'Alt text saved successfully.', 'photo-block' ),
			)
		);
	}

	/**
	 * Saves title text for an image.
	 *
	 * @param WP_REST_Request $request The REST request object.
	 **/
	public static function rest_save_title_text( $request ) {
		$image_id   = absint( $request->get_param( 'imageId' ) );
		$title_text = sanitize_textarea_field( $request->get_param( 'titleText' ) );

		// Bail early if no image id or if zero.
		if ( ! $image_id ) {
			wp_send_json_error(
				array(
					'message' => __( 'No image ID provided.', 'photo-block' ),
				)
			);
		}

		// Update the attachment's title.
		$attachment = array(
			'ID'         => $image_id,
			'post_title' => $title_text,
		);
		wp_update_post( $attachment );

		wp_send_json_success(
			array(
				'message' => __( 'Title text saved successfully.', 'photo-block' ),
			)
		);
	}

	/**
	 * Returns a cropped image object if cropped successfully.
	 *
	 * @param WP_REST_Request $request The REST request object.
	 **/
	public static function rest_crop_image( $request ) {
		$crop_x      = absint( $request->get_param( 'cropX' ) );
		$crop_y      = absint( $request->get_param( 'cropY' ) );
		$crop_width  = absint( $request->get_param( 'cropWidth' ) );
		$crop_height = absint( $request->get_param( 'cropHeight' ) );
		$rotate      = intval( $request->get_param( 'rotateDegrees' ) );
		$image_id    = absint( $request->get_param( 'imageId' ) );

		// Bail early if no image id or if zero.
		if ( ! $image_id ) {
			wp_send_json_error(
				array(
					'message' => __( 'No image ID provided.', 'photo-block' ),
				)
			);
		}

		// Get the image file.
		$image_file = get_attached_file( $image_id, true );
		if ( ! $image_file ) {
			wp_send_json_error(
				array(
					'message' => __( 'No image file found for ID provided.', 'photo-block' ),
				)
			);
		}

		// Get image to edit.
		$image = wp_get_image_editor( $image_file );
		if ( is_wp_error( $image ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Error getting image editor for image.', 'photo-block' ),
				)
			);
		}

		// Rotate the image if necessary.
		if ( 0 !== $rotate ) {
			$image->rotate( - $rotate ); // Negative because rotation is backwards for some reason.
		}

		// Crop the image.
		$image->crop( $crop_x, $crop_y, $crop_width, $crop_height );

		// Save the image as a copy.
		$saved_image = $image->save( $image->generate_filename( 'cropped' ) );

		// Bail early if error saving image.
		if ( is_wp_error( $saved_image ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Error saving image.', 'photo-block' ),
				)
			);
		}

		// Save the image to the media library.
		if ( ! function_exists( 'media_handle_sideload' ) ) {
			require_once ABSPATH . 'wp-admin/includes/image.php';
			require_once ABSPATH . 'wp-admin/includes/file.php';
			require_once ABSPATH . 'wp-admin/includes/media.php';
		}

		// Convert to file array.
		$file_array = array(
			'name'     => basename( $saved_image['file'] ),
			'tmp_name' => $saved_image['path'],
		);

		// Upload new file.
		$uploaded_file = media_handle_sideload( $file_array );

		// Check uploaded file for errors.
		if ( is_wp_error( $uploaded_file ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Error saving image to media library.', 'photo-block' ),
				)
			);
		}

		// Get the attachment ID.
		$attachment_id = $uploaded_file;

		// Get the Image URL.
		$attachment_data = Functions::get_image_data( $attachment_id, 'full' );

		wp_send_json_success(
			array(
				'message'    => __( 'Image cropped successfully.', 'photo-block' ),
				'attachment' => $attachment_data,
			)
		);
	}

	/**
	 * Returns the 20 most recent author fields based on past post id.
	 *
	 * @param WP_REST_Request $request The REST request object.
	 **/
	public static function rest_get_author_meta( $request ) {
		$search        = sanitize_text_field( urldecode( $request->get_param( 'search' ) ) ); // should only be a string.
		$maybe_post_id = absint( $request->get_param( 'postId' ) );

		// Bail early if no post id or if zero.
		if ( ! $maybe_post_id ) {
			wp_send_json_error( 'No post ID provided.' );
		}

		// Get the post, validate, and get the author ID.
		$post = get_post( $maybe_post_id );
		if ( ! $post ) {
			wp_send_json_error( 'No post found for ID provided.' );
		}
		$author_id = $post->post_author;

		// Now get the author meta key labels for the author.
		$author_meta = get_user_meta( $author_id );
		$author_meta = array_keys( $author_meta );

		// Format results for return (if any).
		if ( ! empty( $author_meta ) ) {
			// Unset the _edit_lock and _edit_last keys.
			if ( is_array( $author_meta ) ) {
				$author_meta = array_diff( $author_meta, array( '_edit_lock', '_edit_last' ) ); // not sure if this is needed, but eh.
			}

			// Filter the results based on the search term.
			if ( '' !== $search ) {
				$author_meta = array_filter(
					$author_meta,
					function ( $key ) use ( $search ) {
						return false !== stripos( $key, $search );
					}
				);
			}

			// Sort the results.
			sort( $author_meta );

			// Return the results.
			wp_send_json_success( $author_meta );
		}

		// No ID or search term, so let's return empty JSON.
		wp_send_json_success( array() );
	}

	/**
	 * Returns the 20 most recent custom fields by post type and/or post ID.
	 *
	 * @param WP_REST_Request $request The REST request object.
	 **/
	public static function rest_get_custom_fields( $request ) {
		$search        = sanitize_text_field( urldecode( $request->get_param( 'search' ) ) ); // should only be a string.
		$maybe_post_id = absint( $request->get_param( 'postId' ) );

		// If ID is set, then get the custom keys for that post and return them.
		if ( $maybe_post_id && '' === $search ) {
			$post_id       = absint( $maybe_post_id );
			$custom_fields = get_post_custom_keys( $post_id );

			// Unset the _edit_lock and _edit_last keys.
			if ( is_array( $custom_fields ) ) {
				$custom_fields = array_diff( $custom_fields, array( '_edit_lock', '_edit_last' ) );

				// Reindex array.
				$custom_fields = array_values( $custom_fields );
			}

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
				// Unset the _edit_lock and _edit_last keys.
				if ( is_array( $custom_fields ) ) {
					$custom_fields = array_diff( $custom_fields, array( '_edit_lock', '_edit_last' ) );
					// Reindex array.
					$custom_fields = array_values( $custom_fields );
				}
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
	public static function rest_get_results_by_type( $request ) {
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
	public static function rest_get_pages( $request ) {
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
	 * Callback function for getting an image by size.
	 *
	 * @param WP_REST_Request $request The REST request object.
	 *
	 * @return string The caption, empty string if none.
	 */
	public static function rest_get_caption_by_data( $request ) {
		$data_source             = sanitize_text_field( $request->get_param( 'dataCaptionSource' ) ); // Can be currentImage, currentPost, none, postType.
		$image_data_type         = sanitize_text_field( $request->get_param( 'dataCaptionType' ) ); // Ca be altText, caption, imageTitle, customField
		$image_data_custom_field = sanitize_text_field( $request->get_param( 'dataCaptionImageCustomField' ) ); // Can be any custom field.
		$post_data_type          = sanitize_text_field( $request->get_param( 'dataCaptionTypePost' ) ); // Can be title, postAuthorName, postAuthorMeta, postExcerpt, customField.
		$post_data_author_meta   = sanitize_text_field( $request->get_param( 'dataCaptionTypePostAuthorMeta' ) ); // Can be any author meta.
		$post_type_data_source   = sanitize_text_field( $request->get_param( 'dataCaptionPostTypeSource' ) ); // title, postAuthorName, postAuthorMeta, postExcerpt, customField.
		$post_data_custom_field  = sanitize_text_field( $request->get_param( 'dataCaptionTypePostCustomField' ) ); // Can be any custom field.
		$post_type               = sanitize_text_field( $request->get_param( 'dataCaptionPostType' ) ); // Can be any post type.
		$post_type_custom_field  = sanitize_text_field( $request->get_param( 'dataCaptionPostTypeCustomField' ) ); // Can be any custom field.
		$post_type_author_meta   = sanitize_text_field( $request->get_param( 'dataCaptionPostTypeAuthorMeta' ) ); // Can be any author meta.
		$post_type_post_id       = sanitize_text_field( $request->get_param( 'dataCaptionPostId' ) ); // Can be any post ID.
		$image_id                = sanitize_text_field( $request->get_param( 'imageId' ) ); // Can be any image ID.
		$current_post_id         = sanitize_text_field( $request->get_param( 'postId' ) ); // Can be any post ID.

		// Return early if none selected.
		if ( 'none' === $data_source ) {
			return '';
		}

		// If current image is selected, get the image ID.
		if ( 'currentImage' === $data_source ) {
			switch ( $image_data_type ) {
				case 'altText':
					$image_data = get_post_meta( $image_id, '_wp_attachment_image_alt', true );
					break;
				case 'caption':
					$image_data = get_post_field( 'post_excerpt', $image_id );
					break;
				case 'imageTitle':
					$image_data = get_post_field( 'post_title', $image_id );
					break;
				case 'customField':
					$image_data = get_post_meta( $image_id, $image_data_custom_field, true );
					break;
				default:
					$image_data = '';
			}
			if ( is_string( $image_data ) ) {
				return wp_kses_post( $image_data );
			}
			return '';
		}

		// If current post is selected, get the post ID.
		if ( 'currentPost' === $data_source ) {
			$post_id = $current_post_id;

			switch ( $post_data_type ) {
				case 'title':
					$post_data = get_the_title( $post_id );
					break;
				case 'postAuthorName':
					// Get the author ID.
					$author_id = get_post_field( 'post_author', $post_id );
					$post_data = get_the_author_meta( 'display_name', $author_id );
					break;
				case 'postAuthorMeta':
					$author_id = get_post_field( 'post_author', $post_id );
					$post_data = get_the_author_meta( $post_data_author_meta, $author_id );
					break;
				case 'postExcerpt':
					$post_data = get_the_excerpt( $post_id );
					break;
				case 'customField':
					$post_data = get_post_meta( $post_id, $post_data_custom_field, true );
					break;
				default:
					$post_data = '';
			}
			if ( is_string( $post_data ) ) {
				return wp_kses_post( $post_data );
			}
		}

		// If post type is selected, get the selected post id.
		if ( 'postType' === $data_source ) {
			$post_id = $post_type_post_id;

			// Get post. If nothing, bail.
			$post = get_post( $post_id );
			if ( ! $post ) {
				return '';
			}

			// Post type data type.
			switch ( $post_type_data_source ) {
				case 'title':
					$post_data = get_the_title( $post_id );
					break;
				case 'postAuthorName':
					// Get the author ID.
					$author_id = get_post_field( 'post_author', $post_id );
					$post_data = get_the_author_meta( 'display_name', $author_id );
					break;
				case 'postAuthorMeta':
					$author_id = get_post_field( 'post_author', $post_id );
					$post_data = get_the_author_meta( $post_type_author_meta, $author_id );
					break;
				case 'postExcerpt':
					$post_data = get_the_excerpt( $post_id );
					break;
				case 'customField':
					$post_data = get_post_meta( $post_id, $post_type_custom_field, true );
					break;
				default:
					$post_data = '';
			}
			if ( is_string( $post_data ) ) {
				return wp_kses_post( $post_data );
			}
		}
		return '';
	}

	/**
	 * Callback function for getting an image caption by post ID.
	 *
	 * @param WP_REST_Request $request The REST request object.
	 *
	 * @return string The caption, empty string if none.
	 */
	public static function rest_get_caption_by_post_id( $request ) {
		$post_id = absint( $request->get_param( 'postId' ) ); // Can be any image ID.

		// Bail early if no image ID or if zero.
		if ( ! $post_id ) {
			wp_send_json_error(
				array(
					'message' => __( 'No image ID provided.', 'photo-block' ),
				)
			);
		}

		// Get featured image ID.
		$image_id = get_post_thumbnail_id( $post_id );
		if ( ! $image_id ) {
			wp_send_json_error(
				array(
					'message' => __( 'No featured image found for post.', 'photo-block' ),
				)
			);
		}

		// Get the image caption.
		$image_caption = wp_get_attachment_caption( $image_id );
		if ( false !== $image_caption ) {
			wp_send_json_success(
				array(
					'caption' => wp_kses_post( $image_caption ),
				)
			);
		}

		wp_send_json_error(
			array(
				'message' => __( 'No caption found.', 'photo-block' ),
			)
		);
	}

	/**
	 * Callback function for getting an image by data.
	 *
	 * @param WP_REST_Request $request The REST request object.
	 */
	public static function rest_get_image_by_data( $request ) {
		$data_source                    = sanitize_text_field( $request->get_param( 'dataSource' ) );
		$data_current_post_id           = absint( $request->get_param( 'dataCurrentPostId' ) );
		$data_image_size                = sanitize_text_field( $request->get_param( 'dataImageSize' ) );
		$data_image_source              = sanitize_text_field( $request->get_param( 'dataImageSource' ) );
		$data_image_source_custom_field = sanitize_text_field( $request->get_param( 'dataImageSourceCustomField' ) );
		$data_post_type                 = sanitize_text_field( $request->get_param( 'dataPostType' ) );
		$data_post_id                   = absint( $request->get_param( 'dataPostId' ) );
		$data_fallback_image            = $request->get_param( 'dataFallbackImage' );
		$data_has_fallback_image        = (bool) $request->get_param( 'dataHasFallbackImage' );
		$data_fallback_image_size       = sanitize_text_field( $request->get_param( 'dataFallbackImageSize' ) );
		$data_image_source_author_meta  = sanitize_text_field( $request->get_param( 'dataImageSourceAuthorMeta' ) );

		// Placeholder for later.
		$image = null;

		// Check the data source. If current post, use the current post ID.
		if ( 'currentPost' === $data_source ) {
			if ( 'featuredImage' === $data_image_source && $data_current_post_id ) {
				// Get the featured image ID from the current source ID.
				$image_id = get_post_thumbnail_id( $data_current_post_id );
				if ( $image_id ) {
					$image = Functions::get_image_data( $image_id, $data_image_size );
				}
			} elseif ( 'customField' === $data_image_source && $data_current_post_id && $data_image_source_custom_field ) {
				// Get the image ID from the custom field.
				$maybe_image_id_or_url = Functions::get_post_image( $data_image_size, $data_image_source_custom_field, $data_current_post_id );
				if ( $maybe_image_id_or_url ) {
					if ( is_numeric( $maybe_image_id_or_url ) ) {
						$image = Functions::get_image_data( $maybe_image_id_or_url, $data_image_size );
					} elseif ( is_array( $maybe_image_id_or_url ) ) {
						$image = $maybe_image_id_or_url;
					} else {
						$image = esc_url( $maybe_image_id_or_url ); // A string was found.
					}
				}
			} elseif ( 'authorAvatar' === $data_image_source ) {
				// Get the author ID.
				$author_id    = get_post_field( 'post_author', $data_current_post_id );
				$maybe_avatar = get_avatar_url( $author_id, array( 'size' => $data_image_size ) );
				if ( $maybe_avatar ) {
					$image = esc_url( $maybe_avatar );
				}
			} elseif ( 'authorMeta' === $data_image_source ) {
				// Get the author ID.
				$author_id = get_post_field( 'post_author', $data_current_post_id );

				// Get author image from user meta.
				$maybe_author_image_id_or_url = Functions::get_author_image_from_meta( $data_image_size, $data_image_source_author_meta, $author_id );
				if ( $maybe_author_image_id_or_url ) {
					if ( is_numeric( $maybe_author_image_id_or_url ) ) {
						$maybe_author_image_id_or_url = Functions::get_image_data( $maybe_author_image_id_or_url, $data_image_size );
					}
					if ( is_array( $maybe_author_image_id_or_url ) ) {
						$image = $maybe_author_image_id_or_url;
					} else {
						$image = esc_url( $maybe_author_image_id_or_url ); // A string was found.
					}
				}
			}
		} elseif ( 'postType' === $data_source && $data_post_id ) {
			if ( 'featuredImage' === $data_image_source && $data_current_post_id ) {
				// Get the featured image ID from the current source ID.
				$image_id = get_post_thumbnail_id( $data_current_post_id );
				if ( $image_id ) {
					$image = Functions::get_image_data( $image_id, $data_image_size );
				}
			} elseif ( 'customField' === $data_image_source && $data_current_post_id && $data_image_source_custom_field ) {
				// Get the image ID from the custom field.
				$maybe_image_id_or_url = Functions::get_post_image( $data_image_size, $data_image_source_custom_field, $data_current_post_id );
				if ( $maybe_image_id_or_url ) {
					if ( is_numeric( $maybe_image_id_or_url ) ) {
						$image = Functions::get_image_data( $maybe_image_id_or_url, $data_image_size );
					} elseif ( is_array( $maybe_image_id_or_url ) ) {
						$image = $maybe_image_id_or_url;
					} else {
						$image = esc_url( $maybe_image_id_or_url ); // A string was found.
					}
				}
			} elseif ( 'authorAvatar' === $data_image_source ) {
				// Get the author ID.
				$author_id    = get_post_field( 'post_author', $data_current_post_id );
				$maybe_avatar = get_avatar_url( $author_id, array( 'size' => $data_image_size ) );
				if ( $maybe_avatar ) {
					$image = esc_url( $maybe_avatar );
				}
			} elseif ( 'authorMeta' === $data_image_source ) {
				// Get the author ID.
				$author_id = get_post_field( 'post_author', $data_current_post_id );

				// Get author image from user meta.
				$maybe_author_image_id_or_url = Functions::get_author_image_from_meta( $data_image_size, $data_image_source_author_meta, $author_id );
				if ( $maybe_author_image_id_or_url ) {
					if ( is_numeric( $maybe_author_image_id_or_url ) ) {
						$maybe_author_image_id_or_url = Functions::get_image_data( $maybe_author_image_id_or_url, $data_image_size );
					}
					if ( is_array( $maybe_author_image_id_or_url ) ) {
						$image = $maybe_author_image_id_or_url;
					} else {
						$image = esc_url( $maybe_author_image_id_or_url ); // A string was found.
					}
				}
			}
		}

		// Return early before trying for a fallback image.
		if ( $image ) {
			return $image;
		}

		// Image is still false, find the fallback.
		if ( $data_has_fallback_image && $data_fallback_image ) {
			$image = Functions::get_image_data( $data_fallback_image['id'], $data_fallback_image_size );
			if ( $image ) {
				return $image;
			}
		}

		return '';
	}

	/**
	 * Callback function for getting an image by data.
	 *
	 * @param WP_REST_Request $request The REST request object.
	 */
	public static function rest_get_featured_image_by_post_id( $request ) {
		$data_current_post_id     = absint( $request->get_param( 'postId' ) );
		$data_image_size          = sanitize_text_field( $request->get_param( 'dataImageSize' ) );
		$data_fallback_image      = $request->get_param( 'dataFallbackImage' );
		$data_has_fallback_image  = (bool) $request->get_param( 'dataHasFallbackImage' );
		$data_fallback_image_size = sanitize_text_field( $request->get_param( 'dataFallbackImageSize' ) );

		// Placeholder for later.
		$image = null;

		$image_id = get_post_thumbnail_id( $data_current_post_id );
		if ( $image_id ) {
			$image = Functions::get_image_data( $image_id, $data_image_size );
		}

		// Return early before trying for a fallback image.
		if ( $image ) {
			return $image;
		}

		// Image is still false, find the fallback.
		if ( $data_has_fallback_image && $data_fallback_image ) {
			$image = Functions::get_image_data( $data_fallback_image['id'], $data_fallback_image_size );
			if ( $image ) {
				return $image;
			}
		}

		return '';
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

		// Strip all query vars from extension.
		$extension = explode( '?', $extension );
		$extension = $extension[0];

		// Start testing.
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
		$attachment_data = Functions::get_image_data( $id, 'full' );

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
