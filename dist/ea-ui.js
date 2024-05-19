/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./components/ea-button/ea-button.js":
/*!*******************************************!*\
  !*** ./components/ea-button/ea-button.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ EaButton)\n/* harmony export */ });\n/* harmony import */ var _utils_setStyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/setStyle */ \"./utils/setStyle.js\");\n// @ts-nocheck\r\n\r\n\r\nclass EaButton extends HTMLElement {\r\n    constructor() {\r\n        super();\r\n\r\n        const shadowRoot = this.attachShadow({ mode: 'open' });\r\n\r\n\r\n        const test = document.createElement('input');\r\n        test.type = 'button';\r\n        test.value = \"click\";\r\n        test.className = \"__ea-button\";\r\n\r\n        (0,_utils_setStyle__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(shadowRoot, new URL(/* asset import */ __webpack_require__(/*! ./index.css */ \"./components/ea-button/index.css\"), __webpack_require__.b).href);\r\n        shadowRoot.appendChild(test);\r\n    }\r\n\r\n    get disabled() {\r\n        return this.getAttribute('disabled') !== null;\r\n    }\r\n\r\n    get checked() {\r\n        return this.getAttribute('checked');\r\n    }\r\n\r\n    get circle() {\r\n        return this.getAttribute('circle') !== null;\r\n    }\r\n\r\n    get type() {\r\n        const attr = this.getAttribute('type');\r\n        if (attr == null || attr == false) return 'normal';\r\n        else return attr;\r\n    }\r\n\r\n    connectedCallback() {\r\n        const button = this.shadowRoot.querySelector('.__ea-button');\r\n\r\n        button.disabled = this.disabled;\r\n        if (this.disabled) button.classList.add('disabled');\r\n        button.classList.add(this.type);\r\n    }\r\n}\n\n//# sourceURL=webpack://ea_ui_component/./components/ea-button/ea-button.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_ea_button_ea_button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/ea-button/ea-button */ \"./components/ea-button/ea-button.js\");\n\r\n\r\ncustomElements.define(\"ea-button\", _components_ea_button_ea_button__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n//# sourceURL=webpack://ea_ui_component/./index.js?");

/***/ }),

/***/ "./utils/setStyle.js":
/*!***************************!*\
  !*** ./utils/setStyle.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ setStyle)\n/* harmony export */ });\nfunction setStyle(shadowRoot, href) {\r\n    const link = document.createElement('link');\r\n\r\n    link.href = href;\r\n    link.rel = \"stylesheet\";\r\n\r\n    shadowRoot.appendChild(link);\r\n}\n\n//# sourceURL=webpack://ea_ui_component/./utils/setStyle.js?");

/***/ }),

/***/ "./components/ea-button/index.css":
/*!****************************************!*\
  !*** ./components/ea-button/index.css ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"85bff677a7db3a9e6db4.css\";\n\n//# sourceURL=webpack://ea_ui_component/./components/ea-button/index.css?");

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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;