import * as React from 'react';

import { parseVariables } from '../../parsers/variables.parser';
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
import { TokenGroup } from 'src/interfaces/token-group.interface';

interface Props {
  tokenGroups: TokenGroup[];
  token: Token;
  type: string;
}

const renderMatchingPresenter = (type: string, property: Token, catalog: TokenGroup[]) => {
  const value = parseVariables(property.value, catalog);
  switch (type) {
    case 'Animation':
      return <AnimationToken animation={value} />;
    case 'Border':
      return <BorderToken border={value} />;
    case 'BorderRadius':
      return <BorderRadiusToken borderRadius={value} />;
    case 'Color':
      return <ColorToken color={value} />;
    case 'Easing':
      return <EasingToken easing={value} />;
    case 'FontFamily':
      return <FontFamilyToken fontFamily={value} />;
    case 'FontSize':
      return <FontSizeToken fontSize={value} />;
    case 'FontWeight':
      return <FontWeightToken fontWeight={+value} />;
    case 'Gradient':
      return <GradientToken gradient={value} />;
    case 'LineHeight':
      return <LineHeightToken lineHeight={+value} />;
    case 'Opacity':
      return <OpacityToken opacity={+value} />;
    case 'Shadow':
      return <ShadowToken shadow={value} />;
    case 'Spacing':
      return <SpacingToken spacing={value} />;
    case 'Svg':
      return <SvgToken svg={value} />;
    default:
      return <></>;
  }
};

export const TokenPresenter = (props: Props) => {
  return renderMatchingPresenter(props.type, props.token, props.tokenGroups);
};
