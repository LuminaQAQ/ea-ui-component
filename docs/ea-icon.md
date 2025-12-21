<script setup>
import {onMounted} from "vue"
import configs from "../src/components/ea-icon/config.json"

onMounted(() => {
  import("../dist/components/index.js")
  import("../dist/assets/icon.css")
})
</script>

# Icon 图标

提供了一套常用的图标集合。图标来源：https://fontello.com/

## 引入

> `js`

```html
<link rel="stylesheet" href="/dist/assets/icon.css" />

<script type="module">
  import "./node_modules/easy-component-ui/components/ea-icon/index.js";
</script>
```

<!-- ## 如何自定义图标文件链接？

[详情参考这篇文档](./guide/customIconFontHref.md) -->

## 使用方法

直接通过设置类名为 icon-iconName 来使用即可。例如：

<i class="icon-spin6 animate-spin"></i>
<i class="icon-chrome"></i>

::: code-group

```html [组件形式]
<ea-icon icon="icon-coffee"></ea-icon>
```

```html [原生形式]
<div>
  <i class="icon-spin6 animate-spin"></i>
</div>
<div>
  <i class="icon-chrome"></i>
</div>
```

:::

## 图标集合

<div class="main-icon-wrap">
    <section>
        <ea-icon icon="icon-spin6 animate-spin" size="28"></ea-icon>
        <span style="margin-top: 1rem;">icon-spin6 animate-spin</span>
    </section>
    <section v-for="(item, index) in configs.glyphs">
        <ea-icon :icon="'icon-' + item.css" size="28"></ea-icon>
        <span style="margin-top: 1rem;">icon-{{item.css}}</span>
    </section>
</div>
