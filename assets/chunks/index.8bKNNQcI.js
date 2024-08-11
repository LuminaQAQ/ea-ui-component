var T=(i,a,t)=>{if(!a.has(i))throw TypeError("Cannot "+t)};var s=(i,a,t)=>(T(i,a,"read from private field"),t?t.call(i):a.get(i)),r=(i,a,t)=>{if(a.has(i))throw TypeError("Cannot add the same private member more than once");a instanceof WeakSet?a.add(i):a.set(i,t)},o=(i,a,t,e)=>(T(i,a,"write to private field"),e?e.call(i,t):a.set(i,t),t);var E=(i,a,t)=>(T(i,a,"access private method"),t);import{B as z}from"./Base.yCeCPjNm.js";import"./index.DSSfHWaE.js";import{c as d,a as S}from"./createElement.BM9xfELw.js";const I=`
@import url('/ea_ui_component/icon/index.css');

.ea-step_wrap {
  color: #c0c4cc;
  transition: color 0.3s;
}
.ea-step_wrap .ea-step_head-wrap {
  position: relative;
}
.ea-step_wrap .ea-step_head-wrap .ea-step_head-icon {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  background-color: #fff;
  font-size: 14px;
  z-index: 1;
}
.ea-step_wrap .ea-step_head-wrap .ea-step_head-icon.is-text {
  border-radius: 50%;
  border: 2px solid;
}
.ea-step_wrap .ea-step_head-wrap .ea-step_bar {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 2px;
  width: 100%;
  height: 2px;
  background-color: #c0c4cc;
}
.ea-step_wrap .ea-step_head-wrap.is-last {
  flex-basis: auto;
}
.ea-step_wrap .ea-step_head-wrap.is-last .ea-step_bar {
  display: none;
}
.ea-step_wrap .ea-step_main-wrap {
  white-space: normal;
  text-align: left;
}
.ea-step_wrap .ea-step_main-wrap .ea-step_title-wrap {
  font-size: 16px;
  line-height: 38px;
}
.ea-step_wrap .ea-step_main-wrap .ea-step_description-wrap {
  margin-top: -5px;
  font-size: 12px;
  line-height: 20px;
}
.ea-step_wrap.is-process {
  color: #303133;
  border-color: #303133;
}
.ea-step_wrap.is-finish {
  color: #67c23a;
  border-color: #67c23a;
}
.ea-step_wrap.is-finish .ea-step_head-wrap .ea-step_bar {
  background-color: #67c23a;
}
.ea-step_wrap.is-simple {
  display: flex;
  align-items: center;
}
.ea-step_wrap.is-simple .ea-step_head-wrap {
  position: relative;
}
.ea-step_wrap.is-simple .ea-step_head-wrap .ea-step_bar {
  position: relative;
  width: auto;
  height: auto;
  transform: translateY(0%);
  margin-left: 2px;
  flex: 1;
}
.ea-step_wrap.is-simple .ea-step_main-wrap {
  margin-left: 16px;
  line-height: 24px;
  height: 24px;
}
.ea-step_wrap.is-simple .ea-step_main-wrap .ea-step_title-wrap {
  line-height: 24px;
}
`;var l,w,h,c,m,g,C,f,_,u,W;class R extends z{constructor(){super();r(this,u);r(this,l,void 0);r(this,w,void 0);r(this,h,void 0);r(this,c,void 0);r(this,m,void 0);r(this,g,void 0);r(this,C,void 0);r(this,f,void 0);r(this,_,void 0);const t=this.attachShadow({mode:"open"}),e=document.createElement("div");e.className="ea-step_wrap",e.part="wrap";const p=d("div","ea-step_head-icon"),H=d("div","ea-step_bar"),A=d("div","ea-step_head-wrap",[H,p]);A.part="head-wrap",e.appendChild(A);const M=S("title"),L=d("div","ea-step_title-wrap",[M]);L.part="title-wrap";const B=S("description"),y=d("div","ea-step_description-wrap",[B]);y.part="description-wrap";const k=d("div","ea-step_main-wrap",[L,y]);k.part="main-wrap",e.appendChild(k),o(this,l,e),o(this,w,A),o(this,h,p),o(this,c,H),o(this,m,L),o(this,f,M),o(this,g,y),o(this,_,B),this.build(t,I),this.shadowRoot.appendChild(e)}get title(){return this.getAttribute("title")}set title(t){const e=this.querySelector('[slot="title"]');e?(t=e.innerHTML,s(this,f).innerHTML=t):s(this,m).innerText=t,this.setAttribute("title",t)}get description(){return this.getAttribute("description")}set description(t){const e=this.querySelector('[slot="description"]');e?(t=e.innerHTML,s(this,_).innerHTML=t):s(this,g).innerText=t,this.setAttribute("description",t)}get space(){return this.getAttribute("space")||"50%"}set space(t){this.setAttribute("space",t||"50%"),this.style.flexBasis=t||"50%"}get icon(){return this.getAttribute("icon")}set icon(t){t?s(this,h).innerHTML=`
        <i class="${t}" style="font-size: 24px;"></i>
      `:(s(this,h).innerHTML=this.index+1,s(this,h).classList.add("is-text"),t=this.index+1),this.setAttribute("icon",t)}get active(){return this.getAttrBoolean("active")||!1}set active(t){this.toggleAttr("active",t)}get isLast(){return this.getAttrBoolean("is-last")||!1}set isLast(t){this.toggleAttr("is-last",t),s(this,w).classList.toggle("is-last",t),this.style.cssText=`
            flex-basis: auto;
            flex-grow: 0;
            flex-shrink: 0;
        `}get status(){return this.getAttribute("status")}set status(t){this.setAttribute("status",t),s(this,l).classList.toggle("is-finish",t==="finish"),s(this,l).classList.toggle("is-process",t==="process"),s(this,l).classList.toggle("is-wait",t==="wait"),t==="finish"?s(this,h).querySelector("i")||(s(this,h).innerHTML=`
        <i class="icon-ok" style="font-size: 14px; line-height: 14px; color: #67c23a;"></i>
      `):s(this,h).innerHTML=this.index+1}get simple(){return this.getAttrBoolean("simple")||!1}set simple(t){this.toggleAttr("simple",t),s(this,l).classList.toggle("is-simple",t),t&&!this.isLast?(s(this,c).innerHTML=`
        <i class="icon-angle-right" style="font-size: 24px; line-height: 24px; color: #c0c4cc;"></i>
      `,this.style.flex="1",s(this,c).style.flex="1",s(this,c).style.textAlign="center",s(this,g).remove(),s(this,l).appendChild(s(this,c))):t&&!this.isLast&&(s(this,c).innerHTML="")}connectedCallback(){E(this,u,W).call(this)}}l=new WeakMap,w=new WeakMap,h=new WeakMap,c=new WeakMap,m=new WeakMap,g=new WeakMap,C=new WeakMap,f=new WeakMap,_=new WeakMap,u=new WeakSet,W=function(){this.title=this.title,this.description=this.description,this.simple=this.simple;let t=setTimeout(()=>{this.icon=this.icon,clearTimeout(t),t=null},20)};customElements.get("ea-step")||customElements.define("ea-step",R);const j=`
.ea-steps_wrap {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.ea-steps_wrap ::slotted(ea-step) {
  flex-basis: 50%;
}
.ea-steps_wrap.is-simple {
  justify-content: unset;
}
`;var x,n,b,q;class N extends z{constructor(){super();r(this,b);r(this,x,void 0);r(this,n,void 0);const t=this.attachShadow({mode:"open"}),e=document.createElement("div");e.className="ea-steps_wrap",e.part="wrap";const p=S();e.appendChild(p),o(this,x,e),this.build(t,j),this.shadowRoot.appendChild(e)}get active(){return this.getAttrNumber("active")||0}set active(t){this.setAttribute("active",t),s(this,n).forEach((e,p)=>{p<t?e.status="finish":p>t?e.status="wait":e.status="process"})}get space(){return this.getAttribute("space")||"50%"}set space(t){this.setAttribute("space",t),s(this,n).forEach((e,p)=>{p<s(this,n).length-1&&(e.space=t)})}get simple(){return this.getAttrBoolean("simple")||!1}set simple(t){this.toggleAttr("simple",t),s(this,n).forEach((e,p)=>{e.simple=t,s(this,x).classList.toggle("is-simple",t),p<s(this,n).length-1&&(e.space=t?"auto":this.space)})}connectedCallback(){E(this,b,q).call(this)}}x=new WeakMap,n=new WeakMap,b=new WeakSet,q=function(){const t=this.querySelectorAll("ea-step");o(this,n,t),s(this,n).forEach((e,p)=>{e.setAttribute("index",p),e.index=p}),s(this,n)[s(this,n).length-1].isLast=!0,this.simple=this.simple,this.active=this.active,this.space=this.space};customElements.get("ea-steps")||customElements.define("ea-steps",N);export{N as EaSteps};
