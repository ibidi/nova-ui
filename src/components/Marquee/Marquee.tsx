import React, { useRef, useState, useCallback } from 'react';
import { View, Animated, Pressable } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { MarqueeProps } from './Marquee.types';

export const Marquee: React.FC<MarqueeProps> = ({
  speed = 1,
  direction = 'left',
  pauseOnPress = false,
  style,
  children,
}) => {
  const theme = useTheme();
  const [contentWidth, setContentWidth] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  const isPausedRef = useRef(false);

  const duration = Math.max(100, 5000 / speed);

  const startAnimation = useCallback(() => {
    if (contentWidth <= 0 || isPausedRef.current) return;

    translateX.setValue(0);
    const gap = theme.spacing.lg;
    const distance = contentWidth + gap;
    const toValue = direction === 'left' ? -distance : distance;

    animationRef.current = Animated.loop(
      Animated.timing(translateX, {
        toValue,
        duration,
        useNativeDriver: true,
      }),
      { resetBeforeIteration: true }
    );
    animationRef.current.start();
  }, [contentWidth, direction, duration, theme.spacing.lg, translateX]);

  const stopAnimation = useCallback(() => {
    animationRef.current?.stop();
    animationRef.current = null;
  }, []);

  React.useEffect(() => {
    if (contentWidth > 0 && !isPausedRef.current) {
      startAnimation();
    }
    return () => stopAnimation();
  }, [contentWidth, startAnimation, stopAnimation]);

  const handlePress = useCallback(() => {
    if (!pauseOnPress) return;
    isPausedRef.current = !isPausedRef.current;
    if (isPausedRef.current) {
      stopAnimation();
    } else {
      startAnimation();
    }
  }, [pauseOnPress, startAnimation, stopAnimation]);

  const handleLayout = useCallback(
    (e: { nativeEvent: { layout: { width: number } } }) => {
      const width = e.nativeEvent.layout.width;
      if (width > 0 && width !== contentWidth) {
        setContentWidth(width);
      }
    },
    [contentWidth]
  );

  const content = (
    <View style={{ flexDirection: 'row' }}>
      <View onLayout={handleLayout}>{children}</View>
      <View style={{ marginLeft: theme.spacing.lg }}>{children}</View>
    </View>
  );

  const animatedContent = (
    <Animated.View
      style={{
        flexDirection: 'row',
        transform: [{ translateX }],
      }}
    >
      {content}
    </Animated.View>
  );

  if (pauseOnPress) {
    return (
      <Pressable onPress={handlePress} style={[{ overflow: 'hidden' }, style]}>
        {animatedContent}
      </Pressable>
    );
  }

  return <View style={[{ overflow: 'hidden' }, style]}>{animatedContent}</View>;
};
