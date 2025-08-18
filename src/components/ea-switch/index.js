import Base from '@components/Base.js'

import stylesheet from './index.scss?inline';

export class EaSwitch extends Base {
    /** @type {HTMLElement} */
    #container;
    /** @type {HTMLElement} */
    #originalInput;
    /** @type {HTMLElement} */
    #innerInput;
    /** @type {HTMLElement} */
    #labelRight;
    /** @type {HTMLElement} */
    #labelLeft;

    /** @type {AbortController} */
    #abortController;

    static get observedAttributes() {
        return ['name', 'value', 'inactive-text', 'inactive-color', 'active-text', 'active-color', 'checked', 'disabled'];
    }

    state = this.properties({
        name: {
            type: String,
            default: '',
            observer: (newVal) => {
                this.#container.setAttribute('for', newVal);
                this.#originalInput.setAttribute('name', newVal);
                this.#originalInput.setAttribute('id', newVal);
            }
        },
        "inactive-text": {
            type: String,
            default: '',
            observer: (newVal) => {
                this.#labelLeft.innerText = newVal;
            }
        },
        "inactive-color": {
            type: String,
            default: '',
            observer: (newVal) => {
                this.style.setProperty('--ea-switch-inactive-checkbox-bgc', newVal);
            }
        },
        "active-text": {
            type: String,
            default: '',
            observer: (newVal) => {
                this.#labelRight.innerText = newVal;
            }
        },
        "active-color": {
            type: String,
            default: '',
            observer: (newVal) => {
                this.style.setProperty('--ea-switch-active-checkbox-bgc', newVal);
            }
        },
        checked: {
            type: Boolean,
            default: false,
            observer: (newVal) => {
                this.#originalInput.toggleAttribute('checked', newVal);
                this.#container.className = this.updateContainerClasslist();
            }
        },
        disabled: {
            type: Boolean,
            default: false,
            observer: (newVal) => {
                this.#originalInput.toggleAttribute('disabled', newVal);
                this.#container.className = this.updateContainerClasslist();
            }
        },
        value: {
            type: String,
            default: '',
            observer: (newVal) => {
                this.#originalInput.setAttribute('value', newVal);
            }
        },
    })

    /**
     * 获取 classlist 列表
     * @return {string} 属性值
     */
    updateContainerClasslist() {
        return this.computedClasslist('ea-switch', {
            ['--checked']: this.checked,
            ['--disabled']: this.disabled,
        });
    }

    constructor() {
        super();

        this.stylesheet = stylesheet;

        this.$render();
    }

    $render() {
        this.shadowRoot.innerHTML = `
            <label class="ea-switch" part="container">
                <input class="ea-switch__original" type="checkbox">
                <span class="ea-switch__label label-left" part="label-left"></span>
                <span class="ea-switch__inner" part="switch"></span>
                <span class="ea-switch__label label-right" part="label-right"></span>
            </label>
        `;

        this.#container = this.shadowRoot.querySelector('.ea-switch');
        this.#originalInput = this.shadowRoot.querySelector('.ea-switch__original');
        this.#innerInput = this.shadowRoot.querySelector('.ea-switch__inner');
        this.#labelLeft = this.shadowRoot.querySelector('.ea-switch__label.label-left');
        this.#labelRight = this.shadowRoot.querySelector('.ea-switch__label.label-right');
    }

    #changeEvent = (e) => {
        e.preventDefault();
        e.stopPropagation();

        this.checked = e.target.checked;
        const value = this.checked
            ? (this["active-text"] ? this["active-text"] : this.checked)
            : (this["inactive-text"] ? this["inactive-text"] : this.checked);
        this.value = value;

        this.dispatchEvent(new CustomEvent("change", {
            detail: {
                checked: this.checked,
                value: value,
            },
        }))
    }

    connectedCallback() {
        super.connectedCallback();

        this.#abortController = new AbortController();

        this.name = this.name;
        this.value = this.value;
        this.checked = this.checked;
        this.disabled = this.disabled;

        this["active-text"] = this["active-text"];
        this["inactive-text"] = this["inactive-text"];
        this["active-color"] = this["active-color"];
        this["inactive-color"] = this["inactive-color"];

        this.#originalInput.addEventListener('change', this.#changeEvent, { signal: this.#abortController.signal });
    }

    $unmounted() {
        this.#abortController.abort();
    }
}

if (!window.customElements.get('ea-switch')) {
    window.customElements.define('ea-switch', EaSwitch);
}