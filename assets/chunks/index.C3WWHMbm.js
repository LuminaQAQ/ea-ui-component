var _=(r,t,e)=>{if(!t.has(r))throw TypeError("Cannot "+e)};var o=(r,t,e)=>(_(r,t,"read from private field"),e?e.call(r):t.get(r)),c=(r,t,e)=>{if(t.has(r))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(r):t.set(r,e)},m=(r,t,e,a)=>(_(r,t,"write to private field"),a?a.call(r,e):t.set(r,e),e);var u=(r,t,e)=>(_(r,t,"access private method"),e);import{B as x}from"./Base.LSgLRpFA.js";import{c as b}from"./createElement.Dy1aXqlz.js";const k=`
:host {
  --odd-bgc: #99a9bf;
}

.ea-carousel-item_wrap {
  display: inline-block;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  background-color: var(--odd-bgc);
  display: flex;
  align-items: center;
  justify-content: center;
}
.ea-carousel-item_wrap ::slotted(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
`;class I extends x{constructor(){super();const t=this.attachShadow({mode:"open"});t.innerHTML=`
            <div class='ea-carousel-item_wrap' part='container'>
                <slot></slot>
            </div>
        `,this.build(t,k)}}customElements.get("ea-carousel-item")||customElements.define("ea-carousel-item",I);function S(r,t){return t<0?t=r:t>r&&(t=0),t}const C=`
.ea-carousel_wrap {
  position: relative;
  overflow: hidden;
}
.ea-carousel_wrap .ea-carousel_content-container {
  position: relative;
  display: flex;
  color: #fff;
  text-align: center;
  height: 300px;
  transition: transform 0.5s;
}
.ea-carousel_wrap .ea-carousel_content-container ::slotted(ea-carousel-item) {
  flex: 0 0 100%;
  width: 100%;
}
.ea-carousel_wrap .ea-carousel-item_arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;
  width: 1.5rem;
  height: 1.5rem;
  line-height: 1.5;
  font-weight: 800;
  text-align: center;
  border-radius: 50%;
  background-color: rgba(31, 45, 61, 0.11);
  color: #fff;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s, transform 0.3s, opacity 0.3s;
}
.ea-carousel_wrap .ea-carousel-item_arrow.ea-carousel-item_arrow--left {
  left: 0;
  transform: translate(-100%, -50%);
}
.ea-carousel_wrap .ea-carousel-item_arrow.ea-carousel-item_arrow--right {
  right: 0;
  transform: translate(100%, -50%);
}
.ea-carousel_wrap .ea-carousel-item_arrow:hover {
  background-color: rgba(31, 45, 61, 0.3);
}
.ea-carousel_wrap .ea-carousel-indicator_wrap {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
}
.ea-carousel_wrap .ea-carousel-indicator_wrap .ea-carousel-item_indicator {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.4);
  margin: 0.25rem;
  transition: background-color 0.3s;
}
.ea-carousel_wrap .ea-carousel-indicator_wrap .ea-carousel-item_indicator.ea-carousel-item_indicator--active {
  background-color: #fff;
}
.ea-carousel_wrap ::slotted(ea-carousel-item:nth-child(odd)) {
  --odd-bgc: #d3dce6;
}
.ea-carousel_wrap.hover-trigger:hover .ea-carousel-item_arrow.ea-carousel-item_arrow--left {
  left: 0;
  transform: translate(50%, -50%);
  opacity: 1;
}
.ea-carousel_wrap.hover-trigger:hover .ea-carousel-item_arrow.ea-carousel-item_arrow--right {
  right: 0;
  transform: translate(-50%, -50%);
  opacity: 1;
}
.ea-carousel_wrap.always-show-arrow .ea-carousel-item_arrow.ea-carousel-item_arrow--left {
  left: 0;
  transform: translate(50%, -50%);
  opacity: 1;
}
.ea-carousel_wrap.always-show-arrow .ea-carousel-item_arrow.ea-carousel-item_arrow--right {
  right: 0;
  transform: translate(-50%, -50%);
  opacity: 1;
}
.ea-carousel_wrap.ea-carousel--horizontal .ea-carousel_content-container {
  flex-direction: row;
}
.ea-carousel_wrap.ea-carousel--vertical .ea-carousel_content-container {
  flex-direction: column;
}
.ea-carousel_wrap.ea-carousel--vertical .ea-carousel-item_arrow {
  display: none;
}
.ea-carousel_wrap.ea-carousel--vertical .ea-carousel-indicator_wrap {
  left: 100%;
  bottom: 50%;
  flex-direction: column;
  transform: translate(-200%, 50%);
}
`;var s,l,d,w,y,g,A,h,v;class q extends x{constructor(){super();c(this,w);c(this,g);c(this,h);c(this,s,void 0);c(this,l,void 0);c(this,d,void 0);const e=this.attachShadow({mode:"open"});e.innerHTML=`
            <div class='ea-carousel_wrap' part='container'>
                <div class='ea-carousel_content-container' part='content-wrap'>
                    <slot></slot>
                </div>
                <div class='ea-carousel-indicator_wrap' part='indicator-wrap'></div>
            </div>
        `,m(this,s,e.querySelector(".ea-carousel_wrap")),m(this,l,e.querySelector(".ea-carousel_content-container")),m(this,d,e.querySelector(".ea-carousel-indicator_wrap")),this.build(e,C)}get direction(){const e=this.getAttribute("direction");return["horizontal","vertical"].includes(e)?e:"horizontal"}set direction(e){this.setAttribute("direction",e),o(this,s).classList.add(`ea-carousel--${e}`)}get index(){return this.getAttrNumber("index")||0}set index(e){const a=this.querySelectorAll("ea-carousel-item").length-1,i=S(a,e);this.setAttribute("index",i);const n=o(this,s).getBoundingClientRect(),p=this.direction==="horizontal"?"X":"Y",L=this.direction==="horizontal"?n.width:n.height;o(this,l).style.transform=`translate${p}(-${i*L}px)`;try{const f=o(this,d).querySelectorAll(".ea-carousel-item_indicator");f.forEach(E=>{E.classList.remove("ea-carousel-item_indicator--active")}),f[i].classList.add("ea-carousel-item_indicator--active")}catch{}}get trigger(){const e=this.getAttribute("trigger")||"hover";return["click","hover"].includes(e)?e:"click"}set trigger(e){this.setAttribute("trigger",e)}get interval(){return this.getAttrNumber("interval")||3}set interval(e){this.setAttribute("interval",e)}get arrow(){const e=this.getAttribute("arrow")||"hover";return["always","hover","never"].includes(e)?e:"hover"}set arrow(e){this.setAttribute("arrow",e)}connectedCallback(){if(this.direction=this.direction,this.trigger=this.trigger,this.interval=this.interval,this.arrow=this.arrow,this.index=this.index,u(this,w,y).call(this),u(this,g,A).call(this),this.arrow!=="never"||this.direction!=="vertical"){const e=u(this,h,v).call(this,"left"),a=u(this,h,v).call(this,"right");o(this,s).appendChild(e),o(this,s).appendChild(a)}window.addEventListener("resize",()=>{this.index=this.index})}}s=new WeakMap,l=new WeakMap,d=new WeakMap,w=new WeakSet,y=function(){const e=this.querySelectorAll("ea-carousel-item").length;for(let i=0;i<e;i++){const n=b("div","ea-carousel-item_indicator");n.part="indicator",o(this,d).appendChild(n)}const a=o(this,d).querySelectorAll(".ea-carousel-item_indicator");a[0].classList.add("ea-carousel-item_indicator--active"),a.forEach((i,n)=>{i.addEventListener(this.trigger==="click"?"click":"mouseenter",()=>{this.index=n,a.forEach(p=>{p.classList.remove("ea-carousel-item_active")}),i.classList.add("ea-carousel-item_active")})})},g=new WeakSet,A=function(){let e=setInterval(()=>{this.index=this.index+1},this.interval*1e3);this.addEventListener("mouseenter",()=>{clearInterval(e),e=null}),this.addEventListener("mouseleave",()=>{e=setInterval(()=>{this.index=this.index+1},this.interval*1e3)})},h=new WeakSet,v=function(e){let a=!1;const i=b("div",`ea-carousel-item_arrow ea-carousel-item_arrow--${e}`);switch(i.part="arrow",i.innerHTML=e==="left"?"&lt;":"&gt;",this.arrow){case"always":o(this,s).classList.add("always-show-arrow");break;case"hover":o(this,s).classList.add("hover-trigger");break}return i.addEventListener("click",()=>{a||(this.index=e==="left"?--this.index:++this.index)}),o(this,l).addEventListener("transitionstart",()=>{a=!0}),o(this,l).addEventListener("transitionend",()=>{a=!1}),i};customElements.get("ea-carousel")||customElements.define("ea-carousel",q);export{q as EaCarousel};
