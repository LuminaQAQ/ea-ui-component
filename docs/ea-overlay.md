<script setup>
import { onMounted } from 'vue'
import "../dist/components/index.js"
import "../dist/assets/icon.css"

onMounted(async () => {
  await customElements.whenDefined('ea-overlay');

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
      });

      this.cancelButton.addEventListener('click', () => {
        console.log('cancel');
        this.overlay.hide();
      });
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
      });

      this.cancelButton.addEventListener('click', () => {
        console.log('cancel');
        this.overlay.hide();
      });
    }
  }
  modalExample.init();
  // #endregion
  // ------- end -------

  // ------- 关闭前触发 -------
  // #region
  const beforeCloseExample = {
    overlay: document.querySelector("#beforeCloseOverlay"),
    openButton: document.querySelector("#beforeCloseOverlayOpenButton"),

    init() {
      this.openButton.addEventListener("click", () => {
        this.overlay.show();
      });

      this.overlay.beforeClose = async done => {
        console.log("before-close");
        await new Promise(resolve => setTimeout(resolve, 2000));
        done();
      };
    },
  };
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

ea-card::part(content) {
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

## 自定义样式

移步到 [CSS Part](#overlay-css-part)。

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

ea-card::part(content) {
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
        <ea-button id="basicOverlayConfirmButton" variant="primary">
          Confirm
        </ea-button>
      </section>
    </ea-card>
  </ea-overlay>
  <ea-button id="basicOverlayOpenButton" variant="primary">open</ea-button>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo">
  <ea-overlay id="basicOverlay">
    <ea-card header="title">
      <p>message</p>
      <section class="ea-card-footer" slot="footer">
        <ea-button id="basicOverlayCancelButton">Cancel</ea-button>
        <ea-button id="basicOverlayConfirmButton" variant="primary">
          Confirm
        </ea-button>
      </section>
    </ea-card>
  </ea-overlay>
  <ea-button id="basicOverlayOpenButton" variant="primary">open</ea-button>
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

::::

## 模态效果

通过设置 `modal` 控制是否启用模态效果。

<div class="demo">
  <ea-overlay id="modalOverlay" modal="false">
    <ea-card header="title">
      <p>message</p>
      <section class="ea-card-footer" slot="footer">
        <ea-button id="modalOverlayCancelButton">Cancel</ea-button>
        <ea-button id="modalOverlayConfirmButton" variant="primary">
          Confirm
        </ea-button>
      </section>
    </ea-card>
  </ea-overlay>
  <ea-button id="modalOverlayOpenButton" variant="primary">open</ea-button>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-overlay id="modalOverlay" modal="false">
    <ea-card header="title">
      <p>message</p>
      <section class="ea-card-footer" slot="footer">
        <ea-button id="modalOverlayCancelButton">Cancel</ea-button>
        <ea-button id="modalOverlayConfirmButton" variant="primary">
          Confirm
        </ea-button>
      </section>
    </ea-card>
  </ea-overlay>
  <ea-button id="modalOverlayOpenButton" variant="primary">open</ea-button>
</div>
```

:::

## 关闭前触发

关闭前触发，可以拦截关闭，需调用 `done()` 回调函数才能完成关闭。调用 `done(true)` 可以取消关闭。通过设置 `beforeClose` 属性为一个函数来实现。

::: tip
\< 手动调用 `overlay.hide()` \> + \< 设置 `close-on-click-modal="false"` \>可达到同样的效果。
:::

<div class="demo">
  <ea-overlay id="beforeCloseOverlay" close-on-click-modal>
    <ea-card header="title">
      <p>
        This Overlay will be hidden 2000 milliseconds after clicking on the mask
        layer
      </p>
    </ea-card>
  </ea-overlay>
  <ea-button id="beforeCloseOverlayOpenButton" variant="primary">open</ea-button>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo">
  <ea-overlay id="beforeCloseOverlay" close-on-click-modal>
    <ea-card header="title">
      <p>
        This Overlay will be hidden 2000 milliseconds after clicking on the mask
        layer
      </p>
    </ea-card>
  </ea-overlay>
  <ea-button id="beforeCloseOverlayOpenButton" variant="primary">open</ea-button>
</div>
```

```js
const overlay = document.querySelector("#beforeCloseOverlay");

overlay.beforeClose = async done => {
  console.log("before-close");
  await new Promise(resolve => setTimeout(resolve, 2000));
  done();
};
```

:::

::::

## Overlay API

### Overlay Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| visible | 是否可见 | Boolean | — | false |
| modal | 是否显示遮罩层 | Boolean | — | true |
| close-on-click-modal | 点击遮罩层是否关闭 | Boolean | — | true |
| close-on-press-escape | 按 ESC 键是否关闭 | Boolean | — | true |
| append-to-body | 是否追加到 body | Boolean | — | false |
| append-to | 追加到指定选择器容器 | String | — | body |
| z-index | z-index 层级 | String | — | '' |
| background-color | 遮罩层背景色 | String | — | '' |
| content-width | 内容宽度 | String | — | '' |
| content-max-width | 内容最大宽度 | String | — | '' |
| content-height | 内容高度 | String | — | '' |
| beforeClose <PropTag /> | 关闭前触发的回调函数，接收 `done` 回调作为参数。`done()` 确认关闭，`done(true)` 取消关闭 | Function | — | null |

### Overlay CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称 | 说明 |
| --- | --- |
| container | overlay 外层容器 |
| mask | overlay 遮罩层 |
| content | overlay 内容容器 |

### Overlay CSS Variables

```css
ea-overlay {
  --ea-overlay-z-index: 3000;
  --ea-overlay-background-color: rgba(0, 0, 0, 0.4);
  --ea-overlay-content-width: 50%;
  --ea-overlay-content-max-width: none;
  --ea-overlay-content-height: 50%;
  --ea-overlay-transition: var(--transition-normal);
}
```

### Overlay Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| ea-open | 开启 Overlay 时触发的事件 | — |
| ea-opened | 开启 Overlay 的动画结束时触发 | — |
| ea-close | 关闭 Overlay 时触发的事件 | — |
| ea-closed | 关闭 Overlay 的动画结束时触发 | — |

### Overlay Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| show | 显示 Overlay | — |
| hide | 隐藏 Overlay | — |

### Overlay Slots

| 名称 | 说明 |
| --- | --- |
| default | Overlay 内容插槽 |
