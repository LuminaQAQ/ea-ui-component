var t=(e,s,a)=>{if(!s.has(e))throw TypeError("Cannot "+a)};var d=(e,s,a)=>(t(e,s,"read from private field"),a?a.call(e):s.get(e)),c=(e,s,a)=>{if(s.has(e))throw TypeError("Cannot add the same private member more than once");s instanceof WeakSet?s.add(e):s.set(e,a)},i=(e,s,a,o)=>(t(e,s,"write to private field"),o?o.call(e,a):s.set(e,a),a);import{B as h}from"./Base.LSgLRpFA.js";const n=`
.ea-card_wrap {
  border-radius: 4px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  overflow: hidden;
  color: #303133;
  transition: box-shadow 0.3s;
}
.ea-card_wrap.is-always-shadow, .ea-card_wrap.is-hover-shadow:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.ea-card_wrap.is-never-shadow {
  box-shadow: none;
}
.ea-card_wrap .ea-card_content {
  padding: 20px;
}
`;var r;class w extends h{constructor(){super();c(this,r,void 0);const a=this.attachShadow({mode:"open"});a.innerHTML=`
      <div class="ea-card_wrap" part="container">
        <div class="ea-card_header" part="header-wrap">
          <slot name="header"></slot>
        </div>
        <div class="ea-card_content" part="content-wrap">
          <slot></slot>
        </div>
      </div>
    `,i(this,r,a.querySelector(".ea-card_wrap")),this.build(a,n)}get shadow(){return this.getAttribute("shadow")||"always"}set shadow(a){this.setAttribute("shadow",a),d(this,r).classList.add(`is-${a}-shadow`)}connectedCallback(){this.shadow=this.shadow}}r=new WeakMap;customElements.get("ea-card")||customElements.define("ea-card",w);
