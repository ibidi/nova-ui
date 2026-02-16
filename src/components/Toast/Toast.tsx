import React, { useEffect, useRef } from 'react';
import { Animated, Text, Pressable, StyleSheet, View } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { NovaTheme } from '../../theme/types';
import type { ToastItem, ToastType } from './Toast.types';

function getToastColors(
  theme: NovaTheme,
  type: ToastType
): { bg: string; border: string; text: string; icon: string } {
  const map: Record<ToastType, { bg: string; border: string; text: string; icon: string }> = {
    success: {
      bg: theme.colors.successLight + '20',
      border: theme.colors.success,
      text: theme.dark ? theme.colors.successLight : theme.colors.successDark,
      icon: '✓',
    },
    error: {
      bg: theme.colors.errorLight + '20',
      border: theme.colors.error,
      text: theme.dark ? theme.colors.errorLight : theme.colors.errorDark,
      icon: '✕',
    },
    warning: {
      bg: theme.colors.warningLight + '20',
      border: theme.colors.warning,
      text: theme.dark ? theme.colors.warningLight : theme.colors.warningDark,
      icon: '⚠',
    },
    info: {
      bg: theme.colors.infoLight + '20',
      border: theme.colors.info,
      text: theme.dark ? theme.colors.infoLight : theme.colors.infoDark,
      icon: 'ℹ',
    },
  };
  return map[type];
}

interface ToastCardProps {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}

export const ToastCard: React.FC<ToastCardProps> = ({ toast, onDismiss }) => {
  const theme = useTheme();
  const translateY = useRef(new Animated.Value(-20)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }, [translateY, opacity]);

  const colors = getToastColors(theme, toast.type);

  return (
    <Animated.View
      style={[
        styles.toast,
        {
          backgroundColor: theme.colors.surface,
          borderRadius: theme.radii.lg,
          borderLeftWidth: 4,
          borderLeftColor: colors.border,
          ...theme.shadows.lg,
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      <Pressable
        style={styles.content}
        onPress={() => {
          toast.onPress?.();
          onDismiss(toast.id);
        }}
      >
        <View style={styles.iconContainer}>
          <Text style={[styles.icon, { color: colors.border }]}>
            {colors.icon}
          </Text>
        </View>

        <View style={styles.textContainer}>
          <Text
            style={{
              fontSize: theme.typography.fontSize.md,
              fontFamily: theme.typography.fontFamily.semibold,
              color: theme.colors.text,
            }}
            numberOfLines={1}
          >
            {toast.title}
          </Text>
          {toast.description && (
            <Text
              style={{
                fontSize: theme.typography.fontSize.sm,
                fontFamily: theme.typography.fontFamily.regular,
                color: theme.colors.textSecondary,
                marginTop: 2,
              }}
              numberOfLines={2}
            >
              {toast.description}
            </Text>
          )}
        </View>

        <Pressable
          onPress={() => onDismiss(toast.id)}
          hitSlop={8}
          style={styles.dismissBtn}
        >
          <Text
            style={{
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.textSecondary,
            }}
          >
            ✕
          </Text>
        </Pressable>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toast: {
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  iconContainer: {
    marginRight: 10,
  },
  icon: {
    fontSize: 16,
  },
  textContainer: {
    flex: 1,
  },
  dismissBtn: {
    padding: 4,
    marginLeft: 8,
  },
});
