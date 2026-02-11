<script setup>
import { onMounted } from 'vue'
import "../dist/components/index.js"
import "../dist/assets/icon.css"

onMounted(() => {

// 事件监听示例
const eventPicker = document.getElementById('eventPicker');
const colorPreview = document.getElementById('colorPreview');
const eventLog = document.getElementById('eventLog');

if (eventPicker && colorPreview && eventLog) {
  eventPicker.addEventListener('change', (e) => {
    eventLog.textContent = `颜色改变: ${e.detail.value}`;
    colorPreview.style.background = e.detail.value;
  });

  eventPicker.addEventListener('ea-active-change', (e) => {
    colorPreview.style.background = e.detail.value;
  });

  eventPicker.addEventListener('focus', () => {
    eventLog.textContent = '获得焦点';
  });

  eventPicker.addEventListener('blur', () => {
    eventLog.textContent = '失去焦点';
  });

  eventPicker.addEventListener('clear', () => {
    eventLog.textContent = '颜色已清除';
    colorPreview.style.background = 'transparent';
  });
}

// 方法调用示例
const methodPicker = document.getElementById('methodPicker');

if (methodPicker) {
  document.getElementById('showBtn').addEventListener('click', () => {
    methodPicker.show();
  });

  document.getElementById('hideBtn').addEventListener('click', () => {
    methodPicker.hide();
  });

  document.getElementById('focusBtn').addEventListener('click', () => {
    methodPicker.focus();
  });

  document.getElementById('blurBtn').addEventListener('click', () => {
    methodPicker.blur();
  });

  document.getElementById('getColorBtn').addEventListener('click', () => {
    const color = methodPicker.color();
    alert(`HEX: ${color.toHex()}\nRGB: ${color.toRgb()}\nHSL: ${color.toHsl()}`);
  });
}

})
</script>

<style scoped>
.color-preview {
  width: 100px;
  height: 40px;
  border-radius: 4px;
  margin: 0.5rem 0;
  border: 1px solid #ddd;
}
</style>

# ColorPicker 颜色选择器

用于颜色选择，支持多种颜色格式和透明度选择。

## 引入

> `js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-color-picker/index.js";
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

移步到 [CSS Part](#colorpicker-css-part)。

## 基础用法

支持多种颜色格式的基础颜色选择器

<div class="demo">
  <ea-color-picker value="#409eff" style="width: 200px"></ea-color-picker>
  <ea-color-picker value="rgb(64, 158, 255)" style="width: 200px"></ea-color-picker>
  <ea-color-picker value="hsl(210, 100%, 63%)" style="width: 200px"></ea-color-picker>
</div>

```html
<ea-color-picker value="#409eff" style="width: 200px"></ea-color-picker>
<ea-color-picker
  value="rgb(64, 158, 255)"
  style="width: 200px"
></ea-color-picker>
<ea-color-picker
  value="hsl(210, 100%, 63%)"
  style="width: 200px"
></ea-color-picker>
```

## 禁用状态

设置 `disabled` 属性可以禁用颜色选择器

<div class="demo">
  <ea-color-picker value="#409eff" disabled style="width: 200px"></ea-color-picker>
  <ea-color-picker value="#67c23a" disabled style="width: 200px"></ea-color-picker>
</div>

```html
<ea-color-picker
  value="#409eff"
  disabled
  style="width: 200px"
></ea-color-picker>
<ea-color-picker
  value="#67c23a"
  disabled
  style="width: 200px"
></ea-color-picker>
```

## 可清除

设置 `clearable` 属性可以显示清除按钮

<div class="demo">
  <ea-color-picker value="#409eff" clearable style="width: 200px"></ea-color-picker>
  <ea-color-picker value="" clearable style="width: 200px"></ea-color-picker>
</div>

```html
<ea-color-picker
  value="#409eff"
  clearable
  style="width: 200px"
></ea-color-picker>
<ea-color-picker value="" clearable style="width: 200px"></ea-color-picker>
```

## 不同尺寸

通过 `size` 属性设置不同尺寸的组件

<div class="demo">
  <ea-color-picker value="#409eff" size="small" style="width: 180px"></ea-color-picker>
  <ea-color-picker value="#409eff" style="width: 200px"></ea-color-picker>
  <ea-color-picker value="#409eff" size="large" style="width: 220px"></ea-color-picker>
</div>

```html
<ea-color-picker
  value="#409eff"
  size="small"
  style="width: 180px"
></ea-color-picker>
<ea-color-picker value="#409eff" style="width: 200px"></ea-color-picker>
<ea-color-picker
  value="#409eff"
  size="large"
  style="width: 220px"
></ea-color-picker>
```

## 透明度支持

设置 `color-format` 为 `rgb` 或 `rgba` 可以支持透明度选择

<div class="demo">
  <ea-color-picker value="rgba(64, 158, 255, 0.5)" color-format="rgb" style="width: 200px"></ea-color-picker>
  <ea-color-picker value="hsla(210, 100%, 63%, 0.3)" color-format="hsl" style="width: 200px"></ea-color-picker>
</div>

```html
<ea-color-picker
  value="rgba(64, 158, 255, 0.5)"
  color-format="rgb"
  style="width: 200px"
></ea-color-picker>
<ea-color-picker
  value="hsla(210, 100%, 63%, 0.3)"
  color-format="hsl"
  style="width: 200px"
></ea-color-picker>
```

## 预定义颜色

通过 `predefine` 属性设置预定义颜色数组

<div class="demo">
  <ea-color-picker 
    value="#409eff" 
    predefine="['#ff4500','#ff8c00','#ffd700','#90ee90','#00ced1','#1e90ff','#c71585']" 
    style="width: 200px">
  </ea-color-picker>
</div>

```html
<ea-color-picker
  value="#409eff"
  predefine="['#ff4500','#ff8c00','#ffd700','#90ee90','#00ced1','#1e90ff','#c71585']"
  style="width: 200px"
>
</ea-color-picker>
```

## 独立面板使用

`ea-color-picker-panel` 可以独立使用

<div class="demo">
  <ea-color-picker-panel value="#409eff"></ea-color-picker-panel>
  <ea-color-picker-panel value="rgba(64, 158, 255, 0.5)" show-alpha></ea-color-picker-panel>
</div>

```html
<ea-color-picker-panel value="#409eff"></ea-color-picker-panel>
<ea-color-picker-panel
  value="rgba(64, 158, 255, 0.5)"
  show-alpha
></ea-color-picker-panel>
```

## 事件监听

监听 `change`、`ea-active-change`、`focus`、`blur`、`clear` 等事件

<div class="demo">
  <ea-color-picker id="eventPicker" value="#409eff" clearable style="width: 200px"></ea-color-picker>
  <div>
    <div class="color-preview" id="colorPreview"></div>
    <p id="eventLog">事件日志将显示在这里</p>
  </div>
</div>

```html
<ea-color-picker
  id="eventPicker"
  value="#409eff"
  clearable
  style="width: 200px"
></ea-color-picker>
<div>
  <div class="color-preview" id="colorPreview"></div>
  <p id="eventLog">事件日志将显示在这里</p>
</div>
```

```javascript
const picker = document.getElementById("eventPicker");
const preview = document.getElementById("colorPreview");
const log = document.getElementById("eventLog");

picker.addEventListener("change", e => {
  log.textContent = `颜色改变: ${e.detail.value}`;
  preview.style.background = e.detail.value;
});

picker.addEventListener("ea-active-change", e => {
  preview.style.background = e.detail.value;
});

picker.addEventListener("focus", () => {
  log.textContent = "获得焦点";
});

picker.addEventListener("blur", () => {
  log.textContent = "失去焦点";
});

picker.addEventListener("clear", () => {
  log.textContent = "颜色已清除";
  preview.style.background = "transparent";
});
```

## 方法调用

通过 JavaScript 调用组件的方法

<div class="demo">
  <ea-color-picker id="methodPicker" value="#409eff" style="width: 200px"></ea-color-picker>
  <ea-button id="showBtn">显示面板</ea-button>
  <ea-button id="hideBtn">隐藏面板</ea-button>
  <ea-button id="focusBtn">聚焦</ea-button>
  <ea-button id="blurBtn">失焦</ea-button>
  <ea-button id="getColorBtn">获取颜色对象</ea-button>
</div>

```html
<ea-color-picker
  id="methodPicker"
  value="#409eff"
  style="width: 200px"
></ea-color-picker>
<ea-button id="showBtn">显示面板</ea-button>
<ea-button id="hideBtn">隐藏面板</ea-button>
<ea-button id="focusBtn">聚焦</ea-button>
<ea-button id="blurBtn">失焦</ea-button>
<ea-button id="getColorBtn">获取颜色对象</ea-button>
```

```javascript
const picker = document.getElementById("methodPicker");

document.getElementById("showBtn").addEventListener("click", () => {
  picker.show();
});

document.getElementById("hideBtn").addEventListener("click", () => {
  picker.hide();
});

document.getElementById("focusBtn").addEventListener("click", () => {
  picker.focus();
});

document.getElementById("blurBtn").addEventListener("click", () => {
  picker.blur();
});

document.getElementById("getColorBtn").addEventListener("click", () => {
  const color = picker.color();
  console.log("颜色对象:", color);
  alert(`HEX: ${color.toHex()}\nRGB: ${color.toRgb()}\nHSL: ${color.toHsl()}`);
});
```

## ColorPicker API

### ColorPicker Attributes

| 参数         | 说明           | 类型    | 可选值                     | 默认值 |
| ------------ | -------------- | ------- | -------------------------- | ------ |
| value        | 选中的颜色值   | String  | -                          | -      |
| disabled     | 是否禁用       | Boolean | -                          | false  |
| clearable    | 是否可清除     | Boolean | -                          | false  |
| size         | 组件尺寸       | Enum    | `small \| medium \| large` | -      |
| color-format | 颜色格式       | Enum    | `hsl \| hsv \| hex \| rgb` | hex    |
| predefine    | 预定义颜色数组 | Array   | -                          | []     |
| tabindex     | tabindex 属性  | Number  | -                          | 0      |

### ColorPicker CSS Part

| 名称       | 说明         |
| ---------- | ------------ |
| container  | 外层容器     |
| trigger    | 颜色触发块   |
| input      | 输入框       |
| clear-icon | 清除图标     |
| arrow-icon | 箭头图标     |
| panel      | 颜色面板容器 |

### ColorPicker Slots

| 名称 | 说明                 |
| ---- | -------------------- |
| -    | 默认插槽（暂不支持） |

### ColorPicker Methods

| 方法名 | 说明                   | 参数 |
| ------ | ---------------------- | ---- |
| color  | 返回当前色彩对象       | -    |
| show   | 手动显示颜色选择器面板 | -    |
| hide   | 手动隐藏颜色选择器面板 | -    |
| focus  | 使组件获得焦点         | -    |
| blur   | 使组件失去焦点         | -    |

### ColorPicker Events

| 事件名           | 说明                               | 回调参数(event.detail) |
| ---------------- | ---------------------------------- | ---------------------- |
| change           | 绑定值变化时触发                   | `{ value: string }`    |
| ea-active-change | 面板中当前显示的颜色发生改变时触发 | `{ value: string }`    |
| focus            | 获得焦点时触发                     | -                      |
| blur             | 失去焦点时触发                     | -                      |
| clear            | 点击清除按钮时触发                 | -                      |

## ColorPickerPanel API

### ColorPickerPanel Attributes

| 参数         | 说明               | 类型    | 可选值                     | 默认值  |
| ------------ | ------------------ | ------- | -------------------------- | ------- |
| value        | 选中的颜色值       | String  | -                          | #409eff |
| color-format | 颜色格式           | Enum    | `hsl \| hsv \| hex \| rgb` | hex     |
| predefine    | 预定义颜色数组     | Array   | -                          | []      |
| show-alpha   | 是否支持透明度选择 | Boolean | -                          | false   |
| disabled     | 是否禁用           | Boolean | -                          | false   |

### ColorPickerPanel CSS Part

| 名称             | 说明             |
| ---------------- | ---------------- |
| container        | 外层容器         |
| saturation       | 饱和度选择区域   |
| saturation-white | 饱和度白色渐变层 |
| saturation-black | 饱和度黑色渐变层 |
| saturation-thumb | 饱和度滑块       |
| hue              | 色相选择条       |
| hue-thumb        | 色相滑块         |
| alpha            | 透明度选择条     |
| alpha-gradient   | 透明度渐变层     |
| alpha-thumb      | 透明度滑块       |
| predefine        | 预定义颜色区域   |
| predefine-title  | 预定义颜色标题   |
| predefine-list   | 预定义颜色列表   |
| inputs           | 输入区域         |
| color-preview    | 颜色预览块       |
| hex-input        | HEX 输入框       |
| rgb-input        | RGB 输入框       |
| hsl-input        | HSL 输入框       |
| hsv-input        | HSV 输入框       |

### ColorPickerPanel Slots

| 名称 | 说明                 |
| ---- | -------------------- |
| -    | 默认插槽（暂不支持） |

### ColorPickerPanel Methods

| 方法名   | 说明             | 参数            |
| -------- | ---------------- | --------------- |
| color    | 返回当前色彩对象 | -               |
| setValue | 设置颜色值       | `value: string` |

### ColorPickerPanel Events

| 事件名           | 说明                         | 回调参数(event.detail) |
| ---------------- | ---------------------------- | ---------------------- |
| ea-active-change | 当前显示的颜色发生改变时触发 | `{ value: string }`    |
