import Base from "../Base";

const stylesheet = ``;

export default class EaIcon extends Base {
    static observedAttributes = ['type', 'size', 'color'];

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('i');
        wrap.className = "icon-spin6";

        this.build(shadowRoot, stylesheet);
        shadowRoot.appendChild(wrap);
    }
}