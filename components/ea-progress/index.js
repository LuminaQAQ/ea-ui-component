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
        this.#path.style.width = `${value}%`;
        this.#progressText.innerHTML = `${value}%`;
    }
    // #endregion
    // ------- end -------

    // ------- status 进度条状态样式 -------
    // #region
    get statusList() {
        return {
            success: 'icon-ok-circled',
            warning: 'warning',
            danger: 'icon-cancel-circled'
        }
    }

    get status() {
        return this.getAttribute('status');
    }

    set status(value) {
        this.setAttribute('status', value);
        this.#progressText.innerHTML = value;
    }
    // #endregion
    // ------- end -------

    init() {
        const that = this;

        this.percentage = this.percentage;
    }

    connectedCallback() {
        this.init();
    }
}