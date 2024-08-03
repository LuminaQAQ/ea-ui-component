var h=(t,i,e)=>{if(!i.has(t))throw TypeError("Cannot "+e)};var m=(t,i,e)=>(h(t,i,"read from private field"),e?e.call(t):i.get(t)),o=(t,i,e)=>{if(i.has(t))throw TypeError("Cannot add the same private member more than once");i instanceof WeakSet?i.add(t):i.set(t,e)},r=(t,i,e,s)=>(h(t,i,"write to private field"),s?s.call(t,e):i.set(t,e),e);import{B as u}from"./Base.yCeCPjNm.js";const _=`
@import url('/ea_ui_component/icon/index.css');

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
`;var n,a,p;class w extends u{constructor(){super();o(this,n,void 0);o(this,a,void 0);o(this,p,void 0);const e=this.attachShadow({mode:"open"}),s=document.createElement("td");s.className="ea-descriptions-item_wrap",s.colSpan=1;const l=document.createElement("span"),c=document.createElement("slot");l.className="ea-descriptions-item_label",l.appendChild(c),s.appendChild(l);const d=document.createElement("span"),b=document.createElement("slot");d.className="ea-descriptions-item_content",c.name="label",d.appendChild(b),s.appendChild(d),r(this,n,s),r(this,a,l),r(this,p,c),this.build(e,_),this.shadowRoot.appendChild(s)}get label(){return this.getAttribute("label")||""}set label(e){this.setAttribute("label",e),m(this,a).innerHTML=e}get span(){return this.getAttrNumber("span")||1}set span(e){this.setAttribute("span",e),m(this,n).colSpan=e}init(){this.label=this.label,this.span=this.span}connectedCallback(){this.init()}}n=new WeakMap,a=new WeakMap,p=new WeakMap;customElements.get("ea-descriptions-item")||customElements.define("ea-descriptions-item",w);export{w as EaDescriptionsItem};
