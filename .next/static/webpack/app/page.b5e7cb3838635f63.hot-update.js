"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./src/component/ImageOCR/ImageProcessor.tsx":
/*!***************************************************!*\
  !*** ./src/component/ImageOCR/ImageProcessor.tsx ***!
  \***************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _swc_helpers_async_to_generator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @swc/helpers/_/_async_to_generator */ \"(app-pages-browser)/./node_modules/@swc/helpers/esm/_async_to_generator.js\");\n/* harmony import */ var _swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @swc/helpers/_/_sliced_to_array */ \"(app-pages-browser)/./node_modules/@swc/helpers/esm/_sliced_to_array.js\");\n/* harmony import */ var _swc_helpers_to_consumable_array__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @swc/helpers/_/_to_consumable_array */ \"(app-pages-browser)/./node_modules/@swc/helpers/esm/_to_consumable_array.js\");\n/* harmony import */ var _swc_helpers_ts_generator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @swc/helpers/_/_ts_values */ \"(app-pages-browser)/./node_modules/tslib/tslib.es6.mjs\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var tesseract_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tesseract.js */ \"(app-pages-browser)/./node_modules/tesseract.js/src/index.js\");\n/* harmony import */ var tesseract_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(tesseract_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _util_filterData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../util/filterData */ \"(app-pages-browser)/./src/util/filterData.ts\");\n/* harmony import */ var react_hot_toast__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-hot-toast */ \"(app-pages-browser)/./node_modules/react-hot-toast/dist/index.mjs\");\n\n\n\n\n\nvar _this = undefined;\n\nvar _s = $RefreshSig$();\n\n\n\n\nvar ImageProcessor = function(param) {\n    var selectedImages = param.selectedImages, setNames = param.setNames, setPhoneNumbers = param.setPhoneNumbers;\n    _s();\n    var _useState = (0,_swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_5__._)((0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false), 2), isLoading = _useState[0], setIsLoading = _useState[1];\n    var formatPhoneNumber = function(phoneNumber) {\n        var countryCode = \"+52\";\n        var mobilePrefix = \"1\";\n        // Si el número no incluye el código de país y el prefijo móvil, agrégalo.\n        if (!phoneNumber.startsWith(countryCode)) {\n            return \"\".concat(countryCode, \" \").concat(mobilePrefix, \" \").concat(phoneNumber);\n        }\n        // Devuelve el número sin modificación si ya está en el formato correcto\n        return phoneNumber;\n    };\n    var preprocessImage = function(image) {\n        var zoomFactor = 1.2; // Factor de zoom del 110%\n        var canvas = document.createElement(\"canvas\");\n        var ctx = canvas.getContext(\"2d\");\n        if (!ctx) {\n            throw new Error(\"No se pudo obtener el contexto 2D del canvas\");\n        }\n        // Ajustar el tamaño del canvas para el zoom\n        canvas.width = image.width * zoomFactor;\n        canvas.height = image.height * zoomFactor;\n        // Dibujar la imagen escalada en el canvas\n        ctx.drawImage(image, 0, 0, image.width * zoomFactor, image.height * zoomFactor);\n        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);\n        var data = imageData.data;\n        // Aplicar escala de grises tenue\n        for(var i = 0; i < data.length; i += 4){\n            var red = data[i];\n            var green = data[i + 1];\n            var blue = data[i + 2];\n            // Convertir a escala de grises con un factor\n            var grayscale = 0.3 * red + 0.5 * green + 0.5 * blue;\n            // Aplicar un factor de intensidad para un efecto tenue\n            var factor = 0.7; // Ajusta este valor para obtener el nivel deseado de gris\n            data[i] = grayscale * factor; // Red\n            data[i + 1] = grayscale * factor; // Green\n            data[i + 2] = grayscale * factor; // Blue\n        }\n        ctx.putImageData(imageData, 0, 0);\n        return canvas;\n    };\n    var processImages = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(/*#__PURE__*/ (0,_swc_helpers_async_to_generator__WEBPACK_IMPORTED_MODULE_6__._)(function() {\n        var allNames, allPhoneNumbers, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step, err, maxLength, finalNames, finalPhoneNumbers;\n        return (0,_swc_helpers_ts_generator__WEBPACK_IMPORTED_MODULE_7__.__generator)(this, function(_state) {\n            switch(_state.label){\n                case 0:\n                    setIsLoading(true); // Inicia la carga\n                    allNames = [];\n                    allPhoneNumbers = [];\n                    _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;\n                    _state.label = 1;\n                case 1:\n                    _state.trys.push([\n                        1,\n                        6,\n                        7,\n                        8\n                    ]);\n                    _loop = function() {\n                        var image, _allNames, _allPhoneNumbers, img, preprocessedCanvas, preprocessedImage, _ref, text, _filterData, parsedNames, parsedPhoneNumbers, formattedPhoneNumbers, error;\n                        return (0,_swc_helpers_ts_generator__WEBPACK_IMPORTED_MODULE_7__.__generator)(this, function(_state) {\n                            switch(_state.label){\n                                case 0:\n                                    image = _step.value;\n                                    _state.label = 1;\n                                case 1:\n                                    _state.trys.push([\n                                        1,\n                                        4,\n                                        ,\n                                        5\n                                    ]);\n                                    img = new Image();\n                                    img.src = image;\n                                    return [\n                                        4,\n                                        new Promise(function(resolve) {\n                                            img.onload = resolve;\n                                        })\n                                    ];\n                                case 2:\n                                    _state.sent();\n                                    preprocessedCanvas = preprocessImage(img);\n                                    preprocessedImage = preprocessedCanvas.toDataURL(\"image/png\");\n                                    return [\n                                        4,\n                                        tesseract_js__WEBPACK_IMPORTED_MODULE_2___default().recognize(preprocessedImage, \"eng\")\n                                    ];\n                                case 3:\n                                    _ref = _state.sent(), text = _ref.data.text;\n                                    // Parse text and filter data\n                                    _filterData = (0,_util_filterData__WEBPACK_IMPORTED_MODULE_3__.filterData)(text), parsedNames = _filterData.names, parsedPhoneNumbers = _filterData.phoneNumbers;\n                                    formattedPhoneNumbers = parsedPhoneNumbers.map(formatPhoneNumber);\n                                    if (parsedNames.length === 0 && parsedPhoneNumbers.length === 0) {\n                                        (0,react_hot_toast__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(\"No se encontraron nombres o n\\xfameros de tel\\xe9fono en la imagen\");\n                                    }\n                                    (_allNames = allNames).push.apply(_allNames, (0,_swc_helpers_to_consumable_array__WEBPACK_IMPORTED_MODULE_8__._)(parsedNames));\n                                    (_allPhoneNumbers = allPhoneNumbers).push.apply(_allPhoneNumbers, (0,_swc_helpers_to_consumable_array__WEBPACK_IMPORTED_MODULE_8__._)(formattedPhoneNumbers));\n                                    return [\n                                        3,\n                                        5\n                                    ];\n                                case 4:\n                                    error = _state.sent();\n                                    console.error(\"Error durante el reconocimiento de texto:\", error);\n                                    return [\n                                        3,\n                                        5\n                                    ];\n                                case 5:\n                                    return [\n                                        2\n                                    ];\n                            }\n                        });\n                    };\n                    _iterator = selectedImages[Symbol.iterator]();\n                    _state.label = 2;\n                case 2:\n                    if (!!(_iteratorNormalCompletion = (_step = _iterator.next()).done)) return [\n                        3,\n                        5\n                    ];\n                    return [\n                        5,\n                        (0,_swc_helpers_ts_generator__WEBPACK_IMPORTED_MODULE_7__.__values)(_loop())\n                    ];\n                case 3:\n                    _state.sent();\n                    _state.label = 4;\n                case 4:\n                    _iteratorNormalCompletion = true;\n                    return [\n                        3,\n                        2\n                    ];\n                case 5:\n                    return [\n                        3,\n                        8\n                    ];\n                case 6:\n                    err = _state.sent();\n                    _didIteratorError = true;\n                    _iteratorError = err;\n                    return [\n                        3,\n                        8\n                    ];\n                case 7:\n                    try {\n                        if (!_iteratorNormalCompletion && _iterator[\"return\"] != null) {\n                            _iterator[\"return\"]();\n                        }\n                    } finally{\n                        if (_didIteratorError) {\n                            throw _iteratorError;\n                        }\n                    }\n                    return [\n                        7\n                    ];\n                case 8:\n                    // Ensure arrays are the same length\n                    maxLength = Math.max(allNames.length, allPhoneNumbers.length);\n                    finalNames = allNames.slice(0, maxLength);\n                    finalPhoneNumbers = allPhoneNumbers.slice(0, maxLength);\n                    // Fill missing values with an empty string\n                    while(finalNames.length < maxLength)finalNames.push(\"\");\n                    while(finalPhoneNumbers.length < maxLength)finalPhoneNumbers.push(\"00000\");\n                    setNames(finalNames);\n                    setPhoneNumbers(finalPhoneNumbers);\n                    return [\n                        2\n                    ];\n            }\n        });\n    }), [\n        selectedImages,\n        setNames,\n        setPhoneNumbers\n    ]);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function() {\n        if (selectedImages.length > 0) {\n            processImages();\n        }\n    }, [\n        selectedImages,\n        processImages\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {}, void 0, false, {\n        fileName: \"/home/ivan/house/src/component/ImageOCR/ImageProcessor.tsx\",\n        lineNumber: 122,\n        columnNumber: 5\n    }, _this);\n};\n_s(ImageProcessor, \"UaTviOFfFJRP1ieaCE52r/ILFAw=\");\n_c = ImageProcessor;\n/* harmony default export */ __webpack_exports__[\"default\"] = (ImageProcessor);\nvar _c;\n$RefreshReg$(_c, \"ImageProcessor\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnQvSW1hZ2VPQ1IvSW1hZ2VQcm9jZXNzb3IudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQWdFO0FBQzNCO0FBQ2M7QUFDZjtBQVFwQyxJQUFNTyxpQkFBZ0Q7UUFBR0MsdUJBQUFBLGdCQUFnQkMsaUJBQUFBLFVBQVVDLHdCQUFBQTs7SUFDakYsSUFBa0NQLFlBQUFBLCtEQUFBQSxDQUFBQSwrQ0FBUUEsQ0FBQyxZQUFwQ1EsWUFBMkJSLGNBQWhCUyxlQUFnQlQ7SUFFbEMsSUFBTVUsb0JBQW9CLFNBQUNDO1FBQ3pCLElBQU1DLGNBQWM7UUFDcEIsSUFBTUMsZUFBZTtRQUVyQiwwRUFBMEU7UUFDMUUsSUFBSSxDQUFDRixZQUFZRyxVQUFVLENBQUNGLGNBQWM7WUFDeEMsT0FBTyxHQUFrQkMsT0FBZkQsYUFBWSxLQUFtQkQsT0FBaEJFLGNBQWEsS0FBZSxPQUFaRjtRQUMzQztRQUVBLHdFQUF3RTtRQUN4RSxPQUFPQTtJQUNUO0lBQ0EsSUFBTUksa0JBQWtCLFNBQUNDO1FBQ3ZCLElBQU1DLGFBQWEsS0FBSywwQkFBMEI7UUFDbEQsSUFBTUMsU0FBU0MsU0FBU0MsYUFBYSxDQUFDO1FBQ3RDLElBQU1DLE1BQU1ILE9BQU9JLFVBQVUsQ0FBQztRQUU5QixJQUFJLENBQUNELEtBQUs7WUFDUixNQUFNLElBQUlFLE1BQU07UUFDbEI7UUFFQSw0Q0FBNEM7UUFDNUNMLE9BQU9NLEtBQUssR0FBR1IsTUFBTVEsS0FBSyxHQUFHUDtRQUM3QkMsT0FBT08sTUFBTSxHQUFHVCxNQUFNUyxNQUFNLEdBQUdSO1FBRS9CLDBDQUEwQztRQUMxQ0ksSUFBSUssU0FBUyxDQUFDVixPQUFPLEdBQUcsR0FBR0EsTUFBTVEsS0FBSyxHQUFHUCxZQUFZRCxNQUFNUyxNQUFNLEdBQUdSO1FBRXBFLElBQU1VLFlBQVlOLElBQUlPLFlBQVksQ0FBQyxHQUFHLEdBQUdWLE9BQU9NLEtBQUssRUFBRU4sT0FBT08sTUFBTTtRQUNwRSxJQUFNSSxPQUFPRixVQUFVRSxJQUFJO1FBRTNCLGlDQUFpQztRQUNqQyxJQUFLLElBQUlDLElBQUksR0FBR0EsSUFBSUQsS0FBS0UsTUFBTSxFQUFFRCxLQUFLLEVBQUc7WUFDdkMsSUFBTUUsTUFBTUgsSUFBSSxDQUFDQyxFQUFFO1lBQ25CLElBQU1HLFFBQVFKLElBQUksQ0FBQ0MsSUFBSSxFQUFFO1lBQ3pCLElBQU1JLE9BQU9MLElBQUksQ0FBQ0MsSUFBSSxFQUFFO1lBRXhCLDZDQUE2QztZQUM3QyxJQUFNSyxZQUFZLE1BQU1ILE1BQU0sTUFBTUMsUUFBUSxNQUFNQztZQUVsRCx1REFBdUQ7WUFDdkQsSUFBTUUsU0FBUyxLQUFLLDBEQUEwRDtZQUM5RVAsSUFBSSxDQUFDQyxFQUFFLEdBQUdLLFlBQVlDLFFBQVEsTUFBTTtZQUNwQ1AsSUFBSSxDQUFDQyxJQUFJLEVBQUUsR0FBR0ssWUFBWUMsUUFBUSxRQUFRO1lBQzFDUCxJQUFJLENBQUNDLElBQUksRUFBRSxHQUFHSyxZQUFZQyxRQUFRLE9BQU87UUFDM0M7UUFDQWYsSUFBSWdCLFlBQVksQ0FBQ1YsV0FBVyxHQUFHO1FBRS9CLE9BQU9UO0lBQ1Q7SUFFQSxJQUFNb0IsZ0JBQWdCdkMsa0RBQVdBLGVBQUM7WUFJMUJ3QyxVQUNBQyxpQkFFRCw0RkE4QkNDLFdBQ0FDLFlBQ0FDOzs7O29CQXJDTmxDLGFBQWEsT0FBTyxrQkFBa0I7b0JBRWhDOEI7b0JBQ0FDO29CQUVEOzs7Ozs7Ozs7OzRCQUFNeEIsT0FzQlB1QixXQUNBQyxrQkFyQk1JLEtBT0FDLG9CQUNBQyxtQkFFcUIsTUFBWEMsTUFHaUQ3QyxhQUFsRDhDLGFBQTJCQyxvQkFDcENDLHVCQVFDQzs7OztvQ0F4QkFuQyxRQUFOOzs7Ozs7Ozs7b0NBRUs0QixNQUFNLElBQUlRO29DQUNoQlIsSUFBSVMsR0FBRyxHQUFHckM7b0NBRVY7O3dDQUFNLElBQUlzQyxRQUFRLFNBQUNDOzRDQUNqQlgsSUFBSVksTUFBTSxHQUFHRDt3Q0FDZjs7O29DQUZBO29DQUlNVixxQkFBcUI5QixnQkFBZ0I2QjtvQ0FDckNFLG9CQUFvQkQsbUJBQW1CWSxTQUFTLENBQUM7b0NBRTVCOzt3Q0FBTXhELDZEQUFtQixDQUFDNkMsbUJBQW1COzs7b0NBQTdDLHNCQUFYQyxPQUFXLEtBQW5CbEIsS0FBUWtCO29DQUVoQiw2QkFBNkI7b0NBQ29DN0MsY0FBQUEsNERBQVVBLENBQUM2QyxPQUE3REMsY0FBa0Q5QyxZQUF6RHlELE9BQWtDVixxQkFBdUIvQyxZQUFyQzBEO29DQUN0QlYsd0JBQXdCRCxtQkFBbUJZLEdBQUcsQ0FBQ25EO29DQUNyRCxJQUFHc0MsWUFBWWpCLE1BQU0sS0FBSSxLQUFLa0IsbUJBQW1CbEIsTUFBTSxLQUFJLEdBQUU7d0NBRTdENUIsMkRBQUtBLENBQUM7b0NBQ047b0NBRUFvQyxDQUFBQSxZQUFBQSxVQUFTdUIsSUFBSSxDQUFidkIsTUFBQUEsV0FBYyxvRUFBR1M7b0NBQ2pCUixDQUFBQSxtQkFBQUEsaUJBQWdCc0IsSUFBSSxDQUFwQnRCLE1BQUFBLGtCQUFxQixvRUFBR1U7Ozs7OztvQ0FDakJDO29DQUNQWSxRQUFRWixLQUFLLENBQUMsNkNBQTZDQTs7Ozs7Ozs7Ozs7b0JBRS9EO29CQTNCSyxZQUFlOUM7OzsyQkFBZjs7Ozs7Ozs7Ozs7O29CQUFBOzs7Ozs7Ozs7Ozs7b0JBQUE7b0JBQUE7Ozs7Ozs7NkJBQUE7NEJBQUE7Ozs0QkFBQTtrQ0FBQTs7Ozs7OztvQkE2Qkwsb0NBQW9DO29CQUM5Qm9DLFlBQVl1QixLQUFLQyxHQUFHLENBQUMxQixTQUFTUixNQUFNLEVBQUVTLGdCQUFnQlQsTUFBTTtvQkFDNURXLGFBQWFILFNBQVMyQixLQUFLLENBQUMsR0FBR3pCO29CQUMvQkUsb0JBQW9CSCxnQkFBZ0IwQixLQUFLLENBQUMsR0FBR3pCO29CQUVuRCwyQ0FBMkM7b0JBQzNDLE1BQU9DLFdBQVdYLE1BQU0sR0FBR1UsVUFBV0MsV0FBV29CLElBQUksQ0FBQztvQkFDdEQsTUFBT25CLGtCQUFrQlosTUFBTSxHQUFHVSxVQUFXRSxrQkFBa0JtQixJQUFJLENBQUM7b0JBRXBFeEQsU0FBU29DO29CQUNUbkMsZ0JBQWdCb0M7Ozs7OztJQUNsQixJQUFHO1FBQUN0QztRQUFnQkM7UUFBVUM7S0FBZ0I7SUFFOUNULGdEQUFTQSxDQUFDO1FBQ1IsSUFBSU8sZUFBZTBCLE1BQU0sR0FBRyxHQUFHO1lBQzdCTztRQUNGO0lBQ0YsR0FBRztRQUFDakM7UUFBZ0JpQztLQUFjO0lBRWxDLHFCQUNFLDhEQUFDNkI7Ozs7O0FBSUw7R0FsSE0vRDtLQUFBQTtBQW9ITiwrREFBZUEsY0FBY0EsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvY29tcG9uZW50L0ltYWdlT0NSL0ltYWdlUHJvY2Vzc29yLnRzeD8zYTdlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZUNhbGxiYWNrLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBUZXNzZXJhY3QgZnJvbSAndGVzc2VyYWN0LmpzJztcbmltcG9ydCB7IGZpbHRlckRhdGEgfSBmcm9tICcuLi8uLi91dGlsL2ZpbHRlckRhdGEnO1xuaW1wb3J0IHRvYXN0IGZyb20gJ3JlYWN0LWhvdC10b2FzdCc7XG5cbmludGVyZmFjZSBJbWFnZVByb2Nlc3NvclByb3BzIHtcbiAgc2VsZWN0ZWRJbWFnZXM6IHN0cmluZ1tdO1xuICBzZXROYW1lczogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nW10+PjtcbiAgc2V0UGhvbmVOdW1iZXJzOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmdbXT4+O1xufVxuXG5jb25zdCBJbWFnZVByb2Nlc3NvcjogUmVhY3QuRkM8SW1hZ2VQcm9jZXNzb3JQcm9wcz4gPSAoeyBzZWxlY3RlZEltYWdlcywgc2V0TmFtZXMsIHNldFBob25lTnVtYmVycyB9KSA9PiB7XG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgY29uc3QgZm9ybWF0UGhvbmVOdW1iZXIgPSAocGhvbmVOdW1iZXI6IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IGNvdW50cnlDb2RlID0gXCIrNTJcIjtcbiAgICBjb25zdCBtb2JpbGVQcmVmaXggPSBcIjFcIjtcbiAgICBcbiAgICAvLyBTaSBlbCBuw7ptZXJvIG5vIGluY2x1eWUgZWwgY8OzZGlnbyBkZSBwYcOtcyB5IGVsIHByZWZpam8gbcOzdmlsLCBhZ3LDqWdhbG8uXG4gICAgaWYgKCFwaG9uZU51bWJlci5zdGFydHNXaXRoKGNvdW50cnlDb2RlKSkge1xuICAgICAgcmV0dXJuIGAke2NvdW50cnlDb2RlfSAke21vYmlsZVByZWZpeH0gJHtwaG9uZU51bWJlcn1gO1xuICAgIH1cbiAgICBcbiAgICAvLyBEZXZ1ZWx2ZSBlbCBuw7ptZXJvIHNpbiBtb2RpZmljYWNpw7NuIHNpIHlhIGVzdMOhIGVuIGVsIGZvcm1hdG8gY29ycmVjdG9cbiAgICByZXR1cm4gcGhvbmVOdW1iZXI7XG4gIH07XG4gIGNvbnN0IHByZXByb2Nlc3NJbWFnZSA9IChpbWFnZTogSFRNTEltYWdlRWxlbWVudCk6IEhUTUxDYW52YXNFbGVtZW50ID0+IHtcbiAgICBjb25zdCB6b29tRmFjdG9yID0gMS4yOyAvLyBGYWN0b3IgZGUgem9vbSBkZWwgMTEwJVxuICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIFxuICAgIGlmICghY3R4KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHNlIHB1ZG8gb2J0ZW5lciBlbCBjb250ZXh0byAyRCBkZWwgY2FudmFzJyk7XG4gICAgfVxuXG4gICAgLy8gQWp1c3RhciBlbCB0YW1hw7FvIGRlbCBjYW52YXMgcGFyYSBlbCB6b29tXG4gICAgY2FudmFzLndpZHRoID0gaW1hZ2Uud2lkdGggKiB6b29tRmFjdG9yO1xuICAgIGNhbnZhcy5oZWlnaHQgPSBpbWFnZS5oZWlnaHQgKiB6b29tRmFjdG9yO1xuXG4gICAgLy8gRGlidWphciBsYSBpbWFnZW4gZXNjYWxhZGEgZW4gZWwgY2FudmFzXG4gICAgY3R4LmRyYXdJbWFnZShpbWFnZSwgMCwgMCwgaW1hZ2Uud2lkdGggKiB6b29tRmFjdG9yLCBpbWFnZS5oZWlnaHQgKiB6b29tRmFjdG9yKTtcblxuICAgIGNvbnN0IGltYWdlRGF0YSA9IGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICBjb25zdCBkYXRhID0gaW1hZ2VEYXRhLmRhdGE7XG5cbiAgICAvLyBBcGxpY2FyIGVzY2FsYSBkZSBncmlzZXMgdGVudWVcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgIGNvbnN0IHJlZCA9IGRhdGFbaV07XG4gICAgICBjb25zdCBncmVlbiA9IGRhdGFbaSArIDFdO1xuICAgICAgY29uc3QgYmx1ZSA9IGRhdGFbaSArIDJdO1xuICAgICAgXG4gICAgICAvLyBDb252ZXJ0aXIgYSBlc2NhbGEgZGUgZ3Jpc2VzIGNvbiB1biBmYWN0b3JcbiAgICAgIGNvbnN0IGdyYXlzY2FsZSA9IDAuMyAqIHJlZCArIDAuNSAqIGdyZWVuICsgMC41ICogYmx1ZTtcbiAgICAgIFxuICAgICAgLy8gQXBsaWNhciB1biBmYWN0b3IgZGUgaW50ZW5zaWRhZCBwYXJhIHVuIGVmZWN0byB0ZW51ZVxuICAgICAgY29uc3QgZmFjdG9yID0gMC43OyAvLyBBanVzdGEgZXN0ZSB2YWxvciBwYXJhIG9idGVuZXIgZWwgbml2ZWwgZGVzZWFkbyBkZSBncmlzXG4gICAgICBkYXRhW2ldID0gZ3JheXNjYWxlICogZmFjdG9yOyAvLyBSZWRcbiAgICAgIGRhdGFbaSArIDFdID0gZ3JheXNjYWxlICogZmFjdG9yOyAvLyBHcmVlblxuICAgICAgZGF0YVtpICsgMl0gPSBncmF5c2NhbGUgKiBmYWN0b3I7IC8vIEJsdWVcbiAgICB9XG4gICAgY3R4LnB1dEltYWdlRGF0YShpbWFnZURhdGEsIDAsIDApO1xuXG4gICAgcmV0dXJuIGNhbnZhcztcbiAgfTtcblxuICBjb25zdCBwcm9jZXNzSW1hZ2VzID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuXG4gICAgc2V0SXNMb2FkaW5nKHRydWUpOyAvLyBJbmljaWEgbGEgY2FyZ2FcblxuICAgIGNvbnN0IGFsbE5hbWVzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGNvbnN0IGFsbFBob25lTnVtYmVyczogc3RyaW5nW10gPSBbXTtcblxuICAgIGZvciAoY29uc3QgaW1hZ2Ugb2Ygc2VsZWN0ZWRJbWFnZXMpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICBpbWcuc3JjID0gaW1hZ2U7XG5cbiAgICAgICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICBpbWcub25sb2FkID0gcmVzb2x2ZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgcHJlcHJvY2Vzc2VkQ2FudmFzID0gcHJlcHJvY2Vzc0ltYWdlKGltZyk7XG4gICAgICAgIGNvbnN0IHByZXByb2Nlc3NlZEltYWdlID0gcHJlcHJvY2Vzc2VkQ2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvcG5nJyk7XG5cbiAgICAgICAgY29uc3QgeyBkYXRhOiB7IHRleHQgfSB9ID0gYXdhaXQgVGVzc2VyYWN0LnJlY29nbml6ZShwcmVwcm9jZXNzZWRJbWFnZSwgJ2VuZycsICk7XG5cbiAgICAgICAgLy8gUGFyc2UgdGV4dCBhbmQgZmlsdGVyIGRhdGFcbiAgICAgICAgY29uc3QgeyBuYW1lczogcGFyc2VkTmFtZXMsIHBob25lTnVtYmVyczogcGFyc2VkUGhvbmVOdW1iZXJzIH0gPSBmaWx0ZXJEYXRhKHRleHQpO1xuICAgICAgICBjb25zdCBmb3JtYXR0ZWRQaG9uZU51bWJlcnMgPSBwYXJzZWRQaG9uZU51bWJlcnMubWFwKGZvcm1hdFBob25lTnVtYmVyKTtcbiAgICAgICAgaWYocGFyc2VkTmFtZXMubGVuZ3RoID09PTAgJiYgcGFyc2VkUGhvbmVOdW1iZXJzLmxlbmd0aCA9PT0wKXtcbiAgICAgICAgXG4gICAgICAgIHRvYXN0KCdObyBzZSBlbmNvbnRyYXJvbiBub21icmVzIG8gbsO6bWVyb3MgZGUgdGVsw6lmb25vIGVuIGxhIGltYWdlbicpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWxsTmFtZXMucHVzaCguLi5wYXJzZWROYW1lcyk7XG4gICAgICAgIGFsbFBob25lTnVtYmVycy5wdXNoKC4uLmZvcm1hdHRlZFBob25lTnVtYmVycyk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBkdXJhbnRlIGVsIHJlY29ub2NpbWllbnRvIGRlIHRleHRvOicsIGVycm9yKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBFbnN1cmUgYXJyYXlzIGFyZSB0aGUgc2FtZSBsZW5ndGhcbiAgICBjb25zdCBtYXhMZW5ndGggPSBNYXRoLm1heChhbGxOYW1lcy5sZW5ndGgsIGFsbFBob25lTnVtYmVycy5sZW5ndGgpO1xuICAgIGNvbnN0IGZpbmFsTmFtZXMgPSBhbGxOYW1lcy5zbGljZSgwLCBtYXhMZW5ndGgpO1xuICAgIGNvbnN0IGZpbmFsUGhvbmVOdW1iZXJzID0gYWxsUGhvbmVOdW1iZXJzLnNsaWNlKDAsIG1heExlbmd0aCk7XG5cbiAgICAvLyBGaWxsIG1pc3NpbmcgdmFsdWVzIHdpdGggYW4gZW1wdHkgc3RyaW5nXG4gICAgd2hpbGUgKGZpbmFsTmFtZXMubGVuZ3RoIDwgbWF4TGVuZ3RoKSBmaW5hbE5hbWVzLnB1c2goJycpO1xuICAgIHdoaWxlIChmaW5hbFBob25lTnVtYmVycy5sZW5ndGggPCBtYXhMZW5ndGgpIGZpbmFsUGhvbmVOdW1iZXJzLnB1c2goJzAwMDAwJyk7XG5cbiAgICBzZXROYW1lcyhmaW5hbE5hbWVzKTtcbiAgICBzZXRQaG9uZU51bWJlcnMoZmluYWxQaG9uZU51bWJlcnMpO1xuICB9LCBbc2VsZWN0ZWRJbWFnZXMsIHNldE5hbWVzLCBzZXRQaG9uZU51bWJlcnNdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChzZWxlY3RlZEltYWdlcy5sZW5ndGggPiAwKSB7XG4gICAgICBwcm9jZXNzSW1hZ2VzKCk7XG4gICAgfVxuICB9LCBbc2VsZWN0ZWRJbWFnZXMsIHByb2Nlc3NJbWFnZXNdKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICB7LyogT3BjaW9uYWw6IE1vc3RyYXIgdW4gbWVuc2FqZSBvIGVsIHByb2dyZXNvIGRlbCBwcm9jZXNhbWllbnRvICovfVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgSW1hZ2VQcm9jZXNzb3I7XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VFZmZlY3QiLCJ1c2VDYWxsYmFjayIsInVzZVN0YXRlIiwiVGVzc2VyYWN0IiwiZmlsdGVyRGF0YSIsInRvYXN0IiwiSW1hZ2VQcm9jZXNzb3IiLCJzZWxlY3RlZEltYWdlcyIsInNldE5hbWVzIiwic2V0UGhvbmVOdW1iZXJzIiwiaXNMb2FkaW5nIiwic2V0SXNMb2FkaW5nIiwiZm9ybWF0UGhvbmVOdW1iZXIiLCJwaG9uZU51bWJlciIsImNvdW50cnlDb2RlIiwibW9iaWxlUHJlZml4Iiwic3RhcnRzV2l0aCIsInByZXByb2Nlc3NJbWFnZSIsImltYWdlIiwiem9vbUZhY3RvciIsImNhbnZhcyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImN0eCIsImdldENvbnRleHQiLCJFcnJvciIsIndpZHRoIiwiaGVpZ2h0IiwiZHJhd0ltYWdlIiwiaW1hZ2VEYXRhIiwiZ2V0SW1hZ2VEYXRhIiwiZGF0YSIsImkiLCJsZW5ndGgiLCJyZWQiLCJncmVlbiIsImJsdWUiLCJncmF5c2NhbGUiLCJmYWN0b3IiLCJwdXRJbWFnZURhdGEiLCJwcm9jZXNzSW1hZ2VzIiwiYWxsTmFtZXMiLCJhbGxQaG9uZU51bWJlcnMiLCJtYXhMZW5ndGgiLCJmaW5hbE5hbWVzIiwiZmluYWxQaG9uZU51bWJlcnMiLCJpbWciLCJwcmVwcm9jZXNzZWRDYW52YXMiLCJwcmVwcm9jZXNzZWRJbWFnZSIsInRleHQiLCJwYXJzZWROYW1lcyIsInBhcnNlZFBob25lTnVtYmVycyIsImZvcm1hdHRlZFBob25lTnVtYmVycyIsImVycm9yIiwiSW1hZ2UiLCJzcmMiLCJQcm9taXNlIiwicmVzb2x2ZSIsIm9ubG9hZCIsInRvRGF0YVVSTCIsInJlY29nbml6ZSIsIm5hbWVzIiwicGhvbmVOdW1iZXJzIiwibWFwIiwicHVzaCIsImNvbnNvbGUiLCJNYXRoIiwibWF4Iiwic2xpY2UiLCJkaXYiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/component/ImageOCR/ImageProcessor.tsx\n"));

/***/ })

});