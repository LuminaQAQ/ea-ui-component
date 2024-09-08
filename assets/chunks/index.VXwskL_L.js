var T=(a,s,t)=>{if(!s.has(a))throw TypeError("Cannot "+t)};var i=(a,s,t)=>(T(a,s,"read from private field"),t?t.call(a):s.get(a)),o=(a,s,t)=>{if(s.has(a))throw TypeError("Cannot add the same private member more than once");s instanceof WeakSet?s.add(a):s.set(a,t)},b=(a,s,t,e)=>(T(a,s,"write to private field"),e?e.call(a,t):s.set(a,t),t);var d=(a,s,t)=>(T(a,s,"access private method"),t);import{B as I}from"./Base.LSgLRpFA.js";import"./index.ChwP6VyU.js";import{c as F}from"./createElement.Dy1aXqlz.js";import{t as W}from"./timeout.CMJ_lqqj.js";const G=`
.ea-pane_wrap {
  display: none;
}
.ea-pane_wrap.is-actived {
  display: block;
}
`;var g;class J extends I{constructor(){super();o(this,g,void 0);const t=this.attachShadow({mode:"open"});t.innerHTML=`
            <div class="ea-pane_wrap" part="container">
                <slot></slot>
            </div>
        `,b(this,g,t.querySelector(".ea-pane_wrap")),this.build(t,G)}get actived(){return this.getAttribute("actived")}set actived(t){this.setAttribute("actived",t),i(this,g).classList.toggle("is-actived",t)}get name(){return this.getAttribute("name")}set name(t){this.setAttribute("name",t)}}g=new WeakMap;customElements.get("ea-pane")||customElements.define("ea-pane",J);const K=`
.ea-tab_wrap {
  --border-radius-top-left: 0;
  --border-radius-top-right: 0;
  --border-right-width: 0;
  position: relative;
  box-sizing: border-box;
  padding: 0 1.25rem;
  height: 40px;
  line-height: 40px;
  min-width: 1rem;
  font-size: 14px;
  font-weight: 500;
  color: #303133;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  transition: color 0.3s, background-color 0.3s, width 0.3s, min-width 0.3s;
}
.ea-tab_wrap:hover {
  color: #409eff;
}
.ea-tab_wrap.ea-tab_wrap--normal.is-actived {
  color: #409eff;
}
.ea-tab_wrap.ea-tabs_wrap--card {
  border-bottom: 1px solid #e4e7ed;
}
.ea-tab_wrap.ea-tabs_wrap--card .ea-tabs_tab-bottom-bar {
  height: 1px;
  bottom: -1px;
  background-color: white;
}
.ea-tab_wrap.ea-tab_wrap--card {
  border-top-left-radius: var(--border-radius-top-left);
  border-top-right-radius: var(--border-radius-top-right);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-right-width: var(--border-right-width);
}
.ea-tab_wrap.ea-tab_wrap--card.is-actived {
  border-bottom-color: white;
  color: #409eff;
}
.ea-tab_wrap.ea-tab_wrap--border-card {
  border-top-left-radius: var(--border-radius-top-left);
  border-top-right-radius: var(--border-radius-top-right);
  border: 0px solid rgba(0, 0, 0, 0.1);
  border-right-width: var(--border-right-width);
}
.ea-tab_wrap.ea-tab_wrap--border-card.is-actived {
  border-bottom-color: white;
  color: #409eff;
  background-color: white;
}
.ea-tab_wrap.ea-tab_wrap--editable .ea-tab_wrap--editable-sign {
  display: block;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(0, -50%);
  user-select: none;
  width: 0;
  overflow: hidden;
  transition: width 0.3s;
}
.ea-tab_wrap.ea-tab_wrap--editable:hover .ea-tab_wrap--editable-sign {
  width: 14px;
}
`;var l,q,H,B,z;class O extends I{constructor(){super();o(this,q);o(this,B);o(this,l,void 0);const t=this.attachShadow({mode:"open"});t.innerHTML=`
            <div class="ea-tab_wrap" part="container">
                <slot></slot>
            </div>
        `,b(this,l,t.querySelector(".ea-tab_wrap")),this.build(t,K)}get name(){return this.getAttribute("name")}set name(t){this.setAttribute("name",t)}get type(){return this.getAttrBoolean("type")||"normal"}set type(t){this.setAttribute("type",t),i(this,l).classList.add(`ea-tab_wrap--${t}`)}get actived(){return this.getAttrBoolean("actived")}set actived(t){this.toggleAttr("actived",t),i(this,l).classList.toggle("is-actived",t)}get editable(){return this.getAttrBoolean("editable")}set editable(t){this.setAttribute("editable",t),i(this,l).classList.toggle("ea-tab_wrap--editable",t),t&&d(this,B,z).call(this)}handleBorderRadius(t){i(this,l).style.setProperty(t,"3px")}handleBorderRightWidth(){i(this,l).style.setProperty("--border-right-width","1px")}connectedCallback(){this.editable=this.editable,this.label=this.label,d(this,q,H).call(this)}}l=new WeakMap,q=new WeakSet,H=function(){this.addEventListener("click",t=>{const e=t.detail.value===this.getAttrBoolean("selected");this.toggleAttr("selected",e),this.dispatchEvent(new CustomEvent("tab-click",{detail:{name:this.name,event:this},bubbles:!0}))})},B=new WeakSet,z=function(){const t=F("span","ea-tab_wrap--editable-sign");t.innerText="x",i(this,l).appendChild(t),t.addEventListener("click",e=>{e.stopPropagation(),this.dispatchEvent(new CustomEvent("tab-close",{detail:{event:this,name:this.name,index:this.index},bubbles:!0}))})};customElements.get("ea-tab")||customElements.define("ea-tab",O);const Q=`
.ea-tabs_wrap {
  position: relative;
}
.ea-tabs_wrap .ea-tabs_tab-wrap {
  display: flex;
  align-items: center;
  overflow-x: auto;
  scrollbar-width: thin;
}
.ea-tabs_wrap .ea-tabs_pane-wrap {
  padding: 20px;
}
.ea-tabs_wrap .ea-tabs_tab-bottom-bar {
  position: absolute;
  height: 2px;
  width: 0;
  top: 40px;
  left: 0;
  border-radius: 999px;
  background-color: #409eff;
  transition: left 0.3s;
}
.ea-tabs_wrap.ea-tabs_wrap--normal .ea-tabs_tab-wrap {
  border-bottom: 2px solid #e4e7ed;
}
.ea-tabs_wrap.ea-tabs_wrap--card .ea-tabs_tab-wrap {
  border-bottom: 1px solid #e4e7ed;
}
.ea-tabs_wrap.ea-tabs_wrap--card .ea-tabs_tab-bottom-bar {
  height: 1px;
  bottom: -1px;
  background-color: white;
}
.ea-tabs_wrap.ea-tabs_wrap--border-card {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
.ea-tabs_wrap.ea-tabs_wrap--border-card .ea-tabs_tab-wrap {
  background-color: #f5f7fa;
  border-bottom: 1px solid #e4e7ed;
}
.ea-tabs_wrap.ea-tabs_wrap--border-card .ea-tabs_tab-bottom-bar {
  height: 1px;
  bottom: -1px;
  background-color: white;
}
`;var v,c,L,p,w,_,N,u,S,f,M,y,P,x,$,k,j;class U extends I{constructor(){super();o(this,_);o(this,u);o(this,f);o(this,y);o(this,x);o(this,k);o(this,v,void 0);o(this,c,void 0);o(this,L,void 0);o(this,p,void 0);o(this,w,0);const t=this.attachShadow({mode:"open"});t.innerHTML=`
            <div class="ea-tabs_wrap" part="container">
                <div class="ea-tabs_tab-wrap" part="tab-wrap">
                    <slot></slot>
                </div>
                <div class="ea-tabs_tab-bottom-bar" part="tab-bottom-bar"></div>
                <div class="ea-tabs_pane-wrap" part="pane-wrap">
                    <slot name="pane"></slot>
                </div>
            </div>
        `,b(this,v,t.querySelector(".ea-tabs_wrap")),b(this,c,t.querySelector(".ea-tabs_tab-bottom-bar")),b(this,L,t.querySelector(".ea-tabs_pane-wrap")),b(this,p,t.querySelector(".ea-tabs_tab-wrap > slot")),this.build(t,Q)}get type(){return this.getAttribute("type")||"normal"}set type(t){this.setAttribute("type",t),i(this,v).classList.add("ea-tabs_wrap--"+t);const e=this.querySelectorAll("ea-tab");e.forEach(h=>{h.type=t}),t!=="border-card"&&(e[0].handleBorderRadius("--border-radius-top-left"),e[e.length-1].handleBorderRadius("--border-radius-top-right"),e[e.length-1].handleBorderRightWidth())}get actived(){return this.getAttribute("actived")||this.querySelectorAll("ea-tab")[0].name||0}set actived(t){this.setAttribute("actived",t),this.querySelectorAll("ea-tab").forEach((e,h)=>{e.actived=e.name===t})}get editable(){return this.getAttrBoolean("editable")||!1}set editable(t){this.setAttribute("editable",t),d(this,x,$).call(this,t)}connectedCallback(){this.type=this.type,this.actived=this.actived,this.editable=this.editable,d(this,f,M).call(this),d(this,u,S).call(this),d(this,k,j).call(this)}}v=new WeakMap,c=new WeakMap,L=new WeakMap,p=new WeakMap,w=new WeakMap,_=new WeakSet,N=function(t){const e=this.querySelectorAll("ea-tab"),h=this.querySelectorAll("ea-pane"),{width:r,height:n}=t.getBoundingClientRect(),E=Array.from(e).reduce((m,R,D)=>D<=t.index?m+R.offsetWidth:m,0),C=(m,R)=>{m.actived=!1,m.index=R};e.forEach(C),h.forEach(C),t.actived=!0,this.querySelector(`ea-pane[name="${t.name}"]`).actived=!0,i(this,c).style.left=E-r+"px",i(this,c).style.width=r+"px",i(this,c).style.top=n+"px"},u=new WeakSet,S=function(){const t=this.querySelectorAll("ea-tab"),e=this.querySelectorAll("ea-pane"),h=r=>{d(this,_,N).call(this,r.detail.event),this.actived=r.detail.name,r.detail.event.actived=!0};t.forEach((r,n)=>{r.index=n,r.name||(r.name=n),r.removeEventListener("tab-click",h),r.addEventListener("tab-click",h)}),e.forEach((r,n)=>{r.index=n,r.name||(r.name=n)})},f=new WeakSet,M=function(){W(()=>{const t=this.querySelector('ea-tab[name="'+this.actived+'"]');t.actived=!0,d(this,_,N).call(this,t)},20)},y=new WeakSet,P=function(t){var E;t.stopPropagation();const e=this.querySelectorAll("ea-tab"),{name:h,event:r,index:n}=t.detail;let A=n;e[n+1]?A=n+1:e[n-1]&&(A=n-1);try{this.actived=(E=e[A])==null?void 0:E.name,r.remove(),this.querySelector(`ea-pane[name="${h}"]`).remove(),e.length<=1?i(this,c).style.width=0:(d(this,f,M).call(this),d(this,u,S).call(this))}catch{}},x=new WeakSet,$=function(t){this.querySelectorAll("ea-tab").forEach(e=>{e.editable=t}),this.removeEventListener("tab-close",d(this,y,P)),this.addEventListener("tab-close",d(this,y,P))},k=new WeakSet,j=function(){W(()=>{b(this,w,i(this,p).assignedNodes().length),i(this,p).addEventListener("slotchange",t=>{const e=t.target.assignedNodes().length;e>=i(this,w)?(d(this,u,S).call(this),d(this,x,$).call(this,this.editable),this.type=this.type,b(this,w,e),this.dispatchEvent(new CustomEvent("tab-add",{detail:{event:t,tabs:this.querySelectorAll("ea-tab"),panes:this.querySelectorAll("ea-pane")},bubbles:!0,composed:!0}))):b(this,w,i(this,p).assignedNodes().length)})},20)};customElements.get("ea-tabs")||customElements.define("ea-tabs",U);export{U as EaTabs};
