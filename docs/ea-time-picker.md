<script setup>
import { onMounted } from 'vue'
import "../dist/components/index.js"
import "../dist/assets/icon.css"

onMounted(() => {
  
      const basicExample = {
        sizeSegmented: document.getElementById("sizeSegmented"),
        defaultTimePicker: document.getElementById("defaultTimePicker"),
        valueTimePicker: document.getElementById("valueTimePicker"),
        disabledTimePicker: document.getElementById("disabledTimePicker"),
        centerTimePicker: document.getElementById("centerTimePicker"),

        init() {
          this.sizeSegmented.options = ["small", "default", "large"];

          this.sizeSegmented.addEventListener("change", e => {
            this.defaultTimePicker.size = e.detail.value;
            this.valueTimePicker.size = e.detail.value;
            this.disabledTimePicker.size = e.detail.value;
            this.centerTimePicker.size = e.detail.value;
          });
        },
      };

      basicExample.init();

  const eventExample = {
    eventTimePicker: document.getElementById("eventTimePicker"),
    changeValue: document.getElementById("changeValue"),

    init() {
      this.eventTimePicker.addEventListener("change", e => {
        this.changeValue.textContent = "Value: " + e.detail.value;
      });
    },
  };

  eventExample.init();
})
</script>

<style>
.demo-time-picker {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 1rem 0;
}

.demo-time-picker .block {
  flex: 1;
  min-width: 240px;
  max-width: 320px;
  padding: 1.5rem;
}

.demo-time-picker .demonstration {
  display: block;
  margin-bottom: 0.75rem;
  font-size: 14px;
  text-align: center;
  color: #606266;
}

.demo-time-picker .demonstration:first-child {
  font-weight: 600;
  color: #303133;
}

.demo-time-picker ea-time-picker {
  width: 100%;
}
</style>

# TimePicker 时间选择器

用于选择或输入时间

## 引入

> `js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-time-picker/index.js";
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

移步到 [CSS Part](#time-picker-css-part)。

## 任意时间点

可以选择任意时间

<div class="demo">
  <p>
    <ea-segmented id="sizeSegmented" value="default"></ea-segmented>
  </p>
  <div class="demo-time-picker">
    <div class="block">
      <span class="demonstration">Default</span>
      <ea-time-picker
        id="defaultTimePicker"
        placeholder="Select time"
      ></ea-time-picker>
    </div>
    <div class="block">
      <span class="demonstration">With Value</span>
      <ea-time-picker
        id="valueTimePicker"
        value="08:00:00"
        placeholder="Select time"
      ></ea-time-picker>
    </div>
    <div class="block">
      <span class="demonstration">Disabled</span>
      <ea-time-picker
        id="disabledTimePicker"
        value="12:30:00"
        disabled
      ></ea-time-picker>
    </div>
    <div class="block">
      <span class="demonstration">Center Aligned</span>
      <ea-time-picker
        id="centerTimePicker"
        value="18:45:30"
        align="center"
      ></ea-time-picker>
    </div>
  </div>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo">
  <p>
    <ea-segmented id="sizeSegmented" value="default"></ea-segmented>
  </p>
  <div class="demo-time-picker">
    <div class="block">
      <span class="demonstration">Default</span>
      <ea-time-picker
        id="defaultTimePicker"
        placeholder="Select time"
      ></ea-time-picker>
    </div>
    <div class="block">
      <span class="demonstration">With Value</span>
      <ea-time-picker
        id="valueTimePicker"
        value="08:00:00"
        placeholder="Select time"
      ></ea-time-picker>
    </div>
    <div class="block">
      <span class="demonstration">Disabled</span>
      <ea-time-picker
        id="disabledTimePicker"
        value="12:30:00"
        disabled
      ></ea-time-picker>
    </div>
    <div class="block">
      <span class="demonstration">Center Aligned</span>
      <ea-time-picker
        id="centerTimePicker"
        value="18:45:30"
        align="center"
      ></ea-time-picker>
    </div>
  </div>
</div>
```

```css
.demo-time-picker {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 1rem 0;
}

.demo-time-picker .block {
  flex: 1;
  min-width: 240px;
  max-width: 320px;
  padding: 1.5rem;
}

.demo-time-picker .demonstration {
  display: block;
  margin-bottom: 0.75rem;
  font-size: 14px;
  text-align: center;
  color: #606266;
}

.demo-time-picker .demonstration:first-child {
  font-weight: 600;
  color: #303133;
}

.demo-time-picker ea-time-picker {
  width: 100%;
}
```

```js
const basicExample = {
  sizeSegmented: document.getElementById("sizeSegmented"),
  defaultTimePicker: document.getElementById("defaultTimePicker"),
  valueTimePicker: document.getElementById("valueTimePicker"),
  disabledTimePicker: document.getElementById("disabledTimePicker"),
  centerTimePicker: document.getElementById("centerTimePicker"),

  init() {
    this.sizeSegmented.options = ["small", "default", "large"];

    this.sizeSegmented.addEventListener("change", e => {
      this.defaultTimePicker.size = e.detail.value;
      this.valueTimePicker.size = e.detail.value;
      this.disabledTimePicker.size = e.detail.value;
      this.centerTimePicker.size = e.detail.value;
    });
  },
};

basicExample.init();
```

:::

::::

## 限制时间选择范围

可以限制时间选择的范围

<div class="demo demo-time-picker">
  <div class="block">
    <span class="demonstration">Limited Range (09:00 - 18:00)</span>
    <ea-time-picker
      placeholder="Select time"
      limit-range-start="09:00:00"
      limit-range-end="18:00:00"
    ></ea-time-picker>
  </div>
  <div class="block">
    <span class="demonstration">Limited Range (12:30 - 14:30)</span>
    <ea-time-picker
      placeholder="Select time"
      limit-range-start="12:30:00"
      limit-range-end="14:30:00"
    ></ea-time-picker>
  </div>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo demo-time-picker">
  <div class="block">
    <span class="demonstration">Limited Range (09:00 - 18:00)</span>
    <ea-time-picker
      placeholder="Select time"
      limit-range-start="09:00:00"
      limit-range-end="18:00:00"
    ></ea-time-picker>
  </div>
  <div class="block">
    <span class="demonstration">Limited Range (12:30 - 14:30)</span>
    <ea-time-picker
      placeholder="Select time"
      limit-range-start="12:30:00"
      limit-range-end="14:30:00"
    ></ea-time-picker>
  </div>
</div>
```

```css
.demo-time-picker {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 1rem 0;
}

.demo-time-picker .block {
  flex: 1;
  min-width: 240px;
  max-width: 320px;
  padding: 1.5rem;
}

.demo-time-picker .demonstration {
  display: block;
  margin-bottom: 0.75rem;
  font-size: 14px;
  text-align: center;
  color: #606266;
}
```

:::

::::

## 事件监听

监听时间选择器的事件

<div class="demo demo-time-picker">
  <div class="block">
    <span class="demonstration">Change Event</span>
    <div class="demonstration" id="changeValue">Value: -</div>
    <ea-time-picker id="eventTimePicker" placeholder="Select time"></ea-time-picker>
  </div>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo demo-time-picker">
  <div class="block">
    <span class="demonstration">Change Event</span>
    <div class="demonstration" id="changeValue">Value: -</div>
    <ea-time-picker
      id="eventTimePicker"
      placeholder="Select time"
    ></ea-time-picker>
  </div>
</div>
```

```js
const eventExample = {
  eventTimePicker: document.getElementById("eventTimePicker"),
  changeValue: document.getElementById("changeValue"),

  init() {
    this.eventTimePicker.addEventListener("change", e => {
      this.changeValue.textContent = "Value: " + e.detail.value;
    });
  },
};

eventExample.init();
```

```css
.demo-time-picker {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 1rem 0;
}

.demo-time-picker .block {
  flex: 1;
  min-width: 240px;
  max-width: 320px;
  padding: 1.5rem;
}

.demo-time-picker .demonstration {
  display: block;
  margin-bottom: 0.75rem;
  font-size: 14px;
  text-align: center;
  color: #606266;
}
```

:::

::::

## Time Picker API

### Time Picker Attributes

| 参数              | 说明             | 类型    | 可选值                | 默认值   |
| ----------------- | ---------------- | ------- | --------------------- | -------- |
| value             | 绑定值           | String  | —                     | —        |
| width             | 输入框宽度       | String  | —                     | —        |
| disabled          | 是否禁用         | Boolean | —                     | false    |
| align             | 对齐方式         | String  | left / center / right | left     |
| placeholder       | 占位符           | String  | —                     | —        |
| limit-range-start | 限制范围开始时间 | String  | —                     | 00:00:00 |
| limit-range-end   | 限制范围结束时间 | String  | —                     | 23:59:59 |

### Time Picker CSS Part

| 名称                | 说明             |
| ------------------- | ---------------- |
| container           | 组件容器         |
| input               | 输入框元素       |
| dropdown            | 下拉面板         |
| dropdown-inner-wrap | 下拉面板内部容器 |
| dropdown-time       | 时间列表         |
| dropdown-item       | 时间项           |

### Time Picker Methods

| 方法名      | 说明           | 参数 |
| ----------- | -------------- | ---- |
| focus       | 使组件获取焦点 | —    |
| blur        | 使组件失去焦点 | —    |
| handleOpen  | 打开下拉面板   | —    |
| handleClose | 关闭下拉面板   | —    |

### Time Picker Events

| 事件名            | 说明                     | 回调参数(event.detail) |
| ----------------- | ------------------------ | ---------------------- |
| change            | 值改变时触发             | `{ value: string }`    |
| focus             | 获得焦点时触发           | —                      |
| blur              | 失去焦点时触发           | —                      |
| ea-visible-change | 下拉面板可见性改变时触发 | `{ visible: boolean }` |
