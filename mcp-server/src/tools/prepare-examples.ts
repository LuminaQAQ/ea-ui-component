import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { ComponentMeta, ComponentExample } from "../types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** mcp-server 的上级目录（即 ea-ui-component 项目根目录） */
const PROJECT_ROOT = path.resolve(__dirname, "..", "..", "..");
const DOCS_DIR = path.join(PROJECT_ROOT, "docs");

/** parser 写入的缓存路径，与 parser/index.ts 保持一致（src/cache） */
const CACHE_DIR = path.resolve(__dirname, "..", "..", "src", "cache");
const CACHE_FILE = path.join(CACHE_DIR, "components-meta.json");

/** 从 VitePress 文档中提取 :::details 代码块 */
function extractExamples(docPath: string): ComponentExample[] {
  const examples: ComponentExample[] = [];
  if (!fs.existsSync(docPath)) return examples;

  const content = fs.readFileSync(docPath, "utf-8").replace(/\r\n/g, "\n");
  const lines = content.split("\n");
  /** 最近一个 ## 标题，用作示例标题 */
  let lastHeading = "";

  /**
   * 用栈跟踪 VitePress 容器嵌套层级。
   * 每遇到一个容器开始（N 个冒号 + 非空内容），push N；
   * 每遇到一个容器结束（恰好 N 个冒号），pop 匹配的层级。
   * 当栈顶是 details 容器且被关闭时，提取代码块。
   */
  const containerStack: { markerLen: number; title: string; body: string[] }[] =
    [];

  for (const line of lines) {
    // 捕获 ## 标题（示例标题）
    const headingMatch = line.match(/^##\s+(.+)$/);
    if (headingMatch && containerStack.length === 0) {
      lastHeading = headingMatch[1].trim();
      continue;
    }

    // 匹配容器开始行（3-5 个冒号 + 空格 + 内容）
    const openMatch = line.match(/^(:{3,5})\s+(\S.*)$/);
    // 匹配容器结束行（恰好 3-5 个冒号，无其他内容）
    const closeMatch = line.match(/^(:{3,5})\s*$/);

    if (openMatch) {
      const markerLen = openMatch[1].length;
      const rest = openMatch[2].trim();
      const isDetails = rest.startsWith("details");

      if (isDetails) {
        // details 容器：提取标题
        const detailsTitle = rest.replace(/^details\s*/, "").trim();
        const title =
          detailsTitle && detailsTitle !== "查看代码"
            ? detailsTitle
            : lastHeading;
        containerStack.push({ markerLen, title, body: [] });
      } else {
        // 非 details 容器（如 code-group），只记录层级
        containerStack.push({ markerLen, title: "", body: [] });
      }
      continue;
    }

    if (closeMatch) {
      const closeLen = closeMatch[1].length;
      // 从栈顶找到匹配的容器并关闭
      if (
        containerStack.length > 0 &&
        containerStack[containerStack.length - 1].markerLen === closeLen
      ) {
        const closed = containerStack.pop()!;

        // 如果关闭的是 details 容器，提取代码块
        if (closed.title) {
          const body = closed.body.join("\n");
          const codeMatch = body.match(/```html\n([\s\S]*?)```/);
          if (codeMatch) {
            const isBasic =
              closed.title.includes("基础") ||
              closed.title.includes("基本") ||
              closed.title.includes("简单") ||
              closed.title.toLowerCase().includes("basic");

            examples.push({
              title: closed.title,
              description: "",
              code: codeMatch[1].trim(),
              type: isBasic ? "basic" : "advanced",
            });
          }
        }
      }
      continue;
    }

    // 容器内的内容，追加到栈顶 details 容器的 body 中
    if (containerStack.length > 0) {
      // 只追加到最近的 details 容器
      const topDetails = [...containerStack]
        .reverse()
        .find((c) => c.title);
      if (topDetails) {
        topDetails.body.push(line);
      }
    }
  }

  return examples;
}

/** 预提取所有组件的示例代码到 components-meta.json 缓存 */
function prepareExamples(): void {
  if (!fs.existsSync(CACHE_FILE)) {
    console.error(
      `缓存文件不存在: ${CACHE_FILE}\n请先运行 npm run mcp:build 生成元数据。`
    );
    process.exit(1);
  }

  const cache = JSON.parse(fs.readFileSync(CACHE_FILE, "utf-8"));
  const components: ComponentMeta[] = cache.components;

  let totalExamples = 0;

  for (const comp of components) {
    const possiblePaths = [
      path.join(DOCS_DIR, `${comp.name}.md`),
      path.join(DOCS_DIR, "components", `${comp.name}.md`),
    ];

    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        comp.examples = extractExamples(p);
        totalExamples += comp.examples.length;
        break;
      }
    }
  }

  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), "utf-8");
  console.log(`已预提取 ${totalExamples} 个示例到缓存`);
}

prepareExamples();
