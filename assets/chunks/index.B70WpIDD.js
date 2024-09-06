var x=(s,r,t)=>{if(!r.has(s))throw TypeError("Cannot "+t)};var i=(s,r,t)=>(x(s,r,"read from private field"),t?t.call(s):r.get(s)),d=(s,r,t)=>{if(r.has(s))throw TypeError("Cannot add the same private member more than once");r instanceof WeakSet?r.add(s):r.set(s,t)},b=(s,r,t,a)=>(x(s,r,"write to private field"),a?a.call(s,t):r.set(s,t),t);var h=(s,r,t)=>(x(s,r,"access private method"),t);import{B as p}from"./Base.LSgLRpFA.js";const f=`
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
.ea-textarea_wrap .ea-textarea_inner:disabled {
  background-color: #eeeeee;
  color: #c0c4cc;
}
.ea-textarea_wrap .ea-textarea_inner:invalid {
  border-color: #f56c6c;
}
.ea-textarea_wrap .ea-input_word-limit {
  position: absolute;
  font-size: 0.75rem;
  bottom: 0.5rem;
  right: 0.5rem;
}
`;var m,e,n,o,l,c;class L extends p{constructor(){super();d(this,n);d(this,l);d(this,m,void 0);d(this,e,void 0);const t=this.attachShadow({mode:"open"});t.innerHTML=`
            <div class="ea-textarea_wrap" part="container">
                <textarea class="ea-textarea_inner" part="textarea" placeholder="请输入内容"></textarea>
            </div>
        `,b(this,m,t.querySelector(".ea-textarea_wrap")),b(this,e,t.querySelector(".ea-textarea_inner")),this.build(t,f)}get name(){return this.getAttribute("name")||"ea-textarea"}set name(t){this.setAttribute("name",t)}get value(){return i(this,e).value}set value(t){i(this,e).value=t}get disabled(){return this.getAttrBoolean("disabled")}set disabled(t){this.toggleAttr("disabled",t),i(this,e).disabled=t}get placeholder(){return this.getAttribute("placeholder")||""}set placeholder(t){t&&(this.setAttribute("placeholder",t),i(this,e).placeholder=t)}get rows(){return this.getAttribute("rows")||2}set rows(t){this.setAttribute("rows",t),i(this,e).rows=t}get autosize(){return this.getAttrBoolean("autosize")}set autosize(t){t&&(this.setAttribute("autosize",t),i(this,e).addEventListener("input",a=>{if(i(this,e).style.height!==i(this,e).scrollHeight+"px"&&(i(this,e).style.height=i(this,e).scrollHeight+"px",i(this,e).style.minHeight=i(this,e).scrollHeight+"px"),a.target.type==="textarea"){const u=i(this,e).cols,g=a.target.value.length;let w=Math.ceil(g/u)<=Number(i(this,e).rows)?Number(i(this,e).rows):Math.ceil(g/u);g%u==1&&(this.minRows>w?h(this,n,o).call(this,this.minRows):this.maxRows<w?h(this,n,o).call(this,this.maxRows):h(this,n,o).call(this,w))}}))}get minRows(){const t=this.getAttrNumber("min-rows");return t!==0&&t>0?t:0}set minRows(t){t&&(this.setAttribute("min-rows",t),h(this,n,o).call(this,Number(t)))}get maxRows(){const t=Number(this.getAttribute("max-rows"));return t!==0&&t>0?t:0}set maxRows(t){t&&(this.setAttribute("max-rows",t),h(this,n,o).call(this,Number(t)))}get maxLength(){return this.getAttribute("max-length")}set maxLength(t){t&&(this.setAttribute("max-length",t),i(this,e).maxLength=t,this.showWordLimit&&(this.showWordLimit=!0))}get minLength(){return this.getAttribute("min-length")}set minLength(t){t&&(this.setAttribute("min-length",t),i(this,e).minLength=t)}get showWordLimit(){return this.getAttrBoolean("show-word-limit")}set showWordLimit(t){if(!t)return;this.setAttribute("show-word-limit",t);const a=document.createElement("span");a.className="ea-input_word-limit",a.innerText=`${i(this,e).value.length}/${this.maxLength}`,i(this,e).addEventListener("input",u=>{a.innerText=`${u.target.value.length}/${this.maxLength}`}),i(this,m).appendChild(a),a.style.left=i(this,e).getBoundingClientRect().width-a.getBoundingClientRect().width-5+"px"}connectedCallback(){this.setAttribute("data-ea-component",!0),this.name=this.name,this.placeholder=this.placeholder,this.value=this.value,i(this,e).value=this.getAttribute("value")||"",this.disabled=this.disabled,this.autosize=this.autosize,this.maxRows&&(this.maxRows=this.maxRows),this.minRows&&(this.minRows=this.minRows),this.rows=this.rows,this.maxLength=this.maxLength,this.minLength=this.minLength,i(this,e).addEventListener("input",t=>{h(this,l,c).call(this,"change",t)}),i(this,e).addEventListener("focus",t=>{h(this,l,c).call(this,"focus",t)}),i(this,e).addEventListener("blur",t=>{h(this,l,c).call(this,"blur",t)})}}m=new WeakMap,e=new WeakMap,n=new WeakSet,o=function(t){t=Number(t),i(this,e).rows=t},l=new WeakSet,c=function(t,a){this.dispatchEvent(new CustomEvent(t,{detail:{value:a.target.value}}))};window.customElements.get("ea-textarea")||window.customElements.define("ea-textarea",L);export{L as EaTextarea};
