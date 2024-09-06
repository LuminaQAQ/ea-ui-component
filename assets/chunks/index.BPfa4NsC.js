var m=(i,t,e)=>{if(!t.has(i))throw TypeError("Cannot "+e)};var r=(i,t,e)=>(m(i,t,"read from private field"),e?e.call(i):t.get(i)),h=(i,t,e)=>{if(t.has(i))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(i):t.set(i,e)},p=(i,t,e,s)=>(m(i,t,"write to private field"),s?s.call(i,e):t.set(i,e),e);var u=(i,t,e)=>(m(i,t,"access private method"),e);import{B as y}from"./Base.LSgLRpFA.js";import{c as g}from"./createElement.Dy1aXqlz.js";const b=`
    <svg id="errorImage" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path fill="#c0c4cc" d="M0 0h100v100H0z" />
        <path fill="#fff" d="M15 20h70v60H15z" />
        <circle r="8" cx="32" cy="35" fill="#c0c4cc" />
        <path d="M60 42.5L39 75h42z" fill="#c0c4cc" />
        <path d="M35 52.5L20 75h-4 32z" fill="#c0c4cc" />
    </svg>
`,z=`
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
`;function x(i){i.classList.remove("entry"),i.addEventListener("transitionend",()=>{i.remove(),document.body.style.overflow="auto"})}function _(i){const t=g("span","ea-icon-close");return t.innerText="x",t.addEventListener("click",()=>{x(i)}),t}function L(i,t){let e=0,s=0;function c(o){const{clientX:v,clientY:f}=o;t.style.marginLeft=`${v-e}px`,t.style.marginTop=`${f-s}px`}t.addEventListener("dragstart",o=>{o.preventDefault()}),t.addEventListener("mousedown",o=>{e=o.clientX,s=o.clientY,t.addEventListener("mousemove",c),t.addEventListener("mouseup",()=>{t.removeEventListener("mousemove",c)})})}function E(i){const t=g("div","ea-image_preview-tools");return t.innerHTML=`
        <span class="ea-icon-zoom ea-icon-zoom-in">+</span>
        <span class="ea-icon-zoom ea-icon-zoom-out">-</span>
        <span class="ea-icon-rotate ea-icon-rotate-left">↺</span>
        <span class="ea-icon-rotate ea-icon-rotate-right">↻</span>
    `,t.querySelector(".ea-icon-zoom-in").addEventListener("click",()=>{i.style.scale=i.style.scale?Number(i.style.scale)+.2:1.2}),t.querySelector(".ea-icon-zoom-out").addEventListener("click",()=>{i.style.scale=i.style.scale?Number(i.style.scale)-.2:.8}),t.querySelector(".ea-icon-rotate-left").addEventListener("click",()=>{i.style.rotate=(i.style.rotate?Number(i.style.rotate.split("deg")[0])-90:-90)+"deg"}),t.querySelector(".ea-icon-rotate-right").addEventListener("click",()=>{i.style.rotate=(i.style.rotate?Number(i.style.rotate.split("deg")[0])+90:90)+"deg"}),t}function A(i,t,e){e&&t.addEventListener("click",()=>{t=t.cloneNode(!0),t.style.objectFit="contain";const s=g("div","ea-image_preview-wrap",[t]);i.appendChild(s);const c=_(s);s.appendChild(c);const o=E(t);s.appendChild(o),setTimeout(()=>{s.classList.add("entry")},20),L(s,t),document.body.style.overflow="hidden"})}var a,n,l,d,w;class B extends y{constructor(){super();h(this,d);h(this,a,void 0);h(this,n,void 0);h(this,l,void 0);const e=this.attachShadow({mode:"open"});e.innerHTML=`
            <div class='ea-image_wrap' part='container'>
                <img part='image' class='ea-image' />
                <slot name='placeholder'></slot>
            </div>
        `,p(this,a,e.querySelector(".ea-image_wrap")),p(this,n,e.querySelector(".ea-image")),p(this,l,e.querySelector('slot[name="placeholder"]')),this.build(e,z)}get src(){return this.getAttribute("src")||""}set src(e){this.setAttribute("src",e)}get width(){return this.getAttribute("width")||"100px"}set width(e){this.setAttribute("width",e),r(this,a).style.width=e}get height(){return this.getAttribute("height")||"100px"}set height(e){this.setAttribute("height",e),r(this,a).style.height=e}get alt(){return this.getAttribute("alt")||""}set alt(e){this.setAttribute("alt",e),r(this,n).alt=e}get fit(){return this.getAttribute("fit")||"cover"}set fit(e){this.setAttribute("fit",e),r(this,n).style.objectFit=e}get lazy(){return this.getAttrBoolean("lazy")}set lazy(e){this.setAttribute("lazy",e)}get preview(){return this.getAttrBoolean("preview")}set preview(e){this.setAttribute("preview",e)}connectedCallback(){this.width=this.width,this.height=this.height,this.fit=this.fit,this.alt=this.alt,this.lazy=this.lazy,this.src=this.src,this.preview=this.preview,A(r(this,a),r(this,n),this.preview),u(this,d,w).call(this)}}a=new WeakMap,n=new WeakMap,l=new WeakMap,d=new WeakSet,w=function(){const e=new Image;if(this.lazy){const s=new IntersectionObserver(c=>{c[0].intersectionRatio<=0||(e.src=this.src,s.disconnect())});s.observe(r(this,a))}else e.src=this.src;e.onload=()=>{r(this,n).setAttribute("src",this.src),r(this,l).remove(),this.dispatchEvent(new CustomEvent("load",{detail:{src:this.src}}))},e.onerror=()=>{r(this,a).innerHTML=b,r(this,a).classList.add("is-error"),r(this,l).remove(),this.dispatchEvent(new CustomEvent("error",{detail:{src:this.src}}))}};customElements.get("ea-image")||customElements.define("ea-image",B);export{B as EaImage};
