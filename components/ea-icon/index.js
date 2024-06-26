import Base from "../Base";

export class EaIcon extends Base {
    static observedAttributes = ['type', 'size', 'color'];

    constructor() {
        super();

        const stylesheet = ``;
        // `

        // @font-face {
        //     font-size: 1rem;
        //     font-size: 16px;
        //     font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        //     src: url("${new URL('./font/fontello.eot', import.meta.url).href}") format("embedded-opentype"), url("${new URL('./font/fontello.ttf', import.meta.url).href}") format("truetype"), url("${new URL('./font/fontello.woff', import.meta.url).href}") format("woff"), url("${new URL('./font/fontello.woff2', import.meta.url).href}") format("woff2"), url("${new URL('./font/fontello.svg', import.meta.url).href}") format("svg");
        // }
        // `;

        // const font = document.createElement('link');
        // font.rel = 'stylesheet';
        // font.href = new URL('./css/fontello.css', import.meta.url).href;

        const shadowRoot = this.attachShadow({ mode: 'open' });
        // shadowRoot.appendChild(font);
        const wrap = document.createElement('i');
        wrap.className = "icon-spin6";

        this.build(shadowRoot, stylesheet);

        shadowRoot.appendChild(wrap);
    }
}