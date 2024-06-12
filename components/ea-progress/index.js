// @ts-nocheck
import Base from '../Base';

const stylesheet = `
@import url('/ea_ui_component/icon/index.css');
`;

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
    get type() {
        return this.getAttribute('type');
    }

    set type(value) {
        if (value === null || value === undefined || value === '') return;

        this.setAttribute('type', value);

        if (this.type === "circle") {
            this.#wrap.style.height = '126px';
            this.#wrap.style.width = '126px';
            this.#wrap.innerHTML = `
                <svg viewBox="0 0 100 100">
                    <circle class="track" cx="50" cy="50" r="48" fill="none" stroke="aliceblue" stroke-width="4" stroke-dasharray="302px" stroke-dashoffset="0" style="transform-origin: center; transform: rotate(-90deg);" />
                    <circle class="path" cx="50" cy="50" r="48" fill="none" stroke="rgb(32, 160, 255)" stroke-width="4" stroke-dasharray="302px" stroke-dashoffset="0"  stroke-linecap="round" style="transform-origin: center; transform: rotate(-90deg);" />
                </svg>
                <span class="ea-progress_text--circle"></span>
            `;

            const track = this.#wrap.querySelector('circle[class="track"]');
            const path = this.#wrap.querySelector('circle[class="path"]');
            const progressText = this.#wrap.querySelector('span[class="ea-progress_text--circle"]');

            this.#track = track;
            this.#path = path;
            this.#progressText = progressText;
        }
    }
    // #endregion
    // ------- end -------

    // ------- percentage 进度百分比 -------
    // #region
    get percentage() {
        return this.getAttribute('percentage');
    }

    set percentage(value) {
        if (value === null || value === undefined || value === '') return;
        else if (Number(value) < 0) value = 0;
        else if (Number(value) > 100) value = 100;

        this.setAttribute('percentage', value);
        this.#progressText.innerHTML = `${value}%`;

        if (this.type === "circle") {
            this.#path.style.strokeDashoffset = `${302 * (100 - Number(value)) / 100}px`;
        } else {
            this.#path.style.width = `${value}%`;

            if (this.textInside) this.handleTextInside(value);
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

        if (this.type === "circle") {
            this.#path.style.stroke = this.statusList[value].color;

            this.handleStatusStyle(value, 'ea-progress_text--circle');
        } else {
            this.#path.style.backgroundColor = this.statusList[value].color;

            this.handleStatusStyle(value, 'ea-progress_text');
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