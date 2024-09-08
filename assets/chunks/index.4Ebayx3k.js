var B=(o,s,t)=>{if(!s.has(o))throw TypeError("Cannot "+t)};var i=(o,s,t)=>(B(o,s,"read from private field"),t?t.call(o):s.get(o)),a=(o,s,t)=>{if(s.has(o))throw TypeError("Cannot add the same private member more than once");s instanceof WeakSet?s.add(o):s.set(o,t)},u=(o,s,t,e)=>(B(o,s,"write to private field"),e?e.call(o,t):s.set(o,t),t);var r=(o,s,t)=>(B(o,s,"access private method"),t);import{B as K}from"./Base.LSgLRpFA.js";import"./index.ChwP6VyU.js";import{c as O}from"./createElement.Dy1aXqlz.js";import{t as z}from"./timeout.CMJ_lqqj.js";import"./index.CCePDMJq.js";import"./index.BJKMySqS.js";const Q=`
.ea-time-picker_wrap {
  position: relative;
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
`;var w,h,k,b,_,f,E,p,c,S,$,q,H,P,F,v,L,C,j,D,G;class U extends K{constructor(){super();a(this,p);a(this,S);a(this,q);a(this,P);a(this,v);a(this,C);a(this,D);a(this,w,void 0);a(this,h,void 0);a(this,k,void 0);a(this,b,void 0);a(this,_,void 0);a(this,f,void 0);a(this,E,!1);const t=this.attachShadow({mode:"open"});t.innerHTML=`
            <div class='ea-time-picker_wrap' part='container'>
                <ea-input part='input' autocomplete="off" readonly prefix-icon="icon-clock"></ea-input>
                <div class="ea-time-picker_dropdown-wrap" part='dropdown-wrap'>
                    <div class="ea-time-picker_dropdown-inner-wrap" part='dropdown-inner-wrap'>
                        <ul class="ea-time-picker_dropdown-inner ea-time-picker_dropdown-inner-hour" part='dropdown-time'>
                        </ul>
                        <ul class="ea-time-picker_dropdown-inner ea-time-picker_dropdown-inner-minute" part='dropdown-time'>
                        </ul>
                        <ul class="ea-time-picker_dropdown-inner ea-time-picker_dropdown-inner-second" part='dropdown-time'>
                        </ul>
                    </div>
                </div>
            </div>
        `,u(this,w,t.querySelector(".ea-time-picker_wrap")),u(this,h,t.querySelector("ea-input")),u(this,k,t.querySelector(".ea-time-picker_dropdown-wrap")),u(this,b,t.querySelector(".ea-time-picker_dropdown-inner-hour")),u(this,_,t.querySelector(".ea-time-picker_dropdown-inner-minute")),u(this,f,t.querySelector(".ea-time-picker_dropdown-inner-second")),this.build(t,Q)}get width(){return this.getAttribute("width")||"200px"}set width(t){this.setAttribute("width",t),i(this,w).style.width=t}get time(){return this.getAttribute("time")||"00:00:00"}set time(t){this.setAttribute("time",t);const[e,n,d]=t.split(":");this.hour=e,this.minute=n,this.second=d}get name(){return this.getAttribute("name")||"timePicker"}set name(t){this.setAttribute("name",t)}get hour(){const t=this.getAttrNumber("hour");return r(this,p,c).call(this,t)}set hour(t){this.setAttribute("hour",t),r(this,S,$).call(this,i(this,b),t)}get minute(){const t=this.getAttrNumber("minute");return r(this,p,c).call(this,t)}set minute(t){this.setAttribute("minute",t),r(this,S,$).call(this,i(this,_),t)}get second(){const t=this.getAttrNumber("second");return r(this,p,c).call(this,t)}set second(t){this.setAttribute("second",t),r(this,S,$).call(this,i(this,f),t)}get value(){return this.time}set value(t){this.time=t}get disabled(){return this.getAttrBoolean("disabled")||!1}set disabled(t){this.setAttribute("disabled",t),i(this,h).disabled=t}get align(){return this.getAttribute("align")||"left"}set align(t){this.setAttribute("align",t),i(this,h).shadowRoot.querySelector("input").style.textAlign=t}get limitRangeStart(){var e;if(this.getAttribute("limit-range-start")){const[n,d,l]=(e=this.getAttribute("limit-range-start"))==null?void 0:e.split(":");return`${r(this,p,c).call(this,n)}:${r(this,p,c).call(this,d)}:${r(this,p,c).call(this,l)}`}else return"00:00:00"}set limitRangeStart(t){this.setAttribute("limit-range-start",t)}get limitRangeEnd(){var e;if(this.getAttribute("limit-range-end")){const[n,d,l]=(e=this.getAttribute("limit-range-end"))==null?void 0:e.split(":");return`${r(this,p,c).call(this,n)}:${r(this,p,c).call(this,d)}:${r(this,p,c).call(this,l)}`}else return"23:59:59"}set limitRangeEnd(t){this.setAttribute("limit-range-end",t)}connectedCallback(){this.setAttribute("data-ea-component",!0),this.name=this.name,this.width=this.width,this.disabled=this.disabled,this.align=this.align,this.limitRangeStart=this.limitRangeStart,this.limitRangeEnd=this.limitRangeEnd,r(this,q,H).call(this),r(this,C,j).call(this),this.time=this.time,i(this,h).value=`${this.hour}:${this.minute}:${this.second}`,r(this,D,G).call(this)}}w=new WeakMap,h=new WeakMap,k=new WeakMap,b=new WeakMap,_=new WeakMap,f=new WeakMap,E=new WeakMap,p=new WeakSet,c=function(t,e="00"){return t=Number(t),t<10?`0${t}`:t||e},S=new WeakSet,$=function(t,e){t.querySelectorAll("li").forEach(n=>{Number(n.innerText)===Number(r(this,p,c).call(this,e))&&n.click()})},q=new WeakSet,H=function(){i(this,k).style.width=i(this,h).getBoundingClientRect().width+"px",z(()=>{i(this,w).classList.add("with-transition")},50)},P=new WeakSet,F=function(t,e,n,d){t.addEventListener("click",()=>{n.querySelectorAll("li").forEach(I=>{I.classList.remove("is-active")}),t.classList.add("is-active");const x=r(this,p,c).call(this,e);switch(d){case"hour":this.hour=x;break;case"minute":this.minute=x;break;case"second":this.second=x;break}i(this,E)&&this.dispatchEvent(new CustomEvent("change",{detail:{time:this.time}})),i(this,h).value=`${this.hour}:${this.minute}:${this.second}`,this.time=`${this.hour}:${this.minute}:${this.second}`;const m=t.getBoundingClientRect().height*e;n.scrollTo({top:m,behavior:"smooth"})})},v=new WeakSet,L=function(t){t.addEventListener("wheel",()=>{z(()=>{const e=t.querySelectorAll("li"),n=e[0].getBoundingClientRect().height,{scrollTop:d}=t,l=Math.floor(d/n);e[l]&&e[l].click()},100)})},C=new WeakSet,j=function(){const[t,e,n]=this.limitRangeStart.split(":"),[d,l,x]=this.limitRangeEnd.split(":"),m=new Date,I=new Date(m.getFullYear(),m.getMonth(),m.getDate(),t,e,n),J=new Date(m.getFullYear(),m.getMonth(),m.getDate(),d,l,x);if(I>J)throw new Error("limit-range-start must be less than limit-range-end");const N=(y,g,T,W)=>{y=Number(y),g=Number(g);let Y=0,M=0;switch(W){case"hour":Y=0,M=23;break;default:Y=0,M=59,!String(y).localeCompare(g)&&t!==d&&(g=g===0?59:g)}for(let A=Y;A<=M;A++){const R=O("li","ea-time-picker_dropdown-item");R.innerText=r(this,p,c).call(this,A),T.appendChild(R),A>=y&&A<=g?r(this,P,F).call(this,R,A,T,W):R.classList.add("is-disabled")}};N(t,d,i(this,b),"hour"),N(e,l,i(this,_),"minute"),N(n,x,i(this,f),"second"),r(this,v,L).call(this,i(this,b)),r(this,v,L).call(this,i(this,_)),r(this,v,L).call(this,i(this,f))},D=new WeakSet,G=function(){let t=!1;const e=()=>{this.time=this.time,t=!0,u(this,E,!0),i(this,k).removeEventListener("transitionend",e)};i(this,h).addEventListener("focus",()=>{i(this,w).classList.add("is-open"),t||i(this,k).addEventListener("transitionend",e)}),window.addEventListener("click",n=>{this.contains(n.target)?i(this,h).shadowRoot.querySelector(".ea-input_inner").focus():i(this,w).classList.remove("is-open")})};customElements.get("ea-time-picker")||customElements.define("ea-time-picker",U);export{U as EaTimePicker};
