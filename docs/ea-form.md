<script setup>
import { onMounted } from 'vue';

onMounted(async () => {
  // 动态导入样式文件
  await import('./index.scss');
  await import('../components/ea-icon/index.css');

  // 动态导入组件文件
  await import('../components/ea-icon/index.js');

  await import('../components/ea-form/index.js');
  await import('../components/ea-time-picker/index.js');
  await import('../components/ea-date-picker/index.js');
  await import('../components/ea-input/index.js');
  await import('../components/ea-select/index.js');
  await import('../components/ea-radio-group/index.js');
  await import('../components/ea-radio/index.js');
  await import('../components/ea-checkbox-group/index.js');
  await import('../components/ea-checkbox/index.js');
  await import('../components/ea-switch/index.js');
  await import('../components/ea-textarea/index.js');
  await import('../components/ea-button/ea-button.js');


    // ------- 1. 基本表单 -------
    // #region
    const basicForm = {
        form: document.querySelector('#basicForm'),
        btn: document.querySelector('#basicFormSubmitBtn'),

        init() {
            this.btn.addEventListener('click', () => {
                console.log(this.form.data);
            })
        }
    };
    basicForm.init();
    // #endregion
    // ------- end -------

    // ------- 2. 表单验证 -------
    // #region
    const validtorForm = {
        form: document.querySelector('#validtorForm'),
        btn: document.querySelector('#validtorFormSubmitBtn'),
        resetBtn: document.querySelector('#validtorFormResetBtn'),

        init() {
            this.form.rules = {
                name: { required: true, min: 2, max: 4 },
                gender: { required: true, trigger: 'change' },
                hobby: { required: true, trigger: 'change' },
                area: { required: true },
                arrivalDate: { required: true },
                arrivalTime: { required: true },
            };

            this.btn.addEventListener('click', () => {
                this.form.validate().then(res => {
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                })
            })

            this.resetBtn.addEventListener('click', () => {
                this.form.reset();
            })
        }
    };
    validtorForm.init();
    // #endregion
    // ------- end -------

    // ------- 3. 自定义验证 -------
    // #region
    const customValidtorForm = {
        form: document.querySelector('#customValidtorForm'),
        btn: document.querySelector('#customValidtorFormSubmitBtn'),
        resetBtn: document.querySelector('#customValidtorFormResetBtn'),

        init() {
            this.form.rules = {
                phone: { required: true, reg: /^1[3456789]\d{9}$/, trigger: 'change' },
                email: { required: true, reg: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, trigger: 'change' }
            };

            this.btn.addEventListener('click', () => {
                this.form.validate().then(res => {
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                })
            })

            this.resetBtn.addEventListener('click', () => {
                this.form.reset();
            })
        }
    };
    customValidtorForm.init();
    // #endregion
    // ------- end -------    
});
</script>

# Form 表单

由输入框、选择器、单选框、多选框等控件组成，用以收集、校验、提交数据

::: danger
进入页面后, 可能需要重新加载页面, 才能看到实际包含的所有效果. vitepress 的锅.
:::

## 典型表单

包括各种表单项，比如输入框、选择器、开关、单选框、多选框等。

> 表单返回的内容为一个 `Object`, 其中 `键名` 为表单项的 `name` 属性, `值` 为 `表单项的值`

<div class="demo">
    <ea-form id="basicForm">
        <ea-form-item label='姓名'>
            <div slot="invalid-text">请正确填写姓名, 长度为 2-4 个字符</div>
            <ea-input name="name" placeholder="姓名"></ea-input>
        </ea-form-item>
        <ea-form-item label='性别'>
            <div slot="invalid-text">请选择性别</div>
            <ea-radio-group name="gender">
                <ea-radio value="男">男</ea-radio>
                <ea-radio value="女">女</ea-radio>
            </ea-radio-group>
        </ea-form-item>
        <ea-form-item label='爱好'>
            <div slot="invalid-text">请至少选择一种爱好</div>
            <ea-checkbox-group name="hobby">
                <ea-checkbox value="吃饭">吃饭</ea-checkbox>
                <ea-checkbox value="睡觉">睡觉</ea-checkbox>
                <ea-checkbox value="编程">编程</ea-checkbox>
            </ea-checkbox-group>
        </ea-form-item>
        <ea-form-item label='宿舍'>
            <div slot="invalid-text">校区不能为空</div>
            <ea-switch name="dorm" inactive-color="#409eff" active-color="#13ce66" inactive-text="四人间"
                active-text="六人间">
            </ea-switch>
        </ea-form-item>
        <ea-form-item label='校区'>
            <div slot="invalid-text">校区不能为空</div>
            <ea-select name="area" placeholder="请选择校区">
                <ea-option value="A 校区">A 校区</ea-option>
                <ea-option value="B 校区">B 校区</ea-option>
            </ea-select>
        </ea-form-item>
        <ea-form-item label='到达日期'>
            <div slot="invalid-text">到达日期不能为空</div>
            <ea-date-picker name="arrivalDate" value="2024-10-1"></ea-date-picker>
        </ea-form-item>
        <ea-form-item label='到达时间'>
            <div slot="invalid-text">到达时间不能为空</div>
            <ea-time-picker name="arrivalTime" time="17:0:0" limit-range-start="9:0:0" limit-range-end="17:00:0">
            </ea-time-picker>
        </ea-form-item>
        <ea-form-item label='备注'>
            <div slot="invalid-text">到达时间不能为空</div>
            <ea-textarea name="remark" type="textarea" rows="2" placeholder="这不是空的"></ea-textarea>
        </ea-form-item>
        <ea-form-item>
            <ea-button id="basicFormSubmitBtn" type="primary">提交</ea-button>
        </ea-form-item>
    </ea-form>
</div>

::: details 示例代码

`html`

```html
<div class="demo">
  <ea-form id="basicForm">
    <ea-form-item label="姓名">
      <div slot="invalid-text">请正确填写姓名, 长度为 2-4 个字符</div>
      <ea-input name="name" placeholder="姓名" value="洛霖"></ea-input>
    </ea-form-item>
    <ea-form-item label="性别">
      <div slot="invalid-text">请选择性别</div>
      <ea-radio-group name="gender" value="男">
        <ea-radio value="男">男</ea-radio>
        <ea-radio value="女">女</ea-radio>
      </ea-radio-group>
    </ea-form-item>
    <ea-form-item label="爱好">
      <div slot="invalid-text">请至少选择一种爱好</div>
      <ea-checkbox-group name="hobby" value="吃饭">
        <ea-checkbox value="吃饭">吃饭</ea-checkbox>
        <ea-checkbox value="睡觉">睡觉</ea-checkbox>
        <ea-checkbox value="编程">编程</ea-checkbox>
      </ea-checkbox-group>
    </ea-form-item>
    <ea-form-item label="宿舍">
      <div slot="invalid-text">校区不能为空</div>
      <ea-switch
        name="dorm"
        inactive-color="#409eff"
        active-color="#13ce66"
        inactive-text="四人间"
        active-text="六人间"
      >
      </ea-switch>
    </ea-form-item>
    <ea-form-item label="校区">
      <div slot="invalid-text">校区不能为空</div>
      <ea-select name="area" placeholder="请选择校区" selection="A 校区">
        <ea-option value="A 校区">A 校区</ea-option>
        <ea-option value="B 校区">B 校区</ea-option>
      </ea-select>
    </ea-form-item>
    <ea-form-item label="到达日期">
      <div slot="invalid-text">到达日期不能为空</div>
      <ea-date-picker name="arrivalDate" value="2024-10-1"></ea-date-picker>
    </ea-form-item>
    <ea-form-item label="到达时间">
      <div slot="invalid-text">到达时间不能为空</div>
      <ea-time-picker
        name="arrivalTime"
        time="17:0:0"
        limit-range-start="9:0:0"
        limit-range-end="17:00:0"
      >
      </ea-time-picker>
    </ea-form-item>
    <ea-form-item label="备注">
      <div slot="invalid-text">到达时间不能为空</div>
      <ea-textarea
        name="remark"
        type="textarea"
        rows="2"
        placeholder="这不是空的"
      ></ea-textarea>
    </ea-form-item>
    <ea-form-item>
      <ea-button id="basicFormSubmitBtn" type="primary">提交</ea-button>
    </ea-form-item>
  </ea-form>
</div>
```

`js`

```js
const basicForm = {
  form: document.querySelector("#basicForm"),
  btn: document.querySelector("#basicFormSubmitBtn"),

  init() {
    this.btn.addEventListener("click", () => {
      console.log(this.form.data);
    });
  },
};
basicForm.init();
```

:::

## 表单验证

`Form` 组件提供了表单验证的功能，只需要通过 `rules` 属性传入约定的验证规则，并将 `Form-Item` 的 `name` 属性设置为需校验的字段名即可。

::: info

`form.rules` 属性需要传入一个对象，对象中包含 `name` 和 `rules` 两个属性，`name` 属性表示需要验证的字段名，对象中包含 `required` 、`min` 、`max` 和 `reg` 四个属性，分别表示是否必填、最小长度、最大长度、正则表达式。

:::

::: info

`form.validate()` 方法用于验证表单，返回一个 `Promise` 对象，可以通过 `.then()` 和 `.catch()` 方法分别处理验证成功和失败的情况。成功时返回一个数组，数组中包含该元素的 `name` 属性, 即未通过验证的元素的字段名。

:::

::: info
`form.reset()` 方法用于重置表单，重置表单时，会重置所有元素的值，并清除所有元素的验证状态。
:::

<div class="demo">
    <ea-form id="validtorForm">
        <ea-form-item label='姓名'>
            <div slot="invalid-text">请正确填写姓名, 长度为 2-4 个字符</div>
            <ea-input name="name" placeholder="姓名"></ea-input>
        </ea-form-item>
        <ea-form-item label='性别'>
            <div slot="invalid-text">请选择性别</div>
            <ea-radio-group name="gender">
                <ea-radio value="男">男</ea-radio>
                <ea-radio value="女">女</ea-radio>
            </ea-radio-group>
        </ea-form-item>
        <ea-form-item label='爱好'>
            <div slot="invalid-text">请至少选择一种爱好</div>
            <ea-checkbox-group name="hobby">
                <ea-checkbox value="吃饭">吃饭</ea-checkbox>
                <ea-checkbox value="睡觉">睡觉</ea-checkbox>
                <ea-checkbox value="编程">编程</ea-checkbox>
            </ea-checkbox-group>
        </ea-form-item>
        <ea-form-item label='宿舍'>
            <div slot="invalid-text">校区不能为空</div>
            <ea-switch name="dorm" inactive-color="#409eff" active-color="#13ce66" inactive-text="四人间"
                active-text="六人间">
            </ea-switch>
        </ea-form-item>
        <ea-form-item label='校区'>
            <div slot="invalid-text">校区不能为空</div>
            <ea-select name="area" placeholder="请选择校区">
                <ea-option value="A 校区">A 校区</ea-option>
                <ea-option value="B 校区">B 校区</ea-option>
            </ea-select>
        </ea-form-item>
        <ea-form-item label='到达日期'>
            <div slot="invalid-text">到达日期不能为空</div>
            <ea-date-picker name="arrivalDate" placeholder="到达日期"></ea-date-picker>
        </ea-form-item>
        <ea-form-item label='到达时间'>
            <div slot="invalid-text">到达时间不能为空</div>
            <ea-time-picker name="arrivalTime" time="17:0:0" limit-range-start="9:0:0" limit-range-end="17:00:0">
            </ea-time-picker>
        </ea-form-item>
        <ea-form-item label='备注'>
            <div slot="invalid-text">到达时间不能为空</div>
            <ea-textarea name="remark" type="textarea" rows="2" placeholder="这不是空的"></ea-textarea>
        </ea-form-item>
        <ea-form-item>
            <div style="display: flex; justify-content: space-between;">
                <ea-button id="validtorFormSubmitBtn" type="primary" style="margin-right: 1rem;">提交</ea-button>
                <ea-button id="validtorFormResetBtn">重置</ea-button>
            </div>
        </ea-form-item>
    </ea-form>
</div>

::: details 示例代码

`html`

```html
<div class="demo">
  <ea-form id="validtorForm">
    <ea-form-item label="姓名">
      <div slot="invalid-text">请正确填写姓名, 长度为 2-4 个字符</div>
      <ea-input name="name" placeholder="姓名"></ea-input>
    </ea-form-item>
    <ea-form-item label="手机号">
      <div slot="invalid-text">请正确填写手机号</div>
      <ea-input name="phone" placeholder="手机号"></ea-input>
    </ea-form-item>
    <ea-form-item label="性别">
      <div slot="invalid-text">请选择性别</div>
      <ea-radio-group name="gender">
        <ea-radio value="男">男</ea-radio>
        <ea-radio value="女">女</ea-radio>
      </ea-radio-group>
    </ea-form-item>
    <ea-form-item label="爱好">
      <div slot="invalid-text">请至少选择一种爱好</div>
      <ea-checkbox-group name="hobby">
        <ea-checkbox value="吃饭">吃饭</ea-checkbox>
        <ea-checkbox value="睡觉">睡觉</ea-checkbox>
        <ea-checkbox value="编程">编程</ea-checkbox>
      </ea-checkbox-group>
    </ea-form-item>
    <ea-form-item label="宿舍">
      <div slot="invalid-text">校区不能为空</div>
      <ea-switch
        name="dorm"
        inactive-color="#409eff"
        active-color="#13ce66"
        inactive-text="四人间"
        active-text="六人间"
      >
      </ea-switch>
    </ea-form-item>
    <ea-form-item label="校区">
      <div slot="invalid-text">校区不能为空</div>
      <ea-select name="area" placeholder="请选择校区">
        <ea-option value="A 校区">A 校区</ea-option>
        <ea-option value="B 校区">B 校区</ea-option>
      </ea-select>
    </ea-form-item>
    <ea-form-item label="到达日期">
      <div slot="invalid-text">到达日期不能为空</div>
      <ea-date-picker
        name="arrivalDate"
        placeholder="到达日期"
      ></ea-date-picker>
    </ea-form-item>
    <ea-form-item label="到达时间">
      <div slot="invalid-text">到达时间不能为空</div>
      <ea-time-picker
        name="arrivalTime"
        time="17:0:0"
        limit-range-start="9:0:0"
        limit-range-end="17:00:0"
      >
      </ea-time-picker>
    </ea-form-item>
    <ea-form-item label="备注">
      <div slot="invalid-text">到达时间不能为空</div>
      <ea-textarea
        name="remark"
        type="textarea"
        rows="2"
        placeholder="这不是空的"
      ></ea-textarea>
    </ea-form-item>
    <ea-form-item>
      <div style="display: flex; justify-content: space-between;">
        <ea-button
          id="validtorFormSubmitBtn"
          type="primary"
          style="margin-right: 1rem;"
          >提交</ea-button
        >
        <ea-button id="validtorFormResetBtn">重置</ea-button>
      </div>
    </ea-form-item>
  </ea-form>
</div>
```

`js`

```js
const validtorForm = {
  form: document.querySelector("#validtorForm"),
  btn: document.querySelector("#validtorFormSubmitBtn"),
  resetBtn: document.querySelector("#validtorFormResetBtn"),

  init() {
    this.form.rules = {
      name: { required: true, min: 2, max: 4 },
      phone: { required: true, reg: /^1[3456789]\d{9}$/ },
      gender: { required: true, trigger: "change" },
      hobby: { required: true, trigger: "change" },
      area: { required: true },
      arrivalDate: { required: true },
      arrivalTime: { required: true },
    };

    this.btn.addEventListener("click", () => {
      this.form
        .validate()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    });

    this.resetBtn.addEventListener("click", () => {
      this.form.reset();
    });
  },
};
validtorForm.init();
```

:::

## 自定义校验规则

这个例子中展示了如何使用自定义验证规则来完成密码的二次验证。

<div class="demo">
    <ea-form id="customValidtorForm">
        <ea-form-item label='手机号'>
            <div slot="invalid-text">请正确填写手机号</div>
            <ea-input name="phone" placeholder="手机号"></ea-input>
        </ea-form-item>
        <ea-form-item label='邮箱'>
            <div slot="invalid-text">请正确填写邮箱</div>
            <ea-input name="email" placeholder="邮箱"></ea-input>
        </ea-form-item>
        <ea-form-item>
            <div style="display: flex; justify-content: space-between;">
                <ea-button id="customValidtorFormSubmitBtn" type="primary" style="margin-right: 1rem;">提交</ea-button>
                <ea-button id="customValidtorFormResetBtn">重置</ea-button>
            </div>
        </ea-form-item>
    </ea-form>
</div>

::: details 示例代码

`html`

```html
<div class="demo">
  <ea-form id="customValidtorForm">
    <ea-form-item label="手机号">
      <div slot="invalid-text">请正确填写手机号</div>
      <ea-input name="phone" placeholder="手机号"></ea-input>
    </ea-form-item>
    <ea-form-item label="邮箱">
      <div slot="invalid-text">请正确填写邮箱</div>
      <ea-input name="email" placeholder="邮箱"></ea-input>
    </ea-form-item>
    <ea-form-item>
      <div style="display: flex; justify-content: space-between;">
        <ea-button
          id="customValidtorFormSubmitBtn"
          type="primary"
          style="margin-right: 1rem;"
          >提交</ea-button
        >
        <ea-button id="customValidtorFormResetBtn">重置</ea-button>
      </div>
    </ea-form-item>
  </ea-form>
</div>
```

`js`

```js
const customValidtorForm = {
  form: document.querySelector("#customValidtorForm"),
  btn: document.querySelector("#customValidtorFormSubmitBtn"),
  resetBtn: document.querySelector("#customValidtorFormResetBtn"),

  init() {
    this.form.rules = {
      phone: { required: true, reg: /^1[3456789]\d{9}$/, trigger: "change" },
      email: {
        required: true,
        reg: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
        trigger: "change",
      },
    };

    this.btn.addEventListener("click", () => {
      this.form
        .validate()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    });

    this.resetBtn.addEventListener("click", () => {
      this.form.reset();
    });
  },
};
customValidtorForm.init();
```

:::

## Form Attributes

| 参数  | 说明     | 类型   | 可选值 | 默认值 |
| ----- | -------- | ------ | ------ | ------ |
| rules | 校验规则 | object | -      | -      |

## Form Methods

| 方法     | 说明     | 参数 | 返回值  |
| -------- | -------- | ---- | ------- |
| validate | 校验表单 | -    | Promise |
| reset    | 重置表单 | -    | -       |

## Form-Item Attributes

| 参数  | 说明 | 类型   | 可选值 | 默认值 |
| ----- | ---- | ------ | ------ | ------ |
| label | 标签 | string | -      | -      |

## Form-Item Slots

| 名称         | 说明               |
| ------------ | ------------------ |
| -            | 表单组件           |
| label        | 表单组件左侧的标签 |
| invalid-text | 校验失败的提示信息 |
