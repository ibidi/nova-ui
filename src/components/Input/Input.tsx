import React, { useState, useCallback } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import type { ViewStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { NovaTheme } from '../../theme/types';
import type { NovaInputProps, InputVariant, InputSize } from './Input.types';

function getContainerVariantStyle(
  theme: NovaTheme,
  variant: InputVariant,
  focused: boolean,
  hasError: boolean
): ViewStyle {
  const borderColor = hasError
    ? theme.colors.error
    : focused
      ? theme.colors.primary
      : theme.colors.border;

  const variants: Record<InputVariant, ViewStyle> = {
    outline: {
      borderWidth: focused ? 2 : 1,
      borderColor,
      borderRadius: theme.radii.md,
      backgroundColor: theme.colors.background,
    },
    filled: {
      borderWidth: 0,
      borderBottomWidth: focused ? 2 : 1,
      borderColor,
      borderRadius: theme.radii.md,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      backgroundColor: theme.colors.surfaceVariant,
    },
    underline: {
      borderWidth: 0,
      borderBottomWidth: focused ? 2 : 1,
      borderColor,
      borderRadius: 0,
      backgroundColor: 'transparent',
    },
  };

  return variants[variant];
}

function getSizeStyle(theme: NovaTheme, size: InputSize): ViewStyle & { fontSize: number } {
  const sizes: Record<InputSize, ViewStyle & { fontSize: number }> = {
    sm: {
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      minHeight: 36,
      fontSize: theme.typography.fontSize.sm,
    },
    md: {
      paddingHorizontal: theme.spacing.sm + 4,
      paddingVertical: theme.spacing.sm,
      minHeight: 44,
      fontSize: theme.typography.fontSize.md,
    },
    lg: {
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm + 4,
      minHeight: 52,
      fontSize: theme.typography.fontSize.lg,
    },
  };
  return sizes[size];
}

export const Input: React.FC<NovaInputProps> = ({
  variant = 'outline',
  size = 'md',
  label,
  helperText,
  errorText,
  leftIcon,
  rightIcon,
  disabled = false,
  fullWidth = true,
  containerStyle,
  inputStyle,
  labelStyle,
  onFocus,
  onBlur,
  ...inputProps
}) => {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);
  const hasError = !!errorText;

  const handleFocus = useCallback(
    (e: Parameters<NonNullable<typeof onFocus>>[0]) => {
      setFocused(true);
      onFocus?.(e);
    },
    [onFocus]
  );

  const handleBlur = useCallback(
    (e: Parameters<NonNullable<typeof onBlur>>[0]) => {
      setFocused(false);
      onBlur?.(e);
    },
    [onBlur]
  );

  const sizeStyle = getSizeStyle(theme, size);
  const variantStyle = getContainerVariantStyle(theme, variant, focused, hasError);

  return (
    <View style={[fullWidth && styles.fullWidth, containerStyle]}>
      {label && (
        <Text
          style={[
            styles.label,
            {
              color: hasError ? theme.colors.error : theme.colors.text,
              fontFamily: theme.typography.fontFamily.medium,
              fontSize: theme.typography.fontSize.sm,
              marginBottom: theme.spacing.xs,
            },
            labelStyle,
          ]}
        >
          {label}
        </Text>
      )}

      <View
        style={[
          styles.inputContainer,
          variantStyle,
          {
            paddingHorizontal: sizeStyle.paddingHorizontal,
            minHeight: sizeStyle.minHeight,
          },
          disabled && { opacity: 0.5 },
        ]}
      >
        {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}

        <TextInput
          style={[
            styles.input,
            {
              fontSize: sizeStyle.fontSize,
              color: theme.colors.text,
              fontFamily: theme.typography.fontFamily.regular,
            },
            inputStyle,
          ]}
          placeholderTextColor={theme.colors.textDisabled}
          editable={!disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          accessibilityLabel={label}
          accessibilityState={{ disabled }}
          {...inputProps}
        />

        {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
      </View>

      {(errorText || helperText) && (
        <Text
          style={[
            styles.helperText,
            {
              color: hasError ? theme.colors.error : theme.colors.textSecondary,
              fontFamily: theme.typography.fontFamily.regular,
              fontSize: theme.typography.fontSize.xs,
              marginTop: theme.spacing.xs,
            },
          ]}
        >
          {errorText || helperText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },
  label: {},
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 0,
    margin: 0,
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
  helperText: {},
});
