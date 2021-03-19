import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

const tokenContext = require.context(
  '!!raw-loader!../src',
  true,
  /.\.(css|less|scss|svg)$/
);

const tokenFiles = tokenContext.keys().map(function (filename) {
  return { filename: filename, content: tokenContext(filename).default };
});

export const parameters = {
  designToken: {
    defaultTab: 'Colors',
    files: tokenFiles,
    styleInjection:
      '@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");'
  }
};
