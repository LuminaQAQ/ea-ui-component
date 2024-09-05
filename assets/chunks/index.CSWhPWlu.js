var z=(r,o,t)=>{if(!o.has(r))throw TypeError("Cannot "+t)};var n=(r,o,t)=>(z(r,o,"read from private field"),t?t.call(r):o.get(r)),s=(r,o,t)=>{if(o.has(r))throw TypeError("Cannot add the same private member more than once");o instanceof WeakSet?o.add(r):o.set(r,t)},h=(r,o,t,e)=>(z(r,o,"write to private field"),e?e.call(r,t):o.set(r,t),t);var i=(r,o,t)=>(z(r,o,"access private method"),t);import{B as G}from"./Base.yCeCPjNm.js";import"./index.BXibZEVU.js";import{a as k,c as S}from"./createElement.BM9xfELw.js";const X=`
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
  width: 0;
  overflow: hidden;
  transition: width 0.3s;
}
.ea-tab_wrap.ea-tab_wrap--editable:hover .ea-tab_wrap--editable-sign {
  width: 14px;
}
`;var b,C,L,H,q,J,R,K;class Y extends G{constructor(){super();s(this,L);s(this,q);s(this,R);s(this,b,void 0);s(this,C,void 0);const t=this.attachShadow({mode:"open"}),e=document.createElement("div");e.className="ea-tab_wrap",e.part="wrap";const d=k();e.appendChild(d),h(this,b,e),h(this,C,d),this.build(t,X),this.shadowRoot.appendChild(e)}get name(){return this.getAttribute("name")}set name(t){this.setAttribute("name",t)}get type(){return this.getAttrBoolean("type")||"normal"}set type(t){this.setAttribute("type",t),n(this,b).classList.add(`ea-tab_wrap--${t}`)}get actived(){return this.getAttrBoolean("actived")}set actived(t){this.toggleAttr("actived",t),n(this,b).classList.toggle("is-actived",t)}get editable(){return this.getAttrBoolean("editable")}set editable(t){this.setAttribute("editable",t),n(this,b).classList.toggle("ea-tab_wrap--editable",t),t&&i(this,q,J).call(this)}handleBorderRadius(t){n(this,b).style.setProperty(t,"3px")}handleBorderRightWidth(){n(this,b).style.setProperty("--border-right-width","1px")}connectedCallback(){i(this,R,K).call(this)}}b=new WeakMap,C=new WeakMap,L=new WeakSet,H=function(){this.addEventListener("click",t=>{const e=t.detail.value===this.getAttrBoolean("selected");this.toggleAttr("selected",e),this.dispatchEvent(new CustomEvent("tab-click",{detail:{name:this.name,event:this},bubbles:!0}))})},q=new WeakSet,J=function(){const t=S("span","ea-tab_wrap--editable-sign");t.innerText="x",n(this,b).appendChild(t),t.addEventListener("click",e=>{e.stopPropagation(),this.dispatchEvent(new CustomEvent("tab-close",{detail:{event:this,name:this.name,index:this.index},bubbles:!0}))})},R=new WeakSet,K=function(){this.label=this.label,i(this,L,H).call(this)};customElements.get("ea-tab")||customElements.define("ea-tab",Y);const Z=`
.ea-pane_wrap {
  display: none;
}
.ea-pane_wrap.is-actived {
  display: block;
}
`;var f,N,O;class tt extends G{constructor(){super();s(this,N);s(this,f,void 0);const t=this.attachShadow({mode:"open"}),e=document.createElement("div");e.className="ea-pane_wrap",e.part="wrap";const d=k();e.appendChild(d),h(this,f,e),this.build(t,Z),this.shadowRoot.appendChild(e)}get actived(){return this.getAttribute("actived")}set actived(t){this.setAttribute("actived",t),n(this,f).classList.toggle("is-actived",t)}get name(){return this.getAttribute("name")}set name(t){this.setAttribute("name",t)}connectedCallback(){i(this,N,O).call(this)}}f=new WeakMap,N=new WeakSet,O=function(){};customElements.get("ea-pane")||customElements.define("ea-pane",tt);const et=`
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
`;var _,c,T,w,m,x,M,g,B,y,j,E,D,A,F,W,Q,P,U;class at extends G{constructor(){super();s(this,x);s(this,g);s(this,y);s(this,E);s(this,A);s(this,W);s(this,P);s(this,_,void 0);s(this,c,void 0);s(this,T,void 0);s(this,w,void 0);s(this,m,0);const t=this.attachShadow({mode:"open"}),e=document.createElement("div");e.className="ea-tabs_wrap",e.part="wrap";const d=k(),a=S("div","ea-tabs_tab-wrap",[d]);e.appendChild(a);const l=S("div","ea-tabs_tab-bottom-bar");e.appendChild(l);const u=k("pane"),p=S("div","ea-tabs_pane-wrap",[u]);e.appendChild(p),h(this,_,e),h(this,c,l),h(this,T,p),h(this,w,d),this.build(t,et),this.shadowRoot.appendChild(e)}get type(){return this.getAttribute("type")||"normal"}set type(t){this.setAttribute("type",t),n(this,_).classList.add("ea-tabs_wrap--"+t);const e=this.querySelectorAll("ea-tab");e.forEach(d=>{d.type=t}),t!=="border-card"&&(e[0].handleBorderRadius("--border-radius-top-left"),e[e.length-1].handleBorderRadius("--border-radius-top-right"),e[e.length-1].handleBorderRightWidth())}get actived(){return this.getAttribute("actived")||this.querySelectorAll("ea-tab")[0].name||0}set actived(t){this.setAttribute("actived",t),this.querySelectorAll("ea-tab").forEach((e,d)=>{e.actived=e.name===t})}get editable(){return this.getAttrBoolean("editable")||!1}set editable(t){this.setAttribute("editable",t),i(this,A,F).call(this,t)}connectedCallback(){i(this,P,U).call(this)}}_=new WeakMap,c=new WeakMap,T=new WeakMap,w=new WeakMap,m=new WeakMap,x=new WeakSet,M=function(t){const e=this.querySelectorAll("ea-tab"),d=this.querySelectorAll("ea-pane"),{width:a,height:l}=t.getBoundingClientRect(),p=Array.from(e).reduce((v,I,V)=>V<=t.index?v+I.offsetWidth:v,0),$=(v,I)=>{v.actived=!1,v.index=I};e.forEach($),d.forEach($),t.actived=!0,this.querySelector(`ea-pane[name="${t.name}"]`).actived=!0,n(this,c).style.left=p-a+"px",n(this,c).style.width=a+"px",n(this,c).style.top=l+"px"},g=new WeakSet,B=function(){const t=this.querySelectorAll("ea-tab"),e=this.querySelectorAll("ea-pane"),d=a=>{i(this,x,M).call(this,a.detail.event),this.actived=a.detail.name,a.detail.event.actived=!0};t.forEach((a,l)=>{a.index=l,a.name||(a.name=l),a.removeEventListener("tab-click",d),a.addEventListener("tab-click",d)}),e.forEach((a,l)=>{a.index=l,a.name||(a.name=l)})},y=new WeakSet,j=function(){setTimeout(()=>{const t=this.querySelector('ea-tab[name="'+this.actived+'"]');t.actived=!0,i(this,x,M).call(this,t)},20)},E=new WeakSet,D=function(t){var p;t.stopPropagation();const e=this.querySelectorAll("ea-tab"),{name:d,event:a,index:l}=t.detail;let u=l;e[l+1]?u=l+1:e[l-1]&&(u=l-1);try{this.actived=(p=e[u])==null?void 0:p.name,a.remove(),this.querySelector(`ea-pane[name="${d}"]`).remove(),e.length<=1?n(this,c).style.width=0:(i(this,y,j).call(this),i(this,g,B).call(this))}catch{}},A=new WeakSet,F=function(t){this.querySelectorAll("ea-tab").forEach(e=>{e.editable=t}),this.removeEventListener("tab-close",i(this,E,D)),this.addEventListener("tab-close",i(this,E,D))},W=new WeakSet,Q=function(){setTimeout(()=>{h(this,m,n(this,w).assignedNodes().length),n(this,w).addEventListener("slotchange",t=>{const e=t.target.assignedNodes().length;e>=n(this,m)?(i(this,g,B).call(this),i(this,A,F).call(this,this.editable),this.type=this.type,h(this,m,e),this.dispatchEvent(new CustomEvent("tab-add",{detail:{event:t,tabs:this.querySelectorAll("ea-tab"),panes:this.querySelectorAll("ea-pane")},bubbles:!0,composed:!0}))):h(this,m,n(this,w).assignedNodes().length)})},20)},P=new WeakSet,U=function(){this.type=this.type,this.actived=this.actived,this.editable=this.editable,i(this,y,j).call(this),i(this,g,B).call(this),i(this,W,Q).call(this)};customElements.get("ea-tabs")||customElements.define("ea-tabs",at);export{at as EaTabs};
