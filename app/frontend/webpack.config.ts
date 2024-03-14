import path from 'path';
import webpack from 'webpack';
import { buildWebpackConfig } from './config/buildwebpack/buildWebpackConfg';
import { BuildPaths } from './config/buildwebpack/types/config';

const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    build: path.resolve(__dirname, "./static/frontend"),
}

const mode = 'development';
const isDev = mode === 'development';
const PORT = 3000;

const config: webpack.Configuration = buildWebpackConfig({
    mode: 'development',
    paths,
    isDev,
    port: PORT
});

export default config;