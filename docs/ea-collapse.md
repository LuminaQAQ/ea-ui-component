<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  import('../dist/components/index.js')
  import('../dist/assets/icon.css')

  // ------- 基础用法 -------
  // #region
  const basicExample = {
    el: document.querySelector("#basicCollapse"),
    openAllBtn: document.querySelector("#basicCollapseOpenAllBtn"),
    closeAllBtn: document.querySelector("#basicCollapseCloseAllBtn"),

    init() {
      this.openAllBtn.addEventListener("click", () => {
        this.el.setActiveNames(["1", "2", "3", "4"]);
      });

      this.closeAllBtn.addEventListener("click", () => {
        this.el.setActiveNames([]);
      });
    },
  };
  basicExample.init();
  // #endregion
  // ------- end -------

  // ------- 手风琴效果 -------
  // #region
  const accordionCollapseExample = {
    el: document.querySelector("#accordionCollapse"),
    init() {
      this.el.active = "1";
    },
  };
  accordionCollapseExample.init();
  // #endregion
  // ------- end -------

  // ------- 自定义面板标题 -------
  // #region
  const customTitleCollapseExample = {
    el: document.querySelector("#customTitleCollapse"),
    init() {
      this.el.active = "1";
    },
  };
  customTitleCollapseExample.init();
  // #endregion
  // ------- end -------

  // ------- 自定义图标 -------
  // #region
  const customIconCollapseExample = {
    el: document.querySelector("#customIconCollapse"),
    init() {
      this.el.active = ["1"];
    },
  };
  customIconCollapseExample.init();
  // #endregion
  // ------- end -------

  // ------- 自定义图标位置 -------
  // #region
  const customExpandIconPositionExample = {
    el: document.querySelector("#customExpandIconPositionCollapse"),
    btn: document.querySelector("#customExpandIconPositionSwitch"),
    init() {
      this.el.active = ["1"];

      this.btn.addEventListener("change", ({ detail }) => {
        const { value } = detail;
        this.el["expand-icon-position"] = value;
      });
    },
  };
  customExpandIconPositionExample.init();
  // #endregion
  // ------- end -------

  // ------- 阻止折叠 -------
  // #region
  const hasBeforeCollapseExample = {
    el: document.querySelector("#hasBeforeCollapse"),
    btn: document.querySelector("#hasBeforeCollapseSwitch"),

    loadingTemplate: `
      <div id="loadingInstance" class="loading-example">
        <ea-icon icon="icon-cw"></ea-icon>
      </div>
    `,

    init() {
      const loading = new Proxy(
        { value: false },
        {
          get: (target, key) => {
            return target[key];
          },
          set: (target, key, value) => {
            if (value) {
              const tpl = document.createElement("template");
              tpl.innerHTML = this.loadingTemplate.trim();
              this.el.appendChild(tpl.content.cloneNode(true));
            } else {
              document.querySelector("#loadingInstance").remove();
            }
            target[key] = value;
            return true;
          },
        }
      );

      const beforeCollapse = () => {
        loading.value = true;
        return new Promise(resolve => {
          setTimeout(() => {
            loading.value = false;
            return resolve(true);
          }, 1000);
        });
      };

      this.el.active = ["1"];

      this.btn.addEventListener("change", ({ detail }) => {
        const { value } = detail;
        if (value === "true") {
          this.el.beforeCollapse = beforeCollapse;
        } else {
          this.el.beforeCollapse = null;
        }
      });
    },
  };
  hasBeforeCollapseExample.init();
  // #endregion
  // ------- end -------
})
</script>

<style lang="scss">
  #customTitle[active] .header {
    color: aqua;
  }

  .icon {
    display: block;
    position: relative;
  }

  .icon::after {
    display: block;
    content: attr(inactive-text);

    font-size: 14px;
  }

  #customTextIconCollapseItem[active] .icon::after {
    content: attr(active-text);
  }

  #customIconCollapseItem ea-icon {
    transition: transform 0.3s ease-in-out;
  }

  #customIconCollapseItem[active] ea-icon {
    transform: rotate(-45deg);
  }
  .loading-collapse-example {
    position: relative;
  }

  .loading-example {
    position: absolute;
    left: 0;
    top: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;

    background-color: aliceblue;

    opacity: 0.7;

    ea-icon[icon="icon-cw"] {
      animation: rotate 1s linear infinite;
    }
  }

  @keyframes rotate {
    to {
      transform: rotate(360deg);
    }
  }
</style>

# Collapse 折叠面板

通过折叠面板收纳内容区域

## 引入

> `js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-collapse/index.js";
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

可同时展开多个面板，面板之间不影响。通过设置元素上的 `active` 属性来控制指定面板的开或关，前提是设置好 `name` 属性，若不设置，则默认为子组件的顺序。

<div class="demo">
  <ea-button-group type="primary">
    <ea-button id="basicCollapseOpenAllBtn">
      设置 active 为 ["1", "2", "3", "4"]
    </ea-button>
    <ea-button id="basicCollapseCloseAllBtn">
      设置 active 为 []
    </ea-button>
  </ea-button-group>
  <ea-collapse id="basicCollapse">
    <ea-collapse-item title="Consistency" name="1">
      <div>
        Consistent with real life: in line with the process and logic of real
        life, and comply with languages and habits that the users are used to;
      </div>
      <div>
        Consistent within interface: all elements should be consistent, such as:
        design style, icons and texts, position of elements, etc.
      </div>
    </ea-collapse-item>
    <ea-collapse-item title="Feedback" name="2">
      <div>
        Operation feedback: enable the users to clearly perceive their
        operations by style updates and interactive effects;
      </div>
      <div>
        Visual feedback: reflect current state by updating or rearranging
        elements of the page.
      </div>
    </ea-collapse-item>
    <ea-collapse-item title="Efficiency" name="3">
      <div>
        Simplify the process: keep operating process simple and intuitive;
      </div>
      <div>
        Definite and clear: enunciate your intentions clearly so that the users
        can quickly understand and make decisions;
      </div>
      <div>
        Easy to identify: the interface should be straightforward, which helps
        the users to identify and frees them from memorizing and recalling.
      </div>
    </ea-collapse-item>
    <ea-collapse-item title="Controllability" name="4">
      <div>
        Decision making: giving advices about operations is acceptable, but do
        not make decisions for the users;
      </div>
      <div>
        Controlled consequences: users should be granted the freedom to operate,
        including canceling, aborting or terminating current operation.
      </div>
    </ea-collapse-item>
  </ea-collapse>
</div>

::: code-group

```html
<div class="demo">
  <ea-button-group>
    <ea-button id="basicCollapseOpenAllBtn" type="primary">
      设置 active 为 ["1", "2", "3", "4"]
    </ea-button>
    <ea-button id="basicCollapseCloseAllBtn" type="primary">
      设置 active 为 []
    </ea-button>
  </ea-button-group>
  <ea-collapse id="basicCollapse">
    <ea-collapse-item title="Consistency" name="1">
      <div>
        Consistent with real life: in line with the process and logic of real
        life, and comply with languages and habits that the users are used to;
      </div>
      <div>
        Consistent within interface: all elements should be consistent, such as:
        design style, icons and texts, position of elements, etc.
      </div>
    </ea-collapse-item>
    <ea-collapse-item title="Feedback" name="2">
      <div>
        Operation feedback: enable the users to clearly perceive their
        operations by style updates and interactive effects;
      </div>
      <div>
        Visual feedback: reflect current state by updating or rearranging
        elements of the page.
      </div>
    </ea-collapse-item>
    <ea-collapse-item title="Efficiency" name="3">
      <div>
        Simplify the process: keep operating process simple and intuitive;
      </div>
      <div>
        Definite and clear: enunciate your intentions clearly so that the users
        can quickly understand and make decisions;
      </div>
      <div>
        Easy to identify: the interface should be straightforward, which helps
        the users to identify and frees them from memorizing and recalling.
      </div>
    </ea-collapse-item>
    <ea-collapse-item title="Controllability" name="4">
      <div>
        Decision making: giving advices about operations is acceptable, but do
        not make decisions for the users;
      </div>
      <div>
        Controlled consequences: users should be granted the freedom to operate,
        including canceling, aborting or terminating current operation.
      </div>
    </ea-collapse-item>
  </ea-collapse>
</div>
```

```js
const basicExample = {
  el: document.querySelector("#basicCollapse"),
  openAllBtn: document.querySelector("#basicCollapseOpenAllBtn"),
  closeAllBtn: document.querySelector("#basicCollapseCloseAllBtn"),

  init() {
    this.openAllBtn.addEventListener("click", () => {
      this.el.setActiveNames(["1", "2", "3", "4"]);
    });

    this.closeAllBtn.addEventListener("click", () => {
      this.el.setActiveNames([]);
    });
  },
};
basicExample.init();
```

:::

## 手风琴效果

每次只能展开一个面板。通过设置 `accordion` 属性为 `true` 来开启手风琴模式。可以在元素上添加 `change` 事件来监听面板的展开和收起。

<div class="demo">
  <ea-collapse id="accordionCollapse" accordion>
    <ea-collapse-item title="Consistency" name="1">
      <div>
        Consistent with real life: in line with the process and logic of real
        life, and comply with languages and habits that the users are used to;
      </div>
      <div>
        Consistent within interface: all elements should be consistent, such as:
        design style, icons and texts, position of elements, etc.
      </div>
    </ea-collapse-item>
    <ea-collapse-item title="Feedback" name="2">
      <div>
        Operation feedback: enable the users to clearly perceive their
        operations by style updates and interactive effects;
      </div>
      <div>
        Visual feedback: reflect current state by updating or rearranging
        elements of the page.
      </div>
    </ea-collapse-item>
    <ea-collapse-item title="Efficiency" name="3">
      <div>
        Simplify the process: keep operating process simple and intuitive;
      </div>
      <div>
        Definite and clear: enunciate your intentions clearly so that the users
        can quickly understand and make decisions;
      </div>
      <div>
        Easy to identify: the interface should be straightforward, which helps
        the users to identify and frees them from memorizing and recalling.
      </div>
    </ea-collapse-item>
    <ea-collapse-item title="Controllability" name="4">
      <div>
        Decision making: giving advices about operations is acceptable, but do
        not make decisions for the users;
      </div>
      <div>
        Controlled consequences: users should be granted the freedom to operate,
        including canceling, aborting or terminating current operation.
      </div>
    </ea-collapse-item>
  </ea-collapse>
</div>

::: code-group

```html
<div class="demo">
  <ea-collapse id="accordionCollapse" accordion>
    <ea-collapse-item title="Consistency" name="1">
      <div>
        Consistent with real life: in line with the process and logic of real
        life, and comply with languages and habits that the users are used to;
      </div>
      <div>
        Consistent within interface: all elements should be consistent, such as:
        design style, icons and texts, position of elements, etc.
      </div>
    </ea-collapse-item>
    <ea-collapse-item title="Feedback" name="2">
      <div>
        Operation feedback: enable the users to clearly perceive their
        operations by style updates and interactive effects;
      </div>
      <div>
        Visual feedback: reflect current state by updating or rearranging
        elements of the page.
      </div>
    </ea-collapse-item>
    <ea-collapse-item title="Efficiency" name="3">
      <div>
        Simplify the process: keep operating process simple and intuitive;
      </div>
      <div>
        Definite and clear: enunciate your intentions clearly so that the users
        can quickly understand and make decisions;
      </div>
      <div>
        Easy to identify: the interface should be straightforward, which helps
        the users to identify and frees them from memorizing and recalling.
      </div>
    </ea-collapse-item>
    <ea-collapse-item title="Controllability" name="4">
      <div>
        Decision making: giving advices about operations is acceptable, but do
        not make decisions for the users;
      </div>
      <div>
        Controlled consequences: users should be granted the freedom to operate,
        including canceling, aborting or terminating current operation.
      </div>
    </ea-collapse-item>
  </ea-collapse>
</div>
```

```js
const accordionCollapseExample = {
  el: document.querySelector("#accordionCollapse"),
  init() {
    this.el.active = "1";
  },
};
accordionCollapseExample.init();
```

:::

## 自定义面板标题

除了可以通过 `title` 属性以外，还可以通过具名 `slot` 来实现自定义面板的标题内容，以实现增加图标等效果。

<div class="demo">
  <ea-collapse id="customTitleCollapse" accordion>
    <ea-collapse-item id="customTitle" name="1">
      <div class="header" slot="title">
        Consistency
        <ea-icon icon="icon-coffee" class="header-icon"></ea-icon>
      </div>
      <div>
        Consistent with real life: in line with the process and logic of real
        life, and comply with languages and habits that the users are used to;
      </div>
      <div>
        Consistent within interface: all elements should be consistent, such as:
        design style, icons and texts, position of elements, etc.
      </div>
    </ea-collapse-item>
    <ea-collapse-item title="Feedback" name="2">
      <div>
        Operation feedback: enable the users to clearly perceive their
        operations by style updates and interactive effects;
      </div>
      <div>
        Visual feedback: reflect current state by updating or rearranging
        elements of the page.
      </div>
    </ea-collapse-item>
    <ea-collapse-item title="Efficiency" name="3">
      <div>
        Simplify the process: keep operating process simple and intuitive;
      </div>
      <div>
        Definite and clear: enunciate your intentions clearly so that the users
        can quickly understand and make decisions;
      </div>
      <div>
        Easy to identify: the interface should be straightforward, which helps
        the users to identify and frees them from memorizing and recalling.
      </div>
    </ea-collapse-item>
    <ea-collapse-item title="Controllability" name="4">
      <div>
        Decision making: giving advices about operations is acceptable, but do
        not make decisions for the users;
      </div>
      <div>
        Controlled consequences: users should be granted the freedom to operate,
        including canceling, aborting or terminating current operation.
      </div>
    </ea-collapse-item>
  </ea-collapse>
</div>

::: code-group

```html
<div class="demo">
  <ea-collapse id="customTitleCollapse" accordion>
    <ea-collapse-item id="customTitle" name="1">
      <div class="header" slot="title">
        Consistency
        <ea-icon icon="icon-coffee" class="header-icon"></ea-icon>
      </div>
      <div>
        Consistent with real life: in line with the process and logic of real
        life, and comply with languages and habits that the users are used to;
      </div>
      <div>
        Consistent within interface: all elements should be consistent, such as:
        design style, icons and texts, position of elements, etc.
      </div>
    </ea-collapse-item>
    <ea-collapse-item title="Feedback" name="2">
      <div>
        Operation feedback: enable the users to clearly perceive their
        operations by style updates and interactive effects;
      </div>
      <div>
        Visual feedback: reflect current state by updating or rearranging
        elements of the page.
      </div>
    </ea-collapse-item>
    <ea-collapse-item title="Efficiency" name="3">
      <div>
        Simplify the process: keep operating process simple and intuitive;
      </div>
      <div>
        Definite and clear: enunciate your intentions clearly so that the users
        can quickly understand and make decisions;
      </div>
      <div>
        Easy to identify: the interface should be straightforward, which helps
        the users to identify and frees them from memorizing and recalling.
      </div>
    </ea-collapse-item>
    <ea-collapse-item title="Controllability" name="4">
      <div>
        Decision making: giving advices about operations is acceptable, but do
        not make decisions for the users;
      </div>
      <div>
        Controlled consequences: users should be granted the freedom to operate,
        including canceling, aborting or terminating current operation.
      </div>
    </ea-collapse-item>
  </ea-collapse>
</div>
```

```css
#customTitle[active] .header {
  color: aqua;
}
```

```js
const customTitleCollapseExample = {
  el: document.querySelector("#customTitleCollapse"),
  init() {
    this.el.active = "1";
  },
};
customTitleCollapseExample.init();
```

:::

## 自定义图标

除了使用 `icon` 属性外，您还可以自定义面板项目图标，从而添加自定义内容。

<div class="demo">
  <ea-collapse id="customIconCollapse">
    <ea-collapse-item id="customIconCollapseItem" title="Consistency" name="1">
      <div>
        Consistent with real life: in line with the process and logic of real
        life, and comply with languages and habits that the users are used to;
      </div>
      <div>
        Consistent within interface: all elements should be consistent, such as:
        design style, icons and texts, position of elements, etc.
      </div>
      <ea-icon icon="icon-coffee" slot="icon"></ea-icon>
    </ea-collapse-item>
    <ea-collapse-item id="customTextIconCollapseItem" title="Feedback" name="2">
      <div>
        Operation feedback: enable the users to clearly perceive their
        operations by style updates and interactive effects;
      </div>
      <div>
        Visual feedback: reflect current state by updating or rearranging
        elements of the page.
      </div>
      <span
        class="icon"
        slot="icon"
        inactive-text="Collapsed"
        active-text="Expanded"
      ></span>
    </ea-collapse-item>
    <ea-collapse-item title="Efficiency" name="3">
      <div>
        Simplify the process: keep operating process simple and intuitive;
      </div>
      <div>
        Definite and clear: enunciate your intentions clearly so that the users
        can quickly understand and make decisions;
      </div>
      <div>
        Easy to identify: the interface should be straightforward, which helps
        the users to identify and frees them from memorizing and recalling.
      </div>
    </ea-collapse-item>
    <ea-collapse-item title="Controllability" name="4">
      <div>
        Decision making: giving advices about operations is acceptable, but do
        not make decisions for the users;
      </div>
      <div>
        Controlled consequences: users should be granted the freedom to operate,
        including canceling, aborting or terminating current operation.
      </div>
    </ea-collapse-item>
  </ea-collapse>
</div>

::: code-group

```html
<div class="demo">
  <ea-collapse id="customIconCollapse">
    <ea-collapse-item id="customIconCollapseItem" title="Consistency" name="1">
      <div>
        Consistent with real life: in line with the process and logic of real
        life, and comply with languages and habits that the users are used to;
      </div>
      <div>
        Consistent within interface: all elements should be consistent, such as:
        design style, icons and texts, position of elements, etc.
      </div>
      <ea-icon icon="icon-coffee" slot="icon"></ea-icon>
    </ea-collapse-item>
    <ea-collapse-item id="customTextIconCollapseItem" title="Feedback" name="2">
      <div>
        Operation feedback: enable the users to clearly perceive their
        operations by style updates and interactive effects;
      </div>
      <div>
        Visual feedback: reflect current state by updating or rearranging
        elements of the page.
      </div>
      <span
        class="icon"
        slot="icon"
        inactive-text="Collapsed"
        active-text="Expanded"
      ></span>
    </ea-collapse-item>
    <ea-collapse-item title="Efficiency" name="3">
      <div>
        Simplify the process: keep operating process simple and intuitive;
      </div>
      <div>
        Definite and clear: enunciate your intentions clearly so that the users
        can quickly understand and make decisions;
      </div>
      <div>
        Easy to identify: the interface should be straightforward, which helps
        the users to identify and frees them from memorizing and recalling.
      </div>
    </ea-collapse-item>
    <ea-collapse-item title="Controllability" name="4">
      <div>
        Decision making: giving advices about operations is acceptable, but do
        not make decisions for the users;
      </div>
      <div>
        Controlled consequences: users should be granted the freedom to operate,
        including canceling, aborting or terminating current operation.
      </div>
    </ea-collapse-item>
  </ea-collapse>
</div>
```

```css
.icon {
  display: block;
  position: relative;
}

.icon::after {
  display: block;
  content: attr(inactive-text);

  font-size: 14px;
}

#customTextIconCollapseItem[active] .icon::after {
  content: attr(active-text);
}

#customIconCollapseItem ea-icon {
  transition: transform 0.3s ease-in-out;
}

#customIconCollapseItem[active] ea-icon {
  transform: rotate(-45deg);
}
```

```js
const customIconCollapseExample = {
  el: document.querySelector("#customIconCollapse"),
  init() {
    this.el.active = ["1"];
  },
};
customIconCollapseExample.init();
```

:::

## 自定义图标位置

使用 `expand-icon-position `属性，您可以自定义图标位置。

<div class="demo">
  <div style="margin-bottom: 1rem">
    <span>expand icon position: </span>
    <ea-switch
      id="customExpandIconPositionSwitch"
      value="right"
      inactive-value="left"
      active-value="right"
      inactive-text="left"
      active-text="right"
      inactive-color="#88b8fe"
    ></ea-switch>
  </div>

  <ea-collapse id="customExpandIconPositionCollapse">
    <ea-collapse-item title="Consistency" name="1">
      <div>
        Consistent with real life: in line with the process and logic of real
        life, and comply with languages and habits that the users are used to;
      </div>
      <div>
        Consistent within interface: all elements should be consistent, such as:
        design style, icons and texts, position of elements, etc.
      </div>
    </ea-collapse-item>
    <ea-collapse-item title="Feedback" name="2">
      <div>
        Operation feedback: enable the users to clearly perceive their
        operations by style updates and interactive effects;
      </div>
      <div>
        Visual feedback: reflect current state by updating or rearranging
        elements of the page.
      </div>
    </ea-collapse-item>
    <ea-collapse-item title="Efficiency" name="3">
      <div>
        Simplify the process: keep operating process simple and intuitive;
      </div>
      <div>
        Definite and clear: enunciate your intentions clearly so that the users
        can quickly understand and make decisions;
      </div>
      <div>
        Easy to identify: the interface should be straightforward, which helps
        the users to identify and frees them from memorizing and recalling.
      </div>
    </ea-collapse-item>
    <ea-collapse-item title="Controllability" name="4">
      <div>
        Decision making: giving advices about operations is acceptable, but do
        not make decisions for the users;
      </div>
      <div>
        Controlled consequences: users should be granted the freedom to operate,
        including canceling, aborting or terminating current operation.
      </div>
    </ea-collapse-item>
  </ea-collapse>
</div>

::: code-group

```html
<div class="demo">
  <div style="margin-bottom: 1rem">
    <span>expand icon position: </span>
    <ea-switch
      id="customExpandIconPositionSwitch"
      value="right"
      inactive-value="left"
      active-value="right"
      inactive-text="left"
      active-text="right"
      inactive-color="#88b8fe"
    ></ea-switch>
  </div>

  <ea-collapse id="customExpandIconPositionCollapse">
    <ea-collapse-item title="Consistency" name="1">
      <div>
        Consistent with real life: in line with the process and logic of real
        life, and comply with languages and habits that the users are used to;
      </div>
      <div>
        Consistent within interface: all elements should be consistent, such as:
        design style, icons and texts, position of elements, etc.
      </div>
    </ea-collapse-item>
    <ea-collapse-item title="Feedback" name="2">
      <div>
        Operation feedback: enable the users to clearly perceive their
        operations by style updates and interactive effects;
      </div>
      <div>
        Visual feedback: reflect current state by updating or rearranging
        elements of the page.
      </div>
    </ea-collapse-item>
    <ea-collapse-item title="Efficiency" name="3">
      <div>
        Simplify the process: keep operating process simple and intuitive;
      </div>
      <div>
        Definite and clear: enunciate your intentions clearly so that the users
        can quickly understand and make decisions;
      </div>
      <div>
        Easy to identify: the interface should be straightforward, which helps
        the users to identify and frees them from memorizing and recalling.
      </div>
    </ea-collapse-item>
    <ea-collapse-item title="Controllability" name="4">
      <div>
        Decision making: giving advices about operations is acceptable, but do
        not make decisions for the users;
      </div>
      <div>
        Controlled consequences: users should be granted the freedom to operate,
        including canceling, aborting or terminating current operation.
      </div>
    </ea-collapse-item>
  </ea-collapse>
</div>
```

```js
const customExpandIconPositionExample = {
  el: document.querySelector("#customExpandIconPositionCollapse"),
  btn: document.querySelector("#customExpandIconPositionSwitch"),
  init() {
    this.el.active = ["1"];

    this.btn.addEventListener("change", ({ detail }) => {
      const { value } = detail;
      this.el["expand-icon-position"] = value;
    });
  },
};
customExpandIconPositionExample.init();
```

:::

## 阻止折叠

设置 `beforeChange` 属性，若返回 `false` 或者返回 `Promise` 且被 `reject` ，则停止切换。

<div class="demo loading-collapse-example">
  <div style="margin-bottom: 1rem">
    <span>before collapse return: </span>
    <ea-switch
      id="hasBeforeCollapseSwitch"
      inactive-value="false"
      active-value="true"
      inactive-text="false"
      active-text="true"
      inactive-color="#88b8fe"
    ></ea-switch>
  </div>
  <ea-collapse id="hasBeforeCollapse">
    <ea-collapse-item title="Consistency" name="1">
      <div>
        Consistent with real life: in line with the process and logic of real
        life, and comply with languages and habits that the users are used to;
      </div>
      <div>
        Consistent within interface: all elements should be consistent, such as:
        design style, icons and texts, position of elements, etc.
      </div>
    </ea-collapse-item>
    <ea-collapse-item title="Feedback" name="2">
      <div>
        Operation feedback: enable the users to clearly perceive their
        operations by style updates and interactive effects;
      </div>
      <div>
        Visual feedback: reflect current state by updating or rearranging
        elements of the page.
      </div>
    </ea-collapse-item>
    <ea-collapse-item title="Efficiency" name="3">
      <div>
        Simplify the process: keep operating process simple and intuitive;
      </div>
      <div>
        Definite and clear: enunciate your intentions clearly so that the users
        can quickly understand and make decisions;
      </div>
      <div>
        Easy to identify: the interface should be straightforward, which helps
        the users to identify and frees them from memorizing and recalling.
      </div>
    </ea-collapse-item>
    <ea-collapse-item title="Controllability" name="4">
      <div>
        Decision making: giving advices about operations is acceptable, but do
        not make decisions for the users;
      </div>
      <div>
        Controlled consequences: users should be granted the freedom to operate,
        including canceling, aborting or terminating current operation.
      </div>
    </ea-collapse-item>
  </ea-collapse>
</div>

::: code-group

```html
<div class="demo loading-collapse-example">
  <div style="margin-bottom: 1rem">
    <span>before collapse return: </span>
    <ea-switch
      id="hasBeforeCollapseSwitch"
      inactive-value="false"
      active-value="true"
      inactive-text="false"
      active-text="true"
      inactive-color="#88b8fe"
    ></ea-switch>
  </div>

  <ea-collapse id="hasBeforeCollapse">
    <ea-collapse-item title="Consistency" name="1">
      <div>
        Consistent with real life: in line with the process and logic of real
        life, and comply with languages and habits that the users are used to;
      </div>
      <div>
        Consistent within interface: all elements should be consistent, such as:
        design style, icons and texts, position of elements, etc.
      </div>
    </ea-collapse-item>
    <ea-collapse-item title="Feedback" name="2">
      <div>
        Operation feedback: enable the users to clearly perceive their
        operations by style updates and interactive effects;
      </div>
      <div>
        Visual feedback: reflect current state by updating or rearranging
        elements of the page.
      </div>
    </ea-collapse-item>
    <ea-collapse-item title="Efficiency" name="3">
      <div>
        Simplify the process: keep operating process simple and intuitive;
      </div>
      <div>
        Definite and clear: enunciate your intentions clearly so that the users
        can quickly understand and make decisions;
      </div>
      <div>
        Easy to identify: the interface should be straightforward, which helps
        the users to identify and frees them from memorizing and recalling.
      </div>
    </ea-collapse-item>
    <ea-collapse-item title="Controllability" name="4">
      <div>
        Decision making: giving advices about operations is acceptable, but do
        not make decisions for the users;
      </div>
      <div>
        Controlled consequences: users should be granted the freedom to operate,
        including canceling, aborting or terminating current operation.
      </div>
    </ea-collapse-item>
  </ea-collapse>
</div>
```

```css
.loading-collapse-example {
  position: relative;
}

.loading-example {
  position: absolute;
  left: 0;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  background-color: aliceblue;

  opacity: 0.7;
}

.loading-example ea-icon[icon="icon-cw"] {
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}
```

```js
const hasBeforeCollapseExample = {
  el: document.querySelector("#hasBeforeCollapse"),
  btn: document.querySelector("#hasBeforeCollapseSwitch"),

  loadingTemplate: document.querySelector("#loadingTemplate").content,

  init() {
    this.el.active = ["1"];

    let loadingTarget = null;
    const loading = new Proxy(
      { value: false },
      {
        get: (target, key) => {
          return target[key];
        },
        set: (target, key, value) => {
          if (value) {
            this.el.appendChild(this.loadingTemplate.cloneNode(true));
            loadingTarget = document.querySelector("#loadingInstance");
          } else {
            if (loadingTarget && typeof loadingTarget.remove === "function") {
              loadingTarget.remove();
            }
            loadingTarget = null;
          }
          target[key] = value;
          return true;
        },
      }
    );

    const beforeCollapse = () => {
      loading.value = true;
      return new Promise(resolve => {
        setTimeout(() => {
          loading.value = false;
          return resolve(true);
        }, 1000);
      });
    };

    this.el.beforeCollapse = beforeCollapse;
  },
};
hasBeforeCollapseExample.init();
```

:::

## Collapse API

### Collapse Attributes

| 参数                                 | 说明                                                   | 类型     | 可选值          | 默认值 |
| ------------------------------------ | ------------------------------------------------------ | -------- | --------------- | ------ |
| active                               | 当前激活面板的 name. 当展开元素为多项时, 需用逗号分隔. | string   | —               | —      |
| accordion                            | 是否开启手风琴模式                                     | boolean  | —               | false  |
| expand-icon-position                 | 设置图标位置                                           | string   | `left \| right` | left   |
| beforeCollapse <ea-tag>Prop</ea-tag> | 展开前的回调，返回 false 则取消展开                    | function | —               | —      |

### Collapse CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称      | 说明     |
| --------- | -------- |
| container | 外层容器 |

### Collapse Slots

| 名称 | 说明     |
| ---- | -------- |
| -    | 默认插槽 |

### Collapse Events

| 事件名称 | 说明                                       | 回调参数                                                                       |
| -------- | ------------------------------------------ | ------------------------------------------------------------------------------ |
| change   | 手动展开面板变化时触发（对应 active 属性） | e.detail: `{ name: string, active: string[] \| string, target: HTMLElement  }` |

### Collapse Methods

| 方法名                                      | 说明                                                                           |
| ------------------------------------------- | ------------------------------------------------------------------------------ |
| setActiveNames(`names: string[] \| string`) | 设置组件的 active 值。传入数组可同时展开多项；传入字符串仅在手风琴模式下生效。 |

## CollapseItem API

### CollapseItem Attributes

| 参数     | 说明                                                                                        |
| -------- | ------------------------------------------------------------------------------------------- |
| title    | 面板标题（可选）。当使用具名 slot `title` 时可省略。                                        |
| name     | 面板的唯一标识，collapse 通过此字段进行开/关控制。若不提供，组件会以子项顺序生成默认 name。 |
| disabled | 若为 true，则该面板无法被切换。                                                             |

### CollapseItem CSS Part

| 名称          | 说明                                               |
| ------------- | -------------------------------------------------- |
| container     | 外层容器, 包含标题`title-wrap`和内容`content-wrap` |
| title-wrap    | 标题容器                                           |
| title-content | 标题内容                                           |
| indicator     | 标题图标容器                                       |
| icon          | 标题图标                                           |
| content-wrap  | 内容容器                                           |

                                                                  |

### CollapseItem Slots

| 名称  | 说明         |
| ----- | ------------ |
| -     | 默认插槽     |
| title | 标题插槽     |
| icon  | 标题图标插槽 |
