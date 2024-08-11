var y=(t,i,e)=>{if(!i.has(t))throw TypeError("Cannot "+e)};var c=(t,i,e)=>(y(t,i,"read from private field"),e?e.call(t):i.get(t)),n=(t,i,e)=>{if(i.has(t))throw TypeError("Cannot add the same private member more than once");i instanceof WeakSet?i.add(t):i.set(t,e)},m=(t,i,e,s)=>(y(t,i,"write to private field"),s?s.call(t,e):i.set(t,e),e);import{B as w}from"./Base.yCeCPjNm.js";const u=`
@import url('/ea_ui_component/icon/index.css');

.ea-empty_wrap {
  padding: 40px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.ea-empty_wrap .ea-empty_image {
  width: 8rem;
  object-fit: cover;
}
.ea-empty_wrap .ea-empty_image svg,
.ea-empty_wrap .ea-empty_image img {
  width: 100%;
  height: 100%;
}
.ea-empty_wrap .ea-empty_description {
  margin-top: 20px;
}
.ea-empty_wrap .ea-empty_bottom {
  margin-top: 20px;
}
`,_=`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 50v21.5a2 2 0 0 0 1 1h39a2 2 0 0 0 1-1V50H61a10 10 0 0 1-20 0h-6.5z" fill="#6E6E6F" />
    <path d="M30.5 50.5L34 39h32.5l4 11.5" fill="none" stroke="#6E6E6F" />
</svg>
`;var d,a,p,h;class E extends w{constructor(){super();n(this,d,void 0);n(this,a,void 0);n(this,p,void 0);n(this,h,void 0);const e=this.attachShadow({mode:"open"}),s=document.createElement("div");s.className="ea-empty_wrap";const r=document.createElement("div");r.className="ea-empty_image",r.innerHTML=_,s.appendChild(r);const o=document.createElement("div");o.className="ea-empty_description",o.innerHTML="暂无数据",s.appendChild(o);const g=document.createElement("div"),l=document.createElement("slot");g.className="ea-empty_bottom",g.appendChild(l),s.appendChild(g),m(this,d,s),m(this,a,r),m(this,p,o),m(this,h,l),this.build(e,u),this.shadowRoot.appendChild(s)}get description(){return this.getAttribute("description")||"暂无数据"}set description(e){this.setAttribute("description",e),c(this,p).innerHTML=e}get image(){return this.getAttribute("image")||""}set image(e){if(!e)return;this.setAttribute("image",e);const s=new Image;s.src=e,s.onload=()=>{c(this,a).innerHTML=`<img src="${e}" />`}}get imageSize(){return this.getAttribute("image-size")||"128"}set imageSize(e){e&&(this.setAttribute("image-size",e),c(this,a).style.width=e+"px")}init(){this.description=this.description,this.image=this.image,this.imageSize=this.imageSize}connectedCallback(){this.init()}}d=new WeakMap,a=new WeakMap,p=new WeakMap,h=new WeakMap;customElements.get("ea-empty")||customElements.define("ea-empty",E);export{E as EaEmpty};
