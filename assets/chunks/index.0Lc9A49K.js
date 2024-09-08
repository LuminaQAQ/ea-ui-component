var c=(t,i,e)=>{if(!i.has(t))throw TypeError("Cannot "+e)};var n=(t,i,e)=>(c(t,i,"read from private field"),e?e.call(t):i.get(t)),l=(t,i,e)=>{if(i.has(t))throw TypeError("Cannot add the same private member more than once");i instanceof WeakSet?i.add(t):i.set(t,e)},d=(t,i,e,o)=>(c(t,i,"write to private field"),o?o.call(t,e):i.set(t,e),e);var p=(t,i,e)=>(c(t,i,"access private method"),e);import{B as f}from"./Base.LSgLRpFA.js";import"./index.CgEiilRo.js";const _=`
.ea-loading_wrap {
  position: relative;
}
.ea-loading_wrap .ea-loading_mask {
  position: absolute;
  top: 0;
  left: 0;
  display: none;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: hsla(0, 0%, 100%, 0.9);
  z-index: 1;
  transition: background-color 0.2s;
}
.ea-loading_wrap .ea-loading_spinner,
.ea-loading_wrap .ea-loading_text {
  color: #409eff;
}
.ea-loading_wrap .ea-loading_spinner {
  font-size: 2rem;
}
.ea-loading_wrap .ea-loading_text {
  margin-left: 0.5rem;
}
.ea-loading_wrap.ea-loading_wrap--fullscreen {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 3000;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.ea-loading_wrap.ea-loading_wrap--loading .ea-loading_mask {
  display: flex;
}
`;var s,a,r,g,h;class b extends f{constructor(){super();l(this,g);l(this,s,void 0);l(this,a,void 0);l(this,r,void 0);const e=this.attachShadow({mode:"open"});e.innerHTML=`
        <div class="ea-loading_wrap" part="container">
            <div class="ea-loading_mask" part="mask-wrap">
                <ea-icon icon="icon-spin6 animate-spin" class="ea-loading_spinner" part="icon"></ea-icon>
            </div>
            <div class="ea-loading_content" part="content-wrap">
                <slot></slot>
            </div>
        </div>
        `,d(this,s,e.querySelector(".ea-loading_wrap")),d(this,a,e.querySelector(".ea-loading_mask")),d(this,r,e.querySelector(".ea-loading_spinner")),this.build(e,_)}get loading(){return this.getAttrBoolean("loading")||!1}set loading(e){this.setAttribute("loading",e),n(this,s).classList.toggle("ea-loading_wrap--loading",e),p(this,g,h).call(this,this.fullscreen,e,this.lock)}get spinner(){return this.getAttribute("spinner")||"icon-spin6"}set spinner(e){this.setAttribute("spinner",e),n(this,r).icon=`${e} animate-spin`}get spinnerSize(){return this.getAttrNumber("spinner-size")||16}set spinnerSize(e){this.setAttribute("spinner-size",e),n(this,r).style.fontSize=`${e}px`}get background(){return this.getAttribute("background")||"hsla(0, 0%, 100%, 0.9)"}set background(e){this.setAttribute("background",e),n(this,a).style.backgroundColor=e}get text(){return this.getAttribute("text")||""}set text(e){e&&this.setAttribute("text",e)}get fullscreen(){return this.getAttrBoolean("fullscreen")||!1}set fullscreen(e){e&&this.setAttribute("fullscreen",e)}get lock(){return this.getAttrBoolean("lock")||!1}set lock(e){e&&this.setAttribute("lock",e)}connectedCallback(){if(this.fullscreen=this.fullscreen,this.loading=this.loading,this.spinnerSize=this.spinnerSize,this.spinner=this.spinner,this.background=this.background,this.text){const e=document.createElement("div");e.className="ea-loading_text",e.innerHTML=this.text,n(this,a).appendChild(e)}}}s=new WeakMap,a=new WeakMap,r=new WeakMap,g=new WeakSet,h=function(e,o,u){e&&(n(this,s).classList.toggle("ea-loading_wrap--fullscreen",o),u&&(document.body.style.overflow=o?"hidden":"auto"))};customElements.get("ea-loading")||customElements.define("ea-loading",b);export{b as EaLoading};
