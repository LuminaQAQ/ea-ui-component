<script setup>
import { onMounted, ref } from 'vue'

onMounted(() => {
  import("../dist/components/index.js")
  import("../dist/assets/icon.css")

        // ------- 基础用法 -------
      // #region
      const basicExample = {
        dialog: document.querySelector("#basicDialog"),
        openBtn: document.querySelector("#basicDialogOpenBtn"),
        cancelBtn: document.querySelector("#basicDialogCancelBtn"),
        confirmBtn: document.querySelector("#basicDialogConfirmBtn"),

        init() {
          this.openBtn.addEventListener("click", () => {
            this.dialog.show();
          });

          this.cancelBtn.addEventListener("click", () => {
            this.dialog.hide();
          });

          this.confirmBtn.addEventListener("click", () => {
            this.dialog.hide();
          });
        },
      };
      basicExample.init();
      // #endregion
      // ------- end -------

      // ------- 自定义头部 -------
      // #region
      const customHeaderExample = {
        dialog: document.querySelector("#customHeaderDialog"),
        openBtn: document.querySelector("#customHeaderDialogOpenBtn"),
        cancelBtn: document.querySelector("#customHeaderDialogCancelBtn"),
        confirmBtn: document.querySelector("#customHeaderDialogConfirmBtn"),
        closeIcon: document.querySelector("#customHeaderDialogCloseIcon"),

        init() {
          this.openBtn.addEventListener("click", () => {
            this.dialog.visible = true;
          });

          this.cancelBtn.addEventListener("click", () => {
            this.dialog.visible = false;
          });

          this.confirmBtn.addEventListener("click", () => {
            this.dialog.visible = false;
          });

          this.closeIcon.addEventListener("click", () => {
            this.dialog.visible = false;
          });
        },
      };
      customHeaderExample.init();
      // #endregion
      // ------- end -------

      // ------- 嵌套的对话框 -------
      // #region
      const nestingExample = {
        outerDialog: document.querySelector("#nestingOuterDialog"),
        outerOpenBtn: document.querySelector("#nestingDialogOpenBtn"),
        innerDialog: document.querySelector("#nestingInnererDialog"),

        cancelBtn: document.querySelector("#nestingDialogCancelBtn"),
        innerOpenBtn: document.querySelector("#nestingDialogInnerOpenBtn"),

        init() {
          this.outerOpenBtn.addEventListener("click", () => {
            this.outerDialog.visible = true;
          });

          this.innerOpenBtn.addEventListener("click", () => {
            this.innerDialog.visible = true;
          });

          this.cancelBtn.addEventListener("click", () => {
            this.outerDialog.visible = false;
          });
        },
      };
      nestingExample.init();
      // #endregion
      // ------- end -------

      // ------- 内容居中 -------
      // #region
      const centerExample = {
        dialog: document.querySelector("#centerDialog"),
        openBtn: document.querySelector("#centerDialogOpenBtn"),
        cancelBtn: document.querySelector("#centerDialogCancelBtn"),
        confirmBtn: document.querySelector("#centerDialogConfirmBtn"),

        init() {
          this.openBtn.addEventListener("click", () => {
            this.dialog.show();
          });

          this.cancelBtn.addEventListener("click", () => {
            this.dialog.hide();
          });

          this.confirmBtn.addEventListener("click", () => {
            this.dialog.hide();
          });
        },
      };
      centerExample.init();
      // #endregion
      // ------- end -------

      // ------- 可拖拽对话框 -------
      // #region
      const draggableExample = {
        dialog: document.querySelector("#draggableDialog"),
        openBtn: document.querySelector("#draggableDialogOpenBtn"),
        cancelBtn: document.querySelector("#draggableDialogCancelBtn"),
        confirmBtn: document.querySelector("#draggableDialogConfirmBtn"),

        init() {
          this.openBtn.addEventListener("click", () => {
            this.dialog.show();
          });

          this.cancelBtn.addEventListener("click", () => {
            this.dialog.hide();
          });

          this.confirmBtn.addEventListener("click", () => {
            this.dialog.hide();
          });
        },
      };
      draggableExample.init();
      // #endregion
      // ------- end -------

      // ------- 全屏 -------
      // #region
      const fullscreenExample = {
        dialog: document.querySelector("#fullscreenDialog"),
        openBtn: document.querySelector("#fullscreenDialogOpenBtn"),
        cancelBtn: document.querySelector("#fullscreenDialogCancelBtn"),
        confirmBtn: document.querySelector("#fullscreenDialogConfirmBtn"),

        init() {
          this.openBtn.addEventListener("click", () => {
            this.dialog.show();
          });

          this.cancelBtn.addEventListener("click", () => {
            this.dialog.hide();
          });

          this.confirmBtn.addEventListener("click", () => {
            this.dialog.hide();
          });
        },
      };
      fullscreenExample.init();
      // #endregion
      // ------- end -------

      // ------- 模态框 -------
      // #region
      const modalExample = {
        dialog: document.querySelector("#modalDialog"),
        openBtn: document.querySelector("#modalDialogOpenBtn"),
        cancelBtn: document.querySelector("#modalDialogCancelBtn"),
        confirmBtn: document.querySelector("#modalDialogConfirmBtn"),

        init() {
          this.openBtn.addEventListener("click", () => {
            this.dialog.show();
          });

          this.cancelBtn.addEventListener("click", () => {
            this.dialog.hide();
          });

          this.confirmBtn.addEventListener("click", () => {
            this.dialog.hide();
          });
        },
      };
      modalExample.init();
      // #endregion
      // ------- end -------

      // ------- Events -------
      // #region
      const eventsExample = {
        dialog: document.querySelector("#eventsDialog"),
        openBtn: document.querySelector("#eventsDialogOpenBtn"),
        cancelBtn: document.querySelector("#eventsDialogCancelBtn"),
        confirmBtn: document.querySelector("#eventsDialogConfirmBtn"),

        init() {
          this.openBtn.addEventListener("click", () => {
            this.dialog.show();
          });

          this.cancelBtn.addEventListener("click", () => {
            this.dialog.hide();
          });

          this.confirmBtn.addEventListener("click", () => {
            this.dialog.hide();
          });

          this.dialog.addEventListener("open", () => {
            console.log("open");
          });

          this.dialog.addEventListener("opened", () => {
            console.log("opened");
          });

          this.dialog.addEventListener("before-close", (e) => {
            const { done } = e.detail;
            console.log("before-close");
            done();
          });

          this.dialog.addEventListener("close", () => {
            console.log("close");
          });

          this.dialog.addEventListener("closed", () => {
            console.log("closed");
          });
        },
      };
      eventsExample.init();
      // #endregion
      // ------- end -------

})
</script>

# Dialog 对话框

用于弹出交互层，显示重要信息或要求用户确认/输入。

## 引入

> `js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-dialog/index.js";
  import "./node_modules/easy-component-ui/components/ea-button/index.js"; // 示例中使用到按钮
</script>
```

> `css`

```html
<link
  rel="stylesheet"
  href="./node_modules/easy-component-ui/components/ea-icon/index.css"
/>
```

## 基础用法

使用 `ea-dialog` 包裹对话框内容，通过 `show()` / `hide()` 或 `visible` / `visible = true/false` 控制显示。

<div class="demo">
  <ea-button id="basicDialogOpenBtn" plain>
    Click to open the Dialog
  </ea-button>

  <ea-dialog id="basicDialog" title="Tips" width="500px" append-to-body>
    <span>This is a message</span>
    <section slot="footer">
      <div class="dialog-footer">
        <ea-button id="basicDialogCancelBtn">Cancel</ea-button>
        <ea-button id="basicDialogConfirmBtn" type="primary">
          Confirm
        </ea-button>
      </div>
    </section>
  </ea-dialog>
</div>

::: details 查看代码

`html`

```html
<div class="demo">
  <ea-button id="basicDialogOpenBtn" plain>
    Click to open the Dialog
  </ea-button>

  <ea-dialog id="basicDialog" title="Tips" width="500px">
    <span>This is a message</span>
    <section slot="footer">
      <div class="dialog-footer">
        <ea-button id="basicDialogCancelBtn">Cancel</ea-button>
        <ea-button id="basicDialogConfirmBtn" type="primary">
          Confirm
        </ea-button>
      </div>
    </section>
  </ea-dialog>
</div>
```

`js`

```js
const basicExample = {
  dialog: document.querySelector("#basicDialog"),
  openBtn: document.querySelector("#basicDialogOpenBtn"),
  cancelBtn: document.querySelector("#basicDialogCancelBtn"),
  confirmBtn: document.querySelector("#basicDialogConfirmBtn"),

  init() {
    this.openBtn.addEventListener("click", () => {
      this.dialog.show();
    });

    this.cancelBtn.addEventListener("click", () => {
      this.dialog.hide();
    });

    this.confirmBtn.addEventListener("click", () => {
      this.dialog.hide();
    });
  },
};
basicExample.init();
```

:::

## 自定义头部

通过 `slot="header"` 插入自定义头部内容，可以实现关闭按钮等自定义交互。

<div class="demo">
  <ea-button id="customHeaderDialogOpenBtn" plain>Click to open the Dialog</ea-button>

  <ea-dialog id="customHeaderDialog" width="500px">
    <header class="custom-header" slot="header">
      <span>This is a custom header!</span>
      <ea-button id="customHeaderDialogCloseIcon" type="danger" icon="icon-coffee" circle></ea-button>
    </header>
    <span>This is a message</span>
    <footer slot="footer">
      <div class="dialog-footer">
        <ea-button id="customHeaderDialogCancelBtn">Cancel</ea-button>
        <ea-button id="customHeaderDialogConfirmBtn" type="primary">Confirm</ea-button>
      </div>
    </footer>
  </ea-dialog>
</div>

## 嵌套对话框

支持在对话框内部再嵌套 `ea-dialog`，内部对话框通常需要 `append-to-body` 来确保层级正确。

## 内容居中

设置 `center` 属性可以使内容在对话框中垂直居中显示。

## 可拖拽

设置 `draggable` 属性使对话框可通过标题拖动。

## 全屏

设置 `fullscreen` 属性使对话框进入全屏展示模式。

## 模态/非模态

通过 `modal` 属性控制遮罩行为，`modal="false"` 可关闭遮罩（非模态）。

## 事件

组件会触发以下事件：

- `open`：打开开始
- `opened`：打开完成
- `before-close`：关闭前（可通过事件 detail 提供的 done() 异步控制关闭）
- `close`：开始关闭
- `closed`：关闭完成

示例（监听 `before-close`）:

```js
dialog.addEventListener("before-close", e => {
  const { done } = e.detail;
  // 执行异步操作后调用 done()
  done();
});
```

## 插槽

- `header`：自定义头部内容
- `footer`：自定义底部，如操作按钮

## 属性（常用）

- `title`：对话框标题
- `width`：宽度，如 `500px`
- `center`：Boolean，内容垂直居中
- `draggable`：Boolean，可拖拽
- `fullscreen`：Boolean，全屏
- `modal`：Boolean，是否显示遮罩（默认为 true）
- `before-close`：Boolean，启用 before-close 事件拦截

## 示例脚本

示例中完整交互脚本可参考 `test/ea-dialog.html`（本仓库根目录的 `test` 下）。示例包含打开、关闭、嵌套、监听事件等常用场景。

## 兼容性 & 说明

该组件基于 Web Components/原生自定义元素实现，请确保在使用时已正确引入组件 JS 和 icon CSS 文件，并在 SPA 中按需加载。

## 参考

- 示例文件：`/test/ea-dialog.html`
