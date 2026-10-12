import fs from "node:fs";
import path from "node:path";

export interface IgnoreEntry {
  /** 组件名 */
  name: string;
  /** 豁免的规则名；缺省或空数组表示豁免全部规则 */
  rules?: string[];
  /** 豁免原因 */
  reason?: string;
}

/** 组件目录条目：字符串（公开组件目录）或对象（internal 标记内部组件目录） */
export type ComponentDirConfig = string | { path: string; internal?: boolean };

/** ea.config.json 的 JSON 书写形态（相对路径基于 config 所在目录解析） */
export interface EaConfig {
  project: {
    /** 组件命名空间前缀；未配置时组件名校验退化为纯 WC 全名格式，ea add 前置报错 */
    prefix?: string;
    /** 组件目录清单；单字符串为单目录简写 */
    componentDirs: string | ComponentDirConfig[];
    /** 共享测试区目录 */
    testDir: string;
    /** 聚合出口文件路径（由 CLI 生成维护的 barrel 文件） */
    entry: string;
  };
  /** 组件模板来源 */
  templates?: string;
  check: {
    /** 共享测试区根目录的组件测试白名单（基类/特殊测试） */
    rootTestWhitelist: string[];
    ignore: IgnoreEntry[];
  };
}

/** 解析后的组件目录：绝对路径 + internal 布尔化 */
export interface ResolvedComponentDir {
  path: string;
  internal: boolean;
}

/** loadConfig 产物：路径全部解析为绝对路径、componentDirs 展开为数组，供下游直接消费 */
export interface ResolvedEaConfig extends Omit<EaConfig, "project"> {
  project: {
    prefix?: string;
    componentDirs: ResolvedComponentDir[];
    testDir: string;
    entry: string;
  };
}

/** prefix 本身格式：单段小写字母开头 */
const PREFIX_RE = /^[a-z][a-z0-9]*$/;

/** 路径未配置时打印的注释版最小 config 骨架（单包与 monorepo 两种形态示例） */
const CONFIG_SKELETON = `\
// ea.config.json 最小骨架（注释仅供阅读，保存时请移除注释）
{
  "project": {
    // 可选：组件命名空间前缀，如 "ea"
    // "prefix": "ea",
    "componentDirs": "src/components",
    "testDir": "src/test",
    "entry": "src/components/index.ts"
  },
  "check": { "rootTestWhitelist": [], "ignore": [] }
}
// componentDirs 扩展写法：单字符串简写等价单元素数组；数组元素可为字符串
// （公开组件目录，进聚合出口、生成独立 exports）或对象 { "path": "...", "internal": true }
// （内部组件目录，不进聚合出口、不生成独立 exports）。monorepo 多包示例：
//   "componentDirs": [
//     "packages/components/src/components",
//     { "path": "packages/components/src/common", "internal": true }
//   ]
`;

/**
 * 加载 ea.config.json（相对路径基于 cwd 解析）。
 * componentDirs/testDir/entry 未配置时报错并打印最小骨架；
 * componentDirs 单字符串简写归一化为数组；prefix 配置时校验格式；不内置任何默认路径。
 */
export function loadConfig(cwd = process.cwd()): ResolvedEaConfig {
  const file = path.join(cwd, "ea.config.json");
  const raw = fs.existsSync(file)
    ? (JSON.parse(fs.readFileSync(file, "utf8")) as Partial<EaConfig>)
    : {};

  const project: Partial<EaConfig["project"]> = raw.project ?? {};
  const missing: string[] = [];
  const rawDirs = project.componentDirs;
  if (!rawDirs || (Array.isArray(rawDirs) && rawDirs.length === 0)) {
    missing.push("project.componentDirs");
  }
  if (!project.testDir) missing.push("project.testDir");
  if (!project.entry) missing.push("project.entry");
  if (missing.length > 0) {
    throw new Error(
      `ea.config.json 缺少必配路径：${missing.join("、")}\n\n${CONFIG_SKELETON}`
    );
  }

  if (project.prefix !== undefined && !PREFIX_RE.test(project.prefix)) {
    throw new Error(
      `ea.config.json project.prefix "${project.prefix}" 不合法（须匹配 ^[a-z][a-z0-9]*$，如 "ea"）`
    );
  }

  const dirs = (
    typeof rawDirs === "string" ? [rawDirs] : rawDirs
  ) as ComponentDirConfig[];

  return {
    project: {
      prefix: project.prefix,
      componentDirs: dirs.map(d =>
        typeof d === "string"
          ? { path: path.resolve(cwd, d), internal: false }
          : { path: path.resolve(cwd, d.path), internal: !!d.internal }
      ),
      testDir: path.resolve(cwd, project.testDir!),
      entry: path.resolve(cwd, project.entry!),
    },
    templates: raw.templates,
    check: {
      rootTestWhitelist: raw.check?.rootTestWhitelist ?? [],
      ignore: raw.check?.ignore ?? [],
    },
  };
}
