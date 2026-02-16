import React, { useRef, useEffect } from 'react';
import { Pressable, Animated, Text, View, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { RadioGroupProps, RadioSize } from './Radio.types';

interface RadioButtonProps {
  selected: boolean;
  onPress: () => void;
  label: string;
  color: string;
  size: RadioSize;
  disabled: boolean;
  labelStyle?: object;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  selected,
  onPress,
  label,
  color,
  size,
  disabled,
  labelStyle,
}) => {
  const theme = useTheme();
  const animatedValue = useRef(new Animated.Value(selected ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: selected ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [selected, animatedValue]);

  const sizeMap: Record<RadioSize, { outer: number; inner: number; fontSize: number }> = {
    sm: { outer: 18, inner: 8, fontSize: theme.typography.fontSize.sm },
    md: { outer: 22, inner: 10, fontSize: theme.typography.fontSize.md },
    lg: { outer: 28, inner: 14, fontSize: theme.typography.fontSize.lg },
  };

  const { outer, inner, fontSize } = sizeMap[size];

  const borderColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.border, color],
  });

  const innerScale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      accessibilityRole="radio"
      accessibilityState={{ checked: selected, disabled }}
      accessibilityLabel={label}
      style={[styles.radioWrapper, disabled && styles.disabled]}
    >
      <Animated.View
        style={[
          styles.outerCircle,
          {
            width: outer,
            height: outer,
            borderRadius: outer / 2,
            borderWidth: 2,
            borderColor,
          },
        ]}
      >
        <Animated.View
          style={{
            width: inner,
            height: inner,
            borderRadius: inner / 2,
            backgroundColor: color,
            transform: [{ scale: innerScale }],
          }}
        />
      </Animated.View>

      <Text
        style={[
          styles.radioLabel,
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
    </Pressable>
  );
};

export function RadioGroup<T extends string = string>({
  options,
  value,
  onValueChange,
  color = 'primary',
  size = 'md',
  direction = 'vertical',
  spacing,
  disabled = false,
  style,
  labelStyle,
}: RadioGroupProps<T>) {
  const theme = useTheme();
  const colorValue = theme.colors[color];
  const gap = spacing ?? theme.spacing.sm;

  return (
    <View
      style={[
        {
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
          gap,
        },
        style,
      ]}
      accessibilityRole="radiogroup"
    >
      {options.map((option) => (
        <RadioButton
          key={option.value}
          selected={value === option.value}
          onPress={() => onValueChange(option.value)}
          label={option.label}
          color={colorValue}
          size={size}
          disabled={disabled || !!option.disabled}
          labelStyle={labelStyle}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  radioWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  outerCircle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioLabel: {},
  disabled: {
    opacity: 0.5,
  },
});
