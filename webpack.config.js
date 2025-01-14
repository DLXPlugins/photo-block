const path = require( 'path' );
const defaultConfig = require( './node_modules/@wordpress/scripts/config/webpack.config' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const RemoveEmptyScriptsPlugin = require( 'webpack-remove-empty-scripts' );
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );
module.exports = ( env ) => {
	return [
		{
			...defaultConfig,
			module: {
				...defaultConfig.module,
				rules: [ ...defaultConfig.module.rules ],
			},
			mode: env.mode,
			devtool: env.mode === 'production' ? false : 'source-map',
		},
		{
			entry: {
				'dlx-photo-block-style': [ './src/scss/block-backend-frontend.scss' ],
				'dlx-css-gram': [ './src/scss/cssgram/cssgram.scss' ],
				'dlx-react-crop': [ './node_modules/react-image-crop/dist/ReactCrop.css' ],
				'dlx-filepond': [ './src/plugins/Filepond/index.js', './node_modules/filepond/dist/filepond.css' ],
				'dlx-filepond-image-preview': [ './node_modules/filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css' ],
				'dlx-pb-admin': [ './src/admin/index.js' ],
				'dlx-pb-admin-css': [ './src/scss/admin.scss' ],
			},
			mode: env.mode,
			devtool: 'production' === env.mode ? false : 'source-map',
			output: {
				filename: '[name].js',
				sourceMapFilename: '[file].map[query]',
				assetModuleFilename: 'fonts/[name][ext]',
				clean: true,
			},
			module: {
				rules: [
					{
						test: /\.(js|jsx)$/,
						exclude: /(node_modules|bower_components)/,
						loader: 'babel-loader',
						options: {
							presets: [ '@babel/preset-env', '@babel/preset-react' ],
							plugins: [
								'@babel/plugin-proposal-class-properties',
								'@babel/plugin-transform-arrow-functions',
								'lodash',
							],
						},
					},
					{
						test: /\.scss$/,
						exclude: /(node_modules|bower_components)/,
						use: [
							{
								loader: MiniCssExtractPlugin.loader,
							},
							{
								loader: 'css-loader',
								options: {
									sourceMap: true,
								},
							},
							{
								loader: 'resolve-url-loader',
							},
							{
								loader: 'sass-loader',
								options: {
									sourceMap: true,
								},
							},
						],
					},
					{
						test: /\.css$/,
						use: [
							{
								loader: MiniCssExtractPlugin.loader,
							},
							{
								loader: 'css-loader',
								options: {
									sourceMap: true,
								},
							},
							'sass-loader',
						],
					},
					{
						test: /\.(woff2?|ttf|otf|eot|svg)$/,
						include: [ path.resolve( __dirname, 'fonts' ) ],
						exclude: /(node_modules|bower_components)/,
						type: 'asset/resource',
					},
				],
			},
			plugins: [ new RemoveEmptyScriptsPlugin(), new MiniCssExtractPlugin(), new DependencyExtractionWebpackPlugin() ],
		},
	];
};

