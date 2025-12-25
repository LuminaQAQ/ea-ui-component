<script setup>
import { onMounted } from 'vue'
import { EaMessage } from "../dist/components/ea-message.js";
import { EaMessageBox } from "../dist/components/ea-message-box.js";

onMounted(() => {
  import("../dist/components/index.js")
  import("../dist/assets/icon.css")

  // ------- 消息提示 -------
  // #region
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
  // #endregion
  // ------- end -------

  // ------- 确认消息 -------
  // #region
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
            type: "warning",
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
  // #endregion
  // ------- end -------

  // ------- 提交内容 -------
  // #region
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

      // this.btn.click();
    },
  };
  promptExample.init();
  // #endregion
  // ------- end -------

  // ------- 个性化 -------
  // #region
  const personalizedExample = {
    btn: document.querySelector("#openPersonalizedMessageBox"),
    init() {
      this.btn.addEventListener("click", () => {
        EaMessageBox({
          title: 'Message',
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
            type: 'info',
            message: `action: ${action}`,
          })
        }).catch((action) => {
          EaMessage({
            type: 'info',
            message: `action: ${action}`,
          })
        })
      })
    }
  };
  personalizedExample.init();
  // #endregion
  // ------- end -------

  // ------- 使用 HTML 片段 -------
  // #region
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
  // #endregion
  // ------- end -------

  // ------- 区分取消操作与关闭操作 -------
  // #region
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
              type: 'info',
              message: 'Changes saved. Proceeding to a new route.',
            })
          })
          .catch((action) => {
            EaMessage({
              type: 'info',
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
  // #endregion
  // ------- end -------

  // ------- 区分取消操作与关闭操作 -------
  // #region
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
            type: 'warning',
            center: true,
          }
        )
          .then(() => {
            EaMessage({
              type: 'success',
              message: 'Delete completed',
            })
          })
          .catch(() => {
            EaMessage({
              type: 'info',
              message: 'Delete canceled',
            })
          })
      })
    }
  }
  centerExample.init()
  // #endregion
  // ------- end -------

  // ------- 可拖放 -------
  // #region
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
            type: 'warning',
            draggable: true,
          }
        )
          .then(() => {
            EaMessage({
              type: 'success',
              message: 'Delete completed',
            })
          })
          .catch(() => {
            EaMessage({
              type: 'info',
              message: 'Delete canceled',
            })
          })
      })
    }
  }
  draggableExample.init()
  // #endregion
  // ------- end -------
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
如果需要使用内置图标，请提前引入图标样式文件：
:::

```html
<link
  rel="stylesheet"
  href="./node_modules/easy-component-ui/components/ea-icon/index.css"
/>
```

## 消息提示

使用 `$alert` 打开一个消息提示框，用户必须确认才能关闭。`$alert`、`$confirm`、`$prompt` 都会返回 Promise，便于链式处理。

<div class="demo">
  <ea-button id="openAlertMessageBox" plain>
    Click to open Message Box
  </ea-button>
</div>

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

## 确认消息

使用 `$confirm` 询问用户是否继续某一危险或重要操作。

<div class="demo">
  <ea-button id="openconfirmMessageBox" plain>
    Click to open Message Box
  </ea-button>
</div>

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
        type: "warning",
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

## 提交内容

使用 `$prompt` 要求用户输入内容（如邮箱），支持正则校验和错误提示。

<div class="demo">
  <ea-button id="openPromptMessageBox" plain>
    Click to open Message Box
  </ea-button>
</div>

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

    // this.btn.click();
  },
};
promptExample.init();
```

:::

## 个性化

<div class="demo">
  <ea-button id="openPersonalizedMessageBox" plain>
    Click to open Message Box
  </ea-button>
</div>

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
        title: "Message",
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
            type: "info",
            message: `action: ${action}`,
          });
        })
        .catch(action => {
          EaMessage({
            type: "info",
            message: `action: ${action}`,
          });
        });
    });
  },
};
personalizedExample.init();
```

:::

## 使用 HTML 片段

`message` 支持传入 HTML 字符串来作为正文内容。

将 `dangerouslyUseHTMLString` 属性设置为 `true`，`message` 属性就会被当作 HTML 片段处理。

::: danger
`message` 属性虽然支持传入 HTML 片段，但是在网站上动态渲染任意 HTML 是非常危险的，因为容易导致 [ XSS](https://en.wikipedia.org/wiki/Cross-site_scripting) 攻击。 因此在 `dangerouslyUseHTMLString` 打开的情况下，请确保 `message` 的内容是可信的，永远不要将用户提交的内容赋值给 `message` 属性。
:::

<div class="demo">
  <ea-button id="openUseHTMLMessageBox" plain>
    Click to open Message Box
  </ea-button>
</div>

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

## 区分取消操作与关闭操作

有些场景下，点击取消按钮与点击关闭按钮有着不同的含义。

<div class="demo">
  <ea-button id="openDistinguishCancelAndCloseMessageBox" plain>
    Click to open Message Box
  </ea-button>
</div>

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
            type: "info",
            message: "Changes saved. Proceeding to a new route.",
          });
        })
        .catch(action => {
          EaMessage({
            type: "info",
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

## 内容居中

<div class="demo">
  <ea-button id="openCenterMessageBox" plain>
    Click to open Message Box
  </ea-button>
</div>

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
          type: "warning",
          center: true,
        }
      )
        .then(() => {
          EaMessage({
            type: "success",
            message: "Delete completed",
          });
        })
        .catch(() => {
          EaMessage({
            type: "info",
            message: "Delete canceled",
          });
        });
    });
  },
};
centerExample.init();
```

:::

## 可拖放

<div class="demo">
  <ea-button id="openDraggableMessageBox" plain>
    Click to open Message Box
  </ea-button>
</div>

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
          type: "warning",
          draggable: true,
        }
      )
        .then(() => {
          EaMessage({
            type: "success",
            message: "Delete completed",
          });
        })
        .catch(() => {
          EaMessage({
            type: "info",
            message: "Delete canceled",
          });
        });
    });
  },
};
draggableExample.init();
```

:::

## Attributes

| 参数                      | 说明                                                  | 类型                                                                          | 默认值        |
| ------------------------- | ----------------------------------------------------- | ----------------------------------------------------------------------------- | ------------- |
| title                     | MessageBox 的标题                                     | String                                                                        | -             |
| message                   | MessageBox 的正文内容                                 | String                                                                        | -             |
| dangerouslyUseHTMLString  | 是否将 message 作为 HTML 渲染                         | Boolean                                                                       | false         |
| type                      | MessageBox 的类型                                     | String: `'primary' \| 'success' \| 'info' \| 'warning' \| 'error'`            | ''            |
| icon                      | 自定义关闭图标组件                                    | String                                                                        | -             |
| closeIcon                 | MessageBox 的图标                                     | String                                                                        | -             |
| callback                  | MessageBox 关闭的回调                                 | Function: `(action: Action) => void`                                          | -             |
| beforeClose               | messageBox 关闭前的回调，会暂停消息弹出框的关闭过程。 | Function: `(action: Action, instance: HTMLElement, done: () => void) => void` | -             |
| showClose                 | 是否显示关闭按钮                                      | Boolean                                                                       | true          |
| distinguishCancelAndClose | 区分用户点击取消和关闭（X）                           | Boolean                                                                       | false         |
| showCancelButton          | 是否显示取消按钮                                      | Boolean                                                                       | false         |
| showConfirmButton         | 是否显示确认按钮                                      | Boolean                                                                       | true          |
| confirmButtonText         | 确认按钮文本                                          | String                                                                        | 确认          |
| cancelButtonText          | 取消按钮文本                                          | String                                                                        | 取消          |
| closeOnClickModal         | 点击遮罩是否关闭                                      | Boolean                                                                       | true          |
| closeOnPressEscape        | 是否可通过按下 ESC 键关闭 MessageBox                  | Boolean                                                                       | true          |
| showInput                 | 是否显示输入框                                        | Boolean                                                                       | false         |
| inputPlaceholder          | 输入框的提示文字                                      | String                                                                        | -             |
| inputType                 | 输入框的类型                                          | String                                                                        | text          |
| inputValue                | 输入框的初始值                                        | String                                                                        | -             |
| inputPattern              | 输入框的验证规则                                      | RegExp                                                                        | -             |
| inputErrorMessage         | 输入框的校验错误提示                                  | String                                                                        | -             |
| center                    | 是否将对话框内容垂直居中                              | Boolean                                                                       | false         |
| draggable                 | 是否允许拖拽对话框                                    | Boolean                                                                       | false         |
| roundButton               | 是否使用圆形按钮                                      | Boolean                                                                       | false         |
| buttonSize                | 设置按钮尺寸                                          | String: `'small' \| 'default' \| 'large'`                                     | large         |
| appendTo                  | 指定挂载根元素，默认为 document.body                  | CSSSelector                                                                   | document.body |

## CSS Part

> 用法可参考 MDN ::part() 伪类

| 名称            | 说明                       |
| --------------- | -------------------------- |
| container       | 对话框根容器               |
| header          | 对话框顶部容器             |
| title-wrap      | 对话框标题容器             |
| type-icon       | 对话框图标容器             |
| title           | 对话框标题                 |
| close-icon      | 对话框关闭图标             |
| content         | 对话框内容容器             |
| description     | 对话框描述容器             |
| input           | 对话框的输入框             |
| invalid-message | 对话框的输入框校验错误信息 |
| footer          | 对话框底部容器             |
| cancel-button   | 对话框取消按钮             |
| confirm-button  | 对话框确认按钮             |

## Events

> MessageBox 是基于 Overlay 组件实现的，具体事件可参考 [Overlay](./ea-overlay.md#events) 组件

| 事件名称      | 说明                                                      |
| ------------- | --------------------------------------------------------- |
| confirm       | 用户点击确认按钮                                          |
| cancel        | 用户点击取消按钮                                          |
| message-close | 当 distinguishCancelAndClose 为 true 时，用户点击关闭按钮 |
