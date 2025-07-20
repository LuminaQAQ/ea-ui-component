import "./components/ea-container/index.js"
import "./components/ea-header/index.js"
import "./components//ea-main/index.js"
import "./components/ea-footer/index.js"
import "./components/ea-aside/index.js"

// export class EaContainer extends Base {
//     #wrap;

//     get CONTAINER_TYPE() {
//         return ['ea-header', 'ea-main', 'ea-footer', 'ea-container', 'ea-aside'];
//     }

//     constructor() {
//         super();

//         const shadowRoot = this.attachShadow({ mode: 'open' });
//         shadowRoot.innerHTML = `
//             <div class="ea-container_wrap" part="container">
//                 <slot></slot>
//             </div>
//         `;

//         this.#wrap = shadowRoot.querySelector('.ea-container_wrap');

//         this.build(shadowRoot, stylesheet);
//     }

//     // ------- direction 排列方向 -------
//     // #region
//     get direction() {
//         return ['horizontal', 'vertical'].includes(this.getAttribute('direction')) || 'horizontal';
//     }

//     set direction(value) {
//         this.setAttribute('direction', value);
//         this.#wrap.classList.toggle('is-vertical', value === 'horizontal');
//     }
//     // #endregion
//     // ------- end -------

//     #handleContainerChildren(containers) {
//         const eachContainerTagName = containers.map(item => item.tagName.toLowerCase());

//         containers.forEach(item => {
//             if (!this.CONTAINER_TYPE.includes(item.tagName.toLowerCase())) {
//                 item.remove();
//             }

//             if (item.tagName.toLowerCase() === 'ea-container') {
//                 item.style.flex = '1';
//             }
//         });

//         if (eachContainerTagName.includes('ea-header') || eachContainerTagName.includes('ea-footer')) {
//             this.direction = 'horizontal';
//         } else {
//             this.direction = this.direction;
//         }
//     }

//     connectedCallback() {
//         const containers = Array.from(this.children);

//         this.#handleContainerChildren(containers);
//     }
// }
