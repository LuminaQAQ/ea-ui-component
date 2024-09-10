var v=(i,o,e)=>{if(!o.has(i))throw TypeError("Cannot "+e)};var t=(i,o,e)=>(v(i,o,"read from private field"),e?e.call(i):o.get(i)),l=(i,o,e)=>{if(o.has(i))throw TypeError("Cannot add the same private member more than once");o instanceof WeakSet?o.add(i):o.set(i,e)},n=(i,o,e,s)=>(v(i,o,"write to private field"),s?s.call(i,e):o.set(i,e),e);var y=(i,o,e)=>(v(i,o,"access private method"),e);import{B as _}from"./Base.LSgLRpFA.js";import"./index.CcHcFfiA.js";import"./index.Xmu6Gt7J.js";import{t as x,w as k}from"./timeout.CMJ_lqqj.js";const S=`
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
`;var p;class L extends _{constructor(){super();l(this,p,void 0);const e=this.attachShadow({mode:"open"});e.innerHTML=`
            <div class='ea-option_wrap' part='container'>
                <slot></slot>
            </div>
        `,n(this,p,e.querySelector(".ea-option_wrap")),this.build(e,S)}get value(){return this.getAttribute("value")||""}set value(e){this.setAttribute("value",e)}get checked(){return this.getAttrBoolean("checked")||!1}set checked(e){this.setAttribute("checked",e),t(this,p).classList.toggle("is-checked",e)}get disabled(){return this.getAttrBoolean("disabled")||!1}set disabled(e){this.setAttribute("disabled",e),t(this,p).classList.toggle("is-disabled",e)}connectedCallback(){this.value=this.value,this.disabled=this.disabled}}p=new WeakMap;customElements.get("ea-option")||customElements.define("ea-option",L);const q=`
.ea-option-group_wrap .ea-option-group_title {
  padding-left: 20px;
  font-size: 12px;
  color: #909399;
  line-height: 30px;
}
`;var g,u;class B extends _{constructor(){super();l(this,g,void 0);l(this,u,void 0);const e=this.attachShadow({mode:"open"});e.innerHTML=`
            <div class='ea-option-group_wrap' part='container'>
                <div class='ea-option-group_title' part='title-wrap'></div>
                <slot></slot>
            </div>
        `,n(this,g,e.querySelector(".ea-option-group_wrap")),n(this,u,e.querySelector(".ea-option-group_title")),this.build(e,q)}get label(){return this.getAttribute("label")||""}set label(e){this.setAttribute("label",e),t(this,u).innerHTML=e}connectedCallback(){this.label=this.label}}g=new WeakMap,u=new WeakMap;customElements.get("ea-option-group")||customElements.define("ea-option-group",B);const R=`
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
`;var c,a,d,w,b,m,A;class C extends _{constructor(){super();l(this,m);l(this,c,void 0);l(this,a,void 0);l(this,d,void 0);l(this,w,void 0);l(this,b,void 0);const e=this.attachShadow({mode:"open"});e.innerHTML=`
            <div class="ea-select_wrap" part="container">
                <div class="ea-select_input-wrap" part="input-wrap">
                    <ea-input type="text" part="input" readonly autocomplete="off"></ea-input>
                    <span class="ea-select_dropdown-icon" part="dropdown-icon-wrap">
                        <ea-icon part="icon" icon="icon-angle-down" color="#c0c4cc"></ea-icon>
                    </span>
                </div>
                <div class="ea-select_dropdown-wrap" part="dropdown-wrap">
                    <slot></slot>
                    <slot name="empty" class="ea-select_dropdown-empty" style="display: none;">
                        <p>暂无数据</p>
                    </slot>
                </div>
            </div>
        `,n(this,c,this.shadowRoot.querySelector(".ea-select_wrap")),n(this,a,this.shadowRoot.querySelector("ea-input")),n(this,d,this.shadowRoot.querySelector(".ea-select_dropdown-icon")),n(this,w,this.shadowRoot.querySelector(".ea-select_dropdown-wrap")),n(this,b,this.shadowRoot.querySelector(".ea-select_dropdown-empty")),this.build(e,R)}get name(){return this.getAttribute("name")||"select"}set name(e){this.setAttribute("name",e)}get width(){return this.getAttribute("width")||"200px"}set width(e){this.setAttribute("width",e),t(this,c).style.width=e}get value(){const e=this.selection;return this.multiple?e.split(",")||[]:this.selection}set value(e){this.setAttribute("value",e),this.multiple?this.selection=e.join(","):this.selection=e}get selection(){return this.getAttribute("selection")||""}set selection(e){this.setAttribute("selection",e),t(this,a).value=e}get placeholder(){return this.getAttribute("placeholder")||""}set placeholder(e){this.setAttribute("placeholder",e),t(this,a).placeholder=e}get disabled(){return this.getAttrBoolean("disabled")||!1}set disabled(e){this.toggleAttr("disabled",e),t(this,a).disabled=e}get clearable(){return this.getAttrBoolean("clearable")||!1}set clearable(e){if(this.setAttribute("clearable",e),e){const s=t(this,d).querySelector("ea-icon");t(this,d).addEventListener("mouseenter",h=>{s.icon="icon-cancel-circled2"}),t(this,d).addEventListener("mouseleave",h=>{s.icon="icon-angle-down"}),t(this,d).addEventListener("click",h=>{this.dispatchEvent(new CustomEvent("clear",{detail:{originValue:this.selection}})),this.querySelectorAll("ea-option").forEach(r=>{r.checked=!1}),this.selection=""})}}get filterable(){return this.getAttrBoolean("filterable")||!1}set filterable(e){this.setAttribute("filterable",e),t(this,a).readonly=e===!1,e&&t(this,a).addEventListener("change",s=>{const h=this.querySelectorAll("ea-option"),{value:r}=s.detail;h.forEach(f=>{f.style.display=f.value.includes(r)?"block":"none"});let E=Array.from(h).every(f=>f.style.display!=="block");t(this,b).style.display=E?"block":"none"})}get multiple(){return this.getAttrBoolean("multiple")||!1}set multiple(e){this.setAttribute("multiple",e)}get isInvalid(){return this.getAttrBoolean("is-invalid")||!1}set isInvalid(e){this.setAttribute("is-invalid",e),t(this,a).isInvalid=e}connectedCallback(){this.setAttribute("data-ea-component",!0),t(this,w).style.width=this.width,this.name=this.name,this.width=this.width,this.selection=this.selection,this.placeholder=this.placeholder,this.disabled=this.disabled,this.clearable=this.clearable,this.filterable=this.filterable,this.multiple=this.multiple,y(this,m,A).call(this),t(this,a).addEventListener("focus",e=>{t(this,c).classList.add("is-open"),this.dispatchEvent(new CustomEvent("visible-change",{detail:{visible:!0}}))}),t(this,a).addEventListener("blur",e=>{x(()=>{t(this,c).classList.remove("is-open")},100),this.dispatchEvent(new CustomEvent("visible-change",{detail:{visible:!1}}))}),k(t(this,c))}}c=new WeakMap,a=new WeakMap,d=new WeakMap,w=new WeakMap,b=new WeakMap,m=new WeakSet,A=function(){const e=this.querySelectorAll("ea-option");e.forEach(s=>{s.disabled||s.addEventListener("click",h=>{if(this.multiple)if(s.checked=!s.checked,s.checked)this.selection=this.selection?this.selection+","+s.value:s.value;else{const r=this.selection.split(",");r.splice(r.indexOf(s.value),1),this.selection=r.join(",")}else t(this,a).value=s.value,this.selection=s.value,e.forEach(r=>{r.checked=!1}),s.checked=!0;this.dispatchEvent(new CustomEvent("change",{detail:{value:this.selection}}))})})};customElements.get("ea-select")||customElements.define("ea-select",C);export{C as EaSelect};
