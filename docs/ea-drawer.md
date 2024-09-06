<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    import('./index.scss')
    
    import('../components/ea-icon/index.js')
    import('../components/ea-icon/index.css')
    import('../components/ea-button/index.js')
    import('../components/ea-button-group/index.js')

    import('../components/ea-descriptions/index.js')
    import('../components/ea-descriptions-item/index.js')

    import('../components/ea-tag/index.js')

    import('../components/ea-drawer/index.js')

    // ------- 1. 基本用法 -------
    // #region
    const Drawer = {
        drawer: document.querySelector('#drawer'),

        ltrBtn: document.querySelector('#openDrawerBtn--ltr'),
        rtlBtn: document.querySelector('#openDrawerBtn--rtl'),
        ttbBtn: document.querySelector('#openDrawerBtn--ttb'),
        bttBtn: document.querySelector('#openDrawerBtn--btt'),

        init() {
            this.ltrBtn.addEventListener('click', () => {
                this.drawer.direction = 'ltr';
                this.drawer.open = true;
            })

            this.rtlBtn.addEventListener('click', () => {
                this.drawer.direction = 'rtl';
                this.drawer.open = true;
            })

            this.ttbBtn.addEventListener('click', () => {
                this.drawer.direction = 'ttb';
                this.drawer.open = true;
            })

            this.bttBtn.addEventListener('click', () => {
                this.drawer.direction = 'btt';
                this.drawer.open = true;
            })

            this.drawer.addEventListener('close', () => {
                console.log('close');
            })
        }
    };

    Drawer.init();
    // #endregion
    // ------- end -------

    // ------- 2. 自定义内容 -------
    // #region
    const CustomDrawer = {
        drawer: document.querySelector('#customDrawer'),
        openBtn: document.querySelector('#openCustomDrawerBtn'),

        init() {
            this.openBtn.addEventListener('click', () => {
                this.drawer.open = true;
            })

            this.drawer.addEventListener('close', () => {
                console.log('close');
            })
        }
    };

    CustomDrawer.init();
    // #endregion
    // ------- end -------
})
</script>

# Drawer 抽屉

## 引入

> `js`

```js
<script type="module">
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

呼出一个临时的侧边栏, 可以从多个方向呼出

::: tip

- 可以在 `ea-drawer` 标签上添加 `direction` 属性来指定呼出方向。也可以利用 `js` 来控制呼出方向(`drawer.direction = "ltr";`)。

- `ea-drawer` 标签上添加 `title` 属性来指定标题。

- 通过操作元素上的`open`属性来开启抽屉(`drawer.open = true;`)。

- 可以在元素上添加 `close` 事件来监听关闭事件。

:::

<!-- -------- 1. 基本用法 --------  -->
<!-- #region  -->
<div class="demo">
    <ea-button-group>
        <ea-button type="primary" id="openDrawerBtn--ltr">从左往右开</ea-button>
        <ea-button type="primary" id="openDrawerBtn--rtl">从右往左开</ea-button>
        <ea-button type="primary" id="openDrawerBtn--ttb">从上往下开</ea-button>
        <ea-button type="primary" id="openDrawerBtn--btt">从下往上开</ea-button>
    </ea-button-group>
    <ea-drawer id="drawer" title="我是标题" direction="ltr">
        <span>我是内容</span>
    </ea-drawer>
</div>
<!-- #endregion  -->
<!-- -------------------  -->

::: details 查看代码

`html`

```html
<div class="demo">
  <ea-button-group>
    <ea-button type="primary" id="openDrawerBtn--ltr">从左往右开</ea-button>
    <ea-button type="primary" id="openDrawerBtn--rtl">从右往左开</ea-button>
    <ea-button type="primary" id="openDrawerBtn--ttb">从上往下开</ea-button>
    <ea-button type="primary" id="openDrawerBtn--btt">从下往上开</ea-button>
  </ea-button-group>
  <ea-drawer id="drawer" title="我是标题" direction="ltr">
    <span>我是内容</span>
  </ea-drawer>
</div>
```

`js`

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
      this.drawer.open = true;
    });

    this.rtlBtn.addEventListener("click", () => {
      this.drawer.direction = "rtl";
      this.drawer.open = true;
    });

    this.ttbBtn.addEventListener("click", () => {
      this.drawer.direction = "ttb";
      this.drawer.open = true;
    });

    this.bttBtn.addEventListener("click", () => {
      this.drawer.direction = "btt";
      this.drawer.open = true;
    });

    this.drawer.addEventListener("close", () => {
      console.log("close");
    });
  },
};

Drawer.init();
```

:::

## 自定义内容

`Drawer` 可以在其内部嵌套各种丰富的操作

<div class="demo">
    <ea-button type="primary" id="openCustomDrawerBtn">打开自定义内容的抽屉</ea-button>
    <ea-drawer id="customDrawer" title="我是标题" direction="ltr">
        <ea-descriptions direction="vertical" border>
            <ea-descriptions-item label="用户名"> Lilyiro </ea-descriptions-item>
            <ea-descriptions-item label="身高"> 165cm </ea-descriptions-item>
            <ea-descriptions-item label="年龄"> 17岁 </ea-descriptions-item>
            <ea-descriptions-item label="称号">
                <ea-tag>宿命背反</ea-tag>
            </ea-descriptions-item>
            <ea-descriptions-item label="属性" span="1">
                <ea-tag type="warning" style="margin-right: 1rem;">雷电</ea-tag>
                <ea-tag type="info">物理</ea-tag>
            </ea-descriptions-item>
        </ea-descriptions>
    </ea-drawer>
</div>

::: details 查看代码

`html`

```html
<div class="demo">
  <ea-button type="primary" id="openCustomDrawerBtn"
    >打开自定义内容的抽屉</ea-button
  >
  <ea-drawer id="customDrawer" title="我是标题" direction="ltr">
    <ea-descriptions direction="vertical" border>
      <ea-descriptions-item label="用户名"> Lilyiro </ea-descriptions-item>
      <ea-descriptions-item label="身高"> 165cm </ea-descriptions-item>
      <ea-descriptions-item label="年龄"> 17岁 </ea-descriptions-item>
      <ea-descriptions-item label="称号">
        <ea-tag>宿命背反</ea-tag>
      </ea-descriptions-item>
      <ea-descriptions-item label="属性" span="1">
        <ea-tag type="warning" style="margin-right: 1rem;">雷电</ea-tag>
        <ea-tag type="info">物理</ea-tag>
      </ea-descriptions-item>
    </ea-descriptions>
  </ea-drawer>
</div>
```

`js`

```js
const CustomDrawer = {
  drawer: document.querySelector("#customDrawer"),
  openBtn: document.querySelector("#openCustomDrawerBtn"),

  init() {
    this.openBtn.addEventListener("click", () => {
      this.drawer.open = true;
    });

    this.drawer.addEventListener("close", () => {
      console.log("close");
    });
  },
};

CustomDrawer.init();
```

:::

## Attributes

| 参数             | 说明              | 类型    | 可选值             | 默认值 |
| :--------------- | :---------------- | :------ | :----------------- | :----- |
| title            | 标题              | string  | -                  | -      |
| open             | 是否打开          | boolean | -                  | false  |
| size             | Drawer 窗体的大小 | string  | -                  | 30%    |
| modal            | 是否显示遮罩      | boolean | -                  | true   |
| direction        | 抽屉的方向        | string  | ltr, rtl, ttb, btt | ltr    |
| wrapper-closable | 点击遮罩是否关闭  | boolean | -                  | true   |
| show-close       | 是否显示关闭按钮  | boolean | -                  | true   |
| with-header      | 是否显示头部      | boolean | -                  | true   |

## CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称        | 说明                                                                   |
| ----------- | ---------------------------------------------------------------------- |
| container   | 外层容器                                                               |
| drawer-wrap | 抽屉容器，包含头部 `header-wrap`、主体 `main-wrap`、遮罩层 `mask-wrap` |
| header-wrap | 抽屉顶部容器，包含标题容器 `title-wrap` 和关闭按钮 `icon`              |
| title-wrap  | 标题容器                                                               |
| icon        | 顶部关闭图标                                                           |
| main-wrap   | 主体容器                                                               |
| mask-wrap   | 遮罩层容器                                                             |

## Events

| 事件名 | 说明       | 回调参数 |
| :----- | :--------- | :------- |
| close  | 关闭时触发 | -        |

## Slots

| 名称   | 说明                |
| :----- | :------------------ |
| -      | Drawer 的内容       |
| header | Drawer 标题区的内容 |
