import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { View, Animated } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { StaggeredListProps } from './StaggeredList.types';

export const StaggeredList: React.FC<StaggeredListProps> = ({
  animation = 'fadeUp',
  staggerDelay = 100,
  duration = 400,
  style,
  children,
}) => {
  const theme = useTheme();
  const childArray = React.Children.toArray(children);
  const animatedValuesRef = useRef<Animated.Value[]>([]);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const count = childArray.length;
    while (animatedValuesRef.current.length < count) {
      animatedValuesRef.current.push(new Animated.Value(0));
    }
    setReady(true);
  }, [childArray.length]);

  useEffect(() => {
    if (!ready) return;
    const count = childArray.length;
    const valuesToAnimate = animatedValuesRef.current.slice(0, count);
    const animations = valuesToAnimate.map((animValue, index) =>
      Animated.timing(animValue, {
        toValue: 1,
        duration,
        useNativeDriver: true,
        delay: index * staggerDelay,
      })
    );

    Animated.parallel(animations).start();
  }, [ready, childArray.length, duration, staggerDelay]);

  const getAnimatedStyle = (index: number): Record<string, unknown> => {
    const animValue = animatedValuesRef.current[index];
    if (!animValue) return {};

    switch (animation) {
      case 'fadeUp':
        return {
          opacity: animValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
          transform: [
            {
              translateY: animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [30, 0],
              }),
            },
          ],
        };
      case 'fadeLeft':
        return {
          opacity: animValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
          transform: [
            {
              translateX: animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [-30, 0],
              }),
            },
          ],
        };
      case 'scaleIn':
        return {
          opacity: animValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
          transform: [
            {
              scale: animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 1],
              }),
            },
          ],
        };
      case 'fadeIn':
      default:
        return {
          opacity: animValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
        };
    }
  };

  return (
    <View style={[{ gap: theme.spacing.sm }, style]}>
      {childArray.map((child, index) => (
        <Animated.View key={index} style={getAnimatedStyle(index)}>
          {child}
        </Animated.View>
      ))}
    </View>
  );
};
