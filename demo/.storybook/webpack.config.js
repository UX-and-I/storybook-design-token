const path = require('path');

module.exports = ({ config }) => {
  // add svg sprite loader
  config.module.rules = config.module.rules.map(f =>
    f.test.toString() !== '/svg|/'
      ? { ...f, test: new RegExp(f.test.toString().replace('svg|', '')) }
      : f
  );

  config.module.rules.push({
    test: /\.svg$/,
    loaders: [
      {
        loader: 'svg-sprite-loader'
      }
    ]
  });

  // add postcss
  config.module.rules = config.module.rules.filter(
    f => f.test.toString() !== '/\\.css$/'
  );

  config.module.rules.push({
    test: /\.css$/,
    loaders: [
      'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          plugins: [
            require('autoprefixer')(),
            require('postcss-preset-env')({ stage: 0 })
          ]
        }
      }
    ],
    include: path.resolve(__dirname, '../')
  });

  // add typescript loader
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [['react-app', { flow: false, typescript: true }]]
    }
  });

  config.resolve.extensions.push('.ts', '.tsx');

  return config;
};
