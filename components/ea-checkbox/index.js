import Base from"../Base.js";import{stylesheet}from"./src/style/stylesheet.js";export class EaCheckbox extends Base{#e;#t;constructor(){super();const e=this.attachShadow({mode:"open"});e.innerHTML='\n      <label class="ea-checkbox_wrap" part="container">\n        <span class="ea-checkbox-input_wrap" part="input-container">\n          <span class="ea-checkbox-input_inner" part="input"></span>\n          <input type="checkbox" class="ea-checkbox-input_input">\n          </input>\n        </span>\n        <span class="ea-checkbox-label_desc" part="label-container">\n          <slot></slot>\n        </span>\n      </label>\n    ',this.#t=e.querySelector(".ea-checkbox_wrap"),this.#e=e.querySelector(".ea-checkbox-input_input"),this.build(e,stylesheet)}get checked(){return this.getAttrBoolean("checked")}set checked(e){this.#e.checked=e,this.#t.classList.toggle("checked",e),this.setAttribute("checked",e),this.#t.setAttribute("checked",e),this.#t.classList.toggle("checked",e),e&&this.#t.classList.remove("indeterminate")}get name(){return this.getAttribute("name")||""}set name(e){this.#e.setAttribute("name",e)}get value(){return this.getAttribute("value")}set value(e){this.#t.setAttribute("for",e),this.#e.setAttribute("id",e),this.#e.setAttribute("value",e)}get disabled(){return this.getAttrBoolean("disabled")}set disabled(e){this.#e.disabled=e,this.#t.toggleAttribute("disabled",e),this.#t.classList.toggle("disabled",e)}get border(){return this.getAttrBoolean("border")}set border(e){this.#t.classList.toggle("border",e)}get indeterminate(){return this.getAttrBoolean("indeterminate")}set indeterminate(e){this.setAttribute("indeterminate",e),this.#t.classList.toggle("indeterminate",e),e&&(this.checked=!1,this.#t.classList.remove("checked"),this.setAttribute("indeterminate",!0))}init(){this.checked=this.checked,this.name=this.name,this.value=this.value,this.disabled=this.disabled,this.border=this.border,this.indeterminate=this.indeterminate,this.#e.addEventListener("change",(e=>{e.preventDefault(),this.checked=e.target.checked,this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{checked:this.checked,value:this.value,name:this.name}}))}))}connectedCallback(){this.init()}}window.customElements.get("ea-checkbox")||window.customElements.define("ea-checkbox",EaCheckbox);