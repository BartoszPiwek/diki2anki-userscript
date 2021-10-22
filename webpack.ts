import * as path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import * as TerserPlugin from 'terser-webpack-plugin';

export default {
	resolve: {
		unsafeCache: false,
		symlinks: false,
		extensions: [".ts", ".js", ".tsx"],
	},
	optimization: {
		splitChunks: { chunks: "all" },
		moduleIds: 'named',
		minimize: true,
		minimizer: [
			new TerserPlugin({
				extractComments: true,
			}),
		],
	},
	mode: 'production',
	target: 'web',
	entry: [
		'./src/index.ts',
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[contenthash].js',
		chunkFilename: '[name].[chunkhash].bundle.js',
		publicPath: '',
	},
	plugins: [
		new CleanWebpackPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.ts?$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']
						}
					},
					{
						loader: "ts-loader",
					},
				]
			}
		]
	}
};
