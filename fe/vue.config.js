module.exports = {
  outputDir: "./dist/",
  assetsDir: "static",
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      "^/api/": {
        target: "http://127.0.0.1:8000/api/",
        ws: false
      }
    }
  }
};
