const __vite__fileDeps=["assets/chunks/index.D7-TDhRU.js","assets/chunks/index.C9gXeFeG.js","assets/chunks/createElement.P574Kufq.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{s as n,y as l,a1 as t,o as e,c as p,a2 as E}from"./chunks/framework.DchfT4Lv.js";const d=E("",26),r=[d],y=JSON.parse('{"title":"Checkbox 多选框","description":"","frontmatter":{},"headers":[],"relativePath":"ea-checkbox.md","filePath":"ea-checkbox.md","lastUpdated":1717252856000}'),c={name:"ea-checkbox.md"},u=Object.assign(c,{setup(g){return n(null),l(()=>{t(()=>import("./chunks/index.D7-TDhRU.js"),__vite__mapDeps([0,1,2])),t(()=>import("./chunks/index.l0sNRNKZ.js"),[]),document.querySelector("#city-group").addEventListener("click",()=>{const h=document.querySelectorAll("ea-checkbox[name=city][checked]"),s=[];h.forEach(i=>s.push(i.value)),alert(`[${s}]`)}),document.querySelector("#setIndeterminate").addEventListener("click",function(a){document.querySelector("#checkAll").indeterminate=!0}),document.querySelector("#day-group").addEventListener("click",function(a){console.log(document.querySelector("#ea-checkbox-group").value);const s=document.querySelectorAll("ea-checkbox[name=day][checked]"),i=[];s.forEach(k=>i.push(k.value)),alert(`[${i}]`)})}),(a,h)=>(e(),p("div",null,r))}});export{y as __pageData,u as default};
