var a=(t,h,e)=>{if(!h.has(t))throw TypeError("Cannot "+e)};var s=(t,h,e)=>(a(t,h,"read from private field"),e?e.call(t):h.get(t)),o=(t,h,e)=>{if(h.has(t))throw TypeError("Cannot add the same private member more than once");h instanceof WeakSet?h.add(t):h.set(t,e)},d=(t,h,e,i)=>(a(t,h,"write to private field"),i?i.call(t,e):h.set(t,e),e);import{B as n}from"./Base.yCeCPjNm.js";import"./index.CpoGCwi-.js";import"./createElement.BM9xfELw.js";const p=`
.ea-header_wrap {
  box-sizing: border-box;
  padding: 0 20px;

  height: 60px;

  color: #333;

  overflow: hidden;
}
`;var r;class c extends n{constructor(){super();o(this,r,void 0);const e=this.attachShadow({mode:"open"});e.innerHTML=`
            <header class="ea-header_wrap" part="container">
                <slot></slot>
            </header>
        `,d(this,r,e.querySelector(".ea-header_wrap")),this.build(e,p)}get height(){return this.getAttrNumber("height")||60}set height(e){this.setAttribute("height",e),s(this,r).style.height=`${e}px`,s(this,r).style.lineHeight=`${e}px`}connectedCallback(){this.height=this.height}}r=new WeakMap;customElements.get("ea-header")||customElements.define("ea-header",c);export{c as EaHeader};
