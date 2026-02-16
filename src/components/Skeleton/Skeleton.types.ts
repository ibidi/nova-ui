import type { ViewStyle } from 'react-native';

export type SkeletonVariant = 'rectangular' | 'circular' | 'text';

export interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: number | string;
  height?: number;
  radius?: number;
  style?: ViewStyle;
}
