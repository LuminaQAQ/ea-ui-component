const __vite__fileDeps=["assets/chunks/index.DhjvHksS.js","assets/chunks/createElement.BM9xfELw.js","assets/chunks/Base.yCeCPjNm.js","assets/chunks/ea-button.B2M6Cckg.js","assets/chunks/index.CnrKAykF.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{y as l,a1 as a,o as k,c as p,a2 as i,j as s}from"./chunks/framework.DchfT4Lv.js";const e=i("",8),E=s("div",{class:"demo"},[s("p",null,[s("ea-button",{id:"basicObj_pre-btn"},"上一步"),s("ea-button",{id:"basicObj_next-btn"},"下一步")]),s("ea-steps",{id:"basicObj",active:"0"},[s("ea-step",{title:"步骤一",description:"这是步骤一的描述"}),s("ea-step",{title:"步骤二",description:"这是步骤二的描述"}),s("ea-step",{title:"步骤三",description:"这是步骤三的描述"}),s("ea-step",{title:"步骤四",description:"这是步骤四的描述"})])],-1),d=i("",5),r=s("div",{class:"demo"},[s("ea-steps",{active:"1"},[s("ea-step",{title:"已完成"}),s("ea-step",{title:"进行中"}),s("ea-step",{title:"步骤 3"})])],-1),g=i("",3),y=s("div",{class:"demo"},[s("ea-steps",{active:1},[s("ea-step",{title:"步骤 1",description:"这是一段很长很长很长的描述性文字"}),s("ea-step",{title:"步骤 2",description:"这是一段很长很长很长的描述性文字"}),s("ea-step",{title:"步骤 3",description:"这段就没那么长了"})])],-1),o=i("",3),c=s("div",{class:"demo"},[s("ea-steps",{active:"1"},[s("ea-step",{title:"步骤 1",icon:"icon-music"}),s("ea-step",{title:"步骤 2",icon:"icon-videocam"}),s("ea-step",{title:"步骤 3",icon:"icon-camera"})])],-1),F=i("",3),u=s("div",{class:"demo"},[s("ea-steps",{active:"1",space:"300px"},[s("ea-step",{title:"步骤 1",icon:"icon-music"}),s("ea-step",{title:"步骤 2",icon:"icon-videocam"}),s("ea-step",{title:"步骤 3",icon:"icon-camera"})])],-1),C=i("",3),q=s("div",{class:"demo"},[s("ea-steps",{active:"1",space:"300px"},[s("ea-step",{title:"步骤 1",icon:"icon-music"}),s("ea-step",{title:"步骤 2",icon:"icon-videocam"}),s("ea-step",{title:"步骤 3",icon:"icon-camera"})])],-1),_=i("",7),B=[e,E,d,r,g,y,o,c,F,u,C,q,_],v=JSON.parse('{"title":"Steps 步骤条","description":"","frontmatter":{},"headers":[],"relativePath":"ea-steps.md","filePath":"ea-steps.md","lastUpdated":1722585718000}'),b={name:"ea-steps.md"},D=Object.assign(b,{setup(m){return l(()=>{a(()=>import("./chunks/index.l0sNRNKZ.js"),[]),a(()=>import("./chunks/index.DhjvHksS.js"),__vite__mapDeps([0,1,2])),a(()=>import("./chunks/index.DP2rzg_V.js"),[]),a(()=>import("./chunks/ea-button.B2M6Cckg.js"),__vite__mapDeps([3,2])),a(()=>import("./chunks/index.CnrKAykF.js"),__vite__mapDeps([4,2,0,1])),{wrap:document.querySelector("#basicObj"),nextBtn:document.querySelector("#basicObj_next-btn"),prevBtn:document.querySelector("#basicObj_pre-btn"),stepChildren:document.querySelectorAll("#basicObj ea-step"),handleActiveChange(h){let t=this.wrap.active;if(h==="prev"){if(--t<0)return this.wrap.active=3;this.wrap.active=t}else{if(++t>this.stepChildren.length)return this.wrap.active=0;this.wrap.active=t}},init(){this.stepChildren,this.prevBtn.addEventListener("click",()=>{this.handleActiveChange("prev")}),this.nextBtn.addEventListener("click",()=>{this.handleActiveChange("next")})}}.init()}),(n,h)=>(k(),p("div",null,B))}});export{v as __pageData,D as default};
