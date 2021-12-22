module.exports = {
  presets: [
    ['@babel/preset-env', {
      useBuiltIns: 'usage',
      corejs: 3,
      targets: '> 0.25%, last 2 versions, not dead'
    }],
  ],
  plugins: [
    ['@babel/plugin-transform-runtime'],
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/proposal-class-properties',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-spread',
    '@babel/proposal-object-rest-spread',
  ],
  sourceType: 'unambiguous',
  comments: false,
};
