import type { ViewStyle, TextStyle } from 'react-native';

export type CheckboxColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error';
export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  color?: CheckboxColor;
  size?: CheckboxSize;
  label?: string;
  disabled?: boolean;
  style?: ViewStyle;
  labelStyle?: TextStyle;
}
