const __vite__fileDeps=["assets/chunks/index.atscLXDR.js","assets/chunks/Base.yCeCPjNm.js","assets/chunks/index.o8RwEIcu.js","assets/chunks/ea-button.B2M6Cckg.js","assets/chunks/index.CRmA-5R8.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{s as k,y as l,X as s,o as e,c as p,a3 as t,j as a}from"./chunks/framework.Bjuc1Jix.js";const E=t("",16),d=a("div",{class:"row left"},[a("ea-switch",{id:"disabledSwitch","inactive-text":"启用","active-text":"禁用"}),a("ea-checkbox",{id:"disabledCheckbox",name:"salary",value:"月入3000笑哈哈"},"月入3000笑哈哈"),a("ea-checkbox",{name:"salary",value:"月薪过万不是梦",disabled:""}," 月薪过万不是梦 ")],-1),r=t("",25),o=[E,d,r],C=JSON.parse('{"title":"Checkbox 多选框","description":"","frontmatter":{},"headers":[],"relativePath":"ea-checkbox.md","filePath":"ea-checkbox.md","lastUpdated":1725517090000}'),c={name:"ea-checkbox.md"},B=Object.assign(c,{setup(g){return k(null),l(()=>{s(()=>import("./chunks/index.atscLXDR.js"),__vite__mapDeps([0,1])),s(()=>import("./chunks/index.o8RwEIcu.js"),__vite__mapDeps([2,1])),s(()=>import("./chunks/ea-button.B2M6Cckg.js"),__vite__mapDeps([3,1])),s(()=>import("./chunks/index.CRmA-5R8.js"),__vite__mapDeps([4,1])),s(()=>import("./chunks/index.DP2rzg_V.js"),[]),{btn:document.querySelector("#basic"),init(){this.btn.addEventListener("change",i=>{console.log(i.detail)})}}.init(),{btn:document.querySelector("#disabledSwitch"),checkbox:document.querySelector("#disabledCheckbox"),init(){this.btn.addEventListener("change",i=>{this.checkbox.disabled=i.detail.checked})}}.init(),{btn:document.querySelector("#cityGroupBtn"),group:document.querySelector("#cityGroup"),init(){this.btn.addEventListener("click",()=>{alert(`[${this.group.value}]`)})}}.init(),{btn:document.querySelector("#setIndeterminate"),checkbox:document.querySelector("#checkAll"),init(){this.btn.addEventListener("click",i=>{this.checkbox.indeterminate=!0})}}.init(),{btn:document.querySelector("#day-group"),group:document.querySelector("#ea-checkbox-group"),init(){this.btn.addEventListener("click",()=>{alert(`[${this.group.value}]`)})}}.init()}),(h,n)=>(e(),p("div",null,o))}});export{C as __pageData,B as default};
