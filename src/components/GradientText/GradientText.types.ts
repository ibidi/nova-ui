import type { TextStyle } from 'react-native';

export interface GradientTextProps {
  colors?: string[];
  animated?: boolean;
  speed?: number;
  style?: TextStyle;
  children: string;
}
