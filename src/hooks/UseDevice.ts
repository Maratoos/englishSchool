import { useState, useEffect } from "react";

export const useDevice = (maxWidth: number): boolean => {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery: MediaQueryList = window.matchMedia(`(max-width: ${maxWidth}px) `);

    const handleResize = (event: MediaQueryListEvent): void => {
      setIsMobileOrTablet(event.matches);
    };

    setIsMobileOrTablet(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  return isMobileOrTablet;
};

