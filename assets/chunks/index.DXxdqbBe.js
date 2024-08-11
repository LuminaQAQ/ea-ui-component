var W=(c,d,e)=>{if(!d.has(c))throw TypeError("Cannot "+e)};var r=(c,d,e)=>(W(c,d,"read from private field"),e?e.call(c):d.get(c)),s=(c,d,e)=>{if(d.has(c))throw TypeError("Cannot add the same private member more than once");d instanceof WeakSet?d.add(c):d.set(c,e)},b=(c,d,e,t)=>(W(c,d,"write to private field"),t?t.call(c,e):d.set(c,e),e);var p=(c,d,e)=>(W(c,d,"access private method"),e);import{B as U}from"./Base.yCeCPjNm.js";import"./index.DSSfHWaE.js";import{c as u}from"./createElement.BM9xfELw.js";import"./index.BRYm2odX.js";const re=`
@import url('/ea_ui_component/icon/index.css');
`;var A,k,X;class oe extends U{constructor(){super();s(this,k);s(this,A,void 0);const e=this.attachShadow({mode:"open"});e.innerHTML=`
            <th>
                <slot></slot>
                <span></span>
            </th>
        `}get prop(){return this.getAttribute("prop")}set prop(e){this.setAttribute("prop",e)}get width(){return this.getAttrNumber("width")||350}set width(e){this.setAttribute("width",e)}get label(){return this.getAttribute("label")||""}set label(e){this.setAttribute("label",e),e!==""&&(r(this,A).innerHTML=e)}get colspan(){return this.getAttrNumber("colspan")||1}set colspan(e){this.setAttribute("colspan",e)}get rowspan(){return this.getAttrNumber("rowspan")||1}set rowspan(e){this.setAttribute("rowspan",e)}get type(){const e=this.getAttribute("type");return["default","index","selection"].includes(e)?e:"default"}set type(e){this.setAttribute("type",e),e==="selection"&&(r(this,A).innerHTML=`
                <ea-checkbox></ea-checkbox>
            `,r(this,A).querySelector("ea-checkbox").addEventListener("change",t=>{this.dispatchEvent(new CustomEvent("header-selection-change",{detail:{checked:t.detail.checked},composed:!0}))}))}get sortable(){return this.getAttrBoolean("sortable")||!1}set sortable(e){this.setAttribute("sortable",e)}get order(){return this.getAttribute("order")||"asc"}set order(e){this.setAttribute("order",e)}connectedCallback(){p(this,k,X).call(this)}}A=new WeakMap,k=new WeakSet,X=function(){this.build(this.shadowRoot,re),b(this,A,this.shadowRoot.querySelector("span")),this.prop=this.prop,this.width=this.width,this.label=this.label,this.colspan=this.colspan,this.rowspan=this.rowspan,this.type=this.type,this.sortable=this.sortable,this.order=this.order};customElements.get("ea-table-column")||customElements.define("ea-table-column",oe);const ie=`
@import url('/ea_ui_component/icon/index.css');

.ea-table_wrap,
.ea-table_fixed-column {
  position: relative;
  background-color: #fff;
  overflow: hidden;
}
.ea-table_wrap.stripe .ea-table__row:nth-child(2n),
.ea-table_fixed-column.stripe .ea-table__row:nth-child(2n) {
  background-color: #fafafa;
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
`;var g,m,y,f,_,S,x,L,N,C,R,G,B,K,H,P,M,Q,$,V,D,Y,q,F,j,Z,z,ee,O,te,I,ae;class se extends U{constructor(){super();s(this,B);s(this,H);s(this,M);s(this,$);s(this,D);s(this,q);s(this,j);s(this,z);s(this,O);s(this,I);s(this,g,void 0);s(this,m,void 0);s(this,y,void 0);s(this,f,void 0);s(this,_,void 0);s(this,S,void 0);s(this,x,void 0);s(this,L,void 0);s(this,N,void 0);s(this,C,void 0);s(this,R,void 0);s(this,G,void 0);const e=this.attachShadow({mode:"open"});e.innerHTML=`
            <div class="ea-table_wrap">
                <div class="ea-table_header-wrap">
                    <table class="ea-table_header">
                        <colgroup></colgroup>
                        <thead></thead>
                    </table>
                </div>
                <div class="ea-table_body-wrap">
                    <table class="ea-table_main">
                        <colgroup></colgroup>
                        <tbody></tbody>
                        <slot name="empty" style="display: none;"></slot>
                    </table>
                </div>
            </div>
            <slot></slot>
            <slot name="header"></slot>
            <slot name="body"></slot>
        `,this.build(this.shadowRoot,ie),b(this,g,this.shadowRoot.querySelector(".ea-table_wrap")),b(this,m,this.shadowRoot.querySelector(".ea-table_header")),b(this,y,r(this,m).querySelector(".ea-table_header colgroup")),b(this,f,r(this,m).querySelector(".ea-table_header thead")),b(this,_,this.shadowRoot.querySelector(".ea-table_main")),b(this,S,r(this,_).querySelector(".ea-table_body-wrap colgroup")),b(this,x,r(this,_).querySelector(".ea-table_body-wrap tbody")),b(this,L,this.querySelectorAll("ea-table-column"))}get border(){return this.getAttrBoolean("border")}set border(e){this.setAttribute("border",e),r(this,g).classList.toggle("border",e),r(this,m).classList.toggle("border",e),r(this,_).classList.toggle("border",e)}get stripe(){return this.getAttrBoolean("stripe")}set stripe(e){this.setAttribute("stripe",e),r(this,g).classList.toggle("stripe",e)}get height(){return this.getAttrNumber("height")}set height(e){if(this.setAttribute("height",e),e){const t=this.shadowRoot.querySelector(".ea-table_body-wrap");t.style.height=`${e}px`}else r(this,g).style.height=""}get highlightCurrentRow(){return this.getAttrBoolean("highlight-current-row")||!1}set highlightCurrentRow(e){this.setAttribute("highlight-current-row",e)}get currentRow(){return this.getAttrNumber("current-row")||0}set currentRow(e){this.setAttribute("current-row",e)}get data(){return r(this,C)||[]}set data(e){const t=JSON.stringify(e);let l=JSON.parse(t);b(this,C,l),this.renderTableBody(l)}get currentRowDetail(){const e=this.currentRow,t=this.data[e],l=r(this,_).querySelectorAll(".ea-table__row")[e]||null;return{index:e,data:t,target:l}}set currentRowDetail(e){const{index:t,data:l,target:o}=e;this.currentRow=t,r(this,_).querySelectorAll(".ea-table__row").forEach((a,i)=>{i==t?(a.classList.add("is-current-row"),o&&o.classList.add("is-current-row")):(a.classList.remove("is-current-row"),o&&o.classList.remove("is-current-row"))})}renderTableBody(e){if(r(this,x).innerHTML="",!r(this,R)){e=p(this,q,F).call(this,e,"index"),e=p(this,q,F).call(this,e,"selection");const l=Array.from(r(this,m).querySelectorAll("ea-table-column")).map((o,a)=>o.type==="default"?o.prop:o.type);e=e.map(o=>{const a={};return l.forEach(i=>{i!==null&&i!=="null"&&typeof i<"u"&&i!=="undefined"&&(a[i]=o[i])}),a}),b(this,R,!0)}e.forEach((l,o)=>{const a=u("tr","ea-table__row");Object.entries(l).forEach(([i,n])=>{const h=u("td","ea-table__cell td_cell");h.innerHTML=n,i==="selection"&&h.querySelector("ea-checkbox").addEventListener("change",E=>{const w=this.shadowRoot.querySelectorAll("ea-checkbox"),J=Array.from(w).filter((T,v)=>(T.index=v,T.checked)),le=J.map(T=>{const v=e[T.index];return delete v.selection,v});this.dispatchEvent(new CustomEvent("body-selection-change",{composed:!0,bubbles:!0,detail:{checked:E.detail.checked,currentRow:a,currentRowData:l,checkedElements:J,checkedElementsData:le}}))}),a.appendChild(h)}),p(this,D,Y).call(this,a,l),r(this,x).appendChild(a)}),b(this,C,e);const t=this.shadowRoot.querySelector('slot[name="empty"]');e.length>0?t.style.display="none":t.style.display="block",p(this,j,Z).call(this)}connectedCallback(){p(this,I,ae).call(this)}}g=new WeakMap,m=new WeakMap,y=new WeakMap,f=new WeakMap,_=new WeakMap,S=new WeakMap,x=new WeakMap,L=new WeakMap,N=new WeakMap,C=new WeakMap,R=new WeakMap,G=new WeakMap,B=new WeakSet,K=function(e,t,l,o,a,i=!1){const n=this.parentNode.clientWidth,h=Array.from(o.children).reduce((E,w)=>E+Number(w.getAttribute("width")),0);n>0&&h<=n?(l.style.width=`${n-a}px`,e.style.width=`${n}px`,t.style.width=`${n-a}px`,i&&(e.style.width=`${n}px`)):(l.style.width=`${n}px`,e.style.width=`${n}px`,t.style.width=`${n}px`)},H=new WeakSet,P=function(){const e=this.shadowRoot.querySelector(".ea-table_header-wrap");this.shadowRoot.querySelector(".ea-table_header-wrap colgroup"),this.shadowRoot.querySelector(".ea-table_body-wrap colgroup");const t=this.shadowRoot.querySelector(".ea-table_body-wrap");this.shadowRoot.querySelector(".ea-table_body-wrap .ea-table_main");let l=null;const o=()=>{p(this,B,K).call(this,r(this,g),r(this,_),r(this,m),r(this,y),l)};window.addEventListener("resize",()=>{o()}),setTimeout(()=>{l=r(this,g).getBoundingClientRect().width-r(this,_).getBoundingClientRect().width,o()},0),t.addEventListener("scroll",a=>{e.style.transform=`translateX(-${t.scrollLeft}px)`})},M=new WeakSet,Q=function(e,t){if(t.sortable&&t.type!=="selection"){const l=u("ea-icon");l.icon="icon-angle-down",l.style.float="right",e.appendChild(l),e.addEventListener("click",()=>{l.color="#5cb6ff",t.order==="asc"?(t.order="desc",l.icon="icon-angle-up"):(t.order="asc",l.icon="icon-angle-down");let a=this.data.sort((i,n)=>{const h=t.prop!=="null"?t.prop:t.type;return t.order==="asc"?String(i[h]).localeCompare(n[h]):String(n[h]).localeCompare(i[h])});this.renderTableBody(a),this.dispatchEvent(new CustomEvent("sort-change",{detail:{prop:t.prop,order:t.order},composed:!0,bubbles:!0}))})}},$=new WeakSet,V=function(){this.querySelectorAll("ea-table-column"),r(this,y).innerHTML="",r(this,S).innerHTML="",r(this,f).innerHTML="";const e=(t,l=1)=>{const o=u("tr");o.setAttribute("index",l),Array.from(t).forEach(a=>{if(a.nodeName!=="EA-TABLE-COLUMN")return;const i=u("th","ea-table__cell th-cell");if(i.setAttribute("colspan",a.colspan||1),i.setAttribute("rowspan",a.rowspan||1),i.appendChild(a),o.appendChild(i),a.type==="selection"&&b(this,N,a.querySelector("ea-checkbox")),a.children.length>0)e(a.children,++l);else{const n=u("col");n.setAttribute("width",a.getAttribute("width")||100);const h=u("col");h.setAttribute("width",a.getAttribute("width")||100),r(this,y).appendChild(n),r(this,S).appendChild(h),r(this,f).appendChild(o),p(this,M,Q).call(this,i,a)}})};e(this.children)},D=new WeakSet,Y=function(e,t){e.addEventListener("click",()=>{const l=r(this,x).querySelectorAll(".ea-table__row");let o=!1;l.forEach((a,i)=>{a.type,a.type==="selection"&&(o=!0),a.index=i,this.highlightCurrentRow&&a.classList.remove("is-current-row")}),this.highlightCurrentRow&&e.classList.add("is-current-row"),o&&delete t.selection,this.currentRow=e.index,this.dispatchEvent(new CustomEvent("current-change",{composed:!0,bubbles:!0,detail:{index:e.index,row:e,data:t}}))})},q=new WeakSet,F=function(e,t){const l=r(this,m).querySelectorAll("ea-table-column");let o=0,a=!1;return l.forEach((i,n)=>{i.type===t&&(o=n,a=!0)}),a?e.map((i,n)=>{const h={},E=Object.keys(i);return E.splice(o,0,t),E.forEach((w,J)=>{w==="index"?h[w]=n+1:w==="selection"?h[w]="<ea-checkbox></ea-checkbox>":h[w]=i[w]}),h}):e},j=new WeakSet,Z=function(){const e=r(this,x).querySelectorAll("tr"),t=this.shadowRoot.querySelector('slot[name="body"]');if(t.assignedNodes().length===0)t.remove();else{const l=u("col"),o=u("col");l.setAttribute("width","100"),o.setAttribute("width","100"),r(this,S).appendChild(l),r(this,y).appendChild(o),e.forEach(a=>{const i=u("td","ea-table__cell td_cell");Array.from(t.assignedNodes()).forEach(n=>{const h=n.cloneNode(!0);i.appendChild(h),h.addEventListener("click",()=>{n.dispatchEvent(new CustomEvent("click",{bubbles:!0,composed:!0,detail:{row:a}}))})}),a.appendChild(i)}),t.style.display="none"}},z=new WeakSet,ee=function(){const e=this.shadowRoot.querySelectorAll("ea-table-column");Array.from(e).some(t=>t.type==="selection")&&(this.addEventListener("header-selection-change",t=>{r(this,_).querySelectorAll("ea-checkbox").forEach(o=>{o.checked=t.detail.checked})}),this.addEventListener("body-selection-change",t=>{const l=r(this,f).querySelector("ea-table-column").shadowRoot.querySelector("ea-checkbox"),o=r(this,_).querySelectorAll("ea-checkbox");let a=Array.from(o).map(i=>i.checked);a.every(i=>i===!0)?l.checked=!0:a.every(i=>i===!1)?l.checked=!1:l.indeterminate=!0}))},O=new WeakSet,te=function(){const e=this.shadowRoot.querySelector('slot[name="header"]');if(e.assignedNodes().length>0){const t=r(this,f).querySelector("tr"),l=u("th","ea-table__cell th-cell");let o=1;Array.from(r(this,f).querySelectorAll("th")).forEach(a=>{a.rowSpan>o&&(o=a.rowSpan)}),l.rowSpan=o,l.appendChild(e),t.appendChild(l)}else e.remove()},I=new WeakSet,ae=function(){this.style.position="relative",this.border=this.border,this.stripe=this.stripe,this.height=this.height,this.highlightCurrentRow=this.highlightCurrentRow,p(this,$,V).call(this),p(this,H,P).call(this),p(this,z,ee).call(this),p(this,O,te).call(this)};customElements.get("ea-table")||customElements.define("ea-table",se);export{se as EaTable};
