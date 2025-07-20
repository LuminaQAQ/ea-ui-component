import stylesheet from "./index.css?inline"
import variable from "../../themes/variable.scss?inline";
import host from "./host.scss?inline"

export class EaIcon extends HTMLElement {
    /** @type {HTMLElement} */
    #container;

    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <i class="ea-icon" part="container">
                <slot></slot>
            </i>
        `;

        this.#container = this.shadowRoot.querySelector('.ea-icon');
    }

    setAttr(attrName, value) {
        if (value) {
            this.setAttribute(attrName, value);
        } else {
            this.removeAttribute(attrName);
        }
    }

    // ------- icon 图标类名 -------
    // #region
    get icon() {
        return this.getAttribute('icon') || "";
    }

    set icon(value) {
        this.setAttr('icon', value);

        this.#container.className = `${value}`;
    }
    // #endregion
    // ------- end -------

    // ------- color 颜色 -------
    // #region
    get color() {
        return this.getAttribute('color') || "";
    }

    set color(value) {
        this.setAttr('color', value);

        this.style.setProperty('--ea-icon-color', value);
    }
    // #endregion
    // ------- end -------

    // ------- size 大小 -------
    // #region
    get size() {
        return this.getAttribute('size') || "";
    }

    set size(value) {
        if (value !== "14" || value !== 14) this.setAttr('size', value);

        this.style.setProperty('--ea-icon-size', `${value || 14}px`);
    }
    // #endregion
    // ------- end -------

    connectedCallback() {
        const sheet = new CSSStyleSheet();
        const variableSheet = new CSSStyleSheet();
        const hostSheet = new CSSStyleSheet();
        sheet.replaceSync(stylesheet);
        variableSheet.replaceSync(variable);
        hostSheet.replaceSync(host);
        this.shadowRoot.adoptedStyleSheets = [sheet, variableSheet, hostSheet];

        this.icon = this.icon;

        this.color = this.color;

        this.size = this.size;
    }
}

if (!window.customElements.get("ea-icon")) {
    window.customElements.define("ea-icon", EaIcon);
}