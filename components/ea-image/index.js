// @ts-nocheck
import Base from '../Base';
import { createElement, createSlotElement } from '../../utils/createElement.js';

const stylesheet = `
@import url('/ea_ui_component/icon/index.css');

.ea-image_wrap.is-loading, .ea-image_wrap.is-error {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f7fa;
}
.ea-image_wrap.is-error svg {
  width: 20px;
  height: 20px;
}
.ea-image_wrap img {
  position: relative;
  width: 100%;
  height: 100%;
  user-zoom: scale;
  object-fit: cover;
  transition: rotate 0.3s, scale 0.3s;
}
.ea-image_wrap .ea-image_preview-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  opacity: 0;
  transform: translateY(-1rem);
  transition: opacity 0.3s, transform 0.3s;
  background-color: rgba(0, 0, 0, 0.4);
}
.ea-image_wrap .ea-image_preview-wrap.entry {
  opacity: 1;
  transform: translateY(0);
}
.ea-image_wrap .ea-image_preview-wrap .ea-icon-close {
  position: absolute;
  right: 40px;
  top: 40px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  font-size: 24px;
  line-height: 36px;
  border-radius: 50%;
  color: #fff;
  background-color: #606266;
  text-align: center;
}
.ea-image_wrap .ea-image_preview-wrap img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.ea-image_wrap .ea-image_preview-tools {
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: absolute;
  bottom: 20px;
  left: 50%;
  padding: 0.5rem 1rem;
  user-select: none;
  border-radius: 999px;
  transform: translateX(-50%);
  background-color: rgba(96, 98, 102, 0.568627451);
  color: #fff;
}
.ea-image_wrap .ea-image_preview-tools .ea-icon-zoom,
.ea-image_wrap .ea-image_preview-tools .ea-icon-rotate {
  width: 2rem;
  text-align: center;
  cursor: pointer;
  margin: 0 1rem;
}
.ea-image_wrap .ea-image_preview-tools .ea-icon-zoom {
  font-size: 2rem;
}
.ea-image_wrap .ea-image_preview-tools .ea-icon-zoom-in {
  font-size: 1.75rem;
}
.ea-image_wrap .ea-image_preview-tools .ea-icon-rotate {
  font-size: 1.5rem;
}
`;

const errorImage = `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path fill="#c0c4cc" d="M0 0h100v100H0z" />
        <path fill="#fff" d="M15 20h70v60H15z" />
        <circle r="8" cx="32" cy="35" fill="#c0c4cc" />
        <path d="M60 42.5L39 75h42z" fill="#c0c4cc" />
        <path d="M35 52.5L20 75h-4 32z" fill="#c0c4cc" />
    </svg>
`;

export class EaImage extends Base {
    #wrap;

    #img;
    #imgSlot;

    #previewWrap;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = 'ea-image_wrap';

        const imgSlot = createSlotElement('placeholder');
        const img = createElement('img', 'ea-image', [imgSlot]);
        wrap.appendChild(img);

        this.#wrap = wrap;
        this.#img = img;
        this.#imgSlot = imgSlot;

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);
    }

    // ------- src 图片的路径 -------
    // #region
    get src() {
        return this.getAttribute('src') || "";
    }

    set src(src) {
        this.setAttribute('src', src);
    }
    // #endregion
    // ------- end -------

    // ------- width 图片宽度 -------
    // #region
    get width() {
        return this.getAttribute('width') || "100px";
    }

    set width(value) {
        this.setAttribute('width', value);

        this.#wrap.style.width = value;
    }
    // #endregion
    // ------- end -------

    // ------- height 图片高度 -------
    // #region
    get height() {
        return this.getAttribute('height') || "100px";
    }

    set height(value) {
        this.setAttribute('height', value);

        this.#wrap.style.height = value;
    }
    // #endregion
    // ------- end -------

    // ------- alt 图片描述 -------
    // #region
    get alt() {
        return this.getAttribute('alt') || "";
    }

    set alt(value) {
        this.setAttribute('alt', value);

        this.#img.alt = value;
    }
    // #endregion
    // ------- end -------

    // ------- fit 图片缩放模式 -------
    // #region
    get fit() {
        return this.getAttribute('fit') || "cover";
    }

    set fit(value) {
        this.setAttribute('fit', value);

        this.#img.style.objectFit = value;
    }
    // #endregion
    // ------- end -------

    // ------- lazy 图片懒加载 -------
    // #region
    get lazy() {
        return this.getAttrBoolean('lazy');
    }

    set lazy(value) {
        this.setAttribute('lazy', value);
    }
    // #endregion
    // ------- end -------

    // ------- preview 大图预览 -------
    // #region
    get preview() {
        return this.getAttrBoolean('preview');
    }

    set preview(value) {
        this.setAttribute('preview', value);
    }
    // #endregion
    // ------- end -------

    #handleImageLoad(src, isLazy = false) {
        const image = new Image();

        if (isLazy) {
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].intersectionRatio <= 0) return;

                image.src = src;
                observer.disconnect();
            });

            observer.observe(this.#wrap);
        } else {
            image.src = src;
        }

        image.onload = () => {
            this.#img.setAttribute('src', src);
            this.#imgSlot.innerHTML = "";

            this.dispatchEvent(new CustomEvent('load', { detail: { src } }));
        };

        image.onerror = () => {
            this.#wrap.innerHTML = errorImage;
            this.#wrap.classList.add('is-error');
            this.#imgSlot.innerHTML = "";

            this.dispatchEvent(new CustomEvent('error', { detail: { src } }));
        };
    }

    #handlePreviewDisplay(wrap) {
        wrap.classList.remove('entry');

        wrap.addEventListener('transitionend', () => {
            wrap.remove();
            document.body.style.overflow = 'auto';
        })
    }

    /**
     * 创建一个图片预览的关闭按钮
     * 
     * @returns {HTMLElement} 返回创建的关闭按钮元素
     */
    #createCloseBtn(wrap) {
        // 创建一个span元素，并设置其类名为'ea-icon-close'，用于表示一个关闭图标
        const closeBtn = createElement('span', 'ea-icon-close');

        // 设置按钮的内联文本为"x"，作为关闭符号
        closeBtn.innerText = "x";

        // 为按钮添加点击事件监听器，当按钮被点击时，调用#handlePreviewDisplay处理函数
        closeBtn.addEventListener('click', () => {
            this.#handlePreviewDisplay(wrap);
        });

        // 返回创建的关闭按钮元素
        return closeBtn;
    }

    /**
     * 创建一个图片预览的关闭按钮
     * 
     * @param {HTMLElement} img 图片元素
     * @returns {HTMLElement} 返回创建的关闭按钮元素
     */
    #createPreviewTools(img) {
        const zoomInBtn = createElement('span', 'ea-icon-zoom ea-icon-zoom-in');
        zoomInBtn.innerText = "+";
        zoomInBtn.addEventListener('click', () => {
            img.style.scale = img.style.scale ? Number(img.style.scale) + 0.2 : 1.2;
        });

        const zoomOutBtn = createElement('span', 'ea-icon-zoom ea-icon-zoom-out');
        zoomOutBtn.innerText = "-";
        zoomOutBtn.addEventListener('click', () => {
            img.style.scale = img.style.scale ? Number(img.style.scale) - 0.2 : 0.8;
        });

        const rotateLeft = createElement('span', 'ea-icon-rotate ea-icon-rotate-left');
        rotateLeft.innerText = "↺";
        rotateLeft.addEventListener('click', () => {
            img.style.rotate = (img.style.rotate ? Number(img.style.rotate.split('deg')[0]) - 90 : -90) + "deg";
        });

        const rotateRight = createElement('span', 'ea-icon-rotate ea-icon-rotate-right');
        rotateRight.innerText = "↻";
        rotateRight.addEventListener('click', () => {
            img.style.rotate = (img.style.rotate ? Number(img.style.rotate.split('deg')[0]) + 90 : 90) + "deg";
        });

        const toolsWrap = createElement('div', 'ea-image_preview-tools', [zoomInBtn, zoomOutBtn, rotateLeft, rotateRight]);

        return toolsWrap;
    }

    /**
     * 构建图片预览工具
     * @param {HTMLElement} img 图片元素
     */
    #handleImageDrag(wrap, img) {
        let startX = 0;
        let startY = 0;

        function handleMouseMove(e) {
            const { clientX, clientY } = e;

            img.style.marginLeft = `${clientX - startX}px`;
            img.style.marginTop = `${clientY - startY}px`;
        }

        img.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });

        img.addEventListener('mousedown', (e) => {
            startX = e.clientX;
            startY = e.clientY;

            img.addEventListener('mousemove', handleMouseMove);

            img.addEventListener('mouseup', () => {
                img.removeEventListener('mousemove', handleMouseMove);
            });
        });
    }

    /**
     * 处理图片预览功能。
     * 当isPreview参数为true时，为图片添加点击事件监听器，以实现预览功能。
     * 预览功能包括：克隆图片元素、设置图片样式、处理图片拖动、创建关闭按钮和工具栏、以及隐藏滚动条。
     * @param {boolean} isPreview - 是否开启图片预览功能。
     */
    #handleImagePreview(isPreview) {
        if (isPreview) {
            this.#img.addEventListener('click', () => {
                // 克隆图片元素以用于预览，并设置图片的object-fit属性为contain。
                const img = this.#img.cloneNode(true);
                img.style.objectFit = "contain";

                // 创建预览包装元素，并将克隆的图片添加到其中。
                const wrap = createElement('div', 'ea-image_preview-wrap', [img]);
                this.#wrap.appendChild(wrap);

                // 创建并添加关闭按钮到预览窗口。
                const closeBtn = this.#createCloseBtn(wrap);
                wrap.appendChild(closeBtn);

                // 创建并添加预览工具栏到预览窗口。
                const toolkit = this.#createPreviewTools(img, wrap);
                wrap.appendChild(toolkit);

                // 延迟20毫秒后添加动画入口类，以平滑地显示预览窗口。
                setTimeout(() => {
                    wrap.classList.add('entry');
                }, 20)

                // 初始化图片拖动功能。
                this.#handleImageDrag(wrap, img);

                // 隐藏页面滚动条，以提供更好的预览体验。
                document.body.style.overflow = 'hidden';
            });
        }
    }

    init() {
        const that = this;

        this.width = this.width;
        this.height = this.height;
        this.fit = this.fit;
        this.alt = this.alt;

        this.lazy = this.lazy;
        this.src = this.src;

        this.preview = this.preview;

        this.#handleImageLoad(this.src, this.lazy);
        this.#handleImagePreview(this.preview);
    }

    connectedCallback() {
        this.init();
    }
}

if (!customElements.get('ea-image')) {
    customElements.define('ea-image', EaImage);
}