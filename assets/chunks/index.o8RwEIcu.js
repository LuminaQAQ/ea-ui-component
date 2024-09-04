var p=(t,c,e)=>{if(!c.has(t))throw TypeError("Cannot "+e)};var a=(t,c,e)=>(p(t,c,"read from private field"),e?e.call(t):c.get(t)),r=(t,c,e)=>{if(c.has(t))throw TypeError("Cannot add the same private member more than once");c instanceof WeakSet?c.add(t):c.set(t,e)},o=(t,c,e,h)=>(p(t,c,"write to private field"),h?h.call(t,e):c.set(t,e),e);import{B as b}from"./Base.yCeCPjNm.js";const s=`
:host {
  --margin-right: 1rem;
}

.ea-checkbox_wrap {
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  user-select: none;
  margin-right: var(--margin-right);
}
.ea-checkbox_wrap input {
  display: none;
}
.ea-checkbox_wrap .ea-checkbox-input_wrap {
  line-height: 1;
  margin-right: 0.5rem;
}
.ea-checkbox_wrap .ea-checkbox-input_wrap .ea-checkbox-input_inner {
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
.ea-checkbox_wrap .ea-checkbox-input_wrap .ea-checkbox-input_inner::after {
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
.ea-checkbox_wrap .ea-checkbox-input_wrap .ea-checkbox-input_input {
  display: none;
}
.ea-checkbox_wrap .ea-checkbox-label_desc {
  line-height: 1;
  transition: color 0.2s;
}
.ea-checkbox_wrap .ea-checkbox-input_input[indeterminate=true] + .ea-checkbox-input_wrap .ea-checkbox-input_inner {
  border-color: #409eff;
  background-color: #409eff;
}
.ea-checkbox_wrap .ea-checkbox-input_input[indeterminate=true] + .ea-checkbox-input_wrap .ea-checkbox-input_inner::after {
  opacity: 1;
  left: 50%;
  top: 50%;
  width: 80%;
  height: 3px;
  background-color: white;
  transform: translate(-50%, -50%) rotate(0deg);
}
.ea-checkbox_wrap .ea-checkbox-input_input:checked + .ea-checkbox-input_wrap .ea-checkbox-input_inner,
.ea-checkbox_wrap .ea-checkbox-input_input[indeterminate=true]:checked + .ea-checkbox-input_wrap .ea-checkbox-input_inner,
.ea-checkbox_wrap .ea-checkbox-input_input[indeterminate=false]:checked + .ea-checkbox-input_wrap .ea-checkbox-input_inner {
  border-color: #409eff;
  background-color: #409eff;
}
.ea-checkbox_wrap .ea-checkbox-input_input:checked + .ea-checkbox-input_wrap .ea-checkbox-input_inner::after,
.ea-checkbox_wrap .ea-checkbox-input_input[indeterminate=true]:checked + .ea-checkbox-input_wrap .ea-checkbox-input_inner::after,
.ea-checkbox_wrap .ea-checkbox-input_input[indeterminate=false]:checked + .ea-checkbox-input_wrap .ea-checkbox-input_inner::after {
  opacity: 1;
  border-left: 2px solid white;
  border-top: 2px solid white;
}
.ea-checkbox_wrap .ea-checkbox-input_input:checked + .ea-checkbox-input_wrap + .ea-checkbox-label_desc,
.ea-checkbox_wrap .ea-checkbox-input_input[indeterminate=true]:checked + .ea-checkbox-input_wrap + .ea-checkbox-label_desc,
.ea-checkbox_wrap .ea-checkbox-input_input[indeterminate=false]:checked + .ea-checkbox-input_wrap + .ea-checkbox-label_desc {
  color: #409eff;
}
.ea-checkbox_wrap .ea-checkbox-input_input:disabled {
  pointer-events: none;
}
.ea-checkbox_wrap .ea-checkbox-input_input:disabled + .ea-checkbox-input_wrap {
  cursor: not-allowed;
}
.ea-checkbox_wrap .ea-checkbox-input_input:disabled + .ea-checkbox-input_wrap .ea-checkbox-input_inner {
  border-color: #eeeeee;
  background-color: #eeeeee;
}
.ea-checkbox_wrap .ea-checkbox-input_input:disabled + .ea-checkbox-input_wrap .ea-checkbox-input_inner::before {
  background-color: transparent;
}
.ea-checkbox_wrap .ea-checkbox-input_input:disabled + .ea-checkbox-input_wrap + .ea-checkbox-label_desc {
  cursor: not-allowed;
  color: #c0c4cc;
}
.ea-checkbox_wrap .ea-checkbox-input_input:disabled:checked + .ea-checkbox-input_wrap .ea-checkbox-input_inner {
  border-color: #eeeeee;
  background-color: #eeeeee;
}
.ea-checkbox_wrap .ea-checkbox-input_input:disabled:checked + .ea-checkbox-input_wrap .ea-checkbox-input_inner::before {
  opacity: 1;
  border-left: 2px solid white;
  border-top: 2px solid white;
}
.ea-checkbox_wrap .ea-checkbox-input_input:disabled:checked + .ea-checkbox-input_wrap + .ea-checkbox-label_desc {
  color: #c0c4cc;
}
`;var i,n;class u extends b{constructor(){super();r(this,i,void 0);r(this,n,void 0);const e=this.attachShadow({mode:"open"});e.innerHTML=`
      <label class="ea-checkbox_wrap" part="container">
        <input type="checkbox" class="ea-checkbox-input_input"/>
        <span class="ea-checkbox-input_wrap" part="input-container">
          <span class="ea-checkbox-input_inner" part="input"></span>
        </span>
        <span class="ea-checkbox-label_desc" part="label-container">
          <slot></slot>
        </span>
      </label>
    `,o(this,n,e.querySelector(".ea-checkbox_wrap")),o(this,i,e.querySelector(".ea-checkbox-input_input")),this.build(e,s)}get checked(){return this.getAttrBoolean("checked")}set checked(e){this.setAttribute("checked",e),a(this,i).checked=e}get name(){return this.getAttribute("name")||""}set name(e){a(this,i).setAttribute("name",e)}get value(){return this.getAttribute("value")}set value(e){a(this,n).setAttribute("for",e),a(this,i).setAttribute("id",e),a(this,i).setAttribute("value",e)}get disabled(){return this.getAttrBoolean("disabled")}set disabled(e){this.setAttribute("disabled",e),a(this,i).disabled=e}get border(){return this.getAttrBoolean("border")}set border(e){a(this,n).classList.toggle("border",e)}get indeterminate(){return this.getAttrBoolean("indeterminate")}set indeterminate(e){this.setAttribute("indeterminate",e),a(this,i).setAttribute("indeterminate",e),e&&(this.checked=!1,a(this,n).classList.remove("checked"),this.setAttribute("indeterminate",!0),a(this,i).setAttribute("indeterminate",!0))}connectedCallback(){this.checked=this.checked,this.name=this.name,this.value=this.value,this.disabled=this.disabled,this.border=this.border,this.indeterminate=this.indeterminate,a(this,i).addEventListener("change",e=>{e.preventDefault(),this.indeterminate=!1,this.checked=e.target.checked,this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{checked:this.checked,value:this.value,name:this.name}}))})}}i=new WeakMap,n=new WeakMap;window.customElements.get("ea-checkbox")||window.customElements.define("ea-checkbox",u);export{u as EaCheckbox};
