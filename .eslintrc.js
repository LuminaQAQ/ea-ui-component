module.exports = {
    settings: {
        'import/resolver': {
            alias: {
                map: [
                    ['@', './src'],
                    ['@components', './src/components'],
                    ['@themes', './src/themes'],
                    ['@utils', './src/utils'],
                    ['@common', './src/common'],
                ],
                extensions: ['.js', '.jsx', '.json']
            }
        }
    }
}