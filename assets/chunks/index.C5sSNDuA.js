var f=(o,r,t)=>{if(!r.has(o))throw TypeError("Cannot "+t)};var e=(o,r,t)=>(f(o,r,"read from private field"),t?t.call(o):r.get(o)),c=(o,r,t)=>{if(r.has(o))throw TypeError("Cannot add the same private member more than once");r instanceof WeakSet?r.add(o):r.set(o,t)},l=(o,r,t,s)=>(f(o,r,"write to private field"),s?s.call(o,t):r.set(o,t),t);import{B as v}from"./Base.LSgLRpFA.js";import"./index.ChwP6VyU.js";import{t as _}from"./timeout.CMJ_lqqj.js";const w=o=>{o.actived=!1};function A(o,r,t){o.forEach(w),r.forEach(w),t.forEach(w)}function y(o,r,t){o.forEach((s,d)=>{s.itemIndex=d,s.addEventListener("item-selected",u=>{const h=u.detail.title;A(o,r,t),s.actived=!0,this.dispatchEvent(new CustomEvent("select",{detail:{index:d,title:h}}))})})}const C=`
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
`,k=`
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
  color: var(--actived-text-color);
}
.ea-menu-item_wrap.is-sub-actived {
  color: var(--actived-text-color);
}
.ea-menu-item_wrap.is-sub-actived ::slotted(a) {
  color: var(--actived-text-color);
}
.ea-menu-item_wrap.is-disabled {
  color: #c0c4cc;
  pointer-events: none;
  cursor: not-allowed;
}
.ea-menu-item_wrap.is-disabled ::slotted(a) {
  color: #c0c4cc;
}
.ea-menu-item_wrap ::slotted(a) {
  color: var(--normal-text-color);
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
`;var i;class E extends v{constructor(){super();c(this,i,void 0);const t=this.attachShadow({mode:"open"});t.innerHTML=`
            <div class="ea-menu-item_wrap" part="container">
                <slot></slot>
            </div>
        `,l(this,i,t.querySelector(".ea-menu-item_wrap")),this.build(t,k)}get actived(){return this.getAttrBoolean("actived")}set actived(t){this.setAttribute("actived",t),this.isSubItem?e(this,i).classList.toggle("is-sub-actived",t):e(this,i).classList.toggle("is-actived",t)}get isSubItem(){return this.getAttrBoolean("is-sub-item")}set isSubItem(t){t&&this.setAttribute("is-sub-item",t)}get backgroundColor(){return this.getAttribute("background-color")||"#fff"}set backgroundColor(t){this.setAttribute("background-color",t),e(this,i).style.setProperty("--normal-bgc",t)}get textColor(){return this.getAttribute("text-color")||"#303133"}set textColor(t){this.setAttribute("text-color",t),e(this,i).style.setProperty("--normal-text-color",t)}get activeTextColor(){return this.getAttribute("active-text-color")||"#409eff"}set activeTextColor(t){this.setAttribute("active-text-color",t),e(this,i).style.setProperty("--actived-text-color",t)}get disabled(){return this.getAttrBoolean("disabled")}set disabled(t){this.setAttribute("disabled",t),e(this,i).classList.toggle("is-disabled",t)}connectedCallback(){this.actived=this.actived,this.disabled=this.disabled,e(this,i).addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("item-selected",{detail:{index:this.index,title:this.textContent}}))})}}i=new WeakMap;customElements.get("ea-menu-item")||customElements.define("ea-menu-item",E);const S=`
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
`;var a,x,b;class L extends v{constructor(){super();c(this,a,void 0);c(this,x,void 0);c(this,b,void 0);const t=this.attachShadow({mode:"open"});t.innerHTML=`
            <div class="ea-submenu_wrap" part="container">
                <div class="ea-submenu_title_wrap" part="title-wrap">
                    <slot name="title"></slot>
                    <ea-icon class="ea-submenu_dropdown_icon" icon="icon-angle-down" part="dropdown-icon"></ea-icon>
                </div>
                <div class="ea-submenu_items_wrap" part="dropdown-wrap">
                    <slot></slot>
                </div>
            </div>
        `,l(this,a,t.querySelector(".ea-submenu_wrap")),l(this,x,t.querySelector(".ea-submenu_title_wrap")),l(this,b,t.querySelector(".ea-submenu_items_wrap")),this.build(t,S)}get actived(){return this.getAttrBoolean("actived")}set actived(t){this.setAttribute("actived",t),e(this,a).classList.toggle("is-actived",t)}get backgroundColor(){return this.getAttribute("background-color")||"#fff"}set backgroundColor(t){this.setAttribute("background-color",t),e(this,a).style.setProperty("--normal-bgc",t)}get textColor(){return this.getAttribute("text-color")||"#303133"}set textColor(t){this.setAttribute("text-color",t),e(this,a).style.setProperty("--normal-text-color",t)}get activeTextColor(){return this.getAttribute("active-text-color")||"#409eff"}set activeTextColor(t){this.setAttribute("active-text-color",t),e(this,a).style.setProperty("--actived-text-color",t)}get disabled(){return this.getAttrBoolean("disabled")}set disabled(t){this.setAttribute("disabled",t),e(this,a).classList.toggle("is-disabled",t)}get mode(){return this.getAttribute("mode")||"horizontal"}set mode(t){this.setAttribute("mode",t),e(this,a).classList.toggle("is-vertical",t==="vertical")}connectedCallback(){this.disabled=this.disabled,this.querySelectorAll("ea-menu-item").forEach((s,d)=>{s.isSubItem=!0,s.addEventListener("item-selected",u=>{this.actived=!0})}),_(()=>{e(this,b).style.display="block"},20)}}a=new WeakMap,x=new WeakMap,b=new WeakMap;customElements.get("ea-submenu")||customElements.define("ea-submenu",L);const T=`
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
.ea-menu-item-group_wrap .ea-submenu_dropdown_icon {
  transform: rotate(-90deg);
  transition: transform 0.3s;
}
.ea-menu-item-group_wrap.is-open .ea-submenu_dropdown_icon {
  transform: rotate(0deg);
}
`;var n,g,m;class q extends v{constructor(){super();c(this,n,void 0);c(this,g,void 0);c(this,m,void 0);const t=this.attachShadow({mode:"open"});t.innerHTML=`
            <div class="ea-menu-item-group_wrap" part="container">
                <div class="ea-submenu_title_wrap" part="title-wrap">
                    <slot name="title"></slot>
                    <ea-icon class="ea-submenu_dropdown_icon" icon="icon-angle-down" part="dropdown-icon"></ea-icon>
                </div>
                <div class="ea-submenu_items_wrap" part="dropdown-wrap">
                    <slot></slot>
                </div>
            </div>
        `,l(this,n,t.querySelector(".ea-menu-item-group_wrap")),l(this,g,t.querySelector(".ea-submenu_title_wrap")),l(this,m,t.querySelector(".ea-submenu_items_wrap")),this.build(t,T)}get actived(){return this.getAttrBoolean("actived")}set actived(t){this.setAttribute("actived",t),e(this,n).classList.toggle("is-actived",t)}get backgroundColor(){return this.getAttribute("background-color")||"#fff"}set backgroundColor(t){this.setAttribute("background-color",t),e(this,n).style.setProperty("--normal-bgc",t)}get textColor(){return this.getAttribute("text-color")||"#303133"}set textColor(t){this.setAttribute("text-color",t),e(this,n).style.setProperty("--normal-text-color",t)}get activeTextColor(){return this.getAttribute("active-text-color")||"#409eff"}set activeTextColor(t){this.setAttribute("active-text-color",t),e(this,n).style.setProperty("--actived-text-color",t)}get collapse(){return this.getAttrBoolean("collapse")||!1}set collapse(t){this.setAttribute("collapse",t),e(this,m).style.height=t?e(this,m).scrollHeight+"px":"0",e(this,n).classList.toggle("is-open",t)}connectedCallback(){this.style.width="100%",this.querySelectorAll("ea-menu-item").forEach(s=>{s.isSubItem=!0,s.addEventListener("item-selected",d=>{_(()=>{this.actived=!0},20)})}),e(this,g).addEventListener("click",s=>{this.collapse=!this.collapse})}}n=new WeakMap,g=new WeakMap,m=new WeakMap;customElements.get("ea-menu-item-group")||customElements.define("ea-menu-item-group",q);var p;class I extends v{constructor(){super();c(this,p,void 0);const t=this.attachShadow({mode:"open"});t.innerHTML=`
            <div class="ea-menu_wrap" part="container">
                <slot></slot>
            </div>
        `,l(this,p,t.querySelector(".ea-menu_wrap")),this.build(t,C)}get mode(){return this.getAttribute("mode")||"vertical"}set mode(t){this.setAttribute("mode",t),e(this,p).classList.toggle("is-vertical",t==="vertical"),this.querySelectorAll("ea-submenu").forEach(s=>{s.mode=t})}get backgroundColor(){return this.getAttribute("background-color")||"#fff"}set backgroundColor(t){this.setAttribute("background-color",t),e(this,p).style.backgroundColor=t}get textColor(){return this.getAttribute("text-color")||"#303133"}set textColor(t){this.setAttribute("text-color",t)}get activeTextColor(){return this.getAttribute("active-text-color")||"#409eff"}set activeTextColor(t){this.setAttribute("active-text-color",t)}get collapse(){return this.getAttrBoolean("collapse")}set collapse(t){this.toggleAttr("collapse",t),this.querySelectorAll("ea-menu-item-group").forEach(s=>{this.mode==="vertical"&&(s.collapse=!t)})}connectedCallback(){this.mode=this.mode,this.collapse=!0,this.backgroundColor=this.backgroundColor,this.textColor=this.textColor,this.activeTextColor=this.activeTextColor;const t=this.querySelectorAll("ea-menu-item"),s=this.querySelectorAll("ea-submenu"),d=this.querySelectorAll("ea-menu-item-group");y.call(this,t,s,d);const u=(h,B)=>{h.backgroundColor=this.backgroundColor,h.textColor=this.textColor,h.activeTextColor=this.activeTextColor};t.forEach(u),s.forEach(u),d.forEach(u)}}p=new WeakMap;customElements.get("ea-menu")||customElements.define("ea-menu",I);export{I as EaMenu};
