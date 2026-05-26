import { readdirSync, statSync, existsSync } from "fs";
import { resolve } from "path";

const dir = resolve(process.cwd(), "src/components");
const commonDir = resolve(process.cwd(), "src/common");

function getEntryFile(directory: string, component: string): string {
  const tsPath = resolve(directory, component, "index.ts");
  const jsPath = resolve(directory, component, "index.js");
  if (existsSync(tsPath)) return tsPath;
  if (existsSync(jsPath)) return jsPath;
  return jsPath;
}

const entryConfigs: Record<string, string> = {
  index: getEntryFile(resolve(process.cwd(), "src/components"), "."),
};

readdirSync(dir).forEach((file: string) => {
  const isDirectory = statSync(resolve(dir, file)).isDirectory();

  if (isDirectory) {
    entryConfigs[file] = getEntryFile(dir, file);
  }
});

readdirSync(commonDir).forEach((file: string) => {
  const isDirectory = statSync(resolve(commonDir, file)).isDirectory();

  if (isDirectory) {
    entryConfigs[file] = getEntryFile(commonDir, file);
  }
});

export default entryConfigs;
