var p=(t,s,e)=>{if(!s.has(t))throw TypeError("Cannot "+e)};var c=(t,s,e)=>(p(t,s,"read from private field"),e?e.call(t):s.get(t)),a=(t,s,e)=>{if(s.has(t))throw TypeError("Cannot add the same private member more than once");s instanceof WeakSet?s.add(t):s.set(t,e)},n=(t,s,e,o)=>(p(t,s,"write to private field"),o?o.call(t,e):s.set(t,e),e);import{B as d}from"./Base.yCeCPjNm.js";const m=`
.ea-descriptions-item_wrap {
  display: inline-flex;
  text-align: left;
  padding-bottom: 1rem;
  line-height: 1.5;
}
.ea-descriptions-item_wrap .ea-descriptions-item_label {
  margin-right: 10px;
}
.ea-descriptions-item_wrap .ea-descriptions-item_label::after {
  content: ":";
}
.ea-descriptions-item_wrap .ea-descriptions-item_content {
  display: inline-flex;
  flex: 1;
  align-items: baseline;
}
.ea-descriptions-item_wrap .ea-descriptions-item_label.is-border,
.ea-descriptions-item_wrap .ea-descriptions-item_content.is-border {
  border: 1px solid #ebeef5;
}
`;var r,i,l;class b extends d{constructor(){super();a(this,r,void 0);a(this,i,void 0);a(this,l,void 0);const e=this.attachShadow({mode:"open"});e.innerHTML=`
        <td class="ea-descriptions-item_wrap" part="container">
            <span class="ea-descriptions-item_label" part="label-wrap">
                <slot slot="label"></slot>
            </span>
            <span class="ea-descriptions-item_content" part="content-wrap">
                <slot></slot>
            </span>
        </td>
    `,n(this,r,e.querySelector(".ea-descriptions-item_wrap")),n(this,i,e.querySelector(".ea-descriptions-item_label")),n(this,l,e.querySelector('slot[name="label"]')),this.build(e,m)}get label(){return this.getAttribute("label")||""}set label(e){e&&(this.setAttribute("label",e),c(this,i).innerHTML=e)}get span(){return this.getAttrNumber("span")||1}set span(e){this.setAttribute("span",e)}connectedCallback(){this.label=this.label,this.span=this.span}}r=new WeakMap,i=new WeakMap,l=new WeakMap;customElements.get("ea-descriptions-item")||customElements.define("ea-descriptions-item",b);export{b as EaDescriptionsItem};
