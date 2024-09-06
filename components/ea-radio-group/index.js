import{timeout}from"../../utils/timeout.js";import Base from"../Base.js";const stylesheet="\n.ea-radio-group_wrap {\n  display: flex;\n}\n";export class EaRadioGroup extends Base{constructor(){super();const e=this.attachShadow({mode:"open"});e.innerHTML='\n            <div class="ea-radio-group_wrap" part="container">\n                <slot></slot>\n            </div>\n        ',this.build(e,stylesheet)}get name(){return this.getAttribute("name")}set name(e){this.setAttribute("name",e),this.querySelectorAll("ea-radio").forEach((t=>{t.setAttribute("name",e)}))}get value(){return this.getAttribute("value")||""}set value(e){e&&this.setAttribute("value",e)}#e(e){e.forEach((e=>{e.checked&&(this.value=e.value),e.addEventListener("change",(t=>{this.value=e.value,this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{target:e,value:this.value}}))}))}))}#t(e){const t=Array.from(e).find((e=>e.value===this.value));t&&(t.checked=!0)}connectedCallback(){this.setAttribute("data-ea-component",!0),this.name=this.name,this.value=this.value,timeout((()=>{const e=this.querySelectorAll("ea-radio");this.#e(e),this.#t(e)}),20)}}window.customElements.get("ea-radio-group")||window.customElements.define("ea-radio-group",EaRadioGroup);