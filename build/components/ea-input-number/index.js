import Base from"../Base.js";import{stylesheet}from"./src/style/stylesheet.js";import{handleCustomEvent}from"./src/utils/handleCustomEvent.js";export class EaInputNumber extends Base{#t;#e;#i;#s;constructor(){super();const t=this.attachShadow({mode:"open"});t.innerHTML='\n            <div class="ea-input-number_wrap" part="container">\n                <span class="ea-input-number_sign minus" part="minus-wrap">-</span>\n                <input class="ea-input-number_inner" part="input" type="text" />\n                <span class="ea-input-number_sign plus" part="plus-wrap">+</span>\n            </div>\n        ',this.#t=t.querySelector(".ea-input-number_wrap"),this.#e=t.querySelector(".ea-input-number_inner"),this.#i=t.querySelector(".minus"),this.#s=t.querySelector(".plus"),this.build(t,stylesheet)}#n(t,e,i){if(this.getAttrBoolean("disabled"))return;const s=Number(this.#e.value),n=this.#e.value.split(".")[1],u="minus"===t?s-this.step:s+this.step;this.#e.value=e?u.toFixed(e):n?.length?u.toFixed(n.length):u,this.#u(),i&&this.#a("change",u)}#l(t){let e=setInterval((()=>{this.#n(t,this.precision),this.#u()}),100);this.addEventListener("mouseup",(function(){clearInterval(e),e=null}))}#u(){!1===this.min&&!1===this.max||(void 0!==this.min&&this.#e.value<this.min?this.#e.value=this.min:void 0!==this.max&&this.#e.value>this.max&&(this.#e.value=this.max),this.#i.classList.toggle("disabled",this.#e.value==this.min),this.#s.classList.toggle("disabled",this.#e.value==this.max))}#h(){isNaN(Number(this.#e.value))?this.#e.value=this.value:this.value=Number(this.#e.value)}#a(t,e=this.value){handleCustomEvent.call(this,t,{value:e})}get value(){return Number(this.getAttribute("value"))||0}set value(t){t=this.precision?Number(t).toFixed(this.precision):Number(t),this.setAttribute("value",t),this.#e.value=t}get disabled(){return this.getAttrBoolean("disabled")}set disabled(t){this.toggleAttr("disabled",t),this.#e.disabled=t,this.#t.classList.toggle("disabled",t),this.style.cursor=t?"not-allowed":"pointer"}get readonly(){return this.getAttrBoolean("readonly")}set readonly(t){t&&(this.#e.readOnly=t)}get step(){return this.getAttrNumber("step")||1}set step(t){t&&this.setAttribute("step",t)}get stepStrictly(){return this.getAttrBoolean("step-strictly")}set stepStrictly(t){this.toggleAttr("step-strictly",t)}get min(){return this.getAttrNumber("min")||-1/0}set min(t){Number.isNaN(t)&&!Number.isFinite(t)&&this.setAttribute("min",t)}get max(){return this.getAttrNumber("max")||1/0}set max(t){t&&this.setAttribute("max",t)}get precision(){const t=this.getAttrNumber("precision");return t<0||!Number.isInteger(t)?0:t}set precision(t){t&&this.setAttribute("precision",t)}get sizeType(){return["medium","small","mini"]}get size(){const t=this.getAttribute("size");return this.sizeType.includes(t)?t:"medium"}set size(t){this.setAttribute("size",t),this.#t.classList.add(`ea-input-number--${t}`)}connectedCallback(){this.style.display="inline-block",this.disabled=this.disabled,this.readonly=this.readonly,this.size=this.size,this.value=this.value,this.min!==-1/0&&(this.value=this.min),this.#u(),this.#e.addEventListener("focus",(t=>{this.#t.classList.add("focus"),this.#a("focus")})),this.#e.addEventListener("blur",(t=>{if(this.#t.classList.remove("focus"),this.stepStrictly){const t=that.step,e=Number(that.#e.value),i=e%t;e<0&&0!==i?that.#e.value=e-i-t:e<0&&0===i||0===i?that.#e.value=e:this.#e.value=e-i+t}this.#u(),this.#a("blur")})),this.#i.addEventListener("click",(()=>{this.#h(),this.#n("minus",this.precision,"minus")})),this.#s.addEventListener("click",(()=>{this.#h(),this.#n("plus",this.precision,"plus")})),this.#i.addEventListener("mousedown",(()=>{this.#h(),this.#l("minus",this.precision)})),this.#s.addEventListener("mousedown",(()=>{this.#h(),this.#l("plus",this.precision)})),this.#e.addEventListener("input",(()=>{this.#h(),this.#u(),this.#a("change")}))}}window.customElements.get("ea-input-number")||window.customElements.define("ea-input-number",EaInputNumber);