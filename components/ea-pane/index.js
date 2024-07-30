// @ts-nocheck
import Base from '../Base.js';
import '../ea-icon/index.js'
import { createSlotElement, createElement } from '../../utils/createElement.js';

const stylesheet = `
.ea-pane_wrap {
  display: none;
}
.ea-pane_wrap.is-actived {
  display: block;
}
`;

export class EaPane extends Base {
    #wrap;
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = 'ea-pane_wrap';
        wrap.part = 'wrap';

        const slot = createSlotElement();
        wrap.appendChild(slot);

        this.#wrap = wrap;

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);
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

    #init() {
        const that = this;
    }

    connectedCallback() {
        this.#init();
    }
}

if (!customElements.get('ea-pane')) {
    customElements.define('ea-pane', EaPane);
}