import type { ViewStyle } from 'react-native';

export type BottomSheetHeight = 'auto' | 'half' | 'full';

export interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  height?: BottomSheetHeight;
  showHandle?: boolean;
  closeOnBackdrop?: boolean;
  style?: ViewStyle;
  children: React.ReactNode;
}
