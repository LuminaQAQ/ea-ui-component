const __vite__fileDeps=["assets/chunks/index.DU0Koc4s.js","assets/chunks/Base.LSgLRpFA.js","assets/chunks/index.CgEiilRo.js","assets/chunks/index.Vv5Ba7lM.js","assets/chunks/index.D6SVBbJV.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{y as h,X as a,o as l,c as p,a3 as i,j as s}from"./chunks/framework.fcS_xQhl.js";const k=i("",11),e=s("div",{class:"row left"},[s("ea-button",{id:"ea-progress-change-btn",type:"primary"},"修改值为 100"),s("ea-progress",{id:"ea-progress",percentage:"25"})],-1),E=s("div",{class:"col left"},[s("ea-progress",{percentage:"60",status:"success"}),s("ea-progress",{percentage:"75",status:"warning"}),s("ea-progress",{percentage:"90",status:"exception"})],-1),r=i("",3),d=s("div",{class:"row left"},[s("ea-button",{id:"ea-progress-text-inside-btn",type:"primary"},"修改为随机值"),s("ea-progress",{id:"ea-progress-text-inside","stroke-width":"26","text-inside":"",percentage:"25"})],-1),g=s("div",{class:"col left"},[s("ea-progress",{"stroke-width":"24","text-inside":"",percentage:"60",status:"success"}),s("ea-progress",{"stroke-width":"22","text-inside":"",percentage:"75",status:"warning"}),s("ea-progress",{"stroke-width":"20","text-inside":"",percentage:"90",status:"exception"})],-1),o=i("",3),y=s("div",{class:"row left"},[s("ea-progress",{id:"ea-progress_circle",type:"circle",percentage:0}),s("ea-button",{id:"ea-progress_circle-change-btn",type:"primary"},"修改为随机值")],-1),c=s("div",{class:"row left"},[s("ea-progress",{type:"circle",percentage:0}),s("ea-progress",{type:"circle",percentage:25}),s("ea-progress",{type:"circle",percentage:100,status:"success"}),s("ea-progress",{type:"circle",percentage:70,status:"warning"}),s("ea-progress",{type:"circle",percentage:50,status:"exception"})],-1),F=i("",2),u=s("div",{class:"row left"},[s("ea-progress",{id:"ea-progress_dashboard",type:"dashboard",percentage:25}),s("ea-button-group",null,[s("ea-button",{id:"ea-progress_dashboard-minus-btn",type:"primary"},"-"),s("ea-button",{id:"ea-progress_dashboard-plus-btn",type:"primary"},"+")])],-1),C=s("div",{class:"row left"},[s("ea-progress",{type:"dashboard",percentage:0}),s("ea-progress",{type:"dashboard",percentage:25}),s("ea-progress",{type:"dashboard",percentage:100,status:"success"}),s("ea-progress",{type:"dashboard",percentage:70,status:"warning"}),s("ea-progress",{type:"dashboard",percentage:50,status:"exception"})],-1),B=i("",6),q=[k,e,E,r,d,g,o,y,c,F,u,C,B],v=JSON.parse('{"title":"Progress 进度条","description":"","frontmatter":{},"headers":[],"relativePath":"ea-progress.md","filePath":"ea-progress.md","lastUpdated":1725813896000}'),b={name:"ea-progress.md"},x=Object.assign(b,{setup(_){return h(()=>{a(()=>import("./chunks/index.DP2rzg_V.js"),[]),a(()=>import("./chunks/index.DU0Koc4s.js"),__vite__mapDeps([0,1,2])),a(()=>import("./chunks/index.Vv5Ba7lM.js"),__vite__mapDeps([3,1,2])),a(()=>import("./chunks/index.D6SVBbJV.js"),__vite__mapDeps([4,1])),{btn:document.querySelector("#ea-progress-change-btn"),progress:document.querySelector("#ea-progress"),init(){this.btn.addEventListener("click",()=>{this.progress.percentage=100})}}.init(),{btn:document.querySelector("#ea-progress-text-inside-btn"),progress:document.querySelector("#ea-progress-text-inside"),init(){this.btn.addEventListener("click",()=>{this.progress.percentage=Math.floor(Math.random()*100)})}}.init(),{btn:document.querySelector("#ea-progress_circle-change-btn"),progress:document.querySelector("#ea-progress_circle"),init(){this.btn.addEventListener("click",()=>{this.progress.percentage=Math.floor(Math.random()*100)})}}.init(),{minusBtn:document.querySelector("#ea-progress_dashboard-minus-btn"),plusBtn:document.querySelector("#ea-progress_dashboard-plus-btn"),progress:document.querySelector("#ea-progress_dashboard"),init(){this.minusBtn.addEventListener("click",()=>{this.progress.percentage=Number(this.progress.percentage)-10}),this.plusBtn.addEventListener("click",()=>{this.progress.percentage=Number(this.progress.percentage)+10})}}.init()}),(t,n)=>(l(),p("div",null,q))}});export{v as __pageData,x as default};
