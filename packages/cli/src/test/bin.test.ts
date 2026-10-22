import { describe, it, expect, vi, afterEach } from "vitest";
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { main } from "../program";
import { makeTempRoot, removeTempRoot, writeFile } from "./helpers";

const require = createRequire(import.meta.url);
// spawnSync 仅用于颜色判定用例（picocolors 在模块加载时按环境定色，进程内无法重定色）
const tsxCli = path.join(path.dirname(require.resolve("tsx")), "cli.mjs");
const binPath = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "bin.ts"
);

interface RunResult {
  status: number;
  stdout: string;
  stderr: string;
}

/** 进程内直调 main：捕获 console 与 process.stdout/stderr.write 双通道输出 */
async function run(args: string[], cwd?: string): Promise<RunResult> {
  const out: string[] = [];
  const err: string[] = [];
  const join =
    (bucket: string[]) =>
    (...a: unknown[]) => {
      bucket.push(a.map(String).join(" "));
    };
  const write = (bucket: string[]) => (chunk: unknown) => {
    bucket.push(String(chunk));
    return true;
  };

  const spies = [
    vi.spyOn(console, "log").mockImplementation(join(out)),
    vi.spyOn(console, "error").mockImplementation(join(err)),
    vi
      .spyOn(process.stdout, "write")
      .mockImplementation(write(out) as unknown as typeof process.stdout.write),
    vi
      .spyOn(process.stderr, "write")
      .mockImplementation(write(err) as unknown as typeof process.stderr.write),
    ...(cwd ? [vi.spyOn(process, "cwd").mockReturnValue(cwd)] : []),
  ];

  try {
    const status = await main(args);
    return { status, stdout: out.join(""), stderr: err.join("") };
  } finally {
    for (const s of spies) s.mockRestore();
  }
}

/** spawnSync 直跑入口（仅颜色用例需要真实进程环境判定） */
function runSpawn(
  args: string[],
  cwd?: string,
  extraEnv: Record<string, string> = {}
): { status: number | null; stdout: string; stderr: string } {
  const res = spawnSync(process.execPath, [tsxCli, binPath, ...args], {
    encoding: "utf-8",
    cwd,
    env: { ...process.env, NO_COLOR: "1", ...extraEnv },
  });
  return {
    status: res.status,
    stdout: res.stdout ?? "",
    stderr: res.stderr ?? "",
  };
}

const dirs: string[] = [];
function temp(): string {
  const d = makeTempRoot();
  dirs.push(d);
  return d;
}
afterEach(() => {
  while (dirs.length) removeTempRoot(dirs.pop()!);
});

/** 构造可跑 check/add 的沙箱项目 */
function project(
  opts: { prefix?: string; buttonWithTest?: boolean } = {}
): string {
  const root = temp();
  writeFile(
    root,
    "ea.config.json",
    JSON.stringify({
      project: {
        prefix: opts.prefix ?? "ea",
        componentDirs: ["components"],
        testDir: "test",
        entry: "components/index.ts",
      },
      check: { rootTestWhitelist: [], ignore: [] },
    })
  );
  writeFile(root, "components/ea-button/index.ts", "export class EaButton {}");
  if (opts.buttonWithTest) {
    writeFile(root, "components/ea-button/ea-button.test.ts", "// t");
  }
  return root;
}

describe("bin.ts 命令行参数解析与选项校验", () => {
  it("--version 输出 CLI 包版本并退出 0", async () => {
    const r = await run(["--version"]);
    expect(r.status).toBe(0);
    expect(r.stdout.trim()).toMatch(/^\d+\.\d+\.\d+/);
  });

  it("--help 列出全部子命令", async () => {
    const r = await run(["--help"]);
    expect(r.status).toBe(0);
    expect(r.stdout).toContain("check");
    expect(r.stdout).toContain("add");
    expect(r.stdout).toContain("init");
  });

  it("未知命令以非 0 退出并写入 stderr", async () => {
    const r = await run(["nosuchcommand"]);
    expect(r.status).toBe(1);
    expect(r.stderr).toContain("unknown command");
  });

  it("未知选项以非 0 退出并提示 unknown option", async () => {
    const r = await run(["check", "--nope"]);
    expect(r.status).toBe(1);
    expect(r.stderr).toContain("unknown option");
  });
});

describe("bin.ts 子命令端到端退出码", () => {
  it("check 无 config：错误提示走 stderr 且退出码 1", async () => {
    const root = temp();
    const r = await run(["check"], root);
    expect(r.status).toBe(1);
    expect(r.stderr).toContain("缺少必配路径");
  });

  it("check 存在违规：错误报告走 stdout 且退出码 1", async () => {
    const root = project({ buttonWithTest: false });
    const r = await run(["check"], root);
    expect(r.status).toBe(1);
    expect(r.stdout).toContain("[missing-test]");
  });

  it("check 全合规：退出码 0", async () => {
    const root = project({ buttonWithTest: true });
    const r = await run(["check"], root);
    expect(r.status).toBe(0);
    expect(r.stdout).toContain("校验通过");
  });

  it("check --ignore 豁免后转通过", async () => {
    const root = project({ buttonWithTest: false });
    const r = await run(["check", "--ignore", "ea-button"], root);
    expect(r.status).toBe(0);
    expect(r.stdout).toContain("校验通过");
  });

  it("check 豁免腐化 warning 不影响退出码", async () => {
    const root = project({ buttonWithTest: true });
    writeFile(
      root,
      "ea.config.json",
      JSON.stringify({
        project: {
          prefix: "ea",
          componentDirs: ["components"],
          testDir: "test",
          entry: "components/index.ts",
        },
        check: {
          rootTestWhitelist: [],
          ignore: [
            { name: "ea-gone", rules: ["missing-test"], reason: "历史豁免" },
          ],
        },
      })
    );
    const r = await run(["check"], root);
    expect(r.status).toBe(0);
    expect(r.stdout).toContain("[ignore-stale]");
    expect(r.stdout).toContain("校验通过");
  });

  it("add 非法名称：退出码 1 且报错到 stderr", async () => {
    const root = project();
    const r = await run(["add", "MyBad", "--summary", "x", "--yes"], root);
    expect(r.status).toBe(1);
    expect(r.stderr).toContain("组件名非法");
  });

  it("add --dry-run 非交互预览不落盘，退出码 0", async () => {
    const root = project();
    const r = await run(
      ["add", "preview", "--summary", "s", "--dry-run"],
      root
    );
    expect(r.status).toBe(0);
    expect(r.stdout).toContain("--dry-run：未写入任何文件");
    expect(
      require("node:fs").existsSync(path.join(root, "components", "ea-preview"))
    ).toBe(false);
  });

  it("new / gen 别名解析至 add 子命令", async () => {
    const root = project();
    const r = await run(
      ["gen", "alias-check", "--summary", "s", "--dry-run"],
      root
    );
    expect(r.status).toBe(0);
    expect(r.stdout).toContain("--dry-run：未写入任何文件");

    const root2 = project();
    const r2 = await run(
      ["new", "alias-check", "--summary", "s", "--dry-run"],
      root2
    );
    expect(r2.status).toBe(0);
  });

  it("check --help 列出 --ignore 选项", async () => {
    const r = await run(["check", "--help"]);
    expect(r.status).toBe(0);
    expect(r.stdout).toContain("--ignore");
  });

  it("add --help 列出全部选项与别名", async () => {
    const r = await run(["add", "--help"]);
    expect(r.status).toBe(0);
    expect(r.stdout).toContain("--with");
    expect(r.stdout).toContain("--parts");
    expect(r.stdout).toContain("--dry-run");
    expect(r.stdout).toContain("--yes");
    expect(r.stdout).toContain("--internal");
    // commander 将首个别名内联到 usage 行（add|new）
    expect(r.stdout).toMatch(/add\|new/);
  });

  it("commander 错误行经 outputError 改写为 ✗ 前缀", async () => {
    const r = await run(["check", "--nope"]);
    expect(r.status).toBe(1);
    expect(r.stderr).toContain("✗");
    expect(r.stderr).toContain("unknown option");
  });

  it("init --defaults 生成 ea.config.json 与聚合入口哨兵骨架，退出码 0", async () => {
    const root = temp();
    require("node:fs").mkdirSync(path.join(root, "src", "components"), {
      recursive: true,
    });
    const r = await run(["init", "--defaults"], root);
    expect(r.status).toBe(0);
    expect(
      require("node:fs").existsSync(path.join(root, "ea.config.json"))
    ).toBe(true);
    const entry = require("node:fs").readFileSync(
      path.join(root, "src", "components", "index.ts"),
      "utf-8"
    );
    expect(entry).toContain("// @ea-generated:start");
  });

  it("init 无 --defaults 且非交互时报错退出 1", async () => {
    const root = temp();
    const r = await run(["init"], root);
    expect(r.status).toBe(1);
    expect(r.stderr).toContain("ea init --defaults");
  });

  it("remove --dry-run 预览删除且退出码 0；rm 别名等价", async () => {
    const root = project({ buttonWithTest: true });
    const r = await run(["remove", "ea-button", "--dry-run"], root);
    expect(r.status).toBe(0);
    expect(r.stdout).toContain("删除预览");

    const alias = await run(["rm", "ea-button", "--dry-run"], root);
    expect(alias.status).toBe(0);
    expect(alias.stdout).toContain("删除预览");
  });

  it("sync --dry-run 预览聚合变更退出码 0", async () => {
    const root = project({ buttonWithTest: true });
    const r = await run(["sync", "--dry-run"], root);
    expect(r.status).toBe(0);
    expect(r.stdout).toContain("聚合入口");
  });

  it("init --templates --dir 落盘模板且退出码 0", async () => {
    const root = temp();
    const r = await run(["init", "--templates", "--dir", "my-tpl"], root);
    expect(r.status).toBe(0);
    expect(
      require("node:fs").existsSync(
        path.join(root, "my-tpl", "component", "entry.ts.tpl")
      )
    ).toBe(true);
  });

  it("连续调用 main 不互相污染退出码与输出", async () => {
    const root = project({ buttonWithTest: false });
    const bad = await run(["check"], root);
    expect(bad.status).toBe(1);

    const ok = project({ buttonWithTest: true });
    const good = await run(["check"], ok);
    expect(good.status).toBe(0);
    expect(good.stdout).not.toContain("[missing-test]");
  });
});

const ANSI_RE = /\x1b\[/;

describe("bin.ts 颜色输出（NO_COLOR / FORCE_COLOR，spawnSync 真实环境）", () => {
  it("NO_COLOR=1 时 stdout 与 stderr 均零 ANSI 码", () => {
    const ok = project({ buttonWithTest: true });
    const pass = runSpawn(["check"], ok, { NO_COLOR: "1", FORCE_COLOR: "" });
    expect(pass.stdout).not.toMatch(ANSI_RE);

    const bad = project({ buttonWithTest: false });
    const fail = runSpawn(["check"], bad, { NO_COLOR: "1", FORCE_COLOR: "" });
    expect(fail.stdout).not.toMatch(ANSI_RE);

    const err = runSpawn(["nosuchcommand"], undefined, {
      NO_COLOR: "1",
      FORCE_COLOR: "",
    });
    expect(err.stderr).not.toMatch(ANSI_RE);
  });

  it("FORCE_COLOR=1 时彩色输出含 ANSI 码", () => {
    const root = project({ buttonWithTest: true });
    const r = runSpawn(["check"], root, { NO_COLOR: "", FORCE_COLOR: "1" });
    expect(r.status).toBe(0);
    expect(r.stdout).toMatch(ANSI_RE);
  });
});
