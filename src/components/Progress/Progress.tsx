import React, { useRef, useEffect, useState, useCallback } from 'react';
import { View, Animated, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { ProgressProps, ProgressColor, ProgressSize } from './Progress.types';

const sizeMap: Record<ProgressSize, { linear: number; circular: number }> = {
  sm: { linear: 4, circular: 32 },
  md: { linear: 8, circular: 48 },
  lg: { linear: 12, circular: 64 },
};

const colorKeyMap: Record<ProgressColor, keyof import('../../theme/types').NovaColors> = {
  primary: 'primary',
  secondary: 'secondary',
  success: 'success',
  warning: 'warning',
  error: 'error',
  info: 'info',
};

export const Progress: React.FC<ProgressProps> = ({
  value,
  variant = 'linear',
  color = 'primary',
  size = 'md',
  showValue = false,
  animated = true,
  indeterminate = false,
  style,
}) => {
  const theme = useTheme();
  const [trackWidth, setTrackWidth] = useState(200);
  const animatedWidth = useRef(new Animated.Value(0)).current;
  const indeterminateTranslate = useRef(new Animated.Value(0)).current;
  const circularRotation = useRef(new Animated.Value(0)).current;

  const colorValue = theme.colors[colorKeyMap[color]];
  const onTrackLayout = useCallback((e: { nativeEvent: { layout: { width: number } } }) => {
    setTrackWidth(e.nativeEvent.layout.width);
  }, []);
  const dimensions = sizeMap[size];

  const clampedValue = Math.min(100, Math.max(0, value));

  useEffect(() => {
    if (indeterminate) {
      if (variant === 'linear') {
        const animation = Animated.loop(
          Animated.sequence([
            Animated.timing(indeterminateTranslate, {
              toValue: 1,
              duration: 800,
              useNativeDriver: true,
            }),
            Animated.timing(indeterminateTranslate, {
              toValue: 0,
              duration: 800,
              useNativeDriver: true,
            }),
          ])
        );
        animation.start();
        return () => animation.stop();
      }
      const animation = Animated.loop(
        Animated.timing(circularRotation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      );
      animation.start();
      return () => animation.stop();
    }
    if (animated) {
      Animated.timing(animatedWidth, {
        toValue: clampedValue,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      animatedWidth.setValue(clampedValue);
    }
    return undefined;
  }, [clampedValue, indeterminate, variant, animated, animatedWidth, indeterminateTranslate, circularRotation]);

  if (variant === 'linear') {
    const fillWidth = Math.max(trackWidth * 0.3, 20);
    const maxTranslate = Math.max(0, trackWidth - fillWidth);
    const indeterminateTranslateX = indeterminateTranslate.interpolate({
      inputRange: [0, 1],
      outputRange: [0, maxTranslate],
    });

    return (
      <View style={[styles.linearWrapper, style]}>
        <View
          onLayout={onTrackLayout}
          style={[
            styles.track,
            {
              height: dimensions.linear,
              borderRadius: dimensions.linear / 2,
              backgroundColor: theme.colors.surfaceVariant,
            },
          ]}
        >
          {indeterminate ? (
            <Animated.View
              style={[
                styles.fill,
                {
                  width: fillWidth,
                  height: dimensions.linear,
                  borderRadius: dimensions.linear / 2,
                  backgroundColor: colorValue,
                  transform: [{ translateX: indeterminateTranslateX }],
                },
              ]}
            />
          ) : (
            <Animated.View
              style={[
                styles.fill,
                {
                  height: dimensions.linear,
                  borderRadius: dimensions.linear / 2,
                  backgroundColor: colorValue,
                  width: animated
                    ? animatedWidth.interpolate({
                        inputRange: [0, 100],
                        outputRange: ['0%', '100%'],
                      })
                    : `${clampedValue}%`,
                },
              ]}
            />
          )}
        </View>
        {showValue && !indeterminate && (
          <Text
            style={[
              styles.valueText,
              {
                color: theme.colors.textSecondary,
                fontSize: theme.typography.fontSize.sm,
                fontFamily: theme.typography.fontFamily.medium,
                marginLeft: theme.spacing.sm,
              },
            ]}
          >
            {Math.round(clampedValue)}%
          </Text>
        )}
      </View>
    );
  }

  // Circular variant
  const rotation = indeterminate
    ? circularRotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
      })
    : `${(clampedValue / 100) * 360}deg`;

  return (
    <View style={[styles.circularWrapper, { width: dimensions.circular, height: dimensions.circular }, style]}>
      <View
        style={[
          styles.circularTrack,
          {
            width: dimensions.circular,
            height: dimensions.circular,
            borderRadius: dimensions.circular / 2,
            borderWidth: dimensions.circular / 6,
            borderColor: theme.colors.surfaceVariant,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.circularProgress,
          {
            width: dimensions.circular,
            height: dimensions.circular,
            borderRadius: dimensions.circular / 2,
            borderWidth: dimensions.circular / 6,
            borderColor: 'transparent',
            borderTopColor: colorValue,
            transform: [{ rotate: rotation }],
          },
        ]}
      />
      {showValue && !indeterminate && (
        <View style={[StyleSheet.absoluteFillObject, styles.circularValueWrapper]} pointerEvents="none">
          <Text
            style={[
              styles.circularValueText,
              {
                color: theme.colors.text,
                fontSize: dimensions.circular * 0.2,
                fontFamily: theme.typography.fontFamily.medium,
              },
            ]}
          >
            {Math.round(clampedValue)}%
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  linearWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  track: {
    flex: 1,
    overflow: 'hidden',
  },
  fill: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  valueText: {},
  circularWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circularTrack: {
    position: 'absolute',
  },
  circularProgress: {
    position: 'absolute',
  },
  circularValueWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circularValueText: {
    textAlign: 'center',
  },
});
