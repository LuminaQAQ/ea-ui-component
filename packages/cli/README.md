# @easy-component-ui/cli

easy-component-ui 组件库工程 CLI。

## 安装

```bash
pnpm add -D @easy-component-ui/cli
```

## 命令

```bash
ea create my-lib --prefix my   # 创建单包组件库项目
ea add my-widget               # 生成组件
ea check                       # 校验组件目录规范
ea sync                        # 重建聚合入口
```

`ea create` 生成可直接运行的单包项目模板；其余命令在项目根目录（含 `ea.config.json`）执行。
