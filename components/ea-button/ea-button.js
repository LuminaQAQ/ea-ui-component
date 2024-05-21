// @ts-nocheck
import setStyle from "../../utils/setStyle";
import Base from "../Base";
import "../ea-icon/index.scss";

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
`;

export default class EaButton extends Base {

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
    let dom = null;


    if (this.getAttribute('href') !== null && this.getAttribute('href') !== '') dom = document.createElement('a');
    else dom = document.createElement('button');

    const slot = document.createElement('slot');
    dom.className = "__ea-button";
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

  static get observedAttributes() {
    return ['loading'];
  }

  get BUTTON_STYLE() {
    return ['plain', 'round'];
  }

  get BUTTON_TYPE() {
    return ['normal', 'primary', 'success', 'warning', 'danger', 'text'];
  }

  get BUTTON_SIZE() {
    return ['medium', 'small', 'mini'];
  }


  // ------- 禁用 -------
  // #region
  get disabled() {
    return this.getAttribute('disabled') !== null;
  }

  set disabled(value) {
    this.toggleAttribute('disabled', value, 'disabled');
  }

  get ariaDisabled() {
    return this.getAttribute('aria-disabled') !== null;
  }

  set ariaDisabled(value) {
    this.toggleAttribute('aria-disabled', value, 'disabled');
  }
  // #endregion
  // ------- end -------

  // ------- 按钮样式 -------
  // #region
  get plain() {
    return this.getAttribute('plain') !== undefined && this.getAttribute('plain') !== null;
  }
  set plain(value) {
    this.toggleAttribute('plain', value, 'plain');
  }

  get round() {
    return this.getAttribute('round') !== undefined && this.getAttribute('round') !== null;
  }
  set round(value) {
    this.toggleAttribute('round', value, 'round');

    if (value) this.dom.style.setProperty('--border-radius', '999px');
  }
  // #endregion
  // ------- end -------

  // ------- type属性 -------
  // #region
  get type() {
    const attr = this.getAttribute('type');

    if (attr == null || attr == false) return 'normal';
    else return attr;
  }

  set type(value) {
    if (!this.BUTTON_TYPE.includes(value)) value = 'normal';

    this.toggleAttribute('type', value, value);
  }
  // #endregion
  // ------- end -------

  // ------- 按钮大小 -------
  // #region
  get size() {
    return this.getAttribute('size');
  }
  set size(value) {
    if (!this.BUTTON_SIZE.includes(value)) return;

    this.toggleAttribute('size', value, value);
  }
  // #endregion
  // ------- end -------

  // ------- 按钮加载 -------
  // #region
  get loading() {
    return this.getAttribute('loading') !== null && this.getAttribute('loading') !== undefined;
  }

  set loading(value) {
    this.toggleAttribute('loading', value, 'loading');
    this.disabled = value;

    if (value && !this.dom.querySelector('i')) {
      const i = document.createElement('i');
      i.className = "icon-spin6 animate-spin";

      this.dom.insertBefore(i, this.dom.firstChild)
    } else if (!value && this.dom.querySelector('i')) {
      this.dom.querySelector('i').remove();
    }
  }
  // #endregion
  // ------- end -------

  // -------  -------
  // #region
  get href() {
    return this.getAttribute('href');
  }
  set href(value) {
    if (value == null || value == false) {
      this.removeAttribute('href');
      this.dom.removeAttribute('href');
    } else {
      this.setAttribute('href', value);
      this.dom.setAttribute('href', value);
    }
  }
  // #endregion
  // ------- end -------

  init() {
    // 禁用
    this.disabled = this.disabled;
    this.ariaDisabled = this.ariaDisabled;

    // 加载
    this.loading = this.loading;

    // 按钮样式
    for (let i = 0, style; style = this.BUTTON_STYLE[i++];) {
      if (this[style]) {
        this[style] = this[style];
        break;
      }
    }

    // 按钮种类
    this.type = this.type;

    // 按钮大小
    this.size = this.size;

    // 链接
    this.href = this.href;
  }

  connectedCallback() {
    this.init();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue == newValue) return;

    if (name == "loading") {
      if (newValue === "") newValue = true;
      this.loading = newValue;
    }


    this.addEventListener('click', function () {

    })
  }
}
