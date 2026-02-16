import type { ViewStyle } from 'react-native';

export type StaggerAnimation = 'fadeUp' | 'fadeLeft' | 'scaleIn' | 'fadeIn';

export interface StaggeredListProps {
  animation?: StaggerAnimation;
  staggerDelay?: number;
  duration?: number;
  style?: ViewStyle;
  children: React.ReactNode;
}
