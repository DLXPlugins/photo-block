"use strict";
(self["webpackChunkphoto_block"] = self["webpackChunkphoto_block"] || []).push([["DataScreen.0.0.2"],{

/***/ "./src/screens/Data/index.js":
/*!***********************************!*\
  !*** ./src/screens/Data/index.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editor.scss */ "./src/screens/Data/editor.scss");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/log-out.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/link-2.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/file-text.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/file.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/file-key.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _contexts_UploaderContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../contexts/UploaderContext */ "./src/contexts/UploaderContext.js");
/* harmony import */ var _components_AdvancedSelect__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/AdvancedSelect */ "./src/components/AdvancedSelect/index.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


// eslint-disable-next-line @wordpress/no-unsafe-wp-apis








// Image Sizes.
var imageSizeOptions = [];
for (var key in photoBlock.imageSizes) {
  var size = photoBlock.imageSizes[key];
  imageSizeOptions.push({
    value: key,
    label: size.label
  });
}
var DataScreen = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(function (props, ref) {
  var attributes = props.attributes,
    setAttributes = props.setAttributes;
  var dataSource = attributes.dataSource,
    dataImageSource = attributes.dataImageSource,
    dataImageSourceCustomField = attributes.dataImageSourceCustomField,
    dataImageSourceAuthorMeta = attributes.dataImageSourceAuthorMeta,
    dataPostType = attributes.dataPostType,
    dataPostTitle = attributes.dataPostTitle,
    dataPostId = attributes.dataPostId,
    dataFallbackImage = attributes.dataFallbackImage,
    dataHasFallbackImage = attributes.dataHasFallbackImage,
    dataFallbackImageSize = attributes.dataFallbackImageSize,
    dataScreen = attributes.dataScreen;

  // Post type suggestion for selecting a post.
  var _useState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(dataPostTitle ? dataPostTitle : false),
    _useState2 = _slicedToArray(_useState, 2),
    currentPostTypePostSuggestion = _useState2[0],
    setCurrentPostTypePostSuggestion = _useState2[1];

  // Custom field suggestion for selecting an image source.
  var _useState3 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(dataImageSourceCustomField ? dataImageSourceCustomField : false),
    _useState4 = _slicedToArray(_useState3, 2),
    currentCustomFieldSuggestion = _useState4[0],
    setCurrentCustomFieldSuggestion = _useState4[1];

  // Author meta suggestion for selecting an image source.
  var _useState5 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(dataImageSourceAuthorMeta ? dataImageSourceAuthorMeta : false),
    _useState6 = _slicedToArray(_useState5, 2),
    currentAuthorMetaSuggestion = _useState6[0],
    setCurrentAuthorMetaSuggestion = _useState6[1];
  var _useContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_contexts_UploaderContext__WEBPACK_IMPORTED_MODULE_6__["default"]),
    screen = _useContext.screen,
    setScreen = _useContext.setScreen,
    setDataMode = _useContext.setDataMode;
  var localToolbar = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.BlockControls, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToolbarGroup, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToolbarButton, {
    icon: /*#__PURE__*/React.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_8__["default"], null),
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Exit Data Mode', 'photo-block'),
    onClick: function onClick() {
      setAttributes({
        dataMode: false,
        screen: 'initial'
      });
      setDataMode(false);
      setScreen('initial');
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Exit Data Mode', 'photo-block')))));

  /**
   * Get a post type label.
   *
   * @param {string} postType The post type.
   * @return {string} The post type label.
   */
  var getPostTypeLabel = function getPostTypeLabel(postType) {
    var postTypeLabel = '';
    photoBlock.postTypes.forEach(function (postTypeOption) {
      if (postTypeOption.value === postType) {
        var _postTypeOption$singu;
        postTypeLabel = (_postTypeOption$singu = postTypeOption === null || postTypeOption === void 0 ? void 0 : postTypeOption.singular) !== null && _postTypeOption$singu !== void 0 ? _postTypeOption$singu : postTypeOption.label;
      }
    });
    return postTypeLabel;
  };

  /**
   * Get a post ID either from the block or attribute.
   *
   * @return {number} The post ID.
   */
  var getPostId = function getPostId() {
    var postId = 0;
    // If data type is current post, get the current post ID.
    if ('currentPost' === dataSource) {
      // Get post ID from block editor.
      postId = wp.data.select('core/editor').getCurrentPostId();
      return postId;
    }
    // If data type is post type, get the post ID from the attribute.
    if ('postType' === dataSource && '' !== dataPostId) {
      postId = dataPostId;
      return postId;
    }
    return postId;
  };

  /**
   * Determine if the data apply button should be disabled.
   *
   * @return {boolean} Whether the button should be disabled.
   */
  var isApplyButtonDisabled = function isApplyButtonDisabled() {
    // If data type is current post, get the current post ID.
    if ('postType' === dataSource) {
      if ('' === dataPostType) {
        return true;
      }
      if ('' === dataPostId) {
        return true;
      }
    }
    if ('postMeta' === dataImageSource) {
      if ('' === dataImageSourceCustomField) {
        return true;
      }
    }
    return false;
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, localToolbar, /*#__PURE__*/React.createElement("div", {
    className: "dlx-photo-block__screen-data"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Card, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.CardHeader, {
    isShady: true
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Dynamic Image Data', 'photo-block')), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.CardBody, {
    isScrollable: true
  }, /*#__PURE__*/React.createElement("div", {
    className: "dlx-photo-block__data-row"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Data Source', 'photo-block'),
    value: dataSource,
    onChange: function onChange(value) {
      setAttributes({
        dataSource: value
      });
    },
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Current post', 'photo-block'),
      value: 'currentPost'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Post type', 'photo-block'),
      value: 'postType'
    }]
  })), 'postType' === dataSource && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "dlx-photo-block__data-row"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Select a Post Type', 'photo-block'),
    value: dataPostType,
    onChange: function onChange(value) {
      setAttributes({
        dataPostType: value
      });
    },
    options: photoBlock.postTypes
  })), /*#__PURE__*/React.createElement("div", {
    className: "dlx-photo-block__data-row"
  }, /*#__PURE__*/React.createElement(_components_AdvancedSelect__WEBPACK_IMPORTED_MODULE_7__["default"], {
    restNonce: photoBlock.restNonce,
    restEndpoint: photoBlock.restUrl + '/search/types',
    itemIcon: /*#__PURE__*/React.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_9__["default"], null),
    params: {
      postType: dataPostType
    },
    savedValue: '',
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Search by ID or title', 'photo-block'),
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.sprintf)( /* Translators: %s: post type label. */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Select a %s', 'photo-block'), getPostTypeLabel(dataPostType)),
    currentSelectedSuggestion: currentPostTypePostSuggestion,
    onItemSelect: function onItemSelect(event, suggestionValue) {
      if (null === suggestionValue) {
        setAttributes({
          dataPostId: ''
        });
      }
    }
  }, function (showSuggestions, suggestions, selectedSuggestion) {
    if (showSuggestions && suggestions.length > 0) {
      // Render the suggestions as button items.
      return /*#__PURE__*/React.createElement("div", {
        className: "dlx-photo-block__post-suggestions"
      }, suggestions.map(function (suggestion, index) {
        var isSelected = selectedSuggestion === index;
        var suggestionClasses = classnames__WEBPACK_IMPORTED_MODULE_5___default()('photo-block__post-suggestion', {
          'is-selected': isSelected
        });
        return /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
          key: index,
          value: suggestion.value,
          role: "option",
          "aria-selected": suggestion.value === selectedSuggestion,
          className: suggestionClasses,
          onClick: function onClick(e) {
            setCurrentPostTypePostSuggestion(suggestion.label);
            setAttributes({
              dataPostId: suggestion.value.toString(),
              dataPostTitle: suggestion.label
            });
          },
          icon: 'post' === suggestion.type ? /*#__PURE__*/React.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_10__["default"], null) : /*#__PURE__*/React.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_11__["default"], null),
          iconSize: 2,
          iconPosition: "left"
        }, /*#__PURE__*/React.createElement("span", {
          className: "photo-block-search-item"
        }, /*#__PURE__*/React.createElement("span", {
          className: "photo-block-search-item-title"
        }, suggestion.label), /*#__PURE__*/React.createElement("span", {
          className: "photo-block-search-item-info"
        }, suggestion.permalink)));
      }));
    }
    return /*#__PURE__*/React.createElement(React.Fragment, null);
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dlx-photo-block__data-row"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Image Source', 'photo-block'),
    value: dataImageSource,
    onChange: function onChange(value) {
      setAttributes({
        dataImageSource: value
      });
    }
  }, /*#__PURE__*/React.createElement("optgroup", {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Post Options', 'photo-block')
  }, /*#__PURE__*/React.createElement("option", {
    value: "featuredImage"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Featured Image', 'photo-block')), /*#__PURE__*/React.createElement("option", {
    value: "postMeta"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Post Meta', 'photo-block'))), /*#__PURE__*/React.createElement("optgroup", {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Author', 'photo-block')
  }, /*#__PURE__*/React.createElement("option", {
    value: "authorAvatar"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Author Avatar', 'photo-block')), /*#__PURE__*/React.createElement("option", {
    value: "authorMeta"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Author Meta', 'photo-block'))))), 'postMeta' === dataImageSource && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "dlx-photo-block__data-row"
  }, /*#__PURE__*/React.createElement(_components_AdvancedSelect__WEBPACK_IMPORTED_MODULE_7__["default"], {
    restNonce: photoBlock.restNonce,
    restEndpoint: photoBlock.restUrl + '/search/custom-fields',
    params: {
      postType: dataPostType,
      postId: getPostId()
    },
    savedValue: '',
    onItemSelect: function onItemSelect(event, suggestionValue) {
      if (null === suggestionValue) {
        setAttributes({
          dataImageSourceCustomField: ''
        });
      } else {
        setAttributes({
          dataImageSourceCustomField: suggestionValue
        });
      }
    },
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Search for or enter a custom field', 'photo-block'),
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Select a Custom Field', 'photo-block'),
    currentSelectedSuggestion: currentCustomFieldSuggestion,
    acceptDirectInput: true
  }, function (showSuggestions, suggestions, selectedSuggestion) {
    if (showSuggestions && suggestions.length > 0) {
      // Render the suggestions as button items.
      return /*#__PURE__*/React.createElement("div", {
        className: "dlx-photo-block__post-suggestions"
      }, suggestions.map(function (suggestion, index) {
        var isSelected = selectedSuggestion === index;
        var suggestionClasses = classnames__WEBPACK_IMPORTED_MODULE_5___default()('photo-block__post-suggestion', {
          'is-selected': isSelected
        });
        return /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
          key: index,
          value: suggestion,
          role: "option",
          "aria-selected": suggestion === selectedSuggestion,
          className: suggestionClasses,
          onClick: function onClick(e) {
            setCurrentCustomFieldSuggestion(suggestion);
            setAttributes({
              dataImageSourceCustomField: suggestion
            });
          },
          icon: /*#__PURE__*/React.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_12__["default"], null),
          iconSize: 2,
          iconPosition: "left"
        }, /*#__PURE__*/React.createElement("span", {
          className: "photo-block-search-item"
        }, /*#__PURE__*/React.createElement("span", {
          className: "photo-block-search-item-title no-margin"
        }, suggestion)));
      }));
    }
    return /*#__PURE__*/React.createElement(React.Fragment, null);
  }))), 'authorMeta' === dataImageSource && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "dlx-photo-block__data-row"
  }, /*#__PURE__*/React.createElement(_components_AdvancedSelect__WEBPACK_IMPORTED_MODULE_7__["default"], {
    restNonce: photoBlock.restNonce,
    restEndpoint: photoBlock.restUrl + '/search/author-meta',
    params: {
      postType: dataPostType,
      postId: getPostId()
    },
    savedValue: '',
    onItemSelect: function onItemSelect(event, suggestionValue) {
      if (null === suggestionValue) {
        setAttributes({
          dataImageSourceAuthorMeta: ''
        });
      } else {
        setAttributes({
          dataImageSourceAuthorMeta: suggestionValue
        });
      }
    },
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Search for or enter an author meta field', 'photo-block'),
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Select an author meta field', 'photo-block'),
    currentSelectedSuggestion: currentAuthorMetaSuggestion,
    acceptDirectInput: true
  }, function (showSuggestions, suggestions, selectedSuggestion) {
    if (showSuggestions && suggestions.length > 0) {
      // Render the suggestions as button items.
      return /*#__PURE__*/React.createElement("div", {
        className: "dlx-photo-block__post-suggestions"
      }, suggestions.map(function (suggestion, index) {
        var isSelected = selectedSuggestion === index;
        var suggestionClasses = classnames__WEBPACK_IMPORTED_MODULE_5___default()('photo-block__post-suggestion', {
          'is-selected': isSelected
        });
        return /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
          key: index,
          value: suggestion,
          role: "option",
          "aria-selected": suggestion === selectedSuggestion,
          className: suggestionClasses,
          onClick: function onClick(e) {
            setCurrentAuthorMetaSuggestion(suggestion);
            setAttributes({
              dataImageSourceAuthorMeta: suggestion
            });
          },
          icon: /*#__PURE__*/React.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_12__["default"], null),
          iconSize: 2,
          iconPosition: "left"
        }, /*#__PURE__*/React.createElement("span", {
          className: "photo-block-search-item"
        }, /*#__PURE__*/React.createElement("span", {
          className: "photo-block-search-item-title no-margin"
        }, suggestion)));
      }));
    }
    return /*#__PURE__*/React.createElement(React.Fragment, null);
  })))), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.CardFooter, null, /*#__PURE__*/React.createElement("div", {
    className: "dlx-photo-block__data-row dlx-photo-block__data-button-apply"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.BaseControl, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "primary",
    onClick: function onClick() {
      // Go to data edit screen.
      setDataMode(true);
      setAttributes({
        dataScreen: 'data-edit'
      });
      setScreen('data-edit');
    },
    disabled: isApplyButtonDisabled()
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Apply Changes and Preview', 'photo-block'))))))));
});
/* harmony default export */ __webpack_exports__["default"] = (DataScreen);

/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/log-out.js":
/*!*************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/log-out.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ LogOut; }
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * lucide-react v0.182.0 - ISC
 */



const LogOut = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("LogOut", [
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }],
  ["polyline", { points: "16 17 21 12 16 7", key: "1gabdz" }],
  ["line", { x1: "21", x2: "9", y1: "12", y2: "12", key: "1uyos4" }]
]);


//# sourceMappingURL=log-out.js.map


/***/ }),

/***/ "./src/screens/Data/editor.scss":
/*!**************************************!*\
  !*** ./src/screens/Data/editor.scss ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

}]);
//# sourceMappingURL=DataScreen.0.0.2.js.map