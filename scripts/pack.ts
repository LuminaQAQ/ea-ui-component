import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface EntryConfigs {
  [key: string]: string;
}

interface ExportsConfig {
  [key: string]:
    | string
    | { import?: string; require?: string; default?: string };
}

export const handleImportModules = (): void => {
  const dir = path.join(process.cwd(), "src/components");
  const entryPath = path.join(process.cwd(), "src/components/index.ts");
  fs.writeFileSync(entryPath, "");

  fs.readdirSync(dir).forEach((file: string) => {
    const filePath = path.join(dir, file);
    const isDir = fs.statSync(filePath).isDirectory();

    if (isDir) {
      const indexPath = path.join(filePath, "index.ts");
      if (fs.existsSync(indexPath)) {
        fs.appendFileSync(entryPath, `import './${file}/index';\n`);
      }
    }
  });

  fs.appendFileSync(entryPath, `import './ea-icon/index.scss';\n`);
};

export const handlePackageExport = (): void => {
  const dir = path.resolve(process.cwd(), "src/components");
  const entryConfigs: EntryConfigs = {
    index: path.resolve(process.cwd(), "src/components/index.ts"),
  };

  const exportsConfig: ExportsConfig = {
    ".": "./dist/components/index.ts",
    "./icon-assets": {
      import: "./dist/assets/icon.css",
      require: "./dist/assets/icon.css",
      default: "./dist/assets/icon.css",
    },
  };

  fs.readdirSync(dir).forEach((file: string) => {
    const subPath = path.resolve(dir, file);
    const isDirectory = fs.statSync(subPath).isDirectory();

    if (isDirectory) {
      const entryPath = path.resolve(subPath, "index.ts");
      entryConfigs[file] = entryPath;

      exportsConfig[`./${file}`] = {
        import: `./dist/components/${file}.ts`,
      };
    }
  });

  const pkgPath = path.resolve(process.cwd(), "package.json");
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
  pkg.exports = exportsConfig;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
};

export const handleImportChildPages = (): void => {
  const dir = path.join(process.cwd(), "test");
  const entryPath = path.join(process.cwd(), "index.html");
  const files: string[] = [];

  fs.readdirSync(dir).forEach((file: string) => {
    files.push(`./test/${file}`);
  });

  fs.writeFileSync(
    entryPath,
    `
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>

        <body>
            <script type="module" src="main.ts"></script>
            ${files.map(file => `<p><ea-button type="primary" href="${file}" link size="large"> ${file.slice(7, files.length)}</ea-button></p>`).join("\n")}
        </body>

        </html>
    `
  );
};
