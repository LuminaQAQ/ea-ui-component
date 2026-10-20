import { Command, CommanderError } from "commander";
import pkg from "../package.json";
import { runCheck } from "./commands/check";
import { runAdd } from "./commands/add";
import { runInit } from "./commands/init";
import { runRemove } from "./commands/remove";
import { runSync } from "./commands/sync";
import { fail, c } from "./lib/output";

/** 构建 CLI 命令树（每次新建实例，保证 main 可重复进程内调用） */
function createProgram(): Command {
  const program = new Command();

  program
    .name("ea")
    .description("easy-component-ui 组件库工程 CLI")
    .version(pkg.version, "-V, --version", "显示版本号");

  program
    .helpOption("-h, --help", "显示帮助信息")
    .helpCommand("help [command]", "显示命令帮助");

  program.configureHelp({
    styleTitle: t => c.bold(t),
    // 完整覆盖 commander 默认 styleUsage（其逐词分词路径不再执行，故不配置 styleCommandText）
    styleUsage: t => c.dim(t),
    styleOptionText: t => c.cyan(t),
  });

  program.configureOutput({
    outputError: (str, write) => write(c.red(str.replace(/^error:\s*/m, "✗ "))),
  });

  // 须在定义子命令前调用（copyInheritedSettings 时机），令子命令错误也转抛 CommanderError
  program.exitOverride();

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
      "生成合规新组件（三件套；--with 生成复合组件、--parts 生成私有组件；需完整 config 含 prefix）"
    )
    .option(
      "--under <existing>",
      "追加模式：向已存在组件追加附属组件（目标为单组件时按需复合化转换）"
    )
    .option(
      "--public",
      "追加模式下附属组件对外公开（进薄出口 export 列表与聚合；缺省私有）"
    )
    .option("--with <names...>", "附属组件名（kebab-case，可多个；对外暴露）")
    .option(
      "--parts <names...>",
      "私有子组件名（kebab-case，可多个；生成但不对外导出，仅主实现副作用注册）"
    )
    .option("--summary <text>", "组件摘要（@summary JSDoc）")
    .option(
      "--internal",
      "生成到 internal 内部组件目录（不进聚合出口、不对外导出）"
    )
    .option(
      "--dir <label|path>",
      "目标组件目录：匹配 componentDirs 候选的 label 或 path（多候选非交互场景必填）"
    )
    .option("--dry-run", "仅预览将创建的文件与聚合入口变更，不落盘")
    .option(
      "--yes",
      "跳过写盘前确认，直接落盘（脚本/CI 非交互场景，需已用参数提供全部输入）"
    )
    .action((name: string | undefined, options) => runAdd(name, options));

  program
    .command("remove <name>")
    .alias("rm")
    .description(
      "删除组件目录并同步重建聚合出口（不自动改写引用方；需完整 config）"
    )
    .option(
      "--internal",
      "从 internal 内部组件目录移除（与 add 的 --internal 对称）"
    )
    .option(
      "--dry-run",
      "仅预览将删除的文件与聚合入口将移除的 export 行，不落盘"
    )
    .option("--yes", "跳过删除前确认，直接删除（脚本/CI 非交互场景）")
    .action((name: string, options) => runRemove(name, options));

  program
    .command("sync")
    .description(
      "重建聚合出口清单（提交进仓的 barrel，命令独占写；取代旧构建期自动再生）"
    )
    .option("--dry-run", "仅预览聚合入口将变更的 export 行，不落盘")
    .action(options => runSync(options));

  program
    .command("init")
    .description("项目初始化：--templates 将内置模板落盘到项目（二次开发起点）")
    .option("--templates", "写出内置组件模板到项目模板目录")
    .option(
      "--dir <path>",
      "模板输出目录（缺省取 config.templates，再回落 ea-templates/）"
    )
    .option("--force", "覆盖已存在的同名模板文件")
    .action(options => runInit(options));

  return program;
}

/**
 * CLI 入口：解析 argv（不含 node 与脚本路径），返回进程退出码。
 * commander 错误已由其自身输出，此处仅决定退出码；
 * runCheck 通过 process.exitCode 传递失败状态。
 * @param argv 命令行参数
 * @returns 进程退出码（Promise）
 */
export async function main(argv: string[]): Promise<number> {
  const prevExitCode = process.exitCode;
  process.exitCode = undefined;
  try {
    await createProgram().parseAsync(argv, { from: "user" });
    return typeof process.exitCode === "number" ? process.exitCode : 0;
  } catch (error) {
    if (error instanceof CommanderError) return error.exitCode;
    fail(error instanceof Error ? error.message : String(error));
    return 1;
  } finally {
    process.exitCode = prevExitCode;
  }
}
