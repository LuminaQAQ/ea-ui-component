// @ts-nocheck
import Base from '../Base';
import { createElement } from "../../utils/createElement.js"

const stylesheet = `
@import url('/ea_ui_component/icon/index.css');
`;

export class EaDialogElement extends Base {
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
            this.dispatchEvent(new CustomEvent('close'));
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
            this.#confirmButton.innerHTML = `<ea-button type="primary">${val}</ea-button>`;

            this.#confirmButton.addEventListener('click', () => {
                that.dispatchEvent(new CustomEvent('confirm'));
            });
        }
    }
    // #endregion
    // ------- end -------

    // ------- cancelButtonText 取消按钮文本 -------
    // #region

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