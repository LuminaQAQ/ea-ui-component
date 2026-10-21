import fs from "node:fs";
import path from "node:path";

import {
  loadConfig,
  type IgnoreEntry,
  type ResolvedEaConfig,
} from "../lib/config";
import {
  scanComponentDirs,
  scanTestRootFiles,
  type ComponentDirInfo,
} from "../lib/scan";
import { createNameRe } from "../lib/naming";
import { diffAggregateEntry } from "../lib/aggregate";
import { findModuleSpecifiers, hasCustomElementDecorator } from "../lib/source";
import { error, info, success, warn } from "../lib/output";

interface Violation {
  rule: string;
  level: "error" | "warning";
  message: string;
  /** 归属组件名；仅按名可判规则携带（全局规则如 aggregate-drift 无 name，不可按名豁免） */
  name?: string;
}

interface CheckContext {
  cfg: ResolvedEaConfig;
  all: ComponentDirInfo[];
  cliIgnore: string[];
}

/** 单条校验规则：读取上下文产出违规；豁免过滤由 runCheck 统一处理 */
interface CheckRule {
  id: string;
  run(ctx: CheckContext): Violation[];
}

export interface CheckOptions {
  ignore?: string[];
}

/** 豁免判定：config ignore 条目（rules 缺省 = 全豁免）叠加 CLI --ignore（全规则豁免） */
function isIgnored(
  ignore: IgnoreEntry[],
  name: string,
  rule: string,
  cliIgnore: string[]
): boolean {
  if (cliIgnore.includes(name)) return true;
  return ignore.some(
    entry => entry.name === name && (!entry.rules || entry.rules.includes(rule))
  );
}

/** 组件目录含 index.ts ⇒ 须有同名测试 */
const missingTest: CheckRule = {
  id: "missing-test",
  run({ all }) {
    return all
      .filter(d => d.hasIndex && !d.testFile)
      .map(d => ({
        rule: "missing-test",
        level: "error" as const,
        name: d.name,
        message: `${d.dir} 缺少同名测试文件 ${d.name}.test.ts`,
      }));
  },
};

/** 共享测试区根目录不得出现单组件测试（白名单除外）；按文件判定，不参与按名豁免 */
const testRootViolation: CheckRule = {
  id: "test-root-violation",
  run({ cfg, all }) {
    const componentNames = new Set(all.map(d => d.name));
    const out: Violation[] = [];
    for (const file of scanTestRootFiles(cfg)) {
      if (cfg.check.rootTestWhitelist.includes(file)) continue;
      const stem = file.replace(/\.test\.(js|ts)$/, "");
      const isComponentTest = cfg.project.prefix
        ? stem.startsWith(`${cfg.project.prefix}-`)
        : componentNames.has(stem);
      if (isComponentTest) {
        out.push({
          rule: "test-root-violation",
          level: "error",
          message: `共享测试区根目录出现单组件测试 ${file}（应位于组件目录内，或加入白名单）`,
        });
      }
    }
    return out;
  },
};

/** 孤儿测试——测试存在但 index.ts 缺失 */
const orphanTest: CheckRule = {
  id: "orphan-test",
  run({ all }) {
    return all
      .filter(d => d.testFile && !d.hasIndex)
      .map(d => ({
        rule: "orphan-test",
        level: "error" as const,
        name: d.name,
        message: `${d.dir} 存在测试文件但缺少 index.ts（孤儿测试）`,
      }));
  },
};

/** 组件名格式 = ${prefix}- 前缀 + kebab-case；未配置 prefix ⇒ 纯 WC 全名校验 */
const naming: CheckRule = {
  id: "naming",
  run({ cfg, all }) {
    const nameRe = createNameRe(cfg.project.prefix);
    const out: Violation[] = [];
    for (const d of all) {
      if (!d.hasIndex || nameRe.test(d.name)) continue;
      out.push({
        rule: "naming",
        level: "error",
        name: d.name,
        message: cfg.project.prefix
          ? `${d.dir} 组件名不符合规范（${cfg.project.prefix}- 前缀 + kebab-case）`
          : `${d.dir} 组件名不符合 WC 全名规范（kebab-case，含连字符）`,
      });
    }
    return out;
  },
};

/** 聚合入口漂移：哨兵区内容须与目录投影逐行一致；全局规则，不可按名豁免 */
const aggregateDrift: CheckRule = {
  id: "aggregate-drift",
  run({ cfg }) {
    const agg = diffAggregateEntry(cfg);
    return agg.status === "drift" || agg.status === "error"
      ? [
          {
            rule: "aggregate-drift",
            level: "error" as const,
            message: agg.message,
          },
        ]
      : [];
  },
};

/** 附属组件归属只读提醒：薄根 components/ 下注册了自定义元素却未被薄根引用 */
const subOwnership: CheckRule = {
  id: "sub-ownership",
  run({ all }) {
    const out: Violation[] = [];
    for (const d of all) {
      if (!d.hasIndex) continue;
      const subRoot = path.join(d.dir, "components");
      if (!fs.existsSync(subRoot)) continue;
      const refs = findModuleSpecifiers(
        fs.readFileSync(path.join(d.dir, "index.ts"), "utf-8")
      );
      for (const entry of fs
        .readdirSync(subRoot, { withFileTypes: true })
        .sort((a, b) => a.name.localeCompare(b.name))) {
        if (!entry.isDirectory()) continue;
        const subIndex = path.join(subRoot, entry.name, "index.ts");
        if (!fs.existsSync(subIndex)) continue;
        if (!hasCustomElementDecorator(fs.readFileSync(subIndex, "utf-8")))
          continue;
        const base = `./components/${entry.name}`;
        if (refs.some(s => s === base || s.startsWith(`${base}/`))) continue;
        out.push({
          rule: "sub-ownership",
          level: "warning",
          name: d.name,
          message: `${d.name}/components/${entry.name} 注册了自定义元素但未被薄根引用（未注册），请补 import 或删除该目录`,
        });
      }
    }
    return out;
  },
};

export function runCheck(options: CheckOptions = {}): void {
  /** 校验规则注册表：新增规则=追加一项，主流程不变 */
  const RULES: CheckRule[] = [
    missingTest,
    testRootViolation,
    orphanTest,
    naming,
    aggregateDrift,
    subOwnership,
  ];

  const cfg = loadConfig();
  const cliIgnore = options.ignore ?? [];
  const all = scanComponentDirs(cfg);

  // 先收集“去掉豁免”的全量违规，再统一过滤
  const raw = RULES.flatMap(rule => rule.run({ cfg, all, cliIgnore }));

  // 豁免过滤：按名可判规则套 config ignore + CLI --ignore；无 name 的全局规则恒上报
  const violations = raw.filter(
    v => !v.name || !isIgnored(cfg.check.ignore, v.name, v.rule, cliIgnore)
  );

  // 豁免条目腐化检测（不影响退出码）：目录不存在 ⇒ warning；
  // 显式 rules 未命中任何违规 ⇒ warning；
  // 无 rules 的宽豁免=长期许可，不因“未命中”提示
  for (const e of cfg.check.ignore) {
    if (!e.reason) {
      violations.push({
        rule: "ignore-reason",
        level: "warning",
        message: `豁免 ${e.name} 缺少 reason（建议补填豁免原因）`,
      });
    }

    const target = all.find(d => d.name === e.name);
    if (!target) {
      violations.push({
        rule: "ignore-stale",
        level: "warning",
        message: `豁免 ${e.name} 对应组件目录不存在（建议删除该豁免条目）`,
      });
      continue;
    }

    const hits = raw.some(
      v => v.name === e.name && (!e.rules?.length || e.rules.includes(v.rule))
    );
    if (!hits && e.rules?.length) {
      violations.push({
        rule: "ignore-stale",
        level: "warning",
        message: `豁免 ${e.name} 未命中任何可豁免违规（建议复查是否仍需豁免）`,
      });
    }
  }

  // 输出
  const errors = violations.filter(v => v.level === "error");
  const warnings = violations.filter(v => v.level === "warning");
  for (const v of errors) error(`✗ [${v.rule}] ${v.message}`);
  for (const v of warnings) warn(`⚠ [${v.rule}] ${v.message}`);

  const activeIgnores = cfg.check.ignore.filter(
    e => cliIgnore.includes(e.name) || !e.rules || e.rules.length > 0
  );
  if (activeIgnores.length) {
    for (const e of activeIgnores) {
      info(`- 豁免 ${e.name}${e.reason ? `：${e.reason}` : ""}`);
    }
  }

  if (errors.length > 0) {
    error(`\n校验失败：${errors.length} 个错误，${warnings.length} 个警告`);
    process.exitCode = 1;
  } else {
    success(
      `\n✓ 校验通过（${all.filter(d => d.hasIndex).length} 个组件目录，${warnings.length} 个警告）`
    );
  }
}
