// @ts-nocheck
import Base from '../Base';

const stylesheet = `
@import url('/ea_ui_component/icon/index.css');

.ea-descriptions-item_wrap {
  display: inline-flex;
  text-align: left;
  padding-bottom: 1rem;
  line-height: 1.5;
}
.ea-descriptions-item_wrap .ea-descriptions-item_label {
  margin-right: 10px;
}
.ea-descriptions-item_wrap .ea-descriptions-item_label::after {
  content: ":";
}
.ea-descriptions-item_wrap .ea-descriptions-item_content {
  display: inline-flex;
  flex: 1;
  align-items: baseline;
}
.ea-descriptions-item_wrap .ea-descriptions-item_label.is-border,
.ea-descriptions-item_wrap .ea-descriptions-item_content.is-border {
  border: 1px solid #ebeef5;
}
`;

export class EaDescriptionsItem extends Base {
    #wrap;

    #label;

    #labelSlot;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });

        const wrap = document.createElement('td');
        wrap.className = 'ea-descriptions-item_wrap';
        wrap.colSpan = 1;

        const label = document.createElement('span');
        const labelSlot = document.createElement('slot');
        label.className = 'ea-descriptions-item_label';
        label.appendChild(labelSlot);
        wrap.appendChild(label);

        const content = document.createElement('span');
        const slot = document.createElement('slot');
        content.className = 'ea-descriptions-item_content';
        labelSlot.name = 'label';
        content.appendChild(slot);
        wrap.appendChild(content);

        this.#wrap = wrap;
        this.#label = label;
        this.#labelSlot = labelSlot;

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);
    }

    // ------- label 该格的标题 -------
    // #region
    get label() {
        return this.getAttribute('label') || '';
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