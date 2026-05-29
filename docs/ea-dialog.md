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
  const movableExample = {
    dialog: document.querySelector("#movableDialog"),
    openBtn: document.querySelector("#movableDialogOpenBtn"),
    cancelBtn: document.querySelector("#movableDialogCancelBtn"),
    confirmBtn: document.querySelector("#movableDialogConfirmBtn"),

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
  movableExample.init();
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

  // ------- 模态穿透 -------
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

      this.dialog.addEventListener("ea-open", () => {
        console.log("ea-open");
      });

      this.dialog.addEventListener("ea-opened", () => {
        console.log("ea-opened");
      });

      this.dialog.beforeClose = async done => {
        console.log("before-close");
        this.confirmBtn.toggleAttribute("loading", true);

        await new Promise(resolve => setTimeout(resolve, 2000));

        done();
      };

      this.dialog.addEventListener("ea-close", () => {
        console.log("ea-close");
      });

      this.dialog.addEventListener("ea-closed", () => {
        console.log("ea-closed");
        this.confirmBtn.toggleAttribute("loading", false);
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
  import "./node_modules/easy-component-ui/components/ea-button/index.js";
</script>
```

> `css`

::: tip
需要注意的是，如果需要使用到带有图标的属性/组件，需要提前使用 `link` 标签引入图标文件
:::

```html
<link
  rel="stylesheet"
  href="./node_modules/easy-component-ui/components/ea-icon/index.css"
/>
```

## 自定义样式

移步到 [CSS Part](#ea-dialog-css-part)。

## 基础用法

使用 `ea-dialog` 包裹对话框内容，通过 `show()` / `hide()` 或设置 `visible` 属性控制显示。

<div class="demo">
  <ea-button id="basicDialogOpenBtn" plain>
    Click to open the Dialog
  </ea-button>

  <ea-dialog id="basicDialog" heading="Tips" width="500px">
    <span>This is a message</span>
    <section slot="footer">
      <div class="dialog-footer">
        <ea-button id="basicDialogCancelBtn">Cancel</ea-button>
        <ea-button id="basicDialogConfirmBtn" variant="primary">
          Confirm
        </ea-button>
      </div>
    </section>
  </ea-dialog>
</div>

::: details 查看代码

```html
<ea-button id="basicDialogOpenBtn" plain>
  Click to open the Dialog
</ea-button>

<ea-dialog id="basicDialog" heading="Tips" width="500px">
  <span>This is a message</span>
  <section slot="footer">
    <div class="dialog-footer">
      <ea-button id="basicDialogCancelBtn">Cancel</ea-button>
      <ea-button id="basicDialogConfirmBtn" variant="primary">
        Confirm
      </ea-button>
    </div>
  </section>
</ea-dialog>
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
      <ea-button id="customHeaderDialogCloseIcon" variant="danger" icon="xmark" circle></ea-button>
    </header>
    <span>This is a message</span>
    <footer slot="footer">
      <div class="dialog-footer">
        <ea-button id="customHeaderDialogCancelBtn">Cancel</ea-button>
        <ea-button id="customHeaderDialogConfirmBtn" variant="primary">Confirm</ea-button>
      </div>
    </footer>
  </ea-dialog>
</div>

::: details 查看代码

```html
<ea-button id="customHeaderDialogOpenBtn" plain
  >Click to open the Dialog</ea-button
>

<ea-dialog id="customHeaderDialog" width="500px">
  <header class="custom-header" slot="header">
    <span>This is a custom header!</span>
    <ea-button
      id="customHeaderDialogCloseIcon"
      variant="danger"
      icon="xmark"
      circle
    ></ea-button>
  </header>
  <span>This is a message</span>
  <footer slot="footer">
    <div class="dialog-footer">
      <ea-button id="customHeaderDialogCancelBtn">Cancel</ea-button>
      <ea-button id="customHeaderDialogConfirmBtn" variant="primary"
        >Confirm</ea-button
      >
    </div>
  </footer>
</ea-dialog>
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

  <ea-dialog id="nestingOuterDialog" heading="Outer Dialog" width="800px">
    <span>This is the outer Dialog</span>
    <ea-dialog
      id="nestingInnererDialog"
      width="500px"
      heading="Inner Dialog"
      append-to-body
    >
      <span>This is the inner Dialog</span>
    </ea-dialog>
    <section class="dialog-footer" slot="footer">
      <ea-button id="nestingDialogCancelBtn">Cancel</ea-button>
      <ea-button id="nestingDialogInnerOpenBtn" variant="primary">
        Open the inner Dialog
      </ea-button>
    </section>
  </ea-dialog>
</div>

::: details 查看代码

```html
<ea-button id="nestingDialogOpenBtn" plain> Open the outer Dialog </ea-button>

<ea-dialog id="nestingOuterDialog" heading="Outer Dialog" width="800px">
  <span>This is the outer Dialog</span>

  <ea-dialog
    id="nestingInnererDialog"
    width="500px"
    heading="Inner Dialog"
    append-to-body
  >
    <span>This is the inner Dialog</span>
  </ea-dialog>

  <section class="dialog-footer" slot="footer">
    <ea-button id="nestingDialogCancelBtn">Cancel</ea-button>
    <ea-button id="nestingDialogInnerOpenBtn" variant="primary">
      Open the inner Dialog
    </ea-button>
  </section>
</ea-dialog>
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

设置 `center` 属性可以使对话框头部和底部内容水平居中。

<div class="demo">
  <ea-button id="centerDialogOpenBtn" plain>
    Click to open the Dialog
  </ea-button>
  <ea-dialog id="centerDialog" heading="Tips" width="500px" center>
    <span>
      It should be noted that the content will not be aligned in center by
      default
    </span>
    <section slot="footer">
      <div class="dialog-footer">
        <ea-button id="centerDialogCancelBtn">Cancel</ea-button>
        <ea-button id="centerDialogConfirmBtn" variant="primary">
          Confirm
        </ea-button>
      </div>
    </section>
  </ea-dialog>
</div>

::: details 查看代码

```html
<ea-dialog id="centerDialog" heading="Tips" width="500px" center>
  <span>
    It should be noted that the content will not be aligned in center by
    default
  </span>
  <section slot="footer">
    <div class="dialog-footer">
      <ea-button id="centerDialogCancelBtn">Cancel</ea-button>
      <ea-button id="centerDialogConfirmBtn" variant="primary">
        Confirm
      </ea-button>
    </div>
  </section>
</ea-dialog>
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

设置 `movable` 属性使对话框可通过标题栏拖动。

<div class="demo">
  <ea-button id="movableDialogOpenBtn" plain>
    Click to open the Dialog
  </ea-button>

  <ea-dialog id="movableDialog" heading="Tips" width="500px" movable>
    <span>This is a message</span>
    <section slot="footer">
      <div class="dialog-footer">
        <ea-button id="movableDialogCancelBtn">Cancel</ea-button>
        <ea-button id="movableDialogConfirmBtn" variant="primary">
          Confirm
        </ea-button>
      </div>
    </section>
  </ea-dialog>
</div>

::: details 查看代码

```html
<ea-dialog id="movableDialog" heading="Tips" width="500px" movable>
  <span>This is a message</span>
  <section slot="footer">
    <div class="dialog-footer">
      <ea-button id="movableDialogCancelBtn">Cancel</ea-button>
      <ea-button id="movableDialogConfirmBtn" variant="primary">
        Confirm
      </ea-button>
    </div>
  </section>
</ea-dialog>
```

```js
const movableExample = {
  dialog: document.querySelector("#movableDialog"),
  openBtn: document.querySelector("#movableDialogOpenBtn"),
  cancelBtn: document.querySelector("#movableDialogCancelBtn"),
  confirmBtn: document.querySelector("#movableDialogConfirmBtn"),

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
movableExample.init();
```

:::

## 全屏

设置 `fullscreen` 属性使对话框进入全屏展示模式。

<div class="demo">
  <ea-button id="fullscreenDialogOpenBtn" plain>
    Open the fullscreen Dialog
  </ea-button>

  <ea-dialog id="fullscreenDialog" heading="Tips" width="500px" fullscreen>
    <span>This is a message</span>
    <section slot="footer">
      <div class="dialog-footer">
        <ea-button id="fullscreenDialogCancelBtn">Cancel</ea-button>
        <ea-button id="fullscreenDialogConfirmBtn" variant="primary">
          Confirm
        </ea-button>
      </div>
    </section>
  </ea-dialog>
</div>

::: details 查看代码

```html
<ea-dialog id="fullscreenDialog" heading="Tips" width="500px" fullscreen>
  <span>This is a message</span>
  <section slot="footer">
    <div class="dialog-footer">
      <ea-button id="fullscreenDialogCancelBtn">Cancel</ea-button>
      <ea-button id="fullscreenDialogConfirmBtn" variant="primary">
        Confirm
      </ea-button>
    </div>
  </section>
</ea-dialog>
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

## 模态穿透

设置 `modal-pentrable` 属性使遮罩层可穿透，允许点击遮罩层下方的元素。

<div class="demo">
  <ea-button id="modalDialogOpenBtn" plain> Open the modal Dialog </ea-button>

  <ea-dialog id="modalDialog" heading="Tips" width="500px" modal-pentrable>
    <span>This is a message</span>
    <section slot="footer">
      <div class="dialog-footer">
        <ea-button id="modalDialogCancelBtn">Cancel</ea-button>
        <ea-button id="modalDialogConfirmBtn" variant="primary">
          Confirm
        </ea-button>
      </div>
    </section>
  </ea-dialog>
</div>

::: details 查看代码

```html
<ea-dialog id="modalDialog" heading="Tips" width="500px" modal-pentrable>
  <span>This is a message</span>
  <section slot="footer">
    <div class="dialog-footer">
      <ea-button id="modalDialogCancelBtn">Cancel</ea-button>
      <ea-button id="modalDialogConfirmBtn" variant="primary">
        Confirm
      </ea-button>
    </div>
  </section>
</ea-dialog>
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

- `ea-open`：打开开始
- `ea-opened`：打开动画完成
- `ea-close`：开始关闭
- `ea-closed`：关闭动画完成

通过 `beforeClose` 属性可以拦截关闭操作，实现异步关闭。

<div class="demo">
  <ea-button id="eventsDialogOpenBtn" plain> Open the events Dialog </ea-button>

  <ea-dialog id="eventsDialog" heading="Tips" width="500px">
    <span>This is a message</span>
    <section slot="footer">
      <div class="dialog-footer">
        <ea-button id="eventsDialogCancelBtn">Cancel</ea-button>
        <ea-button id="eventsDialogConfirmBtn" variant="primary">
          Confirm
        </ea-button>
      </div>
    </section>
  </ea-dialog>
</div>

::: details 查看代码

```html
<ea-dialog id="eventsDialog" heading="Tips" width="500px">
  <span>This is a message</span>
  <section slot="footer">
    <div class="dialog-footer">
      <ea-button id="eventsDialogCancelBtn">Cancel</ea-button>
      <ea-button id="eventsDialogConfirmBtn" variant="primary">
        Confirm
      </ea-button>
    </div>
  </section>
</ea-dialog>
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

    this.dialog.addEventListener("ea-open", () => {
      console.log("ea-open");
    });

    this.dialog.addEventListener("ea-opened", () => {
      console.log("ea-opened");
    });

    this.dialog.beforeClose = async done => {
      console.log("before-close");
      this.confirmBtn.toggleAttribute("loading", true);

      await new Promise(resolve => setTimeout(resolve, 2000));

      done();
    };

    this.dialog.addEventListener("ea-close", () => {
      console.log("ea-close");
    });

    this.dialog.addEventListener("ea-closed", () => {
      console.log("ea-closed");
      this.confirmBtn.toggleAttribute("loading", false);
    });
  },
};
eventsExample.init();
```

:::

## ea-dialog API

### ea-dialog Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ------ | ------ |
| `heading` | 对话框标题 | `string` | — | `""` |
| `width` | 对话框宽度（支持 CSS 值） | `string` | — | `"50%"` |
| `top` | 对话框顶部距离（支持 CSS 值） | `string` | — | `"50%"` |
| `visible` | 是否可见 | `boolean` | — | `false` |
| `center` | 头部和底部内容是否水平居中 | `boolean` | — | `false` |
| `fullscreen` | 是否全屏显示 | `boolean` | — | `false` |
| `movable` | 是否可拖拽 | `boolean` | — | `false` |
| `modal` | 是否显示遮罩层 | `boolean` | — | `true` |
| `modal-pentrable` | 遮罩层是否可穿透 | `boolean` | — | `false` |
| `show-close` | 是否显示右上角关闭图标 | `boolean` | — | `true` |
| `close-on-click-modal` | 点击遮罩层是否关闭 | `boolean` | — | `true` |
| `close-on-press-escape` | 按 ESC 键是否关闭 | `boolean` | — | `true` |
| `append-to-body` | 是否将弹窗追加到 body | `boolean` | — | `false` |
| `append-to` | 指定追加到的选择器 | `string` | — | `"body"` |
| `z-index` | 层级 | `string` | — | `""` |
| `background-color` | 遮罩层背景色 | `string` | — | `""` |
| `content-width` | 内容宽度 | `string` | — | `""` |
| `content-max-width` | 内容最大宽度 | `string` | — | `""` |
| `content-height` | 内容高度 | `string` | — | `""` |
| `beforeClose` | 关闭前回调函数，调用 done() 后关闭 | `Function` | — | `null` |

### ea-dialog CSS Part

| 名称 | 说明 |
| ---- | ---- |
| `container` | 对话框容器元素 |
| `header` | 头部元素 |
| `heading` | 标题文本元素 |
| `close-icon` | 关闭图标元素 |
| `content` | 主体内容元素 |
| `footer` | 底部元素 |

### ea-dialog Slots

| 名称 | 说明 |
| ---- | ---- |
| `default` | 对话框主体内容 |
| `header` | 自定义头部内容 |
| `footer` | 自定义底部内容 |

### ea-dialog Methods

| 方法名 | 说明 | 参数 |
| ------ | ---- | ---- |
| `show()` | 显示对话框 | — |
| `hide()` | 隐藏对话框 | — |
| `resetPosition()` | 重置对话框位置（用于可拖拽场景） | — |

### ea-dialog Events

| 事件名 | 说明 | 回调参数 |
| ------ | ---- | -------- |
| `ea-open` | 对话框打开时触发 | — |
| `ea-opened` | 对话框打开动画结束时触发 | — |
| `ea-close` | 对话框关闭时触发 | — |
| `ea-closed` | 对话框关闭动画结束时触发 | — |

### ea-dialog CSS 自定义属性

| 属性名 | 说明 | 默认值 |
| ------ | ---- | ------ |
| `--ea-dialog-padding` | 对话框内边距 | `var(--spacing-lg)` |
| `--ea-dialog-padding-primary` | 对话框次级内边距 | `var(--spacing-md)` |
| `--ea-dialog-box-shadow` | 对话框阴影 | `var(--box-shadow-md)` |
| `--ea-dialog-border-radius` | 对话框圆角 | `var(--border-radius-sm)` |
| `--ea-dialog-heading-font-size` | 标题字号 | `var(--font-size-lg)` |
| `--ea-dialog-close-icon-size` | 关闭图标尺寸 | `var(--font-size-lg)` |
| `--ea-dialog-content-font-size` | 内容字号 | `var(--font-size-md)` |
| `--ea-dialog-heading-color` | 标题颜色 | `var(--grey-900)` |
| `--ea-dialog-close-icon-color` | 关闭图标颜色 | `var(--grey-500)` |
| `--ea-dialog-content-color` | 内容颜色 | `var(--grey-700)` |
| `--ea-dialog-bg-color` | 对话框背景色 | `var(--white)` |
