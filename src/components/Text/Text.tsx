import React from 'react';
import { Text as RNText } from 'react-native';
import type { TextStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { NovaTheme } from '../../theme/types';
import type {
  NovaTextProps,
  TextVariant,
  TextWeight,
  TextColor,
} from './Text.types';

function getVariantStyle(
  theme: NovaTheme,
  variant: TextVariant
): TextStyle {
  const { fontSize, lineHeight, fontFamily } = theme.typography;

  const variants: Record<TextVariant, TextStyle> = {
    h1: {
      fontSize: fontSize['4xl'],
      lineHeight: fontSize['4xl'] * lineHeight.tight,
      fontFamily: fontFamily.bold,
    },
    h2: {
      fontSize: fontSize['3xl'],
      lineHeight: fontSize['3xl'] * lineHeight.tight,
      fontFamily: fontFamily.bold,
    },
    h3: {
      fontSize: fontSize['2xl'],
      lineHeight: fontSize['2xl'] * lineHeight.tight,
      fontFamily: fontFamily.semibold,
    },
    h4: {
      fontSize: fontSize.xl,
      lineHeight: fontSize.xl * lineHeight.tight,
      fontFamily: fontFamily.semibold,
    },
    body: {
      fontSize: fontSize.md,
      lineHeight: fontSize.md * lineHeight.normal,
      fontFamily: fontFamily.regular,
    },
    bodySmall: {
      fontSize: fontSize.sm,
      lineHeight: fontSize.sm * lineHeight.normal,
      fontFamily: fontFamily.regular,
    },
    caption: {
      fontSize: fontSize.xs,
      lineHeight: fontSize.xs * lineHeight.normal,
      fontFamily: fontFamily.regular,
    },
    label: {
      fontSize: fontSize.sm,
      lineHeight: fontSize.sm * lineHeight.tight,
      fontFamily: fontFamily.medium,
    },
    overline: {
      fontSize: fontSize.xs,
      lineHeight: fontSize.xs * lineHeight.tight,
      fontFamily: fontFamily.semibold,
      letterSpacing: 1.5,
      textTransform: 'uppercase',
    },
  };

  return variants[variant];
}

function getColorStyle(theme: NovaTheme, color: TextColor): string {
  const colorMap: Record<TextColor, string> = {
    default: theme.colors.text,
    secondary: theme.colors.textSecondary,
    disabled: theme.colors.textDisabled,
    inverse: theme.colors.textInverse,
    primary: theme.colors.primary,
    success: theme.colors.success,
    warning: theme.colors.warning,
    error: theme.colors.error,
    info: theme.colors.info,
  };
  return colorMap[color];
}

function getWeightStyle(
  theme: NovaTheme,
  weight: TextWeight
): TextStyle {
  return { fontFamily: theme.typography.fontFamily[weight] };
}

export const NovaText: React.FC<NovaTextProps> = ({
  variant = 'body',
  weight,
  color = 'default',
  align,
  italic = false,
  underline = false,
  strikethrough = false,
  uppercase = false,
  style,
  children,
  ...textProps
}) => {
  const theme = useTheme();

  const variantStyle = getVariantStyle(theme, variant);
  const colorValue = getColorStyle(theme, color);
  const weightStyle = weight ? getWeightStyle(theme, weight) : {};

  const combinedStyle: TextStyle = {
    ...variantStyle,
    ...weightStyle,
    color: colorValue,
    ...(align && { textAlign: align }),
    ...(italic && { fontStyle: 'italic' }),
    ...(underline && { textDecorationLine: 'underline' }),
    ...(strikethrough && { textDecorationLine: 'line-through' }),
    ...(uppercase && { textTransform: 'uppercase' }),
  };

  return (
    <RNText
      style={[combinedStyle, style]}
      accessibilityRole={variant.startsWith('h') ? 'header' : 'text'}
      {...textProps}
    >
      {children}
    </RNText>
  );
};
