var c=(e,s,t)=>{if(!s.has(e))throw TypeError("Cannot "+t)};var o=(e,s,t)=>(c(e,s,"read from private field"),t?t.call(e):s.get(e)),r=(e,s,t)=>{if(s.has(e))throw TypeError("Cannot add the same private member more than once");s instanceof WeakSet?s.add(e):s.set(e,t)},l=(e,s,t,n)=>(c(e,s,"write to private field"),n?n.call(e,t):s.set(e,t),t);var i;class h extends HTMLElement{constructor(){super();r(this,i,void 0);const t=this.attachShadow({mode:"open"});t.innerHTML=`
            <link rel="stylesheet" href="/ea-ui-component/ea-icon/css/animation.css">
            <link rel="stylesheet" href="/ea-ui-component/ea-icon/css/fontello.css">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/easy-component-ui/components/ea-icon/css/animation.min.css">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/easy-component-ui/components/ea-icon/css/fontello.min.css">
            <i class="ea-icon_wrap" part="container">
                <slot></slot>
            </i>
        `,l(this,i,t.querySelector(".ea-icon_wrap"))}get icon(){return this.getAttribute("icon")||""}set icon(t){this.setAttribute("icon",t),o(this,i).className=`${t}`}get color(){return this.getAttribute("color")||""}set color(t){this.setAttribute("color",t),o(this,i).style.color=t}get size(){return this.getAttribute("size")||""}set size(t){this.setAttribute("size",t),o(this,i).style.fontSize=`${t}px`}connectedCallback(){this.icon=this.icon,this.color=this.color,this.size=this.size}}i=new WeakMap;window.customElements.get("ea-icon")||window.customElements.define("ea-icon",h);export{h as EaIcon};
