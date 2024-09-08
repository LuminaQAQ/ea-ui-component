var a=(t,h,e)=>{if(!h.has(t))throw TypeError("Cannot "+e)};var r=(t,h,e)=>(a(t,h,"read from private field"),e?e.call(t):h.get(t)),o=(t,h,e)=>{if(h.has(t))throw TypeError("Cannot add the same private member more than once");h instanceof WeakSet?h.add(t):h.set(t,e)},d=(t,h,e,i)=>(a(t,h,"write to private field"),i?i.call(t,e):h.set(t,e),e);import{B as n}from"./Base.LSgLRpFA.js";import"./index.CgEiilRo.js";const c=`
.ea-header_wrap {
  box-sizing: border-box;
  padding: 0 20px;

  height: 60px;

  color: #333;

  overflow: hidden;
}
`;var s;class p extends n{constructor(){super();o(this,s,void 0);const e=this.attachShadow({mode:"open"});e.innerHTML=`
            <header class="ea-header_wrap" part="container">
                <slot></slot>
            </header>
        `,d(this,s,e.querySelector(".ea-header_wrap")),this.build(e,c)}get height(){return this.getAttrNumber("height")||60}set height(e){this.setAttribute("height",e),r(this,s).style.height=`${e}px`,r(this,s).style.lineHeight=`${e}px`}connectedCallback(){this.height=this.height}}s=new WeakMap;customElements.get("ea-header")||customElements.define("ea-header",p);export{p as EaHeader};
