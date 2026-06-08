import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import z from "zod/v4";
import type { ComponentMeta } from "./types.js";
import { listComponents } from "./tools/list-components.js";
import { getComponent } from "./tools/get-component.js";
import { searchComponents } from "./tools/search-components.js";
import { getComponentExample } from "./tools/get-component-example.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** 缓存文件路径 */
const CACHE_FILE = path.join(__dirname, "cache", "components-meta.json");

/** 加载组件元数据 */
function loadComponentsMeta(): ComponentMeta[] {
  if (!fs.existsSync(CACHE_FILE)) {
    console.error(
      `缓存文件不存在: ${CACHE_FILE}\n请先运行 npm run mcp:build 生成元数据。`
    );
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(CACHE_FILE, "utf-8"));
  return data.components as ComponentMeta[];
}

/** 组件元数据（内存缓存） */
let components: ComponentMeta[] = [];

/** 文档目录 */
let docsDir: string = "";

/** 创建 MCP Server */
const server = new McpServer(
  {
    name: "ea-ui-component",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
    instructions:
      "ea-ui-component 组件库文档检索服务。你可以通过工具查询组件列表、组件详情、搜索组件、获取使用示例。",
  }
);

// ===== Tool 1: list_components =====
server.registerTool(
  "list_components",
  {
    description: "列出组件库中所有组件，返回组件名、显示名称、分类和状态",
  },
  async () => {
    const result = listComponents(components);
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  }
);

// ===== Tool 2: get_component =====
server.registerTool(
  "get_component",
  {
    description: "获取单个组件的完整信息，包括 Props、Events、Slots、CSS 变量、子组件等",
    inputSchema: {
      name: z.string().describe("组件名，如 ea-table、ea-select"),
      detail: z
        .enum(["summary", "full"])
        .optional()
        .default("full")
        .describe("返回详细程度：summary（概要）或 full（完整）"),
    },
  },
  async ({ name, detail }) => {
    const result = getComponent(components, name, detail);

    if (result.error) {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              error: result.error,
              availableComponents: components.map((c) => c.name),
            }),
          },
        ],
        isError: true,
      };
    }

    return {
      content: [{ type: "text", text: JSON.stringify(result.data, null, 2) }],
    };
  }
);

// ===== Tool 3: search_components =====
server.registerTool(
  "search_components",
  {
    description: "按关键词搜索组件，支持模糊匹配组件名、显示名称、描述和属性名",
    inputSchema: {
      keyword: z.string().describe("搜索关键词，如 table、表单、选择"),
      category: z
        .string()
        .optional()
        .describe("按分类过滤：basic/form/data-display/navigation/feedback/foundation"),
    },
  },
  async ({ keyword, category }) => {
    const result = searchComponents(components, keyword, category);
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  }
);

// ===== Tool 4: get_component_example =====
server.registerTool(
  "get_component_example",
  {
    description: "获取组件的使用示例代码，从 VitePress 文档中提取",
    inputSchema: {
      name: z.string().describe("组件名，如 ea-button、ea-table"),
      exampleType: z
        .enum(["basic", "advanced", "all"])
        .optional()
        .default("all")
        .describe("示例类型：basic（基础）/ advanced（进阶）/ all（全部）"),
    },
  },
  async ({ name, exampleType }) => {
    const comp = components.find((c) => c.name === name);

    if (!comp) {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({ error: `组件 "${name}" 不存在` }),
          },
        ],
        isError: true,
      };
    }

    const examples = getComponentExample(docsDir, name, exampleType);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({ component: name, examples }, null, 2),
        },
      ],
    };
  }
);

// ===== 启动 Server =====
async function main() {
  components = loadComponentsMeta();
  docsDir = path.resolve(__dirname, "..", "..", "docs");
  console.error(`已加载 ${components.length} 个组件元数据`);

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("ea-ui-component MCP Server 已启动（stdio 传输）");
}

main().catch((error) => {
  console.error("启动失败:", error);
  process.exit(1);
});
