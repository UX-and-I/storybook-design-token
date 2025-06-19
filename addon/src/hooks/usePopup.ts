import { useState, useRef, useLayoutEffect, useCallback } from "react";

interface PopupState {
  top: number;
  left: number;
  tokenName: string;
}

interface UsePopupProps<T> {
  usageMap?: Record<string, string[]>;
  getElementRef: (item: T) => HTMLElement | null;
  getTokenName: (item: T) => string;
}

export function usePopup<T>({
  usageMap,
  getElementRef,
  getTokenName,
}: UsePopupProps<T>) {
  const [popup, setPopup] = useState<PopupState | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);

  const handleContextMenu = useCallback(
    (event: React.MouseEvent, item: T) => {
      const tokenName = getTokenName(item);
      if (!usageMap) return;
      event.preventDefault();

      const element = getElementRef(item);
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const top = rect.bottom + window.scrollY + 5; // Position below the element
      const left = rect.left + window.scrollX;

      setPopup({ top, left, tokenName });
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [usageMap, getElementRef, getTokenName]
  );

  const closePopup = useCallback(() => {
    setPopup(null);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  useLayoutEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        closePopup();
      }
    };

    const handleScroll = (event: Event) => {
      if (!popup) return;

      const target = event.target as Node;
      if (popupRef.current && !popupRef.current.contains(target)) {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = window.setTimeout(closePopup, 2000);
      }
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("scroll", handleScroll, true);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("scroll", handleScroll, true);
    };
  }, [popup, closePopup]);

  return {
    popup,
    popupRef,
    handleContextMenu,
    closePopup,
  };
}
