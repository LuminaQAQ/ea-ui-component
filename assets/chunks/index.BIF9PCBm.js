var i=(e,o,t)=>{if(!o.has(e))throw TypeError("Cannot "+t)};var r=(e,o,t)=>(i(e,o,"read from private field"),t?t.call(e):o.get(e)),a=(e,o,t)=>{if(o.has(e))throw TypeError("Cannot add the same private member more than once");o instanceof WeakSet?o.add(e):o.set(e,t)},n=(e,o,t,h)=>(i(e,o,"write to private field"),h?h.call(e,t):o.set(e,t),t);import{B as c}from"./Base.yCeCPjNm.js";import"./index.BXibZEVU.js";const p=`
.ea-footer_wrap {
  box-sizing: border-box;
  padding: 0 20px;

  height: 60px;

  color: #333;

  overflow: hidden;
}
`;var s;class g extends c{constructor(){super();a(this,s,void 0);const t=this.attachShadow({mode:"open"});t.innerHTML=`
            <footer class="ea-footer_wrap" part="container">
                <slot></slot>
            </footer>
        `,n(this,s,t.querySelector(".ea-footer_wrap")),this.build(t,p)}get height(){return this.getAttrNumber("height")||60}set height(t){this.setAttribute("height",t),r(this,s).style.height=`${t}px`,r(this,s).style.lineHeight=`${t}px`}connectedCallback(){this.height=this.height}}s=new WeakMap;customElements.get("ea-footer")||customElements.define("ea-footer",g);export{g as EaFooter};
