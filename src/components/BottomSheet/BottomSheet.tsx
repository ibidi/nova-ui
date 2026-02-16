import React, { useRef, useEffect } from 'react';
import {
  Modal,
  View,
  Pressable,
  Animated,
  StyleSheet,
  Dimensions,
  PanResponder,
} from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { BottomSheetProps, BottomSheetHeight } from './BottomSheet.types';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const DRAG_THRESHOLD = 100;

export const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  height = 'auto',
  showHandle = true,
  closeOnBackdrop = true,
  style,
  children,
}) => {
  const theme = useTheme();
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  const heightMap: Record<BottomSheetHeight, number | 'auto'> = {
    auto: 'auto',
    half: SCREEN_HEIGHT * 0.5,
    full: SCREEN_HEIGHT * 0.9,
  };

  const contentHeight = heightMap[height];

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dy > 5;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > DRAG_THRESHOLD || gestureState.vy > 0.5) {
          closeSheet();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            tension: 80,
            friction: 12,
          }).start();
        }
      },
    })
  ).current;

  const openSheet = () => {
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 80,
        friction: 12,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeSheet = () => {
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: SCREEN_HEIGHT,
        useNativeDriver: true,
        tension: 80,
        friction: 12,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => onClose());
  };

  useEffect(() => {
    if (visible) {
      translateY.setValue(SCREEN_HEIGHT);
      backdropOpacity.setValue(0);
      openSheet();
    }
  }, [visible]);

  if (!visible) {
    return null;
  }

  const contentStyle =
    contentHeight === 'auto'
      ? { maxHeight: SCREEN_HEIGHT * 0.9 }
      : { height: contentHeight };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={closeSheet}
      statusBarTranslucent
    >
      <View style={styles.wrapper}>
        <Animated.View
          style={[
            styles.backdrop,
            {
              backgroundColor: theme.colors.overlay,
              opacity: backdropOpacity,
            },
          ]}
        >
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={closeOnBackdrop ? closeSheet : undefined}
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.content,
            {
              backgroundColor: theme.colors.surface,
              borderTopLeftRadius: theme.radii.xl,
              borderTopRightRadius: theme.radii.xl,
              transform: [{ translateY }],
              ...contentStyle,
            },
            style,
          ]}
          {...panResponder.panHandlers}
        >
          {showHandle && (
            <View style={styles.handleContainer}>
              <View
                style={[
                  styles.handle,
                  { backgroundColor: theme.colors.border },
                ]}
              />
            </View>
          )}
          <View style={styles.children}>{children}</View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingBottom: 34,
  },
  handleContainer: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 8,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  children: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});
