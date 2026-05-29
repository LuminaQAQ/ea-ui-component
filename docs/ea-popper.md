<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  import("../dist/components/index.js")
  import("../dist/assets/icon.css")

  // ------- 基础用法 -------
  // #region
  const referenceExample = {
    referenceElements: document.querySelectorAll('#referenceSection ea-popper'),

    init() {
      this.referenceElements.forEach(referenceElement => {
        referenceElement.addEventListener("click", (e) => {
          referenceElement.toggle();
        });
      });
    }
  }
  referenceExample.init();
  // #endregion
  // ------- end -------

  // ------- 不显示箭头 -------
  // #region
  const arrowExample = {
    referenceElements: document.querySelectorAll('#arrowSection ea-popper'),

    init() {
      this.referenceElements.forEach(referenceElement => {
        referenceElement.addEventListener("mouseenter", (e) => {
          referenceElement.show();

          referenceElement.addEventListener("mouseleave", () => {
            referenceElement.hide();
          }, { once: true });
        });
      });
    }
  }
  arrowExample.init();
  // #endregion
  // ------- end -------
})
</script>

<style scoped>
ea-popper {
  margin: 2rem;
}
</style>

# Popper 气泡

该组件主要用于相对某个元素进行智能定位的浮层场景，如文字提示、弹出框等等。

该文档主要用于描述该组件的一些方法、事件和使用，方便对上述提到的组件进行二次开发。

## 引入

> `js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-popper/index.js";
</script>
```

## 自定义样式

移步到 [CSS Part](#ea-popper-css-part) 或 [CSS 自定义属性](#ea-popper-css-自定义属性)。

## 基本用法

`ea-popper` 提供了一个基础的气泡，可以通过 `show()` / `hide()` 来控制显示与隐藏。

<div id="referenceSection" class="demo">
  <ea-row justify="center">
    <ea-col span="6">
      <ea-popper placement="top-start">
        top-start
        <ea-button variant="primary" slot="reference">top-start</ea-button>
      </ea-popper>
    </ea-col>
    <ea-col span="6">
      <ea-popper>
        top
        <ea-button variant="primary" slot="reference">top</ea-button>
      </ea-popper>
    </ea-col>
    <ea-col span="6">
      <ea-popper placement="top-end">
        top-end
        <ea-button variant="primary" slot="reference">top-end</ea-button>
      </ea-popper>
    </ea-col>
  </ea-row>
  <ea-row justify="space-between">
    <ea-col span="6">
      <ea-popper placement="left-start">
        left-start
        <ea-button variant="primary" slot="reference">left-start</ea-button>
      </ea-popper>
    </ea-col>
    <ea-col span="6">
      <ea-popper placement="right-start">
        right-start
        <ea-button variant="primary" slot="reference">right-start</ea-button>
      </ea-popper>
    </ea-col>
  </ea-row>
  <ea-row justify="space-between">
    <ea-col span="6">
      <ea-popper placement="left">
        left
        <ea-button variant="primary" slot="reference">left</ea-button>
      </ea-popper>
    </ea-col>
    <ea-col span="6">
      <ea-popper placement="right">
        right
        <ea-button variant="primary" slot="reference">right</ea-button>
      </ea-popper>
    </ea-col>
  </ea-row>
  <ea-row justify="space-between">
    <ea-col span="6">
      <ea-popper placement="left-end">
        left-end
        <ea-button variant="primary" slot="reference">left-end</ea-button>
      </ea-popper>
    </ea-col>
    <ea-col span="6">
      <ea-popper placement="right-end">
        right-end
        <ea-button variant="primary" slot="reference">right-end</ea-button>
      </ea-popper>
    </ea-col>
  </ea-row>
  <ea-row justify="center">
    <ea-col span="6">
      <ea-popper placement="bottom-start">
        bottom-start
        <ea-button variant="primary" slot="reference">bottom-start</ea-button>
      </ea-popper>
    </ea-col>
    <ea-col span="6">
      <ea-popper placement="bottom">
        bottom
        <ea-button variant="primary" slot="reference">bottom</ea-button>
      </ea-popper>
    </ea-col>
    <ea-col span="6">
      <ea-popper placement="bottom-end">
        bottom-end
        <ea-button variant="primary" slot="reference">bottom-end</ea-button>
      </ea-popper>
    </ea-col>
  </ea-row>
</div>

:::: details 查看代码

::: code-group

```html
<div id="referenceSection" class="demo">
  <ea-row justify="center">
    <ea-col span="6">
      <ea-popper placement="top-start">
        top-start
        <ea-button variant="primary" slot="reference">top-start</ea-button>
      </ea-popper>
    </ea-col>
    <ea-col span="6">
      <ea-popper>
        top
        <ea-button variant="primary" slot="reference">top</ea-button>
      </ea-popper>
    </ea-col>
    <ea-col span="6">
      <ea-popper placement="top-end">
        top-end
        <ea-button variant="primary" slot="reference">top-end</ea-button>
      </ea-popper>
    </ea-col>
  </ea-row>

  <ea-row justify="space-between">
    <ea-col span="6">
      <ea-popper placement="left-start">
        left-start
        <ea-button variant="primary" slot="reference">left-start</ea-button>
      </ea-popper>
    </ea-col>
    <ea-col span="6">
      <ea-popper placement="right-start">
        right-start
        <ea-button variant="primary" slot="reference">right-start</ea-button>
      </ea-popper>
    </ea-col>
  </ea-row>

  <ea-row justify="space-between">
    <ea-col span="6">
      <ea-popper placement="left">
        left
        <ea-button variant="primary" slot="reference">left</ea-button>
      </ea-popper>
    </ea-col>
    <ea-col span="6">
      <ea-popper placement="right">
        right
        <ea-button variant="primary" slot="reference">right</ea-button>
      </ea-popper>
    </ea-col>
  </ea-row>

  <ea-row justify="space-between">
    <ea-col span="6">
      <ea-popper placement="left-end">
        left-end
        <ea-button variant="primary" slot="reference">left-end</ea-button>
      </ea-popper>
    </ea-col>
    <ea-col span="6">
      <ea-popper placement="right-end">
        right-end
        <ea-button variant="primary" slot="reference">right-end</ea-button>
      </ea-popper>
    </ea-col>
  </ea-row>

  <ea-row justify="center">
    <ea-col span="6">
      <ea-popper placement="bottom-start">
        bottom-start
        <ea-button variant="primary" slot="reference">bottom-start</ea-button>
      </ea-popper>
    </ea-col>
    <ea-col span="6">
      <ea-popper placement="bottom">
        bottom
        <ea-button variant="primary" slot="reference">bottom</ea-button>
      </ea-popper>
    </ea-col>
    <ea-col span="6">
      <ea-popper placement="bottom-end">
        bottom-end
        <ea-button variant="primary" slot="reference">bottom-end</ea-button>
      </ea-popper>
    </ea-col>
  </ea-row>
</div>
```

```js
const referenceExample = {
  referenceElements: document.querySelectorAll('#referenceSection ea-popper'),

  init() {
    this.referenceElements.forEach(referenceElement => {
      referenceElement.addEventListener("click", (e) => {
        referenceElement.toggle();
      });
    });
  }
}
referenceExample.init();
```

:::

::::

## 不显示箭头

通过设置 `show-arrow` 控制是否启用箭头效果。

<div id="arrowSection" class="demo">
  <ea-popper placement="top-start" show-arrow="false">
    top-start
    <ea-button variant="primary" slot="reference">top-start</ea-button>
  </ea-popper>
  <ea-popper show-arrow="false">
    top
    <ea-button variant="primary" slot="reference">top</ea-button>
  </ea-popper>
  <ea-popper placement="top-end" show-arrow="false">
    top-end
    <ea-button variant="primary" slot="reference">top-end</ea-button>
  </ea-popper>
</div>

:::: details 查看代码

::: code-group

```html
<div id="arrowSection" class="demo">
  <ea-popper placement="top-start" show-arrow="false">
    top-start
    <ea-button variant="primary" slot="reference">top-start</ea-button>
  </ea-popper>
  <ea-popper show-arrow="false">
    top
    <ea-button variant="primary" slot="reference">top</ea-button>
  </ea-popper>
  <ea-popper placement="top-end" show-arrow="false">
    top-end
    <ea-button variant="primary" slot="reference">top-end</ea-button>
  </ea-popper>
</div>
```

```js
const arrowExample = {
  referenceElements: document.querySelectorAll('#arrowSection ea-popper'),

  init() {
    this.referenceElements.forEach(referenceElement => {
      referenceElement.addEventListener("mouseenter", (e) => {
        referenceElement.show();

        referenceElement.addEventListener("mouseleave", () => {
          referenceElement.hide();
        }, { once: true });
      });
    });
  }
}
arrowExample.init();
```

:::

::::

## ea-popper API

### ea-popper Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ------ | ------ |
| width | 宽度，单位 px | Number | — | 150 |
| placement | 气泡的出现位置 | String | top / top-start / top-end / bottom / bottom-start / bottom-end / left / left-start / left-end / right / right-start / right-end | top |
| showArrow | 是否显示箭头 | Boolean | — | true |
| visible | 控制 Popper 显隐的属性 | Boolean | — | false |
| offset | 气泡出现的位置偏移量 | String | — | "0 0" |
| flip | 是否在超过原 placement 视口时，进行翻转 | Boolean | — | true |

### ea-popper CSS Part

| 名称 | 说明 |
| ---- | ---- |
| container | Popper 外层容器 |
| reference | 触发 Popper 显示的 HTML 元素的父容器 |
| original | Popper 内容容器 |

### ea-popper Events

| 事件名 | 说明 | 回调参数 |
| ------ | ---- | -------- |
| ea-show | 开启 Popper 时触发 | — |
| ea-shown | 开启 Popper 的动画结束时触发 | — |
| ea-hide | 关闭 Popper 时触发 | — |
| ea-hidden | 关闭 Popper 的动画结束时触发 | — |

### ea-popper Methods

| 方法名 | 说明 | 参数 |
| ------ | ---- | ---- |
| show | 显示 Popper | — |
| hide | 隐藏 Popper | — |
| toggle | 切换 Popper 显示状态 | — |

### ea-popper Slots

| 名称 | 说明 |
| ---- | ---- |
| default | Popper 内容插槽 |
| reference | 触发 Popper 显示的 HTML 元素插槽 |

### ea-popper CSS 自定义属性

| 属性名 | 说明 | 默认值 |
| ------ | ---- | ------ |
| --ea-popper-width | Popper 宽度 | 150px |
| --ea-popper-border-color | Popper 边框颜色 | var(--grey-300) |
| --ea-popper-background-color | Popper 背景颜色 | var(--color-white) |
| --ea-popper-box-shadow | Popper 阴影 | var(--box-shadow-md) |
| --ea-popper-arrow-size | 箭头大小 | 10px |
| --ea-popper-spacing | Popper 内边距 | var(--spacing-md) |
| --ea-popper-transform-x | X 轴偏移量 | 0 |
| --ea-popper-transform-y | Y 轴偏移量 | 0 |
| --ea-popper-transition | 过渡动画时长 | var(--transition-normal) |
