var d=(e,o,t)=>{if(!o.has(e))throw TypeError("Cannot "+t)};var s=(e,o,t)=>(d(e,o,"read from private field"),t?t.call(e):o.get(e)),a=(e,o,t)=>{if(o.has(e))throw TypeError("Cannot add the same private member more than once");o instanceof WeakSet?o.add(e):o.set(e,t)},m=(e,o,t,r)=>(d(e,o,"write to private field"),r?r.call(e,t):o.set(e,t),t);var h=(e,o,t)=>(d(e,o,"access private method"),t);import{a as v}from"./createElement.BM9xfELw.js";import{B as x}from"./Base.CfZnvlaz.js";const g=`
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
`;var i,c,l,b,n,u;class w extends x{constructor(){super();a(this,l);a(this,n);a(this,i,void 0);a(this,c,void 0);const t=this.attachShadow({mode:"open"}),r=document.createElement("div");r.className="ea-menu-item_wrap",r.part="wrap";const p=v();r.appendChild(p),m(this,i,r),m(this,c,p),this.build(t,g),this.shadowRoot.appendChild(r)}get actived(){return this.getAttrBoolean("actived")}set actived(t){this.setAttribute("actived",t),this.isSubItem?s(this,i).classList.toggle("is-sub-actived",t):s(this,i).classList.toggle("is-actived",t)}get isSubItem(){return this.getAttrBoolean("is-sub-item")}set isSubItem(t){this.setAttribute("is-sub-item",t)}get backgroundColor(){return this.getAttribute("background-color")||"#fff"}set backgroundColor(t){this.setAttribute("background-color",t),s(this,i).style.setProperty("--normal-bgc",t)}get textColor(){return this.getAttribute("text-color")||"#303133"}set textColor(t){this.setAttribute("text-color",t),s(this,i).style.setProperty("--normal-text-color",t)}get activeTextColor(){return this.getAttribute("active-text-color")||"#409eff"}set activeTextColor(t){this.setAttribute("active-text-color",t),s(this,i).style.setProperty("--actived-text-color",t)}get disabled(){return this.getAttrBoolean("disabled")}set disabled(t){this.setAttribute("disabled",t),s(this,i).classList.toggle("is-disabled",t)}connectedCallback(){h(this,n,u).call(this)}}i=new WeakMap,c=new WeakMap,l=new WeakSet,b=function(){s(this,i).addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("item-selected",{detail:{index:this.index,title:this.textContent}}))})},n=new WeakSet,u=function(){this.actived=this.actived,this.disabled=this.disabled,h(this,l,b).call(this)};customElements.get("ea-menu-item")||customElements.define("ea-menu-item",w);export{w as EaMenuItem};
