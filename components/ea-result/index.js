// @ts-nocheck
import { createElement, createSlotElement } from '../../utils/createElement';
import { handleTemplate } from '../../utils/handleTemplate';
import Base from '../Base';

const stylesheet = `
@import url('/ea_ui_component/icon/index.css');
`;

export class EaResult extends Base {
    #wrap;

    #resultIcon;
    #resultTitle;
    #resultSubtitle;
    #resultExtraWrap;

    #resultIconSlot;
    #resultTitleSlot;
    #resultSubtitleSlot;
    #resultExtraSlot;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = 'ea-result_wrap';

        const iconWrap = createElement('div', 'ea-result_icon');
        wrap.appendChild(iconWrap);

        const resultTitle = createElement('div', 'ea-result_title');
        wrap.appendChild(resultTitle);

        const resultSubtitle = createElement('div', 'ea-result_subtitle');
        wrap.appendChild(resultSubtitle);

        const resultExtraWrap = createElement('div', 'ea-result_extra');
        wrap.appendChild(resultExtraWrap);

        const resultIconSlot = createSlotElement('icon');
        const resultTitleSlot = createSlotElement('title');
        const resultSubtitleSlot = createSlotElement('subTitle');
        const resultExtraSlot = createSlotElement('extra');

        this.#wrap = wrap;
        this.#resultIcon = iconWrap;
        this.#resultTitle = resultTitle;
        this.#resultSubtitle = resultSubtitle;
        this.#resultExtraWrap = resultExtraWrap;

        this.#resultIconSlot = resultIconSlot;
        this.#resultTitleSlot = resultTitleSlot;
        this.#resultSubtitleSlot = resultSubtitleSlot;
        this.#resultExtraSlot = resultExtraSlot;

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);

        shadowRoot.appendChild(resultIconSlot);
        shadowRoot.appendChild(resultTitleSlot);
        shadowRoot.appendChild(resultSubtitleSlot);
        shadowRoot.appendChild(resultExtraSlot);
    }

    // ------- icon 设置自定义icon -------
    // #region
    get icon() {
        return this.getAttribute('icon') || '';
    }

    set icon(value) {
        this.setAttribute('icon', value);

        this.#resultIcon.innerHTML = `<i class="${value}"></i>`;
    }
    // #endregion
    // ------- end -------

    // ------- title 设置标题 -------
    // #region
    get title() {
        return this.getAttribute('title') || '';
    }

    set title(value) {
        this.setAttribute('title', value);

        this.#resultTitle.innerText = value;
    }
    // #endregion
    // ------- end -------

    // ------- sub-title 设置副标题 -------
    // #region
    get subtitle() {
        return this.getAttribute('sub-title') || '';
    }

    set subtitle(value) {
        this.setAttribute('sub-title', value);

        this.#resultSubtitle.innerText = value;
    }
    // #endregion
    // ------- end -------

    init() {
        const that = this;

        this.icon = this.icon;
        this.title = this.title;
        this.subtitle = this.subtitle;

        handleTemplate(this, "icon", this.#resultIcon, this.#resultIconSlot);
        handleTemplate(this, "title", this.#resultTitle, this.#resultTitleSlot);
        handleTemplate(this, "subTitle", this.#resultSubtitle, this.#resultSubtitleSlot);
        handleTemplate(this, "extra", this.#resultExtraWrap, this.#resultExtraSlot);
    }

    connectedCallback() {
        this.init();
    }
}