import React, {
  createContext,
  useState,
  useCallback,
  useRef,
} from 'react';
import { View, StyleSheet } from 'react-native';
import type { ToastConfig, ToastItem, ToastContextType } from './Toast.types';
import { ToastCard } from './Toast';

export const ToastContext = createContext<ToastContextType | null>(null);

let toastCounter = 0;

interface ToastProviderProps {
  children: React.ReactNode;
  maxVisible?: number;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  maxVisible = 3,
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const hide = useCallback((id: string) => {
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const hideAll = useCallback(() => {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current.clear();
    setToasts([]);
  }, []);

  const show = useCallback(
    (config: ToastConfig) => {
      const id = config.id || `toast_${++toastCounter}`;
      const toast: ToastItem = {
        id,
        type: config.type || 'info',
        title: config.title,
        description: config.description,
        duration: config.duration || 3000,
        position: config.position || 'top',
        onPress: config.onPress,
      };

      setToasts((prev) => {
        const filtered = prev.filter((t) => t.id !== id);
        const next = [...filtered, toast];
        return next.slice(-maxVisible);
      });

      if (toast.duration > 0) {
        const timer = setTimeout(() => hide(id), toast.duration);
        timersRef.current.set(id, timer);
      }
    },
    [hide, maxVisible]
  );

  const topToasts = toasts.filter((t) => t.position === 'top');
  const bottomToasts = toasts.filter((t) => t.position === 'bottom');

  return (
    <ToastContext.Provider value={{ show, hide, hideAll }}>
      {children}

      {topToasts.length > 0 && (
        <View style={[styles.container, styles.top]} pointerEvents="box-none">
          {topToasts.map((toast) => (
            <ToastCard key={toast.id} toast={toast} onDismiss={hide} />
          ))}
        </View>
      )}

      {bottomToasts.length > 0 && (
        <View
          style={[styles.container, styles.bottom]}
          pointerEvents="box-none"
        >
          {bottomToasts.map((toast) => (
            <ToastCard key={toast.id} toast={toast} onDismiss={hide} />
          ))}
        </View>
      )}
    </ToastContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 16,
    right: 16,
    zIndex: 9999,
    gap: 8,
  },
  top: {
    top: 60,
  },
  bottom: {
    bottom: 40,
  },
});
