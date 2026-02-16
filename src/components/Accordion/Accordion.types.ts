import type { ViewStyle } from 'react-native';

export interface AccordionItem {
  key: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultExpandedKeys?: string[];
  style?: ViewStyle;
}
