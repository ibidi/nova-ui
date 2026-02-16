import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { SkeletonProps, SkeletonVariant } from './Skeleton.types';

const variantDefaults: Record<
  SkeletonVariant,
  { width: number | string; height: number; radius?: number }
> = {
  rectangular: { width: '100%', height: 100 },
  circular: { width: 48, height: 48 },
  text: { width: '100%', height: 14, radius: 4 },
};

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rectangular',
  width,
  height,
  radius,
  style,
}) => {
  const theme = useTheme();
  const shimmerValue = useRef(new Animated.Value(0)).current;

  const defaults = variantDefaults[variant];
  const finalWidth = width ?? defaults.width;
  const finalHeight = height ?? defaults.height;
  const finalRadius =
    radius ??
    (variant === 'circular' ? finalHeight / 2 : defaults.radius ?? theme.radii.md);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerValue, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerValue, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [shimmerValue]);

  const shimmerTranslateX = shimmerValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 300],
  });

  const containerStyle: ViewStyle = {
    width: finalWidth as ViewStyle['width'],
    height: finalHeight,
    borderRadius: finalRadius,
    backgroundColor: theme.colors.surfaceVariant,
  };

  return (
    <View style={[styles.container, containerStyle, style]}>
      <Animated.View
        style={[
          styles.shimmer,
          {
            backgroundColor: theme.colors.surface,
            borderLeftWidth: 1,
            borderLeftColor: theme.colors.border,
            transform: [{ translateX: shimmerTranslateX }],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 100,
  },
});
