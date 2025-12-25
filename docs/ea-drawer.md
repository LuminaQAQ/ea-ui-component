<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  import("../dist/components/index.js")
  import("../dist/assets/icon.css")

  // ------- 基本用法 -------
  // #region
  const Drawer = {
    drawer: document.querySelector("#drawer"),

    ltrBtn: document.querySelector("#openDrawerBtn--ltr"),
    rtlBtn: document.querySelector("#openDrawerBtn--rtl"),
    ttbBtn: document.querySelector("#openDrawerBtn--ttb"),
    bttBtn: document.querySelector("#openDrawerBtn--btt"),

    init() {
      this.ltrBtn.addEventListener("click", () => {
        this.drawer.direction = "ltr";
        this.drawer.visible = true;
      });

      this.rtlBtn.addEventListener("click", () => {
        this.drawer.direction = "rtl";
        this.drawer.visible = true;
      });

      this.ttbBtn.addEventListener("click", () => {
        this.drawer.direction = "ttb";
        this.drawer.visible = true;
      });

      this.bttBtn.addEventListener("click", () => {
        this.drawer.direction = "btt";
        this.drawer.visible = true;
      });

      this.drawer.addEventListener("before-close", e => {
        const { done } = e.detail;
        $confirm("Are you confirm to chose", "Warning", {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        })
          .then(action => {
            done();
          })
          .catch(action => {});
      });

      this.drawer.addEventListener("close", () => {
        console.log("close");
      });
    },
  };

  Drawer.init();
  // #endregion
  // ------- end -------

  // ------- 不添加 Title -------
  // #region
  const noHeaderExample = {
    drawer: document.querySelector("#noHeaderDrawer"),
    openBtn: document.querySelector("#noHeaderBtn"),

    init() {
      this.openBtn.addEventListener("click", () => {
        this.drawer.visible = true;
      });
    },
  };
  noHeaderExample.init();
  // #endregion
  // ------- end -------

  // ------- 自定义内容 -------
  // #region
  const CustomDrawer = {
    drawer: document.querySelector("#customDrawer"),
    openBtn: document.querySelector("#openCustomDrawerBtn"),
    cancelBtn: document.querySelector("#customCancelBtn"),
    confirmBtn: document.querySelector("#customConfirmBtn"),

    init() {
      /**
       * @param {() => void || null} done
       */
      let done = null;

      this.openBtn.addEventListener("click", () => {
        this.drawer.visible = true;
      });

      this.cancelBtn.addEventListener("click", () => {
        this.drawer["before-close"] = false;
        this.drawer.visible = false;
      });

      this.confirmBtn.addEventListener("click", () => {
        this.drawer["before-close"] = true;

        this.drawer.visible = false;
      });

      this.drawer.addEventListener("before-close", e => {
        done = e.detail.done;
        $confirm("Are you confirm to chose", "Warning", {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        })
          .then(action => {
            done();
          })
          .catch(action => {});
      });
    },
  };

  CustomDrawer.init();
  // #endregion
  // ------- end -------

  // ------- 嵌套抽屉 -------
  // #region
  const nestingExample = {
    outerBtn: document.querySelector("#outerBtn"),
    innerBtn: document.querySelector("#innerBtn"),
    outerDrawer: document.querySelector("#outerDrawer"),
    innerDrawer: document.querySelector("#innerDrawer"),

    init() {
      this.outerBtn.addEventListener("click", () => {
        this.outerDrawer.visible = true;
      });

      this.innerBtn.addEventListener("click", () => {
        this.innerDrawer.visible = true;
      });

      this.innerDrawer.addEventListener("before-close", e => {
        const { done } = e.detail;
        $confirm("Are you confirm to chose", "Warning", {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        })
          .then(action => {
            done();
          })
          .catch(action => {});
      });
    },
  };
  nestingExample.init();
  // #endregion
  // ------- end -------
})
</script>

# Drawer 抽屉

## 引入

> `js`

```js
<script type='module'>
  import "./node_modules/easy-component-ui/components/ea-drawer/index.js";
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

## 基本用法

呼出一个临时的侧边栏, 可以从多个方向呼出。可以在 `ea-drawer` 标签上添加 `direction` 属性来指定呼出方向。

<div class="demo">
  <ea-button type="primary" id="openDrawerBtn--ltr">从左往右开</ea-button>
  <ea-button type="primary" id="openDrawerBtn--rtl">从右往左开</ea-button>
  <ea-button type="primary" id="openDrawerBtn--ttb">从上往下开</ea-button>
  <ea-button type="primary" id="openDrawerBtn--btt">从下往上开</ea-button>

  <ea-drawer id="drawer" title="I am the title" direction="ltr" before-close>
    <span>Hi, there!</span>
  </ea-drawer>
</div>

::: code-group

```html
<div class="demo">
  <ea-button type="primary" id="openDrawerBtn--ltr">从左往右开</ea-button>
  <ea-button type="primary" id="openDrawerBtn--rtl">从右往左开</ea-button>
  <ea-button type="primary" id="openDrawerBtn--ttb">从上往下开</ea-button>
  <ea-button type="primary" id="openDrawerBtn--btt">从下往上开</ea-button>

  <ea-drawer id="drawer" title="I am the title" direction="ltr" before-close>
    <span>Hi, there!</span>
  </ea-drawer>
</div>
```

```js
const Drawer = {
  drawer: document.querySelector("#drawer"),

  ltrBtn: document.querySelector("#openDrawerBtn--ltr"),
  rtlBtn: document.querySelector("#openDrawerBtn--rtl"),
  ttbBtn: document.querySelector("#openDrawerBtn--ttb"),
  bttBtn: document.querySelector("#openDrawerBtn--btt"),

  init() {
    this.ltrBtn.addEventListener("click", () => {
      this.drawer.direction = "ltr";
      this.drawer.visible = true;
    });

    this.rtlBtn.addEventListener("click", () => {
      this.drawer.direction = "rtl";
      this.drawer.visible = true;
    });

    this.ttbBtn.addEventListener("click", () => {
      this.drawer.direction = "ttb";
      this.drawer.visible = true;
    });

    this.bttBtn.addEventListener("click", () => {
      this.drawer.direction = "btt";
      this.drawer.visible = true;
    });

    this.drawer.addEventListener("before-close", e => {
      const { done } = e.detail;
      $confirm("Are you confirm to chose", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(action => {
          done();
        })
        .catch(action => {});
    });

    this.drawer.addEventListener("close", () => {
      console.log("close");
    });
  },
};

Drawer.init();
```

:::

## 不添加 Title​

当你不需要标题的时候，你可以将它移除。

通过设置 with-header 属性为 false 来控制是否显示标题。 如果你的应用需要具备可访问性，请务必设置好 title。

<div class="demo">
  <ea-button type="primary" id="noHeaderBtn">open</ea-button>
  <ea-drawer
    id="noHeaderDrawer"
    title="I am the title"
    direction="ltr"
    with-header="false"
  >
    <span>Hi, there!</span>
  </ea-drawer>
</div>

::: code-group

```html
<div class="demo">
  <ea-button type="primary" id="noHeaderBtn">open</ea-button>

  <ea-drawer
    id="noHeaderDrawer"
    title="I am the title"
    direction="ltr"
    with-header="false"
  >
    <span>Hi, there!</span>
  </ea-drawer>
</div>
```

```js
const noHeaderExample = {
  drawer: document.querySelector("#noHeaderDrawer"),
  openBtn: document.querySelector("#noHeaderBtn"),

  init() {
    this.openBtn.addEventListener("click", () => {
      this.drawer.visible = true;
    });
  },
};
noHeaderExample.init();
```

:::

## 自定义内容

`Drawer` 可以在其内部嵌套各种丰富的操作

<div class="demo">
  <ea-button type="primary" id="openCustomDrawerBtn"
    >打开自定义内容的抽屉</ea-button
  >
  <ea-drawer id="customDrawer" title="我是标题" direction="ltr" before-close>
    <ea-descriptions direction="vertical" border>
      <ea-descriptions-item label="用户名"> Lilyiro </ea-descriptions-item>
      <ea-descriptions-item label="身高"> 165cm </ea-descriptions-item>
      <ea-descriptions-item label="年龄"> 17岁 </ea-descriptions-item>
      <ea-descriptions-item label="称号">
        <ea-tag>宿命背反</ea-tag>
      </ea-descriptions-item>
      <ea-descriptions-item label="属性" span="1">
        <ea-tag type="warning" style="margin-right: 1rem">雷电</ea-tag>
        <ea-tag type="info">物理</ea-tag>
      </ea-descriptions-item>
    </ea-descriptions>
    <footer slot="footer" style="text-align: right">
      <ea-button id="customCancelBtn" plain>Cancel</ea-button>
      <ea-button id="customConfirmBtn" type="primary">Confirm</ea-button>
    </footer>
  </ea-drawer>
</div>

::: code-group

```html
<div class="demo">
  <ea-button type="primary" id="openCustomDrawerBtn"
    >打开自定义内容的抽屉</ea-button
  >

  <ea-drawer id="customDrawer" title="我是标题" direction="ltr" before-close>
    <ea-descriptions direction="vertical" border>
      <ea-descriptions-item label="用户名"> Lilyiro </ea-descriptions-item>
      <ea-descriptions-item label="身高"> 165cm </ea-descriptions-item>
      <ea-descriptions-item label="年龄"> 17岁 </ea-descriptions-item>
      <ea-descriptions-item label="称号">
        <ea-tag>宿命背反</ea-tag>
      </ea-descriptions-item>
      <ea-descriptions-item label="属性" span="1">
        <ea-tag type="warning" style="margin-right: 1rem">雷电</ea-tag>
        <ea-tag type="info">物理</ea-tag>
      </ea-descriptions-item>
    </ea-descriptions>

    <footer slot="footer" style="text-align: right">
      <ea-button id="customCancelBtn" plain>Cancel</ea-button>
      <ea-button id="customConfirmBtn" type="primary">Confirm</ea-button>
    </footer>
  </ea-drawer>
</div>
```

```js
const CustomDrawer = {
  drawer: document.querySelector("#customDrawer"),
  openBtn: document.querySelector("#openCustomDrawerBtn"),
  cancelBtn: document.querySelector("#customCancelBtn"),
  confirmBtn: document.querySelector("#customConfirmBtn"),

  init() {
    /**
     * @param {() => void || null} done
     */
    let done = null;

    this.openBtn.addEventListener("click", () => {
      this.drawer.visible = true;
    });

    this.cancelBtn.addEventListener("click", () => {
      this.drawer["before-close"] = false;
      this.drawer.visible = false;
    });

    this.confirmBtn.addEventListener("click", () => {
      this.drawer["before-close"] = true;

      this.drawer.visible = false;
    });

    this.drawer.addEventListener("before-close", e => {
      done = e.detail.done;

      $confirm("Are you confirm to chose", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(action => {
          done();
        })
        .catch(action => {});
    });
  },
};

CustomDrawer.init();
```

:::

## 嵌套抽屉​

你可以像 `Dialog` 一样拥有多层嵌套的 `Drawer`

如果你需要在不同图层中多个抽屉，你必须设置 `append-to-body` 属性为 `true`

<div class="demo">
  <ea-button type="primary" id="outerBtn">open</ea-button>
  <ea-drawer id="outerDrawer" title="I'm outer Drawer" size="50%">
    <div>
      <ea-button id="innerBtn">Click me!</ea-button>
      <ea-drawer
        id="innerDrawer"
        title="I'm inner Drawer"
        append-to-body="true"
        before-close
      >
        <p>_(:зゝ∠)_</p>
      </ea-drawer>
    </div>
  </ea-drawer>
</div>

::: code-group

```html
<div class="demo">
  <ea-button type="primary" id="outerBtn">open</ea-button>
  <ea-drawer id="outerDrawer" title="I'm outer Drawer" size="50%">
    <div>
      <ea-button id="innerBtn">Click me!</ea-button>
      <ea-drawer
        id="innerDrawer"
        title="I'm inner Drawer"
        append-to-body="true"
        before-close
      >
        <p>_(:зゝ∠)_</p>
      </ea-drawer>
    </div>
  </ea-drawer>
</div>
```

```js
const nestingExample = {
  outerBtn: document.querySelector("#outerBtn"),
  innerBtn: document.querySelector("#innerBtn"),
  outerDrawer: document.querySelector("#outerDrawer"),
  innerDrawer: document.querySelector("#innerDrawer"),

  init() {
    this.outerBtn.addEventListener("click", () => {
      this.outerDrawer.visible = true;
    });

    this.innerBtn.addEventListener("click", () => {
      this.innerDrawer.visible = true;
    });

    this.innerDrawer.addEventListener("before-close", e => {
      const { done } = e.detail;
      $confirm("Are you confirm to chose", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(action => {
          done();
        })
        .catch(action => {});
    });
  },
};
nestingExample.init();
```

:::

## Attributes

| 参数                  | 说明                                                                    | 类型    | 可选值                                                 | 默认值 |
| :-------------------- | :---------------------------------------------------------------------- | :------ | :----------------------------------------------------- | :----- |
| title                 | 标题文本（同步到 header 中的 title）                                    | string  | -                                                      | ""     |
| visible               | 是否可见（受控属性，设置为 true/false）                                 | boolean | -                                                      | false  |
| open                  | 兼容旧名，等同于 `visible`（文档中优先使用 `visible`）                  | boolean | -                                                      | false  |
| size                  | 抽屉尺寸，支持百分比或固定宽度/高度（根据 direction 决定是宽或高）      | string  | 例如: "30%", "400px"                                   | 30%    |
| modal                 | 是否显示遮罩层                                                          | boolean | -                                                      | true   |
| direction             | 抽屉方向                                                                | string  | ltr（从左到右）, rtl, ttb（从上到下）, btt（从下到上） | rtl    |
| close-on-click-modal  | 点击遮罩是否关闭（组件内部属性名）                                      | boolean | -                                                      | true   |
| close-on-press-escape | 按下 Esc 是否关闭                                                       | boolean | -                                                      | true   |
| before-close          | 是否启用 before-close 钩子（在关闭前触发事件，可通过 detail.done 控制） | boolean | -                                                      | false  |
| show-close            | 是否显示右上角关闭图标（close icon）                                    | boolean | -                                                      | true   |
| with-header           | 是否显示头部（header）                                                  | boolean | -                                                      | true   |
| append-to-body        | 是否挂载到 body（用于嵌套抽屉确保层级正确）                             | boolean | -                                                      | false  |
| append-to             | 指定挂载宿主元素的选择器或元素（当需要自定义挂载点时使用）              | string  | 例如: "#app" 或 "body"                                 | -      |
| z-index               | 自定义层级                                                              | number  | -                                                      | -      |

## CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称       | 说明                                                         |
| ---------- | ------------------------------------------------------------ |
| container  | 外层 overlay 容器，包含遮罩与抽屉 (对应模板中 `.ea-overlay`) |
| header     | 抽屉头部（part="header"），包含 `title` 和 `close-icon`      |
| title      | 标题容器（part="title"），对应 slot[name="title"] 的显示位置 |
| close-icon | 关闭图标（part="close-icon"），可以自定义样式或隐藏          |
| content    | 主体内容区域（part="content"），对应默认 slot                |
| footer     | 底部区域（part="footer"），对应 slot[name="footer"]          |

## Events

> Drawer 是基于 Overlay 组件实现的，具体事件可参考 [Overlay](./ea-overlay.md#events) 组件

| 事件名       | 说明                                                               | 回调参数 / detail                         |
| :----------- | :----------------------------------------------------------------- | :---------------------------------------- |
| before-close | 关闭前触发（当 `before-close` 属性为 true 时，会在尝试关闭时触发） | { done: Function } — 调用 done() 完成关闭 |

## Slots

| 名称   | 说明                                                    |
| :----- | :------------------------------------------------------ |
| (默认) | 抽屉主体内容，映射到模板中的默认 slot（part="content"） |
| title  | 标题内容，会显示在 header 的 title 区域（part="title"） |
| footer | 底部插槽，显示在 footer 区域（part="footer"）           |
