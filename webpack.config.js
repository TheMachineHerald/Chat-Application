module.exports = {
	entry: "./src/index.js",
	output: {
		path: __dirname + "/public",
		publicPath: "/",
		filename: "bundle.js"
	},
	devServer: {
		static: "./public"
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ["babel-loader"]
			},
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"]
			},
			{
				test: /\.scss$/,
				use: [
					"style-loader",
					"css-loader",
					"sass-loader"
				]
			}
		]
	}
}