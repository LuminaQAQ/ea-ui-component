import Base from"../Base.js";import"../ea-icon/index.js";const stylesheet="\n.ea-aside_wrap {\n  height: 100%;\n  overflow: auto;\n  display: flex;\n  flex-direction: column;\n}\n.ea-aside_wrap ::slotted(ea-main) {\n  overflow: auto;\n}\n";export class EaAside extends Base{#e;constructor(){super();const e=this.attachShadow({mode:"open"});e.innerHTML='\n            <aside class="ea-aside_wrap" part="container">\n                <slot></slot>\n            </aside>\n        ',this.#e=e.querySelector(".ea-aside_wrap"),this.build(e,stylesheet)}get width(){return this.getAttrNumber("width")||200}set width(e){this.setAttribute("width",e),this.#e.style.width=`${e}px`}connectedCallback(){this.width=this.width}}customElements.get("ea-aside")||customElements.define("ea-aside",EaAside);