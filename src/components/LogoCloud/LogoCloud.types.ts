import type { ViewStyle, ImageSourcePropType } from 'react-native';

export type LogoCloudVariant = 'grid' | 'marquee' | 'blur-flip' | 'spotlight';
export type LogoCloudColumns = 2 | 3 | 4 | 5 | 6;
export type LogoCloudSize = 'sm' | 'md' | 'lg';

export interface LogoItem {
  id: string;
  name: string;
  image?: ImageSourcePropType;
  uri?: string;
  onPress?: () => void;
}

export interface LogoCloudProps {
  logos: LogoItem[];
  variant?: LogoCloudVariant;
  columns?: LogoCloudColumns;
  size?: LogoCloudSize;
  title?: string;
  subtitle?: string;
  showNames?: boolean;
  animated?: boolean;
  marqueeSpeed?: number;
  marqueeDirection?: 'left' | 'right';
  pauseOnPress?: boolean;
  gap?: number;
  logoStyle?: ViewStyle;
  style?: ViewStyle;
}
