# Photo Block Developer Documentation

This document outlines all custom hooks available in the Photo Block plugin for developers to extend functionality.

## Options and Defaults

### `photo_block_options_defaults`
```php
/**
 * Filter the default options for the plugin.
 *
 * @param array $defaults {
 *     Array of default options.
 *     @type string $option_name Option value.
 * }
 * @return array Modified default options.
 */
apply_filters( 'photo_block_options_defaults', $defaults );
```

## REST API

### `photo_block_rest_post_types_to_search`
```php
/**
 * Modify the post types to search in the REST API.
 *
 * @param array $post_types_to_search Array of post type slugs to search.
 * @return array Modified array of post type slugs.
 */
apply_filters( 'photo_block_rest_post_types_to_search', $post_types_to_search );
```

## Global Styles

### `dlx_photo_block_photo_keys_to_ignore`
```php
/**
 * Filter which photo keys to ignore in global styles.
 *
 * @param array $photo_keys_to_ignore Array of photo attribute keys to ignore.
 * @return array Modified array of keys to ignore.
 */
apply_filters( 'dlx_photo_block_photo_keys_to_ignore', $photo_keys_to_ignore );
```

### `dlx_photo_block_caption_keys_to_ignore`
```php
/**
 * Filter which caption keys to ignore in global styles.
 *
 * @param array $caption_keys_to_ignore Array of caption attribute keys to ignore.
 * @return array Modified array of keys to ignore.
 */
apply_filters( 'dlx_photo_block_caption_keys_to_ignore', $caption_keys_to_ignore );
```

### `dlx_photo_block_clear_global_styles_cache`
```php
/**
 * Control whether to clear the global styles cache.
 *
 * @param bool $can_clear_cache Whether to clear the cache. Default false.
 * @return bool Modified value.
 */
apply_filters( 'dlx_photo_block_clear_global_styles_cache', false );
```

### `dlx_photo_block_global_styles_css`
```php
/**
 * Modify the global styles CSS output.
 *
 * @param string $css_string The CSS string to modify.
 * @param array  $photo_attributes Photo block attributes.
 * @param array  $caption_attributes Caption block attributes.
 * @return string Modified CSS string.
 */
apply_filters( 'dlx_photo_block_global_styles_css', $css_string, $photo_attributes, $caption_attributes );
```

## Block Rendering

### `dlx_photo_block_caption_innerblocks_supported`
```php
/**
 * Control whether caption innerblocks are supported.
 *
 * @param bool $caption_innerblocks_supported Whether innerblocks are supported.
 * @return bool Modified value.
 */
apply_filters( 'dlx_photo_block_caption_innerblocks_supported', $caption_innerblocks_supported );
```

### `dlx_photo_block_localized_vars`
```php
/**
 * Modify localized variables for the block.
 *
 * @param array $localized_vars Array of localized variables.
 * @return array Modified localized variables.
 */
apply_filters( 'dlx_photo_block_localized_vars', $localized_vars );
```

### `dlx_photo_block_can_output_caption`
```php
/**
 * Control whether to output the caption.
 *
 * @param bool   $can_output Whether to output the caption.
 * @param array  $attributes Block attributes.
 * @param string $innerblocks_content Inner blocks content.
 * @param array  $block Block data.
 * @param array  $context Block context.
 * @return bool Modified value.
 */
apply_filters( 'dlx_photo_block_can_output_caption', $can_output, $attributes, $innerblocks_content, $block, $context );
```

### `dlx_photo_block_caption_overlay_styles`
```php
/**
 * Modify caption overlay styles.
 *
 * @param array $caption_overlay_styles Array of overlay styles.
 * @param array $attributes Block attributes.
 * @param array $context Block context.
 * @return array Modified overlay styles.
 */
apply_filters( 'dlx_photo_block_caption_overlay_styles', $caption_overlay_styles, $attributes, $context );
```

### `dlx_photo_block_can_output`
```php
/**
 * Control whether to output the block.
 *
 * @param bool   $can_output Whether to output the block.
 * @param array  $attributes Block attributes.
 * @param string $innerblocks_content Inner blocks content.
 * @param array  $block Block data.
 * @return bool Modified value.
 */
apply_filters( 'dlx_photo_block_can_output', $can_output, $attributes, $innerblocks_content, $block );
```

### `dlx_photo_block_image_classes`
```php
/**
 * Modify image CSS classes.
 *
 * @param array $image_classes Array of CSS classes.
 * @param array $attributes Block attributes.
 * @param array $context Block context.
 * @return array Modified CSS classes.
 */
apply_filters( 'dlx_photo_block_image_classes', $image_classes, $attributes, $context );
```

### `dlx_photo_block_image_markup_pre`
```php
/**
 * Modify image markup before output.
 *
 * @param string $image_markup The image markup.
 * @param string $photo_mode The photo mode.
 * @param array  $attributes Block attributes.
 * @param array  $context Block context.
 * @return string Modified image markup.
 */
apply_filters( 'dlx_photo_block_image_markup_pre', $image_markup, $attributes['photoMode'], $attributes, $context );
```

### `dlx_photo_block_media_link_url`
```php
/**
 * Modify media link URL.
 *
 * @param string $media_link_url The media link URL.
 * @param array  $attributes Block attributes.
 * @param array  $context Block context.
 * @return string Modified media link URL.
 */
apply_filters( 'dlx_photo_block_media_link_url', $media_link_url, $attributes, $context );
```

### `dlx_photo_block_figure_css_classes`
```php
/**
 * Modify figure CSS classes.
 *
 * @param array $figure_css_classes Array of figure CSS classes.
 * @param array $attributes Block attributes.
 * @param array $context Block context.
 * @return array Modified CSS classes.
 */
apply_filters( 'dlx_photo_block_figure_css_classes', $figure_css_classes, $attributes, $context );
```

### `dlx_photo_block_section_css_classes`
```php
/**
 * Modify section CSS classes.
 *
 * @param array $section_css_classes Array of section CSS classes.
 * @param array $attributes Block attributes.
 * @param array $context Block context.
 * @return array Modified CSS classes.
 */
apply_filters( 'dlx_photo_block_section_css_classes', $section_css_classes, $attributes, $context );
```

### `dlx_photo_block_image_markup`
```php
/**
 * Modify final image markup.
 *
 * @param string $image_markup The image markup.
 * @param array  $attributes Block attributes.
 * @param array  $context Block context.
 * @return string Modified image markup.
 */
apply_filters( 'dlx_photo_block_image_markup', $image_markup, $attributes, $context );
```

## File Handling

### `dlx_photo_block_valid_mime_types`
```php
/**
 * Modify valid MIME types for uploads.
 *
 * @param array $valid_mime_types Array of valid MIME types.
 * @return array Modified array of MIME types.
 */
apply_filters( 'dlx_photo_block_valid_mime_types', $valid_mime_types );
```

### `dlx_photo_block_file_extensions`
```php
/**
 * Modify allowed file extensions.
 *
 * @param array $file_extensions Array of allowed file extensions.
 * @return array Modified array of file extensions.
 */
apply_filters( 'dlx_photo_block_file_extensions', $file_extensions );
```

## CSS and Styling

### `dlx_photo_block_css_output`
```php
/**
 * Modify CSS output for blocks.
 *
 * @param string $css_output The CSS output.
 * @param array  $attributes Block attributes.
 * @param string $unique_id Unique identifier for the block.
 * @param bool   $is_class Whether to use class-based selectors.
 * @return string Modified CSS output.
 */
apply_filters( 'dlx_photo_block_css_output', $css_output, $attributes, $unique_id, $is_class );
```

### `dlx_photo_block_color_palette`
```php
/**
 * Modify the color palette.
 *
 * @param array $color_palette {
 *     Array of color palette items.
 *     @type array {
 *         @type string $name  Color name.
 *         @type string $slug  Color slug.
 *         @type string $color Color value.
 *     }
 * }
 * @return array Modified color palette.
 */
apply_filters( 'dlx_photo_block_color_palette', $color_palette );
```

## Plugin URLs

### `dlx_photo_block_plugin_uri`
```php
/**
 * Modify the plugin URI.
 *
 * @param string $plugin_uri The plugin URI.
 * @return string Modified plugin URI.
 */
apply_filters( 'dlx_photo_block_plugin_uri', 'https://dlxplugins.com/plugins/photo-block/' );
```

### `dlx_photo_block_plugin_support_uri`
```php
/**
 * Modify the support URI.
 *
 * @param string $support_uri The support URI.
 * @return string Modified support URI.
 */
apply_filters( 'dlx_photo_block_plugin_support_uri', 'https://dlxplugins.com/support/' );
```

### `dlx_photo_block_plugin_docs_uri`
```php
/**
 * Modify the documentation URI.
 *
 * @param string $docs_uri The documentation URI.
 * @return string Modified documentation URI.
 */
apply_filters( 'dlx_photo_block_plugin_docs_uri', 'https://photoblock.dlxplugins.com/' );
```

## Usage Examples

### Modifying Default Options

```php
add_filter( 'photo_block_options_defaults', function( $defaults ) {
    $defaults['my_custom_option'] = 'custom_value';
    return $defaults;
});
```

### Customizing Image Classes

```php
add_filter( 'dlx_photo_block_image_classes', function( $classes, $attributes, $context ) {
    $classes[] = 'my-custom-class';
    return $classes;
}, 10, 3 );
```

### Modifying Color Palette

```php
add_filter( 'dlx_photo_block_color_palette', function( $color_palette ) {
    $color_palette[] = array(
        'name'  => 'Custom Color',
        'slug'  => 'custom-color',
        'color' => '#ff0000',
    );
    return $color_palette;
});
```

## Notes

- All hooks are prefixed with either `photo_block_` or `dlx_photo_block_` to avoid conflicts with other plugins.
- Most filters include context parameters that provide additional information about the current state.
- When modifying markup or styles, ensure your changes maintain accessibility and responsive design principles.
- All parameters are documented in WordPress PHP doc block format for better IDE integration and documentation generation. 