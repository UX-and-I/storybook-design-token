import { useEffect, useMemo, useState } from "react";
import { useStorageState } from "react-storage-hooks";

import { Category } from "../types/category.types";
import { Config } from "../types/config.types";

export function useTokenTabs(config?: Config) {
  const [tokenFiles, setTokenFiles] = useState<{
    [type: string]: { categories: Category[]; injectionStyles: string };
  }>();

  const [cssCategories, setCssCategories] = useState<Category[]>([]);
  const [lessCategories, setLessCategories] = useState<Category[]>([]);
  const [scssCategories, setScssCategories] = useState<Category[]>([]);
  const [svgIconCategories, setSvgIconCategories] = useState<Category[]>([]);
  const [imageCategories, setImageIconCategories] = useState<Category[]>([]);

  const [activeCategory, setActiveCategory] = useState<string>();
  const [cardView, setCardView] = useStorageState(
    localStorage,
    "storybook-design-token-addon-card",
    false
  );

  const [styleInjections, setStyleInjections] = useState("");

  const tabs = useMemo(() => {
    const categories = [
      ...cssCategories,
      ...lessCategories,
      ...scssCategories,
      ...svgIconCategories,
      ...imageCategories,
    ].filter(
      (category) => category !== undefined && category?.tokens.length > 0
    );

    const categoryNames = Array.from(
      new Set(categories.map((category) => category?.name))
    );

    let tabs = categoryNames.map((name) => ({
      label: name,
      categories: categories.filter(
        (category) => category?.name === name
      ) as Category[],
    }));

    if ((config?.tabs ?? []).length !== 0) {
      tabs = tabs.filter(tab => config.tabs.includes(tab.label))
    }

    return tabs;
  }, [
    cssCategories,
    lessCategories,
    scssCategories,
    svgIconCategories,
    imageCategories,
    config
  ]);

  useEffect(() => {
    async function fetchTokenFiles() {
      const designTokenSource = await (
        await fetch("./design-tokens.source.json")
      ).text();

      setTokenFiles(JSON.parse(designTokenSource));
    }

    fetchTokenFiles();
  }, []);

  useEffect(() => {
    const cssTokens = tokenFiles?.cssTokens;
    const lessTokens = tokenFiles?.lessTokens;
    const scssTokens = tokenFiles?.scssTokens;
    const svgTokens = tokenFiles?.svgTokens;
    const imageTokens = tokenFiles?.imageTokens;

    setStyleInjections(config?.styleInjection || "");

    if (cssTokens) {
      setCssCategories(cssTokens.categories);

      if (!config?.defaultTab && cssTokens.categories.length > 0) {
        setActiveCategory(
          (activeCategory) => activeCategory || cssTokens.categories[0].name
        );
      }

      setStyleInjections((current) => current + cssTokens.injectionStyles);
    }

    if (lessTokens) {
      setLessCategories(lessTokens.categories);

      if (!config?.defaultTab && lessTokens.categories.length > 0) {
        setActiveCategory(
          (activeCategory) => activeCategory || lessTokens.categories[0].name
        );
      }

      setStyleInjections((current) => current + lessTokens.injectionStyles);
    }

    if (scssTokens) {
      setScssCategories(scssTokens.categories);

      if (!config?.defaultTab && scssTokens.categories.length > 0) {
        setActiveCategory(
          (activeCategory) => activeCategory || scssTokens.categories[0].name
        );
      }

      setStyleInjections((current) => current + scssTokens.injectionStyles);
    }

    if (svgTokens) {
      setSvgIconCategories(svgTokens.categories);
    }

    if (imageTokens) {
      setImageIconCategories(imageTokens.categories);
    }
  }, [config, tokenFiles]);

  useEffect(() => {
    if (config?.defaultTab) {
      setActiveCategory(config.defaultTab);
    }
  }, [config]);

  return {
    activeCategory,
    cardView,
    setActiveCategory,
    setCardView,
    styleInjections,
    tabs,
  };
}
