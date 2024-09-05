var g=(t,i,e)=>{if(!i.has(t))throw TypeError("Cannot "+e)};var f=(t,i,e)=>(g(t,i,"read from private field"),e?e.call(t):i.get(t)),d=(t,i,e)=>{if(i.has(t))throw TypeError("Cannot add the same private member more than once");i instanceof WeakSet?i.add(t):i.set(t,e)},w=(t,i,e,s)=>(g(t,i,"write to private field"),s?s.call(t,e):i.set(t,e),e);var T=(t,i,e)=>(g(t,i,"access private method"),e);import{B as L}from"./Base.yCeCPjNm.js";import"./index.BXibZEVU.js";import"./index.Cmp2PdK4.js";const x=(t,i)=>`
        <th class="ea-descriptions-item_label ea-descriptions-item_cell ${i?"is-border":""}" colspan="1">
            ${t}${i?"":":"}
        </th>
    `,H=(t,i,e)=>`
        <td class="ea-descriptions-item_content ea-descriptions-item_cell ${i?"is-border":""}" colspan="${e}">
            ${t}
        </td>
    `,M=(t,i,e)=>`
        <th class="ea-descriptions-item_label ea-descriptions-item_cell is-border" colspan="1">${t}</th>
        <td class="ea-descriptions-item_content ea-descriptions-item_cell is-border" colspan="${e}">${i}</td>
    `,E=(t,i,e)=>`
        <td class="ea-descriptions-item" colspan="${e}">
            <span class="ea-descriptions-item_label">${t}:</span>
            <span class="ea-descriptions-item_content">${i}</span>
        </td>
    `,k=(t,i,e)=>{var c;let s=t.getAttribute("label"),a=t.innerHTML;return s||(s=((c=t.querySelector('[slot="label"]'))==null?void 0:c.innerHTML)||""),e?M(s,a,i):E(s,a,i)},C=`
.ea-descriptions_wrap {
  font-size: 14px;
}
.ea-descriptions_wrap .ea-descriptions_header {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 20px;
}
.ea-descriptions_wrap .ea-descriptions_body table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}
.ea-descriptions_wrap .ea-descriptions_body table th {
  background-color: #fafafa;
}
.ea-descriptions_wrap .ea-descriptions_body table td {
  vertical-align: baseline;
}
.ea-descriptions_wrap .ea-descriptions-item_label,
.ea-descriptions_wrap .ea-descriptions-item_content {
  font-weight: normal;
  font-size: 14px;
  vertical-align: middle;
}
.ea-descriptions_wrap .ea-descriptions-item_label.is-border,
.ea-descriptions_wrap .ea-descriptions-item_content.is-border {
  border: 1px solid #ebeef5;
}
.ea-descriptions_wrap .ea-descriptions-item_cell {
  text-align: left;
  padding: 12px 10px;
}
`;var p,h,m,$,u,v;class z extends L{constructor(){super();d(this,m);d(this,u);d(this,p,void 0);d(this,h,void 0);const e=this.attachShadow({mode:"open"});e.innerHTML=`
            <div class="ea-descriptions_wrap" part="container">
                <div class="ea-descriptions_header" part="header-wrap"></div>
                <div class="ea-descriptions_body" part="body-wrap">
                    <table class="ea-descriptions_table" part="table-wrap"></table>
                </div>
            </div>
        `,w(this,p,e.querySelector(".ea-descriptions_table")),w(this,h,e.querySelector(".ea-descriptions_header")),this.build(e,C)}get title(){return this.getAttribute("title")||""}set title(e){this.setAttribute("title",e),f(this,h).innerHTML=e}get col(){return this.getAttrNumber("col")||3}set col(e){this.setAttribute("col",e)}get border(){return this.getAttrBoolean("border")}set border(e){this.toggleAttr("border",e)}get direction(){return this.getAttribute("direction")||"horizontal"}set direction(e){this.setAttribute("direction",e)}connectedCallback(){this.title=this.title,this.col=this.col,this.border=this.border,this.direction=this.direction;const e=this.querySelectorAll("ea-descriptions-item");T(this,m,$).call(this,e),T(this,u,v).call(this)}}p=new WeakMap,h=new WeakMap,m=new WeakSet,$=function(e){var a,c,y;const s=Number(e.length);for(let r=0;r<s;r+=3){let A=0;const b=document.createElement("tbody");switch(this.direction){case"horizontal":{const l=document.createElement("tr");for(let n=r;n<this.col+r;n++){const o=Number((a=e[n])==null?void 0:a.getAttribute("span"))||1;if(A+o>this.col||!e[n])break;l.innerHTML+=k(e[n],o,this.border)}b.appendChild(l);break}case"vertical":{const l=document.createElement("tr"),n=document.createElement("tr");for(let o=r;o<this.col+r;o++){const _=Number((c=e[o])==null?void 0:c.getAttribute("span"))||1;if(A+_>this.col||!e[o])break;l.innerHTML+=x(e[o].getAttribute("label"),this.border),n.innerHTML+=H(e[o].innerHTML,this.border,_)}b.appendChild(l),b.appendChild(n);break}}f(this,p).appendChild(b)}e.forEach(r=>{r.remove()}),(y=this.shadowRoot)==null||y.querySelectorAll("[slot]").forEach(r=>{r.remove()})},u=new WeakSet,v=function(){var s;((s=this.shadowRoot)==null?void 0:s.querySelector("ea-icon"))&&(this.shadowRoot.innerHTML+=`
            <link rel="stylesheet" href="${new URL("data:text/css;base64,QGltcG9ydCAiLi9jc3MvZm9udGVsbG8uY3NzIjsNCkBpbXBvcnQgIi4vY3NzL2FuaW1hdGlvbi5jc3MiOw==",import.meta.url).href}">
        `)};customElements.get("ea-descriptions")||customElements.define("ea-descriptions",z);export{z as EaDescriptions};
