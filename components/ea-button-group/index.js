// @ts-nocheck
import setStyle from "../../utils/setStyle";

const stylesheet = ``;

export default class EaButtonGroup extends HTMLElement {

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });

        const dom = document.createElement('div');
        shadowRoot.appendChild(dom);
        const slot = document.createElement('slot');
        dom.className = "__ea-button-group";
        dom.appendChild(slot);


        this.dom = dom;

        // ------- 打包 -------
        // #region
        // const styleNode = document.createElement('style');
        // styleNode.innerHTML = stylesheet;
        // this.shadowRoot.appendChild(styleNode);
        // #endregion
        // ------- end -------

        // ------- 本地调试 -------
        // #region
        setStyle(shadowRoot, new URL('./index.css', import.meta.url).href);
        // #endregion
        // ------- end -------


        shadowRoot.appendChild(dom);
    }
}

if (!window.customElements.get("ea-buttonn-group")) {
    window.customElements.define("ea-button-group", EaButtonGroup);
}
