var o=(t,h,e)=>{if(!h.has(t))throw TypeError("Cannot "+e)};var r=(t,h,e)=>(o(t,h,"read from private field"),e?e.call(t):h.get(t)),d=(t,h,e)=>{if(h.has(t))throw TypeError("Cannot add the same private member more than once");h instanceof WeakSet?h.add(t):h.set(t,e)},n=(t,h,e,s)=>(o(t,h,"write to private field"),s?s.call(t,e):h.set(t,e),e);var p=(t,h,e)=>(o(t,h,"access private method"),e);import{B as g}from"./Base.CfZnvlaz.js";import{a as m}from"./createElement.BM9xfELw.js";const w=`
.ea-header_wrap {
  box-sizing: border-box;
  padding: 0 20px;
  height: 60px;
  color: #333;
}
`;var a,i,c;class x extends g{constructor(){super();d(this,i);d(this,a,void 0);const e=this.attachShadow({mode:"open"}),s=document.createElement("header");s.className="ea-header_wrap",s.part="wrap";const l=m();s.appendChild(l),n(this,a,s),this.build(e,w),this.shadowRoot.appendChild(s)}get height(){return this.getAttrNumber("height")||60}set height(e){this.setAttribute("height",e),r(this,a).style.height=`${e}px`,r(this,a).style.lineHeight=`${e}px`}connectedCallback(){p(this,i,c).call(this)}}a=new WeakMap,i=new WeakSet,c=function(){this.height=this.height};customElements.get("ea-header")||customElements.define("ea-header",x);export{x as EaHeader};
