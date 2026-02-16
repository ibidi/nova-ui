import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  View,
  TextInput,
  Text,
  Pressable,
  ActivityIndicator,
  Animated,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { SearchBarProps } from './SearchBar.types';

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onClear,
  onSubmit,
  placeholder = 'Search...',
  loading = false,
  disabled = false,
  style,
  onFocus,
  onBlur,
  ...rest
}) => {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);
  const borderAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(borderAnim, {
      toValue: focused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [focused, borderAnim]);

  const borderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.border, theme.colors.primary],
  });

  const handleFocus = useCallback(
    (e: Parameters<NonNullable<typeof onFocus>>[0]) => {
      setFocused(true);
      onFocus?.(e);
    },
    [onFocus]
  );

  const handleBlur = useCallback(
    (e: Parameters<NonNullable<typeof onBlur>>[0]) => {
      setFocused(false);
      onBlur?.(e);
    },
    [onBlur]
  );

  const handleClear = useCallback(() => {
    onChangeText('');
    onClear?.();
  }, [onChangeText, onClear]);

  const handleSubmitEditing = useCallback(() => {
    onSubmit?.();
  }, [onSubmit]);

  const showClear = value.length > 0 && !loading;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surfaceVariant,
          borderRadius: theme.radii.full,
          borderWidth: 1,
          borderColor,
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.sm,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      <View style={styles.inner}>
        <Text style={[styles.icon, { color: theme.colors.textSecondary }]}>
          {'\u2315'}
        </Text>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textDisabled}
          editable={!disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onSubmitEditing={handleSubmitEditing}
          returnKeyType="search"
          style={[
            styles.input,
            {
              color: theme.colors.text,
              fontFamily: theme.typography.fontFamily.regular,
              fontSize: theme.typography.fontSize.md,
            },
          ]}
          accessibilityLabel={placeholder}
          accessibilityState={{ disabled }}
          {...rest}
        />
        {loading && (
          <ActivityIndicator
            size="small"
            color={theme.colors.primary}
            style={styles.rightAction}
          />
        )}
        {showClear && !loading && (
          <Pressable
            onPress={handleClear}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Clear search"
            style={[styles.rightAction, styles.clearBtn]}
          >
            <Text
              style={{
                fontSize: theme.typography.fontSize.md,
                color: theme.colors.textSecondary,
                lineHeight: theme.typography.fontSize.md,
              }}
            >
              ✕
            </Text>
          </Pressable>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 44,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 18,
    marginRight: 10,
  },
  input: {
    flex: 1,
    padding: 0,
    margin: 0,
  },
  rightAction: {
    marginLeft: 8,
  },
  clearBtn: {
    padding: 4,
  },
});
