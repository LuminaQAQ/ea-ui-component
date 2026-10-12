import fs from "node:fs";
import path from "node:path";

import { loadConfig, type IgnoreEntry } from "../lib/config";
import { scanComponentDirs, scanTestRootFiles } from "../lib/scan";
import { createNameRe } from "../lib/naming";

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
        message: `${d.dir} 缺少同名测试文件 ${d.name}.test.js`,
      });
    }
  }

  // 共享测试区根目录不得出现单组件测试（白名单除外）。
  // 已配置 prefix ⇒ `${prefix}-` 开头即组件测试；未配置 ⇒ 文件名精确等于某组件完整名才算
  const componentNames = new Set(all.map(d => d.name));
  for (const file of scanTestRootFiles(cfg)) {
    if (cfg.check.rootTestWhitelist.includes(file)) continue;
    const stem = file.replace(/\.test\.js$/, "");
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

  // 输出
  const errors = violations.filter(v => v.level === "error");
  const warnings = violations.filter(v => v.level === "warning");
  for (const v of errors) console.log(`✗ [${v.rule}] ${v.message}`);
  for (const v of warnings) console.log(`⚠ [${v.rule}] ${v.message}`);

  const activeIgnores = cfg.check.ignore.filter(
    e => cliIgnore.includes(e.name) || !e.rules || e.rules.length > 0
  );
  if (activeIgnores.length) {
    for (const e of activeIgnores) {
      console.log(`- 豁免 ${e.name}${e.reason ? `：${e.reason}` : ""}`);
    }
  }

  if (errors.length > 0) {
    console.log(
      `\n校验失败：${errors.length} 个错误，${warnings.length} 个警告`
    );
    process.exitCode = 1;
  } else {
    console.log(
      `\n✓ 校验通过（${all.filter(d => d.hasIndex).length} 个组件目录，${warnings.length} 个警告）`
    );
  }
}
