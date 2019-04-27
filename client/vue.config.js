const path = require('path');

module.exports = {
  outputDir: path.resolve(__dirname, '../server/dist/main/public'),
  devServer: {
    port: 8080
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [path.resolve(__dirname, './src/styles/global.scss')],
    },
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/styles/global.scss";`
      }
    }
  }
};
