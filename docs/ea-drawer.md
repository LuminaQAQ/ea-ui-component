<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  import("../dist/components/index.js")
  import("../dist/components/ea-message-box.js")
  import("../dist/assets/icon.css")

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

      this.drawer.beforeClose = done => {
        $confirm("Are you confirm to close?", "Warning", {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        })
          .then(action => {
            done();
          })
          .catch(action => {
            done(true);
          });
      };

      this.drawer.addEventListener("ea-close", () => {
        console.log("close");
      });
    },
  };

  Drawer.init();

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

  const CustomDrawer = {
    drawer: document.querySelector("#customDrawer"),
    openBtn: document.querySelector("#openCustomDrawerBtn"),
    cancelBtn: document.querySelector("#customCancelBtn"),
    confirmBtn: document.querySelector("#customConfirmBtn"),

    bindBeforeClose(actionType) {
      this.drawer.beforeClose = done => {
        const actionText = actionType === "cancel" ? "cancel" : "confirm";
        $confirm(`Are you sure you want to ${actionText}?`, "Warning", {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        })
          .then(action => {
            done();
          })
          .catch(action => {
            done(true);
          });
      };
    },

    init() {
      this.bindBeforeClose("cancel");

      this.openBtn.addEventListener("click", () => {
        this.drawer.visible = true;
      });

      if (this.cancelBtn) {
        this.cancelBtn.addEventListener("click", () => {
          this.bindBeforeClose("cancel");
          this.drawer.visible = false;
        });
      }

      if (this.confirmBtn) {
        this.confirmBtn.addEventListener("click", () => {
          this.bindBeforeClose("confirm");
          this.drawer.visible = false;
        });
      }

      this.drawer.addEventListener("ea-closed", () => {
        this.bindBeforeClose("cancel");
      });
    },
  };

  CustomDrawer.init();

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
    },
  };
  nestingExample.init();
})
</script>

# Drawer 抽屉

呼出一个临时的侧边面板，可以从多个方向呼出。

## 引入

::: code-group

```html [原生引入]
<script type="module">
  import "./node_modules/easy-component-ui/dist/components/ea-drawer.js";
</script>
```

```js [Vite]
import "easy-component-ui/ea-drawer";
```

:::

## 自定义样式

移步到 [CSS Part](#ea-drawer-css-part) 和 [CSS Custom Properties](#ea-drawer-css-自定义属性)。

## 基本用法

可以在 `ea-drawer` 标签上添加 `direction` 属性来指定呼出方向。

<div class="row left">
  <ea-button variant="primary" id="openDrawerBtn--ltr">从左往右开</ea-button>
  <ea-button variant="primary" id="openDrawerBtn--rtl">从右往左开</ea-button>
  <ea-button variant="primary" id="openDrawerBtn--ttb">从上往下开</ea-button>
  <ea-button variant="primary" id="openDrawerBtn--btt">从下往上开</ea-button>

  <ea-drawer id="drawer" heading="I am the title" direction="ltr">
    <span>Hi, there!</span>
  </ea-drawer>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo">
  <ea-button variant="primary" id="openDrawerBtn--ltr">从左往右开</ea-button>
  <ea-button variant="primary" id="openDrawerBtn--rtl">从右往左开</ea-button>
  <ea-button variant="primary" id="openDrawerBtn--ttb">从上往下开</ea-button>
  <ea-button variant="primary" id="openDrawerBtn--btt">从下往上开</ea-button>

  <ea-drawer id="drawer" heading="I am the title" direction="ltr">
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

    this.drawer.beforeClose = done => {
      $confirm("Are you confirm to close?", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(action => {
          done();
        })
        .catch(action => {
          done(true);
        });
    };

    this.drawer.addEventListener("ea-close", () => {
      console.log("close");
    });
  },
};

Drawer.init();
```

:::

::::

## 不添加 Title

当你不需要标题的时候，你可以将它移除。通过设置 `with-header` 属性为 `false` 来控制是否显示标题。如果你的应用需要具备可访问性，请务必设置好 `heading`。

<div class="demo">
  <ea-button variant="primary" id="noHeaderBtn">open</ea-button>
  <ea-drawer
    id="noHeaderDrawer"
    heading="I am the title"
    direction="ltr"
    with-header="false"
  >
    <span>Hi, there!</span>
  </ea-drawer>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo">
  <ea-button variant="primary" id="noHeaderBtn">open</ea-button>
  <ea-drawer
    id="noHeaderDrawer"
    heading="I am the title"
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

::::

## 自定义内容

`Drawer` 可以在其内部嵌套各种丰富的操作。

<div class="demo">
  <ea-button variant="primary" id="openCustomDrawerBtn">打开自定义内容的抽屉</ea-button>
  <ea-drawer id="customDrawer" heading="我是标题" direction="ltr">
    <ea-descriptions title="User Info">
      <ea-descriptions-item label="Username">
        Lilyiro
      </ea-descriptions-item>
      <ea-descriptions-item label="Essence">
        Lord of the Wild
      </ea-descriptions-item>
      <ea-descriptions-item label="Place">
        Lunacrest Continent
      </ea-descriptions-item>
      <ea-descriptions-item label="Traits">
        <ea-tag size="small" type="warning" style="margin-right: 1rem">
          Thunderous Veins
        </ea-tag>
        <ea-tag size="small" type="info">Daredevil</ea-tag>
      </ea-descriptions-item>
      <ea-descriptions-item label="Description">
        She was once an elf lord, defending the border from goblin invaders.
        She was then a goblin warrior, protecting her clan from being
        slaughtered by elves. She has the unwavering courage to uphold
        justice in her heart and she is prepared to betray or be betrayed
        for the greater good. Despite her inner gentleness, Lilyiro, who has
        spilled so much blood on battlefields, is more straightforward than
        men.
      </ea-descriptions-item>
    </ea-descriptions>
    <footer slot="footer" style="text-align: right">
      <ea-button id="customCancelBtn" plain>Cancel</ea-button>
      <ea-button id="customConfirmBtn" variant="primary">Confirm</ea-button>
    </footer>
  </ea-drawer>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo">
  <ea-button variant="primary" id="openCustomDrawerBtn"
    >打开自定义内容的抽屉</ea-button
  >
  <ea-drawer id="customDrawer" heading="我是标题" direction="ltr">
    <ea-descriptions title="User Info">
      <ea-descriptions-item label="Username"> Lilyiro </ea-descriptions-item>
      <ea-descriptions-item label="Essence">
        Lord of the Wild
      </ea-descriptions-item>
      <ea-descriptions-item label="Place">
        Lunacrest Continent
      </ea-descriptions-item>
      <ea-descriptions-item label="Traits">
        <ea-tag size="small" type="warning" style="margin-right: 1rem">
          Thunderous Veins
        </ea-tag>
        <ea-tag size="small" type="info">Daredevil</ea-tag>
      </ea-descriptions-item>
      <ea-descriptions-item label="Description">
        She was once an elf lord, defending the border from goblin invaders. She
        was then a goblin warrior, protecting her clan from being slaughtered by
        elves. She has the unwavering courage to uphold justice in her heart and
        she is prepared to betray or be betrayed for the greater good. Despite
        her inner gentleness, Lilyiro, who has spilled so much blood on
        battlefields, is more straightforward than men.
      </ea-descriptions-item>
    </ea-descriptions>
    <footer slot="footer" style="text-align: right">
      <ea-button id="customCancelBtn" plain>Cancel</ea-button>
      <ea-button id="customConfirmBtn" variant="primary">Confirm</ea-button>
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

  bindBeforeClose(actionType) {
    this.drawer.beforeClose = done => {
      const actionText = actionType === "cancel" ? "cancel" : "confirm";
      $confirm(`Are you sure you want to ${actionText}?`, "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(action => {
          done();
        })
        .catch(action => {
          done(true);
        });
    };
  },

  init() {
    this.bindBeforeClose("cancel");

    this.openBtn.addEventListener("click", () => {
      this.drawer.visible = true;
    });

    this.cancelBtn.addEventListener("click", () => {
      this.bindBeforeClose("cancel");
      this.drawer.visible = false;
    });

    this.confirmBtn.addEventListener("click", () => {
      this.bindBeforeClose("confirm");
      this.drawer.visible = false;
    });

    this.drawer.addEventListener("ea-closed", () => {
      this.bindBeforeClose("cancel");
    });
  },
};

CustomDrawer.init();
```

:::

::::

## 嵌套抽屉

你可以像 `Dialog` 一样拥有多层嵌套的 `Drawer`。如果你需要在不同图层中多个抽屉，你必须设置 `append-to-body` 属性为 `true`。

<div class="demo">
  <ea-button variant="primary" id="outerBtn">open</ea-button>
  <ea-drawer id="outerDrawer" heading="I'm outer Drawer" size="50%">
    <div>
      <ea-button id="innerBtn">Click me!</ea-button>
      <ea-drawer
        id="innerDrawer"
        heading="I'm inner Drawer"
        append-to-body
      >
        <p>_(:зゝ∠)_</p>
      </ea-drawer>
    </div>
  </ea-drawer>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo">
  <ea-button variant="primary" id="outerBtn">open</ea-button>
  <ea-drawer id="outerDrawer" heading="I'm outer Drawer" size="50%">
    <div>
      <ea-button id="innerBtn">Click me!</ea-button>
      <ea-drawer id="innerDrawer" heading="I'm inner Drawer" append-to-body>
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
  },
};
nestingExample.init();
```

:::

::::

## EaDrawer API

### EaDrawer Attributes

| 参数                  | 说明                                                               | 类型    | 可选值                 | 默认值 |
| :-------------------- | :----------------------------------------------------------------- | :------ | :--------------------- | :----- |
| heading               | 标题文本                                                           | string  | —                      | ""     |
| visible               | 是否可见（受控属性）                                               | boolean | —                      | false  |
| size                  | 抽屉尺寸，支持百分比或固定宽度/高度（根据 direction 决定是宽或高） | string  | 例如: "30%", "400px"   | 30%    |
| modal                 | 是否显示遮罩层                                                     | boolean | —                      | true   |
| direction             | 抽屉方向                                                           | string  | ltr / rtl / ttb / btt  | rtl    |
| close-on-click-modal  | 点击遮罩是否关闭                                                   | boolean | —                      | true   |
| close-on-press-escape | 按下 Esc 是否关闭                                                  | boolean | —                      | true   |
| show-close            | 是否显示右上角关闭图标                                             | boolean | —                      | true   |
| with-header           | 是否显示头部                                                       | boolean | —                      | true   |
| append-to-body        | 是否挂载到 body（用于嵌套抽屉确保层级正确）                        | boolean | —                      | false  |
| append-to             | 指定挂载宿主元素的选择器                                           | string  | 例如: "#app" 或 "body" | body   |
| z-index               | 自定义层级                                                         | string  | —                      | —      |
| background-color      | 遮罩层背景色                                                       | string  | —                      | —      |
| content-width         | 内容宽度                                                           | string  | —                      | —      |
| content-max-width     | 内容最大宽度                                                       | string  | —                      | —      |
| content-height        | 内容高度                                                           | string  | —                      | —      |

### EaDrawer Properties

| 参数        | 说明                                                                               | 类型     | 默认值 |
| :---------- | :--------------------------------------------------------------------------------- | :------- | :----- |
| beforeClose | 关闭前的回调函数，接收 done 函数作为参数。`done()` 确认关闭，`done(true)` 取消关闭 | Function | null   |

### EaDrawer CSS Part

| 名称       | 说明                                             |
| :--------- | :----------------------------------------------- |
| container  | 抽屉容器元素（对应模板中 `.ea-drawer`）          |
| header     | 头部元素，包含 heading 和 close-icon             |
| heading    | 标题文本元素，对应 slot[name="title"] 的显示位置 |
| close-icon | 关闭图标元素                                     |
| content    | 主体内容元素，对应默认 slot                      |
| footer     | 底部元素，对应 slot[name="footer"]               |

### EaDrawer Slots

| 名称    | 说明           |
| :------ | :------------- |
| default | 抽屉主体内容   |
| title   | 自定义标题内容 |
| footer  | 自定义底部内容 |

### EaDrawer Methods

| 方法名 | 说明     | 参数 |
| :----- | :------- | :--- |
| show   | 显示抽屉 | —    |
| hide   | 隐藏抽屉 | —    |

### EaDrawer Events

| 事件名    | 说明                   | 回调参数(event.detail) |
| :-------- | :--------------------- | :--------------------- |
| ea-open   | 抽屉打开时触发         | —                      |
| ea-opened | 抽屉打开动画结束时触发 | —                      |
| ea-close  | 抽屉关闭时触发         | —                      |
| ea-closed | 抽屉关闭动画结束时触发 | —                      |

### EaDrawer CSS Custom Properties

| 属性名                        | 说明                               | 默认值              |
| :---------------------------- | :--------------------------------- | :------------------ |
| --ea-drawer-size              | 抽屉尺寸（宽度或高度，取决于方向） | 30%                 |
| --ea-drawer-padding           | 抽屉内边距                         | var(--spacing-lg)   |
| --ea-drawer-heading-color     | 标题颜色                           | var(--grey-900)     |
| --ea-drawer-close-icon-color  | 关闭图标颜色                       | var(--grey-500)     |
| --ea-drawer-content-color     | 内容颜色                           | var(--grey-700)     |
| --ea-drawer-bg-color          | 抽屉背景色                         | var(--white)        |
| --ea-drawer-heading-font-size | 标题字号                           | var(--font-size-lg) |
| --ea-drawer-close-icon-size   | 关闭图标尺寸                       | var(--font-size-lg) |
