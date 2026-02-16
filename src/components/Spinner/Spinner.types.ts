import type { ViewStyle } from 'react-native';

export type SpinnerSize = 'sm' | 'md' | 'lg';
export type SpinnerColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

export interface SpinnerProps {
  size?: SpinnerSize;
  color?: SpinnerColor;
  label?: string;
  style?: ViewStyle;
}
