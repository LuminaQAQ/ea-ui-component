var r=(t,e,a)=>{if(!e.has(t))throw TypeError("Cannot "+a)};var n=(t,e,a)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,a)},c=(t,e,a,o)=>(r(t,e,"write to private field"),o?o.call(t,a):e.set(t,a),a);var l=(t,e,a)=>(r(t,e,"access private method"),a);import{B as p}from"./Base.CfZnvlaz.js";import{a as h}from"./createElement.BM9xfELw.js";const w=`
.ea-main_wrap {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 20px;
  overflow: auto;
  color: #333;
}
`;var s,i,m;class u extends p{constructor(){super();n(this,i);n(this,s,void 0);const a=this.attachShadow({mode:"open"}),o=document.createElement("main");o.className="ea-main_wrap",o.part="wrap";const d=h();o.appendChild(d),c(this,s,o),this.build(a,w),this.shadowRoot.appendChild(o),this.style.flex="1"}connectedCallback(){l(this,i,m).call(this)}}s=new WeakMap,i=new WeakSet,m=function(){};customElements.get("ea-main")||customElements.define("ea-main",u);export{u as EaMain};
