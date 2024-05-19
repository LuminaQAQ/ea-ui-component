const path = require('path');

module.exports = {
    entry: './index.js',
    output: {
        filename: 'ea-ui.js',
        path: path.resolve(__dirname, 'dist')
    }
};
