import React, { useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  Pressable,
  Animated,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { OTPInputProps } from './OTPInput.types';

export const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  value,
  onValueChange,
  onComplete,
  secureEntry = false,
  disabled = false,
  error = false,
  autoFocus = false,
  style,
  cellStyle,
  textStyle,
}) => {
  const theme = useTheme();
  const inputRef = useRef<TextInput>(null);
  const cursorAnim = useRef(new Animated.Value(1)).current;
  const cellScaleAnims = useRef(
    Array.from({ length }, () => new Animated.Value(1))
  ).current;

  const digits = value.split('').slice(0, length);
  const activeIndex = Math.min(digits.length, length - 1);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(cursorAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(cursorAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [cursorAnim]);

  useEffect(() => {
    if (digits.length > 0 && digits.length <= length) {
      const idx = digits.length - 1;
      const anim = cellScaleAnims[idx];
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 1.15,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [value, length, cellScaleAnims]);

  useEffect(() => {
    if (value.length === length && onComplete) {
      onComplete(value);
    }
  }, [value, length, onComplete]);

  const handleChangeText = (text: string) => {
    const filtered = text.replace(/\D/g, '').slice(0, length);
    onValueChange(filtered);
  };

  const cursorOpacity = cursorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const borderColor = error ? theme.colors.error : theme.colors.primary;
  const inactiveBorder = theme.colors.border;

  return (
    <Pressable
      onPress={() => !disabled && inputRef.current?.focus()}
      style={[styles.wrapper, disabled && styles.disabled, style]}
      accessibilityRole="none"
    >
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={handleChangeText}
        maxLength={length}
        keyboardType="number-pad"
        autoFocus={autoFocus}
        editable={!disabled}
        secureTextEntry={secureEntry}
        style={styles.hiddenInput}
        caretHidden
        accessibilityLabel="OTP input"
      />
      <View style={styles.cellsRow}>
        {Array.from({ length }, (_, i) => {
          const isActive = i === activeIndex;
          const char = digits[i];
          const showCursor = isActive && value.length === i;

          return (
            <Animated.View
              key={i}
              style={[
                styles.cell,
                {
                  borderColor: isActive ? borderColor : inactiveBorder,
                  borderWidth: isActive ? 2 : 1,
                  borderRadius: theme.radii.sm,
                  marginHorizontal: theme.spacing.xs,
                },
                { transform: [{ scale: cellScaleAnims[i] }] },
                cellStyle,
              ]}
            >
              {char ? (
                <Text
                  style={[
                    styles.cellText,
                    {
                      color: theme.colors.text,
                      fontSize: theme.typography.fontSize.xl,
                      fontFamily: theme.typography.fontFamily.medium,
                    },
                    textStyle,
                  ]}
                >
                  {secureEntry ? '•' : char}
                </Text>
              ) : showCursor ? (
                <Animated.View
                  style={[
                    styles.cursor,
                    {
                      backgroundColor: theme.colors.primary,
                      opacity: cursorOpacity,
                    },
                  ]}
                />
              ) : null}
            </Animated.View>
          );
        })}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  hiddenInput: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
  cellsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cell: {
    width: 44,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellText: {},
  cursor: {
    width: 2,
    height: 24,
    borderRadius: 1,
  },
});
