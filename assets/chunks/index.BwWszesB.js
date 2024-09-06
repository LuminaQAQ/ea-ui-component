var n=(e,i,t)=>{if(!i.has(e))throw TypeError("Cannot "+t)};var p=(e,i,t)=>(n(e,i,"read from private field"),t?t.call(e):i.get(e)),m=(e,i,t)=>{if(i.has(e))throw TypeError("Cannot add the same private member more than once");i instanceof WeakSet?i.add(e):i.set(e,t)},o=(e,i,t,a)=>(n(e,i,"write to private field"),a?a.call(e,t):i.set(e,t),t);import{B as c}from"./Base.LSgLRpFA.js";const g=`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 50v21.5a2 2 0 0 0 1 1h39a2 2 0 0 0 1-1V50H61a10 10 0 0 1-20 0h-6.5z" fill="#6E6E6F" />
    <path d="M30.5 50.5L34 39h32.5l4 11.5" fill="none" stroke="#6E6E6F" />
</svg>
`,d=`
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
`;var s,r;class h extends c{constructor(){super();m(this,s,void 0);m(this,r,void 0);const t=this.attachShadow({mode:"open"});t.innerHTML=`
            <div class="ea-empty_wrap" part="container">
                <div class="ea-empty_image" part="image-wrap">
                    ${g}
                </div>
                <div class="ea-empty_description" part="description-wrap">
                    暂无数据
                </div>
                <div class="ea-empty_bottom" part="bottom-wrap">
                    <slot></slot>
                </div>
            </div>
        `,o(this,s,t.querySelector(".ea-empty_image")),o(this,r,t.querySelector(".ea-empty_description")),this.build(t,d)}get description(){return this.getAttribute("description")||"暂无数据"}set description(t){this.setAttribute("description",t),p(this,r).innerHTML=t}get image(){return this.getAttribute("image")||""}set image(t){if(!t)return;this.setAttribute("image",t);const a=new Image;a.src=t,a.onload=()=>{p(this,s).innerHTML=`<img src="${t}" />`}}get imageSize(){return this.getAttribute("image-size")||"128"}set imageSize(t){t&&(this.setAttribute("image-size",t),p(this,s).style.width=t+"px")}connectedCallback(){this.description=this.description,this.image=this.image,this.imageSize=this.imageSize}}s=new WeakMap,r=new WeakMap;customElements.get("ea-empty")||customElements.define("ea-empty",h);export{h as EaEmpty};
