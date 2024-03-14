export type BuildMode = 'production' | 'development';

export interface BuildPaths {
    entry: string;
    build: string;
}

export interface BuildOptions {
    mode: BuildMode;
    paths: BuildPaths;
    isDev: boolean;
    port: number;
}