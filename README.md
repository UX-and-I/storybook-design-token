# Storybook Design Token Addon

[![Netlify Status](https://api.netlify.com/api/v1/badges/9653289f-792d-4461-bb32-2ded5108b291/deploy-status)](https://app.netlify.com/sites/storybook-design-token/deploys)

The Storybook Design Token Addon allows you to generate design token documentation from your stylesheets.

[**DEMO**](https://storybook-design-token.netlify.com)

**Contents:**
- [Storybook Design Token Addon](#storybook-design-token-addon)
  - [Some Features](#some-features)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Presenters](#presenters)
  - [Roadmap](#roadmap)

## Some Features 

- Automatically generates design token descriptions from your annotated stylesheets and icon files
- Parses CSS, SCSS/SASS and SVG files
- Provides various presenters to render examples of your design tokens
- Automatically detects aliases of your css or sass variables

## Installation

First, install the package using your package manager of choice.

```sh
npm install --save-dev storybook-design-token
```

or

```sh
yarn add --dev storybook-design-token
```

Then create a file called `addons.js` in your .storybook directory and import the plugin:

```js
// addon.js
import 'storybook-design-token/register';
```

Create a file called `config.js` in your .storybook directory and tell the plugin what stylesheets to parse:

```js
// config.js
import { addParameters } from '@storybook/react';

const cssReq = require.context('!!raw-loader!../src', true, /.\.css$/);
const cssTokenFiles = cssReq.keys().map(filename => cssReq(filename));

const scssReq = require.context('!!raw-loader!../src', true, /.\.scss$/);
const scssTokenFiles = scssReq.keys().map(filename => scssReq(filename));

const svgIconsReq = require.context('!!raw-loader!../src', true, /.\.svg$/);
const svgIconTokenFiles = svgIconsReq.keys().map(filename => svgIconsReq(filename));

addParameters({
  designToken: {
    files: { 
      css: cssTokenFiles,
      scss: scssTokenFiles,
      svgIcons: svgIconTokenFiles
    }
  }
});
```

Make sure to specify the right path after `!!raw-loader!`. The path has to be relative to your config file location.

## Usage

The plugin tries to organize your tokens into token groups. You can annotate token groups by adding specific comment blocks to your stylesheets. Only annotated tokens will be listed by the plugin. The specified presenter is used to render examples of your tokens. See [Presenters](#presenters) for further information.

**CSS example:**

```css
/**
 * @tokens Colors
 * @presenter Color
 */

:root {
  --n0: #fff; /* Token Description */
  --n100: #fbfbfb;
  --n200: #edeeef;
  --n300: #e4e5e7;
  --primary: var(--n300);
}

/**
 * @tokens Border Radius
 * @presenter BorderRadius
 */

:root {
  --border-radius-m: 4px;
  --border-radius-l: 8px;
}
```

**SCSS example:**

```scss
/**
 * @tokens Colors
 * @presenter Color
 */

$n0: #fff; /* Token Description */
$n100: #fbfbfb;
$n200: #edeeef;
$n300: #e4e5e7;
$primary: $n300;

/**
 * @tokens Border Radius
 * @presenter BorderRadius
 */

$border-radius-m: 4px;
$border-radius-l: 8px;
```

## Presenters

Presenters are used to render examples for your design tokens. The following presenters are available:

- Animation
- BorderRadius
- Border
- Color
- Easing
- FontFamily
- FontSize
- FontWeight
- LineHeight
- Opacity
- Shadow
- Spacing
- Svg


## Roadmap

- Custom Presenters
- Custom Parsers
