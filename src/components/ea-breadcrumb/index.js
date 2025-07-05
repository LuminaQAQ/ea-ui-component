import Base from '../Base.js';
import '../ea-icon/index.js';

import "../ea-breadcrumb-item/index.js";

import { stylesheet } from './src/style/stylesheet.js';
import { createElement } from '../../utils/createElement.js';

export class EaBreadcrumb extends Base {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <div class="ea-breadcrumb_wrap" part='container'>
                <slot></slot>
            </div>
        `;

        this.build(shadowRoot, stylesheet);
    }

    // ------- separator 分隔符 -------
    // #region
    get separator() {
        return this.getAttribute('separator') || "\/";
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

    #initSeparator() {
        const items = this.querySelectorAll('ea-breadcrumb-item');

        items.forEach((item, index) => {
            if (index < items.length - 1) {
                const separatorIcon = createElement('ea-icon');
                separatorIcon.color = this.separatorColor;

                if (this.separatorClass) {
                    separatorIcon.icon = this.separatorClass;
                } else {
                    separatorIcon.style.margin = '0 10px';
                    separatorIcon.innerText = this.separator;
                }

                item.appendChild(separatorIcon);
            }
        });
    }

    connectedCallback() {
        this.separator = this.separator;
        this.separatorClass = this.separatorClass;
        this.separatorColor = this.separatorColor;

        this.#initSeparator();
    }
}

if (!customElements.get('ea-breadcrumb')) {
    customElements.define('ea-breadcrumb', EaBreadcrumb);
}