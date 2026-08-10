const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/chunks/index.BNcRXFS8.js","assets/chunks/ea-alert.DbvoaEqV.js","assets/chunks/bem.ts.BJYMUd3n.js","assets/chunks/timeout.ts.B2a-hmL-.js","assets/chunks/constants.DpU7Im1K.js","assets/chunks/ea-icon.DOPatN9O.js","assets/chunks/framework.P9QaFu-U.js","assets/chunks/ea-input.BN8cFgkT.js","assets/chunks/ea-dropdown.EVF8Kl7R.js","assets/chunks/ea-container.ik7HZmm-.js","assets/chunks/ea-message-box.HC35q_Ic.js","assets/chunks/ea-message.CKYk90ov.js","assets/chunks/ea-notification.MizFhSa5.js","assets/chunks/ea-tag.D4A_1IXp.js"])))=>i.map(i=>d[i]);
import{v as F,V as k,o as y,c,a2 as t,j as s}from"./chunks/framework.P9QaFu-U.js";import{d as l}from"./chunks/ea-message.CKYk90ov.js";import"./chunks/bem.ts.BJYMUd3n.js";import"./chunks/constants.DpU7Im1K.js";import"./chunks/ea-icon.DOPatN9O.js";import"./chunks/timeout.ts.B2a-hmL-.js";const w=JSON.parse('{"title":"Message 消息提示","description":"","frontmatter":{},"headers":[],"relativePath":"ea-message.md","filePath":"ea-message.md","lastUpdated":1780334652000}'),u={name:"ea-message.md"},_=Object.assign(u,{setup(C){return F(()=>{k(()=>import("./chunks/index.BNcRXFS8.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13])),k(()=>Promise.resolve({}),[]),{moduleInstanceBtn:document.getElementById("moduleInstanceBtn"),chainInstanceBtn:document.getElementById("chainInstanceBtn"),init(){this.moduleInstanceBtn.addEventListener("click",()=>{l({message:"This is a message.",variant:"info",showClose:!1,duration:3e3})}),this.chainInstanceBtn.addEventListener("click",()=>{l.info("This is a message.")})}}.init();let h=0,e=0,E=0,d=0,r=0,g=0;const o=(n="top")=>{let a=0,i="success";switch(n){case"top":a=++h,i="success";break;case"bottom":a=++e,i="warning";break;case"top-left":a=++E,i="info";break;case"top-right":a=++d,i="primary";break;case"bottom-left":a=++r,i="warning";break;case"bottom-right":a=++g,i="danger";break}l({message:`This is a message from the ${n} ${a}`,variant:i,placement:n})};({els:document.querySelectorAll("#placementSection ea-button"),init(){this.els.forEach(n=>{n.addEventListener("click",()=>{var i;const a=(i=n.textContent.trim().toLocaleLowerCase())==null?void 0:i.replace(" ","-");o(a)})})}}).init()}),(p,h)=>(y(),c("div",null,[...h[0]||(h[0]=[t("",8),s("div",{class:"demo row"},[s("ea-button",{plain:"",onclick:`
          window.$message({
            message: 'This is a message.',
            variant: 'info',
            showClose: false,
            duration: 3000,
          })
        `}," Show message "),s("ea-button",{id:"moduleInstanceBtn",plain:""}," Module-Instance message "),s("ea-button",{id:"chainInstanceBtn",plain:""}," Chain-Instance message ")],-1),t("",3),s("div",{class:"demo row"},[s("ea-button",{plain:"",onclick:"window.$message.info('This is a info message.')"},"info"),s("ea-button",{variant:"primary",plain:"",onclick:"window.$message.primary('This is a primary message.')"},"Primary"),s("ea-button",{variant:"success",plain:"",onclick:`
          window.$message.success('Congrats, this is a success message.')
        `},"Success"),s("ea-button",{variant:"warning",plain:"",onclick:"window.$message.warning('Warning, this is a warning message.')"},"Warning"),s("ea-button",{variant:"danger",plain:"",onclick:"window.$message.danger('Oops, this is a danger message.')"},"Danger")],-1),t("",3),s("div",{class:"demo row"},[s("ea-button",{plain:"",onclick:`
          window.$message({
            message: 'This is a info message.',
            showClose: true,
          })
        `},"info"),s("ea-button",{variant:"primary",plain:"",onclick:`
          window.$message({
            variant: 'primary',
            message: 'This is a primary message.',
            showClose: true,
          })
        `},"Primary"),s("ea-button",{variant:"success",plain:"",onclick:`
          window.$message({
            variant: 'success',
            message: 'Congrats, this is a success message.',
            showClose: true,
          })
        `},"Success"),s("ea-button",{variant:"warning",plain:"",onclick:`
          window.$message({
            variant: 'warning',
            message: 'Warning, this is a warning message.',
            showClose: true,
          })
        `},"Warning"),s("ea-button",{variant:"danger",plain:"",onclick:`
          window.$message({
            variant: 'danger',
            message: 'Oops, this is a danger message.',
            showClose: true,
          })
        `},"Danger"),s("ea-button",{plain:"",onclick:`
          window.$message({
            message: 'This is a info message.',
            showClose: true,
            duration: 0,
            icon: 'circle-info',
          })
        `},"Won't close automatically")],-1),t("",4),s("div",{class:"demo"},[s("ea-button",{plain:"",onclick:`
          window.$message({
            dangerouslyUseHTMLString: true,
            message: '<strong>This is <i>HTML</i> string</strong>',
          })
        `}," Use HTML string ")],-1),t("",2),s("div",{id:"placementSection",class:"demo row"},[s("ea-button",{plain:""}," Top "),s("ea-button",{plain:""}," Top Left "),s("ea-button",{plain:""}," Top Right "),s("ea-button",{plain:""}," Bottom "),s("ea-button",{plain:""}," Bottom Left "),s("ea-button",{plain:""}," Bottom Right ")],-1),t("",13)])]))}});export{w as __pageData,_ as default};
