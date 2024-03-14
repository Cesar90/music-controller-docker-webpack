import { BuildOptions } from "./types/config";
import webpack from 'webpack';
import { buildPlugins } from "./buildPlugins";
import { buildLoaders } from "./buildLoaders";
import { buildResolvers } from "./buildResolvers";
import { buildDevServer } from "./buildDevServer";

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
    const { paths, mode } = options;
    return {
        mode,
        entry: paths.entry,
        output: {
            // filename: '[name].[cotenthash].js',
            filename: "[name].js",
            path: paths.build,
            clean: true,
        },
        plugins: buildPlugins(options),
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        module: {
            rules: buildLoaders(),
        },
        resolve: buildResolvers(),
        devtool: 'inline-source-map',
        devServer: buildDevServer(options),
    }
}