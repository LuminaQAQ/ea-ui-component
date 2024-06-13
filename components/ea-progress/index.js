// @ts-nocheck
import Base from '../Base';

const stylesheet = `
@import url('/ea_ui_component/icon/index.css');
`;

const SVGTemplate = {
    dashboard: `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle class="track--dashboard" cx="50" cy="50" r="40" fill="none" stroke-dasharray="252px" stroke="aliceblue"
            stroke-width="4px" stroke-dashoffset="100" stroke-linecap="round" />
        <circle class="path--dashboard" cx="50" cy="50" r="40" fill="none" stroke-dasharray="252px" stroke="rgb(32, 160, 255)" stroke-width="4px"
            stroke-dashoffset="252" stroke-linecap="round" />
    </svg>
    <span class="ea-progress_text--dashboard"></span>
    `,
    circle: `
    <svg viewBox="0 0 100 100">
        <circle class="track--circle" cx="50" cy="50" r="48" fill="none" stroke="aliceblue" stroke-width="4" stroke-dasharray="302px" stroke-dashoffset="0" />
        <circle class="path--circle" cx="50" cy="50" r="48" fill="none" stroke="rgb(32, 160, 255)" stroke-width="4" stroke-dasharray="302px" stroke-dashoffset="0"  stroke-linecap="round" />
    </svg>
    <span class="ea-progress_text--circle"></span>
    `,
}

export default class EaProgress extends Base {
    #wrap;
    #track;
    #path;
    #progressText;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = 'ea-progress_wrap';

        // 背景条
        const track = document.createElement('section');
        track.className = 'ea-progress_track';

        // 进度条
        const path = document.createElement('section');
        path.className = 'ea-progress_path';

        track.appendChild(path);
        wrap.appendChild(track);

        // 进度文字
        const progressText = document.createElement('section');
        progressText.className = 'ea-progress_text';

        wrap.appendChild(progressText);

        this.#wrap = wrap;
        this.#track = track;
        this.#path = path;
        this.#progressText = progressText;

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);
    }

    // ------- type 进度条类型 -------
    // #region

    handleSVGTemplate(type) {
        this.#wrap.style.height = '126px';
        this.#wrap.style.width = '126px';

        this.#wrap.innerHTML = SVGTemplate[type];

        const track = this.#wrap.querySelector(`circle[class="track--${type}"]`);
        const path = this.#wrap.querySelector(`circle[class="path--${type}"]`);
        const progressText = this.#wrap.querySelector(`span[class="ea-progress_text--${type}"]`);

        this.#track = track;
        this.#path = path;
        this.#progressText = progressText;
    }

    get type() {
        return this.getAttribute('type');
    }

    set type(value) {
        if (value === null || value === undefined || value === '') return;

        this.setAttribute('type', value);

        switch (this.type) {
            case "circle":
                this.handleSVGTemplate("circle");
                break;
            case "dashboard":
                this.handleSVGTemplate("dashboard");
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

    getCirclePercentageValue(value) {
        return 302 * (100 - Number(value)) / 100;
    }

    getDashboardPercentageValue(value) {
        return 152 * (100 - Number(value)) / 100 + 100;
    }

    set percentage(value) {
        if (value === null || value === undefined || value === '') return;
        else if (Number(value) < 0) value = 0;
        else if (Number(value) > 100) value = 100;

        this.setAttribute('percentage', value);
        this.#progressText.innerHTML = `${value}%`;

        switch (this.type) {
            case "circle": {
                this.#path.style.strokeDashoffset = `${this.getCirclePercentageValue(value)}px`;
                break;
            }
            case "dashboard": {
                this.#path.style.strokeDashoffset = `${this.getDashboardPercentageValue(value)}px`;
                break;
            }
            default: {
                this.#path.style.width = `${value}%`;

                if (this.textInside) this.handleTextInside(value);
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
            primary: '',
        }
    }

    // 状态处理
    handleStatusStyle(value, className) {
        this.#progressText.innerText = !this.statusList[value] ? `${this.percentage}%` : '';
        this.#progressText.className = `${className} ${this.statusList[value].icon || ''}`;
        this.#progressText.style.color = this.statusList[value].color;
    }

    get status() {
        return this.getAttribute('status') || 'primary';
    }

    set status(value) {
        this.setAttribute('status', value);
        this.#path.style.stroke = this.statusList[value].color;

        switch (this.type) {
            case "circle":
                this.handleStatusStyle(value, 'ea-progress_text--circle');
                break;
            case "dashboard":
                this.handleStatusStyle(value, 'ea-progress_text--dashboard');
                break;
            default:
                this.handleStatusStyle(value, 'ea-progress_text');
                break;
        }
    }
    // #endregion
    // ------- end -------

    // ------- text-inside 进度文字内显 -------
    // #region
    handleTextInside(value) {
        if (this.type === "circle") return;

        if (value) {
            this.#progressText.style.display = "none";
            this.#path.innerText = `${this.percentage}%`;
        } else {
            this.#progressText.style.display = "block";
            this.#path.innerText = ``;
        }
    }

    get textInside() {
        return this.getAttrBoolean("text-inside");
    }

    set textInside(value) {
        this.setAttribute("text-inside", value);

        this.handleTextInside(value);
    }
    // #endregion
    // ------- end -------

    // ------- stroke-width 进度条高度 -------
    // #region
    get strokeWidth() {
        return this.getAttribute("stroke-width");
    }

    set strokeWidth(value) {
        value = value ? value : 4;

        this.toggleAttr("stroke-width", value);

        if (this.type === "circle") {
            this.#track.style.strokeWidth = `${Number(value)}px`;
            this.#path.style.strokeWidth = `${Number(value)}px`;
        } else {
            value = Number(value) + 4;

            this.#track.style.height = `${value}px`;
            this.#track.style.lineHeight = `${value}px`;
            this.#path.style.height = `${value}px`;
            this.#path.style.lineHeight = `${value}px`;
        }
    }
    // #endregion
    // ------- end -------

    init() {
        const that = this;

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

    connectedCallback() {
        this.init();
    }
}