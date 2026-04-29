<script setup>
import { onMounted } from 'vue'
import "../dist/components/index.js"
import "../dist/assets/icon.css"

onMounted(async () => {
  await customElements.whenDefined('ea-drawer');
  
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

          this.drawer.beforeClose = done => {
            $confirm("Are you confirm to close?", "Warning", {
              confirmButtonText: "OK",
              cancelButtonText: "Cancel",
              type: "warning",
            })
              .then(action => {
                done();
              })
              .catch(action => {});
          };

          this.drawer.addEventListener("close", () => {
            console.log("close");
          });
        },
      };

      Drawer.init();
      // #endregion
      // ------- end -------
      
      // ------- 不添加Title -------
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

      

      // ------- 自定义内�?-------
      // #region

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
              .catch(action => {});
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

          this.drawer.addEventListener("closed", () => {
            this.bindBeforeClose("cancel");
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

          this.innerDrawer.beforeClose = done => {
            $confirm("Are you confirm to close inner drawer?", "Warning", {
              confirmButtonText: "OK",
              cancelButtonText: "Cancel",
              type: "warning",
            })
              .then(action => {
                done();
              })
              .catch(action => {});
          };
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
需要注意的�? 如果需要使用到带有图标�?`属�?组件`, 需要提前使�?`link` 标签引入 Font Awesome CSS 文件
:::

```html
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
/>
```

## 自定义样�?

移步�?[CSS Part](#css-part)�?

## 基本用法

呼出一个临时的侧边�? 可以从多个方向呼出。可以在 `ea-drawer` 标签上添�?`direction` 属性来指定呼出方向�?

<div class="demo">
  <ea-button variant="primary" id="openDrawerBtn--ltr">从左往右开</ea-button>
  <ea-button variant="primary" id="openDrawerBtn--rtl">从右往左开</ea-button>
  <ea-button variant="primary" id="openDrawerBtn--ttb">从上往下开</ea-button>
  <ea-button variant="primary" id="openDrawerBtn--btt">从下往上开</ea-button>

  <ea-drawer id="drawer" heading="I am the title" direction="ltr">
    <span>Hi, there!</span>
  </ea-drawer>
</div>

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
        .catch(action => {});
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

    this.drawer.addEventListener("closed", () => {
      this.bindBeforeClose("cancel");
    });
  },
};

CustomDrawer.init();
```

:::

## 不添�?Title�?

当你不需要标题的时候，你可以将它移除�?
通过设置 with-header 属性为 false 来控制是否显示标题�?如果你的应用需要具备可访问性，请务必设置好 heading�?

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

## 自定义内�?

`Drawer` 可以在其内部嵌套各种丰富的操�?

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
        .catch(action => {});
    };
  },

  init() {
    this.bindBeforeClose("close");

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

    this.drawer.addEventListener("close", () => {
      this.bindBeforeClose("close");
    });
  },
};

CustomDrawer.init();
```

:::

## 嵌套抽屉�?

你可以像 `Dialog` 一样拥有多层嵌套的 `Drawer`

如果你需要在不同图层中多个抽屉，你必须设�?`append-to-body` 属性为 `true`

<div class="demo">
  <ea-button variant="primary" id="outerBtn">open</ea-button>
  <ea-drawer id="outerDrawer" heading="I'm outer Drawer" size="50%">
    <div>
      <ea-button id="innerBtn">Click me!</ea-button>
      <ea-drawer
        id="innerDrawer"
        heading="I'm inner Drawer"
        append-to-body="true"
      >
        <p>_(:зゝ∠)_</p>
      </ea-drawer>
    </div>
  </ea-drawer>
</div>

::: code-group

```html
<div class="demo">
  <ea-button variant="primary" id="outerBtn">open</ea-button>
  <ea-drawer id="outerDrawer" heading="I'm outer Drawer" size="50%">
    <div>
      <ea-button id="innerBtn">Click me!</ea-button>
      <ea-drawer
        id="innerDrawer"
        heading="I'm inner Drawer"
        append-to-body="true"
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

    this.innerDrawer.beforeClose = done => {
      $confirm("Are you confirm to close inner drawer?", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(action => {
          done();
        })
        .catch(action => {});
    };
  },
};
nestingExample.init();
```

:::

## Attributes

| 参数                  | 说明                                                             | 类型    | 可选�?                                                 | 默认�? |
| :-------------------- | :--------------------------------------------------------------- | :------ | :----------------------------------------------------- | :----- |
| heading               | 标题文本（同步到 header 中的 heading�?                           | string  | -                                                      | ""     |
| visible               | 是否可见（受控属性，设置�?true/false�?                           | boolean | -                                                      | false  |
| size                  | 抽屉尺寸，支持百分比或固定宽�?高度（根�?direction 决定是宽或高�? | string  | 例如: "30%", "400px"                                   | 30%    |
| modal                 | 是否显示遮罩�?                                                   | boolean | -                                                      | true   |
| direction             | 抽屉方向                                                         | string  | ltr（从左到右）, rtl, ttb（从上到下）, btt（从下到上） | rtl    |
| close-on-click-modal  | 点击遮罩是否关闭                                                 | boolean | -                                                      | true   |
| close-on-press-escape | 按下 Esc 是否关闭                                                | boolean | -                                                      | true   |
| show-close            | 是否显示右上角关闭图标（close icon�?                             | boolean | -                                                      | true   |
| with-header           | 是否显示头部（header�?                                           | boolean | -                                                      | true   |
| append-to-body        | 是否挂载�?body（用于嵌套抽屉确保层级正确）                       | boolean | -                                                      | false  |
| append-to             | 指定挂载宿主元素的选择器（当需要自定义挂载点时使用�?             | string  | 例如: "#app" �?"body"                                  | body   |
| z-index               | 自定义层�?                                                       | string  | -                                                      | -      |

## Properties

| 参数        | 说明                                    | 类型     | 默认�? |
| :---------- | :-------------------------------------- | :------- | :----- |
| beforeClose | 关闭前的回调函数，接�?done 函数作为参数 | Function | null   |

## CSS Part

> 用法可参�?[MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称       | 说明                                                           |
| ---------- | -------------------------------------------------------------- |
| container  | 外层 overlay 容器，包含遮罩与抽屉 (对应模板�?`.ea-overlay`)    |
| header     | 抽屉头部（part="header"），包含 `heading` �?`close-icon`       |
| heading    | 标题容器（part="heading"），对应 slot[name="title"] 的显示位�? |
| close-icon | 关闭图标（part="close-icon"），可以自定义样式或隐藏            |
| content    | 主体内容区域（part="content"），对应默认 slot                  |
| footer     | 底部区域（part="footer"），对应 slot[name="footer"]            |

## Events

> Drawer 是基�?Overlay 组件实现的，具体事件可参�?[Overlay](./ea-overlay.md#events) 组件

| 事件�? | 说明               | 回调参数 / detail |
| :----- | :----------------- | :---------------- |
| open   | 打开动画开始时触发 | -                 |
| opened | 打开动画结束时触�? | -                 |
| close  | 关闭动画开始时触发 | -                 |
| closed | 关闭动画结束时触�? | -                 |

## Slots

| 名称   | 说明                                                    |
| :----- | :------------------------------------------------------ |
| (默认) | 抽屉主体内容，映射到模板中的默认 slot（part="content"�? |
| title  | 标题内容，会显示�?header �?title 区域（part="title"�?   |
| footer | 底部插槽，显示在 footer 区域（part="footer"�?           |
