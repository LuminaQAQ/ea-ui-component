import { readdirSync, statSync } from "fs";
import { resolve } from "path";


const dir = resolve(process.cwd(), 'src/components');
const entryConfigs = {
    index: resolve(process.cwd(), 'src/components/index.js'),
};

readdirSync(dir).forEach((file) => {
    const isDirectory = statSync(resolve(dir, file)).isDirectory();

    if (isDirectory) {
        entryConfigs[file] = resolve(process.cwd(), `src/components/${file}/index.js`)
    }
});

export default entryConfigs