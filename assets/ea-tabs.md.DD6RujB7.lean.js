const __vite__fileDeps=["assets/chunks/index.DhjvHksS.js","assets/chunks/createElement.BM9xfELw.js","assets/chunks/Base.yCeCPjNm.js","assets/chunks/ea-button.B2M6Cckg.js","assets/chunks/index.DTbj9FZz.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{y as e,a1 as i,o as E,c as d,a2 as a,j as s,a as r}from"./chunks/framework.DchfT4Lv.js";const g=a("",8),y=s("div",{class:"demo"},[s("ea-tabs",{id:"clickEvent--normal-card",actived:"second"},[s("ea-tab",{name:"first"},"用户管理"),s("ea-tab",{name:"second"},"配置管理"),s("ea-tab",{name:"third"},"角色管理"),s("ea-tab",{name:"fourth"},"定时任务补偿"),s("div",{slot:"pane"},[s("ea-pane",{class:"tab-page",name:"first"},"用户管理"),s("ea-pane",{class:"tab-page",name:"second"},"配置管理"),s("ea-pane",{class:"tab-page",name:"third"},"角色管理"),s("ea-pane",{class:"tab-page",name:"fourth"},"定时任务补偿")])])],-1),o=a("",4),F=s("div",{class:"demo"},[s("ea-tabs",{id:"clickEvent--card",actived:"second",type:"card"},[s("ea-tab",{name:"first"},"用户管理"),s("ea-tab",{name:"second"},"配置管理"),s("ea-tab",{name:"third"},"角色管理"),s("ea-tab",{name:"fourth"},"定时任务补偿"),s("div",{slot:"pane"},[s("ea-pane",{class:"tab-page",name:"first"},"用户管理"),s("ea-pane",{class:"tab-page",name:"second"},"配置管理"),s("ea-pane",{class:"tab-page",name:"third"},"角色管理"),s("ea-pane",{class:"tab-page",name:"fourth"},"定时任务补偿")])])],-1),c=a("",4),u=s("div",{class:"demo"},[s("ea-tabs",{id:"clickEvent--border-card",actived:"second",type:"border-card"},[s("ea-tab",{name:"first"},"用户管理"),s("ea-tab",{name:"second"},"配置管理"),s("ea-tab",{name:"third"},"角色管理"),s("ea-tab",{name:"fourth"},"定时任务补偿"),s("div",{slot:"pane"},[s("ea-pane",{class:"tab-page",name:"first"},"用户管理"),s("ea-pane",{class:"tab-page",name:"second"},"配置管理"),s("ea-pane",{class:"tab-page",name:"third"},"角色管理"),s("ea-pane",{class:"tab-page",name:"fourth"},"定时任务补偿")])])],-1),b=a("",3),C=s("div",{class:"demo"},[s("ea-button",{id:"addBtn",type:"primary",size:"small"},"添加标签页"),s("ea-tabs",{id:"editable",actived:"second",editable:""},[s("ea-tab",{name:"first"},[s("ea-icon",{icon:"icon-coffee"}),r(" 用户管理 ")]),s("ea-tab",{name:"second"},"配置管理"),s("ea-tab",{name:"third"},"角色管理"),s("ea-tab",{name:"fourth"},"定时任务补偿"),s("div",{id:"editableSlot",slot:"pane"},[s("ea-pane",{class:"tab-page",name:"first"},"用户管理"),s("ea-pane",{class:"tab-page",name:"second"},"配置管理"),s("ea-pane",{class:"tab-page",name:"third"},"角色管理"),s("ea-pane",{class:"tab-page",name:"fourth"},"定时任务补偿")])])],-1),q=a("",12),B=[g,y,o,F,c,u,b,C,q],D=JSON.parse('{"title":"Tabs 标签页","description":"","frontmatter":{},"headers":[],"relativePath":"ea-tabs.md","filePath":"ea-tabs.md","lastUpdated":1722335211000}'),m={name:"ea-tabs.md"},v=Object.assign(m,{setup(A){return e(()=>{i(()=>import("./chunks/index.DP2rzg_V.js"),[]),i(()=>import("./chunks/index.DhjvHksS.js"),__vite__mapDeps([0,1,2])),i(()=>import("./chunks/index.l0sNRNKZ.js"),[]),i(()=>import("./chunks/ea-button.B2M6Cckg.js"),__vite__mapDeps([3,2])),i(()=>import("./chunks/index.DTbj9FZz.js"),__vite__mapDeps([4,2,0,1])),{wrap:document.querySelector("#editable"),paneSlot:document.querySelector("#editableSlot"),addBtn:document.querySelector("#addBtn"),handleTabclose(t){t.addEventListener("tab-close",h=>{console.log("close",h.detail)})},handleTabAdd(t,h,p){t.addEventListener("click",()=>{const n=document.createElement("ea-tab");n.innerText="新增标签";const k=document.createElement("ea-pane");k.innerText="新增标签内容",h.appendChild(n),p.appendChild(k)}),h.addEventListener("tab-add",n=>{console.log("add",n.detail)})},init(){this.handleTabclose(this.wrap),this.handleTabAdd(this.addBtn,this.wrap,this.paneSlot)}}.init()}),(l,t)=>(E(),d("div",null,B))}});export{D as __pageData,v as default};
