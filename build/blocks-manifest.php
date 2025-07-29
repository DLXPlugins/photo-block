<?php
// This file is generated. Do not modify it manually.
return array(
	'photo-block' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'title' => 'Photo Block',
		'apiVersion' => 2,
		'name' => 'dlxplugins/photo-block',
		'category' => 'media',
		'icon' => '<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1305 1305\' width=\'36\' height=\'36\'><path fill=\'#333333\' d=\'M652.492 1302.95c-359.692 0-651.275-291.583-651.275-651.275C1.217 291.983 292.8.4 652.492.4c359.687 0 651.275 291.583 651.275 651.275 0 359.692-291.588 651.275-651.275 651.275Z\'/><path fill=\'#FFF\' d=\'M652.492 1238.55c-324.125 0-586.879-262.754-586.879-586.879S328.367 64.792 652.492 64.792s586.879 262.754 586.879 586.879-262.754 586.879-586.879 586.879Z\'/><path fill=\'#3858e9\' d=\'M345.942 498.429 113.458 631.583c-.246 6.671-.412 13.363-.412 20.092 0 183.908 92.054 346.292 232.575 443.671l.321-596.917Zm592.429-35.779.771-268c-83.055-52.2-181.317-82.421-286.65-82.421-82.734 0-161.105 18.65-231.175 51.933L938.371 462.65ZM366.612 840.7l-.77 268c83.05 52.2 181.312 82.421 286.65 82.421 82.737 0 161.104-18.65 231.175-51.934L366.612 840.7Zm264.855-531.1-516.7 298.883c14.916-188.166 126.379-349.133 284.854-433.396L631.467 309.6Zm42.05 684.146 516.7-298.875C1175.3 883.033 1063.842 1044 905.362 1128.262L673.517 993.746Zm285.521-188.829 232.487-133.15c.246-6.671.413-13.363.413-20.092 0-183.908-92.055-346.292-232.571-443.671l-.329 596.913ZM578.938 398.8c139.62-40.6 285.816 39.662 326.42 179.329 40.654 139.617-39.666 285.763-179.333 326.421-139.675 40.6-285.817-39.667-326.421-179.338-40.6-139.67 39.663-285.812 179.334-326.412Z\'/><path fill=\'#FFF\' d=\'M473.954 596.729c-.562 12.3-10.758 22.063-23.179 21.975-12.687-.087-24.004-10.933-22.854-23.921 5.15-58.075 50.75-111.021 101.45-136.596 11.6-5.849 25.687.034 30.775 11.738 5.017 11.546-.463 24.512-11.483 30.1-33.117 16.783-67.392 59.958-74.709 96.704ZM603.883 422.104c12.884 0 23.33 10.446 23.33 23.333 0 12.884-10.446 23.33-23.33 23.33-12.887 0-23.329-10.446-23.329-23.33 0-12.887 10.442-23.333 23.329-23.333Z\'/></svg>',
		'description' => 'An easy-to-use and comprehensive image block.',
		'keywords' => array(
			'photo',
			'block',
			'image',
			'picture',
			'photos'
		),
		'version' => '1.0.0',
		'textdomain' => 'photo-block',
		'usesContext' => array(
			'postType',
			'postId',
			'queryId',
			'query'
		),
		'providesContext' => array(
			'photo-block/uniqueId' => 'uniqueId',
			'photo-block/photoMode' => 'photoMode',
			'photo-block/dataHasFallbackImage' => 'dataHasFallbackImage',
			'photo-block/dataFallbackImageSize' => 'dataFallbackImageSize',
			'photo-block/dataFallbackImage' => 'dataFallbackImage',
			'photo-block/imageSize' => 'imageSize',
			'photo-block/globalStyle' => 'globalStyle',
			'photo-block/inQueryLoop' => 'inQueryLoop'
		),
		'attributes' => array(
			'preview' => array(
				'type' => 'boolean',
				'default' => false
			),
			'inQueryLoop' => array(
				'type' => 'boolean',
				'default' => false
			),
			'uniqueId' => array(
				'type' => 'string',
				'default' => null
			),
			'date' => array(
				'type' => 'string',
				'default' => ''
			),
			'globalStyle' => array(
				'type' => 'string',
				'default' => 'none'
			),
			'defaultsApplied' => array(
				'type' => 'boolean',
				'default' => false
			),
			'imageData' => array(
				'type' => 'object',
				'default' => array(
					'id' => 0,
					'url' => '',
					'alt' => '',
					'full' => '',
					'width' => '',
					'height' => '',
					'attachment_link' => '',
					'title' => '',
					'caption' => ''
				)
			),
			'photoOpacity' => array(
				'type' => 'number',
				'default' => 100
			),
			'photoBlur' => array(
				'type' => 'number',
				'default' => 0
			),
			'photoObjectFit' => array(
				'type' => 'string',
				'default' => 'inherit'
			),
			'photoObjectPosition' => array(
				'type' => 'string',
				'default' => 'none'
			),
			'photoObjectPositionCustom' => array(
				'type' => 'string',
				'default' => ''
			),
			'photoDropShadow' => array(
				'type' => 'object',
				'default' => array(
					'color' => '#000000',
					'opacity' => 1,
					'blur' => 0,
					'spread' => 0,
					'horizontal' => 0,
					'vertical' => 0,
					'inset' => false,
					'enabled' => false
				)
			),
			'photoBackgroundColor' => array(
				'type' => 'string',
				'default' => '#FFFFFF'
			),
			'photoBackgroundColorOpacity' => array(
				'type' => 'number',
				'default' => 0
			),
			'photoAspectRatio' => array(
				'type' => 'object',
				'default' => array(
					'mobile' => null,
					'tablet' => null,
					'desktop' => null
				)
			),
			'photoMaximumWidth' => array(
				'type' => 'object',
				'default' => array(
					'mobile' => array(
						'width' => '',
						'unit' => null
					),
					'tablet' => array(
						'width' => '',
						'unit' => null
					),
					'desktop' => array(
						'width' => '100',
						'unit' => '%'
					)
				)
			),
			'containerWidth' => array(
				'type' => 'object',
				'default' => array(
					'mobile' => array(
						'width' => '',
						'unit' => null
					),
					'tablet' => array(
						'width' => '',
						'unit' => null
					),
					'desktop' => array(
						'width' => '',
						'unit' => 'px'
					)
				)
			),
			'containerHeight' => array(
				'type' => 'object',
				'default' => array(
					'mobile' => array(
						'width' => '',
						'unit' => null
					),
					'tablet' => array(
						'width' => '',
						'unit' => null
					),
					'desktop' => array(
						'width' => '',
						'unit' => 'px'
					)
				)
			),
			'containerMinWidth' => array(
				'type' => 'object',
				'default' => array(
					'mobile' => array(
						'width' => '',
						'unit' => null
					),
					'tablet' => array(
						'width' => '',
						'unit' => null
					),
					'desktop' => array(
						'width' => '',
						'unit' => 'px'
					)
				)
			),
			'containerMaxWidth' => array(
				'type' => 'object',
				'default' => array(
					'mobile' => array(
						'width' => '',
						'unit' => null
					),
					'tablet' => array(
						'width' => '',
						'unit' => null
					),
					'desktop' => array(
						'width' => '',
						'unit' => 'px'
					)
				)
			),
			'containerMinHeight' => array(
				'type' => 'object',
				'default' => array(
					'mobile' => array(
						'width' => '',
						'unit' => null
					),
					'tablet' => array(
						'width' => '',
						'unit' => null
					),
					'desktop' => array(
						'width' => '',
						'unit' => 'px'
					)
				)
			),
			'containerMaxHeight' => array(
				'type' => 'object',
				'default' => array(
					'mobile' => array(
						'width' => '',
						'unit' => null
					),
					'tablet' => array(
						'width' => '',
						'unit' => null
					),
					'desktop' => array(
						'width' => '',
						'unit' => 'px'
					)
				)
			),
			'photoMode' => array(
				'type' => 'string',
				'default' => 'none'
			),
			'cssGramFilter' => array(
				'type' => 'string',
				'default' => 'none'
			),
			'aspectRatio' => array(
				'type' => 'string',
				'default' => 'original'
			),
			'aspectRatioUnit' => array(
				'type' => 'string',
				'default' => 'ratio'
			),
			'aspectRatioWidthPixels' => array(
				'type' => 'string',
				'default' => '1280'
			),
			'aspectRatioHeightPixels' => array(
				'type' => 'string',
				'default' => '720'
			),
			'aspectRatioWidth' => array(
				'type' => 'string',
				'default' => '16'
			),
			'aspectRatioHeight' => array(
				'type' => 'string',
				'default' => '9'
			),
			'dataMediaLinkSource' => array(
				'type' => 'string',
				'default' => 'none'
			),
			'dataHasFallbackImage' => array(
				'type' => 'boolean',
				'default' => false
			),
			'dataFallbackImageSize' => array(
				'type' => 'string',
				'default' => 'large'
			),
			'dataFallbackImage' => array(
				'type' => 'object',
				'default' => array(
					'id' => '',
					'url' => '',
					'alt' => '',
					'full' => '',
					'attachment_link' => ''
				)
			),
			'mediaLinkType' => array(
				'type' => 'string',
				'default' => 'none'
			),
			'mediaLinkOverride' => array(
				'type' => 'boolean',
				'default' => false
			),
			'mediaLinkRel' => array(
				'type' => 'string',
				'default' => ''
			),
			'mediaLinkAnchorId' => array(
				'type' => 'string',
				'default' => ''
			),
			'mediaLinkUrl' => array(
				'type' => 'string',
				'default' => ''
			),
			'mediaLinkClass' => array(
				'type' => 'string',
				'default' => ''
			),
			'mediaLinkTitle' => array(
				'type' => 'string',
				'default' => ''
			),
			'mediaLinkNewTab' => array(
				'type' => 'boolean',
				'default' => false
			),
			'dataMediaLinkRel' => array(
				'type' => 'string',
				'default' => ''
			),
			'dataMediaLinkUrl' => array(
				'type' => 'string',
				'default' => ''
			),
			'dataMediaLinkClass' => array(
				'type' => 'string',
				'default' => ''
			),
			'dataMediaLinkNewTab' => array(
				'type' => 'boolean',
				'default' => false
			),
			'mediaLibraryAspectRatio' => array(
				'type' => 'string',
				'default' => '16:9'
			),
			'mediaLibrarySuggestedWidth' => array(
				'type' => 'string',
				'default' => '1280'
			),
			'mediaLibrarySuggestedHeight' => array(
				'type' => 'string',
				'default' => '720'
			),
			'align' => array(
				'type' => 'string',
				'default' => 'center'
			),
			'photoPosition' => array(
				'type' => 'string',
				'default' => 'center'
			),
			'imageSize' => array(
				'type' => 'string',
				'default' => 'large'
			),
			'imageSizeOverride' => array(
				'type' => 'boolean',
				'default' => false
			),
			'altText' => array(
				'type' => 'string',
				'default' => ''
			),
			'hasCaption' => array(
				'type' => 'boolean',
				'default' => false
			),
			'captionPosition' => array(
				'type' => 'string',
				'default' => 'bottom'
			),
			'hideCaption' => array(
				'type' => 'boolean',
				'default' => false
			),
			'overlayText' => array(
				'type' => 'string',
				'default' => ''
			),
			'overlayTextPosition' => array(
				'type' => 'string',
				'default' => ''
			),
			'photoPaddingSize' => array(
				'type' => 'object',
				'default' => array(
					'mobile' => array(
						'top' => '',
						'right' => '',
						'bottom' => '',
						'left' => '',
						'topUnit' => null,
						'rightUnit' => null,
						'bottomUnit' => null,
						'leftUnit' => null,
						'unitSync' => true
					),
					'tablet' => array(
						'top' => '',
						'right' => '',
						'bottom' => '',
						'left' => '',
						'topUnit' => null,
						'rightUnit' => null,
						'bottomUnit' => null,
						'leftUnit' => null,
						'unitSync' => true
					),
					'desktop' => array(
						'top' => '0',
						'right' => '0',
						'bottom' => '0',
						'left' => '0',
						'topUnit' => 'px',
						'rightUnit' => 'px',
						'bottomUnit' => 'px',
						'leftUnit' => 'px',
						'unitSync' => true
					)
				)
			),
			'photoMarginSize' => array(
				'type' => 'object',
				'default' => array(
					'mobile' => array(
						'top' => '',
						'right' => '',
						'bottom' => '',
						'left' => '',
						'topUnit' => null,
						'rightUnit' => null,
						'bottomUnit' => null,
						'leftUnit' => null,
						'unitSync' => true
					),
					'tablet' => array(
						'top' => '',
						'right' => '',
						'bottom' => '',
						'left' => '',
						'topUnit' => null,
						'rightUnit' => null,
						'bottomUnit' => null,
						'leftUnit' => null,
						'unitSync' => true
					),
					'desktop' => array(
						'top' => '0',
						'right' => '0',
						'bottom' => '0',
						'left' => '0',
						'topUnit' => 'px',
						'rightUnit' => 'px',
						'bottomUnit' => 'px',
						'leftUnit' => 'px',
						'unitSync' => true
					)
				)
			),
			'photoBorder' => array(
				'type' => 'object',
				'default' => array(
					'mobile' => array(
						'top' => array(
							'width' => '',
							'unit' => null,
							'color' => '',
							'opacity' => 1,
							'borderStyle' => ''
						),
						'right' => array(
							'width' => '',
							'unit' => null,
							'color' => '',
							'opacity' => 1,
							'borderStyle' => ''
						),
						'bottom' => array(
							'width' => '',
							'unit' => null,
							'color' => '',
							'opacity' => 1,
							'borderStyle' => ''
						),
						'left' => array(
							'width' => '',
							'unit' => null,
							'color' => '',
							'opacity' => 1,
							'borderStyle' => ''
						),
						'unitSync' => true
					),
					'tablet' => array(
						'top' => array(
							'width' => '',
							'unit' => null,
							'color' => '',
							'opacity' => 1,
							'borderStyle' => ''
						),
						'right' => array(
							'width' => '',
							'unit' => null,
							'color' => '',
							'opacity' => 1,
							'borderStyle' => ''
						),
						'bottom' => array(
							'width' => '',
							'unit' => null,
							'color' => '',
							'opacity' => 1,
							'borderStyle' => ''
						),
						'left' => array(
							'width' => '',
							'unit' => null,
							'color' => '',
							'opacity' => 1,
							'borderStyle' => ''
						),
						'unitSync' => true
					),
					'desktop' => array(
						'top' => array(
							'width' => '0',
							'unit' => 'px',
							'color' => '#000000',
							'opacity' => 1,
							'borderStyle' => 'solid'
						),
						'right' => array(
							'width' => '0',
							'unit' => 'px',
							'color' => '#000000',
							'opacity' => 1,
							'borderStyle' => 'solid'
						),
						'bottom' => array(
							'width' => '0',
							'unit' => 'px',
							'color' => '#000000',
							'opacity' => 1,
							'borderStyle' => 'solid'
						),
						'left' => array(
							'width' => '0',
							'unit' => 'px',
							'color' => '#000000',
							'opacity' => 1,
							'borderStyle' => 'solid'
						),
						'unitSync' => true
					)
				)
			),
			'photoBorderRadius' => array(
				'type' => 'object',
				'default' => array(
					'mobile' => array(
						'top' => '',
						'right' => '',
						'bottom' => '',
						'left' => '',
						'topUnit' => null,
						'rightUnit' => null,
						'bottomUnit' => null,
						'leftUnit' => null,
						'unitSync' => true
					),
					'tablet' => array(
						'top' => '',
						'right' => '',
						'bottom' => '',
						'left' => '',
						'topUnit' => null,
						'rightUnit' => null,
						'bottomUnit' => null,
						'leftUnit' => null,
						'unitSync' => true
					),
					'desktop' => array(
						'top' => '0',
						'right' => '0',
						'bottom' => '0',
						'left' => '0',
						'topUnit' => 'px',
						'rightUnit' => 'px',
						'bottomUnit' => 'px',
						'leftUnit' => 'px',
						'unitSync' => true
					)
				)
			),
			'hideOnMobile' => array(
				'type' => 'boolean',
				'default' => false
			),
			'hideOnTablet' => array(
				'type' => 'boolean',
				'default' => false
			),
			'hideOnDesktop' => array(
				'type' => 'boolean',
				'default' => false
			),
			'customAttributes' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'skipLazyLoading' => array(
				'type' => 'boolean',
				'default' => false
			),
			'lightboxEnabled' => array(
				'type' => 'boolean',
				'default' => false
			),
			'lightboxShowCaption' => array(
				'type' => 'boolean',
				'default' => false
			),
			'lightboxCaption' => array(
				'type' => 'string',
				'default' => ''
			),
			'customLinkLightboxEnabled' => array(
				'type' => 'boolean',
				'default' => false
			),
			'customLinkLightboxCaption' => array(
				'type' => 'string',
				'default' => ''
			),
			'customLinkLightboxShowCaption' => array(
				'type' => 'boolean',
				'default' => false
			),
			'imageProtectionEnabled' => array(
				'type' => 'boolean',
				'default' => false
			),
			'htmlAnchor' => array(
				'type' => 'string',
				'default' => ''
			),
			'figureCSSClasses' => array(
				'type' => 'string',
				'default' => ''
			),
			'imageCSSClasses' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'supports' => array(
			'anchor' => false,
			'align' => false,
			'className' => true,
			'customClassName' => false,
			'alignWide' => false,
			'defaultStylePicker' => false,
			'html' => false
		),
		'example' => array(
			'attributes' => array(
				'preview' => true
			)
		),
		'editorScript' => 'dlx-photo-block-editor',
		'editorStyle' => 'dlx-photo-block-editor-css',
		'style' => 'dlx-photo-block-frontend-and-editor'
	),
	'photo-caption-block' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'title' => 'Caption Block',
		'apiVersion' => 3,
		'name' => 'dlxplugins/photo-caption-block',
		'parent' => array(
			'dlxplugins/photo-block'
		),
		'category' => 'common',
		'description' => 'A comprehensive caption block.',
		'icon' => '<svg viewBox=\'0 0 32 32\' xmlns=\'http://www.w3.org/2000/svg\' id=\'fi_15413386\'><path fill=\'#3858e9\' d=\'m23 4h-14a5 5 0 0 0 -5 5v14a5 5 0 0 0 5 5h14a5 5 0 0 0 5-5v-14a5 5 0 0 0 -5-5zm-14 14h2a1 1 0 0 1 0 2h-2a1 1 0 0 1 0-2zm8 6h-8a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2zm6 0h-2a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2zm0-4h-8a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2z\'></path></svg>',
		'keywords' => array(
			'photo',
			'block',
			'image',
			'picture',
			'photos',
			'caption',
			'credit'
		),
		'version' => '1.0.0',
		'textdomain' => 'photo-block',
		'usesContext' => array(
			'postType',
			'postId',
			'queryId',
			'query',
			'photo-block/photoMode',
			'photo-block/dataSource',
			'photo-block/dataImageSource',
			'photo-block/dataImageSourceCustomField',
			'photo-block/dataImageSourceAuthorMeta',
			'photo-block/dataHasFallbackImage',
			'photo-block/dataFallbackImageSize',
			'photo-block/dataFallbackImage',
			'photo-block/dataPostType',
			'photo-block/dataPostId',
			'photo-block/imageSize',
			'photo-block/uniqueId',
			'photo-block/globalStyle'
		),
		'attributes' => array(
			'date' => array(
				'type' => 'string',
				'default' => ''
			),
			'globalStyle' => array(
				'type' => 'string',
				'default' => ''
			),
			'photoMode' => array(
				'type' => 'string',
				'default' => ''
			),
			'uniqueId' => array(
				'type' => 'string',
				'default' => ''
			),
			'captionManual' => array(
				'type' => 'string',
				'default' => ''
			),
			'mode' => array(
				'type' => 'string',
				'default' => 'single'
			),
			'enableSmartStyles' => array(
				'type' => 'boolean',
				'default' => true
			),
			'enableAllBlocks' => array(
				'type' => 'boolean',
				'default' => false
			),
			'captionBaseFontSize' => array(
				'type' => 'object',
				'default' => array(
					'mobile' => array(
						'value' => '14',
						'unit' => 'px'
					),
					'tablet' => array(
						'value' => '14',
						'unit' => 'px'
					),
					'desktop' => array(
						'value' => '16',
						'unit' => 'px'
					)
				)
			),
			'captionPosition' => array(
				'type' => 'string',
				'default' => 'bottom'
			),
			'captionAlign' => array(
				'type' => 'string',
				'default' => 'center'
			),
			'captionBackgroundColor' => array(
				'type' => 'string',
				'default' => 'transparent'
			),
			'captionBackgroundColorOpacity' => array(
				'type' => 'number',
				'default' => 1
			),
			'captionTextColor' => array(
				'type' => 'string',
				'default' => '#333'
			),
			'captionTextColorOverlay' => array(
				'type' => 'string',
				'default' => '#FFFFFF'
			),
			'captionAccentColor' => array(
				'type' => 'string',
				'default' => '#e17713'
			),
			'captionSecondaryColor' => array(
				'type' => 'string',
				'default' => '#FFFFFF'
			),
			'captionLinkColor' => array(
				'type' => 'string',
				'default' => '#e17713'
			),
			'captionLinkHoverColor' => array(
				'type' => 'string',
				'default' => '#f58f2f'
			),
			'captionTextFontFamily' => array(
				'type' => 'string',
				'default' => 'Arial'
			),
			'captionHeadingsFontFamily' => array(
				'type' => 'string',
				'default' => 'Arial'
			),
			'captionTypography' => array(
				'type' => 'object',
				'default' => array(
					'mobile' => array(
						'fontFamily' => '',
						'fontFamilySlug' => '',
						'fontSize' => '',
						'fontSizeUnit' => 'px',
						'fontWeight' => '',
						'lineHeight' => '',
						'lineHeightUnit' => 'em',
						'textTransform' => '',
						'letterSpacing' => '',
						'letterSpacingUnit' => 'px',
						'fontFallback' => '',
						'fontType' => 'web'
					),
					'tablet' => array(
						'fontFamily' => '',
						'fontFamilySlug' => '',
						'fontSize' => '',
						'fontSizeUnit' => 'px',
						'fontWeight' => '',
						'lineHeight' => '',
						'lineHeightUnit' => 'em',
						'textTransform' => '',
						'letterSpacing' => '',
						'letterSpacingUnit' => 'px',
						'fontFallback' => '',
						'fontType' => 'web'
					),
					'desktop' => array(
						'fontFamily' => 'Arial',
						'fontFamilySlug' => 'arial',
						'fontSize' => '18',
						'fontSizeUnit' => 'px',
						'fontWeight' => 'normal',
						'lineHeight' => '1.2',
						'lineHeightUnit' => 'em',
						'textTransform' => 'none',
						'letterSpacing' => '0',
						'letterSpacingUnit' => 'px',
						'fontFallback' => 'serif',
						'fontType' => 'web'
					)
				)
			),
			'captionCustomTypography' => array(
				'type' => 'string',
				'default' => ''
			),
			'captionPaddingSize' => array(
				'type' => 'object',
				'default' => array(
					'mobile' => array(
						'top' => '',
						'right' => '',
						'bottom' => '',
						'left' => '',
						'topUnit' => null,
						'rightUnit' => null,
						'bottomUnit' => null,
						'leftUnit' => null,
						'unitSync' => true
					),
					'tablet' => array(
						'top' => '',
						'right' => '',
						'bottom' => '',
						'left' => '',
						'topUnit' => null,
						'rightUnit' => null,
						'bottomUnit' => null,
						'leftUnit' => null,
						'unitSync' => true
					),
					'desktop' => array(
						'top' => '15',
						'right' => '20',
						'bottom' => '15',
						'left' => '20',
						'topUnit' => 'px',
						'rightUnit' => 'px',
						'bottomUnit' => 'px',
						'leftUnit' => 'px',
						'unitSync' => false
					)
				)
			),
			'captionMarginSize' => array(
				'type' => 'object',
				'default' => array(
					'mobile' => array(
						'top' => '',
						'right' => '',
						'bottom' => '',
						'left' => '',
						'topUnit' => null,
						'rightUnit' => null,
						'bottomUnit' => null,
						'leftUnit' => null,
						'unitSync' => true
					),
					'tablet' => array(
						'top' => '',
						'right' => '',
						'bottom' => '',
						'left' => '',
						'topUnit' => null,
						'rightUnit' => null,
						'bottomUnit' => null,
						'leftUnit' => null,
						'unitSync' => true
					),
					'desktop' => array(
						'top' => '0',
						'right' => '0',
						'bottom' => '0',
						'left' => '0',
						'topUnit' => 'px',
						'rightUnit' => 'px',
						'bottomUnit' => 'px',
						'leftUnit' => 'px',
						'unitSync' => true
					)
				)
			),
			'captionBorder' => array(
				'type' => 'object',
				'default' => array(
					'mobile' => array(
						'top' => array(
							'width' => '',
							'unit' => null,
							'color' => '',
							'borderStyle' => ''
						),
						'right' => array(
							'width' => '',
							'unit' => null,
							'color' => '',
							'borderStyle' => ''
						),
						'bottom' => array(
							'width' => '',
							'unit' => null,
							'color' => '',
							'borderStyle' => ''
						),
						'left' => array(
							'width' => '',
							'unit' => null,
							'color' => '',
							'borderStyle' => ''
						),
						'unitSync' => true
					),
					'tablet' => array(
						'top' => array(
							'width' => '',
							'unit' => null,
							'color' => '',
							'borderStyle' => ''
						),
						'right' => array(
							'width' => '',
							'unit' => null,
							'color' => '',
							'borderStyle' => ''
						),
						'bottom' => array(
							'width' => '',
							'unit' => null,
							'color' => '',
							'borderStyle' => ''
						),
						'left' => array(
							'width' => '',
							'unit' => null,
							'color' => '',
							'borderStyle' => ''
						),
						'unitSync' => true
					),
					'desktop' => array(
						'top' => array(
							'width' => '0',
							'unit' => 'px',
							'color' => '#000000',
							'borderStyle' => 'solid'
						),
						'right' => array(
							'width' => '0',
							'unit' => 'px',
							'color' => '#000000',
							'borderStyle' => 'solid'
						),
						'bottom' => array(
							'width' => '0',
							'unit' => 'px',
							'color' => '#000000',
							'borderStyle' => 'solid'
						),
						'left' => array(
							'width' => '0',
							'unit' => 'px',
							'color' => '#000000',
							'borderStyle' => 'solid'
						),
						'unitSync' => true
					)
				)
			),
			'captionBorderRadius' => array(
				'type' => 'object',
				'default' => array(
					'mobile' => array(
						'top' => '',
						'right' => '',
						'bottom' => '',
						'left' => '',
						'topUnit' => null,
						'rightUnit' => null,
						'bottomUnit' => null,
						'leftUnit' => null,
						'unitSync' => true
					),
					'tablet' => array(
						'top' => '',
						'right' => '',
						'bottom' => '',
						'left' => '',
						'topUnit' => null,
						'rightUnit' => null,
						'bottomUnit' => null,
						'leftUnit' => null,
						'unitSync' => true
					),
					'desktop' => array(
						'top' => '0',
						'right' => '0',
						'bottom' => '0',
						'left' => '0',
						'topUnit' => 'px',
						'rightUnit' => 'px',
						'bottomUnit' => 'px',
						'leftUnit' => 'px',
						'unitSync' => true
					)
				)
			),
			'containerWidth' => array(
				'type' => 'object',
				'default' => array(
					'mobile' => array(
						'width' => '',
						'unit' => null
					),
					'tablet' => array(
						'width' => '',
						'unit' => null
					),
					'desktop' => array(
						'width' => '',
						'unit' => 'px'
					)
				)
			),
			'containerHeight' => array(
				'type' => 'object',
				'default' => array(
					'mobile' => array(
						'width' => '',
						'unit' => null
					),
					'tablet' => array(
						'width' => '',
						'unit' => null
					),
					'desktop' => array(
						'width' => '',
						'unit' => 'px'
					)
				)
			),
			'containerMinWidth' => array(
				'type' => 'object',
				'default' => array(
					'mobile' => array(
						'width' => '',
						'unit' => null
					),
					'tablet' => array(
						'width' => '',
						'unit' => null
					),
					'desktop' => array(
						'width' => '',
						'unit' => 'px'
					)
				)
			),
			'containerMaxWidth' => array(
				'type' => 'object',
				'default' => array(
					'mobile' => array(
						'width' => '',
						'unit' => null
					),
					'tablet' => array(
						'width' => '',
						'unit' => null
					),
					'desktop' => array(
						'width' => '',
						'unit' => 'px'
					)
				)
			),
			'containerMinHeight' => array(
				'type' => 'object',
				'default' => array(
					'mobile' => array(
						'width' => '',
						'unit' => null
					),
					'tablet' => array(
						'width' => '',
						'unit' => null
					),
					'desktop' => array(
						'width' => '',
						'unit' => 'px'
					)
				)
			),
			'containerMaxHeight' => array(
				'type' => 'object',
				'default' => array(
					'mobile' => array(
						'width' => '',
						'unit' => null
					),
					'tablet' => array(
						'width' => '',
						'unit' => null
					),
					'desktop' => array(
						'width' => '',
						'unit' => 'px'
					)
				)
			),
			'overlayVerticalPosition' => array(
				'type' => 'string',
				'default' => 'middle'
			),
			'overlayCaptionVerticalPosition' => array(
				'type' => 'string',
				'default' => 'middle'
			),
			'overlayCaptionHorizontalPosition' => array(
				'type' => 'string',
				'default' => 'center'
			),
			'overlayHorizontalPosition' => array(
				'type' => 'string',
				'default' => 'center'
			),
			'overlayBackgroundType' => array(
				'type' => 'string',
				'default' => 'solid'
			),
			'overlayBackgroundColor' => array(
				'type' => 'string',
				'default' => 'rgba(0,0,0,0.5)'
			),
			'overlayBackgroundColorOpacity' => array(
				'type' => 'number',
				'default' => 0.5
			),
			'overlayBackgroundColorHover' => array(
				'type' => 'string',
				'default' => 'rgba(0,0,0,0.40)'
			),
			'overlayBackgroundColorOpacityHover' => array(
				'type' => 'number',
				'default' => 0.4
			),
			'overlayBorder' => array(
				'type' => 'object',
				'default' => array(
					'mobile' => array(
						'top' => array(
							'width' => '',
							'unit' => null,
							'color' => '',
							'borderStyle' => ''
						),
						'right' => array(
							'width' => '',
							'unit' => null,
							'color' => '',
							'borderStyle' => ''
						),
						'bottom' => array(
							'width' => '',
							'unit' => null,
							'color' => '',
							'borderStyle' => ''
						),
						'left' => array(
							'width' => '',
							'unit' => null,
							'color' => '',
							'borderStyle' => ''
						),
						'unitSync' => true
					),
					'tablet' => array(
						'top' => array(
							'width' => '',
							'unit' => null,
							'color' => '',
							'borderStyle' => ''
						),
						'right' => array(
							'width' => '',
							'unit' => null,
							'color' => '',
							'borderStyle' => ''
						),
						'bottom' => array(
							'width' => '',
							'unit' => null,
							'color' => '',
							'borderStyle' => ''
						),
						'left' => array(
							'width' => '',
							'unit' => null,
							'color' => '',
							'borderStyle' => ''
						),
						'unitSync' => true
					),
					'desktop' => array(
						'top' => array(
							'width' => '0',
							'unit' => 'px',
							'color' => '#000000',
							'borderStyle' => 'solid'
						),
						'right' => array(
							'width' => '0',
							'unit' => 'px',
							'color' => '#000000',
							'borderStyle' => 'solid'
						),
						'bottom' => array(
							'width' => '0',
							'unit' => 'px',
							'color' => '#000000',
							'borderStyle' => 'solid'
						),
						'left' => array(
							'width' => '0',
							'unit' => 'px',
							'color' => '#000000',
							'borderStyle' => 'solid'
						),
						'unitSync' => true
					)
				)
			),
			'overlayBorderRadius' => array(
				'type' => 'object',
				'default' => array(
					'mobile' => array(
						'top' => '',
						'right' => '',
						'bottom' => '',
						'left' => '',
						'topUnit' => null,
						'rightUnit' => null,
						'bottomUnit' => null,
						'leftUnit' => null,
						'unitSync' => true
					),
					'tablet' => array(
						'top' => '',
						'right' => '',
						'bottom' => '',
						'left' => '',
						'topUnit' => null,
						'rightUnit' => null,
						'bottomUnit' => null,
						'leftUnit' => null,
						'unitSync' => true
					),
					'desktop' => array(
						'top' => '0',
						'right' => '0',
						'bottom' => '0',
						'left' => '0',
						'topUnit' => 'px',
						'rightUnit' => 'px',
						'bottomUnit' => 'px',
						'leftUnit' => 'px',
						'unitSync' => true
					)
				)
			),
			'overlayBackgroundGradient' => array(
				'type' => 'string',
				'default' => ''
			),
			'overlayBackgroundGradientOpacity' => array(
				'type' => 'number',
				'default' => 0.5
			),
			'overlayBackgroundGradientOpacityHover' => array(
				'type' => 'number',
				'default' => 0.65
			),
			'overlayBackgroundImage' => array(
				'type' => 'object',
				'default' => array(
					'url' => '',
					'id' => 0,
					'backgroundColor' => 'transparent',
					'backgroundSize' => 'cover',
					'backgroundPosition' => 'center center',
					'backgroundRepeat' => 'no-repeat',
					'backgroundOpacity' => 0.4,
					'backgroundOpacityHover' => 0.65
				)
			),
			'overlayDisplayOnHover' => array(
				'type' => 'boolean',
				'default' => false
			),
			'overlayDisplayAnimation' => array(
				'type' => 'string',
				'default' => 'fade'
			),
			'htmlAnchor' => array(
				'type' => 'string',
				'default' => ''
			),
			'captionCSSClasses' => array(
				'type' => 'string',
				'default' => ''
			),
			'customAttributes' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'hideCaption' => array(
				'type' => 'boolean',
				'default' => false
			),
			'hideOnMobile' => array(
				'type' => 'boolean',
				'default' => false
			),
			'hideOnTablet' => array(
				'type' => 'boolean',
				'default' => false
			),
			'hideOnDesktop' => array(
				'type' => 'boolean',
				'default' => false
			)
		),
		'supports' => array(
			'anchor' => false,
			'align' => false,
			'className' => false,
			'alignWide' => false,
			'defaultStylePicker' => false,
			'spacing' => array(
				'padding' => false,
				'margin' => false
			),
			'html' => false
		),
		'example' => array(
			'attributes' => array(
				
			)
		),
		'editorScript' => 'dlx-photo-caption-block-editor',
		'editorStyle' => 'dlx-photo-caption-block-editor-css',
		'style' => 'dlx-photo-block-frontend-and-editor'
	)
);
