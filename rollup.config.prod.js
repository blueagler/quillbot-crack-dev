import { defineConfig } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import summary from 'rollup-plugin-summary';
import progress from 'rollup-plugin-progress';

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
    }),
    terser({
      compress: {
        ecma: 6
      },
      output: {
        comments: false
      }
    }),
    summary(),
    progress()
  ]
})