import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import svelte from 'rollup-plugin-svelte';
import babel from 'rollup-plugin-babel';
import sass from 'rollup-plugin-sass';
import { terser } from 'rollup-plugin-terser';
import config from 'sapper/config/rollup.js';
import pkg from './package.json';
import sveltePreprocess from 'svelte-preprocess';
import resolveAlias from 'rollup-plugin-resolve-alias';
const path = require("path");
import alias from 'rollup-plugin-alias';
const mode = process.env.NODE_ENV;
import fs from 'fs'
const dev = mode === 'development';
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

const onwarn = (warning, onwarn) => (warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) || onwarn(warning);
const dedupe = importee => importee === 'svelte' || importee.startsWith('svelte/');

const preprocess = sveltePreprocess({
	scss: {
	  includePaths: ['src'],
	},
	postcss: {
	  plugins: [require('autoprefixer')],
	},
  });

const componentsFolder = `${__dirname}/src/components/`
let arrEntries = []
const arrComponents = fs.readdirSync(componentsFolder).map(filename => filename.substring(0, filename.length - 7))
arrEntries = arrComponents.map(component => {
	return { find: "@components/" + component, replacement: `${componentsFolder}${component}.svelte` }
})
arrEntries.push({ find: "@routes", replacement: `${__dirname}/src/routes` })
const aliases = alias({
	resolve: [".svelte"], //optional, by default this will just look for .js files or folders
	entries: [{ find: "@components/", replacement: `${componentsFolder}` }]
})

export default {
	client: {
		input: config.client.input(),
		output: config.client.output(),
		plugins: [
			alias({
				resolve: ['.svelte'],
				'@components': `${__dirname}/src/components`  // Will check for ./bar.jsx and ./bar.js
			  }),
			
	
			aliases,
			replace({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			svelte({
				dev,
				hydratable: true,
				emitCss: true,
				preprocess,
			}),
			resolve({
				browser: true,
				dedupe
			}),
			commonjs(),

			legacy && babel({
				extensions: ['.js', '.mjs', '.html', '.svelte'],
				runtimeHelpers: true,
				exclude: ['node_modules/@babel/**'],
				presets: [
					['@babel/preset-env', {
						targets: '> 0.25%, not dead'
					}]
				],
				plugins: [
					'@babel/plugin-syntax-dynamic-import',
					['@babel/plugin-transform-runtime', {
						useESModules: true
					}]
				]
			}),

			!dev && terser({
				module: true
			})
		],

		onwarn,
	},

	server: {
		input: config.server.input(),
		output: config.server.output(),
		plugins: [
			sass(),
			replace({
				'process.browser': false,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			svelte({
				generate: 'ssr',
				dev,
				preprocess,
			}),
			resolve({
				dedupe
			}),
			commonjs()
		],
		external: Object.keys(pkg.dependencies).concat(
			require('module').builtinModules || Object.keys(process.binding('natives'))
		),

		onwarn,
	},

	serviceworker: {
		input: config.serviceworker.input(),
		output: config.serviceworker.output(),
		plugins: [
			resolve(),
			replace({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			commonjs(),
			!dev && terser()
		],

		onwarn,
	}
};
