var m=(t,a,r)=>{if(!a.has(t))throw TypeError("Cannot "+r)};var e=(t,a,r)=>(m(t,a,"read from private field"),r?r.call(t):a.get(t)),w=(t,a,r)=>{if(a.has(t))throw TypeError("Cannot add the same private member more than once");a instanceof WeakSet?a.add(t):a.set(t,r)},o=(t,a,r,d)=>(m(t,a,"write to private field"),d?d.call(t,r):a.set(t,r),r);var _=(t,a,r)=>(m(t,a,"access private method"),r);import{B as k}from"./Base.LSgLRpFA.js";import"./index.CgEiilRo.js";import{t as y}from"./timeout.CMJ_lqqj.js";import{h as b}from"./handleDefaultAttrIsTrue.C-TnTdkH.js";const x=`
.ea-drawer_wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 2001;
}
.ea-drawer_wrap .ea-drawer_drawer-wrap {
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  transition: left 0.3s, right 0.3s, top 0.3s, bottom 0.3s;
}
.ea-drawer_wrap .ea-drawer_drawer-wrap .ea-drawer_header-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  margin-bottom: 32px;
  padding: 20px 20px 0;
  color: #72767b;
}
.ea-drawer_wrap .ea-drawer_drawer-wrap .ea-drawer_header-wrap .ea-drawer_icon {
  cursor: pointer;
}
.ea-drawer_wrap .ea-drawer_drawer-wrap .ea-drawer_main-wrap {
  flex: 1;
  box-sizing: border-box;
  padding: 20px;
  overflow: auto;
}
.ea-drawer_wrap .ea-drawer_drawer-wrap .ea-drawer_mask-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: -1;
  opacity: 0;
  scale: 0;
  transition: opacity 0.3s, left 0.3s, right 0.3s, top 0.3s, bottom 0.3s;
}
.ea-drawer_wrap.direction-ltr, .ea-drawer_wrap.direction-rtl {
  top: 0;
}
.ea-drawer_wrap.direction-ltr .ea-drawer_drawer-wrap, .ea-drawer_wrap.direction-rtl .ea-drawer_drawer-wrap {
  top: 0;
  height: 100%;
}
.ea-drawer_wrap.direction-ttb, .ea-drawer_wrap.direction-btt {
  left: 0;
}
.ea-drawer_wrap.direction-ttb .ea-drawer_drawer-wrap, .ea-drawer_wrap.direction-btt .ea-drawer_drawer-wrap {
  left: 0;
  width: 100%;
}
.ea-drawer_wrap.direction-ttb .ea-drawer_mask-wrap, .ea-drawer_wrap.direction-btt .ea-drawer_mask-wrap {
  left: 0;
}
.ea-drawer_wrap.direction-ltr.is-open .ea-drawer_mask-wrap, .ea-drawer_wrap.direction-rtl.is-open .ea-drawer_mask-wrap, .ea-drawer_wrap.direction-ttb.is-open .ea-drawer_mask-wrap, .ea-drawer_wrap.direction-btt.is-open .ea-drawer_mask-wrap {
  opacity: 1;
  scale: 1;
}
.ea-drawer_wrap.direction-ltr.will-close .ea-drawer_mask-wrap, .ea-drawer_wrap.direction-rtl.will-close .ea-drawer_mask-wrap, .ea-drawer_wrap.direction-ttb.will-close .ea-drawer_mask-wrap, .ea-drawer_wrap.direction-btt.will-close .ea-drawer_mask-wrap {
  opacity: 0;
  scale: 0;
}
.ea-drawer_wrap.direction-ltr {
  left: -100%;
}
.ea-drawer_wrap.direction-ltr .ea-drawer_drawer-wrap {
  left: -100%;
}
.ea-drawer_wrap.direction-ltr .ea-drawer_mask-wrap {
  left: 0;
}
.ea-drawer_wrap.direction-ltr.is-open {
  left: 0;
}
.ea-drawer_wrap.direction-ltr.is-open .ea-drawer_drawer-wrap {
  left: 0;
}
.ea-drawer_wrap.direction-ltr.will-close .ea-drawer_drawer-wrap {
  left: -100%;
}
.ea-drawer_wrap.direction-rtl {
  right: -100%;
}
.ea-drawer_wrap.direction-rtl .ea-drawer_drawer-wrap {
  right: -100%;
}
.ea-drawer_wrap.direction-rtl .ea-drawer_mask-wrap {
  right: 0;
}
.ea-drawer_wrap.direction-rtl.is-open {
  right: 0;
}
.ea-drawer_wrap.direction-rtl.is-open .ea-drawer_drawer-wrap {
  right: 0;
}
.ea-drawer_wrap.direction-rtl.will-close .ea-drawer_drawer-wrap {
  right: -100%;
}
.ea-drawer_wrap.direction-ttb {
  bottom: -100%;
}
.ea-drawer_wrap.direction-ttb .ea-drawer_drawer-wrap {
  bottom: -100%;
}
.ea-drawer_wrap.direction-ttb .ea-drawer_mask-wrap {
  bottom: 0;
}
.ea-drawer_wrap.direction-ttb.is-open {
  bottom: 0;
}
.ea-drawer_wrap.direction-ttb.is-open .ea-drawer_drawer-wrap {
  bottom: 0;
}
.ea-drawer_wrap.direction-ttb.will-close .ea-drawer_drawer-wrap {
  bottom: -100%;
}
.ea-drawer_wrap.direction-btt {
  top: -100%;
}
.ea-drawer_wrap.direction-btt .ea-drawer_drawer-wrap {
  top: -100%;
}
.ea-drawer_wrap.direction-btt .ea-drawer_mask-wrap {
  top: 0;
}
.ea-drawer_wrap.direction-btt.is-open {
  top: 0;
}
.ea-drawer_wrap.direction-btt.is-open .ea-drawer_drawer-wrap {
  top: 0;
}
.ea-drawer_wrap.direction-btt.will-close .ea-drawer_drawer-wrap {
  top: -100%;
}
`;var i,s,l,n,c,p,h,f,g,u;class A extends k{constructor(){super();w(this,h);w(this,g);w(this,i,void 0);w(this,s,void 0);w(this,l,void 0);w(this,n,void 0);w(this,c,void 0);w(this,p,void 0);const r=this.attachShadow({mode:"open"});r.innerHTML=`
      <div class="ea-drawer_wrap" part="container">
        <div class="ea-drawer_drawer-wrap" part="drawer-wrap">
          <div class="ea-drawer_header-wrap" part="header-wrap">
            <span class="ea-drawer_title" part="title-wrap">
              <slot name="title"></slot>
            </span>
            <ea-icon class="ea-drawer_icon" icon="icon-cancel" part="icon"></ea-icon>
          </div>
          <div class="ea-drawer_main-wrap" part="main-wrap">
            <slot></slot>
          </div>
          <div class="ea-drawer_mask-wrap" part="mask-wrap"></div>
        </div>
      </div>
    `,o(this,i,r.querySelector(".ea-drawer_wrap")),o(this,s,r.querySelector(".ea-drawer_drawer-wrap")),o(this,l,r.querySelector(".ea-drawer_mask-wrap")),o(this,n,r.querySelector(".ea-drawer_header-wrap")),o(this,c,r.querySelector(".ea-drawer_title")),o(this,p,r.querySelector(".ea-drawer_icon")),this.build(r,x)}get directionType(){return["ltr","rtl","ttb","btt"]}get direction(){const r=this.getAttribute("direction");return this.directionType.includes(r)?r:"ltr"}set direction(r){this.setAttribute("direction",r),e(this,i).classList.toggle("direction-ltr",r==="ltr"),e(this,i).classList.toggle("direction-rtl",r==="rtl"),e(this,i).classList.toggle("direction-ttb",r==="ttb"),e(this,i).classList.toggle("direction-btt",r==="btt"),_(this,h,f).call(this,this.size)}get open(){return this.getAttrBoolean("open")||!1}set open(r){this.toggleAttr("open",r),y(()=>{e(this,i).classList.toggle("is-open",r)},20)}get size(){return this.getAttribute("size")||"30%"}set size(r){this.setAttribute("size",r),_(this,h,f).call(this,r)}get withHeader(){return b(this.getAttribute("with-header"))}set withHeader(r){this.toggleAttr("with-header",r),e(this,n).style.display=r?"flex":"none"}get title(){return this.getAttribute("title")}set title(r){this.setAttribute("title",r),r&&(e(this,c).innerText=r)}get showClose(){return b(this.getAttribute("show-close"))}set showClose(r){this.toggleAttr("show-close",r),e(this,p).style.display=r?"block":"none"}get modal(){return b(this.getAttribute("modal"))}set modal(r){this.toggleAttr("modal",r),e(this,l).style.display=r?"block":"none"}get wrapperClosable(){return b(this.getAttribute("wrapper-closable"))}set wrapperClosable(r){this.setAttribute("wrapper-closable",r)}connectedCallback(){this.direction=this.direction,this.size=this.size,this.withHeader=this.withHeader,this.withHeader&&(this.showClose=this.showClose,this.title=this.title),this.modal=this.modal,this.wrapperClosable=this.wrapperClosable,this.open=!1,_(this,g,u).call(this)}}i=new WeakMap,s=new WeakMap,l=new WeakMap,n=new WeakMap,c=new WeakMap,p=new WeakMap,h=new WeakSet,f=function(r){const d=this.direction==="ltr"||this.direction==="rtl"?"width":"height";e(this,s).style.height="inherit",e(this,s).style.width="inherit",e(this,s).style[d]=r},g=new WeakSet,u=function(){const r=()=>{this.open=!1,e(this,i).classList.remove("will-close"),e(this,s).removeEventListener("transitionend",r)},d=()=>{e(this,i).classList.add("will-close"),e(this,s).addEventListener("transitionend",r),this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))};this.wrapperClosable&&this.modal&&e(this,l).addEventListener("click",()=>{d()}),this.showClose&&e(this,p).addEventListener("click",()=>{d()})};customElements.get("ea-drawer")||customElements.define("ea-drawer",A);export{A as EaDrawer};
