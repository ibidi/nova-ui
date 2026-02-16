import React, { useEffect, useRef } from 'react';
import {
  Pressable,
  Text,
  View,
  Animated,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { ShimmerButtonProps, ShimmerButtonColor } from './ShimmerButton.types';

const COLOR_MAP: Record<ShimmerButtonColor, keyof import('../../theme/types').NovaColors> = {
  primary: 'primary',
  secondary: 'secondary',
  success: 'success',
  error: 'error',
};

const SIZE_STYLES = {
  sm: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    minHeight: 32,
    fontSize: 12,
  },
  md: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 44,
    fontSize: 14,
  },
  lg: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    minHeight: 52,
    fontSize: 16,
  },
} as const;

export const ShimmerButton: React.FC<ShimmerButtonProps> = ({
  color = 'primary',
  size = 'md',
  style,
  textStyle,
  children,
  ...pressableProps
}) => {
  const theme = useTheme();
  const shimmerAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const bgColor = theme.colors[COLOR_MAP[color]];
  const sizeConfig = SIZE_STYLES[size];

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      { resetBeforeIteration: true }
    );
    loop.start();
    return () => loop.stop();
  }, [shimmerAnim]);

  const shimmerTranslateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 400],
  });

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 50,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
    }).start();
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      {...pressableProps}
    >
      <Animated.View
        style={[
          styles.container,
          {
            backgroundColor: bgColor,
            borderRadius: theme.radii.md,
            paddingHorizontal: sizeConfig.paddingHorizontal,
            paddingVertical: sizeConfig.paddingVertical,
            minHeight: sizeConfig.minHeight,
            transform: [{ scale: scaleAnim }],
          },
          style,
        ]}
      >
        <View style={StyleSheet.absoluteFill}>
          <Animated.View
            style={[
              styles.shimmer,
              {
                transform: [
                  { translateX: shimmerTranslateX },
                  { rotate: '15deg' },
                ],
              },
            ]}
          />
        </View>
        <Text
          style={[
            styles.text,
            {
              fontSize: sizeConfig.fontSize,
              fontFamily: theme.typography.fontFamily.semibold,
              color: theme.colors.textInverse,
            },
            textStyle,
          ]}
        >
          {children}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shimmer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  text: {
    zIndex: 1,
  },
});
