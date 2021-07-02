import { useEffect, useMemo, useState } from 'react';
import { useStorageState } from 'react-storage-hooks';

import { parseCssFiles } from '../parsers/postcss.parser';
import { parseSvgFiles } from '../parsers/svg-icon.parser';
import { Category } from '../types/category.types';
import { Config } from '../types/config.types';
import { TokenSourceType } from '../types/token.types';

export function useTokenTabs(config?: Config) {
  const [cssCategories, setCssCategories] = useState<Category[]>([]);
  const [lessCategories, setLessCategories] = useState<Category[]>([]);
  const [scssCategories, setScssCategories] = useState<Category[]>([]);
  const [svgIconCategory, setSvgIconCategory] = useState<Category>();

  const [activeCategory, setActiveCategory] = useState<string>();
  const [cardView, setCardView] = useStorageState(
    localStorage,
    'storybook-design-token-addon-card',
    false
  );

  const [styleInjections, setStyleInjections] = useState('');

  const tabs = useMemo(() => {
    const categories = [
      ...cssCategories,
      ...lessCategories,
      ...scssCategories,
      svgIconCategory
    ].filter(
      (category) => category !== undefined && category?.tokens.length > 0
    );

    const categoryNames = Array.from(
      new Set(categories.map((category) => category?.name))
    );

    return categoryNames.map((name) => ({
      label: name,
      categories: categories.filter(
        (category) => category?.name === name
      ) as Category[]
    }));
  }, [cssCategories, lessCategories, scssCategories, svgIconCategory]);

  useEffect(() => {
    const cssFiles = config?.files?.filter((file) =>
      file.filename.endsWith('.css')
    );
    const lessFiles = config?.files?.filter((file) =>
      file.filename.endsWith('.less')
    );
    const scssFiles = config?.files?.filter((file) =>
      file.filename.endsWith('.scss')
    );
    const svgFiles = config?.files?.filter((file) =>
      file.filename.endsWith('.svg')
    );

    setStyleInjections(config?.styleInjection || '');

    parseCssFiles(cssFiles, TokenSourceType.CSS, true).then(
      ({ categories, injectionStyles }) => {
        setCssCategories(categories);

        if (!config?.defaultTab && categories.length > 0) {
          setActiveCategory(
            (activeCategory) => activeCategory || categories[0].name
          );
        }

        setStyleInjections((current) => current + injectionStyles);
      }
    );

    parseCssFiles(scssFiles, TokenSourceType.SCSS).then(
      ({ categories, injectionStyles }) => {
        setScssCategories(categories);

        if (!config?.defaultTab && categories.length > 0) {
          setActiveCategory(
            (activeCategory) => activeCategory || categories[0].name
          );
        }

        setStyleInjections((current) => current + injectionStyles);
      }
    );

    parseCssFiles(lessFiles, TokenSourceType.LESS).then(
      ({ categories, injectionStyles }) => {
        setLessCategories(categories);

        if (!config?.defaultTab && categories.length > 0) {
          setActiveCategory(
            (activeCategory) => activeCategory || categories[0].name
          );
        }

        setStyleInjections((current) => current + injectionStyles);
      }
    );

    parseSvgFiles(svgFiles).then((category) => {
      setSvgIconCategory(category);
    });
  }, [config]);

  useEffect(() => {
    if (config?.defaultTab && !activeCategory) {
      setActiveCategory(config.defaultTab);
    }
  }, [activeCategory, config]);

  return {
    activeCategory,
    cardView,
    setActiveCategory,
    setCardView,
    styleInjections,
    tabs
  };
}
