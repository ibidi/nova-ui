import React, { useRef, useEffect } from 'react';
import { View, Animated, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { SpinnerProps, SpinnerSize } from './Spinner.types';

const sizeMap: Record<SpinnerSize, number> = {
  sm: 20,
  md: 32,
  lg: 48,
};

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color = 'primary',
  label,
  style,
}) => {
  const theme = useTheme();
  const spinValue = useRef(new Animated.Value(0)).current;

  const colorValue = theme.colors[color];
  const dimension = sizeMap[size];

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      })
    );
    animation.start();
    return () => animation.stop();
  }, [spinValue]);

  const rotation = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={[styles.container, style]}>
      <Animated.View
        style={[
          styles.spinner,
          {
            width: dimension,
            height: dimension,
            borderRadius: dimension / 2,
            borderWidth: dimension / 6,
            borderColor: 'transparent',
            borderTopColor: colorValue,
            transform: [{ rotate: rotation }],
          },
        ]}
      />
      {label && (
        <Text
          style={[
            styles.label,
            {
              color: theme.colors.textSecondary,
              fontSize: theme.typography.fontSize.sm,
              fontFamily: theme.typography.fontFamily.regular,
              marginTop: theme.spacing.sm,
            },
          ]}
        >
          {label}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {},
  label: {
    textAlign: 'center',
  },
});
