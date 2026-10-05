---
"@easy-component-ui/core": patch
"easy-component-ui": patch
---

parseTime 工具从 core 迁移至 components（ea-countdown 内部引用同步调整）：core 移除 dayjs 运行时依赖，components 复用既有 dayjs 依赖。组件公开 API 无变化。
