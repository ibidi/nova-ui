import type { ViewStyle } from 'react-native';

export type ProgressVariant = 'linear' | 'circular';
export type ProgressColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';
export type ProgressSize = 'sm' | 'md' | 'lg';

export interface ProgressProps {
  value: number; // 0-100
  variant?: ProgressVariant;
  color?: ProgressColor;
  size?: ProgressSize;
  showValue?: boolean;
  animated?: boolean;
  indeterminate?: boolean;
  style?: ViewStyle;
}
