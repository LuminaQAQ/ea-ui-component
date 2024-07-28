var g=(e,r,t)=>{if(!r.has(e))throw TypeError("Cannot "+t)};var b=(e,r,t)=>(g(e,r,"read from private field"),t?t.call(e):r.get(e)),a=(e,r,t)=>{if(r.has(e))throw TypeError("Cannot add the same private member more than once");r instanceof WeakSet?r.add(e):r.set(e,t)},x=(e,r,t,o)=>(g(e,r,"write to private field"),o?o.call(e,t):r.set(e,t),t);var u=(e,r,t)=>(g(e,r,"access private method"),t);import{a as w}from"./createElement.BM9xfELw.js";import{B as k}from"./Base.CfZnvlaz.js";import"./index.BkyVSUn7.js";import"./index.CwPqXqD2.js";import"./index.D9ytpHsM.js";const y=`
@import url('/ea_ui_component/icon/index.css');

.ea-menu_wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 20px;
}
.ea-menu_wrap.is-vertical {
  flex-direction: column;
  align-items: flex-start;
  border-right: 1px solid #e6e6e6;
  overflow: auto;
}
.ea-menu_wrap.is-vertical ::slotted(ea-menu-item),
.ea-menu_wrap.is-vertical ::slotted(ea-submenu) {
  width: 100%;
}
.ea-menu_wrap.is-vertical ::slotted(ea-submenu) {
  width: 100%;
}
`;var c,m,h,f,d,C,p,v;class S extends k{constructor(){super();a(this,h);a(this,d);a(this,p);a(this,c,void 0);a(this,m,void 0);const t=this.attachShadow({mode:"open"}),o=document.createElement("div");o.className="ea-menu_wrap",o.part="wrap";const l=w();o.appendChild(l),x(this,c,o),x(this,m,l),this.build(t,y),this.shadowRoot.appendChild(o)}get mode(){return this.getAttribute("mode")||"vertical"}set mode(t){this.setAttribute("mode",t),b(this,c).classList.toggle("is-vertical",t==="vertical"),this.querySelectorAll("ea-submenu").forEach(o=>{o.mode=t})}get backgroundColor(){return this.getAttribute("background-color")||"#fff"}set backgroundColor(t){this.setAttribute("background-color",t),b(this,c).style.backgroundColor=t}get textColor(){return this.getAttribute("text-color")||"#303133"}set textColor(t){this.setAttribute("text-color",t)}get activeTextColor(){return this.getAttribute("active-text-color")||"#409eff"}set activeTextColor(t){this.setAttribute("active-text-color",t)}get collapse(){return this.getAttrBoolean("collapse")}set collapse(t){this.toggleAttr("collapse",t),this.querySelectorAll("ea-menu-item-group").forEach(o=>{this.mode==="vertical"&&(o.collapse=!t)})}connectedCallback(){u(this,p,v).call(this)}}c=new WeakMap,m=new WeakMap,h=new WeakSet,f=function(){const t=this.querySelectorAll("ea-menu-item"),o=this.querySelectorAll("ea-submenu"),l=this.querySelectorAll("ea-menu-item-group"),i=(s,n)=>{s.actived=!1};t.forEach((s,n)=>{s.itemIndex=n,s.addEventListener("item-selected",A=>{const E=A.detail.title;t.forEach(i),o.forEach(i),l.forEach(i),s.actived=!0,this.dispatchEvent(new CustomEvent("select",{detail:{index:n,title:E}}))})})},d=new WeakSet,C=function(){const t=this.querySelectorAll("ea-menu-item"),o=this.querySelectorAll("ea-submenu"),l=this.querySelectorAll("ea-menu-item-group"),i=(s,n)=>{s.backgroundColor=this.backgroundColor,s.textColor=this.textColor,s.activeTextColor=this.activeTextColor};t.forEach(i),o.forEach(i),l.forEach(i)},p=new WeakSet,v=function(){this.mode=this.mode,this.collapse=!0,this.backgroundColor=this.backgroundColor,this.textColor=this.textColor,this.activeTextColor=this.activeTextColor,u(this,h,f).call(this);let t=setTimeout(()=>{u(this,d,C).call(this),clearTimeout(t),t=null},20)};customElements.get("ea-menu")||customElements.define("ea-menu",S);export{S as EaMenu};
