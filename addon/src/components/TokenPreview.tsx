import React from "react";
import { PresenterProps, Token, TokenPresenter } from "../types/token.types";
import { AnimationPresenter } from "./presenter/AnimationPresenter";
import { BorderPresenter } from "./presenter/BorderPresenter";
import { BorderRadiusPresenter } from "./presenter/BorderRadiusPresenter";
import { ColorPresenter } from "./presenter/ColorPresenter";
import { EasingPresenter } from "./presenter/EasingPresenter";
import { EmptyPresenter } from "./presenter/EmptyPresenter";
import { FontFamilyPresenter } from "./presenter/FontFamilyPresenter";
import { FontSizePresenter } from "./presenter/FontSizePresenter";
import { FontWeightPresenter } from "./presenter/FontWeightPresenter";
import { LineHeightPresenter } from "./presenter/LineHeightPresenter";
import { LetterSpacingPresenter } from "./presenter/LetterSpacingPresenter";
import { OpacityPresenter } from "./presenter/OpacityPresenter";
import { ShadowPresenter } from "./presenter/ShadowPresenter";
import { SpacingPresenter } from "./presenter/SpacingPresenter";
import { SvgPresenter } from "./presenter/SvgPresenter";
import { ImagePresenter } from "./presenter/ImagePresenter";

interface TokenPreviewProps {
  token: Token;
  presenters: PresenterMapType;
}

export const TokenPreview = ({ token, presenters }: TokenPreviewProps) => {
  const presenter = token.presenter;

  const all = { ...PresenterMap, ...(presenters || {}) };

  const PresenterComponent = presenter != null ? all[presenter] : EmptyPresenter;

  return <PresenterComponent token={token} />;
};

export interface PresenterMapType {
  [key: string]: React.FunctionComponent<PresenterProps> | React.ComponentClass<PresenterProps>;
}

const PresenterMap: PresenterMapType = {
  [`${TokenPresenter.ANIMATION}`]: AnimationPresenter,
  [`${TokenPresenter.BORDER}`]: BorderPresenter,
  [`${TokenPresenter.BORDER_RADIUS}`]: BorderRadiusPresenter,
  [`${TokenPresenter.COLOR}`]: ColorPresenter,
  [`${TokenPresenter.EASING}`]: EasingPresenter,
  [`${TokenPresenter.FONT_FAMILY}`]: FontFamilyPresenter,
  [`${TokenPresenter.FONT_SIZE}`]: FontSizePresenter,
  [`${TokenPresenter.FONT_WEIGHT}`]: FontWeightPresenter,
  [`${TokenPresenter.LINE_HEIGHT}`]: LineHeightPresenter,
  [`${TokenPresenter.LETTER_SPACING}`]: LetterSpacingPresenter,
  [`${TokenPresenter.OPACITY}`]: OpacityPresenter,
  [`${TokenPresenter.SHADOW}`]: ShadowPresenter,
  [`${TokenPresenter.SPACING}`]: SpacingPresenter,
  [`${TokenPresenter.SVG}`]: SvgPresenter,
  [`${TokenPresenter.IMAGE}`]: ImagePresenter,
};

//TODO: remove?
export function registerPresenter(name: string, presenter: React.FunctionComponent<PresenterProps> | React.ComponentClass<PresenterProps>) {
  PresenterMap[name] = presenter;
}