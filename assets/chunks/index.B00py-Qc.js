var m=(r,a,e)=>{if(!a.has(r))throw TypeError("Cannot "+e)};var t=(r,a,e)=>(m(r,a,"read from private field"),e?e.call(r):a.get(r)),s=(r,a,e)=>{if(a.has(r))throw TypeError("Cannot add the same private member more than once");a instanceof WeakSet?a.add(r):a.set(r,e)},o=(r,a,e,d)=>(m(r,a,"write to private field"),d?d.call(r,e):a.set(r,e),e);var _=(r,a,e)=>(m(r,a,"access private method"),e);import{B as k}from"./Base.yCeCPjNm.js";import"./index.BXibZEVU.js";import{t as y}from"./timeout.ZZWNqneZ.js";const b=r=>(r==="false"||r===!1?r=!1:r=!0,r),x=`
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
`;var i,w,l,n,c,p,h,f,g,u;class A extends k{constructor(){super();s(this,h);s(this,g);s(this,i,void 0);s(this,w,void 0);s(this,l,void 0);s(this,n,void 0);s(this,c,void 0);s(this,p,void 0);const e=this.attachShadow({mode:"open"});e.innerHTML=`
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
    `,o(this,i,e.querySelector(".ea-drawer_wrap")),o(this,w,e.querySelector(".ea-drawer_drawer-wrap")),o(this,l,e.querySelector(".ea-drawer_mask-wrap")),o(this,n,e.querySelector(".ea-drawer_header-wrap")),o(this,c,e.querySelector(".ea-drawer_title")),o(this,p,e.querySelector(".ea-drawer_icon")),this.build(e,x)}get directionType(){return["ltr","rtl","ttb","btt"]}get direction(){const e=this.getAttribute("direction");return this.directionType.includes(e)?e:"ltr"}set direction(e){this.setAttribute("direction",e),t(this,i).classList.toggle("direction-ltr",e==="ltr"),t(this,i).classList.toggle("direction-rtl",e==="rtl"),t(this,i).classList.toggle("direction-ttb",e==="ttb"),t(this,i).classList.toggle("direction-btt",e==="btt"),_(this,h,f).call(this,this.size)}get open(){return this.getAttrBoolean("open")||!1}set open(e){this.toggleAttr("open",e),y(()=>{t(this,i).classList.toggle("is-open",e)},20)}get size(){return this.getAttribute("size")||"30%"}set size(e){this.setAttribute("size",e),_(this,h,f).call(this,e)}get withHeader(){return b(this.getAttribute("with-header"))}set withHeader(e){this.toggleAttr("with-header",e),t(this,n).style.display=e?"flex":"none"}get title(){return this.getAttribute("title")}set title(e){this.setAttribute("title",e),e&&(t(this,c).innerText=e)}get showClose(){return b(this.getAttribute("show-close"))}set showClose(e){this.toggleAttr("show-close",e),t(this,p).style.display=e?"block":"none"}get modal(){return b(this.getAttribute("modal"))}set modal(e){this.toggleAttr("modal",e),t(this,l).style.display=e?"block":"none"}get wrapperClosable(){return b(this.getAttribute("wrapper-closable"))}set wrapperClosable(e){this.setAttribute("wrapper-closable",e)}connectedCallback(){this.direction=this.direction,this.size=this.size,this.withHeader=this.withHeader,this.withHeader&&(this.showClose=this.showClose,this.title=this.title),this.modal=this.modal,this.wrapperClosable=this.wrapperClosable,this.open=!1,_(this,g,u).call(this)}}i=new WeakMap,w=new WeakMap,l=new WeakMap,n=new WeakMap,c=new WeakMap,p=new WeakMap,h=new WeakSet,f=function(e){const d=this.direction==="ltr"||this.direction==="rtl"?"width":"height";t(this,w).style.height="inherit",t(this,w).style.width="inherit",t(this,w).style[d]=e},g=new WeakSet,u=function(){const e=()=>{this.open=!1,t(this,i).classList.remove("will-close"),t(this,w).removeEventListener("transitionend",e)},d=()=>{t(this,i).classList.add("will-close"),t(this,w).addEventListener("transitionend",e),this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))};this.wrapperClosable&&this.modal&&t(this,l).addEventListener("click",()=>{d()}),this.showClose&&t(this,p).addEventListener("click",()=>{d()})};customElements.get("ea-drawer")||customElements.define("ea-drawer",A);export{A as EaDrawer};
