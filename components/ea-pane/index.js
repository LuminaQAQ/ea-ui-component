import Base from '../Base.js';
import '../ea-icon/index.js'

import { stylesheet } from './src/stylesheet.js';

export class EaPane extends Base {
    #wrap;
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <div class="ea-pane_wrap" part="container">
                <slot></slot>
            </div>
        `;

        this.#wrap = shadowRoot.querySelector('.ea-pane_wrap');

        this.build(shadowRoot, stylesheet);
    }

    // ------- actived 是否激活 -------
    // #region
    get actived() {
        return this.getAttribute('actived');
    }

    set actived(value) {
        this.setAttribute('actived', value);

        this.#wrap.classList.toggle('is-actived', value);
    }
    // #endregion
    // ------- end -------

    // ------- name 标签唯一标识 -------
    // #region
    get name() {
        return this.getAttribute('name');
    }

    set name(value) {
        this.setAttribute('name', value);
    }
    // #endregion
    // ------- end -------
}

if (!customElements.get('ea-pane')) {
    customElements.define('ea-pane', EaPane);
}