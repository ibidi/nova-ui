import type { ViewStyle, TextStyle } from 'react-native';

export type RadioColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error';
export type RadioSize = 'sm' | 'md' | 'lg';

export interface RadioOption<T extends string = string> {
  value: T;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps<T extends string = string> {
  options: RadioOption<T>[];
  value: T;
  onValueChange: (value: T) => void;
  color?: RadioColor;
  size?: RadioSize;
  direction?: 'horizontal' | 'vertical';
  spacing?: number;
  disabled?: boolean;
  style?: ViewStyle;
  labelStyle?: TextStyle;
}
