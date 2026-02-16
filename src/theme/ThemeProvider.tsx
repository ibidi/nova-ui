import React, { createContext, useMemo } from 'react';
import { lightTheme, darkTheme } from './defaultTheme';
import type { NovaTheme, NovaThemeOverride } from './types';

export const ThemeContext = createContext<NovaTheme>(lightTheme);

export interface ThemeProviderProps {
  theme?: NovaThemeOverride;
  darkMode?: boolean;
  children: React.ReactNode;
}

function deepMerge<T extends Record<string, unknown>>(
  base: T,
  override: Partial<T>
): T {
  const result = { ...base };
  for (const key in override) {
    if (Object.prototype.hasOwnProperty.call(override, key)) {
      const overrideVal = override[key];
      const baseVal = base[key];
      if (
        overrideVal &&
        typeof overrideVal === 'object' &&
        !Array.isArray(overrideVal) &&
        baseVal &&
        typeof baseVal === 'object' &&
        !Array.isArray(baseVal)
      ) {
        (result as Record<string, unknown>)[key] = deepMerge(
          baseVal as Record<string, unknown>,
          overrideVal as Record<string, unknown>
        );
      } else {
        (result as Record<string, unknown>)[key] = overrideVal;
      }
    }
  }
  return result;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme: themeOverride,
  darkMode = false,
  children,
}) => {
  const theme = useMemo(() => {
    const baseTheme = darkMode ? darkTheme : lightTheme;
    if (!themeOverride) return baseTheme;
    return deepMerge(baseTheme, themeOverride as Partial<NovaTheme>);
  }, [darkMode, themeOverride]);

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};
