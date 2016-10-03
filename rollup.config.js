import babel from 'rollup-plugin-babel'

const pkg = require('./package.json')
const external = Object.keys(pkg.dependencies)

export default {
  entry: 'src/index.js',
  plugins: [babel()],
  external: external,
  targets: [{
    dest: pkg['main'],
    format: 'umd',
    moduleName: 'scrollAnimator',
    sourceMap: true
  }, {
    dest: pkg['module'],
    format: 'es',
    sourceMap: true
  }]
}
