var p=(t,a,e)=>{if(!a.has(t))throw TypeError("Cannot "+e)};var r=(t,a,e)=>(p(t,a,"read from private field"),e?e.call(t):a.get(t)),s=(t,a,e)=>{if(a.has(t))throw TypeError("Cannot add the same private member more than once");a instanceof WeakSet?a.add(t):a.set(t,e)},c=(t,a,e,o)=>(p(t,a,"write to private field"),o?o.call(t,e):a.set(t,e),e);import{B as u}from"./Base.yCeCPjNm.js";const _=`
@import url('/ea_ui_component/icon/index.css');

:host(ea-radio) {
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
.ea-radio_wrap .__ea-radio-input_wrap {
  width: var(--button-size);
  height: var(--button-size);
  line-height: 1;
  margin-right: var(--button-margin);
}
.ea-radio_wrap .__ea-radio-input_wrap input {
  display: none;
}
.ea-radio_wrap .__ea-radio-input_wrap .__ea-radio-input_inner {
  position: relative;
  display: var(--radio-show-type);
  width: 1rem;
  height: 1rem;
  line-height: 1;
  box-sizing: border-box;
  border-radius: 50%;
  border: 1px solid #606266;
}
.ea-radio_wrap .__ea-radio-input_wrap .__ea-radio-input_inner::before {
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
.ea-radio_wrap .__ea-radio-input_wrap .__ea-radio-input_inner:hover {
  border-color: #409eff;
}
.ea-radio_wrap .__ea-radio-label_desc {
  color: var(--text-color);
}
.ea-radio_wrap.checked .__ea-radio-input_wrap .__ea-radio-input_inner {
  border-color: #409eff;
  background-color: #409eff;
}
.ea-radio_wrap.checked .__ea-radio-input_wrap .__ea-radio-input_inner::before {
  background-color: white;
}
.ea-radio_wrap.checked .__ea-radio-label_desc {
  color: #409eff;
}
.ea-radio_wrap.disabled .__ea-radio-input_wrap .__ea-radio-input_inner {
  border-color: #eeeeee;
  background-color: #eeeeee;
}
.ea-radio_wrap.disabled .__ea-radio-input_wrap .__ea-radio-input_inner::before {
  background-color: transparent;
}
.ea-radio_wrap.disabled .__ea-radio-label_desc {
  color: #c0c4cc;
}
.ea-radio_wrap.disabled[checked=true] .__ea-radio-input_wrap .__ea-radio-input_inner::before {
  background-color: #c0c4cc;
}
.ea-radio_wrap.border {
  border: 1px solid #ccc;
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
}
.ea-radio_wrap.border[checked=true] {
  border: 1px solid #409eff;
}`,b=()=>{const t=document.createElement("span");t.className="__ea-radio-input_wrap";const a=document.createElement("span");a.className="__ea-radio-input_inner",t.appendChild(a);const e=document.createElement("input");return e.type="radio",e.className="__ea-radio-input_input",t.appendChild(e),{wrap:t,input:e}},m=()=>{const t=document.createElement("span");t.className="__ea-radio-label_desc";const a=document.createElement("slot");return t.appendChild(a),t};var d,i;class w extends u{constructor(){super();s(this,d,void 0);s(this,i,void 0);const e=this.attachShadow({mode:"open"});let o=document.createElement("label");o.className="ea-radio_wrap";const n=b();o.appendChild(n.wrap);const l=m();o.appendChild(l),c(this,i,o),c(this,d,n.input);const h=document.createElement("style");h.innerHTML=_,this.shadowRoot.appendChild(h),e.appendChild(o)}static get observedAttributes(){return["checked"]}get checked(){return this.getAttrBoolean("checked")}set checked(e){r(this,d).checked=e,e?(this.setAttribute("checked",!0),r(this,i).setAttribute("checked",!0),r(this,i).classList.add("checked")):(this.removeAttribute("checked"),r(this,i).removeAttribute("checked"),r(this,i).classList.remove("checked"))}get name(){return this.getAttribute("name")}set name(e){r(this,d).setAttribute("name",e)}get value(){return this.getAttribute("value")}set value(e){r(this,i).setAttribute("for",e),r(this,d).setAttribute("id",e),r(this,d).setAttribute("value",e)}get disabled(){return this.getAttrBoolean("disabled")}set disabled(e){r(this,d).disabled=e,r(this,i).toggleAttribute("disabled",e),r(this,i).classList.toggle("disabled",e)}get border(){return this.getAttrBoolean("border")}set border(e){r(this,i).classList.toggle("border",e)}init(){const e=this;this.checked=this.checked,this.name=this.name,this.value=this.value,this.disabled=this.disabled,this.border=this.border,r(this,d).addEventListener("change",function(o){o.target.checked&&document.querySelectorAll(`ea-radio[name="${e.name}"]`).forEach(n=>{n.shadowRoot.querySelector("input")!==this?n.checked=!1:n.checked=!0}),e.dispatchEvent(new CustomEvent("change",{detail:{value:this.value,checked:this.checked}}))})}connectedCallback(){this.init()}attributeChangedCallback(e,o,n){}}d=new WeakMap,i=new WeakMap;window.customElements.get("ea-radio")||window.customElements.define("ea-radio",w);export{w as EaRadio};
