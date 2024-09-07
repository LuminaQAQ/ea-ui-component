var o=(t,i,e)=>{if(!i.has(t))throw TypeError("Cannot "+e)};var r=(t,i,e)=>(o(t,i,"read from private field"),e?e.call(t):i.get(t)),l=(t,i,e)=>{if(i.has(t))throw TypeError("Cannot add the same private member more than once");i instanceof WeakSet?i.add(t):i.set(t,e)},c=(t,i,e,s)=>(o(t,i,"write to private field"),s?s.call(t,e):i.set(t,e),e);import{B as a}from"./Base.LSgLRpFA.js";import"./index.D5YVt3kx.js";const d=`
.ea-link {
  text-decoration: none;
  color: #606266;
  cursor: pointer;
}
.ea-link:hover {
  color: #797b80;
}
.ea-link.underline:hover {
  text-decoration: underline;
}
.ea-link.primary {
  color: #409eff;
}
.ea-link.primary:hover {
  color: #73b8ff;
}
.ea-link.success {
  color: #67c23a;
}
.ea-link.success:hover {
  color: #85cf60;
}
.ea-link.info {
  color: #909399;
}
.ea-link.info:hover {
  color: #abadb1;
}
.ea-link.warning {
  color: #e6a23c;
}
.ea-link.warning:hover {
  color: #ecb869;
}
.ea-link.danger {
  color: #f56c6c;
}
.ea-link.danger:hover {
  color: #f89c9c;
}
.ea-link.disabled {
  color: #c0c4cc;
  pointer-events: none;
}
.ea-link.disabled:hover {
  color: #dcdee3;
}
`;var n;class h extends a{constructor(){super();l(this,n,void 0);const e=this.attachShadow({mode:"open"});e.innerHTML=`
      <a class="ea-link" part="container">
        <slot></slot>
      </a>
    `,c(this,n,e.querySelector(".ea-link")),this.build(e,d)}get LINK_TYPE(){return["primary","success","info","warning","danger"]}get href(){return this.getAttribute("href")}set href(e){e&&(this.setAttribute("href",e),r(this,n).href=e)}get type(){const e=this.getAttribute("type");return this.LINK_TYPE.includes(e)?e:null}set type(e){e&&this.LINK_TYPE.includes(e)&&r(this,n).classList.add(e)}get disabled(){return this.getAttrBoolean("disabled")}set disabled(e){this.setAttribute("disabled",e),r(this,n).classList.toggle("disabled",e),this.style.cursor=e?"not-allowed":"pointer"}get underline(){return this.getAttrBoolean("underline")}set underline(e){this.setAttribute("underline",e),r(this,n).classList.toggle("underline",e)}get icon(){return this.getAttribute("icon")}set icon(e){if(!e)return;const s=document.createElement("ea-icon");s.icon=e,r(this,n).insertBefore(s,r(this,n).firstChild)}connectedCallback(){this.style.display="inline-block",this.href=this.href,this.type=this.type,this.disabled=this.disabled,this.underline=this.underline,this.icon=this.icon}}n=new WeakMap;window.customElements.get("ea-link")||window.customElements.define("ea-link",h);export{h as EaLink};
