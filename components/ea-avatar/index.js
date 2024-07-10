// @ts-nocheck
import Base from '../Base.js';

const stylesheet = `
.ea-avatar_wrap .ea-avatar {
  position: relative;
  display: inline-block;
  overflow: hidden;
  color: #ffffff;
}
.ea-avatar_wrap .ea-avatar.ea-avatar-fill--fill img {
  object-fit: fill;
}
.ea-avatar_wrap .ea-avatar.ea-avatar-fill--contain img {
  object-fit: contain;
}
.ea-avatar_wrap .ea-avatar.ea-avatar-fill--cover img {
  object-fit: cover;
}
.ea-avatar_wrap .ea-avatar.ea-avatar-fill--none img {
  object-fit: none;
}
.ea-avatar_wrap .ea-avatar.ea-avatar-fill--scale-down img {
  object-fit: scale-down;
}
.ea-avatar_wrap .ea-avatar.ea-avatar--normal {
  width: 50px;
  height: 50px;
  line-height: 50px;
}
.ea-avatar_wrap .ea-avatar.ea-avatar--large {
  width: 40px;
  height: 40px;
  line-height: 40px;
}
.ea-avatar_wrap .ea-avatar.ea-avatar--medium {
  width: 36px;
  height: 36px;
  line-height: 36px;
}
.ea-avatar_wrap .ea-avatar.ea-avatar--small {
  width: 28px;
  height: 28px;
  line-height: 28px;
}
.ea-avatar_wrap .ea-avatar .ea-avatar--text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.ea-avatar_wrap .ea-avatar.ea-avatar--circle {
  border-radius: 50%;
}
.ea-avatar_wrap .ea-avatar.ea-avatar--square {
  border-radius: 5px;
}
.ea-avatar_wrap .ea-avatar .ea-avatar--img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
`;

const defaultAvatar = `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <clipPath id="a">
                <path d="M0 40h90v45H0z" />
            </clipPath>
        </defs>
        <path fill="#c0c4cc" d="M0 0h100v100H0z" />
        <circle cx="50" cy="35" r="20" fill="#fff" />
        <circle cx="50" cy="97" r="40" fill="#fff" clip-path="url(#a)" />
    </svg>
`;

const errorAvatar = `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path fill="#c0c4cc" d="M0 0h100v100H0z" />
        <path fill="#fff" d="M15 20h70v60H15z" />
        <circle r="8" cx="32" cy="35" fill="#c0c4cc" />
        <path d="M60 42.5L39 75h42z" fill="#c0c4cc" />
        <path d="M35 52.5L20 75h-4 32z" fill="#c0c4cc" />
    </svg>
`;

const iconAvatar = (icon) => {
    return `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path fill="#c0c4cc" d="M0 0h100v100H0z" />
        </svg>
        <i class="fa ea-avatar--text ${icon}"></i>
    `;
}

const textAvatar = (text) => {
    return `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path fill="#c0c4cc" d="M0 0h100v100H0z" />
        </svg>
        <span class="ea-avatar--text">${text}</span>
    `;
}

export class EaAvatar extends Base {
    #wrap;

    #textSlot;

    #avatar;
    #img;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = 'ea-avatar_wrap';

        const avatar = document.createElement('span');
        avatar.className = 'ea-avatar';
        avatar.innerHTML = defaultAvatar;
        wrap.appendChild(avatar);

        const slot = document.createElement('slot');
        avatar.appendChild(slot);

        const img = document.createElement('img');
        avatar.appendChild(img);

        this.#wrap = wrap;
        this.#textSlot = slot;
        this.#avatar = avatar;
        this.#img = img;

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = new URL('../ea-icon/index.css', import.meta.url).href;
        shadowRoot.appendChild(link);

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);
    }

    // ------- size 图片大小 -------
    // #region
    get size() {
        const sizeNumber = this.getAttrNumber('size');
        const sizeString = this.getAttribute('size');

        if (sizeNumber === 0 || !sizeNumber) {
            return ['large', 'medium', 'small'].includes(sizeString) ? sizeString : 'normal';
        }

        return this.getAttrNumber('size');
    }

    set size(value) {
        this.setAttribute('size', value);


        if (typeof value === "number") {
            this.#avatar.style.width = `${value}px`;
            this.#avatar.style.height = `${value}px`;
            this.#avatar.style.lineHeight = `${value}px`;
        } else if (typeof value === "string") {
            this.#avatar.classList.add(`ea-avatar--${value}`);
        }
    }
    // #endregion
    // ------- end -------

    // ------- shape 图片形状 -------
    // #region
    get shape() {
        const shape = this.getAttribute('shape');

        return ['circle', 'square'].includes(shape) ? shape : 'circle';
    }

    set shape(value) {
        this.setAttribute('shape', value);
        this.#avatar.classList.add(`ea-avatar--${this.shape}`);
    }
    // #endregion
    // ------- end -------

    // ------- src 图片链接 -------
    // #region
    get src() {
        return this.getAttribute('src');
    }

    set src(value) {
        if (!value) return;

        const image = new Image();
        image.src = value;

        image.onload = () => {
            this.setAttribute('src', value);
            this.#avatar.innerHTML = `<img class="ea-avatar--img" src="${value}" alt="头像">`;
        };

        image.onerror = (e) => {
            this.setAttribute('src', value);
            this.#avatar.innerHTML = errorAvatar;

            this.dispatchEvent(new CustomEvent('error', {
                detail: {
                    error: e,
                },
            }));
        };
    }
    // #endregion
    // ------- end -------

    // ------- icon 图标 -------
    // #region
    get icon() {
        return this.getAttribute('icon');
    }

    set icon(value) {
        this.setAttribute('icon', value);

        this.#avatar.innerHTML = iconAvatar(value);
    }
    // #endregion
    // ------- end -------

    // ------- fit 图片容器适应 -------
    // #region
    get fit() {
        return this.getAttribute('fit') || 'cover';
    }

    set fit(value) {
        this.setAttribute('fit', value);

        this.#avatar.classList.add(`ea-avatar-fill--${value}`);
    }
    // #endregion
    // ------- end -------

    init() {
        const that = this;

        this.size = this.size;

        this.shape = this.shape;

        this.src = this.src;

        if (this.src) {
            this.fit = this.fit;
        }

        if (!this.src && this.icon) {
            this.icon = this.icon;
        }

        if (this.innerHTML !== "" && !this.icon && !this.src) {
            this.#avatar.innerHTML = textAvatar(this.innerHTML);
        }
    }

    connectedCallback() {
        this.init();
    }
}

if (!customElements.get('ea-avatar')) {
    customElements.define('ea-avatar', EaAvatar);
}