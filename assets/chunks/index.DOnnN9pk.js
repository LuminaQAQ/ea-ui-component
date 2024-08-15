var f=(t,a,e)=>{if(!a.has(t))throw TypeError("Cannot "+e)};var r=(t,a,e)=>(f(t,a,"read from private field"),e?e.call(t):a.get(t)),n=(t,a,e)=>{if(a.has(t))throw TypeError("Cannot add the same private member more than once");a instanceof WeakSet?a.add(t):a.set(t,e)},s=(t,a,e,i)=>(f(t,a,"write to private field"),i?i.call(t,e):a.set(t,e),e);var u=(t,a,e)=>(f(t,a,"access private method"),e);import{B as S}from"./Base.yCeCPjNm.js";import"./index.CD0stXPe.js";import{a as k,c as d}from"./createElement.BM9xfELw.js";const T=`
@import url('/ea_ui_component/icon/index.css');

.ea-page-header_wrap {
  display: flex;
  align-items: center;
  line-height: 24px;
}
.ea-page-header_wrap .ea-page-header_title-wrap,
.ea-page-header_wrap .ea-page-header_divider,
.ea-page-header_wrap .ea-page-header_content-wrap {
  line-height: 24px;
}
.ea-page-header_wrap .ea-page-header_title-wrap {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  cursor: pointer;
}
.ea-page-header_wrap .ea-page-header_divider {
  margin: 0 1rem;
  margin-bottom: 1px;
  font-size: 14px;
  height: 14px;
  overflow: hidden;
  color: #dcdfe6;
  line-height: 1;
  vertical-align: middle;
}
.ea-page-header_wrap .ea-page-header_content-wrap {
  font-size: 18px;
  color: #303133;
  line-height: 1;
}
`;var c,h,l,p,o,g,A,m,C;class W extends S{constructor(){super();n(this,g);n(this,m);n(this,c,void 0);n(this,h,void 0);n(this,l,void 0);n(this,p,void 0);n(this,o,void 0);const e=this.attachShadow({mode:"open"}),i=document.createElement("div");i.className="ea-page-header_wrap",i.part="wrap";const b=k("title"),v=d("i","ea-page-header_back-icon");v.className="icon-angle-left";const w=d("div","ea-page-header_title-wrap",[v,b]);w.part="title-wrap",i.appendChild(w);const _=d("div","ea-page-header_divider");_.innerText="|",_.part="divider",i.appendChild(_);const E=k("content"),x=d("div","ea-page-header_content-wrap",[E]);x.part="content-wrap",i.appendChild(x),s(this,c,i),s(this,h,w),s(this,p,b),s(this,l,x),s(this,o,E),this.build(e,T),this.shadowRoot.appendChild(i)}get title(){return this.getAttribute("title")||""}set title(e){e?(this.setAttribute("title",e),r(this,p).innerText=e):(this.setAttribute("title","返回"),r(this,p).innerText="返回")}get content(){return this.getAttribute("content")||""}set content(e){e?(this.setAttribute("content",e),r(this,o).innerText=e):(this.setAttribute("content",""),r(this,o).innerText="")}connectedCallback(){u(this,g,A).call(this),this.title=this.title,this.content=this.content,u(this,m,C).call(this)}}c=new WeakMap,h=new WeakMap,l=new WeakMap,p=new WeakMap,o=new WeakMap,g=new WeakSet,A=function(){},m=new WeakSet,C=function(){r(this,h).addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("back"))})};customElements.get("ea-page-header")||customElements.define("ea-page-header",W);export{W as EaPageHeader};
