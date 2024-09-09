const __vite__fileDeps=["assets/chunks/index.DFExCkCX.js","assets/chunks/Base.LSgLRpFA.js","assets/chunks/index.CgEiilRo.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{y as a,X as s,o as i,c as e,a3 as h}from"./chunks/framework.fcS_xQhl.js";const l=h(`<h1 id="pageheader-页头" tabindex="-1">PageHeader 页头 <a class="header-anchor" href="#pageheader-页头" aria-label="Permalink to &quot;PageHeader 页头&quot;">​</a></h1><p>如果页面的路径比较简单，推荐使用页头组件而非面包屑组件。</p><h2 id="引入" tabindex="-1">引入 <a class="header-anchor" href="#引入" aria-label="Permalink to &quot;引入&quot;">​</a></h2><blockquote><p><code>js</code></p></blockquote><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;module&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;./node_modules/easy-component-ui/components/ea-page-header/index.js&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><blockquote><p><code>css</code></p></blockquote><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>需要注意的是, 如果需要使用到带有图标的 <code>属性/组件</code>, 需要提前使用 <code>link</code> 标签引入图标文件</p></div><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">link</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  rel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;stylesheet&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  href</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./node_modules/easy-component-ui/components/ea-icon/index.css&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">/&gt;</span></span></code></pre></div><h2 id="自定义样式" tabindex="-1">自定义样式 <a class="header-anchor" href="#自定义样式" aria-label="Permalink to &quot;自定义样式&quot;">​</a></h2><p>移步到 <a href="#css-part">CSS Part</a>。</p><h2 id="基础" tabindex="-1">基础 <a class="header-anchor" href="#基础" aria-label="Permalink to &quot;基础&quot;">​</a></h2><div class="demo"><ea-page-header id="pageHeader" content="详情页面"></ea-page-header></div><details class="details custom-block"><summary>查看代码</summary><p><code>html</code></p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;demo&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-page-header</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;pageHeader&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> content</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;详情页面&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-page-header</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><p><code>js</code></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> pageHeader</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> document.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">querySelector</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;#pageHeader&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">pageHeader.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">addEventListener</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;back&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;go back&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div></details><h2 id="attributes" tabindex="-1">Attributes <a class="header-anchor" href="#attributes" aria-label="Permalink to &quot;Attributes&quot;">​</a></h2><table><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>可选值</th><th>默认值</th></tr></thead><tbody><tr><td>title</td><td>返回按钮文字</td><td>String</td><td>-</td><td>返回</td></tr><tr><td>content</td><td>页头内容</td><td>String</td><td>-</td><td>-</td></tr></tbody></table><h2 id="css-part" tabindex="-1">CSS Part <a class="header-anchor" href="#css-part" aria-label="Permalink to &quot;CSS Part&quot;">​</a></h2><blockquote><p>用法可参考 <a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part" target="_blank" rel="noreferrer">MDN ::part()伪类</a></p></blockquote><table><thead><tr><th>名称</th><th>说明</th></tr></thead><tbody><tr><td>container</td><td>外层容器</td></tr><tr><td>title-wrap</td><td>标题容器(<code>title</code>属性)</td></tr><tr><td>back-icon</td><td>返回图标</td></tr><tr><td>divider</td><td>分隔符</td></tr><tr><td>content-wrap</td><td>内容容器 (<code>content</code>属性)</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table><thead><tr><th>事件名</th><th>说明</th><th>回调参数</th></tr></thead><tbody><tr><td>back</td><td>点击返回</td><td>-</td></tr></tbody></table><h2 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h2><table><thead><tr><th>名称</th><th>说明</th></tr></thead><tbody><tr><td>title</td><td>返回按钮文字</td></tr><tr><td>content</td><td>内容</td></tr></tbody></table>`,22),n=[l],o=JSON.parse('{"title":"PageHeader 页头","description":"","frontmatter":{},"headers":[],"relativePath":"ea-page-header.md","filePath":"ea-page-header.md","lastUpdated":1725792033000}'),d={name:"ea-page-header.md"},E=Object.assign(d,{setup(p){return a(()=>{s(()=>import("./chunks/index.K6Dvbx-E.js"),[]),s(()=>import("./chunks/index.CgEiilRo.js"),[]),s(()=>import("./chunks/index.DP2rzg_V.js"),[]),s(()=>import("./chunks/index.DFExCkCX.js"),__vite__mapDeps([0,1,2])),document.querySelector("#pageHeader").addEventListener("back",()=>{console.log("go back")})}),(t,r)=>(i(),e("div",null,n))}});export{o as __pageData,E as default};
