import{B as o}from"./Base.yCeCPjNm.js";const r=`
@import url('/ea_ui_component/icon/index.css');

.ea-checkbox-group {
  display: flex;
}
.ea-checkbox-group ::slotted(ea-checkbox) {
  margin-right: 1.5rem;
}`;class i extends o{constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("div");t.appendChild(e);const a=document.createElement("slot");e.className="ea-checkbox-group",e.appendChild(a),this.dom=e,this.build(t,r),t.appendChild(e)}get name(){return this.getAttribute("name")}set name(t){this.querySelectorAll("ea-checkbox").forEach(e=>{e.setAttribute("name",t),e.name=t})}get value(){return this.getAttribute("value")||""}set value(t){this.setAttribute("value",t);try{const e=t.split(",").map(a=>a.trimStart());e.map(a=>{const s=this.querySelector(`ea-checkbox[name="${this.name}"][value="${a}"]`);s.setAttribute("checked","true"),s.checked="true"}),this.dispatchEvent(new CustomEvent("change",{detail:e}))}catch{}}get disabled(){return this.getAttrBoolean("disabled")}set disabled(t){document.querySelectorAll(`ea-checkbox[name="${this.name}"]`).forEach(a=>{a.disabled=t})}init(){this.name=this.name,this.value=this.value,this.disabled=this.disabled;const t=this.querySelectorAll("ea-checkbox");t.forEach(e=>{e.addEventListener("change",a=>{let s=[];Array.from(t).filter(c=>c.checked?s.push(c.value):!1),this.value=s.join(",")})}),this.setAttribute("data-ea-component",!0)}connectedCallback(){this.init()}}window.customElements.get("ea-checkbox-group")||window.customElements.define("ea-checkbox-group",i);export{i as EaCheckboxGroup};
