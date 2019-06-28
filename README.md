# Storybook Design Token Addon

[![Netlify Status](https://api.netlify.com/api/v1/badges/9653289f-792d-4461-bb32-2ded5108b291/deploy-status)](https://app.netlify.com/sites/storybook-design-token/deploys)

The Storybook Design Token Addon allows you to generate design token documentation from your stylesheets.

[**DEMO**](https://storybook-design-token.netlify.com)

**Contents:**
- [Storybook Design Token Addon](#Storybook-Design-Token-Addon)
  - [Some Features](#Some-Features)
  - [Installation](#Installation)
  - [Usage](#Usage)
  - [Presenters](#Presenters)
  - [Roadmap](#Roadmap)

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

In your `config.js` in your .storybook directory: tell the plugin what files to parse. **Important:** Call `addParameters` before making the `configure` call.

```js
// config.js
import { configure, addParameters } from '@storybook/react';

// [...]

const cssReq = require.context('!!raw-loader!../src', true, /.\.css$/);
const cssTokenFiles = cssReq.keys().map(filename => ({ filename, content: cssReq(filename).default }));

const scssReq = require.context('!!raw-loader!../src', true, /.\.scss$/);
const scssTokenFiles = scssReq.keys().map(filename => ({ filename, content: scssReq(filename).default }));

const svgIconsReq = require.context('!!raw-loader!../src', true, /.\.svg$/);
const svgIconTokenFiles = svgIconsReq.keys().map(filename => ({ filename, content: svgIconsReq(filename).default }));

addParameters({
  designToken: {
    files: { 
      css: cssTokenFiles,
      scss: scssTokenFiles,
      svgIcons: svgIconTokenFiles
    }
  }
});

// [...]

configure(loadStories, module);
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

**SVG example:**

```html
<?xml version="1.0" encoding="UTF-8"?>
<svg data-token-name="check" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" 
  xmlns="http://www.w3.org/2000/svg" 
  xmlns:xlink="http://www.w3.org/1999/xlink">
  <path d="M9.35221912,16.3536125 L19.5004166,5.34255149 C19.9029667,4.90884428 20.5808871,4.88358644 21.0145944,5.28613652 C21.4483016,5.6886866 21.4735594,6.36660707 21.0710093,6.80031428 L10.1375155,18.6574532 C9.71359736,19.1141823 8.99084087,19.1141823 8.56692275,18.6574532 L3.28613652,12.890538 C2.88358644,12.4568308 2.90884428,11.7789103 3.34255149,11.3763602 C3.77625869,10.9738101 4.45417917,10.999068 4.85672925,11.4327752 L9.35221912,16.3536125 Z" fill="currentColor"></path>
</svg>
```

Make sure to specify the `data-token-name` attribute.

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
