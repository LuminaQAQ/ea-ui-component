var b=(e,n,o)=>{if(!n.has(e))throw TypeError("Cannot "+o)};var r=(e,n,o)=>(b(e,n,"read from private field"),o?o.call(e):n.get(e)),d=(e,n,o)=>{if(n.has(e))throw TypeError("Cannot add the same private member more than once");n instanceof WeakSet?n.add(e):n.set(e,o)},s=(e,n,o,i)=>(b(e,n,"write to private field"),i?i.call(e,o):n.set(e,o),o);import{B as u}from"./Base.LSgLRpFA.js";import"./index.D5YVt3kx.js";const g=`
<button class="ea-button" part="container">
    <slot></slot>
</button>
`,h=`
<a class="ea-button" part="container">
    <slot></slot>
</a>
`,f=`
:host {
  --border-radius: 6px;
}

.ea-button {
  box-sizing: border-box;
  padding: 0.5rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-size: 1rem;
  line-height: 1.25;
  font-weight: 500;
  transition: background-color 0.1s, color 0.1s;
  text-decoration: none;
  will-change: width;
}
.ea-button.normal {
  border: 1px solid #dcdfe6;
  color: #606266;
  background-color: transparent;
}
.ea-button.normal.disabled {
  background-color: rgba(64, 64, 64, 0) !important;
  border-color: white !important;
  color: white !important;
  pointer-events: none;
  border-color: #ebedf1 !important;
  color: #babcbe !important;
}
.ea-button.normal.plain {
  background-color: rgba(92, 92, 92, 0);
  border-color: white;
  color: transparent;
  background-color: transparent;
  color: #606266;
  border-color: #dcdfe6;
}
.ea-button.normal.plain:hover {
  background-color: transparent;
}
.ea-button.normal:hover {
  border-color: rgba(160, 207, 255, 0.4);
  color: #3a9bff;
  background-color: rgba(160, 207, 255, 0.05);
}
.ea-button.normal:active {
  background-color: rgba(7, 130, 255, 0.05);
}
.ea-button.primary {
  border: 1px solid #409eff;
  color: #fff;
  background-color: #409eff;
}
.ea-button.primary.disabled {
  background-color: #c0dfff !important;
  border-color: #c0dfff !important;
  color: white !important;
  pointer-events: none;
}
.ea-button.primary.plain {
  background-color: #f8fbff;
  border-color: #c0dfff;
  color: #409eff;
}
.ea-button.primary:hover {
  border-color: #73b8ff;
  color: white;
  background-color: #73b8ff;
}
.ea-button.primary:active {
  background-color: #006bd9;
}
.ea-button.success {
  border: 1px solid #67c23a;
  color: #fff;
  background-color: #67c23a;
}
.ea-button.success.disabled {
  background-color: #b2e19b !important;
  border-color: #b2e19b !important;
  color: white !important;
  pointer-events: none;
}
.ea-button.success.plain {
  background-color: #d3eec6;
  border-color: #b2e19b;
  color: #67c23a;
}
.ea-button.success:hover {
  border-color: #85cf60;
  color: white;
  background-color: #85cf60;
}
.ea-button.success:active {
  background-color: #3d7323;
}
.ea-button.info {
  border: 1px solid #909399;
  color: #fff;
  background-color: #909399;
}
.ea-button.info.disabled {
  background-color: #d2d4d6 !important;
  border-color: #d2d4d6 !important;
  color: white !important;
  pointer-events: none;
}
.ea-button.info.plain {
  background-color: #f0f0f1;
  border-color: #d2d4d6;
  color: #909399;
}
.ea-button.info:hover {
  border-color: #abadb1;
  color: white;
  background-color: #abadb1;
}
.ea-button.info:active {
  background-color: #5d6066;
}
.ea-button.warning {
  border: 1px solid #e6a23c;
  color: #fff;
  background-color: #e6a23c;
}
.ea-button.warning.disabled {
  background-color: #f4d8ad !important;
  border-color: #f4d8ad !important;
  color: white !important;
  pointer-events: none;
}
.ea-button.warning.plain {
  background-color: #fbf0df;
  border-color: #f4d8ad;
  color: #e6a23c;
}
.ea-button.warning:hover {
  border-color: #ecb869;
  color: white;
  background-color: #ecb869;
}
.ea-button.warning:active {
  background-color: #a76d15;
}
.ea-button.danger {
  border: 1px solid #f56c6c;
  color: #fff;
  background-color: #f56c6c;
}
.ea-button.danger.disabled {
  background-color: #fde3e3 !important;
  border-color: #fde3e3 !important;
  color: white !important;
  pointer-events: none;
}
.ea-button.danger.plain {
  background-color: white;
  border-color: #fde3e3;
  color: #f56c6c;
  background-color: #fde8e8;
}
.ea-button.danger:hover {
  border-color: #f89c9c;
  color: white;
  background-color: #f89c9c;
}
.ea-button.danger:active {
  background-color: #eb1010;
}
.ea-button.text {
  border: 1px solid transparent;
  color: #409eff;
  background-color: transparent;
}
.ea-button.text.disabled {
  background-color: rgba(64, 64, 64, 0) !important;
  border-color: rgba(64, 64, 64, 0) !important;
  color: white !important;
  pointer-events: none;
  color: #c0c4cc !important;
}
.ea-button.text.plain {
  background-color: rgba(92, 92, 92, 0);
  border-color: rgba(64, 64, 64, 0);
  color: transparent;
}
.ea-button.text:hover {
  border-color: rgba(26, 26, 26, 0);
  color: #73b8ff;
  background-color: rgba(26, 26, 26, 0);
}
.ea-button.text:active {
  background-color: rgba(0, 0, 0, 0);
}
.ea-button.round {
  border-radius: 999px;
}
.ea-button.medium {
  font-size: 14px;
}
.ea-button.small {
  font-size: 12px;
}
.ea-button.mini {
  font-size: 10px;
}
`;var c,t;class p extends u{constructor(){super();d(this,c,"button");d(this,t,void 0);const o=this.attachShadow({mode:"open"});this.getAttribute("href")?(o.innerHTML=h,s(this,c,"a")):(o.innerHTML=g,s(this,c,"button")),s(this,t,o.querySelector(".ea-button")),this.build(o,f)}get BUTTON_STYLE(){return["plain","round"]}get BUTTON_TYPE(){return["normal","primary","success","warning","danger","text"]}get BUTTON_SIZE(){return["medium","small","mini"]}get disabled(){return this.getAttrBoolean("disabled")}set disabled(o){this.toggleAttr("disabled",o),r(this,t).classList.toggle("disabled",o),this.style.cursor=o?"not-allowed":"pointer",o&&r(this,t).setAttribute("disabled",o)}get plain(){return this.getAttrBoolean("plain")}set plain(o){this.toggleAttr("plain",o),r(this,t).classList.toggle("plain",o)}get round(){return this.getAttrBoolean("round")}set round(o){this.toggleAttr("round",o),r(this,t).classList.toggle("round",o)}get type(){const o=this.getAttribute("type");return this.BUTTON_TYPE.includes(o)?o:"normal"}set type(o){this.setAttribute("type",o),r(this,t).classList.add(o)}get size(){const o=this.getAttribute("size");return this.BUTTON_SIZE.includes(o)?o:"medium"}set size(o){this.toggleAttr("size",o),r(this,t).classList.add(o)}get loading(){return this.getAttrBoolean("loading")}set loading(o){var i;if(this.toggleAttr("loading",o),this.disabled=o,o){const a=document.createElement("ea-icon");a.id="ea-loading-icon",a.icon="icon-spin6 animate-spin",r(this,t).insertBefore(a,r(this,t).firstChild)}else{const a=(i=r(this,t))==null?void 0:i.querySelectorAll("#ea-loading-icon");(a==null?void 0:a.length)>0&&(a==null||a.forEach(l=>l.remove()))}}get icon(){return this.getAttribute("icon")||""}set icon(o){if(this.setAttribute("icon",o),o&&!r(this,t).querySelector("ea-icon")){const i=document.createElement("ea-icon");i.icon=o,i.part="icon",r(this,t).insertBefore(i,r(this,t).firstChild)}}get href(){return this.getAttribute("href")||""}set href(o){r(this,c)!=="button"&&(this.setAttribute("href",o),r(this,t).setAttribute("href",o))}connectedCallback(){this.plain=this.plain,this.round=this.round,this.type=this.type,this.size=this.size,this.icon=this.icon,this.disabled=this.disabled,this.href=this.href,this.loading&&(this.loading=this.loading)}}c=new WeakMap,t=new WeakMap;window.customElements.get("ea-button")||window.customElements.define("ea-button",p);export{p as EaButton};
