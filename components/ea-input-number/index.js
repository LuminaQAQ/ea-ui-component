// @ts-nocheck
import Base from '../Base.js';

import { stylesheet } from './src/style/stylesheet.js';
import { handleCustomEvent } from './src/utils/handleCustomEvent.js';

export class EaInputNumber extends Base {
    #wrap;
    #input;
    #signMinus;
    #signPlus;
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <div class="ea-input-number_wrap" part="container">
                <span class="ea-input-number_sign minus" part="minus-wrap">-</span>
                <input class="ea-input-number_inner" part="input" type="text" />
                <span class="ea-input-number_sign plus" part="plus-wrap">+</span>
            </div>
        `;

        this.#wrap = shadowRoot.querySelector('.ea-input-number_wrap');
        this.#input = shadowRoot.querySelector('.ea-input-number_inner');
        this.#signMinus = shadowRoot.querySelector('.minus');
        this.#signPlus = shadowRoot.querySelector('.plus');

        this.build(shadowRoot, stylesheet);
    }

    // 处理输入框加减事件
    #signEvent(sign, precision, eventName) {
        if (this.getAttrBoolean('disabled')) return;

        const val = Number(this.#input.value);

        const defaultStepPrecision = this.#input.value.split('.')[1]; // 简单处理精度问题
        const res = sign === "minus" ? val - this.step : val + this.step; // 处理加减问题

        if (precision) {
            this.#input.value = (res).toFixed(precision);
        }
        // 简单处理精度问题
        else if (defaultStepPrecision?.length) {
            this.#input.value = (res).toFixed(defaultStepPrecision.length);
        } else {
            this.#input.value = res;
        }

        // 限制输入框的值
        this.#handleLimitVal();

        // 为外部dom添加事件监听
        if (eventName) this.#handleCustomEvent('change', res);
    }

    // 处理连加连减事件
    #handleCounterEvent(sign) {
        let timer = setInterval(() => {
            this.#signEvent(sign, this.precision);
            this.#handleLimitVal();
        }, 100);

        this.addEventListener('mouseup', function () {
            clearInterval(timer);
            timer = null;
        })
    }

    #handleLimitVal() {
        if (this.min === false && this.max === false) return;

        // 限制输入框的值
        if (this.min !== undefined && this.#input.value < this.min) {
            this.#input.value = this.min;
        } else if (this.max !== undefined && this.#input.value > this.max) {
            this.#input.value = this.max;
        }

        // 当达到限制值时, 禁用加减按钮
        this.#signMinus.classList.toggle('disabled', this.#input.value == this.min);
        this.#signPlus.classList.toggle('disabled', this.#input.value == this.max);
    }

    #handleValueUpdate() {
        if (isNaN(Number(this.#input.value))) this.#input.value = this.value;
        else this.value = Number(this.#input.value);
    }

    #handleCustomEvent(eventName, value = this.value) {
        handleCustomEvent.call(this, eventName, {
            value
        });
    }

    // ------- value 值 -------
    // #region
    get value() {
        return Number(this.getAttribute('value')) || 0;
    }

    set value(val) {
        val = this.precision ? Number(val).toFixed(this.precision) : Number(val);
        this.setAttribute('value', val);

        this.#input.value = val;
    }
    // #endregion
    // ------- end -------

    // ------- disabled 禁用 -------
    // #region
    get disabled() {
        return this.getAttrBoolean('disabled');
    }

    set disabled(flag) {
        this.toggleAttr('disabled', flag);

        this.#input.disabled = flag;
        this.#wrap.classList.toggle('disabled', flag);
        this.style.cursor = flag ? 'not-allowed' : 'pointer';
    }
    // #endregion
    // ------- end -------

    // ------- readonly 只读 -------
    // #region
    get readonly() {
        return this.getAttrBoolean('readonly');
    }

    set readonly(value) {
        if (!value) return;

        this.#input.readOnly = value;
    }
    // #endregion
    // ------- end -------

    // ------- step 加减的步长 -------
    // #region
    get step() {
        return this.getAttrNumber('step') || 1;
    }

    set step(value) {
        if (!value) return;

        this.setAttribute('step', value);
    }
    // #endregion
    // ------- end -------

    // ------- step-strictly 严格步长 -------
    // #region
    get stepStrictly() {
        return this.getAttrBoolean('step-strictly');
    }

    set stepStrictly(flag) {
        this.toggleAttr('step-strictly', flag);
    }
    // #endregion
    // ------- end -------

    // ------- min/max 限制最大/最小值 -------
    // #region
    get min() {
        return this.getAttrNumber('min') || -Infinity;
    }

    set min(value) {
        if (!Number.isNaN(value) || Number.isFinite(value)) return;

        this.setAttribute('min', value);
    }

    get max() {
        return this.getAttrNumber('max') || Infinity;
    }

    set max(value) {
        if (!value) return;
        this.setAttribute('max', value);
    }
    // #endregion
    // ------- end -------

    // ------- precision 精度 -------
    // #region
    get precision() {
        const num = this.getAttrNumber('precision');

        if (num < 0 || !Number.isInteger(num)) return 0;
        return num;
    }

    set precision(value) {
        if (!value) return;

        this.setAttribute('precision', value);
    }
    // #endregion
    // ------- end -------

    // ------- size 按钮大小(medium、small、mini) -------
    // #region
    get sizeType() {
        return ['medium', 'small', 'mini']
    }

    get size() {
        const attr = this.getAttribute('size');
        return this.sizeType.includes(attr) ? attr : 'medium';
    }

    set size(size) {
        this.setAttribute('size', size);
        this.#wrap.classList.add(`ea-input-number--${size}`);
    }
    // #endregion
    // ------- end -------

    connectedCallback() {
        this.style.display = 'inline-block';

        // 禁用
        this.disabled = this.disabled;

        this.readonly = this.readonly;

        // 大小
        this.size = this.size;

        // 默认值
        this.value = this.value;

        if (this.min !== -Infinity) this.value = this.min;

        // 限制值初始化
        this.#handleLimitVal();

        // 输入框获取焦点
        this.#input.addEventListener('focus', e => {
            this.#wrap.classList.add('focus');

            this.#handleCustomEvent("focus");
        })

        // 输入框失去焦点
        this.#input.addEventListener('blur', e => {
            this.#wrap.classList.remove('focus');

            if (this.stepStrictly) {
                const step = that.step;
                const val = Number(that.#input.value);
                const mod = val % step;

                if (val < 0 && mod !== 0) that.#input.value = val - mod - step;
                else if (val < 0 && mod === 0) that.#input.value = val;
                else if (mod === 0) that.#input.value = val;
                else this.#input.value = val - mod + step;
            }

            this.#handleLimitVal();

            this.#handleCustomEvent("blur");
        })

        // 减号
        this.#signMinus.addEventListener('click', () => {
            this.#handleValueUpdate();
            this.#signEvent("minus", this.precision, "minus");
        })

        // 加号
        this.#signPlus.addEventListener('click', () => {
            this.#handleValueUpdate();
            this.#signEvent("plus", this.precision, "plus");
        })

        // 连减
        this.#signMinus.addEventListener('mousedown', () => {
            this.#handleValueUpdate();
            this.#handleCounterEvent("minus", this.precision);
        })

        // 连加
        this.#signPlus.addEventListener('mousedown', () => {
            this.#handleValueUpdate();
            this.#handleCounterEvent("plus", this.precision);
        })

        // 输入框值改变时
        this.#input.addEventListener('input', () => {
            this.#handleValueUpdate();
            this.#handleLimitVal();

            this.#handleCustomEvent("change");
        })
    }
}

if (!window.customElements.get("ea-input-number")) {
    window.customElements.define("ea-input-number", EaInputNumber);
}