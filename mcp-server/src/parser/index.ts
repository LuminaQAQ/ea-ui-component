import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseComponent } from "./component-parser.js";
import type { ComponentMeta } from "../types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** 项目根目录（mcp-server 的上级目录） */
const PROJECT_ROOT = path.resolve(__dirname, "..", "..", "..");

/** 组件源码目录 */
const COMPONENTS_DIR = path.join(PROJECT_ROOT, "src", "components");

/** 缓存输出路径 */
const CACHE_DIR = path.join(__dirname, "..", "cache");
const CACHE_FILE = path.join(CACHE_DIR, "components-meta.json");

/**
 * 批量扫描 src/components/ 目录，生成 components-meta.json
 */
function scanAllComponents(): void {
  console.log("开始扫描组件源码...");
  console.log(`项目根目录: ${PROJECT_ROOT}`);
  console.log(`组件目录: ${COMPONENTS_DIR}`);

  if (!fs.existsSync(COMPONENTS_DIR)) {
    console.error(`组件目录不存在: ${COMPONENTS_DIR}`);
    process.exit(1);
  }

  const startTime = Date.now();

  // 读取组件目录
  const entries = fs
    .readdirSync(COMPONENTS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name.startsWith("ea-"));

  console.log(`发现 ${entries.length} 个组件目录`);

  const metas: ComponentMeta[] = [];
  let successCount = 0;
  let failCount = 0;

  for (const entry of entries) {
    const componentDir = path.join(COMPONENTS_DIR, entry.name);
    try {
      const meta = parseComponent(componentDir, PROJECT_ROOT);
      metas.push(meta);

      if (meta.parseError) {
        failCount++;
        console.warn(`  ⚠ ${entry.name}: ${meta.parseError}`);
      } else {
        successCount++;
        console.log(
          `  ✓ ${meta.name} (${meta.displayName}) - ${meta.props.length} props, ${meta.events.length} events`
        );
      }
    } catch (error: any) {
      failCount++;
      console.error(`  ✗ ${entry.name}: ${error.message}`);
      metas.push({
        name: entry.name,
        displayName: entry.name,
        category: "basic",
        status: "stable",
        since: "",
        description: "",
        sourcePath: `src/components/${entry.name}`,
        props: [],
        events: [],
        slots: [],
        cssVars: [],
        cssParts: [],
        subComponents: [],
        dependencies: [],
        parseError: error.message,
      });
    }
  }

  // 按名称排序
  metas.sort((a, b) => a.name.localeCompare(b.name));

  // 写入缓存
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }

  const output = {
    version: "1.0.0",
    generatedAt: new Date().toISOString(),
    totalComponents: metas.length,
    successCount,
    failCount,
    components: metas,
  };

  fs.writeFileSync(CACHE_FILE, JSON.stringify(output, null, 2), "utf-8");

  const elapsed = Date.now() - startTime;
  console.log("\n扫描完成:");
  console.log(`  总计: ${metas.length} 个组件`);
  console.log(`  成功: ${successCount} 个`);
  console.log(`  失败: ${failCount} 个`);
  console.log(`  耗时: ${elapsed}ms`);
  console.log(`  输出: ${CACHE_FILE}`);
}

// 直接运行时执行扫描
scanAllComponents();
