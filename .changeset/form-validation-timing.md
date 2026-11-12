---
"easy-component-ui": minor
---

表单组件的校验时机与错误样式改为显式契约：

- `EaFormAssociatedBase` 在 `$mounted()` / `$updated()` 自动重算并发布 validity，不再依赖 `checkValidity()` 手动触发；原生提交与 `ea-button type="submit"` 都会先经过约束校验
- 错误样式不再由 `:host(:invalid)` 驱动，改为 `:host([data-invalid])`：首屏与未交互前不展示错误，`input` / `change` / `focusout` / `invalid` 事件或 `reportValidity()` 之后才展示，`formResetCallback()` 后复位
- `ea-button type="submit"` 改用 `form.requestSubmit()` 提交，修复点击提交绕过浏览器校验的问题
- 校验气泡锚点优先指向组件内部可聚焦的原生控件，`ea-checkbox-group` / `ea-rate` / `ea-transfer` 的宿主补 `tabindex="-1"`，消除 `An invalid form control ... is not focusable`
- 新增 `data-invalid` 状态属性与“首屏不展示错误样式”测试
- 表单重置统一走基类 `$resetValidity()`：收起错误样式并按当前约束重算，不再用 `setValidity({})` 直接宣布合法；`ea-time-picker` / `ea-date-picker` 重置时同时收起已展开的面板
- `ea-time-picker` 清空 `value` 时内嵌输入框同步清空显示（不再残留旧时间）
- `ea-checkbox-group` 勾选后立即重算校验（不再滞后一拍），`value` 改为不可变更新
- 新增 `data-validate-trigger` 属性（`auto` 默认 / `submit` / `manual`）与 `markTouched()` / `resetTouched()` 方法，错误样式的触发时机不再写死在基类
- 新增 `data-error-display` 属性（`native` 默认 / `text`）：两种模式互斥，`native` 只用浏览器校验气泡，`text` 只在控件下方渲染文案、不弹气泡（`text` 模式不向 `ElementInternals` 发布失效状态，提交由基类在根节点捕获阶段自行拦截）
- 主题新增 `form-error-message` mixin（`packages/themes/src/styles/mixins.scss`），表单组件统一用 `@include form-error-message` 渲染文案；间距与字号走 `--spacing-sm` / `--font-size-sm`，颜色可用 `--ea-form-error-color` 定制（默认 `--red-500`）
- 上述两个 `data-*` 属性可写在 `<form>` 上统配：优先级为组件自身属性 > form 属性 > 默认值，form 属性动态变更会实时刷新
- 删除初版的 `error-display="auto"` 与组件侧 `$nativeBubbleSupported()` 声明钩子，默认行为不再靠猜测组件是否具备气泡能力
- 校验提示锚点改为取**可见**元素，不再指向 `display:none` 的隐藏控件；解析顺序为「`$validationAnchor()` 指定 > 验证目标自身（原生控件）> 目标内可见控件 > 目标自身 > 自身 shadow 内可见控件 > 可聚焦元素」，`setValidity()` / `setCustomValidity()` 与自动校验共用这套解析（此前直接锚到底层 target）
- 补齐 `ea-rate` / `ea-transfer` 的错误态样式（星星与面板边框变红），`ea-rate` 的 `data-invalid` 不再无视觉效果

BREAKING CHANGE: 覆盖 `:host(:invalid)` 自定义错误样式的消费者需要改为 `:host([data-invalid])`；
错误文案默认不再渲染（只保留浏览器气泡），需要文案的组件或表单要显式配 `data-error-display="text"`，且此时控件不再参与原生约束校验（`form.checkValidity()` 看不到它）；
配置属性名带 `data-` 前缀（`data-validate-trigger` / `data-error-display`）；
`resetCustomValidity()` / `formResetCallback()` 不再直接把字段置为合法，而是按当前约束重算；
子类覆盖 `formResetCallback()` 时应调用 `$resetValidity()`（或 `super.formResetCallback()`），直接 `setValidity({})` 会留下错误样式并抹掉 required。
