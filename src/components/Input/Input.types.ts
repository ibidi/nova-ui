import type { TextInputProps, ViewStyle, TextStyle } from 'react-native';

export type InputVariant = 'outline' | 'filled' | 'underline';
export type InputSize = 'sm' | 'md' | 'lg';

export interface NovaInputProps extends Omit<TextInputProps, 'style'> {
  variant?: InputVariant;
  size?: InputSize;
  label?: string;
  helperText?: string;
  errorText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
}
