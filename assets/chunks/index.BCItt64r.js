var c=(t,a,e)=>{if(!a.has(t))throw TypeError("Cannot "+e)};var i=(t,a,e)=>(c(t,a,"read from private field"),e?e.call(t):a.get(t)),r=(t,a,e)=>{if(a.has(t))throw TypeError("Cannot add the same private member more than once");a instanceof WeakSet?a.add(t):a.set(t,e)},n=(t,a,e,d)=>(c(t,a,"write to private field"),d?d.call(t,e):a.set(t,e),e);import{B as g}from"./Base.LSgLRpFA.js";import"./index.D5YVt3kx.js";const w=`
.ea-page-header_wrap {
  display: flex;
  align-items: center;
  line-height: 24px;
}
.ea-page-header_wrap .ea-page-header_title-wrap,
.ea-page-header_wrap .ea-page-header_divider,
.ea-page-header_wrap .ea-page-header_content-wrap {
  line-height: 24px;
}
.ea-page-header_wrap .ea-page-header_title-wrap {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  cursor: pointer;
}
.ea-page-header_wrap .ea-page-header_divider {
  margin: 0 1rem;
  margin-bottom: 1px;
  font-size: 14px;
  height: 14px;
  overflow: hidden;
  color: #dcdfe6;
  line-height: 1;
  vertical-align: middle;
}
.ea-page-header_wrap .ea-page-header_content-wrap {
  font-size: 18px;
  color: #303133;
  line-height: 1;
}
`;var h,p,l,s,o;class _ extends g{constructor(){super();r(this,h,void 0);r(this,p,void 0);r(this,l,void 0);r(this,s,void 0);r(this,o,void 0);const e=this.attachShadow({mode:"open"});e.innerHTML=`
            <div class='ea-page-header_wrap' part='container'>
                <div class='ea-page-header_title-wrap' part='title-wrap'>
                    <ea-icon class='ea-page-header_back-icon' part='back-icon' icon="icon-angle-left"></ea-icon>
                    <slot name="title"></slot>
                </div>
                <div class='ea-page-header_divider' part='divider'>|</div>
                <div class='ea-page-header_content-wrap' part='content-wrap'>
                    <slot name="content"></slot>
                </div>
            </div>
        `,n(this,h,e.querySelector(".ea-page-header_wrap")),n(this,p,e.querySelector(".ea-page-header_title-wrap")),n(this,s,e.querySelector('slot[name="title"]')),n(this,l,e.querySelector(".ea-page-header_content-wrap")),n(this,o,e.querySelector('slot[name="content"]')),this.build(e,w)}get title(){return this.getAttribute("title")||""}set title(e){e?(this.setAttribute("title",e),i(this,s).innerText=e):(this.setAttribute("title","返回"),i(this,s).innerText="返回")}get content(){return this.getAttribute("content")||""}set content(e){e?(this.setAttribute("content",e),i(this,o).innerText=e):(this.setAttribute("content",""),i(this,o).innerText="")}connectedCallback(){this.title=this.title,this.content=this.content,i(this,p).addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("back"))})}}h=new WeakMap,p=new WeakMap,l=new WeakMap,s=new WeakMap,o=new WeakMap;customElements.get("ea-page-header")||customElements.define("ea-page-header",_);export{_ as EaPageHeader};
