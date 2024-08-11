var d=(t,a,e)=>{if(!a.has(t))throw TypeError("Cannot "+e)};var c=(t,a,e)=>(d(t,a,"read from private field"),e?e.call(t):a.get(t)),n=(t,a,e)=>{if(a.has(t))throw TypeError("Cannot add the same private member more than once");a instanceof WeakSet?a.add(t):a.set(t,e)},s=(t,a,e,i)=>(d(t,a,"write to private field"),i?i.call(t,e):a.set(t,e),e);import{B as l}from"./Base.yCeCPjNm.js";const p=`:host {
  --margin-right: 1rem;
}

.ea-checkbox_wrap {
  display: flex;
  align-items: center;
  margin-right: var(--margin-right);
}
.ea-checkbox_wrap .__ea-checkbox-input_wrap {
  margin-right: 0.5rem;
}
.ea-checkbox_wrap .__ea-checkbox-input_wrap .__ea-checkbox-input_inner {
  box-sizing: border-box;
  position: relative;
  display: block;
  width: 0.8125rem;
  height: 0.8125rem;
  line-height: 0.8125;
  border-radius: 3px;
  border: 1px solid #ccc;
  transition: background-color 0.2s, border-color 0.2s;
}
.ea-checkbox_wrap .__ea-checkbox-input_wrap .__ea-checkbox-input_inner::after {
  content: "";
  position: absolute;
  left: 52.5%;
  top: 45%;
  transform: translate(-50%, -50%) rotate(-135deg);
  display: block;
  width: 3px;
  height: 7px;
  opacity: 0;
  transition: opacity 0.2s;
}
.ea-checkbox_wrap .__ea-checkbox-input_wrap .__ea-checkbox-input_input {
  display: none;
}
.ea-checkbox_wrap .__ea-checkbox-label_desc {
  transition: color 0.2s;
}
.ea-checkbox_wrap.checked .__ea-checkbox-input_wrap .__ea-checkbox-input_inner {
  border-color: #409eff;
  background-color: #409eff;
}
.ea-checkbox_wrap.checked .__ea-checkbox-input_wrap .__ea-checkbox-input_inner::after {
  opacity: 1;
  border-left: 2px solid white;
  border-top: 2px solid white;
}
.ea-checkbox_wrap.checked .__ea-checkbox-label_desc {
  color: #409eff;
}
.ea-checkbox_wrap.disabled .__ea-checkbox-input_wrap .__ea-checkbox-input_inner {
  border-color: #eeeeee;
  background-color: #eeeeee;
}
.ea-checkbox_wrap.disabled .__ea-checkbox-input_wrap .__ea-checkbox-input_inner::before {
  background-color: transparent;
}
.ea-checkbox_wrap.disabled .__ea-checkbox-label_desc {
  color: #c0c4cc;
}
.ea-checkbox_wrap.disabled[checked=true] .__ea-checkbox-input_wrap .__ea-checkbox-input_inner::before {
  background-color: #c0c4cc;
}
.ea-checkbox_wrap.indeterminate .__ea-checkbox-input_wrap .__ea-checkbox-input_inner {
  border-color: #409eff;
  background-color: #409eff;
}
.ea-checkbox_wrap.indeterminate .__ea-checkbox-input_wrap .__ea-checkbox-input_inner::after {
  opacity: 1;
  left: 50%;
  top: 50%;
  width: 80%;
  height: 3px;
  background-color: white;
  transform: translate(-50%, -50%) rotate(0deg);
}
.ea-checkbox_wrap.indeterminate .__ea-checkbox-label_desc {
  color: #409eff;
}
.ea-checkbox_wrap.indeterminate[checked=true] .__ea-checkbox-input_wrap .__ea-checkbox-input_inner {
  border-color: #409eff;
  background-color: #409eff;
}
.ea-checkbox_wrap.indeterminate[checked=true] .__ea-checkbox-input_wrap .__ea-checkbox-input_inner::after {
  width: 3px;
  height: 7px;
  left: 52.5%;
  top: 45%;
  transform: translate(-50%, -50%) rotate(-135deg);
  opacity: 1;
  border-left: 2px solid white;
  border-top: 2px solid white;
  background-color: transparent;
}
.ea-checkbox_wrap.indeterminate[checked=true] .__ea-checkbox-label_desc {
  color: #409eff;
}`,_=()=>{const t=document.createElement("span");t.className="__ea-checkbox-input_wrap";const a=document.createElement("span");a.className="__ea-checkbox-input_inner",t.appendChild(a);const e=document.createElement("input");return e.type="checkbox",e.className="__ea-checkbox-input_input",t.appendChild(e),{wrap:t,input:e}},u=()=>{const t=document.createElement("span");t.className="__ea-checkbox-label_desc";const a=document.createElement("slot");return t.appendChild(a),t};var o,r;class k extends l{constructor(){super();n(this,o,void 0);n(this,r,void 0);const e=this.attachShadow({mode:"open"});let i=document.createElement("label");i.className="ea-checkbox_wrap";const h=_();i.appendChild(h.wrap);const b=u();i.appendChild(b),s(this,r,i),s(this,o,h.input),this.build(e,p),e.appendChild(i)}static get observedAttributes(){return["checked","disabled"]}get checked(){return this.getAttrBoolean("checked")}set checked(e){c(this,o).checked=e,c(this,r).classList.toggle("checked",e),e?(this.setAttribute("checked",!0),c(this,r).setAttribute("checked",!0),c(this,r).classList.add("checked")):(this.removeAttribute("checked"),c(this,r).removeAttribute("checked"),c(this,r).classList.remove("checked"),c(this,r).classList.remove("indeterminate"))}get name(){return this.getAttribute("name")}set name(e){c(this,o).setAttribute("name",e)}get value(){return this.getAttribute("value")}set value(e){c(this,r).setAttribute("for",e),c(this,o).setAttribute("id",e),c(this,o).setAttribute("value",e)}get disabled(){return this.getAttrBoolean("disabled")}set disabled(e){c(this,o).disabled=e,c(this,r).toggleAttribute("disabled",e),c(this,r).classList.toggle("disabled",e)}get border(){return this.getAttrBoolean("border")}set border(e){c(this,r).classList.toggle("border",e)}get indeterminate(){return this.getAttrBoolean("indeterminate")}set indeterminate(e){e?(this.checked=!1,c(this,r).classList.remove("checked"),this.setAttribute("indeterminate",!0),c(this,r).classList.add("indeterminate")):(this.removeAttribute("indeterminate"),c(this,r).classList.remove("indeterminate"))}init(){const e=this;this.checked=this.checked,this.name=this.name,this.value=this.value,this.disabled=this.disabled,this.border=this.border,this.indeterminate=this.indeterminate,c(this,o).addEventListener("change",function(i){i.preventDefault(),e.checked=i.target.checked,e.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{checked:i.target.checked,value:i.target.value,name:i.target.name}}))})}connectedCallback(){this.init()}}o=new WeakMap,r=new WeakMap;window.customElements.get("ea-checkbox")||window.customElements.define("ea-checkbox",k);export{k as E};
