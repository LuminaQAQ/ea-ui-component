<script setup>
import { onMounted } from 'vue'
import { EaMessage } from "../dist/components/ea-message.js";
import { EaMessageBox } from "../dist/components/ea-message-box.js";

onMounted(() => {
  import("../dist/components/index.js")
  import("../dist/assets/icon.css")

  const alertExample = {
    btn: document.querySelector("#openAlertMessageBox"),

    init() {
      this.btn.addEventListener("click", () => {
        $alert("This is a message", "Title", {
          confirmButtonText: "OK",
        })
          .then((action) => {
            $message.info(`action: ${action}`);
          })
          .catch((action) => {
            $message.info(`action: ${action}`);
          });
      });
    },
  };
  alertExample.init();

  const confirmExample = {
    btn: document.querySelector("#openconfirmMessageBox"),

    init() {
      this.btn.addEventListener("click", () => {
        $confirm(
          "proxy will permanently delete the file. Continue?",
          "Warning",
          {
            confirmButtonText: "OK",
            cancelButtonText: "Cancel",
            variant: "warning",
          }
        )
          .then((action) => {
            $message.info(`action: ${action}`);
          })
          .catch((action) => {
            $message.info(`action: ${action}`);
          });
      });
    },
  };
  confirmExample.init();

  const promptExample = {
    btn: document.querySelector("#openPromptMessageBox"),

    init() {
      this.btn.addEventListener("click", () => {
        $prompt('Please input your e-mail', 'Tip', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          inputPattern:
            /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
          inputErrorMessage: 'Invalid Email',
        })
          .then((action) => {
            $message.success(`Your email is:${action}`);
          })
          .catch((action) => {
            $message.info('Input canceled');
          });
      });
    },
  };
  promptExample.init();

  const validatorExample = {
    btn: document.querySelector('#openValidatorMessageBox'),

    init() {
      this.btn.addEventListener('click', () => {
        $prompt('Please input your name', 'Tip', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          inputValidator(value) {
            if (!value) return 'Name is required'
            if (value.length < 3) return 'Name must be at least 3 characters'
            return true
          },
        })
          .then((action) => {
            $message.success(`Your name is: ${action}`)
          })
          .catch((action) => {
            $message.info('Input canceled')
          })
      })
    },
  }
  validatorExample.init()

  const personalizedExample = {
    btn: document.querySelector("#openPersonalizedMessageBox"),
    init() {
      this.btn.addEventListener("click", () => {
        EaMessageBox({
          heading: 'Message',
          message: "This is a message",
          showCancelButton: true,
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              instance.confirmButtonText = 'Loading...'
              setTimeout(() => {
                done()
                setTimeout(() => {
                  instance.confirmButtonLoading = false
                }, 300)
              }, 3000)
            } else {
              done()
            }
          },
        }).then((action) => {
          EaMessage({
            variant: 'info',
            message: `action: ${action}`,
          })
        }).catch((action) => {
          EaMessage({
            variant: 'info',
            message: `action: ${action}`,
          })
        })
      })
    }
  };
  personalizedExample.init();

  const useHTMLExample = {
    btn: document.querySelector('#openUseHTMLMessageBox'),

    init() {
      this.btn.addEventListener('click', () => {
        EaMessageBox.alert(
          '<strong>proxy is <i>HTML</i> string</strong>',
          'HTML String',
          {
            dangerouslyUseHTMLString: true,
          }
        )
      })
    }
  }
  useHTMLExample.init()

  const openDistinguishCancelAndCloseExample = {
    btn: document.querySelector('#openDistinguishCancelAndCloseMessageBox'),

    init() {
      this.btn.addEventListener('click', () => {
        EaMessageBox.confirm(
          'You have unsaved changes, save and proceed?',
          'Confirm',
          {
            distinguishCancelAndClose: true,
            confirmButtonText: 'Save',
            cancelButtonText: 'Discard Changes',
          }
        )
          .then(() => {
            EaMessage({
              variant: 'info',
              message: 'Changes saved. Proceeding to a new route.',
            })
          })
          .catch((action) => {
            EaMessage({
              variant: 'info',
              message:
                action === 'cancel'
                  ? 'Changes discarded. Proceeding to a new route.'
                  : 'Stay in the current route',
            })
          })
      })
    }
  }
  openDistinguishCancelAndCloseExample.init()

  const centerExample = {
    btn: document.querySelector('#openCenterMessageBox'),

    init() {
      this.btn.addEventListener('click', () => {
        EaMessageBox.confirm(
          'proxy will permanently delete the file. Continue?',
          'Warning',
          {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            variant: 'warning',
            center: true,
          }
        )
          .then(() => {
            EaMessage({
              variant: 'success',
              message: 'Delete completed',
            })
          })
          .catch(() => {
            EaMessage({
              variant: 'info',
              message: 'Delete canceled',
            })
          })
      })
    }
  }
  centerExample.init()

  const draggableExample = {
    btn: document.querySelector('#openDraggableMessageBox'),

    init() {
      this.btn.addEventListener('click', () => {
        EaMessageBox.confirm(
          'proxy will permanently delete the file. Continue?',
          'Warning',
          {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            variant: 'warning',
            movable: true,
          }
        )
          .then(() => {
            EaMessage({
              variant: 'success',
              message: 'Delete completed',
            })
          })
          .catch(() => {
            EaMessage({
              variant: 'info',
              message: 'Delete canceled',
            })
          })
      })
    }
  }
  draggableExample.init()
})

</script>

# MessageBox 弹框

模仿系统消息对话框实现的一套模态对话组件，用于消息提示（alert）、确认（confirm）和提交（prompt）。

::: tip
引入组件后，可以使用 `window.$alert`、`window.$confirm`、`window.$prompt` 和 `window.$msgbox` 方法。
:::

## 引入

> js

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-message-box/index.js";
</script>
```

> css

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

移步到 [CSS Part](#ea-message-box-css-part) 和 [CSS 自定义属性](#ea-message-box-css-自定义属性)。

## 消息提示

使用 `$alert` 打开一个消息提示框，用户必须确认才能关闭。`$alert`、`$confirm`、`$prompt` 都会返回 Promise，便于链式处理。

<div class="demo">
  <ea-button id="openAlertMessageBox" plain>
    Click to open Message Box
  </ea-button>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo">
  <ea-button id="openAlertMessageBox" plain>
    Click to open Message Box
  </ea-button>
</div>
```

```js
const alertExample = {
  btn: document.querySelector("#openAlertMessageBox"),

  init() {
    this.btn.addEventListener("click", () => {
      $alert("This is a message", "Title", {
        confirmButtonText: "OK",
      })
        .then(action => {
          $message.info(`action: ${action}`);
        })
        .catch(action => {
          $message.info(`action: ${action}`);
        });
    });
  },
};
alertExample.init();
```

:::

::::

## 确认消息

使用 `$confirm` 询问用户是否继续某一危险或重要操作。

<div class="demo">
  <ea-button id="openconfirmMessageBox" plain>
    Click to open Message Box
  </ea-button>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo">
  <ea-button id="openconfirmMessageBox" plain>
    Click to open Message Box
  </ea-button>
</div>
```

```js
const confirmExample = {
  btn: document.querySelector("#openconfirmMessageBox"),

  init() {
    this.btn.addEventListener("click", () => {
      $confirm("proxy will permanently delete the file. Continue?", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        variant: "warning",
      })
        .then(action => {
          $message.info(`action: ${action}`);
        })
        .catch(action => {
          $message.info(`action: ${action}`);
        });
    });
  },
};
confirmExample.init();
```

:::

::::

## 提交内容

使用 `$prompt` 要求用户输入内容（如邮箱），支持正则校验和自定义校验函数。

- `inputPattern`：映射到 HTML `pattern` 属性，命令式 API 也支持传入 RegExp（会自动转换为 `.source` 字符串）
- `inputValidator`：自定义校验函数，返回 `true` 通过校验，返回 `string` 作为错误提示，返回 `false` 使用 `inputErrorMessage`
- `inputErrorMessage`：校验未通过时的错误文本，通过 `setCustomValidity` 设置

<div class="demo">
  <ea-button id="openPromptMessageBox" plain>
    Click to open Message Box
  </ea-button>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo">
  <ea-button id="openPromptMessageBox" plain>
    Click to open Message Box
  </ea-button>
</div>
```

```js
const promptExample = {
  btn: document.querySelector("#openPromptMessageBox"),

  init() {
    this.btn.addEventListener("click", () => {
      $prompt("Please input your e-mail", "Tip", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        inputPattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
        inputErrorMessage: "Invalid Email",
      })
        .then(action => {
          $message.success(`Your email is:${action}`);
        })
        .catch(action => {
          $message.info("Input canceled");
        });
    });
  },
};
promptExample.init();
```

:::

::::

### 自定义校验

使用 `inputValidator` 实现更灵活的校验逻辑，支持异步校验。

<div class="demo">
  <ea-button id="openValidatorMessageBox" plain>
    Click to open Message Box with Validator
  </ea-button>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo">
  <ea-button id="openValidatorMessageBox" plain>
    Click to open Message Box with Validator
  </ea-button>
</div>
```

```js
const validatorExample = {
  btn: document.querySelector("#openValidatorMessageBox"),

  init() {
    this.btn.addEventListener("click", () => {
      $prompt("Please input your name", "Tip", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        inputValidator(value) {
          if (!value) return "Name is required";
          if (value.length < 3) return "Name must be at least 3 characters";
          return true;
        },
      })
        .then(action => {
          $message.success(`Your name is: ${action}`);
        })
        .catch(action => {
          $message.info("Input canceled");
        });
    });
  },
};
validatorExample.init();
```

:::

::::

## 个性化

<div class="demo">
  <ea-button id="openPersonalizedMessageBox" plain>
    Click to open Message Box
  </ea-button>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo">
  <ea-button id="openPersonalizedMessageBox" plain>
    Click to open Message Box
  </ea-button>
</div>
```

```js
const personalizedExample = {
  btn: document.querySelector("#openPersonalizedMessageBox"),
  init() {
    this.btn.addEventListener("click", () => {
      EaMessageBox({
        heading: "Message",
        message: "This is a message",
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "Loading...";
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 3000);
          } else {
            done();
          }
        },
      })
        .then(action => {
          EaMessage({
            variant: "info",
            message: `action: ${action}`,
          });
        })
        .catch(action => {
          EaMessage({
            variant: "info",
            message: `action: ${action}`,
          });
        });
    });
  },
};
personalizedExample.init();
```

:::

::::

## 使用 HTML 片段

`message` 支持传入 HTML 字符串来作为正文内容。

将 `dangerouslyUseHTMLString` 属性设置为 `true`，`message` 属性就会被当作 HTML 片段处理。

::: danger
`message` 属性虽然支持传入 HTML 片段，但是在网站上动态渲染任意 HTML 是非常危险的，因为容易导致 [XSS](https://en.wikipedia.org/wiki/Cross-site_scripting) 攻击。因此在 `dangerouslyUseHTMLString` 打开的情况下，请确保 `message` 的内容是可信的，永远不要将用户提交的内容赋值给 `message` 属性。
:::

<div class="demo">
  <ea-button id="openUseHTMLMessageBox" plain>
    Click to open Message Box
  </ea-button>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo">
  <ea-button id="openUseHTMLMessageBox" plain>
    Click to open Message Box
  </ea-button>
</div>
```

```js
const useHTMLExample = {
  btn: document.querySelector("#openUseHTMLMessageBox"),

  init() {
    this.btn.addEventListener("click", () => {
      EaMessageBox.alert(
        "<strong>proxy is <i>HTML</i> string</strong>",
        "HTML String",
        {
          dangerouslyUseHTMLString: true,
        }
      );
    });
  },
};
useHTMLExample.init();
```

:::

::::

## 区分取消操作与关闭操作

有些场景下，点击取消按钮与点击关闭按钮有着不同的含义。

<div class="demo">
  <ea-button id="openDistinguishCancelAndCloseMessageBox" plain>
    Click to open Message Box
  </ea-button>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo">
  <ea-button id="openDistinguishCancelAndCloseMessageBox" plain>
    Click to open Message Box
  </ea-button>
</div>
```

```js
const openDistinguishCancelAndCloseExample = {
  btn: document.querySelector("#openDistinguishCancelAndCloseMessageBox"),

  init() {
    this.btn.addEventListener("click", () => {
      EaMessageBox.confirm(
        "You have unsaved changes, save and proceed?",
        "Confirm",
        {
          distinguishCancelAndClose: true,
          confirmButtonText: "Save",
          cancelButtonText: "Discard Changes",
        }
      )
        .then(() => {
          EaMessage({
            variant: "info",
            message: "Changes saved. Proceeding to a new route.",
          });
        })
        .catch(action => {
          EaMessage({
            variant: "info",
            message:
              action === "cancel"
                ? "Changes discarded. Proceeding to a new route."
                : "Stay in the current route",
          });
        });
    });
  },
};
openDistinguishCancelAndCloseExample.init();
```

:::

::::

## 内容居中

<div class="demo">
  <ea-button id="openCenterMessageBox" plain>
    Click to open Message Box
  </ea-button>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo">
  <ea-button id="openCenterMessageBox" plain>
    Click to open Message Box
  </ea-button>
</div>
```

```js
const centerExample = {
  btn: document.querySelector("#openCenterMessageBox"),

  init() {
    this.btn.addEventListener("click", () => {
      EaMessageBox.confirm(
        "proxy will permanently delete the file. Continue?",
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          variant: "warning",
          center: true,
        }
      )
        .then(() => {
          EaMessage({
            variant: "success",
            message: "Delete completed",
          });
        })
        .catch(() => {
          EaMessage({
            variant: "info",
            message: "Delete canceled",
          });
        });
    });
  },
};
centerExample.init();
```

:::

::::

## 可拖放

<div class="demo">
  <ea-button id="openDraggableMessageBox" plain>
    Click to open Message Box
  </ea-button>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo">
  <ea-button id="openDraggableMessageBox" plain>
    Click to open Message Box
  </ea-button>
</div>
```

```js
const draggableExample = {
  btn: document.querySelector("#openDraggableMessageBox"),

  init() {
    this.btn.addEventListener("click", () => {
      EaMessageBox.confirm(
        "proxy will permanently delete the file. Continue?",
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          variant: "warning",
          movable: true,
        }
      )
        .then(() => {
          EaMessage({
            variant: "success",
            message: "Delete completed",
          });
        })
        .catch(() => {
          EaMessage({
            variant: "info",
            message: "Delete canceled",
          });
        });
    });
  },
};
draggableExample.init();
```

:::

::::

## ea-message-box API

### ea-message-box Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| boxType | 消息框类型 | String | `'alert' \| 'confirm' \| 'prompt' \| 'personalized'` | personalized |
| heading | MessageBox 的标题 | String | — | — |
| message | MessageBox 的正文内容 | String | — | — |
| dangerouslyUseHTMLString <PropTag /> | 是否将 message 作为 HTML 渲染 | Boolean | — | false |
| variant | 消息框变体类型 | String | `'primary' \| 'success' \| 'info' \| 'warning' \| 'error'` | — |
| icon | 自定义图标名称 | String | — | — |
| closeIcon | 关闭图标名称 | String | — | xmark |
| showClose | 是否显示关闭按钮 | Boolean | — | true |
| distinguishCancelAndClose <PropTag /> | 区分取消和关闭操作 | Boolean | — | false |
| showCancelButton | 是否显示取消按钮 | Boolean | — | false |
| showConfirmButton | 是否显示确认按钮 | Boolean | — | true |
| confirmButtonText | 确认按钮文本 | String | — | OK |
| cancelButtonText | 取消按钮文本 | String | — | Cancel |
| closeOnClickModal | 点击遮罩是否关闭 | Boolean | — | true |
| closeOnPressEscape | 是否可通过按下 ESC 键关闭 | Boolean | — | true |
| showInput | 是否显示输入框 | Boolean | — | false |
| inputPlaceholder | 输入框占位文本 | String | — | — |
| inputType | 输入框类型 | String | — | text |
| inputValue | 输入框初始值 | String | — | — |
| inputPattern <PropTag /> | 输入框校验正则（映射到 HTML pattern 属性，命令式 API 也支持传入 RegExp） | String | — | — |
| inputValidator <PropTag /> | 输入框自定义校验函数，返回 true 通过，返回 string 作为错误信息，返回 false 使用 inputErrorMessage | Function: `(value: string) => boolean \| string \| Promise<boolean \| string>` | — | — |
| inputErrorMessage | 输入框校验未通过时的错误文本（通过 setCustomValidity 设置） | String | — | — |
| center | 是否居中内容 | Boolean | — | false |
| movable | 是否可拖拽 | Boolean | — | false |
| roundButton | 是否使用圆角按钮 | Boolean | — | false |
| buttonSize | 按钮尺寸 | String | `'small' \| 'medium' \| 'large'` | medium |
| modal | 是否显示遮罩层 | Boolean | — | true |
| appendToBody | 是否追加到 body | Boolean | — | false |
| appendTo | 追加到指定容器 | String | — | body |
| zIndex | 层级 | String | — | — |
| backgroundColor | 遮罩层背景色 | String | — | — |
| contentWidth | 内容宽度 | String | — | — |
| contentMaxWidth | 内容最大宽度 | String | — | — |
| contentHeight | 内容高度 | String | — | — |
| beforeClose <PropTag /> | 关闭前的回调，会暂停关闭过程 | Function: `(done: (cancel?: boolean) => void) => void` | — | — |
| confirmButtonLoading <PropTag /> | 确认按钮是否加载中 | Boolean | — | false |

### ea-message-box CSS Part

| 名称 | 说明 |
| --- | --- |
| container | 容器元素 |
| header | 头部区域 |
| title-wrap | 标题包裹元素 |
| type-icon | 类型图标元素 |
| close-icon | 关闭图标元素 |
| content | 内容区域（表单元素） |
| description | 描述内容元素 |
| input | 输入框元素 |
| footer | 底部区域 |
| confirm-button | 确认按钮元素 |
| cancel-button | 取消按钮元素 |

### ea-message-box Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| show | 显示消息框 | — |
| hide | 隐藏消息框 | — |

### ea-message-box Events

| 事件名 | 说明 | 回调参数(event.detail) |
| --- | --- | --- |
| ea-confirm | 点击确认按钮时触发 | {} |
| ea-cancel | 点击取消按钮时触发 | {} |
| ea-message-close | 当 distinguishCancelAndClose 为 true 时，用户点击关闭按钮触发 | {} |
| ea-open | 遮罩层打开时触发 | — |
| ea-opened | 遮罩层打开动画结束时触发 | — |
| ea-close | 遮罩层关闭时触发 | — |
| ea-closed | 遮罩层关闭动画结束时触发 | — |

### ea-message-box CSS 自定义属性

| 属性名 | 说明 | 默认值 |
| --- | --- | --- |
| --ea-message-box-padding | 组件内边距 | var(--spacing-lg) |
| --ea-message-box-border-radius | 组件圆角 | var(--border-radius-sm) |
| --ea-message-box-box-shadow | 组件阴影 | var(--box-shadow-md) |
| --ea-message-box-title-font-size | 标题字号 | var(--font-size-lg) |
| --ea-message-box-close-icon-size | 关闭图标字号 | var(--font-size-lg) |
| --ea-message-box-content-font-size | 内容字号 | var(--font-size-md) |
| --ea-message-box-title-color | 标题颜色 | var(--grey-900) |
| --ea-message-box-close-icon-color | 关闭图标颜色 | var(--grey-500) |
| --ea-message-box-content-color | 内容颜色 | var(--grey-700) |
| --ea-message-box-section-gap | 区域间距 | var(--spacing-lg) |
