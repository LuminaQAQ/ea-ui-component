export { loadConfig, type EaConfig, type IgnoreEntry } from "./lib/config";
export { scanScope, scanTestRootFiles, type ComponentDirInfo, type Scope } from "./lib/scan";
export { toPascalCase, EA_NAME_RE } from "./lib/naming";
export { runCheck, type CheckOptions } from "./commands/check";
