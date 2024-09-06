import{B as o}from"./Base.LSgLRpFA.js";const s=`
.ea-button-group {
  display: flex;
  align-items: center;
}
.ea-button-group ::slotted(ea-button) {
  --border-radius: 0;
}
.ea-button-group ::slotted(ea-button:not([type=normal])) {
  border-right: 1px solid rgba(255, 255, 255, 0.3);
}
.ea-button-group ::slotted(ea-button:first-of-type) {
  --border-radius: 4px 0 0 4px;
}
.ea-button-group ::slotted(ea-button:last-of-type) {
  --border-radius: 0 4px 4px 0;
}
`;class r extends o{constructor(){super();const t=this.attachShadow({mode:"open"});t.innerHTML=`
      <div class="ea-button-group">
        <slot></slot>
      </div>
    `,this.build(t,s)}get disabled(){return this.getAttrBoolean("disabled")}set disabled(t){this.toggleAttr("disabled",t),Array.from(this.children).forEach(e=>{e.disabled=t})}connectedCallback(){this.disabled=this.disabled}}window.customElements.get("ea-button-group")||window.customElements.define("ea-button-group",r);export{r as EaButtonGroup};
