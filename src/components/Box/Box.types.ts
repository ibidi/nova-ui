import type { ViewProps, ViewStyle } from 'react-native';
import type { NovaSpacing } from '../../theme/types';

type SpacingKey = keyof NovaSpacing;

export interface BoxProps extends ViewProps {
  padding?: SpacingKey;
  paddingX?: SpacingKey;
  paddingY?: SpacingKey;
  margin?: SpacingKey;
  marginX?: SpacingKey;
  marginY?: SpacingKey;
  gap?: SpacingKey;
  flex?: number;
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  align?: ViewStyle['alignItems'];
  justify?: ViewStyle['justifyContent'];
  wrap?: boolean;
  bg?: string;
  rounded?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  style?: ViewStyle;
  children?: React.ReactNode;
}
