// @ts-nocheck
import Base from '../Base';

const stylesheet = `
@import url('/ea_ui_component/icon/index.css');
`;

export class EaDescriptionsItem extends Base {
    #wrap;

    #label;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });

        const wrap = document.createElement('td');
        wrap.className = 'ea-descriptions-item_wrap';
        wrap.colSpan = 1;

        const label = document.createElement('span');
        label.className = 'ea-descriptions-item_label';
        wrap.appendChild(label);

        const content = document.createElement('span');
        const slot = document.createElement('slot');
        content.className = 'ea-descriptions-item_content';
        content.appendChild(slot);
        wrap.appendChild(content);

        this.#wrap = wrap;
        this.#label = label;

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);
    }

    // ------- label 该格的标题 -------
    // #region
    get label() {
        return this.getAttribute('label');
    }

    set label(value) {
        this.setAttribute('label', value);

        this.#label.innerHTML = value;
    }
    // #endregion
    // ------- end -------

    // ------- span 该格的大小 -------
    // #region
    get span() {
        return this.getAttrNumber('span') || 1;
    }

    set span(value) {
        this.setAttribute('span', value);

        this.#wrap.colSpan = value;
    }
    // #endregion
    // ------- end -------

    init() {
        const that = this;

        this.label = this.label;

        this.span = this.span;
    }

    connectedCallback() {
        this.init();
    }
}