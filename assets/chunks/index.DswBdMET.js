var h=(e,o,t)=>{if(!o.has(e))throw TypeError("Cannot "+t)};var s=(e,o,t)=>(h(e,o,"read from private field"),t?t.call(e):o.get(e)),a=(e,o,t)=>{if(o.has(e))throw TypeError("Cannot add the same private member more than once");o instanceof WeakSet?o.add(e):o.set(e,t)},n=(e,o,t,i)=>(h(e,o,"write to private field"),i?i.call(e,t):o.set(e,t),t);import{B as p}from"./Base.yCeCPjNm.js";import"./index.CpoGCwi-.js";import"./createElement.BM9xfELw.js";const c=`
.ea-footer_wrap {
  box-sizing: border-box;
  padding: 0 20px;

  height: 60px;

  color: #333;

  overflow: hidden;
}
`;var r;class g extends p{constructor(){super();a(this,r,void 0);const t=this.attachShadow({mode:"open"});t.innerHTML=`
            <footer class="ea-footer_wrap" part="container">
                <slot></slot>
            </footer>
        `,n(this,r,t.querySelector(".ea-footer_wrap")),this.build(t,c)}get height(){return this.getAttrNumber("height")||60}set height(t){this.setAttribute("height",t),s(this,r).style.height=`${t}px`,s(this,r).style.lineHeight=`${t}px`}connectedCallback(){this.height=this.height}}r=new WeakMap;customElements.get("ea-footer")||customElements.define("ea-footer",g);export{g as EaFooter};
