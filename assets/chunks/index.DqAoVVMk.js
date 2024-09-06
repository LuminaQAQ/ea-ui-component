var b=(t,i,e)=>{if(!i.has(t))throw TypeError("Cannot "+e)};var a=(t,i,e)=>(b(t,i,"read from private field"),e?e.call(t):i.get(t)),s=(t,i,e)=>{if(i.has(t))throw TypeError("Cannot add the same private member more than once");i instanceof WeakSet?i.add(t):i.set(t,e)},r=(t,i,e,d)=>(b(t,i,"write to private field"),d?d.call(t,e):i.set(t,e),e);import{B as w}from"./Base.LSgLRpFA.js";const p=`
:host {
  --active-text-color: #409eff;
  --inactive-text-color: ##606266;
  --active-checkbox-bgc: #409eff;
  --inactive-checkbox-bgc: #eff1f5;
  --active-disabled-text-color: #7ebfff;
  --active-disabled-bgc: #bbdcff;
  --inactive-disabled-text-color: #c0c4cc;
  --inactive-disabled-bgc: #eff1f5;
}

.ea-switch_wrap {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.ea-switch_wrap input {
  display: none;
}
.ea-switch_wrap .ea-switch_label {
  font-size: 0.875rem;
  transition: color 0.2s;
}
.ea-switch_wrap input + .ea-switch_label--left {
  color: var(--active-text-color);
}
.ea-switch_wrap input:checked + .ea-switch_label--left {
  color: var(--inactive-text-color);
}
.ea-switch_wrap input:checked + .ea-switch_label--left + .ea-switch_core {
  background-color: var(--active-checkbox-bgc);
}
.ea-switch_wrap input:checked + .ea-switch_label--left + .ea-switch_core::after {
  left: calc(100% - 1rem - 2px);
}
.ea-switch_wrap input:checked + .ea-switch_label--left + .ea-switch_core + .ea-switch_label--right {
  color: var(--active-text-color);
}
.ea-switch_wrap input:disabled + .ea-switch_label--left {
  color: var(--active-disabled-text-color);
}
.ea-switch_wrap input:disabled + .ea-switch_label--left + .ea-switch_core {
  background-color: var(--inactive-disabled-bgc);
}
.ea-switch_wrap input:disabled + .ea-switch_label--left + .ea-switch_core + .ea-switch_label--right {
  color: var(--inactive-disabled-text-color);
}
.ea-switch_wrap input:checked:disabled + .ea-switch_label--left {
  color: var(--inactive-disabled-text-color);
}
.ea-switch_wrap input:checked:disabled + .ea-switch_label--left + .ea-switch_core {
  background-color: var(--active-disabled-bgc);
}
.ea-switch_wrap input:checked:disabled + .ea-switch_label--left + .ea-switch_core::after {
  left: calc(100% - 1rem - 2px);
}
.ea-switch_wrap input:checked:disabled + .ea-switch_label--left + .ea-switch_core + .ea-switch_label--right {
  color: var(--inactive-disabled-text-color);
}
.ea-switch_wrap .ea-switch_core {
  position: relative;
  cursor: pointer;
  margin: 0 0.75rem;
  width: 2.5rem;
  height: 1.25rem;
  line-height: 1.25rem;
  background-color: var(--inactive-checkbox-bgc);
  border-radius: 999px;
  transition: background-color 0.2s;
}
.ea-switch_wrap .ea-switch_core::after {
  content: "";
  display: block;
  position: absolute;
  left: 2px;
  top: 50%;
  transform: translate(0, -50%);
  width: 1rem;
  height: 1rem;
  border-radius: 999px;
  background-color: #fff;
  transition: left 0.2s, transform 0.2s;
}
.ea-switch_wrap.disabled {
  cursor: not-allowed;
}
.ea-switch_wrap.disabled .ea-switch_label,
.ea-switch_wrap.disabled .ea-switch_core {
  pointer-events: none;
}
`;var h,c,l,n,o;class u extends w{constructor(){super();s(this,h,void 0);s(this,c,void 0);s(this,l,void 0);s(this,n,void 0);s(this,o,void 0);const e=this.attachShadow({mode:"open"});e.innerHTML=`
            <label class="ea-switch_wrap" part="container">
                <input class="ea-switch_input" type="checkbox">
                <span class="ea-switch_label ea-switch_label--left" part="label-left"></span>
                <span class="ea-switch_core" part="switch"></span>
                <span class="ea-switch_label ea-switch_label--right" part="label-right"></span>
            </label>
        `,r(this,h,e.querySelector(".ea-switch_wrap")),r(this,c,e.querySelector(".ea-switch_input")),r(this,l,e.querySelector(".ea-switch_label--left")),r(this,n,e.querySelector(".ea-switch_core")),r(this,o,e.querySelector(".ea-switch_label--right")),this.build(e,p)}get name(){return this.getAttribute("name")||"ea-switch"}set name(e){this.setAttribute("name",e),a(this,h).setAttribute("for",e),a(this,c).setAttribute("name",e),a(this,c).setAttribute("id",e)}get value(){return this.inactiveText&&!this.checked?this.inactiveText:this.activeText&&this.checked?this.activeText:this.checked}set value(e){a(this,c).value=e}get inactiveText(){return this.getAttribute("inactive-text")||""}set inactiveText(e){e&&(this.setAttribute("inactive-text",e),a(this,l).innerText=e)}get activeText(){return this.getAttribute("active-text")||""}set activeText(e){e&&(this.setAttribute("active-text",e),a(this,o).innerText=e)}get checked(){return this.getAttrBoolean("checked")}set checked(e){this.setAttribute("checked",e),a(this,c).checked=e}get disabled(){return this.getAttrBoolean("disabled")}set disabled(e){this.setAttribute("disabled",e),a(this,c).disabled=e,a(this,h).classList.toggle("disabled",e)}get inactiveColor(){return this.getAttribute("inactive-color")||""}set inactiveColor(e){e&&this.style.setProperty("--inactive-checkbox-bgc",e)}get activeColor(){return this.getAttribute("active-color")}set activeColor(e){e&&this.style.setProperty("--active-checkbox-bgc",e)}connectedCallback(){this.setAttribute("data-ea-component",!0),this.name=this.name,this.value=this.value,this.checked=this.checked,this.inactiveText=this.inactiveText,this.activeText=this.activeText,this.disabled=this.disabled,this.inactiveColor=this.inactiveColor,this.activeColor=this.activeColor,a(this,c).addEventListener("change",e=>{e.preventDefault(),e.stopPropagation(),this.checked=e.target.checked,this.dispatchEvent(new CustomEvent("change",{detail:{checked:this.checked,value:this.value}}))})}}h=new WeakMap,c=new WeakMap,l=new WeakMap,n=new WeakMap,o=new WeakMap;customElements.get("ea-switch")||customElements.define("ea-switch",u);export{u as EaSwitch};
