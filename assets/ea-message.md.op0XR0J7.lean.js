const __vite__fileDeps=["assets/chunks/index.Btg2oib7.js","assets/chunks/Base.LSgLRpFA.js","assets/chunks/index.CgEiilRo.js","assets/chunks/index.Vv5Ba7lM.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{y as h,X as a,o as l,c as e,a3 as k}from"./chunks/framework.fcS_xQhl.js";const p=k("",36),E=[p],F=JSON.parse('{"title":"Message 消息提示","description":"","frontmatter":{},"headers":[],"relativePath":"ea-message.md","filePath":"ea-message.md","lastUpdated":1725791552000}'),d={name:"ea-message.md"},u=Object.assign(d,{setup(r){return h(()=>{a(()=>import("./chunks/index.Btg2oib7.js"),__vite__mapDeps([0,1,2])),a(()=>import("./chunks/index.Vv5Ba7lM.js"),__vite__mapDeps([3,1,2])),a(()=>import("./chunks/index.K6Dvbx-E.js"),[]),document.getElementById("messageTextBtn").addEventListener("click",()=>{window.$message.open("1")}),{objectBtn:document.getElementById("messageObjectBtn"),successObjectBtn:document.getElementById("messageSuccessObjectBtn"),errorObjectBtn:document.getElementById("messageErrorObjectBtn"),warningObjectBtn:document.getElementById("messageWarningObjectBtn"),addEvent(i,s){i.addEventListener("click",()=>{s&&s()})},init(){this.addEvent(this.objectBtn,()=>{window.$message.open({text:"2",type:"info"})}),this.addEvent(this.successObjectBtn,()=>{window.$message.open({text:"2",type:"success"})}),this.addEvent(this.errorObjectBtn,()=>{window.$message.open({text:"3",type:"error"})}),this.addEvent(this.warningObjectBtn,()=>{window.$message.open({text:"3",type:"warning"})})}}.init(),{closableBtn:document.getElementById("messageObjectBtnHasClose"),durationIsZeroBtn:document.getElementById("messageObjectBtnNotClose"),successObjectBtn:document.getElementById("messageSuccessObjectBtnBtnHasClose"),errorObjectBtn:document.getElementById("messageErrorObjectBtnBtnHasClose"),warningObjectBtn:document.getElementById("messageWarningObjectBtnBtnHasClose"),addEvent(i,s){i.addEventListener("click",()=>{s&&s()})},init(){this.addEvent(this.closableBtn,()=>{window.$message.open({text:"2",showClose:!0,type:"info"})}),this.addEvent(this.durationIsZeroBtn,()=>{window.$message.open({text:"2",showClose:!0,type:"info",duration:0})}),this.addEvent(this.successObjectBtn,()=>{window.$message.open({text:"2",showClose:!0,type:"success"})}),this.addEvent(this.errorObjectBtn,()=>{window.$message.open({text:"3",showClose:!0,type:"error"})}),this.addEvent(this.warningObjectBtn,()=>{window.$message.open({text:"3",showClose:!0,type:"warning"})})}}.init(),{centerBtn:document.getElementById("centerMessageObjectBtn"),init(){this.centerBtn.addEventListener("click",()=>{window.$message.open({text:"3",showClose:!0,center:!0})})}}.init(),{closeEventBtn:document.getElementById("closeEventBtn"),init(){this.closeEventBtn.addEventListener("click",()=>{window.$message.open({text:"3",showClose:!0,center:!0}).onClose(()=>{alert("关闭了")})})}}.init()}),(n,t)=>(l(),e("div",null,E))}});export{F as __pageData,u as default};
