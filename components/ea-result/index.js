// @ts-nocheck
import { createElement } from '../../utils/createElement';
import Base from '../Base';

const stylesheet = `
@import url('/ea_ui_component/icon/index.css');
`;

export class EaResult extends Base {
    #wrap;

    #icon;

    #resultTitle;

    #resultSubtitle;

    #resultSlotWrap

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = 'ea-result_wrap';

        const icon = createElement('i', 'icon-ok-circled');
        const iconWrap = createElement('div', 'ea-result_icon', icon);
        wrap.appendChild(iconWrap);

        const resultTitle = createElement('div', 'ea-result_title');
        wrap.appendChild(resultTitle);

        const resultSubtitle = createElement('div', 'ea-result_subtitle');
        wrap.appendChild(resultSubtitle);

        const resultSlot = createElement('slot');
        resultSlot.name = 'extra';
        const resultSlotWrap = createElement('div', 'ea-result_extra', resultSlot);
        wrap.appendChild(resultSlotWrap);

        this.#wrap = wrap;
        this.#icon = icon;
        this.#resultTitle = resultTitle;
        this.#resultSubtitle = resultSubtitle;
        this.#resultSlotWrap = resultSlotWrap;

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);
    }

    // ------- icon 设置自定义icon -------
    // #region
    get icon() {
        return this.getAttribute('icon') || 'ea-icon-ok-circled';
    }

    set icon(value) {
        this.setAttribute('icon', value);

        this.#icon.className = value;
    }
    // #endregion
    // ------- end -------

    // ------- title 设置标题 -------
    // #region
    get title() {
        return this.getAttribute('title') || '成功提示';
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
        return this.getAttribute('sub-title') || '操作成功';
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

        try {
            const node = this.querySelector('[slot="extra"]').cloneNode(true).childNodes;

            Array.from(node).forEach(item => {
                that.#resultSlotWrap.appendChild(item);
            });
        } catch (e) {

        }

    }

    connectedCallback() {
        this.init();
    }
}