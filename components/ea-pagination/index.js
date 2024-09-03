import Base from"../Base.js";import{stylesheet}from"./src/style/stylesheet.js";import{getMoreItem}from"./src/components/getMoreItem.js";import{getPageItem}from"./src/components/getPageItem.js";import{getShowTotalItem}from"./src/components/getShowTotalItem.js";export class EaPagination extends Base{#t;#e;#i;#a;constructor(){super();const t=this.attachShadow({mode:"open"});t.innerHTML=`\n            <div class="ea-pagination_wrap" part="container">\n                <span class="ea-pagination_arrow prev ${this.background?"background":""}" part="arrow">&lt;</span>\n                <div class="ea-pagination_item_wrap" part="item-wrap"></div>\n                <span class="ea-pagination_arrow next ${this.background?"background":""}" part="arrow">&gt;</span>\n            </div>\n        `,this.#t=t.querySelector(".ea-pagination_wrap"),this.#i=t.querySelector(".prev"),this.#e=t.querySelector(".ea-pagination_item_wrap"),this.#a=t.querySelector(".next"),this.build(t,stylesheet)}get layout(){return this.getAttribute("layout").split(",").map((t=>t.trim()))||["prev","pager","next"]}set layout(t){this.setAttribute("layout",t)}get sizes(){return this.getAttrNumber("sizes")||10}set sizes(t){this.setAttribute("sizes",t)}get currentPage(){return this.getAttrNumber("current-page")||1}set currentPage(t){this.setAttribute("current-page",t)}get pageCount(){return this.getAttrNumber("page-count")||6}set pageCount(t){this.setAttribute("page-count",t)}get total(){return this.getAttrNumber("total")}set total(t){this.setAttribute("total",t)}get paginationCount(){return Math.ceil(this.total/this.sizes)}get background(){return this.getAttrBoolean("background")}set background(t){t&&this.setAttribute("background",t)}#n(t,e){this.dispatchEvent(new CustomEvent(t,e))}#s(){this.#r(),this.layout.includes("prev")?this.#i.addEventListener("click",(()=>{this.currentPage<=1||(this.currentPage--,this.#o(),this.#n("change",{detail:{currentPage:this.currentPage}}))})):this.#i.style.display="none",this.layout.includes("next")?this.#a.addEventListener("click",(()=>{this.currentPage>=this.paginationCount||(this.currentPage++,this.#o(),this.#n("change",{detail:{currentPage:this.currentPage}}))})):this.#a.style.display="none"}#r(){(this.layout.includes("prev")||this.layout.includes("next"))&&(1===this.currentPage&&this.layout.includes("prev")?this.#i.classList.add("disabled"):this.currentPage>=this.paginationCount&&this.layout.includes("next")?this.#a.classList.add("disabled"):(this.#i.classList.remove("disabled"),this.#a.classList.remove("disabled")))}#h(t,e){t.addEventListener("click",(t=>{this.currentPage=e,this.#o(),this.#n("change",{detail:{currentPage:this.currentPage}})}))}#g(t,e){t.addEventListener("click",(t=>{this.currentPage+="prev"===e?-5:5,this.currentPage<1?this.currentPage=1:this.currentPage>this.paginationCount&&(this.currentPage=this.paginationCount),this.#o(),this.#n("change",{detail:{currentPage:this.currentPage}})}))}#c(){if(!this.layout.includes("pager"))return;this.#e.innerHTML="";const t=Math.floor(this.pageCount/2);let e=this.currentPage-t,i=this.currentPage+t;e<=1?(e=1,i=this.pageCount<this.paginationCount?this.pageCount:this.paginationCount):i>=this.paginationCount?(e=this.paginationCount-this.pageCount+1,i=this.paginationCount):i--;for(let t=e;t<=i;t++){const e=getPageItem(t,this.background);this.#e.appendChild(e),t===this.currentPage&&(e.classList.add("ea-pagination_item--active"),this.background&&e.classList.add("active")),this.#h(e,t)}if(this.total>this.pageCount&&this.currentPage>=this.pageCount&&this.paginationCount!==this.pageCount){const t=getMoreItem("prev",this.background);this.#g(t,"prev");const e=getPageItem(1,this.background);this.#h(e,1),this.#e.insertBefore(t,this.#e.firstChild),this.#e.insertBefore(e,this.#e.firstChild)}if(this.total>this.pageCount&&this.currentPage<this.paginationCount-t&&this.paginationCount!==this.pageCount){const t=getMoreItem("next",this.background);this.#g(t,"next");const e=getPageItem(this.paginationCount,this.background);this.#h(e,this.paginationCount),this.#e.appendChild(t),this.#e.appendChild(e)}}#o(){this.#r(),this.#c()}#u(){if(!this.layout.includes("total"))return;const t=getShowTotalItem();t.innerHTML=`共 ${this.total} 条`,this.#t.insertBefore(t,this.#t.firstChild)}connectedCallback(){this.sizes=this.sizes,this.currentPage=this.currentPage,this.total=this.total,this.#s(),this.#c(),this.#u()}}customElements.get("ea-pagination")||customElements.define("ea-pagination",EaPagination);