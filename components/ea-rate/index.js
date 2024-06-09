// @ts-nocheck
import Base from '../Base';

const stylesheet = `
@import url('/ea_ui_component/icon/index.css');

:host {
  --i-color: rgb(247, 186, 42);
}
.ea-rate_wrap {
  --i-color: rgb(247, 186, 42);
  position: relative;
  display: flex;
  align-items: center;
}
.ea-rate_wrap .ea-rate_item {
  cursor: pointer;
  width: 24px;
  height: 24px;
}
.ea-rate_wrap .ea-rate_item > i {
  color: #c0c4cc;
  font-size: 1rem;
  line-height: 1;
  transition: color 0.3s, font-size 0.1s;
}
.ea-rate_wrap .ea-rate_item.ea-rate_item--active > i {
  color: var(--i-color);
  font-size: 1.1rem;
}
.ea-rate_wrap .ea-rate_item.ea-rate_item--disabled {
  pointer-events: none;
  cursor: default;
}
.ea-rate_wrap .ea-rate_text {
  margin-left: 0.25rem;
  min-width: 2rem;
  font-size: 0.8rem;
  line-height: 0.8;
  vertical-align: middle;
}
.ea-rate_wrap .ea-rate_score {
  position: absolute;
  left: 0;
  top: 0;
}
.ea-rate_wrap .ea-rate_score .ea-rate_score_item {
  width: 24px;
  height: 24px;
}
.ea-rate_wrap .ea-rate_score .ea-rate_score_item > i {
  color: #c0c4cc;
  font-size: 1rem;
  line-height: 1;
}
`;

const rateDom = (index) => {
    const dom = document.createElement('span');
    dom.className = 'ea-rate_item';
    dom.setAttribute('data-index', index);

    const icon = document.createElement('i');
    icon.className = 'icon-star-empty';

    dom.appendChild(icon);

    return dom;
}


export default class EaRate extends Base {
    #mounted = false;
    #wrap;
    #appendSlot;
    #textList = ["极差", "失望", "一般", "满意", "惊喜"];

    static get observedAttributes() {
        return ['value'];
    }

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = 'ea-rate_wrap';

        for (let i = 0; i < 5; i++) {
            const dom = rateDom(i);

            wrap.appendChild(dom);
        }

        const text = document.createElement('span');
        text.className = 'ea-rate_text';
        wrap.appendChild(text);

        this.#wrap = wrap;
        this.#appendSlot = text;

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);
    }

    // 设置/显示选中状态
    setCheckedStatus(index) {
        const item = this.#wrap.querySelectorAll('.ea-rate_item');

        for (let i = 0; i < index; i++) {
            item[i].classList.add('ea-rate_item--active');
            item[i].querySelector('i').className = this.activeIconClass;

            if (this.showText) {
                this.#appendSlot.innerText = this.showTextList[index - 1];
            }
        }
    }

    // 当未选中时, 清除选中状态
    clearCheckedStatus() {
        this.#wrap.querySelectorAll('.ea-rate_item').forEach(item => {
            item.classList.remove('ea-rate_item--active');
            item.querySelector('i').className = this.voidIconClass;

            if (this.showText) {
                const text = this.#wrap.querySelector('.ea-rate_text');
                text.innerText = "";
            }
        })
    }

    // ------- value 当前选中值 -------
    // #region
    get value() {
        const value = this.getAttribute('value') || 0;

        if (value < 1 || value > 5 || !value) return 0;
        else return Number(value);
    }

    set value(val) {
        val = Number(val);

        this.setAttribute('value', val);

        this.clearCheckedStatus();

        this.setCheckedStatus(val);
    }

    // #endregion
    // ------- end -------

    // ------- color 颜色 -------
    // #region
    get color() {
        return this.getAttribute('color') || 'rgb(247, 186, 42)';
    }

    set color(val) {
        this.setAttribute('color', val);
        this.#wrap.querySelectorAll('.ea-rate_item').forEach(item => {
            item.querySelector('i').style.setProperty('--i-color', val);
        })
    }
    // #endregion
    // ------- end -------

    // ------- show-text 显示文本 -------
    // #region

    get showText() {
        return this.getAttrBoolean('show-text');
    }

    set showText(val) {
        this.toggleAttr('show-text', val);
    }

    get showTextList() {
        return this.#textList;
    }

    set showTextList(val) {
        if (typeof val === "object" && val.length === 5) this.#textList = val;
    }
    // #endregion
    // ------- end -------

    // ------- void-icon-class 自定空图标样式类 -------
    // #region
    get voidIconClass() {
        return this.getAttribute('void-icon-class') || 'icon-star-empty';
    }

    set voidIconClass(val) {
        this.setAttribute('void-icon-class', val);
        this.#wrap.querySelectorAll('.ea-rate_item').forEach(item => {
            item.querySelector('i').className = val;
        })
    }
    // #endregion
    // ------- end -------

    // ------- active-icon-class 自定图标样式类 -------
    // #region
    get activeIconClass() {
        return this.getAttribute('active-icon-class') || 'icon-star';
    }

    set activeIconClass(val) {
        this.setAttribute('active-icon-class', val);
        this.#wrap.querySelectorAll('.ea-rate_item').forEach(item => {
            item.querySelector('i').className = val;
        })
    }
    // #endregion
    // ------- end -------

    // ------- disabled 禁用 -------
    // #region
    get disabled() {
        return this.getAttrBoolean('disabled');
    }

    set disabled(val) {
        this.toggleAttr('disabled', val);

        this.#wrap.querySelectorAll('.ea-rate_item').forEach(item => {
            item.classList.toggle('ea-rate_item--disabled', val);
        })
    }
    // #endregion
    // ------- end -------

    // 初始化鼠标事件
    initRateEvent() {
        const that = this;

        this.#wrap.querySelectorAll('.ea-rate_item').forEach(dom => {

            // 鼠标移入: 显示选中状态
            dom.addEventListener('mouseenter', function (e) {
                const index = Number(this.getAttribute('data-index'));

                that.clearCheckedStatus();
                that.setCheckedStatus(index + 1);

                that.dispatchEvent(new CustomEvent("hover", {
                    detail: {
                        value: index + 1,
                        rateText: that.#textList[index]
                    }
                }));
            })

            // 鼠标移出: 清除选中状态
            dom.addEventListener('mouseleave', function (e) {
                that.clearCheckedStatus();

                that.setCheckedStatus(that.value);
            })

            // 点击: 设置选中状态
            dom.addEventListener('click', function (e) {
                const index = Number(this.getAttribute('data-index'));

                that.value = index + 1;
                that.dispatchEvent(new CustomEvent("change", {
                    detail: {
                        value: index + 1,
                        rateText: that.#textList[index]
                    }
                }))
            })
        })
    }

    init() {
        const that = this;

        // icon-class 自定图标样式类初始化
        this.activeIconClass = this.activeIconClass;

        // void-icon-class 自定空图标样式类初始化
        this.voidIconClass = this.voidIconClass;

        // show-text 显示文本初始化
        this.showText = this.showText;

        // color 颜色初始化
        this.color = this.color;

        // value 星级初始化
        this.value = this.value;

        // disabled 禁用初始化
        this.disabled = this.disabled;

        // 初始化鼠标事件
        if (!this.disabled) this.initRateEvent();
    }

    connectedCallback() {
        this.init();

        this.#mounted = true;
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (!this.#mounted) return;

        if (name == "value") {

            this.clearCheckedStatus();

            this.setCheckedStatus(newVal);
        }
    }
}