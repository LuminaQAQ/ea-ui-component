(()=>{"use strict";class n extends HTMLElement{constructor(){super();const n=this.attachShadow({mode:"open"}),o=document.createElement("input");o.type="button",o.value="click",o.className="__ea-button";const r=document.createElement("style");r.textContent='\n@charset "UTF-8";\n/**\n* $type: 按钮类型的类名\n* $border: 边框颜色\n* $text: 文字颜色\n* $bgc: 背景颜色\n*/\n.__ea-button {\n  box-sizing: border-box;\n  padding: 0.5rem 1rem;\n  cursor: pointer;\n  font-size: 1rem;\n  line-height: 1.25;\n  font-weight: 500;\n  transition: background-color 0.1s, color 0.1s;\n  border-radius: 5px;\n}\n.__ea-button.normal {\n  border: 1px solid #dcdfe6;\n  color: #606266;\n  background-color: transparent;\n  /* ------- 按钮样式 ------- */\n  /* #region  */\n  /* #endregion */\n  /* ------- end  ------- */\n}\n.__ea-button.normal.disabled {\n  cursor: not-allowed !important;\n  background-image: none !important;\n  background-color: rgba(64, 64, 64, 0) !important;\n  border-color: white !important;\n  color: white !important;\n  border-color: #ebedf1 !important;\n  color: #babcbe !important;\n}\n.__ea-button.normal.plain {\n  background-color: rgba(92, 92, 92, 0);\n  border: 1px solid white;\n  color: transparent;\n  background-color: transparent;\n  border: 1px solid #dcdfe6;\n  color: #606266;\n}\n.__ea-button.normal.plain:hover {\n  background-color: transparent;\n}\n.__ea-button.normal.round {\n  border-radius: 999px;\n}\n.__ea-button.normal:hover {\n  border: 1px solid rgba(160, 207, 255, 0.4);\n  color: #3a9bff;\n  background-color: rgba(160, 207, 255, 0.05);\n}\n.__ea-button.normal:active {\n  background-color: rgba(7, 130, 255, 0.05);\n  border: 1px solid rgba(33, 143, 255, 0.4);\n}\n.__ea-button.primary {\n  border: 1px solid #409eff;\n  color: #fff;\n  background-color: #409eff;\n  /* ------- 按钮样式 ------- */\n  /* #region  */\n  /* #endregion */\n  /* ------- end  ------- */\n}\n.__ea-button.primary.disabled {\n  cursor: not-allowed !important;\n  background-image: none !important;\n  background-color: #c0dfff !important;\n  border-color: #c0dfff !important;\n  color: white !important;\n}\n.__ea-button.primary.plain {\n  background-color: #f8fbff;\n  border: 1px solid #c0dfff;\n  color: #409eff;\n}\n.__ea-button.primary.round {\n  border-radius: 999px;\n}\n.__ea-button.primary:hover {\n  border: 1px solid #73b8ff;\n  color: white;\n  background-color: #73b8ff;\n}\n.__ea-button.primary:active {\n  background-color: #006bd9;\n}\n.__ea-button.success {\n  border: 1px solid #67c23a;\n  color: #fff;\n  background-color: #67c23a;\n  /* ------- 按钮样式 ------- */\n  /* #region  */\n  /* #endregion */\n  /* ------- end  ------- */\n}\n.__ea-button.success.disabled {\n  cursor: not-allowed !important;\n  background-image: none !important;\n  background-color: #b2e19b !important;\n  border-color: #b2e19b !important;\n  color: white !important;\n}\n.__ea-button.success.plain {\n  background-color: #d3eec6;\n  border: 1px solid #b2e19b;\n  color: #67c23a;\n}\n.__ea-button.success.round {\n  border-radius: 999px;\n}\n.__ea-button.success:hover {\n  border: 1px solid #85cf60;\n  color: white;\n  background-color: #85cf60;\n}\n.__ea-button.success:active {\n  background-color: #3d7323;\n}\n.__ea-button.info {\n  border: 1px solid #909399;\n  color: #fff;\n  background-color: #909399;\n  /* ------- 按钮样式 ------- */\n  /* #region  */\n  /* #endregion */\n  /* ------- end  ------- */\n}\n.__ea-button.info.disabled {\n  cursor: not-allowed !important;\n  background-image: none !important;\n  background-color: #d2d4d6 !important;\n  border-color: #d2d4d6 !important;\n  color: white !important;\n}\n.__ea-button.info.plain {\n  background-color: #f0f0f1;\n  border: 1px solid #d2d4d6;\n  color: #909399;\n}\n.__ea-button.info.round {\n  border-radius: 999px;\n}\n.__ea-button.info:hover {\n  border: 1px solid #abadb1;\n  color: white;\n  background-color: #abadb1;\n}\n.__ea-button.info:active {\n  background-color: #5d6066;\n}\n.__ea-button.warning {\n  border: 1px solid #e6a23c;\n  color: #fff;\n  background-color: #e6a23c;\n  /* ------- 按钮样式 ------- */\n  /* #region  */\n  /* #endregion */\n  /* ------- end  ------- */\n}\n.__ea-button.warning.disabled {\n  cursor: not-allowed !important;\n  background-image: none !important;\n  background-color: #f4d8ad !important;\n  border-color: #f4d8ad !important;\n  color: white !important;\n}\n.__ea-button.warning.plain {\n  background-color: #fbf0df;\n  border: 1px solid #f4d8ad;\n  color: #e6a23c;\n}\n.__ea-button.warning.round {\n  border-radius: 999px;\n}\n.__ea-button.warning:hover {\n  border: 1px solid #ecb869;\n  color: white;\n  background-color: #ecb869;\n}\n.__ea-button.warning:active {\n  background-color: #a76d15;\n}\n.__ea-button.danger {\n  border: 1px solid #f56c6c;\n  color: #fff;\n  background-color: #f56c6c;\n  /* ------- 按钮样式 ------- */\n  /* #region  */\n  /* #endregion */\n  /* ------- end  ------- */\n}\n.__ea-button.danger.disabled {\n  cursor: not-allowed !important;\n  background-image: none !important;\n  background-color: #fde3e3 !important;\n  border-color: #fde3e3 !important;\n  color: white !important;\n}\n.__ea-button.danger.plain {\n  background-color: white;\n  border: 1px solid #fde3e3;\n  color: #f56c6c;\n  background-color: #fde8e8;\n}\n.__ea-button.danger.round {\n  border-radius: 999px;\n}\n.__ea-button.danger:hover {\n  border: 1px solid #f89c9c;\n  color: white;\n  background-color: #f89c9c;\n}\n.__ea-button.danger:active {\n  background-color: #eb1010;\n}\n',n.appendChild(r),n.appendChild(o)}get BUTTON_STYLE(){return["plain","round"]}get disabled(){return null!==this.getAttribute("disabled")}get ariaDisabled(){return null!==this.getAttribute("aria-disabled")}get value(){return this.getAttribute("value")}get innerHTMLValue(){return this.innerHTML}get ariaValueText(){return this.getAttribute("aria-valuetext")}get plain(){return void 0!==this.getAttribute("plain")&&null!==this.getAttribute("plain")}get round(){return void 0!==this.getAttribute("round")&&null!==this.getAttribute("round")}get type(){const n=this.getAttribute("type");return null==n||0==n?"normal":n}connectedCallback(){const n=this.shadowRoot.querySelector(".__ea-button");n.disabled=this.disabled,n.ariaDisabled=this.ariaDisabled,n.ariaValueText=this.ariaValueText,n.value=this.value,n.value=this.innerHTMLValue;for(let o,r=0;o=this.BUTTON_STYLE[r++];)if(this[o]){n.classList.add(o);break}(this.disabled||this.ariaDisabled)&&n.classList.add("disabled"),n.classList.add(this.type)}}customElements.define("ea-button",n)})();