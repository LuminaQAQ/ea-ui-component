import fs from "node:fs";
import path from "node:path";

export interface IgnoreEntry {
  /** 组件名 */
  name: string;
  /** 豁免的规则名；缺省或空数组表示豁免全部规则 */
  rules?: string[];
  /** 豁免原因（强制标注，便于复查清理） */
  reason?: string;
}

/** 公开组件目录（字符串，进聚合、生成独立 exports）或内部组件目录（internal: true，不进聚合） */
export type ComponentDirConfig = string | { path: string; internal?: boolean };

export interface EaConfig {
  project: {
    /** 组件命名空间前缀；未配置时 check R4 退化为纯 WC 格式校验，ea add 前置报错 */
    prefix?: string;
    /**
     * 组件目录清单。config 原始书写支持单字符串简写（单包正统目录，等价单元素数组），
     * loadConfig 归一化为数组后供下游消费
     */
    componentsDirs: ComponentDirConfig[];
    testDir: string;
    aggregateEntry: {
      path: string;
    };
  };
  /** 组件模板来源 */
  templates?: string;
  check: {
    /** 共享测试区根目录的组件测试白名单（基类/特殊测试） */
    rootTestWhitelist: string[];
    ignore: IgnoreEntry[];
  };
}

/** ea.config.json 原始形态（componentsDirs 允许单字符串简写，归一化前） */
type RawEaConfig = Omit<Partial<EaConfig>, "project"> & {
  project?: Partial<Omit<EaConfig["project"], "componentsDirs">> & {
    componentsDirs?: string | ComponentDirConfig[];
  };
};

/** prefix 本身格式：单段小写字母开头 */
const PREFIX_RE = /^[a-z][a-z0-9]*$/;

/** 路径未配置时打印的注释版最小 config 骨架（单包最简形态在前，monorepo 扩展写法注释跟进） */
const CONFIG_SKELETON = `\
// ea.config.json 最小骨架（注释仅供阅读，保存时请移除注释）
{
  "project": {
    // 可选：组件命名空间前缀，如 "ea"
    // "prefix": "ea",
    "componentsDirs": "src/components",
    "testDir": "src/test",
    "aggregateEntry": { "path": "src/components/index.ts" }
  },
  "check": { "rootTestWhitelist": [], "ignore": [] }
}
// componentsDirs 扩展写法：单字符串简写等价单元素数组；数组元素可为字符串
// （正统组件目录，进聚合、生成独立 exports）或对象 { "path": "...", "internal": true }
// （内部组件目录，不进聚合、不生成独立 exports）。monorepo 多包示例：
//   "componentsDirs": [
//     "packages/components/src/components",
//     { "path": "packages/components/src/common", "internal": true }
//   ]
`;

/**
 * 加载 ea.config.json（相对路径基于 cwd 解析）。
 * 路径字段（componentsDirs/testDir/aggregateEntry.path）未配置时报错并打印最小骨架；
 * componentsDirs 支持单字符串简写（归一化为数组）；prefix 可选，配置时校验格式；
 * 不内置任何本仓库路径默认值（三方项目零假设）。
 */
export function loadConfig(cwd = process.cwd()): EaConfig {
  const file = path.join(cwd, "ea.config.json");
  const raw = fs.existsSync(file)
    ? (JSON.parse(fs.readFileSync(file, "utf8")) as RawEaConfig)
    : {};

  const project: RawEaConfig["project"] = raw.project ?? {};
  const missing: string[] = [];
  if (
    !project.componentsDirs ||
    (Array.isArray(project.componentsDirs) &&
      project.componentsDirs.length === 0)
  ) {
    missing.push("project.componentsDirs");
  }
  if (!project.testDir) missing.push("project.testDir");
  if (!project.aggregateEntry?.path)
    missing.push("project.aggregateEntry.path");
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

  const rawDirs = project.componentsDirs!;
  const dirs = (
    typeof rawDirs === "string" ? [rawDirs] : rawDirs
  ) as ComponentDirConfig[];

  return {
    project: {
      prefix: project.prefix,
      componentsDirs: dirs.map(d =>
        typeof d === "string"
          ? path.resolve(cwd, d)
          : { path: path.resolve(cwd, d.path), internal: !!d.internal }
      ),
      testDir: path.resolve(cwd, project.testDir!),
      aggregateEntry: {
        path: path.resolve(cwd, project.aggregateEntry!.path!),
      },
    },
    templates: raw.templates,
    check: {
      rootTestWhitelist: raw.check?.rootTestWhitelist ?? [],
      ignore: raw.check?.ignore ?? [],
    },
  };
}
