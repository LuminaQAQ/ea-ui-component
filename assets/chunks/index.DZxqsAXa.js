var k=(i,s,e)=>{if(!s.has(i))throw TypeError("Cannot "+e)};var t=(i,s,e)=>(k(i,s,"read from private field"),e?e.call(i):s.get(i)),n=(i,s,e)=>{if(s.has(i))throw TypeError("Cannot add the same private member more than once");s instanceof WeakSet?s.add(i):s.set(i,e)},l=(i,s,e,c)=>(k(i,s,"write to private field"),c?c.call(i,e):s.set(i,e),e);import{B as m}from"./Base.CfZnvlaz.js";const v=`
@import url('/ea_ui_component/icon/index.css');

.ea-switch_wrap {
  display: flex;
  align-items: center;
}
.ea-switch_wrap input {
  display: none;
}
.ea-switch_wrap span {
  display: block;
  cursor: default;
}
.ea-switch_wrap .ea-switch_label {
  color: #606266;
  font-size: 0.875rem;
  cursor: pointer;
  transition: color 0.2s;
}
.ea-switch_wrap .ea-switch_label.ea-switch_label--active {
  color: #409eff;
}
.ea-switch_wrap .ea-switch_core {
  position: relative;
  cursor: pointer;
  margin: 0 0.75rem;
  width: 2.5rem;
  height: 1.25rem;
  line-height: 1.25rem;
  background-color: #dcdfe6;
  border-radius: 999px;
  transition: background-color 0.2s;
}
.ea-switch_wrap .ea-switch_core.ea-switch_core--checked {
  background-color: #409eff;
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
.ea-switch_wrap .ea-switch_core.ea-switch_core--checked::after {
  left: calc(100% - 1rem - 2px);
}
.ea-switch_wrap .ea-switch_core.ea-switch_core--disabled {
  background-color: #c0c4cc;
}
.ea-switch_wrap.ea-switch_wrap--disabled {
  cursor: not-allowed;
}
.ea-switch_wrap.ea-switch_wrap--disabled .ea-switch_label,
.ea-switch_wrap.ea-switch_wrap--disabled .ea-switch_core {
  pointer-events: none;
}
.ea-switch_wrap.ea-switch_wrap--disabled .ea-switch_core {
  background-color: #eff1f5;
}
.ea-switch_wrap.ea-switch_wrap--disabled .ea-switch_label {
  color: #c0c4cc;
}
.ea-switch_wrap.ea-switch_wrap--disabled .ea-switch_label.ea-switch_label--active {
  color: #7ebfff;
}
`,g=()=>{const i=document.createElement("input");return i.type="checkbox",i.className="ea-switch_input",i},C=()=>{const i=document.createElement("span");return i.className="ea-switch_core",i},f=i=>{const s=document.createElement("span");return s.className=`ea-switch_label ea-switch_label--${i}`,s};var d,w,a,h,r,o;class x extends m{constructor(){super();n(this,d,!1);n(this,w,void 0);n(this,a,void 0);n(this,h,void 0);n(this,r,void 0);n(this,o,void 0);const e=this.attachShadow({mode:"open"}),c=document.createElement("div");c.className="ea-switch_wrap";const b=g(),p=f("left"),u=C(),_=f("right");c.appendChild(b),c.appendChild(p),c.appendChild(u),c.appendChild(_),l(this,w,c),l(this,a,b),l(this,h,p),l(this,r,u),l(this,o,_),this.build(e,v),this.shadowRoot.appendChild(c)}static get observedAttributes(){return["checked"]}get inactiveText(){return this.getAttribute("inactive-text")}set inactiveText(e){this.setAttribute("inactive-text",e),t(this,h).innerText=e}get activeText(){return this.getAttribute("active-text")}set activeText(e){this.setAttribute("active-text",e),t(this,o).innerText=e}get checked(){return this.getAttrBoolean("checked")}set checked(e){this.setAttribute("checked",e),t(this,a).checked=e,t(this,a).setAttribute("checked",e),e?(t(this,r).classList.add("ea-switch_core--checked"),t(this,o).classList.add("ea-switch_label--active"),t(this,h).classList.remove("ea-switch_label--active")):(t(this,r).classList.remove("ea-switch_core--checked"),t(this,h).classList.add("ea-switch_label--active"),t(this,o).classList.remove("ea-switch_label--active"))}get disabled(){return this.getAttrBoolean("disabled")}set disabled(e){this.setAttribute("disabled",e),t(this,a).disabled=e,t(this,w).classList.toggle("ea-switch_wrap--disabled",e)}get inactiveColor(){return this.getAttribute("inactive-color")}set inactiveColor(e){e&&(this.setAttribute("inactive-color",e),e&&(t(this,r).style.backgroundColor=e))}get activeColor(){return this.getAttribute("active-color")}set activeColor(e){e&&(this.setAttribute("active-color",e),t(this,r).style.backgroundColor=e)}handleInputChecked(e){const c=t(this,a).checked;this.inactiveColor&&this.activeColor?t(this,r).style.backgroundColor=c?this.inactiveColor:this.activeColor:t(this,r).classList.toggle("ea-switch_core--checked",c)}init(){const e=this;this.checked=this.checked,this.inactiveText=this.inactiveText,this.activeText=this.activeText,this.disabled=this.disabled,this.activeColor&&this.inactiveColor&&(this.checked?this.activeColor=this.activeColor:this.inactiveColor=this.inactiveColor),t(this,h).addEventListener("click",function(c){e.checked=!t(e,a).checked}),t(this,o).addEventListener("click",function(c){e.checked=!t(e,a).checked}),t(this,r).addEventListener("click",function(c){e.checked=!t(e,a).checked})}connectedCallback(){this.init(),l(this,d,!0)}attributeChangedCallback(e,c,b){if(t(this,d)&&e==="checked"){const p=this.checked?this.activeText:this.inactiveText;this.handleInputChecked(),this.dispatchEvent(new CustomEvent("change",{detail:{checked:this.checked,value:p}}))}}}d=new WeakMap,w=new WeakMap,a=new WeakMap,h=new WeakMap,r=new WeakMap,o=new WeakMap;customElements.get("ea-switch")||customElements.define("ea-switch",x);export{x as EaSwitch};
