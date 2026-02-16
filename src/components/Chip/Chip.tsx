import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { NovaTheme } from '../../theme/types';
import type { ChipProps, ChipVariant, ChipColor } from './Chip.types';

function getColorValue(theme: NovaTheme, color: ChipColor): string {
  return theme.colors[color];
}

function getLightColorValue(theme: NovaTheme, color: ChipColor): string {
  const map: Record<ChipColor, string> = {
    primary: theme.colors.primaryLight,
    secondary: theme.colors.secondaryLight,
    success: theme.colors.successLight,
    warning: theme.colors.warningLight,
    error: theme.colors.errorLight,
    info: theme.colors.infoLight,
  };
  return map[color];
}

export const Chip: React.FC<ChipProps> = ({
  variant = 'soft',
  color = 'primary',
  label,
  selected = false,
  disabled = false,
  leftIcon,
  onPress,
  onClose,
  style,
  textStyle,
}) => {
  const theme = useTheme();
  const colorVal = getColorValue(theme, color);
  const lightColorVal = getLightColorValue(theme, color);

  const getVariantStyle = (
    v: ChipVariant,
    isSelected: boolean
  ): { bg: string; textColor: string; border?: string } => {
    if (isSelected) {
      return { bg: colorVal, textColor: theme.colors.textInverse };
    }

    const variants: Record<ChipVariant, { bg: string; textColor: string; border?: string }> = {
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
        bg: lightColorVal + '25',
        textColor: colorVal,
      },
    };
    return variants[v];
  };

  const variantStyle = getVariantStyle(variant, selected);

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled, selected }}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: variantStyle.bg,
          borderRadius: theme.radii.full,
          paddingHorizontal: theme.spacing.sm + 4,
          paddingVertical: theme.spacing.xs + 2,
          opacity: disabled ? 0.5 : pressed ? 0.8 : 1,
          ...(variantStyle.border && {
            borderWidth: 1,
            borderColor: variantStyle.border,
          }),
        },
        style,
      ]}
    >
      {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

      <Text
        style={[
          {
            fontSize: theme.typography.fontSize.sm,
            color: variantStyle.textColor,
            fontFamily: theme.typography.fontFamily.medium,
          },
          textStyle,
        ]}
        numberOfLines={1}
      >
        {label}
      </Text>

      {onClose && (
        <Pressable
          onPress={disabled ? undefined : onClose}
          style={styles.closeButton}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={`Remove ${label}`}
        >
          <Text
            style={{
              fontSize: theme.typography.fontSize.sm,
              color: variantStyle.textColor,
              fontFamily: theme.typography.fontFamily.bold,
              lineHeight: theme.typography.fontSize.sm,
            }}
          >
            ✕
          </Text>
        </Pressable>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  leftIcon: {
    marginRight: 6,
  },
  closeButton: {
    marginLeft: 6,
    padding: 2,
  },
});
