const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    // npm run build target directory
    outputDir: '../src/main/resources/static',
    devServer: {
        proxy: 'http://localhost'
    },
    transpileDependencies: true,
})