const __vite__fileDeps=["assets/chunks/index.NAFOYUD4.js","assets/chunks/Base.LSgLRpFA.js","assets/chunks/index.D5YVt3kx.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{y as e,X as l,o as k,c as p,j as s,F as E,E as d,a3 as n,t as r}from"./chunks/framework.Bjuc1Jix.js";const g=n("",12),y={class:"demo",style:{height:"150px",overflow:"auto"}},o={id:"infinite"},c={class:"sg-infinite-item"},F=n("",3),u=s("div",{class:"demo",style:{height:"150px",overflow:"auto"}},[s("ea-infinite",{id:"infinite-disabled",delay:"500",loading:""},[s("ea-infinite-item",null,[s("div",{class:"sg-infinite-item"},"1")]),s("ea-infinite-item",null,[s("div",{class:"sg-infinite-item"},"2")]),s("ea-infinite-item",null,[s("div",{class:"sg-infinite-item"},"3")]),s("ea-infinite-item",null,[s("div",{class:"sg-infinite-item"},"4")]),s("ea-infinite-item",null,[s("div",{class:"sg-infinite-item"},"5")]),s("div",{class:"loading-status",slot:"loading"},"加载中..."),s("div",{class:"no-more-status",slot:"noMore"},"到底啦~")])],-1),C=n("",11),b=JSON.parse('{"title":"InfiniteScroll 无限滚动","description":"","frontmatter":{},"headers":[],"relativePath":"ea-infinite-scroll.md","filePath":"ea-infinite-scroll.md","lastUpdated":1725702843000}'),m={name:"ea-infinite-scroll.md"},f=Object.assign(m,{setup(A){return e(()=>{l(()=>import("./chunks/index.NAFOYUD4.js"),__vite__mapDeps([0,1,2])),l(()=>import("./chunks/index.DP2rzg_V.js"),[]);const i={wrap:document.getElementById("infinite"),disabledWrap:document.getElementById("infinite-disabled"),createTemplate(t){return`<div class="sg-infinite-item">${t}</div>`},appendChild(t){const a=t.querySelectorAll("ea-infinite-item"),h=document.createElement("ea-infinite-item");h.innerHTML=this.createTemplate(a.length+1),t.appendChild(h)}};i.wrap.addEventListener("bottomReached",t=>{for(let a=0;a<2;a++)i.appendChild(i.wrap)}),i.disabledWrap.addEventListener("bottomReached",t=>{if(i.disabledWrap.children.length>15){i.disabledWrap.disabled=!0;return}for(let a=0;a<5;a++)i.appendChild(i.disabledWrap)})}),(i,t)=>(k(),p("div",null,[g,s("div",y,[s("ea-infinite",o,[(k(),p(E,null,d(5,a=>s("ea-infinite-item",null,[s("div",c,r(a),1)])),64))])]),F,u,C]))}});export{b as __pageData,f as default};
