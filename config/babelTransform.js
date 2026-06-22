const babelJest = require('babel-jest').default;

module.exports = babelJest.createTransformer({
  presets: [
    [
      require.resolve('@babel/preset-env'),
      {
        targets: {
          node: 'current',
        },
      },
    ],
    [
      require.resolve('@babel/preset-react'),
      {
        runtime: 'automatic',
      },
    ],
  ],
  plugins: [
    require.resolve('babel-plugin-transform-import-meta')
  ],
  babelrc: false,
  configFile: false,
});