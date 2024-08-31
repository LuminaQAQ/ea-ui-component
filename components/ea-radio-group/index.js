// @ts-nocheck
import Base from "../Base.js";

const stylesheet = `
.ea-radio-group_wrap {
  display: flex;
}
`;

export class EaRadioGroup extends Base {

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <div class="ea-radio-group_wrap" part="container">
                <slot></slot>
            </div>
        `;
        this.build(shadowRoot, stylesheet);
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
        if (!val) return;

        this.setAttribute("value", val);
    }
    // #endregion
    // ------- end -------

    #initValue(radios) {
        radios.forEach(radio => {
            if (radio.checked) this.value = radio.value;

            radio.addEventListener('change', e => {
                this.value = radio.value;

                this.dispatchEvent(new CustomEvent('change', {
                    bubbles: true,
                    composed: true,
                    detail: {
                        target: radio,
                        value: this.value
                    }
                }));
            });
        });
    }

    #initRadioChecked(radios) {
        const valueRadio = Array.from(radios).find(radio => radio.value === this.value);
        if (valueRadio) valueRadio.checked = true;
    }

    connectedCallback() {
        this.setAttribute("data-ea-component", true);

        // name 唯一键值
        this.name = this.name;

        const radios = this.querySelectorAll('ea-radio');
        this.#initValue(radios);
        this.#initRadioChecked(radios);
    }
}

if (!window.customElements.get("ea-radio-group")) {
    window.customElements.define("ea-radio-group", EaRadioGroup);
}
