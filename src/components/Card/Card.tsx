import React from 'react';
import { View } from 'react-native';
import type { ViewStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { CardProps, CardVariant } from './Card.types';

export const Card: React.FC<CardProps> = ({
  variant = 'elevated',
  padding = 'md',
  rounded = 'lg',
  style,
  children,
  ...viewProps
}) => {
  const theme = useTheme();

  const paddingMap = {
    none: 0,
    sm: theme.spacing.sm,
    md: theme.spacing.md,
    lg: theme.spacing.lg,
  };

  const variantStyles: Record<CardVariant, ViewStyle> = {
    elevated: {
      backgroundColor: theme.colors.surface,
      ...theme.shadows.md,
    },
    outlined: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    filled: {
      backgroundColor: theme.colors.surfaceVariant,
    },
  };

  return (
    <View
      style={[
        {
          borderRadius: theme.radii[rounded],
          padding: paddingMap[padding],
          overflow: 'hidden',
        },
        variantStyles[variant],
        style,
      ]}
      {...viewProps}
    >
      {children}
    </View>
  );
};
