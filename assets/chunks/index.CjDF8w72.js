var s=(t,a,e)=>{if(!a.has(t))throw TypeError("Cannot "+e)};var l=(t,a,e)=>(s(t,a,"read from private field"),e?e.call(t):a.get(t)),c=(t,a,e)=>{if(a.has(t))throw TypeError("Cannot add the same private member more than once");a instanceof WeakSet?a.add(t):a.set(t,e)},d=(t,a,e,o)=>(s(t,a,"write to private field"),o?o.call(t,e):a.set(t,e),e);var h=(t,a,e)=>(s(t,a,"access private method"),e);import{B as m}from"./Base.yCeCPjNm.js";import"./index.BXibZEVU.js";const u=`
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
.ea-container_wrap ::slotted(ea-main) {
  flex: 1;
  overflow: auto;
}
`;var r,n,f;class p extends m{constructor(){super();c(this,n);c(this,r,void 0);const e=this.attachShadow({mode:"open"});e.innerHTML=`
            <div class="ea-container_wrap" part="container">
                <slot></slot>
            </div>
        `,d(this,r,e.querySelector(".ea-container_wrap")),this.build(e,u)}get CONTAINER_TYPE(){return["ea-header","ea-main","ea-footer","ea-container","ea-aside"]}get direction(){return["horizontal","vertical"].includes(this.getAttribute("direction"))||"horizontal"}set direction(e){this.setAttribute("direction",e),l(this,r).classList.toggle("is-vertical",e==="horizontal")}connectedCallback(){const e=Array.from(this.children);h(this,n,f).call(this,e)}}r=new WeakMap,n=new WeakSet,f=function(e){const o=e.map(i=>i.tagName.toLowerCase());e.forEach(i=>{this.CONTAINER_TYPE.includes(i.tagName.toLowerCase())||i.remove(),i.tagName.toLowerCase()==="ea-container"&&(i.style.flex="1")}),o.includes("ea-header")||o.includes("ea-footer")?this.direction="horizontal":this.direction=this.direction};customElements.get("ea-container")||customElements.define("ea-container",p);export{p as EaContainer};
