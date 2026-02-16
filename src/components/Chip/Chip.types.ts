import type { ViewStyle, TextStyle } from 'react-native';

export type ChipVariant = 'solid' | 'outline' | 'soft';
export type ChipColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

export interface ChipProps {
  variant?: ChipVariant;
  color?: ChipColor;
  label: string;
  selected?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  onPress?: () => void;
  onClose?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}
