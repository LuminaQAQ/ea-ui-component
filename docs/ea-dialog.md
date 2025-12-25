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

<style>
.custom-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

ea-button::part(icon) {
  color: white;
}
</style>

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

::: code-group

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

```css
.custom-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

ea-button::part(icon) {
  color: white;
}
```

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

::: code-group

```html
<div class="demo">
  <ea-button id="customHeaderDialogOpenBtn" plain
    >Click to open the Dialog</ea-button
  >

  <ea-dialog id="customHeaderDialog" width="500px">
    <header class="custom-header" slot="header">
      <span>This is a custom header!</span>
      <ea-button
        id="customHeaderDialogCloseIcon"
        type="danger"
        icon="icon-coffee"
        circle
      ></ea-button>
    </header>
    <span>This is a message</span>
    <footer slot="footer">
      <div class="dialog-footer">
        <ea-button id="customHeaderDialogCancelBtn">Cancel</ea-button>
        <ea-button id="customHeaderDialogConfirmBtn" type="primary"
          >Confirm</ea-button
        >
      </div>
    </footer>
  </ea-dialog>
</div>
```

```js
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
```

:::

## 嵌套对话框

支持在对话框内部再嵌套 `ea-dialog`，内部对话框通常需要 `append-to-body` 来确保层级正确。

<div class="demo">
  <ea-button id="nestingDialogOpenBtn" plain> Open the outer Dialog </ea-button>

  <ea-dialog id="nestingOuterDialog" title="Outer Dialog" width="800px">
    <span>This is the outer Dialog</span>
    <ea-dialog
      id="nestingInnererDialog"
      width="500px"
      title="Inner Dialog"
      append-to-body
    >
      <span>This is the inner Dialog</span>
    </ea-dialog>
    <section class="dialog-footer" slot="footer">
      <ea-button id="nestingDialogCancelBtn">Cancel</ea-button>
      <ea-button id="nestingDialogInnerOpenBtn" type="primary">
        Open the inner Dialog
      </ea-button>
    </section>
  </ea-dialog>
</div>

::: code-group

```html
<div class="demo">
  <ea-button id="nestingDialogOpenBtn" plain> Open the outer Dialog </ea-button>

  <ea-dialog id="nestingOuterDialog" title="Outer Dialog" width="800px">
    <span>This is the outer Dialog</span>

    <ea-dialog
      id="nestingInnererDialog"
      width="500px"
      title="Inner Dialog"
      append-to-body
    >
      <span>This is the inner Dialog</span>
    </ea-dialog>

    <section class="dialog-footer" slot="footer">
      <ea-button id="nestingDialogCancelBtn">Cancel</ea-button>
      <ea-button id="nestingDialogInnerOpenBtn" type="primary">
        Open the inner Dialog
      </ea-button>
    </section>
  </ea-dialog>
</div>
```

```js
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
```

:::

## 内容居中

设置 `center` 属性可以使内容在对话框中垂直居中显示。

<div class="demo">
  <ea-button id="centerDialogOpenBtn" plain>
    Click to open the Dialog
  </ea-button>
  <ea-dialog id="centerDialog" title="Tips" width="500px" center>
    <span>
      It should be noted that the content will not be aligned in center by
      default
    </span>
    <section slot="footer">
      <div class="dialog-footer">
        <ea-button id="centerDialogCancelBtn">Cancel</ea-button>
        <ea-button id="centerDialogConfirmBtn" type="primary">
          Confirm
        </ea-button>
      </div>
    </section>
  </ea-dialog>
</div>

::: code-group

```html
<div class="demo">
  <ea-button id="centerDialogOpenBtn" plain>
    Click to open the Dialog
  </ea-button>

  <ea-dialog id="centerDialog" title="Tips" width="500px" center>
    <span>
      It should be noted that the content will not be aligned in center by
      default
    </span>
    <section slot="footer">
      <div class="dialog-footer">
        <ea-button id="centerDialogCancelBtn">Cancel</ea-button>
        <ea-button id="centerDialogConfirmBtn" type="primary">
          Confirm
        </ea-button>
      </div>
    </section>
  </ea-dialog>
</div>
```

```js
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
```

:::

## 可拖拽

设置 `draggable` 属性使对话框可通过标题拖动。

<div class="demo">
  <ea-button id="draggableDialogOpenBtn" plain>
    Click to open the Dialog
  </ea-button>

  <ea-dialog id="draggableDialog" title="Tips" width="500px" draggable>
    <span>This is a message</span>
    <section slot="footer">
      <div class="dialog-footer">
        <ea-button id="draggableDialogCancelBtn">Cancel</ea-button>
        <ea-button id="draggableDialogConfirmBtn" type="primary">
          Confirm
        </ea-button>
      </div>
    </section>
  </ea-dialog>
</div>

::: code-group

```html
<div class="demo">
  <ea-button id="draggableDialogOpenBtn" plain>
    Click to open the Dialog
  </ea-button>

  <ea-dialog id="draggableDialog" title="Tips" width="500px" draggable>
    <span>This is a message</span>
    <section slot="footer">
      <div class="dialog-footer">
        <ea-button id="draggableDialogCancelBtn">Cancel</ea-button>
        <ea-button id="draggableDialogConfirmBtn" type="primary">
          Confirm
        </ea-button>
      </div>
    </section>
  </ea-dialog>
</div>
```

```js
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
```

:::

## 全屏

设置 `fullscreen` 属性使对话框进入全屏展示模式。

<div class="demo">
  <ea-button id="fullscreenDialogOpenBtn" plain>
    Open the fullscreen Dialog
  </ea-button>

  <ea-dialog id="fullscreenDialog" title="Tips" width="500px" fullscreen>
    <span>This is a message</span>
    <section slot="footer">
      <div class="dialog-footer">
        <ea-button id="fullscreenDialogCancelBtn">Cancel</ea-button>
        <ea-button id="fullscreenDialogConfirmBtn" type="primary">
          Confirm
        </ea-button>
      </div>
    </section>
  </ea-dialog>
</div>

::: code-group

```html
<div class="demo">
  <ea-button id="fullscreenDialogOpenBtn" plain>
    Open the fullscreen Dialog
  </ea-button>

  <ea-dialog id="fullscreenDialog" title="Tips" width="500px" fullscreen>
    <span>This is a message</span>
    <section slot="footer">
      <div class="dialog-footer">
        <ea-button id="fullscreenDialogCancelBtn">Cancel</ea-button>
        <ea-button id="fullscreenDialogConfirmBtn" type="primary">
          Confirm
        </ea-button>
      </div>
    </section>
  </ea-dialog>
</div>
```

```js
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
```

:::

## 模态/非模态

通过 `modal` 属性控制遮罩行为，`modal="false"` 可关闭遮罩（非模态）。

<div class="demo">
  <ea-button id="modalDialogOpenBtn" plain> Open the modal Dialog </ea-button>

  <ea-dialog id="modalDialog" title="Tips" width="500px" modal="false">
    <span>This is a message</span>
    <section slot="footer">
      <div class="dialog-footer">
        <ea-button id="modalDialogCancelBtn">Cancel</ea-button>
        <ea-button id="modalDialogConfirmBtn" type="primary">
          Confirm
        </ea-button>
      </div>
    </section>
  </ea-dialog>
</div>

::: code-group

```html
<div class="demo">
  <ea-button id="modalDialogOpenBtn" plain> Open the modal Dialog </ea-button>

  <ea-dialog id="modalDialog" title="Tips" width="500px" modal="false">
    <span>This is a message</span>
    <section slot="footer">
      <div class="dialog-footer">
        <ea-button id="modalDialogCancelBtn">Cancel</ea-button>
        <ea-button id="modalDialogConfirmBtn" type="primary">
          Confirm
        </ea-button>
      </div>
    </section>
  </ea-dialog>
</div>
```

```js
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
```

:::

## 事件

组件会触发以下事件：

- `open`：打开开始
- `opened`：打开完成
- `before-close`：关闭前（可通过事件 detail 提供的 done() 异步控制关闭）
- `close`：开始关闭
- `closed`：关闭完成

<div class="demo">
  <ea-button id="eventsDialogOpenBtn" plain> Open the events Dialog </ea-button>

  <ea-dialog id="eventsDialog" title="Tips" width="500px" before-close>
    <span>This is a message</span>
    <section slot="footer">
      <div class="dialog-footer">
        <ea-button id="eventsDialogCancelBtn">Cancel</ea-button>
        <ea-button id="eventsDialogConfirmBtn" type="primary">
          Confirm
        </ea-button>
      </div>
    </section>
  </ea-dialog>
</div>

::: code-group

```html
<div class="demo">
  <ea-button id="eventsDialogOpenBtn" plain> Open the events Dialog </ea-button>

  <ea-dialog id="eventsDialog" title="Tips" width="500px" before-close>
    <span>This is a message</span>
    <section slot="footer">
      <div class="dialog-footer">
        <ea-button id="eventsDialogCancelBtn">Cancel</ea-button>
        <ea-button id="eventsDialogConfirmBtn" type="primary">
          Confirm
        </ea-button>
      </div>
    </section>
  </ea-dialog>
</div>
```

```js
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

    this.dialog.addEventListener("before-close", e => {
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
```

:::

## Attributes（属性）

下面列出 `ea-dialog` 常用属性、类型、说明与默认值，便于查阅。

| 参数             | 说明                       | 类型      | 可选值        | 默认值  |
| ---------------- | -------------------------- | --------- | ------------- | ------- |
| `title`          | 对话框标题                 | `string`  | —             | `""`    |
| `width`          | 对话框宽度（支持 css 值）  | `string`  | —             | `50%`   |
| `visible`        | 是否可见                   | `boolean` | `true\|false` | `false` |
| `center`         | 内容是否垂直居中           | `boolean` | `true\|false` | `false` |
| `draggable`      | 是否可拖拽                 | `boolean` | `true\|false` | `false` |
| `fullscreen`     | 是否全屏显示               | `boolean` | `true\|false` | `false` |
| `modal`          | 是否显示遮罩               | `boolean` | `true\|false` | `true`  |
| `append-to-body` | 是否将弹窗追加到 body      | `boolean` | `true\|false` | `false` |
| `append-to`      | 指定追加到的选择器         | `string`  | —             | `body`  |
| `show-close`     | 是否显示右上角关闭图标     | `boolean` | `true\|false` | `true`  |
| `before-close`   | 是否启用 before-close 拦截 | `boolean` | `true\|false` | `false` |

## Methods（方法）

- `show()`：显示对话框。
- `hide()`：隐藏对话框。
- `resetPosition()`：重置对话框位置（用于可拖拽场景）。

示例：

```js
const d = document.querySelector("#basicDialog");
d.show();
d.hide();
```

## CSS Part / 自定义样式

组件在 shadow DOM 中使用下列 part/class，可以通过 `::part()` 或全局样式覆盖（对非 shadow 部分）。

| 名称         | 说明                              |
| ------------ | --------------------------------- |
| `container`  | 对话框根容器（`.ea-dialog-main`） |
| `header`     | 头部（标题或自定义头部 slot）     |
| `title`      | 标题文本                          |
| `close-icon` | 右上角关闭图标                    |
| `content`    | 主体内容                          |
| `footer`     | 底部 slot                         |

示例：改变按钮 icon 颜色

```css
ea-dialog::part(icon) {
  color: white;
}
```
