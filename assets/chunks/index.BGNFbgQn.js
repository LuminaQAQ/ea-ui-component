var c=(r,a,e)=>{if(!a.has(r))throw TypeError("Cannot "+e)};var t=(r,a,e)=>(c(r,a,"read from private field"),e?e.call(r):a.get(r)),s=(r,a,e)=>{if(a.has(r))throw TypeError("Cannot add the same private member more than once");a instanceof WeakSet?a.add(r):a.set(r,e)},n=(r,a,e,d)=>(c(r,a,"write to private field"),d?d.call(r,e):a.set(r,e),e);import{B as p}from"./Base.LSgLRpFA.js";const h=`
:host {
  --margin-right: 0.75rem;
  --text-color: #606266;
  --radio-show-type: inline-block;
  --button-size: 1rem;
  --button-margin: 0.5rem;
}

.ea-radio_wrap {
  display: flex;
  align-items: center;
  margin-right: 1rem;
}
.ea-radio_wrap .ea-radio-input_wrap {
  width: var(--button-size);
  height: var(--button-size);
  line-height: 1;
  margin-right: var(--button-margin);
}
.ea-radio_wrap .ea-radio-input_wrap input {
  display: none;
}
.ea-radio_wrap .ea-radio-input_wrap .ea-radio-input_inner {
  position: relative;
  display: var(--radio-show-type);
  width: 1rem;
  height: 1rem;
  line-height: 1;
  box-sizing: border-box;
  border-radius: 50%;
  border: 1px solid #606266;
}
.ea-radio_wrap .ea-radio-input_wrap .ea-radio-input_inner::before {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  content: "";
  width: 0.35rem;
  height: 0.35rem;
  border-radius: 50%;
  background-color: transparent;
  box-sizing: border-box;
  transition: all 0.3s ease;
}
.ea-radio_wrap .ea-radio-input_wrap .ea-radio-input_inner:hover {
  border-color: #409eff;
}
.ea-radio_wrap .ea-radio-label_desc {
  color: var(--text-color);
}
.ea-radio_wrap.checked .ea-radio-input_wrap .ea-radio-input_inner {
  border-color: #409eff;
  background-color: #409eff;
}
.ea-radio_wrap.checked .ea-radio-input_wrap .ea-radio-input_inner::before {
  background-color: white;
}
.ea-radio_wrap.checked .ea-radio-label_desc {
  color: #409eff;
}
.ea-radio_wrap.disabled .ea-radio-input_wrap .ea-radio-input_inner {
  border-color: #eeeeee;
  background-color: #eeeeee;
}
.ea-radio_wrap.disabled .ea-radio-input_wrap .ea-radio-input_inner::before {
  background-color: transparent;
}
.ea-radio_wrap.disabled .ea-radio-label_desc {
  color: #c0c4cc;
}
.ea-radio_wrap.disabled[checked=true] .ea-radio-input_inner::before {
  background-color: #c0c4cc;
}
.ea-radio_wrap.border {
  border: 1px solid #ccc;
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
}
.ea-radio_wrap.border[checked=true] {
  border: 1px solid #409eff;
}
`;var i,o;class u extends p{constructor(){super();s(this,i,void 0);s(this,o,void 0);const e=this.attachShadow({mode:"open"});e.innerHTML=`
      <label class="ea-radio_wrap" part="container">
        <span class="ea-radio-input_wrap" part="input-wrap">
          <span class="ea-radio-input_inner" part="input"></span>
          <input class="ea-radio-input_input" type="radio" />
        </span>
        <span class="ea-radio-label_desc" part="label-wrap">
          <slot></slot>
        </span>
      </label>
    `,n(this,o,e.querySelector(".ea-radio_wrap")),n(this,i,e.querySelector(".ea-radio-input_input")),this.build(e,h)}get checked(){return this.getAttrBoolean("checked")}set checked(e){this.setAttribute("checked",e),t(this,o).setAttribute("checked",e),t(this,i).checked=e,t(this,o).classList.toggle("checked",e)}get name(){return this.getAttribute("name")}set name(e){this.setAttribute("name",e),t(this,i).setAttribute("name",e)}get value(){return this.getAttribute("value")}set value(e){this.setAttribute("value",e),t(this,o).setAttribute("for",e),t(this,i).setAttribute("id",e),t(this,i).setAttribute("value",e)}get disabled(){return this.getAttrBoolean("disabled")}set disabled(e){t(this,i).disabled=e,t(this,o).setAttribute("disabled",e),t(this,o).classList.toggle("disabled",e)}get border(){return this.getAttrBoolean("border")}set border(e){t(this,o).classList.toggle("border",e)}connectedCallback(){this.checked=this.checked,this.name=this.name,this.value=this.value,this.disabled=this.disabled,this.border=this.border,t(this,i).addEventListener("change",e=>{document.querySelectorAll(`ea-radio[name="${this.name}"]`).forEach(d=>{const l=d.shadowRoot.querySelector("input");d.checked=l===t(this,i)}),this.dispatchEvent(new CustomEvent("change",{detail:{value:this.value,checked:this.checked}}))})}}i=new WeakMap,o=new WeakMap;window.customElements.get("ea-radio")||window.customElements.define("ea-radio",u);export{u as EaRadio};
