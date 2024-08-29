// @ts-nocheck
import Base from '../Base.js';

import { createElement } from "../../utils/createElement.js"

import { EaMessageBox } from './src/utils/EaMessageBoxClass.js';
import "../ea-button/index.js"

import { stylesheet } from './src/style/stylesheet.js';

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
        shadowRoot.innerHTML = `
            <div class="ea-dialog_wrap" part="container" role="dialog">
                <div class="ea-dialog_board" part="dialog_body">
                    <div class="ea-dialog_header" part="dialog_header">
                        <span class="ea-dialog_header-title" part="dialog_header-title"></span>
                        <ea-icon class="ea-dialog_header-close" icon="icon-cancel" part="dialog_header-close"></ea-icon>
                    </div>
                    <div class="ea-dialog_content" part="dialog_content"></div>
                    <div class="ea-dialog_footer" part="dialog_footer">
                        <div class="ea-dialog_footer-cancel-button" part="dialog_footer-cancel-button"></div>
                        <div class="ea-dialog_footer-confirm-button" part="dialog_footer-confirm-button"></div>
                    </div>
                </div>
                <div class="ea-dialog_mask" part="mask"></div>
            </div>
        `;
        this.#wrap = shadowRoot.querySelector('.ea-dialog_wrap');
        this.#headerWrap = shadowRoot.querySelector('.ea-dialog_header');
        this.#contentWrap = shadowRoot.querySelector('.ea-dialog_content');
        this.#footerWrap = shadowRoot.querySelector('.ea-dialog_footer');

        this.#confirmButton = shadowRoot.querySelector('.ea-dialog_footer-confirm-button');
        this.#cancelButton = shadowRoot.querySelector('.ea-dialog_footer-cancel-button');

        this.build(shadowRoot, stylesheet);
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
        if (!val) return;

        this.setAttribute('confirmButtonText', val);
        this.#confirmButton.innerHTML = `<ea-button size="medium" type="primary">${val}</ea-button>`;
        this.#confirmButton.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('confirm'));
        });
    }
    // #endregion
    // ------- end -------

    // ------- cancelButtonText 取消按钮文本 -------
    // #region
    get cancelButtonText() {
        return this.getAttribute('cancelButtonText');
    }

    set cancelButtonText(val) {
        if (!val) return;

        this.setAttribute('cancelButtonText', val);
        this.#cancelButton.innerHTML = `<ea-button size="medium">${val}</ea-button>`;
        this.#cancelButton.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('cancel'));
        });
    }
    // #endregion
    // ------- end -------
}

if (!customElements.get('ea-message-box')) {
    customElements.define('ea-message-box', EaMessageBoxElement);
}

const messageBox = new EaMessageBox();

window.$alert = messageBox;
window.$confirm = messageBox;