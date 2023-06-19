// 打包体积和依赖关系可视化插件
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
module.exports = {
    // 代理
    devServer: {
        proxy: 'http://localhost:36742'
    },
    // webpack 插件
    chainWebpack: (config) => {
        // 新增一个`hot-hash-webpack-plugin`
        // 注意：这里use的时候不需要使用`new HotHashWebpackPlugin()`
        config.plugin('BundleAnalyzerPlugin')
              .use(BundleAnalyzerPlugin, [{ version: '4.9.0' }]);
    }
}
