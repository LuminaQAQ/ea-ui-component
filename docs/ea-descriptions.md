<script setup>
import { onMounted } from 'vue'
import "../dist/components/index.js"
import "../dist/assets/icon.css"

onMounted(() => {
  const sizeExample = {
    radiogroup: document.querySelector("#sizeRadioGroup"),
    els: document.querySelectorAll(".descriptions-size"),
    init() {
      this.radiogroup.addEventListener("change", ({ detail }) => {
        const { value } = detail;

        this.els.forEach(el => {
          el.size = value;
        });
      });
    },
  };
  sizeExample.init();
})
</script>

<style scoped>
  ea-descriptions::part(my-label) {
    background-color: #f0f9eb;
  }

  ea-descriptions::part(my-content) {
    background-color: #fef0f0;
  }
</style>

# Descriptions 描述列表

列表形式展示多个字段。

## 引入

::: code-group

```html [原生引入]
<script type="module">
  import "./node_modules/easy-component-ui/dist/components/ea-descriptions.js";
</script>
```

```js [Vite]
import "easy-component-ui/ea-descriptions";
```

:::

## 自定义样式

移步到 [CSS Part](#descriptions-css-part) 和 [CSS Custom Properties](#descriptions-css-自定义属性)。

## 基础用法

<div class="demo">
  <ea-descriptions caption="User Info">
    <ea-descriptions-item label="Username"> Lilyiro </ea-descriptions-item>
    <ea-descriptions-item label="Essence">
      Lord of the Wild
    </ea-descriptions-item>
    <ea-descriptions-item label="Place">
      Lunacrest Continent
    </ea-descriptions-item>
    <ea-descriptions-item label="Traits">
      <ea-tag size="small" variant="warning" style="margin-right: 1rem">
        Thunderous Veins
      </ea-tag>
      <ea-tag size="small" variant="info">Daredevil</ea-tag>
    </ea-descriptions-item>
    <ea-descriptions-item label="Description">
      She was once an elf lord, defending the border from goblin invaders.
      She was then a goblin warrior, protecting her clan from being
      slaughtered by elves. She has the unwavering courage to uphold justice
      in her heart and she is prepared to betray or be betrayed for the
      greater good. Despite her inner gentleness, Lilyiro, who has spilled
      so much blood on battlefields, is more straightforward than men.
    </ea-descriptions-item>
  </ea-descriptions>
</div>

::: details 查看代码

```html
<ea-descriptions caption="User Info">
  <ea-descriptions-item label="Username"> Lilyiro </ea-descriptions-item>
  <ea-descriptions-item label="Essence">
    Lord of the Wild
  </ea-descriptions-item>
  <ea-descriptions-item label="Place">
    Lunacrest Continent
  </ea-descriptions-item>
  <ea-descriptions-item label="Traits">
    <ea-tag size="small" variant="warning" style="margin-right: 1rem">
      Thunderous Veins
    </ea-tag>
    <ea-tag size="small" variant="info">Daredevil</ea-tag>
  </ea-descriptions-item>
  <ea-descriptions-item label="Description">
    She was once an elf lord, defending the border from goblin invaders. She was
    then a goblin warrior, protecting her clan from being slaughtered by elves.
    She has the unwavering courage to uphold justice in her heart and she is
    prepared to betray or be betrayed for the greater good. Despite her inner
    gentleness, Lilyiro, who has spilled so much blood on battlefields, is more
    straightforward than men.
  </ea-descriptions-item>
</ea-descriptions>
```

:::

## 不同尺寸

<div class="demo">
  <ea-radio-group name="size" id="sizeRadioGroup" value="default">
    <ea-radio value="large">Large</ea-radio>
    <ea-radio value="default">Default</ea-radio>
    <ea-radio value="small">Small</ea-radio>
  </ea-radio-group>
  <ea-descriptions class="descriptions-size" caption="With border" border>
    <ea-descriptions-item label="Username"> Lilyiro </ea-descriptions-item>
    <ea-descriptions-item label="Essence">
      Lord of the Wild
    </ea-descriptions-item>
    <ea-descriptions-item label="Place">
      Lunacrest Continent
    </ea-descriptions-item>
    <ea-descriptions-item label="Traits">
      <ea-tag size="small" variant="warning" style="margin-right: 1rem">
        Thunderous Veins
      </ea-tag>
      <ea-tag size="small" variant="info">Daredevil</ea-tag>
    </ea-descriptions-item>
    <ea-descriptions-item label="Description">
      She was once an elf lord, defending the border from goblin invaders.
      She was then a goblin warrior, protecting her clan from being
      slaughtered by elves. She has the unwavering courage to uphold justice
      in her heart and she is prepared to betray or be betrayed for the
      greater good. Despite her inner gentleness, Lilyiro, who has spilled
      so much blood on battlefields, is more straightforward than men.
    </ea-descriptions-item>
  </ea-descriptions>

  <ea-descriptions caption="Without border">
    <ea-descriptions-item label="Username"> Lilyiro </ea-descriptions-item>
    <ea-descriptions-item label="Essence">
      Lord of the Wild
    </ea-descriptions-item>
    <ea-descriptions-item label="Place">
      Lunacrest Continent
    </ea-descriptions-item>
    <ea-descriptions-item label="Traits">
      <ea-tag size="small" variant="warning" style="margin-right: 1rem">
        Thunderous Veins
      </ea-tag>
      <ea-tag size="small" variant="info">Daredevil</ea-tag>
    </ea-descriptions-item>
    <ea-descriptions-item label="Description">
      She was once an elf lord, defending the border from goblin invaders.
      She was then a goblin warrior, protecting her clan from being
      slaughtered by elves. She has the unwavering courage to uphold justice
      in her heart and she is prepared to betray or be betrayed for the
      greater good. Despite her inner gentleness, Lilyiro, who has spilled
      so much blood on battlefields, is more straightforward than men.
    </ea-descriptions-item>
  </ea-descriptions>
</div>

::: details 查看代码

```html
<ea-radio-group name="size" id="sizeRadioGroup" value="default">
  <ea-radio value="large">Large</ea-radio>
  <ea-radio value="default">Default</ea-radio>
  <ea-radio value="small">Small</ea-radio>
</ea-radio-group>
<ea-descriptions class="descriptions-size" caption="With border" border>
  <ea-descriptions-item label="Username"> Lilyiro </ea-descriptions-item>
  <ea-descriptions-item label="Essence">
    Lord of the Wild
  </ea-descriptions-item>
  <ea-descriptions-item label="Place">
    Lunacrest Continent
  </ea-descriptions-item>
  <ea-descriptions-item label="Traits">
    <ea-tag size="small" variant="warning" style="margin-right: 1rem">
      Thunderous Veins
    </ea-tag>
    <ea-tag size="small" variant="info">Daredevil</ea-tag>
  </ea-descriptions-item>
  <ea-descriptions-item label="Description">
    She was once an elf lord, defending the border from goblin invaders. She was
    then a goblin warrior, protecting her clan from being slaughtered by elves.
    She has the unwavering courage to uphold justice in her heart and she is
    prepared to betray or be betrayed for the greater good. Despite her inner
    gentleness, Lilyiro, who has spilled so much blood on battlefields, is more
    straightforward than men.
  </ea-descriptions-item>
</ea-descriptions>

<ea-descriptions caption="Without border">
  <ea-descriptions-item label="Username"> Lilyiro </ea-descriptions-item>
  <ea-descriptions-item label="Essence">
    Lord of the Wild
  </ea-descriptions-item>
  <ea-descriptions-item label="Place">
    Lunacrest Continent
  </ea-descriptions-item>
  <ea-descriptions-item label="Traits">
    <ea-tag size="small" variant="warning" style="margin-right: 1rem">
      Thunderous Veins
    </ea-tag>
    <ea-tag size="small" variant="info">Daredevil</ea-tag>
  </ea-descriptions-item>
  <ea-descriptions-item label="Description">
    She was once an elf lord, defending the border from goblin invaders. She was
    then a goblin warrior, protecting her clan from being slaughtered by elves.
    She has the unwavering courage to uphold justice in her heart and she is
    prepared to betray or be betrayed for the greater good. Despite her inner
    gentleness, Lilyiro, who has spilled so much blood on battlefields, is more
    straightforward than men.
  </ea-descriptions-item>
</ea-descriptions>
```

:::

## 垂直列表

<div class="demo">
  <ea-descriptions
    caption="Vertical list with border"
    direction="vertical"
    border
  >
    <ea-descriptions-item label="Username"> Lilyiro </ea-descriptions-item>
    <ea-descriptions-item label="Essence">
      Lord of the Wild
    </ea-descriptions-item>
    <ea-descriptions-item label="Place">
      Lunacrest Continent
    </ea-descriptions-item>
    <ea-descriptions-item label="Traits">
      <ea-tag size="small" variant="warning" style="margin-right: 1rem">
        Thunderous Veins
      </ea-tag>
      <ea-tag size="small" variant="info">Daredevil</ea-tag>
    </ea-descriptions-item>
    <ea-descriptions-item label="Description">
      She was once an elf lord, defending the border from goblin invaders.
      She was then a goblin warrior, protecting her clan from being
      slaughtered by elves. She has the unwavering courage to uphold justice
      in her heart and she is prepared to betray or be betrayed for the
      greater good. Despite her inner gentleness, Lilyiro, who has spilled
      so much blood on battlefields, is more straightforward than men.
    </ea-descriptions-item>
  </ea-descriptions>
  <ea-descriptions
    caption="Vertical list without border"
    direction="vertical"
  >
    <ea-descriptions-item label="Username"> Lilyiro </ea-descriptions-item>
    <ea-descriptions-item label="Essence">
      Lord of the Wild
    </ea-descriptions-item>
    <ea-descriptions-item label="Place">
      Lunacrest Continent
    </ea-descriptions-item>
    <ea-descriptions-item label="Traits">
      <ea-tag size="small" variant="warning" style="margin-right: 1rem">
        Thunderous Veins
      </ea-tag>
      <ea-tag size="small" variant="info">Daredevil</ea-tag>
    </ea-descriptions-item>
    <ea-descriptions-item label="Description">
      She was once an elf lord, defending the border from goblin invaders.
      She was then a goblin warrior, protecting her clan from being
      slaughtered by elves. She has the unwavering courage to uphold justice
      in her heart and she is prepared to betray or be betrayed for the
      greater good. Despite her inner gentleness, Lilyiro, who has spilled
      so much blood on battlefields, is more straightforward than men.
    </ea-descriptions-item>
  </ea-descriptions>
</div>

::: details 查看代码

```html
<ea-descriptions
  caption="Vertical list with border"
  direction="vertical"
  border
>
  <ea-descriptions-item label="Username"> Lilyiro </ea-descriptions-item>
  <ea-descriptions-item label="Essence">
    Lord of the Wild
  </ea-descriptions-item>
  <ea-descriptions-item label="Place">
    Lunacrest Continent
  </ea-descriptions-item>
  <ea-descriptions-item label="Traits">
    <ea-tag size="small" variant="warning" style="margin-right: 1rem">
      Thunderous Veins
    </ea-tag>
    <ea-tag size="small" variant="info">Daredevil</ea-tag>
  </ea-descriptions-item>
  <ea-descriptions-item label="Description">
    She was once an elf lord, defending the border from goblin invaders. She was
    then a goblin warrior, protecting her clan from being slaughtered by elves.
    She has the unwavering courage to uphold justice in her heart and she is
    prepared to betray or be betrayed for the greater good. Despite her inner
    gentleness, Lilyiro, who has spilled so much blood on battlefields, is more
    straightforward than men.
  </ea-descriptions-item>
</ea-descriptions>

<ea-descriptions caption="Vertical list without border" direction="vertical">
  <ea-descriptions-item label="Username"> Lilyiro </ea-descriptions-item>
  <ea-descriptions-item label="Essence">
    Lord of the Wild
  </ea-descriptions-item>
  <ea-descriptions-item label="Place">
    Lunacrest Continent
  </ea-descriptions-item>
  <ea-descriptions-item label="Traits">
    <ea-tag size="small" type="warning" style="margin-right: 1rem"
      >Thunderous Veins</ea-tag
    >
    <ea-tag size="small" variant="info">Daredevil</ea-tag>
  </ea-descriptions-item>
  <ea-descriptions-item label="Description">
    She was once an elf lord, defending the border from goblin invaders. She was
    then a goblin warrior, protecting her clan from being slaughtered by elves.
    She has the unwavering courage to uphold justice in her heart and she is
    prepared to betray or be betrayed for the greater good. Despite her inner
    gentleness, Lilyiro, who has spilled so much blood on battlefields, is more
    straightforward than men.
  </ea-descriptions-item>
</ea-descriptions>
```

:::

## 单元格跨行

<div class="demo">
  <ea-descriptions caption="Width horizontal list" border>
    <ea-descriptions-item
      rowspan="2"
      width="140px"
      label="Photo"
      align="center"
    >
      <ea-avatar
        style="width: 100px; height: 100px"
        size="100%"
        src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
        tabindex="1"
      ></ea-avatar>
    </ea-descriptions-item>
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
      <ea-tag size="small" variant="info">Daredevil</ea-tag>
    </ea-descriptions-item>
    <ea-descriptions-item label="Description">
      She was then a goblin warrior, protecting her clan from being
      slaughtered by elves. She has the unwavering courage to uphold justice
      in her heart and she is prepared to betray or be betrayed for the
      greater good. Despite her inner gentleness, Lilyiro, who has spilled
      so much blood on battlefields, is more straightforward than men.
    </ea-descriptions-item>
  </ea-descriptions>
  <ea-descriptions
    caption="Width vertical list"
    direction="vertical"
    border
    style="margin-top: 20px"
  >
    <ea-descriptions-item
      rowspan="2"
      width="140px"
      label="Photo"
      align="center"
    >
      <ea-avatar
        style="width: 100px; height: 100px"
        size="100%"
        src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
        tabindex="1"
      ></ea-avatar>
    </ea-descriptions-item>
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
      She was once an elf lord, defending the border from goblin invaders. She was
      then a goblin warrior, protecting her clan from being slaughtered by elves.
      She has the unwavering courage to uphold justice in her heart and she is
      prepared to betray or be betrayed for the greater good. Despite her inner
      gentleness, Lilyiro, who has spilled so much blood on battlefields, is more
      straightforward than men.
    </ea-descriptions-item>
  </ea-descriptions>
</div>

::: details 查看代码

```html
<ea-descriptions caption="Width horizontal list" border>
  <ea-descriptions-item rowspan="2" width="140px" label="Photo" align="center">
    <ea-avatar
      style="width: 100px; height: 100px"
      size="100%"
      src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
      tabindex="1"
    ></ea-avatar>
  </ea-descriptions-item>
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
    She was once an elf lord, defending the border from goblin invaders. She was
    then a goblin warrior, protecting her clan from being slaughtered by elves.
    She has the unwavering courage to uphold justice in her heart and she is
    prepared to betray or be betrayed for the greater good. Despite her inner
    gentleness, Lilyiro, who has spilled so much blood on battlefields, is more
    straightforward than men.
  </ea-descriptions-item>
</ea-descriptions>
<ea-descriptions
  caption="Width vertical list"
  direction="vertical"
  border
  style="margin-top: 20px"
>
  <ea-descriptions-item rowspan="2" width="140px" label="Photo" align="center">
    <ea-avatar
      style="width: 100px; height: 100px"
      size="100%"
      src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
      tabindex="1"
    ></ea-avatar>
  </ea-descriptions-item>
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
    She was once an elf lord, defending the border from goblin invaders. She was
    then a goblin warrior, protecting her clan from being slaughtered by elves.
    She has the unwavering courage to uphold justice in her heart and she is
    prepared to betray or be betrayed for the greater good. Despite her inner
    gentleness, Lilyiro, who has spilled so much blood on battlefields, is more
    straightforward than men.
  </ea-descriptions-item>
</ea-descriptions>
```

:::

## 自定义样式

<div class="demo">
  <ea-descriptions column="3" border>
    <span slot="header">
      <ea-icon name="circle-info" color="#409eff"></ea-icon>Customized style list
    </span>
    <ea-button type="primary" slot="extra"> Operation </ea-button>
    <ea-descriptions-item
      label="Username"
      label-align="right"
      label-part="my-label"
      content-part="my-content"
      align="center"
      width="150px"
    >
      Lilyiro
    </ea-descriptions-item>
    <ea-descriptions-item label="Essence" label-align="right" align="center">
      Lord of the Wild
    </ea-descriptions-item>
    <ea-descriptions-item label="Place" label-align="right" align="center">
      Lunacrest Continent
    </ea-descriptions-item>
    <ea-descriptions-item label="Traits" label-align="right" align="center">
      <ea-tag size="small" type="warning" style="margin-right: 1rem">
        Thunderous Veins
      </ea-tag>
      <ea-tag size="small" type="info">Daredevil</ea-tag>
    </ea-descriptions-item>
    <ea-descriptions-item
      label="Description"
      label-align="right"
      align="center"
    >
      She was once an elf lord, defending the border from goblin invaders.
      She was then a goblin warrior, protecting her clan from being
      slaughtered by elves. She has the unwavering courage to uphold justice
      in her heart and she is prepared to betray or be betrayed for the
      greater good. Despite her inner gentleness, Lilyiro, who has spilled
      so much blood on battlefields, is more straightforward than men.
    </ea-descriptions-item>
  </ea-descriptions>
</div>

:::: details 查看代码

::: code-group

```html
<ea-descriptions column="3" border>
  <span slot="header">
    <ea-icon name="circle-info" color="#409eff"></ea-icon>Customized style list
  </span>
  <ea-button type="primary" slot="extra"> Operation </ea-button>
  <ea-descriptions-item
    label="Username"
    label-align="right"
    label-part="my-label"
    content-part="my-content"
    align="center"
    width="150px"
  >
    Lilyiro
  </ea-descriptions-item>
  <ea-descriptions-item label="Essence" label-align="right" align="center">
    Lord of the Wild
  </ea-descriptions-item>
  <ea-descriptions-item label="Place" label-align="right" align="center">
    Lunacrest Continent
  </ea-descriptions-item>
  <ea-descriptions-item label="Traits" label-align="right" align="center">
    <ea-tag size="small" type="warning" style="margin-right: 1rem">
      Thunderous Veins
    </ea-tag>
    <ea-tag size="small" type="info">Daredevil</ea-tag>
  </ea-descriptions-item>
  <ea-descriptions-item label="Description" label-align="right" align="center">
    She was once an elf lord, defending the border from goblin invaders. She was
    then a goblin warrior, protecting her clan from being slaughtered by elves.
    She has the unwavering courage to uphold justice in her heart and she is
    prepared to betray or be betrayed for the greater good. Despite her inner
    gentleness, Lilyiro, who has spilled so much blood on battlefields, is more
    straightforward than men.
  </ea-descriptions-item>
</ea-descriptions>
```

```css
ea-descriptions::part(my-label) {
  background-color: #f0f9eb;
}

ea-descriptions::part(my-content) {
  background-color: #fef0f0;
}
```

:::

::::

## Descriptions API

### Descriptions Attributes

| 参数        | 说明                                                                     | 类型                          | 可选值                      | 默认值     |
| ----------- | ------------------------------------------------------------------------ | ----------------------------- | --------------------------- | ---------- |
| caption     | 标题                                                                     | string                        | —                           | ""         |
| direction   | 列表排列方向                                                             | string                        | `vertical \| horizontal`    | horizontal |
| border      | 是否显示边框                                                             | boolean                       | —                           | false      |
| column      | 每行预期列数（用于分配单元格 colspan/rowspan）                           | number                        | —                           | 3          |
| size        | 组件尺寸，影响间距与字号                                                 | string                        | `large \| default \| small` | default    |
| label-width | 全局 label 宽度（如设置会作为 item 的默认 label 宽度，单个 item 可覆盖） | string (CSS 长度，如 `150px`) | —                           | ""         |

### Descriptions CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称      | 说明                                                |
| --------- | --------------------------------------------------- |
| container | 外层表格容器                                        |
| caption   | 标题与额外操作区容器                                |
| title     | 标题区域                                            |
| extra     | 右侧额外插槽区域                                    |
| body      | 表格 body（tbody）                                  |
| row       | 行（tr），在不同布局下会生成 label / content 行     |
| col-cell  | 单元格（td）                                        |
| label     | 标签单元格的 part（渲染为 th/td 时携带 label 标识） |
| content   | 内容单元格的 part（渲染为 td 时携带 content 标识）  |

### Descriptions Slots

| 名称    | 说明                                    |
| ------- | --------------------------------------- |
| header  | 标题插槽                                |
| extra   | 右侧额外操作区插槽                      |
| default | 默认插槽，用于放置 ea-descriptions-item |

### Descriptions CSS Custom Properties

| 属性名                        | 说明         | 默认值 |
| ----------------------------- | ------------ | ------ |
| --ea-descriptions-label-width | 标签宽度     | auto   |
| --ea-descriptions-item-width  | 单元格宽度   | auto   |
| --ea-descriptions-align       | 内容对齐方式 | left   |
| --ea-descriptions-label-align | 标签对齐方式 | left   |

## DescriptionsItem API

### DescriptionsItem Attributes

| 参数         | 说明                                                               | 类型              | 可选值                    | 默认值 |
| ------------ | ------------------------------------------------------------------ | ----------------- | ------------------------- | ------ |
| label        | 描述项的标签文本                                                   | string            | —                         | ""     |
| colspan      | 单元格横向占据的列数                                               | number            | —                         | 1      |
| rowspan      | 单元格纵向占据的行数                                               | number            | —                         | 1      |
| align        | 单元格对齐方式（同时影响 label 与 content）                        | string            | `left \| center \| right` | ""     |
| label-align  | label 文本对齐（优先于 align）                                     | string            | `left \| center \| right` | ""     |
| width        | 单元格宽度（CSS 长度）                                             | string (CSS 长度) | —                         | ""     |
| label-width  | 单个 label 宽度（覆盖 `ea-descriptions` 的 `label-width`）         | string (CSS 长度) | —                         | ""     |
| label-part   | 自定义 label 对应的 part 名称（会被附加到 label 的 part 属性）     | string            | —                         | ""     |
| content-part | 自定义 content 对应的 part 名称（会被附加到 content 的 part 属性） | string            | —                         | ""     |

### DescriptionsItem CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称      | 说明          |
| --------- | ------------- |
| container | item 外层容器 |
| label     | 标签元素      |
| content   | 内容元素      |

### DescriptionsItem Slots

| 名称 | 说明     |
| ---- | -------- |
| —    | 默认插槽 |

### DescriptionsItem Events

| 事件名                      | 说明                               | 回调参数 |
| --------------------------- | ---------------------------------- | -------- |
| ea-descriptions-item-change | 属性变化时触发，通知父组件重新渲染 | —        |
