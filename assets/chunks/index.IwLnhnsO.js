var b=(e,i,t)=>{if(!i.has(e))throw TypeError("Cannot "+t)};var o=(e,i,t)=>(b(e,i,"read from private field"),t?t.call(e):i.get(e)),n=(e,i,t)=>{if(i.has(e))throw TypeError("Cannot add the same private member more than once");i instanceof WeakSet?i.add(e):i.set(e,t)},r=(e,i,t,l)=>(b(e,i,"write to private field"),l?l.call(e,t):i.set(e,t),t);var f=(e,i,t)=>(b(e,i,"access private method"),t);import{t as w}from"./timeout.CMJ_lqqj.js";import{B as _}from"./Base.LSgLRpFA.js";const E=`
.ea-collapse-item_wrap .ea-collapse-item_title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ebeef5;
  height: 48px;
  line-height: 48px;
  font-size: 13px;
  font-weight: 700;
  color: #303133;
  cursor: pointer;
}
.ea-collapse-item_wrap .ea-collapse-item_title .ea-collapse-item_title-icon {
  width: 0.35rem;
  height: 0.35rem;
  margin-right: 1rem;
  border: 3px solid #9ca0a5;
  border-left-color: transparent;
  border-top-color: transparent;
  rotate: -45deg;
  transition: rotate 0.3s;
}
.ea-collapse-item_wrap .ea-collapse-item_content {
  will-change: height;
  overflow: hidden;
  height: 0;
  padding-bottom: 0;
  transition: height 0.3s, padding-bottom 0.3s;
  font-size: 13px;
  color: #303133;
}
`;var g,p,h,c,a;class A extends _{constructor(){super();n(this,g,void 0);n(this,p,void 0);n(this,h,void 0);n(this,c,void 0);n(this,a,void 0);const t=this.attachShadow({mode:"open"});t.innerHTML=`
            <div class="ea-collapse-item_wrap" part="container">
                <div class="ea-collapse-item_title" part="title-wrap">
                    <span class="ea-collapse-item_title-content" part="title-content"></span>
                    <span class="ea-collapse-item_title-icon" part="title-icon"></span>
                </div>
                <div class="ea-collapse-item_content" part="content-wrap">
                    <slot></slot>
                </div>
            </div>
        `,r(this,g,t.querySelector(".ea-collapse-item_wrap")),r(this,p,t.querySelector(".ea-collapse-item_title")),r(this,h,t.querySelector(".ea-collapse-item_title-content")),r(this,c,t.querySelector(".ea-collapse-item_title-icon")),r(this,a,t.querySelector(".ea-collapse-item_content")),this.build(t,E)}get title(){return this.getAttribute("title")}set title(t){this.setAttribute("title",t),o(this,h).innerHTML=t}get name(){return this.getAttribute("name")}set name(t){this.setAttribute("name",t)}get isOpen(){return this.getAttrBoolean("is-open")||!1}set isOpen(t){if(t===this.isOpen)return;this.toggleAttr("is-open",t);const l=o(this,a).scrollHeight;this.isOpen?(o(this,a).style.height=`${l}px`,o(this,a).style.paddingBottom="20px",o(this,c).style.rotate="45deg"):(o(this,a).style.height="0px",o(this,a).style.paddingBottom="0px",o(this,c).style.rotate="-45deg")}connectedCallback(){this.title=this.title,this.name=this.name,o(this,p).addEventListener("click",t=>{this.dispatchEvent(new CustomEvent("change",{detail:{name:this.name,isOpen:this.isOpen},bubbles:!0,composed:!0}))})}}g=new WeakMap,p=new WeakMap,h=new WeakMap,c=new WeakMap,a=new WeakMap;customElements.get("ea-collapse-item")||customElements.define("ea-collapse-item",A);var d,v;class O extends _{constructor(){super();n(this,d);const t=this.attachShadow({mode:"open"});t.innerHTML=`
            <div class="ea-collapse_wrap" part="container">
                <slot></slot>
            </div>
        `}get active(){return this.getAttribute("active")||1}set active(t){this.setAttribute("active",t),w(()=>{f(this,d,v).call(this,this.accordion,t)},20)}get accordion(){return this.getAttrBoolean("accordion")||!1}set accordion(t){this.setAttribute("accordion",t),w(()=>{f(this,d,v).call(this,t,this.active)},20)}connectedCallback(){this.accordion=this.accordion,this.active=this.active}}d=new WeakSet,v=function(t,l){const m=Array.from(this.querySelectorAll("ea-collapse-item"));let u=t?"":[];m.forEach(s=>{s.addEventListener("change",y=>{t&&m.forEach(x=>{x.isOpen=!1}),s.isOpen=!y.detail.isOpen})}),t?(u=l.toString().trim()[0],m.forEach(s=>{s.isOpen=s.name===u})):(u=l.split(",").map(s=>s.trim()).concat(),m.forEach(s=>{s.isOpen=u.includes(s.name)}))};customElements.get("ea-collapse")||customElements.define("ea-collapse",O);export{O as EaCollapse};
