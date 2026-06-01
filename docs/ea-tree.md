<script setup>
import { onMounted } from 'vue'
import "../dist/components/index.js"
import "../dist/assets/icon.css"
import PropType from "./components/PropTag.vue"

onMounted(async () => {
  await customElements.whenDefined("ea-tree");

  const data = [
    {
      label: "Level one 1",
      children: [
        {
          label: "Level two 1-1",
          children: [
            {
              label: "Level three 1-1-1",
            },
          ],
        },
      ],
    },
    {
      label: "Level one 2",
      children: [
        {
          label: "Level two 2-1",
          children: [
            {
              label: "Level three 2-1-1",
            },
          ],
        },
        {
          label: "Level two 2-2",
          children: [
            {
              label: "Level three 2-2-1",
            },
          ],
        },
      ],
    },
    {
      label: "Level one 3",
      children: [
        {
          label: "Level two 3-1",
          children: [
            {
              label: "Level three 3-1-1",
            },
          ],
        },
        {
          label: "Level two 3-2",
          children: [
            {
              label: "Level three 3-2-1",
            },
          ],
        },
      ],
    },
  ];

  const idData = [
    {
      id: 1,
      label: "Level one 1",
      children: [
        {
          id: 3,
          label: "Level two 2-1",
          children: [
            {
              id: 4,
              label: "Level three 3-1-1",
            },
            {
              id: 5,
              label: "Level three 3-1-2",
              disabled: true,
            },
          ],
        },
        {
          id: 2,
          label: "Level two 2-2",
          disabled: true,
          children: [
            {
              id: 6,
              label: "Level three 3-2-1",
            },
            {
              id: 7,
              label: "Level three 3-2-2",
              disabled: true,
            },
          ],
        },
      ],
    },
  ];

  // ------- 基础用法 -------
  // #region
  const basicTree = document.querySelector("#basicTree");
  basicTree.data = data;
  // #endregion
  // ------- end -------

  // ------- 可选择 -------
  // #region
  const checkboxTree = document.querySelector("#checkboxTree");
  checkboxTree.data = data;
  // #endregion
  // ------- end -------

  // ------- 禁用复选框 -------
  // #region
  const disabledCheckboxTree = document.querySelector("#disabledCheckboxTree");
  disabledCheckboxTree.data = idData;
  // #endregion
  // ------- end -------

  // ------- 默认展开以及默认选中 -------
  // #region
  const defaultExpandedTree = document.querySelector("#defaultExpandedTree");
  defaultExpandedTree.defaultExpandedKeys = [1, 2];
  defaultExpandedTree.defaultCheckedKeys = [3, 4];
  defaultExpandedTree.data = idData;
  // #endregion
  // ------- end -------

  // ------- 点击图标展开 -------
  // #region
  const expandOnIconClickTree = document.querySelector("#expandOnIconClickTree");
  expandOnIconClickTree.data = data;
  // #endregion
  // ------- end -------
})
</script>

# Tree 树形控件

树形控件用于展示层次结构数据，支持展开折叠、复选框选择、右键菜单等功能。

## 引入

::: code-group

```html [原生引入]
<script type="module">
  import "./node_modules/easy-component-ui/dist/components/ea-tree.js";
</script>
```

```js [Vite]
import "easy-component-ui/ea-tree";
```

:::

## 自定义样式

移步到 [CSS Part](#tree-css-part) 和 [CSS Custom Properties](#tree-css-自定义属性)。

## 基础用法

最基本的树形控件用法，展示层次结构数据。

<div class="demo">
  <ea-tree id="basicTree"></ea-tree>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo">
  <ea-tree id="basicTree"></ea-tree>
</div>
```

```js
const data = [
  {
    label: "Level one 1",
    children: [
      {
        label: "Level two 1-1",
        children: [
          {
            label: "Level three 1-1-1",
          },
        ],
      },
    ],
  },
  {
    label: "Level one 2",
    children: [
      {
        label: "Level two 2-1",
        children: [
          {
            label: "Level three 2-1-1",
          },
        ],
      },
      {
        label: "Level two 2-2",
        children: [
          {
            label: "Level three 2-2-1",
          },
        ],
      },
    ],
  },
];

const basicTree = document.querySelector("#basicTree");
basicTree.data = data;
```

:::

::::

## 可选择

通过设置 `show-checkbox` 属性启用复选框选择功能。

<div class="demo">
  <ea-tree id="checkboxTree" show-checkbox></ea-tree>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo">
  <ea-tree id="checkboxTree" show-checkbox></ea-tree>
</div>
```

```js
const data = [
  {
    label: "Level one 1",
    children: [
      {
        label: "Level two 1-1",
        children: [
          {
            label: "Level three 1-1-1",
          },
        ],
      },
    ],
  },
  {
    label: "Level one 2",
    children: [
      {
        label: "Level two 2-1",
        children: [
          {
            label: "Level three 2-1-1",
          },
        ],
      },
      {
        label: "Level two 2-2",
        children: [
          {
            label: "Level three 2-2-1",
          },
        ],
      },
    ],
  },
];

const checkboxTree = document.querySelector("#checkboxTree");
checkboxTree.data = data;
```

:::

::::

## 禁用复选框

支持禁用特定节点，通过数据中的 `disabled` 属性控制。

<div class="demo">
  <ea-tree id="disabledCheckboxTree" show-checkbox></ea-tree>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo">
  <ea-tree id="disabledCheckboxTree" show-checkbox></ea-tree>
</div>
```

```js
const idData = [
  {
    id: 1,
    label: "Level one 1",
    children: [
      {
        id: 3,
        label: "Level two 2-1",
        children: [
          {
            id: 4,
            label: "Level three 3-1-1",
          },
          {
            id: 5,
            label: "Level three 3-1-2",
            disabled: true,
          },
        ],
      },
      {
        id: 2,
        label: "Level two 2-2",
        disabled: true,
        children: [
          {
            id: 6,
            label: "Level three 3-2-1",
          },
          {
            id: 7,
            label: "Level three 3-2-2",
            disabled: true,
          },
        ],
      },
    ],
  },
];

const disabledCheckboxTree = document.querySelector("#disabledCheckboxTree");
disabledCheckboxTree.data = idData;
```

:::

::::

## 点击图标展开

通过设置 `expand-on-icon-click` 属性，可以只在点击节点图标时展开/收起子节点，点击节点文字时仅选中节点而不展开。

<div class="demo">
  <ea-tree id="expandOnIconClickTree" expand-on-icon-click></ea-tree>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo">
  <ea-tree id="expandOnIconClickTree" expand-on-icon-click></ea-tree>
</div>
```

```js
const data = [
  {
    label: "Level one 1",
    children: [
      {
        label: "Level two 1-1",
        children: [
          {
            label: "Level three 1-1-1",
          },
        ],
      },
    ],
  },
  {
    label: "Level one 2",
    children: [
      {
        label: "Level two 2-1",
        children: [
          {
            label: "Level three 2-1-1",
          },
        ],
      },
      {
        label: "Level two 2-2",
        children: [
          {
            label: "Level three 2-2-1",
          },
        ],
      },
    ],
  },
];

const expandOnIconClickTree = document.querySelector("#expandOnIconClickTree");
expandOnIconClickTree.data = data;
```

:::

::::

## 默认展开以及默认选中

通过 `defaultExpandedKeys` 和 `defaultCheckedKeys` 属性设置默认展开和选中的节点。需要配合 `node-key` 属性使用。

<div class="demo">
  <ea-tree id="defaultExpandedTree" node-key="id" show-checkbox></ea-tree>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo">
  <ea-tree id="defaultExpandedTree" node-key="id" show-checkbox></ea-tree>
</div>
```

```js
const idData = [
  {
    id: 1,
    label: "Level one 1",
    children: [
      {
        id: 3,
        label: "Level two 2-1",
        children: [
          {
            id: 4,
            label: "Level three 3-1-1",
          },
          {
            id: 5,
            label: "Level three 3-1-2",
            disabled: true,
          },
        ],
      },
      {
        id: 2,
        label: "Level two 2-2",
        disabled: true,
        children: [
          {
            id: 6,
            label: "Level three 3-2-1",
          },
          {
            id: 7,
            label: "Level three 3-2-2",
            disabled: true,
          },
        ],
      },
    ],
  },
];

const defaultExpandedTree = document.querySelector("#defaultExpandedTree");
defaultExpandedTree.defaultExpandedKeys = [1, 2];
defaultExpandedTree.defaultCheckedKeys = [3, 4];
defaultExpandedTree.data = idData;
```

:::

::::

## Tree API

### Tree Attributes

| 参数                             | 说明                            | 类型    | 可选值 | 默认值                                                           |
| -------------------------------- | ------------------------------- | ------- | ------ | ---------------------------------------------------------------- |
| show-checkbox                    | 是否显示复选框                  | boolean | —      | false                                                            |
| check-strictly                   | 是否严格模式（不关联父子节点）  | boolean | —      | false                                                            |
| node-key                         | 节点唯一标识字段名              | string  | —      | —                                                                |
| expand-on-icon-click             | 是否只在点击图标时展开/收起节点 | boolean | —      | false                                                            |
| data <PropType />                | 树形数据                        | array   | —      | []                                                               |
| dataProps <PropType />           | 数据字段配置                    | object  | —      | `{ children: "children", label: "label", disabled: "disabled" }` |
| defaultExpandedKeys <PropType /> | 默认展开的节点键值数组          | array   | —      | []                                                               |
| defaultCheckedKeys <PropType />  | 默认选中的节点键值数组          | array   | —      | []                                                               |

### Tree Methods

| 方法名              | 说明                     | 参数                                                               |
| ------------------- | ------------------------ | ------------------------------------------------------------------ |
| getHalfCheckedNodes | 获取半选中节点数据       | `() => Array<any>`                                                 |
| getHalfCheckedKeys  | 获取半选中节点键值       | `() => Array<any>`                                                 |
| getCurrentKey       | 获取当前选中节点键值     | `() => any`                                                        |
| getCurrentNode      | 获取当前选中节点数据     | `() => any`                                                        |
| updateKeyChildren   | 更新节点键值的子节点数据 | `(key: any, data: Array<any>) => boolean`                          |
| getCheckedNodes     | 获取选中节点数据         | `(leafOnly?: boolean, includeHalfChecked?: boolean) => Array<any>` |
| setCheckedNodes     | 设置选中节点数据         | `(nodes: Array<any>) => boolean`                                   |
| getCheckedKeys      | 获取选中节点键值         | `(leafOnly?: boolean) => Array<any>`                               |
| setCheckedKeys      | 设置选中节点键值         | `(keys: Array<any>, leafOnly?: boolean) => boolean`                |
| setChecked          | 设置节点选中状态         | `(keyOrData: any, checked: boolean) => boolean`                    |
| setCurrentKey       | 设置当前选中节点键值     | `(key: any, shouldAutoExpandParent?: boolean) => boolean`          |
| setCurrentNode      | 设置当前选中节点数据     | `(node: any, shouldAutoExpandParent?: boolean) => boolean`         |
| getNode             | 获取节点信息             | `(data: any) => any`                                               |

### Tree Events

| 事件名              | 说明                 | 回调参数(event.detail)                                                                          |
| ------------------- | -------------------- | ----------------------------------------------------------------------------------------------- |
| ea-node-click       | 节点点击事件         | `{ data: any }`                                                                                 |
| ea-node-contextmenu | 节点右键菜单事件     | `{ data: any, node: any }`                                                                      |
| ea-node-select      | 节点选中事件         | `{ node: any, selected: boolean }`                                                              |
| ea-check-change     | 复选框状态变化事件   | `{ data: any, checked: boolean, hasCheckedChildren: boolean }`                                  |
| ea-check            | 复选框选中事件       | `{ data: any, checkedState: { checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys } }` |
| ea-current-change   | 当前选中节点变化事件 | `{ data: any, node: any }`                                                                      |
| ea-node-expand      | 节点展开事件         | `{ data: any, node: any, expanded: true }`                                                      |
| ea-node-collapse    | 节点收起事件         | `{ data: any, node: any, expanded: false }`                                                     |

### Tree CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称      | 说明   |
| --------- | ------ |
| container | 树容器 |

### Tree Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 默认插槽 |

### Tree CSS Custom Properties

| 属性名                        | 说明         | 默认值                     |
| ----------------------------- | ------------ | -------------------------- |
| --ea-tree-font-size           | 字体大小     | `var(--font-size-md)`      |
| --ea-tree-text-color          | 文本颜色     | `var(--grey-700)`          |
| --ea-tree-toggle-size         | 展开图标尺寸 | `16px`                     |
| --ea-tree-cursor              | 光标样式     | `var(--cursor-pointer)`    |
| --ea-tree-padding-vertical    | 垂直内边距   | `var(--spacing-sm)`        |
| --ea-tree-padding-horizontal  | 水平内边距   | `var(--spacing-md)`        |
| --ea-tree-border-radius       | 圆角大小     | `var(--border-radius-sm)`  |
| --ea-tree-transition          | 过渡动画时长 | `var(--transition-normal)` |
| --ea-tree-hover-bg            | 悬停背景色   | `var(--grey-100)`          |
| --ea-tree-selected-bg         | 选中背景色   | `var(--blue-100)`          |
| --ea-tree-selected-text-color | 选中文本色   | `var(--blue-600)`          |
| --ea-tree-icon-color          | 图标颜色     | `var(--grey-500)`          |
| --ea-tree-icon-hover-color    | 图标悬停颜色 | `var(--blue-500)`          |
| --ea-tree-indent-size         | 缩进大小     | `16px`                     |
