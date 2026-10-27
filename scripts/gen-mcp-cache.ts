import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { scanComponents } from "./ide-metadata/scan";
import { toMcpComponents } from "./ide-metadata/to-mcp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const COMPONENTS_SRC = path.resolve(ROOT, "packages/components/src");
const MCP_CACHE_FILE = path.resolve(
  ROOT,
  "packages/mcp-server/src/cache/components-meta.json"
);

/** 生成 MCP Server 的组件元数据缓存，与 IDE 元数据同源 */
function generateMcpCache(): void {
  const startedAt = Date.now();

  const result = scanComponents({
    componentsDir: path.join(COMPONENTS_SRC, "components"),
    coreDir: path.resolve(ROOT, "packages/core/src"),
    constantsDir: path.join(COMPONENTS_SRC, "constants"),
  });

  if (result.components.length === 0) {
    console.error("未扫描到任何组件，请检查源码目录结构");
    process.exitCode = 1;
    return;
  }

  const components = toMcpComponents(result);
  const output = {
    version: "1.0.0",
    generatedAt: new Date().toISOString(),
    totalComponents: components.length,
    successCount: components.length,
    failCount: 0,
    components,
  };

  fs.mkdirSync(path.dirname(MCP_CACHE_FILE), { recursive: true });
  fs.writeFileSync(MCP_CACHE_FILE, JSON.stringify(output, null, 2) + "\n", "utf-8");

  const propCount = components.reduce((sum, item) => sum + item.props.length, 0);
  const eventCount = components.reduce(
    (sum, item) => sum + item.events.length,
    0
  );
  const subCount = components.reduce(
    (sum, item) => sum + item.subComponents.length,
    0
  );

  console.log("MCP 组件元数据生成完成");
  console.log(
    `  组件 ${components.length} 个 | 属性 ${propCount} 个 | 事件 ${eventCount} 个 | 子组件关系 ${subCount} 条`
  );
  console.log(`  输出 ${path.relative(ROOT, MCP_CACHE_FILE)}`);
  if (result.warnings.length) {
    console.warn(`  提示 ${result.warnings.length} 条：`);
    for (const warning of result.warnings.slice(0, 10)) {
      console.warn(`    - ${warning}`);
    }
  }
  console.log(`  耗时 ${Date.now() - startedAt}ms`);
}

generateMcpCache();
