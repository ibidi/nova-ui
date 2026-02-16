import type { ViewStyle } from 'react-native';

export type ModalSize = 'sm' | 'md' | 'lg' | 'full';

export interface NovaModalProps {
  visible: boolean;
  onClose: () => void;
  size?: ModalSize;
  title?: string;
  closeOnBackdrop?: boolean;
  showCloseButton?: boolean;
  animationType?: 'fade' | 'slide' | 'none';
  style?: ViewStyle;
  children: React.ReactNode;
}
