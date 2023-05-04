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

		// Get the Image URL.
		$image_url = wp_get_attachment_image_src( $id, $size );
		if ( empty( $image_url ) ) {
			return new \WP_Error( 'no_image', __( 'No image was found.', 'photo-block' ), array( 'status' => 400 ) );
		}

		// Return the image URL and ID.
		return array(
			'url'    => $image_url[0],
			'id'     => $id,
			'width'  => $image_url[1],
			'height' => $image_url[2],
		);
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
		$image_url = wp_get_attachment_image_src( $attachment_id, 'large' );

		// Return the image URL and ID.
		return array(
			'url'    => $image_url[0],
			'id'     => $attachment_id,
			'width'  => $image_url[1],
			'height' => $image_url[2],
		);
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

		// Get the Image URL.
		$image_url = wp_get_attachment_image_src( $id, 'full' );

		// Check image URL.
		if ( ! $image_url ) {
			return new \WP_Error( 'no_image', __( 'No image was found.', 'photo-block' ), array( 'status' => 400 ) );
		}

		// Return the image URL and ID.
		return array(
			'url'    => $image_url[0],
			'id'     => $id,
			'width'  => $image_url[1],
			'height' => $image_url[2],
		);
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
		$image_url = wp_get_attachment_image_src( $attachment_id, 'large' );

		// Return the image URL and ID.
		return array(
			'url'    => $image_url[0],
			'id'     => $attachment_id,
			'width'  => $image_url[1],
			'height' => $image_url[2],
		);
	}
}
