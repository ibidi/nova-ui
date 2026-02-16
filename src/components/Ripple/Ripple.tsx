import React, { useRef, useCallback } from 'react';
import {
  Pressable,
  View,
  Animated,
  StyleSheet,
  type LayoutChangeEvent,
  type GestureResponderEvent,
} from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { RippleProps } from './Ripple.types';

interface RippleItem {
  id: number;
  x: number;
  y: number;
  scale: Animated.Value;
  opacity: Animated.Value;
}

export const Ripple: React.FC<RippleProps> = ({
  rippleColor = 'rgba(255,255,255,0.3)',
  rippleOpacity = 0.3,
  rippleDuration = 400,
  style,
  children,
  onPressIn,
  onPressOut,
  onPress,
  ...pressableProps
}) => {
  const theme = useTheme();
  const [ripples, setRipples] = React.useState<RippleItem[]>([]);
  const rippleIdRef = useRef(0);
  const containerLayout = useRef({ width: 0, height: 0 });

  const handleLayout = useCallback((e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    containerLayout.current = { width, height };
  }, []);

  const handlePressIn = useCallback(
    (e: GestureResponderEvent) => {
      const { locationX, locationY } = e.nativeEvent;
      const { width, height } = containerLayout.current;
      const size = Math.max(width, height) * 2;
      const x = locationX - size / 2;
      const y = locationY - size / 2;

      const id = rippleIdRef.current++;
      const scale = new Animated.Value(0);
      const opacity = new Animated.Value(rippleOpacity);

      const ripple: RippleItem = { id, x, y, scale, opacity };
      setRipples((prev) => [...prev, ripple]);

      Animated.parallel([
        Animated.timing(scale, {
          toValue: 1,
          duration: rippleDuration,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: rippleDuration,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      });

      onPressIn?.(e);
    },
    [rippleOpacity, rippleDuration, onPressIn]
  );

  const handlePressOut = useCallback(
    (e: GestureResponderEvent) => {
      onPressOut?.(e);
    },
    [onPressOut]
  );

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      style={[styles.container, { borderRadius: theme.radii.md }, style]}
      {...pressableProps}
    >
      <View
        style={[styles.content, { overflow: 'hidden' }]}
        onLayout={handleLayout}
      >
        {children}
        {ripples.map((ripple) => {
          const { width, height } = containerLayout.current;
          const size = Math.max(width, height, 1) * 2;
          return (
            <Animated.View
              key={ripple.id}
              pointerEvents="none"
              style={[
                styles.ripple,
                {
                  left: ripple.x,
                  top: ripple.y,
                  width: size,
                  height: size,
                  borderRadius: size / 2,
                  backgroundColor: rippleColor,
                  opacity: ripple.opacity,
                  transform: [{ scale: ripple.scale }],
                },
              ]}
            />
          );
        })}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  content: {
    position: 'relative',
  },
  ripple: {
    position: 'absolute',
  },
});
