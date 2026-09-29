# Changesets

本仓库使用 [Changesets](https://github.com/changesets/changesets) 管理版本与 CHANGELOG。

## 日常使用

```bash
# 1. 记录一次变更（交互式选择受影响的包与 bump 类型）
pnpm changeset

# 2. 发布准备：消耗 .changeset 下的变更文件，更新各包版本并生成 CHANGELOG
pnpm changeset:version

# 3. 提交版本变更后打 tag，推送触发 CI 发布
git tag vX.Y.Z
git push --tags
```

## 版本策略

- `@easy-component-ui/core`、`@easy-component-ui/themes`、`easy-component-ui` 配置在 `fixed` 组中，始终同版本号（lockstep）
- `ea-ui-mcp-server` 不在 fixed 组，独立版本演进
- 后续新增的 CLI 等子包可按需加入 fixed 组或保持独立
