import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { NovaTheme } from '../../theme/types';
import type {
  BadgeProps,
  BadgeDotProps,
  BadgeVariant,
  BadgeColor,
  BadgeSize,
} from './Badge.types';

function getColorValue(theme: NovaTheme, color: BadgeColor): string {
  return theme.colors[color];
}

function getLightColorValue(theme: NovaTheme, color: BadgeColor): string {
  const map: Record<BadgeColor, string> = {
    primary: theme.colors.primaryLight,
    secondary: theme.colors.secondaryLight,
    success: theme.colors.successLight,
    warning: theme.colors.warningLight,
    error: theme.colors.errorLight,
    info: theme.colors.infoLight,
  };
  return map[color];
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'solid',
  color = 'primary',
  size = 'md',
  label,
  rounded = true,
  style,
  textStyle,
}) => {
  const theme = useTheme();
  const colorVal = getColorValue(theme, color);
  const lightColorVal = getLightColorValue(theme, color);

  const sizeMap: Record<BadgeSize, { px: number; py: number; fontSize: number }> = {
    sm: { px: 6, py: 2, fontSize: theme.typography.fontSize.xs },
    md: { px: 8, py: 3, fontSize: theme.typography.fontSize.xs },
    lg: { px: 10, py: 4, fontSize: theme.typography.fontSize.sm },
  };

  const { px, py, fontSize } = sizeMap[size];

  const variantStyles: Record<BadgeVariant, { bg: string; textColor: string; border?: string }> = {
    solid: {
      bg: colorVal,
      textColor: theme.colors.textInverse,
    },
    outline: {
      bg: 'transparent',
      textColor: colorVal,
      border: colorVal,
    },
    soft: {
      bg: lightColorVal + '30',
      textColor: colorVal,
    },
  };

  const variantStyle = variantStyles[variant];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: variantStyle.bg,
          paddingHorizontal: px,
          paddingVertical: py,
          borderRadius: rounded ? theme.radii.full : theme.radii.xs,
          ...(variantStyle.border && {
            borderWidth: 1,
            borderColor: variantStyle.border,
          }),
        },
        style,
      ]}
    >
      <Text
        style={[
          {
            fontSize,
            color: variantStyle.textColor,
            fontFamily: theme.typography.fontFamily.medium,
          },
          textStyle,
        ]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </View>
  );
};

export const BadgeDot: React.FC<BadgeDotProps> = ({
  color = 'success',
  size = 8,
  style,
}) => {
  const theme = useTheme();

  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: getColorValue(theme, color),
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
