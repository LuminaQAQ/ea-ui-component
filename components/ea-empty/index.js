// @ts-nocheck
import Base from '../Base.js';

const stylesheet = `
.ea-empty_wrap {
  padding: 40px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.ea-empty_wrap .ea-empty_image {
  width: 8rem;
  object-fit: cover;
}
.ea-empty_wrap .ea-empty_image svg,
.ea-empty_wrap .ea-empty_image img {
  width: 100%;
  height: 100%;
}
.ea-empty_wrap .ea-empty_description {
  margin-top: 20px;
}
.ea-empty_wrap .ea-empty_bottom {
  margin-top: 20px;
}
`;

const emptyStatusSVG = `
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 50v21.5a2 2 0 0 0 1 1h39a2 2 0 0 0 1-1V50H61a10 10 0 0 1-20 0h-6.5z" fill="#6E6E6F" />
    <path d="M30.5 50.5L34 39h32.5l4 11.5" fill="none" stroke="#6E6E6F" />
</svg>
`;

export class EaEmpty extends Base {
    #wrap;
    #imageWrap;
    #descriptionWrap;
    #slot;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = 'ea-empty_wrap';

        const imageWrap = document.createElement('div');
        imageWrap.className = 'ea-empty_image';
        imageWrap.innerHTML = emptyStatusSVG;
        wrap.appendChild(imageWrap);

        const descriptionWrap = document.createElement('div');
        descriptionWrap.className = 'ea-empty_description';
        descriptionWrap.innerHTML = `暂无数据`;
        wrap.appendChild(descriptionWrap);

        const bottomWrap = document.createElement('div');
        const slot = document.createElement('slot');
        bottomWrap.className = 'ea-empty_bottom';
        bottomWrap.appendChild(slot);
        wrap.appendChild(bottomWrap);

        this.#wrap = wrap;
        this.#imageWrap = imageWrap;
        this.#descriptionWrap = descriptionWrap;
        this.#slot = slot;

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);
    }

    // ------- description 描述文字 -------
    // #region
    get description() {
        return this.getAttribute('description') || "暂无数据";
    }

    set description(value) {
        this.setAttribute('description', value);
        this.#descriptionWrap.innerHTML = value;
    }
    // #endregion
    // ------- end -------

    // ------- image 自定义图片 -------
    // #region
    get image() {
        return this.getAttribute('image') || "";
    }

    set image(value) {
        if (!value) return;

        this.setAttribute('image', value);

        const image = new Image();
        image.src = value;
        image.onload = () => {
            // this.#imageWrap.style.width = image.width + "px";
            this.#imageWrap.innerHTML = `<img src="${value}" />`;
        }

    }
    // #endregion
    // ------- end -------

    // ------- image-size 自定义图片大小 -------
    // #region
    get imageSize() {
        return this.getAttribute('image-size') || "128";
    }

    set imageSize(value) {
        if (!value) return;

        this.setAttribute('image-size', value);
        this.#imageWrap.style.width = value + "px";
    }
    // #endregion
    // ------- end -------

    init() {
        const that = this;

        this.description = this.description;

        this.image = this.image;

        this.imageSize = this.imageSize;
    }

    connectedCallback() {
        this.init();
    }
}

if (!customElements.get('ea-empty')) {
    customElements.define('ea-empty', EaEmpty);
}