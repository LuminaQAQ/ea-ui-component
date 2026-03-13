<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  import('../dist/components/index.js')
  import('../dist/assets/icon.css')

  const previewExample = {
    image: document.querySelector("#previewImage"),
    list: [
      "https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain",
      "https://th.bing.com/th/id/R.d88442788ee5a458d50e40f0a8cb1e05?rik=EoPp8GhejYeQfw&riu=http%3a%2f%2fimg.pconline.com.cn%2fimages%2fupload%2fupc%2ftx%2fwallpaper%2f1307%2f10%2fc2%2f23151595_1373424485102.jpg&ehk=J7xq%2f50bCmdD4jUXfnTlau2s5WiVsBxQArAjvJzqIo4%3d&risl=&pid=ImgRaw&r=0",
      "https://www.keaitupian.cn/cjpic/frombd/0/253/4061721412/2857814056.jpg",
      "https://www.keaitupian.cn/cjpic/frombd/2/253/2107631312/3178897554.jpg",
      "https://tse3.mm.bing.net/th/id/OIP.sPgwHtYKbg6cTN5LBYF_nQHaEK?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
      "https://tse1.mm.bing.net/th/id/OIP.VS7qtQiQgNuBk2SVdwvxagHaEk?rs=1&pid=ImgDetMain&o=7&rm=3",
      "https://www.keaitupian.cn/cjpic/frombd/1/253/2032688566/3458490751.jpg",
    ],

    async init() {
      await customElements.whenDefined("ea-image-preview"); 
      this.image.previewSrcList = this.list; 
    },
  };
  previewExample.init();

  const imageHandlerExample = {
    showPreviewButton: document.querySelector("#showPreviewButton"),
    previewControlledButton: document.querySelector("#previewControlledButton"),
    showPreviewImage: document.querySelector("#showPreviewImage"),
    previewControlledImage: document.querySelector("#previewControlledImage"),

    list: [
      "https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain",
      "https://th.bing.com/th/id/R.d88442788ee5a458d50e40f0a8cb1e05?rik=EoPp8GhejYeQfw&riu=http%3a%2f%2fimg.pconline.com.cn%2fimages%2fupload%2fupc%2ftx%2fwallpaper%2f1307%2f10%2fc2%2f23151595_1373424485102.jpg&ehk=J7xq%2f50bCmdD4jUXfnTlau2s5WiVsBxQArAjvJzqIo4%3d&risl=&pid=ImgRaw&r=0",
      "https://www.keaitupian.cn/cjpic/frombd/0/253/4061721412/2857814056.jpg",
      "https://www.keaitupian.cn/cjpic/frombd/2/253/2107631312/3178897554.jpg",
      "https://tse3.mm.bing.net/th/id/OIP.sPgwHtYKbg6cTN5LBYF_nQHaEK?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
      "https://tse1.mm.bing.net/th/id/OIP.VS7qtQiQgNuBk2SVdwvxagHaEk?rs=1&pid=ImgDetMain&o=7&rm=3",
      "https://www.keaitupian.cn/cjpic/frombd/1/253/2032688566/3458490751.jpg",
    ],

    async init() {
      await customElements.whenDefined("ea-image-preview");

      this.showPreviewImage.previewSrcList = this.list;
      this.previewControlledImage.urlList = this.list;

      this.showPreviewButton.addEventListener("click", () => {
        this.showPreviewImage.showPreview();
      });

      this.previewControlledButton.addEventListener("click", () => {
        this.previewControlledImage.visible = true;
      });
    },
  };
  imageHandlerExample.init();

  const customToolbarImage = {
    image: document.querySelector("#customToolbarImage"),
    switchFirst: document.querySelector("#switchFirst"),
    switchLast: document.querySelector("#switchLast"),
    reset: document.querySelector("#reset"),

    list: [
      "https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain",
      "https://th.bing.com/th/id/R.d88442788ee5a458d50e40f0a8cb1e05?rik=EoPp8GhejYeQfw&riu=http%3a%2f%2fimg.pconline.com.cn%2fimages%2fupload%2fupc%2ftx%2fwallpaper%2f1307%2f10%2fc2%2f23151595_1373424485102.jpg&ehk=J7xq%2f50bCmdD4jUXfnTlau2s5WiVsBxQArAjvJzqIo4%3d&risl=&pid=ImgRaw&r=0",
      "https://www.keaitupian.cn/cjpic/frombd/0/253/4061721412/2857814056.jpg",
      "https://www.keaitupian.cn/cjpic/frombd/2/253/2107631312/3178897554.jpg",
      "https://tse3.mm.bing.net/th/id/OIP.sPgwHtYKbg6cTN5LBYF_nQHaEK?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
      "https://tse1.mm.bing.net/th/id/OIP.VS7qtQiQgNuBk2SVdwvxagHaEk?rs=1&pid=ImgDetMain&o=7&rm=3",
      "https://www.keaitupian.cn/cjpic/frombd/1/253/2032688566/3458490751.jpg",
    ],

    async init() {
      await customElements.whenDefined("ea-image-preview");

      this.image.previewSrcList = this.list;

      this.switchFirst.addEventListener("click", () => {
        this.image.setActiveItem(0);
      });
      this.switchLast.addEventListener("click", () => {
        this.image.setActiveItem(6);
      });
      this.reset.addEventListener("click", () => {
        this.image.reset();
      });
    },
  };
  customToolbarImage.init();

  const customProgressExample = {
    image: document.querySelector("#customProgressImage"),

    list: [
      "https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain",
      "https://th.bing.com/th/id/R.d88442788ee5a458d50e40f0a8cb1e05?rik=EoPp8GhejYeQfw&riu=http%3a%2f%2fimg.pconline.com.cn%2fimages%2fupload%2fupc%2ftx%2fwallpaper%2f1307%2f10%2fc2%2f23151595_1373424485102.jpg&ehk=J7xq%2f50bCmdD4jUXfnTlau2s5WiVsBxQArAjvJzqIo4%3d&risl=&pid=ImgRaw&r=0",
      "https://www.keaitupian.cn/cjpic/frombd/0/253/4061721412/2857814056.jpg",
      "https://www.keaitupian.cn/cjpic/frombd/2/253/2107631312/3178897554.jpg",
      "https://tse3.mm.bing.net/th/id/OIP.sPgwHtYKbg6cTN5LBYF_nQHaEK?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
      "https://tse1.mm.bing.net/th/id/OIP.VS7qtQiQgNuBk2SVdwvxagHaEk?rs=1&pid=ImgDetMain&o=7&rm=3",
      "https://www.keaitupian.cn/cjpic/frombd/1/253/2032688566/3458490751.jpg",
    ],

    async init() {
      await customElements.whenDefined("ea-image-preview");

      this.image.previewSrcList = this.list;
    },
  };
  customProgressExample.init();
})
</script>

<style scoped>
  .viewer-error {
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: aliceblue;
  }

  .error ea-image {
    width: 150px;
    height: 200px;
  }

  .lazy {
    height: 200px;
    width: 500px;
    overflow: auto;
  }

  .lazy ea-image {
    height: 200px;
    width: 100%;
  }
</style>

# Image 图片

图片容器，在保留原生 img 的特性下，支持懒加载，自定义占位、加载失败等

::: tip
若在 `Image` 上启用 `preview` 功能，或单独使用 `ea-image-preview` 组件，请在等待 `ea-image-preview` 组件定义完成之后再进行 js 操作。(特别在 Vue 环境中)

```js
await customElements.whenDefined("ea-image-preview");
```

:::

## 引入

> `js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-image/index.js";
  // 如需单独使用 ea-image-preview, 可单独引入该组件
  import "./node_modules/easy-component-ui/components/ea-image-preview/index.js";
</script>
```

> `css`

::: tip
需要注意的是, 如果需要使用到带有图标的 `属性/组件`, 需要提前使用 `link` 标签引入图标文件
:::

```html
<link
  rel="stylesheet"
  href="./node_modules/easy-component-ui/components/ea-icon/index.css"
/>
```

## 自定义样式

移步到 [CSS Part](#css-part)。

## 基础用法

> 可通过 `fit` 确定图片如何适应到容器框，同原生 [`object-fit`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit)。

<div class="demo row">
  <ea-image
    fit="fill"
    width="100px"
    height="100px"
    src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
  ></ea-image>
  <ea-image
    width="100px"
    height="100px"
    fit="contain"
    src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
  ></ea-image>
  <ea-image
    width="100px"
    height="100px"
    fit="cover"
    src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
  ></ea-image>
  <ea-image
    width="100px"
    height="100px"
    fit="none"
    src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
  ></ea-image>
  <ea-image
    width="100px"
    height="100px"
    fit="scale-down"
    src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
  ></ea-image>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-image
    fit="fill"
    width="100px"
    height="100px"
    src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
  ></ea-image>
  <ea-image
    width="100px"
    height="100px"
    fit="contain"
    src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
  ></ea-image>
  <ea-image
    width="100px"
    height="100px"
    fit="cover"
    src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
  ></ea-image>
  <ea-image
    width="100px"
    height="100px"
    fit="none"
    src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
  ></ea-image>
  <ea-image
    width="100px"
    height="100px"
    fit="scale-down"
    src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
  ></ea-image>
</div>
```

:::

## 占位内容

在 `slot="placeholder"` 插槽中自定义占位内容。

<div class="demo">
  <ea-image
    class="image"
    width="200px"
    height="150px"
    fit="cover"
    src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
  >
    <div class="image-slot" slot="placeholder">
      Loading<span class="dot">...</span>
    </div>
  </ea-image>
</div>

::: code-group

```html
<div class="demo">
  <ea-image
    class="image"
    width="200px"
    height="150px"
    fit="cover"
    src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
  >
    <div class="image-slot" slot="placeholder">
      Loading<span class="dot">...</span>
    </div>
  </ea-image>
</div>
```

```css
.image-slot {
  margin: auto;
}
```

:::

## 加载失败

<div class="demo row left error">
  <ea-image></ea-image>
  <ea-image>
    <ea-icon slot="error" icon="icon-picture" size="30"></ea-icon>
  </ea-image>
</div>

::: code-group

```html
<div class="demo error">
  <ea-image></ea-image>
  <ea-image>
    <ea-icon slot="error" icon="icon-picture" size="30"></ea-icon>
  </ea-image>
</div>
```

```css
.error ea-image {
  width: 150px;
  height: 200px;
}
```

:::

## 懒加载

::: tip

您可以使用 `loading="lazy"` 替换之前的`lazy = true`。

如果当前浏览器支持原生图片延迟加载，则先使用原生能力，否则将使用滚动监听实现相同效果。
:::

可通过lazy开启懒加载功能， 当图片滚动到可视范围内才会加载。 可通过 `scroll-container` 来设置滚动容器， 若未定义，则为最近一个 `overflow` 值为 `auto` 或 `scroll` 的父元素。

> 单项

<div class="demo">
  <ea-image
    src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
    lazy
  ></ea-image>
</div>

::: code-group

```html
<div class="demo">
  <ea-image
    src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
    lazy
  ></ea-image>
</div>
```

:::

> 多项

<div class="demo lazy">
  <ea-image
    src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
    lazy
  ></ea-image>
  <ea-image
    src="https://th.bing.com/th/id/R.d88442788ee5a458d50e40f0a8cb1e05?rik=EoPp8GhejYeQfw&riu=http%3a%2f%2fimg.pconline.com.cn%2fimages%2fupload%2fupc%2ftx%2fwallpaper%2f1307%2f10%2fc2%2f23151595_1373424485102.jpg&ehk=J7xq%2f50bCmdD4jUXfnTlau2s5WiVsBxQArAjvJzqIo4%3d&risl=&pid=ImgRaw&r=0"
    lazy
  ></ea-image>
  <ea-image
    src="https://www.keaitupian.cn/cjpic/frombd/0/253/4061721412/2857814056.jpg"
    lazy
  ></ea-image>
  <ea-image
    src="https://www.keaitupian.cn/cjpic/frombd/2/253/2107631312/3178897554.jpg"
    lazy
  ></ea-image>
  <ea-image
    src="https://tse3.mm.bing.net/th/id/OIP.sPgwHtYKbg6cTN5LBYF_nQHaEK?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3"
    lazy
  ></ea-image>
  <ea-image
    src="https://tse1.mm.bing.net/th/id/OIP.VS7qtQiQgNuBk2SVdwvxagHaEk?rs=1&pid=ImgDetMain&o=7&rm=3"
    lazy
  ></ea-image>
  <ea-image
    src="https://www.keaitupian.cn/cjpic/frombd/1/253/2032688566/3458490751.jpg"
    lazy
  ></ea-image>
</div>

::: code-group

```html
<div class="demo lazy">
  <ea-image
    src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
    lazy
  ></ea-image>
  <ea-image
    src="https://th.bing.com/th/id/R.d88442788ee5a458d50e40f0a8cb1e05?rik=EoPp8GhejYeQfw&riu=http%3a%2f%2fimg.pconline.com.cn%2fimages%2fupload%2fupc%2ftx%2fwallpaper%2f1307%2f10%2fc2%2f23151595_1373424485102.jpg&ehk=J7xq%2f50bCmdD4jUXfnTlau2s5WiVsBxQArAjvJzqIo4%3d&risl=&pid=ImgRaw&r=0"
    lazy
  ></ea-image>
  <ea-image
    src="https://www.keaitupian.cn/cjpic/frombd/0/253/4061721412/2857814056.jpg"
    lazy
  ></ea-image>
  <ea-image
    src="https://www.keaitupian.cn/cjpic/frombd/2/253/2107631312/3178897554.jpg"
    lazy
  ></ea-image>
  <ea-image
    src="https://tse3.mm.bing.net/th/id/OIP.sPgwHtYKbg6cTN5LBYF_nQHaEK?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3"
    lazy
  ></ea-image>
  <ea-image
    src="https://tse1.mm.bing.net/th/id/OIP.VS7qtQiQgNuBk2SVdwvxagHaEk?rs=1&pid=ImgDetMain&o=7&rm=3"
    lazy
  ></ea-image>
  <ea-image
    src="https://www.keaitupian.cn/cjpic/frombd/1/253/2032688566/3458490751.jpg"
    lazy
  ></ea-image>
</div>
```

```css
.lazy {
  height: 200px;
  width: 500px;
  overflow: auto;
}

.lazy ea-image {
  height: 200px;
  width: 100%;
}
```

:::

## 图片预览

可通过 `previewSrcList` 开启预览大图的功能。 你可以通过 `initial-index` 初始化第一张预览图片的位置。 默认初始位置为 0。

<div class="demo">
  <ea-image
    id="previewImage"
    style="width: 100px; height: 100px"
    class="viewer"
    src="https://tse1.mm.bing.net/th/id/OIP.rTMre-V-rMq3T1EP9W7vlAHaEK?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3"
    preview
    zoom-rate="1.2"
    max-scale="7"
    min-scale="0.2"
    initial-index="4"
    fit="cover"
    show-progress
  >
  </ea-image>
</div>

::: code-group

```html
<div class="demo">
  <ea-image
    id="previewImage"
    style="width: 100px; height: 100px"
    class="viewer"
    src="https://tse1.mm.bing.net/th/id/OIP.rTMre-V-rMq3T1EP9W7vlAHaEK?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3"
    preview
    zoom-rate="1.2"
    max-scale="7"
    min-scale="0.2"
    initial-index="4"
    fit="cover"
    show-progress
  >
  </ea-image>
</div>
```

```js
const previewExample = {
  image: document.querySelector("#previewImage"),
  list: [
    "https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain",
    "https://th.bing.com/th/id/R.d88442788ee5a458d50e40f0a8cb1e05?rik=EoPp8GhejYeQfw&riu=http%3a%2f%2fimg.pconline.com.cn%2fimages%2fupload%2fupc%2ftx%2fwallpaper%2f1307%2f10%2fc2%2f23151595_1373424485102.jpg&ehk=J7xq%2f50bCmdD4jUXfnTlau2s5WiVsBxQArAjvJzqIo4%3d&risl=&pid=ImgRaw&r=0",
    "https://www.keaitupian.cn/cjpic/frombd/0/253/4061721412/2857814056.jpg",
    "https://www.keaitupian.cn/cjpic/frombd/2/253/2107631312/3178897554.jpg",
    "https://tse3.mm.bing.net/th/id/OIP.sPgwHtYKbg6cTN5LBYF_nQHaEK?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
    "https://tse1.mm.bing.net/th/id/OIP.VS7qtQiQgNuBk2SVdwvxagHaEk?rs=1&pid=ImgDetMain&o=7&rm=3",
    "https://www.keaitupian.cn/cjpic/frombd/1/253/2032688566/3458490751.jpg",
  ],

  async init() {
    await customElements.whenDefined("ea-image-preview");
    this.image.previewSrcList = this.list;
  },
};
previewExample.init();
```

:::

## 手动打开预览

<div class="demo">
  <ea-button id="showPreviewButton">
    openPreview with showPreview method
  </ea-button>
  <ea-button id="previewControlledButton"> preview controlled </ea-button>

  <section>
    <ea-image
      id="showPreviewImage"
      style="width: 100px; height: 100px"
      class="viewer"
      src="https://tse1.mm.bing.net/th/id/OIP.rTMre-V-rMq3T1EP9W7vlAHaEK?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3"
      preview
      zoom-rate="1.2"
      max-scale="7"
      min-scale="0.2"
      initial-index="4"
      fit="cover"
      show-progress
    >
    </ea-image>
  </section>

  <section>
    <ea-image-preview id="previewControlledImage" show-progress>
      <section class="viewer-error" slot="viewer-error">viewer-error</section>
      <section slot="toolbar">toolbar</section>
      <section slot="progress">
        <span data-active></span> //
        <span data-total></span>
      </section>
    </ea-image-preview>
  </section>
</div>

::: code-group

```html
<div class="demo">
  <ea-button id="showPreviewButton">
    openPreview with showPreview method
  </ea-button>
  <ea-button id="previewControlledButton"> preview controlled </ea-button>

  <section>
    <ea-image
      id="showPreviewImage"
      style="width: 100px; height: 100px"
      class="viewer"
      src="https://tse1.mm.bing.net/th/id/OIP.rTMre-V-rMq3T1EP9W7vlAHaEK?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3"
      preview
      zoom-rate="1.2"
      max-scale="7"
      min-scale="0.2"
      initial-index="4"
      fit="cover"
      show-progress
    >
    </ea-image>
  </section>

  <section>
    <ea-image-preview id="previewControlledImage" show-progress>
      <section class="viewer-error" slot="viewer-error">viewer-error</section>
      <section slot="toolbar">toolbar</section>
      <section slot="progress">
        <span data-active></span> //
        <span data-total></span>
      </section>
    </ea-image-preview>
  </section>
</div>
```

```js
const customToolbarImage = {
  image: document.querySelector("#customToolbarImage"),
  switchFirst: document.querySelector("#switchFirst"),
  switchLast: document.querySelector("#switchLast"),
  reset: document.querySelector("#reset"),

  list: [
    "https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain",
    "https://th.bing.com/th/id/R.d88442788ee5a458d50e40f0a8cb1e05?rik=EoPp8GhejYeQfw&riu=http%3a%2f%2fimg.pconline.com.cn%2fimages%2fupload%2fupc%2ftx%2fwallpaper%2f1307%2f10%2fc2%2f23151595_1373424485102.jpg&ehk=J7xq%2f50bCmdD4jUXfnTlau2s5WiVsBxQArAjvJzqIo4%3d&risl=&pid=ImgRaw&r=0",
    "https://www.keaitupian.cn/cjpic/frombd/0/253/4061721412/2857814056.jpg",
    "https://www.keaitupian.cn/cjpic/frombd/2/253/2107631312/3178897554.jpg",
    "https://tse3.mm.bing.net/th/id/OIP.sPgwHtYKbg6cTN5LBYF_nQHaEK?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
    "https://tse1.mm.bing.net/th/id/OIP.VS7qtQiQgNuBk2SVdwvxagHaEk?rs=1&pid=ImgDetMain&o=7&rm=3",
    "https://www.keaitupian.cn/cjpic/frombd/1/253/2032688566/3458490751.jpg",
  ],

  async init() {
    await customElements.whenDefined("ea-image-preview");

    this.image.previewSrcList = this.list;

    this.switchFirst.addEventListener("click", () => {
      this.image.setActiveItem(0);
    });
    this.switchLast.addEventListener("click", () => {
      this.image.setActiveItem(6);
    });
    this.reset.addEventListener("click", () => {
      this.image.reset();
    });
  },
};
customToolbarImage.init();
```

:::

## 自定义工具栏

可通过 `toolbar` 插槽自定义工具栏内容，插槽中添加了 setActiveItem 方法，用于根据索引切换图片。

<div class="demo">
  <ea-image
    id="customToolbarImage"
    style="width: 100px; height: 100px"
    class="viewer"
    src="https://tse1.mm.bing.net/th/id/OIP.rTMre-V-rMq3T1EP9W7vlAHaEK?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3"
    preview
    zoom-rate="1.2"
    max-scale="7"
    min-scale="0.2"
    initial-index="4"
    fit="cover"
    show-progress
  >
    <section slot="toolbar">
      <ea-icon id="switchFirst" icon="icon-fast-bw"></ea-icon>
      <ea-icon icon="icon-angle-left" data-action="switch-prev"></ea-icon>
      <ea-icon icon="icon-angle-right" data-action="switch-next"></ea-icon>
      <ea-icon id="switchLast" icon="icon-fast-fw"></ea-icon>
      |
      <ea-icon icon="icon-zoom-in" data-action="zoom-in"></ea-icon>
      <ea-icon icon="icon-zoom-out" data-action="zoom-out"></ea-icon>
      |
      <ea-icon icon="icon-ccw" data-action="rotate-anticlockwise"></ea-icon>
      <ea-icon icon="icon-cw" data-action="rotate-clockwise"></ea-icon>
      |
      <ea-icon id="reset" icon="icon-recycle"></ea-icon>
    </section>
  </ea-image>
</div>

::: code-group

```html
<div class="demo">
  <ea-image
    id="customToolbarImage"
    style="width: 100px; height: 100px"
    class="viewer"
    src="https://tse1.mm.bing.net/th/id/OIP.rTMre-V-rMq3T1EP9W7vlAHaEK?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3"
    preview
    zoom-rate="1.2"
    max-scale="7"
    min-scale="0.2"
    initial-index="4"
    fit="cover"
    show-progress
  >
    <section slot="toolbar">
      <ea-icon id="switchFirst" icon="icon-fast-bw"></ea-icon>
      <ea-icon icon="icon-angle-left" data-action="switch-prev"></ea-icon>
      <ea-icon icon="icon-angle-right" data-action="switch-next"></ea-icon>
      <ea-icon id="switchLast" icon="icon-fast-fw"></ea-icon>
      |
      <ea-icon icon="icon-zoom-in" data-action="zoom-in"></ea-icon>
      <ea-icon icon="icon-zoom-out" data-action="zoom-out"></ea-icon>
      |
      <ea-icon icon="icon-ccw" data-action="rotate-anticlockwise"></ea-icon>
      <ea-icon icon="icon-cw" data-action="rotate-clockwise"></ea-icon>
      |
      <ea-icon id="reset" icon="icon-recycle"></ea-icon>
    </section>
  </ea-image>
</div>
```

```js
const customToolbarImage = {
  image: document.querySelector("#customToolbarImage"),
  switchFirst: document.querySelector("#switchFirst"),
  switchLast: document.querySelector("#switchLast"),
  reset: document.querySelector("#reset"),
  init() {
    this.switchFirst.addEventListener("click", () => {
      this.image.setActiveItem(0);
    });
    this.switchLast.addEventListener("click", () => {
      this.image.setActiveItem(6);
    });
    this.reset.addEventListener("click", () => {
      this.image.reset();
    });
  },
};
customToolbarImage.init();
```

:::

## 自定义进度条​

可通过 `show-progress` 控制是否在预览图片时显示进度条。 进度条会在使用 `progress` 插槽时显示。

<div class="demo">
  <ea-image
    id="customProgressImage"
    style="width: 100px; height: 100px"
    class="viewer"
    src="https://tse1.mm.bing.net/th/id/OIP.rTMre-V-rMq3T1EP9W7vlAHaEK?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3"
    preview
    zoom-rate="1.2"
    max-scale="7"
    min-scale="0.2"
    initial-index="4"
    fit="cover"
    show-progress
  >
    <section slot="progress">
      <span data-active></span> //
      <span data-total></span>
    </section>
  </ea-image>
</div>

::: code-group

```html
<div class="demo">
  <ea-image
    id="customProgressImage"
    style="width: 100px; height: 100px"
    class="viewer"
    src="https://tse1.mm.bing.net/th/id/OIP.rTMre-V-rMq3T1EP9W7vlAHaEK?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3"
    preview
    zoom-rate="1.2"
    max-scale="7"
    min-scale="0.2"
    initial-index="4"
    fit="cover"
    show-progress
  >
    <section slot="progress">
      <span data-active></span> //
      <span data-total></span>
    </section>
  </ea-image>
</div>
```

```js
const customProgressExample = {
  image: document.querySelector("#customProgressImage"),

  list: [
    "https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain",
    "https://th.bing.com/th/id/R.d88442788ee5a458d50e40f0a8cb1e05?rik=EoPp8GhejYeQfw&riu=http%3a%2f%2fimg.pconline.com.cn%2fimages%2fupload%2fupc%2ftx%2fwallpaper%2f1307%2f10%2fc2%2f23151595_1373424485102.jpg&ehk=J7xq%2f50bCmdD4jUXfnTlau2s5WiVsBxQArAjvJzqIo4%3d&risl=&pid=ImgRaw&r=0",
    "https://www.keaitupian.cn/cjpic/frombd/0/253/4061721412/2857814056.jpg",
    "https://www.keaitupian.cn/cjpic/frombd/2/253/2107631312/3178897554.jpg",
    "https://tse3.mm.bing.net/th/id/OIP.sPgwHtYKbg6cTN5LBYF_nQHaEK?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
    "https://tse1.mm.bing.net/th/id/OIP.VS7qtQiQgNuBk2SVdwvxagHaEk?rs=1&pid=ImgDetMain&o=7&rm=3",
    "https://www.keaitupian.cn/cjpic/frombd/1/253/2032688566/3458490751.jpg",
  ],

  async init() {
    await customElements.whenDefined("ea-image-preview");

    this.image.previewSrcList = this.list;
  },
};
customProgressExample.init();
```

:::

## Image API

### Image Attributes

| 参数                                 | 说明                                                                                                                          | 类型    | 可选值                                                     | 默认值 |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- | ------- | ---------------------------------------------------------- | ------ |
| src                                  | 图片地址                                                                                                                      | string  | -                                                          | -      |
| fit                                  | 确定图片如何适应容器框，同原生 [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/object-fit) | string  | `"contain" \| "cover" \| "fill" \| "none" \| "scale-down"` | cover  |
| alt                                  | 原生 img 的 alt 属性                                                                                                          | string  | -                                                          | -      |
| width                                | 图片宽度                                                                                                                      | string  | -                                                          | 100%   |
| height                               | 图片高度                                                                                                                      | string  | -                                                          | 100%   |
| loading                              | 原生图片加载策略                                                                                                              | string  | `"lazy" \| "eager"`                                        | eager  |
| lazy                                 | 兼容性懒加载开关（布尔）——当浏览器不支持原生 lazy 时会使用 IntersectionObserver                                               | boolean | -                                                          | false  |
| referrerpolicy                       | 原生 img 的 referrerpolicy 属性                                                                                               | string  | -                                                          | -      |
| crossorigin                          | 原生 img 的 crossorigin / sizes（组件中设置为 sizes 属性）                                                                    | string  | -                                                          | -      |
| preview                              | 是否启用预览功能（会按需动态 import `ea-image-preview`）                                                                      | boolean | -                                                          | false  |
| previewSrcList <ea-tag>Prop</ea-tag> | 预览图片地址列表                                                                                                              | string  | -                                                          | -      |
| hide-on-click-modal                  | 预览时点击遮罩是否隐藏（透传到 preview 组件）                                                                                 | boolean | -                                                          | false  |
| z-index                              | 预览遮罩的 z-index（透传到 preview 组件）                                                                                     | number  | -                                                          | 2000   |
| initial-index                        | 预览初始索引（透传到 preview 组件）                                                                                           | number  | -                                                          | 0      |
| close-on-press-escape                | 是否允许按 Escape 关闭预览（透传到 preview 组件）                                                                             | boolean | -                                                          | true   |
| infinite                             | 预览是否无限循环（透传到 preview 组件）                                                                                       | boolean | -                                                          | true   |
| zoom-rate                            | 预览缩放倍率（透传到 preview 组件）                                                                                           | number  | -                                                          | 1.2    |
| scale                                | 预览时初始缩放比例（透传到 preview 组件）                                                                                     | number  | -                                                          | 1      |
| min-scale                            | 预览最小缩放比例（透传到 preview 组件）                                                                                       | number  | -                                                          | 0.2    |
| max-scale                            | 预览最大缩放比例（透传到 preview 组件）                                                                                       | number  | -                                                          | 7      |
| show-progress                        | 在预览时是否显示进度（透传到 preview 组件）                                                                                   | boolean | -                                                          | false  |

### Image CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称        | 说明                     |
| :---------- | :----------------------- |
| container   | 外层容器                 |
| image       | 图片内容                 |
| error       | 图片加载失败时显示的图片 |
| placeholder | 图片加载前的占位内容     |
| preview     | 预览图片容器             |

### Image Methods

| 方法名        | 说明             | 参数                      |
| ------------- | ---------------- | ------------------------- |
| setActiveItem | 切换预览图片     | `(index: number) => void` |
| reset         | 重置图片预览状态 | `() => void`              |
| showPreview   | 显示图片预览     | `() => void`              |

### Image Events

| 事件名称 | 说明               | 回调参数   |
| -------- | ------------------ | ---------- |
| load     | 图片加载成功时触发 | (e: Event) |
| error    | 图片加载失败时触发 | (e: Event) |

### Image Slots

| 名称                                   | 说明                                         |
| -------------------------------------- | -------------------------------------------- |
| error                                  | 图片加载失败时显示的图片（slot="error"）     |
| placeholder                            | 图片未加载时的占位内容（slot="placeholder"） |
| progress <ea-tag>preview 属性</ea-tag> | 图片加载过程中的进度（slot="progress"）      |
| toolbar <ea-tag>preview 属性</ea-tag>  | 图片预览工具栏（slot="toolbar"）             |

## ImagePreview API

### ImagePreview Attributes

| 参数                          | 说明                                                 | 类型    | 可选值 | 默认值        |
| ----------------------------- | ---------------------------------------------------- | ------- | ------ | ------------- |
| visible                       | 是否可见（控制遮罩显示/隐藏）                        | boolean | -      | false         |
| urlList <ea-tag>Prop</ea-tag> | 图片地址列表                                         | string  | -      | -             |
| index                         | 当前预览的图片索引（可读写，会触发切换逻辑）         | number  | -      | initial-index |
| initial-index                 | 初始索引，用于初始化 index                           | number  | -      | 0             |
| infinite                      | 是否在首尾继续循环                                   | boolean | -      | true          |
| zoom-rate                     | 缩放步长（每次缩放的倍率因子）                       | number  | -      | 1.2           |
| scale                         | 当前缩放比例（可读写，受 min-scale/max-scale 限制）  | number  | -      | 1             |
| min-scale                     | 最小缩放比例                                         | number  | -      | 0.2           |
| max-scale                     | 最大缩放比例                                         | number  | -      | 7             |
| close-on-press-escape         | 是否支持按 Escape 关闭                               | boolean | -      | true          |
| hide-on-click-modal           | 点击遮罩是否隐藏（点击不在图片/头部/底部区域时生效） | boolean | -      | true          |
| show-progress                 | 是否显示进度（progress 区域会渲染 slot 或文本）      | boolean | -      | false         |
| append-to-body                | 是否插入到 body                                      | boolean | -      | false         |

### ImagePreview Scopes

| 名称        | 说明                 |
| ----------- | -------------------- |
| data-active | 当前预览图片的索引值 |
| data-total  | 预览图片的总数       |

### ImagePreview CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称                       | 说明                                   |
| :------------------------- | :------------------------------------- |
| container                  | 预览遮罩的根元素（基于 ea-overlay）    |
| header                     | 头部区域（包含关闭按钮）               |
| main                       | 主体区域（包含图片与左右切换）         |
| footer                     | 底部区域（包含工具栏与进度）           |
| toolbar                    | 自定义工具栏 slot（part="toolbar"）    |
| progress                   | 进度显示区域（slot 名称为 "progress"） |
| `icon & close-icon`        | 关闭按钮                               |
| `icon & prev-icon`         | 左右切换按钮                           |
| `icon & next-icon`         | 左右切换按钮                           |
| `icon & zoom-in-icon`      | 缩放按钮（放大）                       |
| `icon & zoom-out-icon`     | 缩放按钮（缩小）                       |
| `icon & rotate-left-icon`  | 旋转按钮（向左旋转）                   |
| `icon & rotate-right-icon` | 旋转按钮（向右旋转）                   |

### ImagePreview Methods

| 方法名        | 说明                                                           | 参数                      |
| ------------- | -------------------------------------------------------------- | ------------------------- |
| setActiveItem | 切换预览图片                                                   | `(index: number) => void` |
| `reset()`     | 重置为初始索引、缩放与位置（scale = 1，rotate 重置，位移归零） | `() => void`              |

### ImagePreview Events

| 事件名称 | 说明                                                                                      |
| -------- | ----------------------------------------------------------------------------------------- |
| switch   | 切换图片时触发，事件 detail 包含 `{ index: Number, url: String, imgTarget: HTMLElement }` |
| error    | 当前图片加载失败时触发                                                                    |
| rotate   | 旋转操作完成时触发，detail 包含 `{ oldVal: CSS Degree, rotate: CSS Degree }`              |

### ImagePreview Slots

| 名称         | 说明                                                                                                                      |
| ------------ | ------------------------------------------------------------------------------------------------------------------------- |
| toolbar      | 自定义工具栏内容，slot 中提供的元素可通过 data-action 或指定 class 来替代内置工具（组件对常用 action 会做检测并绑定回调） |
| progress     | 自定义进度显示，组件会尝试在 slot 内查找 data-active / data-total 等元素并更新；若未提供，会显示默认文本 `active / total` |
| viewer-error | 预览图片加载错误时用于替换错误展示的 slot（通过在 ea-image 上插入 slot="error"）                                          |
