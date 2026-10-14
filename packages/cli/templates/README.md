# 组件模板维护

`ea add` 的默认模板。修改此处文件即定制生成结果；也可经 `ea init --templates` 落盘后只覆盖个别文件，其余回落内置。

## 文件 → 产物

| 模板                    | 渲染为             | 用途                                           |
| ----------------------- | ------------------ | ---------------------------------------------- |
| `component.ts.tpl`      | `index.ts`         | 组件骨架，主/附属通用（尾部出口段按 cut 裁剪） |
| `entry.ts.tpl`          | `index.ts`         | 复合主出口薄壳（`--with` 时用）                |
| `component.scss.tpl`    | `index.scss`       | 样式骨架（SCSS 变量 + BEM mixin）              |
| `component.test.ts.tpl` | `<标签名>.test.ts` | Vitest 用例骨架                                |

## 占位符（token）

渲染即对下列 token 做纯字符串替换。`___` 定界，模板内 JS `${...}` 与 SCSS `$var` 不受影响。示例取 `prefix=ea`、组件 `button`。

| Token                 | 含义                           | 出现         | 示例                      |
| --------------------- | ------------------------------ | ------------ | ------------------------- |
| `___TAG_NAME___`      | 完整标签名                     | 全部         | `ea-button`               |
| `___CLASS_NAME___`    | 完整类名                       | 全部         | `EaButton`                |
| `___SUMMARY___`       | `@summary` 文案（`--summary`） | component.ts | 按钮                      |
| `___VERSION___`       | `@since` 版本（自动探测）      | component.ts | `4.0.6`                   |
| `___NAME___`          | 裸 kebab 名                    | 按需         | `button`                  |
| `___NAME_PASCAL___`   | 裸 Pascal 名                   | 按需         | `Button`                  |
| `___PREFIX___`        | 小写前缀                       | 按需         | `ea`                      |
| `___PREFIX_PASCAL___` | Pascal 前缀                    | 按需         | `Ea`                      |
| `___SUB_IMPORTS___`   | 附属组件 import 块             | entry        | 每附属一行                |
| `___EXPORT_LIST___`   | 出口类名列表                   | entry        | `EaButton, EaButtonGroup` |

- token 值为空且独占整行时删除该行（如单组件不生成 `___SUB_IMPORTS___`）。
- scss 首行 `$name:` 的 `$name` 是 SCSS 变量（块名），非占位符。

## cut 标记

`component.ts.tpl` 中 `// @ea-tpl:cut` 为哨兵标记, 请勿删除：

- 单组件：全文渲染，保留 cut 后的 `export default`。
- 附属 / 复合主实现：截断到 cut 前，保留 TagNameMap 自声明、丢弃值导出。

## @since 版本

`___VERSION___` 自动填写：自目标目录向上寻找最近的含 `version` 的 `package.json`；若为查找到, 则写 `unknown` 并警告。

## prefix ( ea.config.json - prefix )

`___TAG_NAME___` / `___CLASS_NAME___` 已是含前缀终态，模板不感知具体前缀：换 `prefix: abc` 即生成 `abc-button` / `AbcButton`。
