var r=(e,s,t)=>{if(!s.has(e))throw TypeError("Cannot "+t)};var l=(e,s,t)=>(r(e,s,"read from private field"),t?t.call(e):s.get(e)),o=(e,s,t)=>{if(s.has(e))throw TypeError("Cannot add the same private member more than once");s instanceof WeakSet?s.add(e):s.set(e,t)},n=(e,s,t,i)=>(r(e,s,"write to private field"),i?i.call(e,t):s.set(e,t),t);var p=(e,s,t)=>(r(e,s,"access private method"),t);import{a as m}from"./createElement.BM9xfELw.js";import{B as u}from"./Base.CfZnvlaz.js";const f=`
.ea-aside_wrap {
  height: 100%;
  overflow: auto;
}
`;var a,h,d,w;class E extends u{constructor(){super();o(this,d);o(this,a,void 0);o(this,h,void 0);const t=this.attachShadow({mode:"open"}),i=document.createElement("aside");i.className="ea-aside_wrap",i.part="wrap";const c=m();i.appendChild(c),n(this,a,i),n(this,h,c),this.build(t,f),this.shadowRoot.appendChild(i)}get width(){return this.getAttrNumber("width")}set width(t){this.setAttribute("width",t),l(this,a).style.width=`${t}px`}connectedCallback(){p(this,d,w).call(this)}}a=new WeakMap,h=new WeakMap,d=new WeakSet,w=function(){this.width=this.width};customElements.get("ea-aside")||customElements.define("ea-aside",E);export{E as EaAside};
