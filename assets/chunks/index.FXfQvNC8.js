var _=(a,s,e)=>{if(!s.has(a))throw TypeError("Cannot "+e)};var o=(a,s,e)=>(_(a,s,"read from private field"),e?e.call(a):s.get(a)),n=(a,s,e)=>{if(s.has(a))throw TypeError("Cannot add the same private member more than once");s instanceof WeakSet?s.add(a):s.set(a,e)},w=(a,s,e,t)=>(_(a,s,"write to private field"),t?t.call(a,e):s.set(a,e),e);var m=(a,s,e)=>(_(a,s,"access private method"),e);import{B as I}from"./Base.yCeCPjNm.js";import{a as j,c as d}from"./createElement.BM9xfELw.js";const N=`
@import url('/ea_ui_component/icon/index.css');

.ea-image_wrap.is-loading, .ea-image_wrap.is-error {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f7fa;
}
.ea-image_wrap.is-error svg {
  width: 20px;
  height: 20px;
}
.ea-image_wrap img {
  position: relative;
  width: 100%;
  height: 100%;
  user-zoom: scale;
  object-fit: cover;
  transition: rotate 0.3s, scale 0.3s;
}
.ea-image_wrap .ea-image_preview-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  opacity: 0;
  transform: translateY(-1rem);
  transition: opacity 0.3s, transform 0.3s;
  background-color: rgba(0, 0, 0, 0.4);
}
.ea-image_wrap .ea-image_preview-wrap.entry {
  opacity: 1;
  transform: translateY(0);
}
.ea-image_wrap .ea-image_preview-wrap .ea-icon-close {
  position: absolute;
  right: 40px;
  top: 40px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  font-size: 24px;
  line-height: 36px;
  border-radius: 50%;
  color: #fff;
  background-color: #606266;
  text-align: center;
}
.ea-image_wrap .ea-image_preview-wrap img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.ea-image_wrap .ea-image_preview-tools {
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: absolute;
  bottom: 20px;
  left: 50%;
  padding: 0.5rem 1rem;
  user-select: none;
  border-radius: 999px;
  transform: translateX(-50%);
  background-color: rgba(96, 98, 102, 0.568627451);
  color: #fff;
}
.ea-image_wrap .ea-image_preview-tools .ea-icon-zoom,
.ea-image_wrap .ea-image_preview-tools .ea-icon-rotate {
  width: 2rem;
  text-align: center;
  cursor: pointer;
  margin: 0 1rem;
}
.ea-image_wrap .ea-image_preview-tools .ea-icon-zoom {
  font-size: 2rem;
}
.ea-image_wrap .ea-image_preview-tools .ea-icon-zoom-in {
  font-size: 1.75rem;
}
.ea-image_wrap .ea-image_preview-tools .ea-icon-rotate {
  font-size: 1.5rem;
}
`,H=`
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path fill="#c0c4cc" d="M0 0h100v100H0z" />
        <path fill="#fff" d="M15 20h70v60H15z" />
        <circle r="8" cx="32" cy="35" fill="#c0c4cc" />
        <path d="M60 42.5L39 75h42z" fill="#c0c4cc" />
        <path d="M35 52.5L20 75h-4 32z" fill="#c0c4cc" />
    </svg>
`;var l,h,g,z,u,L,v,E,f,A,y,k,b,T,x,B;class Y extends I{constructor(){super();n(this,u);n(this,v);n(this,f);n(this,y);n(this,b);n(this,x);n(this,l,void 0);n(this,h,void 0);n(this,g,void 0);n(this,z,void 0);const e=this.attachShadow({mode:"open"}),t=document.createElement("div");t.className="ea-image_wrap";const i=j("placeholder"),r=d("img","ea-image",[i]);t.appendChild(r),w(this,l,t),w(this,h,r),w(this,g,i),this.build(e,N),this.shadowRoot.appendChild(t)}get src(){return this.getAttribute("src")||""}set src(e){this.setAttribute("src",e)}get width(){return this.getAttribute("width")||"100px"}set width(e){this.setAttribute("width",e),o(this,l).style.width=e}get height(){return this.getAttribute("height")||"100px"}set height(e){this.setAttribute("height",e),o(this,l).style.height=e}get alt(){return this.getAttribute("alt")||""}set alt(e){this.setAttribute("alt",e),o(this,h).alt=e}get fit(){return this.getAttribute("fit")||"cover"}set fit(e){this.setAttribute("fit",e),o(this,h).style.objectFit=e}get lazy(){return this.getAttrBoolean("lazy")}set lazy(e){this.setAttribute("lazy",e)}get preview(){return this.getAttrBoolean("preview")}set preview(e){this.setAttribute("preview",e)}init(){this.width=this.width,this.height=this.height,this.fit=this.fit,this.alt=this.alt,this.lazy=this.lazy,this.src=this.src,this.preview=this.preview,m(this,u,L).call(this,this.src,this.lazy),m(this,x,B).call(this,this.preview)}connectedCallback(){this.init()}}l=new WeakMap,h=new WeakMap,g=new WeakMap,z=new WeakMap,u=new WeakSet,L=function(e,t=!1){const i=new Image;if(t){const r=new IntersectionObserver(c=>{c[0].intersectionRatio<=0||(i.src=e,r.disconnect())});r.observe(o(this,l))}else i.src=e;i.onload=()=>{o(this,h).setAttribute("src",e),o(this,g).innerHTML="",this.dispatchEvent(new CustomEvent("load",{detail:{src:e}}))},i.onerror=()=>{o(this,l).innerHTML=H,o(this,l).classList.add("is-error"),o(this,g).innerHTML="",this.dispatchEvent(new CustomEvent("error",{detail:{src:e}}))}},v=new WeakSet,E=function(e){e.classList.remove("entry"),e.addEventListener("transitionend",()=>{e.remove(),document.body.style.overflow="auto"})},f=new WeakSet,A=function(e){const t=d("span","ea-icon-close");return t.innerText="x",t.addEventListener("click",()=>{m(this,v,E).call(this,e)}),t},y=new WeakSet,k=function(e){const t=d("span","ea-icon-zoom ea-icon-zoom-in");t.innerText="+",t.addEventListener("click",()=>{e.style.scale=e.style.scale?Number(e.style.scale)+.2:1.2});const i=d("span","ea-icon-zoom ea-icon-zoom-out");i.innerText="-",i.addEventListener("click",()=>{e.style.scale=e.style.scale?Number(e.style.scale)-.2:.8});const r=d("span","ea-icon-rotate ea-icon-rotate-left");r.innerText="↺",r.addEventListener("click",()=>{e.style.rotate=(e.style.rotate?Number(e.style.rotate.split("deg")[0])-90:-90)+"deg"});const c=d("span","ea-icon-rotate ea-icon-rotate-right");return c.innerText="↻",c.addEventListener("click",()=>{e.style.rotate=(e.style.rotate?Number(e.style.rotate.split("deg")[0])+90:90)+"deg"}),d("div","ea-image_preview-tools",[t,i,r,c])},b=new WeakSet,T=function(e,t){let i=0,r=0;function c(p){const{clientX:C,clientY:M}=p;t.style.marginLeft=`${C-i}px`,t.style.marginTop=`${M-r}px`}t.addEventListener("dragstart",p=>{p.preventDefault()}),t.addEventListener("mousedown",p=>{i=p.clientX,r=p.clientY,t.addEventListener("mousemove",c),t.addEventListener("mouseup",()=>{t.removeEventListener("mousemove",c)})})},x=new WeakSet,B=function(e){e&&o(this,h).addEventListener("click",()=>{const t=o(this,h).cloneNode(!0);t.style.objectFit="contain";const i=d("div","ea-image_preview-wrap",[t]);o(this,l).appendChild(i);const r=m(this,f,A).call(this,i);i.appendChild(r);const c=m(this,y,k).call(this,t,i);i.appendChild(c),setTimeout(()=>{i.classList.add("entry")},20),m(this,b,T).call(this,i,t),document.body.style.overflow="hidden"})};customElements.get("ea-image")||customElements.define("ea-image",Y);export{Y as EaImage};
