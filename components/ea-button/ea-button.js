// @ts-nocheck
import setStyle from "../../utils/setStyle";

export default class EaButton extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });


        const test = document.createElement('input');
        test.type = 'button';
        test.value = "click";
        test.className = "__ea-button";

        setStyle(shadowRoot, new URL('./index.css', import.meta.url).href);
        shadowRoot.appendChild(test);
    }

    get disabled() {
        return this.getAttribute('disabled') !== null;
    }

    get checked() {
        return this.getAttribute('checked');
    }

    get circle() {
        return this.getAttribute('circle') !== null;
    }

    get type() {
        const attr = this.getAttribute('type');
        if (attr == null || attr == false) return 'normal';
        else return attr;
    }

    connectedCallback() {
        const button = this.shadowRoot.querySelector('.__ea-button');

        button.disabled = this.disabled;
        if (this.disabled) button.classList.add('disabled');
        button.classList.add(this.type);
    }
}