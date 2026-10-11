export {
  loadConfig,
  type EaConfig,
  type IgnoreEntry,
  type ComponentDirConfig,
} from "./lib/config";
export { regenerateAggregateEntry } from "./lib/aggregate";
export {
  scanComponentDirs,
  scanTestRootFiles,
  type ComponentDirInfo,
} from "./lib/scan";
export { toPascalCase, createNameRe } from "./lib/naming";
export { runCheck, type CheckOptions } from "./commands/check";
