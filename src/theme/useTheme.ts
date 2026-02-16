import { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';
import type { NovaTheme } from './types';

export function useTheme(): NovaTheme {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error('useTheme must be used within a <ThemeProvider>');
  }
  return theme;
}
