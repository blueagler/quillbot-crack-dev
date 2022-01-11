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
  input: "./src/app.js",
  output: {
    file: "./dist/quillbot.js",
    format: "iife"
  },
  plugins: [
    alias({
      resolve: ['.js'],
      entries: {
        src: __dirname + '/src',
        analytics: __dirname + '/src/analytics',
        check: __dirname + '/src/check',
        hook: __dirname + '/src/hook',
        inject: __dirname + '/src/inject',
        notification: __dirname + '/src/notification',
        message: __dirname + '/src/message',
        store: __dirname + '/src/store',
        utils: __dirname + '/src/utils',
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
      exclude: 'node_modules/**',
      presets: [
        ['@babel/preset-react',
          {
            "pragma": "h",
            "pragmaFrag": "Fragment",
          }
        ]
      ],
      "plugins": [
        ["@emotion/babel-plugin", {}]
      ],
      babelHelpers: 'bundled',
    }),
    commonjs(),
    nodeResolve(),
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