import fs from "node:fs";
import path from "node:path";

import { scanHtmlInjection } from "../packages/cli/src/lib/html-injection";

/** 扫描范围 */
const ROOTS = ["packages/core/src", "packages/components/src"];

/** 收集目录下的非测试 TS 文件 */
function collectFiles(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (/^(node_modules|dist)$/.test(entry.name)) continue;
      collectFiles(full, out);
    } else if (entry.name.endsWith(".ts") && !entry.name.endsWith(".test.ts")) {
      out.push(full);
    }
  }

  return out;
}

let total = 0;
const collected: { file: string; line: number; expression: string }[] = [];

for (const root of ROOTS) {
  for (const file of collectFiles(path.resolve(root))) {
    const violations = scanHtmlInjection(fs.readFileSync(file, "utf8"), file);

    for (const item of violations) {
      total += 1;
      const where = `${path.relative(process.cwd(), file)}:${item.line}`;
      collected.push({
        file: path.relative(process.cwd(), file),
        line: item.line,
        expression: item.expression,
      });
      console.error(`${where}  ${item.message}`);
    }
  }
}

if (process.argv.includes("--json")) {
  fs.writeFileSync(
    "build/html-violations.json",
    JSON.stringify(collected, null, 2)
  );
}

if (total > 0) {
  console.error(`\n[ea-ui] HTML 注入检查未通过：${total} 处插值需要转义`);
  process.exitCode = 1;
} else {
  console.log("[ea-ui] HTML 注入检查通过");
}
