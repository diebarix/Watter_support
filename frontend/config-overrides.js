const webpack = require("webpack");
// import webpack from "webpack";
module.exports = config => {
	config.plugins.push(
		new webpack.ProvidePlugin({ Buffer: ["buffer", "Buffer"] })
	);
	return config;
};
