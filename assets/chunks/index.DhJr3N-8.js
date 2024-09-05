var T=(o,a,t)=>{if(!a.has(o))throw TypeError("Cannot "+t)};var i=(o,a,t)=>(T(o,a,"read from private field"),t?t.call(o):a.get(o)),s=(o,a,t)=>{if(a.has(o))throw TypeError("Cannot add the same private member more than once");a instanceof WeakSet?a.add(o):a.set(o,t)},u=(o,a,t,e)=>(T(o,a,"write to private field"),e?e.call(o,t):a.set(o,t),t);var r=(o,a,t)=>(T(o,a,"access private method"),t);import{B as Q}from"./Base.yCeCPjNm.js";import"./index.BXibZEVU.js";import{c as U}from"./createElement.BM9xfELw.js";import{t as H}from"./timeout.ZZWNqneZ.js";import"./index.9bIWl8Mb.js";import"./ea-button.B2M6Cckg.js";const V=`
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
`;var w,h,k,b,_,f,y,p,c,S,$,q,F,P,j,v,L,C,G,D,J,I,K;class X extends Q{constructor(){super();s(this,p);s(this,S);s(this,q);s(this,P);s(this,v);s(this,C);s(this,D);s(this,I);s(this,w,void 0);s(this,h,void 0);s(this,k,void 0);s(this,b,void 0);s(this,_,void 0);s(this,f,void 0);s(this,y,!1);const t=this.attachShadow({mode:"open"});t.innerHTML=`
            <div class='ea-time-picker_wrap' part='container'>
                <i class="ea-time-picker_icon icon-clock"></i>
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
        `,u(this,w,t.querySelector(".ea-time-picker_wrap")),u(this,h,t.querySelector("ea-input")),u(this,k,t.querySelector(".ea-time-picker_dropdown-wrap")),u(this,b,t.querySelector(".ea-time-picker_dropdown-inner-hour")),u(this,_,t.querySelector(".ea-time-picker_dropdown-inner-minute")),u(this,f,t.querySelector(".ea-time-picker_dropdown-inner-second")),this.build(t,V)}get name(){return this.getAttribute("name")||"timePicker"}set name(t){this.setAttribute("name",t)}get width(){return this.getAttribute("width")||"200px"}set width(t){this.setAttribute("width",t),i(this,w).style.width=t}get time(){return this.getAttribute("time")||"00:00:00"}set time(t){this.setAttribute("time",t);const[e,n,d]=t.split(":");this.hour=e,this.minute=n,this.second=d}get hour(){const t=this.getAttrNumber("hour");return r(this,p,c).call(this,t)}set hour(t){this.setAttribute("hour",t),r(this,S,$).call(this,i(this,b),t)}get minute(){const t=this.getAttrNumber("minute");return r(this,p,c).call(this,t)}set minute(t){this.setAttribute("minute",t),r(this,S,$).call(this,i(this,_),t)}get second(){const t=this.getAttrNumber("second");return r(this,p,c).call(this,t)}set second(t){this.setAttribute("second",t),r(this,S,$).call(this,i(this,f),t)}get value(){return this.time}get disabled(){return this.getAttrBoolean("disabled")||!1}set disabled(t){this.setAttribute("disabled",t),i(this,h).disabled=t}get align(){return this.getAttribute("align")||"left"}set align(t){this.setAttribute("align",t),i(this,h).shadowRoot.querySelector("input").style.textAlign=t}get limitRangeStart(){var e;if(this.getAttribute("limit-range-start")){const[n,d,l]=(e=this.getAttribute("limit-range-start"))==null?void 0:e.split(":");return`${r(this,p,c).call(this,n)}:${r(this,p,c).call(this,d)}:${r(this,p,c).call(this,l)}`}else return"00:00:00"}set limitRangeStart(t){this.setAttribute("limit-range-start",t)}get limitRangeEnd(){var e;if(this.getAttribute("limit-range-end")){const[n,d,l]=(e=this.getAttribute("limit-range-end"))==null?void 0:e.split(":");return`${r(this,p,c).call(this,n)}:${r(this,p,c).call(this,d)}:${r(this,p,c).call(this,l)}`}else return"23:59:59"}set limitRangeEnd(t){this.setAttribute("limit-range-end",t)}connectedCallback(){r(this,I,K).call(this)}}w=new WeakMap,h=new WeakMap,k=new WeakMap,b=new WeakMap,_=new WeakMap,f=new WeakMap,y=new WeakMap,p=new WeakSet,c=function(t,e="00"){return t=Number(t),t<10?`0${t}`:t||e},S=new WeakSet,$=function(t,e){t.querySelectorAll("li").forEach(n=>{Number(n.innerText)===Number(r(this,p,c).call(this,e))&&n.click()})},q=new WeakSet,F=function(){const t=i(this,h).shadowRoot.querySelector(".ea-input_inner");t.style.paddingLeft="2.5rem",i(this,k).style.width=i(this,h).getBoundingClientRect().width+"px",H(()=>{i(this,w).classList.add("with-transition")},50)},P=new WeakSet,j=function(t,e,n,d){t.addEventListener("click",()=>{n.querySelectorAll("li").forEach(Y=>{Y.classList.remove("is-active")}),t.classList.add("is-active");const x=r(this,p,c).call(this,e);switch(d){case"hour":this.hour=x;break;case"minute":this.minute=x;break;case"second":this.second=x;break}i(this,y)&&this.dispatchEvent(new CustomEvent("change",{detail:{time:this.time}})),i(this,h).value=`${this.hour}:${this.minute}:${this.second}`,this.time=`${this.hour}:${this.minute}:${this.second}`;const m=t.getBoundingClientRect().height*e;n.scrollTo({top:m,behavior:"smooth"})})},v=new WeakSet,L=function(t){t.addEventListener("wheel",()=>{H(()=>{const e=t.querySelectorAll("li"),n=e[0].getBoundingClientRect().height,{scrollTop:d}=t,l=Math.floor(d/n);e[l]&&e[l].click()},100)})},C=new WeakSet,G=function(){const[t,e,n]=this.limitRangeStart.split(":"),[d,l,x]=this.limitRangeEnd.split(":"),m=new Date,Y=new Date(m.getFullYear(),m.getMonth(),m.getDate(),t,e,n),O=new Date(m.getFullYear(),m.getMonth(),m.getDate(),d,l,x);if(Y>O)throw new Error("limit-range-start must be less than limit-range-end");const N=(E,g,W,z)=>{E=Number(E),g=Number(g);let M=0,B=0;switch(z){case"hour":M=0,B=23;break;default:M=0,B=59,!String(E).localeCompare(g)&&t!==d&&(g=g===0?59:g)}for(let A=M;A<=B;A++){const R=U("li","ea-time-picker_dropdown-item");R.innerText=r(this,p,c).call(this,A),W.appendChild(R),A>=E&&A<=g?r(this,P,j).call(this,R,A,W,z):R.classList.add("is-disabled")}};N(t,d,i(this,b),"hour"),N(e,l,i(this,_),"minute"),N(n,x,i(this,f),"second"),r(this,v,L).call(this,i(this,b)),r(this,v,L).call(this,i(this,_)),r(this,v,L).call(this,i(this,f))},D=new WeakSet,J=function(){let t=!1;const e=()=>{this.time=this.time,t=!0,u(this,y,!0),i(this,k).removeEventListener("transitionend",e)};i(this,h).addEventListener("focus",()=>{i(this,w).classList.add("is-open"),t||i(this,k).addEventListener("transitionend",e)}),window.addEventListener("click",n=>{this.contains(n.target)?i(this,h).shadowRoot.querySelector(".ea-input_inner").focus():i(this,w).classList.remove("is-open")})},I=new WeakSet,K=function(){this.width=this.width,this.disabled=this.disabled,this.align=this.align,this.limitRangeStart=this.limitRangeStart,this.limitRangeEnd=this.limitRangeEnd,r(this,q,F).call(this),r(this,C,G).call(this),this.time=this.time,i(this,h).value=`${this.hour}:${this.minute}:${this.second}`,this.setAttribute("data-ea-component",!0),r(this,D,J).call(this)};customElements.get("ea-time-picker")||customElements.define("ea-time-picker",X);export{X as EaTimePicker};
