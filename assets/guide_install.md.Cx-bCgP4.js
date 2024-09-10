import{_ as s,o as a,c as n,a3 as i}from"./chunks/framework.fcS_xQhl.js";const g=JSON.parse('{"title":"安装","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"guide/install.md","filePath":"guide/install.md","lastUpdated":null}'),p={name:"guide/install.md"},l=i(`<h1 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h1><h2 id="npm-安装" tabindex="-1">npm 安装 <a class="header-anchor" href="#npm-安装" aria-label="Permalink to &quot;npm 安装&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> init</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -y</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> i</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> easy-component-ui</span></span></code></pre></div><h2 id="在线引入" tabindex="-1">在线引入 <a class="header-anchor" href="#在线引入" aria-label="Permalink to &quot;在线引入&quot;">​</a></h2><blockquote><p><code>js</code>: 相应组件的引入, 需考虑修改<code>/components/ea-button/index.js</code>部分.</p></blockquote><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;module&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;https://unpkg.com/easy-component-ui@1.0.3/components/ea-button/index.js&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><h2 id="在原生环境引入" tabindex="-1">在原生环境引入 <a class="header-anchor" href="#在原生环境引入" aria-label="Permalink to &quot;在原生环境引入&quot;">​</a></h2><p>这里的路径是 <code>node_modules</code> 目录下的 <code>easy-component-ui</code> 目录, 即默认下载路径.</p><blockquote><p><code>css</code>: 特别的, 如果项目中会使用到带有图标的 <code>属性/组件</code>, 需要使用 <code>link</code> 标签引入图标文件</p></blockquote><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">link</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  rel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;stylesheet&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  href</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./node_modules/easy-component-ui/components/ea-icon/index.css&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">/&gt;</span></span></code></pre></div><blockquote><p><code>js</code>: 相应组件的引入, 请看对应组件的文档. 格式通常如下:</p></blockquote><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;module&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;./node_modules/easy-component-ui/components/ea-button/index.js&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><h2 id="如何获取单独的图标组件" tabindex="-1">如何获取单独的图标组件 <a class="header-anchor" href="#如何获取单独的图标组件" aria-label="Permalink to &quot;如何获取单独的图标组件&quot;">​</a></h2><blockquote><ol><li><a href="#npm-安装">npm 安装</a></li><li><a href="https://www.jsdelivr.com/package/npm/easy-component-ui?tab=files" target="_blank" rel="noreferrer">jsdelivr</a></li><li><a href="https://github.com/LuminaQAQ/ea-ui-component/releases" target="_blank" rel="noreferrer">github 发布页</a></li></ol></blockquote><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>以下为文件目录结构。其中：</p><ul><li>不在 <code>build</code> 目录下的<code>components</code>和<code>utils</code>，为未进行压缩源文件。</li><li>在 <code>build</code> 目录下的<code>components</code>和<code>utils</code>，为压缩后的文件。</li></ul><blockquote><p>因为先写的文档后发的包, 虽然不规范, 暂时先这样吧。</p></blockquote></div><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>├─.gitignore</span></span>
<span class="line"><span>├─build</span></span>
<span class="line"><span>│ ├─components</span></span>
<span class="line"><span>│ │ ├─Base.js</span></span>
<span class="line"><span>│ │ ├─ea-icon</span></span>
<span class="line"><span>│ │ │ ├─config.json</span></span>
<span class="line"><span>│ │ │ ├─css</span></span>
<span class="line"><span>│ │ │ │ └─fontello.css</span></span>
<span class="line"><span>│ │ │ ├─font</span></span>
<span class="line"><span>│ │ │ │ ├─fontello.eot</span></span>
<span class="line"><span>│ │ │ │ ├─fontello.svg</span></span>
<span class="line"><span>│ │ │ │ ├─fontello.ttf</span></span>
<span class="line"><span>│ │ │ │ ├─fontello.woff</span></span>
<span class="line"><span>│ │ │ │ └─fontello.woff2</span></span>
<span class="line"><span>│ │ │ ├─index.css</span></span>
<span class="line"><span>│ │ │ └─index.js</span></span>
<span class="line"><span>│ │ ├─globalConfig.js</span></span>
<span class="line"><span>│ │ └─index.js</span></span>
<span class="line"><span>│ └─utils</span></span>
<span class="line"><span>│   ├─createElement.js</span></span>
<span class="line"><span>│   ├─handleDefaultAttrIsTrue.js</span></span>
<span class="line"><span>│   ├─handleTemplate.js</span></span>
<span class="line"><span>│   ├─setStyle.js</span></span>
<span class="line"><span>│   ├─timeout.js</span></span>
<span class="line"><span>│   └─Validator.js</span></span>
<span class="line"><span>├─components</span></span>
<span class="line"><span>│ ├─Base.js</span></span>
<span class="line"><span>│ ├─ea-icon</span></span>
<span class="line"><span>│ │ ├─config.json</span></span>
<span class="line"><span>│ │ ├─css</span></span>
<span class="line"><span>│ │ │ └─fontello.css</span></span>
<span class="line"><span>│ │ ├─font</span></span>
<span class="line"><span>│ │ │ ├─fontello.eot</span></span>
<span class="line"><span>│ │ │ ├─fontello.svg</span></span>
<span class="line"><span>│ │ │ ├─fontello.ttf</span></span>
<span class="line"><span>│ │ │ ├─fontello.woff</span></span>
<span class="line"><span>│ │ │ └─fontello.woff2</span></span>
<span class="line"><span>│ │ ├─index.css</span></span>
<span class="line"><span>│ │ └─index.js</span></span>
<span class="line"><span>│ ├─globalConfig.js</span></span>
<span class="line"><span>│ └─index.js</span></span>
<span class="line"><span>│ ├─ea-ui-base-style.css</span></span>
<span class="line"><span>│ ├─ea-ui-base-style.scss</span></span>
<span class="line"><span>│ ├─globalConfig.js</span></span>
<span class="line"><span>│ └─index.js</span></span>
<span class="line"><span>├─LICENSE</span></span>
<span class="line"><span>├─package.json</span></span>
<span class="line"><span>└─utils</span></span></code></pre></div>`,16),e=[l];function t(o,c,h,d,k,r){return a(),n("div",null,e)}const E=s(p,[["render",t]]);export{g as __pageData,E as default};
