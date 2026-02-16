import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { StackProps, HStackProps, VStackProps } from './Stack.types';

export const Stack: React.FC<StackProps> = ({
  direction = 'vertical',
  spacing = 'md',
  align,
  justify,
  wrap = false,
  style,
  children,
  ...viewProps
}) => {
  const theme = useTheme();

  return (
    <View
      style={[
        {
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
          gap: theme.spacing[spacing],
          ...(align && { alignItems: align }),
          ...(justify && { justifyContent: justify }),
          ...(wrap && { flexWrap: 'wrap' }),
        },
        style,
      ]}
      {...viewProps}
    >
      {children}
    </View>
  );
};

export const HStack: React.FC<HStackProps> = (props) => (
  <Stack direction="horizontal" {...props} />
);

export const VStack: React.FC<VStackProps> = (props) => (
  <Stack direction="vertical" {...props} />
);
