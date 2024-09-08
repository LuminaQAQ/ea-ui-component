var m=(t,i,e)=>{if(!i.has(t))throw TypeError("Cannot "+e)};var d=(t,i,e)=>(m(t,i,"read from private field"),e?e.call(t):i.get(t)),o=(t,i,e)=>{if(i.has(t))throw TypeError("Cannot add the same private member more than once");i instanceof WeakSet?i.add(t):i.set(t,e)},u=(t,i,e,s)=>(m(t,i,"write to private field"),s?s.call(t,e):i.set(t,e),e);var c=(t,i,e)=>(m(t,i,"access private method"),e);import{B as f}from"./Base.LSgLRpFA.js";import"./index.ChwP6VyU.js";class v extends f{constructor(){super();const i=this.attachShadow({mode:"open"});i.innerHTML=`
            <div class='ea-infinite-item_wrap' part='container'>
                <slot></slot>
            </div>
        `}}customElements.get("ea-infinite-item")||customElements.define("ea-infinite-item",v);var n,a,l,p,h,g;class w extends f{constructor(){super();o(this,l);o(this,h);o(this,n,void 0);o(this,a,void 0);const e=this.attachShadow({mode:"open"});e.innerHTML=`
            <div class='ea-infinite_wrap' part='container'>
                <slot></slot>
            </div>
            <div class='ea-infinite_loading-wrap' part='loading-wrap'>
                <slot name='loading' style="display: none;"></slot>
            </div>
            <div class='ea-infinite_noMore-wrap' part='noMore-wrap'>
                <slot name='noMore' style="display: none;"></slot>
            </div>
        `,u(this,n,e.querySelector('slot[name="loading"]')),u(this,a,e.querySelector('slot[name="noMore"]'))}get delay(){return this.getAttrNumber("delay")||200}set delay(e){this.setAttribute("delay",e)}get loading(){return this.getAttrBoolean("loading")}set loading(e){e!==void 0&&this.setAttribute("loading",e)}get disabled(){return this.getAttrBoolean("disabled")||!1}set disabled(e){this.setAttribute("disabled",e),e&&(d(this,a).style.display="block")}connectedCallback(){this.delay=this.delay,c(this,h,g).call(this)}}n=new WeakMap,a=new WeakMap,l=new WeakSet,p=function(){const e=this.querySelectorAll("ea-infinite-item");return e[e.length-1]},h=new WeakSet,g=function(){if(this.disabled)return;let e=c(this,l,p).call(this),s=null;const r=new IntersectionObserver(b=>{const{isIntersecting:y}=b[0];if(this.disabled){r.disconnect();return}!y||s||(this.loading&&(d(this,n).style.display="block"),r.unobserve(e),s=setTimeout(()=>{this.dispatchEvent(new CustomEvent("bottomReached")),clearTimeout(s),s=null,e=c(this,l,p).call(this),r.observe(e),d(this,n).style.display="none"},this.delay||200))},{root:this.parentNode,rootMargin:"10px",threshold:.1});r.observe(e)};customElements.get("ea-infinite")||customElements.define("ea-infinite",w);export{w as EaInfiniteScroll};
