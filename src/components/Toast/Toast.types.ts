export type ToastType = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition = 'top' | 'bottom';

export interface ToastConfig {
  id?: string;
  type?: ToastType;
  title: string;
  description?: string;
  duration?: number;
  position?: ToastPosition;
  onPress?: () => void;
}

export interface ToastItem extends Required<Pick<ToastConfig, 'id' | 'type' | 'title' | 'duration' | 'position'>> {
  description?: string;
  onPress?: () => void;
}

export interface ToastContextType {
  show: (config: ToastConfig) => void;
  hide: (id: string) => void;
  hideAll: () => void;
}
