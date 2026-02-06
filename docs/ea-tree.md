<script setup>
import { onMounted } from 'vue'
import "../dist/components/index.js"
import "../dist/assets/icon.css"

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
})
</script>

# Tree 树形控件

树形控件用于展示层次结构数据。

## 引入

> `js`

```js
<script type='module'>
  import "./node_modules/easy-component-ui/components/ea-tree/index.js";
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

移步到 [CSS Part](#tree-css-part)。

## 基础用法

最基本的树形控件用法，展示层次结构数据。

<div class="demo">
  <ea-tree id="basicTree"></ea-tree>
</div>

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

## 可选择

通过设置 `show-checkbox` 属性启用复选框选择功能。

<div class="demo">
  <ea-tree id="checkboxTree" show-checkbox></ea-tree>
</div>

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

## 禁用复选框

支持禁用特定节点，通过数据中的 `disabled` 属性控制。

<div class="demo">
  <ea-tree id="disabledCheckboxTree" show-checkbox></ea-tree>
</div>

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

## 默认展开以及默认选中

通过 `defaultExpandedKeys` 和 `defaultCheckedKeys` 属性设置默认展开和选中的节点。

<div class="demo">
  <ea-tree id="defaultExpandedTree" node-key="id" show-checkbox></ea-tree>
</div>

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

## Tree API

### Tree Attributes

| 参数                | 说明                           | 类型    | 可选值 | 默认值                                                         |
| ------------------- | ------------------------------ | ------- | ------ | -------------------------------------------------------------- |
| show-checkbox       | 是否显示复选框                 | boolean | -      | false                                                          |
| check-strictly      | 是否严格模式（不关联父子节点） | boolean | -      | false                                                          |
| node-key            | 节点唯一标识字段名             | string  | -      | -                                                              |
| data                | 树形数据                       | array   | -      | []                                                             |
| dataProps           | 数据字段配置                   | object  | -      | { children: "children", label: "label", disabled: "disabled" } |
| defaultExpandedKeys | 默认展开的节点键值数组         | array   | -      | []                                                             |
| defaultCheckedKeys  | 默认选中的节点键值数组         | array   | -      | []                                                             |

### Tree Methods

| 方法名              | 说明                     | 参数                                                                                                                                             |
| ------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| getHalfCheckedNodes | 获取半选中节点数据       | `() => Array<any>`                                                                                                                               |
| getHalfCheckedKeys  | 获取半选中节点键值       | `() => Array<any>`                                                                                                                               |
| getCurrentKey       | 获取当前选中节点键值     | `() => any`                                                                                                                                      |
| getCurrentNode      | 获取当前选中节点数据     | `() => any`                                                                                                                                      |
| updateKeyChildren   | 更新节点键值的子节点数据 | `(key: any, data: Array<any>) => boolean`<br>`key`：节点键值<br>`data`：子节点数据数组                                                           |
| getCheckedNodes     | 获取选中节点数据         | `(leafOnly?: boolean, includeHalfChecked?: boolean) => Array<any>`<br>`leafOnly`：是否仅返回叶子节点<br>`includeHalfChecked`：是否包含半选中节点 |
| setCheckedNodes     | 设置选中节点数据         | `(nodes: Array<any>, leafOnly?: boolean) => boolean`<br>`nodes`：选中节点数据数组<br>`leafOnly`：是否仅选中叶子节点                              |
| getCheckedKeys      | 获取选中节点键值         | `(leafOnly?: boolean) => Array<any>`<br>`leafOnly`：是否仅返回叶子节点                                                                           |
| setCheckedKeys      | 设置选中节点键值         | `(keys: Array<any>, leafOnly?: boolean) => boolean`<br>`keys`：选中节点键值数组<br>`leafOnly`：是否仅选中叶子节点                                |
| setChecked          | 设置节点选中状态         | `(keyOrData: any, checked: boolean) => boolean`<br>`keyOrData`：节点键值或数据对象<br>`checked`：是否选中                                        |
| setCurrentKey       | 设置当前选中节点键值     | `(key: any, shouldAutoExpandParent?: boolean) => boolean`<br>`key`：节点键值<br>`shouldAutoExpandParent`：是否自动展开父节点                     |
| setCurrentNode      | 设置当前选中节点数据     | `(node: any, shouldAutoExpandParent?: boolean) => boolean`<br>`node`：节点数据或键值<br>`shouldAutoExpandParent`：是否自动展开父节点             |
| getNode             | 获取节点信息             | `(data: any) => any`<br>`data`：节点数据或键值                                                                                                   |

### Tree Events

| 事件名              | 说明                 | 回调参数(event.detail)                                                                                                                        |
| ------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| ea-node-click       | 节点点击事件         | `{data: any}`<br>`data`：节点数据                                                                                                             |
| ea-node-contextmenu | 节点右键菜单事件     | `{data: any, node: any}`<br>`data`：节点数据<br>`node`：节点实例                                                                              |
| ea-node-select      | 节点选中事件         | `{node: any, selected: boolean}`<br>`node`：节点数据<br>`selected`：选中状态                                                                  |
| ea-check-change     | 复选框状态变化事件   | `{data: any, checked: boolean, hasCheckedChildren: boolean}`<br>`data`：节点数据<br>`checked`：选中状态<br>`hasCheckedChildren`：子树选中状态 |
| ea-check            | 复选框选中事件       | `{data: any, checkedState: any}`<br>`data`：节点数据<br>`checkedState`：选中状态对象                                                          |
| ea-current-change   | 当前选中节点变化事件 | `{data: any, node: any}`<br>`data`：节点数据<br>`node`：节点实例                                                                              |
| ea-node-expand      | 节点展开事件         | `{data: any, node: any, expanded: boolean}`<br>`data`：节点数据<br>`node`：节点实例<br>`expanded`：展开状态                                   |
| ea-node-collapse    | 节点收起事件         | `{data: any, node: any, expanded: boolean}`<br>`data`：节点数据<br>`node`：节点实例<br>`expanded`：展开状态                                   |

### Tree CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称             | 说明       |
| ---------------- | ---------- |
| container        | 树容器     |
| children-wrapper | 子节点容器 |
| children         | 子节点     |
| label            | 节点标签   |
