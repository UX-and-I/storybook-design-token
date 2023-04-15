import { addons, types } from "@storybook/manager-api";
import { Panel } from "./Panel";
import { ADDON_ID, PANEL_ID } from "./constants";

addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: "Design Tokens",
    match: ({ viewMode }) => viewMode === "story",
    render: Panel,
  });
});
