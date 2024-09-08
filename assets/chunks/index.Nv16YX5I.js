var c=(t,i,a)=>{if(!i.has(t))throw TypeError("Cannot "+a)};var r=(t,i,a)=>(c(t,i,"read from private field"),a?a.call(t):i.get(t)),h=(t,i,a)=>{if(i.has(t))throw TypeError("Cannot add the same private member more than once");i instanceof WeakSet?i.add(t):i.set(t,a)},n=(t,i,a,s)=>(c(t,i,"write to private field"),s?s.call(t,a):i.set(t,a),a);import{B as v}from"./Base.LSgLRpFA.js";import"./index.CgEiilRo.js";const p=`
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path fill="#c0c4cc" d="M0 0h100v100H0z" />
        <path fill="#fff" d="M15 20h70v60H15z" />
        <circle r="8" cx="32" cy="35" fill="#c0c4cc" />
        <path d="M60 42.5L39 75h42z" fill="#c0c4cc" />
        <path d="M35 52.5L20 75h-4 32z" fill="#c0c4cc" />
    </svg>
`,o=`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path fill="#c0c4cc" d="M0 0h100v100H0z" />
</svg>
`,f=t=>`
        ${o}
        <ea-icon class="fa ea-avatar--text" icon="${t}"></ea-icon>
    `,g=t=>`
        ${o}
        <span class="ea-avatar--text">${t}</span>
    `,d=`
.ea-avatar_wrap .ea-avatar {
  position: relative;
  display: inline-block;
  overflow: hidden;
  color: #ffffff;
}
.ea-avatar_wrap .ea-avatar.ea-avatar-fill--fill img {
  object-fit: fill;
}
.ea-avatar_wrap .ea-avatar.ea-avatar-fill--contain img {
  object-fit: contain;
}
.ea-avatar_wrap .ea-avatar.ea-avatar-fill--cover img {
  object-fit: cover;
}
.ea-avatar_wrap .ea-avatar.ea-avatar-fill--none img {
  object-fit: none;
}
.ea-avatar_wrap .ea-avatar.ea-avatar-fill--scale-down img {
  object-fit: scale-down;
}
.ea-avatar_wrap .ea-avatar.ea-avatar--normal {
  width: 50px;
  height: 50px;
  line-height: 50px;
}
.ea-avatar_wrap .ea-avatar.ea-avatar--large {
  width: 40px;
  height: 40px;
  line-height: 40px;
}
.ea-avatar_wrap .ea-avatar.ea-avatar--medium {
  width: 36px;
  height: 36px;
  line-height: 36px;
}
.ea-avatar_wrap .ea-avatar.ea-avatar--small {
  width: 28px;
  height: 28px;
  line-height: 28px;
}
.ea-avatar_wrap .ea-avatar .ea-avatar--text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.ea-avatar_wrap .ea-avatar.ea-avatar--circle {
  border-radius: 50%;
}
.ea-avatar_wrap .ea-avatar.ea-avatar--square {
  border-radius: 5px;
}
.ea-avatar_wrap .ea-avatar .ea-avatar--img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
`;var e;class w extends v{constructor(){super();h(this,e,void 0);const a=this.attachShadow({mode:"open"});a.innerHTML=`
            <div class="ea-avatar_wrap" part='container'>
                <span class="ea-avatar" part="avatar">
                    <slot></slot>
                </span>
            </div>
        `,n(this,e,a.querySelector(".ea-avatar")),this.build(a,d)}get size(){const a=this.getAttrNumber("size"),s=this.getAttribute("size");return a===0||!a?["large","medium","small"].includes(s)?s:"normal":this.getAttrNumber("size")}set size(a){this.setAttribute("size",a),typeof a=="number"?(r(this,e).style.width=`${a}px`,r(this,e).style.height=`${a}px`,r(this,e).style.lineHeight=`${a}px`):typeof a=="string"&&r(this,e).classList.add(`ea-avatar--${a}`)}get shape(){const a=this.getAttribute("shape");return["circle","square"].includes(a)?a:"circle"}set shape(a){this.setAttribute("shape",a),r(this,e).classList.add(`ea-avatar--${this.shape}`)}get src(){return this.getAttribute("src")}set src(a){if(!a)return;this.setAttribute("src",a);const s=new Image;s.src=a,s.onload=()=>{r(this,e).innerHTML=`<img class="ea-avatar--img" src="${a}" alt="头像">`},s.onerror=l=>{r(this,e).innerHTML=p,this.dispatchEvent(new CustomEvent("error",{detail:{error:l}}))}}get icon(){return this.getAttribute("icon")||""}set icon(a){this.setAttribute("icon",a),r(this,e).innerHTML=f(a)}get fit(){return this.getAttribute("fit")||"cover"}set fit(a){this.setAttribute("fit",a),r(this,e).classList.add(`ea-avatar-fill--${a}`)}connectedCallback(){this.size=this.size,this.shape=this.shape,this.src=this.src,this.src&&(this.fit=this.fit),!this.src&&this.icon&&(this.icon=this.icon),this.innerHTML!==""&&!this.icon&&!this.src&&(r(this,e).innerHTML=g(this.innerHTML))}}e=new WeakMap;customElements.get("ea-avatar")||customElements.define("ea-avatar",w);export{w as EaAvatar};
