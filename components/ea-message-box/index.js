// @ts-nocheck
import Base from '../Base.js';
import { createElement } from "../../utils/createElement.js"

const stylesheet = `
.ea-dialog_wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2024;
}
.ea-dialog_wrap .ea-dialog_board {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: aliceblue;
  width: 420px;
  padding-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  box-sizing: 0 2px 12px 0;
  font-size: 18px;
  text-align: left;
  overflow: hidden;
  backface-visibility: hidden;
}
.ea-dialog_wrap .ea-dialog_board .ea-dialog_header {
  padding: 15px 15px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.ea-dialog_wrap .ea-dialog_board .ea-dialog_header .ea-dialog_header-title {
  font-size: 18px;
  line-height: 1;
  color: #303133;
}
.ea-dialog_wrap .ea-dialog_board .ea-dialog_header .ea-dialog_header-close {
  display: inline-block;
  font-size: 16px;
  color: #909399;
  cursor: pointer;
}
.ea-dialog_wrap .ea-dialog_board .ea-dialog_content {
  padding: 10px 15px;
  color: #606266;
  font-size: 14px;
}
.ea-dialog_wrap .ea-dialog_board .ea-dialog_footer {
  padding: 5px 15px 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.ea-dialog_wrap .ea-dialog_board .ea-dialog_footer :first-child {
  margin-right: 0.5rem;
}
`;

export class EaMessageBoxElement extends Base {
    #wrap;

    #headerWrap;
    #contentWrap;
    #footerWrap;

    #confirmButton;
    #cancelButton;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = 'ea-dialog_wrap';
        wrap.role = 'dialog';

        const headerTitle = createElement('span', 'ea-dialog_header-title');
        const headerClose = createElement('i', 'ea-dialog_header-close icon-cancel');
        headerClose.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('cancel'));
        });
        const header = createElement('div', 'ea-dialog_header', [headerTitle, headerClose]);

        const content = createElement('div', 'ea-dialog_content');

        const confirmButton = createElement('div', 'ea-dialog_footer-confirm-button');
        const cancelButton = createElement('div', 'ea-dialog_footer-cancel-button');
        const footer = createElement('div', 'ea-dialog_footer', [cancelButton, confirmButton]);

        const board = createElement('div', 'ea-dialog_board', [header, content, footer]);
        wrap.appendChild(board);

        this.#wrap = wrap;
        this.#headerWrap = headerTitle;
        this.#contentWrap = content;
        this.#footerWrap = footer;

        this.#confirmButton = confirmButton;
        this.#cancelButton = cancelButton;

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);
    }

    // ------- open 是否显示 -------
    // #region
    get open() {
        return this.getAttrBoolean('open');
    }

    set open(flag) {
        this.toggleAttr('open', flag);
        this.#wrap.style.display = flag ? 'block' : 'none';
    }
    // #endregion
    // ------- end -------

    // ------- content 文字区域 -------
    // #region
    get content() {
        return this.getAttribute('content');
    }

    set content(content) {
        this.#contentWrap.innerHTML = content;
    }
    // #endregion
    // ------- end -------

    // ------- title 标题 -------
    // #region
    get title() {
        return this.getAttribute('title');
    }

    set title(title) {
        this.#headerWrap.innerHTML = title;
    }
    // #endregion
    // ------- end -------

    // ------- confirmButtonText 确认按钮文本 -------
    // #region
    get confirmButtonText() {
        return this.getAttribute('confirmButtonText');
    }

    set confirmButtonText(val) {
        const that = this;
        this.setAttribute('confirmButtonText', val);

        if (val || val !== '') {
            this.#confirmButton.innerHTML = `<ea-button size="medium" type="primary">${val}</ea-button>`;

            this.#confirmButton.addEventListener('click', () => {
                that.dispatchEvent(new CustomEvent('confirm'));
            });
        }
    }
    // #endregion
    // ------- end -------

    // ------- cancelButtonText 取消按钮文本 -------
    // #region
    get cancelButtonText() {
        return this.getAttribute('cancelButtonText');
    }

    set cancelButtonText(val) {
        const that = this;
        this.setAttribute('cancelButtonText', val);

        if (val || val !== '') {
            this.#cancelButton.innerHTML = `<ea-button size="medium">${val}</ea-button>`;

            this.#cancelButton.addEventListener('click', () => {
                that.dispatchEvent(new CustomEvent('cancel'));
            });
        }
    }
    // #endregion
    // ------- end -------

    init() {
        const that = this;

        this
    }

    connectedCallback() {
        this.init();
    }
}

if (!customElements.get('ea-message-box')) {
    customElements.define('ea-message-box', EaMessageBoxElement);
}