const __vite__fileDeps=["assets/chunks/index.8sX49IGk.js","assets/chunks/ea-button.CEgBmwaL.js","assets/chunks/Base.CfZnvlaz.js","assets/chunks/index.CPYSStCC.js","assets/chunks/index.djsIlWZR.js","assets/chunks/index.DZxqsAXa.js","assets/chunks/index.Copokoz6.js","assets/chunks/createElement.BM9xfELw.js","assets/chunks/index.Ccdx3aI5.js","assets/chunks/index.Duo_kV_O.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{y as a,a1 as i,o as t,c as n,a2 as h}from"./chunks/framework.DchfT4Lv.js";import{E as l}from"./chunks/MessageClass.D7GK-Dlz.js";const e=h("",33),k=[e],y=JSON.parse('{"title":"Message 消息提示","description":"","frontmatter":{},"headers":[],"relativePath":"ea-message.md","filePath":"ea-message.md","lastUpdated":1720670254000}'),p={name:"ea-message.md"},o=Object.assign(p,{setup(E){return a(()=>{i(()=>import("./chunks/index.8sX49IGk.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9])),i(()=>import("./chunks/index.DP2rzg_V.js"),[]);const s=new l;document.getElementById("messageTextBtn").addEventListener("click",()=>{s.open("1")}),document.getElementById("messageObjectBtn").addEventListener("click",()=>{s.open({text:"2",type:"info"})}),document.getElementById("messageSuccessObjectBtn").addEventListener("click",()=>{s.open({text:"2",type:"success"})}),document.getElementById("messageErrorObjectBtn").addEventListener("click",()=>{s.open({text:"3",type:"error"})}),document.getElementById("messageWarningObjectBtn").addEventListener("click",()=>{s.open({text:"3",type:"warning"})}),document.getElementById("messageObjectBtnHasClose").addEventListener("click",()=>{s.open({text:"2",showClose:!0,type:"info"})}),document.getElementById("messageObjectBtnNotClose").addEventListener("click",()=>{s.open({text:"2",showClose:!0,type:"info",duration:0})}),document.getElementById("messageSuccessObjectBtnBtnHasClose").addEventListener("click",()=>{s.open({text:"2",showClose:!0,type:"success"})}),document.getElementById("messageErrorObjectBtnBtnHasClose").addEventListener("click",()=>{s.open({text:"3",showClose:!0,type:"error"})}),document.getElementById("messageWarningObjectBtnBtnHasClose").addEventListener("click",()=>{s.open({text:"3",showClose:!0,type:"warning"})}),document.getElementById("centerMessageObjectBtn").addEventListener("click",()=>{s.open({text:"3",showClose:!0,center:!0})}),document.getElementById("closeEventBtn").addEventListener("click",()=>{s.open({text:"3",showClose:!0,center:!0}).onClose(()=>{alert("关闭了")})})}),(s,d)=>(t(),n("div",null,k))}});export{y as __pageData,o as default};
