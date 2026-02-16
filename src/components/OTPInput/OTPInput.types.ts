import type { ViewStyle, TextStyle } from 'react-native';

export interface OTPInputProps {
  length?: number;
  value: string;
  onValueChange: (value: string) => void;
  onComplete?: (value: string) => void;
  secureEntry?: boolean;
  disabled?: boolean;
  error?: boolean;
  autoFocus?: boolean;
  style?: ViewStyle;
  cellStyle?: ViewStyle;
  textStyle?: TextStyle;
}
