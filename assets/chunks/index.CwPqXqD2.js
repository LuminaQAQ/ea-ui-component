var m=(e,o,t)=>{if(!o.has(e))throw TypeError("Cannot "+t)};var a=(e,o,t)=>(m(e,o,"read from private field"),t?t.call(e):o.get(e)),i=(e,o,t)=>{if(o.has(e))throw TypeError("Cannot add the same private member more than once");o instanceof WeakSet?o.add(e):o.set(e,t)},n=(e,o,t,r)=>(m(e,o,"write to private field"),r?r.call(e,t):o.set(e,t),t);var h=(e,o,t)=>(m(e,o,"access private method"),t);import{a as f,c as g}from"./createElement.BM9xfELw.js";import{B as C}from"./Base.CfZnvlaz.js";const E=`
@import url('/ea_ui_component/icon/index.css');

.ea-submenu_wrap {
  --normal-bgc: #fff;
  --normal-text-color: #303133;
  --actived-text-color: #409eff;
  --actived-bgc: #fff;
  position: relative;
  box-sizing: border-box;
  padding: 0 20px;
  border-bottom: 2px solid;
  border-color: transparent;
  height: 60px;
  line-height: 60px;
  font-size: 14px;
  color: var(--normal-text-color);
  background-color: var(--normal-bgc);
  white-space: nowrap;
  cursor: pointer;
  transition: border-color 0.3s, background-color 0.3s, color 0.3s;
}
.ea-submenu_wrap .ea-submenu_title_wrap {
  display: flex;
  justify-content: space-between;
}
.ea-submenu_wrap .ea-submenu_title_wrap .ea-submenu_dropdown_icon {
  rotate: -90deg;
  transition: rotate 0.3s;
}
.ea-submenu_wrap .ea-submenu_items_wrap {
  display: none;
  position: absolute;
  left: 0;
  margin-top: 3px;
  border-radius: 8px;
  overflow: hidden;
  min-width: 200px;
  z-index: 100;
  opacity: 0;
  transform-origin: left top;
  transform: scale(0);
  transition: opacity 0.3s, transform 0.3s;
}
.ea-submenu_wrap:hover .ea-submenu_items_wrap {
  opacity: 1;
  transform: scale(1);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
.ea-submenu_wrap:hover .ea-submenu_title_wrap .ea-submenu_dropdown_icon {
  rotate: 0deg;
}
.ea-submenu_wrap.is-actived {
  color: var(--actived-text-color);
  border-color: var(--actived-text-color);
}
.ea-submenu_wrap.is-sub-actived {
  color: var(--actived-text-color);
}
.ea-submenu_wrap.is-disabled {
  color: #c0c4cc;
  pointer-events: none;
  cursor: not-allowed;
}
.ea-submenu_wrap ::slotted(a) {
  color: var(--normal-text-color);
  text-decoration: none;
}
`;var s,l,c,d,u,y,p,A;class k extends C{constructor(){super();i(this,u);i(this,p);i(this,s,void 0);i(this,l,void 0);i(this,c,void 0);i(this,d,void 0);const t=this.attachShadow({mode:"open"}),r=document.createElement("div");r.className="ea-submenu_wrap",r.part="wrap";const w=f("title"),x=g("i","ea-submenu_dropdown_icon icon-angle-down"),_=g("div","ea-submenu_title_wrap",[w,x]);r.appendChild(_);const v=f(),b=g("div","ea-submenu_items_wrap",[v]);b.part="dropdown-wrap",r.appendChild(b),n(this,s,r),n(this,l,_),n(this,c,b),n(this,d,v),this.build(t,E),this.shadowRoot.appendChild(r)}get actived(){return this.getAttrBoolean("actived")}set actived(t){this.setAttribute("actived",t),a(this,s).classList.toggle("is-actived",t)}get backgroundColor(){return this.getAttribute("background-color")||"#fff"}set backgroundColor(t){this.setAttribute("background-color",t),a(this,s).style.setProperty("--normal-bgc",t)}get textColor(){return this.getAttribute("text-color")||"#303133"}set textColor(t){this.setAttribute("text-color",t),a(this,s).style.setProperty("--normal-text-color",t)}get activeTextColor(){return this.getAttribute("active-text-color")||"#409eff"}set activeTextColor(t){this.setAttribute("active-text-color",t),a(this,s).style.setProperty("--actived-text-color",t)}get disabled(){return this.getAttrBoolean("disabled")}set disabled(t){this.setAttribute("disabled",t),a(this,s).classList.toggle("is-disabled",t)}get mode(){return this.getAttribute("mode")||"horizontal"}set mode(t){this.setAttribute("mode",t),a(this,s).classList.toggle("is-vertical",t==="vertical")}connectedCallback(){h(this,p,A).call(this)}}s=new WeakMap,l=new WeakMap,c=new WeakMap,d=new WeakMap,u=new WeakSet,y=function(){this.querySelectorAll("ea-menu-item").forEach((r,w)=>{r.isSubItem=!0,r.addEventListener("item-selected",x=>{this.actived=!0})})},p=new WeakSet,A=function(){this.disabled=this.disabled,h(this,u,y).call(this);let t=setTimeout(()=>{a(this,c).style.display="block",clearTimeout(t),t=null},20)};customElements.get("ea-submenu")||customElements.define("ea-submenu",k);export{k as EaSubmenu};
