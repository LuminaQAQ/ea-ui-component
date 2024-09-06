import Base from '../Base.js';
import "../ea-icon/index.js"

import { stylesheet } from './src/style/stylesheet.js';

import { SVGComm } from "./src/components/SVGComm.js";

export class EaProgress extends Base {
    #wrap;
    #track;
    #path;
    #progressText;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <div class="ea-progress_wrap" part="container">
                <section class="ea-progress_track" part="track-wrap">
                    <section class="ea-progress_path" part="path"></section>
                </section>
                <section class="ea-progress_text" part="text-wrap"></section>
            </div>
        `;

        this.#wrap = shadowRoot.querySelector('.ea-progress_wrap');
        this.#track = shadowRoot.querySelector('.ea-progress_track');
        this.#path = shadowRoot.querySelector('.ea-progress_path');
        this.#progressText = shadowRoot.querySelector('.ea-progress_text');

        this.build(shadowRoot, stylesheet);
    }

    // ------- type 进度条类型 -------
    // #region
    get type() {
        return this.getAttribute('type');
    }

    set type(value) {
        if (!value) return;

        this.setAttribute('type', value);

        switch (this.type) {
            case "circle":
                this.#handleSVGTemplate("circle");
                break;
            case "dashboard":
                this.#handleSVGTemplate("dashboard");
                break;
        }
    }
    // #endregion
    // ------- end -------

    // ------- percentage 进度百分比 -------
    // #region
    get percentage() {
        return this.getAttribute('percentage') || 0;
    }

    #getCirclePercentageValue(value) {
        return 302 * (100 - Number(value)) / 100;
    }

    #getDashboardPercentageValue(value) {
        return 152 * (100 - Number(value)) / 100 + 100;
    }

    set percentage(value) {
        if (isNaN(Number(value))) return;
        else if (Number(value) < 0) value = 0;
        else if (Number(value) > 100) value = 100;

        this.setAttribute('percentage', value);
        this.#progressText.innerHTML = `${value}%`;

        switch (this.type) {
            case "circle": {
                this.#path.style.strokeDashoffset = `${this.#getCirclePercentageValue(value)}px`;
                break;
            }
            case "dashboard": {
                this.#path.style.strokeDashoffset = `${this.#getDashboardPercentageValue(value)}px`;
                break;
            }
            default: {
                this.#path.style.width = `${value}%`;

                if (this.textInside) this.#handleTextInside(value);
                break;
            }
        }
    }
    // #endregion
    // ------- end -------

    // ------- status 进度条状态样式 -------
    // #region

    // 样式配置
    get statusList() {
        return {
            success: {
                icon: 'icon-ok-circled',
                color: '#67c23a'
            },
            warning: {
                icon: 'icon-attention-circled',
                color: '#e6a23c'
            },
            exception: {
                icon: 'icon-cancel-circled',
                color: '#f56c6c'
            },
            primary: {},
        }
    }

    // 状态处理
    #handleStatusStyle(value, className) {
        if ((!this.type && this.textInside) || (this.type === 'dashboard' || this.type === 'circle')) {
            this.#progressText.innerText = `${this.percentage}%`;
        } else {
            this.#progressText.innerText = '';
        }

        this.#progressText.className = `${className} ${this.statusList[value].icon || ''}`;
        this.#progressText.style.color = this.statusList[value].color;
    }

    get status() {
        return this.getAttribute('status') || 'primary';
    }

    set status(value) {
        this.setAttribute('status', value);

        switch (this.type) {
            case "circle":
                this.#handleStatusStyle(value, 'ea-progress_text--circle');
                this.#path.style.stroke = this.statusList[value].color;
                break;
            case "dashboard":
                this.#handleStatusStyle(value, 'ea-progress_text--dashboard');
                this.#path.style.stroke = this.statusList[value].color;
                break;
            default:
                this.#handleStatusStyle(value, 'ea-progress_text');
                this.#path.style.backgroundColor = this.statusList[value].color;
                break;
        }
    }
    // #endregion
    // ------- end -------

    // ------- text-inside 进度文字内显 -------
    // #region
    get textInside() {
        return this.getAttrBoolean("text-inside");
    }

    set textInside(value) {
        if (this.type === "circle") return;

        this.setAttribute("text-inside", value);

        this.#handleTextInside(value);
    }
    // #endregion
    // ------- end -------

    // ------- stroke-width 进度条高度 -------
    // #region
    get strokeWidth() {
        return this.getAttribute("stroke-width");
    }

    set strokeWidth(value) {
        value = value ? Number(value) : 4;

        this.toggleAttr("stroke-width", value);

        if (this.type === "circle" || this.type === "dashboard") {
            this.#track.style.strokeWidth = `${value}px`;
            this.#path.style.strokeWidth = `${value}px`;
        } else {
            value = value + 4;

            this.#track.style.height = `${value}px`;
            this.#track.style.lineHeight = `${value}px`;
            this.#path.style.height = `${value}px`;
            this.#path.style.lineHeight = `${value}px`;

            this.#wrap.style.height = `${value}px`;
            this.#wrap.style.lineHeight = `${value}px`;
        }
    }
    // #endregion
    // ------- end -------

    #handleSVGTemplate(type) {
        this.#wrap.style.height = '126px';
        this.#wrap.style.width = '126px';

        this.#wrap.innerHTML = SVGComm[type];

        const track = this.#wrap.querySelector(`circle[class="track--${type}"]`);
        const path = this.#wrap.querySelector(`circle[class="path--${type}"]`);
        const progressText = this.#wrap.querySelector(`span[class="ea-progress_text--${type}"]`);

        this.#track = track;
        this.#path = path;
        this.#progressText = progressText;
    }

    #handleTextInside(value) {
        if (value) {
            this.#progressText.style.display = "none";
            this.#path.innerText = `${this.percentage}%`;
        } else {
            this.#progressText.style.display = "block";
            this.#path.innerText = ``;
        }
    }

    connectedCallback() {
        // type 进度条类型
        this.type = this.type;

        // percentage 百分比
        this.percentage = this.percentage;

        // status 状态
        this.status = this.status;

        // text-inside 文本内显
        this.textInside = this.textInside;

        // stroke-width 进度条的高度
        this.strokeWidth = this.strokeWidth;
    }
}

if (!customElements.get("ea-progress")) {
    customElements.define("ea-progress", EaProgress);
}