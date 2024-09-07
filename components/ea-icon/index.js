export class EaIcon extends HTMLElement {
    #wrap;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <link rel="stylesheet" href="/ea-ui-component/ea-icon/css/animation.css">
            <link rel="stylesheet" href="/ea-ui-component/ea-icon/css/fontello.css">
            <i class="ea-icon_wrap" part="container">
                <slot></slot>
            </i>
        `;

        this.#wrap = shadowRoot.querySelector('.ea-icon_wrap');
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