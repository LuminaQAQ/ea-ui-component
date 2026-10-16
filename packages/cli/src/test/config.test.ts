import { describe, it, expect, afterEach } from "vitest";
import fs from "node:fs";
import path from "node:path";

import { loadConfig } from "../lib/config";
import { makeTempRoot, removeTempRoot, writeFile } from "./helpers";

const dirs: string[] = [];
function temp(): string {
  const d = makeTempRoot();
  dirs.push(d);
  return d;
}
afterEach(() => {
  while (dirs.length) removeTempRoot(dirs.pop()!);
});

/** 直接写原始 JSON 文本到沙箱，用于构造异常 config */
function put(root: string, obj: unknown): void {
  writeFile(root, "ea.config.json", JSON.stringify(obj));
}

describe("loadConfig", () => {
  it("config 文件不存在时报缺路径错误并打印最小骨架", () => {
    const root = temp();
    expect(() => loadConfig(root)).toThrow(/缺少必配路径/);
    try {
      loadConfig(root);
    } catch (e) {
      const msg = (e as Error).message;
      expect(msg).toContain("project.componentDirs");
      expect(msg).toContain("project.testDir");
      expect(msg).toContain("project.entry");
      expect(msg).toContain("ea.config.json 最小骨架");
    }
  });

  it("缺任一必配路径时错误项按需列出", () => {
    const root = temp();
    put(root, { project: { componentDirs: "components" } });
    expect(() => loadConfig(root)).toThrow(
      /缺少必配路径：project\.testDir、project\.entry/
    );
  });

  it("componentDirs 为空数组视为缺失", () => {
    const root = temp();
    put(root, { project: { componentDirs: [], testDir: "t", entry: "e" } });
    expect(() => loadConfig(root)).toThrow(/componentDirs/);
  });

  it("单字符串 componentDirs 归一化为数组并解析为绝对路径", () => {
    const root = temp();
    put(root, {
      project: {
        prefix: "ea",
        componentDirs: "components",
        testDir: "test",
        entry: "components/index.ts",
      },
    });
    const cfg = loadConfig(root);
    expect(cfg.project.componentDirs).toHaveLength(1);
    expect(cfg.project.componentDirs[0]).toEqual({
      path: path.resolve(root, "components"),
      internal: false,
    });
    expect(cfg.project.testDir).toBe(path.resolve(root, "test"));
    expect(cfg.project.entry).toBe(path.resolve(root, "components/index.ts"));
  });

  it("对象形态 componentDirs 保留 internal 标记并布尔化", () => {
    const root = temp();
    put(root, {
      project: {
        componentDirs: [
          "packages/components/src/components",
          { path: "packages/components/src/common", internal: true },
          { path: "packages/x/src/y" },
        ],
        testDir: "test",
        entry: "index.ts",
      },
    });
    const cfg = loadConfig(root);
    expect(cfg.project.componentDirs.map(d => d.internal)).toEqual([
      false,
      true,
      false,
    ]);
    expect(cfg.project.componentDirs[1].path).toBe(
      path.resolve(root, "packages/components/src/common")
    );
  });

  it("prefix 合法时透传，缺省时为 undefined", () => {
    const base = { componentDirs: "c", testDir: "t", entry: "e" };
    const r1 = temp();
    put(r1, { project: { ...base, prefix: "ea2" } });
    expect(loadConfig(r1).project.prefix).toBe("ea2");

    const r2 = temp();
    put(r2, { project: base });
    expect(loadConfig(r2).project.prefix).toBeUndefined();
  });

  it("prefix 非法格式抛错", () => {
    const root = temp();
    put(root, {
      project: { prefix: "EA", componentDirs: "c", testDir: "t", entry: "e" },
    });
    expect(() => loadConfig(root)).toThrow(/prefix "EA" 不合法/);
  });

  it("prefix 为空字符串拒绝（不匹配 ^[a-z][a-z0-9]*$）", () => {
    const root = temp();
    put(root, {
      project: { prefix: "", componentDirs: "c", testDir: "t", entry: "e" },
    });
    expect(() => loadConfig(root)).toThrow(/不合法/);
  });

  it("prefix 以数字开头拒绝", () => {
    const root = temp();
    put(root, {
      project: { prefix: "1ea", componentDirs: "c", testDir: "t", entry: "e" },
    });
    expect(() => loadConfig(root)).toThrow(/不合法/);
  });

  it("prefix 合法值（小写字母开头 + 数字）透传", () => {
    const root = temp();
    put(root, {
      project: { prefix: "ea2", componentDirs: "c", testDir: "t", entry: "e" },
    });
    expect(loadConfig(root).project.prefix).toBe("ea2");
  });

  it("check 段缺省回落空数组", () => {
    const root = temp();
    put(root, { project: { componentDirs: "c", testDir: "t", entry: "e" } });
    const cfg = loadConfig(root);
    expect(cfg.check.rootTestWhitelist).toEqual([]);
    expect(cfg.check.ignore).toEqual([]);
  });

  it("读取已存在的 config 目录树不影响工作区", () => {
    const root = temp();
    writeFile(
      root,
      "ea.config.json",
      JSON.stringify({
        project: { componentDirs: "c", testDir: "t", entry: "e" },
      })
    );
    expect(fs.existsSync(path.join(root, "ea.config.json"))).toBe(true);
    expect(() => loadConfig(root)).not.toThrow();
  });

  it("check 段显式提供时透传", () => {
    const root = temp();
    put(root, {
      project: { componentDirs: "c", testDir: "t", entry: "e" },
      check: {
        rootTestWhitelist: ["a.test.ts"],
        ignore: [{ name: "ea-x", rules: ["missing-test"], reason: "WIP" }],
      },
    });
    const cfg = loadConfig(root);
    expect(cfg.check.rootTestWhitelist).toEqual(["a.test.ts"]);
    expect(cfg.check.ignore).toHaveLength(1);
    expect(cfg.check.ignore[0].reason).toBe("WIP");
  });

  it("templates 字段透传", () => {
    const root = temp();
    put(root, {
      project: { componentDirs: "c", testDir: "t", entry: "e" },
      templates: "my-tpl",
    });
    expect(loadConfig(root).templates).toBe("my-tpl");
  });

  it("JSON 语法损坏时给出带最小骨架的解析失败报错", () => {
    const root = temp();
    writeFile(root, "ea.config.json", "{ // 注释\n not json }");
    try {
      loadConfig(root);
      throw new Error("应当抛错");
    } catch (e) {
      const msg = (e as Error).message;
      expect(msg).toContain("ea.config.json 解析失败");
      expect(msg).toContain("ea.config.json 最小骨架");
    }
  });

  it("componentDirs 类型不匹配（数字）时给出类型化报错与骨架", () => {
    const root = temp();
    put(root, { project: { componentDirs: 5, testDir: "t", entry: "e" } });
    try {
      loadConfig(root);
      throw new Error("应当抛错");
    } catch (e) {
      const msg = (e as Error).message;
      expect(msg).toContain("componentDirs 类型不匹配");
      expect(msg).toContain("ea.config.json 最小骨架");
    }
  });

  it("componentDirs 数组元素类型不匹配（对象缺 path）时报错", () => {
    const root = temp();
    put(root, {
      project: {
        componentDirs: [{ internal: true }],
        testDir: "t",
        entry: "e",
      },
    });
    expect(() => loadConfig(root)).toThrow(/类型不匹配/);
  });

  it("componentDirs 为布尔类型时报类型化错误而非裸 TypeError", () => {
    const root = temp();
    put(root, { project: { componentDirs: true, testDir: "t", entry: "e" } });
    try {
      loadConfig(root);
      throw new Error("应当抛错");
    } catch (e) {
      expect((e as Error).message).toMatch(/类型不匹配/);
      expect((e as Error).message).not.toMatch(/Cannot read propert/);
    }
  });

  it("prefix 数字类型时经 RegExp.test 隐式转字符串拒绝", () => {
    const root = temp();
    put(root, {
      project: { prefix: 123, componentDirs: "c", testDir: "t", entry: "e" },
    });
    expect(() => loadConfig(root)).toThrow(/prefix/);
  });

  it("prefix 含连字符拒绝（须为单段）", () => {
    const root = temp();
    put(root, {
      project: {
        prefix: "my-lib",
        componentDirs: "c",
        testDir: "t",
        entry: "e",
      },
    });
    expect(() => loadConfig(root)).toThrow(/不合法/);
  });
});
