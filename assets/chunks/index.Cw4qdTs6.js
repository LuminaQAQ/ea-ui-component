var u=(i,a,t)=>{if(!a.has(i))throw TypeError("Cannot "+t)};var e=(i,a,t)=>(u(i,a,"read from private field"),t?t.call(i):a.get(i)),p=(i,a,t)=>{if(a.has(i))throw TypeError("Cannot add the same private member more than once");a instanceof WeakSet?a.add(i):a.set(i,t)},o=(i,a,t,s)=>(u(i,a,"write to private field"),s?s.call(i,t):a.set(i,t),t);import{B as x}from"./Base.LSgLRpFA.js";import"./index.CQU1UkII.js";import{t as b}from"./timeout.CMJ_lqqj.js";const y=`
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
`;var c,g,n,h,w,d,f,_;class A extends x{constructor(){super();p(this,c,void 0);p(this,g,void 0);p(this,n,void 0);p(this,h,void 0);p(this,w,void 0);p(this,d,void 0);p(this,f,void 0);p(this,_,void 0);const t=this.attachShadow({mode:"open"});t.innerHTML=`
      <div class="ea-step_wrap" part="container">
        <div class="ea-step_head-wrap" part="head-wrap">
          <div class="ea-step_bar" part="step-bar"></div>
          <div class="ea-step_head-icon" part="head-icon"></div>
        </div>
        <div class="ea-step_main-wrap" part="main-wrap">
          <div class="ea-step_title-wrap" part="title-wrap">
            <slot name="title"></slot>
          </div>
          <div class="ea-step_description-wrap" part="description-wrap">
            <slot name="description"></slot>
          </div>
        </div>
      </div>
    `,o(this,c,t.querySelector(".ea-step_wrap")),o(this,g,t.querySelector(".ea-step_head-wrap")),o(this,n,t.querySelector(".ea-step_head-icon")),o(this,h,t.querySelector(".ea-step_bar")),o(this,w,t.querySelector(".ea-step_title-wrap")),o(this,f,t.querySelector('slot[name="title"]')),o(this,d,t.querySelector(".ea-step_description-wrap")),o(this,_,t.querySelector('slot[name="description"]')),this.build(t,y)}get title(){return this.getAttribute("title")}set title(t){if(!t)return;const s=this.querySelector('[slot="title"]');s?(t=s.innerHTML,e(this,f).innerHTML=t):e(this,w).innerText=t,this.setAttribute("title",t)}get description(){return this.getAttribute("description")}set description(t){if(!t)return;const s=this.querySelector('[slot="description"]');s?(t=s.innerHTML,e(this,_).innerHTML=t):e(this,d).innerText=t,this.setAttribute("description",t)}get space(){return this.getAttribute("space")||"50%"}set space(t){this.setAttribute("space",t||"50%"),this.style.flexBasis=t||"50%"}get icon(){return this.getAttribute("icon")}set icon(t){t?e(this,n).innerHTML=`
          <ea-icon icon="${t}" size="24"></ea-icon>
      `:(e(this,n).innerHTML=this.index+1,e(this,n).classList.add("is-text"),t=this.index+1),this.setAttribute("icon",t)}get active(){return this.getAttrBoolean("active")||!1}set active(t){this.toggleAttr("active",t)}get isLast(){return this.getAttrBoolean("is-last")||!1}set isLast(t){this.toggleAttr("is-last",t),e(this,g).classList.toggle("is-last",t)}get status(){return this.getAttribute("status")}set status(t){this.setAttribute("status",t),e(this,c).classList.toggle("is-finish",t==="finish"),e(this,c).classList.toggle("is-process",t==="process"),e(this,c).classList.toggle("is-wait",t==="wait"),t==="finish"?e(this,n).querySelector("ea-icon")||(e(this,n).innerHTML=`
          <ea-icon icon="icon-ok" color="#67c23a" style="font-size: 14px; line-height: 14px;"></ea-icon>
      `):e(this,n).innerHTML=this.index+1}get simple(){return this.getAttrBoolean("simple")||!1}set simple(t){this.toggleAttr("simple",t),e(this,c).classList.toggle("is-simple",t),t&&!this.isLast?(e(this,h).innerHTML=`
        <ea-icon icon="icon-angle-right" color="#c0c4cc" style="font-size: 24px; line-height: 24px;"></ea-icon>
      `,e(this,h).style.flex="1",e(this,h).style.textAlign="center",e(this,d).remove(),e(this,c).appendChild(e(this,h))):t&&!this.isLast&&(e(this,h).innerHTML="")}connectedCallback(){this.title=this.title,this.description=this.description,this.simple=this.simple,b(()=>{this.icon=this.icon},20)}}c=new WeakMap,g=new WeakMap,n=new WeakMap,h=new WeakMap,w=new WeakMap,d=new WeakMap,f=new WeakMap,_=new WeakMap;customElements.get("ea-step")||customElements.define("ea-step",A);const L=`
.ea-steps_wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}
.ea-steps_wrap ::slotted(ea-step) {
  flex-basis: 50%;
}
.ea-steps_wrap.is-simple {
  justify-content: unset;
}
.ea-steps_wrap ::slotted(ea-step:last-child) {
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink: 0;
}
.ea-steps_wrap ::slotted(ea-step[simple]) {
  flex: 1;
}
`;var m,r;class S extends x{constructor(){super();p(this,m,void 0);p(this,r,void 0);const t=this.attachShadow({mode:"open"});t.innerHTML=`
            <div class="ea-steps_wrap" part="container">
                <slot></slot>
            </div>
        `,o(this,m,t.querySelector(".ea-steps_wrap")),this.build(t,L)}get active(){return this.getAttrNumber("active")||0}set active(t){this.setAttribute("active",t),e(this,r).forEach((s,l)=>{l<t?s.status="finish":l>t?s.status="wait":s.status="process"})}get space(){return this.getAttribute("space")||"50%"}set space(t){this.setAttribute("space",t),e(this,r).forEach((s,l)=>{l<e(this,r).length-1&&(s.space=t)})}get simple(){return this.getAttrBoolean("simple")||!1}set simple(t){this.toggleAttr("simple",t),e(this,r).forEach((s,l)=>{s.simple=t,e(this,m).classList.toggle("is-simple",t),l<e(this,r).length-1&&(s.space=t?"auto":this.space)})}connectedCallback(){const t=this.querySelectorAll("ea-step");o(this,r,t),e(this,r).forEach((s,l)=>{s.setAttribute("index",l),s.index=l}),e(this,r)[e(this,r).length-1].isLast=!0,this.simple=this.simple,this.active=this.active}}m=new WeakMap,r=new WeakMap;customElements.get("ea-steps")||customElements.define("ea-steps",S);export{S as EaSteps};
