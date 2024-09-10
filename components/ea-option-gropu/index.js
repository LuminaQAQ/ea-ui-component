// @ts-nocheck
import Base from '../Base.js';
import '../ea-icon/index.js'

const stylesheet = `
.ea-option-group_wrap .ea-option-group_title {
  padding-left: 20px;
  font-size: 12px;
  color: #909399;
  line-height: 30px;
}
`;

export class EaOptionGroup extends Base {
    #container;

    #titleWrap;
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });

        shadowRoot.innerHTML = `
            <div class='ea-option-group_wrap' part='container'>
                <div class='ea-option-group_title' part='title-wrap'></div>
                <slot></slot>
            </div>
        `;

        this.#container = shadowRoot.querySelector('.ea-option-group_wrap');
        this.#titleWrap = shadowRoot.querySelector('.ea-option-group_title');

        this.build(shadowRoot, stylesheet);
    }

    // ------- label 标题  -------
    // #region
    get label() {
        return this.getAttribute('label') || '';
    }

    set label(val) {
        this.setAttribute('label', val);

        this.#titleWrap.innerHTML = val;
    }
    // #endregion
    // ------- end -------

    connectedCallback() {
        this.label = this.label;
    }
}

if (!customElements.get('ea-option-group')) {
    customElements.define('ea-option-group', EaOptionGroup);
}