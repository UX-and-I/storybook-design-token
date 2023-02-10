⚠️ **This is the documentation for v2. Please check the "v\*" branches for documentation of older versions.** ⚠️

# Storybook Design Token Addon

[![Netlify Status](https://api.netlify.com/api/v1/badges/de6a7567-7e09-4753-a3b9-5a058dc8f03f/deploy-status)](https://app.netlify.com/sites/storybook-design-token-v1/deploys)

Display design token documentation generated from your stylesheets and icon files. Preview design token changes in the browser. Add your design tokens to your Storybook Docs pages using the custom Doc Blocks.

**[Show me the demo](https://storybook-design-token-v1.netlify.app/?path=/story/components-button--button)**

![Teaser image](docs/teaser.png)

**Contents:**

- [Storybook Design Token Addon](#storybook-design-token-addon)
  - [Get started](#get-started)
  - [Available presenters](#available-presenters)
  - [Advanced configuration](#advanced-configuration)
    - [Default tab](#default-tab)
    - [Style injection](#style-injection)
    - [Disable the addon panel](#disable-the-addon-panel)
    - [Token search visibility](#token-search-visibility)
    - [Pagination](#pagination)
    - [Specify a custom glob for your token files](#specify-a-custom-glob-for-your-token-files)
    - [Preserve CSS variables](#preserve-css-variables)
  - [Design Token Doc Block](#design-token-doc-block)
  - [Browser support](#browser-support)
  - [Migration from v0.x.x and v1.x.x](#migration-from-v0xx-and-v1xx)

## Get started

First, install the addon.

```sh
$ yarn add --dev storybook-design-token
# or
$ npm add --save-dev storybook-design-token
```

Add the addon to your storybook addon list inside `.storybook/main.js`:

```javascript
module.exports = {
  addons: ['storybook-design-token']
};
```

The last step is to annotate your design tokens with a category name and a presenter. You can do this by adding special comment blocks to your stylesheets. Below is an example of a css stylesheet defining three categories ("Animations", "Colors", "Others"). It works the same way for scss and less files.

```css
:root {
  /**
  * @tokens Animations
  * @presenter Animation
  */

  --animation-rotate: rotate 1.2s infinite cubic-bezier(0.55, 0, 0.1, 1);

  /**
  * @tokens Colors
  * @presenter Color
  */

  --b100: hsl(240, 100%, 90%); /* Token Description Example  @presenter Color */
  --b200: hsl(240, 100%, 80%);
  --b300: hsl(240, 100%, 70%);

  /**
  * @tokens Others
  */
  --border-normal: 3px dashed red; /* Token Description Example @presenter BorderRadius */
}
```

The presenter controls how your token previews are rendered. See the next section for a complete list of available presenters. You can omit the presenter definition if you don't want to render a preview or no presenter works with your token.

By default, a token category ends with the comment block of the next category. If you want to end a category block before the next category comment, you can insert a special comment to end the block early:

```css
/**
  * @tokens-end
  */
```

To list your svg icons, the addon parses your svg files searching for svg elements. **Important: Only svg elements with an `id` or `data-token-name` attribute are added to the token list.** You can provide descriptions and category names for your icons using the (optional) attributes `data-token-description` and `data-token-category`.

## Available presenters

Please check the **[demo](https://storybook-design-token-v1.netlify.app/?path=/story/components-button--button)** to see the presenters in action.

- Animation
- Border
- BorderRadius
- Color
- Easing
- FontFamily
- FontSize
- FontWeight
- LetterSpacing
- LineHeight
- Opacity
- Shadow
- Spacing

## Advanced configuration

### Default tab

You can specify the default tab shown in the addon panel. Set it to the corresponding category name.

`.storybook/preview.js`

```javascript
export const parameters = {
  designToken: {
    defaultTab: 'Colors'
  }
};
```

### Style injection

To inject styles needed by your design token documentation, use the `styleInjection` parameter. A typical usecase are web fonts needed by your font family tokens. Please note that the styleInjection parameter only works with valid css.

`.storybook/preview.js`

```javascript
export const parameters = {
  designToken: {
    styleInjection:
      '@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");'
  }
};
```

### Disable the addon panel

In some cases you might only want to use the Doc Blocks and hide the addon panel. You can do so by the setting the `disable` parameter:

```javascript
export const parameters = {
  designToken: {
    disable: true
  }
};
```

### Token search visibility

In some cases you might not need the search field to be visible. You can control its visibility by the setting the `showSearch` parameter:

```javascript
export const parameters = {
  designToken: {
    showSearch: false
  }
};
```

### Pagination

By default `pageSize` of card view is 50 items. You can configure it by the setting the `pageSize` parameter:

```javascript
export const parameters = {
  designToken: {
    pageSize: 3,
  }
};
```

You can disable pagination in the following way:

```javascript
export const parameters = {
  designToken: {
    // specify max value to disable pagination
    pageSize: Number.MAX_VALUE,
  }
};
```

### Specify a custom glob for your token files

By default, the addon parses all `.css`, `.scss`, `.less`, `.svg`, `.jpeg`, `.png` and `.gif` files of your code base for annotated design tokens. If you only want to parse specific files, you can pass a [glob](https://github.com/isaacs/node-glob) via the `DESIGN_TOKEN_GLOB` environment variable or via an option in your `main.js`.

For example:

```
DESIGN_TOKEN_GLOB=**/*.tokens.{css,scss,less,svg}
```

### Preserve CSS variables

By default, the addon extracts values of CSS variables at build time. As a result, presenters use fixed values at runtime. This behavior might impose limitations in some scenarios:

- Stylesheet with CSS variables is loaded separately from tokens
- Theme is replaced at runtime and new values of CSS variables are loaded

If you want to preserve CSS variables in the presenters, enable `preserveCSSVars` option in your `main.js` file:

```javascript
module.exports = {
  stories: [
    // stories
  ],
  addons: [
    { name: 'storybook-design-token', options: { preserveCSSVars: true } }
  ]
  // other options
};
```

## Design Token Doc Block

This addon comes with a custom Storybook Doc Block allowing you to display your design token documentation inside docs pages.

```tsx
// colors.stories.mdx

import { DesignTokenDocBlock } from 'storybook-design-token/dist/doc-blocks';

<DesignTokenDocBlock categoryName="Colors" maxHeight={600} viewType="card" />;
```

The `categoryName` parameter references your token category name (the part after `@tokens` in your stylesheet annotations). The `viewType` parameter can be set to `card` or `table` to switch between both presentations. In some cases you might want to hide the token values. You can do that by passing `showValueColumn={false}`.
Check the [demo file](https://github.com/UX-and-I/storybook-design-token/blob/v1/demo/src/design-tokens/colors.stories.mdx) for usage examples.

## Browser support

- All modern browsers
- Internet Explorer 11

## Migration from v0.x.x and v1.x.x

- Please check the [Get started](#get-started) section for the updated addon configuration.
- The `files` property required in earlier versions has been removed. Please delete it from your `.storybook/preview.js`. You are no longer required to load the token files inside `.storybook/preview.js`.
