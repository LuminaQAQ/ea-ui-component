import { program } from "commander";
import { runCheck } from "./commands/check";

program
  .name("ea")
  .description("easy-component-ui 组件库工程 CLI")
  .version("0.1.0");

program
  .command("check")
  .description("校验组件目录规范（同名测试/命名/注册一致性），存在错误时退出码为 1")
  .option("--ignore <name...>", "临时豁免的组件名（可传多个）")
  .action(runCheck);

program.parse();
