const __vite__fileDeps=["assets/chunks/index.DPjDzj_P.js","assets/chunks/ea-button.B2M6Cckg.js","assets/chunks/Base.yCeCPjNm.js","assets/chunks/index.Bo3IO5uk.js","assets/chunks/index.CahXI5qD.js","assets/chunks/index.o8RwEIcu.js","assets/chunks/index.atscLXDR.js","assets/chunks/index.BObYv0qB.js","assets/chunks/index.CpoGCwi-.js","assets/chunks/createElement.BM9xfELw.js","assets/chunks/index.DsxUdGK0.js","assets/chunks/index.CRmA-5R8.js","assets/chunks/index.BHOvWUqv.js","assets/chunks/index.Jx4vF3X5.js","assets/chunks/index.CnKGfFkJ.js","assets/chunks/index.CULlEqES.js","assets/chunks/timeout.ZZWNqneZ.js","assets/chunks/index.CRWUm4Jj.js","assets/chunks/index.FXfQvNC8.js","assets/chunks/index.BAuRzWpH.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{y as n,X as a,o as e,c as k,a3 as i,j as s}from"./chunks/framework.Bjuc1Jix.js";const p=i("",12),E=s("div",{class:"demo"},[s("ea-button-group",null,[s("ea-button",{id:"collapse",type:"primary"},"设置 active 为 1, 2, 3"),s("ea-button",{id:"closeAll",type:"primary"},'设置 active 为 ""')]),s("ea-collapse",{id:"normalCollapse",active:"1, 2"},[s("ea-collapse-item",{class:"",title:"标题1",name:"1"},[s("div",null,"内容1")]),s("ea-collapse-item",{class:"",title:"标题2",name:"2"},[s("div",null,"内容2")]),s("ea-collapse-item",{class:"",title:"标题3",name:"3"},[s("div",null,"内容3")])])],-1),d=i("",3),r=s("div",{class:"demo"},[s("ea-button",{id:"accordion",type:"primary"},"设置 active 为 2"),s("ea-collapse",{id:"accordionCollapse",active:"1",accordion:""},[s("ea-collapse-item",{class:"",title:"标题1",name:"1"},[s("div",null,"内容1")]),s("ea-collapse-item",{class:"",title:"标题2",name:"2"},[s("div",null,"内容2")])])],-1),o=i("",12),g=[p,E,d,r,o],u=JSON.parse('{"title":"Collapse 折叠面板","description":"","frontmatter":{},"headers":[],"relativePath":"ea-collapse.md","filePath":"ea-collapse.md","lastUpdated":1725525891000}'),c={name:"ea-collapse.md"},C=Object.assign(c,{setup(y){return n(()=>{a(()=>import("./chunks/index.DPjDzj_P.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19])),a(()=>import("./chunks/index.l0sNRNKZ.js"),[]),{el:document.querySelector("#normalCollapse"),collapseAll:document.querySelector("#collapse"),closeAll:document.querySelector("#closeAll"),init(){this.collapseAll.addEventListener("click",()=>{this.el.active="1, 2, 3"}),this.closeAll.addEventListener("click",()=>{this.el.active=""})}}.init(),{el:document.querySelector("#accordionCollapse"),btn:document.querySelector("#accordion"),init(){this.btn.addEventListener("click",()=>{this.el.active=2}),this.el.addEventListener("change",h=>{console.log(h.detail)})}}.init()}),(t,l)=>(e(),k("div",null,g))}});export{u as __pageData,C as default};
