import type { TextInputProps, ViewStyle } from 'react-native';

export interface SearchBarProps extends Omit<TextInputProps, 'style'> {
  value: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
  onSubmit?: () => void;
  placeholder?: string;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}
