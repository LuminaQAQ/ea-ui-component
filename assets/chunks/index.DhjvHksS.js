var u=Object.defineProperty;var I=(s,i,t)=>i in s?u(s,i,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[i]=t;var m=(s,i,t)=>(I(s,typeof i!="symbol"?i+"":i,t),t),b=(s,i,t)=>{if(!i.has(s))throw TypeError("Cannot "+t)};var n=(s,i,t)=>(b(s,i,"read from private field"),t?t.call(s):i.get(s)),l=(s,i,t)=>{if(i.has(s))throw TypeError("Cannot add the same private member more than once");i instanceof WeakSet?i.add(s):i.set(s,t)},r=(s,i,t,o)=>(b(s,i,"write to private field"),o?o.call(s,t):i.set(s,t),t);var Z=(s,i,t)=>(b(s,i,"access private method"),t);import{a as v}from"./createElement.BM9xfELw.js";import{B as p}from"./Base.yCeCPjNm.js";var e,c,h;class d extends p{constructor(){super();l(this,c);l(this,e,void 0);const t=this.attachShadow({mode:"open"}),o=document.createElement("i"),a=v();o.appendChild(a),this.setIconFile(new URL("data:text/css;base64,QGltcG9ydCAiLi4vZWEtaWNvbi9jc3MvZm9udGVsbG8uY3NzIjsNCkBpbXBvcnQgIi4uL2VhLWljb24vY3NzL2FuaW1hdGlvbi5jc3MiOw0KQGZvbnQtZmFjZSB7DQogIGZvbnQtc2l6ZTogMXJlbTsNCiAgZm9udC1zaXplOiAxNnB4Ow0KICBmb250LWZhbWlseTogIlNlZ29lIFVJIiwgVGFob21hLCBHZW5ldmEsIFZlcmRhbmEsIHNhbnMtc2VyaWY7DQogIHNyYzogdXJsKCIuLi9lYS1pY29uL2ZvbnQvZm9udGVsbG8uZW90IikgZm9ybWF0KCJlbWJlZGRlZC1vcGVudHlwZSIpLCB1cmwoIi4uL2VhLWljb24vZm9udC9mb250ZWxsby50dGYiKSBmb3JtYXQoInRydWV0eXBlIiksIHVybCgiLi4vZWEtaWNvbi9mb250L2ZvbnRlbGxvLndvZmYiKSBmb3JtYXQoIndvZmYiKSwgdXJsKCIuLi9lYS1pY29uL2ZvbnQvZm9udGVsbG8ud29mZjIiKSBmb3JtYXQoIndvZmYyIiksIHVybCgiLi4vZWEtaWNvbi9mb250L2ZvbnRlbGxvLnN2ZyIpIGZvcm1hdCgic3ZnIik7DQp9",import.meta.url).href),r(this,e,o),t.appendChild(o)}get icon(){return this.getAttribute("icon")||""}set icon(t){this.setAttribute("icon",t),n(this,e).className=`${t}`}get color(){return this.getAttribute("color")||""}set color(t){this.setAttribute("color",t),n(this,e).style.color=t}get size(){return this.getAttribute("size")||""}set size(t){this.setAttribute("size",t),n(this,e).style.fontSize=`${t}px`}connectedCallback(){Z(this,c,h).call(this)}}e=new WeakMap,c=new WeakSet,h=function(){this.icon=this.icon,this.color=this.color,this.size=this.size},m(d,"observedAttributes",["type","size","color"]);window.customElements.get("ea-icon")||window.customElements.define("ea-icon",d);export{d as EaIcon};
