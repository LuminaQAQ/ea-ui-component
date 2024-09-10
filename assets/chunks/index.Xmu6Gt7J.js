var b=(r,e,t)=>{if(!e.has(r))throw TypeError("Cannot "+t)};var n=(r,e,t)=>(b(r,e,"read from private field"),t?t.call(r):e.get(r)),c=(r,e,t)=>{if(e.has(r))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(r):e.set(r,t)},u=(r,e,t,i)=>(b(r,e,"write to private field"),i?i.call(r,t):e.set(r,t),t);import{B as L}from"./Base.LSgLRpFA.js";import"./index.CcHcFfiA.js";import{w as A,t as v}from"./timeout.CMJ_lqqj.js";const E=`
.ea-input_container {
  display: flex;
  align-items: stretch;
  width: 100%;
}
.ea-input_container .ea-input_wrap {
  position: relative;
  display: flex;
  align-items: stretch;
  width: 100%;
}
.ea-input_container .ea-input_wrap .ea-input_inner {
  flex: 1;
  box-sizing: border-box;
  box-shadow: none;
  border: 1px solid #dcdfe6;
  outline: 0;
  border-radius: 3px;
  padding: 0.5rem;
  width: 100%;
  line-height: 0.8;
  font-size: 0.8rem;
  scrollbar-width: none;
}
.ea-input_container .ea-input_wrap .ea-input_inner:focus {
  border-color: #409eff;
}
.ea-input_container .ea-input_wrap .ea-input_inner::placeholder {
  color: #c0c4cc;
}
.ea-input_container .ea-input_wrap .ea-input_inner[aria-invalid=true] {
  border-color: #f56c6c;
}
.ea-input_container .ea-input_wrap .ea-input_inner[disabled] {
  background-color: #eeeeee;
  color: #c0c4cc;
}
.ea-input_container .ea-input_wrap .fix-icon {
  position: absolute;
  top: 50%;
  font-size: 0.8rem;
  line-height: 0.8rem;
}
.ea-input_container .ea-input_wrap.prefix .ea-input_inner {
  padding-left: 1.75rem;
}
.ea-input_container .ea-input_wrap.prefix .prefix-icon {
  left: 1rem;
  transform: translate(-50%, -50%);
}
.ea-input_container .ea-input_wrap.surfix .ea-input_inner {
  padding-right: 1.75rem;
}
.ea-input_container .ea-input_wrap.surfix .surfix-icon {
  right: 1rem;
  transform: translate(50%, -50%);
}
.ea-input_container .ea-input_wrap .ea-input_prepend-slot,
.ea-input_container .ea-input_wrap .ea-input_append-slot {
  height: 100%;
}
.ea-input_container .ea-input_wrap .ea-input_suggestion-wrap {
  list-style-type: none;
  padding: 0;
  margin: 0;
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 0;
  unicode-bidi: unset;
  position: absolute;
  box-sizing: border-box;
  z-index: 3;
  top: calc(100% + 5px);
  left: 0;
  transform-origin: top center;
  transform: scaleY(0);
  padding: 0.5rem 0;
  width: 100%;
  max-height: 10rem;
  overflow-y: auto;
  scrollbar-width: thin;
  background-color: white;
  box-shadow: 0 1px 8px 1px rgba(0, 0, 0, 0.2);
}
.ea-input_container .ea-input_wrap .ea-input_suggestion-wrap li {
  padding: 0.5rem;
  font-size: 0.9rem;
  cursor: pointer;
}
.ea-input_container .ea-input_wrap .ea-input_suggestion-wrap li:hover {
  background-color: #f5f7fa;
}
.ea-input_container .ea-input_wrap .ea-input_suggestion-wrap .loading-icon {
  display: none;
}
.ea-input_container .ea-input_wrap .ea-input_suggestion-wrap.loading {
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ea-input_container .ea-input_wrap .ea-input_suggestion-wrap.loading li {
  display: none;
}
.ea-input_container .ea-input_wrap .ea-input_suggestion-wrap.loading .loading-icon {
  display: block;
}
.ea-input_container .ea-input_wrap .ea-input_suggestion-wrap.is-open {
  transform: scaleY(1);
}
.ea-input_container .ea-input_wrap.word-limit {
  border: 1px solid;
  border-color: #dcdfe6;
  border-radius: 3px;
}
.ea-input_container .ea-input_wrap.word-limit .ea-input_inner {
  border: 0;
}
.ea-input_container .ea-input_wrap.word-limit .ea-input_word-limit {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding-right: 0.5rem;
  font-size: 0.75rem;
  text-align: center;
}
.ea-input_container .ea-input_wrap.focus {
  border-color: #409eff;
}
.ea-input_container .ea-input_wrap.with-transition {
  transition: border 0.3s;
}
.ea-input_container .ea-input_wrap.with-transition .ea-input_inner {
  transition: border 0.3s;
}
.ea-input_container .ea-input_wrap.with-transition  .ea-input_suggestion-wrap {
  transition: transform 0.3s;
}
`;function g(r,e,t){const i=document.createElement("ea-icon");return i.className=`fix-icon ${t}-icon`,i.icon=e,i.part=`${t}-icon`,r.classList.add(t),r.appendChild(i),i}function f(r,e){e?r.style.display="block":r.style.display="none"}function w(r,e,t){e.addEventListener(r,i=>{var o;f(t,(o=i.target)==null?void 0:o.value)})}function I(r,e,t){const i=g(r,t,"surfix");return i.addEventListener("click",()=>{this.value="",e.focus()}),f(i,e.value),w("input",e,i),w("focus",e,i),w("blur",e,i),i}function B(r,e,t){const i=g(r,t,"surfix");return i.addEventListener("click",()=>{e.type=e.type==="password"?"text":"password",i.icon=e.type==="password"?"icon-eye":"icon-eye-off",e.focus()}),e.addEventListener("input",()=>{f(i,e.value)}),f(i,e.value),i}function k(r){const e=document.createElement("span");return e.className="ea-input_word-limit",e.part="word-limit",e.innerText=`${r.value.length}/${this.maxLength}`,r.addEventListener("input",t=>{e.innerText=`${t.target.value.length}/${this.maxLength}`}),e}function _(r){r.classList.remove("is-open")}function x(r,e){const t=this.shadowRoot.querySelector(".ea-input_suggestion-wrap"),i=document.createElement("ul");i.className="ea-input_suggestion-wrap",i.part="suggestion-wrap",e.forEach(l=>{const h=document.createElement("li");h.part="suggestion-item",h.innerText=l.value,h.addEventListener("click",()=>{this.value=l.value,_(i)}),i.appendChild(h)});const o=document.createElement("ea-icon");return o.className="loading-icon",o.icon="icon-spin6 animate-spin",o.part="loading-icon",i.appendChild(o),window.addEventListener("click",l=>{this.contains(l.target)||_(i)}),t&&(t.remove(),i.classList.add("is-open")),r.appendChild(i),i}function m(r,e){this.dispatchEvent(new CustomEvent(e,{detail:{value:r.target.value}}))}function y(r,e){r.querySelectorAll("li").forEach(t=>{t.innerText.includes(e)?t.style.display="block":t.style.display="none"})}function C(r,e){r.addEventListener("input",t=>{const i=Array.from(e.querySelectorAll("li")).some((o,l)=>o.innerText.includes(t.target.value));e.classList.toggle("is-open",i&&t.target.value!=="")})}function S(r,e){e.addEventListener("focus",t=>{r.classList.add("is-open")})}var a,s,p,d;class T extends L{constructor(){super();c(this,a,void 0);c(this,s,void 0);c(this,p,[]);c(this,d,void 0);const t=this.attachShadow({mode:"open"});t.innerHTML=`
            <div class='ea-input_container' part='container'>
                <div class="ea-input_wrap" part="input-wrap">
                    <div class="ea-input_prepend-slot" part="prepend-wrap">
                        <slot name="prepend"></slot>
                    </div>
                    <input class="ea-input_inner" type="text" part="input" autocomplete="off" />
                    <div class="ea-input_append-slot" part="append-wrap">
                        <slot name="append"></slot>
                    </div>
                </div>
            </div>
        `,u(this,a,t.querySelector(".ea-input_wrap")),u(this,s,t.querySelector(".ea-input_inner")),this.build(t,E)}get name(){return this.getAttribute("name")||""}set name(t){this.setAttribute("name",t)}get type(){return this.getAttribute("type")||"text"}set type(t){this.setAttribute("type",t)}get value(){return this.getAttribute("value")||""}set value(t){this.setAttribute("value",t),n(this,s).value=t}get placeholder(){return this.getAttribute("placeholder")||""}set placeholder(t){this.setAttribute("placeholder",t),n(this,s).placeholder=t}get disabled(){return this.getAttrBoolean("disabled")}set disabled(t){this.setAttribute("disabled",t),n(this,s).disabled=t,n(this,s).classList.toggle("disabled",t)}get clearable(){return this.getAttrBoolean("clearable")}set clearable(t){t&&(this.setAttribute("clearable",t),I.call(this,n(this,a),n(this,s),"icon-cancel-circled2"))}get showPassword(){return this.getAttrBoolean("show-password")}set showPassword(t){t&&(this.setAttribute("show-password",t),n(this,s).type="password",B(n(this,a),n(this,s),"icon-eye"))}get prefixIcon(){return this.getAttribute("prefix-icon")||""}set prefixIcon(t){t&&(this.setAttribute("prefix",t),g(n(this,a),t,"prefix"))}get surfixIcon(){return this.getAttribute("suffix-icon")||""}set surfixIcon(t){t&&(this.setAttribute("suffix",t),g(n(this,a),t,"surfix"))}get suggestion(){return n(this,p)}set suggestion(t){if(!t||!(t instanceof Array))return;u(this,p,t);const i=x.call(this,n(this,a),t);n(this,s).addEventListener("input",o=>{y(i,o.target.value)}),this.triggerAfterInput?C(n(this,s),i):S(i,n(this,s)),y(i,n(this,s).value),n(this,a).appendChild(i),u(this,d,i)}get triggerOnFocus(){return this.getAttrBoolean("trigger-on-focus")}set triggerOnFocus(t){t&&this.setAttribute("trigger-on-focus",t)}get triggerAfterInput(){return this.getAttrBoolean("trigger-after-input")}set triggerAfterInput(t){t&&this.setAttribute("trigger-after-input",t)}get remote(){return this.getAttrBoolean("remote")}set remote(t){this.setAttribute("remote",t);const i=x.call(this,n(this,a),n(this,p));i.classList.toggle("loading",t),n(this,s).addEventListener("focus",()=>{i.classList.add("is-open")}),u(this,d,i)}get maxLength(){return this.getAttribute("max-length")}set maxLength(t){!t||n(this,s).type!=="text"||(this.setAttribute("max-length",t),n(this,s).maxLength=t,this.showWordLimit&&(this.showWordLimit=!0))}get minLength(){return this.getAttribute("min-length")}set minLength(t){!t||n(this,s).type!=="text"||(this.setAttribute("min-length",t),n(this,s).minLength=t,n(this,s).addEventListener("input",i=>{n(this,s).ariaInvalid=i.target.value.length<t}))}get showWordLimit(){return this.getAttrBoolean("show-word-limit")}set showWordLimit(t){if(!t||n(this,s).type!=="text")return;this.setAttribute("show-word-limit",t);const i=k.call(this,n(this,s));n(this,a).classList.toggle("word-limit",t),n(this,a).appendChild(i),n(this,s).addEventListener("focus",o=>{n(this,a).classList.add("focus")}),n(this,s).addEventListener("blur",o=>{n(this,a).classList.remove("focus")})}get readonly(){return this.getAttrBoolean("readonly")}set readonly(t){t&&(this.setAttribute("readonly",t),n(this,s).readOnly=t)}focus(){n(this,s).focus()}blur(){n(this,s).blur()}connectedCallback(){this.setAttribute("data-ea-component",!0),this.name=this.name,this.type=this.type,this.placeholder=this.placeholder,this.value=this.value,this.disabled=this.disabled,this.clearable=this.clearable,this.clearable||(this.showPassword=this.showPassword),this.prefixIcon=this.prefixIcon,!this.clearable&&!this.showPassword&&(this.surfixIcon=this.surfixIcon),this.triggerOnFocus=this.triggerOnFocus,this.triggerAfterInput=this.triggerAfterInput,this.remote&&(this.remote=this.remote),this.maxLength=this.maxLength,this.minLength=this.minLength,this.readonly=this.readonly,n(this,s).addEventListener("input",t=>{this.value=t.target.value,m.call(this,t,"change")}),n(this,s).addEventListener("focus",t=>{m.call(this,t,"focus")}),n(this,s).addEventListener("blur",t=>{m.call(this,t,"blur")}),A(n(this,a)),v(()=>{this.dispatchEvent(new CustomEvent("ready",{bubbles:!0}))},0)}}a=new WeakMap,s=new WeakMap,p=new WeakMap,d=new WeakMap;window.customElements.get("ea-input")||window.customElements.define("ea-input",T);export{T as EaInput};
