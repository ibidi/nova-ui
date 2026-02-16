import React, { useCallback } from 'react';
import {
  Pressable,
  Text,
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { NovaTheme } from '../../theme/types';
import type {
  ButtonProps,
  ButtonVariant,
  ButtonSize,
  ButtonColor,
} from './Button.types';

function getColorValue(theme: NovaTheme, color: ButtonColor): string {
  return theme.colors[color];
}

function getLightColorValue(theme: NovaTheme, color: ButtonColor): string {
  const map: Record<ButtonColor, string> = {
    primary: theme.colors.primaryLight,
    secondary: theme.colors.secondaryLight,
    success: theme.colors.successLight,
    warning: theme.colors.warningLight,
    error: theme.colors.errorLight,
    info: theme.colors.infoLight,
  };
  return map[color];
}

function getContainerStyle(
  theme: NovaTheme,
  variant: ButtonVariant,
  size: ButtonSize,
  color: ButtonColor,
  fullWidth: boolean,
  disabled: boolean,
  pressed: boolean
): ViewStyle {
  const colorValue = getColorValue(theme, color);
  const lightColorValue = getLightColorValue(theme, color);

  const base: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radii.md,
    opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
    ...(fullWidth && { width: '100%' }),
  };

  const sizeStyles: Record<ButtonSize, ViewStyle> = {
    sm: {
      paddingHorizontal: theme.spacing.sm + 4,
      paddingVertical: theme.spacing.xs + 2,
      minHeight: 32,
    },
    md: {
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      minHeight: 44,
    },
    lg: {
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.sm + 4,
      minHeight: 52,
    },
  };

  const variantStyles: Record<ButtonVariant, ViewStyle> = {
    solid: {
      backgroundColor: colorValue,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      borderColor: colorValue,
    },
    ghost: {
      backgroundColor: 'transparent',
    },
    soft: {
      backgroundColor: lightColorValue + '30',
    },
  };

  return { ...base, ...sizeStyles[size], ...variantStyles[variant] };
}

function getTextStyle(
  theme: NovaTheme,
  variant: ButtonVariant,
  size: ButtonSize,
  color: ButtonColor
): TextStyle {
  const colorValue = getColorValue(theme, color);

  const sizeStyles: Record<ButtonSize, TextStyle> = {
    sm: {
      fontSize: theme.typography.fontSize.sm,
      fontFamily: theme.typography.fontFamily.medium,
    },
    md: {
      fontSize: theme.typography.fontSize.md,
      fontFamily: theme.typography.fontFamily.semibold,
    },
    lg: {
      fontSize: theme.typography.fontSize.lg,
      fontFamily: theme.typography.fontFamily.semibold,
    },
  };

  const textColor =
    variant === 'solid' ? theme.colors.textInverse : colorValue;

  return {
    ...sizeStyles[size],
    color: textColor,
    textAlign: 'center',
  };
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'solid',
  size = 'md',
  color = 'primary',
  fullWidth = false,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  children,
  ...pressableProps
}) => {
  const theme = useTheme();

  const renderContent = useCallback(
    (pressed: boolean) => {
      const containerStyle = getContainerStyle(
        theme,
        variant,
        size,
        color,
        fullWidth,
        disabled || loading,
        pressed
      );
      const labelStyle = getTextStyle(theme, variant, size, color);

      return (
        <View style={[containerStyle, style]}>
          {loading ? (
            <ActivityIndicator
              size="small"
              color={
                variant === 'solid'
                  ? theme.colors.textInverse
                  : getColorValue(theme, color)
              }
            />
          ) : (
            <>
              {leftIcon && (
                <View style={styles.iconLeft}>{leftIcon}</View>
              )}
              {typeof children === 'string' ? (
                <Text style={[labelStyle, textStyle]}>{children}</Text>
              ) : (
                children
              )}
              {rightIcon && (
                <View style={styles.iconRight}>{rightIcon}</View>
              )}
            </>
          )}
        </View>
      );
    },
    [
      theme,
      variant,
      size,
      color,
      fullWidth,
      disabled,
      loading,
      leftIcon,
      rightIcon,
      children,
      style,
      textStyle,
    ]
  );

  return (
    <Pressable
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
      {...pressableProps}
    >
      {({ pressed }) => renderContent(pressed)}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});
