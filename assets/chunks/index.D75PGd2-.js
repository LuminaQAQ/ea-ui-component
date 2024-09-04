var b=(a,r,t)=>{if(!r.has(a))throw TypeError("Cannot "+t)};var s=(a,r,t)=>{if(r.has(a))throw TypeError("Cannot add the same private member more than once");r instanceof WeakSet?r.add(a):r.set(a,t)},d=(a,r,t,e)=>(b(a,r,"write to private field"),e?e.call(a,t):r.set(a,t),t);var c=(a,r,t)=>(b(a,r,"access private method"),t);import{B as w}from"./Base.yCeCPjNm.js";import"./index.CpoGCwi-.js";import{a as C,c as _}from"./createElement.BM9xfELw.js";const y=`
.ea-breadcrumb-item_wrap {
  font-size: 14px;
  color: #606266;
  line-height: 1;
}
.ea-breadcrumb-item_wrap ::slotted(a) {
  text-decoration: none !important;
  font-weight: 600 !important;
  color: #303133 !important;
}
`;var p,n,g;class S extends w{constructor(){super();s(this,n);s(this,p,void 0);const t=this.attachShadow({mode:"open"}),e=document.createElement("span");e.className="ea-breadcrumb-item_wrap",e.part="wrap";const o=C();e.appendChild(o),d(this,p,e),this.build(t,y),this.shadowRoot.appendChild(e)}connectedCallback(){c(this,n,g).call(this)}}p=new WeakMap,n=new WeakSet,g=function(){};customElements.get("ea-breadcrumb-item")||customElements.define("ea-breadcrumb-item",S);const B=`
.ea-breadcrumb_wrap {
  display: flex;
}
.ea-breadcrumb_wrap .separator {
  margin: 0 10px;
}
`;var l,m,f,h,E;class R extends w{constructor(){super();s(this,m);s(this,h);s(this,l,void 0);const t=this.attachShadow({mode:"open"}),e=document.createElement("div");e.className="ea-breadcrumb_wrap",e.part="wrap";const o=C();e.appendChild(o),d(this,l,e),this.build(t,B),this.shadowRoot.appendChild(e)}get separator(){return this.getAttribute("separator")||"/"}set separator(t){this.setAttribute("separator",t)}get separatorClass(){return this.getAttribute("separator-class")||""}set separatorClass(t){this.setAttribute("separator-class",t)}get separatorColor(){return this.getAttribute("separator-color")||"#c0c4cc"}set separatorColor(t){this.setAttribute("separator-color",t)}connectedCallback(){c(this,h,E).call(this)}}l=new WeakMap,m=new WeakSet,f=function(t,e,o){const u=this.querySelectorAll("ea-breadcrumb-item");u.forEach((x,A)=>{if(A<u.length-1){const i=_("i");i.color=o,e?i.className=e:(i.style.margin="0 10px",i.innerText=t),x.appendChild(i)}})},h=new WeakSet,E=function(){this.separator=this.separator,this.separatorClass=this.separatorClass,this.separatorColor=this.separatorColor,c(this,m,f).call(this,this.separator,this.separatorClass,this.separatorColor)};customElements.get("ea-breadcrumb")||customElements.define("ea-breadcrumb",R);export{R as EaBreadcrumb};
