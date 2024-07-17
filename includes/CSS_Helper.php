<?php
/**
 * Store the CSS for a block.
 *
 * @package PhotoBlock
 */

namespace DLXPlugins\PhotoBlock;

/**
 * CSS Helper to output responsive styles.
 */
class CSS_Helper {

	/**
	 * Tablet CSS array.
	 *
	 * @var array
	 */
	private $tablet_css = array();

	/**
	 * Mobile CSS array.
	 *
	 * @var array
	 */
	private $mobile_css = array();

	/**
	 * Desktop CSS array.
	 *
	 * @var array
	 */
	private $desktop_css = array();

	/**
	 * General CSS that doesn't need a responsive media query.
	 *
	 * @var array
	 */
	private $general_css = array();

	/**
	 * Unique ID for the block.
	 *
	 * @var string
	 */
	private $unique_id = '';

	/**
	 * Selector for the CSS.
	 *
	 * @var string
	 */
	private $selector = '';

	/**
	 * Is the selector a class or an ID?
	 *
	 * @var bool $is_class True if the selector is a class, false if it's an ID.
	 * @since 1.0.0
	 */
	private $is_class = false;

	/**
	 * Class constructor.
	 *
	 * @param string $unique_id The unique ID for the block.
	 * @param string $selector The selector for the CSS.
	 * @param bool   $is_class True if the selector is a class, false if it's an ID.
	 */
	public function __construct( $unique_id, $selector, $is_class = false ) {
		$this->unique_id = $unique_id;
		$this->selector  = $selector;
		$this->is_class  = $is_class;
	}

	/**
	 * Add the tablet CSS for the block.
	 *
	 * @param string $css The CSS string to add.
	 * @param string $screen_size The screen size to add the CSS to.
	 */
	public function add_css( $css, $screen_size = '' ) {
		switch ( $screen_size ) {
			case 'tablet':
				$this->tablet_css[] = $css;
				break;
			case 'mobile':
				$this->mobile_css[] = $css;
				break;
			case 'desktop':
				$this->desktop_css[] = $css;
				break;
			default:
				$this->general_css[] = $css;
				break;
		}
	}

	/**
	 * Get the CSS for the given selector and unique ID.
	 */
	public function get_css() {
		$css = '';
		$css_prefix = '#';
		if ( $this->is_class ) {
			$css_prefix = '.';
		}

		// Output general CSS.
		if ( ! empty( $this->general_css ) ) {
			$css .= $css_prefix . $this->unique_id . ' ' . $this->selector . '{';
			$css .= implode( '', $this->general_css );
			$css .= '}';
		}

		if ( ! empty( $this->tablet_css ) ) {
			$css .= '@media (max-width: 1024px) {';
			$css .= $css_prefix . $this->unique_id . ' ' . $this->selector . '{';
			$css .= implode( '', $this->tablet_css );
			$css .= '}';
			$css .= '}';
		}

		if ( ! empty( $this->mobile_css ) ) {
			$css .= '@media (max-width: 767px) {';
			$css .= $css_prefix . $this->unique_id . ' ' . $this->selector . '{';
			$css .= implode( '', $this->mobile_css );
			$css .= '}';
			$css .= '}';
		}

		if ( ! empty( $this->desktop_css ) ) {
			$css .= '@media (min-width: 1025px) {';
			$css .= $css_prefix . $this->unique_id . ' ' . $this->selector . '{';
			$css .= implode( '', $this->desktop_css );
			$css .= '}';
			$css .= '}';
		}

		return $css;
	}
}
