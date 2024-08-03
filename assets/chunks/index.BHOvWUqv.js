var f=(a,o,e)=>{if(!o.has(a))throw TypeError("Cannot "+e)};var s=(a,o,e)=>(f(a,o,"read from private field"),e?e.call(a):o.get(a)),d=(a,o,e)=>{if(o.has(a))throw TypeError("Cannot add the same private member more than once");o instanceof WeakSet?o.add(a):o.set(a,e)},i=(a,o,e,t)=>(f(a,o,"write to private field"),t?t.call(a,e):o.set(a,e),e);import{B as g}from"./Base.yCeCPjNm.js";const b=`
@import url('/ea_ui_component/icon/index.css');

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
`,p=()=>{const a=document.createElement("i");return a.className="icon-cancel-circled2",a.style.cssText=`
        font-size: 1rem;
        margin-left: 0.5rem;
        cursor: pointer;
    `,a};var c,r;class u extends g{constructor(){super();d(this,c,void 0);d(this,r,void 0);const e=this.attachShadow({mode:"open"}),t=document.createElement("div");t.className="ea-tag_wrap";const l=document.createElement("slot");t.appendChild(l);const n=document.createElement("slot");n.name="close",t.appendChild(n),i(this,c,t),i(this,r,n),this.build(e,b),this.shadowRoot.appendChild(t)}get type(){return this.getAttribute("type")||"default"}set type(e){this.setAttribute("type",e),s(this,c).classList.add(`ea-tag--${e}`)}get closable(){return this.getAttrBoolean("closable")}set closable(e){this.toggleAttr("closable",e)}get effect(){return this.getAttribute("effect")||"light"}set effect(e){e!=="light"&&(this.setAttribute("effect",e),s(this,c).classList.add(`ea-tag--${e}`))}initCloseEvent(){const e=this,t=p();t.addEventListener("mouseenter",function(l){t.className="icon-cancel-circled"}),t.addEventListener("mouseleave",function(l){t.className="icon-cancel-circled2"}),t.addEventListener("click",function(l){e.dispatchEvent(new CustomEvent("close",{detail:{value:e.innerText},bubbles:!0}))}),s(this,r).appendChild(t)}init(){this.type=this.type,this.closable=this.closable,this.closable&&this.initCloseEvent(),this.effect=this.effect}connectedCallback(){this.init()}}c=new WeakMap,r=new WeakMap;customElements.get("ea-tag")||customElements.define("ea-tag",u);export{u as EaTag};
