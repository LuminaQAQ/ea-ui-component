const __vite__fileDeps=["assets/chunks/index.yZ0eQwjd.js","assets/chunks/Base.LSgLRpFA.js","assets/chunks/index.CgEiilRo.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{y as l,X as h,o as n,c as k,a3 as i,j as s}from"./chunks/framework.fcS_xQhl.js";const e=i(`<h1 id="tag-标签" tabindex="-1">Tag 标签 <a class="header-anchor" href="#tag-标签" aria-label="Permalink to &quot;Tag 标签&quot;">​</a></h1><p>用于标记和选择。</p><h2 id="引入" tabindex="-1">引入 <a class="header-anchor" href="#引入" aria-label="Permalink to &quot;引入&quot;">​</a></h2><blockquote><p><code>js</code></p></blockquote><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> type</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;module&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  import &quot;./node_modules/easy-component-ui/components/ea-tag/index.js&quot;;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><blockquote><p><code>css</code></p></blockquote><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>需要注意的是, 如果需要使用到带有图标的 <code>属性/组件</code>, 需要提前使用 <code>link</code> 标签引入图标文件</p></div><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">link</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  rel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;stylesheet&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  href</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./node_modules/easy-component-ui/components/ea-icon/index.css&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">/&gt;</span></span></code></pre></div><h2 id="自定义样式" tabindex="-1">自定义样式 <a class="header-anchor" href="#自定义样式" aria-label="Permalink to &quot;自定义样式&quot;">​</a></h2><p>移步到 <a href="#css-part">CSS Part</a>。</p><h2 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h2><div class="row left"><ea-tag id="click">默认标签</ea-tag><ea-tag type="success">成功标签</ea-tag><ea-tag type="info">信息标签</ea-tag><ea-tag type="warning">警告标签</ea-tag><ea-tag type="danger">危险标签</ea-tag></div><details class="details custom-block"><summary>查看代码</summary><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;row left&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-tag</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;默认标签&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-tag</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-tag</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;success&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;成功标签&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-tag</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-tag</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;info&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;信息标签&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-tag</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-tag</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;warning&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;警告标签&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-tag</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-tag</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;danger&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;危险标签&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-tag</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><p><code>JS</code>: 点击事件</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">document.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">querySelector</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;#click&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">addEventListener</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;click&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">e</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;标签被点击&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, e.target);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div></details><h2 id="带关闭图标的标签" tabindex="-1">带关闭图标的标签 <a class="header-anchor" href="#带关闭图标的标签" aria-label="Permalink to &quot;带关闭图标的标签&quot;">​</a></h2>`,14),p=s("div",{class:"row left"},[s("ea-tag",{closable:""},"默认标签"),s("ea-tag",{type:"success",closable:""},"成功标签"),s("ea-tag",{type:"info",closable:""},"信息标签"),s("ea-tag",{type:"warning",closable:""},"警告标签"),s("ea-tag",{type:"danger",closable:""},"危险标签")],-1),E=i(`<details class="details custom-block"><summary>查看代码</summary><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;row left&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-tag</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> closable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;默认标签&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-tag</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-tag</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;success&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> closable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;成功标签&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-tag</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-tag</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;info&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> closable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;信息标签&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-tag</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-tag</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;warning&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> closable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;警告标签&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-tag</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-tag</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;danger&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> closable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;危险标签&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-tag</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div></details><h2 id="动态编辑标签" tabindex="-1">动态编辑标签 <a class="header-anchor" href="#动态编辑标签" aria-label="Permalink to &quot;动态编辑标签&quot;">​</a></h2><p>动态编辑标签可以通过点击标签关闭按钮后触发的 close 事件来实现</p>`,3),d=s("div",{class:"row left"},[s("ea-tag",{class:"dynamic-closable-tag",closable:""},"默认标签"),s("ea-tag",{class:"dynamic-closable-tag",type:"success",closable:""},"成功标签"),s("ea-tag",{class:"dynamic-closable-tag",type:"info",closable:""},"信息标签"),s("ea-tag",{class:"dynamic-closable-tag",type:"warning",closable:""},"警告标签"),s("ea-tag",{class:"dynamic-closable-tag",type:"danger",closable:""},"危险标签")],-1),g=i(`<details class="details custom-block"><summary>查看代码</summary><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;row left&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-tag</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;dynamic-closable-tag&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> closable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;默认标签&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-tag</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-tag</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;dynamic-closable-tag&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;success&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> closable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;成功标签&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-tag</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-tag</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;dynamic-closable-tag&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;info&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> closable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;信息标签&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-tag</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-tag</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;dynamic-closable-tag&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;warning&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> closable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;警告标签&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-tag</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-tag</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;dynamic-closable-tag&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;danger&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> closable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;危险标签&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-tag</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><p><code>JS</code>: <code>close</code> 事件</p><blockquote><p>为了适应可能出现的特殊场景, 所以并未在框架内部添加 <code>DOM</code> 移除事件</p></blockquote><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">document.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">querySelectorAll</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;.dynamic-closable-tag&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">forEach</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">item</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  item.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">addEventListener</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;close&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">e</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 移除该dom</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">remove</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // e.target: 当前标签; e.detail.value: 当前标签的 value 值</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;标签被移除&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, e.target, e.detail.value);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div></details><h2 id="不同主题" tabindex="-1">不同主题 <a class="header-anchor" href="#不同主题" aria-label="Permalink to &quot;不同主题&quot;">​</a></h2><p>Tag 组件提供了三个不同的主题：<code>dark</code>、<code>light</code> 和 <code>plain</code>。通过设置 <code>effect</code> 属性来改变主题, 默认主题为 <code>light</code></p><p><code>Dark 主题:</code></p>`,4),r=s("div",{class:"row left"},[s("ea-tag",{effect:"dark"},"dark: 默认标签"),s("ea-tag",{effect:"dark",type:"success"},"dark: 成功标签"),s("ea-tag",{effect:"dark",type:"info"},"dark: 信息标签"),s("ea-tag",{effect:"dark",type:"warning"},"dark: 警告标签"),s("ea-tag",{effect:"dark",type:"danger"},"dark: 危险标签")],-1),y=i(`<details class="details custom-block"><summary>查看代码</summary><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;row left&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-tag</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> effect</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;dark&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;dark: 默认标签&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-tag</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-tag</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> effect</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;dark&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;success&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;dark: 成功标签&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-tag</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-tag</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> effect</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;dark&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;info&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;dark: 信息标签&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-tag</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-tag</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> effect</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;dark&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;warning&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;dark: 警告标签&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-tag</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-tag</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> effect</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;dark&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;danger&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;dark: 危险标签&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-tag</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div></details><p><code>Plain 主题:</code></p>`,2),o=s("div",{class:"row left"},[s("ea-tag",{effect:"plain"},"plain: 默认标签"),s("ea-tag",{effect:"plain",type:"success"},"plain: 成功标签"),s("ea-tag",{effect:"plain",type:"info"},"plain: 信息标签"),s("ea-tag",{effect:"plain",type:"warning"},"plain: 警告标签"),s("ea-tag",{effect:"plain",type:"danger"},"plain: 危险标签")],-1),c=i(`<details class="details custom-block"><summary>查看代码</summary><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;row left&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-tag</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> effect</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;plain&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;plain: 默认标签&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-tag</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-tag</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> effect</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;plain&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;success&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;plain: 成功标签&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-tag</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-tag</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> effect</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;plain&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;info&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;plain: 信息标签&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-tag</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-tag</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> effect</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;plain&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;warning&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;plain: 警告标签&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-tag</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-tag</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> effect</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;plain&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;danger&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;plain: 危险标签&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-tag</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div></details><h2 id="attributes" tabindex="-1">Attributes <a class="header-anchor" href="#attributes" aria-label="Permalink to &quot;Attributes&quot;">​</a></h2><table><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>可选值</th><th>默认值</th></tr></thead><tbody><tr><td>type</td><td>主题类型</td><td>string</td><td>default/success/info/warning/danger</td><td>default</td></tr><tr><td>closable</td><td>是否可关闭</td><td>boolean</td><td>true/false</td><td>false</td></tr><tr><td>effect</td><td>主题效果</td><td>string</td><td>dark/light/plain</td><td>light</td></tr></tbody></table><h2 id="css-part" tabindex="-1">CSS Part <a class="header-anchor" href="#css-part" aria-label="Permalink to &quot;CSS Part&quot;">​</a></h2><blockquote><p>用法可参考 <a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part" target="_blank" rel="noreferrer">MDN ::part()伪类</a></p></blockquote><table><thead><tr><th>名称</th><th>说明</th></tr></thead><tbody><tr><td>container</td><td>外层容器</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table><thead><tr><th>事件名称</th><th>说明</th><th>回调参数</th></tr></thead><tbody><tr><td>close</td><td>关闭时触发的事件</td><td>event: (e.detail.value: 该标签的值)</td></tr><tr><td>click</td><td>点击时触发的事件</td><td>event</td></tr></tbody></table>`,8),F=[e,p,E,d,g,r,y,o,c],b=JSON.parse('{"title":"Tag 标签","description":"","frontmatter":{},"headers":[],"relativePath":"ea-tag.md","filePath":"ea-tag.md","lastUpdated":1720636605000}'),u={name:"ea-tag.md"},B=Object.assign(u,{setup(C){return l(()=>{h(()=>import("./chunks/index.yZ0eQwjd.js"),__vite__mapDeps([0,1,2])),h(()=>import("./chunks/index.K6Dvbx-E.js"),[]),document.querySelectorAll(".dynamic-closable-tag").forEach(a=>{a.addEventListener("close",function(t){this.remove(),console.log("标签被移除",t.target,t.detail.value)})}),document.querySelector("#click").addEventListener("click",function(a){console.log("标签被点击",a.target)})}),(a,t)=>(n(),k("div",null,F))}});export{b as __pageData,B as default};
