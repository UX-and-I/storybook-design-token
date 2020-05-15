import 'javascript-detect-element-resize';

import { useEffect, useState } from 'react';

export function usePanelWidth(): 'narrow' | 'wide' | 'wider' {
  const [width, setWidth] = useState<'narrow' | 'wide' | 'wider'>('narrow');

  useEffect(() => {
    const container = document.querySelector('.design-token-container');

    const callback = () => {
      const pxWidth = container.getBoundingClientRect().width;

      if (pxWidth < 500) {
        setWidth('narrow');
      } else if (pxWidth < 800) {
        setWidth('wide');
      } else {
        setWidth('wider');
      }
    };

    (window as any).addResizeListener(container, callback);

    return () => {
      (window as any).removeResizeListener(container, callback);
    };
  }, []);

  return width;
}
