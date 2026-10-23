# easy-component-ui

## 4.0.8

### Patch Changes

- 修复无浏览器环境下的运行问题：core 新增 env 兼容层，themes 主题控制器适配无 DOM 环境，components 全局变量挂载改用 globalThis。
- Updated dependencies
  - @easy-component-ui/core@4.0.8
  - @easy-component-ui/themes@4.0.8

## 4.0.7

### Patch Changes

- b704cfc: parseTime 工具从 core 迁移至 components（ea-countdown 内部引用同步调整）：core 移除 dayjs 运行时依赖，components 复用既有 dayjs 依赖。组件公开 API 无变化。
- b704cfc: px2num 重构为 css-length：cssLengthToNumber 严格校验合法 CSS 长度值后解析为纯数字（非法输入返回 NaN），并新增互逆的 numberToCssLength；ea-progress、ea-notification、ea-message、ea-splitter、ea-color-picker 内部手写的 px 剥单位逻辑统一收口至该工具。
- Updated dependencies [b704cfc]
- Updated dependencies [b704cfc]
  - @easy-component-ui/core@4.0.7
  - @easy-component-ui/themes@4.0.7

## 4.0.6

### Patch Changes

- Updated dependencies
  - @easy-component-ui/core@4.0.6
  - @easy-component-ui/themes@4.0.6
