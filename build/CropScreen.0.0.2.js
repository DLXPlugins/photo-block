"use strict";
(self["webpackChunkphoto_block"] = self["webpackChunkphoto_block"] || []).push([["CropScreen.0.0.2"],{

/***/ "./src/components/Icons/AspectRatio.js":
/*!*********************************************!*\
  !*** ./src/components/Icons/AspectRatio.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var AspectRatioIcon = function AspectRatioIcon() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    fillRule: "evenodd",
    strokeLinejoin: "round",
    strokeMiterlimit: 2,
    clipRule: "evenodd",
    viewBox: "0 0 100 100"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    d: "M90.734 21.888a9.376 9.376 0 0 0-9.375-9.375h-62.81a9.374 9.374 0 0 0-9.375 9.375v56.148a9.376 9.376 0 0 0 9.375 9.375h62.81a9.378 9.378 0 0 0 9.375-9.375V21.888zm-6.25 0v56.148a3.126 3.126 0 0 1-3.125 3.125h-62.81a3.126 3.126 0 0 1-3.125-3.125V21.888a3.125 3.125 0 0 1 3.125-3.125h62.81a3.125 3.125 0 0 1 3.125 3.125z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    d: "M45.313 24.854H31.104a9.376 9.376 0 0 0-9.375 9.375v14.209a3.125 3.125 0 0 0 6.25 0V34.229a3.126 3.126 0 0 1 3.125-3.125h14.208a3.126 3.126 0 0 0 .001-6.25zM54.542 75H68.75a9.376 9.376 0 0 0 9.375-9.375V51.417a3.126 3.126 0 0 0-6.25 0v14.208a3.125 3.125 0 0 1-3.125 3.125H54.542a3.126 3.126 0 0 0 0 6.25z"
  }));
};
/* harmony default export */ __webpack_exports__["default"] = (AspectRatioIcon);

/***/ }),

/***/ "./src/components/Icons/ColonIcon.js":
/*!*******************************************!*\
  !*** ./src/components/Icons/ColonIcon.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var ColonIcon = function ColonIcon() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 192 512",
    width: 24,
    height: 24
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    fill: "currentColor",
    d: "M96 192a64 64 0 1 0 0-128 64 64 0 1 0 0 128zm0 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128z"
  }));
};
/* harmony default export */ __webpack_exports__["default"] = (ColonIcon);

/***/ }),

/***/ "./src/components/ToolbarAspectRatio/index.js":
/*!****************************************************!*\
  !*** ./src/components/ToolbarAspectRatio/index.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editor.scss */ "./src/components/ToolbarAspectRatio/editor.scss");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/x.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_CalculateAspectRatioFromPixels__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/CalculateAspectRatioFromPixels */ "./src/utils/CalculateAspectRatioFromPixels.js");
/* harmony import */ var _utils_CalculateDimensionsFromAspectRatio__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/CalculateDimensionsFromAspectRatio */ "./src/utils/CalculateDimensionsFromAspectRatio.js");
/* harmony import */ var _Icons_ColonIcon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Icons/ColonIcon */ "./src/components/Icons/ColonIcon.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * Uploading including showing Cancel and Retry buttons.
 */










/**
 * Upload Status component.
 *
 * @param {Object} props - Component props.
 * @return {Object} JSX markup for the component.
 */
var ToolbarAspectRatio = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.forwardRef)(function (props, ref) {
  var attributes = props.attributes,
    setAttributes = props.setAttributes;
  var getDefaultValues = function getDefaultValues() {
    return {
      aspectRatioWidth: attributes.aspectRatioWidth,
      aspectRatioHeight: attributes.aspectRatioHeight,
      aspectRatioWidthPixels: attributes.aspectRatioWidthPixels,
      aspectRatioHeightPixels: attributes.aspectRatioHeightPixels,
      aspectRatioUnit: attributes.aspectRatioUnit
    };
  };
  var _useForm = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_8__.useForm)({
      defaultValues: getDefaultValues()
    }),
    control = _useForm.control,
    handleSubmit = _useForm.handleSubmit,
    setValue = _useForm.setValue,
    getValues = _useForm.getValues;
  var _useFormState = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_8__.useFormState)({
      control: control
    }),
    isDirty = _useFormState.isDirty;
  var formValues = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_8__.useWatch)({
    control: control
  });

  /**
   * Swap from pixels to aspect ratio and back.
   */
  var swapAspectRatio = function swapAspectRatio() {
    var aspectRatioWidthPixels = getValues('aspectRatioWidthPixels');
    var aspectRatioHeightPixels = getValues('aspectRatioHeightPixels');
    var aspectRatioWidth = getValues('aspectRatioWidth');
    var aspectRatioHeight = getValues('aspectRatioHeight');
    if (getValues('aspectRatioUnit') === 'pixels') {
      // Convert aspect width / height to ratio for display.
      var humanImageRatio = (0,_utils_CalculateAspectRatioFromPixels__WEBPACK_IMPORTED_MODULE_5__["default"])(aspectRatioWidthPixels, aspectRatioHeightPixels);
      setValue('aspectRatioWidth', humanImageRatio.width);
      setValue('aspectRatioHeight', humanImageRatio.height);
    } else {
      var pixelsWidthHeight = (0,_utils_CalculateDimensionsFromAspectRatio__WEBPACK_IMPORTED_MODULE_6__["default"])("".concat(aspectRatioWidth, ":").concat(aspectRatioHeight), getValues('aspectRatioWidthPixels'));
      setValue('aspectRatioWidthPixels', pixelsWidthHeight.width);
      setValue('aspectRatioHeightPixels', pixelsWidthHeight.height);
    }
  };

  /**
   * The form has been submitted.
   *
   * @param {Object} formData form data.
   */
  var onSubmit = function onSubmit(formData) {
    props.onChange(_objectSpread({}, formData));
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, /*#__PURE__*/React.createElement("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()('dlx-photo-block__component-aspect-ratio', {
      'dlx-photo-block__component-aspect-ratio--active': 'ratio' === getValues('aspectRatioUnit'),
      'dlx-photo-block__component-pixels--active': 'pixels' === getValues('aspectRatioUnit')
    })
  }, getValues('aspectRatioUnit') === 'ratio' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_8__.Controller, {
    name: "aspectRatioWidth",
    control: control,
    render: function render(_ref) {
      var _ref$field = _ref.field,
        _onChange = _ref$field.onChange,
        value = _ref$field.value;
      return /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Aspect Ratio Width', 'photo-block'),
        value: value,
        onChange: function onChange(newValue) {
          _onChange(newValue);
        },
        type: "number",
        placeholder: 16
      });
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "dlx-photo-block__component-aspect-ratio-splitter"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "secondary",
    className: "dlx-photo-block__component-aspect-ratio-splitter-button",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Change between aspect ratio and pixels', 'photo-block'),
    onClick: function onClick() {
      if ('pixels' === getValues('aspectRatioUnit')) {
        setValue('aspectRatioUnit', 'ratio');
        setAttributes({
          aspectRatioUnit: 'ratio'
        });
      } else {
        setValue('aspectRatioUnit', 'pixels');
        setAttributes({
          aspectRatioUnit: 'pixels'
        });
      }
    },
    icon: 'pixels' === getValues('aspectRatioUnit') ? /*#__PURE__*/React.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_9__["default"], null) : /*#__PURE__*/React.createElement(_Icons_ColonIcon__WEBPACK_IMPORTED_MODULE_7__["default"], null)
  })), /*#__PURE__*/React.createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_8__.Controller, {
    name: "aspectRatioHeight",
    control: control,
    render: function render(_ref2) {
      var _ref2$field = _ref2.field,
        _onChange2 = _ref2$field.onChange,
        value = _ref2$field.value;
      return /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Aspect Ratio Height', 'photo-block'),
        value: value,
        onChange: function onChange(newValue) {
          _onChange2(newValue);
        },
        type: "number",
        placeholder: 9
      });
    }
  })), getValues('aspectRatioUnit') === 'pixels' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_8__.Controller, {
    name: "aspectRatioWidthPixels",
    control: control,
    render: function render(_ref3) {
      var _ref3$field = _ref3.field,
        _onChange3 = _ref3$field.onChange,
        value = _ref3$field.value;
      return /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Pixel Width', 'photo-block'),
        value: value,
        onChange: function onChange(newValue) {
          _onChange3(newValue);
        },
        type: "number",
        placeholder: 16
      });
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "dlx-photo-block__component-aspect-ratio-splitter"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "secondary",
    className: "dlx-photo-block__component-aspect-ratio-splitter-button",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Change between aspect ratio and pixels', 'photo-block'),
    onClick: function onClick() {
      if ('pixels' === getValues('aspectRatioUnit')) {
        setValue('aspectRatioUnit', 'ratio');
        setAttributes({
          aspectRatioUnit: 'ratio'
        });
      } else {
        setValue('aspectRatioUnit', 'pixels');
        setAttributes({
          aspectRatioUnit: 'pixels'
        });
      }
    },
    icon: 'pixels' === getValues('aspectRatioUnit') ? /*#__PURE__*/React.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_9__["default"], {
      width: 16,
      height: 16
    }) : /*#__PURE__*/React.createElement(_Icons_ColonIcon__WEBPACK_IMPORTED_MODULE_7__["default"], {
      width: 16,
      height: 16
    })
  })), /*#__PURE__*/React.createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_8__.Controller, {
    name: "aspectRatioHeightPixels",
    control: control,
    render: function render(_ref4) {
      var _ref4$field = _ref4.field,
        _onChange4 = _ref4$field.onChange,
        value = _ref4$field.value;
      return /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Pixel Height', 'photo-block'),
        value: value,
        onChange: function onChange(newValue) {
          _onChange4(newValue);
        },
        type: "number",
        placeholder: 9
      });
    }
  })), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: 'primary',
    type: "submit",
    className: "dlx-photo-block__component-aspect-ratio-apply",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Apply the Aspect Ratio', 'photo-block'),
    tooltip: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Switch modes from Aspect Ratio to Width and Height (pixels)', 'photo-block')
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Apply', 'photo-block')))));
});
/* harmony default export */ __webpack_exports__["default"] = (ToolbarAspectRatio);

/***/ }),

/***/ "./src/screens/Crop/index.js":
/*!***********************************!*\
  !*** ./src/screens/Crop/index.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editor.scss */ "./src/screens/Crop/editor.scss");
/* harmony import */ var react_image_crop_src_ReactCrop_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-image-crop/src/ReactCrop.scss */ "./node_modules/react-image-crop/src/ReactCrop.scss");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/check.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/lock.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/rotate-ccw.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/rotate-cw.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/loader-2.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/save.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/x.js");
/* harmony import */ var react_image_crop__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-image-crop */ "./node_modules/react-image-crop/dist/ReactCrop.min.js");
/* harmony import */ var react_image_crop__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_image_crop__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _contexts_UploaderContext__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../contexts/UploaderContext */ "./src/contexts/UploaderContext.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _utils_SendCommand__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../utils/SendCommand */ "./src/utils/SendCommand.js");
/* harmony import */ var _components_Icons_AspectRatio__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../components/Icons/AspectRatio */ "./src/components/Icons/AspectRatio.js");
/* harmony import */ var _components_ToolbarAspectRatio__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../components/ToolbarAspectRatio */ "./src/components/ToolbarAspectRatio/index.js");
/* harmony import */ var _utils_CalculateAspectRatioFromPixels__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../utils/CalculateAspectRatioFromPixels */ "./src/utils/CalculateAspectRatioFromPixels.js");
/* harmony import */ var _utils_CalculateDimensionsFromAspectRatio__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../utils/CalculateDimensionsFromAspectRatio */ "./src/utils/CalculateDimensionsFromAspectRatio.js");
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
















var CropScreen = function CropScreen(props) {
  var _fullsizePhoto$url;
  var _useContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useContext)(_contexts_UploaderContext__WEBPACK_IMPORTED_MODULE_8__["default"]),
    screen = _useContext.screen,
    imageFile = _useContext.imageFile,
    setScreen = _useContext.setScreen,
    setImageFile = _useContext.setImageFile;
  var attributes = props.attributes,
    setAttributes = props.setAttributes;
  var _useState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(true),
    _useState2 = _slicedToArray(_useState, 2),
    shouldShowLoading = _useState2[0],
    setShouldShowLoading = _useState2[1];
  var _useState3 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(true),
    _useState4 = _slicedToArray(_useState3, 2),
    shouldFetchImage = _useState4[0],
    setShouldFetchImage = _useState4[1];
  var _useState5 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)({}),
    _useState6 = _slicedToArray(_useState5, 2),
    fullsizePhoto = _useState6[0],
    setFullsizePhoto = _useState6[1];
  var _useState7 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(null),
    _useState8 = _slicedToArray(_useState7, 2),
    modifiedPhoto = _useState8[0],
    setModifiedPhoto = _useState8[1];
  var _useState9 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(0),
    _useState10 = _slicedToArray(_useState9, 2),
    rotateDegrees = _useState10[0],
    setRotateDegrees = _useState10[1];
  var _useState11 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(null),
    _useState12 = _slicedToArray(_useState11, 2),
    crop = _useState12[0],
    setCrop = _useState12[1];
  var _useState13 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(true),
    _useState14 = _slicedToArray(_useState13, 2),
    lockCrop = _useState14[0],
    setLockCrop = _useState14[1];
  var _useState15 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false),
    _useState16 = _slicedToArray(_useState15, 2),
    isSaving = _useState16[0],
    setIsSaving = _useState16[1];
  var _useState17 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(undefined),
    _useState18 = _slicedToArray(_useState17, 2),
    cropAspectRatio = _useState18[0],
    setCropAspectRatio = _useState18[1];
  var _useState19 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(null),
    _useState20 = _slicedToArray(_useState19, 2),
    cropMaxWidth = _useState20[0],
    setCropMaxWidth = _useState20[1]; // Used for setting the max crop size when selecting pixel values for aspect ratio.
  var _useState21 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(null),
    _useState22 = _slicedToArray(_useState21, 2),
    cropMaxHeight = _useState22[0],
    setCropMaxHeight = _useState22[1]; // Used for setting the max crop size when selecting pixel values for aspect ratio.
  var _useState23 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(null),
    _useState24 = _slicedToArray(_useState23, 2),
    reactCropImageRef = _useState24[0],
    setReactCropImageRef = _useState24[1];
  var photo = attributes.photo,
    uniqueId = attributes.uniqueId,
    aspectRatio = attributes.aspectRatio,
    aspectRatioUnit = attributes.aspectRatioUnit,
    aspectRatioWidth = attributes.aspectRatioWidth,
    aspectRatioHeight = attributes.aspectRatioHeight,
    aspectRatioWidthPixels = attributes.aspectRatioWidthPixels,
    aspectRatioHeightPixels = attributes.aspectRatioHeightPixels;
  var url = photo.url,
    id = photo.id,
    width = photo.width,
    height = photo.height;

  /**
   * Rotate an image.
   *
   * @param {string} imgSrc  The Image URL.
   * @param {number} degrees The degrees in which to rotate the image.
   * @return {Promise} A promise that resolves with the new image URL.
   */
  var rotateImage = function rotateImage(imgSrc, degrees) {
    return new Promise(function (resolve, reject) {
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      var image = new Image();
      image.crossOrigin = 'anonymous';
      image.src = imgSrc;
      image.onload = function () {
        // Get canvas dimensions from image.
        var radian = degrees * Math.PI / 180;
        var sin = Math.sin(radian);
        var cos = Math.cos(radian);
        var imgWidth = Math.abs(image.width * cos) + Math.abs(image.height * sin);
        var imgHeight = Math.abs(image.width * sin) + Math.abs(image.height * cos);

        // Begin to rotate.
        canvas.width = imgWidth;
        canvas.height = imgHeight;
        context.translate(canvas.width / 2, canvas.height / 2);
        context.rotate(degrees * Math.PI / 180);
        context.drawImage(image, -image.width / 2, -image.height / 2);
        canvas.toBlob(function (blob) {
          var newImageUrl = URL.createObjectURL(blob);
          resolve({
            url: newImageUrl,
            width: canvas.width,
            height: canvas.height
          });
        }, 'image/png');
      };
      image.onerror = function (error) {
        reject(error);
      };
    });
  };

  /**
   * Return the current degree for the rotation items.
   *
   * @param {number} degrees The degree to add/subtract.
   * @return {number} The new degree.
   */
  var getDegrees = function getDegrees(degrees) {
    var newDegrees = rotateDegrees + degrees;
    if (newDegrees === 360) {
      return 0;
    }
    if (newDegrees === -360) {
      return 0;
    }
    return newDegrees;
  };

  /**
   * Crop an image using the REST API.
   *
   * @param {Object} cropObject React crop object.
   * @param {number} imageId    The image ID.
   * @param {number} rotate     Image rotation in degrees.
   *
   * @return {Promise} The REST API promise.
   */
  var cropImage = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(cropObject, imageId, rotate) {
      var displayDimensionsWidth, displayDimensionsHeight, originalDimensionsWidth, originalDimensionsHeight, scaleX, scaleY, scaledCropX, scaledCropY, scaledCropWidth, scaledCropHeight;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            // Get image dimensions relative to viewport.
            displayDimensionsWidth = reactCropImageRef.offsetWidth;
            displayDimensionsHeight = reactCropImageRef.offsetHeight;
            originalDimensionsWidth = reactCropImageRef.naturalWidth;
            originalDimensionsHeight = reactCropImageRef.naturalHeight; // Get crop dimensions to send to server.
            scaleX = originalDimensionsWidth / displayDimensionsWidth;
            scaleY = originalDimensionsHeight / displayDimensionsHeight; // Scale crop coordinates
            scaledCropX = cropObject.x * scaleX;
            scaledCropY = cropObject.y * scaleY;
            scaledCropWidth = cropObject.width * scaleX;
            scaledCropHeight = cropObject.height * scaleY;
            _context.next = 12;
            return (0,_utils_SendCommand__WEBPACK_IMPORTED_MODULE_10__["default"])(photoBlock.restNonce, {
              cropX: scaledCropX,
              cropY: scaledCropY,
              cropWidth: scaledCropWidth,
              cropHeight: scaledCropHeight,
              imageId: imageId,
              rotateDegrees: rotate
            }, "".concat(photoBlock.restUrl + '/image/crop'), 'POST');
          case 12:
            return _context.abrupt("return", _context.sent);
          case 13:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function cropImage(_x2, _x3, _x4) {
      return _ref.apply(this, arguments);
    };
  }();

  /**
   * Set a new center crop based on the image dimensions.
   *
   * @param {number} imageWidth     The image width in pixels.
   * @param {number} imageHeight    The image height in pixels.
   * @param {number} newAspectRatio The aspect ratio.
   * @param {number} maximumWidth   The maximum width in pixels.
   * @param {number} maximumHeight  The maximum height in pixels.
   */
  var setCenterCrop = function setCenterCrop(imageWidth, imageHeight, newAspectRatio) {
    var maximumWidth = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var maximumHeight = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var initialCropRatio = 1;

    // Get the initial crop size.
    var minDimension = Math.min(imageWidth, imageHeight);
    var initialCropSize = minDimension * initialCropRatio;

    // Get the crop width/height.
    var cropWidth, cropHeight;
    if (imageWidth < imageHeight) {
      cropWidth = initialCropSize;
      cropHeight = cropWidth / newAspectRatio;
    } else {
      cropHeight = initialCropSize;
      cropWidth = cropHeight * newAspectRatio;
    }
    if (maximumWidth && maximumHeight) {
      cropWidth = maximumWidth;
      cropHeight = maximumHeight;
    }

    // Check if crop width/height exceed image dimensions.
    if (cropWidth > imageWidth) {
      cropWidth = imageWidth;
      cropHeight = cropWidth / newAspectRatio;
    }
    if (cropHeight > imageHeight) {
      cropHeight = imageHeight;
      cropWidth = cropHeight * newAspectRatio;
    }

    // Calculate X/Y vars.
    var x = Math.max((imageWidth - cropWidth) / 2, 0);
    var y = Math.max((imageHeight - cropHeight) / 2, 0);

    // Set crop object.
    var newCrop = {
      aspect: cropWidth / cropHeight,
      unit: 'px',
      x: x,
      y: y,
      width: cropWidth,
      height: cropHeight
    };
    if (maximumWidth && maximumHeight) {
      newCrop.maxWidth = maximumWidth;
      newCrop.maxHeight = maximumHeight;
    }
    setCrop(newCrop);
  };

  /**
   * Fetch the full size image for cropping.
   */
  (0,react__WEBPACK_IMPORTED_MODULE_9__.useEffect)(function () {
    function fetchImage() {
      return _fetchImage.apply(this, arguments);
    }
    function _fetchImage() {
      _fetchImage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var response, data, newAspectRatio, humanImageRatio;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0,_utils_SendCommand__WEBPACK_IMPORTED_MODULE_10__["default"])(photoBlock.restNonce, {}, "".concat(photoBlock.restUrl + '/get-image', "/id=").concat(photo.id), 'GET');
            case 2:
              response = _context2.sent;
              data = response.data;
              setFullsizePhoto(data);
              newAspectRatio = aspectRatioWidth / aspectRatioHeight;
              if ('pixels' === aspectRatioUnit) {
                humanImageRatio = (0,_utils_CalculateAspectRatioFromPixels__WEBPACK_IMPORTED_MODULE_13__["default"])(aspectRatioWidthPixels, aspectRatioHeightPixels);
                newAspectRatio = humanImageRatio.width / humanImageRatio.height;
              }

              // Set crop value.
              setShouldShowLoading(false);
              setCropAspectRatio(newAspectRatio);
            case 9:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      return _fetchImage.apply(this, arguments);
    }
    fetchImage();
  }, [shouldFetchImage]);

  /* Set Center Crop when image has finished loading */
  (0,react__WEBPACK_IMPORTED_MODULE_9__.useEffect)(function () {
    if (reactCropImageRef) {
      setCenterCrop(reactCropImageRef.offsetWidth, reactCropImageRef.offsetHeight, cropAspectRatio);
    }
  }, [reactCropImageRef]);

  /**
   * Create new crop object when aspect ratio changes.
   *
   * @param {number} newAspectRatioWidth  The aspect ratio width.
   * @param {number} newAspectRatioHeight The aspect ratio height.
   * @param {number} maximumWidth         The maximum width in pixels.
   * @param {number} maximumHeight        The maximum height in pixels.
   */
  var handleAspectRatioChange = function handleAspectRatioChange(newAspectRatioWidth, newAspectRatioHeight) {
    var maximumWidth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var maximumHeight = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    // Aspect ratio.
    var newAspectRatio = newAspectRatioWidth / newAspectRatioHeight;
    if (null !== maximumWidth && null !== maximumHeight) {
      newAspectRatio = maximumWidth / maximumHeight;
      setCropMaxWidth(maximumWidth);
      setCropMaxHeight(maximumHeight);
    } else {
      setCropMaxWidth(null);
      setCropMaxHeight(null);
    }
    setCropAspectRatio(newAspectRatio);
    setCenterCrop(reactCropImageRef.offsetWidth, reactCropImageRef === null || reactCropImageRef === void 0 ? void 0 : reactCropImageRef.offsetHeight, newAspectRatio, maximumWidth, maximumHeight);
  };

  // Set the local inspector controls.
  var localInspectorControls = /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__.InspectorControls, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Crop Settings', 'photo-block')
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, "Crop options here")));
  var localToolbar = /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__.BlockControls, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToolbarGroup, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToolbarDropdownMenu, {
    icon: /*#__PURE__*/React.createElement(_components_Icons_AspectRatio__WEBPACK_IMPORTED_MODULE_11__["default"], null),
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Aspect Ratio', 'photo-block')
  }, function (_ref2) {
    var onClose = _ref2.onClose;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.MenuGroup, {
      className: "dlx-photo-block__aspect-ratio-group"
    }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.MenuItem, {
      icon: 'original' === aspectRatio ? /*#__PURE__*/React.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_15__["default"], null) : null,
      isSelected: 'original' === aspectRatio,
      onClick: function onClick() {
        setAttributes({
          aspectRatio: 'original'
        });
        handleAspectRatioChange(fullsizePhoto === null || fullsizePhoto === void 0 ? void 0 : fullsizePhoto.width, fullsizePhoto === null || fullsizePhoto === void 0 ? void 0 : fullsizePhoto.height);
        onClose();
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Original', 'photo-block')), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.MenuItem, {
      icon: 'square' === aspectRatio ? /*#__PURE__*/React.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_15__["default"], null) : null,
      isSelected: 'square' === aspectRatio,
      onClick: function onClick() {
        setAttributes({
          aspectRatio: 'square'
        });
        handleAspectRatioChange(1, 1);
        onClose();
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Square', 'photo-block')), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.MenuItem, {
      icon: 'custom' === aspectRatio ? /*#__PURE__*/React.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_15__["default"], null) : null,
      isSelected: 'custom' === aspectRatio,
      onClick: function onClick() {
        setAttributes({
          aspectRatio: 'custom'
        });
        onClose();
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Custom', 'photo-block'))), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.MenuGroup, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Landscape', 'photo-block'),
      className: "dlx-photo-block__aspect-ratio-group"
    }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.MenuItem, {
      icon: '16:10' === aspectRatio ? /*#__PURE__*/React.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_15__["default"], null) : null,
      isSelected: '16:10' === aspectRatio,
      onClick: function onClick() {
        setAttributes({
          aspectRatio: '16:10'
        });
        handleAspectRatioChange(16, 10);
        onClose();
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('16:10', 'photo-block')), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.MenuItem, {
      icon: '16:9' === aspectRatio ? /*#__PURE__*/React.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_15__["default"], null) : null,
      isSelected: '16:9' === aspectRatio,
      onClick: function onClick() {
        setAttributes({
          aspectRatio: '16:9'
        });
        handleAspectRatioChange(16, 9);
        onClose();
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('16:9', 'photo-block')), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.MenuItem, {
      icon: '4:3' === aspectRatio ? /*#__PURE__*/React.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_15__["default"], null) : null,
      isSelected: '4:3' === aspectRatio,
      onClick: function onClick() {
        setAttributes({
          aspectRatio: '4:3'
        });
        handleAspectRatioChange(4, 3);
        onClose();
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('4:3', 'photo-block')), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.MenuItem, {
      icon: '3:2' === aspectRatio ? /*#__PURE__*/React.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_15__["default"], null) : null,
      isSelected: '3:2' === aspectRatio,
      onClick: function onClick() {
        setAttributes({
          aspectRatio: '3:2'
        });
        handleAspectRatioChange(3, 2);
        onClose();
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('3:2', 'photo-block'))), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.MenuGroup, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Portrait', 'photo-block'),
      className: "dlx-photo-block__aspect-ratio-group"
    }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.MenuItem, {
      icon: '10:16' === aspectRatio ? /*#__PURE__*/React.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_15__["default"], null) : null,
      isSelected: '10:16' === aspectRatio,
      onClick: function onClick() {
        setAttributes({
          aspectRatio: '10:16'
        });
        handleAspectRatioChange(10, 16);
        onClose();
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('10:16', 'photo-block')), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.MenuItem, {
      icon: '9:16' === aspectRatio ? /*#__PURE__*/React.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_15__["default"], null) : null,
      isSelected: '9:16' === aspectRatio,
      onClick: function onClick() {
        setAttributes({
          aspectRatio: '9:16'
        });
        handleAspectRatioChange(9, 16);
        onClose();
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('9:16', 'photo-block')), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.MenuItem, {
      icon: '3:4' === aspectRatio ? /*#__PURE__*/React.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_15__["default"], null) : null,
      isSelected: '3:4' === aspectRatio,
      onClick: function onClick() {
        setAttributes({
          aspectRatio: '3:4'
        });
        handleAspectRatioChange(3, 4);
        onClose();
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('3:4', 'photo-block')), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.MenuItem, {
      icon: '2:3' === aspectRatio ? /*#__PURE__*/React.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_15__["default"], null) : null,
      isSelected: '2:3' === aspectRatio,
      onClick: function onClick() {
        setAttributes({
          aspectRatio: '2:3'
        });
        handleAspectRatioChange(2, 3);
        onClose();
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('2:3', 'photo-block'))));
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToolbarButton, {
    className: "dlx-photo-block__lock-crop-button",
    icon: /*#__PURE__*/React.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_16__["default"], null),
    label: lockCrop ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('UnLock Aspect Ratio', 'photo-block') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Lock Aspect Ratio', 'photo-block'),
    isActive: lockCrop,
    onClick: function onClick() {
      setLockCrop(!lockCrop);
    }
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToolbarButton, {
    icon: /*#__PURE__*/React.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_17__["default"], null),
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Rotate Left', 'photo-block'),
    onClick: function onClick() {
      var degrees = getDegrees(-90);
      setRotateDegrees(degrees);
      rotateImage(photo.url, degrees).then(function (newImage) {
        setFullsizePhoto(newImage);
        setModifiedPhoto(newImage);
      });
    }
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToolbarButton, {
    icon: /*#__PURE__*/React.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_18__["default"], null),
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Rotate Right', 'photo-block'),
    onClick: function onClick() {
      var degrees = getDegrees(90);
      setRotateDegrees(degrees);
      rotateImage(photo.url, degrees).then(function (newImage) {
        setFullsizePhoto(newImage);
        setModifiedPhoto(newImage);
      });
    }
  })), 'custom' === aspectRatio && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToolbarGroup, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToolbarItem, {
    as: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.forwardRef)(function (args, ref) {
      return /*#__PURE__*/React.createElement(_components_ToolbarAspectRatio__WEBPACK_IMPORTED_MODULE_12__["default"], {
        attributes: attributes,
        setAttributes: setAttributes,
        forwardRef: ref,
        onChange: function onChange(values) {
          setAttributes({
            aspectRatioWidthPixels: values.aspectRatioWidthPixels,
            aspectRatioHeightPixels: values.aspectRatioHeightPixels
          });
          if ('pixels' === values.aspectRatioUnit) {
            var humanImageRatio = (0,_utils_CalculateAspectRatioFromPixels__WEBPACK_IMPORTED_MODULE_13__["default"])(values.aspectRatioWidthPixels, values.aspectRatioHeightPixels);
            setAttributes({
              aspectRatioWidth: humanImageRatio.width,
              aspectRatioHeight: humanImageRatio.height
            });
            handleAspectRatioChange(humanImageRatio.width, humanImageRatio.height, values.aspectRatioWidthPixels, values.aspectRatioHeightPixels);
          } else {
            setAttributes({
              aspectRatioWidth: values.aspectRatioWidth,
              aspectRatioHeight: values.aspectRatioHeight
            });
            handleAspectRatioChange(values.aspectRatioWidth, values.aspectRatioHeight);
          }
        }
      });
    })
  })), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToolbarGroup, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToolbarButton, {
    icon: isSaving ? /*#__PURE__*/React.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_19__["default"], null) : /*#__PURE__*/React.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_20__["default"], null),
    className: classnames__WEBPACK_IMPORTED_MODULE_7___default()('dlx-photo-block__save-button', {
      'is-saving': isSaving
    }),
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Save Changes', 'photo-block'),
    onClick: function onClick() {
      if (isSaving) {
        return;
      }
      setIsSaving(true);
      var croppedImage = cropImage(crop, photo.id, rotateDegrees);
      croppedImage.then(function (imageResponse) {
        var data = imageResponse.data;
        if (data.success) {
          setImageFile(data.data.attachment);
          setAttributes({
            photo: data.data.attachment,
            imageDimensions: {
              width: data.data.width,
              height: data.data.height
            }
          });
          setScreen('edit');
        } else {
          // todo: error handling.
        }
      })["catch"](function (error) {
        console.log(error);
      }).then(function () {
        setIsSaving(false);
      });
    }
  }, isSaving ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Saving…', 'photo-block') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Save Changes', 'photo-block')), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToolbarButton, {
    icon: /*#__PURE__*/React.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_21__["default"], null),
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Cancel', 'photo-block'),
    onClick: function onClick() {
      setScreen('edit');
    },
    disabled: isSaving
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Cancel', 'photo-block'))));
  return /*#__PURE__*/React.createElement(React.Fragment, null, localInspectorControls, localToolbar, /*#__PURE__*/React.createElement("div", {
    className: "dlx-photo-block__screen-edit"
  }, shouldShowLoading && /*#__PURE__*/React.createElement("div", {
    className: "dlx-photo-block__screen-edit-spinner",
    style: {
      minWidth: width,
      minHeight: height,
      maxWidth: '100%',
      maxHeight: '100%'
    }
  }, /*#__PURE__*/React.createElement("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Loading Full Size Image', 'photo-block')), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Spinner, null)), !shouldShowLoading && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement((react_image_crop__WEBPACK_IMPORTED_MODULE_6___default()), {
    aspect: lockCrop ? cropAspectRatio : null,
    crop: crop,
    onChange: function onChange(newCrop) {
      setCrop(newCrop);
    },
    ruleOfThirds: true,
    maxWidth: cropMaxWidth !== null && cropMaxWidth !== void 0 ? cropMaxWidth : undefined,
    maxHeight: cropMaxHeight !== null && cropMaxHeight !== void 0 ? cropMaxHeight : undefined
  }, /*#__PURE__*/React.createElement("img", {
    src: (_fullsizePhoto$url = fullsizePhoto === null || fullsizePhoto === void 0 ? void 0 : fullsizePhoto.url) !== null && _fullsizePhoto$url !== void 0 ? _fullsizePhoto$url : '',
    width: fullsizePhoto === null || fullsizePhoto === void 0 ? void 0 : fullsizePhoto.width,
    height: fullsizePhoto === null || fullsizePhoto === void 0 ? void 0 : fullsizePhoto.height,
    style: {
      maxWidth: '100%',
      height: 'auto'
    },
    alt: "",
    ref: setReactCropImageRef
  })))));
};
/* harmony default export */ __webpack_exports__["default"] = (CropScreen);

/***/ }),

/***/ "./src/utils/CalculateAspectRatioFromPixels.js":
/*!*****************************************************!*\
  !*** ./src/utils/CalculateAspectRatioFromPixels.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/**
 * Returns an aspect ratio in human readable format.
 *
 * @param {number} width  Width in pixels.
 * @param {number} height Height in pixels.
 * @return {string} Aspect ratio in human readable format.
 */
var CalculateAspectRatioFromPixels = function CalculateAspectRatioFromPixels(width, height) {
  console.log(width, height);
  // Find the greatest common factor
  function findGCF(a, b) {
    return b === 0 ? a : findGCF(b, a % b);
  }
  var gcf = findGCF(width, height);

  // Simplify the ratio
  var simplifiedWidth = width / gcf;
  var simplifiedHeight = height / gcf;

  // Format the ratio as "X:Y"
  return {
    width: simplifiedWidth,
    height: simplifiedHeight
  };
};
/* harmony default export */ __webpack_exports__["default"] = (CalculateAspectRatioFromPixels);

/***/ }),

/***/ "./src/utils/CalculateDimensionsFromAspectRatio.js":
/*!*********************************************************!*\
  !*** ./src/utils/CalculateDimensionsFromAspectRatio.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
/**
 * Returns an aspect ratio in human readable format.
 *
 * @param {string} aspectRatio Aspect ratio in human readable format.
 * @param {number} width       Width in pixels.
 * @return {string} Aspect ratio in human readable format.
 */
var CalculateDimensionsFromAspectRatio = function CalculateDimensionsFromAspectRatio(aspectRatio, width) {
  // Split the aspect ratio into its components.
  var _aspectRatio$split$ma = aspectRatio.split(':').map(parseFloat),
    _aspectRatio$split$ma2 = _slicedToArray(_aspectRatio$split$ma, 2),
    x = _aspectRatio$split$ma2[0],
    y = _aspectRatio$split$ma2[1];

  // Calculate the height from the width and aspect ratio.
  var height = Math.round(width * (y / x));

  // Return width/height.
  return {
    width: width,
    height: height
  };
};
/* harmony default export */ __webpack_exports__["default"] = (CalculateDimensionsFromAspectRatio);

/***/ }),

/***/ "./src/components/ToolbarAspectRatio/editor.scss":
/*!*******************************************************!*\
  !*** ./src/components/ToolbarAspectRatio/editor.scss ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/screens/Crop/editor.scss":
/*!**************************************!*\
  !*** ./src/screens/Crop/editor.scss ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

}]);
//# sourceMappingURL=CropScreen.0.0.2.js.map