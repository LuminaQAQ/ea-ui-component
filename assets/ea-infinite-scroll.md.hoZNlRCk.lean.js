const __vite__fileDeps=["assets/chunks/index.Duo_kV_O.js","assets/chunks/Base.CfZnvlaz.js","assets/chunks/createElement.BM9xfELw.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{y as e,a1 as l,o as k,c as p,j as s,F as E,E as d,a2 as t,t as r}from"./chunks/framework.DchfT4Lv.js";const g=t("",7),y={class:"demo",style:{height:"150px",overflow:"auto"}},o={id:"infinite"},c={class:"sg-infinite-item"},F=t("",6),u=s("div",{class:"demo",style:{height:"150px",overflow:"auto"}},[s("ea-infinite",{id:"infinite-disabled",delay:"500",loading:""},[s("ea-infinite-item",null,[s("div",{class:"sg-infinite-item"},"1")]),s("ea-infinite-item",null,[s("div",{class:"sg-infinite-item"},"2")]),s("ea-infinite-item",null,[s("div",{class:"sg-infinite-item"},"3")]),s("ea-infinite-item",null,[s("div",{class:"sg-infinite-item"},"4")]),s("ea-infinite-item",null,[s("div",{class:"sg-infinite-item"},"5")]),s("div",{class:"loading-status",slot:"loading"},"加载中..."),s("div",{class:"no-more-status",slot:"noMore"},"到底啦~")])],-1),C=t("",15),f=JSON.parse('{"title":"InfiniteScroll 无限滚动","description":"","frontmatter":{},"headers":[],"relativePath":"ea-infinite-scroll.md","filePath":"ea-infinite-scroll.md","lastUpdated":1720670254000}'),m={name:"ea-infinite-scroll.md"},D=Object.assign(m,{setup(A){return e(()=>{l(()=>import("./chunks/index.Duo_kV_O.js"),__vite__mapDeps([0,1,2])),l(()=>import("./chunks/index.DP2rzg_V.js"),[]);const i={wrap:document.getElementById("infinite"),disabledWrap:document.getElementById("infinite-disabled"),createTemplate(n){return`<div class="sg-infinite-item">${n}</div>`},appendChild(n){const a=n.querySelectorAll("ea-infinite-item"),h=document.createElement("ea-infinite-item");h.innerHTML=this.createTemplate(a.length+1),n.appendChild(h)}};i.wrap.addEventListener("bottomReached",n=>{for(let a=0;a<2;a++)i.appendChild(i.wrap)}),i.disabledWrap.addEventListener("bottomReached",n=>{if(i.disabledWrap.children.length>15){i.disabledWrap.disabled=!0;return}for(let a=0;a<5;a++)i.appendChild(i.disabledWrap)})}),(i,n)=>(k(),p("div",null,[g,s("div",y,[s("ea-infinite",o,[(k(),p(E,null,d(5,a=>s("ea-infinite-item",null,[s("div",c,r(a),1)])),64))])]),F,u,C]))}});export{f as __pageData,D as default};
