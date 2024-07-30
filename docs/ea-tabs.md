<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    import('./index.scss')
    
    import('../components/ea-icon/index.js')
    import('../components/ea-icon/index.css')
    
    import('../components/ea-button/ea-button.js')
    import('../components/ea-tabs/index.js')

    const editableObj = {
        wrap: document.querySelector('#editable'),
        paneSlot: document.querySelector('#editableSlot'),
        addBtn: document.querySelector('#addBtn'),

        handleTabclose(wrap) {
            wrap.addEventListener('tab-close', (e) => {
                console.log('close', e.detail);
            })
        },

        handleTabAdd(btn, wrap, slotWrap) {
            btn.addEventListener('click', () => {
                const tab = document.createElement('ea-tab');
                tab.innerText = '新增标签';

                const pane = document.createElement('ea-pane');
                pane.innerText = '新增标签内容';

                wrap.appendChild(tab);
                slotWrap.appendChild(pane);
            })

            wrap.addEventListener('tab-add', (e) => {
                console.log('add', e.detail);
            })
        },

        init() {
            this.handleTabclose(this.wrap);
            this.handleTabAdd(this.addBtn, this.wrap, this.paneSlot);
        }
    }

    editableObj.init();
})
</script>

# Tabs 标签页

分隔内容上有关联但属于不同类别的数据集合。

## 引入

> `js`

```js
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-tabs/index.js";
</script>
```

## 基础用法

基础的、简洁的标签页。

> `Tabs` 组件提供了选项卡功能，默认选中第一个标签页，你也可以通过 `actived` 属性来指定当前选中的标签页。

<!-- -------- 1 基础用法 --------  -->
<!-- #region  -->
<div class="demo">
    <ea-tabs id="clickEvent--normal-card" actived="second">
        <ea-tab name="first">用户管理</ea-tab>
        <ea-tab name="second">配置管理</ea-tab>
        <ea-tab name="third">角色管理</ea-tab>
        <ea-tab name="fourth">定时任务补偿</ea-tab>
        <div slot="pane">
            <ea-pane class="tab-page" name="first">用户管理</ea-pane>
            <ea-pane class="tab-page" name="second">配置管理</ea-pane>
            <ea-pane class="tab-page" name="third">角色管理</ea-pane>
            <ea-pane class="tab-page" name="fourth">定时任务补偿</ea-pane>
        </div>
    </ea-tabs>
</div>
<!-- #endregion  -->
<!-- -------------------  -->

::: details 点击查看代码

```html
<div class="demo">
  <ea-tabs id="clickEvent--normal-card" actived="second">
    <ea-tab name="first">用户管理</ea-tab>
    <ea-tab name="second">配置管理</ea-tab>
    <ea-tab name="third">角色管理</ea-tab>
    <ea-tab name="fourth">定时任务补偿</ea-tab>
    <div slot="pane">
      <ea-pane class="tab-page" name="first">用户管理</ea-pane>
      <ea-pane class="tab-page" name="second">配置管理</ea-pane>
      <ea-pane class="tab-page" name="third">角色管理</ea-pane>
      <ea-pane class="tab-page" name="fourth">定时任务补偿</ea-pane>
    </div>
  </ea-tabs>
</div>
```

:::

## 选项卡样式

选项卡样式的标签页。

> 只需要设置 `type` 属性为 `card` 就可以使选项卡改变为标签风格。

<div class="demo">
    <ea-tabs id="clickEvent--card" actived="second" type="card">
        <ea-tab name="first">用户管理</ea-tab>
        <ea-tab name="second">配置管理</ea-tab>
        <ea-tab name="third">角色管理</ea-tab>
        <ea-tab name="fourth">定时任务补偿</ea-tab>
        <div slot="pane">
            <ea-pane class="tab-page" name="first">用户管理</ea-pane>
            <ea-pane class="tab-page" name="second">配置管理</ea-pane>
            <ea-pane class="tab-page" name="third">角色管理</ea-pane>
            <ea-pane class="tab-page" name="fourth">定时任务补偿</ea-pane>
        </div>
    </ea-tabs>
</div>

::: details 点击查看代码

```html
<div class="demo">
  <ea-tabs id="clickEvent--card" actived="second" type="card">
    <ea-tab name="first">用户管理</ea-tab>
    <ea-tab name="second">配置管理</ea-tab>
    <ea-tab name="third">角色管理</ea-tab>
    <ea-tab name="fourth">定时任务补偿</ea-tab>
    <div slot="pane">
      <ea-pane class="tab-page" name="first">用户管理</ea-pane>
      <ea-pane class="tab-page" name="second">配置管理</ea-pane>
      <ea-pane class="tab-page" name="third">角色管理</ea-pane>
      <ea-pane class="tab-page" name="fourth">定时任务补偿</ea-pane>
    </div>
  </ea-tabs>
</div>
```

:::

## 卡片化

卡片化的标签页。

> 将 `type` 设置为 `border-card`。

<div class="demo">
    <ea-tabs id="clickEvent--border-card" actived="second" type="border-card">
        <ea-tab name="first">用户管理</ea-tab>
        <ea-tab name="second">配置管理</ea-tab>
        <ea-tab name="third">角色管理</ea-tab>
        <ea-tab name="fourth">定时任务补偿</ea-tab>
        <div slot="pane">
            <ea-pane class="tab-page" name="first">用户管理</ea-pane>
            <ea-pane class="tab-page" name="second">配置管理</ea-pane>
            <ea-pane class="tab-page" name="third">角色管理</ea-pane>
            <ea-pane class="tab-page" name="fourth">定时任务补偿</ea-pane>
        </div>
    </ea-tabs>
</div>

::: details 点击查看代码

```html
<ea-tabs id="clickEvent--border-card" actived="second" type="border-card">
  <ea-tab name="first">用户管理</ea-tab>
  <ea-tab name="second">配置管理</ea-tab>
  <ea-tab name="third">角色管理</ea-tab>
  <ea-tab name="fourth">定时任务补偿</ea-tab>

  <div slot="pane">
    <ea-pane class="tab-page" name="first">用户管理</ea-pane>
    <ea-pane class="tab-page" name="second">配置管理</ea-pane>
    <ea-pane class="tab-page" name="third">角色管理</ea-pane>
    <ea-pane class="tab-page" name="fourth">定时任务补偿</ea-pane>
  </div>
</ea-tabs>
```

:::

## 动态增减标签页

> 通过设置 `editable`，标签页可以动态增删。

<div class="demo">
    <ea-button id="addBtn" type="primary" size="small">添加标签页</ea-button>
    <ea-tabs id="editable" actived="second" editable>
        <ea-tab name="first">
            <ea-icon icon="icon-coffee"></ea-icon>
            用户管理
        </ea-tab>
        <ea-tab name="second">配置管理</ea-tab>
        <ea-tab name="third">角色管理</ea-tab>
        <ea-tab name="fourth">定时任务补偿</ea-tab>
        <div id="editableSlot" slot="pane">
            <ea-pane class="tab-page" name="first">用户管理</ea-pane>
            <ea-pane class="tab-page" name="second">配置管理</ea-pane>
            <ea-pane class="tab-page" name="third">角色管理</ea-pane>
            <ea-pane class="tab-page" name="fourth">定时任务补偿</ea-pane>
        </div>
    </ea-tabs>
</div>

::: details 点击查看代码 `html`

```html
<div class="demo">
  <ea-tabs id="clickEvent--normal-card" actived="second">
    <ea-tab name="first">
      <ea-icon icon="icon-coffee"></ea-icon>
      用户管理
    </ea-tab>
    <ea-tab name="second">配置管理</ea-tab>
    <ea-tab name="third">角色管理</ea-tab>
    <ea-tab name="fourth">定时任务补偿</ea-tab>
    <div slot="pane">
      <ea-pane class="tab-page" name="first">用户管理</ea-pane>
      <ea-pane class="tab-page" name="second">配置管理</ea-pane>
      <ea-pane class="tab-page" name="third">角色管理</ea-pane>
      <ea-pane class="tab-page" name="fourth">定时任务补偿</ea-pane>
    </div>
  </ea-tabs>
</div>
```

:::

::: details 点击查看代码 `js`

```js
const editableObj = {
  wrap: document.querySelector("#editable"),
  paneSlot: document.querySelector("#editableSlot"),
  addBtn: document.querySelector("#addBtn"),

  handleTabclose(wrap) {
    wrap.addEventListener("tab-close", (e) => {
      console.log("close", e.detail);
    });
  },

  handleTabAdd(btn, wrap, slotWrap) {
    btn.addEventListener("click", () => {
      const tab = document.createElement("ea-tab");
      tab.innerText = "新增标签";

      const pane = document.createElement("ea-pane");
      pane.innerText = "新增标签内容";

      wrap.appendChild(tab);
      slotWrap.appendChild(pane);
    });

    wrap.addEventListener("tab-add", (e) => {
      console.log("add", e.detail);
    });
  },

  init() {
    this.handleTabclose(this.wrap);
    this.handleTabAdd(this.addBtn, this.wrap, this.paneSlot);
  },
};

editableObj.init();
```

:::

## Tabs Attributes

| 参数     | 说明             | 类型    | 可选值                  | 默认值 |
| -------- | ---------------- | ------- | ----------------------- | ------ |
| actived  | 默认激活的标签页 | String  | -                       | -      |
| type     | 标签页类型       | String  | normal/border-card/card | normal |
| editable | 是否可删除标签页 | Boolean | -                       | false  |

## Tab Attributes

| 参数 | 说明           | 类型   | 可选值 | 默认值                                                |
| ---- | -------------- | ------ | ------ | ----------------------------------------------------- |
| name | 标签页唯一标识 | String | -      | 该选项卡在选项卡列表中的顺序值，如第一个选项卡则为'1' |

## Pane Attributes

| 参数 | 说明               | 类型   | 可选值 | 默认值                                                |
| ---- | ------------------ | ------ | ------ | ----------------------------------------------------- |
| name | 标签页名称唯一标识 | String | -      | 该选项卡在选项卡列表中的顺序值，如第一个选项卡则为'1' |

## Tabs Events

| 事件名    | 说明       | 回调参数     |
| --------- | ---------- | ------------ |
| tab-add   | 标签页增加 | event.detail |
| tab-close | 标签页关闭 | event.detail |
| tab-click | 标签页点击 | event.detail |

## Tabs Slot

| 名称 | 说明       |
| ---- | ---------- |
| pane | 标签页内容 |
