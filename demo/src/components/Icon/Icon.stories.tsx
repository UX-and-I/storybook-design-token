import './Icons';

import React from 'react';

import { select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { PaddingDecorator } from '../../../.storybook/decorators';
import { ShIcon } from './Icon';

const glyphs = {
  audio: 'audio',
  bold: 'bold',
  box: 'box',
  check: 'check',
  'chevrons-left': 'chevrons-left',
  'chevron-down': 'chevron-down',
  'chevron-right': 'chevron-right',
  close: 'close',
  code: 'code',
  compass: 'compass',
  date: 'date',
  delete: 'delete',
  dots: 'dots',
  edit: 'edit',
  folder: 'folder',
  github: 'github',
  google: 'google',
  http: 'http',
  home: 'home',
  image: 'image',
  info: 'info',
  link: 'link',
  location: 'location',
  minus: 'minus',
  move: 'move',
  number: 'number',
  'ordered-list': 'ordered-list',
  play: 'play',
  plus: 'plus',
  prototype: 'prototype',
  publish: 'publish',
  quote: 'quote',
  richtext: 'richtext',
  search: 'search',
  select: 'select',
  settings: 'settings',
  strike: 'strike',
  text: 'text',
  toggle: 'toggle',
  underline: 'underline',
  'unordered-list': 'unordered-list',
  unpublish: 'unpublish',
  users: 'users',
  warning: 'warning'
};

const sizes = {
  s: 's',
  m: 'm',
  l: 'l'
};

storiesOf('Components', module)
  .addDecorator(PaddingDecorator)
  .add('Icon', () => {
    const glyph = select('glyph', glyphs, 'edit');
    const size = select('size', sizes, 'm');

    return <ShIcon glyph={glyph} size={size} />;
  });
