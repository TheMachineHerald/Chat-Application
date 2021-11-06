module.exports = {
	entry: "./src/index.tsx",
	output: {
		path: __dirname + "/public",
		publicPath: "/",
		filename: "bundle.js"
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"]
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
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				use: ["ts-loader"]
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