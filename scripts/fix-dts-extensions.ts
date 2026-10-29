import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * 给 d.ts 中的相对引用补上扩展名。
 * node16/nodenext 的 ESM 解析要求显式扩展名，而 tsc 生成的声明不带。
 */
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const typesDir = process.argv[2]
  ? resolve(process.argv[2])
  : resolve(ROOT, "packages/core/dist/types");

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap(name => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });

const withExtension = (fileDir: string, spec: string): string => {
  if (spec.endsWith(".js") || spec.endsWith(".json")) return spec;

  const base = resolve(fileDir, spec);

  if (existsSync(`${base}.d.ts`)) return `${spec}.js`;
  if (existsSync(join(base, "index.d.ts"))) return `${spec}/index.js`;

  return spec;
};

const patterns = [/(\bfrom\s+["'])(\.[^"']+)(["'])/g, /(\bimport\(\s*["'])(\.[^"']+)(["'])/g];

let changed = 0;

for (const file of walk(typesDir).filter(name => name.endsWith(".d.ts"))) {
  const fileDir = dirname(file);
  const source = readFileSync(file, "utf-8");

  let next = source;

  for (const pattern of patterns) {
    next = next.replace(pattern, (_match, head: string, spec: string, tail: string) => {
      return `${head}${withExtension(fileDir, spec)}${tail}`;
    });
  }

  if (next !== source) {
    writeFileSync(file, next);
    changed += 1;
  }
}

console.log(`d.ts 扩展名修正完成：${changed} 个文件`);
