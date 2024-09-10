// @ts-nocheck
import Base from '../Base.js';

import "../ea-timeline-item/index.js"

import { handleDefaultAttrIsTrue } from '../../utils/handleDefaultAttrIsTrue.js';
import { timeout } from '../../utils/timeout.js';

import { stylesheet } from './style/stylesheet.js';

export class EaTimeline extends Base {
  #wrap;

  #container;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <div class='ea-timeline_wrap' part='container'>
        <ul class='ea-timeline-item_container' part='list-wrap'>
          <slot></slot>
        </ul>
      </div>
    `;

    this.#wrap = shadowRoot.querySelector('.ea-timeline_wrap');
    this.#container = shadowRoot.querySelector('.ea-timeline-item_container');

    this.build(shadowRoot, stylesheet);
  }

  // ------- reverse 时间线排序 -------
  // #region
  get reverse() {
    const attr = this.getAttribute('reverse');

    return handleDefaultAttrIsTrue(attr);
  }

  set reverse(value) {
    this.setAttribute('reverse', value);

    this.#sortTimeline(value);
  }
  // #endregion
  // ------- end -------

  #sortTimeline(flag) {
    flag = flag === "true" || flag === true ? true : false;

    const timelineItems = Array.from(this.querySelectorAll('ea-timeline-item'));
    const timeArr = timelineItems.sort((a, b) => {
      const aTime = new Date(a.time);
      const bTime = new Date(b.time);

      return flag ? (bTime - aTime) : (aTime - bTime);
    })

    timeArr.forEach((item, index) => {
      this.appendChild(item);
    })
  }

  connectedCallback() {
    this.reverse = this.reverse;
  }
}

if (!customElements.get('ea-timeline')) {
  customElements.define('ea-timeline', EaTimeline);
}

