var H=(t,n,e)=>{if(!n.has(t))throw TypeError("Cannot "+e)};var p=(t,n,e)=>(H(t,n,"read from private field"),e?e.call(t):n.get(t)),d=(t,n,e)=>{if(n.has(t))throw TypeError("Cannot add the same private member more than once");n instanceof WeakSet?n.add(t):n.set(t,e)},o=(t,n,e,a)=>(H(t,n,"write to private field"),a?a.call(t,e):n.set(t,e),e);var g=(t,n,e)=>(H(t,n,"access private method"),e);import{B as O}from"./Base.yCeCPjNm.js";import{c as l}from"./createElement.BM9xfELw.js";import"./index.CPYSStCC.js";import"./ea-button.B2M6Cckg.js";import"./index.CnKGfFkJ.js";import"./index.CULlEqES.js";const P=`
@import url('/ea_ui_component/icon/index.css');

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
`,W=(t,n)=>{const e=l("ea-button",`ea-calendar-header_sg-changer ea-calendar-header_changer-${n}`);return e.innerText=t,e.size="small",e},Q=(t=["一","二","三","四","五","六","日"])=>{const n=l("tr"),e=t.map(a=>{const s=l("th");return s.innerText=a,s});return n.append(...e),n};var E,f,$,x,m,M,y,_,C,I,F,R,T,U,S,q,Y,A;class V extends O{constructor(){super();d(this,C);d(this,F);d(this,T);d(this,S);d(this,Y);d(this,E,void 0);d(this,f,void 0);d(this,$,void 0);d(this,x,void 0);d(this,m,void 0);d(this,M,void 0);d(this,y,void 0);d(this,_,void 0);const e=this.attachShadow({mode:"open"}),a=l("span","ea-calendar-header_content"),s=W("上个月","lastMonth"),c=W("今天","today"),i=W("下个月","nextMonth"),r=l("ea-button-group","ea-calendar-header_changer",[s,c,i]),h=l("thead","ea-calendar_table-head"),D=l("tbody","ea-calendar_table-body"),L=l("table","ea-calendar_table",[h,D]),k=l("div","ea-calendar_calendar-wrap",[L]),u=l("div","ea-calendar-header_wrap",[a,r]),b=l("div","ea-calendar_wrap",[u,k]);o(this,E,b),o(this,f,a),o(this,$,r),o(this,x,s),o(this,m,c),o(this,M,i),o(this,y,h),o(this,_,D),this.build(e,P),this.shadowRoot.appendChild(b)}getToday(){const e=new Date;return`${e.getFullYear()}-${e.getMonth()+1}`}getUserToday(e){const a=new Date(e);return`${a.getFullYear()}-${a.getMonth()+1}`}get weekStart(){return this.getAttribute("week-start")||"一"}set weekStart(e){this.setAttribute("week-start",e),p(this,y).innerHTML=Q(g(this,C,I).call(this,this.week,e)).innerHTML}get date(){return this.getAttribute("date")||this.getToday()}set date(e){this.setAttribute("date",e),p(this,f).innerHTML=e=isNaN(new Date(e))?this.getToday():this.getUserToday(e),g(this,S,q).call(this,p(this,_),e,this.weekStart)}get week(){return["日","一","二","三","四","五","六"]}init(){this.weekStart=this.weekStart,this.date=this.date,g(this,Y,A).call(this)}connectedCallback(){this.init()}}E=new WeakMap,f=new WeakMap,$=new WeakMap,x=new WeakMap,m=new WeakMap,M=new WeakMap,y=new WeakMap,_=new WeakMap,C=new WeakSet,I=function(e,a){if(!e.includes(a))return e;const s=e.findIndex((c,i)=>{if(c===a)return i});return s===0||s===-1?e:e.slice(s).concat(e.slice(0,s))},F=new WeakSet,R=function(e){e.addEventListener("click",a=>{p(this,_).querySelectorAll("td").forEach(c=>{c.classList.remove("is-selected")}),e.classList.contains("is-selected")?e.classList.remove("is-selected"):e.classList.add("is-selected");const s=new Date(this.date);this.dispatchEvent(new CustomEvent("select",{detail:{year:s.getFullYear(),month:s.getMonth()+1,date:Number(e.innerText),day:this.week[Number(e.innerText)%7]}}))})},T=new WeakSet,U=function(e){const a=new Date(this.date);a.setMonth(a.getMonth()+(e==="next"?1:-1)),this.date=`${a.getFullYear()}-${a.getMonth()+1}-${a.getDate()}`},S=new WeakSet,q=function(e,a,s="一"){a=isNaN(new Date(a))?new Date:new Date(a),e.innerHTML="";const c=new Date(a),i=c.getMonth()+1,r=new Date(a);r.setDate(1);const h=new Date(a);h.setMonth(i),h.setDate(0);const D=new Date(a);D.setMonth(i),D.setDate(1);const L=g(this,C,I).call(this,this.week,s);for(let k=0;k<6;k++){const u=l("tr");for(let b=0;b<7;b++){const{length:j}=u.children,w=l("td"),v=l("span"),N=r.getDay(),B=new Date;if(L[j]===this.week[N]&&i===r.getMonth()+1)v.innerText=r.getDate(),r.setDate(r.getDate()+1),g(this,F,R).call(this,w);else if(i==r.getMonth())v.innerText=r.getDate(),r.setDate(r.getDate()+1),w.classList.add("is-disabled");else{const z=b-N+2,G=L.findIndex((J,K)=>{if(J==="一")return K});h.setMonth(i-1),h.setDate(z>0?N+j-G:z),v.innerText=h.getDate(),w.classList.add("is-disabled")}new Date(this.date),r.getFullYear()===B.getFullYear()&&r.getMonth()===B.getMonth()&&r.getDate()===B.getDate()+1&&w.classList.add("is-today"),r.getFullYear()===c.getFullYear()&&r.getMonth()===c.getMonth()&&r.getDate()===c.getDate()+1&&w.classList.add("is-selected"),w.appendChild(v),u.appendChild(w)}e.appendChild(u)}},Y=new WeakSet,A=function(){p(this,x).addEventListener("click",()=>{g(this,T,U).call(this,"last")}),p(this,m).addEventListener("click",()=>{this.date=`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`}),p(this,M).addEventListener("click",()=>{g(this,T,U).call(this,"next")})};customElements.get("ea-calendar")||customElements.define("ea-calendar",V);export{V as EaCalendar};
