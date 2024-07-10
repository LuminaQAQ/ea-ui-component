// @ts-nocheck
import Base from '../Base';

const stylesheet = `
@import url('/ea_ui_component/icon/index.css');

.ea-badge_wrap {
  position: relative;
  vertical-align: middle;
  display: inline-block;
}
.ea-badge_wrap .ea-badge_content {
  display: inline-block;
  padding: 0 0.375rem;
  border-radius: 0.625rem;
  border: 1px solid #fff;
  height: 1.125rem;
  line-height: 1.125rem;
  position: absolute;
  right: 0.625rem;
  top: 0;
  transform: translate(100%, -50%);
  color: #fff;
  font-size: 0.75rem;
  text-align: center;
  white-space: nowrap;
  background-color: #f56c6c;
}
.ea-badge_wrap .ea-badge_content.primary {
  background-color: #409eff;
}
.ea-badge_wrap .ea-badge_content.success {
  background-color: #67c23a;
}
.ea-badge_wrap .ea-badge_content.warning {
  background-color: #e6a23c;
}
.ea-badge_wrap .ea-badge_content.info {
  background-color: #909399;
}
.ea-badge_wrap .ea-badge_content.dot {
  right: 0.3125rem;
  padding: 0;
  border-radius: 50%;
  width: 0.5rem;
  height: 0.5rem;
}
`;

export class EaBadge extends Base {
  #wrap;
  #badgeWrap;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
    const wrap = document.createElement('div');
    wrap.className = 'ea-badge_wrap';

    const slot = document.createElement('slot');
    wrap.appendChild(slot);

    const badgeWrap = document.createElement('sup');
    badgeWrap.className = 'ea-badge_content';
    wrap.appendChild(badgeWrap);

    this.#wrap = wrap;
    this.#badgeWrap = badgeWrap;

    this.build(shadowRoot, stylesheet);
    this.shadowRoot.appendChild(wrap);
  }

  // ------- value 徽章内的值 -------
  // #region
  get value() {
    return this.getAttribute('value') || '';
  }

  set value(value) {
    this.setAttribute('value', value);

    this.#badgeWrap.innerHTML = value;
  }
  // #endregion
  // ------- end -------

  // ------- type 样式类型 -------
  // #region
  get type() {
    return this.getAttribute('type') || 'normal';
  }

  set type(value) {
    this.setAttribute('type', value);

    this.#badgeWrap.classList.add(value);
  }
  // #endregion
  // ------- end -------

  // ------- max 最大值 -------
  // #region
  get max() {
    return this.getAttrNumber('max') || Infinity;
  }

  set max(value) {
    if (value === Infinity) return;

    value = parseInt(value);

    this.setAttribute('max', value);

    if (this.value > value) {
      this.value = value + '+';
    }
  }
  // #endregion
  // ------- end -------

  // ------- is-dot 是否为点状徽章 -------
  // #region
  get isDot() {
    return this.getAttrBoolean('is-dot') || false;
  }

  set isDot(value) {
    this.toggleAttr('is-dot', value);

    this.#badgeWrap.innerText = value ? '' : this.value;
    this.#badgeWrap.classList.toggle('dot', value);
  }
  // #endregion
  // ------- end -------

  init() {
    const that = this;

    this.value = this.value;

    this.type = this.type;

    this.max = this.max;

    this.isDot = this.isDot;

    try {
      const button = this.querySelector('ea-button');
      if (button) button.style.setProperty('--margin-right', '0');
    } catch (error) { }
  }

  connectedCallback() {
    this.init();
  }
}

if (!customElements.get('ea-badge')) {
  customElements.define('ea-badge', EaBadge);
}