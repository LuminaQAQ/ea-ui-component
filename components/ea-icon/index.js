// @ts-nocheck
import { createSlotElement } from "../../utils/createElement.js";
import Base from "../Base.js";

export class EaIcon extends Base {
    static observedAttributes = ['type', 'size', 'color'];

    #wrap;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('i');
        const slot = createSlotElement();
        wrap.appendChild(slot);

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

    // ------- color 颜色 -------
    // #region
    get color() {
        return this.getAttribute('color') || "";
    }

    set color(value) {
        this.setAttribute('color', value);

        this.#wrap.style.color = value;
    }
    // #endregion
    // ------- end -------

    #init() {
        this.icon = this.icon;

        this.color = this.color;
    }

    connectedCallback() {
        this.#init()
    }
}

if (!window.customElements.get("ea-icon")) {
    window.customElements.define("ea-icon", EaIcon);
}