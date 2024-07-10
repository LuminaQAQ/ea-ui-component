<script setup>
import {onMounted} from "vue"
import configs from "../components/ea-icon/config.json"

onMounted(() => {
    import("./index.scss")
})
</script>

# Icon 图标

提供了一套常用的图标集合。

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
        <i class="icon-spin6 animate-spin"></i>
        <span>icon-spin6 animate-spin</span>
    </section>
    <section v-for="(item, index) in configs.glyphs">
        <i :class="'icon-' + item.css"></i>
        <span>icon-{{item.css}}</span>
    </section>
</div>
