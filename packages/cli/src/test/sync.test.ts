import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import path from "node:path";

import { runSync } from "../commands/sync";
import { runCheck } from "../commands/check";
import { loadConfig } from "../lib/config";
import { diffAggregateEntry } from "../lib/aggregate";
import {
  makeTempRoot,
  removeTempRoot,
  writeFile,
  readLf,
  type TestConfigInput,
} from "./helpers";

const dirs: string[] = [];
function temp(): string {
  const d = makeTempRoot();
  dirs.push(d);
  return d;
}

let logs: string[];
let originalExitCode: number | string | null | undefined;

beforeEach(() => {
  originalExitCode = process.exitCode;
  process.exitCode = undefined;
  logs = [];
  vi.spyOn(console, "log").mockImplementation((...args: unknown[]) => {
    logs.push(args.map(String).join(" "));
  });
});

afterEach(() => {
  process.exitCode = originalExitCode;
  vi.restoreAllMocks();
  while (dirs.length) removeTempRoot(dirs.pop()!);
});

/** 建沙箱：config + 一个含具名值导出的合规组件，entry 是否存在由 opts 决定 */
function project(
  input: TestConfigInput = {},
  opts: { entry?: string; button?: boolean } = {}
): string {
  const root = temp();
  writeFile(
    root,
    "ea.config.json",
    JSON.stringify({
      project: {
        prefix: input.prefix ?? "ea",
        componentDirs: input.componentDirs ?? ["components"],
        testDir: "test",
        entry: input.entry ?? "components/index.ts",
      },
      check: { rootTestWhitelist: [], ignore: [] },
    })
  );
  if (opts.button !== false) {
    writeFile(
      root,
      "components/ea-button/index.ts",
      "export class EaButton {}"
    );
    writeFile(root, "components/ea-button/ea-button.test.ts", "// t");
  }
  if (opts.entry !== undefined) {
    writeFile(root, "components/index.ts", opts.entry);
  }
  vi.spyOn(process, "cwd").mockReturnValue(root);
  return root;
}

const out = () => logs.join("\n");

describe("diffAggregateEntry", () => {
  it("入口不存在 → skip", () => {
    const root = project();
    const d = diffAggregateEntry(loadConfig(root));
    expect(d.status).toBe("skip");
  });

  it("哨兵区与投影逐行一致 → ok", () => {
    const entry = [
      "// @ea-generated:start",
      'export { EaButton } from "./ea-button";',
      "// @ea-generated:end",
      "",
    ].join("\n");
    const root = project({}, { entry });
    const d = diffAggregateEntry(loadConfig(root));
    expect(d.status).toBe("ok");
  });

  it("入口缺组件导出 → drift 且列出 missing", () => {
    const entry = "// @ea-generated:start\n// @ea-generated:end\n";
    const root = project({}, { entry });
    const d = diffAggregateEntry(loadConfig(root));
    expect(d.status).toBe("drift");
    expect(d.missing).toContain('export { EaButton } from "./ea-button";');
  });

  it("入口多出目录已无的行 → drift 且列出 extra", () => {
    const entry = [
      "// @ea-generated:start",
      'export { EaButton } from "./ea-button";',
      'export { EaGone } from "./ea-gone";',
      "// @ea-generated:end",
      "",
    ].join("\n");
    const root = project({}, { entry });
    const d = diffAggregateEntry(loadConfig(root));
    expect(d.status).toBe("drift");
    expect(d.extra).toContain('export { EaGone } from "./ea-gone";');
  });

  it("有入口无哨兵标记且投影非空 → drift", () => {
    const root = project(
      {},
      { entry: 'export { EaButton } from "./ea-button";\n' }
    );
    const d = diffAggregateEntry(loadConfig(root));
    expect(d.status).toBe("drift");
    expect(d.message).toContain("缺哨兵标记");
  });
});

describe("runSync", () => {
  it("入口不存在时生成含哨兵与投影清单的文件", () => {
    const root = project();
    runSync();
    const text = readLf(path.join(root, "components", "index.ts"));
    expect(text).toContain("// @ea-generated:start");
    expect(text).toContain('export { EaButton } from "./ea-button";');
    expect(text).toContain("// @ea-generated:end");
    expect(out()).toContain("✓ 聚合入口已与目录投影同步");
  });

  it("重复运行幂等（不改变内容）", () => {
    const root = project();
    runSync();
    const first = readLf(path.join(root, "components", "index.ts"));
    runSync();
    const second = readLf(path.join(root, "components", "index.ts"));
    expect(second).toBe(first);
  });

  it("重建后与旧手工清单收敛为逐行一致（drift → ok）", () => {
    const entry = "// @ea-generated:start\n// @ea-generated:end\n";
    const root = project({}, { entry });
    expect(diffAggregateEntry(loadConfig(root)).status).toBe("drift");
    runSync();
    expect(diffAggregateEntry(loadConfig(root)).status).toBe("ok");
  });

  it("--dry-run 不落盘并报告将变更行", () => {
    const entry = "// @ea-generated:start\n// @ea-generated:end\n";
    const root = project({}, { entry });
    runSync({ dryRun: true });
    expect(readLf(path.join(root, "components", "index.ts"))).toBe(entry);
    expect(out()).toContain("--dry-run");
    expect(out()).toContain('export { EaButton } from "./ea-button";');
  });
});

describe("ea check R7 聚合漂移门禁", () => {
  it("入口与投影一致时不因 R7 报错", () => {
    const entry = [
      "// @ea-generated:start",
      'export { EaButton } from "./ea-button";',
      "// @ea-generated:end",
      "",
    ].join("\n");
    project({}, { entry });
    runCheck();
    expect(process.exitCode).not.toBe(1);
    expect(out()).not.toContain("[aggregate-drift]");
  });

  it("入口漂移时报 aggregate-drift 且退出码 1", () => {
    const entry = "// @ea-generated:start\n// @ea-generated:end\n";
    project({}, { entry });
    runCheck();
    expect(process.exitCode).toBe(1);
    expect(out()).toContain("[aggregate-drift]");
  });

  it("漂移经 ea sync 修复后 check 转通过", () => {
    const entry = "// @ea-generated:start\n// @ea-generated:end\n";
    project({}, { entry });
    runCheck();
    expect(out()).toContain("[aggregate-drift]");

    runSync();
    logs = [];
    process.exitCode = undefined;
    runCheck();
    expect(process.exitCode).not.toBe(1);
    expect(out()).not.toContain("[aggregate-drift]");
  });
});
