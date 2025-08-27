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

        // ------- 基础用法 -------
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

::: code-group

```css [该用例使用到的样式]
ea-popper {
  margin: 2rem;
}
```

:::

## 基本用法

`ea-popper` 提供了一个基础的气泡，可以通过 `show()` / `hide()` 来控制显示与隐藏。

<div id="referenceSection" class="demo">
  <ea-row justify="center">
    <ea-col span="6">
      <ea-popper placement="top-start">
        top-start
        <ea-button type="primary" slot="reference">top-start</ea-button>
      </ea-popper>
    </ea-col>
    <ea-col span="6">
      <ea-popper>
        top
        <ea-button type="primary" slot="reference">top</ea-button>
      </ea-popper>
    </ea-col>
    <ea-col span="6">
      <ea-popper placement="top-end">
        top-end
        <ea-button type="primary" slot="reference">top-end</ea-button>
      </ea-popper>
    </ea-col>
  </ea-row>
  <ea-row justify="space-between">
    <ea-col span="6">
      <ea-popper placement="left-start">
        left-start
        <ea-button type="primary" slot="reference">left-start</ea-button>
      </ea-popper>
    </ea-col>
    <ea-col span="6">
      <ea-popper placement="right-start">
        right- start
        <ea-button type="primary" slot="reference">right-start</ea-button>
      </ea-popper>
    </ea-col>
  </ea-row>
  <ea-row justify="space-between">
    <ea-col span="6">
      <ea-popper placement="left">
        left
        <ea-button type="primary" slot="reference">left</ea-button>
      </ea-popper>
    </ea-col>
    <ea-col span="6">
      <ea-popper placement="right">
        right
        <ea-button type="primary" slot="reference">right</ea-button>
      </ea-popper>
    </ea-col>
  </ea-row>
  <ea-row justify="space-between">
    <ea-col span="6">
      <ea-popper placement="left-end">
        left-end
        <ea-button type="primary" slot="reference">left-end</ea-button>
      </ea-popper>
    </ea-col>
    <ea-col span="6">
      <ea-popper placement="right-end">
        right-end
        <ea-button type="primary" slot="reference">right-end</ea-button>
      </ea-popper>
    </ea-col>
  </ea-row>
  <ea-row justify="center">
    <ea-col span="6">
      <ea-popper placement="bottom-start">
        bottom-start
        <ea-button type="primary" slot="reference">bottom-start</ea-button>
      </ea-popper>
    </ea-col>
    <ea-col span="6">
      <ea-popper placement="bottom">
        bottom
        <ea-button type="primary" slot="reference">bottom</ea-button>
      </ea-popper>
    </ea-col>
    <ea-col span="6">
      <ea-popper placement="bottom-end">
        bottom-end
        <ea-button type="primary" slot="reference">bottom-end</ea-button>
      </ea-popper>
    </ea-col>
  </ea-row>
</div>

::: details 查看代码

`html`

```html
<div id="referenceSection" class="demo">
  <ea-row justify="center">
    <ea-col span="6">
      <ea-popper placement="top-start">
        top-start
        <ea-button type="primary" slot="reference">top-start</ea-button>
      </ea-popper>
    </ea-col>
    <ea-col span="6">
      <ea-popper>
        top
        <ea-button type="primary" slot="reference">top</ea-button>
      </ea-popper>
    </ea-col>
    <ea-col span="6">
      <ea-popper placement="top-end">
        top-end
        <ea-button type="primary" slot="reference">top-end</ea-button>
      </ea-popper>
    </ea-col>
  </ea-row>

  <ea-row justify="space-between">
    <ea-col span="6">
      <ea-popper placement="left-start">
        left-start
        <ea-button type="primary" slot="reference">left-start</ea-button>
      </ea-popper>
    </ea-col>
    <ea-col span="6">
      <ea-popper placement="right-start">
        right- start
        <ea-button type="primary" slot="reference">right-start</ea-button>
      </ea-popper>
    </ea-col>
  </ea-row>

  <ea-row justify="space-between">
    <ea-col span="6">
      <ea-popper placement="left">
        left
        <ea-button type="primary" slot="reference">left</ea-button>
      </ea-popper>
    </ea-col>
    <ea-col span="6">
      <ea-popper placement="right">
        right
        <ea-button type="primary" slot="reference">right</ea-button>
      </ea-popper>
    </ea-col>
  </ea-row>

  <ea-row justify="space-between">
    <ea-col span="6">
      <ea-popper placement="left-end">
        left-end
        <ea-button type="primary" slot="reference">left-end</ea-button>
      </ea-popper>
    </ea-col>
    <ea-col span="6">
      <ea-popper placement="right-end">
        right-end
        <ea-button type="primary" slot="reference">right-end</ea-button>
      </ea-popper>
    </ea-col>
  </ea-row>

  <ea-row justify="center">
    <ea-col span="6">
      <ea-popper placement="bottom-start">
        bottom-start
        <ea-button type="primary" slot="reference">bottom-start</ea-button>
      </ea-popper>
    </ea-col>
    <ea-col span="6">
      <ea-popper placement="bottom">
        bottom
        <ea-button type="primary" slot="reference">bottom</ea-button>
      </ea-popper>
    </ea-col>
    <ea-col span="6">
      <ea-popper placement="bottom-end">
        bottom-end
        <ea-button type="primary" slot="reference">bottom-end</ea-button>
      </ea-popper>
    </ea-col>
  </ea-row>
</div>
```

`js`

```js
const basicExample = {
  overlay: document.querySelector("#basicOverlay"),
  openButton: document.querySelector("#basicOverlayOpenButton"),

  confirmButton: document.querySelector("#basicOverlayConfirmButton"),
  cancelButton: document.querySelector("#basicOverlayCancelButton"),

  show() {
    this.overlay.show();
  },

  hide() {
    this.overlay.hide();
  },

  init() {
    this.openButton.addEventListener("click", () => {
      this.overlay.show();
    });

    this.confirmButton.addEventListener("click", () => {
      console.log("confirm");
      this.overlay.hide();
    });

    this.cancelButton.addEventListener("click", () => {
      console.log("cancel");
      this.overlay.hide();
    });
  },
};
basicExample.init();
```

:::

## 不显示箭头

通过设置 `show-arrow` 控制是否启用箭头效果。

<div id="arrowSection" class="demo">
  <ea-popper placement="top-start" show-arrow="false">
    top-start
    <ea-button type="primary" slot="reference">top-start</ea-button>
  </ea-popper>
  <ea-popper show-arrow="false">
    top
    <ea-button type="primary" slot="reference">top</ea-button>
  </ea-popper>
  <ea-popper placement="top-end" show-arrow="false">
    top-end
    <ea-button type="primary" slot="reference">top-end</ea-button>
  </ea-popper>
</div>

::: details 查看代码

`html`

```html
<div id="arrowSection" class="demo">
  <ea-popper placement="top-start" show-arrow="false">
    top-start
    <ea-button type="primary" slot="reference">top-start</ea-button>
  </ea-popper>
  <ea-popper show-arrow="false">
    top
    <ea-button type="primary" slot="reference">top</ea-button>
  </ea-popper>
  <ea-popper placement="top-end" show-arrow="false">
    top-end
    <ea-button type="primary" slot="reference">top-end</ea-button>
  </ea-popper>
</div>
```

`js`

```js
const arrowExample = {
  referenceElements: document.querySelectorAll("#arrowSection ea-popper"),

  init() {
    this.referenceElements.forEach((referenceElement) => {
      referenceElement.addEventListener("mouseenter", (e) => {
        referenceElement.show();

        referenceElement.addEventListener(
          "mouseleave",
          () => {
            referenceElement.hide();
          },
          { once: true }
        );
      });
    });
  },
};
```

:::

## Popper API

| 参数       | 说明                                      | 类型    | 可选值                                                                                                                                                               | 默认值                                          |
| ---------- | ----------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| width      | 宽度，单位 px。                           | number  | —                                                                                                                                                                    | 150                                             |
| placement  | 气泡的出现位置。                          | string  | `'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'` | top                                             |
| show-arrow | 是否显示箭头                              | boolean |                                                                                                                                                                      | false                                           |
| status     | 控制 Popper 显隐的属性                    | boolean |                                                                                                                                                                      | false                                           |
| offset     | 气泡出现的位置偏移量。                    | string  | —                                                                                                                                                                    | <span style="white-space: nowrap;">"0 0"</span> |
| flip       | 是否在超过原 placement 视口时，进行翻转。 | boolean | —                                                                                                                                                                    | true                                            |

## CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称      | 说明                                  |
| --------- | ------------------------------------- |
| container | Popper 外层容器                       |
| reference | 触发 Popper 显示的 HTML 元素 的父容器 |
| original  | Popper 内容容器                       |

## Events

| 事件名称 | 说明                         | 回调参数     |
| -------- | ---------------------------- | ------------ |
| show     | 开启 Popper 时触发的事件     | `() => void` |
| shown    | 开启 Popper 的动画结束时触发 | `() => void` |
| hide     | 关闭 Popper 时触发的事件     | `() => void` |
| hidden   | 关闭 Popper 的动画结束时触发 | `() => void` |

## Methods

| 名称   | 详情                 | 类型         |
| ------ | -------------------- | ------------ |
| show   | 显示 Popper          | `() => void` |
| hide   | 隐藏 Popper          | `() => void` |
| toggle | 切换 Popper 显示状态 | `() => void` |

## Slots

| 名称      | 描述                             |
| --------- | -------------------------------- |
| -         | Popper 内容插槽                  |
| reference | 触发 Popper 显示的 HTML 元素插槽 |
