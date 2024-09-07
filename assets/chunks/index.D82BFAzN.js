var $=(a,t,e)=>{if(!t.has(a))throw TypeError("Cannot "+e)};var c=(a,t,e)=>($(a,t,"read from private field"),e?e.call(a):t.get(a)),l=(a,t,e)=>{if(t.has(a))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(a):t.set(a,e)},i=(a,t,e,r)=>($(a,t,"write to private field"),r?r.call(a,e):t.set(a,e),e);var D=(a,t,e)=>($(a,t,"access private method"),e);import{B as J}from"./Base.LSgLRpFA.js";import{c as o}from"./createElement.Dy1aXqlz.js";import"./index.D6SVBbJV.js";import"./index.YqKkBJbz.js";import"./index.CQU1UkII.js";const K=(a=["一","二","三","四","五","六","日"])=>{const t=o("tr");t.part="table-head-row";const e=a.map(r=>{const d=o("th");return d.part="table-head-item",d.innerText=r,d});return t.append(...e),t};function I(){const a=new Date;return`${a.getFullYear()}-${a.getMonth()+1}`}function O(a){const t=new Date(a);return`${t.getFullYear()}-${t.getMonth()+1}`}function j(a,t){if(!a.includes(t))return a;const e=a.findIndex((r,d)=>{if(r===t)return d});return e===0||e===-1?a:a.slice(e).concat(a.slice(0,e))}const P=`
.ea-calendar_wrap {
  padding: 12px 20px 35px;
}
.ea-calendar_wrap .ea-calendar-header_wrap {
  border-bottom: 1px solid #ebeef5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.5rem;
}
.ea-calendar_wrap .ea-calendar-header_wrap .ea-calendar-header_changer .ea-calendar-header_sg-changer {
  border: 1px solid #ebeef5;
  border-left: 0px none transparent;
}
.ea-calendar_wrap .ea-calendar-header_wrap .ea-calendar-header_changer .ea-calendar-header_sg-changer:first-child {
  border-left: 1px solid #ebeef5;
}
.ea-calendar_wrap .ea-calendar_calendar-wrap .ea-calendar_table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
}
.ea-calendar_wrap .ea-calendar_calendar-wrap .ea-calendar_table th {
  font-weight: 400;
  color: #606266;
  padding: 12px 0;
}
.ea-calendar_wrap .ea-calendar_calendar-wrap .ea-calendar_table td {
  border-right: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
}
.ea-calendar_wrap .ea-calendar_calendar-wrap .ea-calendar_table td.is-selected {
  color: #1989fa;
  background-color: #f2f8fe;
}
.ea-calendar_wrap .ea-calendar_calendar-wrap .ea-calendar_table td.is-today {
  color: #1989fa;
}
.ea-calendar_wrap .ea-calendar_calendar-wrap .ea-calendar_table td.is-disabled {
  pointer-events: none;
  color: #c0c4cc;
}
.ea-calendar_wrap .ea-calendar_calendar-wrap .ea-calendar_table td span {
  display: block;
  box-sizing: border-box;
  height: 85px;
  padding: 8px;
}
.ea-calendar_wrap .ea-calendar_calendar-wrap .ea-calendar_table td span .calendar-description {
  margin-top: auto;
}
.ea-calendar_wrap .ea-calendar_calendar-wrap .ea-calendar_table tr:first-child td {
  border-top: 1px solid #ebeef5;
}
.ea-calendar_wrap .ea-calendar_calendar-wrap .ea-calendar_table tr td:first-child {
  border-left: 1px solid #ebeef5;
  border-top: 1px solid #ebeef5;
}
.ea-calendar_wrap.mini {
  font-size: 10px;
  text-align: center;
}
.ea-calendar_wrap.mini .ea-calendar-header_wrap {
  justify-content: space-around;
}
.ea-calendar_wrap.mini .ea-calendar-header_wrap .ea-calendar-header_changer {
  display: none;
}
.ea-calendar_wrap.mini .ea-calendar_calendar-wrap .ea-calendar_table td span {
  height: 20px;
  padding: 4px;
}
`;var y,h,x,v,b,m,g,M,w,T,A,L,z,k,W;class Q extends J{constructor(){super();l(this,T);l(this,L);l(this,k);l(this,y,void 0);l(this,h,void 0);l(this,x,void 0);l(this,v,void 0);l(this,b,void 0);l(this,m,void 0);l(this,g,void 0);l(this,M,void 0);l(this,w,void 0);const e=this.attachShadow({mode:"open"});e.innerHTML=`
            <div class='ea-calendar_wrap' part='container'>
                <div class='ea-calendar-header_wrap' part='header-wrap'>
                    <span class='ea-calendar-header_content' part='header-content'></span>
                    <ea-button-group class='ea-calendar-header_changer' part='header-changer'>
                        <ea-button class='ea-calendar-header_sg-changer ea-calendar-header_changer-lastMonth' part='header-changer-lastMonth' size="small">上个月</ea-button>
                        <ea-button class='ea-calendar-header_sg-changer ea-calendar-header_changer-today' part='header-changer-today' size="small">今天</ea-button>
                        <ea-button class='ea-calendar-header_sg-changer ea-calendar-header_changer-nextMonth' part='header-changer-nextMonth' size="small">下个月</ea-button>
                    </ea-button-group>
                </div>
                <div class='ea-calendar_calendar-wrap' part='calendar-wrap'>
                    <table class='ea-calendar_table' part='table'>
                        <thead class='ea-calendar_table-head' part='table-head'></thead>
                        <tbody class='ea-calendar_table-body' part='table-body'></tbody>
                    </table>
                </div>
            </div>
        `,i(this,y,this.shadowRoot.querySelector(".ea-calendar_wrap")),i(this,x,e.querySelector(".ea-calendar-header_content")),i(this,h,e.querySelector(".ea-calendar-header_wrap")),i(this,v,e.querySelector(".ea-calendar-header_changer")),i(this,b,e.querySelector(".ea-calendar-header_changer-lastMonth")),i(this,m,e.querySelector(".ea-calendar-header_changer-today")),i(this,g,e.querySelector(".ea-calendar-header_changer-nextMonth")),i(this,M,e.querySelector(".ea-calendar_table-head")),i(this,w,e.querySelector(".ea-calendar_table-body")),this.build(e,P)}get weekStart(){return this.getAttribute("week-start")||"一"}set weekStart(e){this.setAttribute("week-start",e),c(this,M).innerHTML=K(j(this.week,e)).innerHTML}get date(){return this.getAttribute("date")||I()}set date(e){this.setAttribute("date",e),c(this,x).innerHTML=e=isNaN(new Date(e))?I():O(e),D(this,k,W).call(this,c(this,w),e,this.weekStart)}get size(){const e=this.getAttribute("size");return["mini"].includes(e)?e:"medium"}set size(e){if(this.setAttribute("size",e),c(this,y).classList.add(e),e==="mini"){const r=o("span","prev-btn");r.innerText="<";const d=o("span","next-btn");d.innerText=">",i(this,b,r),i(this,g,d),c(this,h).insertBefore(r,c(this,h).firstChild),c(this,h).appendChild(d)}}get week(){return["日","一","二","三","四","五","六"]}connectedCallback(){this.weekStart=this.weekStart,this.date=this.date,this.size=this.size,c(this,b).addEventListener("click",()=>{D(this,L,z).call(this,"last")}),c(this,m).addEventListener("click",()=>{this.date=`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`}),c(this,g).addEventListener("click",()=>{D(this,L,z).call(this,"next")})}}y=new WeakMap,h=new WeakMap,x=new WeakMap,v=new WeakMap,b=new WeakMap,m=new WeakMap,g=new WeakMap,M=new WeakMap,w=new WeakMap,T=new WeakSet,A=function(e){e.addEventListener("click",r=>{c(this,w).querySelectorAll("td").forEach(p=>{p.classList.remove("is-selected")}),e.classList.contains("is-selected")?e.classList.remove("is-selected"):e.classList.add("is-selected");const d=new Date(this.date);this.dispatchEvent(new CustomEvent("select",{detail:{year:d.getFullYear(),month:d.getMonth()+1,date:Number(e.innerText),day:this.week[Number(e.innerText)%7]}}))})},L=new WeakSet,z=function(e){const r=new Date(this.date);r.setMonth(r.getMonth()+(e==="next"?1:-1)),this.date=`${r.getFullYear()}-${r.getMonth()+1}-${r.getDate()}`},k=new WeakSet,W=function(e,r,d="一"){r=isNaN(new Date(r))?new Date:new Date(r),e.innerHTML="";const p=new Date(r),_=p.getMonth()+1,n=new Date(r);n.setDate(1);const u=new Date(r);u.setMonth(_),u.setDate(0);const F=new Date(r);F.setMonth(_),F.setDate(1);const Y=j(this.week,d);for(let B=0;B<6;B++){const S=o("tr");S.part="table-body-row";for(let C=0;C<7;C++){const{length:H}=S.children,s=o("td");s.part="table-body-cell";const f=o("span");f.part="table-body-cell-content";const E=n.getDay(),q=new Date;if(Y[H]===this.week[E]&&_===n.getMonth()+1)f.innerText=n.getDate(),n.setDate(n.getDate()+1),D(this,T,A).call(this,s);else if(_==n.getMonth())f.innerText=n.getDate(),n.setDate(n.getDate()+1),s.classList.add("is-disabled"),s.part="table-body-cell-disabled";else{const N=C-E+2,R=Y.findIndex((U,G)=>{if(U==="一")return G});u.setMonth(_-1),u.setDate(N>0?E+H-R:N),f.innerText=u.getDate(),s.part="table-body-cell-disabled",s.classList.add("is-disabled")}new Date(this.date),n.getFullYear()===q.getFullYear()&&n.getMonth()===q.getMonth()&&n.getDate()===q.getDate()+1&&(s.part="table-body-cell-today",s.classList.add("is-today")),n.getFullYear()===p.getFullYear()&&n.getMonth()===p.getMonth()&&n.getDate()===p.getDate()+1&&(s.part="table-body-cell-selected",s.classList.add("is-selected")),s.appendChild(f),S.appendChild(s)}e.appendChild(S)}};customElements.get("ea-calendar")||customElements.define("ea-calendar",Q);export{Q as EaCalendar};
