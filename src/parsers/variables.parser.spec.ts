import { TokenGroup } from '../interfaces/token-group.interface';
import { translateKey, translateValue, parseVariables, detectVariables  } from './variables.parser';

const TEST_TOKEN_GROUPS = [
  {
    label: 'Colors',
    tokens: [
      { aliases: ['--white'], key: '--color1', value: '#fff'},
      { aliases: [], key: '--color2', value: '#000'},
      { aliases: [], key: '--gradient1', value: 'linear-gradient(90deg, var(--white) 0%, #0f0 50%, var(--color2) 100%)'},
    ]
  },
  {
    label: 'Colors SCSS',
    tokens: [
      { aliases: ['$white'], key: '$color1', value: '#fff'},
      { aliases: [], key: '$color2', value: '#000'},
      { aliases: [], key: '$gradient1', value: 'linear-gradient(90deg, $white 0%, #0f0 50%, $color2 100%)'},
      { aliases: [], key: '$gradient2', value: 'linear-gradient(90deg, #{$white} 0%, #0f0 50%, #{$color2} 100%)'},
    ]
  },
  {
    label: 'Colors LESS',
    tokens: [
      { aliases: ['@white'], key: '@color1', value: '#fff'},
      { aliases: [], key: '@color2', value: '#000'},
      { aliases: [], key: '@gradient1', value: 'linear-gradient(90deg, @white 0%, #0f0 50%, @color2 100%)'},
    ]
  },
  {
    label: 'Shadows',
    tokens: [
      { aliases: ['--shadow-alias'], key: '--shadow1', value: '0 1px 2px 0 rgba(0, 0, 0, 0.15)'},
      { aliases: [], key: '--shadow2', value: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'},
    ]
  },
  {
    label: 'Shadows SCSS',
    tokens: [
      { aliases: ['$shadow-alias'], key: '$shadow1', value: '0 1px 2px 0 rgba(0, 0, 0, 0.15)'},
      { aliases: [], key: '$shadow2', value: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'},
    ]
  },
  {
    label: 'Shadows LESS',
    tokens: [
      { aliases: ['@shadow-alias'], key: '@shadow1', value: '0 1px 2px 0 rgba(0, 0, 0, 0.15)'},
      { aliases: [], key: '@shadow2', value: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'},
    ]
  }
] as TokenGroup[];

describe('Variables parser', () => {

  describe('translateKey', () => {

    it('should translate CSS key correctly', () => {
      expect(translateKey('var(--variable)')).toEqual('--variable');
      expect(translateKey('var(--variable-1)')).toEqual('--variable-1');
      expect(translateKey('var(--variable--modifier)')).toEqual('--variable--modifier');
      expect(translateKey('var(--otherVariable)')).toEqual('--otherVariable');
    });

    it('should not translate SCSS key', () => {
      expect(translateKey('$variable')).toEqual('$variable');
      expect(translateKey('$variable-1')).toEqual('$variable-1');
      expect(translateKey('$variable--modifier')).toEqual('$variable--modifier');
      expect(translateKey('$otherVariable')).toEqual('$otherVariable');
    });

    it('should not translate LESS key', () => {
      expect(translateKey('@variable')).toEqual('@variable');
      expect(translateKey('@variable-1')).toEqual('@variable-1');
      expect(translateKey('@variable--modifier')).toEqual('@variable--modifier');
      expect(translateKey('@otherVariable')).toEqual('@otherVariable');
    });

  });

  describe('translateValue', () => {

    it('should correctly translate simple CSS value', () => {
      expect((translateValue('var(--color2)', TEST_TOKEN_GROUPS)))
        .toEqual('#000');
    });

    it('should correctly translate simple CSS alias', () => {
      expect((translateValue('var(--white)', TEST_TOKEN_GROUPS)))
        .toEqual('#fff');
    });

    it('should correctly translate CSS value with nested variables', () => {
      expect((translateValue('var(--gradient1)', TEST_TOKEN_GROUPS)))
        .toEqual('linear-gradient(90deg, #fff 0%, #0f0 50%, #000 100%)');
    });

    it('should correctly translate simple SCSS value', () => {
      expect((translateValue('$color2', TEST_TOKEN_GROUPS)))
        .toEqual('#000');
    });

    it('should correctly translate simple SCSS alias', () => {
      expect((translateValue('$white', TEST_TOKEN_GROUPS)))
        .toEqual('#fff');
    });

    it('should correctly translate SCSS value with nested variables', () => {
      expect((translateValue('$gradient1', TEST_TOKEN_GROUPS)))
        .toEqual('linear-gradient(90deg, #fff 0%, #0f0 50%, #000 100%)');
    });

    it('should correctly translate SCSS value with nested interpolated variables', () => {
      expect((translateValue('$gradient2', TEST_TOKEN_GROUPS)))
        .toEqual('linear-gradient(90deg, #fff 0%, #0f0 50%, #000 100%)');
    });

    it('should correctly translate simple LESS value', () => {
      expect((translateValue('@color2', TEST_TOKEN_GROUPS)))
        .toEqual('#000');
    });

    it('should correctly translate simple LESS alias', () => {
      expect((translateValue('@white', TEST_TOKEN_GROUPS)))
        .toEqual('#fff');
    });

    it('should correctly translate LESS value with nested variables', () => {
      expect((translateValue('@gradient1', TEST_TOKEN_GROUPS)))
        .toEqual('linear-gradient(90deg, #fff 0%, #0f0 50%, #000 100%)');
    });

  });

  describe('detectVariables', () => {

    it('should detect any kind of CSS variable', () => {
      expect((detectVariables('linear-gradient(90deg, var(--color1) 0%, #0f0 50%, #000 100%)').length))
        .toEqual(1);
      expect((detectVariables('linear-gradient(90deg, var(--CoLoR1) 0%, #0f0 50%, #000 100%)').length))
        .toEqual(1);
      expect((detectVariables('linear-gradient(90deg, var(--color--1) 0%, #0f0 50%, #000 100%)').length))
        .toEqual(1);
      expect((detectVariables('var(--shadow1), var(--shadow2)').length))
        .toEqual(2);
      expect((detectVariables('linear-gradient(90deg, var(--color1) 0%, #0f0 50%, var(--color2) 100%)').length))
        .toEqual(2);
    });

    it('should ignore any kind of CSS variable', () => {
      expect((detectVariables('linear-gradient(90deg, var(--color1) 0%, #0f0 50%, #000 100%)', false).length))
        .toEqual(0);
      expect((detectVariables('linear-gradient(90deg, var(--CoLoR1) 0%, #0f0 50%, #000 100%)', false).length))
        .toEqual(0);
      expect((detectVariables('linear-gradient(90deg, var(--color--1) 0%, #0f0 50%, #000 100%)', false).length))
        .toEqual(0);
      expect((detectVariables('var(--shadow1), var(--shadow2)', false).length))
        .toEqual(0);
      expect((detectVariables('linear-gradient(90deg, var(--color1) 0%, #0f0 50%, var(--color2) 100%)', false).length))
        .toEqual(0);
    });


    it('should detect every kind of SCSS variable', () => {
      expect((detectVariables('linear-gradient(90deg, $color1 0%, #0f0 50%, #000 100%)').length))
        .toEqual(1);
      expect((detectVariables('linear-gradient(90deg, $CoLoR1 0%, #0f0 50%, #000 100%)').length))
        .toEqual(1);
      expect((detectVariables('linear-gradient(90deg, $color--1 0%, #0f0 50%, #000 100%)').length))
        .toEqual(1);
      expect((detectVariables('$shadow1, $shadow2').length))
        .toEqual(2);
      expect((detectVariables('linear-gradient(90deg, $color1 0%, #0f0 50%, $color2 100%)').length))
        .toEqual(2);
      expect((detectVariables('calc(#{$size} - 3rem)').length))
        .toEqual(1);
    });

    it('should detect every kind of LESS variable', () => {
      expect((detectVariables('linear-gradient(90deg, @color1 0%, #0f0 50%, #000 100%)').length))
        .toEqual(1);
      expect((detectVariables('linear-gradient(90deg, @CoLoR1 0%, #0f0 50%, #000 100%)').length))
        .toEqual(1);
      expect((detectVariables('linear-gradient(90deg, @color--1 0%, #0f0 50%, #000 100%)').length))
        .toEqual(1);
      expect((detectVariables('@shadow1, @shadow2').length))
        .toEqual(2);
      expect((detectVariables('linear-gradient(90deg, @color1 0%, #0f0 50%, @color2 100%)').length))
        .toEqual(2);
    });

    it('should detect mixed variables', () => {
      expect((detectVariables('linear-gradient(90deg, @color1 0%, #0f0 50%, var(--color2) 100%)').length))
        .toEqual(2);
      expect((detectVariables('linear-gradient(90deg, $color1 0%, #0f0 50%, var(--color2) 100%)').length))
        .toEqual(2);
    });

  });

  describe('parseVariables', () => {

    it('should correctly parse CSS property', () => {
      expect((parseVariables('inset var(--shadow1), var(--shadow2), 0 2px 3px 1px var(--white)', TEST_TOKEN_GROUPS)))
        .toEqual('inset 0 1px 2px 0 rgba(0, 0, 0, 0.15), 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 2px 3px 1px #fff');
    });

    it('should correctly parse SCSS property', () => {
      expect((parseVariables('inset $shadow1, $shadow2, 0 2px 3px 1px $white', TEST_TOKEN_GROUPS)))
        .toEqual('inset 0 1px 2px 0 rgba(0, 0, 0, 0.15), 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 2px 3px 1px #fff');
      expect((parseVariables('inset #{$shadow1}, #{$shadow2}, 0 2px 3px 1px #{$white}', TEST_TOKEN_GROUPS)))
        .toEqual('inset 0 1px 2px 0 rgba(0, 0, 0, 0.15), 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 2px 3px 1px #fff');
    });

    it('should correctly parse LESS property', () => {
      expect((parseVariables('inset @shadow1, @shadow2, 0 2px 3px 1px @white', TEST_TOKEN_GROUPS)))
        .toEqual('inset 0 1px 2px 0 rgba(0, 0, 0, 0.15), 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 2px 3px 1px #fff');
    });

  });

});
