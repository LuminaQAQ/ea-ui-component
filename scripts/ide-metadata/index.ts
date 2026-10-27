import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { scanComponents } from "./scan";
import { collectTypeExports, emitVueTypes } from "./emit-vue";
import { emitJsxTypes } from "./emit-jsx";
import { emitEventTypes } from "./emit-events";
import { emitLlmsFullTxt, emitLlmsTxt } from "./emit-llms";
import {
  emitCustomElementsManifest,
  emitVscodeCustomData,
  emitWebTypes,
} from "./emit-standard";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

const COMPONENTS_SRC = path.resolve(ROOT, "packages/components/src");
const COMPONENTS_DIST = path.resolve(ROOT, "packages/components/dist");
const COMPONENTS_PKG = path.resolve(ROOT, "packages/components/package.json");
const ROOT_PKG = path.resolve(ROOT, "package.json");
const DOCS_DIR = path.resolve(ROOT, "docs");
const LLMS_OUT_DIR = path.resolve(DOCS_DIR, ".vitepress/public");

/** 写 JSON 文件并返回体积描述 */
function writeJson(file: string, data: unknown): string {
  const content = JSON.stringify(data, null, 2) + "\n";
  fs.writeFileSync(file, content, "utf-8");
  return `${(Buffer.byteLength(content) / 1024).toFixed(1)} KB`;
}

/** 生成全部 IDE 元数据到 packages/components/dist，需在 vite build 之后执行 */
export function generateIdeMetadata(): void {
  const startedAt = Date.now();

  if (!fs.existsSync(COMPONENTS_DIST)) {
    console.error(`构建产物目录不存在：${COMPONENTS_DIST}`);
    console.error("请先执行 vite build，再生成 IDE 元数据");
    process.exitCode = 1;
    return;
  }

  const pkg = JSON.parse(fs.readFileSync(COMPONENTS_PKG, "utf-8")) as {
    name: string;
    version: string;
    description: string;
  };
  const rootPkg = JSON.parse(fs.readFileSync(ROOT_PKG, "utf-8")) as {
    homepage: string;
    description: string;
  };

  const { components, warnings } = scanComponents({
    componentsDir: path.join(COMPONENTS_SRC, "components"),
    coreDir: path.resolve(ROOT, "packages/core/src"),
    constantsDir: path.join(COMPONENTS_SRC, "constants"),
  });

  if (components.length === 0) {
    console.error("未扫描到任何组件，请检查源码目录结构");
    process.exitCode = 1;
    return;
  }

  // Vue 模板类型增强：以实际产物的导出为基准
  const typeIndex = collectTypeExports(
    path.join(COMPONENTS_DIST, "types")
  );
  const vue = emitVueTypes(components, typeIndex, pkg.name);
  fs.writeFileSync(path.join(COMPONENTS_DIST, "vue.d.ts"), vue.content, "utf-8");
  // 供运行时 import 解析的空模块，实际类型由 vue.d.ts 提供
  fs.writeFileSync(path.join(COMPONENTS_DIST, "vue.js"), "export {};\n", "utf-8");

  const jsx = emitJsxTypes(components, typeIndex, pkg.name);
  fs.writeFileSync(path.join(COMPONENTS_DIST, "jsx.d.ts"), jsx.content, "utf-8");
  fs.writeFileSync(path.join(COMPONENTS_DIST, "jsx.js"), "export {};\n", "utf-8");

  const eventTypes = emitEventTypes(components, typeIndex);
  fs.writeFileSync(
    path.join(COMPONENTS_DIST, "events.d.ts"),
    eventTypes.content,
    "utf-8"
  );
  fs.writeFileSync(path.join(COMPONENTS_DIST, "events.js"), "export {};\n", "utf-8");

  const sizes = [
    ["vue.d.ts", `${(Buffer.byteLength(vue.content) / 1024).toFixed(1)} KB`],
    ["jsx.d.ts", `${(Buffer.byteLength(jsx.content) / 1024).toFixed(1)} KB`],
    [
      "events.d.ts",
      `${(Buffer.byteLength(eventTypes.content) / 1024).toFixed(1)} KB`,
    ],
    [
      "custom-elements.json",
      writeJson(
        path.join(COMPONENTS_DIST, "custom-elements.json"),
        emitCustomElementsManifest(components)
      ),
    ],
    [
      "vscode.html-custom-data.json",
      writeJson(
        path.join(COMPONENTS_DIST, "vscode.html-custom-data.json"),
        emitVscodeCustomData(components)
      ),
    ],
    [
      "web-types.json",
      writeJson(
        path.join(COMPONENTS_DIST, "web-types.json"),
        emitWebTypes(components, {
          name: pkg.name,
          version: pkg.version,
          description: pkg.description,
        })
      ),
    ],
  ];

  // llms 产物：组件索引与完整 API
  const documentedTags = new Set(
    fs
      .readdirSync(DOCS_DIR)
      .filter(name => name.startsWith("ea-") && name.endsWith(".md"))
      .map(name => name.slice(0, -".md".length))
  );
  const llmsOptions = {
    siteUrl: rootPkg.homepage.endsWith("/")
      ? rootPkg.homepage
      : `${rootPkg.homepage}/`,
    siteName: "Easy UI",
    description: rootPkg.description,
    documentedTags,
    generatedAt: new Date().toISOString().slice(0, 10),
  };

  fs.mkdirSync(LLMS_OUT_DIR, { recursive: true });
  const llmsFiles: [string, string][] = [
    ["llms.txt", emitLlmsTxt(components, llmsOptions)],
    ["llms-full.txt", emitLlmsFullTxt(components, llmsOptions)],
  ];
  for (const [name, content] of llmsFiles) {
    fs.writeFileSync(path.join(LLMS_OUT_DIR, name), content, "utf-8");
    sizes.push([
      `public/${name}`,
      `${(Buffer.byteLength(content) / 1024).toFixed(1)} KB`,
    ]);
  }

  const attributeCount = components.reduce(
    (sum, item) => sum + item.attributes.length,
    0
  );
  const propertyCount = components.reduce(
    (sum, item) => sum + item.properties.length,
    0
  );
  const eventCount = components.reduce((sum, item) => sum + item.events.length, 0);
  const slotCount = components.reduce((sum, item) => sum + item.slots.length, 0);

  console.log("IDE 元数据生成完成");
  console.log(
    `  组件 ${components.length} 个 | 属性 ${attributeCount} 个 | JS 属性 ${propertyCount} 个 | 事件 ${eventCount} 个 | 插槽 ${slotCount} 个`
  );
  console.log(`  输出 ${path.relative(ROOT, COMPONENTS_DIST)}`);
  for (const [name, size] of sizes) {
    console.log(`    ${name}  ${size}`);
  }

  const allWarnings = [
    ...warnings,
    ...vue.skipped,
    ...jsx.skipped,
    ...eventTypes.missing,
  ];
  if (allWarnings.length) {
    console.warn(`  提示 ${allWarnings.length} 条：`);
    for (const warning of allWarnings.slice(0, 10)) {
      console.warn(`    - ${warning}`);
    }
    if (allWarnings.length > 10) {
      console.warn(`    ...另有 ${allWarnings.length - 10} 条`);
    }
  }

  console.log(`  耗时 ${Date.now() - startedAt}ms`);
}
