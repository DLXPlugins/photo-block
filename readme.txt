=== Photo Block - A Powerful Image Block ===
Contributors: ronalfy
Tags: image block, blocks, photo block, responsive block
Requires at least: 6.5
Tested up to: 6.8
Stable tag: 1.2.5
Requires PHP: 7.2
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Donate link: https://github.com/sponsors/DLXPlugins

Enhance your Block Editor with a fully customizable photo block, featuring advanced caption control, responsive styling, and global styles.

== Description ==

Photo Block adds a time-saving block to the Block Editor, allowing for advanced image customization with only a few clicks. Made for writers and layout builders, this block is extremely versatile with full caption support, responsive styling, and global styles.

> ❤️ <a href="https://app.instawp.io/launch?t=photo-block&d=v2">Spin up a Free Demo</a> ❤️

=== Core Features ===

1. **Responsive Controls**: Customize image sizes, padding, margins, border, and style settings for different screen sizes—ensuring your photos look perfect on any device.
2. **Advanced Caption Control**: A fully featured caption block is included, allowing you to position and overlay captions to match your photo style.
3. **Intuitive Cropping**: Crop your image using built-in tools, setting the aspect ratio, rotation, and more.
5. **Flexible Image Sources**: Upload directly from the block, use the WordPress media library, download from a URL, or provide a URL to an image.
6. **Global Styles**: Global styles allow you to save your design settings and easily apply them to other photo blocks, which allows you to maintain a consistent look across your site. With global styles, you can add the block, upload the photo, and apply advanced customization in just 4 clicks.
7. **Query Loop Support**: Seamlessly integrate Photo Block into a Query Loop block as a featured image for dynamic content.
8. **ScreenshotOne Support**: Use the <a href="https://screenshotone.com/">ScreenshotOne</a> service to generate website screenshots right from Photo Block.

> ❤️ <a href="https://app.instawp.io/launch?t=photo-block&d=v2">Spin up a Free Demo</a> ❤️

## Quick Links:

* <a href="https://dlxplugins.com/plugins/photo-block/">Plugin Home</a>
* <a href="https://docs.dlxplugins.com/v/photo-block/">Documentation</a>
* <a href="https://dlxplugins.com/support/">Support</a>
* <a href="https://github.com/DLXPlugins/photo-block">Source Code</a> (Including Uncompressed Scripts)

## Development:

Development happens on GitHub. <a href="https://github.com/DLXPlugins/photo-block">Check out the GitHub code repository for Photo Block</a>.

To assist or help this plugin financially, <a href="https://github.com/sponsors/DLXPlugins">please consider a GitHub sponsorship</a>.

## Libraries and Credits

1. <a href="https://pqina.nl/filepond/">Filepond<a> - React Image uploader.
2. <a href="https://una.github.io/CSSgram/">CSSgram</a> - CSS Image Effects.
3. <a href="https://lucide.dev/icons">Lucide</a> - React Icon Library.
4. <a href="https://www.npmjs.com/package/react-image-crop">React Image Crop</a> - React Image Cropper.
5. <a href="https://react-hook-form.com/">React Hook Form</a> - React Forms.
6. <a href="https://fancyapps.com/">Fancybox</a> - Lightbox Library.

== Installation ==

1. Search for “Photo Block” on the Add Plugins screen in WordPress.
2. Install and activate the plugin from your admin dashboard.
3. Once activated, use the block in any page or post by adding "Photo Block" from the block selector.

> <a href="https://docs.dlxplugins.com/v/photo-block/">In-depth Documentation</a> - Please check out our thorough documentation ❤️️

== Frequently Asked Questions ==

= How does this block differs from the core image block? =

Photo Block offers more advanced customization options like responsive layouts, a fully-featurd caption, caption overlays, and the ability to reuse styles across multiple blocks using global styles. It’s built for power users who want more control over their image presentation.

= Does this work with data? =

Photo Block works within the Query Loop block as a featured image.

As of release, it is compatible with:

* Core Query Block
* GenerateBlocks Query Loop
* Kadence Query Loop

If you have a specific block suite query loop you'd like to see Photo Block integrated with, please let us know!

= Does this work with the Classic Editor? =

No, this plugin is specificalliy built for the block editor.

= Does it work on mobile devices? =

You can set different styles for different device breakpoints.

= How can I get help? =

Please leave a detailed note on <a href="https://dlxplugins.com/support/">our support page</a>.

= Are you planning on integrating with other services? =

Yes, we are planning on integrating with other services in the future depending on this block's popularity and usage.

= Are you planning on adding any premium features? =

Yes, we are planning on adding premium features in the future depending on this block's popularity and usage. The goal at this time is to keep the plugin free, open-source, and address any bugs or feature requests that come up.

= I have a feature request. =

Please leave a detailed note on <a href="https://dlxplugins.com/support/">our support page</a>.

== Screenshots ==
1. Adding a photo with Photo Block is easy in the block editor.
2. Crop, replace, and adjust the accessibility options for your photo.
3. Global Styles allow you to save your design settings and easily apply them to other photo blocks.
4. The caption block is fully featured, allowing you to position and overlay captions to match your photo style.
5. Select a global style, adjust the images's title and alt attributes, sand select the image size.
6. Adjust the image's background color, opacity, blur, and drop shadow.
7. Select form 26 different CSS styles using CSS Gram.
8. Adjust the padding, margin, and border of the photo.
9. Set sizing for the photo, and set the object fit (if desired).
10. Set the caption overlay's positio, and enable an overlay on hover.
11. Set the overlay type to None, Solid, Gradient, or Image.
12. Set the caption's typography, background color, and text color.
13. Set the caption's padding, margin, and border.
14. Set the caption's sizing using available block options.
15. Global Styles panel, which allows you to save and edit global styles.
16. Save or overwrite a global style using the Global Styles modal.

== Changelog ==

= 1.2.5 =
* Released 2025-05-18
* New Feature: Set aspect ratio per responsive breakpoint.
* New Feature: Image size and a Copy shortcut show next to the image URL field in the sidebar.
* Bug fix: Background color, drop shadow color weren't honoring opacity.
* Bug fix: Selecting a color with a CSS variable will now properly reflect the color in the block editor.
* Bug fix: Drop shadows weren't working with feautred images.
* Bug fix: Lazy loading wasn't honoring settings.

= 1.2.0 =
* Released 2025-05-09
* New Feature: Custom links can now pop-up into lightboxes if they are of type jpg, jpeg, gif, png, webp, or avif.
* New Feature: Added Debug mode, which will make the hidden Global Styles post type visiible for inspecting.
* Bug fix: Global Styles would sometimes save the wrong block information, causing a fatal error.
* Bug fix: Fixed Featured Image so that it can be set as a post permalink (this wasn't saving before).

= 1.1.5 =
* Released 2025-05-07
* New feature: Ability to hide the caption text in overlays. This can be used to create advanced effects.
* New feature: Overlay select boxes have been replaced with more compact ButtonGroup components.
* New feature: Now works in GenerateBlocks 2.0 query loops.
* New Feature: Added in transforms to the regular Image block.
* Bug fix: Exclude per-device hide behavior from saving in Global Styles.
* Bug fix: Fixed ScreenshotOne icon during the initial view.

= 1.1.1 =
* Released 2025-05-07
* There were a few critical errors when requesting a new ScreenshotOne image.

= 1.1.0 =
* Released 2025-05-05
* New feature: ScreenshotOne compatibility released. You can now take website screenshots from within Photo Block.
* New feature: New admin panel to set block and ScreenshotOne defaults.
* New feature: Disable the caption appender by default.
* New feature: File size and URL is shown in the sidebar when available.
* Bug fix: Opacity wasn't rendering on the frontend.

= 1.0.14 =
* Released 2025-01-07
* Bug fix: Uploading in smaller columns didn't show a preview.
* Bug fix: Cropping was causing a larger view area when loading an image.
* Bug fix: Block icon previews were not displaying properly on .org.

= 1.0.7 =
* Released 2024-12-25
* Hot fix: Fix applied in 1.0.5 for fixing copying made images in URL mode upon rendering.

= 1.0.5 =
* Released 2024-12-25
* Bug fix: Fixing issue with units not displaying on the frontend or in the block editor.
* Bug fix: Fixing issue with global styles not applying to the iframe when viewing a block as tablet or mobile in the block editor.
* Bug fix: Copying an image from site to site was not working, so a check was added in to make sure the image mode is set to URL if an image ID isn't found.

= 1.0.1 =
* Released 2024-11-03
* Ensuring compatibility with WP 6.7.

= 1.0.0 =
* Initial release.

== Upgrade Notice ==

= 1.2.5 =
Adding aspect ratio. Adding file dimensions and copy shortcut for image attributes. Fixed background color and drop shadow opacity values not rendering. Fixed drop shadow not working for featured images.


