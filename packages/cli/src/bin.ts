import { program } from "commander";
import pkg from "../package.json";
import { runCheck } from "./commands/check";
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

try {
  program.parse();
} catch (error) {
  fail(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
