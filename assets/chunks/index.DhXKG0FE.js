var w=(e,i,t)=>{if(!i.has(e))throw TypeError("Cannot "+t)};var a=(e,i,t)=>(w(e,i,"read from private field"),t?t.call(e):i.get(e)),d=(e,i,t)=>{if(i.has(e))throw TypeError("Cannot add the same private member more than once");i instanceof WeakSet?i.add(e):i.set(e,t)},o=(e,i,t,s)=>(w(e,i,"write to private field"),s?s.call(e,t):i.set(e,t),t);var g=(e,i,t)=>(w(e,i,"access private method"),t);import{B as b}from"./Base.yCeCPjNm.js";import"./index.CpoGCwi-.js";import{t as f}from"./timeout.ZZWNqneZ.js";import"./index.CRWUm4Jj.js";import"./index.BObYv0qB.js";import"./createElement.BM9xfELw.js";import"./index.Bo3IO5uk.js";import"./ea-button.B2M6Cckg.js";const _=`
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
`;var n,p,l,r,c,m;class y extends b{constructor(){super();d(this,c);d(this,n,void 0);d(this,p,void 0);d(this,l,void 0);d(this,r,void 0);const t=this.attachShadow({mode:"open"});t.innerHTML=`
            <div class='ea-date-picker_wrap' part='container'>
                <div class='ea-date-picker_input-wrap' part='input-wrap'>
                    <ea-input class="ea-date-picker_input" part='input' prefix-icon="icon-calendar-times-o" readonly></ea-input>
                </div>
                <div class='ea-date-picker_dropdown-wrap' part='dropdown-wrap'>
                    <ea-calendar class="ea-date-picker_calendar" size="mini"></ea-calendar>
                </div>
            </div>
        `,o(this,n,t.querySelector(".ea-date-picker_wrap")),o(this,p,t.querySelector(".ea-date-picker_dropdown-wrap")),o(this,l,t.querySelector(".ea-date-picker_calendar")),o(this,r,t.querySelector(".ea-date-picker_input")),this.build(t,_)}get name(){return this.getAttribute("name")||"datePicker"}set name(t){this.setAttribute("name",t)}get width(){return this.getAttribute("width")||"200px"}set width(t){this.setAttribute("width",t),a(this,n).style.width=t,a(this,p).style.width=t,this.style.display="inline-block",this.style.width=t}get value(){return this.getAttribute("value")||""}set value(t){if(isNaN(new Date(t))&&t!==""){const s=new Date(Date.now());t=`${s.getFullYear()}-${s.getMonth()+1}-${s.getDate()}`}this.setAttribute("value",t),a(this,r).value=t}get placeholder(){return this.getAttribute("placeholder")||""}set placeholder(t){this.setAttribute("placeholder",t),a(this,r).placeholder=t}get disabled(){return this.getAttrBoolean("disabled")||!1}set disabled(t){this.toggleAttr("disabled",t),a(this,r).disabled=t}get align(){return this.getAttribute("align")||"left"}set align(t){this.setAttribute("align",t),a(this,r).shadowRoot.querySelector("input").style.textAlign=t}connectedCallback(){g(this,c,m).call(this)}}n=new WeakMap,p=new WeakMap,l=new WeakMap,r=new WeakMap,c=new WeakSet,m=function(){this.width=this.width,this.value=this.value,this.placeholder=this.placeholder,this.disabled=this.disabled,this.align=this.align,a(this,l).addEventListener("select",t=>{const{year:s,month:h,date:u,day:k}=t.detail;a(this,r).value=`${s}-${h}-${u}`,this.dispatchEvent(new CustomEvent("change",{detail:{fulllDate:`${s}-${h}-${u}`,year:s,month:h,date:u,week:k}}))}),a(this,r).addEventListener("focus",()=>{a(this,n).classList.add("is-open")}),window.addEventListener("click",t=>{this.contains(t.target)?a(this,r).shadowRoot.querySelector(".ea-input_inner").focus():a(this,n).classList.remove("is-open")}),f(()=>{a(this,n).classList.add("with-transition")},300)};customElements.get("ea-date-picker")||customElements.define("ea-date-picker",y);export{y as EaDatePicker};
