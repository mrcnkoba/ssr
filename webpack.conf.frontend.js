module.exports =  {
    entry: {
        "browser": "./src/browser.jsx"
    },

    output: { 
        publicPath: "",
        path      : __dirname + "/build/assets",
        filename  : "[NAME]-bundle.js"
        /* further filled below */ 
    },

    devServer: {
        inline: true
    },

    module: {
        preLoaders: [
            { test: /\.jsx$/, exclude: /node_modules/, loader: "eslint-loader"}
        ],
        loaders: [
            { test: /\.jsx$/, exclude: /node_modules/, loader: "babel-loader?cacheDirectory"}
        ]
    },

    resolve: {
        // allow require('file') instead of require('file.jsx')
        extensions: ["", ".jsx", ".js", ".json", ".ts"] ,
        root: [
            __dirname + "/src"
        ]
    }
};