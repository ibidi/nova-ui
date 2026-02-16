import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { GlowCardProps, GlowColor } from './GlowCard.types';

const GLOW_COLOR_MAP: Record<Exclude<GlowColor, 'rainbow'>, keyof import('../../theme/types').NovaColors> = {
  primary: 'primary',
  secondary: 'secondary',
  success: 'success',
  error: 'error',
};

const INTENSITY_CONFIG = {
  subtle: { shadowRadius: 8, opacityMin: 0.3, opacityMax: 0.6 },
  medium: { shadowRadius: 16, opacityMin: 0.4, opacityMax: 0.8 },
  strong: { shadowRadius: 24, opacityMin: 0.5, opacityMax: 1 },
};

const PADDING_MAP = {
  sm: 'sm' as const,
  md: 'md' as const,
  lg: 'lg' as const,
};

export const GlowCard: React.FC<GlowCardProps> = ({
  glowColor = 'primary',
  intensity = 'medium',
  animated = true,
  padding = 'md',
  style,
  children,
}) => {
  const theme = useTheme();
  const pulseAnim = useRef(new Animated.Value(0)).current;
  const rainbowAnim = useRef(new Animated.Value(0)).current;

  const config = INTENSITY_CONFIG[intensity];
  const paddingKey = PADDING_MAP[padding];
  const paddingValue = theme.spacing[paddingKey];

  const getGlowColor = (): string => {
    if (glowColor === 'rainbow') {
      return theme.colors.primary;
    }
    return theme.colors[GLOW_COLOR_MAP[glowColor]];
  };

  useEffect(() => {
    if (!animated) return;

    if (glowColor === 'rainbow') {
      const rainbowLoop = Animated.loop(
        Animated.timing(rainbowAnim, {
          toValue: 4,
          duration: 3000,
          useNativeDriver: false,
        }),
        { resetBeforeIteration: true }
      );
      const pulseLoop = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: false,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: false,
          }),
        ])
      );
      rainbowLoop.start();
      pulseLoop.start();
      return () => {
        rainbowLoop.stop();
        pulseLoop.stop();
      };
    }

    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: false,
        }),
      ])
    );
    pulseLoop.start();
    return () => pulseLoop.stop();
  }, [animated, glowColor, pulseAnim, rainbowAnim]);

  const rainbowColors = [
    theme.colors.primary,
    theme.colors.secondary,
    theme.colors.success,
    theme.colors.error,
    theme.colors.primary,
  ];

  const shadowColor = glowColor === 'rainbow'
    ? rainbowAnim.interpolate({
        inputRange: [0, 1, 2, 3, 4],
        outputRange: rainbowColors,
      })
    : getGlowColor();

  const shadowOpacity = glowColor === 'rainbow'
    ? pulseAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [config.opacityMin, config.opacityMax],
      })
    : pulseAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [config.opacityMin, config.opacityMax],
      });

  const borderColor = glowColor === 'rainbow'
    ? rainbowAnim.interpolate({
        inputRange: [0, 1, 2, 3, 4],
        outputRange: rainbowColors,
      })
    : getGlowColor();

  return (
    <Animated.View
      style={[
        styles.outer,
        {
          borderRadius: theme.radii.lg,
          shadowRadius: config.shadowRadius,
          shadowColor,
          shadowOpacity,
          shadowOffset: { width: 0, height: 0 },
          borderWidth: 1,
          borderColor,
        },
        style,
      ]}
    >
      <View
        style={[
          styles.inner,
          {
            backgroundColor: theme.colors.surface,
            borderRadius: theme.radii.lg,
            padding: paddingValue,
          },
        ]}
      >
        {children}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  outer: {
    overflow: 'hidden',
  },
  inner: {
    overflow: 'hidden',
  },
});
