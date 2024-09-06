var c=(i,a,e)=>{if(!a.has(i))throw TypeError("Cannot "+e)};var o=(i,a,e)=>{if(a.has(i))throw TypeError("Cannot add the same private member more than once");a instanceof WeakSet?a.add(i):a.set(i,e)};var u=(i,a,e)=>(c(i,a,"access private method"),e);import{t as d}from"./timeout.CMJ_lqqj.js";import{B as m}from"./Base.LSgLRpFA.js";const v=`
.ea-radio-group_wrap {
  display: flex;
}
`;var s,l,r,h;class p extends m{constructor(){super();o(this,s);o(this,r);const e=this.attachShadow({mode:"open"});e.innerHTML=`
            <div class="ea-radio-group_wrap" part="container">
                <slot></slot>
            </div>
        `,this.build(e,v)}get name(){return this.getAttribute("name")}set name(e){this.setAttribute("name",e),this.querySelectorAll("ea-radio").forEach(t=>{t.setAttribute("name",e)})}get value(){return this.getAttribute("value")||""}set value(e){e&&this.setAttribute("value",e)}connectedCallback(){this.setAttribute("data-ea-component",!0),this.name=this.name,this.value=this.value,d(()=>{const e=this.querySelectorAll("ea-radio");u(this,s,l).call(this,e),u(this,r,h).call(this,e)},20)}}s=new WeakSet,l=function(e){e.forEach(t=>{t.checked&&(this.value=t.value),t.addEventListener("change",n=>{this.value=t.value,this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{target:t,value:this.value}}))})})},r=new WeakSet,h=function(e){const t=Array.from(e).find(n=>n.value===this.value);t&&(t.checked=!0)};window.customElements.get("ea-radio-group")||window.customElements.define("ea-radio-group",p);export{p as EaRadioGroup};
