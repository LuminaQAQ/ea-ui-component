// @ts-nocheck
import Base from '../Base.js';
import '../ea-icon/index.js'
import { createSlotElement, createElement } from '../../utils/createElement.js';

import "../ea-breadcrumb-item/index.js"

const stylesheet = `

`;

export class EaBreadcrumb extends Base {
    #wrap;
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = 'ea-breadcrumb_wrap';
        wrap.part = 'wrap';

        const slot = createSlotElement();
        wrap.appendChild(slot);

        this.#wrap = wrap;

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);
    }

    // ------- separator 分隔符 -------
    // #region
    get separator() {
        return this.getAttribute('separator') || "/";
    }

    set separator(value) {
        this.setAttribute('separator', value);
    }
    // #endregion
    // ------- end -------

    // ------- separator-class 分隔符的图标类名 -------
    // #region
    get separatorClass() {
        return this.getAttribute('separator-class') || '';
    }

    set separatorClass(value) {
        this.setAttribute('separator-class', value);
    }
    // #endregion
    // ------- end -------

    // ------- separator-color 分隔符的图标颜色 -------
    // #region
    get separatorColor() {
        return this.getAttribute('separator-color') || '#c0c4cc';
    }

    set separatorColor(value) {
        this.setAttribute('separator-color', value);
    }
    // #endregion
    // ------- end -------

    #handleSeparator(separator, separatorClass, separatorColor) {
        const items = this.querySelectorAll('ea-breadcrumb-item');

        items.forEach((item, index) => {
            if (index < items.length - 1) {
                const separatorIcon = createElement('ea-icon');
                separatorIcon.color = separatorColor;

                if (separatorClass) {
                    separatorIcon.icon = separatorClass;
                } else {
                separatorIcon.style.margin = '0 10px';
                    separatorIcon.innerText = separator;
                }

                item.appendChild(separatorIcon);
            }
        });
    }

    #init() {
        const that = this;

        this.separator = this.separator;
        this.separatorClass = this.separatorClass;
        this.separatorColor = this.separatorColor;

        this.#handleSeparator(this.separator, this.separatorClass, this.separatorColor);
    }

    connectedCallback() {
        this.#init();
    }
}

if (!customElements.get('ea-breadcrumb')) {
    customElements.define('ea-breadcrumb', EaBreadcrumb);
}