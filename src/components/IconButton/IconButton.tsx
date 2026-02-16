import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { NovaTheme } from '../../theme/types';
import type {
  IconButtonProps,
  IconButtonVariant,
  IconButtonSize,
  IconButtonColor,
} from './IconButton.types';

function getColorValue(theme: NovaTheme, color: IconButtonColor): string {
  return theme.colors[color];
}

function getLightColorValue(theme: NovaTheme, color: IconButtonColor): string {
  const map: Record<IconButtonColor, string> = {
    primary: theme.colors.primaryLight,
    secondary: theme.colors.secondaryLight,
    success: theme.colors.successLight,
    warning: theme.colors.warningLight,
    error: theme.colors.errorLight,
    info: theme.colors.infoLight,
  };
  return map[color];
}

const sizeMap: Record<IconButtonSize, { width: number; height: number }> = {
  sm: { width: 32, height: 32 },
  md: { width: 44, height: 44 },
  lg: { width: 56, height: 56 },
};

export const IconButton: React.FC<IconButtonProps> = ({
  variant = 'solid',
  size = 'md',
  color = 'primary',
  rounded = true,
  disabled = false,
  style,
  children,
  ...pressableProps
}) => {
  const theme = useTheme();
  const colorValue = getColorValue(theme, color);
  const lightColorValue = getLightColorValue(theme, color);
  const { width, height } = sizeMap[size];

  const getVariantStyle = () => {
    const base = {
      width,
      height,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      borderRadius: rounded ? height / 2 : theme.radii.md,
    };

    const variants: Record<IconButtonVariant, object> = {
      solid: { backgroundColor: colorValue },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: colorValue,
      },
      ghost: { backgroundColor: 'transparent' },
      soft: { backgroundColor: lightColorValue + '30' },
    };

    return { ...base, ...variants[variant] };
  };

  return (
    <Pressable
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        getVariantStyle(),
        {
          opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
        },
        style,
      ]}
      {...pressableProps}
    >
      <View style={styles.iconWrapper}>{children}</View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
