var y=(r,a,e)=>{if(!a.has(r))throw TypeError("Cannot "+e)};var t=(r,a,e)=>(y(r,a,"read from private field"),e?e.call(r):a.get(r)),w=(r,a,e)=>{if(a.has(r))throw TypeError("Cannot add the same private member more than once");a instanceof WeakSet?a.add(r):a.set(r,e)},o=(r,a,e,i)=>(y(r,a,"write to private field"),i?i.call(r,e):a.set(r,e),e);var h=(r,a,e)=>(y(r,a,"access private method"),e);import{B as D}from"./Base.yCeCPjNm.js";import"./index.DSSfHWaE.js";import{c as p,a as L}from"./createElement.BM9xfELw.js";const g=r=>(r==="false"||r===!1?r=!1:r=!0,r),v=`
@import url('/ea_ui_component/icon/index.css');

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
`;var s,d,l,_,b,c,m,C,f,W,u,T;class B extends D{constructor(){super();w(this,m);w(this,f);w(this,u);w(this,s,void 0);w(this,d,void 0);w(this,l,void 0);w(this,_,void 0);w(this,b,void 0);w(this,c,void 0);const e=this.attachShadow({mode:"open"}),i=document.createElement("div");i.className="ea-drawer_wrap",i.part="wrap";const n=p("div","ea-drawer_mask-wrap");n.part="mask-wrap";const S=L("title"),A=p("span","ea-drawer_title",[S]),z=p("i","ea-drawer_icon icon-cancel"),k=p("div","ea-drawer_header-wrap",[A,z]);k.part="header-wrap";const H=L(),E=p("div","ea-drawer_main-wrap",[H]);E.part="main-wrap";const x=p("div","ea-drawer_drawer-wrap",[k,E,n]);x.part="drawer-wrap",i.appendChild(x),o(this,s,i),o(this,d,x),o(this,l,n),o(this,_,k),o(this,b,A),o(this,c,z),this.build(e,v),this.shadowRoot.appendChild(i)}get directionType(){return["ltr","rtl","ttb","btt"]}get direction(){const e=this.getAttribute("direction");return this.directionType.includes(e)?e:"ltr"}set direction(e){this.setAttribute("direction",e),t(this,s).classList.toggle("direction-ltr",e==="ltr"),t(this,s).classList.toggle("direction-rtl",e==="rtl"),t(this,s).classList.toggle("direction-ttb",e==="ttb"),t(this,s).classList.toggle("direction-btt",e==="btt"),h(this,m,C).call(this,this.size)}get open(){return this.getAttrBoolean("open")||!1}set open(e){this.toggleAttr("open",e),setTimeout(()=>{t(this,s).classList.toggle("is-open",e)},20)}get size(){return this.getAttribute("size")||"30%"}set size(e){this.setAttribute("size",e),h(this,m,C).call(this,e)}get withHeader(){return g(this.getAttribute("with-header"))}set withHeader(e){this.toggleAttr("with-header",e),t(this,_).style.display=e?"flex":"none"}get title(){return this.getAttribute("title")}set title(e){this.setAttribute("title",e),e&&(t(this,b).innerText=e)}get showClose(){return g(this.getAttribute("show-close"))}set showClose(e){this.toggleAttr("show-close",e),t(this,c).style.display=e?"block":"none"}get modal(){return g(this.getAttribute("modal"))}set modal(e){this.toggleAttr("modal",e),t(this,l).style.display=e?"block":"none"}get wrapperClosable(){return g(this.getAttribute("wrapper-closable"))}set wrapperClosable(e){this.setAttribute("wrapper-closable",e)}connectedCallback(){h(this,u,T).call(this)}}s=new WeakMap,d=new WeakMap,l=new WeakMap,_=new WeakMap,b=new WeakMap,c=new WeakMap,m=new WeakSet,C=function(e){const i=this.direction==="ltr"||this.direction==="rtl"?"width":"height";t(this,d).style.height="inherit",t(this,d).style.width="inherit",t(this,d).style[i]=e},f=new WeakSet,W=function(){const e=this,i=()=>{e.open=!1,t(this,s).classList.remove("will-close"),t(this,d).removeEventListener("transitionend",i)},n=()=>{t(this,s).classList.add("will-close"),t(this,d).addEventListener("transitionend",i),this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))};this.wrapperClosable&&this.modal&&t(this,l).addEventListener("click",()=>{n()}),this.showClose&&t(this,c).addEventListener("click",()=>{n()})},u=new WeakSet,T=function(){this.direction=this.direction,this.size=this.size,this.withHeader=this.withHeader,this.withHeader&&(this.showClose=this.showClose,this.title=this.title),this.modal=this.modal,this.wrapperClosable=this.wrapperClosable,this.open=!1,h(this,f,W).call(this)};customElements.get("ea-drawer")||customElements.define("ea-drawer",B);export{B as EaDrawer};
