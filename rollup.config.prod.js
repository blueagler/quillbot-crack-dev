import { defineConfig } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import progress from 'rollup-plugin-progress';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  input: "./src/index.js",
  output: {
    file: "./dist/quillbot.js",
    format: "iife"
  },
  treeshake: 'smallest',
  plugins: [
    alias({
      resolve: ['.js', '.jsx'],
      entries: {
        src: __dirname + '/src',
        analytic: __dirname + '/src/analytic',
        components: __dirname + '/src/components',
        proxy: __dirname + '/src/proxy',
        store: __dirname + '/src/store',
        utils: __dirname + '/src/utils',
        message: __dirname + '/src/message.js',
        hooks: __dirname + '/src/hooks',
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
        'react/jsx-runtime': 'preact/jsx-runtime',
      }
    }),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    babel({
      presets: [
        ['@babel/preset-react',
          {
            "pragma": "h",
            "pragmaFrag": "Fragment",
          }
        ]
      ],
      "plugins": [
        ["@emotion/babel-plugin", {}],
        ['babel-plugin-jsx-pragmatic', {
          module: 'preact',
          import: 'h',
          export: 'h',
        }],
      ],
      babelHelpers: 'bundled',
    }),
    commonjs(),
    nodeResolve({
      extensions: ['.js', '.jsx'],
      mainFields: ["jsnext", "preferBuiltins", "browser"]
    }),
    terser({
      compress: {
        ecma: 9
      },
      output: {
        comments: false
      }
    }),
    progress(),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true
    })
  ]
})