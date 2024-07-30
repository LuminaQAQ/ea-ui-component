var d=(t,i,e)=>{if(!i.has(t))throw TypeError("Cannot "+e)};var p=(t,i,e)=>(d(t,i,"read from private field"),e?e.call(t):i.get(t)),r=(t,i,e)=>{if(i.has(t))throw TypeError("Cannot add the same private member more than once");i instanceof WeakSet?i.add(t):i.set(t,e)},h=(t,i,e,a)=>(d(t,i,"write to private field"),a?a.call(t,e):i.set(t,e),e);var m=(t,i,e)=>(d(t,i,"access private method"),e);import{B as w}from"./Base.yCeCPjNm.js";import"./index.CBgfcM5M.js";import{a as g}from"./createElement.BM9xfELw.js";const C=`
.ea-container_wrap {
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
.ea-container_wrap.is-vertical {
  flex-direction: column;
}
`;var n,s,c,f,l,u;class E extends w{constructor(){super();r(this,c);r(this,l);r(this,n,void 0);r(this,s,void 0);const e=this.attachShadow({mode:"open"}),a=document.createElement("div");a.className="ea-container_wrap",a.part="wrap";const o=g();a.appendChild(o),h(this,n,a),h(this,s,o),this.build(e,C),this.shadowRoot.appendChild(a)}get CONTAINER_TYPE(){return["ea-header","ea-main","ea-footer","ea-container","ea-aside"]}get direction(){return["horizontal","vertical"].includes(this.getAttribute("direction"))||"horizontal"}set direction(e){this.setAttribute("direction",e),p(this,n).classList.toggle("is-vertical",e==="horizontal")}connectedCallback(){m(this,l,u).call(this)}}n=new WeakMap,s=new WeakMap,c=new WeakSet,f=function(e){const a=e.map(o=>o.tagName.toLowerCase());e.forEach(o=>{this.CONTAINER_TYPE.includes(o.tagName.toLowerCase())||o.remove(),o.tagName.toLowerCase()==="ea-container"&&(o.style.flex="1")}),a.includes("ea-header")||a.includes("ea-footer")?this.direction="horizontal":this.direction=this.direction},l=new WeakSet,u=function(){const e=Array.from(this.children);m(this,c,f).call(this,e)};customElements.get("ea-container")||customElements.define("ea-container",E);export{E as EaContainer};
