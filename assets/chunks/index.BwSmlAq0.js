var W=(s,i,t)=>{if(!i.has(s))throw TypeError("Cannot "+t)};var o=(s,i,t)=>(W(s,i,"read from private field"),t?t.call(s):i.get(s)),r=(s,i,t)=>{if(i.has(s))throw TypeError("Cannot add the same private member more than once");i instanceof WeakSet?i.add(s):i.set(s,t)},c=(s,i,t,e)=>(W(s,i,"write to private field"),e?e.call(s,t):i.set(s,t),t);var u=(s,i,t)=>(W(s,i,"access private method"),t);import{a as v,c as g}from"./createElement.BM9xfELw.js";import{B as R}from"./Base.yCeCPjNm.js";import"./index.DhjvHksS.js";const Q=`
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
`;var b,f,x,_,A,N,y,G;class U extends R{constructor(){super();r(this,A);r(this,y);r(this,b,void 0);r(this,f,void 0);r(this,x,void 0);r(this,_,void 0);const t=this.attachShadow({mode:"open"}),e=document.createElement("div");e.className="ea-menu-item-group_wrap",e.part="wrap";const l=v("title"),n=g("i","ea-submenu_dropdown_icon icon-angle-down");n.part="dropdown-icon",n.style.transition="transform 0.3s",n.style.transform="rotate(-90deg)";const a=g("div","ea-submenu_title_wrap",[l,n]);e.appendChild(a);const h=v(),p=g("div","ea-submenu_items_wrap",[h]);p.part="dropdown-wrap",e.appendChild(p),c(this,b,e),c(this,f,a),c(this,x,p),c(this,_,n),this.build(t,Q),this.shadowRoot.appendChild(e)}get actived(){return this.getAttrBoolean("actived")}set actived(t){this.setAttribute("actived",t),o(this,b).classList.toggle("is-actived",t)}get backgroundColor(){return this.getAttribute("background-color")||"#fff"}set backgroundColor(t){this.setAttribute("background-color",t),o(this,b).style.setProperty("--normal-bgc",t)}get textColor(){return this.getAttribute("text-color")||"#303133"}set textColor(t){this.setAttribute("text-color",t),o(this,b).style.setProperty("--normal-text-color",t)}get activeTextColor(){return this.getAttribute("active-text-color")||"#409eff"}set activeTextColor(t){this.setAttribute("active-text-color",t),o(this,b).style.setProperty("--actived-text-color",t)}get collapse(){return this.getAttrBoolean("collapse")||!1}set collapse(t){this.setAttribute("collapse",t),o(this,x).style.height=t?o(this,x).scrollHeight+"px":"0",o(this,_).style.transform=t?"rotate(0deg)":"rotate(-90deg)"}connectedCallback(){u(this,y,G).call(this)}}b=new WeakMap,f=new WeakMap,x=new WeakMap,_=new WeakMap,A=new WeakSet,N=function(){this.querySelectorAll("ea-menu-item").forEach((e,l)=>{e.isSubItem=!0,e.addEventListener("item-selected",n=>{let a=setTimeout(()=>{this.actived=!0,clearTimeout(a),a=null},20)})}),o(this,f).addEventListener("click",e=>{this.collapse=!this.collapse})},y=new WeakSet,G=function(){this.style.width="100%",u(this,A,N).call(this)};customElements.get("ea-menu-item-group")||customElements.define("ea-menu-item-group",U);const V=`
@import url('/ea_ui_component/icon/index.css');

.ea-menu-item_wrap {
  --normal-bgc: #fff;
  --normal-text-color: #303133;
  --actived-text-color: #409eff;
  --actived-bgc: #fff;
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
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  transition: border-color 0.3s, background-color 0.3s, color 0.3s;
}
.ea-menu-item_wrap.is-actived {
  color: var(--actived-text-color);
  border-color: var(--actived-text-color);
}
.ea-menu-item_wrap.is-actived ::slotted(a) {
  color: var(--actived-text-color) !important;
}
.ea-menu-item_wrap.is-sub-actived {
  color: var(--actived-text-color);
}
.ea-menu-item_wrap.is-sub-actived ::slotted(a) {
  color: var(--actived-text-color) !important;
}
.ea-menu-item_wrap.is-disabled {
  color: #c0c4cc !important;
  pointer-events: none;
  cursor: not-allowed;
}
.ea-menu-item_wrap.is-disabled ::slotted(a) {
  color: #c0c4cc !important;
}
.ea-menu-item_wrap ::slotted(a) {
  color: var(--normal-text-color) !important;
  text-decoration: none !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
`;var d,E,k,$,S,j;class X extends R{constructor(){super();r(this,k);r(this,S);r(this,d,void 0);r(this,E,void 0);const t=this.attachShadow({mode:"open"}),e=document.createElement("div");e.className="ea-menu-item_wrap",e.part="wrap";const l=v();e.appendChild(l),c(this,d,e),c(this,E,l),this.build(t,V),this.shadowRoot.appendChild(e)}get actived(){return this.getAttrBoolean("actived")}set actived(t){this.setAttribute("actived",t),this.isSubItem?o(this,d).classList.toggle("is-sub-actived",t):o(this,d).classList.toggle("is-actived",t)}get isSubItem(){return this.getAttrBoolean("is-sub-item")}set isSubItem(t){this.setAttribute("is-sub-item",t)}get backgroundColor(){return this.getAttribute("background-color")||"#fff"}set backgroundColor(t){this.setAttribute("background-color",t),o(this,d).style.setProperty("--normal-bgc",t)}get textColor(){return this.getAttribute("text-color")||"#303133"}set textColor(t){this.setAttribute("text-color",t),o(this,d).style.setProperty("--normal-text-color",t)}get activeTextColor(){return this.getAttribute("active-text-color")||"#409eff"}set activeTextColor(t){this.setAttribute("active-text-color",t),o(this,d).style.setProperty("--actived-text-color",t)}get disabled(){return this.getAttrBoolean("disabled")}set disabled(t){this.setAttribute("disabled",t),o(this,d).classList.toggle("is-disabled",t)}connectedCallback(){u(this,S,j).call(this)}}d=new WeakMap,E=new WeakMap,k=new WeakSet,$=function(){o(this,d).addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("item-selected",{detail:{index:this.index,title:this.textContent}}))})},S=new WeakSet,j=function(){this.actived=this.actived,this.disabled=this.disabled,u(this,k,$).call(this)};customElements.get("ea-menu-item")||customElements.define("ea-menu-item",X);const Y=`
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
`;var m,I,C,T,L,H,q,D;class Z extends R{constructor(){super();r(this,L);r(this,q);r(this,m,void 0);r(this,I,void 0);r(this,C,void 0);r(this,T,void 0);const t=this.attachShadow({mode:"open"}),e=document.createElement("div");e.className="ea-submenu_wrap",e.part="wrap";const l=v("title"),n=g("i","ea-submenu_dropdown_icon icon-angle-down"),a=g("div","ea-submenu_title_wrap",[l,n]);e.appendChild(a);const h=v(),p=g("div","ea-submenu_items_wrap",[h]);p.part="dropdown-wrap",e.appendChild(p),c(this,m,e),c(this,I,a),c(this,C,p),c(this,T,h),this.build(t,Y),this.shadowRoot.appendChild(e)}get actived(){return this.getAttrBoolean("actived")}set actived(t){this.setAttribute("actived",t),o(this,m).classList.toggle("is-actived",t)}get backgroundColor(){return this.getAttribute("background-color")||"#fff"}set backgroundColor(t){this.setAttribute("background-color",t),o(this,m).style.setProperty("--normal-bgc",t)}get textColor(){return this.getAttribute("text-color")||"#303133"}set textColor(t){this.setAttribute("text-color",t),o(this,m).style.setProperty("--normal-text-color",t)}get activeTextColor(){return this.getAttribute("active-text-color")||"#409eff"}set activeTextColor(t){this.setAttribute("active-text-color",t),o(this,m).style.setProperty("--actived-text-color",t)}get disabled(){return this.getAttrBoolean("disabled")}set disabled(t){this.setAttribute("disabled",t),o(this,m).classList.toggle("is-disabled",t)}get mode(){return this.getAttribute("mode")||"horizontal"}set mode(t){this.setAttribute("mode",t),o(this,m).classList.toggle("is-vertical",t==="vertical")}connectedCallback(){u(this,q,D).call(this)}}m=new WeakMap,I=new WeakMap,C=new WeakMap,T=new WeakMap,L=new WeakSet,H=function(){this.querySelectorAll("ea-menu-item").forEach((e,l)=>{e.isSubItem=!0,e.addEventListener("item-selected",n=>{this.actived=!0})})},q=new WeakSet,D=function(){this.disabled=this.disabled,u(this,L,H).call(this);let t=setTimeout(()=>{o(this,C).style.display="block",clearTimeout(t),t=null},20)};customElements.get("ea-submenu")||customElements.define("ea-submenu",Z);const tt=`
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
`;var w,B,P,F,z,J,M,K;class et extends R{constructor(){super();r(this,P);r(this,z);r(this,M);r(this,w,void 0);r(this,B,void 0);const t=this.attachShadow({mode:"open"}),e=document.createElement("div");e.className="ea-menu_wrap",e.part="wrap";const l=v();e.appendChild(l),c(this,w,e),c(this,B,l),this.build(t,tt),this.shadowRoot.appendChild(e)}get mode(){return this.getAttribute("mode")||"vertical"}set mode(t){this.setAttribute("mode",t),o(this,w).classList.toggle("is-vertical",t==="vertical"),this.querySelectorAll("ea-submenu").forEach(e=>{e.mode=t})}get backgroundColor(){return this.getAttribute("background-color")||"#fff"}set backgroundColor(t){this.setAttribute("background-color",t),o(this,w).style.backgroundColor=t}get textColor(){return this.getAttribute("text-color")||"#303133"}set textColor(t){this.setAttribute("text-color",t)}get activeTextColor(){return this.getAttribute("active-text-color")||"#409eff"}set activeTextColor(t){this.setAttribute("active-text-color",t)}get collapse(){return this.getAttrBoolean("collapse")}set collapse(t){this.toggleAttr("collapse",t),this.querySelectorAll("ea-menu-item-group").forEach(e=>{this.mode==="vertical"&&(e.collapse=!t)})}connectedCallback(){u(this,M,K).call(this)}}w=new WeakMap,B=new WeakMap,P=new WeakSet,F=function(){const t=this.querySelectorAll("ea-menu-item"),e=this.querySelectorAll("ea-submenu"),l=this.querySelectorAll("ea-menu-item-group"),n=(a,h)=>{a.actived=!1};t.forEach((a,h)=>{a.itemIndex=h,a.addEventListener("item-selected",p=>{const O=p.detail.title;t.forEach(n),e.forEach(n),l.forEach(n),a.actived=!0,this.dispatchEvent(new CustomEvent("select",{detail:{index:h,title:O}}))})})},z=new WeakSet,J=function(){const t=this.querySelectorAll("ea-menu-item"),e=this.querySelectorAll("ea-submenu"),l=this.querySelectorAll("ea-menu-item-group"),n=(a,h)=>{a.backgroundColor=this.backgroundColor,a.textColor=this.textColor,a.activeTextColor=this.activeTextColor};t.forEach(n),e.forEach(n),l.forEach(n)},M=new WeakSet,K=function(){this.mode=this.mode,this.collapse=!0,this.backgroundColor=this.backgroundColor,this.textColor=this.textColor,this.activeTextColor=this.activeTextColor,u(this,P,F).call(this);let t=setTimeout(()=>{u(this,z,J).call(this),clearTimeout(t),t=null},20)};customElements.get("ea-menu")||customElements.define("ea-menu",et);export{et as EaMenu};
