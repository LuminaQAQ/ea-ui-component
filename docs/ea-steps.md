<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    import('./index.scss')
    
    import('../components/ea-icon/index.js')
    import('../components/ea-icon/index.css')
    import('../components/ea-button/index.js')
    
    import('../components/ea-steps/index.js')

    // ------- 1. 基础用法 -------
    // #region
    const basicObj = {
        wrap: document.querySelector('#basicObj'),

        nextBtn: document.querySelector('#basicObj_next-btn'),
        prevBtn: document.querySelector('#basicObj_pre-btn'),

        stepChildren: document.querySelectorAll('#basicObj ea-step'),

        handleActiveChange(flag) {
            let cur = this.wrap.active;

            if (flag === "prev") {
                if (--cur < 0) return this.wrap.active = 3;

                this.wrap.active = cur;
            } else {
                if (++cur > this.stepChildren.length) return this.wrap.active = 0;

                this.wrap.active = cur;
            }
        },

        init() {
            const { length } = this.stepChildren;


            this.prevBtn.addEventListener('click', () => {
                this.handleActiveChange("prev");
            });

            this.nextBtn.addEventListener('click', () => {
                this.handleActiveChange("next");
            });
        }
    };
    basicObj.init();
    // #endregion
    // ------- end -------
})
</script>

# Steps 步骤条

引导用户按照流程完成任务的分步导航条，可根据实际应用场景设定步骤，步骤不得少于 2 步。

## 引入

> `js`

```js
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-steps/index.js";
</script>
```

## 基础用法

简单的步骤条。

> 设置 `active` 属性，接受一个 `Number`，表明步骤的 `index`，从 0 开始。

<!-- -------- 1. 基础用法 --------  -->
<!-- #region  -->
<div class="demo">
    <p>
        <ea-button id="basicObj_pre-btn">上一步</ea-button>
        <ea-button id="basicObj_next-btn">下一步</ea-button>
    </p>
    <ea-steps id="basicObj" active="0">
        <ea-step title="步骤一" description="这是步骤一的描述"></ea-step>
        <ea-step title="步骤二" description="这是步骤二的描述"></ea-step>
        <ea-step title="步骤三" description="这是步骤三的描述"></ea-step>
        <ea-step title="步骤四" description="这是步骤四的描述"></ea-step>
    </ea-steps>
</div>
<!-- #endregion  -->
<!-- -------------------  -->

::: details 示例代码-`html`

```html
<div class="demo">
  <p>
    <ea-button id="basicObj_pre-btn">上一步</ea-button>
    <ea-button id="basicObj_next-btn">下一步</ea-button>
  </p>
  <ea-steps id="basicObj" active="0">
    <ea-step title="步骤一" description="这是步骤一的描述"></ea-step>
    <ea-step title="步骤二" description="这是步骤二的描述"></ea-step>
    <ea-step title="步骤三" description="这是步骤三的描述"></ea-step>
    <ea-step title="步骤四" description="这是步骤四的描述"></ea-step>
  </ea-steps>
</div>
```

:::

::: details 示例代码-`js`

```js
const basicObj = {
  wrap: document.querySelector("#basicObj"),

  nextBtn: document.querySelector("#basicObj_next-btn"),
  prevBtn: document.querySelector("#basicObj_pre-btn"),

  stepChildren: document.querySelectorAll("#basicObj ea-step"),

  handleActiveChange(flag) {
    let cur = this.wrap.active;

    if (flag === "prev") {
      if (--cur < 0) return (this.wrap.active = 3);

      this.wrap.active = cur;
    } else {
      if (++cur > this.stepChildren.length) return (this.wrap.active = 0);

      this.wrap.active = cur;
    }
  },

  init() {
    const { length } = this.stepChildren;

    this.prevBtn.addEventListener("click", () => {
      this.handleActiveChange("prev");
    });

    this.nextBtn.addEventListener("click", () => {
      this.handleActiveChange("next");
    });
  },
};
basicObj.init();
```

:::

## 含状态步骤条

每一步骤显示出该步骤的状态。

> 也可以使用 `title` 具名分发，可以用 `slot` 的方式来取代属性的设置，在本文档最后的列表中有所有的 `slot name` 可供参考。

<!-- -------- 2. 含状态步骤条 --------  -->
<!-- #region  -->
<div class="demo">
  <ea-steps active="1">
    <ea-step title="已完成"></ea-step>
    <ea-step title="进行中"></ea-step>
    <ea-step title="步骤 3"></ea-step>
  </ea-steps>
</div>
<!-- #endregion  -->
<!-- -------------------  -->

::: details 示例代码-`html`

```html
<div class="demo">
  <ea-steps active="1">
    <ea-step title="已完成"></ea-step>
    <ea-step title="进行中"></ea-step>
    <ea-step title="步骤 3"></ea-step>
  </ea-steps>
</div>
```

:::

## 有描述的步骤条

每个步骤有其对应的步骤状态描述。

<!-- -------- 3. 有描述的步骤条 --------  -->
<!-- #region  -->
<div class="demo">
    <ea-steps :active="1">
        <ea-step title="步骤 1" description="这是一段很长很长很长的描述性文字"></ea-step>
        <ea-step title="步骤 2" description="这是一段很长很长很长的描述性文字"></ea-step>
        <ea-step title="步骤 3" description="这段就没那么长了"></ea-step>
    </ea-steps>
</div>
<!-- #endregion  -->
<!-- -------------------  -->

::: details 示例代码-`html`

```html
<div class="demo">
  <ea-steps :active="1">
    <ea-step
      title="步骤 1"
      description="这是一段很长很长很长的描述性文字"
    ></ea-step>
    <ea-step
      title="步骤 2"
      description="这是一段很长很长很长的描述性文字"
    ></ea-step>
    <ea-step title="步骤 3" description="这段就没那么长了"></ea-step>
  </ea-steps>
</div>
```

:::

## 带图标的步骤条

步骤条内可以启用各种自定义的图标。

<div class="demo">
    <ea-steps active="1">
        <ea-step title="步骤 1" icon="icon-music"></ea-step>
        <ea-step title="步骤 2" icon="icon-videocam"></ea-step>
        <ea-step title="步骤 3" icon="icon-camera"></ea-step>
    </ea-steps>
</div>

::: details 示例代码-`html`

```html
<div class="demo">
  <ea-steps active="1">
    <ea-step title="步骤 1" icon="icon-music"></ea-step>
    <ea-step title="步骤 2" icon="icon-videocam"></ea-step>
    <ea-step title="步骤 3" icon="icon-camera"></ea-step>
  </ea-steps>
</div>
```

:::

## 自定义每个 step 的间距

每个步骤有其对应的步骤状态描述。

<!-- -------- 4. 自定义每个 step 的间距 --------  -->
<!-- #region  -->
<div class="demo">
    <ea-steps active="1" space="300px">
        <ea-step title="步骤 1" icon="icon-music"></ea-step>
        <ea-step title="步骤 2" icon="icon-videocam"></ea-step>
        <ea-step title="步骤 3" icon="icon-camera"></ea-step>
    </ea-steps>
</div>
<!-- #endregion  -->
<!-- -------------------  -->

::: details 示例代码-`html`

```html
<div class="demo">
  <ea-steps active="1" space="300px">
    <ea-step title="步骤 1" icon="icon-music"></ea-step>
    <ea-step title="步骤 2" icon="icon-videocam"></ea-step>
    <ea-step title="步骤 3" icon="icon-camera"></ea-step>
  </ea-steps>
</div>
```

:::

## 简洁风格的步骤条

设置 `simple` 可应用简洁风格，该条件下 `description` / `space` 都将失效。

<!-- -------- 4. 自定义每个 step 的间距 --------  -->
<!-- #region  -->
<div class="demo">
    <ea-steps active="1" space="300px">
        <ea-step title="步骤 1" icon="icon-music"></ea-step>
        <ea-step title="步骤 2" icon="icon-videocam"></ea-step>
        <ea-step title="步骤 3" icon="icon-camera"></ea-step>
    </ea-steps>
</div>
<!-- #endregion  -->
<!-- -------------------  -->

::: details 示例代码-`html`

```html
<div class="demo">
  <ea-steps :active="1">
    <ea-step
      title="步骤 1"
      description="这是一段很长很长很长的描述性文字"
    ></ea-step>
    <ea-step
      title="步骤 2"
      description="这是一段很长很长很长的描述性文字"
    ></ea-step>
    <ea-step title="步骤 3" description="这段就没那么长了"></ea-step>
  </ea-steps>
</div>
```

:::

## Steps Attributes

| 参数   | 说明                                | 类型    | 可选值 | 默认值 |
| ------ | ----------------------------------- | ------- | ------ | ------ |
| active | 当前激活步骤的 index，从 0 开始记数 | number  | —      | 0      |
| space  | 每个 step 的间距，不设置则自动计算  | string  | —      | —      |
| simple | 简洁模式                            | boolean | —      | false  |

## Step Attributes

| 参数        | 说明           | 类型   | 可选值                  | 默认值  |
| ----------- | -------------- | ------ | ----------------------- | ------- |
| title       | 标题           | string | —                       | —       |
| description | 步骤的详细描述 | string | —                       | —       |
| icon        | 图标           | string | —                       | —       |
| status      | 步骤的状态     | string | wait / process / finish | process |

## Step Slot

| 名称        | 说明     |
| ----------- | -------- |
| —           | 步骤内容 |
| title       | 步骤标题 |
| description | 步骤描述 |
| icon        | 步骤图标 |
