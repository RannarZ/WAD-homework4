const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    hot: true, // Enable hot module replacement
    watchFiles: ['src/**/*'], // Correct property for file watching
    port: 8080, // Default port
  },
});
