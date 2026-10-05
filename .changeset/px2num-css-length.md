---
"@easy-component-ui/core": patch
"easy-component-ui": patch
---

px2num 重构为 css-length：cssLengthToNumber 严格校验合法 CSS 长度值后解析为纯数字（非法输入返回 NaN），并新增互逆的 numberToCssLength；ea-progress、ea-notification、ea-message、ea-splitter、ea-color-picker 内部手写的 px 剥单位逻辑统一收口至该工具。
