import jsdoc from 'rollup-plugin-jsdoc'
import { uglify } from 'rollup-plugin-uglify'

export default {
  input: 'js/console.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: './console.min.js'
  },
  plugins: [    
    jsdoc({
      args: [],
      config: 'jsdoc.config.json'
    }),
    //uglify()
  ]
}
