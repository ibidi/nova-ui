import type { NovaTheme } from './types';

export const lightTheme: NovaTheme = {
  dark: false,
  colors: {
    primary: '#6366F1',
    primaryLight: '#A5B4FC',
    primaryDark: '#4338CA',

    secondary: '#8B5CF6',
    secondaryLight: '#C4B5FD',
    secondaryDark: '#6D28D9',

    success: '#22C55E',
    successLight: '#86EFAC',
    successDark: '#16A34A',

    warning: '#F59E0B',
    warningLight: '#FCD34D',
    warningDark: '#D97706',

    error: '#EF4444',
    errorLight: '#FCA5A5',
    errorDark: '#DC2626',

    info: '#3B82F6',
    infoLight: '#93C5FD',
    infoDark: '#2563EB',

    background: '#FFFFFF',
    surface: '#F8FAFC',
    surfaceVariant: '#F1F5F9',

    text: '#0F172A',
    textSecondary: '#64748B',
    textDisabled: '#CBD5E1',
    textInverse: '#FFFFFF',

    border: '#E2E8F0',
    borderLight: '#F1F5F9',

    overlay: 'rgba(0, 0, 0, 0.5)',
    transparent: 'transparent',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
    '3xl': 64,
  },
  radii: {
    none: 0,
    xs: 2,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  typography: {
    fontFamily: {
      regular: 'System',
      medium: 'System',
      semibold: 'System',
      bold: 'System',
    },
    fontSize: {
      xs: 10,
      sm: 12,
      md: 14,
      lg: 16,
      xl: 18,
      '2xl': 22,
      '3xl': 28,
      '4xl': 34,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  shadows: {
    none: {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 6,
    },
    xl: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 12,
    },
  },
};

export const darkTheme: NovaTheme = {
  dark: true,
  colors: {
    primary: '#818CF8',
    primaryLight: '#A5B4FC',
    primaryDark: '#6366F1',

    secondary: '#A78BFA',
    secondaryLight: '#C4B5FD',
    secondaryDark: '#8B5CF6',

    success: '#4ADE80',
    successLight: '#86EFAC',
    successDark: '#22C55E',

    warning: '#FBBF24',
    warningLight: '#FCD34D',
    warningDark: '#F59E0B',

    error: '#F87171',
    errorLight: '#FCA5A5',
    errorDark: '#EF4444',

    info: '#60A5FA',
    infoLight: '#93C5FD',
    infoDark: '#3B82F6',

    background: '#0F172A',
    surface: '#1E293B',
    surfaceVariant: '#334155',

    text: '#F8FAFC',
    textSecondary: '#94A3B8',
    textDisabled: '#475569',
    textInverse: '#0F172A',

    border: '#334155',
    borderLight: '#1E293B',

    overlay: 'rgba(0, 0, 0, 0.7)',
    transparent: 'transparent',
  },
  spacing: lightTheme.spacing,
  radii: lightTheme.radii,
  typography: lightTheme.typography,
  shadows: {
    none: lightTheme.shadows.none,
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.15,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 3,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.35,
      shadowRadius: 8,
      elevation: 6,
    },
    xl: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.45,
      shadowRadius: 16,
      elevation: 12,
    },
  },
};
