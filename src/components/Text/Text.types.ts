import type { TextProps as RNTextProps } from 'react-native';

export type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'body'
  | 'bodySmall'
  | 'caption'
  | 'label'
  | 'overline';

export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';
export type TextColor = 'default' | 'secondary' | 'disabled' | 'inverse' | 'primary' | 'success' | 'warning' | 'error' | 'info';
export type TextAlign = 'auto' | 'left' | 'right' | 'center' | 'justify';

export interface NovaTextProps extends RNTextProps {
  variant?: TextVariant;
  weight?: TextWeight;
  color?: TextColor;
  align?: TextAlign;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  uppercase?: boolean;
  children: React.ReactNode;
}
