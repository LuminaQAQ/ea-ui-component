var m=(s,t,e)=>{if(!t.has(s))throw TypeError("Cannot "+e)};var o=(s,t,e)=>(m(s,t,"read from private field"),e?e.call(s):t.get(s)),l=(s,t,e)=>{if(t.has(s))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(s):t.set(s,e)},h=(s,t,e,n)=>(m(s,t,"write to private field"),n?n.call(s,e):t.set(s,e),e);import{B as f}from"./Base.LSgLRpFA.js";import"./index.ChwP6VyU.js";class u{handleStringMsg(t,e){t.text=e,t.type="info",t.hasClose=!1}handleObjectMsg(t,e,n){for(const i in e)n.includes(i)&&(t[i]=e[i]);Object.keys(e).includes("type")||(t.type="info")}handleDuration(t,e=3){if(e===0)return;let n=setTimeout(()=>{t.show=!1,clearTimeout(n),n=null},e*1e3+40)}open(t){const e=document.createElement("ea-message");if(document.body.appendChild(e),typeof t=="string")this.handleStringMsg(e,t),this.handleDuration(e);else if(typeof t=="object")this.handleObjectMsg(e,t,e.attrs),this.handleDuration(e,t.duration);else throw new Error("[EaMessage] TypeError");return e.show=!0,{onClose(n){typeof n=="function"&&e.addEventListener("click",function(){n()})}}}}const w=`
.ea-message_wrap {
  position: fixed;
  left: 50%;
  z-index: 999;
  display: flex;
  align-items: center;
  padding: 15px 15px 15px 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  top: -100%;
  transform-origin: center;
  opacity: 0;
  transform: translate(-50%, 0);
  min-width: 380px;
  overflow: hidden;
  background-color: black;
  transition: opacity 0.3s, top 0.3s;
}
.ea-message_wrap .ea-icon-wrap {
  margin-right: 0.5rem;
  line-height: 1;
}
.ea-message_wrap .ea-text-content {
  line-height: 1;
  margin-right: auto;
  vertical-align: middle;
}
.ea-message_wrap .ea-close-icon {
  margin-left: auto;
}
.ea-message_wrap.ea-message--success {
  background-color: #f0f9eb;
  color: #67c23a;
}
.ea-message_wrap.ea-message--info {
  background-color: #f4f4f5;
  color: #909399;
}
.ea-message_wrap.ea-message--warning {
  background-color: #fdf6ec;
  color: #e6a23c;
}
.ea-message_wrap.ea-message--error {
  background-color: #fef0f0;
  color: #f56c6c;
}
`;var a,c,g,r;class y extends f{constructor(){super();l(this,a,void 0);l(this,c,void 0);l(this,g,void 0);l(this,r,void 0);const e=this.attachShadow({mode:"open"});e.innerHTML=`
            <div class="ea-message_wrap" part="container">
                <ea-icon class="ea-icon-wrap" part="icon"></ea-icon>
                <div class="ea-text-content" part="content-wrap"></div>
                <ea-icon class="ea-close-icon" icon="icon-cancel"></ea-icon>
            </div>
        `,h(this,a,e.querySelector(".ea-message_wrap")),this.wrap=o(this,a),h(this,c,e.querySelector(".ea-icon-wrap")),h(this,g,e.querySelector(".ea-text-content")),h(this,r,e.querySelector(".ea-close-icon")),this.closeWrap=o(this,r),this.build(e,w)}get attrs(){return["show","text","icon","type","showClose","center"]}get iconList(){return{success:"icon-ok-circled",error:"icon-cancel-circled",warning:"icon-attention-alt",info:"icon-info"}}get show(){return this.getAttrBoolean("show")}set show(e){this.setAttribute("show",e);const n=document.querySelectorAll("ea-message");if(e){const i=n.length-1,d=o(this,a).getBoundingClientRect().height;let p=i<=0?10:(i+1)*10;o(this,a).style.top=`${i*d+p}px`,o(this,a).style.opacity=1}else{o(this,a).style.top="-100%",o(this,a).style.opacity=0;let i=o(this,a).addEventListener("transitionend",()=>{this.removeEventListener("transitionend",i),this.remove()})}}get text(){return this.getAttribute("text")}set text(e){e&&(this.setAttribute("text",e),o(this,g).innerText=e)}get type(){return this.getAttribute("type")||"info"}set type(e){this.setAttribute("type",e),o(this,a).classList.add(`ea-message--${e}`),o(this,c).icon=this.iconList[e]}get showClose(){return this.getAttrBoolean("showClose")||!1}set showClose(e){e&&(this.setAttribute("showClose",e),o(this,r).style.display=e?"block":"none")}get center(){return this.getAttrBoolean("center")||!1}set center(e){e&&(this.setAttribute("center",e),o(this,c).style.marginLeft=e?"auto":"0")}connectedCallback(){o(this,r).addEventListener("click",()=>{this.show=!1})}disconnectedCallback(){const e=document.querySelectorAll("ea-message");e.length>0&&Array.from(e).forEach((i,d)=>{const p=i.wrap.getBoundingClientRect().height;i.wrap.style.top=`${d*p+d*10}px`})}}a=new WeakMap,c=new WeakMap,g=new WeakMap,r=new WeakMap;customElements.get("ea-message")||customElements.define("ea-message",y);window.$message=new u;export{y as EaMessageElement};
