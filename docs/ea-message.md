<script setup>
import { onMounted } from 'vue'
import { EaMessage } from '../components/ea-message/MessageClass.js'

onMounted(() => {
    import('../index.js')
    import('./index.scss')

    const message = new EaMessage();

    // 基础用法
    document.getElementById('messageTextBtn').addEventListener('click', () => {
        message.open("1");
    })


    // 不同状态
    document.getElementById('messageObjectBtn').addEventListener('click', () => {
        message.open({
            text: "2",
            type: "info",
        });
    })

    document.getElementById('messageSuccessObjectBtn').addEventListener('click', () => {
        message.open({
            text: "2",
            type: "success",
        });
    })

    document.getElementById('messageErrorObjectBtn').addEventListener('click', () => {
        message.open({
            text: "3",
            type: "error",
        });
    })

    document.getElementById('messageWarningObjectBtn').addEventListener('click', () => {
        message.open({
            text: "3",
            type: "warning",
        });
    })

    
    // 不可关闭
    document.getElementById('messageObjectBtnHasClose').addEventListener('click', () => {
        message.open({
            text: "2",
            showClose: true,
            type: "info",
        });
    })

    document.getElementById('messageObjectBtnNotClose').addEventListener('click', () => {
        message.open({
            text: "2",
            showClose: true,
            type: "info",
            duration: 0,
        });
    })

    document.getElementById('messageSuccessObjectBtnBtnHasClose').addEventListener('click', () => {
        message.open({
            text: "2",
            showClose: true,
            type: "success",
        });
    })

    document.getElementById('messageErrorObjectBtnBtnHasClose').addEventListener('click', () => {
        message.open({
            text: "3",
            showClose: true,
            type: "error",
        });
    })

    document.getElementById('messageWarningObjectBtnBtnHasClose').addEventListener('click', () => {
        message.open({
            text: "3",
            showClose: true,
            type: "warning",
        });
    })

    // 文字居中
    document.getElementById('centerMessageObjectBtn').addEventListener('click', () => {
        message.open({
            text: "3",
            showClose: true,
            center: true,
        })
    })

    document.getElementById('closeEventBtn').addEventListener('click', () => {
        message.open({
            text: "3",
            showClose: true,
            center: true,
        }).onClose(() => {
            alert('关闭了');
        });
    })
})
</script>

# Message 消息提示

常用于主动操作后的反馈提示。与 Notification 的区别是后者更多用于系统级通知的被动提醒。

```js
import { EaMessage } from "../components/ea-message/MessageClass.js";
```

## 基础用法

从顶部出现，3 秒后自动消失。

<div class="demo">
    <ea-button id="messageTextBtn">文本类消息提示(info)</ea-button>
</div>

```html
<div class="demo">
  <ea-button id="messageTextBtn">文本类消息提示(info)</ea-button>
</div>
```

```js
const message = new EaMessage();
document.getElementById("messageTextBtn").addEventListener("click", () => {
  message.open("1");
});
```

## 不同状态

用来显示「成功、警告、消息、错误」类的操作反馈。

<div class="row left">
    <ea-button id="messageObjectBtn">对象类消息提示(info)</ea-button>
    <ea-button id="messageSuccessObjectBtn" type="success">对象类消息提示(success)</ea-button>
    <ea-button id="messageErrorObjectBtn" type="danger">对象类消息提示(error)</ea-button>
    <ea-button id="messageWarningObjectBtn" type="warning">对象类消息提示(warning)</ea-button>
</div>

```html
<div class="row left">
  <ea-button id="messageObjectBtn">对象类消息提示(info)</ea-button>
  <ea-button id="messageSuccessObjectBtn" type="success">
    对象类消息提示(success)
  </ea-button>
  <ea-button id="messageErrorObjectBtn" type="danger">
    对象类消息提示(error)
  </ea-button>
  <ea-button id="messageWarningObjectBtn" type="warning">
    对象类消息提示(warning)
  </ea-button>
</div>
```

```js
const message = new EaMessage();
document.getElementById("messageObjectBtn").addEventListener("click", () => {
  message.open({
    text: "2",
    type: "info",
  });
});

document
  .getElementById("messageSuccessObjectBtn")
  .addEventListener("click", () => {
    message.open({
      text: "2",
      type: "success",
    });
  });

document
  .getElementById("messageErrorObjectBtn")
  .addEventListener("click", () => {
    message.open({
      text: "3",
      type: "error",
    });
  });

document
  .getElementById("messageWarningObjectBtn")
  .addEventListener("click", () => {
    message.open({
      text: "3",
      type: "warning",
    });
  });
```

## 可关闭

使用 `showClose` 属性可以让消息提示显示关闭按钮。使用 `duration` 属性可以让消息提示按照既定的时间自动消失, 若 `duration` 设置为 `0` , 则该消息提示不会自动消失。

<div class="row left">
    <ea-button id="messageObjectBtnHasClose">对象类消息提示(info)</ea-button>
    <ea-button id="messageObjectBtnNotClose">对象类消息提示(不可关闭)</ea-button>
    <ea-button id="messageSuccessObjectBtnBtnHasClose" type="success">对象类消息提示(success)</ea-button>
    <ea-button id="messageErrorObjectBtnBtnHasClose" type="danger">对象类消息提示(error)</ea-button>
    <ea-button id="messageWarningObjectBtnBtnHasClose" type="warning">对象类消息提示(warning)</ea-button>
</div>

```html
<div class="row left">
  <ea-button id="messageObjectBtnHasClose">对象类消息提示(info)</ea-button>
  <ea-button id="messageSuccessObjectBtnBtnHasClose" type="success">
    对象类消息提示(success)
  </ea-button>
  <ea-button id="messageErrorObjectBtnBtnHasClose" type="danger">
    对象类消息提示(error)
  </ea-button>
  <ea-button id="messageWarningObjectBtnBtnHasClose" type="warning">
    对象类消息提示(warning)
  </ea-button>
</div>
```

```js
const message = new EaMessage();
document
  .getElementById("messageObjectBtnHasClose")
  .addEventListener("click", () => {
    message.open({
      text: "2",
      showClose: true,
      type: "info",
    });
  });

// 不会自动消失
document
  .getElementById("messageObjectBtnNotClose")
  .addEventListener("click", () => {
    message.open({
      text: "2",
      showClose: true,
      type: "info",
      duration: 0,
    });
  });
```

## 文字居中

使用 `center` 属性让文字水平居中。

<div class="row left">
    <ea-button id="centerMessageObjectBtn">文字居中</ea-button>
</div>

```html
<div class="row left">
  <ea-button id="centerMessageObjectBtn">文字居中</ea-button>
</div>
```

```js
document
  .getElementById("centerMessageObjectBtn")
  .addEventListener("click", () => {
    message.open({
      text: "3",
      showClose: true,
      center: true,
    });
  });
```

## close 事件

<div class="demo">
    <ea-button id="closeEventBtn">自定义 close 事件</ea-button>
</div>

```html
<div class="demo">
  <ea-button id="closeEventBtn">自定义 close 事件</ea-button>
</div>
```

```js
const message = new EaMessage();
document.getElementById("closeEventBtn").addEventListener("click", () => {
  message
    .open({
      text: "3",
      showClose: true,
      center: true,
    })
    .onClose(() => {
      alert("关闭了");
    });
});
```

## Attributes

| 参数      | 说明                                  | 类型    | 可选值                     | 默认值 |
| --------- | ------------------------------------- | ------- | -------------------------- | ------ |
| text      | 消息提示的内容                        | string  | —                          | —      |
| type      | 主题类型                              | string  | success/warning/info/error | info   |
| showClose | 是否显示关闭按钮                      | boolean | —                          | false  |
| center    | 文字是否居中                          | boolean | —                          | false  |
| duration  | 显示时间, 毫秒。设为 0 则不会自动关闭 | number  | —                          | 3000   |

## Events

| 事件名称 | 说明             |
| -------- | ---------------- |
| close    | 关闭时的回调函数 |
