var E=(r,s,e)=>{if(!s.has(r))throw TypeError("Cannot "+e)};var t=(r,s,e)=>(E(r,s,"read from private field"),e?e.call(r):s.get(r)),a=(r,s,e)=>{if(s.has(r))throw TypeError("Cannot add the same private member more than once");s instanceof WeakSet?s.add(r):s.set(r,e)},w=(r,s,e,u)=>(E(r,s,"write to private field"),u?u.call(r,e):s.set(r,e),e);var n=(r,s,e)=>(E(r,s,"access private method"),e);import{B as z}from"./Base.LSgLRpFA.js";const k=`
.ea-input-number_wrap {
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 3px;
  transition: border 0.2s;
}
.ea-input-number_wrap .ea-input-number_sign {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border: 1px solid #dcdfe6;
  background-color: #f5f7fa;
  height: 2rem;
  width: 2rem;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  user-select: none;
}
.ea-input-number_wrap .ea-input-number_sign:first-child {
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  border-right: 0;
}
.ea-input-number_wrap .ea-input-number_sign:last-child {
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  border-left: 0;
}
.ea-input-number_wrap .ea-input-number_sign:hover {
  color: #409eff;
}
.ea-input-number_wrap .ea-input-number_sign.disabled {
  pointer-events: none;
  cursor: not-allowed;
  color: #c0c4cc;
}
.ea-input-number_wrap .ea-input-number_inner {
  box-sizing: border-box;
  box-shadow: none;
  border: 1px solid #dcdfe6;
  outline: 0;
  transition: border 0.2s;
  border-radius: 3px;
  padding: 0.5rem;
  line-height: 0.8;
  font-size: 0.8rem;
  scrollbar-width: none;
  width: 5rem;
  height: 2rem;
  border-radius: 0;
  text-align: center;
}
.ea-input-number_wrap .ea-input-number_inner:focus {
  border-color: #409eff;
}
.ea-input-number_wrap .ea-input-number_inner::placeholder {
  color: #c0c4cc;
}
.ea-input-number_wrap .ea-input-number_inner.invalid {
  border-color: #f56c6c;
}
.ea-input-number_wrap .ea-input-number_inner.disabled {
  background-color: #eeeeee;
  color: #c0c4cc;
}
.ea-input-number_wrap .ea-input-number_inner.ea-input_clear ::before {
  content: "e9c3";
  display: block;
}
.ea-input-number_wrap .ea-input-number_inner:focus {
  border-color: #dcdfe6;
}
.ea-input-number_wrap .ea-input-number_inner.disabled {
  pointer-events: none;
  cursor: not-allowed;
  color: #c0c4cc;
  background-color: #f5f7fa;
}
.ea-input-number_wrap.focus {
  border: 1px solid #409eff;
}
.ea-input-number_wrap.focus .ea-input-number_sign {
  border-color: transparent;
}
.ea-input-number_wrap.disabled {
  pointer-events: none;
  cursor: not-allowed;
}
.ea-input-number_wrap.disabled .ea-input-number_sign,
.ea-input-number_wrap.disabled .ea-input-number_inner {
  color: #c0c4cc;
  border-color: #dcdfe6;
}
.ea-input-number_wrap.ea-input-number--medium .ea-input-number_sign {
  height: 1.75rem;
  width: 1.75rem;
}
.ea-input-number_wrap.ea-input-number--medium .ea-input-number_inner {
  height: 1.75rem;
  line-height: 1.75rem;
}
.ea-input-number_wrap.ea-input-number--small .ea-input-number_sign {
  height: 1.5rem;
  width: 1.5rem;
}
.ea-input-number_wrap.ea-input-number--small .ea-input-number_inner {
  height: 1.5rem;
  line-height: 1.5rem;
}
.ea-input-number_wrap.ea-input-number--mini .ea-input-number_sign {
  height: 1.25rem;
  width: 1.25rem;
}
.ea-input-number_wrap.ea-input-number--mini .ea-input-number_inner {
  height: 1.25rem;
  line-height: 1.25rem;
}
`;function I(r,s){this.dispatchEvent(new CustomEvent(r,{detail:s}))}var h,i,d,b,_,A,x,L,p,g,m,f,c,v;class S extends z{constructor(){super();a(this,_);a(this,x);a(this,p);a(this,m);a(this,c);a(this,h,void 0);a(this,i,void 0);a(this,d,void 0);a(this,b,void 0);const e=this.attachShadow({mode:"open"});e.innerHTML=`
            <div class="ea-input-number_wrap" part="container">
                <span class="ea-input-number_sign minus" part="minus-wrap">-</span>
                <input class="ea-input-number_inner" part="input" type="text" />
                <span class="ea-input-number_sign plus" part="plus-wrap">+</span>
            </div>
        `,w(this,h,e.querySelector(".ea-input-number_wrap")),w(this,i,e.querySelector(".ea-input-number_inner")),w(this,d,e.querySelector(".minus")),w(this,b,e.querySelector(".plus")),this.build(e,k)}get value(){return Number(this.getAttribute("value"))||0}set value(e){e=this.precision?Number(e).toFixed(this.precision):Number(e),this.setAttribute("value",e),t(this,i).value=e}get disabled(){return this.getAttrBoolean("disabled")}set disabled(e){this.toggleAttr("disabled",e),t(this,i).disabled=e,t(this,h).classList.toggle("disabled",e),this.style.cursor=e?"not-allowed":"pointer"}get readonly(){return this.getAttrBoolean("readonly")}set readonly(e){e&&(t(this,i).readOnly=e)}get step(){return this.getAttrNumber("step")||1}set step(e){e&&this.setAttribute("step",e)}get stepStrictly(){return this.getAttrBoolean("step-strictly")}set stepStrictly(e){this.toggleAttr("step-strictly",e)}get min(){return this.getAttrNumber("min")||-1/0}set min(e){!Number.isNaN(e)||Number.isFinite(e)||this.setAttribute("min",e)}get max(){return this.getAttrNumber("max")||1/0}set max(e){e&&this.setAttribute("max",e)}get precision(){const e=this.getAttrNumber("precision");return e<0||!Number.isInteger(e)?0:e}set precision(e){e&&this.setAttribute("precision",e)}get sizeType(){return["medium","small","mini"]}get size(){const e=this.getAttribute("size");return this.sizeType.includes(e)?e:"medium"}set size(e){this.setAttribute("size",e),t(this,h).classList.add(`ea-input-number--${e}`)}connectedCallback(){this.style.display="inline-block",this.disabled=this.disabled,this.readonly=this.readonly,this.size=this.size,this.value=this.value,this.min!==-1/0&&(this.value=this.min),n(this,p,g).call(this),t(this,i).addEventListener("focus",e=>{t(this,h).classList.add("focus"),n(this,c,v).call(this,"focus")}),t(this,i).addEventListener("blur",e=>{if(t(this,h).classList.remove("focus"),this.stepStrictly){const u=that.step,o=Number(t(that,i).value),l=o%u;o<0&&l!==0?t(that,i).value=o-l-u:o<0&&l===0||l===0?t(that,i).value=o:t(this,i).value=o-l+u}n(this,p,g).call(this),n(this,c,v).call(this,"blur")}),t(this,d).addEventListener("click",()=>{n(this,m,f).call(this),n(this,_,A).call(this,"minus",this.precision,"minus")}),t(this,b).addEventListener("click",()=>{n(this,m,f).call(this),n(this,_,A).call(this,"plus",this.precision,"plus")}),t(this,d).addEventListener("mousedown",()=>{n(this,m,f).call(this),n(this,x,L).call(this,"minus",this.precision)}),t(this,b).addEventListener("mousedown",()=>{n(this,m,f).call(this),n(this,x,L).call(this,"plus",this.precision)}),t(this,i).addEventListener("input",()=>{n(this,m,f).call(this),n(this,p,g).call(this),n(this,c,v).call(this,"change")})}}h=new WeakMap,i=new WeakMap,d=new WeakMap,b=new WeakMap,_=new WeakSet,A=function(e,u,o){if(this.getAttrBoolean("disabled"))return;const l=Number(t(this,i).value),y=t(this,i).value.split(".")[1],N=e==="minus"?l-this.step:l+this.step;u?t(this,i).value=N.toFixed(u):y!=null&&y.length?t(this,i).value=N.toFixed(y.length):t(this,i).value=N,n(this,p,g).call(this),o&&n(this,c,v).call(this,"change",N)},x=new WeakSet,L=function(e){let u=setInterval(()=>{n(this,_,A).call(this,e,this.precision),n(this,p,g).call(this)},100);this.addEventListener("mouseup",function(){clearInterval(u),u=null})},p=new WeakSet,g=function(){this.min===!1&&this.max===!1||(this.min!==void 0&&t(this,i).value<this.min?t(this,i).value=this.min:this.max!==void 0&&t(this,i).value>this.max&&(t(this,i).value=this.max),t(this,d).classList.toggle("disabled",t(this,i).value==this.min),t(this,b).classList.toggle("disabled",t(this,i).value==this.max))},m=new WeakSet,f=function(){isNaN(Number(t(this,i).value))?t(this,i).value=this.value:this.value=Number(t(this,i).value)},c=new WeakSet,v=function(e,u=this.value){I.call(this,e,{value:u})};window.customElements.get("ea-input-number")||window.customElements.define("ea-input-number",S);export{S as EaInputNumber};
