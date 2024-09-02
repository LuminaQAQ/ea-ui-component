import Base from '../Base.js';
import '../ea-icon/index.js'

const stylesheet = `
.ea-container_wrap {
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
.ea-container_wrap.is-vertical {
  flex-direction: column;
}
.ea-container_wrap ::slotted(ea-main) {
  flex: 1;
}
`;

export class EaContainer extends Base {
    #wrap;

    get CONTAINER_TYPE() {
        return ['ea-header', 'ea-main', 'ea-footer', 'ea-container', 'ea-aside'];
    }

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <div class="ea-container_wrap" part="container">
                <slot></slot>
            </div>
        `;

        this.#wrap = shadowRoot.querySelector('.ea-container_wrap');

        this.build(shadowRoot, stylesheet);
    }

    // ------- direction 排列方向 -------
    // #region
    get direction() {
        return ['horizontal', 'vertical'].includes(this.getAttribute('direction')) || 'horizontal';
    }

    set direction(value) {
        this.setAttribute('direction', value);
        this.#wrap.classList.toggle('is-vertical', value === 'horizontal');
    }
    // #endregion
    // ------- end -------

    #handleContainerChildren(containers) {
        const eachContainerTagName = containers.map(item => item.tagName.toLowerCase());

        containers.forEach(item => {
            if (!this.CONTAINER_TYPE.includes(item.tagName.toLowerCase())) {
                item.remove();
            }

            if (item.tagName.toLowerCase() === 'ea-container') {
                item.style.flex = '1';
            }
        });

        if (eachContainerTagName.includes('ea-header') || eachContainerTagName.includes('ea-footer')) {
            this.direction = 'horizontal';
        } else {
            this.direction = this.direction;
        }
    }

    connectedCallback() {
        const containers = Array.from(this.children);

        this.#handleContainerChildren(containers);
    }
}

if (!customElements.get('ea-container')) {
    customElements.define('ea-container', EaContainer);
}