import type { ViewProps, ViewStyle } from 'react-native';
import type { NovaSpacing } from '../../theme/types';

type SpacingKey = keyof NovaSpacing;

export interface StackProps extends ViewProps {
  direction?: 'horizontal' | 'vertical';
  spacing?: SpacingKey;
  align?: ViewStyle['alignItems'];
  justify?: ViewStyle['justifyContent'];
  wrap?: boolean;
  style?: ViewStyle;
  children: React.ReactNode;
}

export type HStackProps = Omit<StackProps, 'direction'>;
export type VStackProps = Omit<StackProps, 'direction'>;
