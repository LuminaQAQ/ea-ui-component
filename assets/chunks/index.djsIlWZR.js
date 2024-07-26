import{B as r}from"./Base.CfZnvlaz.js";const s=`
@import url('/ea_ui_component/icon/index.css');

.__ea-link {
  text-decoration: none;
  color: #606266;
  cursor: pointer;
}
.__ea-link:hover {
  color: #797b80;
}
.__ea-link.underline:hover {
  text-decoration: underline;
}
.__ea-link.primary {
  color: #409eff;
}
.__ea-link.primary:hover {
  color: #73b8ff;
}
.__ea-link.success {
  color: #67c23a;
}
.__ea-link.success:hover {
  color: #85cf60;
}
.__ea-link.info {
  color: #909399;
}
.__ea-link.info:hover {
  color: #abadb1;
}
.__ea-link.warning {
  color: #e6a23c;
}
.__ea-link.warning:hover {
  color: #ecb869;
}
.__ea-link.danger {
  color: #f56c6c;
}
.__ea-link.danger:hover {
  color: #f89c9c;
}
.__ea-link.disabled {
  color: #c0c4cc;
  pointer-events: none;
}
.__ea-link.disabled:hover {
  color: #dcdee3;
}
`;class o extends r{constructor(){super();const e=this.attachShadow({mode:"open"});let t=document.createElement("a");t.part="wrap";const i=document.createElement("slot");t.className="__ea-link",t.appendChild(i),this.dom=t;const n=document.createElement("style");n.innerHTML=s,this.shadowRoot.appendChild(n),e.appendChild(t)}static get observedAttributes(){return["disabled"]}get LINK_TYPE(){return["primary","success","info","warning","danger"]}get href(){return this.getAttribute("href")}set href(e){e!==null&&(this.dom.href=e)}get type(){return this.getAttribute("type")}set type(e){if(e!==null){for(let t=0;t<this.LINK_TYPE.length;t++)if(e===this.LINK_TYPE[t]){this.dom.classList.add(e);break}}}get disabled(){return this.getAttribute("disabled")===""||this.getAttribute("disabled")==="true"}set disabled(e){e&&(e?this.dom.classList.add("disabled"):this.dom.classList.remove("disabled"))}get underline(){return this.getAttribute("underline")===""||this.getAttribute("underline")==="true"}set underline(e){e&&(e?this.dom.classList.add("underline"):this.dom.classList.remove("underline"))}get icon(){return this.getAttribute("icon")}set icon(e){if(e===null||e==="")return;const t=document.createElement("i");t.className=e,this.dom.insertBefore(t,this.dom.firstChild)}init(){this.href=this.href,this.type=this.type,this.disabled=this.disabled,this.underline=this.underline,this.icon=this.icon}connectedCallback(){this.init()}attributeChangedCallback(e,t,i){switch(e){case"disabled":this.disabled=i===""||i==="true"||i===!0;break}}}window.customElements.get("ea-link")||window.customElements.define("ea-link",o);export{o as EaLink};
