<?php
/**
 * ScreenshotOne API.
 *
 * @since 3.0.0
 * @package Photo_Block
 */

namespace DLXPlugins\PhotoBlock;

if ( ! defined( 'ABSPATH' ) ) {
	die();
}

/**
 * Helper class for retrieving the ScreenshotOne API functions.
 */
class ScreenshotOne_API {

	/**
	 * API key.
	 *
	 * @since  1.0
	 * @var    string $api_key API key.
	 */
	protected $api_key;

	/**
	 * ScreenshotOne API URL.
	 *
	 * @since  1.0
	 * @var    string $api_url ScreenshotOne API URL.
	 */
	protected $api_url = 'https://api.screenshotone.com';

	/**
	 * Secret key.
	 *
	 * @since  1.0
	 * @var    string $secret_key Secret key.
	 */
	protected $secret_key;

	/**
	 * Initialize API library.
	 *
	 * @since  1.0
	 *
	 * @param string $api_key API key.
	 * @param string $secret_key Secret key.
	 */
	public function __construct( $api_key = '', $secret_key = '' ) {
		$this->api_key    = $api_key;
		$this->secret_key = $secret_key;
	}

	/**
	 * Make API request.
	 *
	 * @since  1.0
	 *
	 * @param string    $path          Request path.
	 * @param string    $context       Context for API call (for routing).
	 * @param array     $options       Request options.
	 * @param string    $method        Request method. Defaults to GET.
	 * @param string    $return_key    Array key from response to return. Defaults to null (return full response).
	 * @param int|array $response_code Expected HTTP response code.
	 *
	 * @return array|WP_Error
	 */
	private function make_request( $path = '', $context = '', $options = array(), $method = 'GET', $api_url = '', $response_code = 200 ) {

		if ( empty( $api_url ) ) {
			$api_url = $this->api_url;
		}

		// Initialize response return.
		$response = array();

		$request_url = '';

		$args        = array(
			'method'    => $method,
			/**
			 * Filters if SSL verification should occur.
			 *
			 * @param bool false If the SSL certificate should be verified. Defalts to false.
			 *
			 * @return bool
			 */
			'sslverify' => false,
			/**
			 * Sets the HTTP timeout, in seconds, for the request.
			 *
			 * @param int 30 The timeout limit, in seconds. Defalts to 30.
			 *
			 * @return int
			 */
			'timeout'   => 30,
		);
		$request_url = $api_url . $path;

		// Get body from options and unset it if empty.
		$args['body'] = rgar( $options, 'body' ) ?? array();
		if ( empty( $args['body'] ) ) {
			unset( $args['body'] );
		}

		$args['headers'] = array(
			'Authorization' => 'Bearer ' . rgar( $options, 'api_key' ),
			'Accept'        => 'application/json;ver=1.0',
		);

		if ( isset( $options['type'] ) ) {
			$args['headers']['X-Request-Type'] = $options['type'];
			unset( $options['type'] );
		}

		if ( 'GET' === $method ) {
			// Execute request.
			$response = wp_remote_get(
				$request_url,
				$args
			);
		} else {
			// Execute request.
			$response = wp_remote_post(
				$request_url,
				$args
			);
		}

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		if ( empty( $response ) ) {
			return new \WP_Error( 'photo_block', esc_html__( 'The API path supplied is not supported by the ScreenshotOne API.', 'photo-block' ), array() );
		}
		// If an incorrect response code was returned, return WP_Error.
		$response_body           = json_decode( wp_remote_retrieve_body( $response ), true );
		$retrieved_response_code = absint( $response['response']['code'] );

		if ( $retrieved_response_code !== $response_code ) {

			// Construct the error message.
			$error_details = "Expected response code: {$response_code}. Returned response code: {$retrieved_response_code}.";
			if ( $response_body ) {
				$error_details .= " Error: {$response_body['error']}";
			}

			// Add specific handling for common error codes.
			switch ( $retrieved_response_code ) {
				case 400:
					$error_message = '';
					if ( isset( $response_body['error_code'] ) ) {
						switch ( $response_body['error_code'] ) {
							case 'access_key_required':
								$error_message = __( 'Access key is required.', 'photo-block' );
								break;
							case 'access_key_invalid':
								$error_message = __( 'Invalid access key provided.', 'photo-block' );
								break;
							case 'signature_is_required':
								$error_message = __( 'Request signature is required.', 'photo-block' );
								break;
							case 'signature_is_not_valid':
								$error_message = __( 'Invalid request signature.', 'photo-block' );
								break;
							case 'screenshots_limit_reached':
								$error_message = __( 'Usage quota has been exceeded.', 'photo-block' );
								break;
							case 'concurrency_limit_reached':
								$error_message = __( 'Request concurrency limit reached.', 'photo-block' );
								break;
							case 'request_not_valid':
								$error_message = __( 'Invalid request parameters.', 'photo-block' );
								break;
							case 'selector_not_found':
								$error_message = __( 'Specified selector not found on page.', 'photo-block' );
								break;
							case 'name_not_resolved':
								$error_message = __( 'Domain name could not be resolved.', 'photo-block' );
								break;
							case 'invalid_storage_configuration':
								$error_message = __( 'Invalid storage configuration.', 'photo-block' );
								break;
							case 'script_triggers_redirect':
								$error_message = __( 'Script triggered an unexpected redirect.', 'photo-block' );
								break;
							case 'invalid_cookie_parameter':
								$error_message = __( 'Invalid cookie parameters provided.', 'photo-block' );
								break;
							default:
								$error_message = __( 'Invalid request format.', 'photo-block' );
						}
					}
					$error_details .= ' ' . $error_message;
					break;
				case 500:
					if ( isset( $response_body['error_code'] ) ) {
						switch ( $response_body['error_code'] ) {
							case 'network_error':
								$error_details .= ' ' . __( 'Unable to connect to the provided URL.', 'photo-block' );
								break;
							case 'host_returned_error':
								$error_details .= ' ' . __( 'Host returned an unsuccessful status code.', 'photo-block' );
								break;
							case 'timeout_error':
								$error_details .= ' ' . __( 'Request timed out while processing.', 'photo-block' );
								break;
							case 'internal_application_error':
								$error_details .= ' ' . __( 'Internal API error occurred.', 'photo-block' );
								break;
							case 'storage_returned_transient_error':
								$error_details .= ' ' . __( 'Storage returned a temporary error.', 'photo-block' );
								break;
							case 'request_aborted':
								$error_details .= ' ' . __( 'Request was aborted.', 'photo-block' );
								break;
							case 'content_contains_specified_string':
								$error_details .= ' ' . __( 'Page content contains the specified failure string.', 'photo-block' );
								break;
							default:
								$error_details .= ' ' . __( 'Internal server error.', 'photo-block' );
						}
					}
					break;
				case 503:
					$error_details .= ' ' . __( 'Service temporarily unavailable.', 'photo-block' );
					break;
			}

			$error_data = array(
				'status'  => $retrieved_response_code,
				'error'   => $response_body,
				'details' => $error_details,
			);

			return new \WP_Error( 'photo_block_error', $error_data['error'], $error_data );
		}

		if ( isset( $response_body['is_successful'] ) ) {
			if ( ! $response_body['is_successful'] ) {
				return new \WP_Error( 'photo_block_error', $response_body['error_message'], $response_body );
			}
		}

		return $response_body;
	}

	/**
	 * Revoke token.
	 */
	public function get_api_usage() {
		// Hash $api_key with HMAC SHA256 using $secret_key.
		$hashed_signature = hash_hmac( 'sha256', $this->api_key, $this->secret_key );

		return $this->make_request(
			'/usage',
			'',
			array(
				'api_key' => $this->api_key,
				'body'    => array(
					'access_key' => $this->api_key,
					'signature'  => $hashed_signature,
				),
			),
			'GET',
			$this->api_url
		);
	}
}
