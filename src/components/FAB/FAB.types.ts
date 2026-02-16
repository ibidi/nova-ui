import type { PressableProps, ViewStyle } from 'react-native';

export type FABSize = 'sm' | 'md' | 'lg';
export type FABPosition = 'bottom-right' | 'bottom-left' | 'bottom-center';
export type FABColor = 'primary' | 'secondary' | 'success' | 'error';

export interface FABProps extends Omit<PressableProps, 'style'> {
  size?: FABSize;
  color?: FABColor;
  position?: FABPosition;
  label?: string;
  icon: React.ReactNode;
  style?: ViewStyle;
}
