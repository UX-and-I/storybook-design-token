import * as React from 'react';

import addons from '@storybook/addons';

import { DesignTokenPanel } from './components/Panel';
import { CssParser } from './parsers/css.parser';
import { ScssParser } from './parsers/scss.parser';
import { SvgIconParser } from './parsers/svg-icon.parser';
import { ADDON_ID, PANEL_ID, PANEL_TITLE } from './shared';

addons.register(ADDON_ID, api => {
  const channel = addons.getChannel();

  addons.addPanel(PANEL_ID, {
    title: PANEL_TITLE,
    render: ({ active }) => {
      const storyData: any = api.getCurrentStoryData();
      const cssParser = new CssParser();
      const scssParser = new ScssParser();
      const svgIconParser = new SvgIconParser();
      const files = storyData ? storyData.parameters.designToken.files : [];

      const parsedCss = cssParser.parse(files);
      const parsedScss = scssParser.parse(files);
      const parsedSvgIcons = svgIconParser.parse(files);

      const parsed = {
        keyframes: parsedCss.keyframes + parsedScss.keyframes,
        tokenGroups: [
          ...parsedCss.tokenGroups,
          ...parsedScss.tokenGroups,
          ...parsedSvgIcons.tokenGroups
        ]
      };

      return (
        <DesignTokenPanel
          channel={channel}
          api={api}
          active={active}
          keyframes={parsed.keyframes}
          tokenGroups={parsed.tokenGroups}
        />
      );
    }
  });
});
