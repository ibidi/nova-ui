import type { ViewStyle } from 'react-native';

export type DividerOrientation = 'horizontal' | 'vertical';

export interface DividerProps {
  orientation?: DividerOrientation;
  thickness?: number;
  color?: string;
  spacing?: number;
  style?: ViewStyle;
}
