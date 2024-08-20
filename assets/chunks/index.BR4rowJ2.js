import{B as i}from"./Base.yCeCPjNm.js";const o=`
@import url('/ea_ui_component/icon/index.css');

.ea-radio-group {
  display: flex;
}
.ea-radio-group ea-radio {
  margin-right: 2rem;
}`;class s extends i{constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("div");e.appendChild(t);const a=document.createElement("slot");t.className="ea-radio-group",t.appendChild(a),this.dom=t,this.build(e,o),e.appendChild(t)}get name(){return this.getAttribute("name")}set name(e){this.querySelectorAll("ea-radio").forEach(t=>{t.setAttribute("name",e)})}get value(){return this.getAttribute("value")||""}set value(e){this.setAttribute("value",e)}init(){this.name=this.name;const e=this.querySelectorAll("ea-radio");e.forEach(a=>{a.checked&&(this.value=a.value),a.addEventListener("change",r=>{this.value=a.value,this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:this.value}}))})});const t=Array.from(e).find(a=>a.value===this.value);t&&(t.checked=!0),this.setAttribute("data-ea-component",!0)}connectedCallback(){this.init()}}window.customElements.get("ea-radio-group")||window.customElements.define("ea-radio-group",s);export{s as EaRadioGroup};
