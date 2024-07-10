// @ts-nocheck
import Base from '../Base.js';
import { createElement } from '../../utils/createElement.js';
import "../ea-icon/index.js"

const stylesheet = `
.ea-alert_wrap {
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  border-radius: 4px;
  padding: 8px 16px;
  margin: 20px 0 0;
  display: flex;
  align-items: center;
  width: 100%;
  opacity: 1;
  transition: opacity 0.2s;
}
.ea-alert_wrap .ea-alert_content {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.ea-alert_wrap .ea-alert_content .ea-alert_title {
  display: flex;
  align-items: center;
}
.ea-alert_wrap .ea-alert_content .ea-alert_title i {
  margin-right: 0.5rem;
}
.ea-alert_wrap .ea-alert_content .ea-alert_close-icon {
  color: #c0c4cc;
  cursor: pointer;
}
.ea-alert_wrap .ea-alert_content.ea-alert--center .ea-alert_title,
.ea-alert_wrap .ea-alert_content.ea-alert--center .ea-alert_close-icon {
  margin-left: auto;
}
.ea-alert_wrap .ea-alert_description {
  width: 100%;
  margin: 5px 0 0;
  font-size: 12px;
}
.ea-alert_wrap.ea-alert--success {
  background-color: #f0f9eb;
  color: #67c23a;
}
.ea-alert_wrap.ea-alert--success.ea-alert--dark {
  color: #fff;
  background-color: #67c23a;
}
.ea-alert_wrap.ea-alert--success.ea-alert--dark .ea-alert_close-icon {
  color: #fff;
}
.ea-alert_wrap.ea-alert--info {
  background-color: #f4f4f5;
  color: #909399;
}
.ea-alert_wrap.ea-alert--info.ea-alert--dark {
  color: #fff;
  background-color: #909399;
}
.ea-alert_wrap.ea-alert--info.ea-alert--dark .ea-alert_close-icon {
  color: #fff;
}
.ea-alert_wrap.ea-alert--warning {
  background-color: #fdf6ec;
  color: #e6a23c;
}
.ea-alert_wrap.ea-alert--warning.ea-alert--dark {
  color: #fff;
  background-color: #e6a23c;
}
.ea-alert_wrap.ea-alert--warning.ea-alert--dark .ea-alert_close-icon {
  color: #fff;
}
.ea-alert_wrap.ea-alert--error {
  background-color: #fef0f0;
  color: #f56c6c;
}
.ea-alert_wrap.ea-alert--error.ea-alert--dark {
  color: #fff;
  background-color: #f56c6c;
}
.ea-alert_wrap.ea-alert--error.ea-alert--dark .ea-alert_close-icon {
  color: #fff;
}
`;

export class EaAlert extends Base {
  #wrap;

  #alertContent;
  #alertTitle;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
    const wrap = document.createElement('div');
    wrap.className = 'ea-alert_wrap';

    const alertTitle = createElement('span', 'ea-alert_title');
    const alertContent = createElement('div', 'ea-alert_content', alertTitle);
    wrap.appendChild(alertContent);

    this.#wrap = wrap;
    this.#alertContent = alertContent;
    this.#alertTitle = alertTitle;

    this.setIconFile(new URL('../ea-icon/index.css', import.meta.url).href);

    this.build(shadowRoot, stylesheet);
    this.shadowRoot.appendChild(wrap);
  }

  // ------- type 获取提示类型 -------
  // #region
  get type() {
    return this.getAttribute('type') || "info";
  }

  set type(value) {
    this.setAttribute('type', value);

    this.#wrap.classList.add(`ea-alert--${value}`);
  }
  // #endregion
  // ------- end -------

  // ------- title 获取提示标题 -------
  // #region
  get title() {
    return this.getAttribute('title') || "";
  }

  set title(value) {
    this.setAttribute('title', value);

    this.#alertTitle.innerText = value;
  }
  // #endregion
  // ------- end -------

  // ------- closable 是否可关闭 -------
  // #region
  get closable() {
    const flag = this.getAttribute('closable');

    if (flag === null || flag === "true" || flag === "") return true;

    return false;
  }

  set closable(value) {
    this.setAttribute('closable', value);
  }
  // #endregion
  // ------- end -------

  // ------- close-text 关闭按钮文字 -------
  // #region
  get closeText() {
    return this.getAttribute('close-text') || "";
  }

  set closeText(value) {
    this.setAttribute('close-text', value);
  }
  // #endregion
  // ------- end -------

  // ------- effect 亮色与暗色主题 -------
  // #region
  get effect() {
    return this.getAttribute('effect') || "light";
  }

  set effect(value) {
    this.setAttribute('effect', value);

    if (value === "dark") {
      this.#wrap.classList.add('ea-alert--dark');
    } else {
      this.#wrap.classList.remove('ea-alert--dark');
    }
  }
  // #endregion
  // ------- end -------

  // ------- show-icon 是否显示图标 -------
  // #region
  get showIcon() {
    return this.getAttrBoolean('show-icon') || false;
  }

  set showIcon(value) {
    this.setAttribute('show-icon', value);
  }
  // #endregion
  // ------- end -------

  // ------- center 是否居中 -------
  // #region
  get center() {
    return this.getAttrBoolean('center') || false;
  }

  set center(value) {
    this.setAttribute('center', value);

    this.#alertContent.classList.toggle('ea-alert--center', value);
  }
  // #endregion
  // ------- end -------

  // ------- description 提示描述 -------
  // #region
  get description() {
    return this.getAttribute('description') || "";
  }

  set description(value) {
    this.setAttribute('description', value);
  }
  // #endregion
  // ------- end -------

  initClosableElement(closable, closeText) {
    const that = this;

    const closeIcon = createElement('i', 'ea-alert_close-icon');
    closable === true && closeText === "" ? closeIcon.classList.add('icon-cancel') : closeIcon.innerText = closeText;
    this.#alertContent.appendChild(closeIcon);

    closeIcon.addEventListener('click', function () {
      that.#wrap.style.opacity = 0;

      that.dispatchEvent(new CustomEvent('close', { detail: { target: that } }));
    });

    this.#wrap.addEventListener('transitionend', function () {
      that.remove();
    });
  }

  initShowIconElement(type) {
    const iconClass = {
      success: 'ok-circled',
      info: 'info',
      warning: 'attention-alt',
      error: 'cancel-circled'
    }

    const icon = createElement('i', `icon-${iconClass[type]}`);
    icon.classList.add(`ea-alert--${type}`);
    this.#alertTitle.insertBefore(icon, this.#alertTitle.firstChild);
  }

  initDescriptionElement(description) {
    const descriptionElement = createElement('p', 'ea-alert_description');
    this.#wrap.style.flexDirection = 'column';

    descriptionElement.innerText = description;
    this.#wrap.appendChild(descriptionElement);
  }

  init() {

    this.type = this.type;

    this.title = this.title;

    this.closable = this.closable;

    this.closeText = this.closeText;

    this.effect = this.effect;

    this.center = this.center;

    if (this.closable) this.initClosableElement(this.closable, this.closeText);

    if (this.showIcon) this.initShowIconElement(this.type);

    if (this.description) this.initDescriptionElement(this.description);
  }

  connectedCallback() {
    this.init();
  }
}

if (!customElements.get('ea-alert')) {
  customElements.define('ea-alert', EaAlert);
}