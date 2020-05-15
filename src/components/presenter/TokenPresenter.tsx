import * as React from 'react';

import { Token } from '../../interfaces/token.interface';
import { AnimationToken } from './AnimationToken';
import { BorderRadiusToken } from './BorderRadiusToken';
import { BorderToken } from './BorderToken';
import { ColorToken } from './ColorToken';
import { EasingToken } from './EasingToken';
import { FontFamilyToken } from './FontFamily';
import { FontSizeToken } from './FontSizeToken';
import { FontWeightToken } from './FontWeightToken';
import { GradientToken } from './GradientToken';
import { LineHeightToken } from './LineHeightToken';
import { OpacityToken } from './OpacityToken';
import { ShadowToken } from './ShadowToken';
import { SpacingToken } from './SpacingToken';
import { SvgToken } from './SvgToken';

interface Props {
  token: Token;
  type: string;
}

const renderMatchingPresenter = (type: string, property: Token) => {
  switch (type) {
    case 'Animation':
      return <AnimationToken animation={property.value} />;
    case 'Border':
      return <BorderToken border={property.value} />;
    case 'BorderRadius':
      return <BorderRadiusToken borderRadius={property.value} />;
    case 'Color':
      return <ColorToken color={property.value} />;
    case 'Easing':
      return <EasingToken easing={property.value} />;
    case 'FontFamily':
      return <FontFamilyToken fontFamily={property.value} />;
    case 'FontSize':
      return <FontSizeToken fontSize={property.value} />;
    case 'FontWeight':
      return <FontWeightToken fontWeight={+property.value} />;
    case 'Gradient':
      return <GradientToken gradient={property.value} />;
    case 'LineHeight':
      return <LineHeightToken lineHeight={+property.value} />;
    case 'Opacity':
      return <OpacityToken opacity={+property.value} />;
    case 'Shadow':
      return <ShadowToken shadow={property.value} />;
    case 'Spacing':
      return <SpacingToken spacing={property.value} />;
    case 'Svg':
      return <SvgToken svg={property.value} />;
    default:
      return <></>;
  }
};

export const TokenPresenter = (props: Props) => {
  return renderMatchingPresenter(props.type, props.token);
};
