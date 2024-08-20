var k=(i,c,t)=>{if(!c.has(i))throw TypeError("Cannot "+t)};var e=(i,c,t)=>(k(i,c,"read from private field"),t?t.call(i):c.get(i)),n=(i,c,t)=>{if(c.has(i))throw TypeError("Cannot add the same private member more than once");c instanceof WeakSet?c.add(i):c.set(i,t)},l=(i,c,t,s)=>(k(i,c,"write to private field"),s?s.call(i,t):c.set(i,t),t);import{B as v}from"./Base.yCeCPjNm.js";const f=`
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
`,g=()=>{const i=document.createElement("input");return i.type="checkbox",i.className="ea-switch_input",i},C=()=>{const i=document.createElement("span");return i.className="ea-switch_core",i},m=i=>{const c=document.createElement("span");return c.className=`ea-switch_label ea-switch_label--${i}`,c};var d,w,a,h,r,o;class x extends v{constructor(){super();n(this,d,!1);n(this,w,void 0);n(this,a,void 0);n(this,h,void 0);n(this,r,void 0);n(this,o,void 0);const t=this.attachShadow({mode:"open"}),s=document.createElement("div");s.className="ea-switch_wrap";const p=g(),u=m("left"),b=C(),_=m("right");s.appendChild(p),s.appendChild(u),s.appendChild(b),s.appendChild(_),l(this,w,s),l(this,a,p),l(this,h,u),l(this,r,b),l(this,o,_),this.build(t,f),this.shadowRoot.appendChild(s)}static get observedAttributes(){return["checked"]}get name(){return this.getAttribute("name")||""}set name(t){this.setAttribute("name",t),e(this,a).name=t}get value(){return this.inactiveText&&!this.checked?this.inactiveText:this.activeText&&this.checked?this.activeText:this.checked}set value(t){this.setAttribute("value",t),e(this,a).value=t}get inactiveText(){return this.getAttribute("inactive-text")||""}set inactiveText(t){this.setAttribute("inactive-text",t),e(this,h).innerText=t}get activeText(){return this.getAttribute("active-text")||""}set activeText(t){this.setAttribute("active-text",t),e(this,o).innerText=t}get checked(){return this.getAttrBoolean("checked")}set checked(t){this.setAttribute("checked",t),e(this,a).checked=t,e(this,a).setAttribute("checked",t),t?(e(this,r).classList.add("ea-switch_core--checked"),e(this,o).classList.add("ea-switch_label--active"),e(this,h).classList.remove("ea-switch_label--active")):(e(this,r).classList.remove("ea-switch_core--checked"),e(this,h).classList.add("ea-switch_label--active"),e(this,o).classList.remove("ea-switch_label--active"))}get disabled(){return this.getAttrBoolean("disabled")}set disabled(t){this.setAttribute("disabled",t),e(this,a).disabled=t,e(this,w).classList.toggle("ea-switch_wrap--disabled",t)}get inactiveColor(){return this.getAttribute("inactive-color")||""}set inactiveColor(t){t&&(this.setAttribute("inactive-color",t),t&&(e(this,r).style.backgroundColor=t))}get activeColor(){return this.getAttribute("active-color")}set activeColor(t){t&&(this.setAttribute("active-color",t),e(this,r).style.backgroundColor=t)}handleInputChecked(t){const s=e(this,a).checked;this.inactiveColor&&this.activeColor?e(this,r).style.backgroundColor=s?this.inactiveColor:this.activeColor:e(this,r).classList.toggle("ea-switch_core--checked",s)}init(){const t=this;this.setAttribute("data-ea-component",!0),this.name=this.name,this.value=this.value,this.checked=this.checked,this.inactiveText=this.inactiveText,this.activeText=this.activeText,this.disabled=this.disabled,this.activeColor&&this.inactiveColor&&(this.checked?this.activeColor=this.activeColor:this.inactiveColor=this.inactiveColor),e(this,h).addEventListener("click",function(s){t.checked=!e(t,a).checked}),e(this,o).addEventListener("click",function(s){t.checked=!e(t,a).checked}),e(this,r).addEventListener("click",function(s){t.checked=!e(t,a).checked})}connectedCallback(){this.init(),l(this,d,!0)}attributeChangedCallback(t,s,p){if(e(this,d)&&t==="checked"){const u=this.checked?this.activeText:this.inactiveText;this.handleInputChecked(),this.dispatchEvent(new CustomEvent("change",{detail:{checked:this.checked,value:u}}))}}}d=new WeakMap,w=new WeakMap,a=new WeakMap,h=new WeakMap,r=new WeakMap,o=new WeakMap;customElements.get("ea-switch")||customElements.define("ea-switch",x);export{x as EaSwitch};
