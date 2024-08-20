var v=(r,n,t)=>{if(!n.has(r))throw TypeError("Cannot "+t)};var e=(r,n,t)=>(v(r,n,"read from private field"),t?t.call(r):n.get(r)),a=(r,n,t)=>{if(n.has(r))throw TypeError("Cannot add the same private member more than once");n instanceof WeakSet?n.add(r):n.set(r,t)},l=(r,n,t,i)=>(v(r,n,"write to private field"),i?i.call(r,t):n.set(r,t),t);import{B as L}from"./Base.yCeCPjNm.js";import"./index.DhjvHksS.js";import"./createElement.BM9xfELw.js";const _=`
@import url('/ea_ui_component/icon/index.css');

:host {
  --border-top-left-radius: 0;
  --border-top-right-radius: 0;
  --border-bottom-left-radius: 0;
  --border-bottom-right-radius: 0;
  --border-left-width: 0;
  --border-right-width: 0;
}

.ea-input_wrap {
  position: relative;
  width: 100%;
}
.ea-input_wrap .ea-input_inner {
  box-sizing: border-box;
  box-shadow: none;
  border: 1px solid #dcdfe6;
  outline: 0;
  transition: border 0.2s;
  border-radius: 3px;
  padding: 0.5rem;
  width: 100%;
  line-height: 0.8;
  font-size: 0.8rem;
  scrollbar-width: none;
}
.ea-input_wrap .ea-input_inner:focus {
  border-color: #409eff;
}
.ea-input_wrap .ea-input_inner::placeholder {
  color: #c0c4cc;
}
.ea-input_wrap .ea-input_inner.invalid {
  border-color: #f56c6c;
}
.ea-input_wrap .ea-input_inner.disabled {
  background-color: #eeeeee;
  color: #c0c4cc;
}
.ea-input_wrap .ea-input_inner.ea-input_clear ::before {
  content: "e9c3";
  display: block;
}
.ea-input_wrap i {
  font-size: 0.9rem;
  line-height: 0.8;
}
.ea-input_wrap i[class=icon-cancel-circled2],
.ea-input_wrap i[class=icon-eye],
.ea-input_wrap i[class=icon-eye-off] {
  position: absolute;
  left: calc(100% - 1.75rem);
  top: 50%;
  color: #c0c4cc;
  transform: translate(calc(-100% - 0.25rem), -50%);
}
.ea-input_wrap.clearable .ea-input_inner, .ea-input_wrap.password .ea-input_inner {
  width: calc(100% - 1.75rem);
  padding-right: 1.75rem;
}
.ea-input_wrap.prefix i, .ea-input_wrap.suffix i {
  position: absolute;
  top: 50%;
  color: #c0c4cc;
}
.ea-input_wrap.prefix i {
  left: 2.5%;
  transform: translate(-2.5%, -50%);
}
.ea-input_wrap.prefix .ea-input_inner {
  padding-left: 1.75rem;
}
.ea-input_wrap.suffix i {
  left: calc(100% - 1.75rem);
  transform: translate(calc(-100% - 0.25rem), -50%);
}
.ea-input_wrap.suffix .ea-input_inner {
  padding-right: 1.75rem;
}
.ea-input_wrap.prepend-slot, .ea-input_wrap.append-slot {
  display: flex;
  align-items: center;
  font-size: 0.925rem;
  line-height: 1;
}
.ea-input_wrap.prepend-slot ::slotted(div), .ea-input_wrap.append-slot ::slotted(div) {
  border: 1px solid #dcdfe6;
  border-left-width: var(--border-left-width);
  border-right-width: var(--border-right-width);
  border-top-right-radius: var(--border-top-right-radius);
  border-bottom-right-radius: var(--border-bottom-right-radius);
  border-top-left-radius: var(--border-top-left-radius);
  border-bottom-left-radius: var(--border-bottom-left-radius);
}
.ea-input_wrap.prepend-slot .ea-input_inner {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.ea-input_wrap.append-slot .ea-input_inner {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.ea-input_wrap .ea-input_suggestion-wrap {
  list-style-type: none;
  padding: 0;
  margin: 0;
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 0;
  unicode-bidi: unset;
  display: none;
  position: absolute;
  box-sizing: border-box;
  z-index: 3;
  top: calc(100% + 5px);
  left: 0;
  padding: 0.5rem 0;
  width: 100%;
  max-height: 10rem;
  overflow-y: auto;
  scrollbar-width: thin;
  background-color: white;
  box-shadow: 0 1px 8px 1px rgba(0, 0, 0, 0.2);
}
.ea-input_wrap .ea-input_suggestion-wrap li {
  padding: 0.5rem;
  font-size: 0.9rem;
  cursor: pointer;
}
.ea-input_wrap .ea-input_suggestion-wrap li:hover {
  background-color: #f5f7fa;
}
.ea-input_wrap .ea-input_suggestion-wrap.loading {
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ea-input_wrap .ea-input_suggestion-wrap.loading::after {
  font-family: "fontello";
  font-style: normal;
  font-weight: normal;
  speak: never;
  display: inline-block;
  text-decoration: inherit;
  width: 1em;
  margin-right: 0.2em;
  text-align: center;
  font-variant: normal;
  text-transform: none;
  line-height: 1em;
  margin-left: 0.2em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: "e839";
  font-size: 1.5rem;
  animation: spin 1s linear infinite;
  animation-play-state: running;
}
.ea-input_wrap.word-limit {
  border: 1px solid #dcdfe6;
  border-radius: 3px;
}
.ea-input_wrap.word-limit .ea-input_inner {
  border: 0;
  width: calc(100% - 3rem);
}
.ea-input_wrap.word-limit .ea-input_word-limit {
  padding-right: 0.5rem;
  width: 2.5rem;
  font-size: 0.75rem;
  text-align: center;
}
`,A=r=>{const n=document.createElement("input");return n.className="ea-input_inner",n.type=r||"text",n.autocomplete="off",n},E=()=>{const r=document.createElement("ul");return r.className="ea-input_suggestion-wrap",r},I=r=>{const n=document.createElement("slot");return n.name=r,n};var d,s,h,c,u,m,p,w,f;class Z extends L{constructor(){super();a(this,d,void 0);a(this,s,void 0);a(this,h,void 0);a(this,c,void 0);a(this,u,!1);a(this,m,[]);a(this,p,void 0);a(this,w,void 0);a(this,f,void 0);const t=this.attachShadow({mode:"open"}),i=document.createElement("div");i.className="ea-input_wrap";const o=A(this.type),y=I("prepend"),x=I("append"),g=this.querySelector("[slot=prepend]"),b=this.querySelector("[slot=append]");g&&(i.classList.add("prepend-slot"),g.style.setProperty("--border-top-left-radius","3px"),g.style.setProperty("--border-bottom-left-radius","3px"),g.style.setProperty("--border-right-width","0"),g.style.setProperty("--border-left-width","1px"),y.appendChild(g.cloneNode(!0))),b&&(i.classList.add("append-slot"),b.style.setProperty("--border-top-right-radius","3px"),b.style.setProperty("--border-bottom-right-radius","3px"),b.style.setProperty("--border-left-width","0"),b.style.setProperty("--border-right-width","1px"),x.appendChild(b.cloneNode(!0))),i.appendChild(o),i.insertBefore(y,o),i.appendChild(x),l(this,d,i),l(this,s,o),l(this,w,y),l(this,f,x),(this.suggestion.length>0||this.remote)&&this.suggestionEvent(),this.setIconFile(new URL("data:text/css;base64,QGltcG9ydCAiLi4vZWEtaWNvbi9jc3MvZm9udGVsbG8uY3NzIjsNCkBpbXBvcnQgIi4uL2VhLWljb24vY3NzL2FuaW1hdGlvbi5jc3MiOw0KQGZvbnQtZmFjZSB7DQogIGZvbnQtc2l6ZTogMXJlbTsNCiAgZm9udC1zaXplOiAxNnB4Ow0KICBmb250LWZhbWlseTogIlNlZ29lIFVJIiwgVGFob21hLCBHZW5ldmEsIFZlcmRhbmEsIHNhbnMtc2VyaWY7DQogIHNyYzogdXJsKCIuLi9lYS1pY29uL2ZvbnQvZm9udGVsbG8uZW90IikgZm9ybWF0KCJlbWJlZGRlZC1vcGVudHlwZSIpLCB1cmwoIi4uL2VhLWljb24vZm9udC9mb250ZWxsby50dGYiKSBmb3JtYXQoInRydWV0eXBlIiksIHVybCgiLi4vZWEtaWNvbi9mb250L2ZvbnRlbGxvLndvZmYiKSBmb3JtYXQoIndvZmYiKSwgdXJsKCIuLi9lYS1pY29uL2ZvbnQvZm9udGVsbG8ud29mZjIiKSBmb3JtYXQoIndvZmYyIiksIHVybCgiLi4vZWEtaWNvbi9mb250L2ZvbnRlbGxvLnN2ZyIpIGZvcm1hdCgic3ZnIik7DQp9",import.meta.url).href),this.build(t,_),this.shadowRoot.appendChild(i)}get name(){return this.getAttribute("name")||""}set name(t){this.setAttribute("name",t)}get type(){return this.getAttribute("type")||"text"}set type(t){this.setAttribute("type",t)}get value(){return e(this,u)||(e(this,s).value=this.getAttribute("value")||""),e(this,s).value}set value(t){this.setAttribute("value",t),e(this,s).value=t}get placeholder(){return this.getAttribute("placeholder")||""}set placeholder(t){this.setAttribute("placeholder",t),e(this,s).placeholder=t}get disabled(){return this.getAttrBoolean("disabled")}set disabled(t){this.toggleAttr("disabled",t),e(this,s).disabled=t,e(this,s).classList.toggle("disabled",t)}get clearable(){return this.getAttrBoolean("clearable")}set clearable(t){t&&this.setAttribute("clearable",t)}clearableEvent(t){this.clearable&&(this.clearable&&t.target.value!==""?e(this,h).style.display="block":e(this,h).style.display="none")}initClearableIcon(){if(this.clearable){const t=this.iconInit("icon-cancel-circled2");t.addEventListener("click",()=>{this.value="",e(this,s).focus()}),l(this,h,t),this.value?e(this,h).style.display="block":e(this,h).style.display="none",this.iconAppend("clearable",this.clearable,t)}}get showPassword(){return this.getAttrBoolean("show-password")}set showPassword(t){t&&(this.setAttribute("show-password",t),t&&(e(this,s).type="password"))}showPasswordEvent(t){this.showPassword&&(this.showPassword&&t.target.value!==""?e(this,c).style.display="block":e(this,c).style.display="none")}initShowPasswordIcon(){if(this.showPassword){const t=this.iconInit("icon-eye");this.value||(t.style.display="none"),t.addEventListener("click",i=>{e(this,c).className=e(this,s).type==="password"?"icon-eye-off":"icon-eye",e(this,s).type=e(this,s).type==="password"?"text":"password",e(this,s).focus()}),l(this,c,t),this.iconAppend("password",this.showPassword,t)}}get prefixIcon(){return this.getAttribute("prefix-icon")||""}set prefixIcon(t){if(!t)return;this.setAttribute("prefix",t);const i=this.iconInit(t);this.iconAppend("prefix",!0,i)}get surfixIcon(){return this.getAttribute("suffix-icon")||""}set surfixIcon(t){if(!t)return;this.setAttribute("suffix",t);const i=this.iconInit(t);this.iconAppend("suffix",!0,i)}get suggestion(){return e(this,m)}set suggestion(t){t&&l(this,m,t)}get triggerOnFocus(){return this.getAttrBoolean("trigger-on-focus")}set triggerOnFocus(t){t&&this.setAttribute("trigger-on-focus",t)}get triggerAfterInput(){return this.getAttrBoolean("trigger-after-input")}set triggerAfterInput(t){t&&this.setAttribute("trigger-after-input",t)}get remote(){return this.getAttrBoolean("remote")}set remote(t){if(t!=null)try{const i=e(this,p).style.display;i=="flex"?e(this,p).style.display="block":i==""&&(e(this,p).style.display="none"),e(this,p).classList.toggle("loading",t),this.setAttribute("remote",t),e(this,u)&&this.refresh()}catch{}}refresh(){try{e(this,p).innerHTML="",this.suggestionEvent()}catch{}}suggestionEvent(){const t=e(this,u)?e(this,p):E();this.suggestion.forEach(i=>{const o=document.createElement("li");o.innerText=i.value,o.addEventListener("click",()=>{this.value=i.value,t.style.display="none"}),t.appendChild(o)}),document.addEventListener("click",i=>{i.target!==this&&(t.style.display="none")}),e(this,s).addEventListener("input",i=>{this.shadowRoot.querySelectorAll("li").forEach(o=>{o.innerText.includes(i.target.value)?o.style.display="block":o.style.display="none"})}),this.triggerOnFocus?e(this,s).addEventListener("focus",i=>{t.style.display=this.remote?"flex":"block"}):this.triggerAfterInput&&e(this,s).addEventListener("input",i=>{i.target.value.length>0?t.style.display="block":t.style.display="none"}),e(this,u)||(l(this,p,t),e(this,d).appendChild(t))}get maxLength(){return this.getAttribute("max-length")}set maxLength(t){!t||e(this,s).type!=="text"||(this.setAttribute("max-length",t),e(this,s).maxLength=t,e(this,s).addEventListener("input",i=>{i.target.value.length>t&&(i.target.value=i.target.value.slice(0,t))}),this.showWordLimit&&(this.showWordLimit=!0))}get minLength(){return this.getAttribute("min-length")}set minLength(t){!t||e(this,s).type!=="text"||(this.setAttribute("min-length",t),e(this,s).minLength=t,e(this,s).addEventListener("input",i=>{i.target.value.length<t?i.target.classList.add("invalid"):i.target.classList.remove("invalid")}))}get showWordLimit(){return this.getAttrBoolean("show-word-limit")}set showWordLimit(t){if(!t||e(this,s).type!=="text")return;this.setAttribute("show-word-limit",t);const i=document.createElement("span");e(this,d).classList.toggle("word-limit",t),e(this,d).classList.toggle("append-slot",t),i.className="ea-input_word-limit",i.innerText=`${e(this,s).value.length}/${this.maxLength}`,e(this,s).addEventListener("input",o=>{i.innerText=`${o.target.value.length}/${this.maxLength}`}),e(this,f).appendChild(i),e(this,d).appendChild(i)}get readonly(){return this.getAttrBoolean("readonly")}set readonly(t){t!=null&&(this.setAttribute("readonly",t),e(this,s).readOnly=t)}get isInvalid(){return this.getAttrBoolean("is-invalid")}set isInvalid(t){this.setAttribute("is-invalid",t),e(this,s).classList.toggle("invalid",t)}iconInit(t){const i=document.createElement("i");return i.className=t,i}iconAppend(t,i,o){e(this,d).classList.toggle(t,i),e(this,d).appendChild(o)}eventInit(t,i){this.dispatchEvent(new CustomEvent(i,{detail:{value:t.target.value}})),this.clearableEvent(t),this.showPasswordEvent(t)}init(){this.name=this.name,this.type=this.type,this.placeholder=this.placeholder,this.value=this.value,this.disabled=this.disabled,this.clearable=this.clearable,this.initClearableIcon(),this.showPassword=this.showPassword,this.initShowPasswordIcon(),this.prefixIcon=this.prefixIcon,this.surfixIcon=this.surfixIcon,this.suggestion=this.suggestion,this.remote&&(this.remote=this.remote),this.maxLength=this.maxLength,this.minLength=this.minLength,this.readonly=this.readonly,e(this,s).addEventListener("input",t=>{this.eventInit(t,"change")}),e(this,s).addEventListener("focus",t=>{this.eventInit(t,"focus")}),e(this,s).addEventListener("blur",t=>{this.eventInit(t,"blur")}),this.setAttribute("data-ea-component",!0)}connectedCallback(){this.init(),l(this,u,!0)}}d=new WeakMap,s=new WeakMap,h=new WeakMap,c=new WeakMap,u=new WeakMap,m=new WeakMap,p=new WeakMap,w=new WeakMap,f=new WeakMap;window.customElements.get("ea-input")||window.customElements.define("ea-input",Z);export{Z as EaInput};
