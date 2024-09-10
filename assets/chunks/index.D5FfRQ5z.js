var f=(s,i,t)=>{if(!i.has(s))throw TypeError("Cannot "+t)};var e=(s,i,t)=>(f(s,i,"read from private field"),t?t.call(s):i.get(s)),h=(s,i,t)=>{if(i.has(s))throw TypeError("Cannot add the same private member more than once");i instanceof WeakSet?i.add(s):i.set(s,t)},p=(s,i,t,g)=>(f(s,i,"write to private field"),g?g.call(s,t):i.set(s,t),t);var c=(s,i,t)=>(f(s,i,"access private method"),t);import{B as T}from"./Base.LSgLRpFA.js";import"./index.CcHcFfiA.js";const A=`
.ea-progress_wrap {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  line-height: 1;
  height: 1rem;
}
.ea-progress_wrap .ea-progress_track,
.ea-progress_wrap .ea-progress_path {
  height: 0.5rem;
  line-height: 1;
  background-color: rgb(235, 238, 245);
  border-radius: 999px;
}
.ea-progress_wrap .ea-progress_track {
  width: 100%;
}
.ea-progress_wrap .ea-progress_track .ea-progress_path {
  box-sizing: border-box;
  padding-right: 0.5rem;
  color: aliceblue;
  font-size: 0.8rem;
  text-align: right;
  width: 0%;
  background-color: #409eff;
  transition: width 0.2s;
}
.ea-progress_wrap .ea-progress_text {
  margin-left: 0.5rem;
  font-size: 0.8rem;
  width: 3rem;
}
.ea-progress_wrap .ea-progress_text--circle,
.ea-progress_wrap .ea-progress_text--dashboard {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.ea-progress_wrap svg circle {
  stroke-width: 4px;
  transform-origin: center center;
  transition: stroke-dashoffset 0.2s;
}
.ea-progress_wrap svg .track--circle,
.ea-progress_wrap svg .path--circle {
  transform: rotate(-90deg);
}
.ea-progress_wrap svg .track--dashboard,
.ea-progress_wrap svg .path--dashboard {
  transform: rotate(161deg);
}
`,L={dashboard:`
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle class="track--dashboard" cx="50" cy="50" r="40" fill="none" stroke-dasharray="252px" stroke="aliceblue"
            stroke-width="4px" stroke-dashoffset="100" stroke-linecap="round" />
        <circle class="path--dashboard" cx="50" cy="50" r="40" fill="none" stroke-dasharray="252px" stroke="rgb(32, 160, 255)" stroke-width="4px"
            stroke-dashoffset="252" stroke-linecap="round" />
    </svg>
    <span class="ea-progress_text--dashboard"></span>
    `,circle:`
    <svg viewBox="0 0 100 100">
        <circle class="track--circle" cx="50" cy="50" r="48" fill="none" stroke="aliceblue" stroke-width="4" stroke-dasharray="302px" stroke-dashoffset="0" />
        <circle class="path--circle" cx="50" cy="50" r="48" fill="none" stroke="rgb(32, 160, 255)" stroke-width="4" stroke-dasharray="302px" stroke-dashoffset="0"  stroke-linecap="round" />
    </svg>
    <span class="ea-progress_text--circle"></span>
    `};var a,n,r,o,b,m,y,u,l,k,d,w,x,_;class N extends T{constructor(){super();h(this,b);h(this,y);h(this,l);h(this,d);h(this,x);h(this,a,void 0);h(this,n,void 0);h(this,r,void 0);h(this,o,void 0);const t=this.attachShadow({mode:"open"});t.innerHTML=`
            <div class="ea-progress_wrap" part="container">
                <section class="ea-progress_track" part="track-wrap">
                    <section class="ea-progress_path" part="path"></section>
                </section>
                <section class="ea-progress_text" part="text-wrap"></section>
            </div>
        `,p(this,a,t.querySelector(".ea-progress_wrap")),p(this,n,t.querySelector(".ea-progress_track")),p(this,r,t.querySelector(".ea-progress_path")),p(this,o,t.querySelector(".ea-progress_text")),this.build(t,A)}get type(){return this.getAttribute("type")}set type(t){if(t)switch(this.setAttribute("type",t),this.type){case"circle":c(this,d,w).call(this,"circle");break;case"dashboard":c(this,d,w).call(this,"dashboard");break}}get percentage(){return this.getAttribute("percentage")||0}set percentage(t){if(!isNaN(Number(t)))switch(Number(t)<0?t=0:Number(t)>100&&(t=100),this.setAttribute("percentage",t),(this.textInside||this.type==="dashboard"||this.type==="circle")&&(e(this,o).innerHTML=`${t}%`),this.type){case"circle":{e(this,r).style.strokeDashoffset=`${c(this,b,m).call(this,t)}px`;break}case"dashboard":{e(this,r).style.strokeDashoffset=`${c(this,y,u).call(this,t)}px`;break}default:{e(this,r).style.width=`${t}%`,this.textInside&&c(this,x,_).call(this,t);break}}}get statusList(){return{success:{icon:"icon-ok-circled",color:"#67c23a"},warning:{icon:"icon-attention-circled",color:"#e6a23c"},exception:{icon:"icon-cancel-circled",color:"#f56c6c"},primary:{}}}get status(){return this.getAttribute("status")||"primary"}set status(t){switch(this.setAttribute("status",t),this.type){case"circle":c(this,l,k).call(this,t,"ea-progress_text--circle"),e(this,r).style.stroke=this.statusList[t].color;break;case"dashboard":c(this,l,k).call(this,t,"ea-progress_text--dashboard"),e(this,r).style.stroke=this.statusList[t].color;break;default:c(this,l,k).call(this,t,"ea-progress_text"),e(this,r).style.backgroundColor=this.statusList[t].color;break}}get textInside(){return this.getAttrBoolean("text-inside")}set textInside(t){this.type==="circle"||!t||(this.setAttribute("text-inside",t),c(this,x,_).call(this,t))}get strokeWidth(){return this.getAttribute("stroke-width")}set strokeWidth(t){t=t?Number(t):4,this.toggleAttr("stroke-width",t),this.type==="circle"||this.type==="dashboard"?(e(this,n).style.strokeWidth=`${t}px`,e(this,r).style.strokeWidth=`${t}px`):(t=t+4,e(this,n).style.height=`${t}px`,e(this,n).style.lineHeight=`${t}px`,e(this,r).style.height=`${t}px`,e(this,r).style.lineHeight=`${t}px`,e(this,a).style.height=`${t}px`,e(this,a).style.lineHeight=`${t}px`)}connectedCallback(){this.type=this.type,this.percentage=this.percentage,this.status=this.status,this.textInside=this.textInside,this.strokeWidth=this.strokeWidth}}a=new WeakMap,n=new WeakMap,r=new WeakMap,o=new WeakMap,b=new WeakSet,m=function(t){return 302*(100-Number(t))/100},y=new WeakSet,u=function(t){return 152*(100-Number(t))/100+100},l=new WeakSet,k=function(t,g){!this.type&&this.textInside||this.type==="dashboard"||this.type==="circle"?e(this,o).innerText=`${this.percentage}%`:e(this,o).innerText="",e(this,o).className=`${g} ${this.statusList[t].icon||""}`,e(this,o).style.color=this.statusList[t].color},d=new WeakSet,w=function(t){e(this,a).style.height="126px",e(this,a).style.width="126px",e(this,a).innerHTML=L[t];const g=e(this,a).querySelector(`circle[class="track--${t}"]`),$=e(this,a).querySelector(`circle[class="path--${t}"]`),S=e(this,a).querySelector(`span[class="ea-progress_text--${t}"]`);p(this,n,g),p(this,r,$),p(this,o,S)},x=new WeakSet,_=function(t){t?(e(this,o).style.display="none",e(this,r).innerText=`${this.percentage}%`):(e(this,o).style.display="block",e(this,r).innerText="")};customElements.get("ea-progress")||customElements.define("ea-progress",N);export{N as EaProgress};
