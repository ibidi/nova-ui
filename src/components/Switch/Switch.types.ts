import type { ViewStyle } from 'react-native';

export type SwitchColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error';
export type SwitchSize = 'sm' | 'md' | 'lg';

export interface NovaSwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  color?: SwitchColor;
  size?: SwitchSize;
  disabled?: boolean;
  label?: string;
  style?: ViewStyle;
}
