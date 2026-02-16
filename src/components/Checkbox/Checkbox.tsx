import React, { useRef, useEffect } from 'react';
import { Pressable, Animated, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { CheckboxProps, CheckboxSize } from './Checkbox.types';

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onCheckedChange,
  color = 'primary',
  size = 'md',
  label,
  disabled = false,
  style,
  labelStyle,
}) => {
  const theme = useTheme();
  const animatedValue = useRef(new Animated.Value(checked ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: checked ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [checked, animatedValue]);

  const sizeMap: Record<CheckboxSize, { box: number; check: number; fontSize: number }> = {
    sm: { box: 18, check: 10, fontSize: theme.typography.fontSize.sm },
    md: { box: 22, check: 13, fontSize: theme.typography.fontSize.md },
    lg: { box: 28, check: 16, fontSize: theme.typography.fontSize.lg },
  };

  const { box, check, fontSize } = sizeMap[size];
  const colorValue = theme.colors[color];

  const bgColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', colorValue],
  });

  const borderColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.border, colorValue],
  });

  const checkScale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <Pressable
      onPress={() => !disabled && onCheckedChange(!checked)}
      disabled={disabled}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      accessibilityLabel={label}
      style={[styles.wrapper, disabled && styles.disabled, style]}
    >
      <Animated.View
        style={[
          styles.box,
          {
            width: box,
            height: box,
            borderRadius: theme.radii.xs + 1,
            borderWidth: 2,
            borderColor,
            backgroundColor: bgColor,
          },
        ]}
      >
        <Animated.Text
          style={{
            fontSize: check,
            color: theme.colors.textInverse,
            transform: [{ scale: checkScale }],
            lineHeight: check + 2,
          }}
        >
          ✓
        </Animated.Text>
      </Animated.View>

      {label && (
        <Text
          style={[
            styles.label,
            {
              fontSize,
              color: theme.colors.text,
              fontFamily: theme.typography.fontFamily.regular,
              marginLeft: theme.spacing.sm,
            },
            labelStyle,
          ]}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {},
  disabled: {
    opacity: 0.5,
  },
});
