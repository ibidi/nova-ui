export interface NovaColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;

  secondary: string;
  secondaryLight: string;
  secondaryDark: string;

  success: string;
  successLight: string;
  successDark: string;

  warning: string;
  warningLight: string;
  warningDark: string;

  error: string;
  errorLight: string;
  errorDark: string;

  info: string;
  infoLight: string;
  infoDark: string;

  background: string;
  surface: string;
  surfaceVariant: string;

  text: string;
  textSecondary: string;
  textDisabled: string;
  textInverse: string;

  border: string;
  borderLight: string;

  overlay: string;
  transparent: string;
}

export interface NovaSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
  '3xl': number;
}

export interface NovaRadii {
  none: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  full: number;
}

export interface NovaTypography {
  fontFamily: {
    regular: string;
    medium: string;
    semibold: string;
    bold: string;
  };
  fontSize: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    '2xl': number;
    '3xl': number;
    '4xl': number;
  };
  lineHeight: {
    tight: number;
    normal: number;
    relaxed: number;
  };
}

export interface NovaShadows {
  none: ShadowStyle;
  sm: ShadowStyle;
  md: ShadowStyle;
  lg: ShadowStyle;
  xl: ShadowStyle;
}

export interface ShadowStyle {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

export interface NovaTheme {
  dark: boolean;
  colors: NovaColors;
  spacing: NovaSpacing;
  radii: NovaRadii;
  typography: NovaTypography;
  shadows: NovaShadows;
}

export type NovaThemeOverride = {
  dark?: boolean;
  colors?: Partial<NovaColors>;
  spacing?: Partial<NovaSpacing>;
  radii?: Partial<NovaRadii>;
  typography?: Partial<NovaTypography>;
  shadows?: Partial<NovaShadows>;
};
