var g=(e,i,t)=>{if(!i.has(e))throw TypeError("Cannot "+t)};var f=(e,i,t)=>(g(e,i,"read from private field"),t?t.call(e):i.get(e)),p=(e,i,t)=>{if(i.has(e))throw TypeError("Cannot add the same private member more than once");i instanceof WeakSet?i.add(e):i.set(e,t)},w=(e,i,t,r)=>(g(e,i,"write to private field"),r?r.call(e,t):i.set(e,t),t);var y=(e,i,t)=>(g(e,i,"access private method"),t);import{B as L}from"./Base.LSgLRpFA.js";import"./index.CgEiilRo.js";import"./index.BSyUhE6H.js";const x=(e,i)=>`
        <th class="ea-descriptions-item_label ea-descriptions-item_cell ${i?"is-border":""}" colspan="1" part="table-th">
            ${e}${i?"":":"}
        </th>
    `,H=(e,i,t)=>`
        <td class="ea-descriptions-item_content ea-descriptions-item_cell ${i?"is-border":""}" colspan="${t}" part="table-td">
            ${e}
        </td>
    `,M=(e,i,t)=>`
        <th class="ea-descriptions-item_label ea-descriptions-item_cell is-border" colspan="1" part="table-th">${e}</th>
        <td class="ea-descriptions-item_content ea-descriptions-item_cell is-border" colspan="${t}" part="table-td">${i}</td>
    `,E=(e,i,t)=>`
        <td class="ea-descriptions-item" colspan="${t}" part="table-td">
            <span class="ea-descriptions-item_label" part="table-td-label">${e}:</span>
            <span class="ea-descriptions-item_content" part="table-td-content">${i}</span>
        </td>
    `,k=(e,i,t)=>{var c;let r=e.getAttribute("label"),l=e.innerHTML;return r||(r=((c=e.querySelector('[slot="label"]'))==null?void 0:c.innerHTML)||""),t?M(r,l,i):E(r,l,i)},C=`
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
`;var b,h,m,$,u,v;class z extends L{constructor(){super();p(this,m);p(this,u);p(this,b,void 0);p(this,h,void 0);const t=this.attachShadow({mode:"open"});t.innerHTML=`
            <div class="ea-descriptions_wrap" part="container">
                <div class="ea-descriptions_header" part="header-wrap"></div>
                <div class="ea-descriptions_body" part="body-wrap">
                    <table class="ea-descriptions_table" part="table-wrap"></table>
                </div>
            </div>
        `,w(this,b,t.querySelector(".ea-descriptions_table")),w(this,h,t.querySelector(".ea-descriptions_header")),this.build(t,C)}get title(){return this.getAttribute("title")||""}set title(t){this.setAttribute("title",t),f(this,h).innerHTML=t}get col(){return this.getAttrNumber("col")||3}set col(t){this.setAttribute("col",t)}get border(){return this.getAttrBoolean("border")}set border(t){this.toggleAttr("border",t)}get direction(){return this.getAttribute("direction")||"horizontal"}set direction(t){this.setAttribute("direction",t)}connectedCallback(){this.title=this.title,this.col=this.col,this.border=this.border,this.direction=this.direction;const t=this.querySelectorAll("ea-descriptions-item");y(this,m,$).call(this,t),y(this,u,v).call(this)}}b=new WeakMap,h=new WeakMap,m=new WeakSet,$=function(t){var l,c,T;const r=Number(t.length);for(let s=0;s<r;s+=3){let A=0;const d=document.createElement("tbody");switch(d.part="table-tbody",this.direction){case"horizontal":{const n=document.createElement("tr");n.part="table-tr";for(let a=s;a<this.col+s;a++){const o=Number((l=t[a])==null?void 0:l.getAttribute("span"))||1;if(A+o>this.col||!t[a])break;n.innerHTML+=k(t[a],o,this.border)}d.appendChild(n);break}case"vertical":{const n=document.createElement("tr"),a=document.createElement("tr");n.part="table-tr",a.part="table-tr";for(let o=s;o<this.col+s;o++){const _=Number((c=t[o])==null?void 0:c.getAttribute("span"))||1;if(A+_>this.col||!t[o])break;n.innerHTML+=x(t[o].getAttribute("label"),this.border),a.innerHTML+=H(t[o].innerHTML,this.border,_)}d.appendChild(n),d.appendChild(a);break}}f(this,b).appendChild(d)}t.forEach(s=>{s.remove()}),(T=this.shadowRoot)==null||T.querySelectorAll("[slot]").forEach(s=>{s.remove()})},u=new WeakSet,v=function(){var r;((r=this.shadowRoot)==null?void 0:r.querySelector("ea-icon"))&&(this.shadowRoot.innerHTML+=`
                <link rel="stylesheet" href="${new URL("data:text/css;base64,QGltcG9ydCAiLi9jc3MvZm9udGVsbG8uY3NzIjsNCkBpbXBvcnQgIi4vY3NzL2FuaW1hdGlvbi5jc3MiOw==",import.meta.url).href}">
            `)};customElements.get("ea-descriptions")||customElements.define("ea-descriptions",z);export{z as EaDescriptions};
