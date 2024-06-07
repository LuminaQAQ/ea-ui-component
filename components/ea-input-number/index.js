// @ts-nocheck
import Base from '../Base';

const stylesheet = `
@import url('/ea_ui_component/icon/index.css');

.ea-input-number_wrap {
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 3px;
  transition: border 0.2s;
}
.ea-input-number_wrap .ea-input-number_sign {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border: 1px solid #dcdfe6;
  background-color: #f5f7fa;
  height: 2rem;
  width: 2rem;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  user-select: none;
}
.ea-input-number_wrap .ea-input-number_sign:first-child {
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  border-right: 0;
}
.ea-input-number_wrap .ea-input-number_sign:last-child {
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  border-left: 0;
}
.ea-input-number_wrap .ea-input-number_sign:hover {
  color: #409eff;
}
.ea-input-number_wrap .ea-input-number_sign.disabled {
  pointer-events: none;
  cursor: not-allowed;
  color: #c0c4cc;
}
.ea-input-number_wrap .ea-input-number_sign.ea-input-number_sign--medium {
  height: 1.75rem;
  width: 1.75rem;
}
.ea-input-number_wrap .ea-input-number_sign.ea-input-number_sign--small {
  height: 1.5rem;
  width: 1.5rem;
}
.ea-input-number_wrap .ea-input-number_sign.ea-input-number_sign--mini {
  height: 1.25rem;
  width: 1.25rem;
}
.ea-input-number_wrap .ea-input-number_inner {
  box-sizing: border-box;
  box-shadow: none;
  border: 1px solid #dcdfe6;
  outline: 0;
  transition: border 0.2s;
  border-radius: 3px;
  padding: 0.5rem;
  line-height: 0.8;
  font-size: 0.8rem;
  scrollbar-width: none;
  width: 5rem;
  height: 2rem;
  border-radius: 0;
  text-align: center;
}
.ea-input-number_wrap .ea-input-number_inner:focus {
  border-color: #409eff;
}
.ea-input-number_wrap .ea-input-number_inner::placeholder {
  color: #c0c4cc;
}
.ea-input-number_wrap .ea-input-number_inner.invalid {
  border-color: #f56c6c;
}
.ea-input-number_wrap .ea-input-number_inner.disabled {
  background-color: #eeeeee;
  color: #c0c4cc;
}
.ea-input-number_wrap .ea-input-number_inner.ea-input_clear ::before {
  content: "\e9c3";
  display: block;
}
.ea-input-number_wrap .ea-input-number_inner:focus {
  border-color: #dcdfe6;
}
.ea-input-number_wrap .ea-input-number_inner.disabled {
  pointer-events: none;
  color: #c0c4cc;
  cursor: not-allowed;
  background-color: #f5f7fa;
}
.ea-input-number_wrap .ea-input-number_inner.ea-input-number_inner--medium {
  height: 1.75rem;
  line-height: 1.75rem;
}
.ea-input-number_wrap .ea-input-number_inner.ea-input-number_inner--small {
  height: 1.5rem;
  line-height: 1.5rem;
}
.ea-input-number_wrap .ea-input-number_inner.ea-input-number_inner--mini {
  height: 1.25rem;
  line-height: 1.25rem;
}
.ea-input-number_wrap.focus {
  border: 1px solid #409eff;
}
.ea-input-number_wrap.focus .ea-input-number_sign {
  border-color: transparent;
}
`;

// +/- 符号dom
const signDom = (sign) => {
    const dom = document.createElement('span');
    dom.className = `ea-input-number_sign ${sign}`;

    dom.innerHTML = sign === 'minus' ? '-' : '+';

    return dom;
}

// input dom
const inputDom = () => {
    const input = document.createElement('input');
    input.className = 'ea-input-number_inner';
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
    signEvent(sign, precision, eventName) {
        if (this.getAttrBoolean('disabled')) return;

        const val = Number(this.#input.value);

        const defaultStepPrecision = this.#input.value.split('.')[1]; // 简单处理精度问题
        const res = sign === "minu" ? val - this.step : val + this.step; // 处理加减问题

        if (precision) {
            this.#input.value = (res).toFixed(precision);
        }
        // 简单处理精度问题
        else if (defaultStepPrecision?.length) {
            this.#input.value = (res).toFixed(defaultStepPrecision.length);
        } else {
            this.#input.value = res;
        }

        // 为外部dom添加事件监听
        if (eventName) {
            this.#input.dispatchEvent(
                new CustomEvent(eventName, {
                    detail: {
                        value: this.#input.value
                    }
                })
            )
        }
    }

    // 处理连加连减事件
    handleCounterEvent(sign) {
        let timer = setInterval(() => {
            this.signEvent(sign, this.precision);
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
        return this.getAttribute('value') || 0;
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

    // ------- precision 精度 -------
    // #region
    get precision() {
        const num = Number(this.getAttribute('precision'));
        if (num < 0 || !Number.isInteger(num)) {
            console.warn(`precision must be a positive integer(precisionValue: ${num})`);
            return false;
        }

        return Number(this.getAttribute('precision')) || 0;
    }

    set precision(precision) {
        this.setAttribute('precision', precision);
    }
    // #endregion
    // ------- end -------

    // ------- size 按钮大小(medium、small、mini) -------
    // #region
    get size() {
        return this.getAttribute('size') || '';
    }

    handleSize(size) {
        this.#signMinus.classList.add(`ea-input-number_sign--${size}`);
        this.#signPlus.classList.add(`ea-input-number_sign--${size}`);
        this.#input.classList.add(`ea-input-number_inner--${size}`);
        this.setAttribute('size', size);
    }

    set size(size) {
        switch (size) {
            case 'medium':
                this.handleSize('medium');
                break;
            case 'small':
                this.handleSize('small');
                break;
            case 'mini':
                this.handleSize('mini');
                break;
            default:
                break;
        }
    }
    // #endregion
    // ------- end -------

    init() {
        const that = this;

        // 禁用
        this.disabled = this.disabled;

        // 大小
        this.size = this.size;

        // 默认值
        if (this.min) this.value = this.min;
        else this.value = this.value;

        // 限制值初始化
        this.handleLimitVal();

        // 输入框获取焦点
        this.#input.addEventListener('focus', function (e) {
            that.handleWrapBorder(true);


            this.dispatchEvent(new CustomEvent("blur",
                { detail: { value: e.target.value } }
            ))
        })

        // 输入框失去焦点
        this.#input.addEventListener('blur', function (e) {
            that.handleWrapBorder(false);

            if (that.stepStrictly) {
                const step = that.step;
                const val = Number(that.#input.value);
                const mod = val % step;

                if (val < 0 && mod !== 0) that.#input.value = val - mod - step;
                else if (val < 0 && mod === 0) that.#input.value = val;
                else if (mod === 0) that.#input.value = val;
                else that.#input.value = val - mod + step;
            }

            that.handleLimitVal();

            this.dispatchEvent(new CustomEvent("blur",
                { detail: { value: e.target.value } }
            ))
        })

        // 减号
        this.#signMinus.addEventListener('click', function () {
            that.signEvent("minu", that.precision, "minus");
        })

        // 加号
        this.#signPlus.addEventListener('click', function (e) {
            that.signEvent("plus", that.precision, "plus");
        })

        // 连减
        this.#signMinus.addEventListener('mousedown', function (e) {
            that.handleCounterEvent("minu", that.precision);

        })

        // 连加
        this.#signPlus.addEventListener('mousedown', function () {
            that.handleCounterEvent("plus", that.precision,);
        })

        // 输入框值改变时
        this.#input.addEventListener('change', function (e) {
            that.handleLimitVal();

            this.dispatchEvent(new CustomEvent("change", { detail: { value: e.target.value } }))
        })

    }

    connectedCallback() {
        this.init();
    }
}