import React, { useRef } from 'react';
import { Pressable, View, Animated, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { FABProps, FABSize, FABPosition } from './FAB.types';

const sizeMap: Record<FABSize, number> = {
  sm: 48,
  md: 56,
  lg: 64,
};

const positionMap: Record<
  FABPosition,
  { bottom: number; left?: number; right?: number; alignItems?: 'center' }
> = {
  'bottom-right': { bottom: 24, right: 24 },
  'bottom-left': { bottom: 24, left: 24 },
  'bottom-center': { bottom: 24, left: 0, right: 0, alignItems: 'center' },
};

export const FAB: React.FC<FABProps> = ({
  size = 'md',
  color = 'primary',
  position = 'bottom-right',
  label,
  icon,
  style,
  onPressIn,
  onPressOut,
  ...pressableProps
}) => {
  const theme = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const colorValue = theme.colors[color];
  const dimension = sizeMap[size];
  const positionStyle = positionMap[position];

  const handlePressIn = (e: any) => {
    Animated.timing(scaleAnim, {
      toValue: 0.92,
      duration: 100,
      useNativeDriver: true,
    }).start();
    onPressIn?.(e);
  };

  const handlePressOut = (e: any) => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
    onPressOut?.(e);
  };

  const isExtended = Boolean(label);

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessibilityRole="button"
      style={[styles.wrapper, positionStyle]}
      {...pressableProps}
    >
      <Animated.View
        style={[
          styles.fab,
          {
            width: isExtended ? undefined : dimension,
            minWidth: dimension,
            height: dimension,
            backgroundColor: colorValue,
            borderRadius: theme.radii.lg,
            paddingHorizontal: isExtended ? theme.spacing.md : 0,
            transform: [{ scale: scaleAnim }],
            ...theme.shadows.lg,
          },
          style,
        ]}
      >
        <View style={styles.content}>
          <View style={styles.iconWrapper}>{icon}</View>
          {label && (
            <Text
              style={[
                styles.label,
                {
                  color: theme.colors.textInverse,
                  fontSize: theme.typography.fontSize.md,
                  fontFamily: theme.typography.fontFamily.medium,
                  marginLeft: theme.spacing.sm,
                },
              ]}
            >
              {label}
            </Text>
          )}
        </View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
  },
  fab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {},
});
