const __vite__fileDeps=["assets/chunks/index.Vv5Ba7lM.js","assets/chunks/Base.LSgLRpFA.js","assets/chunks/index.CgEiilRo.js","assets/chunks/index.D6SVBbJV.js","assets/chunks/index.DnjVF_lg.js","assets/chunks/index.BSyUhE6H.js","assets/chunks/index.yZ0eQwjd.js","assets/chunks/index.Doi53DyJ.js","assets/chunks/timeout.CMJ_lqqj.js","assets/chunks/handleDefaultAttrIsTrue.C-TnTdkH.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{y as l,X as i,o as e,c as h,a3 as t,j as s}from"./chunks/framework.fcS_xQhl.js";const k=t("",12),p=s("div",{class:"demo"},[s("ea-button-group",null,[s("ea-button",{type:"primary",id:"openDrawerBtn--ltr"},"从左往右开"),s("ea-button",{type:"primary",id:"openDrawerBtn--rtl"},"从右往左开"),s("ea-button",{type:"primary",id:"openDrawerBtn--ttb"},"从上往下开"),s("ea-button",{type:"primary",id:"openDrawerBtn--btt"},"从下往上开")]),s("ea-drawer",{id:"drawer",title:"我是标题",direction:"ltr"},[s("span",null,"我是内容")])],-1),E=t("",3),r=s("div",{class:"demo"},[s("ea-button",{type:"primary",id:"openCustomDrawerBtn"},"打开自定义内容的抽屉"),s("ea-drawer",{id:"customDrawer",title:"我是标题",direction:"ltr"},[s("ea-descriptions",{direction:"vertical",border:""},[s("ea-descriptions-item",{label:"用户名"}," Lilyiro "),s("ea-descriptions-item",{label:"身高"}," 165cm "),s("ea-descriptions-item",{label:"年龄"}," 17岁 "),s("ea-descriptions-item",{label:"称号"},[s("ea-tag",null,"宿命背反")]),s("ea-descriptions-item",{label:"属性",span:"1"},[s("ea-tag",{type:"warning",style:{"margin-right":"1rem"}},"雷电"),s("ea-tag",{type:"info"},"物理")])])])],-1),d=t("",10),g=[k,p,E,r,d],F=JSON.parse('{"title":"Drawer 抽屉","description":"","frontmatter":{},"headers":[],"relativePath":"ea-drawer.md","filePath":"ea-drawer.md","lastUpdated":1725653109000}'),o={name:"ea-drawer.md"},u=Object.assign(o,{setup(y){return l(()=>{i(()=>import("./chunks/index.DP2rzg_V.js"),[]),i(()=>import("./chunks/index.CgEiilRo.js"),[]),i(()=>import("./chunks/index.K6Dvbx-E.js"),[]),i(()=>import("./chunks/index.Vv5Ba7lM.js"),__vite__mapDeps([0,1,2])),i(()=>import("./chunks/index.D6SVBbJV.js"),__vite__mapDeps([3,1])),i(()=>import("./chunks/index.DnjVF_lg.js"),__vite__mapDeps([4,1,2,5])),i(()=>import("./chunks/index.BSyUhE6H.js"),__vite__mapDeps([5,1])),i(()=>import("./chunks/index.yZ0eQwjd.js"),__vite__mapDeps([6,1,2])),i(()=>import("./chunks/index.Doi53DyJ.js"),__vite__mapDeps([7,1,2,8,9])),{drawer:document.querySelector("#drawer"),ltrBtn:document.querySelector("#openDrawerBtn--ltr"),rtlBtn:document.querySelector("#openDrawerBtn--rtl"),ttbBtn:document.querySelector("#openDrawerBtn--ttb"),bttBtn:document.querySelector("#openDrawerBtn--btt"),init(){this.ltrBtn.addEventListener("click",()=>{this.drawer.direction="ltr",this.drawer.open=!0}),this.rtlBtn.addEventListener("click",()=>{this.drawer.direction="rtl",this.drawer.open=!0}),this.ttbBtn.addEventListener("click",()=>{this.drawer.direction="ttb",this.drawer.open=!0}),this.bttBtn.addEventListener("click",()=>{this.drawer.direction="btt",this.drawer.open=!0}),this.drawer.addEventListener("close",()=>{console.log("close")})}}.init(),{drawer:document.querySelector("#customDrawer"),openBtn:document.querySelector("#openCustomDrawerBtn"),init(){this.openBtn.addEventListener("click",()=>{this.drawer.open=!0}),this.drawer.addEventListener("close",()=>{console.log("close")})}}.init()}),(a,n)=>(e(),h("div",null,g))}});export{F as __pageData,u as default};
