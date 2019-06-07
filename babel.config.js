module.exports = {
  presets: [
    [
      '@babel/preset-env',
      '@babel/preset-typescript',
      {
        targets: {
          node: 'current'
        }
      }
    ]
  ]
};
