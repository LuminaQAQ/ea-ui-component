<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  import('../components/ea-message/index.js')
  import('../components/ea-button/index.js')
  import('./index.scss')

  // 基础用法
  const btn = document.getElementById("messageTextBtn");
  btn.addEventListener("click", () => {
    window.$message.open("1");
  });


  // 不同状态
  const differentController = {
    objectBtn: document.getElementById("messageObjectBtn"),
    successObjectBtn: document.getElementById("messageSuccessObjectBtn"),
    errorObjectBtn: document.getElementById("messageErrorObjectBtn"),
    warningObjectBtn: document.getElementById("messageWarningObjectBtn"),

    addEvent(btn, fn) {
      btn.addEventListener("click", () => {
        if (fn) fn();
      });
    },

    init() {
      this.addEvent(this.objectBtn, () => {
        window.$message.open({
          text: "2",
          type: "info",
        });
      });

      this.addEvent(this.successObjectBtn, () => {
        window.$message.open({
          text: "2",
          type: "success",
        });
      });

      this.addEvent(this.errorObjectBtn, () => {
        window.$message.open({
          text: "3",
          type: "error",
        });
      });

      this.addEvent(this.warningObjectBtn, () => {
        window.$message.open({
          text: "3",
          type: "warning",
        });
      });
    },
  };

  differentController.init();

    
  // 可关闭
  const closableController = {
    closableBtn: document.getElementById("messageObjectBtnHasClose"),
    durationIsZeroBtn: document.getElementById("messageObjectBtnNotClose"),
    successObjectBtn: document.getElementById(
      "messageSuccessObjectBtnBtnHasClose"
    ),
    errorObjectBtn: document.getElementById("messageErrorObjectBtnBtnHasClose"),
    warningObjectBtn: document.getElementById(
      "messageWarningObjectBtnBtnHasClose"
    ),

    addEvent(btn, fn) {
      btn.addEventListener("click", () => {
        if (fn) fn();
      });
    },

    init() {
      this.addEvent(this.closableBtn, () => {
        window.$message.open({
          text: "2",
          showClose: true,
          type: "info",
        });
      });

      this.addEvent(this.durationIsZeroBtn, () => {
        window.$message.open({
          text: "2",
          showClose: true,
          type: "info",
          duration: 0,
        });
      });

      this.addEvent(this.successObjectBtn, () => {
        window.$message.open({
          text: "2",
          showClose: true,
          type: "success",
        });
      });

      this.addEvent(this.errorObjectBtn, () => {
        window.$message.open({
          text: "3",
          showClose: true,
          type: "error",
        });
      });

      this.addEvent(this.warningObjectBtn, () => {
        window.$message.open({
          text: "3",
          showClose: true,
          type: "warning",
        });
      });
    },
  };

  closableController.init();

  // 文字居中
  const centerController = {
    centerBtn: document.getElementById("centerMessageObjectBtn"),
    init() {
      this.centerBtn.addEventListener("click", () => {
        window.$message.open({
          text: "3",
          showClose: true,
          center: true,
        });
      });
    },
  };
  centerController.init();

  // 关闭事件
  const closeEventController = {
    closeEventBtn: document.getElementById("closeEventBtn"),
    init() {
      this.closeEventBtn.addEventListener("click", () => {
        window.$message
          .open({
            text: "3",
            showClose: true,
            center: true,
          })
          .onClose(() => {
            alert("关闭了");
          });
      });
    },
  };
  closeEventController.init();
})
</script>

# Message 消息提示

常用于主动操作后的反馈提示。与 Notification 的区别是后者更多用于系统级通知的被动提醒。

## 引入

`js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-message/index.js";
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

## 基础用法

从顶部出现，3 秒后自动消失。

<div class="demo">
    <ea-button id="messageTextBtn">文本类消息提示(info)</ea-button>
</div>

::: details 查看代码

`html`

```html
<div class="demo">
  <ea-button id="messageTextBtn">文本类消息提示(info)</ea-button>
</div>
```

`js`

```js
const btn = document.getElementById("messageTextBtn");
btn.addEventListener("click", () => {
  window.$message.open("1");
});
```

:::

## 不同状态

用来显示「成功、警告、消息、错误」类的操作反馈。通过设置 `option` 中的 `type` 属性来改变主题。

<div class="row left">
    <ea-button id="messageObjectBtn">对象类消息提示(info)</ea-button>
    <ea-button id="messageSuccessObjectBtn" type="success">对象类消息提示(success)</ea-button>
    <ea-button id="messageErrorObjectBtn" type="danger">对象类消息提示(error)</ea-button>
    <ea-button id="messageWarningObjectBtn" type="warning">对象类消息提示(warning)</ea-button>
</div>

::: details 查看代码

`html`

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

`js`

```js
const differentController = {
  objectBtn: document.getElementById("messageObjectBtn"),
  successObjectBtn: document.getElementById("messageSuccessObjectBtn"),
  errorObjectBtn: document.getElementById("messageErrorObjectBtn"),
  warningObjectBtn: document.getElementById("messageWarningObjectBtn"),

  addEvent(btn, fn) {
    btn.addEventListener("click", () => {
      if (fn) fn();
    });
  },

  init() {
    this.addEvent(this.objectBtn, () => {
      window.$message.open({
        text: "2",
        type: "info",
      });
    });

    this.addEvent(this.successObjectBtn, () => {
      window.$message.open({
        text: "2",
        type: "success",
      });
    });

    this.addEvent(this.errorObjectBtn, () => {
      window.$message.open({
        text: "3",
        type: "error",
      });
    });

    this.addEvent(this.warningObjectBtn, () => {
      window.$message.open({
        text: "3",
        type: "warning",
      });
    });
  },
};

differentController.init();
```

:::

## 可关闭

使用 `showClose` 属性可以让消息提示显示关闭按钮。使用 `duration` 属性可以让消息提示按照既定的时间自动消失, 若 `duration` 设置为 `0` , 则该消息提示不会自动消失。

<div class="row left">
    <ea-button id="messageObjectBtnHasClose">对象类消息提示(info)</ea-button>
    <ea-button id="messageObjectBtnNotClose">对象类消息提示(不会自动关闭)</ea-button>
    <ea-button id="messageSuccessObjectBtnBtnHasClose" type="success">对象类消息提示(success)</ea-button>
    <ea-button id="messageErrorObjectBtnBtnHasClose" type="danger">对象类消息提示(error)</ea-button>
    <ea-button id="messageWarningObjectBtnBtnHasClose" type="warning">对象类消息提示(warning)</ea-button>
</div>

::: details 查看代码

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
const closableController = {
  closableBtn: document.getElementById("messageObjectBtnHasClose"),
  durationIsZeroBtn: document.getElementById("messageObjectBtnNotClose"),
  successObjectBtn: document.getElementById(
    "messageSuccessObjectBtnBtnHasClose"
  ),
  errorObjectBtn: document.getElementById("messageErrorObjectBtnBtnHasClose"),
  warningObjectBtn: document.getElementById(
    "messageWarningObjectBtnBtnHasClose"
  ),

  addEvent(btn, fn) {
    btn.addEventListener("click", () => {
      if (fn) fn();
    });
  },

  init() {
    this.addEvent(this.closableBtn, () => {
      window.$message.open({
        text: "2",
        showClose: true,
        type: "info",
      });
    });

    this.addEvent(this.durationIsZeroBtn, () => {
      window.$message.open({
        text: "2",
        showClose: true,
        type: "info",
        duration: 0,
      });
    });

    this.addEvent(this.successObjectBtn, () => {
      window.$message.open({
        text: "2",
        showClose: true,
        type: "success",
      });
    });

    this.addEvent(this.errorObjectBtn, () => {
      window.$message.open({
        text: "3",
        showClose: true,
        type: "error",
      });
    });

    this.addEvent(this.warningObjectBtn, () => {
      window.$message.open({
        text: "3",
        showClose: true,
        type: "warning",
      });
    });
  },
};

closableController.init();
```

:::

## 文字居中

使用 `center` 属性让文字水平居中。

<div class="row left">
    <ea-button id="centerMessageObjectBtn">文字居中</ea-button>
</div>

::: details 查看代码

```html
<div class="row left">
  <ea-button id="centerMessageObjectBtn">文字居中</ea-button>
</div>
```

```js
const centerController = {
  centerBtn: document.getElementById("centerMessageObjectBtn"),
  init() {
    this.centerBtn.addEventListener("click", () => {
      window.$message.open({
        text: "3",
        showClose: true,
        center: true,
      });
    });
  },
};
centerController.init();
```

:::

## close 事件

<div class="demo">
    <ea-button id="closeEventBtn">自定义 close 事件</ea-button>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-button id="closeEventBtn">自定义 close 事件</ea-button>
</div>
```

```js
const closeEventController = {
  closeEventBtn: document.getElementById("closeEventBtn"),
  init() {
    this.closeEventBtn.addEventListener("click", () => {
      window.$message
        .open({
          text: "3",
          showClose: true,
          center: true,
        })
        .onClose(() => {
          alert("关闭了");
        });
    });
  },
};
closeEventController.init();
```

:::

## Attributes

| 参数      | 说明                                  | 类型    | 可选值                     | 默认值 |
| --------- | ------------------------------------- | ------- | -------------------------- | ------ |
| text      | 消息提示的内容                        | string  | —                          | —      |
| type      | 主题类型                              | string  | success/warning/info/error | info   |
| showClose | 是否显示关闭按钮                      | boolean | —                          | false  |
| center    | 文字是否居中                          | boolean | —                          | false  |
| duration  | 显示时间, 毫秒。设为 0 则不会自动关闭 | number  | —                          | 3000   |

## CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称         | 说明           |
| ------------ | -------------- |
| container    | 外层容器       |
| icon         | 类型自带的图标 |
| content-wrap | 内容容器       |
| icon-cancel  | 关闭按钮       |

## Events

| 事件名称 | 说明             |
| -------- | ---------------- |
| close    | 关闭时的回调函数 |
