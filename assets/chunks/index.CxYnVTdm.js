var u=(t,a,e)=>{if(!a.has(t))throw TypeError("Cannot "+e)};var r=(t,a,e)=>(u(t,a,"read from private field"),e?e.call(t):a.get(t)),l=(t,a,e)=>{if(a.has(t))throw TypeError("Cannot add the same private member more than once");a instanceof WeakSet?a.add(t):a.set(t,e)},c=(t,a,e,g)=>(u(t,a,"write to private field"),g?g.call(t,e):a.set(t,e),e);var h=(t,a,e)=>(u(t,a,"access private method"),e);import{B as x}from"./Base.LSgLRpFA.js";import"./index.D5YVt3kx.js";import{h as y}from"./handleDefaultAttrIsTrue.C-TnTdkH.js";import{c as _}from"./createElement.Dy1aXqlz.js";const k=`
.ea-alert_wrap {
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  border-radius: 4px;
  padding: 8px 16px;
  margin: 20px 0 0;
  display: flex;
  align-items: center;
  width: 100%;
  opacity: 1;
  transition: opacity 0.2s;
}
.ea-alert_wrap .ea-alert_content {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.ea-alert_wrap .ea-alert_content .ea-alert_title {
  display: flex;
  align-items: center;
}
.ea-alert_wrap .ea-alert_content .ea-alert_title i {
  margin-right: 0.5rem;
}
.ea-alert_wrap .ea-alert_content .ea-alert_close-icon {
  color: #c0c4cc;
  cursor: pointer;
}
.ea-alert_wrap .ea-alert_content.ea-alert--center .ea-alert_title,
.ea-alert_wrap .ea-alert_content.ea-alert--center .ea-alert_close-icon {
  margin-left: auto;
}
.ea-alert_wrap .ea-alert_description {
  width: 100%;
  margin: 5px 0 0;
  font-size: 12px;
}
.ea-alert_wrap.ea-alert--success {
  background-color: #f0f9eb;
  color: #67c23a;
}
.ea-alert_wrap.ea-alert--success.ea-alert--dark {
  color: #fff;
  background-color: #67c23a;
}
.ea-alert_wrap.ea-alert--success.ea-alert--dark .ea-alert_close-icon {
  color: #fff;
}
.ea-alert_wrap.ea-alert--info {
  background-color: #f4f4f5;
  color: #909399;
}
.ea-alert_wrap.ea-alert--info.ea-alert--dark {
  color: #fff;
  background-color: #909399;
}
.ea-alert_wrap.ea-alert--info.ea-alert--dark .ea-alert_close-icon {
  color: #fff;
}
.ea-alert_wrap.ea-alert--warning {
  background-color: #fdf6ec;
  color: #e6a23c;
}
.ea-alert_wrap.ea-alert--warning.ea-alert--dark {
  color: #fff;
  background-color: #e6a23c;
}
.ea-alert_wrap.ea-alert--warning.ea-alert--dark .ea-alert_close-icon {
  color: #fff;
}
.ea-alert_wrap.ea-alert--error {
  background-color: #fef0f0;
  color: #f56c6c;
}
.ea-alert_wrap.ea-alert--error.ea-alert--dark {
  color: #fff;
  background-color: #f56c6c;
}
.ea-alert_wrap.ea-alert--error.ea-alert--dark .ea-alert_close-icon {
  color: #fff;
}
`;var i,n,o,s,p,w,f,b,d,m;class A extends x{constructor(){super();l(this,p);l(this,f);l(this,d);l(this,i,void 0);l(this,n,void 0);l(this,o,void 0);l(this,s,void 0);const e=this.attachShadow({mode:"open"});e.innerHTML=`
      <div class='ea-alert_wrap' part='container'>
        <div class="ea-alert_content" part='content-wrap'>
          <span class="ea-alert_title" part='title'></span>
          <ea-icon class="ea-alert_close-icon" part='icon'></ea-icon>
        </div>
      </div>
    `,c(this,i,e.querySelector(".ea-alert_wrap")),c(this,n,e.querySelector(".ea-alert_content")),c(this,o,e.querySelector(".ea-alert_title")),c(this,s,e.querySelector(".ea-alert_close-icon")),this.build(e,k)}get type(){return this.getAttribute("type")||"info"}set type(e){this.setAttribute("type",e),r(this,i).classList.add(`ea-alert--${e}`)}get title(){return this.getAttribute("title")||""}set title(e){this.setAttribute("title",e),r(this,o).innerText=e}get closable(){return y("closable")}set closable(e){this.setAttribute("closable",e),r(this,s).style.display=e?"block":"none"}get closeText(){return this.getAttribute("close-text")||""}set closeText(e){this.setAttribute("close-text",e)}get effect(){return this.getAttribute("effect")||"light"}set effect(e){this.setAttribute("effect",e),r(this,i).classList.toggle("ea-alert--dark",e==="dark")}get showIcon(){return this.getAttrBoolean("show-icon")||!1}set showIcon(e){this.setAttribute("show-icon",e)}get center(){return this.getAttrBoolean("center")||!1}set center(e){this.setAttribute("center",e),r(this,n).classList.toggle("ea-alert--center",e)}get description(){return this.getAttribute("description")||""}set description(e){this.setAttribute("description",e)}get iconList(){return{success:"ok-circled",info:"info",warning:"attention-alt",error:"cancel-circled"}}connectedCallback(){this.type=this.type,this.title=this.title,this.closable=this.closable,this.closeText=this.closeText,this.effect=this.effect,this.center=this.center,h(this,p,w).call(this),h(this,f,b).call(this),h(this,d,m).call(this)}}i=new WeakMap,n=new WeakMap,o=new WeakMap,s=new WeakMap,p=new WeakSet,w=function(){this.closable&&(this.closable===!0&&this.closeText===""?r(this,s).icon="icon-cancel":r(this,s).innerText=this.closeText,r(this,s).addEventListener("click",()=>{r(this,i).style.opacity=0,this.dispatchEvent(new CustomEvent("close",{detail:{target:r(this,s)}}))}),r(this,i).addEventListener("transitionend",()=>{this.remove()}))},f=new WeakSet,b=function(){if(!this.showIcon)return;const e=_("ea-icon");e.icon=`icon-${this.iconList[this.type]}`,e.classList.add(`ea-alert--${this.type}`),r(this,o).insertBefore(e,r(this,o).firstChild)},d=new WeakSet,m=function(){if(!this.description)return;const e=_("p","ea-alert_description");e.part="description",r(this,i).style.flexDirection="column",e.innerText=this.description,r(this,i).appendChild(e)};customElements.get("ea-alert")||customElements.define("ea-alert",A);export{A as EaAlert};
