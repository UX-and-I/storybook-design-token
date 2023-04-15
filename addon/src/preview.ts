import type { Renderer, ProjectAnnotations } from "@storybook/types";
import { PARAM_KEY } from "./constants";

const preview: ProjectAnnotations<Renderer> = {
  decorators: [],
  globals: {
    [PARAM_KEY]: false,
  },
};

export default preview;
