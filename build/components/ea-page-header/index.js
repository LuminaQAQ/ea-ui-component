import Base from"../Base.js";import"../ea-icon/index.js";import{createSlotElement,createElement}from"../../utils/createElement.js";import{stylesheet}from"./src/style/stylesheet.js";export class EaPageHeader extends Base{#t;#e;#n;#a;#i;constructor(){super();const t=this.attachShadow({mode:"open"});t.innerHTML="\n            <div class='ea-page-header_wrap' part='container'>\n                <div class='ea-page-header_title-wrap' part='title-wrap'>\n                    <ea-icon class='ea-page-header_back-icon' part='back-icon' icon=\"icon-angle-left\"></ea-icon>\n                    <slot name=\"title\"></slot>\n                </div>\n                <div class='ea-page-header_divider' part='divider'>|</div>\n                <div class='ea-page-header_content-wrap' part='content-wrap'>\n                    <slot name=\"content\"></slot>\n                </div>\n            </div>\n        ",this.#t=t.querySelector(".ea-page-header_wrap"),this.#e=t.querySelector(".ea-page-header_title-wrap"),this.#a=t.querySelector('slot[name="title"]'),this.#n=t.querySelector(".ea-page-header_content-wrap"),this.#i=t.querySelector('slot[name="content"]'),this.build(t,stylesheet)}get title(){return this.getAttribute("title")||""}set title(t){t?(this.setAttribute("title",t),this.#a.innerText=t):(this.setAttribute("title","返回"),this.#a.innerText="返回")}get content(){return this.getAttribute("content")||""}set content(t){t?(this.setAttribute("content",t),this.#i.innerText=t):(this.setAttribute("content",""),this.#i.innerText="")}connectedCallback(){this.title=this.title,this.content=this.content,this.#e.addEventListener("click",(()=>{this.dispatchEvent(new CustomEvent("back"))}))}}customElements.get("ea-page-header")||customElements.define("ea-page-header",EaPageHeader);