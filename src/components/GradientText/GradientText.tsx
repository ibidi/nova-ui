import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { GradientTextProps } from './GradientText.types';

export const GradientText: React.FC<GradientTextProps> = ({
  colors,
  animated = false,
  speed = 2000,
  style,
  children,
}) => {
  const theme = useTheme();
  const defaultColors = [
    theme.colors.primary,
    theme.colors.secondary,
    '#EC4899',
    theme.colors.info,
  ];
  const colorList = colors ?? defaultColors;
  const offsetAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!animated) return;
    const loop = Animated.loop(
      Animated.timing(offsetAnim, {
        toValue: colorList.length,
        duration: speed,
        useNativeDriver: false,
      }),
      { resetBeforeIteration: true }
    );
    loop.start();
    return () => loop.stop();
  }, [animated, speed, colorList.length, offsetAnim]);

  const chars = String(children).split('');
  const n = colorList.length;

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {chars.map((char, index) => {
        if (animated) {
          const inputRange = colorList.map((_, i) => i);
          const outputRange = inputRange.map(
            (_, offset) => colorList[(index + offset) % n]
          );
          const colorInterpolation = offsetAnim.interpolate({
            inputRange,
            outputRange,
          });
          return (
            <Animated.Text
              key={`${index}-${char}`}
              style={[
                {
                  fontFamily: theme.typography.fontFamily.regular,
                  fontSize: theme.typography.fontSize.md,
                  lineHeight: theme.typography.fontSize.md * theme.typography.lineHeight.normal,
                },
                style,
                {
                  color: colorInterpolation,
                },
              ]}
            >
              {char}
            </Animated.Text>
          );
        }

        const colorIndex = index % colorList.length;
        const color = colorList[colorIndex];

        return (
          <Text
            key={`${index}-${char}`}
            style={[
              {
                fontFamily: theme.typography.fontFamily.regular,
                fontSize: theme.typography.fontSize.md,
                lineHeight: theme.typography.fontSize.md * theme.typography.lineHeight.normal,
                color,
              },
              style,
            ]}
          >
            {char}
          </Text>
        );
      })}
    </View>
  );
};
