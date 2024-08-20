var _=(t,r,e)=>{if(!r.has(t))throw TypeError("Cannot "+e)};var l=(t,r,e)=>(_(t,r,"read from private field"),e?e.call(t):r.get(t)),n=(t,r,e)=>{if(r.has(t))throw TypeError("Cannot add the same private member more than once");r instanceof WeakSet?r.add(t):r.set(t,e)},c=(t,r,e,i)=>(_(t,r,"write to private field"),i?i.call(t,e):r.set(t,e),e);var q=(t,r,e)=>(_(t,r,"access private method"),e);import{B as y}from"./Base.yCeCPjNm.js";import"./index.DhjvHksS.js";import{t as x}from"./timeout.ZZWNqneZ.js";import"./ea-button.B2M6Cckg.js";import"./createElement.BM9xfELw.js";const p={required(t){return typeof t=="string"?t!=="":Array.isArray(t)?t.length>0:!1},min(t,r){return t.length>=r},max(t,r){return t.length<=r},reg(t,r){return r.test(t)}},S=`
@import url('/ea_ui_component/icon/index.css');

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
.ea-form-item_wrap.with-transition .ea-form-item_content-wrap .ea-form-item_invalid-wrap {
  transition: transform 0.3s;
}
`;var f,m,u,g,w,I;class E extends y{constructor(){super();n(this,w);n(this,f,void 0);n(this,m,void 0);n(this,u,void 0);n(this,g,void 0);const e=this.attachShadow({mode:"open"});e.innerHTML=`
            <div class='ea-form-item_wrap' part='container'>
                <label class="ea-form-item_label-wrap" part='label'>
                    <slot name='label'></slot>
                </label>
                <div class="ea-form-item_content-wrap" part='content-wrap'> 
                    <slot></slot>
                    <span class="ea-form-item_invalid-wrap" part='invalid-wrap'>
                        <slot name='invalid-text'></slot>
                    </span>
                </div>
            </div>
        `,c(this,m,e.querySelector(".ea-form-item_wrap")),c(this,u,e.querySelector(".ea-form-item_label-wrap")),c(this,g,e.querySelector(".ea-form-item_invalid-wrap")),this.build(e,S)}get label(){return this.getAttribute("label")||""}set label(e){this.setAttribute("label",e);const i=l(this,u).querySelector("slot");try{i.assignedNodes().length===0&&(l(this,u).innerHTML=e)}catch{}}get trigger(){const e=this.getAttribute("trigger");return["blur","change"].includes(e)?e:"blur"}set trigger(e){this.setAttribute("trigger",e)}get isInvalid(){return this.getAttribute("is-invalid")==="true"}set isInvalid(e){this.setAttribute("is-invalid",e),l(this,m).classList.toggle("is-required",e)}get rule(){return l(this,f)}set rule(e){c(this,f,e);for(const i in e)this[i]=e[i]}get isRequired(){return this.getAttrBoolean("is-required")}set isRequired(e){this.setAttribute("is-required",e),l(this,m).classList.toggle("is-required-star",e)}validateEvent(){const e=this.querySelector("[data-ea-component]");try{e.addEventListener(this.trigger,i=>{for(const a in l(this,f))if(p[a])if(p[a](e.value,l(this,f)[a]))e.isInvalid=!1,l(this,m).classList.remove("is-required");else{e.isInvalid=!0,l(this,m).classList.add("is-required");break}})}catch{}}connectedCallback(){q(this,w,I).call(this)}}f=new WeakMap,m=new WeakMap,u=new WeakMap,g=new WeakMap,w=new WeakSet,I=function(){this.label=this.label,this.trigger=this.trigger,x(()=>{l(this,m).classList.add("with-transition")},50)};customElements.get("ea-form-item")||customElements.define("ea-form-item",E);const L=`
@import url('/ea_ui_component/icon/index.css');


`;var b,d,v,A;class k extends y{constructor(){super();n(this,v);n(this,b,void 0);n(this,d,void 0);const e=this.attachShadow({mode:"open"});e.innerHTML=`
            <form class='ea-form_wrap' part='container'>
                <slot></slot>
            </form>
        `,c(this,b,e.querySelector(".ea-form_wrap")),this.build(e,L)}get data(){const e={};return this.querySelectorAll("[data-ea-component]").forEach(a=>{e[a.name]=a.value}),e}get rules(){return l(this,d)||{}}set rules(e){c(this,d,e);const i=this.querySelectorAll("ea-form-item");this.querySelectorAll("[data-ea-component]").forEach((s,o)=>{var h;i[o].rule=e[s.name],i[o].validateEvent(),i[o].isRequired=!!((h=e[s.name])!=null&&h.required)})}validate(){const e=this.querySelectorAll("ea-form-item"),i=this.querySelectorAll("[data-ea-component]");let a=[];return i.forEach((s,o)=>{if(l(this,d)[s.name]){for(const h in e[o].rule)if(p[h])if(p[h](s.value,e[o].rule[h]))e[o].isInvalid=!1,s.isInvalid=!1;else{e[o].isInvalid=!0,s.isInvalid=!0,a.push(s.name);break}}}),new Promise((s,o)=>{a.length>0?o(a):s(!0)})}reset(){const e=this.querySelectorAll("ea-form-item");this.querySelectorAll("[data-ea-component]").forEach((a,s)=>{a.value="",a.isInvalid=!1,e[s].isInvalid=!1})}connectedCallback(){q(this,v,A).call(this)}}b=new WeakMap,d=new WeakMap,v=new WeakSet,A=function(){const e=this.querySelectorAll("ea-form-item"),i=Array.from(e).map(s=>{var o;return((o=s.label)==null?void 0:o.length)||0}),a=Math.max(...i);e.forEach(s=>{s.shadowRoot&&(s.shadowRoot.querySelector(".ea-form-item_label-wrap").style.width=`${a*24}px`)})};customElements.get("ea-form")||customElements.define("ea-form",k);export{k as EaForm};
