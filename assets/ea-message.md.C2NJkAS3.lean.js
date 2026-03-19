const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/chunks/index.BcdFxRfA.js","assets/chunks/Base.CUnbq9tS.js","assets/chunks/timeout.Cw2pzw4m.js","assets/chunks/ea-message-box.BryfkURS.js","assets/chunks/framework.B6OgyADx.js","assets/chunks/ea-dropdown.Ci_E9DjF.js","assets/chunks/ea-container.eA1zjCwl.js","assets/chunks/ea-message.tIrRNDdw.js","assets/chunks/ea-notification.BpdLLmaM.js"])))=>i.map(i=>d[i]);
import{y,X as p,c as F,o as c,a3 as t,j as s}from"./chunks/framework.B6OgyADx.js";import{p as h}from"./chunks/ea-message.tIrRNDdw.js";import"./chunks/Base.CUnbq9tS.js";import"./chunks/timeout.Cw2pzw4m.js";const u=t("",12),C=s("div",{class:"demo row"},[s("ea-button",{plain:"",onclick:`
          window.$message({
            message: 'This is a message.',
            type: 'info',
            showClose: false,
            duration: 3000,
          })
        `}," Show message "),s("ea-button",{id:"moduleInstanceBtn",plain:""}," Module-Instance message "),s("ea-button",{id:"chainInstanceBtn",plain:""}," Chain-Instance message ")],-1),B=t("",3),m=s("div",{class:"demo row"},[s("ea-button",{plain:"",onclick:"window.$message.info('This is a info message.')"},"info"),s("ea-button",{type:"primary",plain:"",onclick:"window.$message.primary('This is a info message.')"},"Primary"),s("ea-button",{type:"success",plain:"",onclick:`
          window.$message.success('Congrats, this is a success message.')
        `},"Success"),s("ea-button",{type:"warning",plain:"",onclick:"window.$message.warning('Warning, this is a warning message.')"},"Warning"),s("ea-button",{type:"danger",plain:"",onclick:"window.$message.error('Oops, this is a error message.')"},"Error")],-1),b=t("",3),q=s("div",{class:"demo row"},[s("ea-button",{plain:"",onclick:`
          window.$message({
            message: 'This is a info message.',
            showClose: true,
          })
        `},"info"),s("ea-button",{type:"primary",plain:"",onclick:`
          window.$message({
            type: 'primary',
            message: 'This is a info message.',
            showClose: true,
          })
        `},"Primary"),s("ea-button",{type:"success",plain:"",onclick:`
          window.$message({
            type: 'success',
            message: 'Congrats, this is a success message.',
            showClose: true,
          })
        `},"Success"),s("ea-button",{type:"warning",plain:"",onclick:`
          window.$message({
            type: 'warning',
            message: 'Warning, this is a warning message.',
            showClose: true,
          })
        `},"Warning"),s("ea-button",{type:"danger",plain:"",onclick:`
          window.$message({
            type: 'error',
            message: 'Oops, this is a error message.',
            showClose: true,
          })
        `},"Error"),s("ea-button",{plain:"",onclick:`
          window.$message({
            message: 'This is a info message.',
            showClose: true,
            duration: 0,
          })
        `},"Won't close automatically")],-1),A=t("",4),D=s("div",{class:"demo"},[s("ea-button",{plain:"",onclick:`
          window.$message({
            dangerouslyUseHTMLString: true,
            message: '<strong>This is <i>HTML</i> string</strong>',
          })
        `}," Use HTML string ")],-1),_=t("",2),v=s("div",{id:"placementSection",class:"demo row"},[s("ea-button",{plain:""}," Top "),s("ea-button",{plain:""}," Top Left "),s("ea-button",{plain:""}," Top Right "),s("ea-button",{plain:""}," Bottom "),s("ea-button",{plain:""}," Bottom Left "),s("ea-button",{plain:""}," Bottom Right ")],-1),w=t("",10),f=[u,C,B,m,b,q,A,D,_,v,w],M=JSON.parse('{"title":"Message 消息提示","description":"","frontmatter":{},"headers":[],"relativePath":"ea-message.md","filePath":"ea-message.md","lastUpdated":1766827952000}'),T={name:"ea-message.md"},R=Object.assign(T,{setup(S){return y(()=>{p(()=>import("./chunks/index.BcdFxRfA.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8])),p(()=>Promise.resolve({}),[]),{moduleInstanceBtn:document.getElementById("moduleInstanceBtn"),chainInstanceBtn:document.getElementById("chainInstanceBtn"),init(){this.moduleInstanceBtn.addEventListener("click",()=>{h({message:"This is a message.",type:"info",showClose:!1,duration:3e3})}),this.chainInstanceBtn.addEventListener("click",()=>{h.info("This is a message.")})}}.init();let l=0,e=0,E=0,d=0,r=0,g=0;const o=(n="top")=>{let a=0,i="success";switch(n){case"top":a=++l,i="success";break;case"bottom":a=++e,i="warning";break;case"top-left":a=++E,i="info";break;case"top-right":a=++d,i="primary";break;case"bottom-left":a=++r,i="warning";break;case"bottom-right":a=++g,i="error";break}h({message:`This is a message from the ${n} ${a}`,type:i,placement:n})};({els:document.querySelectorAll("#placementSection ea-button"),init(){this.els.forEach(n=>{n.addEventListener("click",()=>{var i;const a=(i=n.textContent.trim().toLocaleLowerCase())==null?void 0:i.replace(" ","-");o(a)})})}}).init()}),(k,l)=>(c(),F("div",null,f))}});export{M as __pageData,R as default};
