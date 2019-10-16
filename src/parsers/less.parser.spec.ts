import { LessParser } from './less.parser';

const TEST_FILES = {
  empty: '',
  multipleTokenGroup: `/**
    * @tokens Colors
    * @presenter Swatch
    */

    @blue: blue;
    @red: red;

    /**
    * @tokens Font Sizes
    * @presenter FontSize
    */

    @fs-m: 14px;
  `,
  singleTokenGroup: `/**
    * @tokens Colors
    * @presenter Swatch
    */

     @blue: blue;
     @red: red;
  `,
  withAliases: `/**
    * @tokens Colors
    * @presenter Swatch
    */

    @blue: blue;
    @red: red;

    @primary: @blue;
    @secondary: @red;
  `,
  withEmptyTokenGroup: `/**
  * @tokens Colors
  * @presenter Swatch
  */`,
  withKeyframe: `/**
  * @tokens Animations
  * @presenter Animation
  */

   @keyframes fade-in {
     from {
       opacity: 0;
     }
     to {
       opacity: 1;
     }
   }`,
  withoutAnnotations: 'body { color: red; }'
};

describe('LessParser', () => {
  let parser: LessParser;

  beforeEach(() => {
    parser = new LessParser();
  });

  it('should parse empty token file list', () => {
    expect(parser.parse({ css: [], less: [] })).toEqual({
      hardCodedValues: [],
      keyframes: '',
      tokenGroups: []
    });
  });

  it('should parse empty token files', () => {
    expect(
      parser.parse({
        css: [{ filename: 'empty.css', content: TEST_FILES.empty }],
        less: [{ filename: 'empty.css', content: TEST_FILES.empty }]
      })
    ).toEqual({
      hardCodedValues: [],
      keyframes: '',
      tokenGroups: []
    });
  });

  it('should parse files without annotations', () => {
    expect(
      parser.parse({
        css: [
          {
            filename: 'withoutAnnotations.css',
            content: TEST_FILES.withoutAnnotations
          }
        ],
        less: [
          {
            filename: 'withoutAnnotations.css',
            content: TEST_FILES.withoutAnnotations
          }
        ]
      })
    ).toEqual({
      hardCodedValues: [],
      keyframes: '',
      tokenGroups: []
    });
  });

  it('should parse files with annotated empty token groups', () => {
    const parsed = parser.parse({
      css: [{ filename: 'empty.css', content: TEST_FILES.withEmptyTokenGroup }],
      less: [{ filename: 'empty.css', content: TEST_FILES.withEmptyTokenGroup }]
    });

    expect(parsed).toEqual({
      hardCodedValues: [],
      tokenGroups: [
        {
          label: 'Colors',
          position: { end: Infinity, start: 1 },
          presenter: 'Swatch',
          tokens: []
        }
      ],
      keyframes: ''
    });
  });

  it('should parse files with a single token group', () => {
    const parsed = parser.parse({
      less: [{ filename: 'single.css', content: TEST_FILES.singleTokenGroup }]
    });

    expect(parsed).toEqual({
      hardCodedValues: [],
      tokenGroups: [
        {
          label: 'Colors',
          position: { end: Infinity, start: 1 },
          presenter: 'Swatch',
          tokens: [
            { aliases: [], description: '', key: '@blue', value: 'blue' },
            { aliases: [], description: '', key: '@red', value: 'red' }
          ]
        }
      ],
      keyframes: ''
    });
  });

  it('should parse files with multiple token groups', () => {
    const parsed = parser.parse({
      less: [
        { filename: 'multiple.css', content: TEST_FILES.multipleTokenGroup }
      ]
    });

    expect(parsed).toEqual({
      hardCodedValues: [],
      tokenGroups: [
        {
          label: 'Colors',
          position: { end: 8, start: 1 },
          presenter: 'Swatch',
          tokens: [
            { aliases: [], description: '', key: '@blue', value: 'blue' },
            { aliases: [], description: '', key: '@red', value: 'red' }
          ]
        },
        {
          label: 'Font Sizes',
          position: { end: Infinity, start: 9 },
          presenter: 'FontSize',
          tokens: [
            { aliases: [], description: '', key: '@fs-m', value: '14px' }
          ]
        }
      ],
      keyframes: ''
    });
  });

  it('should parse files with keyframes', () => {
    const parsed = parser.parse({
      less: [{ filename: 'withKeyframe.css', content: TEST_FILES.withKeyframe }]
    });

    expect(parsed).toBeDefined();
    expect(parsed.keyframes).toContain('fade-in');
  });

  it('should parse multiple files', () => {
    const parsed = parser.parse({
      less: [
        { filename: 'multiple.css', content: TEST_FILES.multipleTokenGroup },
        { filename: 'empty.css', content: TEST_FILES.empty },
        {
          filename: 'withoutAnnotations.css',
          content: TEST_FILES.withoutAnnotations
        }
      ]
    });

    expect(parsed).toEqual({
      hardCodedValues: [
        {
          token: { aliases: [], description: '', key: '@red', value: 'red' },
          values: [{ file: 'withoutAnnotations.css', line: 1, value: 'red' }]
        }
      ],
      tokenGroups: [
        {
          label: 'Colors',
          position: { end: 8, start: 1 },
          presenter: 'Swatch',
          tokens: [
            { aliases: [], description: '', key: '@blue', value: 'blue' },
            { aliases: [], description: '', key: '@red', value: 'red' }
          ]
        },
        {
          label: 'Font Sizes',
          position: { end: Infinity, start: 9 },
          presenter: 'FontSize',
          tokens: [
            { aliases: [], description: '', key: '@fs-m', value: '14px' }
          ]
        }
      ],
      keyframes: ''
    });
  });

  it('should sort token groups alphabetically', () => {
    const parsed = parser.parse({
      less: [
        { filename: 'multiple.css', content: TEST_FILES.multipleTokenGroup },
        {
          filename: 'withoutAnnotations.css',
          content: TEST_FILES.withoutAnnotations
        }
      ]
    });

    expect(parsed.tokenGroups.map(g => g.label)).toEqual([
      'Colors',
      'Font Sizes'
    ]);
  });

  it('should recognize aliases', () => {
    const parsed = parser.parse({
      less: [{ filename: 'withAliases.css', content: TEST_FILES.withAliases }]
    });

    expect(parsed).toEqual({
      hardCodedValues: [],
      tokenGroups: [
        {
          label: 'Colors',
          position: { end: Infinity, start: 1 },
          presenter: 'Swatch',
          tokens: [
            {
              aliases: ['@primary'],
              description: '',
              key: '@blue',
              value: 'blue'
            },
            {
              aliases: ['@secondary'],
              description: '',
              key: '@red',
              value: 'red'
            }
          ]
        }
      ],
      keyframes: ''
    });
  });
});
