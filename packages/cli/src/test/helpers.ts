import fs from "node:fs";
import os from "node:os";
import path from "node:path";

/** 测试专用最小 config 形态（写入临时 ea.config.json 用） */
export interface TestConfigInput {
  prefix?: string;
  componentDirs?: (string | { path: string; internal?: boolean })[];
  testDir?: string;
  entry?: string;
  templates?: string;
  rootTestWhitelist?: string[];
  ignore?: { name: string; rules?: string[]; reason?: string }[];
}

/** 在系统临时目录创建一个独立测试沙箱根目录，避免污染工作区 */
export function makeTempRoot(prefix = "ea-cli-test-"): string {
  return fs.mkdtempSync(path.join(fs.realpathSync(os.tmpdir()), prefix));
}

/** 递归删除沙箱（force 容错，Windows 下重试删除被占用文件） */
export function removeTempRoot(dir: string): void {
  for (let i = 0; i < 5; i++) {
    try {
      fs.rmSync(dir, { recursive: true, force: true });
      return;
    } catch {
      // 短暂等待文件句柄释放后重试
      const start = Date.now();
      while (Date.now() - start < 30) {
        /* busy wait */
      }
    }
  }
}

/** 按 / 或 \ 分隔的相对路径写文件，自动创建父目录 */
export function writeFile(rootDir: string, relPath: string, content = ""): string {
  const abs = path.join(rootDir, ...relPath.split("/"));
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, content, "utf-8");
  return abs;
}

/** 生成一份合法默认 config（相对路径），可被字段覆盖后落盘到沙箱 */
export function buildConfig(
  rootDir: string,
  input: TestConfigInput = {}
): Record<string, unknown> {
  return {
    project: {
      ...(input.prefix ? { prefix: input.prefix } : {}),
      componentDirs: input.componentDirs ?? ["components"],
      testDir: input.testDir ?? "test",
      entry: input.entry ?? "components/index.ts",
    },
    ...(input.templates ? { templates: input.templates } : {}),
    check: {
      rootTestWhitelist: input.rootTestWhitelist ?? [],
      ignore: input.ignore ?? [],
    },
  };
}

/** 落盘 ea.config.json */
export function writeConfig(
  rootDir: string,
  input: TestConfigInput = {}
): string {
  const abs = path.join(rootDir, "ea.config.json");
  fs.writeFileSync(abs, JSON.stringify(buildConfig(rootDir, input), null, 2), "utf-8");
  return abs;
}

/** 在指定 componentDir 下创建一个组件目录骨架 */
export function makeComponentDir(
  rootDir: string,
  dirRel: string,
  name: string,
  opts: { index?: boolean; indexContent?: string; test?: boolean; testJs?: boolean } = {}
): string {
  const dir = path.join(rootDir, ...dirRel.split("/"), name);
  fs.mkdirSync(dir, { recursive: true });
  if (opts.index !== false) {
    fs.writeFileSync(
      path.join(dir, "index.ts"),
      opts.indexContent ?? `export const ${toIdent(name)} = true;\n`,
      "utf-8"
    );
  }
  if (opts.test) {
    fs.writeFileSync(path.join(dir, `${name}.test.ts`), "// test\n", "utf-8");
  }
  if (opts.testJs) {
    fs.writeFileSync(path.join(dir, `${name}.test.js`), "// test\n", "utf-8");
  }
  return dir;
}

/** 把 kebab 名转成合法 JS 标识符（ea-color-picker → eaColorPicker） */
export function toIdent(kebab: string): string {
  return kebab.replace(/[^a-zA-Z0-9]+([a-zA-Z0-9])/g, (_, c: string) =>
    c.toUpperCase()
  );
}

/** 读取文本并统一为 \n，规避 Windows CRLF 差异对断言的干扰 */
export function readLf(absPath: string): string {
  return fs.readFileSync(absPath, "utf-8").replace(/\r\n/g, "\n");
}
