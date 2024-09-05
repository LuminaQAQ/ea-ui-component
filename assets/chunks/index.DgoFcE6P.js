var s=(t,i,e)=>{if(!i.has(t))throw TypeError("Cannot "+e)};var l=(t,i,e)=>(s(t,i,"read from private field"),e?e.call(t):i.get(t)),c=(t,i,e)=>{if(i.has(t))throw TypeError("Cannot add the same private member more than once");i instanceof WeakSet?i.add(t):i.set(t,e)},d=(t,i,e,o)=>(s(t,i,"write to private field"),o?o.call(t,e):i.set(t,e),e);var h=(t,i,e)=>(s(t,i,"access private method"),e);import{B as m}from"./Base.yCeCPjNm.js";import"./index.CpoGCwi-.js";import"./createElement.BM9xfELw.js";const p=`
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
`;var r,n,f;class u extends m{constructor(){super();c(this,n);c(this,r,void 0);const e=this.attachShadow({mode:"open"});e.innerHTML=`
            <div class="ea-container_wrap" part="container">
                <slot></slot>
            </div>
        `,d(this,r,e.querySelector(".ea-container_wrap")),this.build(e,p)}get CONTAINER_TYPE(){return["ea-header","ea-main","ea-footer","ea-container","ea-aside"]}get direction(){return["horizontal","vertical"].includes(this.getAttribute("direction"))||"horizontal"}set direction(e){this.setAttribute("direction",e),l(this,r).classList.toggle("is-vertical",e==="horizontal")}connectedCallback(){const e=Array.from(this.children);h(this,n,f).call(this,e)}}r=new WeakMap,n=new WeakSet,f=function(e){const o=e.map(a=>a.tagName.toLowerCase());e.forEach(a=>{this.CONTAINER_TYPE.includes(a.tagName.toLowerCase())||a.remove(),a.tagName.toLowerCase()==="ea-container"&&(a.style.flex="1")}),o.includes("ea-header")||o.includes("ea-footer")?this.direction="horizontal":this.direction=this.direction};customElements.get("ea-container")||customElements.define("ea-container",u);export{u as EaContainer};
