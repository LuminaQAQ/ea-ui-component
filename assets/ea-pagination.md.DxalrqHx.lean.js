import{y as n,a1 as t,o as h,c as l,a2 as i,j as s}from"./chunks/framework.DchfT4Lv.js";const e=i("",5),p=s("div",{class:"col left"},[s("ea-pagination",{layout:"prev,pager,next",total:"60"}),s("ea-pagination",{layout:"prev,pager,next",total:"200"})],-1),k=i("",2),d=s("div",{class:"col left"},[s("ea-pagination",{id:"prevAndNext",layout:"prev,next",total:"80"})],-1),E=i("",4),r=s("div",{class:"col left"},[s("ea-pagination",{layout:"prev,pager,next",total:"60","page-count":"10"}),s("ea-pagination",{layout:"prev,pager,next",total:"200","page-count":"10"})],-1),o=i("",3),g=s("div",{class:"col left"},[s("ea-pagination",{background:"",layout:"prev,pager,next",total:"200"})],-1),c=i("",3),y=s("div",{class:"col left"},[s("section",null,"显示总数"),s("ea-pagination",{background:"",layout:"total,prev,pager,next",total:"200"})],-1),u=i("",3),F=s("table",{"currentPage:":"",number:""},[s("thead",null,[s("tr",null,[s("th",null,"事件名称"),s("th",null,"说明"),s("th",null,"回调参数")])]),s("tbody",null,[s("tr",null,[s("td",null,"change"),s("td",null,"页码改变时触发"),s("td")])])],-1),_=[e,p,k,d,E,r,o,g,c,y,u,F],B=JSON.parse('{"title":"Pagination 分页","description":"","frontmatter":{},"headers":[],"relativePath":"ea-pagination.md","filePath":"ea-pagination.md","lastUpdated":1718612748000}'),C={name:"ea-pagination.md"},m=Object.assign(C,{setup(v){return n(()=>{t(()=>import("./chunks/index.C8z8CMzH.js"),[]),t(()=>import("./chunks/index.l0sNRNKZ.js"),[]),document.querySelector("#prevAndNext").addEventListener("change",function(a){alert(`当前页码为: ${a.detail.currentPage}`)})}),(a,q)=>(h(),l("div",null,_))}});export{B as __pageData,m as default};
