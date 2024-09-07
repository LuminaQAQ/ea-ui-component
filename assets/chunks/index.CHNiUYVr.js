import{B as t}from"./Base.LSgLRpFA.js";import"./index.CQU1UkII.js";const a=`
.ea-main_wrap {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 20px;
  overflow: auto;
  color: #333;
}
`;class e extends t{constructor(){super();const o=this.attachShadow({mode:"open"});o.innerHTML=`
            <main class="ea-main_wrap" part="container">
                <slot></slot>
            </main>
        `,this.build(o,a)}}customElements.get("ea-main")||customElements.define("ea-main",e);export{e as EaMain};
