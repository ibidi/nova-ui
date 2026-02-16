import type { ViewStyle, TextStyle } from 'react-native';

export interface TabItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
}

export type TabVariant = 'underline' | 'pill' | 'soft';
export type TabSize = 'sm' | 'md' | 'lg';

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (key: string) => void;
  variant?: TabVariant;
  size?: TabSize;
  fullWidth?: boolean;
  style?: ViewStyle;
  tabStyle?: ViewStyle;
  labelStyle?: TextStyle;
}
