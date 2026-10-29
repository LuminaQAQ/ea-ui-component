import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PKG_DIR = resolve(ROOT, "packages/core");
const DIST_DIR = resolve(PKG_DIR, "dist");

interface ExportTarget {
  types?: string;
  import?: string;
}

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap(name => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });

const problems: string[] = [];

if (!existsSync(DIST_DIR)) {
  console.error("dist 不存在，请先构建 @easy-component-ui/core");
  process.exit(1);
}

const files = walk(DIST_DIR);

for (const file of files) {
  const rel = relative(PKG_DIR, file).replace(/\\/g, "/");

  if (/\.test\.(js|d\.ts)$/.test(rel)) {
    problems.push(`测试产物：${rel}`);
  }

  if (
    rel.endsWith(".js") &&
    readFileSync(file, "utf-8").includes("process.env")
  ) {
    problems.push(`运行时含 process.env：${rel}`);
  }
}

const pkg = JSON.parse(
  readFileSync(resolve(PKG_DIR, "package.json"), "utf-8")
) as {
  exports: Record<string, string | ExportTarget>;
};

for (const [key, value] of Object.entries(pkg.exports)) {
  if (key.includes("*")) continue;

  const runtime = typeof value === "string" ? value : value.import;

  if (runtime && !existsSync(resolve(PKG_DIR, runtime))) {
    problems.push(`exports["${key}"] 指向缺失文件：${runtime}`);
  }
}

if (problems.length > 0) {
  console.error(`产物校验失败（${problems.length} 项）：`);
  problems.forEach(item => console.error(`- ${item}`));
  process.exit(1);
}

console.log(
  `产物校验通过：${files.length} 个文件，${Object.keys(pkg.exports).length} 条导出映射`
);
