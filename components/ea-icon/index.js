// @ts-nocheck
import Base from "../Base.js";

export class EaIcon extends Base {
    static observedAttributes = ['type', 'size', 'color'];

    #wrap;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('i');

        this.setIconFile(new URL('../ea-icon/index.css', import.meta.url).href);

        this.#wrap = wrap;

        shadowRoot.appendChild(wrap);
    }

    // ------- icon 图标类名 -------
    // #region
    get icon() {
        return this.getAttribute('icon') || "";
    }

    set icon(value) {
        this.setAttribute('icon', value);

        this.#wrap.className = `${value}`;
    }
    // #endregion
    // ------- end -------

    #init() {
        this.icon = this.icon;
    }

    connectedCallback() {
        this.#init()
    }
}

if (!window.customElements.get("ea-icon")) {
    window.customElements.define("ea-icon", EaIcon);
}