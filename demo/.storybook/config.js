import { configure, addParameters } from '@storybook/react';

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

const cssReq = require.context(
  '!!raw-loader!../src/token',
  true,
  /_variables\.css$/
);
const cssTokenFiles = cssReq.keys().map(filename => cssReq(filename).default);

const scssReq = require.context(
  '!!raw-loader!../src/token',
  true,
  /_variables\.scss$/
);
const scssTokenFiles = scssReq
  .keys()
  .map(filename => scssReq(filename).default);

const svgIconsReq = require.context(
  '!!raw-loader!../src/assets/icons',
  true,
  /.\.svg$/
);
const svgIconTokenFiles = svgIconsReq
  .keys()
  .map(filename => svgIconsReq(filename).default);

addParameters({
  designToken: {
    files: {
      css: cssTokenFiles,
      scss: scssTokenFiles,
      svgIcons: svgIconTokenFiles
    }
  },
  options: {
    panelPosition: 'right'
  }
});

configure(loadStories, module);
