const packageJson = require("./package");
const fs = require("fs");

const modules = packageJson.dependencies;
let nodeModules = {};
Object.keys(modules).forEach(mod => {
    nodeModules[mod] = "commonjs " + mod;
});

module.exports =  {
      entry: {
          "renderer": "./src/renderer.jsx",
      },

      output: { 
          publicPath: "build/",
          path      : __dirname + "/build/",
          filename  : "[NAME]-bundle.js"
          /* further filled below */ 
      },

      module: {
          preLoaders: [
              { test: /\.jsx$/, exclude: /node_modules/, loader: "eslint-loader"}
          ],
          loaders: [
              { test: /\.jsx$/, exclude: /node_modules/, loader: "babel-loader?cacheDirectory"},
              { test: /\.json$/, loader: "json-loader?context=." }
          ]
      },

      externals: nodeModules,

      resolve: {
          // allow require('file') instead of require('file.jsx')
          extensions: ["", ".jsx", ".js", ".json", ".ts"] ,
          root: [
              __dirname + "/src"
          ]
      },
      resolveLoader: { 
            alias: {
                'copy': 'file-loader?name=[path][name].[ext]&context=./',
            }
      },
      target: 'node'
  };