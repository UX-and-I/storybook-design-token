import { addons, types } from "storybook/manager-api";
import { Panel } from "./Panel";
import { ADDON_ID, PANEL_ID, PARAM_KEY } from "./constants";
import React from "react";

addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: "Design Tokens",
    paramKey: PARAM_KEY,
    match: ({ viewMode }) => viewMode === "story",
    render: ({ active }) => {
      if (!active) {
        return null;
      }
      return React.createElement(Panel, { active });
    },
  });
});
