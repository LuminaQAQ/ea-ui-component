const fs = require('fs');
const path = require('path');

const handleImportModules = () => {
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

const handlePackageExport = () => {
    const dir = path.resolve(process.cwd(), 'src/components');
    const entryConfigs = {
        index: path.resolve(process.cwd(), 'src/components/index.js'),
    };

    const exportsConfig = {
        ".": "./dist/index.js"
    };

    fs.readdirSync(dir).forEach((file) => {
        const subPath = path.resolve(dir, file);
        const isDirectory = fs.statSync(subPath).isDirectory();

        if (isDirectory) {
            const entryPath = path.resolve(subPath, 'index.js');
            entryConfigs[file] = entryPath;

            exportsConfig[`./${file}`] = {
                import: `./dist/${file}.js`
            };
        }
    });

    const pkgPath = path.resolve(process.cwd(), 'package.json');
    const pkg = JSON.parse(require('fs').readFileSync(pkgPath, 'utf-8'));
    pkg.exports = exportsConfig;
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
}
module.exports = { handleImportModules, handlePackageExport }