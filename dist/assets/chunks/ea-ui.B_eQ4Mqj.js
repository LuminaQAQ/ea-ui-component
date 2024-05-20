(()=>{class e extends HTMLElement{constructor(){super();const n=this.attachShadow({mode:"open"}),o=document.createElement("input");o.type="button",o.value="click",o.className="__ea-button";const r=document.createElement("style");r.textContent=`
@charset "UTF-8";
/**
* $type: 按钮类型的类名
* $border: 边框颜色
* $text: 文字颜色
* $bgc: 背景颜色
*/
.__ea-button {
  box-sizing: border-box;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1.25;
  font-weight: 500;
  transition: background-color 0.1s, color 0.1s;
  border-radius: 5px;
}
.__ea-button.normal {
  border: 1px solid #dcdfe6;
  color: #606266;
  background-color: transparent;
  /* ------- 按钮样式 ------- */
  /* #region  */
  /* #endregion */
  /* ------- end  ------- */
}
.__ea-button.normal.disabled {
  cursor: not-allowed !important;
  background-image: none !important;
  background-color: rgba(64, 64, 64, 0) !important;
  border-color: white !important;
  color: white !important;
  border-color: #ebedf1 !important;
  color: #babcbe !important;
}
.__ea-button.normal.plain {
  background-color: rgba(92, 92, 92, 0);
  border: 1px solid white;
  color: transparent;
  background-color: transparent;
  border: 1px solid #dcdfe6;
  color: #606266;
}
.__ea-button.normal.plain:hover {
  background-color: transparent;
}
.__ea-button.normal.round {
  border-radius: 999px;
}
.__ea-button.normal:hover {
  border: 1px solid rgba(160, 207, 255, 0.4);
  color: #3a9bff;
  background-color: rgba(160, 207, 255, 0.05);
}
.__ea-button.normal:active {
  background-color: rgba(7, 130, 255, 0.05);
  border: 1px solid rgba(33, 143, 255, 0.4);
}
.__ea-button.primary {
  border: 1px solid #409eff;
  color: #fff;
  background-color: #409eff;
  /* ------- 按钮样式 ------- */
  /* #region  */
  /* #endregion */
  /* ------- end  ------- */
}
.__ea-button.primary.disabled {
  cursor: not-allowed !important;
  background-image: none !important;
  background-color: #c0dfff !important;
  border-color: #c0dfff !important;
  color: white !important;
}
.__ea-button.primary.plain {
  background-color: #f8fbff;
  border: 1px solid #c0dfff;
  color: #409eff;
}
.__ea-button.primary.round {
  border-radius: 999px;
}
.__ea-button.primary:hover {
  border: 1px solid #73b8ff;
  color: white;
  background-color: #73b8ff;
}
.__ea-button.primary:active {
  background-color: #006bd9;
}
.__ea-button.success {
  border: 1px solid #67c23a;
  color: #fff;
  background-color: #67c23a;
  /* ------- 按钮样式 ------- */
  /* #region  */
  /* #endregion */
  /* ------- end  ------- */
}
.__ea-button.success.disabled {
  cursor: not-allowed !important;
  background-image: none !important;
  background-color: #b2e19b !important;
  border-color: #b2e19b !important;
  color: white !important;
}
.__ea-button.success.plain {
  background-color: #d3eec6;
  border: 1px solid #b2e19b;
  color: #67c23a;
}
.__ea-button.success.round {
  border-radius: 999px;
}
.__ea-button.success:hover {
  border: 1px solid #85cf60;
  color: white;
  background-color: #85cf60;
}
.__ea-button.success:active {
  background-color: #3d7323;
}
.__ea-button.info {
  border: 1px solid #909399;
  color: #fff;
  background-color: #909399;
  /* ------- 按钮样式 ------- */
  /* #region  */
  /* #endregion */
  /* ------- end  ------- */
}
.__ea-button.info.disabled {
  cursor: not-allowed !important;
  background-image: none !important;
  background-color: #d2d4d6 !important;
  border-color: #d2d4d6 !important;
  color: white !important;
}
.__ea-button.info.plain {
  background-color: #f0f0f1;
  border: 1px solid #d2d4d6;
  color: #909399;
}
.__ea-button.info.round {
  border-radius: 999px;
}
.__ea-button.info:hover {
  border: 1px solid #abadb1;
  color: white;
  background-color: #abadb1;
}
.__ea-button.info:active {
  background-color: #5d6066;
}
.__ea-button.warning {
  border: 1px solid #e6a23c;
  color: #fff;
  background-color: #e6a23c;
  /* ------- 按钮样式 ------- */
  /* #region  */
  /* #endregion */
  /* ------- end  ------- */
}
.__ea-button.warning.disabled {
  cursor: not-allowed !important;
  background-image: none !important;
  background-color: #f4d8ad !important;
  border-color: #f4d8ad !important;
  color: white !important;
}
.__ea-button.warning.plain {
  background-color: #fbf0df;
  border: 1px solid #f4d8ad;
  color: #e6a23c;
}
.__ea-button.warning.round {
  border-radius: 999px;
}
.__ea-button.warning:hover {
  border: 1px solid #ecb869;
  color: white;
  background-color: #ecb869;
}
.__ea-button.warning:active {
  background-color: #a76d15;
}
.__ea-button.danger {
  border: 1px solid #f56c6c;
  color: #fff;
  background-color: #f56c6c;
  /* ------- 按钮样式 ------- */
  /* #region  */
  /* #endregion */
  /* ------- end  ------- */
}
.__ea-button.danger.disabled {
  cursor: not-allowed !important;
  background-image: none !important;
  background-color: #fde3e3 !important;
  border-color: #fde3e3 !important;
  color: white !important;
}
.__ea-button.danger.plain {
  background-color: white;
  border: 1px solid #fde3e3;
  color: #f56c6c;
  background-color: #fde8e8;
}
.__ea-button.danger.round {
  border-radius: 999px;
}
.__ea-button.danger:hover {
  border: 1px solid #f89c9c;
  color: white;
  background-color: #f89c9c;
}
.__ea-button.danger:active {
  background-color: #eb1010;
}
`,n.appendChild(r),n.appendChild(o)}get BUTTON_STYLE(){return["plain","round"]}get disabled(){return this.getAttribute("disabled")!==null}get ariaDisabled(){return this.getAttribute("aria-disabled")!==null}get value(){return this.getAttribute("value")}get innerHTMLValue(){return this.innerHTML}get ariaValueText(){return this.getAttribute("aria-valuetext")}get plain(){return this.getAttribute("plain")!==void 0&&this.getAttribute("plain")!==null}get round(){return this.getAttribute("round")!==void 0&&this.getAttribute("round")!==null}get type(){const n=this.getAttribute("type");return n==null||n==0?"normal":n}connectedCallback(){const n=this.shadowRoot.querySelector(".__ea-button");n.disabled=this.disabled,n.ariaDisabled=this.ariaDisabled,n.ariaValueText=this.ariaValueText,n.value=this.value,n.value=this.innerHTMLValue;for(let o,r=0;o=this.BUTTON_STYLE[r++];)if(this[o]){n.classList.add(o);break}(this.disabled||this.ariaDisabled)&&n.classList.add("disabled"),n.classList.add(this.type)}}customElements.define("ea-button",e)})();
