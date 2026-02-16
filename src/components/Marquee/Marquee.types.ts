import type { ViewStyle } from 'react-native';

export type MarqueeDirection = 'left' | 'right';

export interface MarqueeProps {
  speed?: number;
  direction?: MarqueeDirection;
  pauseOnPress?: boolean;
  style?: ViewStyle;
  children: React.ReactNode;
}
