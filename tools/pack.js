import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const handleImportModules = () => {
    const dir = path.join(process.cwd(), 'src/components');
    const entryPath = path.join(process.cwd(), 'src/components/index.js');
    fs.writeFileSync(entryPath, '');

    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        const isDir = fs.statSync(filePath).isDirectory();

        if (isDir) {
            const indexPath = path.join(filePath, 'index.js');
            if (fs.existsSync(indexPath)) {
                fs.appendFileSync(entryPath, `import './${file}/index.js';\n`);
            }
        }
    });

    fs.appendFileSync(entryPath, `import './ea-icon/index.css';\n`)
}

export const handlePackageExport = () => {
    const dir = path.resolve(process.cwd(), 'src/components');
    const entryConfigs = {
        index: path.resolve(process.cwd(), 'src/components/index.js'),
    };

    const exportsConfig = {
        ".": "./dist/components/index.js"
    };

    fs.readdirSync(dir).forEach((file) => {
        const subPath = path.resolve(dir, file);
        const isDirectory = fs.statSync(subPath).isDirectory();

        if (isDirectory) {
            const entryPath = path.resolve(subPath, 'index.js');
            entryConfigs[file] = entryPath;

            exportsConfig[`./${file}`] = {
                import: `./dist/components/${file}.js`
            };
        }
    });

    const pkgPath = path.resolve(process.cwd(), 'package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    pkg.exports = exportsConfig;
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
}

export const handleImportChildPages = () => {
    const dir = path.join(process.cwd(), 'test');
    const entryPath = path.join(process.cwd(), 'index.html');
    const files = [];

    fs.readdirSync(dir).forEach(file => {
        files.push(`./test/${file}`);
    });

    fs.writeFileSync(entryPath, `
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>

        <body>
            <script type="module" src="main.js"></script>
            ${files.map((file) => `<p><ea-button type="primary" href="${file}" link size="large"> ${file.slice(7, files.length)}</ea-button></p>`).join('\n')}
        </body>

        </html>
    `);

}
