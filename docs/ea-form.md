<script setup>
import { onMounted } from 'vue'
import "../dist/components/index.js"
import "../dist/assets/icon.css"

onMounted(() => {
    // ------- 1. 基础表单 -------
    // #region
    const basicForm = {
        form: document.getElementById('basicForm'),
        output: document.getElementById('basicFormOutput'),

        init() {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(this.form);
                const data = Object.fromEntries(formData.entries());
                this.output.textContent = '表单数据：\n' + JSON.stringify(data, null, 2);
            });
        }
    };
    basicForm.init();
    // #endregion
    // ------- end -------

    // ------- 2. 复杂表单 -------
    // #region
    const complexForm = {
        form: document.getElementById('complexForm'),
        output: document.getElementById('complexOutput'),

        init() {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(this.form);
                const data = Object.fromEntries(formData.entries());
                this.output.textContent = '表单数据：\n' + JSON.stringify(data, null, 2);
            });
        }
    };
    complexForm.init();
    // #endregion
    // ------- end -------

    // ------- 3. 穿梭框数据初始化 -------
    // #region
    const initTransferData = () => {
        const complexTransfer = document.getElementById('complexTransfer');
        const transferValidate = document.getElementById('transferValidate');

        const data = [
            { key: 1, label: 'JavaScript' },
            { key: 2, label: 'Python' },
            { key: 3, label: 'Java' },
            { key: 4, label: 'C++' },
            { key: 5, label: 'Go' },
            { key: 6, label: 'Rust' },
            { key: 7, label: 'TypeScript' },
            { key: 8, label: 'Vue' },
        ];

        if (complexTransfer) complexTransfer.data = data;
        if (transferValidate) transferValidate.data = [
            { key: 1, label: '选项 1' },
            { key: 2, label: '选项 2' },
            { key: 3, label: '选项 3' },
            { key: 4, label: '选项 4' },
            { key: 5, label: '选项 5' },
        ];
    };
    initTransferData();
    // #endregion
    // ------- end -------

    // ------- 4. 各组件验证表单 -------
    // #region
    const componentForms = [
        { id: 'inputForm', name: '输入框' },
        { id: 'inputNumberForm', name: '数字输入' },
        { id: 'selectForm', name: '选择器' },
        { id: 'radioForm', name: '单选组' },
        { id: 'checkboxForm', name: '复选组' },
        { id: 'singleCheckboxForm', name: '单选复选框' },
        { id: 'datePickerForm', name: '日期选择' },
        { id: 'timePickerForm', name: '时间选择' },
        { id: 'rateForm', name: '评分' },
        { id: 'switchForm', name: '开关' },
        { id: 'colorPickerForm', name: '颜色选择' },
        { id: 'sliderForm', name: '滑块' },
        { id: 'transferForm', name: '穿梭框' },
    ];

    componentForms.forEach(({ id, name }) => {
        const form = document.getElementById(id);
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                alert(`${name} 验证通过！`);
            });
        }
    });
    // #endregion
    // ------- end -------
})
</script>

<style>
.demo-form-page {
  max-width: 1200px;
  margin: 0 auto;
}

.demo-card {
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.demo-card-title {
  font-size: 1.5rem;
  color: #303133;
  margin: 0 0 1.5rem 0;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e4e7ed;
}

.demo-section-title {
  font-size: 1.1rem;
  color: #606266;
  margin: 1.5rem 0 1rem 0;
  padding-left: 0.75rem;
  border-left: 4px solid #409eff;
}

.demo-form {
  padding: 1.5rem;
  border-radius: 8px;
  margin: 1rem 0;
}

.demo-form-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  align-items: flex-start;
}

.demo-form-row > * {
  flex: 1;
  min-width: 200px;
}

.demo-button-group {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e4e7ed;
}

.demo-output {
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e7ed 100%);
  padding: 1.25rem;
  border-radius: 8px;
  margin-top: 1.5rem;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 14px;
  white-space: pre-wrap;
  border-left: 4px solid #409eff;
  color: #303133;
}

.component-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.component-card {
  padding: 1.25rem;
  border-radius: 8px;
}

.component-card h4 {
  margin: 0 0 1rem 0;
  color: #606266;
  font-size: 0.95rem;
}

.component-card .demo-button-group {
  margin-top: 1rem;
  padding-top: 0;
  border: none;
}
</style>

# Form 表单

由输入框、选择器、单选框、多选框等控件组成，用以收集、校验、提交数据

## 引入

> `js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-input/index.js";
  import "./node_modules/easy-component-ui/components/ea-input-number/index.js";
  import "./node_modules/easy-component-ui/components/ea-select/index.js";
  import "./node_modules/easy-component-ui/components/ea-date-picker/index.js";
  import "./node_modules/easy-component-ui/components/ea-time-picker/index.js";
  import "./node_modules/easy-component-ui/components/ea-radio/index.js";
  import "./node_modules/easy-component-ui/components/ea-checkbox/index.js";
  import "./node_modules/easy-component-ui/components/ea-switch/index.js";
  import "./node_modules/easy-component-ui/components/ea-textarea/index.js";
  import "./node_modules/easy-component-ui/components/ea-button/index.js";
  import "./node_modules/easy-component-ui/components/ea-rate/index.js";
  import "./node_modules/easy-component-ui/components/ea-color-picker/index.js";
  import "./node_modules/easy-component-ui/components/ea-slider/index.js";
  import "./node_modules/easy-component-ui/components/ea-transfer/index.js";
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

## 基础表单

包含常用的表单控件，展示基本的表单布局和数据收集功能。

<div class="demo">
  <div class="demo-card">
    <form id="basicForm" class="demo-form">
      <div class="demo-form-row">
        <ea-input
          name="username"
          label="用户名"
          placeholder="请输入用户名"
          style="width: 100%"
        ></ea-input>
        <ea-input
          name="email"
          label="邮箱"
          type="email"
          placeholder="请输入邮箱"
          style="width: 100%"
        ></ea-input>
      </div>
      <div class="demo-form-row">
        <ea-input-number
          name="age"
          label="年龄"
          min="1"
          max="150"
          value="25"
          style="width: 100%"
        ></ea-input-number>
        <ea-select
          name="city"
          label="城市"
          placeholder="请选择城市"
          style="width: 100%"
        >
          <ea-option value="beijing">北京</ea-option>
          <ea-option value="shanghai">上海</ea-option>
          <ea-option value="guangzhou">广州</ea-option>
          <ea-option value="shenzhen">深圳</ea-option>
        </ea-select>
      </div>
      <div class="demo-button-group">
        <ea-button type="primary" button-type="submit">提交</ea-button>
        <ea-button button-type="reset">重置</ea-button>
      </div>
    </form>
    <div class="demo-output" id="basicFormOutput"></div>
  </div>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo-card">
  <form id="basicForm" class="demo-form">
    <div class="demo-form-row">
      <ea-input
        name="username"
        label="用户名"
        placeholder="请输入用户名"
        style="width: 100%"
      ></ea-input>
      <ea-input
        name="email"
        label="邮箱"
        type="email"
        placeholder="请输入邮箱"
        style="width: 100%"
      ></ea-input>
    </div>
    <div class="demo-form-row">
      <ea-input-number
        name="age"
        label="年龄"
        min="1"
        max="150"
        value="25"
        style="width: 100%"
      ></ea-input-number>
      <ea-select
        name="city"
        label="城市"
        placeholder="请选择城市"
        style="width: 100%"
      >
        <ea-option value="beijing">北京</ea-option>
        <ea-option value="shanghai">上海</ea-option>
        <ea-option value="guangzhou">广州</ea-option>
        <ea-option value="shenzhen">深圳</ea-option>
      </ea-select>
    </div>
    <div class="demo-button-group">
      <ea-button type="primary" button-type="submit">提交</ea-button>
      <ea-button button-type="reset">重置</ea-button>
    </div>
  </form>
  <div class="demo-output" id="basicFormOutput"></div>
</div>
```

```css
.demo-form-page {
  max-width: 1200px;
  margin: 0 auto;
}

.demo-card {
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.demo-card-title {
  font-size: 1.5rem;
  color: #303133;
  margin: 0 0 1.5rem 0;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e4e7ed;
}

.demo-section-title {
  font-size: 1.1rem;
  color: #606266;
  margin: 1.5rem 0 1rem 0;
  padding-left: 0.75rem;
  border-left: 4px solid #409eff;
}

.demo-form {
  padding: 1.5rem;
  border-radius: 8px;
  margin: 1rem 0;
}

.demo-form-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  align-items: flex-start;
}

.demo-form-row > * {
  flex: 1;
  min-width: 200px;
}

.demo-button-group {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e4e7ed;
}

.demo-output {
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e7ed 100%);
  padding: 1.25rem;
  border-radius: 8px;
  margin-top: 1.5rem;
  font-family: "Consolas", "Monaco", monospace;
  font-size: 14px;
  white-space: pre-wrap;
  border-left: 4px solid #409eff;
  color: #303133;
}

.component-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.component-card {
  padding: 1.25rem;
  border-radius: 8px;
}

.component-card h4 {
  margin: 0 0 1rem 0;
  color: #606266;
  font-size: 0.95rem;
}

.component-card .demo-button-group {
  margin-top: 1rem;
  padding-top: 0;
  border: none;
}
```

```js
const basicForm = {
  form: document.getElementById("basicForm"),
  output: document.getElementById("basicFormOutput"),

  init() {
    this.form.addEventListener("submit", e => {
      e.preventDefault();
      const formData = new FormData(this.form);
      const data = Object.fromEntries(formData.entries());
      this.output.textContent = "表单数据：\n" + JSON.stringify(data, null, 2);
    });
  },
};
basicForm.init();
```

:::

::::

## 复杂表单

涵盖所有表单组件的综合示例，展示表单验证和数据收集功能。

<div class="demo">
  <div class="demo-card">
    <form id="complexForm" class="demo-form">
      <div class="demo-section-title">基本信息</div>
      <div class="demo-form-row">
        <ea-input
          name="username"
          label="用户名"
          required
          minlength="3"
          maxlength="20"
          placeholder="请输入用户名"
          style="width: 100%"
        ></ea-input>
        <ea-input
          name="email"
          label="邮箱"
          type="email"
          required
          placeholder="请输入邮箱"
          style="width: 100%"
        ></ea-input>
        <ea-input-number
          name="age"
          label="年龄"
          required
          min="18"
          max="100"
          value="25"
          style="width: 100%"
        ></ea-input-number>
      </div>
      <div class="demo-section-title">选择信息</div>
      <div class="demo-form-row">
        <ea-select
          name="city"
          label="城市"
          required
          placeholder="请选择城市"
          style="width: 100%"
        >
          <ea-option value="beijing">北京</ea-option>
          <ea-option value="shanghai">上海</ea-option>
          <ea-option value="guangzhou">广州</ea-option>
          <ea-option value="shenzhen">深圳</ea-option>
        </ea-select>
        <ea-date-picker
          name="birthDate"
          label="出生日期"
          required
          placeholder="选择日期"
          style="width: 100%"
        ></ea-date-picker>
        <ea-time-picker
          name="workTime"
          label="工作时间"
          required
          placeholder="选择时间"
          style="width: 100%"
        ></ea-time-picker>
      </div>
      <div class="demo-section-title">偏好设置</div>
      <div class="demo-form-row">
        <ea-radio-group name="gender" label="性别" required style="flex: 1;">
          <ea-radio value="male" label="男"></ea-radio>
          <ea-radio value="female" label="女"></ea-radio>
        </ea-radio-group>
        <ea-checkbox-group name="hobbies" label="兴趣爱好" required style="flex: 2;">
          <ea-checkbox value="reading" label="阅读"></ea-checkbox>
          <ea-checkbox value="sports" label="运动"></ea-checkbox>
          <ea-checkbox value="music" label="音乐"></ea-checkbox>
          <ea-checkbox value="travel" label="旅行"></ea-checkbox>
        </ea-checkbox-group>
      </div>
      <div class="demo-form-row">
        <ea-slider
          name="satisfaction"
          label="满意度"
          min="0"
          max="100"
          value="80"
          show-input
          style="flex: 2;"
        ></ea-slider>
        <ea-rate
          name="serviceScore"
          label="服务评分"
          required
          value="0"
          style="flex: 1;"
        ></ea-rate>
      </div>
      <div class="demo-form-row">
        <ea-color-picker
          name="themeColor"
          label="主题颜色"
          required
          value="#409EFF"
          style="flex: 1;"
        ></ea-color-picker>
        <ea-switch name="agreement" label="同意用户协议" required style="flex: 1;"></ea-switch>
      </div>
      <div class="demo-section-title">技能选择</div>
      <div class="demo-form-row">
        <ea-transfer
          id="complexTransfer"
          name="selectedSkills"
          label="技能选择"
          required
          style="width: 100%"
        ></ea-transfer>
      </div>
      <div class="demo-button-group">
        <ea-button type="primary" button-type="submit">提交</ea-button>
        <ea-button button-type="reset">重置</ea-button>
      </div>
    </form>
    <div class="demo-output" id="complexOutput"></div>
  </div>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo-card">
  <form id="complexForm" class="demo-form">
    <div class="demo-section-title">基本信息</div>
    <div class="demo-form-row">
      <ea-input
        name="username"
        label="用户名"
        required
        minlength="3"
        maxlength="20"
        placeholder="请输入用户名"
        style="width: 100%"
      ></ea-input>
      <ea-input
        name="email"
        label="邮箱"
        type="email"
        required
        placeholder="请输入邮箱"
        style="width: 100%"
      ></ea-input>
      <ea-input-number
        name="age"
        label="年龄"
        required
        min="18"
        max="100"
        value="25"
        style="width: 100%"
      ></ea-input-number>
    </div>

    <div class="demo-section-title">选择信息</div>
    <div class="demo-form-row">
      <ea-select
        name="city"
        label="城市"
        required
        placeholder="请选择城市"
        style="width: 100%"
      >
        <ea-option value="beijing">北京</ea-option>
        <ea-option value="shanghai">上海</ea-option>
        <ea-option value="guangzhou">广州</ea-option>
        <ea-option value="shenzhen">深圳</ea-option>
      </ea-select>
      <ea-date-picker
        name="birthDate"
        label="出生日期"
        required
        placeholder="选择日期"
        style="width: 100%"
      ></ea-date-picker>
      <ea-time-picker
        name="workTime"
        label="工作时间"
        required
        placeholder="选择时间"
        style="width: 100%"
      ></ea-time-picker>
    </div>

    <div class="demo-section-title">偏好设置</div>
    <div class="demo-form-row">
      <ea-radio-group name="gender" label="性别" required style="flex: 1;">
        <ea-radio value="male" label="男"></ea-radio>
        <ea-radio value="female" label="女"></ea-radio>
      </ea-radio-group>
      <ea-checkbox-group
        name="hobbies"
        label="兴趣爱好"
        required
        style="flex: 2;"
      >
        <ea-checkbox value="reading" label="阅读"></ea-checkbox>
        <ea-checkbox value="sports" label="运动"></ea-checkbox>
        <ea-checkbox value="music" label="音乐"></ea-checkbox>
        <ea-checkbox value="travel" label="旅行"></ea-checkbox>
      </ea-checkbox-group>
    </div>

    <div class="demo-form-row">
      <ea-slider
        name="satisfaction"
        label="满意度"
        min="0"
        max="100"
        value="80"
        show-input
        style="flex: 2;"
      ></ea-slider>
      <ea-rate
        name="serviceScore"
        label="服务评分"
        required
        value="0"
        style="flex: 1;"
      ></ea-rate>
    </div>

    <div class="demo-form-row">
      <ea-color-picker
        name="themeColor"
        label="主题颜色"
        required
        value="#409EFF"
        style="flex: 1;"
      ></ea-color-picker>
      <ea-switch
        name="agreement"
        label="同意用户协议"
        required
        style="flex: 1;"
      ></ea-switch>
    </div>

    <div class="demo-section-title">技能选择</div>
    <div class="demo-form-row">
      <ea-transfer
        id="complexTransfer"
        name="selectedSkills"
        label="技能选择"
        required
        style="width: 100%"
      ></ea-transfer>
    </div>

    <div class="demo-button-group">
      <ea-button type="primary" button-type="submit">提交</ea-button>
      <ea-button button-type="reset">重置</ea-button>
    </div>
  </form>
  <div class="demo-output" id="complexOutput"></div>
</div>
```

```css
.demo-form-page {
  max-width: 1200px;
  margin: 0 auto;
}

.demo-card {
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.demo-card-title {
  font-size: 1.5rem;
  color: #303133;
  margin: 0 0 1.5rem 0;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e4e7ed;
}

.demo-section-title {
  font-size: 1.1rem;
  color: #606266;
  margin: 1.5rem 0 1rem 0;
  padding-left: 0.75rem;
  border-left: 4px solid #409eff;
}

.demo-form {
  padding: 1.5rem;
  border-radius: 8px;
  margin: 1rem 0;
}

.demo-form-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  align-items: flex-start;
}

.demo-form-row > * {
  flex: 1;
  min-width: 200px;
}

.demo-button-group {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e4e7ed;
}

.demo-output {
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e7ed 100%);
  padding: 1.25rem;
  border-radius: 8px;
  margin-top: 1.5rem;
  font-family: "Consolas", "Monaco", monospace;
  font-size: 14px;
  white-space: pre-wrap;
  border-left: 4px solid #409eff;
  color: #303133;
}

.component-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.component-card {
  padding: 1.25rem;
  border-radius: 8px;
}

.component-card h4 {
  margin: 0 0 1rem 0;
  color: #606266;
  font-size: 0.95rem;
}

.component-card .demo-button-group {
  margin-top: 1rem;
  padding-top: 0;
  border: none;
}
```

```js
const complexForm = {
  form: document.getElementById("complexForm"),
  output: document.getElementById("complexOutput"),

  init() {
    this.form.addEventListener("submit", e => {
      e.preventDefault();
      const formData = new FormData(this.form);
      const data = Object.fromEntries(formData.entries());
      this.output.textContent = "表单数据：\n" + JSON.stringify(data, null, 2);
    });
  },
};
complexForm.init();

// 初始化穿梭框数据
const complexTransfer = document.getElementById("complexTransfer");
complexTransfer.data = [
  { key: 1, label: "JavaScript" },
  { key: 2, label: "Python" },
  { key: 3, label: "Java" },
  { key: 4, label: "C++" },
  { key: 5, label: "Go" },
  { key: 6, label: "Rust" },
  { key: 7, label: "TypeScript" },
  { key: 8, label: "Vue" },
];
```

:::

::::

## 各组件验证示例

以下是各表单组件的单独验证示例，展示不同组件的验证用法。

### 输入框验证

<div class="demo">
  <div class="component-card">
    <h4>输入框验证</h4>
    <form id="inputForm">
      <ea-input
        name="username"
        label="用户名"
        required
        minlength="3"
        maxlength="10"
        placeholder="至少3个字符"
        style="width: 100%"
      ></ea-input>
      <div class="demo-button-group" style="margin-top: 1rem; padding-top: 0; border: none;">
        <ea-button type="primary" button-type="submit" size="small">提交</ea-button>
      </div>
    </form>
  </div>
</div>

:::: details 查看代码

::: code-group

```html
<div class="component-card">
  <h4>输入框验证</h4>
  <form id="inputForm">
    <ea-input
      name="username"
      label="用户名"
      required
      minlength="3"
      maxlength="10"
      placeholder="至少3个字符"
      style="width: 100%"
    ></ea-input>
    <div
      class="demo-button-group"
      style="margin-top: 1rem; padding-top: 0; border: none;"
    >
      <ea-button type="primary" button-type="submit" size="small"
        >提交</ea-button
      >
    </div>
  </form>
</div>
```

```js
const inputForm = document.getElementById("inputForm");
inputForm.addEventListener("submit", e => {
  e.preventDefault();
  alert("输入框 验证通过！");
});
```

:::

::::

### 数字输入验证

<div class="demo">
  <div class="component-card">
    <h4>数字输入验证</h4>
    <form id="inputNumberForm">
      <ea-input-number
        name="age"
        label="年龄"
        required
        min="18"
        max="60"
        placeholder="18-60"
        style="width: 100%"
      ></ea-input-number>
      <div class="demo-button-group" style="margin-top: 1rem; padding-top: 0; border: none;">
        <ea-button type="primary" button-type="submit" size="small">提交</ea-button>
      </div>
    </form>
  </div>
</div>

:::: details 查看代码

::: code-group

```html
<div class="component-card">
  <h4>数字输入验证</h4>
  <form id="inputNumberForm">
    <ea-input-number
      name="age"
      label="年龄"
      required
      min="18"
      max="60"
      placeholder="18-60"
      style="width: 100%"
    ></ea-input-number>
    <div
      class="demo-button-group"
      style="margin-top: 1rem; padding-top: 0; border: none;"
    >
      <ea-button type="primary" button-type="submit" size="small"
        >提交</ea-button
      >
    </div>
  </form>
</div>
```

```js
const inputNumberForm = document.getElementById("inputNumberForm");
inputNumberForm.addEventListener("submit", e => {
  e.preventDefault();
  alert("数字输入 验证通过！");
});
```

:::

::::

### 选择器验证

<div class="demo">
  <div class="component-card">
    <h4>选择器验证</h4>
    <form id="selectForm">
      <ea-select
        name="city"
        label="城市"
        required
        placeholder="请选择"
        style="width: 100%"
      >
        <ea-option value="beijing">北京</ea-option>
        <ea-option value="shanghai">上海</ea-option>
        <ea-option value="guangzhou">广州</ea-option>
      </ea-select>
      <div class="demo-button-group" style="margin-top: 1rem; padding-top: 0; border: none;">
        <ea-button type="primary" button-type="submit" size="small">提交</ea-button>
      </div>
    </form>
  </div>
</div>

:::: details 查看代码

::: code-group

```html
<div class="component-card">
  <h4>选择器验证</h4>
  <form id="selectForm">
    <ea-select
      name="city"
      label="城市"
      required
      placeholder="请选择"
      style="width: 100%"
    >
      <ea-option value="beijing">北京</ea-option>
      <ea-option value="shanghai">上海</ea-option>
      <ea-option value="guangzhou">广州</ea-option>
    </ea-select>
    <div
      class="demo-button-group"
      style="margin-top: 1rem; padding-top: 0; border: none;"
    >
      <ea-button type="primary" button-type="submit" size="small"
        >提交</ea-button
      >
    </div>
  </form>
</div>
```

```js
const selectForm = document.getElementById("selectForm");
selectForm.addEventListener("submit", e => {
  e.preventDefault();
  alert("选择器 验证通过！");
});
```

:::

::::

### 日期/时间选择器验证

<div class="demo">
  <div class="component-card">
    <h4>日期选择验证</h4>
    <form id="datePickerForm">
      <ea-date-picker
        name="birthDate"
        label="出生日期"
        required
        placeholder="选择日期"
        style="width: 100%"
      ></ea-date-picker>
      <div class="demo-button-group" style="margin-top: 1rem; padding-top: 0; border: none;">
        <ea-button type="primary" button-type="submit" size="small">提交</ea-button>
      </div>
    </form>
  </div>
</div>

<div class="demo">
  <div class="component-card">
    <h4>时间选择验证</h4>
    <form id="timePickerForm">
      <ea-time-picker
        name="time"
        label="时间"
        required
        placeholder="选择时间"
        style="width: 100%"
      ></ea-time-picker>
      <div class="demo-button-group" style="margin-top: 1rem; padding-top: 0; border: none;">
        <ea-button type="primary" button-type="submit" size="small">提交</ea-button>
      </div>
    </form>
  </div>
</div>

:::: details 查看代码

::: code-group

```html
<div class="component-card">
  <h4>日期选择验证</h4>
  <form id="datePickerForm">
    <ea-date-picker
      name="birthDate"
      label="出生日期"
      required
      placeholder="选择日期"
      style="width: 100%"
    ></ea-date-picker>
    <div
      class="demo-button-group"
      style="margin-top: 1rem; padding-top: 0; border: none;"
    >
      <ea-button type="primary" button-type="submit" size="small"
        >提交</ea-button
      >
    </div>
  </form>
</div>

<div class="component-card">
  <h4>时间选择验证</h4>
  <form id="timePickerForm">
    <ea-time-picker
      name="time"
      label="时间"
      required
      placeholder="选择时间"
      style="width: 100%"
    ></ea-time-picker>
    <div
      class="demo-button-group"
      style="margin-top: 1rem; padding-top: 0; border: none;"
    >
      <ea-button type="primary" button-type="submit" size="small"
        >提交</ea-button
      >
    </div>
  </form>
</div>
```

```js
const datePickerForm = document.getElementById("datePickerForm");
datePickerForm.addEventListener("submit", e => {
  e.preventDefault();
  alert("日期选择 验证通过！");
});

const timePickerForm = document.getElementById("timePickerForm");
timePickerForm.addEventListener("submit", e => {
  e.preventDefault();
  alert("时间选择 验证通过！");
});
```

:::

::::

### 单选/复选验证

<div class="demo">
  <div class="component-card">
    <h4>单选组验证</h4>
    <form id="radioForm">
      <ea-radio-group name="gender" label="性别" required>
        <ea-radio value="male" label="男"></ea-radio>
        <ea-radio value="female" label="女"></ea-radio>
      </ea-radio-group>
      <div class="demo-button-group" style="margin-top: 1rem; padding-top: 0; border: none;">
        <ea-button type="primary" button-type="submit" size="small">提交</ea-button>
      </div>
    </form>
  </div>
</div>

<div class="demo">
  <div class="component-card">
    <h4>复选组验证</h4>
    <form id="checkboxForm">
      <ea-checkbox-group name="hobbies" label="兴趣爱好" required>
        <ea-checkbox value="reading" label="阅读"></ea-checkbox>
        <ea-checkbox value="sports" label="运动"></ea-checkbox>
        <ea-checkbox value="music" label="音乐"></ea-checkbox>
      </ea-checkbox-group>
      <div class="demo-button-group" style="margin-top: 1rem; padding-top: 0; border: none;">
        <ea-button type="primary" button-type="submit" size="small">提交</ea-button>
      </div>
    </form>
  </div>
</div>

:::: details 查看代码

::: code-group

```html
<div class="component-card">
  <h4>单选组验证</h4>
  <form id="radioForm">
    <ea-radio-group name="gender" label="性别" required>
      <ea-radio value="male" label="男"></ea-radio>
      <ea-radio value="female" label="女"></ea-radio>
    </ea-radio-group>
    <div
      class="demo-button-group"
      style="margin-top: 1rem; padding-top: 0; border: none;"
    >
      <ea-button type="primary" button-type="submit" size="small"
        >提交</ea-button
      >
    </div>
  </form>
</div>

<div class="component-card">
  <h4>复选组验证</h4>
  <form id="checkboxForm">
    <ea-checkbox-group name="hobbies" label="兴趣爱好" required>
      <ea-checkbox value="reading" label="阅读"></ea-checkbox>
      <ea-checkbox value="sports" label="运动"></ea-checkbox>
      <ea-checkbox value="music" label="音乐"></ea-checkbox>
    </ea-checkbox-group>
    <div
      class="demo-button-group"
      style="margin-top: 1rem; padding-top: 0; border: none;"
    >
      <ea-button type="primary" button-type="submit" size="small"
        >提交</ea-button
      >
    </div>
  </form>
</div>
```

```js
const radioForm = document.getElementById("radioForm");
radioForm.addEventListener("submit", e => {
  e.preventDefault();
  alert("单选组 验证通过！");
});

const checkboxForm = document.getElementById("checkboxForm");
checkboxForm.addEventListener("submit", e => {
  e.preventDefault();
  alert("复选组 验证通过！");
});
```

:::

::::

### 评分组件验证

<div class="demo">
  <div class="component-card">
    <h4>评分验证</h4>
    <form id="rateForm">
      <ea-rate name="score" label="评分" required value="0"></ea-rate>
      <div class="demo-button-group" style="margin-top: 1rem; padding-top: 0; border: none;">
        <ea-button type="primary" button-type="submit" size="small">提交</ea-button>
      </div>
    </form>
  </div>
</div>

:::: details 查看代码

::: code-group

```html
<div class="component-card">
  <h4>评分验证</h4>
  <form id="rateForm">
    <ea-rate name="score" label="评分" required value="0"></ea-rate>
    <div
      class="demo-button-group"
      style="margin-top: 1rem; padding-top: 0; border: none;"
    >
      <ea-button type="primary" button-type="submit" size="small"
        >提交</ea-button
      >
    </div>
  </form>
</div>
```

```js
const rateForm = document.getElementById("rateForm");
rateForm.addEventListener("submit", e => {
  e.preventDefault();
  alert("评分 验证通过！");
});
```

:::

::::

### 开关组件验证

<div class="demo">
  <div class="component-card">
    <h4>开关验证</h4>
    <form id="switchForm">
      <ea-switch name="agreement" label="同意协议" required></ea-switch>
      <div class="demo-button-group" style="margin-top: 1rem; padding-top: 0; border: none;">
        <ea-button type="primary" button-type="submit" size="small">提交</ea-button>
      </div>
    </form>
  </div>
</div>

:::: details 查看代码

::: code-group

```html
<div class="component-card">
  <h4>开关验证</h4>
  <form id="switchForm">
    <ea-switch name="agreement" label="同意协议" required></ea-switch>
    <div
      class="demo-button-group"
      style="margin-top: 1rem; padding-top: 0; border: none;"
    >
      <ea-button type="primary" button-type="submit" size="small"
        >提交</ea-button
      >
    </div>
  </form>
</div>
```

```js
const switchForm = document.getElementById("switchForm");
switchForm.addEventListener("submit", e => {
  e.preventDefault();
  alert("开关 验证通过！");
});
```

:::

::::

### 颜色选择器验证

<div class="demo">
  <div class="component-card">
    <h4>颜色选择验证</h4>
    <form id="colorPickerForm">
      <ea-color-picker
        name="color"
        label="喜欢的颜色"
        required
        placeholder="选择颜色"
        style="width: 100%"
      ></ea-color-picker>
      <div class="demo-button-group" style="margin-top: 1rem; padding-top: 0; border: none;">
        <ea-button type="primary" button-type="submit" size="small">提交</ea-button>
      </div>
    </form>
  </div>
</div>

:::: details 查看代码

::: code-group

```html
<div class="component-card">
  <h4>颜色选择验证</h4>
  <form id="colorPickerForm">
    <ea-color-picker
      name="color"
      label="喜欢的颜色"
      required
      placeholder="选择颜色"
      style="width: 100%"
    ></ea-color-picker>
    <div
      class="demo-button-group"
      style="margin-top: 1rem; padding-top: 0; border: none;"
    >
      <ea-button type="primary" button-type="submit" size="small"
        >提交</ea-button
      >
    </div>
  </form>
</div>
```

```js
const colorPickerForm = document.getElementById("colorPickerForm");
colorPickerForm.addEventListener("submit", e => {
  e.preventDefault();
  alert("颜色选择 验证通过！");
});
```

:::

::::

### 滑块组件验证

<div class="demo">
  <div class="component-card">
    <h4>滑块验证</h4>
    <form id="sliderForm">
      <ea-slider
        name="satisfaction"
        label="满意度"
        required
        min="0"
        max="100"
        value="0"
        show-input
        style="width: 100%"
      ></ea-slider>
      <div class="demo-button-group" style="margin-top: 1rem; padding-top: 0; border: none;">
        <ea-button type="primary" button-type="submit" size="small">提交</ea-button>
      </div>
    </form>
  </div>
</div>

:::: details 查看代码

::: code-group

```html
<div class="component-card">
  <h4>滑块验证</h4>
  <form id="sliderForm">
    <ea-slider
      name="satisfaction"
      label="满意度"
      required
      min="0"
      max="100"
      value="0"
      show-input
      style="width: 100%"
    ></ea-slider>
    <div
      class="demo-button-group"
      style="margin-top: 1rem; padding-top: 0; border: none;"
    >
      <ea-button type="primary" button-type="submit" size="small"
        >提交</ea-button
      >
    </div>
  </form>
</div>
```

```js
const sliderForm = document.getElementById("sliderForm");
sliderForm.addEventListener("submit", e => {
  e.preventDefault();
  alert("滑块 验证通过！");
});
```

:::

::::

### 穿梭框验证

<div class="demo">
  <div class="component-card" style="max-width: 100%;">
    <h4>穿梭框验证</h4>
    <form id="transferForm">
      <ea-transfer
        id="transferValidate"
        name="selectedItems"
        required
        style="width: 100%"
      ></ea-transfer>
      <div class="demo-button-group" style="margin-top: 1rem; padding-top: 0; border: none;">
        <ea-button type="primary" button-type="submit" size="small">提交</ea-button>
      </div>
    </form>
  </div>
</div>

:::: details 查看代码

::: code-group

```html
<div class="component-card" style="max-width: 100%;">
  <h4>穿梭框验证</h4>
  <form id="transferForm">
    <ea-transfer
      id="transferValidate"
      name="selectedItems"
      required
      style="width: 100%"
    ></ea-transfer>
    <div
      class="demo-button-group"
      style="margin-top: 1rem; padding-top: 0; border: none;"
    >
      <ea-button type="primary" button-type="submit" size="small"
        >提交</ea-button
      >
    </div>
  </form>
</div>
```

```js
const transferForm = document.getElementById("transferForm");
transferForm.addEventListener("submit", e => {
  e.preventDefault();
  alert("穿梭框 验证通过！");
});

// 初始化穿梭框数据
const transferValidate = document.getElementById("transferValidate");
transferValidate.data = [
  { key: 1, label: "选项 1" },
  { key: 2, label: "选项 2" },
  { key: 3, label: "选项 3" },
  { key: 4, label: "选项 4" },
  { key: 5, label: "选项 5" },
];
```

:::

::::

### 同意协议场景（单选复选框）

<div class="demo">
  <div class="component-card" style="max-width: 100%;">
    <h4>单选复选框（同意协议场景）</h4>
    <form id="singleCheckboxForm">
      <ea-checkbox name="agreement" value="agreed" required>
        我已阅读并同意《用户协议》和《隐私政策》
      </ea-checkbox>
      <div class="demo-button-group" style="margin-top: 1rem; padding-top: 0; border: none;">
        <ea-button type="primary" button-type="submit" size="small">提交</ea-button>
      </div>
    </form>
  </div>
</div>

:::: details 查看代码

::: code-group

```html
<div class="component-card" style="max-width: 100%;">
  <h4>单选复选框（同意协议场景）</h4>
  <form id="singleCheckboxForm">
    <ea-checkbox name="agreement" value="agreed" required>
      我已阅读并同意《用户协议》和《隐私政策》
    </ea-checkbox>
    <div
      class="demo-button-group"
      style="margin-top: 1rem; padding-top: 0; border: none;"
    >
      <ea-button type="primary" button-type="submit" size="small"
        >提交</ea-button
      >
    </div>
  </form>
</div>
```

```js
const singleCheckboxForm = document.getElementById("singleCheckboxForm");
singleCheckboxForm.addEventListener("submit", e => {
  e.preventDefault();
  alert("单选复选框 验证通过！");
});
```

:::

::::

## 通用表单属性

以下属性适用于所有表单组件：

| 参数     | 说明       | 类型    | 可选值 | 默认值 |
| -------- | ---------- | ------- | ------ | ------ |
| name     | 表单字段名 | string  | —      | —      |
| label    | 标签文本   | string  | —      | —      |
| required | 是否必填   | boolean | —      | false  |
| disabled | 是否禁用   | boolean | —      | false  |

## 输入类组件验证属性

| 参数      | 说明         | 类型   | 可选值                           | 默认值 |
| --------- | ------------ | ------ | -------------------------------- | ------ |
| minlength | 最小长度     | number | —                                | —      |
| maxlength | 最大长度     | number | —                                | —      |
| min       | 最小值       | number | —                                | —      |
| max       | 最大值       | number | —                                | —      |
| type      | 输入类型     | string | text / email / password / number | text   |
| pattern   | 正则匹配模式 | string | —                                | —      |

## 表单组件方法

| 方法名            | 说明                   | 返回值  |
| ----------------- | ---------------------- | ------- |
| checkValidity     | 检查表单字段的有效性   | boolean |
| reportValidity    | 报告验证结果并显示提示 | boolean |
| setCustomValidity | 设置自定义验证消息     | —       |
