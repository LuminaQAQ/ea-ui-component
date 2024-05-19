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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ EaButton)\n/* harmony export */ });\n/* harmony import */ var _utils_setStyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/setStyle */ \"./utils/setStyle.js\");\n// @ts-nocheck\r\n\r\n\r\nconst styleSheet = `\r\n.__ea-button {\r\n  padding: 0.25rem 1rem;\r\n  cursor: pointer;\r\n  font-size: 1.25rem;\r\n  line-height: 1.25;\r\n  font-weight: 500;\r\n  transition: background-color 0.1s, color 0.1s;\r\n  border-radius: 5px;\r\n}\r\n.__ea-button.normal {\r\n  border: 1px solid #e6e6e6;\r\n  color: black;\r\n  background-color: transparent;\r\n}\r\n.__ea-button.normal.disabled {\r\n  cursor: not-allowed !important;\r\n  background-image: none !important;\r\n  background-color: rgba(64, 64, 64, 0) !important;\r\n  border-color: white !important;\r\n  color: #404040 !important;\r\n}\r\n.__ea-button.normal:hover {\r\n  border: 1px solid rgba(160, 207, 255, 0.4);\r\n  color: #3a9bff;\r\n  background-color: rgba(160, 207, 255, 0.05);\r\n}\r\n.__ea-button.primary {\r\n  border: 1px solid #409eff;\r\n  color: #ffffff;\r\n  background-color: #409eff;\r\n}\r\n.__ea-button.primary.disabled {\r\n  cursor: not-allowed !important;\r\n  background-image: none !important;\r\n  background-color: #c0dfff !important;\r\n  border-color: #c0dfff !important;\r\n  color: white !important;\r\n}\r\n.__ea-button.primary:hover {\r\n  border: 1px solid #a5d2ff;\r\n  color: #ffffff;\r\n  background-color: #a5d2ff;\r\n}\r\n`\r\n\r\nclass EaButton extends HTMLElement {\r\n    constructor() {\r\n        super();\r\n\r\n        const shadowRoot = this.attachShadow({ mode: 'open' });\r\n\r\n\r\n        const test = document.createElement('input');\r\n        test.type = 'button';\r\n        test.value = \"click\";\r\n        test.className = \"__ea-button\";\r\n\r\n        // setStyle(shadowRoot, new URL('./index.css', import.meta.url).href);\r\n        const style = document.createElement('style');\r\n        style.textContent = styleSheet;\r\n        shadowRoot.appendChild(style);\r\n\r\n        shadowRoot.appendChild(test);\r\n    }\r\n\r\n    get disabled() {\r\n        return this.getAttribute('disabled') !== null;\r\n    }\r\n\r\n    get checked() {\r\n        return this.getAttribute('checked');\r\n    }\r\n\r\n    get circle() {\r\n        return this.getAttribute('circle') !== null;\r\n    }\r\n\r\n    get type() {\r\n        const attr = this.getAttribute('type');\r\n        if (attr == null || attr == false) return 'normal';\r\n        else return attr;\r\n    }\r\n\r\n    connectedCallback() {\r\n        const button = this.shadowRoot.querySelector('.__ea-button');\r\n\r\n        button.disabled = this.disabled;\r\n        if (this.disabled) button.classList.add('disabled');\r\n        button.classList.add(this.type);\r\n    }\r\n}\n\n//# sourceURL=webpack://ea_ui_component/./components/ea-button/ea-button.js?");

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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;