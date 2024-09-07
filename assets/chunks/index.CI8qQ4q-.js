var m=(e,i,t)=>{if(!i.has(e))throw TypeError("Cannot "+t)};var a=(e,i,t)=>(m(e,i,"read from private field"),t?t.call(e):i.get(e)),d=(e,i,t)=>{if(i.has(e))throw TypeError("Cannot add the same private member more than once");i instanceof WeakSet?i.add(e):i.set(e,t)},o=(e,i,t,r)=>(m(e,i,"write to private field"),r?r.call(e,t):i.set(e,t),t);var g=(e,i,t)=>(m(e,i,"access private method"),t);import{B as _}from"./Base.LSgLRpFA.js";import"./index.CQU1UkII.js";import"./index.D82BFAzN.js";import"./index.blz3AeWe.js";import{t as y}from"./timeout.CMJ_lqqj.js";import"./createElement.Dy1aXqlz.js";import"./index.D6SVBbJV.js";import"./index.YqKkBJbz.js";const A=`
.ea-date-picker_wrap .ea-date-picker_input-wrap {
  position: relative;
}
.ea-date-picker_wrap .ea-date-picker_dropdown-wrap {
  position: absolute;
  background-color: #fff;
  transform-origin: top center;
  transform: scaleY(0);
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
  z-index: 2;
}
.ea-date-picker_wrap.is-open .ea-date-picker_dropdown-wrap {
  transform: scaleY(1);
}
.ea-date-picker_wrap.with-transition .ea-date-picker_dropdown-wrap {
  transition: transform 0.3s;
}
`;var n,p,l,s,u,k,w,b;class v extends _{constructor(){super();d(this,u);d(this,w);d(this,n,void 0);d(this,p,void 0);d(this,l,void 0);d(this,s,void 0);const t=this.attachShadow({mode:"open"});t.innerHTML=`
            <div class='ea-date-picker_wrap' part='container'>
                <div class='ea-date-picker_input-wrap' part='input-wrap'>
                    <ea-input class="ea-date-picker_input" part='input' prefix-icon="icon-calendar-times-o" readonly></ea-input>
                </div>
                <div class='ea-date-picker_dropdown-wrap' part='dropdown-wrap'>
                    <ea-calendar class="ea-date-picker_calendar" size="mini" part='calendar'></ea-calendar>
                </div>
            </div>
        `,o(this,n,t.querySelector(".ea-date-picker_wrap")),o(this,p,t.querySelector(".ea-date-picker_dropdown-wrap")),o(this,l,t.querySelector(".ea-date-picker_calendar")),o(this,s,t.querySelector(".ea-date-picker_input")),this.build(t,A)}get name(){return this.getAttribute("name")||"datePicker"}set name(t){this.setAttribute("name",t)}get width(){return this.getAttribute("width")||"200px"}set width(t){this.setAttribute("width",t),a(this,n).style.width=t,a(this,p).style.width=t,this.style.display="inline-block",this.style.width=t}get value(){return this.getAttribute("value")||""}set value(t){if(isNaN(new Date(t))&&t!==""){const r=new Date(Date.now());t=`${r.getFullYear()}-${r.getMonth()+1}-${r.getDate()}`}this.setAttribute("value",t),a(this,s).value=t}get placeholder(){return this.getAttribute("placeholder")||""}set placeholder(t){this.setAttribute("placeholder",t),a(this,s).placeholder=t}get disabled(){return this.getAttrBoolean("disabled")||!1}set disabled(t){this.toggleAttr("disabled",t),a(this,s).disabled=t}get align(){return this.getAttribute("align")||"left"}set align(t){this.setAttribute("align",t),a(this,s).shadowRoot.querySelector("input").style.textAlign=t}connectedCallback(){this.setAttribute("data-ea-component",!0),this.name=this.name,this.width=this.width,this.value=this.value,this.placeholder=this.placeholder,this.disabled=this.disabled,this.align=this.align,g(this,u,k).call(this),g(this,w,b).call(this),y(()=>{a(this,n).classList.add("with-transition")},300)}}n=new WeakMap,p=new WeakMap,l=new WeakMap,s=new WeakMap,u=new WeakSet,k=function(){a(this,l).addEventListener("select",t=>{const{year:r,month:c,date:h,day:f}=t.detail;this.value=`${r}-${c}-${h}`,a(this,s).value=`${r}-${c}-${h}`,this.dispatchEvent(new CustomEvent("change",{detail:{fulllDate:`${r}-${c}-${h}`,year:r,month:c,date:h,week:f}}))})},w=new WeakSet,b=function(){a(this,s).addEventListener("focus",()=>{a(this,n).classList.add("is-open")}),window.addEventListener("click",t=>{this.contains(t.target)?a(this,s).shadowRoot.querySelector(".ea-input_inner").focus():a(this,n).classList.remove("is-open")})};customElements.get("ea-date-picker")||customElements.define("ea-date-picker",v);export{v as EaDatePicker};
