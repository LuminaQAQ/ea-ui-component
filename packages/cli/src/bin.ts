import { program } from "commander";
import pkg from "../package.json";
import { runCheck } from "./commands/check";
import { runAdd } from "./commands/add";
import { runInit } from "./commands/init";
import { fail, c } from "./lib/output";

program
  .name("ea")
  .description("easy-component-ui 组件库工程 CLI")
  .version(pkg.version, "-V, --version", "显示版本号");

program
  .helpOption("-h, --help", "显示帮助信息")
  .helpCommand("help [command]", "显示命令帮助");

program.configureHelp({
  styleTitle: t => c.bold(t),
  styleUsage: t => c.dim(t),
  styleOptionText: t => c.cyan(t),
  styleCommandText: t => c.cyan(t),
});

program.configureOutput({
  outputError: (str, write) =>
    write(c.red(str.replace(/^error:\s*/m, "✗ "))),
});

program
  .command("check")
  .description(
    "校验组件目录规范（同名测试/命名/注册一致性），存在错误时退出码为 1"
  )
  .option("--ignore <name...>", "临时豁免的组件名（可传多个）")
  .action(runCheck);

program
  .command("add [name]")
  .alias("new")
  .alias("gen")
  .description(
    "生成合规新组件（三件套；--with 生成复合组件；需完整 config 含 prefix）"
  )
  .option("--with <names...>", "附属组件名（kebab-case，可多个）")
  .option("--summary <text>", "组件摘要（@summary JSDoc）")
  .option("--internal", "生成到 internal 内部组件目录（不进聚合出口、不对外导出）")
  .option("--dry-run", "仅预览将创建的文件与聚合入口变更，不落盘")
  .option(
    "--yes",
    "跳过写盘前确认，直接落盘（脚本/CI 非交互场景，需已用参数提供全部输入）"
  )
  .action(async (name: string | undefined, options) => {
    try {
      await runAdd(name, options);
    } catch (error) {
      fail(error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  });

program
  .command("init")
  .description("项目初始化：--templates 将内置模板落盘到项目（二次开发起点）")
  .option("--templates", "写出内置组件模板到项目模板目录")
  .option(
    "--dir <path>",
    "模板输出目录（缺省取 config.templates，再回落 ea-templates/）"
  )
  .option("--force", "覆盖已存在的同名模板文件")
  .action(async options => {
    try {
      await runInit(options);
    } catch (error) {
      fail(error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  });

try {
  program.parse();
} catch (error) {
  fail(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
