import{y as p,X as h,o as E,c as d,a3 as a,j as s}from"./chunks/framework.fcS_xQhl.js";const r=a("",7),g=s("div",{class:"demo"},[s("ea-radio-group",{name:"sort"},[s("span",{style:{"margin-right":"1rem"}},"排序："),s("ea-radio",{class:"reverse",value:"false",checked:""},"倒序"),s("ea-radio",{class:"positive",value:"false"},"正序")]),s("div",{style:{"margin-top":"1rem"}},[s("ea-button",{class:"add",type:"primary"},"添加时间节点")]),s("ea-timeline",{class:"board"},[s("ea-timeline-item",{time:"2024-7-2"},"把大象放进去"),s("ea-timeline-item",{time:"2024-7-1"},"打开冰箱"),s("ea-timeline-item",{time:"2024-7-3"},"把冰箱关住"),s("ea-timeline-item",{time:"2024-7-4"},"因违反动物保护法, 该组件库无限期停更")])],-1),y=a("",4),o=s("div",{class:"demo"},[s("ea-timeline",null,[s("ea-timeline-item",{type:"success",size:"large",time:"2024-7-1"},"打开冰箱"),s("ea-timeline-item",{type:"primary",size:"large",time:"2024-7-2"},"把大象放进去"),s("ea-timeline-item",{type:"warning",size:"large",time:"2024-7-3"},"把冰箱关住"),s("ea-timeline-item",{type:"danger",size:"large",time:"2024-7-4"},"因违反动物保护法, 该组件库无限期停更"),s("ea-timeline-item",{type:"danger",size:"large",color:"black",time:"2024-7-5"},"该组件库已无法访问")])],-1),F=a("",3),c=s("div",{class:"demo"},[s("ea-timeline",null,[s("ea-timeline-item",{placement:"top",type:"success",time:"2024-7-1"},[s("ea-card",null,"打开冰箱")]),s("ea-timeline-item",{placement:"top",type:"primary",time:"2024-7-2"},[s("ea-card",null,"把大象放进去")]),s("ea-timeline-item",{placement:"top",type:"warning",time:"2024-7-3"},[s("ea-card",null,"把冰箱关住")]),s("ea-timeline-item",{placement:"top",type:"danger",time:"2024-7-4"},[s("ea-card",null,"因违反动物保护法, 该组件库无限期停更")]),s("ea-timeline-item",{placement:"top",type:"danger",color:"black",time:"2024-7-5"},[s("ea-card",null,"该组件库已无法访问")])])],-1),m=a("",7),u=[r,g,y,o,F,c,m],A=JSON.parse('{"title":"Timeline 时间线","description":"","frontmatter":{},"headers":[],"relativePath":"ea-timeline.md","filePath":"ea-timeline.md","lastUpdated":1720636605000}'),C={name:"ea-timeline.md"},D=Object.assign(C,{setup(q){return p(()=>{h(()=>import("./chunks/index.l0sNRNKZ.js"),[]),h(()=>import("./chunks/index.DP2rzg_V.js"),[]);const n=document.querySelector(".add"),i=document.querySelector(".board");n.addEventListener("click",()=>{const t=document.createElement("ea-timeline-item"),e=Math.floor(Math.random()*31+1);t.time=`2024-7-${e}`,t.innerHTML="随机消息",i.appendChild(t)});const l=document.querySelector(".reverse"),k=document.querySelector(".positive");l.addEventListener("change",()=>{i.reverse=!0}),k.addEventListener("change",()=>{i.reverse=!1})}),(n,i)=>(E(),d("div",null,u))}});export{A as __pageData,D as default};
