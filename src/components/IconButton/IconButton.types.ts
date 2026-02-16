import type { PressableProps, ViewStyle } from 'react-native';

export type IconButtonVariant = 'solid' | 'outline' | 'ghost' | 'soft';
export type IconButtonSize = 'sm' | 'md' | 'lg';
export type IconButtonColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

export interface IconButtonProps extends Omit<PressableProps, 'style'> {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  color?: IconButtonColor;
  rounded?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  children: React.ReactNode;
}
