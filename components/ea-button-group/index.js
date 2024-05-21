// @ts-nocheck
import setStyle from "../../utils/setStyle";

const stylesheet = `
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
  border-radius: var(--border-radius);
}

.__ea-button.normal {
  --border-radius: 6px;
  border: 1px solid #dcdfe6;
  color: #606266;
  background-color: transparent;
  /* ------- 按钮样式 ------- */
  /* #region  */
  /* #endregion */
  /* ------- end  ------- */
  /* ------- 按钮大小 ------- */
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
  --border-radius: 999px;
}

.__ea-button.normal.medium {
  font-size: 14px;
}

.__ea-button.normal.small {
  font-size: 12px;
}

.__ea-button.normal.mini {
  font-size: 10px;
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
  --border-radius: 6px;
  border: 1px solid #409eff;
  color: #fff;
  background-color: #409eff;
  /* ------- 按钮样式 ------- */
  /* #region  */
  /* #endregion */
  /* ------- end  ------- */
  /* ------- 按钮大小 ------- */
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
  --border-radius: 999px;
}

.__ea-button.primary.medium {
  font-size: 14px;
}

.__ea-button.primary.small {
  font-size: 12px;
}

.__ea-button.primary.mini {
  font-size: 10px;
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
  --border-radius: 6px;
  border: 1px solid #67c23a;
  color: #fff;
  background-color: #67c23a;
  /* ------- 按钮样式 ------- */
  /* #region  */
  /* #endregion */
  /* ------- end  ------- */
  /* ------- 按钮大小 ------- */
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
  --border-radius: 999px;
}

.__ea-button.success.medium {
  font-size: 14px;
}

.__ea-button.success.small {
  font-size: 12px;
}

.__ea-button.success.mini {
  font-size: 10px;
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
  --border-radius: 6px;
  border: 1px solid #909399;
  color: #fff;
  background-color: #909399;
  /* ------- 按钮样式 ------- */
  /* #region  */
  /* #endregion */
  /* ------- end  ------- */
  /* ------- 按钮大小 ------- */
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
  --border-radius: 999px;
}

.__ea-button.info.medium {
  font-size: 14px;
}

.__ea-button.info.small {
  font-size: 12px;
}

.__ea-button.info.mini {
  font-size: 10px;
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
  --border-radius: 6px;
  border: 1px solid #e6a23c;
  color: #fff;
  background-color: #e6a23c;
  /* ------- 按钮样式 ------- */
  /* #region  */
  /* #endregion */
  /* ------- end  ------- */
  /* ------- 按钮大小 ------- */
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
  --border-radius: 999px;
}

.__ea-button.warning.medium {
  font-size: 14px;
}

.__ea-button.warning.small {
  font-size: 12px;
}

.__ea-button.warning.mini {
  font-size: 10px;
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
  --border-radius: 6px;
  border: 1px solid #f56c6c;
  color: #fff;
  background-color: #f56c6c;
  /* ------- 按钮样式 ------- */
  /* #region  */
  /* #endregion */
  /* ------- end  ------- */
  /* ------- 按钮大小 ------- */
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
  --border-radius: 999px;
}

.__ea-button.danger.medium {
  font-size: 14px;
}

.__ea-button.danger.small {
  font-size: 12px;
}

.__ea-button.danger.mini {
  font-size: 10px;
}

.__ea-button.danger:hover {
  border: 1px solid #f89c9c;
  color: white;
  background-color: #f89c9c;
}

.__ea-button.danger:active {
  background-color: #eb1010;
}

.__ea-button.text {
  --border-radius: 6px;
  border: 1px solid transparent;
  color: #409eff;
  background-color: transparent;
  /* ------- 按钮样式 ------- */
  /* #region  */
  /* #endregion */
  /* ------- end  ------- */
  /* ------- 按钮大小 ------- */
  /* #region  */
  /* #endregion */
  /* ------- end  ------- */
}

.__ea-button.text.disabled {
  cursor: not-allowed !important;
  background-image: none !important;
  background-color: rgba(64, 64, 64, 0) !important;
  border-color: rgba(64, 64, 64, 0) !important;
  color: white !important;
  color: #c0c4cc !important;
}

.__ea-button.text.plain {
  background-color: rgba(92, 92, 92, 0);
  border: 1px solid rgba(64, 64, 64, 0);
  color: transparent;
}

.__ea-button.text.round {
  --border-radius: 999px;
}

.__ea-button.text.medium {
  font-size: 14px;
}

.__ea-button.text.small {
  font-size: 12px;
}

.__ea-button.text.mini {
  font-size: 10px;
}

.__ea-button.text:hover {
  border: 1px solid rgba(26, 26, 26, 0);
  color: #73b8ff;
  background-color: rgba(26, 26, 26, 0);
}

.__ea-button.text:active {
  background-color: rgba(0, 0, 0, 0);
}

.__ea-button-group {
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
}

.__ea-button-group ::slotted(ea-button:first-of-type) {
  --border-radius: 4px 0 0 4px !important;
  border-right: 1px solid rgba(255, 255, 255, 0.3);
}

.__ea-button-group ::slotted(ea-button:last-of-type) {
  --border-radius: 0 4px 4px 0 !important;
  border-left: 1px solid rgba(255, 255, 255, 0.3);
}

.__ea-button-group ::slotted(:not(ea-button:last-of-type)) {
  --border-radius: 0 0 0 0 !important;
  border-left: 1px solid rgba(255, 255, 255, 0.3);
}

.__ea-button-group ::slotted(:not(ea-button:first-of-type)) {
  --border-radius: 0 0 0 0 !important;
  border-left: 1px solid rgba(255, 255, 255, 0.3);
}`;

export default class EaButtonGroup extends HTMLElement {

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });

    const dom = document.createElement('div');
    shadowRoot.appendChild(dom);
    const slot = document.createElement('slot');
    dom.className = "__ea-button-group";
    dom.appendChild(slot);


    this.dom = dom;

    // ------- 打包 -------
    // #region
    // const styleNode = document.createElement('style');
    // styleNode.innerHTML = stylesheet;
    // this.shadowRoot.appendChild(styleNode);
    // #endregion
    // ------- end -------

    // ------- 本地调试 -------
    // #region
    setStyle(shadowRoot, new URL('./index.css', import.meta.url).href);
    // #endregion
    // ------- end -------

    shadowRoot.appendChild(dom);
  }

  // 指定各个按钮的样式
  connectedCallback() {
    Array.from(this.children).map((child, index, arr) => {
      const button = child.shadowRoot.querySelector('button');
      if (index === 0) {
        button.style.setProperty('--border-radius', '4px 0 0 4px');
      } else if (index === arr.length - 1) {
        button.style.setProperty('--border-radius', '0 4px 4px 0');
      } else {
        button.style.setProperty('--border-radius', '0');
      }
    })
  }
}
