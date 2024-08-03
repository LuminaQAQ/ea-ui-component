<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    import('./index.scss')
    
    import('../components/ea-icon/index.js')
    import('../components/ea-icon/index.css')
    import('../components/ea-button/ea-button.js')
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

## 基本用法

呼出一个临时的侧边栏, 可以从多个方向呼出

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

::: details 示例代码-`html`

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

:::

::: details 示例代码-`js`

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

::: details 示例代码-`html`

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

:::

::: details 示例代码-`js`

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

## Events

| 事件名 | 说明       | 回调参数 |
| :----- | :--------- | :------- |
| close  | 关闭时触发 | -        |

## Slots

| 名称   | 说明                |
| :----- | :------------------ |
| -      | Drawer 的内容       |
| header | Drawer 标题区的内容 |
