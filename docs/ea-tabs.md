<script setup>
  import { onMounted } from 'vue'
  import "../dist/components/index.js";
  import "../dist/assets/icon.css";

  onMounted(() => {  
    const directionExample = {
      selector: document.querySelector("#tabDirectionSegmented"),
      placement: ["top", "right", "bottom", "left"],

      normalTabs: document.querySelector("#directionNormalTabs"),
      cardTabs: document.querySelector("#directionCardTabs"),
      borderCardTabs: document.querySelector("#directionBorderCardTabs"),

      init() {
        const direction = new Proxy(
          { value: "top" },
          {
            get: (target, property) => {
              return target[property];
            },
            set: (target, property, value) => {
              if (property === "value") {
                this.normalTabs.setAttribute("tab-position", value);
                this.cardTabs.setAttribute("tab-position", value);
                this.borderCardTabs.setAttribute("tab-position", value);
              }

              target[property] = value;
              return true;
            },
          }
        );

        this.selector.options = this.placement;

        this.selector.addEventListener("change", e => {
          direction.value = e.detail.value;
        });
      },
    };

    directionExample.init();

    const editableExample = {
      addBtn: document.querySelector("#editableAddBtn"),
      tabs: document.querySelector("#editableTabs"),

      renderTemplate: (panelName, tabName, content) => `
        <ea-tab panel="${panelName}">${tabName}</ea-tab>
        <ea-tab-panel name="${panelName}">${content}</ea-tab-panel>
      `,

      init() {
        const templateEl = document.createElement("template");

        this.addBtn.addEventListener("click", () => {
          const id = Date.now();

          templateEl.innerHTML = this.renderTemplate(
            id,
            "New Tab",
            "New Tab content<br/>" + id
          );

          this.tabs.appendChild(templateEl.content.cloneNode(true));
          this.tabs.setAttribute("active", id);
        });

        for (let i = 0; i < 10; i++) {
          setTimeout(() => {
            this.addBtn.click();
          }, 10);
        }
      },
    };
    editableExample.init();
  })
</script>

<style>
.basic-tabs-demo::part(content) {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>

# Tabs 标签页

分隔内容上有关联但属于不同类别的数据集合。

## 引入

::: code-group

```html [原生引入]
<script type="module">
  import "./node_modules/easy-component-ui/dist/components/ea-tabs.js";
</script>
```

```js [Vite]
import "easy-component-ui/ea-tabs";
```

:::

## 自定义样式

移步到 [CSS Part](#tabs-css-part)。

## 基础用法

基础的、简洁的标签页。

> `Tabs` 组件提供了选项卡功能，默认选中第一个标签页，你也可以通过 `active` 属性来指定当前选中的标签页。

<div class="demo">
  <ea-tabs class="basic-tabs-demo">
    <ea-tab panel="first">User</ea-tab>
    <ea-tab panel="second">Config</ea-tab>
    <ea-tab panel="third">Role</ea-tab>
    <ea-tab panel="fourth">Task</ea-tab>
    <ea-tab-panel name="first">User</ea-tab-panel>
    <ea-tab-panel name="second">Config</ea-tab-panel>
    <ea-tab-panel name="third">Role</ea-tab-panel>
    <ea-tab-panel name="fourth">Task</ea-tab-panel>
  </ea-tabs>
</div>

:::: details 查看代码

::: code-group

```html
<ea-tabs class="basic-tabs-demo">
  <ea-tab panel="first">User</ea-tab>
  <ea-tab panel="second">Config</ea-tab>
  <ea-tab panel="third">Role</ea-tab>
  <ea-tab panel="fourth">Task</ea-tab>

  <ea-tab-panel name="first">User</ea-tab-panel>
  <ea-tab-panel name="second">Config</ea-tab-panel>
  <ea-tab-panel name="third">Role</ea-tab-panel>
  <ea-tab-panel name="fourth">Task</ea-tab-panel>
</ea-tabs>
```

```css
.basic-tabs-demo::part(content) {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
```

:::

::::

## 卡片风格的标签

你可以设置具有卡片风格的标签。

只需要设置 `type` 属性为 `card` 就可以使选项卡改变为标签风格。

<div class="demo">
  <ea-tabs class="basic-tabs-demo" type="card">
    <ea-tab panel="first">User</ea-tab>
    <ea-tab panel="second">Config</ea-tab>
    <ea-tab panel="third">Role</ea-tab>
    <ea-tab panel="fourth">Task</ea-tab>
    <ea-tab-panel name="first">User</ea-tab-panel>
    <ea-tab-panel name="second">Config</ea-tab-panel>
    <ea-tab-panel name="third">Role</ea-tab-panel>
    <ea-tab-panel name="fourth">Task</ea-tab-panel>
  </ea-tabs>
</div>

::: details 查看代码

```html
<ea-tabs class="basic-tabs-demo" type="card">
  <ea-tab panel="first">User</ea-tab>
  <ea-tab panel="second">Config</ea-tab>
  <ea-tab panel="third">Role</ea-tab>
  <ea-tab panel="fourth">Task</ea-tab>

  <ea-tab-panel name="first">User</ea-tab-panel>
  <ea-tab-panel name="second">Config</ea-tab-panel>
  <ea-tab-panel name="third">Role</ea-tab-panel>
  <ea-tab-panel name="fourth">Task</ea-tab-panel>
</ea-tabs>
```

:::

## 带有边框的卡片风格

你还可以设置标签页为带有边框的卡片。

将 `type` 设置为 `border-card`。

<div class="demo">
  <ea-tabs type="border-card">
    <ea-tab panel="first">User</ea-tab>
    <ea-tab panel="second">Config</ea-tab>
    <ea-tab panel="third">Role</ea-tab>
    <ea-tab panel="fourth">Task</ea-tab>
    <ea-tab-panel name="first">User</ea-tab-panel>
    <ea-tab-panel name="second">Config</ea-tab-panel>
    <ea-tab-panel name="third">Role</ea-tab-panel>
    <ea-tab-panel name="fourth">Task</ea-tab-panel>
  </ea-tabs>
</div>

::: details 查看代码

```html
<ea-tabs type="border-card">
  <ea-tab panel="first">User</ea-tab>
  <ea-tab panel="second">Config</ea-tab>
  <ea-tab panel="third">Role</ea-tab>
  <ea-tab panel="fourth">Task</ea-tab>

  <ea-tab-panel name="first">User</ea-tab-panel>
  <ea-tab-panel name="second">Config</ea-tab-panel>
  <ea-tab-panel name="third">Role</ea-tab-panel>
  <ea-tab-panel name="fourth">Task</ea-tab-panel>
</ea-tabs>
```

:::

## 标签位置的设置

可以通过 `tab-position` 设置标签的位置。

标签一共有四个方向的设置 `tabPosition="left|right|top|bottom"`。

<div class="demo">
  <p>
    <ea-segmented
      id="tabDirectionSegmented"
      name="direction"
      value="top"
    ></ea-segmented>
    <ea-tabs
      id="directionNormalTabs"
      class="basic-tabs-demo"
      style="height: 200px"
    >
      <ea-tab panel="first">User</ea-tab>
      <ea-tab panel="second">Config</ea-tab>
      <ea-tab panel="third">Role</ea-tab>
      <ea-tab panel="fourth">Task</ea-tab>
      <ea-tab-panel name="first">User</ea-tab-panel>
      <ea-tab-panel name="second">Config</ea-tab-panel>
      <ea-tab-panel name="third">Role</ea-tab-panel>
      <ea-tab-panel name="fourth">Task</ea-tab-panel>
    </ea-tabs>
    <br />
    <ea-tabs
      id="directionCardTabs"
      class="basic-tabs-demo"
      type="card"
      style="height: 200px"
    >
      <ea-tab panel="first">User</ea-tab>
      <ea-tab panel="second">Config</ea-tab>
      <ea-tab panel="third">Role</ea-tab>
      <ea-tab panel="fourth">Task</ea-tab>
      <ea-tab-panel name="first">User</ea-tab-panel>
      <ea-tab-panel name="second">Config</ea-tab-panel>
      <ea-tab-panel name="third">Role</ea-tab-panel>
      <ea-tab-panel name="fourth">Task</ea-tab-panel>
    </ea-tabs>
    <br />
    <ea-tabs
      id="directionBorderCardTabs"
      class="basic-tabs-demo"
      type="border-card"
      style="height: 200px"
    >
      <ea-tab panel="first">User</ea-tab>
      <ea-tab panel="second">Config</ea-tab>
      <ea-tab panel="third">Role</ea-tab>
      <ea-tab panel="fourth">Task</ea-tab>
      <ea-tab-panel name="first">User</ea-tab-panel>
      <ea-tab-panel name="second">Config</ea-tab-panel>
      <ea-tab-panel name="third">Role</ea-tab-panel>
      <ea-tab-panel name="fourth">Task</ea-tab-panel>
    </ea-tabs>
  </p>
</div>

:::: details 查看代码

::: code-group

```html
<ea-segmented name="direction" value="top"></ea-segmented>

<ea-tabs style="height: 200px">
  <ea-tab panel="first">User</ea-tab>
  <ea-tab panel="second">Config</ea-tab>
  <ea-tab panel="third">Role</ea-tab>
  <ea-tab panel="fourth">Task</ea-tab>
  <ea-tab-panel name="first">User</ea-tab-panel>
  <ea-tab-panel name="second">Config</ea-tab-panel>
  <ea-tab-panel name="third">Role</ea-tab-panel>
  <ea-tab-panel name="fourth">Task</ea-tab-panel>
</ea-tabs>
```

```js
const directionExample = {
  selector: document.querySelector("#tabDirectionSegmented"),
  placement: ["top", "right", "bottom", "left"],

  normalTabs: document.querySelector("#directionNormalTabs"),
  cardTabs: document.querySelector("#directionCardTabs"),
  borderCardTabs: document.querySelector("#directionBorderCardTabs"),

  init() {
    const direction = new Proxy(
      { value: "top" },
      {
        set: (target, property, value) => {
          if (property === "value") {
            this.normalTabs.setAttribute("tab-position", value);
            this.cardTabs.setAttribute("tab-position", value);
            this.borderCardTabs.setAttribute("tab-position", value);
          }

          target[property] = value;
          return true;
        },
      }
    );

    this.selector.options = this.placement;

    this.selector.addEventListener("change", e => {
      direction.value = e.detail.value;
    });
  },
};

directionExample.init();
```

:::

::::

## 自定义标签页的内容

可以通过具名插槽来实现自定义标签页的内容。

<div class="demo">
  <ea-tabs class="basic-tabs-demo" type="border-card">
    <ea-tab panel="first">User</ea-tab>
    <ea-tab panel="second">Config</ea-tab>
    <ea-tab panel="third">Role</ea-tab>
    <ea-tab panel="fourth">Task</ea-tab>
    <ea-tab-panel name="first">User</ea-tab-panel>
    <ea-tab-panel name="second">Config</ea-tab-panel>
    <ea-tab-panel name="third">Role</ea-tab-panel>
    <ea-tab-panel name="fourth">Task</ea-tab-panel>
  </ea-tabs>
</div>

::: details 查看代码

```html
<ea-tabs class="basic-tabs-demo" type="border-card">
  <ea-tab panel="first">User</ea-tab>
  <ea-tab panel="second">Config</ea-tab>
  <ea-tab panel="third">Role</ea-tab>
  <ea-tab panel="fourth">Task</ea-tab>

  <ea-tab-panel name="first">User</ea-tab-panel>
  <ea-tab-panel name="second">Config</ea-tab-panel>
  <ea-tab-panel name="third">Role</ea-tab-panel>
  <ea-tab-panel name="fourth">Task</ea-tab-panel>
</ea-tabs>
```

:::

## 动态增减标签页

通过设置 `editable`，标签页可以动态增删。

<div class="demo">
  <p>
    <ea-button id="editableAddBtn">add tab</ea-button>
  </p>
  <ea-tabs id="editableTabs" class="basic-tabs-demo" type="card" editable>
    <ea-tab panel="first">User</ea-tab>
    <ea-tab panel="second">Config</ea-tab>
    <ea-tab panel="third" closable="false">Role</ea-tab>
    <ea-tab panel="fourth">Task</ea-tab>
    <ea-tab-panel name="first">User</ea-tab-panel>
    <ea-tab-panel name="second">Config</ea-tab-panel>
    <ea-tab-panel name="third">Role</ea-tab-panel>
    <ea-tab-panel name="fourth">Task</ea-tab-panel>
  </ea-tabs>
</div>

:::: details 查看代码

::: code-group

```html
<ea-button id="editableAddBtn">add tab</ea-button>

<ea-tabs type="card" editable>
  <ea-tab panel="first">User</ea-tab>
  <ea-tab panel="second">Config</ea-tab>
  <ea-tab panel="third" closable="false">Role</ea-tab>
  <ea-tab panel="fourth">Task</ea-tab>

  <ea-tab-panel name="first">User</ea-tab-panel>
  <ea-tab-panel name="second">Config</ea-tab-panel>
  <ea-tab-panel name="third">Role</ea-tab-panel>
  <ea-tab-panel name="fourth">Task</ea-tab-panel>
</ea-tabs>
```

```js
const editableExample = {
  addBtn: document.querySelector("#editableAddBtn"),
  tabs: document.querySelector("#editableTabs"),

  renderTemplate: (panelName, tabName, content) => `
    <ea-tab panel="${panelName}">${tabName}</ea-tab>
    <ea-tab-panel name="${panelName}">${content}</ea-tab-panel>
  `,

  init() {
    const templateEl = document.createElement("template");

    this.addBtn.addEventListener("click", () => {
      const id = Date.now();

      templateEl.innerHTML = this.renderTemplate(
        id,
        "New Tab",
        "New Tab content<br/>" + id
      );

      this.tabs.appendChild(templateEl.content.cloneNode(true));
      this.tabs.setAttribute("active", id);
    });
  },
};
editableExample.init();
```

:::

::::

## Tabs API

### Tabs Attributes

| 参数        | 说明                                                 | 类型    | 可选值                      | 默认值 |
| ----------- | ---------------------------------------------------- | ------- | --------------------------- | ------ |
| active      | 当前激活的标签页（panel 名称），可用于设置默认激活项 | String  | —                           | —      |
| type        | 标签页风格                                           | String  | `'' \| card \| border-card` | ''     |
| editable    | 是否启用可编辑（增删）模式                           | Boolean | —                           | false  |
| tabPosition | 标签栏的位置（水平或垂直）                           | String  | top / right / bottom / left | top    |

### Tabs CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称      | 说明                 |
| --------- | -------------------- |
| container | 外层容器             |
| nav       | 标签栏容器           |
| prev      | 上一个标签滚动按钮   |
| next      | 下一个标签滚动按钮   |
| line      | 标签栏下方的连接线   |
| indicator | 标签栏下方的指示器   |
| content   | 标签栏下方的面板内容 |

### Tabs Events

| 事件名         | 说明               | 回调参数(event.detail)                 |
| -------------- | ------------------ | -------------------------------------- |
| ea-tab-click   | 点击标签时触发     | `{ name: string, panel: HTMLElement }` |
| ea-tabs-change | 标签页切换时触发   | `{ name: string }`                     |
| ea-tab-remove  | 点击删除标签时触发 | `{ name: string }`                     |

### Tabs Slots

| 名称 | 说明                                         | 子标签         |
| ---- | -------------------------------------------- | -------------- |
| nav  | 放置标签项的容器（无须手动设置）             | `ea-tab`       |
| —    | 默认插槽，用于放置面板子元素（无须手动设置） | `ea-tab-panel` |

### Tabs CSS Custom Properties

| 属性名                         | 说明             | 默认值                   |
| ------------------------------ | ---------------- | ------------------------ |
| --ea-tabs-tab-spacing          | 标签项间距       | var(--spacing-lg)        |
| --ea-tabs-border-color         | 边框颜色         | var(--grey-300)          |
| --ea-tabs-nav-height           | 导航栏高度       | 40px                     |
| --ea-tabs-border-card-bg-color | 边框卡片背景颜色 | var(--grey-100)          |
| --ea-tabs-content-spacing      | 内容区域内边距   | 15px                     |
| --ea-tabs-indicator-color      | 指示器颜色       | var(--blue-500)          |
| --ea-tabs-indicator-size       | 指示器尺寸       | 0                        |
| --ea-tabs-indicator-x          | 指示器偏移量     | 0                        |
| --ea-tabs-transition           | 过渡动画时长     | var(--transition-normal) |

## Tab API

### Tab Attributes

| 参数     | 说明                                                 | 类型    | 可选值 | 默认值 |
| -------- | ---------------------------------------------------- | ------- | ------ | ------ |
| panel    | 选项卡对应的面板标识，用于与 `ea-tab-panel` 配对     | String  | —      | —      |
| closable | 是否允许当前标签被关闭（仅在 `editable` 模式下生效） | Boolean | —      | false  |
| disabled | 是否禁用该标签（不可点击/切换）                      | Boolean | —      | false  |

### Tab CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称       | 说明                 |
| ---------- | -------------------- |
| container  | 单个标签项的外层容器 |
| close-icon | 关闭图标             |

### Tab Events

| 事件名                  | 说明               | 回调参数(event.detail) |
| ----------------------- | ------------------ | ---------------------- |
| ea-tab-close-icon-click | 点击关闭图标时触发 | `{ panel: string }`    |

### Tab CSS Custom Properties

| 属性名                        | 说明             | 默认值             |
| ----------------------------- | ---------------- | ------------------ |
| --ea-tab-active-color         | 激活状态颜色     | var(--blue-500)    |
| --ea-tab-disabled-color       | 禁用状态颜色     | var(--grey-400)    |
| --ea-tab-border-card-bg-color | 边框卡片背景颜色 | var(--color-white) |

## TabPanel API

### TabPanel Attributes

| 参数 | 说明                                            | 类型   | 可选值 | 默认值 |
| ---- | ----------------------------------------------- | ------ | ------ | ------ |
| name | 面板的唯一标识，用于与 `ea-tab` 的 `panel` 配对 | String | —      | —      |

### TabPanel CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称      | 说明               |
| --------- | ------------------ |
| container | 面板内容的外层容器 |

### TabPanel Slot

| 名称 | 说明                             |
| ---- | -------------------------------- |
| —    | 默认插槽，用于放置面板的实际内容 |
