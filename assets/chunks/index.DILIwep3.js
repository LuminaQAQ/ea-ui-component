var E=(i,o,e)=>{if(!o.has(i))throw TypeError("Cannot "+e)};var s=(i,o,e)=>(E(i,o,"read from private field"),e?e.call(i):o.get(i)),a=(i,o,e)=>{if(o.has(i))throw TypeError("Cannot add the same private member more than once");o instanceof WeakSet?o.add(i):o.set(i,e)},r=(i,o,e,t)=>(E(i,o,"write to private field"),t?t.call(i,e):o.set(i,e),e);var p=(i,o,e)=>(E(i,o,"access private method"),e);import{B as k}from"./Base.yCeCPjNm.js";import"./index.DSSfHWaE.js";import"./index.CAWmND1Y.js";import"./createElement.BM9xfELw.js";const T=`
@import url('/ea_ui_component/icon/index.css');

.ea-option_wrap {
  position: relative;
  padding: 0 20px;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  color: #606266;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}
.ea-option_wrap.is-checked {
  color: #409eff;
  font-weight: 700;
}
.ea-option_wrap.is-disabled {
  color: #c0c4cc;
  pointer-events: none;
  cursor: not-allowed;
}
.ea-option_wrap:hover {
  background-color: #f5f7fa;
}
`;var u,f,L;class Y extends k{constructor(){super();a(this,f);a(this,u,void 0);const e=this.attachShadow({mode:"open"});e.innerHTML=`
            <div class='ea-option_wrap' part='container'>
                <slot></slot>
            </div>
        `,r(this,u,e.querySelector(".ea-option_wrap")),this.build(e,T)}get value(){return this.getAttribute("value")||""}set value(e){this.setAttribute("value",e)}get checked(){return this.getAttrBoolean("checked")||!1}set checked(e){this.setAttribute("checked",e),s(this,u).classList.toggle("is-checked",e)}get disabled(){return this.getAttrBoolean("disabled")||!1}set disabled(e){this.setAttribute("disabled",e),s(this,u).classList.toggle("is-disabled",e)}connectedCallback(){p(this,f,L).call(this)}}u=new WeakMap,f=new WeakSet,L=function(){this.value=this.value,this.disabled=this.disabled,this.checked=this.checked};customElements.get("ea-option")||customElements.define("ea-option",Y);const z=`
@import url('/ea_ui_component/icon/index.css');

.ea-option-group_wrap .ea-option-group_title {
  padding-left: 20px;
  font-size: 12px;
  color: #909399;
  line-height: 30px;
}
`;var _,w,v,S;class H extends k{constructor(){super();a(this,v);a(this,_,void 0);a(this,w,void 0);const e=this.attachShadow({mode:"open"});e.innerHTML=`
            <div class='ea-option-group_wrap' part='container'>
                <div class='ea-option-group_title' part='title'></div>
                <slot></slot>
            </div>
        `,r(this,_,e.querySelector(".ea-option-group_wrap")),r(this,w,e.querySelector(".ea-option-group_title")),this.build(e,z)}get label(){return this.getAttribute("label")||""}set label(e){this.setAttribute("label",e),s(this,w).innerHTML=e}connectedCallback(){p(this,v,S).call(this)}}_=new WeakMap,w=new WeakMap,v=new WeakSet,S=function(){this.label=this.label};customElements.get("ea-option-group")||customElements.define("ea-option-group",H);const O=`
@import url('/ea_ui_component/icon/index.css');

.ea-select_wrap {
  position: relative;
}
.ea-select_wrap .ea-select_input-wrap .ea-select_dropdown-icon {
  position: absolute;
  left: calc(100% - 24px);
  top: 50%;
  transform-origin: center;
  transform: translateY(-50%);
}
.ea-select_wrap .ea-select_input-wrap .ea-select_dropdown-icon.is-open {
  transform: translateY(-50%) rotate(180deg);
}
.ea-select_wrap .ea-select_dropdown-wrap {
  position: absolute;
  left: 0;
  bottom: -12px;
  transform: translateY(100%) scaleY(0);
  transform-origin: center top;
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 2035;
}
.ea-select_wrap .ea-select_dropdown-wrap .ea-select_dropdown-empty {
  padding: 10px 0;
  margin: 0;
  text-align: center;
  color: #999;
  font-size: 14px;
}
.ea-select_wrap.is-open .ea-select_input-wrap .ea-select_dropdown-icon {
  transform: translateY(-50%) rotate(180deg);
}
.ea-select_wrap.is-open .ea-select_dropdown-wrap {
  transform: translateY(100%) scaleY(1);
}
.ea-select_wrap.is-disabled {
  pointer-events: none;
  cursor: not-allowed;
}
.ea-select_wrap.with-transition .ea-select_input-wrap .ea-select_dropdown-icon {
  transition: transform 0.3s;
}
.ea-select_wrap.with-transition .ea-select_dropdown-wrap {
  transition: transform 0.3s;
}
`;var c,l,d,b,m,y,q,A,R,x,B;class M extends k{constructor(){super();a(this,y);a(this,A);a(this,x);a(this,c,void 0);a(this,l,void 0);a(this,d,void 0);a(this,b,void 0);a(this,m,void 0);const e=this.attachShadow({mode:"open"});e.innerHTML=`
            <div class="ea-select_wrap" part="container">
                <div class="ea-select_input-wrap">
                    <ea-input type="text" part="input" readonly autocomplete="off"></ea-input>
                    <span class="ea-select_dropdown-icon">
                        <i part="icon" class="icon-angle-down" style="color: #c0c4cc;"></i>
                    </span>
                </div>
                <div class="ea-select_dropdown-wrap">
                    <slot></slot>
                    <slot name="empty" class="ea-select_dropdown-empty" style="display: none;">
                        <p>暂无数据</p>
                    </slot>
                </div>
            </div>
        `,r(this,c,this.shadowRoot.querySelector(".ea-select_wrap")),r(this,l,this.shadowRoot.querySelector("ea-input")),r(this,d,this.shadowRoot.querySelector(".ea-select_dropdown-icon")),r(this,b,this.shadowRoot.querySelector(".ea-select_dropdown-wrap")),r(this,m,this.shadowRoot.querySelector(".ea-select_dropdown-empty")),this.build(e,O)}get name(){return this.getAttribute("name")||"select"}set name(e){this.setAttribute("name",e)}get width(){return this.getAttribute("width")||"200px"}set width(e){this.setAttribute("width",e),s(this,c).style.width=e}get value(){const e=this.selection;return this.multiple?e.split(",")||[]:this.selection}get selection(){return this.getAttribute("selection")||""}set selection(e){this.setAttribute("selection",e),s(this,l).value=e}get placeholder(){return this.getAttribute("placeholder")||""}set placeholder(e){this.setAttribute("placeholder",e),s(this,l).placeholder=e}get disabled(){return this.getAttrBoolean("disabled")||!1}set disabled(e){this.toggleAttr("disabled",e),s(this,l).disabled=e}get clearable(){return this.getAttrBoolean("clearable")||!1}set clearable(e){if(this.setAttribute("clearable",e),e){const t=s(this,d).querySelector("i");s(this,d).addEventListener("mouseenter",h=>{t.className="icon-cancel-circled2"}),s(this,d).addEventListener("mouseleave",h=>{t.className="icon-angle-down"}),s(this,d).addEventListener("click",h=>{this.dispatchEvent(new CustomEvent("clear",{detail:{originValue:this.selection}})),this.querySelectorAll("ea-option").forEach(n=>{n.checked=!1}),this.selection=""})}}get filterable(){return this.getAttrBoolean("filterable")||!1}set filterable(e){this.setAttribute("filterable",e),s(this,l).readonly=e===!1,e&&s(this,l).addEventListener("change",t=>{const h=this.querySelectorAll("ea-option"),{value:n}=t.detail;h.forEach(g=>{g.style.display=g.value.includes(n)?"block":"none"});let C=Array.from(h).every(g=>g.style.display!=="block");s(this,m).style.display=C?"block":"none"})}get multiple(){return this.getAttrBoolean("multiple")||!1}set multiple(e){this.setAttribute("multiple",e)}connectedCallback(){p(this,x,B).call(this)}}c=new WeakMap,l=new WeakMap,d=new WeakMap,b=new WeakMap,m=new WeakMap,y=new WeakSet,q=function(){const e=this.querySelectorAll("ea-option");e.forEach(t=>{t.disabled||t.addEventListener("click",h=>{if(this.multiple)if(t.checked=!t.checked,t.checked)this.selection=this.selection?this.selection+","+t.value:t.value;else{const n=this.selection.split(",");n.splice(n.indexOf(t.value),1),this.selection=n.join(",")}else s(this,l).value=t.value,this.selection=t.value,e.forEach(n=>{n.checked=!1}),t.checked=!0;this.dispatchEvent(new CustomEvent("change",{detail:{value:this.selection}}))})})},A=new WeakSet,R=function(){s(this,l).addEventListener("focus",e=>{s(this,c).classList.add("is-open"),this.dispatchEvent(new CustomEvent("visible-change",{detail:{visible:!0}}))}),s(this,l).addEventListener("blur",e=>{let t=setTimeout(()=>{clearTimeout(t),t=null,s(this,c).classList.remove("is-open")},100);this.dispatchEvent(new CustomEvent("visible-change",{detail:{visible:!1}}))})},x=new WeakSet,B=function(){this.setAttribute("data-ea-component",!0),s(this,b).style.width=this.width,this.name=this.name,this.width=this.width,this.selection=this.selection,this.placeholder=this.placeholder,this.disabled=this.disabled,this.clearable=this.clearable,this.filterable=this.filterable,this.multiple=this.multiple,p(this,A,R).call(this),p(this,y,q).call(this);let e=setTimeout(()=>{clearTimeout(e),e=null,s(this,c).classList.add("with-transition")},20)};customElements.get("ea-select")||customElements.define("ea-select",M);export{M as EaSelect};
