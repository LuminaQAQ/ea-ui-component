var c=(r,a,t)=>{if(!a.has(r))throw TypeError("Cannot "+t)};var e=(r,a,t)=>(c(r,a,"read from private field"),t?t.call(r):a.get(r)),o=(r,a,t)=>{if(a.has(r))throw TypeError("Cannot add the same private member more than once");a instanceof WeakSet?a.add(r):a.set(r,t)},u=(r,a,t,s)=>(c(r,a,"write to private field"),s?s.call(r,t):a.set(r,t),t);import{B as g}from"./Base.yCeCPjNm.js";const w=`
@import url('/ea_ui_component/icon/index.css');

.ea-textarea_wrap {
  position: relative;
  width: 100%;
}
.ea-textarea_wrap .ea-textarea_inner {
  box-sizing: border-box;
  box-shadow: none;
  resize: vertical;
  min-height: 1.75rem;
  border: 1px solid #dcdfe6;
  outline: 0;
  transition: border 0.2s;
  border-radius: 3px;
  padding: 0.5rem;
  line-height: 0.8;
  font-size: 0.8rem;
  scrollbar-width: none;
}
.ea-textarea_wrap .ea-textarea_inner:focus {
  border-color: #409eff;
}
.ea-textarea_wrap .ea-textarea_inner::placeholder {
  color: #c0c4cc;
}
.ea-textarea_wrap .ea-textarea_inner.disabled {
  background-color: #eeeeee;
  color: #c0c4cc;
}
.ea-textarea_wrap .ea-textarea_inner.invalid {
  border-color: #f56c6c;
}
.ea-textarea_wrap .ea-input_word-limit {
  position: absolute;
  font-size: 0.75rem;
  bottom: 0.5rem;
  right: 0.5rem;
}
`,p=()=>{let r=document.createElement("textarea");return r.className="ea-textarea_inner",r};var h,i,l;class x extends g{constructor(){super();o(this,h,void 0);o(this,i,void 0);o(this,l,!1);const t=this.attachShadow({mode:"open"}),s=document.createElement("div");s.className="ea-textarea_wrap",u(this,h,s);const n=p();u(this,i,n),e(this,h).appendChild(n),this.build(t,w),this.shadowRoot.appendChild(s)}get name(){return this.getAttribute("name")||""}set name(t){this.setAttribute("name",t)}get value(){return e(this,i).value}set value(t){e(this,i).value=t}get placeholder(){return this.getAttribute("placeholder")||""}set placeholder(t){this.setAttribute("placeholder",t),e(this,i).placeholder=t}get rows(){return this.getAttribute("rows")||2}set rows(t){t&&(this.setAttribute("rows",t),e(this,i).rows=t,e(this,i).setAttribute("rows",t))}get autosize(){return this.getAttrBoolean("autosize")}set autosize(t){t&&(this.setAttribute("autosize",t),e(this,i).addEventListener("input",s=>{if(s.target.type==="textarea"){const n=e(this,i).cols,d=s.target.value.length;let m=Math.ceil(d/n)<=Number(e(this,i).rows)?Number(e(this,i).rows):Math.ceil(d/n);d%n==1&&(this.minRows>m?this.setTextareaHeight(this.minRows):this.maxRows<m?this.setTextareaHeight(this.maxRows):this.setTextareaHeight(m))}}))}setTextareaHeight(t){t=Number(t),e(this,i).rows=t}get minRows(){const t=Number(this.getAttribute("min-rows"));return t!==0&&t>0?t:1}set minRows(t){t&&(this.setAttribute("min-rows",t),this.setTextareaHeight(Number(t)))}get maxRows(){const t=Number(this.getAttribute("max-rows"));return t!==0&&t>0?t:10}set maxRows(t){t&&(this.setAttribute("max-rows",t),this.setTextareaHeight(Number(t)))}get maxLength(){return this.getAttribute("max-length")}set maxLength(t){t&&(this.setAttribute("max-length",t),e(this,i).maxLength=t,e(this,i).addEventListener("input",s=>{s.target.value.length>t&&(s.target.value=s.target.value.slice(0,t))}),this.showWordLimit&&(this.showWordLimit=!0))}get minLength(){return this.getAttribute("min-length")}set minLength(t){t&&(this.setAttribute("min-length",t),e(this,i).minLength=t,e(this,i).addEventListener("input",s=>{s.target.value.length<t?s.target.classList.add("invalid"):s.target.classList.remove("invalid")}))}get showWordLimit(){return this.getAttrBoolean("show-word-limit")}set showWordLimit(t){if(!t)return;this.setAttribute("show-word-limit",t);const s=document.createElement("span");e(this,h).classList.toggle("word-limit",t),e(this,h).classList.toggle("append-slot",t),s.className="ea-input_word-limit",s.innerText=`${e(this,i).value.length}/${this.maxLength}`,e(this,i).addEventListener("input",n=>{s.innerText=`${n.target.value.length}/${this.maxLength}`}),e(this,h).appendChild(s),s.style.left=e(this,i).getBoundingClientRect().width-s.getBoundingClientRect().width-5+"px"}init(){this.setAttribute("data-ea-component",!0),this.name=this.name,this.placeholder=this.placeholder,this.value=this.value,e(this,i).value=this.getAttribute("value")||"",this.disabled=this.disabled,this.autosize=this.autosize,this.maxRows&&(this.maxRows=this.maxRows),this.minRows&&(this.minRows=this.minRows),this.rows=this.rows,this.maxLength=this.maxLength,this.minLength=this.minLength,e(this,i).addEventListener("input",t=>{this.dispatchEvent(new CustomEvent("change",{detail:{value:t.target.value}}))}),e(this,i).addEventListener("focus",t=>{this.dispatchEvent(new CustomEvent("focus",{detail:{value:t.target.value}}))}),e(this,i).addEventListener("blur",t=>{this.dispatchEvent(new CustomEvent("blur",{detail:{value:t.target.value}}))})}connectedCallback(){this.init(),u(this,l,!0)}}h=new WeakMap,i=new WeakMap,l=new WeakMap;window.customElements.get("ea-textarea")||window.customElements.define("ea-textarea",x);export{x as EaTextarea};
