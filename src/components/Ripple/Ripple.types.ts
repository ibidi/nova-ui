import type { PressableProps, ViewStyle } from 'react-native';

export interface RippleProps extends Omit<PressableProps, 'style'> {
  rippleColor?: string;
  rippleOpacity?: number;
  rippleDuration?: number;
  style?: ViewStyle;
  children: React.ReactNode;
}
