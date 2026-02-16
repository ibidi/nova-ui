import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  PanResponder,
  Animated,
  Text,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { SliderProps, SliderColor } from './Slider.types';

const THUMB_SIZE = 24;
const TRACK_HEIGHT = 4;

const colorKeyMap: Record<SliderColor, keyof import('../../theme/types').NovaColors> = {
  primary: 'primary',
  secondary: 'secondary',
  success: 'success',
  warning: 'warning',
  error: 'error',
};

export const Slider: React.FC<SliderProps> = ({
  value,
  onValueChange,
  onSlidingComplete,
  min = 0,
  max = 1,
  step,
  disabled = false,
  color = 'primary',
  showValue = false,
  style,
}) => {
  const theme = useTheme();
  const [trackWidth, setTrackWidth] = useState(0);
  const thumbPosition = useRef(new Animated.Value(0)).current;

  const colorValue = theme.colors[colorKeyMap[color]];
  const range = max - min;
  const clampedValue = Math.min(max, Math.max(min, value));
  const normalizedValue = range > 0 ? (clampedValue - min) / range : 0;

  const updatePosition = useCallback(
    (rawValue: number) => {
      let val = rawValue;
      if (step && step > 0) {
        const steps = Math.round(val / step);
        val = steps * step;
      }
      val = Math.min(1, Math.max(0, val));
      const actualValue = min + val * range;
      onValueChange(actualValue);
    },
    [min, range, step, onValueChange]
  );

  const trackRef = useRef<View>(null);
  const trackLayoutRef = useRef({ x: 0, width: 0 });

  const handleTouch = useCallback(
    (pageX: number) => {
      const { x, width } = trackLayoutRef.current;
      if (width <= 0) return;
      const val = Math.min(1, Math.max(0, (pageX - x - THUMB_SIZE / 2) / (width - THUMB_SIZE)));
      updatePosition(val);
    },
    [updatePosition]
  );

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled,
      onMoveShouldSetPanResponder: () => !disabled,
      onPanResponderGrant: (evt) => {
        if (disabled) return;
        trackRef.current?.measureInWindow((winX, _y, winWidth) => {
          trackLayoutRef.current.x = winX;
          if (winWidth > 0) trackLayoutRef.current.width = winWidth;
          handleTouch(evt.nativeEvent.pageX);
        });
      },
      onPanResponderMove: (evt) => {
        if (disabled) return;
        handleTouch(evt.nativeEvent.pageX);
      },
      onPanResponderRelease: (evt) => {
        if (disabled) return;
        handleTouch(evt.nativeEvent.pageX);
        const { x, width } = trackLayoutRef.current;
        if (width > 0) {
          const val = Math.min(1, Math.max(0, (evt.nativeEvent.pageX - x - THUMB_SIZE / 2) / (width - THUMB_SIZE)));
          const actualValue = min + val * range;
          onSlidingComplete?.(actualValue);
        }
      },
    })
  ).current;

  React.useEffect(() => {
    if (trackWidth > 0) {
      const position = normalizedValue * (trackWidth - THUMB_SIZE);
      thumbPosition.setValue(position);
    }
  }, [normalizedValue, trackWidth, thumbPosition]);

  const onTrackLayout = useCallback((e: { nativeEvent: { layout: { width: number } } }) => {
    const { width } = e.nativeEvent.layout;
    setTrackWidth(width);
    trackLayoutRef.current.width = width;
  }, []);

  const fillWidth = trackWidth > 0 ? normalizedValue * (trackWidth - THUMB_SIZE) + THUMB_SIZE / 2 : 0;

  return (
    <View style={[styles.wrapper, disabled && styles.disabled, style]}>
      {showValue && (
        <Text
          style={[
            styles.valueText,
            {
              color: theme.colors.textSecondary,
              fontSize: theme.typography.fontSize.sm,
              fontFamily: theme.typography.fontFamily.medium,
              marginBottom: theme.spacing.xs,
            },
          ]}
        >
          {clampedValue.toFixed(step ? 2 : 1)}
        </Text>
      )}
      <View
        ref={trackRef}
        onLayout={onTrackLayout}
        style={[
          styles.trackContainer,
          {
            height: THUMB_SIZE,
            paddingVertical: (THUMB_SIZE - TRACK_HEIGHT) / 2,
          },
        ]}
        {...panResponder.panHandlers}
      >
        <View
          style={[
            styles.track,
            {
              height: TRACK_HEIGHT,
              borderRadius: TRACK_HEIGHT / 2,
              backgroundColor: theme.colors.surfaceVariant,
            },
          ]}
        >
          <View
            style={[
              styles.fill,
              {
                width: fillWidth,
                height: TRACK_HEIGHT,
                borderRadius: TRACK_HEIGHT / 2,
                backgroundColor: colorValue,
              },
            ]}
          />
        </View>
        <Animated.View
          style={[
            styles.thumb,
            {
              width: THUMB_SIZE,
              height: THUMB_SIZE,
              borderRadius: THUMB_SIZE / 2,
              backgroundColor: colorValue,
              ...theme.shadows.sm,
              transform: [{ translateX: thumbPosition }],
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  disabled: {
    opacity: 0.5,
  },
  valueText: {},
  trackContainer: {
    justifyContent: 'center',
    position: 'relative',
  },
  track: {
    width: '100%',
    overflow: 'hidden',
  },
  fill: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  thumb: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
});
