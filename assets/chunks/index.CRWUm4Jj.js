var F=(t,r,e)=>{if(!r.has(t))throw TypeError("Cannot "+e)};var l=(t,r,e)=>(F(t,r,"read from private field"),e?e.call(t):r.get(t)),d=(t,r,e)=>{if(r.has(t))throw TypeError("Cannot add the same private member more than once");r instanceof WeakSet?r.add(t):r.set(t,e)},c=(t,r,e,a)=>(F(t,r,"write to private field"),a?a.call(t,e):r.set(t,e),e);var h=(t,r,e)=>(F(t,r,"access private method"),e);import{B as O}from"./Base.yCeCPjNm.js";import{c as g}from"./createElement.BM9xfELw.js";import"./index.Bo3IO5uk.js";import"./ea-button.B2M6Cckg.js";const P=`
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
`,Q=(t=["一","二","三","四","五","六","日"])=>{const r=g("tr"),e=t.map(a=>{const n=g("th");return n.innerText=a,n});return r.append(...e),r};var f,b,x,L,_,m,w,y,u,M,Y,S,U,T,B,k,W,C,R;class V extends O{constructor(){super();d(this,M);d(this,S);d(this,T);d(this,k);d(this,C);d(this,f,void 0);d(this,b,void 0);d(this,x,void 0);d(this,L,void 0);d(this,_,void 0);d(this,m,void 0);d(this,w,void 0);d(this,y,void 0);d(this,u,void 0);const e=this.attachShadow({mode:"open"});e.innerHTML=`
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
        `,c(this,f,this.shadowRoot.querySelector(".ea-calendar_wrap")),c(this,x,e.querySelector(".ea-calendar-header_content")),c(this,b,e.querySelector(".ea-calendar-header_wrap")),c(this,L,e.querySelector(".ea-calendar-header_changer")),c(this,_,e.querySelector(".ea-calendar-header_changer-lastMonth")),c(this,m,e.querySelector(".ea-calendar-header_changer-today")),c(this,w,e.querySelector(".ea-calendar-header_changer-nextMonth")),c(this,y,e.querySelector(".ea-calendar_table-head")),c(this,u,e.querySelector(".ea-calendar_table-body")),this.build(e,P)}getToday(){const e=new Date;return`${e.getFullYear()}-${e.getMonth()+1}`}getUserToday(e){const a=new Date(e);return`${a.getFullYear()}-${a.getMonth()+1}`}get weekStart(){return this.getAttribute("week-start")||"一"}set weekStart(e){this.setAttribute("week-start",e),l(this,y).innerHTML=Q(h(this,M,Y).call(this,this.week,e)).innerHTML}get date(){return this.getAttribute("date")||this.getToday()}set date(e){this.setAttribute("date",e),l(this,x).innerHTML=e=isNaN(new Date(e))?this.getToday():this.getUserToday(e),h(this,k,W).call(this,l(this,u),e,this.weekStart)}get size(){const e=this.getAttribute("size");return["mini"].includes(e)?e:"medium"}set size(e){if(this.setAttribute("size",e),l(this,f).classList.add(e),e==="mini"){const a=g("span","prev-btn");a.innerText="<";const n=g("span","next-btn");n.innerText=">",c(this,_,a),c(this,w,n),l(this,b).insertBefore(a,l(this,b).firstChild),l(this,b).appendChild(n)}}get week(){return["日","一","二","三","四","五","六"]}init(){this.weekStart=this.weekStart,this.date=this.date,this.size=this.size,h(this,C,R).call(this)}connectedCallback(){this.init()}}f=new WeakMap,b=new WeakMap,x=new WeakMap,L=new WeakMap,_=new WeakMap,m=new WeakMap,w=new WeakMap,y=new WeakMap,u=new WeakMap,M=new WeakSet,Y=function(e,a){if(!e.includes(a))return e;const n=e.findIndex((i,o)=>{if(i===a)return o});return n===0||n===-1?e:e.slice(n).concat(e.slice(0,n))},S=new WeakSet,U=function(e){e.addEventListener("click",a=>{l(this,u).querySelectorAll("td").forEach(i=>{i.classList.remove("is-selected")}),e.classList.contains("is-selected")?e.classList.remove("is-selected"):e.classList.add("is-selected");const n=new Date(this.date);this.dispatchEvent(new CustomEvent("select",{detail:{year:n.getFullYear(),month:n.getMonth()+1,date:Number(e.innerText),day:this.week[Number(e.innerText)%7]}}))})},T=new WeakSet,B=function(e){const a=new Date(this.date);a.setMonth(a.getMonth()+(e==="next"?1:-1)),this.date=`${a.getFullYear()}-${a.getMonth()+1}-${a.getDate()}`},k=new WeakSet,W=function(e,a,n="一"){a=isNaN(new Date(a))?new Date:new Date(a),e.innerHTML="";const i=new Date(a),o=i.getMonth()+1,s=new Date(a);s.setDate(1);const D=new Date(a);D.setMonth(o),D.setDate(0);const H=new Date(a);H.setMonth(o),H.setDate(1);const N=h(this,M,Y).call(this,this.week,n);for(let I=0;I<6;I++){const E=g("tr");for(let q=0;q<7;q++){const{length:j}=E.children,p=g("td"),v=g("span"),$=s.getDay(),z=new Date;if(N[j]===this.week[$]&&o===s.getMonth()+1)v.innerText=s.getDate(),s.setDate(s.getDate()+1),h(this,S,U).call(this,p);else if(o==s.getMonth())v.innerText=s.getDate(),s.setDate(s.getDate()+1),p.classList.add("is-disabled");else{const A=q-$+2,G=N.findIndex((J,K)=>{if(J==="一")return K});D.setMonth(o-1),D.setDate(A>0?$+j-G:A),v.innerText=D.getDate(),p.classList.add("is-disabled")}new Date(this.date),s.getFullYear()===z.getFullYear()&&s.getMonth()===z.getMonth()&&s.getDate()===z.getDate()+1&&p.classList.add("is-today"),s.getFullYear()===i.getFullYear()&&s.getMonth()===i.getMonth()&&s.getDate()===i.getDate()+1&&p.classList.add("is-selected"),p.appendChild(v),E.appendChild(p)}e.appendChild(E)}},C=new WeakSet,R=function(){l(this,_).addEventListener("click",()=>{h(this,T,B).call(this,"last")}),l(this,m).addEventListener("click",()=>{this.date=`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`}),l(this,w).addEventListener("click",()=>{h(this,T,B).call(this,"next")})};customElements.get("ea-calendar")||customElements.define("ea-calendar",V);export{V as EaCalendar};
