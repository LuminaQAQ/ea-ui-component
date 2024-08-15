var B=(n,s,e)=>{if(!s.has(n))throw TypeError("Cannot "+e)};var i=(n,s,e)=>(B(n,s,"read from private field"),e?e.call(n):s.get(n)),a=(n,s,e)=>{if(s.has(n))throw TypeError("Cannot add the same private member more than once");s instanceof WeakSet?s.add(n):s.set(n,e)},u=(n,s,e,t)=>(B(n,s,"write to private field"),t?t.call(n,e):s.set(n,e),e);var r=(n,s,e)=>(B(n,s,"access private method"),e);import{B as Q}from"./Base.yCeCPjNm.js";import"./index.CD0stXPe.js";import{c as U}from"./createElement.BM9xfELw.js";import"./index.CkXtL86O.js";import"./ea-button.B2M6Cckg.js";const H=(n,s=0)=>{let e=setTimeout(()=>{clearTimeout(e),e=null,n()},s)},V=`
@import url('/ea_ui_component/icon/index.css');

.ea-time-picker_wrap {
  position: relative;
}
.ea-time-picker_wrap .ea-time-picker_icon {
  position: absolute;
  top: 50%;
  left: 0.5rem;
  transform: translateY(-50%);
  z-index: 1;
  color: #c0c4cc;
}
.ea-time-picker_wrap .ea-time-picker_dropdown-wrap {
  position: absolute;
  bottom: -12px;
  left: 0;
  transform-origin: center top;
  transform: translateY(100%) scaleY(0);
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 2;
}
.ea-time-picker_wrap .ea-time-picker_dropdown-wrap::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0.5rem;
  border: 0.5rem solid transparent;
  border-bottom-color: #fff;
  transform: translateY(-100%);
}
.ea-time-picker_wrap .ea-time-picker_dropdown-wrap .ea-time-picker_dropdown-inner-wrap {
  display: flex;
  position: relative;
  margin: 1rem 0;
}
.ea-time-picker_wrap .ea-time-picker_dropdown-wrap .ea-time-picker_dropdown-inner-wrap::before, .ea-time-picker_wrap .ea-time-picker_dropdown-wrap .ea-time-picker_dropdown-inner-wrap::after {
  content: "";
  position: absolute;
  left: 0;
  transform: translateY(-50%);
  width: 100%;
}
.ea-time-picker_wrap .ea-time-picker_dropdown-wrap .ea-time-picker_dropdown-inner-wrap::before {
  top: calc(50% - 16px);
  border-bottom: 1px solid #e4e7ed;
}
.ea-time-picker_wrap .ea-time-picker_dropdown-wrap .ea-time-picker_dropdown-inner-wrap::after {
  top: calc(50% + 16px);
  border-bottom: 1px solid #e4e7ed;
}
.ea-time-picker_wrap .ea-time-picker_dropdown-wrap .ea-time-picker_dropdown-inner-wrap .ea-time-picker_dropdown-inner {
  flex: 1;
  max-height: 190px;
  box-sizing: border-box;
  padding: 5rem 0;
  text-align: center;
  overflow: auto;
  scrollbar-width: none;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 0px;
  list-style-type: none;
}
.ea-time-picker_wrap .ea-time-picker_dropdown-wrap .ea-time-picker_dropdown-inner-wrap .ea-time-picker_dropdown-inner .ea-time-picker_dropdown-item {
  height: 32px;
  line-height: 32px;
  font-size: 12px;
  color: #606266;
  transition: color 0.3s;
}
.ea-time-picker_wrap .ea-time-picker_dropdown-wrap .ea-time-picker_dropdown-inner-wrap .ea-time-picker_dropdown-inner .ea-time-picker_dropdown-item.is-active {
  color: #409eff;
}
.ea-time-picker_wrap .ea-time-picker_dropdown-wrap .ea-time-picker_dropdown-inner-wrap .ea-time-picker_dropdown-inner .ea-time-picker_dropdown-item.is-disabled {
  color: #c0c4cc;
}
.ea-time-picker_wrap .ea-time-picker_dropdown-wrap .ea-time-picker_dropdown-button-group {
  text-align: right;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
.ea-time-picker_wrap.is-open .ea-time-picker_dropdown-wrap {
  transform: translateY(100%) scaleY(1);
}
.ea-time-picker_wrap.with-transition .ea-time-picker_dropdown-wrap {
  transition: transform 0.3s ease-in-out;
}
`;var w,l,g,b,_,f,y,p,d,S,$,q,F,P,j,v,L,C,G,D,J,I,K;class X extends Q{constructor(){super();a(this,p);a(this,S);a(this,q);a(this,P);a(this,v);a(this,C);a(this,D);a(this,I);a(this,w,void 0);a(this,l,void 0);a(this,g,void 0);a(this,b,void 0);a(this,_,void 0);a(this,f,void 0);a(this,y,!1);const e=this.attachShadow({mode:"open"});e.innerHTML=`
            <div class='ea-time-picker_wrap' part='container'>
                <i class="ea-time-picker_icon icon-clock"></i>
                <ea-icon class="ea-time-picker_icon" icon="icon-clock"></ea-icon>
                <ea-input part='input' autocomplete="off" readonly></ea-input>
                <div class="ea-time-picker_dropdown-wrap" part='dropdown-wrap'>
                    <div class="ea-time-picker_dropdown-inner-wrap">
                        <ul class="ea-time-picker_dropdown-inner ea-time-picker_dropdown-inner-hour" part='dropdown-inner'>
                        </ul>
                        <ul class="ea-time-picker_dropdown-inner ea-time-picker_dropdown-inner-minute" part='dropdown-inner'>
                        </ul>
                        <ul class="ea-time-picker_dropdown-inner ea-time-picker_dropdown-inner-second" part='dropdown-inner'>
                        </ul>
                    </div>
                </div>
            </div>
        `,u(this,w,e.querySelector(".ea-time-picker_wrap")),u(this,l,e.querySelector("ea-input")),u(this,g,e.querySelector(".ea-time-picker_dropdown-wrap")),u(this,b,e.querySelector(".ea-time-picker_dropdown-inner-hour")),u(this,_,e.querySelector(".ea-time-picker_dropdown-inner-minute")),u(this,f,e.querySelector(".ea-time-picker_dropdown-inner-second")),this.build(e,V)}get name(){return this.getAttribute("name")||"timePicker"}set name(e){this.setAttribute("name",e)}get width(){return this.getAttribute("width")||"200px"}set width(e){this.setAttribute("width",e),i(this,w).style.width=e}get time(){return this.getAttribute("time")||"00:00:00"}set time(e){this.setAttribute("time",e);const[t,o,c]=e.split(":");this.hour=t,this.minute=o,this.second=c}get hour(){const e=this.getAttrNumber("hour");return r(this,p,d).call(this,e)}set hour(e){this.setAttribute("hour",e),r(this,S,$).call(this,i(this,b),e)}get minute(){const e=this.getAttrNumber("minute");return r(this,p,d).call(this,e)}set minute(e){this.setAttribute("minute",e),r(this,S,$).call(this,i(this,_),e)}get second(){const e=this.getAttrNumber("second");return r(this,p,d).call(this,e)}set second(e){this.setAttribute("second",e),r(this,S,$).call(this,i(this,f),e)}get value(){return this.time}get disabled(){return this.getAttrBoolean("disabled")||!1}set disabled(e){this.setAttribute("disabled",e),i(this,l).disabled=e}get align(){return this.getAttribute("align")||"left"}set align(e){this.setAttribute("align",e),i(this,l).shadowRoot.querySelector("input").style.textAlign=e}get limitRangeStart(){var t;if(this.getAttribute("limit-range-start")){const[o,c,h]=(t=this.getAttribute("limit-range-start"))==null?void 0:t.split(":");return`${r(this,p,d).call(this,o)}:${r(this,p,d).call(this,c)}:${r(this,p,d).call(this,h)}`}else return"00:00:00"}set limitRangeStart(e){this.setAttribute("limit-range-start",e)}get limitRangeEnd(){var t;if(this.getAttribute("limit-range-end")){const[o,c,h]=(t=this.getAttribute("limit-range-end"))==null?void 0:t.split(":");return`${r(this,p,d).call(this,o)}:${r(this,p,d).call(this,c)}:${r(this,p,d).call(this,h)}`}else return"23:59:59"}set limitRangeEnd(e){this.setAttribute("limit-range-end",e)}connectedCallback(){r(this,I,K).call(this)}}w=new WeakMap,l=new WeakMap,g=new WeakMap,b=new WeakMap,_=new WeakMap,f=new WeakMap,y=new WeakMap,p=new WeakSet,d=function(e,t="00"){return e=Number(e),e<10?`0${e}`:e||t},S=new WeakSet,$=function(e,t){e.querySelectorAll("li").forEach(o=>{Number(o.innerText)===Number(r(this,p,d).call(this,t))&&o.click()})},q=new WeakSet,F=function(){const e=i(this,l).shadowRoot.querySelector(".ea-input_inner");e.style.paddingLeft="2.5rem",i(this,g).style.width=i(this,l).getBoundingClientRect().width+"px",H(()=>{i(this,w).classList.add("with-transition")},50)},P=new WeakSet,j=function(e,t,o,c){e.addEventListener("click",()=>{o.querySelectorAll("li").forEach(Y=>{Y.classList.remove("is-active")}),e.classList.add("is-active");const x=r(this,p,d).call(this,t);switch(c){case"hour":this.hour=x;break;case"minute":this.minute=x;break;case"second":this.second=x;break}i(this,y)&&this.dispatchEvent(new CustomEvent("change",{detail:{time:this.time}})),i(this,l).value=`${this.hour}:${this.minute}:${this.second}`,this.time=`${this.hour}:${this.minute}:${this.second}`;const m=e.getBoundingClientRect().height*t;o.scrollTo({top:m,behavior:"smooth"})})},v=new WeakSet,L=function(e){e.addEventListener("wheel",()=>{H(()=>{const t=e.querySelectorAll("li"),o=t[0].getBoundingClientRect().height,{scrollTop:c}=e,h=Math.floor(c/o);t[h]&&t[h].click()},100)})},C=new WeakSet,G=function(){const[e,t,o]=this.limitRangeStart.split(":"),[c,h,x]=this.limitRangeEnd.split(":"),m=new Date,Y=new Date(m.getFullYear(),m.getMonth(),m.getDate(),e,t,o),O=new Date(m.getFullYear(),m.getMonth(),m.getDate(),c,h,x);if(Y>O)throw new Error("limit-range-start must be less than limit-range-end");const N=(E,k,W,z)=>{E=Number(E),k=Number(k);let T=0,M=0;switch(z){case"hour":T=0,M=23;break;default:T=0,M=59,!String(E).localeCompare(k)&&e!==c&&(k=k===0?59:k)}for(let A=T;A<=M;A++){const R=U("li","ea-time-picker_dropdown-item");R.innerText=r(this,p,d).call(this,A),W.appendChild(R),A>=E&&A<=k?r(this,P,j).call(this,R,A,W,z):R.classList.add("is-disabled")}};N(e,c,i(this,b),"hour"),N(t,h,i(this,_),"minute"),N(o,x,i(this,f),"second"),r(this,v,L).call(this,i(this,b)),r(this,v,L).call(this,i(this,_)),r(this,v,L).call(this,i(this,f))},D=new WeakSet,J=function(){let e=!1;const t=()=>{this.time=this.time,e=!0,u(this,y,!0),i(this,g).removeEventListener("transitionend",t)};i(this,l).addEventListener("focus",()=>{i(this,w).classList.add("is-open"),e||i(this,g).addEventListener("transitionend",t)}),window.addEventListener("click",o=>{this.contains(o.target)?i(this,l).shadowRoot.querySelector(".ea-input_inner").focus():i(this,w).classList.remove("is-open")})},I=new WeakSet,K=function(){this.width=this.width,this.disabled=this.disabled,this.align=this.align,this.limitRangeStart=this.limitRangeStart,this.limitRangeEnd=this.limitRangeEnd,r(this,q,F).call(this),r(this,C,G).call(this),this.time=this.time,i(this,l).value=`${this.hour}:${this.minute}:${this.second}`,this.setAttribute("data-ea-component",!0),r(this,D,J).call(this)};customElements.get("ea-time-picker")||customElements.define("ea-time-picker",X);export{X as EaTimePicker};
