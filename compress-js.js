const fs = require('fs');
const path = require('path');
const glob = require('glob');
const Terser = require('terser');

const inputDir = './components/'; // 替换为你的源文件夹路径
const outputDir = './build'; // 替换为你的目标文件夹路径

// 确保输出目录存在
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// 查找所有的 JavaScript 文件
glob(`${inputDir}/**/*.js`, async (err, files) => {
    if (err) {
        console.error('Error finding files:', err);
        return;
    }

    for (const file of files) {
        try {
            const code = fs.readFileSync(file, 'utf8');
            const result = await Terser.minify(code);

            if (result.error) {
                console.error(`Error minifying ${file}:`, result.error);
                continue;
            }

            // 生成目标文件路径
            const relativePath = path.relative(inputDir, file);
            const outputPath = path.join(outputDir, relativePath);

            // 确保输出目录存在
            const outputDirPath = path.dirname(outputPath);
            if (!fs.existsSync(outputDirPath)) {
                fs.mkdirSync(outputDirPath, { recursive: true });
            }

            // 写入压缩后的文件
            fs.writeFileSync(outputPath, result.code, 'utf8');
            console.log(`Minified ${file} -> ${outputPath}`);
        } catch (error) {
            console.error(`Error processing ${file}:`, error);
        }
    }
});