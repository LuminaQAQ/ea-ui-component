// @ts-nocheck
import Base from '../Base';

const stylesheet = `
@import url('/ea_ui_component/icon/index.css');
`;

const signDom = (sign) => {
    const dom = document.createElement('span');
    dom.className = `ea-input-number_sign ${sign}`;

    dom.innerHTML = sign === 'minus' ? '-' : '+';

    return dom;
}

const inputDom = () => {
    const input = document.createElement('input');
    input.className = 'ea-input-numbe_inner';
    input.type = 'text';
    input.value = 0;

    return input;
}

export default class EaInputNumber extends Base {
    #wrap;
    #input;
    #signMinus;
    #signPlus;
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = 'ea-input-number_wrap';

        const input = inputDom();
        const signMinus = signDom('minus');
        const signPlus = signDom('plus');
        wrap.appendChild(signMinus);
        wrap.appendChild(input);
        wrap.appendChild(signPlus);

        this.#wrap = wrap;
        this.#input = input;
        this.#signMinus = signMinus;
        this.#signPlus = signPlus;

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);
    }

    // 处理输入框加减事件
    signEvent(sign, precision) {
        if (this.getAttrBoolean('disabled')) return;

        const val = parseInt(this.#input.value);
        this.#input.value = sign === "minu" ? val - this.step : val + this.step;

        this.#input.dispatchEvent(
            new CustomEvent("change", {
                detail: {
                    value: this.#input.value
                }
            })
        )
    }

    // 处理连加连减事件
    handleCounterEvent(sign) {
        let timer = setInterval(() => {
            this.signEvent(sign, this.getAttribute('precision'));
        }, 100);

        this.addEventListener('mouseup', function () {
            clearInterval(timer);
            timer = null;
        })
    }

    // 处理输入框聚焦失焦事件
    handleWrapBorder(flag) {
        this.#wrap.classList.toggle('focus', flag)
    }

    handleLimitVal() {
        if (this.min === false && this.max === false) return;

        // 限制输入框的值
        if (this.min !== undefined && this.#input.value < this.min) {
            this.#input.value = this.min;
        } else if (this.max !== undefined && this.#input.value > this.max) {
            this.#input.value = this.max;
        }

        // 当达到限制值时, 禁用加减按钮
        if (this.#input.value == this.min) {
            this.#signMinus.classList.add('disabled');
        } else if (this.#input.value == this.max) {
            this.#signPlus.classList.add('disabled');
        } else {
            try {
                this.#signMinus.classList.remove('disabled');
                this.#signPlus.classList.remove('disabled');
            } catch (error) {

            }
        }
    }

    // ------- value 值 -------
    // #region
    get value() {
        return this.#input.value || 0;
    }

    set value(val) {
        val = parseInt(val);
        this.#input.value = val;

        if (this.disabled) return;
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
        this.#input.classList.toggle('disabled', flag);
        this.#signMinus.classList.toggle('disabled', flag);
        this.#signPlus.classList.toggle('disabled', flag);
    }
    // #endregion
    // ------- end -------

    // ------- step 加减的步长 -------
    // #region
    get step() {
        return Number(this.getAttribute('step')) || 1;
    }

    set step(step) {
        this.setAttribute('step', step);
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
        if (this.getAttribute('min') === null) return false;
        else return Number(this.getAttribute('min')) || 0;
    }

    set min(min) {
        if (min === false) {
            this.removeAttribute('min');
            return;
        }

        this.setAttribute('min', min);
    }

    get max() {
        if (this.getAttribute('max') === null) return false;
        else return Number(this.getAttribute('max'));
    }

    set max(max) {
        this.setAttribute('max', max);
    }
    // #endregion
    // ------- end -------

    init() {
        const that = this;

        // 禁用
        this.disabled = this.disabled;

        if (this.min) this.value = this.min;
        else this.value = this.value;

        this.handleLimitVal();

        // 输入框获取焦点
        this.#input.addEventListener('focus', function () {
            that.handleWrapBorder(true);
        })

        // 输入框失去焦点
        this.#input.addEventListener('blur', function () {
            that.handleWrapBorder(false);

            if (that.stepStrictly) {
                const step = that.step;
                const val = parseInt(that.#input.value);
                const mod = val % step;

                if (val < 0 && mod !== 0) that.#input.value = val - mod - step;
                else if (val < 0 && mod === 0) that.#input.value = val;
                else if (mod === 0) that.#input.value = val;
                else that.#input.value = val - mod + step;
            }

            that.handleLimitVal();
        })

        // 减号
        this.#signMinus.addEventListener('click', function () {
            that.signEvent("minu", that.getAttribute('precision'));
        })

        // 加号
        this.#signPlus.addEventListener('click', function (e) {
            that.signEvent("plus", that.getAttribute('precision'));
        })

        // 连减
        this.#signMinus.addEventListener('mousedown', function () {
            that.handleCounterEvent("minu", that.getAttribute('precision'));
        })

        // 连加
        this.#signPlus.addEventListener('mousedown', function () {
            that.handleCounterEvent("plus", that.getAttribute('precision'));
        })

        // 输入框值改变时
        this.#input.addEventListener('change', function () {
            that.handleLimitVal();
        })

    }

    connectedCallback() {
        this.init();
    }
}