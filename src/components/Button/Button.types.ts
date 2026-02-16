import type { PressableProps, ViewStyle, TextStyle } from 'react-native';
import type { NovaTheme } from '../../theme/types';

export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'soft';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

export interface ButtonProps extends Omit<PressableProps, 'style'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children: React.ReactNode;
}

export interface ButtonStylesParams {
  variant: ButtonVariant;
  size: ButtonSize;
  color: ButtonColor;
  fullWidth: boolean;
  disabled: boolean;
  pressed: boolean;
  theme: NovaTheme;
}
