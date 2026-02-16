import type { PressableProps, ViewStyle, TextStyle } from 'react-native';

export type ShimmerButtonColor = 'primary' | 'secondary' | 'success' | 'error';

export interface ShimmerButtonProps extends Omit<PressableProps, 'style'> {
  color?: ShimmerButtonColor;
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
  textStyle?: TextStyle;
  children: React.ReactNode;
}
