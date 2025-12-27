<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  import("../dist/components/index.js")
  import("../dist/assets/icon.css")

    // ------- 基本用法 -------
    // #region
    const basicExample = {
        overlay: document.querySelector('#basicOverlay'),
        openButton: document.querySelector('#basicOverlayOpenButton'),

        confirmButton: document.querySelector('#basicOverlayConfirmButton'),
        cancelButton: document.querySelector('#basicOverlayCancelButton'),

        show() {
            this.overlay.show();
        },

        hide() {
            this.overlay.hide();
        },

        init() {
            this.openButton.addEventListener('click', () => {
                this.overlay.show();
            });

            this.confirmButton.addEventListener('click', () => {
                console.log('confirm');
                this.overlay.hide();
            })

            this.cancelButton.addEventListener('click', () => {
                console.log('cancel');
                this.overlay.hide();
            })
        }
    }
    basicExample.init();
    // #endregion
    // ------- end -------

    // ------- 模态效果 -------
    // #region
    const modalExample = {
        overlay: document.querySelector('#modalOverlay'),
        openButton: document.querySelector('#modalOverlayOpenButton'),

        confirmButton: document.querySelector('#modalOverlayConfirmButton'),
        cancelButton: document.querySelector('#modalOverlayCancelButton'),

        show() {
            this.overlay.show();
        },

        hide() {
            this.overlay.hide();
        },

        init() {
            this.openButton.addEventListener('click', () => {
                this.overlay.show();
            });

            this.confirmButton.addEventListener('click', () => {
                console.log('confirm');
                this.overlay.hide();
            })

            this.cancelButton.addEventListener('click', () => {
                console.log('cancel');
                this.overlay.hide();
            })
        }
    }
    modalExample.init();
    // #endregion
    // ------- end -------


    // ------- 模态效果 -------
    // #region
    const beforeCloseExample = {
        overlay: document.querySelector('#beforeCloseOverlay'),
        openButton: document.querySelector('#beforeCloseOverlayOpenButton'),

        init() {
            this.openButton.addEventListener('click', () => {
                this.overlay.show();
            });

            this.overlay.addEventListener("before-close", async (e) => {
                console.log("before-close");
                await new Promise(resolve => setTimeout(resolve, 2000));
                e.detail.done();
            });
        }
    }
    beforeCloseExample.init();
    // #endregion
    // ------- end -------
})
</script>

<style scoped>
ea-card {
  height: 100%;
}

ea-card::part(container) {
  display: flex;
  flex-direction: column;

  height: 100%;
}

ea-card::part(content-wrap) {
  flex: 1;
}

.ea-card-footer {
    text-align: right;
}
</style>

# Overlay 遮罩层

该组件主要用于该组件库的弹窗场景，如模态框、抽屉、提示框、确认框等等。

该文档主要用于描述该组件的一些方法、事件和使用，方便对上述提到的组件进行二次开发。

## 引入

> `js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-overlay/index.js";
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
ea-card {
  height: 100%;
}

ea-card::part(container) {
  display: flex;
  flex-direction: column;

  height: 100%;
}

ea-card::part(content-wrap) {
  flex: 1;
}

.ea-card-footer {
  text-align: right;
}
```

:::

## 基本用法

`ea-overlay` 提供了一个基础的弹出层，可以通过 `show()` / `hide()` 来控制显示与隐藏。

<div class="demo">
  <ea-overlay id="basicOverlay">
    <ea-card header="title">
      <p>message</p>
      <section class="ea-card-footer" slot="footer">
        <ea-button id="basicOverlayCancelButton">Cancel</ea-button>
        <ea-button id="basicOverlayConfirmButton" type="primary">
          Confirm
        </ea-button>
      </section>
    </ea-card>
  </ea-overlay>
  <ea-button id="basicOverlayOpenButton" type="primary">open</ea-button>
</div>

::: code-group

```html
<div class="demo">
  <ea-overlay id="basicOverlay">
    <ea-card header="title">
      <p>message</p>
      <section class="ea-card-footer" slot="footer">
        <ea-button id="basicOverlayCancelButton">Cancel</ea-button>
        <ea-button id="basicOverlayConfirmButton" type="primary">
          Confirm
        </ea-button>
      </section>
    </ea-card>
  </ea-overlay>
  <ea-button id="basicOverlayOpenButton" type="primary">open</ea-button>
</div>
```

```js [显隐控制]
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

## 模态效果

通过设置 `modal` 控制是否启用模态效果。

<div class="demo">
  <ea-overlay id="modalOverlay" modal="false">
    <ea-card header="title">
      <p>message</p>
      <section class="ea-card-footer" slot="footer">
        <ea-button id="modalOverlayCancelButton">Cancel</ea-button>
        <ea-button id="modalOverlayConfirmButton" type="primary">
          Confirm
        </ea-button>
      </section>
    </ea-card>
  </ea-overlay>
  <ea-button id="modalOverlayOpenButton" type="primary">open</ea-button>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-overlay id="modalOverlay" modal="false">
    <ea-card header="title">
      <p>message</p>
      <section class="ea-card-footer" slot="footer">
        <ea-button id="modalOverlayCancelButton">Cancel</ea-button>
        <ea-button id="modalOverlayConfirmButton" type="primary">
          Confirm
        </ea-button>
      </section>
    </ea-card>
  </ea-overlay>
  <ea-button id="modalOverlayOpenButton" type="primary">open</ea-button>
</div>
```

:::

## 关闭前触发

关闭前触发，可以拦截关闭，需调用 `e.detail.done()` 才能完成关闭。需要设置`before-close`属性。

::: tip
\< 手动调用 `overlay.hide()` \> + \< 设置 `close-on-click-modal="false"` \>可达到同样的效果。
:::

<div class="demo">
  <ea-overlay id="beforeCloseOverlay" before-close>
    <ea-card header="title">
      <p>
        This Overlay will be hidden 2000 milliseconds after clicking on the mask
        layer
      </p>
    </ea-card>
  </ea-overlay>
  <ea-button id="beforeCloseOverlayOpenButton" type="primary">open</ea-button>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-overlay id="beforeCloseOverlay" before-close>
    <ea-card header="title">
      <p>
        This Overlay will be hidden 2000 milliseconds after clicking on the mask
        layer
      </p>
    </ea-card>
  </ea-overlay>
  <ea-button id="beforeCloseOverlayOpenButton" type="primary">open</ea-button>
</div>
```

:::

## Overlay Attributes API

### Main API

| 参数                 | 说明                       | 类型    | 可选值 | 默认值 |
| -------------------- | -------------------------- | ------- | ------ | ------ |
| status               | 控制 Overlay 显隐的属性    | boolean | —      | false  |
| modal                | 是否显示遮罩层。           | boolean | —      | true   |
| before-close         | 关闭前触发，可以拦截关闭。 | boolean | —      | false  |
| close-on-click-modal | 点击遮罩层是否关闭。       | boolean | —      | true   |

### CSS API

| 参数                | 说明                                                                                                                             | 类型   | 可选值 | 默认值                                                                                                  |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------ | ------ | ------------------------------------------------------------------------------------------------------- |
| z-index             | <ea-link type="primary" href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/z-index">MDN：z-index</ea-link>                   | String | —      | 1000                                                                                                    |
| background-color    | <ea-link type="primary" href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-color">MDN：background-color</ea-link> | String | —      | `rgba(0, 0, 0, 0.4)`                                                                                    |
| content-width       | 默认插槽的宽度                                                                                                                   | String | —      | `50%`                                                                                                   |
| content-height      | 默认插槽的高度                                                                                                                   | String | —      | `50%`                                                                                                   |
| content-left        | 默认插槽的 left 定位                                                                                                             | String | —      | `50%`                                                                                                   |
| content-top         | 默认插槽的 top 定位                                                                                                              | String | —      | `50%`                                                                                                   |
| content-translate-x | 默认插槽的 translate-x 偏移量                                                                                                    | String | —      | `-50%`                                                                                                  |
| content-translate-y | 默认插槽的 translate-y 偏移量                                                                                                    | String | —      | `-50%`                                                                                                  |
| content-transform   | 默认插槽的 transform 属性                                                                                                        | String | —      | `translate(`<br/>`var(--ea-overlay-content-translate-x),`<br/> `var(--ea-overlay-content-translate-y))` |

## CSS Part

### Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称      | 说明             |
| --------- | ---------------- |
| container | overlay 外层容器 |
| mask      | overlay 遮罩层   |
| content   | overlay 内容容器 |

### CSS Variables

等同于 CSS API

```css
ea-overlay {
  --ea-overlay-z-index: 1000;
  --ea-overlay-background-color: rgba(0, 0, 0, 0.4);

  --ea-overlay-content-left: 50%;
  --ea-overlay-content-top: 50%;

  --ea-overlay-content-translate-x: calc(0% - var(--ea-overlay-content-left));
  --ea-overlay-content-translate-y: calc(0% - var(--ea-overlay-content-top));
  --ea-overlay-content-transform: translate(
    var(--ea-overlay-content-translate-x),
    var(--ea-overlay-content-translate-y)
  );

  --ea-overlay-content-width: 50%;
  --ea-overlay-content-height: 50%;
}
```

## Events

| 事件名称     | 说明                          | 回调参数                              |
| ------------ | ----------------------------- | ------------------------------------- |
| open         | 开启 Overlay 时触发的事件     | `() => void`                          |
| opened       | 开启 Overlay 的动画结束时触发 | `() => void`                          |
| close        | 关闭 Overlay 时触发的事件     | `() => void`                          |
| closed       | 关闭 Overlay 的动画结束时触发 | `() => void`                          |
| before-close | 关闭 Overlay 前触发的事件     | `(e.detail.done: () => void) => void` |

## Methods

| 名称 | 详情         | 类型         |
| ---- | ------------ | ------------ |
| show | 显示 Overlay | `() => void` |
| hide | 隐藏 Overlay | `() => void` |

## Slots

| 名称 | 描述             |
| ---- | ---------------- |
| -    | Overlay 内容插槽 |
