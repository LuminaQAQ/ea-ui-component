# 组件模板维护

`ea add` 的默认组件模板位于 `component/` 子目录。修改其中的 `*.tpl` 即定制生成结果；也可经 `ea init --templates` 只覆盖个别文件。

> `project/` 是 `ea create` 使用的**真实单包项目模板**（不做 token 渲染，复制后仅改写 name/prefix）。

## 文件 → 产物

| 模板                             | 渲染为             | 用途                                                                                                                              |
| -------------------------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| `component/component.ts.tpl`     | `index.ts`         | 组件骨架，主/附属通用（值导出 `___EXPORT_DEFAULT___`、私有组件注册 `___INTERNAL_DEPS___`、`@dependency` 文档 `___DEPENDENCY___`） |
| `component/entry.ts.tpl`         | `index.ts`         | 复合主出口薄壳（`--with` 时用）                                                                                                   |
| `component/component.scss.tpl`   | `index.scss`       | 样式骨架（SCSS 变量 + BEM mixin）                                                                                                 |
| `component/component.test.ts.tpl` | `<标签名>.test.ts` | Vitest 用例骨架                                                                                                                   |

- 项目自定义模板需保持同样的 `component/` 子路径，如 `my-tpl/component/component.ts.tpl`；`ea init --templates` 亦按该结构 eject。

## 占位符（token）

渲染即对下列 token 做纯字符串替换。`___` 定界，模板内 JS `${...}` 与 SCSS `$var` 不受影响。示例取 `prefix=ea`、组件 `button`。

| Token                  | 含义                           | 出现         | 示例                                            |
| ---------------------- | ------------------------------ | ------------ | ----------------------------------------------- |
| `___TAG_NAME___`       | 完整标签名                     | 全部         | `ea-button`                                     |
| `___CLASS_NAME___`     | 完整类名                       | 全部         | `EaButton`                                      |
| `___SUMMARY___`        | `@summary` 文案（`--summary`） | component.ts | 按钮                                            |
| `___VERSION___`        | `@since` 版本（自动探测）      | component.ts | `4.0.6`                                         |
| `___NAME___`           | 裸 kebab 名                    | 按需         | `button`                                        |
| `___NAME_PASCAL___`    | 裸 Pascal 名                   | 按需         | `Button`                                        |
| `___PREFIX___`         | 小写前缀                       | 按需         | `ea`                                            |
| `___PREFIX_PASCAL___`  | Pascal 前缀                    | 按需         | `Ea`                                            |
| `___SUB_IMPORTS___`    | 附属组件 import 块             | entry        | 每附属一行                                      |
| `___EXPORT_LIST___`    | 出口类名列表                   | entry        | `EaButton, EaButtonGroup`                       |
| `___EXPORT_DEFAULT___` | 单组件值导出段                 | component.ts | `export default EaButton;`                      |
| `___INTERNAL_DEPS___`  | 私有组件副作用注册路径         | component.ts | 每私有组件一行 `import "./components/x/index";` |
| `___DEPENDENCY___`     | 私有组件 `@dependency` 文档块  | component.ts | ` * @dependency ea-x-item`                      |

- token 值为空且独占整行时删除该行（如单组件不生成 `___SUB_IMPORTS___`）。
- scss 首行 `$name:` 的 `$name` 是 SCSS 变量（块名），非占位符。

## 值导出与 cut 标记

- 内置 `component/component.ts.tpl` 用 `___EXPORT_DEFAULT___` token 控制值导出：单组件填 `export default <类名>;`，附属 / 复合主实现留空即整行省略，仅保留 `declare global` 自声明。
- 兼容机制：模板若使用 `// @ea-tpl:cut` 哨兵行，截断渲染（附属 / 复合主实现）会丢弃该行及其后的值导出段，全文渲染（单组件）仅剥离该注释行。自定义模板可二选一。

## 公共子元素与私有组件（`--with` / `--parts`）

- 公共子元素：`--with` 生成，进入聚合出口。
- 私有组件：`--parts` 生成，不进公开出口；由主实现副作用 `import "./components/<子标签名>/index";` 注册，并在 JSDoc 追加 `@dependency <子标签名>`。
- 两者可混用：主实现位于 `components/<主标签名>/index.ts`，负责私有组件的注册。

## 依赖 import 写法

| 用法                                 | 写法                                                                                                    |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| 仅在模板渲染 `<ea-x>`                | 副作用 `import "./components/x/index";`                                                                 |
| 需要元素类型                         | 副作用 import 加 `import type { EaX } from "./components/x/index";`                                     |
| 需要把类当值（`new` / `instanceof`） | 值 `import { EaX } from "./components/x/index";`                                                        |
| 只需要事件类或类型                   | `import type { EaXSomeEvent } from "./.../events";` 或值 `import { EaXSomeEvent } from "./.../events";` |

- 私有组件骨架只生成副作用注册 import 与 `@dependency` 行，不生成 `import type`。
- 跨组件依赖走 `import "@components/<tag>/index";`，私有组件走 `import "./components/<tag>/index";`。

## @since 版本

`___VERSION___` 自动填写：自目标目录向上寻找最近的含 `version` 的 `package.json`；若为查找到, 则写 `unknown` 并警告。

## prefix ( ea.config.json - prefix )

`___TAG_NAME___` / `___CLASS_NAME___` 已是含前缀终态。如：配置 `prefix: abc` 即生成 `abc-button` / `AbcButton`。
