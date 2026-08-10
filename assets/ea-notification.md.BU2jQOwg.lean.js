const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/chunks/index.BNcRXFS8.js","assets/chunks/ea-alert.DbvoaEqV.js","assets/chunks/bem.ts.BJYMUd3n.js","assets/chunks/timeout.ts.B2a-hmL-.js","assets/chunks/constants.DpU7Im1K.js","assets/chunks/ea-icon.DOPatN9O.js","assets/chunks/framework.P9QaFu-U.js","assets/chunks/ea-input.BN8cFgkT.js","assets/chunks/ea-dropdown.EVF8Kl7R.js","assets/chunks/ea-container.ik7HZmm-.js","assets/chunks/ea-message-box.HC35q_Ic.js","assets/chunks/ea-message.CKYk90ov.js","assets/chunks/ea-notification.MizFhSa5.js","assets/chunks/ea-tag.D4A_1IXp.js"])))=>i.map(i=>d[i]);
import{v as e,V as n,o as p,c as k,a2 as i,j as s}from"./chunks/framework.P9QaFu-U.js";import{c as l}from"./chunks/ea-notification.MizFhSa5.js";import"./chunks/bem.ts.BJYMUd3n.js";import"./chunks/constants.DpU7Im1K.js";import"./chunks/ea-icon.DOPatN9O.js";import"./chunks/timeout.ts.B2a-hmL-.js";const u=JSON.parse('{"title":"Notification 通知","description":"","frontmatter":{},"headers":[],"relativePath":"ea-notification.md","filePath":"ea-notification.md","lastUpdated":1780334652000}'),d={name:"ea-notification.md"},m=Object.assign(d,{setup(E){return e(()=>{n(()=>import("./chunks/index.BNcRXFS8.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13])),n(()=>Promise.resolve({}),[]),{moduleInstanceBtn:document.getElementById("moduleInstanceBtn"),init(){this.moduleInstanceBtn.addEventListener("click",()=>{l({heading:"Title",message:"This is a message that automatically close"})})}}.init(),{btns:document.querySelectorAll("#placementSection ea-button"),init(){this.btns.forEach(t=>{t.addEventListener("click",()=>{l({heading:"Custom Position",message:"This is a message",placement:t.textContent.trim().toLowerCase().replace(" ","-")})})})}}.init()}),(h,a)=>(p(),k("div",null,[...a[0]||(a[0]=[i("",8),s("div",{class:"demo row"},[s("ea-button",{plain:"",onclick:`
          window.$notify({
            heading: 'Title',
            message: 'This is a message that automatically close',
          })
        `}," Closes automatically "),s("ea-button",{plain:"",onclick:`
          window.$notify({
            heading: 'Prompt',
            message: 'This is a message that does not automatically close',
            duration: 0,
          })
        `}," Won't close automatically "),s("ea-button",{id:"moduleInstanceBtn",plain:""}," Module-Instance notify ")],-1),i("",3),s("div",{id:"typeSection",class:"demo row"},[s("ea-button",{plain:"",onclick:"window.$notify.info({ heading: 'Info', message: 'This is a info message.' })"},"Info"),s("ea-button",{variant:"primary",plain:"",onclick:"window.$notify.primary({ heading: 'Primary', message: 'This is a primary message.' })"},"Primary"),s("ea-button",{variant:"success",plain:"",onclick:"window.$notify.success({ heading: 'Success', message: 'Congrats, this is a success message.' })"},"Success"),s("ea-button",{variant:"warning",plain:"",onclick:"window.$notify.warning({ heading: 'Warning', message: 'Warning, this is a warning message.' })"},"Warning"),s("ea-button",{variant:"danger",plain:"",onclick:"window.$notify.error({ heading: 'Error', message: 'Oops, this is a error message.' })"},"Error")],-1),i("",3),s("div",{id:"placementSection",class:"demo row"},[s("ea-button",{plain:""}," Top Right "),s("ea-button",{plain:""}," Bottom Right "),s("ea-button",{plain:""}," Bottom Left "),s("ea-button",{plain:""}," Top Left ")],-1),i("",3),s("div",{class:"demo",id:"useHTMLSection"},[s("ea-button",{plain:"",onclick:`
          window.$notify({
            heading: 'HTML String',
            dangerouslyUseHTMLString: true,
            message: '<strong>This is <i>HTML</i> string</strong>',
          })
        `}," Use HTML string ")],-1),i("",3),s("div",{class:"demo"},[s("ea-button",{plain:"",onclick:`
          window.$notify({
            heading: 'Info',
            message: 'This is a message without close button',
            showClose: false,
          })
        `}," Hide close button ")],-1),i("",15)])]))}});export{u as __pageData,m as default};
