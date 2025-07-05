import Base from '../Base.js';

import { EaMessageBox } from './src/utils/EaMessageBoxClass.js';
import "../ea-button/index.js"
import "../ea-input/index.js"

import { stylesheet } from './src/style/stylesheet.js';

export class EaMessageBoxElement extends Base {
    #wrap;

    #headerWrap;

    #contentWrap;
    #contentText
    #contentInput;

    #footerWrap;

    #confirmButton;
    #cancelButton;

    #reg;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <div class="ea-dialog_wrap" part="container" role="dialog">
                <div class="ea-dialog_board" part="dialog-body">
                    <div class="ea-dialog_header" part="dialog-header">
                        <span class="ea-dialog_header-title" part="dialog-title"></span>
                        <ea-icon class="ea-dialog_header-close" icon="icon-cancel" part="close-icon"></ea-icon>
                    </div>
                    <div class="ea-dialog_content" part="dialog-content">
                        <div class="ea-dialog_content-text" part="dialog-content-text"></div>
                        <ea-input class="ea-dialog_content-input" part="dialog-input"></ea-input>
                    </div>
                    <div class="ea-dialog_footer" part="dialog-footer">
                        <div class="ea-dialog_footer-cancel-button" part="footer-cancel-button"></div>
                        <div class="ea-dialog_footer-confirm-button" part="footer-confirm-button"></div>
                    </div>
                </div>
                <div class="ea-dialog_mask" part="mask-wrap"></div>
            </div>
        `;
        this.#wrap = shadowRoot.querySelector('.ea-dialog_wrap');
        this.#headerWrap = shadowRoot.querySelector('.ea-dialog_header');
        this.#contentWrap = shadowRoot.querySelector('.ea-dialog_content');
        this.#contentText = shadowRoot.querySelector('.ea-dialog_content-text');
        this.#contentInput = shadowRoot.querySelector('.ea-dialog_content-input');
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
        this.#contentText.innerHTML = content;
    }
    // #endregion
    // ------- end -------

    // ------- isPrompt 是否为prompt -------
    // #region
    get isPrompt() {
        return this.getAttrBoolean('isPrompt');
    }

    set isPrompt(isPrompt) {
        this.toggleAttr('isPrompt', isPrompt);
        this.#wrap?.classList.toggle('is-prompt', isPrompt);
    }
    // #endregion
    // ------- end -------

    // ------- reg 当前输入框的验证规则 -------
    // #region
    get reg() {
        return this.#reg;
    }

    set reg(reg) {
        if (!this.isPrompt) return;
        this.#reg = reg;

        this.#contentInput.addEventListener('change', (e) => {
            const value = e.detail.value;
            const input = e.target.shadowRoot.querySelector('.ea-input_inner');
            input.setAttribute('aria-invalid', !reg.test(value));
            this.#contentInput.setAttribute('aria-invalid', !reg.test(value));

            if (reg.test(value)) {

            } else {

            }
        });
    }
    // #endregion
    // ------- end -------

    // ------- inputPlaceholder 输入框提示 -------
    // #region
    get inputPlaceholder() {
        return this.getAttribute('input-placeholder');
    }

    set inputPlaceholder(placeholder) {
        if (!placeholder) return;
        this.#contentInput.placeholder = placeholder;
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

            if (this.isPrompt) {
                this.dispatchEvent(new CustomEvent('confirm', {
                    detail: {
                        target: this.#contentInput,
                        value: this.#contentInput.value,
                    }
                }));
            } else {
                this.dispatchEvent(new CustomEvent('confirm'));
            }
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

    connectedCallback() {
        this.dispatchEvent(new CustomEvent('ready'));
    }
}

if (!customElements.get('ea-message-box')) {
    customElements.define('ea-message-box', EaMessageBoxElement);
}

const messageBox = new EaMessageBox(false);

window.$alert = messageBox;
window.$confirm = messageBox;

const promptBox = new EaMessageBox(true);
window.$prompt = promptBox;