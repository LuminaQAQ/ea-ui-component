var g=(t,r,e)=>{if(!r.has(t))throw TypeError("Cannot "+e)};var l=(t,r,e)=>(g(t,r,"read from private field"),e?e.call(t):r.get(t)),f=(t,r,e)=>{if(r.has(t))throw TypeError("Cannot add the same private member more than once");r instanceof WeakSet?r.add(t):r.set(t,e)},d=(t,r,e,a)=>(g(t,r,"write to private field"),a?a.call(t,e):r.set(t,e),e);import{B as b}from"./Base.LSgLRpFA.js";import"./index.CQU1UkII.js";import{w as _,t as q}from"./timeout.CMJ_lqqj.js";import"./index.YqKkBJbz.js";const h={required(t){return typeof t=="string"?t!=="":Array.isArray(t)?t.length>0:!1},min(t,r){return t.length>=r},max(t,r){return t.length<=r},reg(t,r){return r.test(t)}},v=`
.ea-form-item_wrap {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 22px;
}
.ea-form-item_wrap .ea-form-item_label-wrap {
  text-align: right;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  box-sizing: border-box;
}
.ea-form-item_wrap .ea-form-item_content-wrap {
  position: relative;
  display: flex;
  flex-direction: column;
}
.ea-form-item_wrap .ea-form-item_content-wrap .ea-form-item_invalid-wrap {
  position: absolute;
  bottom: 0;
  left: 0;
  transform-origin: top center;
  transform: translateY(100%) scaleY(0);
  font-size: 12px;
  color: #f56c6c;
  white-space: nowrap;
}
.ea-form-item_wrap.is-required-star .ea-form-item_label-wrap::before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
.ea-form-item_wrap.is-required .ea-form-item_content-wrap .ea-form-item_invalid-wrap {
  transform: translateY(100%) scaleY(1);
}
.ea-form-item_wrap.is-required .ea-form-item_label-wrap {
  color: #f56c6c;
}
.ea-form-item_wrap.is-required ::slotted(ea-input),
.ea-form-item_wrap.is-required ::slotted(ea-select),
.ea-form-item_wrap.is-required ::slotted(ea-textarea),
.ea-form-item_wrap.is-required ::slotted(ea-time-picker),
.ea-form-item_wrap.is-required ::slotted(ea-date-picker) {
  border-color: #f56c6c;
}
.ea-form-item_wrap ::slotted(ea-input),
.ea-form-item_wrap ::slotted(ea-select),
.ea-form-item_wrap ::slotted(ea-textarea),
.ea-form-item_wrap ::slotted(ea-time-picker),
.ea-form-item_wrap ::slotted(ea-date-picker) {
  border: 1px solid transparent;
  border-radius: 3px;
}
.ea-form-item_wrap.with-transition .ea-form-item_content-wrap .ea-form-item_invalid-wrap {
  transition: transform 0.3s;
}
.ea-form-item_wrap.with-transition .ea-form-item_label-wrap {
  transition: color 0.3s;
}
`;var m,n,p,w;class y extends b{constructor(){super();f(this,m,void 0);f(this,n,void 0);f(this,p,void 0);f(this,w,void 0);const e=this.attachShadow({mode:"open"});e.innerHTML=`
            <div class='ea-form-item_wrap' part='container'>
                <label class="ea-form-item_label-wrap" part='label-wrap'>
                    <slot name='label'></slot>
                </label>
                <div class="ea-form-item_content-wrap" part='content-wrap'> 
                    <slot></slot>
                    <span class="ea-form-item_invalid-wrap" part='invalid-wrap'>
                        <slot name='invalid-text'></slot>
                    </span>
                </div>
            </div>
        `,d(this,n,e.querySelector(".ea-form-item_wrap")),d(this,p,e.querySelector(".ea-form-item_label-wrap")),d(this,w,e.querySelector(".ea-form-item_invalid-wrap")),this.build(e,v)}get label(){return this.getAttribute("label")}set label(e){this.setAttribute("label",e);const a=l(this,p).querySelector("slot");try{a.assignedNodes().length===0&&(l(this,p).innerHTML=e)}catch{}}get trigger(){const e=this.getAttribute("trigger");return["blur","change"].includes(e)?e:"blur"}set trigger(e){this.setAttribute("trigger",e)}get isInvalid(){return this.getAttribute("is-invalid")==="true"}set isInvalid(e){this.setAttribute("is-invalid",e),l(this,n).classList.toggle("is-required",e)}get rule(){return l(this,m)}set rule(e){d(this,m,e);for(const a in e)this[a]=e[a]}get isRequired(){return this.getAttrBoolean("is-required")}set isRequired(e){this.setAttribute("is-required",e),l(this,n).classList.toggle("is-required-star",e)}validateEvent(){const e=this.querySelector("[data-ea-component]");try{e.addEventListener(this.trigger,a=>{for(const i in l(this,m))if(h[i])if(h[i](e.value,l(this,m)[i]))e.isInvalid=!1,l(this,n).classList.remove("is-required");else{e.isInvalid=!0,l(this,n).classList.add("is-required");break}})}catch{}}connectedCallback(){this.label=this.label,this.trigger=this.trigger,_(l(this,n),50)}}m=new WeakMap,n=new WeakMap,p=new WeakMap,w=new WeakMap;customElements.get("ea-form-item")||customElements.define("ea-form-item",y);var u;class I extends b{constructor(){super();f(this,u,void 0);const e=this.attachShadow({mode:"open"});e.innerHTML=`
            <form class='ea-form_wrap' part='container'>
                <slot></slot>
            </form>
        `}get data(){const e={};return this.querySelectorAll("[data-ea-component]").forEach(i=>{e[i.name]=i.value}),e}get rules(){return l(this,u)||{}}set rules(e){d(this,u,e);const a=this.querySelectorAll("ea-form-item");this.querySelectorAll("[data-ea-component]").forEach((s,o)=>{var c;a[o].rule=e[s.name],a[o].validateEvent(),a[o].isRequired=!!((c=e[s.name])!=null&&c.required)})}validate(){const e=this.querySelectorAll("ea-form-item"),a=this.querySelectorAll("[data-ea-component]");let i=[];return a.forEach((s,o)=>{if(l(this,u)[s.name]){for(const c in e[o].rule)if(h[c])if(h[c](s.value,e[o].rule[c]))e[o].isInvalid=!1,s.isInvalid=!1;else{e[o].isInvalid=!0,s.isInvalid=!0,i.push(s.name);break}}}),new Promise((s,o)=>{i.length>0?o(i):s(!0)})}reset(){const e=this.querySelectorAll("ea-form-item");this.querySelectorAll("[data-ea-component]").forEach((i,s)=>{i.value="",i.isInvalid=!1,e[s].isInvalid=!1})}connectedCallback(){q(()=>{const e=this.querySelectorAll("ea-form-item"),a=Array.from(e).map(s=>s.label.length),i=Math.max(...a);e.forEach(s=>{const o=s.shadowRoot.querySelector(".ea-form-item_label-wrap");o&&(o.style.width=`${i*20}px`)}),this.dispatchEvent(new CustomEvent("ready",{bubbles:!0}))},50)}}u=new WeakMap;customElements.get("ea-form")||customElements.define("ea-form",I);export{I as EaForm};
