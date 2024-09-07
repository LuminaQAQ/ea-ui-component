var m=(r,e,t)=>{if(!e.has(r))throw TypeError("Cannot "+t)};var o=(r,e,t)=>{if(e.has(r))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(r):e.set(r,t)};var i=(r,e,t)=>(m(r,e,"access private method"),t);import{B as c}from"./Base.LSgLRpFA.js";import"./index.CQU1UkII.js";import{c as h}from"./createElement.Dy1aXqlz.js";const b=`
.ea-breadcrumb-item_wrap {
  font-size: 14px;
  color: #606266;
  line-height: 1;
}
.ea-breadcrumb-item_wrap ::slotted(a) {
  text-decoration: none;
  font-weight: 600;
  color: #303133;
}
`;class d extends c{constructor(){super();const e=this.attachShadow({mode:"open"});e.innerHTML=`
            <span class="ea-breadcrumb-item_wrap" part='container'>
                <slot></slot>
            </span>
        `,this.build(e,b)}}customElements.get("ea-breadcrumb-item")||customElements.define("ea-breadcrumb-item",d);const u=`
.ea-breadcrumb_wrap {
  display: flex;
}
.ea-breadcrumb_wrap .separator {
  margin: 0 10px;
}
`;var s,n;class g extends c{constructor(){super();o(this,s);const t=this.attachShadow({mode:"open"});t.innerHTML=`
            <div class="ea-breadcrumb_wrap" part='container'>
                <slot></slot>
            </div>
        `,this.build(t,u)}get separator(){return this.getAttribute("separator")||"/"}set separator(t){this.setAttribute("separator",t)}get separatorClass(){return this.getAttribute("separator-class")||""}set separatorClass(t){this.setAttribute("separator-class",t)}get separatorColor(){return this.getAttribute("separator-color")||"#c0c4cc"}set separatorColor(t){this.setAttribute("separator-color",t)}connectedCallback(){this.separator=this.separator,this.separatorClass=this.separatorClass,this.separatorColor=this.separatorColor,i(this,s,n).call(this)}}s=new WeakSet,n=function(){const t=this.querySelectorAll("ea-breadcrumb-item");t.forEach((p,l)=>{if(l<t.length-1){const a=h("ea-icon");a.color=this.separatorColor,this.separatorClass?a.icon=this.separatorClass:(a.style.margin="0 10px",a.innerText=this.separator),p.appendChild(a)}})};customElements.get("ea-breadcrumb")||customElements.define("ea-breadcrumb",g);export{g as EaBreadcrumb};
