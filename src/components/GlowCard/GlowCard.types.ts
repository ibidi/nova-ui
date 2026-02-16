import type { ViewStyle } from 'react-native';

export type GlowColor = 'primary' | 'secondary' | 'success' | 'error' | 'rainbow';

export interface GlowCardProps {
  glowColor?: GlowColor;
  intensity?: 'subtle' | 'medium' | 'strong';
  animated?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
  children: React.ReactNode;
}
