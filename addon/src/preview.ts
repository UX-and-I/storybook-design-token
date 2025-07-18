import { ProjectAnnotations, Renderer } from "storybook/internal/types";
import { PARAM_KEY } from "./constants";

const preview: ProjectAnnotations<Renderer> = {
  decorators: [],
  initialGlobals: {
    [PARAM_KEY]: false,
  },
};

export default preview;
