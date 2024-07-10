// @ts-nocheck
import Base from '../Base.js';

const stylesheet = `
.ea-tag_wrap {
  display: inline-block;
  height: 2rem;
  line-height: 30px;
  white-space: nowrap;
  padding: 0 0.625rem;
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
}
.ea-tag_wrap.ea-tag--default {
  color: #409eff;
  background-color: #ecf5ff;
  border-color: #dcdfe6;
}
.ea-tag_wrap.ea-tag--default.ea-tag--dark {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
.ea-tag_wrap.ea-tag--default.ea-tag--plain {
  color: #409eff;
  background-color: #fff;
  border-color: #dcdfe6;
}
.ea-tag_wrap.ea-tag--success {
  color: #67c23a;
  background-color: #f0f9eb;
  border-color: #e1f3d8;
}
.ea-tag_wrap.ea-tag--success.ea-tag--dark {
  color: #fff;
  background-color: #67c23a;
  border-color: #67c23a;
}
.ea-tag_wrap.ea-tag--success.ea-tag--plain {
  color: #67c23a;
  background-color: #fff;
  border-color: #e1f3d8;
}
.ea-tag_wrap.ea-tag--info {
  color: #909399;
  background-color: #f4f4f5;
  border-color: #e9e9eb;
}
.ea-tag_wrap.ea-tag--info.ea-tag--dark {
  color: #fff;
  background-color: #909399;
  border-color: #909399;
}
.ea-tag_wrap.ea-tag--info.ea-tag--plain {
  color: #909399;
  background-color: #fff;
  border-color: #e9e9eb;
}
.ea-tag_wrap.ea-tag--warning {
  color: #e6a23c;
  background-color: #fdf6ec;
  border-color: #faecd8;
}
.ea-tag_wrap.ea-tag--warning.ea-tag--dark {
  color: #fff;
  background-color: #e6a23c;
  border-color: #e6a23c;
}
.ea-tag_wrap.ea-tag--warning.ea-tag--plain {
  color: #e6a23c;
  background-color: #fff;
  border-color: #faecd8;
}
.ea-tag_wrap.ea-tag--danger {
  color: #f56c6c;
  background-color: #fef0f0;
  border-color: #fbc4c4;
}
.ea-tag_wrap.ea-tag--danger.ea-tag--dark {
  color: #fff;
  background-color: #f56c6c;
  border-color: #f56c6c;
}
.ea-tag_wrap.ea-tag--danger.ea-tag--plain {
  color: #f56c6c;
  background-color: #fff;
  border-color: #fbc4c4;
}
`;

const closeDom = () => {
  const closeIcon = document.createElement('i');
  closeIcon.className = 'icon-cancel-circled2';
  closeIcon.style.cssText = `
        font-size: 1rem;
        margin-left: 0.5rem;
        cursor: pointer;
    `;

  return closeIcon;
}

export class EaTag extends Base {
  #wrap;
  #closeSlot;
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
    const wrap = document.createElement('div');
    wrap.className = 'ea-tag_wrap';

    const textSlot = document.createElement('slot');
    wrap.appendChild(textSlot);

    const closeSlot = document.createElement('slot');
    closeSlot.name = 'close';
    wrap.appendChild(closeSlot);

    this.#wrap = wrap;
    this.#closeSlot = closeSlot;

    this.build(shadowRoot, stylesheet);
    this.shadowRoot.appendChild(wrap);
  }

  // ------- type tag类型样式 -------
  // #region
  get type() {
    return this.getAttribute('type') || "default";
  }

  set type(value) {
    this.setAttribute('type', value);
    this.#wrap.classList.add(`ea-tag--${value}`);
  }
  // #endregion
  // ------- end -------

  // ------- closable 是否显示可关闭 -------
  // #region
  get closable() {
    return this.getAttrBoolean('closable');
  }

  set closable(value) {
    this.toggleAttr('closable', value);
  }
  // #endregion
  // ------- end -------

  // ------- effect 不同主题 -------
  // #region
  get effect() {
    return this.getAttribute('effect') || "light";
  }

  set effect(value) {
    if (value === "light") return;

    this.setAttribute('effect', value);
    this.#wrap.classList.add(`ea-tag--${value}`);
  }
  // #endregion
  // ------- end -------
  initCloseEvent() {
    const that = this;
    const closeIcon = closeDom();

    closeIcon.addEventListener('mouseenter', function (e) {
      closeIcon.className = 'icon-cancel-circled';
    });

    closeIcon.addEventListener('mouseleave', function (e) {
      closeIcon.className = 'icon-cancel-circled2';
    });

    closeIcon.addEventListener('click', function (e) {
      that.dispatchEvent(new CustomEvent('close', {
        detail: {
          value: that.innerText
        },
        bubbles: true,
      }));
    });

    this.#closeSlot.appendChild(closeIcon);
  }

  init() {
    const that = this;

    // tag类型
    this.type = this.type;

    // 显示可关闭
    this.closable = this.closable;
    if (this.closable) this.initCloseEvent();

    // 主题
    this.effect = this.effect;
  }

  connectedCallback() {
    this.init();
  }
}

if (!customElements.get('ea-tag')) {
  customElements.define('ea-tag', EaTag);
}