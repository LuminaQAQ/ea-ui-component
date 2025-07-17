import stylesheet from "./index.css?inline"
import variable from "../../themes/variable.scss?inline";
import host from "./host.scss?inline"

export class EaIcon extends HTMLElement {
    #wrap;

    constructor() {
        super();

        const sheet = new CSSStyleSheet();
        const variableSheet = new CSSStyleSheet();
        const hostSheet = new CSSStyleSheet();
        sheet.replaceSync(stylesheet);
        variableSheet.replaceSync(variable);
        hostSheet.replaceSync(host);


        this.attachShadow({ mode: 'open' });
        this.shadowRoot.adoptedStyleSheets = [sheet, variableSheet];
        this.shadowRoot.innerHTML = `
            <i class="ea-icon_wrap" part="container">
                <slot></slot>
            </i>
        `;

        this.#wrap = this.shadowRoot.querySelector('.ea-icon_wrap');
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

    // ------- size 大小 -------
    // #region
    get size() {
        return this.getAttribute('size') || "";
    }

    set size(value) {
        this.setAttribute('size', value);

        this.#wrap.style.fontSize = `${value}px`;
    }
    // #endregion
    // ------- end -------

    connectedCallback() {
        this.icon = this.icon;

        this.color = this.color;

        this.size = this.size;
    }
}

if (!window.customElements.get("ea-icon")) {
    window.customElements.define("ea-icon", EaIcon);
}