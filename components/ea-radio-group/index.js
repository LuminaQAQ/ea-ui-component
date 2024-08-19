// @ts-nocheck
import Base from "../Base.js";

const stylesheet = `
.ea-radio-group {
  display: flex;
}
.ea-radio-group ea-radio {
  margin-right: 2rem;
}`;

export class EaRadioGroup extends Base {

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });

        const dom = document.createElement('div');
        shadowRoot.appendChild(dom);
        const slot = document.createElement('slot');
        dom.className = "ea-radio-group";
        dom.appendChild(slot);


        this.dom = dom;

        this.build(shadowRoot, stylesheet);

        shadowRoot.appendChild(dom);
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

    // ------- value 值 -------
    // #region
    get value() {
        return this.getAttribute('value') || '';
    }

    set value(val) {
        this.setAttribute("value", val);
    }
    // #endregion
    // ------- end -------

    init() {
        // name 唯一键值
        this.name = this.name;

        const radios = this.querySelectorAll('ea-radio');
        radios.forEach(radio => {
            if (radio.checked) this.value = radio.value;

            radio.addEventListener('change', e => {
                this.value = radio.value;
            });
        });

        const valueRadio = Array.from(radios).find(radio => radio.value === this.value);
        if (valueRadio) valueRadio.checked = true;

        this.setAttribute("data-ea-component", true);
    }

    connectedCallback() {
        this.init();
    }
}

if (!window.customElements.get("ea-radio-group")) {
    window.customElements.define("ea-radio-group", EaRadioGroup);
}
