var s=(a,o,e)=>{if(!o.has(a))throw TypeError("Cannot "+e)};var c=(a,o,e)=>(s(a,o,"read from private field"),e?e.call(a):o.get(a)),l=(a,o,e)=>{if(o.has(a))throw TypeError("Cannot add the same private member more than once");o instanceof WeakSet?o.add(a):o.set(a,e)},i=(a,o,e,r)=>(s(a,o,"write to private field"),r?r.call(a,e):o.set(a,e),e);var d=(a,o,e)=>(s(a,o,"access private method"),e);import{B as b}from"./Base.LSgLRpFA.js";import"./index.D5YVt3kx.js";const p=`
.ea-tag_wrap {
  display: inline-block;
  height: 2rem;
  line-height: 30px;
  white-space: nowrap;
  padding: 0 0.625rem;
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
}
.ea-tag_wrap ea-icon {
  font-size: 1rem;
  margin-left: 0.5rem;
  cursor: pointer;
}
.ea-tag_wrap.ea-tag--default {
  color: #409eff;
  background-color: #ecf5ff;
  border-color: #dcdfe6;
}
.ea-tag_wrap.ea-tag--default.ea-tag--dark {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
.ea-tag_wrap.ea-tag--default.ea-tag--plain {
  color: #409eff;
  background-color: #fff;
  border-color: #dcdfe6;
}
.ea-tag_wrap.ea-tag--success {
  color: #67c23a;
  background-color: #f0f9eb;
  border-color: #e1f3d8;
}
.ea-tag_wrap.ea-tag--success.ea-tag--dark {
  color: #fff;
  background-color: #67c23a;
  border-color: #67c23a;
}
.ea-tag_wrap.ea-tag--success.ea-tag--plain {
  color: #67c23a;
  background-color: #fff;
  border-color: #e1f3d8;
}
.ea-tag_wrap.ea-tag--info {
  color: #909399;
  background-color: #f4f4f5;
  border-color: #e9e9eb;
}
.ea-tag_wrap.ea-tag--info.ea-tag--dark {
  color: #fff;
  background-color: #909399;
  border-color: #909399;
}
.ea-tag_wrap.ea-tag--info.ea-tag--plain {
  color: #909399;
  background-color: #fff;
  border-color: #e9e9eb;
}
.ea-tag_wrap.ea-tag--warning {
  color: #e6a23c;
  background-color: #fdf6ec;
  border-color: #faecd8;
}
.ea-tag_wrap.ea-tag--warning.ea-tag--dark {
  color: #fff;
  background-color: #e6a23c;
  border-color: #e6a23c;
}
.ea-tag_wrap.ea-tag--warning.ea-tag--plain {
  color: #e6a23c;
  background-color: #fff;
  border-color: #faecd8;
}
.ea-tag_wrap.ea-tag--danger {
  color: #f56c6c;
  background-color: #fef0f0;
  border-color: #fbc4c4;
}
.ea-tag_wrap.ea-tag--danger.ea-tag--dark {
  color: #fff;
  background-color: #f56c6c;
  border-color: #f56c6c;
}
.ea-tag_wrap.ea-tag--danger.ea-tag--plain {
  color: #f56c6c;
  background-color: #fff;
  border-color: #fbc4c4;
}
`;var t,f,n,g;class u extends b{constructor(){super();l(this,n);l(this,t,void 0);l(this,f,void 0);const e=this.attachShadow({mode:"open"});e.innerHTML=`
      <div class="ea-tag_wrap" part="container">
        <slot></slot>
      </div>
    `,i(this,t,e.querySelector(".ea-tag_wrap")),this.build(e,p)}get type(){return this.getAttribute("type")||"default"}set type(e){this.setAttribute("type",e),c(this,t).classList.add(`ea-tag--${e}`)}get closable(){return this.getAttrBoolean("closable")}set closable(e){this.toggleAttr("closable",e)}get effect(){return this.getAttribute("effect")||"light"}set effect(e){e!=="light"&&(this.setAttribute("effect",e),c(this,t).classList.add(`ea-tag--${e}`))}connectedCallback(){this.effect=this.effect,this.type=this.type,this.closable=this.closable,d(this,n,g).call(this)}}t=new WeakMap,f=new WeakMap,n=new WeakSet,g=function(){if(!this.closable)return;const e=document.createElement("ea-icon");e.icon="icon-cancel-circled2",e.part="close-icon",e.addEventListener("mouseenter",r=>{e.icon="icon-cancel-circled"}),e.addEventListener("mouseleave",r=>{e.icon="icon-cancel-circled2"}),e.addEventListener("click",r=>{this.dispatchEvent(new CustomEvent("close",{detail:{value:this.innerText},bubbles:!0}))}),c(this,t).appendChild(e)};customElements.get("ea-tag")||customElements.define("ea-tag",u);export{u as EaTag};
