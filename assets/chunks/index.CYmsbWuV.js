var m=(e,r,t)=>{if(!r.has(e))throw TypeError("Cannot "+t)};var n=(e,r,t)=>(m(e,r,"read from private field"),t?t.call(e):r.get(e)),i=(e,r,t)=>{if(r.has(e))throw TypeError("Cannot add the same private member more than once");r instanceof WeakSet?r.add(e):r.set(e,t)},s=(e,r,t,d)=>(m(e,r,"write to private field"),d?d.call(e,t):r.set(e,t),t);import{B as x}from"./Base.LSgLRpFA.js";import"./index.CgEiilRo.js";const w=`
.ea-result_wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 40px 30px;
}
.ea-result_wrap .ea-result_icon {
  font-size: 3rem;
}
.ea-result_wrap .ea-result_icon ea-icon[icon=icon-ok-circled] {
  color: #67c23a;
}
.ea-result_wrap .ea-result_icon ea-icon[icon=icon-cancel-circled] {
  color: #f56c6c;
}
.ea-result_wrap .ea-result_icon ea-icon[icon=icon-attention-alt] {
  color: #e6a23c;
}
.ea-result_wrap .ea-result_icon ea-icon[icon=icon-info] {
  color: #909399;
}
.ea-result_wrap .ea-result_title,
.ea-result_wrap .ea-result_subtitle {
  color: #5e6d82;
  font-size: 14px;
}
.ea-result_wrap .ea-result_title {
  margin-top: 20px;
}
.ea-result_wrap .ea-result_subtitle {
  margin-top: 10px;
}
.ea-result_wrap .ea-result_extra {
  margin-top: 30px;
}
`;var c,l,a,o,u,p,_,h,b;class S extends x{constructor(){super();i(this,c,void 0);i(this,l,void 0);i(this,a,void 0);i(this,o,void 0);i(this,u,void 0);i(this,p,void 0);i(this,_,void 0);i(this,h,void 0);i(this,b,void 0);const t=this.attachShadow({mode:"open"});t.innerHTML=`
      <div class="ea-result_wrap" part="container">
        <div class="ea-result_icon" part="icon-wrap">
          <slot name="icon"></slot>
        </div>
        <div class="ea-result_title" part="title-wrap">
          <slot name="title"></slot>
        </div>
        <div class="ea-result_subtitle" part="subTitle-wrap">
          <slot name="subTitle"></slot>
        </div>
        <div class="ea-result_extra" part="extra-wrap">
          <slot name="extra"></slot>
        </div>
      </div>
    `,s(this,c,t.querySelector(".ea-result_wrap")),s(this,l,t.querySelector(".ea-result_icon")),s(this,a,t.querySelector(".ea-result_title")),s(this,o,t.querySelector(".ea-result_subtitle")),s(this,u,t.querySelector(".ea-result_extra")),s(this,p,t.querySelector('slot[name="icon"]')),s(this,_,t.querySelector('slot[name="title"]')),s(this,h,t.querySelector('slot[name="subTitle"]')),s(this,b,t.querySelector('slot[name="extra"]')),this.build(t,w)}get icon(){return this.getAttribute("icon")||""}set icon(t){t&&(this.setAttribute("icon",t),n(this,l).innerHTML=`<ea-icon icon="${t}"></ea-icon>`)}get title(){return this.getAttribute("title")||""}set title(t){t&&(this.setAttribute("title",t),n(this,a).innerText=t)}get subtitle(){return this.getAttribute("sub-title")||""}set subtitle(t){t&&(this.setAttribute("sub-title",t),n(this,o).innerText=t)}connectedCallback(){this.icon=this.icon,this.title=this.title,this.subtitle=this.subtitle}}c=new WeakMap,l=new WeakMap,a=new WeakMap,o=new WeakMap,u=new WeakMap,p=new WeakMap,_=new WeakMap,h=new WeakMap,b=new WeakMap;customElements.get("ea-result")||customElements.define("ea-result",S);export{S as EaResult};
