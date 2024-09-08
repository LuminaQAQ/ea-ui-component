var y=(i,e,t)=>{if(!e.has(i))throw TypeError("Cannot "+t)};var n=(i,e,t)=>(y(i,e,"read from private field"),t?t.call(i):e.get(i)),r=(i,e,t)=>{if(e.has(i))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(i):e.set(i,t)},s=(i,e,t,o)=>(y(i,e,"write to private field"),o?o.call(i,t):e.set(i,t),t);var _=(i,e,t)=>(y(i,e,"access private method"),t);import{B as k}from"./Base.LSgLRpFA.js";import{c as L}from"./createElement.Dy1aXqlz.js";import"./index.Vv5Ba7lM.js";import"./index.tIRM-U_r.js";import"./index.CgEiilRo.js";import"./timeout.CMJ_lqqj.js";var b,P,g,E;class B{constructor(e){r(this,b);r(this,g);this.isPrompt=e}get attrs(){return["cancelButtonText","confirmButtonText"]}open(e,t,o){const a=L("ea-message-box");return a.addEventListener("ready",()=>{this.isPrompt&&(a.isPrompt=!0),a.reg=new RegExp(o.reg),a.style.setProperty("--invalid-message",`"${o.invalidMessage}"`),a.inputPlaceholder=o.inputPlaceholder}),document.body.appendChild(a),a.open=!0,a.content=e,a.title=t,_(this,b,P).call(this,a,o,this.attrs),new Promise((w,A)=>{a.addEventListener("cancel",()=>{_(this,g,E).call(this,a),A()}),a.addEventListener("confirm",f=>{if(this.isPrompt&&!o.reg.test(f.detail.value)){f.detail.target.setAttribute("aria-invalid",!0),f.detail.target.focus();return}_(this,g,E).call(this,a),this.isPrompt?w(f.detail.value):w(!0)})})}}b=new WeakSet,P=function(e,t,o){o.forEach(a=>{t[a]&&(e[a]=t[a])})},g=new WeakSet,E=function(e){e.remove()};const S=`
:host {
  --invalid-message: "";
}

.ea-dialog_wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2024;
}
.ea-dialog_wrap .ea-dialog_board {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  width: 420px;
  padding-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  box-sizing: 0 2px 12px 0;
  font-size: 18px;
  text-align: left;
  overflow: hidden;
  backface-visibility: hidden;
}
.ea-dialog_wrap .ea-dialog_board .ea-dialog_header {
  padding: 15px 15px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.ea-dialog_wrap .ea-dialog_board .ea-dialog_header .ea-dialog_header-title {
  font-size: 18px;
  line-height: 1;
  color: #303133;
}
.ea-dialog_wrap .ea-dialog_board .ea-dialog_header .ea-dialog_header-close {
  display: inline-block;
  font-size: 16px;
  color: #909399;
  cursor: pointer;
}
.ea-dialog_wrap .ea-dialog_board .ea-dialog_content {
  padding: 10px 15px;
  color: #606266;
  font-size: 14px;
}
.ea-dialog_wrap .ea-dialog_board .ea-dialog_content .ea-dialog_content-input {
  display: none;
}
.ea-dialog_wrap .ea-dialog_board .ea-dialog_footer {
  padding: 5px 15px 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.ea-dialog_wrap .ea-dialog_board .ea-dialog_footer :first-child {
  margin-right: 0.5rem;
}
.ea-dialog_wrap.is-prompt .ea-dialog_board .ea-dialog_content {
  position: relative;
}
.ea-dialog_wrap.is-prompt .ea-dialog_board .ea-dialog_content .ea-dialog_content-input {
  margin-top: 15px;
  padding-bottom: 15px;
  display: block;
}
.ea-dialog_wrap.is-prompt .ea-dialog_board .ea-dialog_content .ea-dialog_content-input::after {
  content: var(--invalid-message);
  position: absolute;
  display: block;
  bottom: 0;
  transform-origin: top center;
  transform: scaleY(0);
  transition: transform 0.3s;
}
.ea-dialog_wrap.is-prompt .ea-dialog_board .ea-dialog_content .ea-dialog_content-input[aria-invalid=true]::after {
  transform-origin: top center;
  transform: scaleY(1);
  color: #f56c6c;
}
`;var d,u,x,h,l,v,c,p,m;class q extends k{constructor(){super();r(this,d,void 0);r(this,u,void 0);r(this,x,void 0);r(this,h,void 0);r(this,l,void 0);r(this,v,void 0);r(this,c,void 0);r(this,p,void 0);r(this,m,void 0);const t=this.attachShadow({mode:"open"});t.innerHTML=`
            <div class="ea-dialog_wrap" part="container" role="dialog">
                <div class="ea-dialog_board" part="dialog-body">
                    <div class="ea-dialog_header" part="dialog-header">
                        <span class="ea-dialog_header-title" part="dialog-title"></span>
                        <ea-icon class="ea-dialog_header-close" icon="icon-cancel" part="close-icon"></ea-icon>
                    </div>
                    <div class="ea-dialog_content" part="dialog-content">
                        <div class="ea-dialog_content-text" part="dialog-content-text"></div>
                        <ea-input class="ea-dialog_content-input" part="dialog-input"></ea-input>
                    </div>
                    <div class="ea-dialog_footer" part="dialog-footer">
                        <div class="ea-dialog_footer-cancel-button" part="footer-cancel-button"></div>
                        <div class="ea-dialog_footer-confirm-button" part="footer-confirm-button"></div>
                    </div>
                </div>
                <div class="ea-dialog_mask" part="mask-wrap"></div>
            </div>
        `,s(this,d,t.querySelector(".ea-dialog_wrap")),s(this,u,t.querySelector(".ea-dialog_header")),s(this,x,t.querySelector(".ea-dialog_content")),s(this,h,t.querySelector(".ea-dialog_content-text")),s(this,l,t.querySelector(".ea-dialog_content-input")),s(this,v,t.querySelector(".ea-dialog_footer")),s(this,c,t.querySelector(".ea-dialog_footer-confirm-button")),s(this,p,t.querySelector(".ea-dialog_footer-cancel-button")),this.build(t,S)}get open(){return this.getAttrBoolean("open")}set open(t){this.toggleAttr("open",t),n(this,d).style.display=t?"block":"none"}get content(){return this.getAttribute("content")}set content(t){n(this,h).innerHTML=t}get isPrompt(){return this.getAttrBoolean("isPrompt")}set isPrompt(t){var o;this.toggleAttr("isPrompt",t),(o=n(this,d))==null||o.classList.toggle("is-prompt",t)}get reg(){return n(this,m)}set reg(t){this.isPrompt&&(s(this,m,t),n(this,l).addEventListener("change",o=>{const a=o.detail.value;o.target.shadowRoot.querySelector(".ea-input_inner").setAttribute("aria-invalid",!t.test(a)),n(this,l).setAttribute("aria-invalid",!t.test(a)),t.test(a)}))}get inputPlaceholder(){return this.getAttribute("input-placeholder")}set inputPlaceholder(t){t&&(n(this,l).placeholder=t)}get title(){return this.getAttribute("title")}set title(t){n(this,u).innerHTML=t}get confirmButtonText(){return this.getAttribute("confirmButtonText")}set confirmButtonText(t){t&&(this.setAttribute("confirmButtonText",t),n(this,c).innerHTML=`<ea-button size="medium" type="primary">${t}</ea-button>`,n(this,c).addEventListener("click",()=>{this.isPrompt?this.dispatchEvent(new CustomEvent("confirm",{detail:{target:n(this,l),value:n(this,l).value}})):this.dispatchEvent(new CustomEvent("confirm"))}))}get cancelButtonText(){return this.getAttribute("cancelButtonText")}set cancelButtonText(t){t&&(this.setAttribute("cancelButtonText",t),n(this,p).innerHTML=`<ea-button size="medium">${t}</ea-button>`,n(this,p).addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("cancel"))}))}connectedCallback(){this.dispatchEvent(new CustomEvent("ready"))}}d=new WeakMap,u=new WeakMap,x=new WeakMap,h=new WeakMap,l=new WeakMap,v=new WeakMap,c=new WeakMap,p=new WeakMap,m=new WeakMap;customElements.get("ea-message-box")||customElements.define("ea-message-box",q);const T=new B(!1);window.$alert=T;window.$confirm=T;const M=new B(!0);window.$prompt=M;export{q as EaMessageBoxElement};
