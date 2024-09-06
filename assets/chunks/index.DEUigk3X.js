var c=(e,a,t)=>{if(!a.has(e))throw TypeError("Cannot "+t)};var r=(e,a,t)=>(c(e,a,"read from private field"),t?t.call(e):a.get(e)),o=(e,a,t)=>{if(a.has(e))throw TypeError("Cannot add the same private member more than once");a instanceof WeakSet?a.add(e):a.set(e,t)},n=(e,a,t,d)=>(c(e,a,"write to private field"),d?d.call(e,t):a.set(e,t),t);import{B as g}from"./Base.LSgLRpFA.js";const h=`
.ea-badge_wrap {
  position: relative;
  vertical-align: middle;
  display: inline-block;
}
.ea-badge_wrap .ea-badge_content {
  display: inline-block;
  padding: 0 0.375rem;
  border-radius: 0.625rem;
  border: 1px solid #fff;
  height: 1.125rem;
  line-height: 1.125rem;
  position: absolute;
  right: 0.625rem;
  top: 0;
  transform: translate(100%, -50%);
  color: #fff;
  font-size: 0.75rem;
  text-align: center;
  white-space: nowrap;
  background-color: #f56c6c;
}
.ea-badge_wrap .ea-badge_content.primary {
  background-color: #409eff;
}
.ea-badge_wrap .ea-badge_content.success {
  background-color: #67c23a;
}
.ea-badge_wrap .ea-badge_content.warning {
  background-color: #e6a23c;
}
.ea-badge_wrap .ea-badge_content.info {
  background-color: #909399;
}
.ea-badge_wrap .ea-badge_content.dot {
  right: 0.3125rem;
  padding: 0;
  border-radius: 50%;
  width: 0.5rem;
  height: 0.5rem;
}
`;var s,i;class l extends g{constructor(){super();o(this,s,void 0);o(this,i,void 0);const t=this.attachShadow({mode:"open"});t.innerHTML=`
        <div class="ea-badge_wrap" part='container'>
            <slot></slot>
            <sup class="ea-badge_content" part='content'></sup>
        </div>
    `,n(this,s,t.querySelector(".ea-badge_wrap")),n(this,i,t.querySelector(".ea-badge_content")),this.build(t,h)}get value(){return this.getAttribute("value")||""}set value(t){this.setAttribute("value",t),r(this,i).innerHTML=t}get type(){return this.getAttribute("type")||"normal"}set type(t){this.setAttribute("type",t),r(this,i).classList.add(t)}get max(){return this.getAttrNumber("max")||1/0}set max(t){t!==1/0&&(t=parseInt(t),this.setAttribute("max",t),this.value>t&&(this.value=t+"+"))}get isDot(){return this.getAttrBoolean("is-dot")||!1}set isDot(t){this.toggleAttr("is-dot",t),r(this,i).innerText=t?"":this.value,r(this,i).classList.toggle("dot",t)}connectedCallback(){this.value=this.value,this.type=this.type,this.max=this.max,this.isDot=this.isDot}}s=new WeakMap,i=new WeakMap;customElements.get("ea-badge")||customElements.define("ea-badge",l);export{l as EaBadge};
