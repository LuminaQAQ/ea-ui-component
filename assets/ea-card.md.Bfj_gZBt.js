const __vite__fileDeps=["assets/chunks/index.DPjDzj_P.js","assets/chunks/ea-button.B2M6Cckg.js","assets/chunks/Base.yCeCPjNm.js","assets/chunks/index.Bo3IO5uk.js","assets/chunks/index.CahXI5qD.js","assets/chunks/index.o8RwEIcu.js","assets/chunks/index.atscLXDR.js","assets/chunks/index.BObYv0qB.js","assets/chunks/index.CpoGCwi-.js","assets/chunks/createElement.BM9xfELw.js","assets/chunks/index.DsxUdGK0.js","assets/chunks/index.CRmA-5R8.js","assets/chunks/index.BHOvWUqv.js","assets/chunks/index.Jx4vF3X5.js","assets/chunks/index.CnKGfFkJ.js","assets/chunks/index.CULlEqES.js","assets/chunks/timeout.ZZWNqneZ.js","assets/chunks/index.CRWUm4Jj.js","assets/chunks/index.FXfQvNC8.js","assets/chunks/index.BAuRzWpH.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{_ as E,y as b,X as h,o as d,c as e,j as a,F as n,E as l,a3 as i,t as k,p as v,l as r}from"./chunks/framework.Bjuc1Jix.js";const p=t=>(v("data-v-d788e88b"),t=t(),r(),t),g=i(`<h1 id="card-卡片" tabindex="-1" data-v-d788e88b>Card 卡片 <a class="header-anchor" href="#card-卡片" aria-label="Permalink to &quot;Card 卡片&quot;" data-v-d788e88b>​</a></h1><p data-v-d788e88b>将信息聚合在卡片容器中展示。</p><h2 id="引入" tabindex="-1" data-v-d788e88b>引入 <a class="header-anchor" href="#引入" aria-label="Permalink to &quot;引入&quot;" data-v-d788e88b>​</a></h2><blockquote data-v-d788e88b><p data-v-d788e88b><code data-v-d788e88b>js</code></p></blockquote><div class="language-html vp-adaptive-theme" data-v-d788e88b><button title="Copy Code" class="copy" data-v-d788e88b></button><span class="lang" data-v-d788e88b>html</span><pre class="shiki shiki-themes github-light github-dark vp-code" data-v-d788e88b><code data-v-d788e88b><span class="line" data-v-d788e88b><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>script</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;" data-v-d788e88b> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;" data-v-d788e88b>&quot;module&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&gt;</span></span>
<span class="line" data-v-d788e88b><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;" data-v-d788e88b>  import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;" data-v-d788e88b> &quot;./node_modules/easy-component-ui/components/ea-card/index.js&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>;</span></span>
<span class="line" data-v-d788e88b><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&gt;</span></span></code></pre></div><blockquote data-v-d788e88b><p data-v-d788e88b><code data-v-d788e88b>css</code></p></blockquote><div class="tip custom-block" data-v-d788e88b><p class="custom-block-title" data-v-d788e88b>TIP</p><p data-v-d788e88b>需要注意的是, 如果需要使用到带有图标的 <code data-v-d788e88b>属性/组件</code>, 需要提前使用 <code data-v-d788e88b>link</code> 标签引入图标文件</p></div><div class="language-html vp-adaptive-theme" data-v-d788e88b><button title="Copy Code" class="copy" data-v-d788e88b></button><span class="lang" data-v-d788e88b>html</span><pre class="shiki shiki-themes github-light github-dark vp-code" data-v-d788e88b><code data-v-d788e88b><span class="line" data-v-d788e88b><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>link</span></span>
<span class="line" data-v-d788e88b><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;" data-v-d788e88b>  rel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;" data-v-d788e88b>&quot;stylesheet&quot;</span></span>
<span class="line" data-v-d788e88b><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;" data-v-d788e88b>  href</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;" data-v-d788e88b>&quot;./node_modules/easy-component-ui/components/ea-icon/index.css&quot;</span></span>
<span class="line" data-v-d788e88b><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>/&gt;</span></span></code></pre></div><h2 id="自定义样式" tabindex="-1" data-v-d788e88b>自定义样式 <a class="header-anchor" href="#自定义样式" aria-label="Permalink to &quot;自定义样式&quot;" data-v-d788e88b>​</a></h2><p data-v-d788e88b>移步到 <a href="#css-part" data-v-d788e88b>CSS Part</a>。</p><h2 id="基础用法" tabindex="-1" data-v-d788e88b>基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;" data-v-d788e88b>​</a></h2><p data-v-d788e88b>包含标题，内容和操作。</p><blockquote data-v-d788e88b><p data-v-d788e88b>Card 组件包括 <code data-v-d788e88b>header</code> 和 <code data-v-d788e88b>body</code> 部分， <code data-v-d788e88b>header</code> 部分需要有显式具名 slot 分发，同时也是可选的。</p></blockquote>`,13),o={class:"demo"},c={class:"ea-card-demo"},y=p(()=>a("div",{slot:"header",class:"header"},[a("span",null,"卡片标题"),a("ea-button",{type:"text",size:"small"},"操作按钮")],-1)),F=i(`<details class="details custom-block" data-v-d788e88b><summary data-v-d788e88b>查看代码</summary><p data-v-d788e88b><code data-v-d788e88b>css</code></p><div class="language-css vp-adaptive-theme" data-v-d788e88b><button title="Copy Code" class="copy" data-v-d788e88b></button><span class="lang" data-v-d788e88b>css</span><pre class="shiki shiki-themes github-light github-dark vp-code" data-v-d788e88b><code data-v-d788e88b><span class="line" data-v-d788e88b><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;" data-v-d788e88b>.header</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b> {</span></span>
<span class="line" data-v-d788e88b><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;" data-v-d788e88b>  display</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;" data-v-d788e88b>flex</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>;</span></span>
<span class="line" data-v-d788e88b><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;" data-v-d788e88b>  align-items</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;" data-v-d788e88b>center</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>;</span></span>
<span class="line" data-v-d788e88b><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;" data-v-d788e88b>  justify-content</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;" data-v-d788e88b>space-between</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>;</span></span>
<span class="line" data-v-d788e88b><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;" data-v-d788e88b>  padding</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;" data-v-d788e88b>18</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;" data-v-d788e88b>px</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;" data-v-d788e88b> 20</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;" data-v-d788e88b>px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>;</span></span>
<span class="line" data-v-d788e88b><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;" data-v-d788e88b>  border-bottom</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;" data-v-d788e88b>1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;" data-v-d788e88b>px</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;" data-v-d788e88b> solid</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;" data-v-d788e88b> #ebeef5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>;</span></span>
<span class="line" data-v-d788e88b><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;" data-v-d788e88b>  box-sizing</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;" data-v-d788e88b>border-box</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>;</span></span>
<span class="line" data-v-d788e88b><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>}</span></span>
<span class="line" data-v-d788e88b></span>
<span class="line" data-v-d788e88b><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;" data-v-d788e88b>.ea-card-demo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b> {</span></span>
<span class="line" data-v-d788e88b><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;" data-v-d788e88b>  width</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;" data-v-d788e88b>400</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;" data-v-d788e88b>px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>;</span></span>
<span class="line" data-v-d788e88b><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>}</span></span></code></pre></div><p data-v-d788e88b><code data-v-d788e88b>html</code></p><div class="language-html vp-adaptive-theme" data-v-d788e88b><button title="Copy Code" class="copy" data-v-d788e88b></button><span class="lang" data-v-d788e88b>html</span><pre class="shiki shiki-themes github-light github-dark vp-code" data-v-d788e88b><code data-v-d788e88b><span class="line" data-v-d788e88b><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>script</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;" data-v-d788e88b> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;" data-v-d788e88b>&quot;module&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&gt;</span></span>
<span class="line" data-v-d788e88b><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;" data-v-d788e88b>  import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;" data-v-d788e88b> &quot;./node_modules/easy-component-ui/components/ea-card/index.js&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>;</span></span>
<span class="line" data-v-d788e88b><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&gt;</span></span>
<span class="line" data-v-d788e88b></span>
<span class="line" data-v-d788e88b><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;" data-v-d788e88b> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;" data-v-d788e88b>&quot;ea-card-demo&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&gt;</span></span>
<span class="line" data-v-d788e88b><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>ea-card</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&gt;</span></span>
<span class="line" data-v-d788e88b><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;" data-v-d788e88b> slot</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;" data-v-d788e88b>&quot;header&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;" data-v-d788e88b> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;" data-v-d788e88b>&quot;header&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&gt;</span></span>
<span class="line" data-v-d788e88b><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>      &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>span</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&gt;卡片标题&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>span</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&gt;</span></span>
<span class="line" data-v-d788e88b><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>      &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>ea-button</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;" data-v-d788e88b> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;" data-v-d788e88b>&quot;text&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;" data-v-d788e88b> size</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;" data-v-d788e88b>&quot;small&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&gt;操作按钮&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>ea-button</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&gt;</span></span>
<span class="line" data-v-d788e88b><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>    &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&gt;</span></span>
<span class="line" data-v-d788e88b><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>p</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;" data-v-d788e88b> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;" data-v-d788e88b>&quot;ea-card-content&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&gt;content1&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>p</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&gt;</span></span>
<span class="line" data-v-d788e88b><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>p</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;" data-v-d788e88b> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;" data-v-d788e88b>&quot;ea-card-content&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&gt;content2&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>p</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&gt;</span></span>
<span class="line" data-v-d788e88b><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>p</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;" data-v-d788e88b> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;" data-v-d788e88b>&quot;ea-card-content&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&gt;content3&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>p</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&gt;</span></span>
<span class="line" data-v-d788e88b><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>p</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;" data-v-d788e88b> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;" data-v-d788e88b>&quot;ea-card-content&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&gt;content4&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>p</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&gt;</span></span>
<span class="line" data-v-d788e88b><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>  &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>ea-card</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&gt;</span></span>
<span class="line" data-v-d788e88b><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&gt;</span></span></code></pre></div></details><h2 id="简单卡片" tabindex="-1" data-v-d788e88b>简单卡片 <a class="header-anchor" href="#简单卡片" aria-label="Permalink to &quot;简单卡片&quot;" data-v-d788e88b>​</a></h2><p data-v-d788e88b>卡片可以只有内容区域。</p>`,3),u={class:"demo"},C=i(`<details class="details custom-block" data-v-d788e88b><summary data-v-d788e88b>查看代码</summary><div class="language-html vp-adaptive-theme" data-v-d788e88b><button title="Copy Code" class="copy" data-v-d788e88b></button><span class="lang" data-v-d788e88b>html</span><pre class="shiki shiki-themes github-light github-dark vp-code" data-v-d788e88b><code data-v-d788e88b><span class="line" data-v-d788e88b><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>ea-card</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&gt;</span></span>
<span class="line" data-v-d788e88b><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>p</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;" data-v-d788e88b> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;" data-v-d788e88b>&quot;ea-card-content&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&gt;content1&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>p</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&gt;</span></span>
<span class="line" data-v-d788e88b><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>p</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;" data-v-d788e88b> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;" data-v-d788e88b>&quot;ea-card-content&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&gt;content2&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>p</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&gt;</span></span>
<span class="line" data-v-d788e88b><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>p</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;" data-v-d788e88b> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;" data-v-d788e88b>&quot;ea-card-content&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&gt;content3&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>p</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&gt;</span></span>
<span class="line" data-v-d788e88b><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>p</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;" data-v-d788e88b> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;" data-v-d788e88b>&quot;ea-card-content&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&gt;content4&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>p</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&gt;</span></span>
<span class="line" data-v-d788e88b><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>ea-card</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&gt;</span></span></code></pre></div></details><h2 id="带图片" tabindex="-1" data-v-d788e88b>带图片 <a class="header-anchor" href="#带图片" aria-label="Permalink to &quot;带图片&quot;" data-v-d788e88b>​</a></h2><p data-v-d788e88b>可配置定义更丰富的内容展示。</p><div class="demo" data-v-d788e88b><div class="ea-card-demo" data-v-d788e88b><ea-card data-v-d788e88b><div class="image" data-v-d788e88b><img src="https://picture.gptkong.com/20240627/15559913d5b477444baca33968cbb88b44.jpeg" data-v-d788e88b></div><div class="header" style="padding:14px;" data-v-d788e88b><span data-v-d788e88b>不再流浪</span><ea-button type="text" class="button" data-v-d788e88b>操作按钮</ea-button></div></ea-card></div></div><details class="details custom-block" data-v-d788e88b><summary data-v-d788e88b>查看代码</summary><div class="language-html vp-adaptive-theme" data-v-d788e88b><button title="Copy Code" class="copy" data-v-d788e88b></button><span class="lang" data-v-d788e88b>html</span><pre class="shiki shiki-themes github-light github-dark vp-code" data-v-d788e88b><code data-v-d788e88b><span class="line" data-v-d788e88b><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;" data-v-d788e88b> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;" data-v-d788e88b>&quot;demo&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&gt;</span></span>
<span class="line" data-v-d788e88b><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>ea-card</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&gt;</span></span>
<span class="line" data-v-d788e88b><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;" data-v-d788e88b> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;" data-v-d788e88b>&quot;image&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&gt;</span></span>
<span class="line" data-v-d788e88b><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>      &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>img</span></span>
<span class="line" data-v-d788e88b><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;" data-v-d788e88b>        src</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;" data-v-d788e88b>&quot;https://picture.gptkong.com/20240627/15559913d5b477444baca33968cbb88b44.jpeg&quot;</span></span>
<span class="line" data-v-d788e88b><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>      /&gt;</span></span>
<span class="line" data-v-d788e88b><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>    &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&gt;</span></span>
<span class="line" data-v-d788e88b><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;" data-v-d788e88b> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;" data-v-d788e88b>&quot;header&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;" data-v-d788e88b> style</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;" data-v-d788e88b>&quot;padding: 14px;&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&gt;</span></span>
<span class="line" data-v-d788e88b><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>      &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>span</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&gt;地狱笑话&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>span</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&gt;</span></span>
<span class="line" data-v-d788e88b><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>      &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>ea-button</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;" data-v-d788e88b> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;" data-v-d788e88b>&quot;text&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;" data-v-d788e88b> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;" data-v-d788e88b>&quot;button&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&gt;操作按钮&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>ea-button</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&gt;</span></span>
<span class="line" data-v-d788e88b><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>    &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&gt;</span></span>
<span class="line" data-v-d788e88b><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>  &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>ea-card</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&gt;</span></span>
<span class="line" data-v-d788e88b><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&gt;</span></span></code></pre></div></details><h2 id="卡片阴影" tabindex="-1" data-v-d788e88b>卡片阴影 <a class="header-anchor" href="#卡片阴影" aria-label="Permalink to &quot;卡片阴影&quot;" data-v-d788e88b>​</a></h2><p data-v-d788e88b>通过设置 <code data-v-d788e88b>shadow</code> 属性可对阴影的显示进行配置。</p>`,7),m=p(()=>a("div",{class:"demo"},[a("ea-card",{shadow:"always"},"总是显示"),a("ea-card",{shadow:"hover"},"鼠标移入显示"),a("ea-card",{shadow:"never"},"从不显示")],-1)),_=i(`<details class="details custom-block" data-v-d788e88b><summary data-v-d788e88b>查看代码</summary><div class="language-html vp-adaptive-theme" data-v-d788e88b><button title="Copy Code" class="copy" data-v-d788e88b></button><span class="lang" data-v-d788e88b>html</span><pre class="shiki shiki-themes github-light github-dark vp-code" data-v-d788e88b><code data-v-d788e88b><span class="line" data-v-d788e88b><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;" data-v-d788e88b> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;" data-v-d788e88b>&quot;demo&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&gt;</span></span>
<span class="line" data-v-d788e88b><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>ea-card</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;" data-v-d788e88b> shadow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;" data-v-d788e88b>&quot;always&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&gt;总是显示&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>ea-card</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&gt;</span></span>
<span class="line" data-v-d788e88b><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>ea-card</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;" data-v-d788e88b> shadow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;" data-v-d788e88b>&quot;hover&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&gt;鼠标移入显示&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>ea-card</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&gt;</span></span>
<span class="line" data-v-d788e88b><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>ea-card</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;" data-v-d788e88b> shadow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;" data-v-d788e88b>&quot;never&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&gt;从不显示&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>ea-card</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&gt;</span></span>
<span class="line" data-v-d788e88b><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;" data-v-d788e88b>div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-d788e88b>&gt;</span></span></code></pre></div></details><h2 id="attributes" tabindex="-1" data-v-d788e88b>Attributes <a class="header-anchor" href="#attributes" aria-label="Permalink to &quot;Attributes&quot;" data-v-d788e88b>​</a></h2><table data-v-d788e88b><thead data-v-d788e88b><tr data-v-d788e88b><th data-v-d788e88b>参数</th><th data-v-d788e88b>说明</th><th data-v-d788e88b>类型</th><th data-v-d788e88b>可选值</th><th data-v-d788e88b>默认值</th></tr></thead><tbody data-v-d788e88b><tr data-v-d788e88b><td data-v-d788e88b>header</td><td data-v-d788e88b>卡片标题</td><td data-v-d788e88b>string</td><td data-v-d788e88b>—</td><td data-v-d788e88b>—</td></tr><tr data-v-d788e88b><td data-v-d788e88b>shadow</td><td data-v-d788e88b>卡片阴影</td><td data-v-d788e88b>string</td><td data-v-d788e88b>always / hover / never</td><td data-v-d788e88b>always</td></tr></tbody></table><h2 id="css-part" tabindex="-1" data-v-d788e88b>CSS Part <a class="header-anchor" href="#css-part" aria-label="Permalink to &quot;CSS Part&quot;" data-v-d788e88b>​</a></h2><blockquote data-v-d788e88b><p data-v-d788e88b>用法可参考 <a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part" target="_blank" rel="noreferrer" data-v-d788e88b>MDN ::part()伪类</a></p></blockquote><table data-v-d788e88b><thead data-v-d788e88b><tr data-v-d788e88b><th data-v-d788e88b>名称</th><th data-v-d788e88b>说明</th></tr></thead><tbody data-v-d788e88b><tr data-v-d788e88b><td data-v-d788e88b>container</td><td data-v-d788e88b>card 容器</td></tr><tr data-v-d788e88b><td data-v-d788e88b>header-wrap</td><td data-v-d788e88b>头部容器</td></tr><tr data-v-d788e88b><td data-v-d788e88b>content-wrap</td><td data-v-d788e88b>内容容器</td></tr></tbody></table><h2 id="slot" tabindex="-1" data-v-d788e88b>Slot <a class="header-anchor" href="#slot" aria-label="Permalink to &quot;Slot&quot;" data-v-d788e88b>​</a></h2><table data-v-d788e88b><thead data-v-d788e88b><tr data-v-d788e88b><th data-v-d788e88b>name</th><th data-v-d788e88b>说明</th></tr></thead><tbody data-v-d788e88b><tr data-v-d788e88b><td data-v-d788e88b>—</td><td data-v-d788e88b>卡片内容</td></tr><tr data-v-d788e88b><td data-v-d788e88b>header</td><td data-v-d788e88b>卡片标题</td></tr></tbody></table>`,8),x=JSON.parse('{"title":"Card 卡片","description":"","frontmatter":{},"headers":[],"relativePath":"ea-card.md","filePath":"ea-card.md","lastUpdated":1725443897000}'),q={name:"ea-card.md"},B=Object.assign(q,{setup(t){return b(()=>{h(()=>import("./chunks/index.DPjDzj_P.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19])),h(()=>import("./chunks/index.DP2rzg_V.js"),[])}),(A,D)=>(d(),e("div",null,[g,a("div",o,[a("div",c,[a("ea-card",null,[y,(d(),e(n,null,l(4,s=>a("p",{class:"ea-card-content",key:s}," content"+k(s),1)),64))])])]),F,a("div",u,[a("ea-card",null,[(d(),e(n,null,l(4,s=>a("p",{class:"ea-card-content",key:s}," content"+k(s),1)),64))])]),C,m,_]))}}),P=E(B,[["__scopeId","data-v-d788e88b"]]);export{x as __pageData,P as default};
