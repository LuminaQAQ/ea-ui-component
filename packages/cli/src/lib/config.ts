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

export interface EaConfig {
  project: {
    componentsDir: string;
    commonDir: string;
    testDir: string;
    aggregateEntry: {
      path: string;
      /** 聚合入口中组件 import 之外的追加导入（如全局样式） */
      extraImports: string[];
      /** 聚合入口尾部的追加代码行（如主题初始化） */
      postlude: string[];
      /** 组件目录 → 公开类型导出名（手工状态，check R6 校验一致性） */
      typeExports: Record<string, string[]>;
    };
  };
  /** 组件模板来源（VS Code snippets JSONC 文件路径） */
  templates?: string;
  check: {
    /** 共享测试区根目录的 ea-*.test.js 白名单（基类/特殊测试） */
    rootTestWhitelist: string[];
    ignore: IgnoreEntry[];
  };
}

/** 内置默认值：与本仓库约定布局一致，零配置可用 */
const DEFAULTS: EaConfig = {
  project: {
    componentsDir: "packages/components/src/components",
    commonDir: "packages/components/src/common",
    testDir: "packages/components/src/test",
    aggregateEntry: {
      path: "packages/components/src/components/index.ts",
      extraImports: [],
      postlude: [],
      typeExports: {},
    },
  },
  templates: ".vscode/ea-ts.code-snippets",
  check: {
    rootTestWhitelist: ["ea-form-associated-base.test.js"],
    ignore: [],
  },
};

function deepMerge<T>(base: T, override: unknown): T {
  if (override === undefined || override === null) return base;
  if (Array.isArray(base) || Array.isArray(override)) return override as T;
  if (typeof base === "object" && typeof override === "object") {
    const result: Record<string, unknown> = { ...(base as Record<string, unknown>) };
    for (const [key, value] of Object.entries(override as Record<string, unknown>)) {
      result[key] = deepMerge((base as Record<string, unknown>)[key], value);
    }
    return result as T;
  }
  return override as T;
}

/**
 * 加载 ea.config.json（相对路径基于配置文件所在目录解析）；
 * 文件不存在时回退内置默认值（零配置三方可用）。
 */
export function loadConfig(cwd = process.cwd()): EaConfig {
  const file = path.join(cwd, "ea.config.json");
  let config = DEFAULTS;
  if (fs.existsSync(file)) {
    const raw = JSON.parse(fs.readFileSync(file, "utf8"));
    config = deepMerge(DEFAULTS, raw);
  }

  // 相对路径统一解析为基于 cwd 的绝对路径
  const p = config.project;
  p.componentsDir = path.resolve(cwd, p.componentsDir);
  p.commonDir = path.resolve(cwd, p.commonDir);
  p.testDir = path.resolve(cwd, p.testDir);
  p.aggregateEntry.path = path.resolve(cwd, p.aggregateEntry.path);
  return config;
}
