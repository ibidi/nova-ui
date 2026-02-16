import React, { useEffect, useRef, useState } from 'react';
import { Text, Animated, Easing } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { AnimatedNumberProps } from './AnimatedNumber.types';

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  duration = 800,
  prefix = '',
  suffix = '',
  decimals = 0,
  style,
}) => {
  const theme = useTheme();
  const [displayValue, setDisplayValue] = useState(value);
  const animatedValue = useRef(new Animated.Value(value)).current;
  const prevValueRef = useRef(value);

  useEffect(() => {
    const prevValue = prevValueRef.current;
    prevValueRef.current = value;

    animatedValue.setValue(prevValue);

    const listener = animatedValue.addListener(({ value: v }) => {
      setDisplayValue(v);
    });

    Animated.timing(animatedValue, {
      toValue: value,
      duration,
      useNativeDriver: false,
      easing: Easing.out(Easing.ease),
    }).start(() => {
      animatedValue.removeListener(listener);
      setDisplayValue(value);
    });

    return () => {
      animatedValue.removeListener(listener);
    };
  }, [value, duration, animatedValue]);

  const formatted = decimals >= 0
    ? displayValue.toFixed(decimals)
    : String(displayValue);

  return (
    <Text
      style={[
        {
          fontFamily: theme.typography.fontFamily.regular,
          fontSize: theme.typography.fontSize.md,
          lineHeight: theme.typography.fontSize.md * theme.typography.lineHeight.normal,
          color: theme.colors.text,
        },
        style,
      ]}
    >
      {prefix}{formatted}{suffix}
    </Text>
  );
};
