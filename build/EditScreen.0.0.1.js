"use strict";
(self["webpackChunkphoto_block"] = self["webpackChunkphoto_block"] || []).push([["EditScreen.0.0.1"],{

/***/ "./src/components/CSSGramButtonGroup/index.js":
/*!****************************************************!*\
  !*** ./src/components/CSSGramButtonGroup/index.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editor.scss */ "./src/components/CSSGramButtonGroup/editor.scss");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/url */ "@wordpress/url");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _contexts_UploaderContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../contexts/UploaderContext */ "./src/contexts/UploaderContext.js");
/* harmony import */ var _ColorPicker__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../ColorPicker */ "./src/components/ColorPicker/index.js");
/* harmony import */ var _CSSGramButtonPreview__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../CSSGramButtonPreview */ "./src/components/CSSGramButtonPreview/index.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
/**
 * Upload data row including Upload|Media Library|URL|Data.
 */










var cssGramOptions = [{
  value: 'none',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('None', 'photo-block')
}, {
  value: '1977',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('1977', 'photo-block')
}, {
  value: 'aden',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Aden', 'photo-block')
}, {
  value: 'brannan',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Brannan', 'photo-block')
}, {
  value: 'brooklyn',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Brooklyn', 'photo-block')
}, {
  value: 'clarendon',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Clarendon', 'photo-block')
}, {
  value: 'earlybird',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Earlybird', 'photo-block')
}, {
  value: 'gingham',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Gingham', 'photo-block')
}, {
  value: 'hudson',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Hudson', 'photo-block')
}, {
  value: 'inkwell',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Inkwell', 'photo-block')
}, {
  value: 'kelvin',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Kelvin', 'photo-block')
}, {
  value: 'lark',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Lark', 'photo-block')
}, {
  value: 'lofi',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Lo-Fi', 'photo-block')
}, {
  value: 'maven',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Maven', 'photo-block')
}, {
  value: 'mayfair',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Mayfair', 'photo-block')
}, {
  value: 'moon',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Moon', 'photo-block')
}, {
  value: 'nashville',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Nashville', 'photo-block')
}, {
  value: 'perpetua',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Perpetua', 'photo-block')
}, {
  value: 'reyes',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Reyes', 'photo-block')
}, {
  value: 'rise',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Rise', 'photo-block')
}, {
  value: 'slumber',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Slumber', 'photo-block')
}, {
  value: 'stinson',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Stinson', 'photo-block')
}, {
  value: 'toaster',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Toaster', 'photo-block')
}, {
  value: 'valencia',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Valencia', 'photo-block')
}, {
  value: 'walden',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Walden', 'photo-block')
}, {
  value: 'willow',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Willow', 'photo-block')
}, {
  value: 'xpro2',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('X-Pro II', 'photo-block')
}];
/**
 * CSSGramButtonGroup component.
 *
 * @param {Object} props - Component props.
 * @return {Function} Component.
 */
var CSSGramButtonGroup = function CSSGramButtonGroup(props) {
  var attributes = props.attributes,
    setAttributes = props.setAttributes;
  var photo = attributes.photo,
    imageDimensions = attributes.imageDimensions;

  // Get context.
  var _useContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useContext)(_contexts_UploaderContext__WEBPACK_IMPORTED_MODULE_6__["default"]),
    imageFile = _useContext.imageFile;
  var _useState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)('none'),
    _useState2 = _slicedToArray(_useState, 2),
    currentFilter = _useState2[0],
    setCurrentFilter = _useState2[1];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.BaseControl, {
    className: "dlx-photo-block__css-gram-button-group"
  }, /*#__PURE__*/React.createElement("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Select a CSS Filter', 'photo-block')), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ButtonGroup, null, cssGramOptions.map(function (option) {
    return /*#__PURE__*/React.createElement(_CSSGramButtonPreview__WEBPACK_IMPORTED_MODULE_8__["default"], {
      key: option.value,
      isSelected: currentFilter === option.value,
      onClick: function onClick() {
        setAttributes({
          cssGramFilter: option.value
        });
        setCurrentFilter(option.value);
      },
      label: option.label,
      filter: option.value,
      fullUrl: imageFile.url,
      imageDimensions: imageDimensions
    });
  }))));
};
/* harmony default export */ __webpack_exports__["default"] = (CSSGramButtonGroup);

/***/ }),

/***/ "./src/components/CSSGramButtonPreview/index.js":
/*!******************************************************!*\
  !*** ./src/components/CSSGramButtonPreview/index.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editor.scss */ "./src/components/CSSGramButtonPreview/editor.scss");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _contexts_UploaderContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../contexts/UploaderContext */ "./src/contexts/UploaderContext.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure " + obj); }
/**
 * Upload data row including Upload|Media Library|URL|Data.
 */






/**
 * CSSGramButtonGroup component.
 *
 * @param {Object} props - Component props.
 * @return {Function} Component.
 */
var CSSGramButtonPreview = function CSSGramButtonPreview(props) {
  var filter = props.filter,
    label = props.label,
    isSelected = props.isSelected,
    fullUrl = props.fullUrl,
    imageDimensions = props.imageDimensions;

  // Get context.
  _objectDestructuringEmpty((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useContext)(_contexts_UploaderContext__WEBPACK_IMPORTED_MODULE_4__["default"]));
  var _useState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    buttonRef = _useState2[0],
    setButtonRef = _useState2[1];
  var _useState3 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    showPopOver = _useState4[0],
    setShowPopOver = _useState4[1];
  var handlePopoverOpen = function handlePopoverOpen() {
    setShowPopOver(true);
    buttonRef.focus();
  };
  var handlePopoverClose = function handlePopoverClose() {
    setShowPopOver(false);
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: isSelected ? 'primary' : 'secondary',
    onClick: function onClick() {
      return props.onClick(filter);
    },
    onMouseEnter: function onMouseEnter() {
      return handlePopoverOpen(true);
    },
    onMouseLeave: function onMouseLeave() {
      return handlePopoverClose(false);
    },
    ref: setButtonRef
  }, label), showPopOver && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Popover, {
    className: "dlx-photo-block__css-gram-image-popover",
    placement: "left-start",
    anchor: buttonRef,
    onClose: function onClose() {
      setShowPopOver(false);
    },
    offset: 10,
    noArrow: false
  }, /*#__PURE__*/React.createElement("div", {
    className: "dlx-photo-block__css-gram-image-popover-wrapper"
  }, /*#__PURE__*/React.createElement("img", {
    src: fullUrl,
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()("photo-block-".concat(filter), {
      'has-css-gram': filter !== 'none'
    }),
    width: imageDimensions.width,
    height: imageDimensions.height,
    alt: ""
  }))));
};
/* harmony default export */ __webpack_exports__["default"] = (CSSGramButtonPreview);

/***/ }),

/***/ "./src/components/CustomPresets/CustomPresetContainer.js":
/*!***************************************************************!*\
  !*** ./src/components/CustomPresets/CustomPresetContainer.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./context */ "./src/components/CustomPresets/context.js");
/* harmony import */ var _CustomPresetSaveModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CustomPresetSaveModal */ "./src/components/CustomPresets/CustomPresetSaveModal.js");
/* harmony import */ var _PresetButtonEdit__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PresetButtonEdit */ "./src/components/CustomPresets/PresetButtonEdit.js");
/* harmony import */ var _CustomPresetEditModal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./CustomPresetEditModal */ "./src/components/CustomPresets/CustomPresetEditModal.js");
/* harmony import */ var _CustomPresetDeleteModal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./CustomPresetDeleteModal */ "./src/components/CustomPresets/CustomPresetDeleteModal.js");
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }










// Read in localized var and determine if user can save or edit presets.
var canSavePresets = photoBlock.presetCanEditor;
var CustomPresetContainer = function CustomPresetContainer(props) {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState2 = _slicedToArray(_useState, 2),
    loading = _useState2[0],
    setLoading = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('new'),
    _useState4 = _slicedToArray(_useState3, 2),
    presetSaveType = _useState4[0],
    setPresetSaveType = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState6 = _slicedToArray(_useState5, 2),
    presetSaveLabel = _useState6[0],
    setPresetSaveLabel = _useState6[1];
  var setAttributes = props.setAttributes,
    clientId = props.clientId;
  var uniqueId = props.attributes.uniqueId;
  var _useContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context__WEBPACK_IMPORTED_MODULE_3__["default"]),
    savedPresets = _useContext.savedPresets,
    setSavedPresets = _useContext.setSavedPresets,
    savingPreset = _useContext.savingPreset,
    setSavingPreset = _useContext.setSavingPreset,
    editPresets = _useContext.editPresets,
    setEditPresets = _useContext.setEditPresets,
    showEditModal = _useContext.showEditModal,
    showDeleteModal = _useContext.showDeleteModal,
    setDefaultPreset = _useContext.setDefaultPreset;
  var presetContainer = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (presetContainer.current) {
      // Perform fetch request to ajax endpoint.
      var ajaxUrl = "".concat(ajaxurl); // eslint-disable-line no-undef
      var data = new FormData();
      data.append('action', 'dlx_photo_block_load_presets');
      data.append('nonce', photoBlock.presetLoadNonce);
      fetch(ajaxUrl, {
        method: 'POST',
        body: data,
        /* get return in json */
        headers: {
          Accept: 'application/json'
        }
      }).then(function (response) {
        return response.json();
      }).then(function (json) {
        var presets = json.data.presets;
        setLoading(false);
        setSavedPresets(presets);

        // Loop through presets and set default.
        presets.forEach(function (preset) {
          if (preset.is_default) {
            setDefaultPreset(preset);
          }
        });
      })["catch"](function (error) {
        setLoading(false);
      });
    }
  }, [presetContainer]);

  /**
   * Show a loading spinner.
   *
   * @param {string} label Label of the loading spinner.
   * @return {JSX} Loading spinner.
   */
  var showLoading = function showLoading(label) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "photo-block-custom-preset-loading-container"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      className: "photo-block-custom-preset-loading-label"
    }, label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, null));
  };
  var getSavedPresets = function getSavedPresets() {
    if (savedPresets.length > 0) {
      // Map to preset buttons.
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "photo-block-presets"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ButtonGroup, null, savedPresets.map(function (preset) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_PresetButtonEdit__WEBPACK_IMPORTED_MODULE_5__["default"], {
          key: preset.id,
          editId: preset.id,
          title: preset.title,
          setAttributes: setAttributes,
          uniqueId: uniqueId,
          clientId: clientId,
          slug: preset.slug,
          photoAttributes: preset.content.attributes.photoAttributes,
          captionAttributes: preset.content.attributes.captionAttributes,
          saveNonce: preset.save_nonce,
          deleteNonce: preset.delete_nonce
        });
      })));
    }
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, canSavePresets ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('No custom presets have been saved yet. Would you like to save a new one?', 'photo-block') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('No custom presets have been saved yet.', 'photo-block')));
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, showEditModal && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_CustomPresetEditModal__WEBPACK_IMPORTED_MODULE_6__["default"], {
    editId: showEditModal.editId,
    title: showEditModal.title,
    saveNonce: showEditModal.saveNonce
  }), showDeleteModal && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_CustomPresetDeleteModal__WEBPACK_IMPORTED_MODULE_7__["default"], {
    editId: showDeleteModal.editId,
    title: showDeleteModal.title,
    deleteNonce: showDeleteModal.deleteNonce
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "photo-block-custom-preset-container",
    ref: presetContainer
  }, loading && showLoading('Loading Presets'), !loading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, getSavedPresets(), canSavePresets && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "photo-block-custom-preset-actions"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Preset Actions', 'photo-block')), !editPresets && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: 'primary',
    onClick: function onClick(e) {
      e.preventDefault();
      setSavingPreset(true);
    },
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Save New Preset', 'photo-block')
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Save New Preset', 'photo-block')), !editPresets && !savingPreset && savedPresets.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: 'secondary',
    onClick: function onClick(e) {
      e.preventDefault();
      setEditPresets(true);
    },
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Edit Presets', 'photo-block')
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Edit Presets', 'photo-block')), editPresets && !savingPreset && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: 'primary',
    onClick: function onClick(e) {
      e.preventDefault();
      setEditPresets(false);
    },
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Exit Edit Mode', 'photo-block')
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Exit Edit Mode', 'photo-block')))), savingPreset && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_CustomPresetSaveModal__WEBPACK_IMPORTED_MODULE_4__["default"], _extends({
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Save Preset', 'photo-block')
  }, props))));
};
/* harmony default export */ __webpack_exports__["default"] = (CustomPresetContainer);

/***/ }),

/***/ "./src/components/CustomPresets/CustomPresetDeleteModal.js":
/*!*****************************************************************!*\
  !*** ./src/components/CustomPresets/CustomPresetDeleteModal.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./context */ "./src/components/CustomPresets/context.js");
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





var CustomPresetDeleteModal = function CustomPresetDeleteModal(props) {
  var title = props.title,
    editId = props.editId,
    deleteNonce = props.deleteNonce;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isDeleting = _useState2[0],
    setIsDeleting = _useState2[1];
  var _useContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context__WEBPACK_IMPORTED_MODULE_3__["default"]),
    setSavedPresets = _useContext.setSavedPresets,
    showDeleteModal = _useContext.showDeleteModal,
    setShowDeleteModal = _useContext.setShowDeleteModal;
  var getDefaultValues = function getDefaultValues() {
    return {
      editId: editId
    };
  };
  var _useForm = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_4__.useForm)({
      defaultValues: getDefaultValues()
    }),
    control = _useForm.control,
    handleSubmit = _useForm.handleSubmit;
  var _useFormState = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_4__.useFormState)({
      control: control
    }),
    errors = _useFormState.errors;
  var onSubmit = function onSubmit(formData) {
    setIsDeleting(true);
    var ajaxUrl = "".concat(ajaxurl); // eslint-disable-line no-undef
    var data = new FormData();
    data.append('action', 'dlx_photo_block_delete_preset');
    data.append('nonce', deleteNonce);
    data.append('editId', formData.editId);
    fetch(ajaxUrl, {
      method: 'POST',
      body: data,
      /* get return in json */
      headers: {
        Accept: 'application/json'
      }
    }).then(function (response) {
      return response.json();
    }).then(function (json) {
      var presets = json.data.presets;
      setSavedPresets(presets);
      setIsDeleting(false);
      setShowDeleteModal(false);
    })["catch"](function (error) {
      setIsDeleting(false);
    });
  };

  // Don't show modal unless explicitly set.
  if (!showDeleteModal) {
    return null;
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Modal, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Delete Preset', 'photo-block'),
    onRequestClose: function onRequestClose() {
      return setShowDeleteModal(false);
    },
    className: "photo-block-preset-modal",
    shouldCloseOnClickOutside: false
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_4__.Controller, {
    name: "editId",
    control: control,
    render: function render(_ref) {
      var field = _ref.field;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, _extends({
        type: "hidden"
      }, field));
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    type: "submit",
    variant: "primary",
    className: "photo-block-preset-modal-apply-button",
    disabled: isDeleting
  }, isDeleting ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Deleting…', 'photo-block') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Delete Preset', 'photo-block')), !isDeleting && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "secondary",
    onClick: function onClick() {
      setShowDeleteModal(false);
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Cancel', 'photo-block'))));
};
/* harmony default export */ __webpack_exports__["default"] = (CustomPresetDeleteModal);

/***/ }),

/***/ "./src/components/CustomPresets/CustomPresetEditModal.js":
/*!***************************************************************!*\
  !*** ./src/components/CustomPresets/CustomPresetEditModal.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/alert-circle.js");
/* harmony import */ var _Notice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Notice */ "./src/components/Notice/index.js");
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./context */ "./src/components/CustomPresets/context.js");
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







var CustomPresetEditModal = function CustomPresetEditModal(props) {
  var _errors$title, _errors$title2;
  var title = props.title,
    editId = props.editId,
    saveNonce = props.saveNonce;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isSaving = _useState2[0],
    setIsSaving = _useState2[1];
  var _useContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context__WEBPACK_IMPORTED_MODULE_4__["default"]),
    setSavedPresets = _useContext.setSavedPresets,
    showEditModal = _useContext.showEditModal,
    setShowEditModal = _useContext.setShowEditModal,
    defaultPreset = _useContext.defaultPreset,
    setDefaultPreset = _useContext.setDefaultPreset;
  var getDefaultValues = function getDefaultValues() {
    return {
      title: title,
      editId: editId,
      isDefault: (defaultPreset === null || defaultPreset === void 0 ? void 0 : defaultPreset.id) === editId ? true : false
    };
  };
  var _useForm = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_5__.useForm)({
      defaultValues: getDefaultValues()
    }),
    control = _useForm.control,
    handleSubmit = _useForm.handleSubmit,
    getValues = _useForm.getValues;
  var _useFormState = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_5__.useFormState)({
      control: control
    }),
    errors = _useFormState.errors;
  var onSubmit = function onSubmit(formData) {
    setIsSaving(true);
    var ajaxUrl = "".concat(ajaxurl); // eslint-disable-line no-undef
    var data = new FormData();
    data.append('action', 'dlx_photo_block_save_preset');
    data.append('nonce', saveNonce);
    data.append('editId', formData.editId);
    data.append('title', formData.title);
    data.append('isDefault', formData.isDefault ? true : false);
    fetch(ajaxUrl, {
      method: 'POST',
      body: data,
      /* get return in json */
      headers: {
        Accept: 'application/json'
      }
    }).then(function (response) {
      return response.json();
    }).then(function (json) {
      var presets = json.data.presets;
      setSavedPresets(presets);
      setIsSaving(false);

      // Loop through presets and assign default if needed.
      presets.forEach(function (preset) {
        if (preset.is_default) {
          setDefaultPreset(preset);
        }

        // If none are default, clear default presets.
        if (!presets.some(function (presetValue) {
          return presetValue.is_default;
        })) {
          setDefaultPreset(null);
        }
      });

      // Close the modal.
      setShowEditModal(false);
    })["catch"](function (error) {
      setIsSaving(false);
    });
  };

  // Don't show modal unless explicitly set.
  if (!showEditModal) {
    return null;
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Modal, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Update Preset', 'photo-block'),
    onRequestClose: function onRequestClose() {
      return setShowEditModal(false);
    },
    className: "photo-block-preset-modal",
    shouldCloseOnClickOutside: false
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_5__.Controller, {
    name: "title",
    control: control,
    rules: {
      required: true,
      pattern: /^[a-zA-Z0-9-_ ]+$/
    },
    render: function render(_ref) {
      var field = _ref.field;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, _extends({}, field, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Preset Name', 'photo-block'),
        className: "is-required"
      }));
    }
  }), 'required' === ((_errors$title = errors.title) === null || _errors$title === void 0 ? void 0 : _errors$title.type) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Notice__WEBPACK_IMPORTED_MODULE_3__["default"], {
    message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('This field is required.'),
    status: "error",
    politeness: "assertive",
    icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_6__["default"], null)
  }), 'pattern' === ((_errors$title2 = errors.title) === null || _errors$title2 === void 0 ? void 0 : _errors$title2.type) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Notice__WEBPACK_IMPORTED_MODULE_3__["default"], {
    message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('This field contains invalid characters.'),
    status: "error",
    politeness: "assertive",
    icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_6__["default"], null)
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_5__.Controller, {
    name: "isDefault",
    control: control,
    render: function render(_ref2) {
      var _ref2$field = _ref2.field,
        _onChange = _ref2$field.onChange,
        value = _ref2$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Set Default Preset', 'photo-block'),
        checked: value,
        onChange: function onChange(newValue) {
          return _onChange(newValue);
        },
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('This preset will be applied to all new Photo Blocks.', 'photo-block')
      });
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_5__.Controller, {
    name: "editId",
    control: control,
    render: function render(_ref3) {
      var field = _ref3.field;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, _extends({
        type: "hidden"
      }, field));
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    type: "submit",
    variant: "primary",
    className: "photo-block-preset-modal-apply-button",
    disabled: isSaving
  }, isSaving ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Saving…', 'photo-block') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Apply Changes', 'photo-block')), !isSaving && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "secondary",
    onClick: function onClick() {
      setShowEditModal(false);
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Cancel', 'photo-block'))));
};
/* harmony default export */ __webpack_exports__["default"] = (CustomPresetEditModal);

/***/ }),

/***/ "./src/components/CustomPresets/CustomPresetSaveModal.js":
/*!***************************************************************!*\
  !*** ./src/components/CustomPresets/CustomPresetSaveModal.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/alert-circle.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/save.js");
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./context */ "./src/components/CustomPresets/context.js");
/* harmony import */ var _Notice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Notice */ "./src/components/Notice/index.js");
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }









var CustomPresetSaveModal = function CustomPresetSaveModal(props) {
  var _errors$presetTitle2, _errors$presetTitle3, _errors$selectedPrese;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('new'),
    _useState2 = _slicedToArray(_useState, 2),
    presetSaveType = _useState2[0],
    setPresetSaveType = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isSaving = _useState4[0],
    setIsSaving = _useState4[1];
  var title = props.title,
    attributes = props.attributes,
    setAttributes = props.setAttributes,
    clientId = props.clientId;
  console.log(props);
  var _useContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context__WEBPACK_IMPORTED_MODULE_5__["default"]),
    savedPresets = _useContext.savedPresets,
    setSavedPresets = _useContext.setSavedPresets,
    savingPreset = _useContext.savingPreset,
    setSavingPreset = _useContext.setSavingPreset;
  var getDefaultValues = function getDefaultValues() {
    return {
      presetTitle: '',
      selectedPreset: null,
      defaultPreset: false
    };
  };
  var _useForm = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_7__.useForm)({
      defaultValues: getDefaultValues()
    }),
    control = _useForm.control,
    handleSubmit = _useForm.handleSubmit,
    setValue = _useForm.setValue;
  var _useFormState = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_7__.useFormState)({
      control: control
    }),
    errors = _useFormState.errors;

  /**
   * Retrieve a list of parent and child attributes for the current block.
   *
   * @return {Object} Object of attributes with keys photoAttributes, captionAttributes..
   */
  var getCurrentAttributes = function getCurrentAttributes() {
    var _select$getBlocksByCl;
    // Get the caption block attributes, if any.
    var children = ((_select$getBlocksByCl = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.select)('core/block-editor').getBlocksByClientId(clientId)[0]) === null || _select$getBlocksByCl === void 0 ? void 0 : _select$getBlocksByCl.innerBlocks) || [];
    var captionBlock = children.find(function (block) {
      return 'dlxplugins/photo-caption-block' === block.name;
    });
    var captionAttributes = captionBlock ? captionBlock.attributes : {};

    // Get the parent block attributes.
    var parentAttributes = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.select)('core/block-editor').getBlockAttributes(clientId);

    // Merge the parent and child attributes.
    var allAttributes = {
      photoAttributes: parentAttributes,
      captionAttributes: captionAttributes
    };
    return allAttributes;
  };
  var onSubmit = function onSubmit(formData) {
    if ('new' === presetSaveType) {
      saveNewPreset(formData);
    } else {
      overridePreset(formData);
    }
  };

  /**
   * Save a new preset via Ajax.
   *
   * @param {Array} formData Form data array.
   */
  var saveNewPreset = function saveNewPreset(formData) {
    setIsSaving(true);
    var ajaxUrl = "".concat(ajaxurl); // eslint-disable-line no-undef
    var data = new FormData();
    data.append('action', 'dlx_photo_block_save_presets');
    data.append('nonce', photoBlock.presetSaveNewNonce);
    data.append('attributes', JSON.stringify(getCurrentAttributes()));
    data.append('formData', JSON.stringify(formData));
    fetch(ajaxUrl, {
      method: 'POST',
      body: data,
      /* get return in json */
      headers: {
        Accept: 'application/json'
      }
    }).then(function (response) {
      return response.json();
    }).then(function (json) {
      var presets = json.data.presets;
      setIsSaving(false);
      setSavingPreset(false);
      setSavedPresets(presets);
    })["catch"](function (error) {
      setSavingPreset(false);
    });
  };

  /**
   * Save a new preset via Ajax.
   *
   * @param {Array} formData Form data array.
   */
  var overridePreset = function overridePreset(formData) {
    setIsSaving(true);
    var ajaxUrl = "".concat(ajaxurl); // eslint-disable-line no-undef
    var data = new FormData();
    data.append('action', 'dlx_photo_block_override_preset');
    data.append('nonce', photoBlock.presetSaveNewNonce);
    data.append('attributes', JSON.stringify(getCurrentAttributes()));
    data.append('editId', formData.selectedPreset);
    data.append('isDefault', formData.defaultPreset);
    fetch(ajaxUrl, {
      method: 'POST',
      body: data,
      /* get return in json */
      headers: {
        Accept: 'application/json'
      }
    }).then(function (response) {
      return response.json();
    }).then(function (json) {
      var presets = json.data.presets;
      setIsSaving(false);
      setSavingPreset(false);
      setSavedPresets(presets);
    })["catch"](function (error) {
      setSavingPreset(false);
    });
  };

  /**
   * Get the preset options in radio group format.
   *
   * @return {Array} Array of objects with label and value properties.
   */
  var getPresetRadioOptions = function getPresetRadioOptions() {
    var options = [];
    savedPresets.forEach(function (preset) {
      options.push({
        label: preset.title,
        value: preset.id + ''
      });
    });
    return options;
  };
  var radioOptions = [{
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Save Preset', 'photo-block'),
    value: 'new'
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Override Preset', 'photo-block'),
    value: 'override'
  }];
  if (savedPresets.length === 0) {
    radioOptions = [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Save Preset', 'photo-block'),
      value: 'new'
    }];
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "photo-block-custom-preset-modal"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Modal, {
    title: title,
    onRequestClose: function onRequestClose() {
      return setSavingPreset(false);
    },
    className: "photo-block-preset-modal",
    shouldCloseOnClickOutside: false
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RadioControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Save a new preset or override an existing one.', 'photo-block'),
    className: "photo-block-preset-modal-radio-control",
    selected: presetSaveType,
    options: radioOptions,
    onChange: function onChange(value) {
      setPresetSaveType(value);
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, 'new' === presetSaveType && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "photo-block-preset-modal-new-preset"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_7__.Controller, {
    name: "presetTitle",
    control: control,
    rules: {
      required: true,
      pattern: /^[a-zA-Z0-9-_ ]+$/
    },
    render: function render(_ref) {
      var _errors$presetTitle;
      var field = _ref.field;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, _extends({}, field, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Preset Name', 'photo-block'),
        className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('photo-block-admin__text-control', {
          'is-required': true,
          'has-error': 'required' === ((_errors$presetTitle = errors.presetTitle) === null || _errors$presetTitle === void 0 ? void 0 : _errors$presetTitle.type)
        })
      }));
    }
  }), 'required' === ((_errors$presetTitle2 = errors.presetTitle) === null || _errors$presetTitle2 === void 0 ? void 0 : _errors$presetTitle2.type) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Notice__WEBPACK_IMPORTED_MODULE_6__["default"], {
    message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('The Preset Name field is required.'),
    status: "error",
    politeness: "assertive",
    icon: lucide_react__WEBPACK_IMPORTED_MODULE_8__["default"]
  }), 'pattern' === ((_errors$presetTitle3 = errors.presetTitle) === null || _errors$presetTitle3 === void 0 ? void 0 : _errors$presetTitle3.type) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Notice__WEBPACK_IMPORTED_MODULE_6__["default"], {
    message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('This Preset Name field contains invalid characters.'),
    status: "error",
    politeness: "assertive",
    icon: lucide_react__WEBPACK_IMPORTED_MODULE_8__["default"]
  }))), 'override' === presetSaveType && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, savedPresets.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "photo-block-preset-modal-override-preset"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_7__.Controller, {
    name: "selectedPreset",
    control: control,
    rules: {
      required: true
    },
    render: function render(_ref2) {
      var _ref2$field = _ref2.field,
        _onChange = _ref2$field.onChange,
        value = _ref2$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RadioControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Select a preset to override', 'photo-block'),
        className: "is-required",
        selected: value,
        options: getPresetRadioOptions(),
        onChange: function onChange(radioValue) {
          return _onChange(radioValue);
        }
      });
    }
  }), 'required' === ((_errors$selectedPrese = errors.selectedPreset) === null || _errors$selectedPrese === void 0 ? void 0 : _errors$selectedPrese.type) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Notice__WEBPACK_IMPORTED_MODULE_6__["default"], {
    message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('This field is required.'),
    status: "error",
    politeness: "assertive",
    icon: lucide_react__WEBPACK_IMPORTED_MODULE_8__["default"]
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_7__.Controller, {
    name: "defaultPreset",
    control: control,
    render: function render(_ref3) {
      var _ref3$field = _ref3.field,
        _onChange2 = _ref3$field.onChange,
        value = _ref3$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Make This Preset the Default', 'photo-block'),
        checked: value,
        onChange: function onChange(newValue) {
          return _onChange2(newValue);
        },
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('If this preset is selected as the default, it will be applied to all new photo blocks.', 'photo-block')
      });
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "photo-block-preset-modal-button-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    type: "submit",
    variant: "primary",
    className: "photo-block-preset-modal-apply-button",
    disabled: isSaving,
    icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_9__["default"], null)
  }, isSaving ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Saving…', 'photo-block') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Save Preset', 'photo-block')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "secondary",
    onClick: function onClick() {
      setSavingPreset(false);
    },
    className: "photo-block-preset-modal-cancel-button",
    disabled: isSaving
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Cancel', 'photo-block'))))));
};
/* harmony default export */ __webpack_exports__["default"] = (CustomPresetSaveModal);

/***/ }),

/***/ "./src/components/CustomPresets/PresetButton.js":
/*!******************************************************!*\
  !*** ./src/components/CustomPresets/PresetButton.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_5__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







var PresetButton = function PresetButton(props) {
  var _props$disabled, _props$icon;
  var setAttributes = props.setAttributes,
    label = props.label,
    photoAttributes = props.photoAttributes,
    captionAttributes = props.captionAttributes,
    uniqueId = props.uniqueId,
    clientId = props.clientId;

  // Define state for modal options.
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    showModal = _useState2[0],
    setShowModal = _useState2[1];
  var _useDispatch = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useDispatch)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.store),
    insertBlock = _useDispatch.insertBlock,
    updateBlockAttributes = _useDispatch.updateBlockAttributes;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: 'secondary',
    onClick: function onClick(e) {
      e.preventDefault();
      setShowModal(true);
    },
    className: "photo-block-preset-button",
    label: props !== null && props !== void 0 && props.icon ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('This is your default preset.', 'photo-block') : null,
    disabled: (_props$disabled = props.disabled) !== null && _props$disabled !== void 0 ? _props$disabled : false,
    icon: (_props$icon = props === null || props === void 0 ? void 0 : props.icon) !== null && _props$icon !== void 0 ? _props$icon : null,
    showTooltip: props !== null && props !== void 0 && props.icon ? true : false
  }, label), showModal && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Modal, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Apply Preset?', 'photo-block'),
    onRequestClose: function onRequestClose() {
      return setShowModal(false);
    },
    className: "photo-block-preset-modal"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Are you sure you want to apply this preset? This will override your existing settings.', 'photo-block')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "primary",
    onClick: function onClick() {
      var _select$getBlocksByCl;
      // Get unique ID for the caption block.
      var children = ((_select$getBlocksByCl = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.select)('core/block-editor').getBlocksByClientId(clientId)[0]) === null || _select$getBlocksByCl === void 0 ? void 0 : _select$getBlocksByCl.innerBlocks) || [];
      var captionBlock = children.find(function (block) {
        return 'dlxplugins/photo-caption-block' === block.name;
      });

      // Get unique ID for the photo block.
      var uniqueIdAttribute = {
        uniqueId: uniqueId
      };
      var photoBlockAttributes = _objectSpread(_objectSpread({}, photoAttributes), uniqueIdAttribute);

      // Apply attributes for photo block.
      setAttributes(photoBlockAttributes);

      // If there is no caption block, but there are attributes to apply, create one.
      if (!captionBlock && captionAttributes) {
        var newBlocks = (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_5__.createBlock)('dlxplugins/photo-caption-block', captionAttributes);
        insertBlock(newBlocks, undefined, clientId);
      }

      // If there is a caption block and attributes to apply, apply them.
      if (captionBlock && captionAttributes) {
        var captionBlockAttributes = _objectSpread(_objectSpread({}, captionAttributes), uniqueIdAttribute);
        updateBlockAttributes(captionBlock.clientId, captionBlockAttributes);
      }
      setShowModal(false);
    },
    className: "photo-block-preset-modal-apply-button"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Apply Preset', 'photo-block')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "secondary",
    onClick: function onClick() {
      setShowModal(false);
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Cancel', 'photo-block')))));
};
PresetButton.propTypes = {
  setAttributes: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().func.isRequired),
  label: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().string.isRequired),
  presetData: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().object.isRequired)
};
PresetButton.defaultProps = {
  label: 'Purple',
  setAttributes: function setAttributes() {},
  presetData: {}
};
/* harmony default export */ __webpack_exports__["default"] = (PresetButton);

/***/ }),

/***/ "./src/components/CustomPresets/PresetButtonEdit.js":
/*!**********************************************************!*\
  !*** ./src/components/CustomPresets/PresetButtonEdit.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/edit-3.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/trash-2.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/star.js");
/* harmony import */ var _PresetButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PresetButton */ "./src/components/CustomPresets/PresetButton.js");
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./context */ "./src/components/CustomPresets/context.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }








var PresetButtonEdit = function PresetButtonEdit(props) {
  var _defaultPreset$id;
  var title = props.title,
    setAttributes = props.setAttributes,
    photoAttributes = props.photoAttributes,
    captionAttributes = props.captionAttributes,
    uniqueId = props.uniqueId,
    editId = props.editId,
    clientId = props.clientId,
    saveNonce = props.saveNonce,
    deleteNonce = props.deleteNonce;
  var _useContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context__WEBPACK_IMPORTED_MODULE_5__["default"]),
    editPresets = _useContext.editPresets,
    setShowEditModal = _useContext.setShowEditModal,
    setShowDeleteModal = _useContext.setShowDeleteModal,
    defaultPreset = _useContext.defaultPreset;

  // Detect when a default preset has been changed, and update the preset ID in state.
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)((_defaultPreset$id = defaultPreset === null || defaultPreset === void 0 ? void 0 : defaultPreset.id) !== null && _defaultPreset$id !== void 0 ? _defaultPreset$id : 0),
    _useState2 = _slicedToArray(_useState, 2),
    defaultPresetId = _useState2[0],
    setDefaultPresetId = _useState2[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if ((defaultPreset === null || defaultPreset === void 0 ? void 0 : defaultPreset.id) !== defaultPresetId) {
      var _defaultPreset$id2;
      setDefaultPresetId((_defaultPreset$id2 = defaultPreset === null || defaultPreset === void 0 ? void 0 : defaultPreset.id) !== null && _defaultPreset$id2 !== void 0 ? _defaultPreset$id2 : 0);
    }
  }, [defaultPreset]);

  /**
   * Check whether a preset is a default or not.
   *
   * @return {boolean} Whether the preset is the default preset
   */
  var isPresetDefault = function isPresetDefault() {
    return defaultPresetId === editId && 0 !== defaultPresetId;
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('photo-block-preset-edit-container', {
      'photo-block-preset-edit-container--edit': editPresets
    })
  }, editPresets && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "photo-block-preset-edit-buttons"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: 'secondary',
    onClick: function onClick(e) {
      setShowEditModal({
        show: true,
        editId: editId,
        title: title,
        saveNonce: saveNonce,
        isDefault: isPresetDefault()
      });
    },
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Edit Preset', 'photo-block'),
    icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_6__["default"], null),
    className: "photo-block-preset-edit-button"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: 'secondary',
    onClick: function onClick(e) {
      setShowDeleteModal({
        show: true,
        editId: editId,
        deleteNonce: deleteNonce
      });
    },
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Delete Preset', 'photo-block'),
    icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_7__["default"], null),
    className: "photo-block-preset-delete-button"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_PresetButton__WEBPACK_IMPORTED_MODULE_4__["default"], {
    key: editId,
    label: '' === title ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Untitled Preset', 'photo-block') : title,
    setAttributes: setAttributes,
    uniqueId: uniqueId,
    className: "photo-block-preset-button",
    clientId: clientId,
    photoAttributes: photoAttributes,
    captionAttributes: captionAttributes,
    disabled: editPresets,
    icon: isPresetDefault() ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_8__["default"], null) : null
  })));
};
/* harmony default export */ __webpack_exports__["default"] = (PresetButtonEdit);

/***/ }),

/***/ "./src/components/CustomPresets/context.js":
/*!*************************************************!*\
  !*** ./src/components/CustomPresets/context.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var CustomPresetsContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createContext();
/* harmony default export */ __webpack_exports__["default"] = (CustomPresetsContext);

/***/ }),

/***/ "./src/components/CustomPresets/index.js":
/*!***********************************************!*\
  !*** ./src/components/CustomPresets/index.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editor.scss */ "./src/components/CustomPresets/editor.scss");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./context */ "./src/components/CustomPresets/context.js");
/* harmony import */ var _CustomPresetContainer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CustomPresetContainer */ "./src/components/CustomPresets/CustomPresetContainer.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




var CustomPresets = function CustomPresets(props) {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    savedPresets = _useState2[0],
    setSavedPresets = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    savingPreset = _useState4[0],
    setSavingPreset = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    editPresets = _useState6[0],
    setEditPresets = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    showEditModal = _useState8[0],
    setShowEditModal = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState10 = _slicedToArray(_useState9, 2),
    showDeleteModal = _useState10[0],
    setShowDeleteModal = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState12 = _slicedToArray(_useState11, 2),
    defaultPreset = _useState12[0],
    setDefaultPreset = _useState12[1];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_context__WEBPACK_IMPORTED_MODULE_2__["default"].Provider, {
    value: {
      savedPresets: savedPresets,
      setSavedPresets: setSavedPresets,
      savingPreset: savingPreset,
      setSavingPreset: setSavingPreset,
      editPresets: editPresets,
      setEditPresets: setEditPresets,
      showEditModal: showEditModal,
      setShowEditModal: setShowEditModal,
      showDeleteModal: showDeleteModal,
      setShowDeleteModal: setShowDeleteModal,
      defaultPreset: defaultPreset,
      setDefaultPreset: setDefaultPreset
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_CustomPresetContainer__WEBPACK_IMPORTED_MODULE_3__["default"], props));
};
/* harmony default export */ __webpack_exports__["default"] = (CustomPresets);

/***/ }),

/***/ "./src/components/DropShadow/index.js":
/*!********************************************!*\
  !*** ./src/components/DropShadow/index.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editor.scss */ "./src/components/DropShadow/editor.scss");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/url */ "@wordpress/url");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _contexts_UploaderContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../contexts/UploaderContext */ "./src/contexts/UploaderContext.js");
/* harmony import */ var _ColorPicker__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../ColorPicker */ "./src/components/ColorPicker/index.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure " + obj); }
/**
 * Upload data row including Upload|Media Library|URL|Data.
 */









/**
 * DropShadow component.
 *
 * @param {Object} props - Component props.
 * @return {Function} Component.
 */
var DropShadowControl = function DropShadowControl(props) {
  var attributes = props.attributes,
    setAttributes = props.setAttributes,
    anchorRef = props.anchorRef;

  // Get context.
  _objectDestructuringEmpty((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useContext)(_contexts_UploaderContext__WEBPACK_IMPORTED_MODULE_6__["default"]));
  var mediaLinkType = attributes.mediaLinkType,
    mediaLinkTitle = attributes.mediaLinkTitle,
    mediaLinkUrl = attributes.mediaLinkUrl;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.BaseControl, {
    className: "dlx-photo-block__drop-shadow-control"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "dlx-photo-block__drop-shadow-control__title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Drop Shadow', 'photo-block')), /*#__PURE__*/React.createElement("div", {
    className: "dlx-photo-block__drop-shadow-control__settings"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dlx-photo-block__drop-shadow-control__settings__color"
  }, /*#__PURE__*/React.createElement(_ColorPicker__WEBPACK_IMPORTED_MODULE_7__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Color', 'photo-block'),
    value: attributes.photoDropShadow.color,
    valueOpacity: 1,
    onChange: function onChange(slug, color) {
      setAttributes({
        photoDropShadow: _objectSpread(_objectSpread({}, attributes.photoDropShadow), {}, {
          color: color
        })
      });
    },
    onOpacityChange: function onOpacityChange(value) {
      setAttributes({
        photoDropShadow: _objectSpread(_objectSpread({}, attributes.photoDropShadow), {}, {
          opacity: value
        })
      });
    },
    slug: "photoDropShadow",
    defaultColors: photoBlock.palette,
    defaultColor: '#000000',
    alpha: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "dlx-photo-block__drop-shadow-control__settings__offset"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dlx-photo-block__drop-shadow-control__settings__offset__wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dlx-photo-block__drop-shadow-control__settings__offset__x"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('X Offset', 'photo-block'),
    value: attributes.photoDropShadow.horizontal,
    type: "number",
    onChange: function onChange(value) {
      setAttributes({
        photoDropShadow: _objectSpread(_objectSpread({}, attributes.photoDropShadow), {}, {
          horizontal: value
        })
      });
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "dlx-photo-block__drop-shadow-control__settings__offset__y"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Y Offset', 'photo-block'),
    value: attributes.photoDropShadow.vertical,
    type: "number",
    onChange: function onChange(value) {
      setAttributes({
        photoDropShadow: _objectSpread(_objectSpread({}, attributes.photoDropShadow), {}, {
          vertical: value
        })
      });
    }
  })))), /*#__PURE__*/React.createElement("div", {
    className: "dlx-photo-block__drop-shadow-control__settings__blur"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dlx-photo-block__drop-shadow-control__settings__blur__wrapper"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Blur', 'photo-block'),
    value: attributes.photoDropShadow.blur,
    onChange: function onChange(value) {
      setAttributes({
        photoDropShadow: _objectSpread(_objectSpread({}, attributes.photoDropShadow), {}, {
          blur: value
        })
      });
    },
    min: 0,
    max: 100,
    step: 1
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dlx-photo-block__drop-shadow-control__settings__spread"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dlx-photo-block__drop-shadow-control__settings__spread__wrapper"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Spread', 'photo-block'),
    value: attributes.photoDropShadow.spread,
    onChange: function onChange(value) {
      setAttributes({
        photoDropShadow: _objectSpread(_objectSpread({}, attributes.photoDropShadow), {}, {
          spread: value
        })
      });
    },
    min: -25,
    max: 25,
    step: 1
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dlx-photo-block__drop-shadow-control__settings__inset"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Inset', 'photo-block'),
    checked: attributes.photoDropShadow.inset,
    onChange: function onChange(value) {
      setAttributes({
        photoDropShadow: _objectSpread(_objectSpread({}, attributes.photoDropShadow), {}, {
          inset: value
        })
      });
    }
  })))));
};
/* harmony default export */ __webpack_exports__["default"] = (DropShadowControl);

/***/ }),

/***/ "./src/components/MediaLink/index.js":
/*!*******************************************!*\
  !*** ./src/components/MediaLink/index.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editor.scss */ "./src/components/MediaLink/editor.scss");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/url */ "@wordpress/url");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/link-2-off.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/image.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/file-image.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/link-2.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/external-link.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _contexts_UploaderContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../contexts/UploaderContext */ "./src/contexts/UploaderContext.js");
/* harmony import */ var _URLPicker__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../URLPicker */ "./src/components/URLPicker/index.js");
function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure " + obj); }
/**
 * Upload data row including Upload|Media Library|URL|Data.
 */










/**
 * MediaLink component.
 *
 * @param {Object} props - Component props.
 * @return {Function} Component.
 */
var MediaLink = function MediaLink(props) {
  var attributes = props.attributes,
    setAttributes = props.setAttributes,
    anchorRef = props.anchorRef;

  // Get context.
  _objectDestructuringEmpty((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useContext)(_contexts_UploaderContext__WEBPACK_IMPORTED_MODULE_6__["default"]));
  var mediaLinkType = attributes.mediaLinkType,
    mediaLinkTitle = attributes.mediaLinkTitle,
    mediaLinkUrl = attributes.mediaLinkUrl,
    lightboxCaption = attributes.lightboxCaption,
    lightboxEnabled = attributes.lightboxEnabled,
    lightboxShowCaption = attributes.lightboxShowCaption;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Popover, {
    position: "bottom center",
    className: "dlx-photo-block__media-link-popover",
    expandOnMobile: true,
    focusOnMount: true,
    onClose: function onClose() {
      props.onClose();
    },
    anchor: anchorRef
  }, /*#__PURE__*/React.createElement("div", {
    className: "dlx-photo-block__media-link-container"
  }, /*#__PURE__*/React.createElement("h2", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Select where to link to.', 'photo-block')), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ButtonGroup, {
    className: "dlx-photo-block__media-link-button-group"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "secondary",
    icon: /*#__PURE__*/React.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_8__["default"], null),
    className: classnames__WEBPACK_IMPORTED_MODULE_5___default()({
      'is-pressed': 'none' === mediaLinkType
    }),
    onClick: function onClick() {
      setAttributes({
        mediaLinkType: 'none'
      });
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "dlx-photo-block__media-link-button-text"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('No link', 'photo-block'))), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "secondary",
    icon: /*#__PURE__*/React.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_9__["default"], null),
    className: classnames__WEBPACK_IMPORTED_MODULE_5___default()({
      'is-pressed': 'image' === mediaLinkType
    }),
    onClick: function onClick() {
      setAttributes({
        mediaLinkType: 'image'
      });
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('The full size photo', 'photo-block')), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "secondary",
    icon: /*#__PURE__*/React.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_10__["default"], null),
    className: classnames__WEBPACK_IMPORTED_MODULE_5___default()({
      'is-pressed': 'page' === mediaLinkType
    }),
    onClick: function onClick() {
      setAttributes({
        mediaLinkType: 'page'
      });
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('The photo\'s page', 'photo-block')), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "secondary",
    icon: /*#__PURE__*/React.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_11__["default"], null),
    className: classnames__WEBPACK_IMPORTED_MODULE_5___default()({
      'is-pressed': 'custom' === mediaLinkType
    }),
    onClick: function onClick() {
      setAttributes({
        mediaLinkType: 'custom'
      });
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Custom link', 'photo-block'))), 'custom' === mediaLinkType && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_URLPicker__WEBPACK_IMPORTED_MODULE_7__["default"], {
    restNonce: photoBlock.restNonce,
    restEndpoint: photoBlock.restUrl + '/search/pages',
    itemIcon: /*#__PURE__*/React.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_11__["default"], null),
    onItemSelect: function onItemSelect(e, url) {
      setAttributes({
        mediaLinkUrl: url
      });
    },
    savedValue: mediaLinkUrl
  })), 'image' === mediaLinkType && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "pdlx-photo-block__media-link-media-external"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "link",
    icon: /*#__PURE__*/React.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_12__["default"], null),
    iconSize: 18,
    iconPosition: "right",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Open in new tab', 'archive-pages-pro'),
    href: attributes.photo.full,
    target: "_blank",
    rel: "noopener noreferrer"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Media File', 'photo-block')))), 'page' === mediaLinkType && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "pdlx-photo-block__media-link-media-page"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "link",
    icon: /*#__PURE__*/React.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_12__["default"], null),
    iconSize: 18,
    iconPosition: "right",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Open in new tab', 'archive-pages-pro'),
    href: attributes.photo.attachment_link,
    target: "_blank",
    rel: "noopener noreferrer"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Attachment Page', 'photo-block')))), 'image' === mediaLinkType && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Lightbox', 'photo-block'),
    initialOpen: false
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Enable lightbox', 'photo-block'),
    checked: lightboxEnabled,
    onChange: function onChange(value) {
      setAttributes({
        lightboxEnabled: value
      });
    },
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Popup the full size photo in a lightbox when clicked.', 'photo-block')
  })), lightboxEnabled && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Show caption', 'photo-block'),
    checked: lightboxShowCaption,
    onChange: function onChange(value) {
      setAttributes({
        lightboxShowCaption: value
      });
    }
  })), lightboxShowCaption && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Custom Caption (optional)', 'photo-block'),
    value: lightboxCaption,
    onChange: function onChange(value) {
      setAttributes({
        lightboxCaption: value
      });
    },
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Leave blank to use the photo\'s caption.', 'photo-block')
  }))))), 'none' !== mediaLinkType && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Advanced', 'photo-block'),
    initialOpen: false
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Open in new tab', 'photo-block'),
    checked: attributes.mediaLinkNewTab,
    onChange: function onChange(value) {
      if ('' === attributes.mediaLinkRel && value) {
        setAttributes({
          mediaLinkRel: 'noopener noreferrer'
        });
      }
      if ('noopener noreferrer' === attributes.mediaLinkRel && !value) {
        setAttributes({
          mediaLinkRel: ''
        });
      }
      setAttributes({
        mediaLinkNewTab: value
      });
    }
  })), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Link Title', 'photo-block'),
    value: mediaLinkTitle,
    onChange: function onChange(value) {
      setAttributes({
        mediaLinkTitle: value
      });
    },
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('The link title attribute is for SEO and accessibility purposes. It is used to describe the link.', 'photo-block')
  })), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Link Rel', 'photo-block'),
    value: attributes.mediaLinkRel,
    onChange: function onChange(value) {
      setAttributes({
        mediaLinkRel: value
      });
    },
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('The link rel attribute is for SEO and accessibility purposes. It is used to describe the relationship between the current document and the linked document.', 'photo-block')
  })), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Link Class', 'photo-block'),
    value: attributes.mediaLinkClass,
    onChange: function onChange(value) {
      setAttributes({
        mediaLinkClass: value
      });
    },
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Add a CSS class to the link for styling purposes.', 'photo-block')
  })), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Link Anchor ID', 'photo-block'),
    value: attributes.mediaLinkAnchorId,
    onChange: function onChange(value) {
      setAttributes({
        mediaLinkAnchorId: value
      });
    },
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('This is the ID for the link, which you can use to link to the photo with an anchor. The ID for each link should be unique.', 'photo-block')
  }))))));
};
/* harmony default export */ __webpack_exports__["default"] = (MediaLink);

/***/ }),

/***/ "./src/components/PanelBody/index.js":
/*!*******************************************!*\
  !*** ./src/components/PanelBody/index.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editor.scss */ "./src/components/PanelBody/editor.scss");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _hooks_useDeviceType__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../hooks/useDeviceType */ "./src/hooks/useDeviceType.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
/**
 * PanelBody but with local storage state.
 */





var PanelBodyControl = function PanelBodyControl(props) {
  var uniqueId = props.uniqueId,
    _props$initialOpen = props.initialOpen,
    initialOpen = _props$initialOpen === void 0 ? true : _props$initialOpen,
    _props$id = props.id,
    id = _props$id === void 0 ? '' : _props$id;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(initialOpen),
    _useState2 = _slicedToArray(_useState, 2),
    isPanelOpen = _useState2[0],
    setIsPanelOpen = _useState2[1];
  var _useDeviceType = (0,_hooks_useDeviceType__WEBPACK_IMPORTED_MODULE_3__["default"])(),
    _useDeviceType2 = _slicedToArray(_useDeviceType, 1),
    deviceType = _useDeviceType2[0];

  // Set up use effect to read in local storage and set panels appropriately. Runs on device type change too.
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    var stored = localStorage.getItem("photo-block-panel-body-".concat(uniqueId));

    // Retrieve ID from local storage if set.
    if (stored) {
      var storedValue = JSON.parse(stored);
      if (storedValue["".concat(id)]) {
        var isOpen = storedValue["".concat(id)].isOpen;
        setIsPanelOpen(isOpen);
      }
    }
  }, [deviceType]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, _extends({}, props, {
    onToggle: function onToggle(next) {
      // get local storage value.
      var stored = localStorage.getItem("photo-block-panel-body-".concat(uniqueId));
      var storageValueToSave = _defineProperty({}, "".concat(id), {
        isOpen: next
      });
      if (stored) {
        var storedValue = JSON.parse(stored);
        storageValueToSave = _objectSpread(_objectSpread({}, storedValue), {}, _defineProperty({}, "".concat(id), {
          isOpen: next
        }));
      }
      localStorage.setItem("photo-block-panel-body-".concat(uniqueId), JSON.stringify(storageValueToSave));
    },
    initialOpen: isPanelOpen
  }), props.children);
};
PanelBodyControl.defaultProps = {
  uniqueId: '',
  initialOpen: true,
  id: ''
};
PanelBodyControl.propTypes = {
  uniqueId: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().string.isRequired),
  initialOpen: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().bool),
  id: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().string.isRequired)
};
/* harmony default export */ __webpack_exports__["default"] = (PanelBodyControl);

/***/ }),

/***/ "./src/components/SidebarImageAdvancedInspectorControl/index.js":
/*!**********************************************************************!*\
  !*** ./src/components/SidebarImageAdvancedInspectorControl/index.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editor.scss */ "./src/components/SidebarImageAdvancedInspectorControl/editor.scss");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_CustomAttributes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/CustomAttributes */ "./src/components/CustomAttributes/index.js");






var SidebarImageAdvancedInspectorControl = function SidebarImageAdvancedInspectorControl(props) {
  var attributes = props.attributes,
    setAttributes = props.setAttributes;
  var htmlAnchor = attributes.htmlAnchor,
    figureCSSClasses = attributes.figureCSSClasses,
    imageCSSClasses = attributes.imageCSSClasses,
    skipLazyLoading = attributes.skipLazyLoading,
    imageProtectionEnabled = attributes.imageProtectionEnabled,
    hideOnMobile = attributes.hideOnMobile,
    hideOnTablet = attributes.hideOnTablet,
    hideOnDesktop = attributes.hideOnDesktop;
  var stylesInspectorControls = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('HTML Anchor', 'photo-block'),
    value: htmlAnchor,
    onChange: function onChange(value) {
      setAttributes({
        htmlAnchor: value
      });
    },
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enter a word or two — without spaces — to make a unique web address just for this photo, called an "anchor." Then, you\'ll be able to link directly to this photo on your page.', 'photo-block')
  })), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Figure CSS Class(es)', 'photo-block'),
    value: figureCSSClasses,
    onChange: function onChange(value) {
      setAttributes({
        figureCSSClasses: value
      });
    },
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add CSS class(es) directly to the figure tag, which wraps the image.', 'photo-block')
  })), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Image CSS Class(es)', 'photo-block'),
    value: imageCSSClasses,
    onChange: function onChange(value) {
      setAttributes({
        imageCSSClasses: value
      });
    },
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add CSS class(es) directly to the image tag.', 'photo-block')
  })), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, null, /*#__PURE__*/React.createElement(_components_CustomAttributes__WEBPACK_IMPORTED_MODULE_4__["default"], {
    attributes: attributes,
    setAttributes: setAttributes
  })), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Skip Lazy Loading', 'photo-block'),
    checked: skipLazyLoading,
    onChange: function onChange(value) {
      setAttributes({
        skipLazyLoading: value
      });
    },
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Set a flag which will signal that the image should not be lazy loaded.', 'photo-block')
  })), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable Image Protection', 'photo-block'),
    checked: imageProtectionEnabled,
    onChange: function onChange(value) {
      setAttributes({
        imageProtectionEnabled: value
      });
    },
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Prevent this photo from being downloaded by using the right+click button.', 'photo-block')
  })), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Hide on Mobile', 'photo-block'),
    checked: hideOnMobile,
    onChange: function onChange(value) {
      setAttributes({
        hideOnMobile: value
      });
    },
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Hide this photo on mobile devices.', 'photo-block')
  })), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Hide on Tablet', 'photo-block'),
    checked: hideOnTablet,
    onChange: function onChange(value) {
      setAttributes({
        hideOnTablet: value
      });
    },
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Hide this photo on tablet devices.', 'photo-block')
  })), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Hide on Desktop', 'photo-block'),
    checked: hideOnDesktop,
    onChange: function onChange(value) {
      setAttributes({
        hideOnDesktop: value
      });
    },
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Hide this photo on desktop devices.', 'photo-block')
  })));
  return stylesInspectorControls;
};
SidebarImageAdvancedInspectorControl.defaultProps = {
  attributes: {},
  setAttributes: function setAttributes() {}
};
SidebarImageAdvancedInspectorControl.propTypes = {
  attributes: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().object)
};
/* harmony default export */ __webpack_exports__["default"] = (SidebarImageAdvancedInspectorControl);

/***/ }),

/***/ "./src/components/SidebarImageInspectorControl/index.js":
/*!**************************************************************!*\
  !*** ./src/components/SidebarImageInspectorControl/index.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editor.scss */ "./src/components/SidebarImageInspectorControl/editor.scss");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/palette.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/wand-2.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/maximize.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/shrink.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _components_ColorPicker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/ColorPicker */ "./src/components/ColorPicker/index.js");
/* harmony import */ var _components_DropShadow__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/DropShadow */ "./src/components/DropShadow/index.js");
/* harmony import */ var _components_CSSGramButtonGroup__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/CSSGramButtonGroup */ "./src/components/CSSGramButtonGroup/index.js");
/* harmony import */ var _components_SizeResponsive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/SizeResponsive */ "./src/components/SizeResponsive/index.js");
/* harmony import */ var _hooks_useDeviceType__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../hooks/useDeviceType */ "./src/hooks/useDeviceType.js");
/* harmony import */ var _components_DimensionsResponsive__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../components/DimensionsResponsive */ "./src/components/DimensionsResponsive/index.js");
/* harmony import */ var _components_BorderResponsive__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../components/BorderResponsive */ "./src/components/BorderResponsive/index.js");
/* harmony import */ var _components_PanelBody__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../components/PanelBody */ "./src/components/PanelBody/index.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }















/**
 * Height units.
 */
var heightUnits = ['px', 'em', 'rem', '%', 'vh'];
var SidebarImageInspectorControl = function SidebarImageInspectorControl(props) {
  var attributes = props.attributes,
    setAttributes = props.setAttributes;
  var uniqueId = attributes.uniqueId,
    photoOpacity = attributes.photoOpacity,
    photoBlur = attributes.photoBlur,
    photoObjectFit = attributes.photoObjectFit,
    photoObjectPosition = attributes.photoObjectPosition,
    photoObjectPositionCustom = attributes.photoObjectPositionCustom,
    photoDropShadow = attributes.photoDropShadow,
    photoBackgroundColor = attributes.photoBackgroundColor,
    containerHeight = attributes.containerHeight,
    containerMaxWidth = attributes.containerMaxWidth,
    containerMaxHeight = attributes.containerMaxHeight,
    containerMinWidth = attributes.containerMinWidth,
    containerMinHeight = attributes.containerMinHeight,
    photoPaddingSize = attributes.photoPaddingSize,
    photoMarginSize = attributes.photoMarginSize,
    photoBorderRadius = attributes.photoBorderRadius,
    photoBorder = attributes.photoBorder,
    containerWidth = attributes.containerWidth;
  var _useDeviceType = (0,_hooks_useDeviceType__WEBPACK_IMPORTED_MODULE_8__["default"])('Desktop'),
    _useDeviceType2 = _slicedToArray(_useDeviceType, 1),
    deviceType = _useDeviceType2[0];
  var stylesInspectorControls = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_components_PanelBody__WEBPACK_IMPORTED_MODULE_11__["default"], {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Image Styles', 'photo-block'),
    icon: /*#__PURE__*/React.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_12__["default"], null),
    className: "photo-block__inspector-panel",
    id: "photo-block__photo-image-styles",
    uniqueId: uniqueId,
    initialOpen: true,
    scrollAfterOpen: false
  }, /*#__PURE__*/React.createElement(_components_ColorPicker__WEBPACK_IMPORTED_MODULE_4__["default"], {
    value: photoBackgroundColor,
    key: 'background-color-photo',
    onChange: function onChange(slug, newValue) {
      setAttributes({
        photoBackgroundColor: newValue
      });
    },
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Background Color', 'highlight-and-share'),
    defaultColors: photoBlock.palette,
    defaultColor: 'transparent',
    slug: 'background-color-photo'
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Opacity', 'photo-block'),
    value: photoOpacity,
    onChange: function onChange(newOpacity) {
      setAttributes({
        photoOpacity: newOpacity
      });
    },
    min: 0,
    max: 1,
    step: 0.01
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Blur', 'photo-block'),
    value: photoBlur,
    onChange: function onChange(newBlur) {
      setAttributes({
        photoBlur: newBlur
      });
    },
    min: 0,
    max: 10,
    step: 0.01
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable Dropshadow', 'photo-block'),
    checked: photoDropShadow.enabled,
    onChange: function onChange(newDropShadowEnabled) {
      setAttributes({
        photoDropShadow: _objectSpread(_objectSpread({}, photoDropShadow), {}, {
          enabled: newDropShadowEnabled
        })
      });
    }
  }), photoDropShadow.enabled && /*#__PURE__*/React.createElement(_components_DropShadow__WEBPACK_IMPORTED_MODULE_5__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Drop Shadow', 'photo-block'),
    attributes: attributes,
    setAttributes: setAttributes
  })), /*#__PURE__*/React.createElement(_components_PanelBody__WEBPACK_IMPORTED_MODULE_11__["default"], {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('CSS Styles', 'photo-block'),
    className: "photo-block__inspector-panel",
    icon: /*#__PURE__*/React.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_13__["default"], null),
    id: "photo-block__photo-css-gram",
    uniqueId: uniqueId,
    initialOpen: false,
    scrollAfterOpen: false
  }, /*#__PURE__*/React.createElement(_components_CSSGramButtonGroup__WEBPACK_IMPORTED_MODULE_6__["default"], {
    attributes: attributes,
    setAttributes: setAttributes
  })), /*#__PURE__*/React.createElement(_components_PanelBody__WEBPACK_IMPORTED_MODULE_11__["default"], {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Padding, Margin, and Border', 'photo-block'),
    initialOpen: false,
    icon: /*#__PURE__*/React.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_14__["default"], null),
    className: "photo-block__inspector-panel",
    id: "photo-block__photo-dimensions-styles",
    uniqueId: uniqueId,
    scrollAfterOpen: false
  }, /*#__PURE__*/React.createElement(_components_DimensionsResponsive__WEBPACK_IMPORTED_MODULE_9__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Photo Padding', 'photo-block'),
    values: photoPaddingSize,
    onValuesChange: function onValuesChange(values) {
      setAttributes({
        photoPaddingSize: values
      });
    },
    labelTop: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Top Padding', 'photo-block'),
    labelRight: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Right Padding', 'photo-block'),
    labelBottom: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Bottom Padding', 'photo-block'),
    labelLeft: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Left Padding', 'photo-block'),
    labelAll: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Change Padding', 'photo-block')
  }), /*#__PURE__*/React.createElement(_components_DimensionsResponsive__WEBPACK_IMPORTED_MODULE_9__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Photo Margin', 'photo-block'),
    values: photoMarginSize,
    onValuesChange: function onValuesChange(values) {
      setAttributes({
        photoMarginSize: values
      });
    },
    labelTop: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Top Margin', 'photo-block'),
    labelRight: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Right Margin', 'photo-block'),
    labelBottom: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Bottom Margin', 'photo-block'),
    labelLeft: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Left Margin', 'photo-block'),
    labelAll: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Change Margin', 'photo-block'),
    allowNegatives: true
  }), /*#__PURE__*/React.createElement(_components_BorderResponsive__WEBPACK_IMPORTED_MODULE_10__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Photo Border', 'photo-block'),
    values: photoBorder,
    onValuesChange: function onValuesChange(values) {
      setAttributes({
        photoBorder: values
      });
    },
    labelTop: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Top Border', 'photo-block'),
    labelRight: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Right Border', 'photo-block'),
    labelBottom: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Bottom Border', 'photo-block'),
    labelLeft: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Left Border', 'photo-block'),
    labelAll: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Change Border', 'photo-block')
  }), /*#__PURE__*/React.createElement(_components_DimensionsResponsive__WEBPACK_IMPORTED_MODULE_9__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Photo Border Radius', 'photo-block'),
    values: photoBorderRadius,
    onValuesChange: function onValuesChange(values) {
      setAttributes({
        photoBorderRadius: values
      });
    },
    labelTop: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Top-left Radius', 'photo-block'),
    labelRight: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Top-right Radius', 'photo-block'),
    labelBottom: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Bottom-right Radius', 'photo-block'),
    labelLeft: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Bottom-left Radius', 'photo-block'),
    labelAll: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Change Border Radius', 'photo-block'),
    isBorderRadius: true
  })), /*#__PURE__*/React.createElement(_components_PanelBody__WEBPACK_IMPORTED_MODULE_11__["default"], {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Container Sizing', 'photo-block'),
    initialOpen: false,
    icon: /*#__PURE__*/React.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_15__["default"], null),
    className: "photo-block__inspector-panel",
    id: "photo-block__photo-container-styles",
    uniqueId: uniqueId,
    scrollAfterOpen: false
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Object Fit', 'photo-block'),
    value: photoObjectFit,
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('None', 'photo-block'),
      value: 'none'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Inherit', 'photo-block'),
      value: 'inherit'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Fill', 'photo-block'),
      value: 'fill'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Contain', 'photo-block'),
      value: 'contain'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Cover', 'photo-block'),
      value: 'cover'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Scale Down', 'photo-block'),
      value: 'scale-down'
    }],
    onChange: function onChange(newObjectFit) {
      setAttributes({
        photoObjectFit: newObjectFit
      });
    },
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('How the image should be resized to fit its container.', 'photo-block')
  })), 'none' !== photoObjectFit && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Object Position', 'photo-block'),
    value: photoObjectPosition,
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('None', 'photo-block'),
      value: 'none'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Top', 'photo-block'),
      value: 'top'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Right', 'photo-block'),
      value: 'right'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Bottom', 'photo-block'),
      value: 'bottom'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Left', 'photo-block'),
      value: 'left'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Custom', 'photo-block'),
      value: 'custom'
    }],
    onChange: function onChange(newObjectPosition) {
      setAttributes({
        photoObjectPosition: newObjectPosition
      });
    },
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('How the image should be positioned inside the container.', 'photo-block')
  })), 'none' !== photoObjectFit && 'custom' === photoObjectPosition && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Custom Object Position', 'photo-block'),
    value: photoObjectPositionCustom,
    onChange: function onChange(newObjectPositionCustom) {
      setAttributes({
        photoObjectPositionCustom: newObjectPositionCustom
      });
    },
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enter a custom object position in CSS format.', 'photo-block')
  })), /*#__PURE__*/React.createElement("div", {
    className: "dlx-photo-block__container-width"
  }, /*#__PURE__*/React.createElement(_components_SizeResponsive__WEBPACK_IMPORTED_MODULE_7__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Width', 'photo-block'),
    values: containerWidth,
    screenSize: deviceType,
    onValuesChange: function onValuesChange(newValues) {
      setAttributes({
        containerWidth: newValues
      });
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "dlx-photo-block__container-height"
  }, /*#__PURE__*/React.createElement(_components_SizeResponsive__WEBPACK_IMPORTED_MODULE_7__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Height', 'photo-block'),
    values: containerHeight,
    screenSize: deviceType,
    units: heightUnits,
    onValuesChange: function onValuesChange(newValues) {
      setAttributes({
        containerHeight: newValues
      });
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "dlx-photo-block__container-min-width"
  }, /*#__PURE__*/React.createElement(_components_SizeResponsive__WEBPACK_IMPORTED_MODULE_7__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Min Width', 'photo-block'),
    values: containerMinWidth,
    screenSize: deviceType,
    onValuesChange: function onValuesChange(newValues) {
      setAttributes({
        containerMinWidth: newValues
      });
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "dlx-photo-block__container-min-height"
  }, /*#__PURE__*/React.createElement(_components_SizeResponsive__WEBPACK_IMPORTED_MODULE_7__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Min Height', 'photo-block'),
    values: containerMinHeight,
    screenSize: deviceType,
    units: heightUnits,
    onValuesChange: function onValuesChange(newValues) {
      setAttributes({
        containerMinHeight: newValues
      });
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "dlx-photo-block__container-max-width"
  }, /*#__PURE__*/React.createElement(_components_SizeResponsive__WEBPACK_IMPORTED_MODULE_7__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Max Width', 'photo-block'),
    values: containerMaxWidth,
    screenSize: deviceType,
    onValuesChange: function onValuesChange(newValues) {
      setAttributes({
        containerMaxWidth: newValues
      });
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "dlx-photo-block__containermax-height"
  }, /*#__PURE__*/React.createElement(_components_SizeResponsive__WEBPACK_IMPORTED_MODULE_7__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Max Height', 'photo-block'),
    values: containerMaxHeight,
    screenSize: deviceType,
    units: heightUnits,
    onValuesChange: function onValuesChange(newValues) {
      setAttributes({
        containerMaxHeight: newValues
      });
    }
  }))));
  return /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, stylesInspectorControls);
};
SidebarImageInspectorControl.defaultProps = {
  attributes: {},
  setAttributes: function setAttributes() {}
};
SidebarImageInspectorControl.propTypes = {
  attributes: (prop_types__WEBPACK_IMPORTED_MODULE_16___default().object)
};
/* harmony default export */ __webpack_exports__["default"] = (SidebarImageInspectorControl);

/***/ }),

/***/ "./src/components/URLPicker/index.js":
/*!*******************************************!*\
  !*** ./src/components/URLPicker/index.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editor.scss */ "./src/components/URLPicker/editor.scss");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_keycodes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/keycodes */ "@wordpress/keycodes");
/* harmony import */ var _wordpress_keycodes__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_keycodes__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_a11y__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/a11y */ "@wordpress/a11y");
/* harmony import */ var _wordpress_a11y__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_a11y__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/url */ "@wordpress/url");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/external-link.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/x-circle.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/search.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/corner-down-left.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/file-text.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/file.js");
/* harmony import */ var _utils_SendCommand__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../utils/SendCommand */ "./src/utils/SendCommand.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * External dependencies
 */




/**
 * WordPress dependencies
 */









/**
 * URL Selector for Media Library.
 *
 * @param {Object} props Incoming props.
 *
 * @return {React.Component} UrlInput component.
 */
var URLPicker = function URLPicker(props) {
  /**
   * Create Refs for inputs.
   */
  var inputRef = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.createRef)();
  var restEndPoint = props.restEndpoint;
  var restNonce = props.restNonce;

  /**
   * Set Unique Instance ID.
   */
  var generatedUniqueId = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_7__.useInstanceId)(URLPicker, 'app');

  /**
   * Set State.
   */
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    suggestions = _useState2[0],
    setSuggestions = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    showSuggestions = _useState4[0],
    setShowSuggestions = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    isUpdatingSuggestions = _useState6[0],
    setIsUpdatingSuggestions = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState8 = _slicedToArray(_useState7, 2),
    currentSuggestionRequest = _useState8[0],
    setCurrentSuggestionRequest = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState10 = _slicedToArray(_useState9, 2),
    selectedSuggestion = _useState10[0],
    setSelectedSuggestion = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState12 = _slicedToArray(_useState11, 2),
    currentSuggestion = _useState12[0],
    setCurrentSuggestion = _useState12[1];
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState14 = _slicedToArray(_useState13, 2),
    selectedSuggestionIndex = _useState14[0],
    setSelectedSuggestionIndex = _useState14[1];
  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
    _useState16 = _slicedToArray(_useState15, 2),
    suggestionListboxId = _useState16[0],
    setSuggestionListboxId = _useState16[1];
  var _useState17 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
    _useState18 = _slicedToArray(_useState17, 2),
    suggestionValue = _useState18[0],
    setSuggestionValue = _useState18[1];
  var _useState19 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(props.savedValue),
    _useState20 = _slicedToArray(_useState19, 2),
    savedSuggestionValue = _useState20[0],
    setSavedSuggestionValue = _useState20[1];
  var _useState21 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("url-input-control-".concat(generatedUniqueId)),
    _useState22 = _slicedToArray(_useState21, 2),
    uniqueInstanceId = _useState22[0],
    setUniqueInstanceId = _useState22[1];
  var _useState23 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState24 = _slicedToArray(_useState23, 2),
    loading = _useState24[0],
    setLoading = _useState24[1];

  /**
   * Debounceing for delay.
   */
  var debouncedRequest = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_7__.useDebounce)(function (value) {
    updateSuggestions(value);
  }, 200);

  /**
   * Effect.
   */
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    /**
     * Run once. Set the suggestion value and current suggestion to saved value, then reset saved value.
     */
    if ('' !== savedSuggestionValue) {
      setSuggestionValue(savedSuggestionValue);
      var newSuggestion = {
        permalink: savedSuggestionValue,
        label: (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_8__.filterURLForDisplay)(savedSuggestionValue),
        slug: '',
        value: ''
      };
      setSavedSuggestionValue('');
      setCurrentSuggestion(newSuggestion);
      return;
    }
    if ('' !== suggestionValue) {
      debouncedRequest(suggestionValue);
    }
  }, [suggestionValue]);

  /**
   * Set Focus to input.
   */
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (inputRef.current && props.hasInititialFocus) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  /**
   * Set the current input.
   *
   * @param {event} event The onChange event.
   */
  var onChange = function onChange(event) {
    setSuggestionValue(event.target.value);
  };

  /**
   * Search when focus and no results are present.
   *
   * @param {event} event Focus event.
   */
  var onFocus = function onFocus(event) {
    event.preventDefault();
    if (null === selectedSuggestion && '' !== suggestionValue && !(0,_wordpress_url__WEBPACK_IMPORTED_MODULE_8__.isURL)(suggestionValue)) {
      debouncedRequest(suggestionValue);
    }
  };

  /**
   * Perform keydown functions such as selecting the next items in a list.
   *
   * @param {event} event Keydown event.
   *
   * @return {void} Return nothing.
   */
  var onKeyDown = function onKeyDown(event) {
    // If the suggestions are not shown or loading, we shouldn't handle the arrow keys
    // We shouldn't preventDefault to allow block arrow keys navigation.
    if (!showSuggestions && !suggestions.length || loading) {
      // In the Windows version of Firefox the up and down arrows don't move the caret
      // within an input field like they do for Mac Firefox/Chrome/Safari. This causes
      // a form of focus trapping that is disruptive to the user experience. This disruption
      // only happens if the caret is not in the first or last position in the text input.
      // See: https://github.com/WordPress/gutenberg/issues/5693#issuecomment-436684747
      switch (event.keyCode) {
        // When UP is pressed, if the caret is at the start of the text, move it to the 0
        // position.
        case _wordpress_keycodes__WEBPACK_IMPORTED_MODULE_4__.UP:
          {
            if (0 !== event.target.selectionStart) {
              event.preventDefault();

              // Set the input caret to position 0.
              event.target.setSelectionRange(0, 0);
            }
            break;
          }
        // When DOWN is pressed, if the caret is not at the end of the text, move it to the
        // last position.
        case _wordpress_keycodes__WEBPACK_IMPORTED_MODULE_4__.DOWN:
          {
            if (suggestionValue !== event.target.selectionStart) {
              event.preventDefault();

              // Set the input caret to the last position.
              event.target.setSelectionRange(suggestionValue.length, suggestionValue.length);
            }
            break;
          }

        // Submitting while loading should trigger onSubmit.
        case _wordpress_keycodes__WEBPACK_IMPORTED_MODULE_4__.ENTER:
          {
            event.preventDefault();
            debouncedRequest(event.target.value);
            break;
          }
      }
      return null;
    }
    switch (event.keyCode) {
      case _wordpress_keycodes__WEBPACK_IMPORTED_MODULE_4__.UP:
        {
          event.preventDefault();
          var previousIndex = !selectedSuggestionIndex ? suggestions.length - 1 : selectedSuggestionIndex - 1;
          setSelectedSuggestionIndex(previousIndex);
          setSelectedSuggestion(suggestions[previousIndex].value);
          break;
        }
      case _wordpress_keycodes__WEBPACK_IMPORTED_MODULE_4__.DOWN:
        {
          event.preventDefault();
          if (!showSuggestions && suggestions.length > 0) {
            setShowSuggestions(true);
            setSelectedSuggestionIndex(0);
            setSelectedSuggestion(suggestions[0].value);
            return;
          }
          var nextIndex = selectedSuggestion === null || selectedSuggestionIndex === suggestions.length - 1 ? 0 : selectedSuggestionIndex + 1;
          setSelectedSuggestionIndex(nextIndex);
          setSelectedSuggestion(suggestions[nextIndex].value);
          break;
        }
      case _wordpress_keycodes__WEBPACK_IMPORTED_MODULE_4__.TAB:
        {
          if (selectedSuggestion !== null) {
            // Announce a link has been selected when tabbing away from the input field.
            (0,_wordpress_a11y__WEBPACK_IMPORTED_MODULE_5__.speak)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Link selected.', 'photo-block'));
          }
          break;
        }
      case _wordpress_keycodes__WEBPACK_IMPORTED_MODULE_4__.ENTER:
        {
          event.preventDefault();
          setShowSuggestions(false);
          if (selectedSuggestion !== null) {
            props.onItemSelect(event, getSuggestion(selectedSuggestion));
            inputRef.current.focus();
          }
          break;
        }
    }
  };

  /**
   * Get the current suggestion and output the label.
   *
   * @param {string} value The current download ID.
   *
   * @return {Object} The suggestion label.
   */
  var getSuggestion = function getSuggestion(value) {
    var foundSuggestion = suggestions.find(function (suggestion) {
      return suggestion.value === value;
    });
    if (null === foundSuggestion || undefined === foundSuggestion) {
      return null;
    }
    return foundSuggestion;
  };

  /**
   * Requests a new suggestion.
   *
   * @param {string} value Value to search for.
   */
  var updateSuggestions = function updateSuggestions() {
    var _value;
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    // Initial suggestions may only show if there is no value
    // (note: this includes whitespace).
    var isInitialSuggestions = !((_value = value) !== null && _value !== void 0 && _value.length);
    value = value.toString();

    // Trim only now we've determined whether or not it originally had a "length"
    // (even if that value was all whitespace).
    value = value.trim();

    // Return early if value is a URL.
    if ((0,_wordpress_url__WEBPACK_IMPORTED_MODULE_8__.isURL)(value)) {
      setSuggestions([]);
      setShowSuggestions(false);
      setLoading(false);
      return;
    }

    // Allow a suggestions request if:
    // - there are at least 2 characters in the search input (except manual searches where
    //   search input length is not required to trigger a fetch)
    // - this is a direct entry (eg: a URL)
    if (!isInitialSuggestions && value.length < 2) {
      // todo - cancel any pending requests
      setSuggestions([]);
      setShowSuggestions(false);
      setLoading(false);
      return;
    }
    setIsUpdatingSuggestions(true);
    setSelectedSuggestion(null);
    setLoading(true);
    var abortController = new AbortController();
    if (null !== currentSuggestionRequest) {
      currentSuggestionRequest.abort();
    }
    setCurrentSuggestionRequest(abortController);

    // Perform async ajax request.
    _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            setLoading(true);
            _context.next = 4;
            return (0,_utils_SendCommand__WEBPACK_IMPORTED_MODULE_9__["default"])(restNonce, {
              signal: abortController.signal,
              search: encodeURIComponent(value)
            }, restEndPoint, 'POST').then(function (response) {
              setCurrentSuggestionRequest(null);
              var data = response.data.data;
              setSuggestions(data);
              setShowSuggestions(true);
            })["catch"](function (error) {}).then(function () {
              setLoading(false);
            });
          case 4:
            _context.next = 8;
            break;
          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
          case 8:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 6]]);
    }))();
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "photo-block-url-input"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "photo-block-pub-url-input__wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "photo-block-pub-url-input__input-wrapper"
  }, null !== currentSuggestion && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "photo-block-pub-url-input__suggestion"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "photo-block-pub-url-input__suggestion-item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", {
    className: "photo-block-pub-url-input__suggestion-label"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.Button, {
    variant: "link",
    icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_10__["default"], null),
    iconSize: 18,
    iconPosition: "right",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Open in new tab', 'photo-block'),
    href: currentSuggestion.permalink,
    target: "_blank",
    rel: "noopener noreferrer"
  }, (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_8__.filterURLForDisplay)(currentSuggestion.permalink))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.Button, {
    variant: "secondary",
    icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_11__["default"], null),
    iconSize: 18,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Remove Current Selection', 'photo-block'),
    onClick: function onClick() {
      setCurrentSuggestion(null);
    }
  }))), null === currentSuggestion && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "photo-block-pub-url-search-wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("input", {
    type: "text",
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Paste in URL or search', 'photo-block'),
    id: uniqueInstanceId,
    className: "photo-block-pub-url-input__input",
    value: suggestionValue,
    onChange: onChange,
    onFocus: onFocus,
    onKeyDown: onKeyDown,
    "aria-label": props.label ? undefined : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Page', 'photo-block'),
    "aria-autocomplete": "list",
    ref: inputRef
  }), loading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "photo-block-pub-url-input__loading"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.Spinner, null)), !loading && !(0,_wordpress_url__WEBPACK_IMPORTED_MODULE_8__.isURL)(suggestionValue) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.Button, {
    className: "photo-block-pub-url-input__search-button",
    icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_12__["default"], null),
    iconSize: 18,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Search for a Page', 'photo-block'),
    onClick: function onClick() {
      setShowSuggestions(true);
    }
  })), !loading && (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_8__.isURL)(suggestionValue) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.Button, {
    className: "photo-block-pub-url-input__apply-button",
    icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_13__["default"], null),
    iconSize: 18,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Apply Link', 'photo-block'),
    onClick: function onClick(e) {
      var newSuggestion = {
        permalink: suggestionValue,
        label: (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_8__.filterURLForDisplay)(suggestionValue),
        slug: '',
        value: ''
      };
      setCurrentSuggestion(newSuggestion);
      props.onItemSelect(e, suggestionValue);
    }
  }))))), showSuggestions && !!suggestions.length && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "photo-block-suggestions-wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    role: "listbox",
    id: suggestionListboxId,
    className: "photo-block-url-input__suggestions"
  }, suggestions.map(function (suggestion, index) {
    var suggestionId = "photo-block-suggested-value-".concat(suggestion.value);
    var suggestionClass = classnames__WEBPACK_IMPORTED_MODULE_2___default()('photo-block-url-input__suggestion', {
      'is-selected': suggestion.value === selectedSuggestion
    });
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.Button, {
      key: suggestionId,
      id: suggestionId,
      value: suggestion.value,
      role: "option",
      "aria-selected": suggestion.value === selectedSuggestion,
      className: suggestionClass,
      onClick: function onClick(e) {
        setSelectedSuggestion(parseInt(e.target.value));
        setSelectedSuggestionIndex(index);
        setCurrentSuggestion(suggestion);
        setShowSuggestions(false);
        props.onItemSelect(e, suggestion.permalink);
      },
      icon: 'post' === suggestion.type ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_14__["default"], null) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_15__["default"], null),
      iconSize: 2,
      iconPosition: "left"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", {
      className: "photo-block-search-item"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", {
      className: "photo-block-search-item-title"
    }, suggestion.label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", {
      className: "photo-block-search-item-info"
    }, suggestion.permalink)));
  }))));
};
URLPicker.defaultProps = {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Page', 'photo-block'),
  onItemSelect: function onItemSelect() {},
  hasInititialFocus: false,
  itemIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null)
};
URLPicker.propTypes = {
  restEndpoint: (prop_types__WEBPACK_IMPORTED_MODULE_16___default().string.isRequired),
  restNonce: (prop_types__WEBPACK_IMPORTED_MODULE_16___default().string.isRequired),
  label: (prop_types__WEBPACK_IMPORTED_MODULE_16___default().string.isRequired),
  onItemSelect: (prop_types__WEBPACK_IMPORTED_MODULE_16___default().func.isRequired),
  hasInititialFocus: (prop_types__WEBPACK_IMPORTED_MODULE_16___default().bool.isRequired),
  itemIcon: (prop_types__WEBPACK_IMPORTED_MODULE_16___default().element.isRequired)
};
/* harmony default export */ __webpack_exports__["default"] = (URLPicker);

/***/ }),

/***/ "./src/screens/Edit/index.js":
/*!***********************************!*\
  !*** ./src/screens/Edit/index.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editor.scss */ "./src/screens/Edit/editor.scss");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/image.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/settings.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/paintbrush.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/crop.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/undo-2.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/accessibility.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/link.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _contexts_UploaderContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../contexts/UploaderContext */ "./src/contexts/UploaderContext.js");
/* harmony import */ var _utils_SendCommand__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../utils/SendCommand */ "./src/utils/SendCommand.js");
/* harmony import */ var _components_MediaLink__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/MediaLink */ "./src/components/MediaLink/index.js");
/* harmony import */ var _hooks_useDeviceType__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../hooks/useDeviceType */ "./src/hooks/useDeviceType.js");
/* harmony import */ var _components_PanelBody__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../components/PanelBody */ "./src/components/PanelBody/index.js");
/* harmony import */ var _components_SidebarImageInspectorControl__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../components/SidebarImageInspectorControl */ "./src/components/SidebarImageInspectorControl/index.js");
/* harmony import */ var _components_SidebarImageAdvancedInspectorControl__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../components/SidebarImageAdvancedInspectorControl */ "./src/components/SidebarImageAdvancedInspectorControl/index.js");
/* harmony import */ var _components_CustomPresets__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../components/CustomPresets */ "./src/components/CustomPresets/index.js");
/* harmony import */ var _utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../utils/TypographyHelper */ "./src/utils/TypographyHelper.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
















var EditScreen = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(function (props, ref) {
  var attributes = props.attributes,
    setAttributes = props.setAttributes,
    innerBlockProps = props.innerBlockProps;
  var uniqueId = attributes.uniqueId,
    photo = attributes.photo,
    imageSize = attributes.imageSize,
    imageDimensions = attributes.imageDimensions,
    imageSizePercentage = attributes.imageSizePercentage,
    photoOpacity = attributes.photoOpacity,
    photoBlur = attributes.photoBlur,
    photoObjectFit = attributes.photoObjectFit,
    photoObjectPosition = attributes.photoObjectPosition,
    photoObjectPositionCustom = attributes.photoObjectPositionCustom,
    photoDropShadow = attributes.photoDropShadow,
    photoBackgroundColor = attributes.photoBackgroundColor,
    cssGramFilter = attributes.cssGramFilter,
    photoMaximumWidth = attributes.photoMaximumWidth,
    containerWidth = attributes.containerWidth,
    containerHeight = attributes.containerHeight,
    containerMaxWidth = attributes.containerMaxWidth,
    containerMaxHeight = attributes.containerMaxHeight,
    containerMinWidth = attributes.containerMinWidth,
    containerMinHeight = attributes.containerMinHeight,
    photoPaddingSize = attributes.photoPaddingSize,
    photoMarginSize = attributes.photoMarginSize,
    photoBorderRadius = attributes.photoBorderRadius,
    photoBorder = attributes.photoBorder,
    skipLazyLoading = attributes.skipLazyLoading,
    imageProtectionEnabled = attributes.imageProtectionEnabled;
  var url = photo.url,
    id = photo.id,
    width = photo.width,
    height = photo.height;
  var _useState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(true),
    _useState2 = _slicedToArray(_useState, 2),
    imageLoading = _useState2[0],
    setImageLoading = _useState2[1];
  var _useState3 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    a11yButton = _useState4[0],
    setA11yButton = _useState4[1];
  var _useState5 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    a11yPopover = _useState6[0],
    setA11yPopover = _useState6[1];
  var _useState7 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('settings'),
    _useState8 = _slicedToArray(_useState7, 2),
    inspectorTab = _useState8[0],
    setInspectorTab = _useState8[1]; // Can be settings|styles.
  var _useState9 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState10 = _slicedToArray(_useState9, 2),
    imageSizeLoading = _useState10[0],
    setImageSizeLoading = _useState10[1];
  var _useState11 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState12 = _slicedToArray(_useState11, 2),
    mediaLinkPopover = _useState12[0],
    setMediaLinkPopover = _useState12[1];
  var _useState13 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState14 = _slicedToArray(_useState13, 2),
    mediaLinkRef = _useState14[0],
    setMediaLinkRef = _useState14[1];
  var _useContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_contexts_UploaderContext__WEBPACK_IMPORTED_MODULE_6__["default"]),
    screen = _useContext.screen,
    setScreen = _useContext.setScreen,
    captionPosition = _useContext.captionPosition,
    setImageFile = _useContext.setImageFile,
    imageFile = _useContext.imageFile,
    originalImageFile = _useContext.originalImageFile;
  var _useDeviceType = (0,_hooks_useDeviceType__WEBPACK_IMPORTED_MODULE_9__["default"])('Desktop'),
    _useDeviceType2 = _slicedToArray(_useDeviceType, 2),
    deviceType = _useDeviceType2[0],
    setDeviceType = _useDeviceType2[1];

  // Setup useEffect to update image dimensions if empty.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (!imageDimensions.width || !imageDimensions.height) {
      setAttributes({
        imageDimensions: _objectSpread({}, photo)
      });
    }
    if (photo.url) {
      setImageFile(photo);
    }
  }, []);

  /**
   * Retrieve an image based on size from REST API.
   *
   * @param {string} size Image size.
   */
  var getImageFromSize = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(size) {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            setImageSizeLoading(true);
            _context.next = 3;
            return (0,_utils_SendCommand__WEBPACK_IMPORTED_MODULE_7__["default"])(photoBlock.restNonce, {}, "".concat(photoBlock.restUrl + '/get-image-by-size', "/id=").concat(photo.id, "/size=").concat(size), 'GET').then(function (response) {
              setAttributes({
                photo: _objectSpread(_objectSpread({}, photo), response.data)
              });
              setAttributes({
                imageDimensions: _objectSpread(_objectSpread({}, imageDimensions), response.data)
              });
              setAttributes({
                imageSizePercentage: '100'
              });
            })["catch"](function (error) {
              // todo: error checking/display.
              console.error(error);
            }).then(function () {
              setImageSizeLoading(false);
            });
          case 3:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function getImageFromSize(_x2) {
      return _ref.apply(this, arguments);
    };
  }();

  /**
   * Whether to show the undo button.
   *
   * @return {boolean} Whether to show the undo button.
   */
  var canShowUndo = function canShowUndo() {
    var originalImageUrl = originalImageFile === null || originalImageFile === void 0 ? void 0 : originalImageFile.url;
    var newImageUrl = photo === null || photo === void 0 ? void 0 : photo.url;
    return originalImageUrl && newImageUrl && originalImageUrl !== newImageUrl;
  };

  // Take a width/height and calculate the width based on the aspect ratio.
  var calculateWidth = function calculateWidth(imageWidth, imageHeight, newHeight) {
    var aspectRatio = imageWidth / imageHeight;
    return Math.round(newHeight * aspectRatio);
  };

  // Take a width/height and calculate the height based on the aspect ratio.
  var calculateHeight = function calculateHeight(imageWidth, imageHeight, newWidth) {
    var aspectRatio = imageWidth / imageHeight;
    return Math.round(newWidth / aspectRatio);
  };

  // Image Sizes.
  var imageSizeOptions = [];
  for (var key in photoBlock.imageSizes) {
    var size = photoBlock.imageSizes[key];
    imageSizeOptions.push({
      value: key,
      label: size.label
    });
  }

  // Set settings inspector Controls.
  var settingsInspectorControls = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Presets', 'photo-block'),
    initialOpen: true
  }, /*#__PURE__*/React.createElement(_components_CustomPresets__WEBPACK_IMPORTED_MODULE_13__["default"], props)), /*#__PURE__*/React.createElement(_components_PanelBody__WEBPACK_IMPORTED_MODULE_10__["default"], {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Photo Settings', 'photo-block'),
    icon: /*#__PURE__*/React.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_15__["default"], null),
    className: "photo-block__inspector-panel",
    id: "photo-block__photo-settings",
    uniqueId: uniqueId,
    initialOpen: true,
    scrollAfterOpen: false
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Photo Title', 'photo-block'),
    value: photo.title,
    onChange: function onChange(title) {
      setAttributes({
        photo: _objectSpread(_objectSpread({}, photo), {}, {
          title: title
        })
      });
    },
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Please enter a title for this photo.', 'photo-block')
  })), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextareaControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Alt Text', 'photo-block'),
    value: photo.alt,
    onChange: function onChange(alt) {
      setAttributes({
        photo: _objectSpread(_objectSpread({}, photo), {}, {
          alt: alt
        })
      });
    },
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Please describe this photo.', 'photo-block'),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Alt text provides a description of the photo for screen readers and search engines.', 'photo-block')
  })), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Image Size', 'photo-block'),
    value: imageSize,
    onChange: function onChange(size) {
      setAttributes({
        imageSize: size
      });
      getImageFromSize(size);
    },
    options: imageSizeOptions
  })), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, {
    className: "dlx-photo-block__image-dimensions-row"
  }, /*#__PURE__*/React.createElement("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Image Dimensions', 'photo-block')), imageSizeLoading && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Spinner, null), !imageSizeLoading && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "dlx-photo-block__image-dimensions"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Width', 'photo-block'),
    value: imageDimensions.width ? imageDimensions.width : width,
    onChange: function onChange(newWidth) {
      // Get new height based on new width.
      var calcHeight = calculateHeight(photo.width, photo.height, newWidth);
      var newDimensions = {
        width: newWidth,
        height: calcHeight
      };
      setAttributes({
        imageDimensions: _objectSpread(_objectSpread({}, imageDimensions), newDimensions)
      });
    },
    type: "number"
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Height', 'photo-block'),
    value: imageDimensions.height ? imageDimensions.height : height,
    onChange: function onChange(newHeight) {
      var calcWidth = calculateWidth(photo.width, photo.height, newHeight);
      var newDimensions = {
        width: calcWidth,
        height: newHeight
      };
      setAttributes({
        imageDimensions: _objectSpread(_objectSpread({}, imageDimensions), newDimensions)
      });
    },
    type: "number"
  })), /*#__PURE__*/React.createElement("div", {
    className: "dlx-photo-block__image-dimensions-buttons"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ButtonGroup, {
    className: "dlx-photo-block__image-dimensions-buttons-group"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    isSmall: true,
    variant: "secondary",
    className: classnames__WEBPACK_IMPORTED_MODULE_5___default()('dlx-photo-block__image-dimensions-buttons-group-button', {
      'is-pressed': imageSizePercentage === '25'
    }),
    onClick: function onClick() {
      // Calc width/height based on percentage.
      var calcWidth = Math.round(photo.width * 0.25);
      var calcHeight = Math.round(photo.height * 0.25);
      setAttributes({
        imageSizePercentage: '25',
        imageDimensions: _objectSpread(_objectSpread({}, imageDimensions), {}, {
          width: calcWidth,
          height: calcHeight
        })
      });
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('25%', 'photo-block')), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    isSmall: true,
    className: classnames__WEBPACK_IMPORTED_MODULE_5___default()('dlx-photo-block__image-dimensions-buttons-group-button', {
      'is-pressed': imageSizePercentage === '50'
    }),
    variant: "secondary",
    onClick: function onClick() {
      // Calc width/height based on percentage.
      var calcWidth = Math.round(photo.width * 0.5);
      var calcHeight = Math.round(photo.height * 0.5);
      setAttributes({
        imageSizePercentage: '50',
        imageDimensions: _objectSpread(_objectSpread({}, imageDimensions), {}, {
          width: calcWidth,
          height: calcHeight
        })
      });
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('50%', 'photo-block')), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    isSmall: true,
    variant: "secondary",
    className: classnames__WEBPACK_IMPORTED_MODULE_5___default()('dlx-photo-block__image-dimensions-buttons-group-button', {
      'is-pressed': imageSizePercentage === '75'
    }),
    onClick: function onClick() {
      // Calc width/height based on percentage.
      var calcWidth = Math.round(photo.width * 0.75);
      var calcHeight = Math.round(photo.height * 0.75);
      setAttributes({
        imageSizePercentage: '75',
        imageDimensions: _objectSpread(_objectSpread({}, imageDimensions), {}, {
          width: calcWidth,
          height: calcHeight
        })
      });
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('75%', 'photo-block')), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    isSmall: true,
    variant: "secondary",
    className: classnames__WEBPACK_IMPORTED_MODULE_5___default()('dlx-photo-block__image-dimensions-buttons-group-button', {
      'is-pressed': imageSizePercentage === '100'
    }),
    onClick: function onClick() {
      // Calc width/height based on percentage.
      var calcWidth = Math.round(photo.width);
      var calcHeight = Math.round(photo.height);
      setAttributes({
        imageSizePercentage: '100',
        imageDimensions: _objectSpread(_objectSpread({}, imageDimensions), {}, {
          width: calcWidth,
          height: calcHeight
        })
      });
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('100%', 'photo-block'))))))));
  var interfaceTabs = /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TabPanel, {
    className: "dlx-photo-block__inspector-tabs",
    activeClass: "active-tab",
    onSelect: function onSelect(tab) {
      setInspectorTab(tab);
    },
    children: function children() {
      return /*#__PURE__*/React.createElement(React.Fragment, null);
    },
    tabs: [{
      name: 'settings',
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Settings', 'photo-block'),
      className: 'dlx-photo-block__inspector-tab',
      icon: /*#__PURE__*/React.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_16__["default"], null)
    }, {
      name: 'styles',
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Styles', 'photo-block'),
      className: 'dlx-photo-block__inspector-tab',
      icon: /*#__PURE__*/React.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_17__["default"], null)
    }]
  }, function (tab) {
    switch (tab.name) {
      case 'settings':
        return settingsInspectorControls;
      case 'styles':
        return /*#__PURE__*/React.createElement(_components_SidebarImageInspectorControl__WEBPACK_IMPORTED_MODULE_11__["default"], {
          attributes: attributes,
          setAttributes: setAttributes
        });
    }
  });

  // Set the local inspector controls.
  var localInspectorControls = /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InspectorControls, null, interfaceTabs);

  // Set the advanced inspector controls.
  var advancedInspectorControls = /*#__PURE__*/React.createElement(_components_SidebarImageAdvancedInspectorControl__WEBPACK_IMPORTED_MODULE_12__["default"], {
    attributes: attributes,
    setAttributes: setAttributes
  });
  var localToolbar = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.BlockControls, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToolbarGroup, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToolbarButton, {
    icon: /*#__PURE__*/React.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_18__["default"], null),
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Crop', 'photo-block'),
    onClick: function onClick() {
      setScreen('crop');
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Crop', 'photo-block'))), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToolbarGroup, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToolbarButton, {
    icon: /*#__PURE__*/React.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_15__["default"], null),
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Replace Photo', 'photo-block'),
    onClick: function onClick() {
      setScreen('initial');
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Replace', 'photo-block')), canShowUndo() && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToolbarButton, {
    icon: /*#__PURE__*/React.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_19__["default"], null),
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Undo', 'photo-block'),
    onClick: function onClick() {
      // Change back to original image.
      setAttributes({
        photo: originalImageFile,
        imageDimensions: {
          width: originalImageFile.width,
          height: originalImageFile.height
        }
      });
      setImageFile(originalImageFile);
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Undo', 'photo-block'))), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToolbarGroup, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToolbarButton, {
    icon: /*#__PURE__*/React.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_20__["default"], null),
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Set Accessibility Options', 'photo-block'),
    onClick: function onClick() {
      setA11yPopover(!a11yPopover);
    },
    ref: setA11yButton
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToolbarButton, {
    icon: /*#__PURE__*/React.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_21__["default"], null),
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Set Link Options', 'photo-block'),
    onClick: function onClick() {
      setMediaLinkPopover(!mediaLinkPopover);
    },
    ref: setMediaLinkRef
  }))), mediaLinkPopover && /*#__PURE__*/React.createElement(_components_MediaLink__WEBPACK_IMPORTED_MODULE_8__["default"], {
    attributes: attributes,
    setAttributes: setAttributes,
    anchorRef: mediaLinkRef,
    onClose: function onClose() {
      setMediaLinkPopover(false);
    }
  }), a11yPopover && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Popover, {
    position: "bottom center",
    onClose: function onClose() {
      setA11yPopover(false);
    },
    anchor: a11yButton
  }, /*#__PURE__*/React.createElement("div", {
    className: "dlx-photo-block__a11y-popover"
  }, /*#__PURE__*/React.createElement("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Accessibility Options', 'photo-block')), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Photo Title', 'photo-block'),
    value: photo.title,
    onChange: function onChange(title) {
      setAttributes({
        photo: _objectSpread(_objectSpread({}, photo), {}, {
          title: title
        })
      });
    },
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Please enter a title for this photo.', 'photo-block'),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('The title is used as a tooltip when hovering over the image.', 'photo-block')
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextareaControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Alt Text', 'photo-block'),
    value: photo.alt,
    onChange: function onChange(alt) {
      setAttributes({
        photo: _objectSpread(_objectSpread({}, photo), {}, {
          alt: alt
        })
      });
    },
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Please describe this image.', 'photo-block'),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Alt text provides a description of the image for screen readers and search engines.', 'photo-block')
  }))));
  var styles = "\n\t\t#".concat(uniqueId, " .dlx-photo-block__image-wrapper {\n\t\t\tbackground: ").concat(photoBackgroundColor, ";\n\t\t\t").concat((0,_utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_14__.getValueWithUnit)(deviceType, containerWidth, 'width'), "\n\t\t\t").concat((0,_utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_14__.getValueWithUnit)(deviceType, containerHeight, 'height'), "\n\t\t\t").concat((0,_utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_14__.getValueWithUnit)(deviceType, containerMinWidth, 'min-width'), "\n\t\t\t").concat((0,_utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_14__.getValueWithUnit)(deviceType, containerMinHeight, 'min-height'), "\n\t\t\t").concat((0,_utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_14__.getValueWithUnit)(deviceType, containerMaxWidth, 'max-width'), "\n\t\t\t").concat((0,_utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_14__.getValueWithUnit)(deviceType, containerMaxHeight, 'max-height'), "\n\t\t}\n\t\t#").concat(uniqueId, " img {\n\t\t\topacity: ").concat(photoOpacity, ";\n\t\t\t").concat(photoBlur ? "filter: blur(".concat(photoBlur, "px);") : '', "\n\t\t\tobject-fit: ").concat(photoObjectFit, ";\n\t\t\t").concat('none' !== photoObjectFit ? 'height: 100%; width: 100%;' : '', "\n\t\t\t").concat('none' !== photoObjectFit && 'custom' !== photoObjectPosition ? 'object-position:' + photoObjectPosition + ';' : '', "\n\t\t\t").concat('none' !== photoObjectFit && 'custom' === photoObjectPosition && '' !== photoObjectPositionCustom ? 'object-position:' + photoObjectPositionCustom + ';' : '', "\n\t\t\tpadding: ").concat((0,_utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_14__.buildDimensionsCSS)(photoPaddingSize, deviceType), ";\n\t\t\tmargin: ").concat((0,_utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_14__.buildDimensionsCSS)(photoMarginSize, deviceType), ";\n\t\t\tborder-radius: ").concat((0,_utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_14__.buildDimensionsCSS)(photoBorderRadius, deviceType), ";\n\t\t\t").concat((0,_utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_14__.buildBorderCSS)(photoBorder, deviceType), "\n\t\t}\n\t"); /**	 */
  if (photoDropShadow.enabled) {
    styles += "\n\t\t\t#".concat(uniqueId, " img {\n\t\t\t\tbox-sizing: border-box;\n\t\t\t\tbox-shadow: ").concat(photoDropShadow.inset ? 'inset ' : '').concat(photoDropShadow.horizontal, "px ").concat(photoDropShadow.vertical, "px ").concat(photoDropShadow.blur, "px ").concat(photoDropShadow.spread, "px ").concat(photoDropShadow.color, ";\n\t\t\t\t-webkit-box-shadow: ").concat(photoDropShadow.inset ? 'inset ' : '').concat(photoDropShadow.horizontal, "px ").concat(photoDropShadow.vertical, "px ").concat(photoDropShadow.blur, "px ").concat(photoDropShadow.spread, "px ").concat(photoDropShadow.color, ";\n\t\t\t}\n\t\t");
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, localInspectorControls, localToolbar, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InspectorAdvancedControls, null, advancedInspectorControls), /*#__PURE__*/React.createElement("style", null, styles), /*#__PURE__*/React.createElement("div", {
    className: "dlx-photo-block__screen-edit"
  }, imageLoading && /*#__PURE__*/React.createElement("div", {
    className: "dlx-photo-block__screen-edit-spinner",
    style: {
      minWidth: width,
      minHeight: height,
      maxWidth: '100%',
      maxHeight: '100%'
    }
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Spinner, null)), /*#__PURE__*/React.createElement("figure", {
    className: "dlx-photo-block__screen-edit-image-wrapper dlx-photo-block__figure"
  }, 'top' === captionPosition && /*#__PURE__*/React.createElement("div", _extends({
    className: "dlx-photo-block__screen-edit-caption dlx-photo-block__caption"
  }, innerBlockProps)), /*#__PURE__*/React.createElement("div", {
    className: "dlx-photo-block__screen-edit-image dlx-photo-block__image-wrapper"
  }, /*#__PURE__*/React.createElement("img", {
    src: url,
    className: classnames__WEBPACK_IMPORTED_MODULE_5___default()("photo-block-".concat(cssGramFilter, " dlx-photo-block__image"), {
      'has-css-gram': cssGramFilter !== 'none'
    }),
    width: imageDimensions.width,
    height: imageDimensions.height,
    alt: "",
    onLoad: function onLoad() {
      setImageLoading(false);
    },
    ref: ref,
    style: {
      maxWidth: "100%",
      height: 'auto'
    }
  }), 'overlay' === captionPosition && /*#__PURE__*/React.createElement("div", _extends({
    className: "dlx-photo-block__screen-edit-caption dlx-photo-block__caption dlx-photo-block__caption--overlay"
  }, innerBlockProps))), 'bottom' === captionPosition && /*#__PURE__*/React.createElement("div", _extends({
    className: "dlx-photo-block__screen-edit-caption dlx-photo-block__caption"
  }, innerBlockProps)))));
});
/* harmony default export */ __webpack_exports__["default"] = (EditScreen);

/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/accessibility.js":
/*!*******************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/accessibility.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Accessibility; }
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * lucide-react v0.182.0 - ISC
 */



const Accessibility = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("Accessibility", [
  ["circle", { cx: "16", cy: "4", r: "1", key: "1grugj" }],
  ["path", { d: "m18 19 1-7-6 1", key: "r0i19z" }],
  ["path", { d: "m5 8 3-3 5.5 3-2.36 3.5", key: "9ptxx2" }],
  ["path", { d: "M4.24 14.5a5 5 0 0 0 6.88 6", key: "10kmtu" }],
  ["path", { d: "M13.76 17.5a5 5 0 0 0-6.88-6", key: "2qq6rc" }]
]);


//# sourceMappingURL=accessibility.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/crop.js":
/*!**********************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/crop.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Crop; }
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * lucide-react v0.182.0 - ISC
 */



const Crop = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("Crop", [
  ["path", { d: "M6 2v14a2 2 0 0 0 2 2h14", key: "ron5a4" }],
  ["path", { d: "M18 22V8a2 2 0 0 0-2-2H2", key: "7s9ehn" }]
]);


//# sourceMappingURL=crop.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/edit-3.js":
/*!************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/edit-3.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Edit3; }
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * lucide-react v0.182.0 - ISC
 */



const Edit3 = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("Edit3", [
  ["path", { d: "M12 20h9", key: "t2du7b" }],
  [
    "path",
    {
      d: "M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z",
      key: "18w55b"
    }
  ]
]);


//# sourceMappingURL=edit-3.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/external-link.js":
/*!*******************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/external-link.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ExternalLink; }
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * lucide-react v0.182.0 - ISC
 */



const ExternalLink = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("ExternalLink", [
  [
    "path",
    {
      d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
      key: "a6xqqp"
    }
  ],
  ["polyline", { points: "15 3 21 3 21 9", key: "mznyad" }],
  ["line", { x1: "10", x2: "21", y1: "14", y2: "3", key: "18c3s4" }]
]);


//# sourceMappingURL=external-link.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/file-image.js":
/*!****************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/file-image.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ FileImage; }
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * lucide-react v0.182.0 - ISC
 */



const FileImage = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("FileImage", [
  [
    "path",
    {
      d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z",
      key: "1nnpy2"
    }
  ],
  ["polyline", { points: "14 2 14 8 20 8", key: "1ew0cm" }],
  ["circle", { cx: "10", cy: "13", r: "2", key: "6v46hv" }],
  ["path", { d: "m20 17-1.09-1.09a2 2 0 0 0-2.82 0L10 22", key: "17vly1" }]
]);


//# sourceMappingURL=file-image.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/link-2-off.js":
/*!****************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/link-2-off.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Link2Off; }
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * lucide-react v0.182.0 - ISC
 */



const Link2Off = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("Link2Off", [
  ["path", { d: "M9 17H7A5 5 0 0 1 7 7", key: "10o201" }],
  ["path", { d: "M15 7h2a5 5 0 0 1 4 8", key: "1d3206" }],
  ["line", { x1: "8", x2: "12", y1: "12", y2: "12", key: "rvw6j4" }],
  ["line", { x1: "2", x2: "22", y1: "2", y2: "22", key: "a6p6uj" }]
]);


//# sourceMappingURL=link-2-off.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/palette.js":
/*!*************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/palette.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Palette; }
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * lucide-react v0.182.0 - ISC
 */



const Palette = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("Palette", [
  ["circle", { cx: "13.5", cy: "6.5", r: ".5", key: "1xcu5" }],
  ["circle", { cx: "17.5", cy: "10.5", r: ".5", key: "736e4u" }],
  ["circle", { cx: "8.5", cy: "7.5", r: ".5", key: "clrty" }],
  ["circle", { cx: "6.5", cy: "12.5", r: ".5", key: "1s4xz9" }],
  [
    "path",
    {
      d: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z",
      key: "12rzf8"
    }
  ]
]);


//# sourceMappingURL=palette.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/save.js":
/*!**********************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/save.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Save; }
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * lucide-react v0.182.0 - ISC
 */



const Save = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("Save", [
  [
    "path",
    {
      d: "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z",
      key: "1owoqh"
    }
  ],
  ["polyline", { points: "17 21 17 13 7 13 7 21", key: "1md35c" }],
  ["polyline", { points: "7 3 7 8 15 8", key: "8nz8an" }]
]);


//# sourceMappingURL=save.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/star.js":
/*!**********************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/star.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Star; }
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * lucide-react v0.182.0 - ISC
 */



const Star = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("Star", [
  [
    "polygon",
    {
      points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",
      key: "8f66p6"
    }
  ]
]);


//# sourceMappingURL=star.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/undo-2.js":
/*!************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/undo-2.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Undo2; }
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * lucide-react v0.182.0 - ISC
 */



const Undo2 = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("Undo2", [
  ["path", { d: "M9 14 4 9l5-5", key: "102s5s" }],
  [
    "path",
    {
      d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11",
      key: "llx8ln"
    }
  ]
]);


//# sourceMappingURL=undo-2.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/wand-2.js":
/*!************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/wand-2.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Wand2; }
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * lucide-react v0.182.0 - ISC
 */



const Wand2 = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("Wand2", [
  [
    "path",
    {
      d: "m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z",
      key: "1bcowg"
    }
  ],
  ["path", { d: "m14 7 3 3", key: "1r5n42" }],
  ["path", { d: "M5 6v4", key: "ilb8ba" }],
  ["path", { d: "M19 14v4", key: "blhpug" }],
  ["path", { d: "M10 2v2", key: "7u0qdc" }],
  ["path", { d: "M7 8H3", key: "zfb6yr" }],
  ["path", { d: "M21 16h-4", key: "1cnmox" }],
  ["path", { d: "M11 3H9", key: "1obp7u" }]
]);


//# sourceMappingURL=wand-2.js.map


/***/ }),

/***/ "./src/components/CSSGramButtonGroup/editor.scss":
/*!*******************************************************!*\
  !*** ./src/components/CSSGramButtonGroup/editor.scss ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/CSSGramButtonPreview/editor.scss":
/*!*********************************************************!*\
  !*** ./src/components/CSSGramButtonPreview/editor.scss ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/CustomPresets/editor.scss":
/*!**************************************************!*\
  !*** ./src/components/CustomPresets/editor.scss ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/DropShadow/editor.scss":
/*!***********************************************!*\
  !*** ./src/components/DropShadow/editor.scss ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/MediaLink/editor.scss":
/*!**********************************************!*\
  !*** ./src/components/MediaLink/editor.scss ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/PanelBody/editor.scss":
/*!**********************************************!*\
  !*** ./src/components/PanelBody/editor.scss ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/SidebarImageAdvancedInspectorControl/editor.scss":
/*!*************************************************************************!*\
  !*** ./src/components/SidebarImageAdvancedInspectorControl/editor.scss ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/SidebarImageInspectorControl/editor.scss":
/*!*****************************************************************!*\
  !*** ./src/components/SidebarImageInspectorControl/editor.scss ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/URLPicker/editor.scss":
/*!**********************************************!*\
  !*** ./src/components/URLPicker/editor.scss ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/screens/Edit/editor.scss":
/*!**************************************!*\
  !*** ./src/screens/Edit/editor.scss ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

}]);
//# sourceMappingURL=EditScreen.0.0.1.js.map