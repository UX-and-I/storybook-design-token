import React from 'react';

import { Token, TokenPresenter } from '../types/token.types';
import { AnimationPresenter } from './presenter/AnimationPresenter';
import { BorderPresenter } from './presenter/BorderPresenter';
import { BorderRadiusPresenter } from './presenter/BorderRadiusPresenter';
import { ColorPresenter } from './presenter/ColorPresenter';
import { EasingPresenter } from './presenter/EasingPresenter';
import { EmptyPresenter } from './presenter/EmptyPresenter';
import { FontFamilyPresenter } from './presenter/FontFamilyPresenter';
import { FontSizePresenter } from './presenter/FontSizePresenter';
import { FontWeightPresenter } from './presenter/FontWeightPresenter';
import { LineHeightPresenter } from './presenter/LineHeightPresenter';
import { OpacityPresenter } from './presenter/OpacityPresenter';
import { ShadowPresenter } from './presenter/ShadowPresenter';
import { SpacingPresenter } from './presenter/SpacingPresenter';
import { SvgPresenter } from './presenter/SvgPresenter';

interface TokenPreviewProps {
  token: Token;
}

export const TokenPreview = ({ token }: TokenPreviewProps) => {
  const presenter = token.presenter;

  switch (presenter) {
    case TokenPresenter.ANIMATION:
      return <AnimationPresenter token={token} />;
    case TokenPresenter.BORDER:
      return <BorderPresenter token={token} />;
    case TokenPresenter.BORDER_RADIUS:
      return <BorderRadiusPresenter token={token} />;
    case TokenPresenter.COLOR:
      return <ColorPresenter token={token} />;
    case TokenPresenter.EASING:
      return <EasingPresenter token={token} />;
    case TokenPresenter.FONT_FAMILY:
      return <FontFamilyPresenter token={token} />;
    case TokenPresenter.FONT_SIZE:
      return <FontSizePresenter token={token} />;
    case TokenPresenter.FONT_WEIGHT:
      return <FontWeightPresenter token={token} />;
    case TokenPresenter.GRADIENT:
      return <ColorPresenter token={token} />;
    case TokenPresenter.LINE_HEIGHT:
      return <LineHeightPresenter token={token} />;
    case TokenPresenter.OPACITY:
      return <OpacityPresenter token={token} />;
    case TokenPresenter.SHADOW:
      return <ShadowPresenter token={token} />;
    case TokenPresenter.SPACING:
      return <SpacingPresenter token={token} />;
    case TokenPresenter.SVG:
      return <SvgPresenter token={token} />;
  }

  return <EmptyPresenter />;
};
