import { loadConfig, type IgnoreEntry } from "../lib/config";
import {
  scanScope,
  scanTestRootFiles,
  type ComponentDirInfo,
} from "../lib/scan";
import { EA_NAME_RE } from "../lib/naming";

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
  | "type-exports-missing"
  | "type-exports-stale";

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

  const components = scanScope(cfg, "components");
  const common = scanScope(cfg, "common");
  const all: ComponentDirInfo[] = [...components, ...common];

  // R1/R2: 含 index.ts 的组件目录必须存在同名测试
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

  // R3: 共享测试区根目录不得出现单组件测试（白名单除外）
  for (const file of scanTestRootFiles(cfg)) {
    if (!cfg.check.rootTestWhitelist.includes(file)) {
      violations.push({
        rule: "test-root-violation",
        level: "error",
        message: `共享测试区根目录出现单组件测试 ${file}（应位于组件目录内，或加入白名单）`,
      });
    }
  }

  // R4: 孤儿测试——测试存在但 index.ts 缺失
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

  // R5: 组件名格式 = ea- 前缀 + kebab-case
  for (const d of all) {
    if (d.hasIndex && !EA_NAME_RE.test(d.name)) {
      violations.push({
        rule: "naming",
        level: "error",
        message: `${d.dir} 组件名不符合规范（ea- 前缀 + kebab-case）`,
      });
    }
  }

  // R6: typeExports 映射与目录一致性（映射仅覆盖 components，common 子组件不参与）
  const typeExports = cfg.project.aggregateEntry.typeExports;
  const indexedNames = new Set(
    components.filter(d => d.hasIndex).map(d => d.name)
  );
  for (const name of indexedNames) {
    if (
      !(name in typeExports) &&
      !isIgnored(cfg.check.ignore, name, "type-exports-missing", cliIgnore)
    ) {
      violations.push({
        rule: "type-exports-missing",
        level: "warning",
        message: `${name} 未在 ea.config.json typeExports 中登记（确认无公开类型导出则可忽略）`,
      });
    }
  }
  for (const name of Object.keys(typeExports)) {
    if (!indexedNames.has(name)) {
      violations.push({
        rule: "type-exports-stale",
        level: "error",
        message: `typeExports 中的 ${name} 对应目录不存在（过期条目，请清理）`,
      });
    }
  }

  // 输出
  const errors = violations.filter(v => v.level === "error");
  const warnings = violations.filter(v => v.level === "warning");
  for (const v of errors) console.log(`✗ [${v.rule}] ${v.message}`);
  for (const v of warnings) console.log(`⚠ [${v.rule}] ${v.message}`);

  const activeIgnores = cfg.check.ignore.filter(
    e =>
      cliIgnore.includes(e.name) || !e.rules || e.rules.includes("missing-test")
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
