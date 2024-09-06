var o=(e,s,t)=>{if(!s.has(e))throw TypeError("Cannot "+t)};var d=(e,s,t)=>(o(e,s,"read from private field"),t?t.call(e):s.get(e)),r=(e,s,t)=>{if(s.has(e))throw TypeError("Cannot add the same private member more than once");s instanceof WeakSet?s.add(e):s.set(e,t)},h=(e,s,t,a)=>(o(e,s,"write to private field"),a?a.call(e,t):s.set(e,t),t);import{B as l}from"./Base.LSgLRpFA.js";import"./index.D5YVt3kx.js";const n=`
.ea-aside_wrap {
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
}
.ea-aside_wrap ::slotted(ea-main) {
  overflow: auto;
}
`;var i;class c extends l{constructor(){super();r(this,i,void 0);const t=this.attachShadow({mode:"open"});t.innerHTML=`
            <aside class="ea-aside_wrap" part="container">
                <slot></slot>
            </aside>
        `,h(this,i,t.querySelector(".ea-aside_wrap")),this.build(t,n)}get width(){return this.getAttrNumber("width")||200}set width(t){this.setAttribute("width",t),d(this,i).style.width=`${t}px`}connectedCallback(){this.width=this.width}}i=new WeakMap;customElements.get("ea-aside")||customElements.define("ea-aside",c);export{c as EaAside};
