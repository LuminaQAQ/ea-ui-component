var b=(e,o,t)=>{if(!o.has(e))throw TypeError("Cannot "+t)};var s=(e,o,t)=>(b(e,o,"read from private field"),t?t.call(e):o.get(e)),a=(e,o,t)=>{if(o.has(e))throw TypeError("Cannot add the same private member more than once");o instanceof WeakSet?o.add(e):o.set(e,t)},d=(e,o,t,r)=>(b(e,o,"write to private field"),r?r.call(e,t):o.set(e,t),t);var w=(e,o,t)=>(b(e,o,"access private method"),t);import{a as v,c as x}from"./createElement.BM9xfELw.js";import{B as C}from"./Base.CfZnvlaz.js";const E=`
@import url('/ea_ui_component/icon/index.css');

.ea-menu-item-group_wrap {
  --normal-bgc: #fff;
  --normal-text-color: #303133;
  --actived-text-color: #409eff;
  --actived-bgc: #fff;
  width: 100%;
}
.ea-menu-item-group_wrap.is-actived .ea-submenu_title_wrap {
  color: var(--actived-text-color);
  border-color: var(--actived-text-color);
}
.ea-menu-item-group_wrap .ea-submenu_title_wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
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
.ea-menu-item-group_wrap .ea-submenu_items_wrap {
  margin: 0 20px;
  height: 0;
  overflow: hidden;
  transition: height 0.3s;
}
`;var i,p,c,u,m,_,h,y;class k extends C{constructor(){super();a(this,m);a(this,h);a(this,i,void 0);a(this,p,void 0);a(this,c,void 0);a(this,u,void 0);const t=this.attachShadow({mode:"open"}),r=document.createElement("div");r.className="ea-menu-item-group_wrap",r.part="wrap";const f=v("title"),n=x("i","ea-submenu_dropdown_icon icon-angle-down");n.part="dropdown-icon",n.style.transition="transform 0.3s",n.style.transform="rotate(-90deg)";const l=x("div","ea-submenu_title_wrap",[f,n]);r.appendChild(l);const A=v(),g=x("div","ea-submenu_items_wrap",[A]);g.part="dropdown-wrap",r.appendChild(g),d(this,i,r),d(this,p,l),d(this,c,g),d(this,u,n),this.build(t,E),this.shadowRoot.appendChild(r),this.style.width="100%"}get actived(){return this.getAttrBoolean("actived")}set actived(t){this.setAttribute("actived",t),s(this,i).classList.toggle("is-actived",t)}get backgroundColor(){return this.getAttribute("background-color")||"#fff"}set backgroundColor(t){this.setAttribute("background-color",t),s(this,i).style.setProperty("--normal-bgc",t)}get textColor(){return this.getAttribute("text-color")||"#303133"}set textColor(t){this.setAttribute("text-color",t),s(this,i).style.setProperty("--normal-text-color",t)}get activeTextColor(){return this.getAttribute("active-text-color")||"#409eff"}set activeTextColor(t){this.setAttribute("active-text-color",t),s(this,i).style.setProperty("--actived-text-color",t)}get collapse(){return this.getAttrBoolean("collapse")||!1}set collapse(t){this.setAttribute("collapse",t),s(this,c).style.height=t?s(this,c).scrollHeight+"px":"0",s(this,u).style.transform=t?"rotate(0deg)":"rotate(-90deg)"}connectedCallback(){w(this,h,y).call(this)}}i=new WeakMap,p=new WeakMap,c=new WeakMap,u=new WeakMap,m=new WeakSet,_=function(){this.querySelectorAll("ea-menu-item").forEach((r,f)=>{r.isSubItem=!0,r.addEventListener("item-selected",n=>{let l=setTimeout(()=>{this.actived=!0,clearTimeout(l),l=null},20)})}),s(this,p).addEventListener("click",r=>{this.collapse=!this.collapse})},h=new WeakSet,y=function(){w(this,m,_).call(this)};customElements.get("ea-menu-item-group")||customElements.define("ea-menu-item-group",k);export{k as EaMenuItemGroup};
