const __vite__fileDeps=["assets/chunks/index.B26pZflA.js","assets/chunks/Base.LSgLRpFA.js","assets/chunks/index.CehXqn5E.js","assets/chunks/index.Vv5Ba7lM.js","assets/chunks/index.CgEiilRo.js","assets/chunks/index.DqAoVVMk.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{s as k,y as l,X as s,o as e,c as p,a3 as t,j as a}from"./chunks/framework.fcS_xQhl.js";const E=t("",16),d=a("div",{class:"row left"},[a("ea-switch",{id:"disabledSwitch","inactive-text":"启用","active-text":"禁用"}),a("ea-checkbox",{id:"disabledCheckbox",name:"salary",value:"月入3000笑哈哈"},"月入3000笑哈哈"),a("ea-checkbox",{name:"salary",value:"月薪过万不是梦",disabled:""}," 月薪过万不是梦 ")],-1),r=t("",25),o=[E,d,r],C=JSON.parse('{"title":"Checkbox 多选框","description":"","frontmatter":{},"headers":[],"relativePath":"ea-checkbox.md","filePath":"ea-checkbox.md","lastUpdated":1725653109000}'),c={name:"ea-checkbox.md"},B=Object.assign(c,{setup(g){return k(null),l(()=>{s(()=>import("./chunks/index.B26pZflA.js"),__vite__mapDeps([0,1])),s(()=>import("./chunks/index.CehXqn5E.js"),__vite__mapDeps([2,1])),s(()=>import("./chunks/index.Vv5Ba7lM.js"),__vite__mapDeps([3,1,4])),s(()=>import("./chunks/index.DqAoVVMk.js"),__vite__mapDeps([5,1])),s(()=>import("./chunks/index.K6Dvbx-E.js"),[]),{btn:document.querySelector("#basic"),init(){this.btn.addEventListener("change",i=>{console.log(i.detail)})}}.init(),{btn:document.querySelector("#disabledSwitch"),checkbox:document.querySelector("#disabledCheckbox"),init(){this.btn.addEventListener("change",i=>{this.checkbox.disabled=i.detail.checked})}}.init(),{btn:document.querySelector("#cityGroupBtn"),group:document.querySelector("#cityGroup"),init(){this.btn.addEventListener("click",()=>{console.log(this.group.value),alert(`[${this.group.value}]`)})}}.init(),{btn:document.querySelector("#setIndeterminate"),checkbox:document.querySelector("#checkAll"),init(){this.btn.addEventListener("click",i=>{this.checkbox.indeterminate=!0})}}.init(),{btn:document.querySelector("#day-group"),group:document.querySelector("#ea-checkbox-group"),init(){this.btn.addEventListener("click",()=>{alert(`[${this.group.value}]`)})}}.init()}),(h,n)=>(e(),p("div",null,o))}});export{C as __pageData,B as default};
