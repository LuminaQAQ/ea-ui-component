const __vite__fileDeps=["assets/chunks/index.IwLnhnsO.js","assets/chunks/timeout.CMJ_lqqj.js","assets/chunks/Base.LSgLRpFA.js","assets/chunks/index.Vv5Ba7lM.js","assets/chunks/index.CgEiilRo.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{y as n,X as i,o as e,c as k,a3 as a,j as s}from"./chunks/framework.fcS_xQhl.js";const p=a("",12),E=s("div",{class:"demo"},[s("ea-button-group",null,[s("ea-button",{id:"collapse",type:"primary"},"设置 active 为 1, 2, 3"),s("ea-button",{id:"closeAll",type:"primary"},'设置 active 为 ""')]),s("ea-collapse",{id:"normalCollapse",active:"1, 2"},[s("ea-collapse-item",{class:"",title:"标题1",name:"1"},[s("div",null,"内容1")]),s("ea-collapse-item",{class:"",title:"标题2",name:"2"},[s("div",null,"内容2")]),s("ea-collapse-item",{class:"",title:"标题3",name:"3"},[s("div",null,"内容3")])])],-1),d=a("",3),r=s("div",{class:"demo"},[s("ea-button",{id:"accordion",type:"primary"},"设置 active 为 2"),s("ea-collapse",{id:"accordionCollapse",active:"1",accordion:""},[s("ea-collapse-item",{class:"",title:"标题1",name:"1"},[s("div",null,"内容1")]),s("ea-collapse-item",{class:"",title:"标题2",name:"2"},[s("div",null,"内容2")])])],-1),o=a("",12),g=[p,E,d,r,o],u=JSON.parse('{"title":"Collapse 折叠面板","description":"","frontmatter":{},"headers":[],"relativePath":"ea-collapse.md","filePath":"ea-collapse.md","lastUpdated":1725653109000}'),c={name:"ea-collapse.md"},C=Object.assign(c,{setup(y){return n(()=>{i(()=>import("./chunks/index.IwLnhnsO.js"),__vite__mapDeps([0,1,2])),i(()=>import("./chunks/index.Vv5Ba7lM.js"),__vite__mapDeps([3,2,4])),i(()=>import("./chunks/index.DP2rzg_V.js"),[]),{el:document.querySelector("#normalCollapse"),collapseAll:document.querySelector("#collapse"),closeAll:document.querySelector("#closeAll"),init(){this.collapseAll.addEventListener("click",()=>{this.el.active="1, 2, 3"}),this.closeAll.addEventListener("click",()=>{this.el.active=""})}}.init(),{el:document.querySelector("#accordionCollapse"),btn:document.querySelector("#accordion"),init(){this.btn.addEventListener("click",()=>{this.el.active=2}),this.el.addEventListener("change",h=>{console.log(h.detail)})}}.init()}),(t,l)=>(e(),k("div",null,g))}});export{u as __pageData,C as default};
