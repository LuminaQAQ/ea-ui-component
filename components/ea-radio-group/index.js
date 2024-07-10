// @ts-nocheck
import setStyle from "../../utils/setStyle";
<<<<<<< HEAD
import Base from "../Base";

const stylesheet = `
.ea-radio-group {
  display: flex;
}
.ea-radio-group ea-radio {
  margin-right: 2rem;
}`;

export class EaRadioGroup extends Base {
=======

const stylesheet = ``;

export default class EaRadioGroup extends HTMLElement {
>>>>>>> master

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });

        const dom = document.createElement('div');
        shadowRoot.appendChild(dom);
        const slot = document.createElement('slot');
        dom.className = "ea-radio-group";
        dom.appendChild(slot);


        this.dom = dom;

<<<<<<< HEAD
        this.build(shadowRoot, stylesheet);

        shadowRoot.appendChild(dom);
=======
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

        console.log();
>>>>>>> master
    }

    // ------- name 唯一键值 -------
    // #region
    get name() {
        return this.getAttribute('name');
    }

    set name(val) {
        this.querySelectorAll('ea-radio').forEach(radio => {
            radio.setAttribute('name', val);
        });
    }
    // #endregion
    // ------- end -------

    init() {
        // name 唯一键值
        this.name = this.name;
    }

    connectedCallback() {
        this.init();
    }
}
<<<<<<< HEAD

if (!window.customElements.get("ea-radio-group")) {
    window.customElements.define("ea-radio-group", EaRadioGroup);
}
=======
>>>>>>> master
