// @ts-nocheck
import Base from '../Base.js';
import '../ea-icon/index.js'
import { createSlotElement, createElement } from '../../utils/createElement.js';
import { timeout } from '../../utils/timeout.js';
import { Validator } from "../../utils/Validator.js";

const stylesheet = `
@import url('/ea_ui_component/icon/index.css');

.ea-form-item_wrap {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 22px;
}
.ea-form-item_wrap .ea-form-item_label-wrap {
  text-align: right;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  box-sizing: border-box;
}
.ea-form-item_wrap .ea-form-item_content-wrap {
  position: relative;
  display: flex;
  flex-direction: column;
}
.ea-form-item_wrap .ea-form-item_content-wrap .ea-form-item_invalid-wrap {
  position: absolute;
  bottom: 0;
  left: 0;
  transform-origin: top center;
  transform: translateY(100%) scaleY(0);
  font-size: 12px;
  color: #f56c6c;
  white-space: nowrap;
}
.ea-form-item_wrap.is-required-star .ea-form-item_label-wrap::before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
.ea-form-item_wrap.is-required .ea-form-item_content-wrap .ea-form-item_invalid-wrap {
  transform: translateY(100%) scaleY(1);
}
.ea-form-item_wrap.with-transition .ea-form-item_content-wrap .ea-form-item_invalid-wrap {
  transition: transform 0.3s;
}
`;

export class EaFromItem extends Base {
    #rule;

    #container;

    #labelWrap;

    #invalidWrap;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });

        shadowRoot.innerHTML = `
            <div class='ea-form-item_wrap' part='container'>
                <label class="ea-form-item_label-wrap" part='label'>
                    <slot name='label'></slot>
                </label>
                <div class="ea-form-item_content-wrap" part='content-wrap'> 
                    <slot></slot>
                    <span class="ea-form-item_invalid-wrap" part='invalid-wrap'>
                        <slot name='invalid-text'></slot>
                    </span>
                </div>
            </div>
        `;

        this.#container = shadowRoot.querySelector('.ea-form-item_wrap');

        this.#labelWrap = shadowRoot.querySelector('.ea-form-item_label-wrap');

        this.#invalidWrap = shadowRoot.querySelector('.ea-form-item_invalid-wrap');

        this.build(shadowRoot, stylesheet);
    }

    // ------- label 标签 -------
    // #region
    get label() {
        return this.getAttribute('label') || '';
    }

    set label(value) {
        this.setAttribute('label', value);

        const slot = this.#labelWrap.querySelector('slot');
        try {
            if (slot.assignedNodes().length === 0) this.#labelWrap.innerHTML = value;
        } catch (error) { }
    }
    // #endregion
    // ------- end -------

    // ------- trigger 触发器 -------
    // #region
    get trigger() {
        const attr = this.getAttribute('trigger');
        return ['blur', 'change'].includes(attr) ? attr : 'blur';
    }

    set trigger(value) {
        this.setAttribute('trigger', value);
    }
    // #endregion
    // ------- end -------

    // ------- is-invalid 是否校验失败 -------
    // #region
    get isInvalid() {
        return this.getAttribute('is-invalid') === 'true';
    }

    set isInvalid(value) {
        this.setAttribute('is-invalid', value);

        this.#container.classList.toggle('is-required', value);
    }
    // #endregion
    // ------- end -------

    // ------- rule 校验规则 -------
    // #region
    get rule() {
        return this.#rule;
    }

    set rule(value) {
        this.#rule = value;

        for (const key in value) {
            this[key] = value[key];
        }
    }
    // #endregion
    // ------- end -------

    // ------- isRequired 是否必填 -------
    // #region
    get isRequired() {
        return this.getAttrBoolean('is-required');
    }

    set isRequired(value) {
        this.setAttribute('is-required', value);

        this.#container.classList.toggle('is-required-star', value);
    }
    // #endregion
    // ------- end -------

    validateEvent() {
        const formItem = this.querySelector('[data-ea-component]');
        try {
            formItem.addEventListener(this.trigger, (e) => {
                for (const key in this.#rule) {
                    if (Validator[key]) {
                        if (!Validator[key](formItem.value, this.#rule[key])) {
                            formItem.isInvalid = true;
                            this.#container.classList.add('is-required');

                            break;
                        } else {
                            formItem.isInvalid = false;
                            this.#container.classList.remove('is-required');
                        }
                    }
                }
            });
        } catch (error) { }
    }

    #init() {
        this.label = this.label;

        this.trigger = this.trigger;

        timeout(() => {
            this.#container.classList.add('with-transition');
        }, 50);
    }

    connectedCallback() {
        this.#init();
    }
}

if (!customElements.get('ea-form-item')) {
    customElements.define('ea-form-item', EaFromItem);
}