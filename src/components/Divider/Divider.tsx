import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { DividerProps } from './Divider.types';

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  thickness = 1,
  color,
  spacing,
  style,
}) => {
  const theme = useTheme();

  const dividerColor = color || theme.colors.border;
  const dividerSpacing = spacing ?? theme.spacing.sm;

  const isHorizontal = orientation === 'horizontal';

  return (
    <View
      style={[
        {
          backgroundColor: dividerColor,
          ...(isHorizontal
            ? {
                height: thickness,
                width: '100%',
                marginVertical: dividerSpacing,
              }
            : {
                width: thickness,
                height: '100%',
                marginHorizontal: dividerSpacing,
              }),
        },
        style,
      ]}
      accessibilityRole="none"
    />
  );
};
