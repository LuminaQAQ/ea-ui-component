var n=(e,o,t)=>{if(!o.has(e))throw TypeError("Cannot "+t)};var p=(e,o,t)=>(n(e,o,"read from private field"),t?t.call(e):o.get(e)),h=(e,o,t)=>{if(o.has(e))throw TypeError("Cannot add the same private member more than once");o instanceof WeakSet?o.add(e):o.set(e,t)},c=(e,o,t,s)=>(n(e,o,"write to private field"),s?s.call(e,t):o.set(e,t),t);var l=(e,o,t)=>(n(e,o,"access private method"),t);import{a as g}from"./createElement.BM9xfELw.js";import{B as f}from"./Base.yCeCPjNm.js";import"./index.h3IRzvjH.js";const w=`
.ea-footer_wrap {
  box-sizing: border-box;
  padding: 0 20px;
  height: 60px;
  color: #333;
}
`;var i,r,a,m;class x extends f{constructor(){super();h(this,a);h(this,i,void 0);h(this,r,void 0);const t=this.attachShadow({mode:"open"}),s=document.createElement("div");s.className="ea-footer_wrap",s.part="wrap";const d=g();s.appendChild(d),c(this,i,s),c(this,r,d),this.build(t,w),this.shadowRoot.appendChild(s)}get height(){return this.getAttrNumber("height")||60}set height(t){this.setAttribute("height",t),p(this,i).style.height=`${t}px`,p(this,i).style.lineHeight=`${t}px`}connectedCallback(){l(this,a,m).call(this)}}i=new WeakMap,r=new WeakMap,a=new WeakSet,m=function(){this.height=this.height};customElements.get("ea-footer")||customElements.define("ea-footer",x);export{x as EaFooter};
