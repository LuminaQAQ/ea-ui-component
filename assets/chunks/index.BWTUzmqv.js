var u=(i,e,t)=>{if(!e.has(i))throw TypeError("Cannot "+t)};var n=(i,e,t)=>(u(i,e,"read from private field"),t?t.call(i):e.get(i)),l=(i,e,t)=>{if(e.has(i))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(i):e.set(i,t)},g=(i,e,t,o)=>(u(i,e,"write to private field"),o?o.call(i,t):e.set(i,t),t);var h=(i,e,t)=>(u(i,e,"access private method"),t);import{t as f}from"./timeout.CMJ_lqqj.js";import{B as v}from"./Base.LSgLRpFA.js";import"./index.ChwP6VyU.js";const x=`
.ea-backtop_wrap {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  right: 40px;
  bottom: 40px;
  cursor: pointer;
  background-color: #fff;
  border-radius: 50%;
  color: #409eff;
  font-size: 14px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  opacity: 1;
  z-index: 5;
  transition: opacity 0.3s ease-in-out;
}
`;var s,a,m,c,d,p,y;class k extends v{constructor(){super();l(this,a);l(this,c);l(this,p);l(this,s,void 0);const t=this.attachShadow({mode:"open"});t.innerHTML=`
            <div class="ea-backtop_wrap" part='container' style='display: none'>
                <slot></slot>
            </div>
        `,g(this,s,t.querySelector(".ea-backtop_wrap")),this.build(t,x)}get target(){return this.getAttribute("target")||""}set target(t){this.setAttribute("target",t)}get right(){return this.getAttribute("right")||"40px"}set right(t){this.setAttribute("right",t),n(this,s).style.right=t}get bottom(){return this.getAttribute("bottom")||"40px"}set bottom(t){this.setAttribute("bottom",t),n(this,s).style.bottom=t}get icon(){return this.getAttribute("icon")||"icon-angle-up"}set icon(t){this.setAttribute("icon",t),n(this,s).innerHTML=`
            <ea-icon icon="${t}" part='icon'></ea-icon>
        `}get visibilityHeight(){return this.getAttribute("visibility-height")||200}set visibilityHeight(t){this.setAttribute("visibility-height",t)}connectedCallback(){this.target=this.target,this.right=this.right,this.bottom=this.bottom,this.visibilityHeight=this.visibilityHeight,this.icon=this.icon,h(this,p,y).call(this)}}s=new WeakMap,a=new WeakSet,m=function(t){let o=null,r=null;return t==="null"||t===""||t===null||t===void 0||t==="undefined"?(o=document,r=document.documentElement):(o=document.querySelector(t),r=document.querySelector(t)),{dom:o,scrollDom:r}},c=new WeakSet,d=function(t){t.scrollTop>this.visibilityHeight?(n(this,s).style.display="flex",n(this,s).ontransitionend=null,f(()=>{n(this,s).style.opacity=1},10)):(n(this,s).style.opacity=0,n(this,s).ontransitionend=()=>{n(this,s).style.display="none"})},p=new WeakSet,y=function(){const{dom:t,scrollDom:o}=h(this,a,m).call(this,this.target);h(this,c,d).call(this,o),t.addEventListener("scroll",()=>{h(this,c,d).call(this,o)}),n(this,s).addEventListener("click",function(){let r=10,b=setInterval(()=>{r+=5,o.scrollTop-=r,o.scrollTop<=0&&(o.scrollTop=0,clearInterval(b),b=null,this.dispatchEvent(new CustomEvent("reachedTop",{})))},12);this.dispatchEvent(new CustomEvent("backtop",{}))})};customElements.get("ea-backtop")||customElements.define("ea-backtop",k);export{k as EaBacktop};
