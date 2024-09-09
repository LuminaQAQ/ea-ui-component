var u=(t,i,e)=>{if(!i.has(t))throw TypeError("Cannot "+e)};var a=(t,i,e)=>(u(t,i,"read from private field"),e?e.call(t):i.get(t)),n=(t,i,e)=>{if(i.has(t))throw TypeError("Cannot add the same private member more than once");i instanceof WeakSet?i.add(t):i.set(t,e)},c=(t,i,e,s)=>(u(t,i,"write to private field"),s?s.call(t,e):i.set(t,e),e);var d=(t,i,e)=>(u(t,i,"access private method"),e);import{B as _}from"./Base.LSgLRpFA.js";import{h as S}from"./handleDefaultAttrIsTrue.C-TnTdkH.js";const v=`
<svg class="skeleton-image" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 20h70v60H15z" stroke="#c0c4cc" stroke-width="5px" fill="none" />
    <circle r="8" cx="32" cy="35" fill="#c0c4cc" />
    <path d="M60 42.5L39 75h42z" fill="#c0c4cc" />
    <path d="M35 52.5L20 75h-4 32z" fill="#c0c4cc" />
</svg>
`,A=`
:host {
  --p-width: 100%;
  --margin-top: 1rem;
}

@keyframes skeleton-loading {
  0% {
    background-position: 100% 50%;
  }
}
.ea-skeleton-item_wrap {
  position: relative;
  background-color: #f2f2f2;
  border-radius: 4px;
}
.ea-skeleton-item_wrap.animated {
  background-image: linear-gradient(90deg, #f6f6f6 25%, #e8e8e8 37%, #f6f6f6 63%);
  background-size: 400% 100%;
  animation: skeleton-loading 1.4s ease infinite;
}

.ea-skeleton-item_wrap.ea-skeleton_p, .ea-skeleton-item_wrap.ea-skeleton_image, .ea-skeleton-item_wrap.ea-skeleton_text, .ea-skeleton-item_wrap.ea-skeleton_h1, .ea-skeleton-item_wrap.ea-skeleton_h2, .ea-skeleton-item_wrap.ea-skeleton_h3, .ea-skeleton-item_wrap.ea-skeleton_h4, .ea-skeleton-item_wrap.ea-skeleton_h5, .ea-skeleton-item_wrap.ea-skeleton_h6 {
  width: 100%;
}
.ea-skeleton-item_wrap.ea-skeleton_p {
  width: var(--p-width);
  height: 16px;
  margin-top: var(--margin-top);
}
.ea-skeleton-item_wrap.ea-skeleton_image {
  width: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0;
  height: 100%;
}
.ea-skeleton-item_wrap.ea-skeleton_image .skeleton-image {
  width: 30%;
  height: 30%;
}
.ea-skeleton-item_wrap.ea-skeleton_text {
  height: 13px;
  margin: 2px 0;
}
.ea-skeleton-item_wrap.ea-skeleton_h1 {
  height: 2rem;
  margin-block: 0.67rem;
}
.ea-skeleton-item_wrap.ea-skeleton_h2 {
  height: 1.5rem;
  margin-block: 0.83rem;
}
.ea-skeleton-item_wrap.ea-skeleton_h3 {
  height: 1.17rem;
  margin-block: 1rem;
}
.ea-skeleton-item_wrap.ea-skeleton_h4 {
  height: 1rem;
  margin-block: 1.33rem;
}
.ea-skeleton-item_wrap.ea-skeleton_h5 {
  height: 0.83rem;
  margin-block: 1.67rem;
}
.ea-skeleton-item_wrap.ea-skeleton_h6 {
  height: 0.67rem;
  margin-block: 2.33rem;
}
`;var o;class x extends _{constructor(){super();n(this,o,void 0);const e=this.attachShadow({mode:"open"});e.innerHTML=`
            <div class="ea-skeleton-item_wrap" part="container"></div>
        `,c(this,o,e.querySelector(".ea-skeleton-item_wrap")),this.build(e,A)}get variantOptions(){return["text","image","p","h1","h2","h3","h4","h5","h6"]}get elementStyle(){return this.getAttribute("style")}set elementStyle(e){e&&a(this,o).setAttribute("style",e)}get variant(){return this.getAttribute("variant")}set variant(e){this.variantOptions.includes(e)?this.setAttribute("variant",e):this.setAttribute("variant","text"),e==="image"&&(a(this,o).innerHTML=v),a(this,o).classList.add("ea-skeleton_"+this.variant)}get animated(){return this.getAttrBoolean("animated")}set animated(e){e&&(this.setAttribute("animated",e),a(this,o).classList.toggle("animated",e))}connectedCallback(){this.style.display="block",this.variant=this.variant,this.animated=this.animated}}o=new WeakMap;customElements.get("ea-skeleton-item")||customElements.define("ea-skeleton-item",x);const L=(t,i)=>{const e=document.createElement("ea-skeleton-item");return e.variant=t,e.animated=i,e},E=`
.ea-skeleton_wrap {
  width: 100%;
  position: relative;
  border-radius: 4px;
}
.ea-skeleton_wrap ea-skeleton-item[variant=p]:first-child {
  --p-width: 33%;
  --margin-top: 0;
}
.ea-skeleton_wrap ea-skeleton-item[variant=p]:last-child {
  --p-width: 61%;
}
`;var l,h,m,k,f,p,b,g,y;class M extends _{constructor(){super();n(this,k);n(this,p);n(this,g);n(this,l,void 0);n(this,h,void 0);n(this,m,void 0);const e=this.attachShadow({mode:"open"});e.innerHTML=`
            <div class="ea-skeleton_wrap" part="container">
                <slot></slot>
                <slot name="template"></slot>
            </div>
        `,c(this,l,e.querySelector(".ea-skeleton_wrap")),c(this,m,e.querySelector("slot")),c(this,h,e.querySelector('slot[name="template"]')),this.build(e,E)}get row(){return this.getAttrNumber("row")||4}set row(e){this.setAttribute("row",e)}get animated(){return this.getAttrBoolean("animated")}set animated(e){e&&this.setAttribute("animated",e)}get count(){return this.getAttrNumber("count")||1}set count(e){this.setAttribute("count",e)}get loading(){const e=this.getAttribute("loading");return S(e)}set loading(e){this.setAttribute("loading",e),a(this,h).style.display=e?"block":"none",a(this,m).style.display=e?"none":"block"}connectedCallback(){this.animated=this.animated,this.loading=this.loading,this.count=this.count,this.row=this.row,d(this,k,f).call(this,this.row),d(this,g,y).call(this,this.count),d(this,p,b).call(this,this.animated)}}l=new WeakMap,h=new WeakMap,m=new WeakMap,k=new WeakSet,f=function(e){if(e=Number(e)||4,a(this,m).assignedNodes(),a(this,h).assignedNodes(),!(this.children.length>0)){a(this,l).innerHTML="";for(let s=0;s<e;s++){const r=L("p",this.animated);a(this,l).appendChild(r)}}},p=new WeakSet,b=function(e){if(!e)return;this.querySelectorAll("ea-skeleton-item").forEach(r=>{r.animated=!0})},g=new WeakSet,y=function(e){if(this.children.length===0||e<1)return;const s=this.querySelector('[slot="template"]');let r="";for(let w=0;w<e;w++)r+=s.innerHTML;s.innerHTML=r};customElements.get("ea-skeleton")||customElements.define("ea-skeleton",M);export{M as EaSkeleton};
