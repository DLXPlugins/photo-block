/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/photo-block/edit.js":
/*!****************************************!*\
  !*** ./src/blocks/photo-block/edit.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_5__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
/**
 * External dependencies
 */







var PhotoBlock = function PhotoBlock(props) {
  var generatedUniqueId = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_5__.useInstanceId)(PhotoBlock, 'photo-block');
  var blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.useBlockProps)({
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()("dlx-photo-block", "align".concat(align), "dlx-screen-".concat(screen))
  });
  var _useState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('initial'),
    _useState2 = _slicedToArray(_useState, 2),
    screen = _useState2[0],
    setScreen = _useState2[1]; // Can be initial, edit, crop, preview.

  var attributes = props.attributes,
    setAttributes = props.setAttributes,
    clientId = props.clientId;
  var uniqueId = attributes.uniqueId,
    align = attributes.align,
    caption = attributes.caption,
    altText = attributes.altText,
    overlayText = attributes.overlayText,
    overlayTextPosition = attributes.overlayTextPosition,
    paddingSize = attributes.paddingSize,
    marginSize = attributes.marginSize,
    borderWidth = attributes.borderWidth,
    borderRadiusSize = attributes.borderRadiusSize,
    typographyCaption = attributes.typographyCaption;

  /**
   * Get a unique ID for the block for inline styling if necessary.
   */
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    // Set unique ID for block (for styling).
    setAttributes({
      uniqueId: generatedUniqueId
    });
  }, []);
  var getInitialScreen = function getInitialScreen() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h2", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Add a Photo', 'photo-block')), /*#__PURE__*/React.createElement("p", {
      className: "description"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Upload an image file, pick one from your media library, or add one with a URL.', 'photo-block')), /*#__PURE__*/React.createElement("div", {
      className: "dlx-photo-block__initial-screen-buttons"
    }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
      variant: "primary"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Upload', 'photo-block')), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
      variant: "primary"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Media Library', 'photo-block')), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
      variant: "primary"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Add Photo from URL', 'photo-block'))));
  };

  /**
   * Get the screen to display.
   *
   * @return {Element} The screen to display.
   */
  var getScreen = function getScreen() {
    switch (screen) {
      case 'initial':
        return getInitialScreen();
      // case 'edit':
      // 	return getEditScreen();
      // case 'crop':
      // 	return getCropScreen();
      // case 'preview':
      // 	return getPreviewScreen();
    }

    return null;
  };
  var block = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    className: "dlx-photo-block__container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dlx-photo-block__block-title"
  }, /*#__PURE__*/React.createElement("h2", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Photo Block', 'photo-block'))), /*#__PURE__*/React.createElement("div", {
    className: "dlx-photo-block__block-content"
  }, getScreen())));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", blockProps, block));
};
/* harmony default export */ __webpack_exports__["default"] = (PhotoBlock);

/***/ }),

/***/ "./src/blocks/photo-block/index.js":
/*!*****************************************!*\
  !*** ./src/blocks/photo-block/index.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./block.json */ "./src/blocks/photo-block/block.json");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit */ "./src/blocks/photo-block/edit.js");

var registerBlockType = wp.blocks.registerBlockType;

// Import JS

var PhotoBlockIcon = /*#__PURE__*/React.createElement("svg", {
  "aria-hidden": "true",
  focusable: "false",
  "data-prefix": "fas",
  "data-icon": "share-alt",
  className: "svg-inline--fa fa-share-alt fa-w-14",
  role: "img",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 448 512"
}, /*#__PURE__*/React.createElement("path", {
  fill: "currentColor",
  d: "M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z"
}));
registerBlockType(_block_json__WEBPACK_IMPORTED_MODULE_0__, {
  icon: PhotoBlockIcon,
  edit: _edit__WEBPACK_IMPORTED_MODULE_1__["default"],
  // Render via PHP
  save: function save() {
    return null;
  }
});

/***/ }),

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;
	var nativeCodeString = '[native code]';

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				if (arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				}
			} else if (argType === 'object') {
				if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
					classes.push(arg.toString());
					continue;
				}

				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/compose":
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["compose"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./src/blocks/photo-block/block.json":
/*!*******************************************!*\
  !*** ./src/blocks/photo-block/block.json ***!
  \*******************************************/
/***/ (function(module) {

"use strict";
module.exports = JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","title":"Photo Block","apiVersion":2,"name":"dlxplugins/photo-block","category":"common","icon":"<svg aria-hidden=\'true\' focusable=\'false\' data-prefix=\'fas\' data-icon=\'share-alt\' className=\'svg-inline--fa fa-share-alt fa-w-14\' role=\'img\' xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 448 512\'><path fill=\'currentColor\' d=\'M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z\'></path></svg>","description":"An easy-to-use Click to Share block.","keywords":["photo","block","image","picture","photos"],"version":"1.0.0","textdomain":"photo-block","attributes":{"uniqueId":{"type":"string","default":""},"align":{"type":"string","default":"center"},"caption":{"type":"string","default":""},"altText":{"type":"string","default":""},"overlayText":{"type":"string","default":""},"overlayTextPosition":{"type":"string","default":""},"paddingSize":{"type":"object","default":{"mobile":{"top":"","right":"","bottom":"","left":"","unit":null,"unitSync":null},"tablet":{"top":"","right":"","bottom":"","left":"","unit":null,"unitSync":null},"desktop":{"top":"20","right":"20","bottom":"20","left":"20","unit":"px","unitSync":true}}},"marginSize":{"type":"object","default":{"mobile":{"top":"","right":"","bottom":"","left":"","unit":null,"unitSync":null},"tablet":{"top":"","right":"","bottom":"","left":"","unit":null,"unitSync":null},"desktop":{"top":"20","right":"","bottom":"20","left":"","unit":"px","unitSync":true}}},"borderWidth":{"type":"object","default":{"mobile":{"top":"","right":"","bottom":"","left":"","unit":null,"unitSync":null},"tablet":{"top":"","right":"","bottom":"","left":"","unit":null,"unitSync":null},"desktop":{"top":"1","right":"1","bottom":"1","left":"1","unit":"px","unitSync":true}}},"borderRadiusSize":{"type":"object","default":{"mobile":{"top":"","right":"","bottom":"","left":"","unit":null,"unitSync":null},"tablet":{"top":"","right":"","bottom":"","left":"","unit":null,"unitSync":null},"desktop":{"top":"","right":"","bottom":"","left":"","unit":"px","unitSync":true}}},"typographyCaption":{"type":"object","default":{"mobile":{"fontFamily":"","fontFamilySlug":"","fontSize":"","fontSizeUnit":"px","fontWeight":"","lineHeight":"","lineHeightUnit":"em","textTransform":"","letterSpacing":"","letterSpacingUnit":"px","fontFallback":"","fontType":"web"},"tablet":{"fontFamily":"","fontFamilySlug":"","fontSize":"","fontSizeUnit":"px","fontWeight":"","lineHeight":"","lineHeightUnit":"em","textTransform":"","letterSpacing":"","letterSpacingUnit":"px","fontFallback":"","fontType":"web"},"desktop":{"fontFamily":"Arial","fontFamilySlug":"arial","fontSize":"24","fontSizeUnit":"px","fontWeight":"normal","lineHeight":"1.3","lineHeightUnit":"em","textTransform":"none","letterSpacing":"0","letterSpacingUnit":"px","fontFallback":"serif","fontType":"web"}}}},"supports":{"anchor":true,"align":true,"className":true,"alignWide":true,"defaultStylePicker":false},"example":{"attributes":{}},"editorScript":"dlx-photo-block-editor","editorStyle":"dlx-photo-block-editor-css","style":"dlx-photo-block-frontend-and-editor"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _blocks_photo_block_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./blocks/photo-block/index.js */ "./src/blocks/photo-block/index.js");
/**
 * WordPress Block initialization.
 */

}();
/******/ })()
;
//# sourceMappingURL=index.js.map