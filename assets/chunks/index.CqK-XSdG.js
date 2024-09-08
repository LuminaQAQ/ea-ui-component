var L=(a,i,t)=>{if(!i.has(a))throw TypeError("Cannot "+t)};var n=(a,i,t)=>(L(a,i,"read from private field"),t?t.call(a):i.get(a)),s=(a,i,t)=>{if(i.has(a))throw TypeError("Cannot add the same private member more than once");i instanceof WeakSet?i.add(a):i.set(a,t)},w=(a,i,t,r)=>(L(a,i,"write to private field"),r?r.call(a,t):i.set(a,t),t);var e=(a,i,t)=>(L(a,i,"access private method"),t);import{B as N}from"./Base.LSgLRpFA.js";const B=`
.ea-pagination_wrap {
  display: flex;
  align-items: center;
  font-size: 0.9rem;
}
.ea-pagination_wrap .ea-pagination_item_wrap {
  display: flex;
  align-items: center;
}
.ea-pagination_wrap .ea-pagination_item_wrap .ea-pagination_item,
.ea-pagination_wrap .ea-pagination_item_wrap .ea-pagination_more {
  cursor: pointer;
  box-sizing: border-box;
  margin: 0 5px;
  padding: 0 4px;
  min-width: 30px;
  height: 28px;
  line-height: 28px;
  font-size: 13px;
  text-align: center;
}
.ea-pagination_wrap .ea-pagination_item_wrap .ea-pagination_item.ea-pagination_item--active {
  color: #409eff;
}
.ea-pagination_wrap .ea-pagination_item_wrap .ea-pagination_more {
  cursor: pointer;
  user-select: none;
}
.ea-pagination_wrap .ea-pagination_item_wrap .ea-pagination_more.ea-pagination_more--active {
  color: #409eff;
}
.ea-pagination_wrap .ea-pagination_arrow {
  user-select: none;
  cursor: pointer;
  padding: 0 10px;
  line-height: 28px;
}
.ea-pagination_wrap .ea-pagination_arrow.disabled {
  cursor: default;
  pointer-events: none;
  color: #c0c4cc;
}
.ea-pagination_wrap .ea-pagination_arrow:first-child {
  margin-right: 0.25rem;
}
.ea-pagination_wrap .ea-pagination_arrow:last-child {
  margin-left: 0.25rem;
}
.ea-pagination_wrap .ea-pagination_item.background,
.ea-pagination_wrap .ea-pagination_more.background,
.ea-pagination_wrap .ea-pagination_arrow.background {
  background-color: #f4f4f5;
  border-radius: 3px;
}
.ea-pagination_wrap .ea-pagination_item.background:hover,
.ea-pagination_wrap .ea-pagination_more.background:hover,
.ea-pagination_wrap .ea-pagination_arrow.background:hover {
  color: #409eff;
}
.ea-pagination_wrap .ea-pagination_item.background.active,
.ea-pagination_wrap .ea-pagination_more.background.active,
.ea-pagination_wrap .ea-pagination_arrow.background.active {
  background-color: #409eff;
  color: #f4f4f5;
}
.ea-pagination_wrap .ea-pagination_show_total {
  margin-right: 0.5rem;
  font-size: 13px;
}
`,M=(a,i)=>{const t=document.createElement("span");return t.className="ea-pagination_more",t.innerHTML="···",t.part="more-item",i&&t.classList.add("background"),t.addEventListener("mouseenter",function(r){t.classList.add("ea-pagination_more--active"),t.innerHTML=a==="prev"?"&lt;&lt;":"&gt;&gt;"}),t.addEventListener("mouseleave",function(r){t.classList.remove("ea-pagination_more--active"),t.innerHTML="···"}),t},A=(a,i)=>{const t=document.createElement("span");return t.part="page-item",t.className="ea-pagination_item",t.innerText=a,t.setAttribute("data-page",a),i&&t.classList.add("background"),t},H=()=>{const a=document.createElement("span");return a.className="ea-pagination_show_total",a.part="total-wrap",a};var m,o,c,h,l,f,x,T,v,E,_,k,C,z,P,I,d,b,y,S;class q extends N{constructor(){super();s(this,l);s(this,x);s(this,v);s(this,_);s(this,C);s(this,P);s(this,d);s(this,y);s(this,m,void 0);s(this,o,void 0);s(this,c,void 0);s(this,h,void 0);const t=this.attachShadow({mode:"open"});t.innerHTML=`
            <div class="ea-pagination_wrap" part="container">
                <span class="ea-pagination_arrow prev ${this.background?"background":""}" part="arrow">&lt;</span>
                <div class="ea-pagination_item_wrap" part="item-wrap"></div>
                <span class="ea-pagination_arrow next ${this.background?"background":""}" part="arrow">&gt;</span>
            </div>
        `,w(this,m,t.querySelector(".ea-pagination_wrap")),w(this,c,t.querySelector(".prev")),w(this,o,t.querySelector(".ea-pagination_item_wrap")),w(this,h,t.querySelector(".next")),this.build(t,B)}get layout(){return this.getAttribute("layout").split(",").map(r=>r.trim())||["prev","pager","next"]}set layout(t){this.setAttribute("layout",t)}get sizes(){return this.getAttrNumber("sizes")||10}set sizes(t){this.setAttribute("sizes",t)}get currentPage(){return this.getAttrNumber("current-page")||1}set currentPage(t){this.setAttribute("current-page",t)}get pageCount(){return this.getAttrNumber("page-count")||6}set pageCount(t){this.setAttribute("page-count",t)}get total(){return this.getAttrNumber("total")}set total(t){this.setAttribute("total",t)}get paginationCount(){return Math.ceil(this.total/this.sizes)}get background(){return this.getAttrBoolean("background")}set background(t){t&&this.setAttribute("background",t)}connectedCallback(){this.sizes=this.sizes,this.currentPage=this.currentPage,this.total=this.total,e(this,x,T).call(this),e(this,P,I).call(this),e(this,y,S).call(this)}}m=new WeakMap,o=new WeakMap,c=new WeakMap,h=new WeakMap,l=new WeakSet,f=function(t,r){this.dispatchEvent(new CustomEvent(t,r))},x=new WeakSet,T=function(){e(this,v,E).call(this),this.layout.includes("prev")?n(this,c).addEventListener("click",()=>{this.currentPage<=1||(this.currentPage--,e(this,d,b).call(this),e(this,l,f).call(this,"change",{detail:{currentPage:this.currentPage}}))}):n(this,c).style.display="none",this.layout.includes("next")?n(this,h).addEventListener("click",()=>{this.currentPage>=this.paginationCount||(this.currentPage++,e(this,d,b).call(this),e(this,l,f).call(this,"change",{detail:{currentPage:this.currentPage}}))}):n(this,h).style.display="none"},v=new WeakSet,E=function(){!this.layout.includes("prev")&&!this.layout.includes("next")||(this.currentPage===1&&this.layout.includes("prev")?n(this,c).classList.add("disabled"):this.currentPage>=this.paginationCount&&this.layout.includes("next")?n(this,h).classList.add("disabled"):(n(this,c).classList.remove("disabled"),n(this,h).classList.remove("disabled")))},_=new WeakSet,k=function(t,r){t.addEventListener("click",u=>{this.currentPage=r,e(this,d,b).call(this),e(this,l,f).call(this,"change",{detail:{currentPage:this.currentPage}})})},C=new WeakSet,z=function(t,r){t.addEventListener("click",u=>{this.currentPage+=r==="prev"?-5:5,this.currentPage<1?this.currentPage=1:this.currentPage>this.paginationCount&&(this.currentPage=this.paginationCount),e(this,d,b).call(this),e(this,l,f).call(this,"change",{detail:{currentPage:this.currentPage}})})},P=new WeakSet,I=function(){if(!this.layout.includes("pager"))return;n(this,o).innerHTML="";const t=Math.floor(this.pageCount/2);let r=this.currentPage-t,u=this.currentPage+t;r<=1?(r=1,u=this.pageCount<this.paginationCount?this.pageCount:this.paginationCount):u>=this.paginationCount?(r=this.paginationCount-this.pageCount+1,u=this.paginationCount):u--;for(let g=r;g<=u;g++){const p=A(g,this.background);n(this,o).appendChild(p),g===this.currentPage&&(p.classList.add("ea-pagination_item--active"),this.background&&p.classList.add("active")),e(this,_,k).call(this,p,g)}if(this.total>this.pageCount&&this.currentPage>=this.pageCount&&this.paginationCount!==this.pageCount){const g=M("prev",this.background);e(this,C,z).call(this,g,"prev");const p=A(1,this.background);e(this,_,k).call(this,p,1),n(this,o).insertBefore(g,n(this,o).firstChild),n(this,o).insertBefore(p,n(this,o).firstChild)}if(this.total>this.pageCount&&this.currentPage<this.paginationCount-t&&this.paginationCount!==this.pageCount){const g=M("next",this.background);e(this,C,z).call(this,g,"next");const p=A(this.paginationCount,this.background);e(this,_,k).call(this,p,this.paginationCount),n(this,o).appendChild(g),n(this,o).appendChild(p)}},d=new WeakSet,b=function(){e(this,v,E).call(this),e(this,P,I).call(this)},y=new WeakSet,S=function(){if(!this.layout.includes("total"))return;const t=H();t.innerHTML=`共 ${this.total} 条`,n(this,m).insertBefore(t,n(this,m).firstChild)};customElements.get("ea-pagination")||customElements.define("ea-pagination",q);export{q as EaPagination};
