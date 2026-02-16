import React from 'react';
import { View } from 'react-native';
import type { ViewStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { BoxProps } from './Box.types';

export const Box: React.FC<BoxProps> = ({
  padding,
  paddingX,
  paddingY,
  margin,
  marginX,
  marginY,
  gap,
  flex,
  direction,
  align,
  justify,
  wrap = false,
  bg,
  rounded,
  shadow,
  style,
  children,
  ...viewProps
}) => {
  const theme = useTheme();

  const computedStyle: ViewStyle = {
    ...(padding && { padding: theme.spacing[padding] }),
    ...(paddingX && { paddingHorizontal: theme.spacing[paddingX] }),
    ...(paddingY && { paddingVertical: theme.spacing[paddingY] }),
    ...(margin && { margin: theme.spacing[margin] }),
    ...(marginX && { marginHorizontal: theme.spacing[marginX] }),
    ...(marginY && { marginVertical: theme.spacing[marginY] }),
    ...(gap && { gap: theme.spacing[gap] }),
    ...(flex !== undefined && { flex }),
    ...(direction && { flexDirection: direction }),
    ...(align && { alignItems: align }),
    ...(justify && { justifyContent: justify }),
    ...(wrap && { flexWrap: 'wrap' }),
    ...(bg && { backgroundColor: bg }),
    ...(rounded && { borderRadius: theme.radii[rounded] }),
    ...(shadow && theme.shadows[shadow]),
  };

  return (
    <View style={[computedStyle, style]} {...viewProps}>
      {children}
    </View>
  );
};
