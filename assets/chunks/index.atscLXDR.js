var i=(t,s,e)=>{if(!s.has(t))throw TypeError("Cannot "+e)};var u=(t,s,e)=>(i(t,s,"read from private field"),e?e.call(t):s.get(t)),h=(t,s,e)=>{if(s.has(t))throw TypeError("Cannot add the same private member more than once");s instanceof WeakSet?s.add(t):s.set(t,e)},d=(t,s,e,a)=>(i(t,s,"write to private field"),a?a.call(t,e):s.set(t,e),e);var n=(t,s,e)=>(i(t,s,"access private method"),e);import{B as m}from"./Base.yCeCPjNm.js";const p=`
.ea-checkbox-group {
  display: flex;
}
.ea-checkbox-group ::slotted(ea-checkbox) {
  margin-right: 1.5rem;
}`;var o,c,l;class k extends m{constructor(){super();h(this,c);h(this,o,!1);const e=this.attachShadow({mode:"open"});e.innerHTML=`
            <div class="ea-checkbox-group_wrap" part="container">
                <slot></slot>
            </div>
        `,this.build(e,p)}get name(){return this.getAttribute("name")||"ea-checkbox"}set name(e){this.querySelectorAll("ea-checkbox").forEach(a=>{a.setAttribute("name",e),a.name=e})}get value(){return this.getAttribute("value")||""}set value(e){this.setAttribute("value",e);try{const a=e.split(",").map(r=>r.trimStart());a.map(r=>{const b=this.querySelector(`ea-checkbox[value="${r}"]`);b.checked="true"}),this.dispatchEvent(new CustomEvent("change",{detail:a}))}catch{}}get disabled(){return this.getAttrBoolean("disabled")}set disabled(e){if(!e&&!u(this,o))return;this.querySelectorAll("ea-checkbox").forEach(r=>{r.disabled=e})}connectedCallback(){this.setAttribute("data-ea-component",!0),this.name=this.name,setTimeout(()=>{this.value=this.value,this.disabled=this.disabled;const e=this.querySelectorAll("ea-checkbox");e.forEach(a=>{a.addEventListener("change",r=>{n(this,c,l).call(this,e)})}),n(this,c,l).call(this,e),d(this,o,!0)},20)}}o=new WeakMap,c=new WeakSet,l=function(e){let a=[];Array.from(e).filter(r=>r.checked?a.push(r.value):!1),this.value=a.join(",")};window.customElements.get("ea-checkbox-group")||window.customElements.define("ea-checkbox-group",k);export{k as EaCheckboxGroup};
