const path = require("path");
module.exports = {
	entry: "./src/index.ts",
	
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js"],
		// fallback: {
		// 	util: false,
		// 	https: false,
		// 	http: false,
		// 	url: false,
		// 	buffer: false,
		// 	crypto: false,
		// 	stream: false,
		// 	zlib: false,
		// 	fs: false,
		// 	os: false,
		// 	path: false
		// },
	},
	output: {
		filename: "index.js",
		path: path.resolve(__dirname, "dist"),
	},
	mode: "development",
};
