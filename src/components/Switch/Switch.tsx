import React, { useRef, useEffect } from 'react';
import {
  Pressable,
  Animated,
  Text,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { NovaSwitchProps, SwitchSize } from './Switch.types';

export const NovaSwitch: React.FC<NovaSwitchProps> = ({
  value,
  onValueChange,
  color = 'primary',
  size = 'md',
  disabled = false,
  label,
  style,
}) => {
  const theme = useTheme();
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value, animatedValue]);

  const sizeMap: Record<SwitchSize, { track: { w: number; h: number }; thumb: number }> = {
    sm: { track: { w: 36, h: 20 }, thumb: 16 },
    md: { track: { w: 48, h: 26 }, thumb: 22 },
    lg: { track: { w: 56, h: 30 }, thumb: 26 },
  };

  const { track, thumb } = sizeMap[size];
  const padding = (track.h - thumb) / 2;
  const colorValue = theme.colors[color];

  const trackBg = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.border, colorValue],
  });

  const thumbTranslate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [padding, track.w - thumb - padding],
  });

  return (
    <Pressable
      onPress={() => !disabled && onValueChange(!value)}
      disabled={disabled}
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled }}
      accessibilityLabel={label}
      style={[styles.wrapper, disabled && styles.disabled, style]}
    >
      {label && (
        <Text
          style={[
            styles.label,
            {
              color: theme.colors.text,
              fontFamily: theme.typography.fontFamily.regular,
              fontSize: theme.typography.fontSize.md,
              marginRight: theme.spacing.sm,
            },
          ]}
        >
          {label}
        </Text>
      )}

      <Animated.View
        style={[
          {
            width: track.w,
            height: track.h,
            borderRadius: track.h / 2,
            backgroundColor: trackBg,
            justifyContent: 'center',
          },
        ]}
      >
        <Animated.View
          style={{
            width: thumb,
            height: thumb,
            borderRadius: thumb / 2,
            backgroundColor: '#FFFFFF',
            transform: [{ translateX: thumbTranslate }],
            ...theme.shadows.sm,
          }}
        />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {},
  disabled: {
    opacity: 0.5,
  },
});
