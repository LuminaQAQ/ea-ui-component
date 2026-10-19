import { loadConfig, type IgnoreEntry } from "../lib/config";
import { scanComponentDirs, scanTestRootFiles } from "../lib/scan";
import { createNameRe } from "../lib/naming";
import { diffAggregateEntry } from "../lib/aggregate";
import { error, info, success, warn } from "../lib/output";

interface Violation {
  rule: string;
  level: "error" | "warning";
  message: string;
}

type RuleName =
  | "missing-test"
  | "test-root-violation"
  | "orphan-test"
  | "naming"
  | "missing-type-declaration";

/** 豁免判定：config ignore 条目（rules 缺省 = 全豁免）叠加 CLI --ignore（全规则豁免） */
function isIgnored(
  ignore: IgnoreEntry[],
  name: string,
  rule: RuleName,
  cliIgnore: string[]
): boolean {
  if (cliIgnore.includes(name)) return true;
  return ignore.some(
    entry => entry.name === name && (!entry.rules || entry.rules.includes(rule))
  );
}

export interface CheckOptions {
  ignore?: string[];
}

export function runCheck(options: CheckOptions = {}): void {
  const cfg = loadConfig();
  const cliIgnore = options.ignore ?? [];
  const violations: Violation[] = [];

  const all = scanComponentDirs(cfg);

  // 含 index.ts 的组件目录必须存在同名测试
  for (const d of all) {
    if (
      d.hasIndex &&
      !d.testFile &&
      !isIgnored(cfg.check.ignore, d.name, "missing-test", cliIgnore)
    ) {
      violations.push({
        rule: "missing-test",
        level: "error",
        message: `${d.dir} 缺少同名测试文件 ${d.name}.test.ts`,
      });
    }
  }

  // 共享测试区根目录不得出现单组件测试（白名单除外）。
  // 已配置 prefix ⇒ `${prefix}-` 开头即组件测试；未配置 ⇒ 文件名精确等于某组件完整名才算
  const componentNames = new Set(all.map(d => d.name));
  for (const file of scanTestRootFiles(cfg)) {
    if (cfg.check.rootTestWhitelist.includes(file)) continue;
    const stem = file.replace(/\.test\.(js|ts)$/, "");
    const isComponentTest = cfg.project.prefix
      ? stem.startsWith(`${cfg.project.prefix}-`)
      : componentNames.has(stem);
    if (isComponentTest) {
      violations.push({
        rule: "test-root-violation",
        level: "error",
        message: `共享测试区根目录出现单组件测试 ${file}（应位于组件目录内，或加入白名单）`,
      });
    }
  }

  // 孤儿测试——测试存在但 index.ts 缺失
  for (const d of all) {
    if (
      d.testFile &&
      !d.hasIndex &&
      !isIgnored(cfg.check.ignore, d.name, "orphan-test", cliIgnore)
    ) {
      violations.push({
        rule: "orphan-test",
        level: "error",
        message: `${d.dir} 存在测试文件但缺少 index.ts（孤儿测试）`,
      });
    }
  }

  // 组件名格式 = ${prefix}- 前缀 + kebab-case；未配置 prefix ⇒ 纯 WC 全名校验
  const nameRe = createNameRe(cfg.project.prefix);
  for (const d of all) {
    if (d.hasIndex && !nameRe.test(d.name)) {
      violations.push({
        rule: "naming",
        level: "error",
        message: cfg.project.prefix
          ? `${d.dir} 组件名不符合规范（${cfg.project.prefix}- 前缀 + kebab-case）`
          : `${d.dir} 组件名不符合 WC 全名规范（kebab-case，含连字符）`,
      });
    }
  }

  // 豁免条目腐化检测：对象目录已删除、豁免规则已不再命中任何可豁免违规、
  // 或缺失 reason ⇒ warning 提示复查（不影响退出码）
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

    const rules = e.rules ?? ["missing-test", "orphan-test"];
    const hit =
      (rules.includes("missing-test") && target.hasIndex && !target.testFile) ||
      (rules.includes("orphan-test") && target.testFile && !target.hasIndex);
    if (!hit) {
      violations.push({
        rule: "ignore-stale",
        level: "warning",
        message: `豁免 ${e.name} 未命中任何可豁免违规（建议复查是否仍需豁免）`,
      });
    }
  }

  // 聚合入口漂移：哨兵区内容须与目录投影逐行一致（聚合入口由 CLI 命令维护），
  // 只读校验不修复（修复=ea sync）；入口尚不存在时跳过（交由 add/sync 生成）
  const agg = diffAggregateEntry(cfg);
  if (agg.status === "drift" || agg.status === "error") {
    violations.push({
      rule: "aggregate-drift",
      level: "error",
      message: agg.message,
    });
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
