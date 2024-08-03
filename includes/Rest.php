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
