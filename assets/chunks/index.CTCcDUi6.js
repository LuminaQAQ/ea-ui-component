var f=(i,e,t)=>{if(!e.has(i))throw TypeError("Cannot "+t)};var a=(i,e,t)=>(f(i,e,"read from private field"),t?t.call(i):e.get(i)),r=(i,e,t)=>{if(e.has(i))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(i):e.set(i,t)},c=(i,e,t,s)=>(f(i,e,"write to private field"),s?s.call(i,t):e.set(i,t),t);var o=(i,e,t)=>(f(i,e,"access private method"),t);import{B as A}from"./Base.LSgLRpFA.js";import"./index.CcHcFfiA.js";import{c as E}from"./createElement.Dy1aXqlz.js";const y=i=>{const e=E("span","ea-rate_item");e.index=i,e.part="rate-item";const t=E("ea-icon");return t.icon="icon-star-empty",e.appendChild(t),e},C=i=>{for(let e=0;e<5;e++)i.appendChild(y(e))},I=`
:host {
  --i-color: rgb(247, 186, 42);
}
.ea-rate_wrap {
  position: relative;
  display: flex;
  align-items: center;
}
.ea-rate_wrap .ea-rate_item {
  cursor: pointer;
}
.ea-rate_wrap .ea-rate_item ea-icon::part(container) {
  color: var(--i-color);
  transition: color 0.3s, font-size 0.1s;
}
.ea-rate_wrap .ea-rate_item.active ea-icon::part(container) {
  font-size: 1.1rem;
}
.ea-rate_wrap .ea-rate_item.disabled {
  pointer-events: none;
  cursor: not-allowed;
}
.ea-rate_wrap .ea-rate_text {
  margin-left: 0.25rem;
  min-width: 2rem;
  font-size: 0.8rem;
  line-height: 0.8;
  vertical-align: middle;
}
.ea-rate_wrap .ea-rate_score {
  position: absolute;
  left: 0;
  top: 0;
}
.ea-rate_wrap .ea-rate_score .ea-rate_score_item {
  width: 24px;
  height: 24px;
}
.ea-rate_wrap .ea-rate_score .ea-rate_score_item > i {
  color: #c0c4cc;
  font-size: 1rem;
  line-height: 1;
}
`;var w,d,p,n,h,l,v,b,u,g,m,_,x,T;class L extends A{constructor(){super();r(this,v);r(this,u);r(this,m);r(this,x);r(this,w,void 0);r(this,d,void 0);r(this,p,void 0);r(this,n,void 0);r(this,h,void 0);r(this,l,["极差","失望","一般","满意","惊喜"]);const t=this.attachShadow({mode:"open"});t.innerHTML=`
            <div class="ea-rate_wrap" part="container">
                <section class="ea-rate_item-wrap" part="item-wrap">
                </section>
                <span class="ea-rate_text" part="text-wrap"></span>
            </div>
        `,c(this,w,t.querySelector(".ea-rate_wrap")),c(this,d,t.querySelector(".ea-rate_item-wrap")),c(this,p,t.querySelector(".ea-rate_text")),C(a(this,d)),c(this,n,t.querySelectorAll(".ea-rate_item")),c(this,h,t.querySelectorAll("ea-icon")),this.build(t,I)}get value(){const t=this.getAttrNumber("value")||0;return t<1||t>5||!t?0:t}set value(t){!t||isNaN(Number(t))||(this.setAttribute("value",t),o(this,m,_).call(this),o(this,u,g).call(this,t))}get color(){return this.getAttribute("color")}set color(t){t&&(this.setAttribute("color",t),a(this,d).style.setProperty("--i-color",t))}get disabled(){return this.getAttrBoolean("disabled")}set disabled(t){this.toggleAttr("disabled",t),a(this,n).forEach(s=>{s.classList.toggle("disabled",t)}),a(this,w).style.cursor=t?"not-allowed":"pointer"}get showText(){return this.getAttrBoolean("show-text")}set showText(t){this.toggleAttr("show-text",t)}get showTextList(){return a(this,l)}set showTextList(t){typeof t=="object"&&t.length===5&&c(this,l,t)}get voidIcon(){return this.getAttribute("void-icon")||"icon-star-empty"}set voidIcon(t){this.setAttribute("void-icon",t),o(this,v,b).call(this,t)}get activeIcon(){return this.getAttribute("active-icon")||"icon-star"}set activeIcon(t){this.setAttribute("active-icon",t),o(this,v,b).call(this,t)}connectedCallback(){this.activeIconClass=this.activeIconClass,this.voidIconClass=this.voidIconClass,this.showText=this.showText,this.color=this.color,this.value=this.value,this.disabled=this.disabled,this.disabled||o(this,x,T).call(this)}}w=new WeakMap,d=new WeakMap,p=new WeakMap,n=new WeakMap,h=new WeakMap,l=new WeakMap,v=new WeakSet,b=function(t){a(this,h).forEach(s=>{s.icon=t})},u=new WeakSet,g=function(t){for(let s=0;s<t;s++)a(this,n)[s].classList.add("active"),a(this,h)[s].icon=this.activeIcon,this.showText&&(a(this,p).innerText=this.showTextList[t-1])},m=new WeakSet,_=function(){a(this,n).forEach((t,s)=>{t.classList.remove("active"),a(this,h)[s].icon=this.voidIcon,this.showText&&(a(this,p).innerText="")})},x=new WeakSet,T=function(){a(this,n).forEach(t=>{const{index:s}=t;t.addEventListener("mouseenter",()=>{o(this,m,_).call(this),o(this,u,g).call(this,s+1),this.dispatchEvent(new CustomEvent("hover",{detail:{value:s+1,rateText:a(this,l)[s]}}))}),t.addEventListener("mouseleave",()=>{o(this,m,_).call(this),o(this,u,g).call(this,this.value)}),t.addEventListener("click",()=>{this.value=s+1,this.dispatchEvent(new CustomEvent("change",{detail:{value:s+1,rateText:a(this,l)[s]}}))})})};customElements.get("ea-rate")||customElements.define("ea-rate",L);export{L as EaRate};
