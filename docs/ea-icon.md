<script setup>
import {onMounted} from "vue"
import configs from "../components/ea-icon/config.json"

onMounted(() => {
    import("./index.scss")
    import("../components/ea-icon/index.js")
    import("../components/ea-icon/index.css")
})
</script>

# Icon 图标

提供了一套常用的图标集合。图标来源：https://fontello.com/

## 引入

> `js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-icon/index.js";
</script>
```

## 使用方法

直接通过设置类名为 icon-iconName 来使用即可。例如：

<i class="icon-spin6 animate-spin"></i>
<i class="icon-chrome"></i>

```html
<i class="icon-spin6 animate-spin"></i> <i class="icon-chrome"></i>
```

> 也可以通过组件的方式使用：

```html
<ea-icon icon="icon-coffee"></ea-icon>
```

## 图标集合

<div class="main-icon-wrap">
    <section>
        <ea-icon icon="icon-spin6 animate-spin" size="19"></ea-icon>
        <span>icon-spin6 animate-spin</span>
    </section>
    <section v-for="(item, index) in configs.glyphs">
        <ea-icon :icon="'icon-' + item.css" size="19"></ea-icon>
        <span>icon-{{item.css}}</span>
    </section>
</div>
