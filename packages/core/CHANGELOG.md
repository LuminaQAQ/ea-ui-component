# @easy-component-ui/core

## 4.0.7

### Patch Changes

- b704cfc: parseTime 工具从 core 迁移至 components（ea-countdown 内部引用同步调整）：core 移除 dayjs 运行时依赖，components 复用既有 dayjs 依赖。组件公开 API 无变化。
- b704cfc: px2num 重构为 css-length：cssLengthToNumber 严格校验合法 CSS 长度值后解析为纯数字（非法输入返回 NaN），并新增互逆的 numberToCssLength；ea-progress、ea-notification、ea-message、ea-splitter、ea-color-picker 内部手写的 px 剥单位逻辑统一收口至该工具。
- @easy-component-ui/themes@4.0.7

## 4.0.6

### Patch Changes

- 工程结构重构为 pnpm monorepo，新增 @easy-component-ui/core 框架内核包与 @easy-component-ui/themes 独立主题包；主包 easy-component-ui 的 API、子路径 exports 与产物结构保持完全兼容。
- @easy-component-ui/themes@4.0.6
