// @ts-nocheck
import Base from '../Base';

const stylesheet = `
@import url('/ea_ui_component/icon/index.css');

`;

const rateDom = (index) => {
    const dom = document.createElement('span');
    dom.className = 'ea-rate_item';
    dom.setAttribute('data-index', index + 1);

    const icon = document.createElement('i');
    icon.className = 'icon-star-empty';

    dom.appendChild(icon);

    return dom;
}


export default class EaRate extends Base {
    #wrap;
    #textList = ["极差", "失望", "一般", "满意", "惊喜"];
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = 'ea-rate_wrap';

        const that = this;
        for (let i = 0; i < 5; i++) {
            const dom = rateDom(i);
            wrap.appendChild(dom);

            // 鼠标移入: 显示选中状态
            dom.addEventListener('mouseenter', function (e) {
                const index = Number(this.getAttribute('data-index'));

                that.clearCheckedStatus();
                that.setCheckedStatus(index - 1);

                that.dispatchEvent(new CustomEvent("hover", {
                    detail: {
                        value: index
                    }
                }));
            })

            // 鼠标移出: 清除选中状态
            dom.addEventListener('mouseleave', function (e) {
                that.clearCheckedStatus();

                that.setCheckedStatus(that.value - 1);
            })

            // 点击: 设置选中状态
            dom.addEventListener('click', function (e) {
                const index = Number(this.getAttribute('data-index'));

                that.value = index - 1;
                that.dispatchEvent(new CustomEvent("change", {
                    detail: {
                        value: index
                    }
                }))
            })
        }

        this.#wrap = wrap;
        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);
    }

    // 设置/显示选中状态
    setCheckedStatus(index) {
        const item = this.#wrap.querySelectorAll('.ea-rate_item');

        for (let i = 0; i <= index; i++) {
            item[i].classList.add('ea-rate_item--active');
            item[i].querySelector('i').className = "icon-star";

            if (this.showText) {
                const text = this.#wrap.querySelector('.ea-rate_text');
                text.innerText = this.showTextList[index];
            }
        }
    }

    // 当未选中时, 清除选中状态
    clearCheckedStatus() {
        this.#wrap.querySelectorAll('.ea-rate_item').forEach(item => {
            item.classList.remove('ea-rate_item--active');
            item.querySelector('i').className = "icon-star-empty";

            if (this.showText) {
                const text = this.#wrap.querySelector('.ea-rate_text');
                text.innerText = "";
            }
        })
    }

    // ------- value 当前选中值 -------
    // #region
    get value() {
        const value = this.getAttribute('value');

        if (value < 1 || value > 5 || !value) return 0;
        return Number(this.getAttribute('value'));
    }

    set value(val) {
        val = Number(val);

        this.setAttribute('value', val + 1);

        this.clearCheckedStatus();

        this.setCheckedStatus(val);
    }

    // #endregion
    // ------- end -------

    // ------- colors 颜色 -------
    // #region
    get colors() {
        return this.getAttribute('colors') || 'rgb(247, 186, 42)';
    }

    set colors(val) {
        this.setAttribute('colors', val);
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

    init() {
        const that = this;

        // show-text 显示文本初始化
        if (this.showText) {
            const text = document.createElement('span');
            text.className = 'ea-rate_text';
            this.#wrap.appendChild(text);
        }
        this.showText = this.showText;

        // colors 颜色初始化
        this.colors = this.colors;

        // value 星级初始化
        this.value = this.value - 1;
    }

    connectedCallback() {
        this.init();
    }
}