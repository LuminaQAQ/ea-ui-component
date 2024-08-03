var y=(t,i,e)=>{if(!i.has(t))throw TypeError("Cannot "+e)};var E=(t,i,e)=>(y(t,i,"read from private field"),e?e.call(t):i.get(t)),l=(t,i,e)=>{if(i.has(t))throw TypeError("Cannot add the same private member more than once");i instanceof WeakSet?i.add(t):i.set(t,e)},h=(t,i,e,s)=>(y(t,i,"write to private field"),s?s.call(t,e):i.set(t,e),e);import{B as x}from"./Base.yCeCPjNm.js";const C=`
@import url('/ea_ui_component/icon/index.css');

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
`,H=(t,i,e)=>`
    <td class="ea-descriptions-item" colspan="${e}">
        <span class="ea-descriptions-item_label">${t}:</span>
        <span class="ea-descriptions-item_content">${i}</span>
    </td>
    `,L=(t,i,e)=>`
    <th class="ea-descriptions-item_label ea-descriptions-item_cell is-border" colspan="1">${t}</th>
    <td class="ea-descriptions-item_content ea-descriptions-item_cell is-border" colspan="${e}">${i}</td>
    `,M=(t,i)=>`
    <th class="ea-descriptions-item_label ea-descriptions-item_cell ${i?"is-border":""}" colspan="1">
        ${t}${i?"":":"}
    </th>`,k=(t,i,e)=>`
    <td class="ea-descriptions-item_content ea-descriptions-item_cell ${i?"is-border":""}" colspan="${e}">
        ${t}
    </td>`,v=(t,i,e)=>{var o;let s=t.getAttribute("label"),n=t.innerHTML;return s||(s=((o=t.querySelector('[slot="label"]'))==null?void 0:o.innerHTML)||""),e?L(s,n,i):H(s,n,i)};var f,b,m,$,w;class z extends x{constructor(){super();l(this,f,void 0);l(this,b,void 0);l(this,m,void 0);l(this,$,void 0);l(this,w,void 0);const e=this.attachShadow({mode:"open"}),s=document.createElement("div");s.className="ea-descriptions_wrap";const n=document.createElement("div");n.className="ea-descriptions_header",s.appendChild(n);const o=document.createElement("div"),d=document.createElement("table"),u=document.createElement("thead"),_=document.createElement("slot");o.className="ea-descriptions_body",o.appendChild(d),d.appendChild(u),s.appendChild(o),h(this,f,s),h(this,b,d),h(this,m,n),h(this,w,_),this.build(e,C),this.shadowRoot.appendChild(s)}get title(){return this.getAttribute("title")||""}set title(e){this.setAttribute("title",e),E(this,m).innerHTML=e}get col(){return this.getAttrNumber("col")||3}set col(e){this.setAttribute("col",e)}get border(){return this.getAttrBoolean("border")}set border(e){this.toggleAttr("border",e)}get direction(){return this.getAttribute("direction")||"horizontal"}set direction(e){this.setAttribute("direction",e)}initDescriptionsItem(e,s,n,o){var u,_;const d=Number(s.length);for(let a=0;a<d;a+=3){let A=0;const g=document.createElement("tbody");switch(o){case"horizontal":{const p=document.createElement("tr");for(let c=a;c<e+a;c++){const r=Number((u=s[c])==null?void 0:u.getAttribute("span"))||1;if(A+r>e||!s[c])break;p.innerHTML+=v(s[c],r,n)}g.appendChild(p);break}case"vertical":{const p=document.createElement("tr"),c=document.createElement("tr");for(let r=a;r<e+a;r++){const T=Number((_=s[r])==null?void 0:_.getAttribute("span"))||1;if(A+T>e||!s[r])break;p.innerHTML+=M(s[r].getAttribute("label"),n),c.innerHTML+=k(s[r].innerHTML,n,T)}g.appendChild(p),g.appendChild(c);break}}E(this,b).appendChild(g)}s.forEach(a=>{a.remove()})}init(){this.title=this.title,this.col=this.col,this.border=this.border,this.direction=this.direction;const e=this.querySelectorAll("ea-descriptions-item");this.initDescriptionsItem(this.col,e,this.border,this.direction)}connectedCallback(){this.init()}}f=new WeakMap,b=new WeakMap,m=new WeakMap,$=new WeakMap,w=new WeakMap;customElements.get("ea-descriptions")||customElements.define("ea-descriptions",z);export{z as EaDescriptions};
