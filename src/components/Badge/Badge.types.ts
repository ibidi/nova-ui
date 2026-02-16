import type { ViewStyle, TextStyle } from 'react-native';

export type BadgeVariant = 'solid' | 'outline' | 'soft';
export type BadgeColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps {
  variant?: BadgeVariant;
  color?: BadgeColor;
  size?: BadgeSize;
  label: string;
  rounded?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export interface BadgeDotProps {
  color?: BadgeColor;
  size?: number;
  style?: ViewStyle;
}
