const __vite__fileDeps=["assets/chunks/index.D75PGd2-.js","assets/chunks/Base.yCeCPjNm.js","assets/chunks/index.CpoGCwi-.js","assets/chunks/createElement.BM9xfELw.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{y as t,X as a,o as e,c as h,a3 as i,j as s}from"./chunks/framework.Bjuc1Jix.js";const l=i(`<h1 id="breadcrumb-面包屑" tabindex="-1">Breadcrumb 面包屑 <a class="header-anchor" href="#breadcrumb-面包屑" aria-label="Permalink to &quot;Breadcrumb 面包屑&quot;">​</a></h1><p>显示当前页面的路径，快速返回之前的任意页面。</p><h2 id="引入" tabindex="-1">引入 <a class="header-anchor" href="#引入" aria-label="Permalink to &quot;引入&quot;">​</a></h2><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;module&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;./node_modules/easy-component-ui/components/ea-breadcrumb/index.js&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><blockquote><p><code>css</code></p></blockquote><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>需要注意的是, 如果需要使用到带有图标的 <code>属性/组件</code>, 需要提前使用 <code>link</code> 标签引入图标文件</p></div><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">link</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  rel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;stylesheet&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  href</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./node_modules/easy-component-ui/components/ea-icon/index.css&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">/&gt;</span></span></code></pre></div><h2 id="自定义样式" tabindex="-1">自定义样式 <a class="header-anchor" href="#自定义样式" aria-label="Permalink to &quot;自定义样式&quot;">​</a></h2><p>移步到 <a href="#breadcrumb-css-part">CSS Part</a>。</p><h2 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h2><p>适用广泛的基础用法。</p><blockquote><p>在 <code>ea-breadcrumb</code> 中使用 <code>ea-breadcrumb-item</code> 标签表示从首页开始的每一级。<code>ea-breadcrumb</code> 提供了一个 separator 属性，在 <code>ea-breadcrumb</code> 标签中设置它来决定分隔符，它只能是字符串，默认为斜杠 <code>/</code>。</p></blockquote>`,12),n=s("div",{class:"demo"},[s("ea-breadcrumb",{separator:"/","separator-color":"#c0c4cc"},[s("ea-breadcrumb-item",null,[s("a",{href:"javascript:;"},"首页")]),s("ea-breadcrumb-item",null,[s("a",{href:"javascript:;"},"一级")]),s("ea-breadcrumb-item",null,"二级"),s("ea-breadcrumb-item",null,"三级")])],-1),k=i(`<details class="details custom-block"><summary>查看代码</summary><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;demo&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-breadcrumb</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> separator</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> separator-color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;#c0c4cc&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-breadcrumb-item</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">a</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> href</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;javascript:;&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;首页&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-breadcrumb-item</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-breadcrumb-item</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">a</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> href</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;javascript:;&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;一级&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-breadcrumb-item</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-breadcrumb-item</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;二级&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-breadcrumb-item</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-breadcrumb-item</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;三级&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-breadcrumb-item</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-breadcrumb</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div></details><h2 id="图标分隔符" tabindex="-1">图标分隔符 <a class="header-anchor" href="#图标分隔符" aria-label="Permalink to &quot;图标分隔符&quot;">​</a></h2><blockquote><p>通过设置 <code>separator-class</code> 可使用相应的 <code>iconfont</code> 作为分隔符，注意这将使 <code>separator</code> 设置失效. 可设置 <code>separator-color</code> 来设置分隔符颜色.</p></blockquote>`,3),p=s("div",{class:"demo"},[s("ea-breadcrumb",{"separator-class":"icon-angle-right","separator-color":"#c0c4cc"},[s("ea-breadcrumb-item",null,[s("a",{href:"javascript:;"},"首页")]),s("ea-breadcrumb-item",null,"一级"),s("ea-breadcrumb-item",null,"二级"),s("ea-breadcrumb-item",null,"三级")])],-1),r=i(`<details class="details custom-block"><summary>查看代码</summary><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;demo&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-breadcrumb</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> separator-class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;icon-angle-right&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> separator-color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;#c0c4cc&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-breadcrumb-item</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">a</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> href</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;javascript:;&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;首页&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-breadcrumb-item</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-breadcrumb-item</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;一级&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-breadcrumb-item</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-breadcrumb-item</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;二级&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-breadcrumb-item</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-breadcrumb-item</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;三级&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-breadcrumb-item</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ea-breadcrumb</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div></details><h2 id="breadcrumb-attributes" tabindex="-1">Breadcrumb Attributes <a class="header-anchor" href="#breadcrumb-attributes" aria-label="Permalink to &quot;Breadcrumb Attributes&quot;">​</a></h2><table><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>可选值</th><th>默认值</th></tr></thead><tbody><tr><td>separator</td><td>分隔符</td><td>string</td><td>-</td><td><code>/</code></td></tr><tr><td>separator-class</td><td>分隔符的类名</td><td>string</td><td>-</td><td>-</td></tr><tr><td>separator-color</td><td>分隔符颜色</td><td>string</td><td>-</td><td><code>#c0c4cc</code></td></tr></tbody></table><h2 id="breadcrumb-css-part" tabindex="-1">Breadcrumb CSS Part <a class="header-anchor" href="#breadcrumb-css-part" aria-label="Permalink to &quot;Breadcrumb CSS Part&quot;">​</a></h2><blockquote><p>用法可参考 <a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part" target="_blank" rel="noreferrer">MDN ::part()伪类</a></p></blockquote><table><thead><tr><th>名称</th><th>说明</th></tr></thead><tbody><tr><td>container</td><td>容器</td></tr></tbody></table><h2 id="breadcrumbitem-css-part" tabindex="-1">BreadcrumbItem CSS Part <a class="header-anchor" href="#breadcrumbitem-css-part" aria-label="Permalink to &quot;BreadcrumbItem CSS Part&quot;">​</a></h2><table><thead><tr><th>名称</th><th>说明</th></tr></thead><tbody><tr><td>container</td><td>容器</td></tr></tbody></table>`,8),d=[l,n,k,p,r],u=JSON.parse('{"title":"Breadcrumb 面包屑","description":"","frontmatter":{},"headers":[],"relativePath":"ea-breadcrumb.md","filePath":"ea-breadcrumb.md","lastUpdated":1725438484000}'),E={name:"ea-breadcrumb.md"},y=Object.assign(E,{setup(c){return t(()=>{a(()=>import("./chunks/index.DP2rzg_V.js"),[]),a(()=>import("./chunks/index.D75PGd2-.js"),__vite__mapDeps([0,1,2,3]))}),(o,g)=>(e(),h("div",null,d))}});export{u as __pageData,y as default};
