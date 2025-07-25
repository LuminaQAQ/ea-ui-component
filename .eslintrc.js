module.exports = {
    settings: {
        'import/resolver': {
            alias: {
                map: [
                    ['@', './src'],
                    ['@components', './src/components'],
                    ['@themes', './src/themes'],
                    ['@utils', './src/utils'],
                ],
                extensions: ['.js', '.jsx', '.json']
            }
        }
    }
}