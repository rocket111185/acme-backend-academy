import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from "rollup-plugin-css-only";

const isDev = Boolean(process.env.ROLLUP_WATCH);

export default [
    // Browser bundle
    {
        input: 'app/client/main.js',
        output: {
            sourcemap: true,
            format: 'iife',
            name: 'app',
            file: 'app/public/bundle.js',
        },
        plugins: [
            css({ output: 'bundle.css' }),
            svelte({
                compilerOptions: {
                    hydratable: true,
                    // css: (css) => {
                    //     css.write('app/public/bundle.css');
                    // },
                },
            }),
            resolve(),
            commonjs(),
            // App.js will be built after bundle.js, so we only need to watch that.
            // By setting a small delay the Node server has a chance to restart before reloading.
            isDev &&
                livereload({
                    watch: 'app/public/App.js',
                    delay: 200,
                }),
            !isDev && terser(),
        ],
    },
    // Server bundle
    {
        input: 'app/client/App.svelte',
        output: {
            exports: 'default',
            sourcemap: false,
            format: 'cjs',
            name: 'app',
            file: 'app/public/App.js',
        },
        plugins: [
            css({ output: 'bundle.css' }),
            svelte({
                compilerOptions: {
                    generate: 'ssr',
                },
            }),
            resolve(),
            commonjs(),
            !isDev && terser(),
        ],
    },
];
