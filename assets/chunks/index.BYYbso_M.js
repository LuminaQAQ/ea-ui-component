var I=(c,b,e)=>{if(!b.has(c))throw TypeError("Cannot "+e)};var r=(c,b,e)=>(I(c,b,"read from private field"),e?e.call(c):b.get(c)),s=(c,b,e)=>{if(b.has(c))throw TypeError("Cannot add the same private member more than once");b instanceof WeakSet?b.add(c):b.set(c,e)},d=(c,b,e,t)=>(I(c,b,"write to private field"),t?t.call(c,e):b.set(c,e),e);var _=(c,b,e)=>(I(c,b,"access private method"),e);import{B as F}from"./Base.LSgLRpFA.js";import"./index.ChwP6VyU.js";import{c as m}from"./createElement.Dy1aXqlz.js";import"./index.CehXqn5E.js";const ee="";var x;class te extends F{constructor(){super();s(this,x,void 0);const e=this.attachShadow({mode:"open"});e.innerHTML=`
            <th part="container">
                <slot></slot>
                <span></span>
            </th>
        `,this.build(e,ee),d(this,x,e.querySelector("span"))}get prop(){return this.getAttribute("prop")}set prop(e){this.setAttribute("prop",e)}get width(){return this.getAttrNumber("width")||350}set width(e){this.setAttribute("width",e)}get label(){return this.getAttribute("label")||""}set label(e){this.setAttribute("label",e),e!==""&&(r(this,x).innerHTML=e)}get colspan(){return this.getAttrNumber("colspan")||1}set colspan(e){this.setAttribute("colspan",e)}get rowspan(){return this.getAttrNumber("rowspan")||1}set rowspan(e){this.setAttribute("rowspan",e)}get type(){const e=this.getAttribute("type");return["default","index","selection"].includes(e)?e:"default"}set type(e){this.setAttribute("type",e),e==="selection"&&(r(this,x).innerHTML=`
                <ea-checkbox></ea-checkbox>
            `,r(this,x).querySelector("ea-checkbox").addEventListener("change",t=>{this.dispatchEvent(new CustomEvent("header-selection-change",{detail:{checked:t.detail.checked},composed:!0}))}))}get sortable(){return this.getAttrBoolean("sortable")||!1}set sortable(e){this.setAttribute("sortable",e)}get order(){return this.getAttribute("order")||"asc"}set order(e){this.setAttribute("order",e)}connectedCallback(){this.prop=this.prop,this.width=this.width,this.label=this.label,this.colspan=this.colspan,this.rowspan=this.rowspan,this.type=this.type,this.sortable=this.sortable,this.order=this.order}}x=new WeakMap;customElements.get("ea-table-column")||customElements.define("ea-table-column",te);const ae=`
.ea-table_wrap,
.ea-table_fixed-column {
  position: relative;
  background-color: #fff;
  overflow: hidden;
}
.ea-table_wrap .ea-table_header-wrap .ea-table_header,
.ea-table_wrap .ea-table_body-wrap .ea-table_main,
.ea-table_wrap .ea-table_main,
.ea-table_fixed-column .ea-table_header-wrap .ea-table_header,
.ea-table_fixed-column .ea-table_body-wrap .ea-table_main,
.ea-table_fixed-column .ea-table_main {
  position: relative;
  box-sizing: border-box;
  padding: 12px 0;
  width: 100%;
  min-width: 0;
  text-overflow: ellipsis;
  vertical-align: middle;
  text-align: left;
  border-collapse: collapse;
  table-layout: fixed;
}
.ea-table_wrap .ea-table_header-wrap .ea-table_header .ea-table__cell,
.ea-table_wrap .ea-table_body-wrap .ea-table_main .ea-table__cell,
.ea-table_wrap .ea-table_main .ea-table__cell,
.ea-table_fixed-column .ea-table_header-wrap .ea-table_header .ea-table__cell,
.ea-table_fixed-column .ea-table_body-wrap .ea-table_main .ea-table__cell,
.ea-table_fixed-column .ea-table_main .ea-table__cell {
  border-top: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
  box-sizing: border-box;
  padding: 8px;
  color: #606266;
}
.ea-table_wrap .ea-table_header-wrap .ea-table_header .ea-table__cell.th-cell,
.ea-table_wrap .ea-table_body-wrap .ea-table_main .ea-table__cell.th-cell,
.ea-table_wrap .ea-table_main .ea-table__cell.th-cell,
.ea-table_fixed-column .ea-table_header-wrap .ea-table_header .ea-table__cell.th-cell,
.ea-table_fixed-column .ea-table_body-wrap .ea-table_main .ea-table__cell.th-cell,
.ea-table_fixed-column .ea-table_main .ea-table__cell.th-cell {
  color: #909399;
}
.ea-table_wrap .ea-table_header-wrap .ea-table_header .ea-table__cell.is-gutter,
.ea-table_wrap .ea-table_body-wrap .ea-table_main .ea-table__cell.is-gutter,
.ea-table_wrap .ea-table_main .ea-table__cell.is-gutter,
.ea-table_fixed-column .ea-table_header-wrap .ea-table_header .ea-table__cell.is-gutter,
.ea-table_fixed-column .ea-table_body-wrap .ea-table_main .ea-table__cell.is-gutter,
.ea-table_fixed-column .ea-table_main .ea-table__cell.is-gutter {
  width: 15px;
  padding: 0;
}
.ea-table_wrap .ea-table_header-wrap .ea-table_header.border .ea-table__cell,
.ea-table_wrap .ea-table_body-wrap .ea-table_main.border .ea-table__cell,
.ea-table_wrap .ea-table_main.border .ea-table__cell,
.ea-table_fixed-column .ea-table_header-wrap .ea-table_header.border .ea-table__cell,
.ea-table_fixed-column .ea-table_body-wrap .ea-table_main.border .ea-table__cell,
.ea-table_fixed-column .ea-table_main.border .ea-table__cell {
  border: 1px solid #ebeef5;
  padding: 8px;
  color: #606266;
}
.ea-table_wrap .ea-table_header-wrap .ea-table_header.border .ea-table__cell.is-gutter,
.ea-table_wrap .ea-table_body-wrap .ea-table_main.border .ea-table__cell.is-gutter,
.ea-table_wrap .ea-table_main.border .ea-table__cell.is-gutter,
.ea-table_fixed-column .ea-table_header-wrap .ea-table_header.border .ea-table__cell.is-gutter,
.ea-table_fixed-column .ea-table_body-wrap .ea-table_main.border .ea-table__cell.is-gutter,
.ea-table_fixed-column .ea-table_main.border .ea-table__cell.is-gutter {
  width: 15px;
  padding: 0;
  min-width: none;
}
.ea-table_wrap .ea-table_header-wrap .ea-table_header.stripe .ea-table__row:nth-child(2n),
.ea-table_wrap .ea-table_body-wrap .ea-table_main.stripe .ea-table__row:nth-child(2n),
.ea-table_wrap .ea-table_main.stripe .ea-table__row:nth-child(2n),
.ea-table_fixed-column .ea-table_header-wrap .ea-table_header.stripe .ea-table__row:nth-child(2n),
.ea-table_fixed-column .ea-table_body-wrap .ea-table_main.stripe .ea-table__row:nth-child(2n),
.ea-table_fixed-column .ea-table_main.stripe .ea-table__row:nth-child(2n) {
  background-color: #fafafa;
}
.ea-table_wrap .ea-table_main,
.ea-table_fixed-column .ea-table_main {
  position: absolute;
  left: 0;
  top: 0;
}
.ea-table_wrap .ea-table_body-wrap,
.ea-table_fixed-column .ea-table_body-wrap {
  overflow-y: auto;
}
.ea-table_wrap .ea-table_body-wrap .ea-table_main .ea-table__row:hover,
.ea-table_fixed-column .ea-table_body-wrap .ea-table_main .ea-table__row:hover {
  background-color: #f5f7fa;
}
.ea-table_wrap .ea-table_body-wrap .ea-table_main .ea-table__row.is-current-row,
.ea-table_fixed-column .ea-table_body-wrap .ea-table_main .ea-table__row.is-current-row {
  background-color: #ecf5ff;
}
`;var g,w,A,y,p,E,f,v,L,C,T,W,N,G,B,U,H,X,M,K,$,P,q,J,D,Q,j,V,z,Y;class le extends F{constructor(){super();s(this,N);s(this,B);s(this,H);s(this,M);s(this,$);s(this,q);s(this,D);s(this,j);s(this,z);s(this,g,void 0);s(this,w,void 0);s(this,A,void 0);s(this,y,void 0);s(this,p,void 0);s(this,E,void 0);s(this,f,void 0);s(this,v,void 0);s(this,L,void 0);s(this,C,void 0);s(this,T,void 0);s(this,W,void 0);const e=this.attachShadow({mode:"open"});e.innerHTML=`
            <div class="ea-table_wrap" part="container">
                <div class="ea-table_header-wrap" part="header-wrap">
                    <table class="ea-table_header" part="header-table">
                        <colgroup></colgroup>
                        <thead></thead>
                    </table>
                </div>
                <div class="ea-table_body-wrap" part="body-wrap">
                    <table class="ea-table_main" part="body-table">
                        <colgroup></colgroup>
                        <tbody></tbody>
                        <slot name="empty" style="display: none;"></slot>
                    </table>
                </div>
            </div>
            <slot></slot>
            <slot name="header"></slot>
            <slot name="body"></slot>
        `,this.build(e,ae),d(this,g,this.shadowRoot.querySelector(".ea-table_wrap")),d(this,w,this.shadowRoot.querySelector(".ea-table_header")),d(this,A,r(this,w).querySelector(".ea-table_header colgroup")),d(this,y,r(this,w).querySelector(".ea-table_header thead")),d(this,p,this.shadowRoot.querySelector(".ea-table_main")),d(this,E,r(this,p).querySelector(".ea-table_body-wrap colgroup")),d(this,f,r(this,p).querySelector(".ea-table_body-wrap tbody")),d(this,v,this.querySelectorAll("ea-table-column"))}get border(){return this.getAttrBoolean("border")}set border(e){this.setAttribute("border",e),r(this,g).classList.toggle("border",e),r(this,w).classList.toggle("border",e),r(this,p).classList.toggle("border",e)}get stripe(){return this.getAttrBoolean("stripe")}set stripe(e){this.setAttribute("stripe",e),r(this,g).classList.toggle("stripe",e)}get height(){return this.getAttrNumber("height")}set height(e){if(this.setAttribute("height",e),e){const t=this.shadowRoot.querySelector(".ea-table_body-wrap");t.style.height=`${e}px`}else r(this,g).style.height=""}get highlightCurrentRow(){return this.getAttrBoolean("highlight-current-row")||!1}set highlightCurrentRow(e){this.setAttribute("highlight-current-row",e)}get currentRow(){return this.getAttrNumber("current-row")||0}set currentRow(e){this.setAttribute("current-row",e)}get data(){return r(this,C)||[]}set data(e){const t=JSON.stringify(e);let l=JSON.parse(t);d(this,C,l),this.renderTableBody(l)}get currentRowDetail(){const e=this.currentRow,t=this.data[e],l=r(this,p).querySelectorAll(".ea-table__row")[e]||null;return{index:e,data:t,target:l}}renderTableBody(e){if(r(this,f).innerHTML="",!r(this,T)){e=_(this,q,J).call(this,e,"index"),e=_(this,q,J).call(this,e,"selection");const l=Array.from(r(this,w).querySelectorAll("ea-table-column")).map((i,a)=>i.type==="default"?i.prop:i.type);e=e.map(i=>{const a={};return l.forEach(o=>{o!==null&&o!=="null"&&typeof o<"u"&&o!=="undefined"&&(a[o]=i[o])}),a}),d(this,T,!0)}e.forEach((l,i)=>{const a=m("tr","ea-table__row");a.part="row",Object.entries(l).forEach(([o,n])=>{const h=m("td","ea-table__cell td_cell");h.part="td-cell",h.innerHTML=n,o==="selection"&&h.querySelector("ea-checkbox").addEventListener("change",S=>{const u=this.shadowRoot.querySelectorAll("ea-checkbox"),O=Array.from(u).filter((R,k)=>(R.index=k,R.checked)),Z=O.map(R=>{const k=e[R.index];return delete k.selection,k});this.dispatchEvent(new CustomEvent("body-selection-change",{composed:!0,bubbles:!0,detail:{checked:S.detail.checked,currentRow:a,currentRowData:l,checkedElements:O,checkedElementsData:Z}}))}),a.appendChild(h)}),_(this,$,P).call(this,a,l),r(this,f).appendChild(a)}),d(this,C,e);const t=this.shadowRoot.querySelector('slot[name="empty"]');e.length>0?t.style.display="none":t.style.display="block",_(this,D,Q).call(this)}connectedCallback(){this.style.position="relative",this.border=this.border,this.stripe=this.stripe,this.height=this.height,this.highlightCurrentRow=this.highlightCurrentRow,_(this,M,K).call(this),_(this,B,U).call(this),_(this,j,V).call(this),_(this,z,Y).call(this)}}g=new WeakMap,w=new WeakMap,A=new WeakMap,y=new WeakMap,p=new WeakMap,E=new WeakMap,f=new WeakMap,v=new WeakMap,L=new WeakMap,C=new WeakMap,T=new WeakMap,W=new WeakMap,N=new WeakSet,G=function(e,t,l,i,a,o=!1){const n=this.parentNode.clientWidth,h=Array.from(i.children).reduce((S,u)=>S+Number(u.getAttribute("width")),0);n>0&&h<=n?(l.style.width=`${n-a}px`,e.style.width=`${n}px`,t.style.width=`${n-a}px`,o&&(e.style.width=`${n}px`)):(l.style.width=`${n}px`,e.style.width=`${n}px`,t.style.width=`${n}px`)},B=new WeakSet,U=function(){const e=this.shadowRoot.querySelector(".ea-table_header-wrap"),t=this.shadowRoot.querySelector(".ea-table_body-wrap");let l=null;const i=()=>{_(this,N,G).call(this,r(this,g),r(this,p),r(this,w),r(this,A),l)};window.addEventListener("resize",()=>{i()}),setTimeout(()=>{l=r(this,g).getBoundingClientRect().width-r(this,p).getBoundingClientRect().width,i()},0),t.addEventListener("scroll",a=>{e.style.transform=`translateX(-${t.scrollLeft}px)`})},H=new WeakSet,X=function(e,t){if(t.sortable&&t.type!=="selection"){const l=m("ea-icon");l.icon="icon-angle-down",l.style.float="right",e.appendChild(l),e.addEventListener("click",()=>{l.color="#5cb6ff",t.order==="asc"?(t.order="desc",l.icon="icon-angle-up"):(t.order="asc",l.icon="icon-angle-down");let a=this.data.sort((o,n)=>{const h=t.prop!=="null"?t.prop:t.type;return t.order==="asc"?String(o[h]).localeCompare(n[h]):String(n[h]).localeCompare(o[h])});this.renderTableBody(a),this.dispatchEvent(new CustomEvent("sort-change",{detail:{prop:t.prop,order:t.order},composed:!0,bubbles:!0}))})}},M=new WeakSet,K=function(){this.querySelectorAll("ea-table-column"),r(this,A).innerHTML="",r(this,E).innerHTML="",r(this,y).innerHTML="";const e=(t,l=1)=>{const i=m("tr");i.part="row",i.setAttribute("index",l),Array.from(t).forEach(a=>{if(a.nodeName!=="EA-TABLE-COLUMN")return;const o=m("th","ea-table__cell th-cell");if(o.part="th-cell",o.setAttribute("colspan",a.colspan||1),o.setAttribute("rowspan",a.rowspan||1),o.appendChild(a),i.appendChild(o),a.type==="selection"&&d(this,L,a.querySelector("ea-checkbox")),a.children.length>0)e(a.children,++l);else{const n=m("col");n.setAttribute("width",a.getAttribute("width")||100);const h=m("col");h.setAttribute("width",a.getAttribute("width")||100),r(this,A).appendChild(n),r(this,E).appendChild(h),r(this,y).appendChild(i),_(this,H,X).call(this,o,a)}})};e(this.children)},$=new WeakSet,P=function(e,t){e.addEventListener("click",()=>{const l=r(this,f).querySelectorAll(".ea-table__row");let i=!1;l.forEach((a,o)=>{a.type,a.type==="selection"&&(i=!0),a.index=o,this.highlightCurrentRow&&a.classList.remove("is-current-row")}),this.highlightCurrentRow&&e.classList.add("is-current-row"),i&&delete t.selection,this.currentRow=e.index,this.dispatchEvent(new CustomEvent("current-change",{composed:!0,bubbles:!0,detail:{index:e.index,row:e,data:t}}))})},q=new WeakSet,J=function(e,t){const l=r(this,w).querySelectorAll("ea-table-column");let i=0,a=!1;return l.forEach((o,n)=>{o.type===t&&(i=n,a=!0)}),a?e.map((o,n)=>{const h={},S=Object.keys(o);return S.splice(i,0,t),S.forEach((u,O)=>{u==="index"?h[u]=n+1:u==="selection"?h[u]="<ea-checkbox></ea-checkbox>":h[u]=o[u]}),h}):e},D=new WeakSet,Q=function(){const e=r(this,f).querySelectorAll("tr"),t=this.shadowRoot.querySelector('slot[name="body"]');t.assignedNodes().length?(e.forEach(l=>{const i=m("td","ea-table__cell");i.part="td-cell",Array.from(t.assignedNodes()).forEach(a=>{const o=a.cloneNode(!0);i.appendChild(o),o.addEventListener("click",()=>{a.dispatchEvent(new CustomEvent("click",{bubbles:!0,composed:!0,detail:{row:l}}))})}),l.appendChild(i)}),t.style.display="none"):t.remove()},j=new WeakSet,V=function(){const e=this.shadowRoot.querySelectorAll("ea-table-column");Array.from(e).some(t=>t.type==="selection")&&(this.addEventListener("header-selection-change",t=>{r(this,p).querySelectorAll("ea-checkbox").forEach(i=>{i.checked=t.detail.checked})}),this.addEventListener("body-selection-change",t=>{const l=r(this,y).querySelector("ea-table-column").shadowRoot.querySelector("ea-checkbox"),i=r(this,p).querySelectorAll("ea-checkbox");let a=Array.from(i).map(o=>o.checked);a.every(o=>o===!0)?l.checked=!0:a.every(o=>o===!1)?l.checked=!1:l.indeterminate=!0}))},z=new WeakSet,Y=function(){const e=this.shadowRoot.querySelector('slot[name="header"]');if(e.assignedNodes().length>0){const t=r(this,y).querySelector("tr"),l=m("th","ea-table__cell th-cell");l.part="th-cell";let i=1;Array.from(r(this,y).querySelectorAll("th")).forEach(a=>{a.rowSpan>i&&(i=a.rowSpan)}),l.rowSpan=i,l.appendChild(e),t.appendChild(l)}else e.remove()};customElements.get("ea-table")||customElements.define("ea-table",le);export{le as EaTable};
