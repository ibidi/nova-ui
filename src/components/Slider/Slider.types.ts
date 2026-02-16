import type { ViewStyle } from 'react-native';

export type SliderColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error';

export interface SliderProps {
  value: number; // 0-1
  onValueChange: (value: number) => void;
  onSlidingComplete?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  color?: SliderColor;
  showValue?: boolean;
  style?: ViewStyle;
}
