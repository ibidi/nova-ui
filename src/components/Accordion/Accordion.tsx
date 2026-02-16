import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  StyleSheet,
  LayoutChangeEvent,
} from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { AccordionProps, AccordionItem } from './Accordion.types';

interface AccordionItemViewProps {
  item: AccordionItem;
  isExpanded: boolean;
  onPress: () => void;
  theme: ReturnType<typeof useTheme>;
}

const AccordionItemView: React.FC<AccordionItemViewProps> = ({
  item,
  isExpanded,
  onPress,
  theme,
}) => {
  const heightAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const contentHeight = useRef(0);

  const handleContentLayout = (e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout;
    contentHeight.current = height;
    if (isExpanded && height > 0) {
      Animated.timing(heightAnim, {
        toValue: height,
        duration: 250,
        useNativeDriver: false,
      }).start();
    }
  };

  useEffect(() => {
    if (!isExpanded) {
      Animated.parallel([
        Animated.timing(heightAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: false,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
      if (contentHeight.current > 0) {
        Animated.timing(heightAnim, {
          toValue: contentHeight.current,
          duration: 250,
          useNativeDriver: false,
        }).start();
      }
    }
  }, [isExpanded, heightAnim, rotateAnim]);

  const chevronRotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View
      style={[
        styles.item,
        {
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
        },
      ]}
    >
      <Pressable
        onPress={onPress}
        style={[
          styles.header,
          {
            backgroundColor: theme.colors.surfaceVariant,
            paddingHorizontal: theme.spacing.md,
            paddingVertical: theme.spacing.sm,
          },
        ]}
        accessibilityRole="button"
        accessibilityState={{ expanded: isExpanded }}
      >
        <Text
          style={[
            styles.title,
            {
              color: theme.colors.text,
              fontFamily: theme.typography.fontFamily.medium,
              fontSize: theme.typography.fontSize.md,
              flex: 1,
            },
          ]}
        >
          {item.title}
        </Text>
        <Animated.Text
          style={[
            styles.chevron,
            {
              color: theme.colors.textSecondary,
              fontSize: theme.typography.fontSize.lg,
              transform: [{ rotate: chevronRotate }],
            },
          ]}
        >
          {'\u203A'}
        </Animated.Text>
      </Pressable>
      <Animated.View
        style={[
          styles.contentWrapper,
          {
            overflow: 'hidden',
            height: heightAnim,
          },
        ]}
      >
        <View
          onLayout={handleContentLayout}
          style={[
            styles.content,
            {
              paddingHorizontal: theme.spacing.md,
              paddingVertical: theme.spacing.sm,
              backgroundColor: theme.colors.surface,
            },
          ]}
        >
          {item.content}
        </View>
      </Animated.View>
    </View>
  );
};

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultExpandedKeys = [],
  style,
}) => {
  const theme = useTheme();
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(
    () => new Set(defaultExpandedKeys)
  );

  const toggleItem = (key: string) => {
    setExpandedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        if (!allowMultiple) {
          next.clear();
        }
        next.add(key);
      }
      return next;
    });
  };

  return (
    <View style={[styles.container, style]}>
      {items.map((item) => (
        <AccordionItemView
          key={item.key}
          item={item}
          isExpanded={expandedKeys.has(item.key)}
          onPress={() => toggleItem(item.key)}
          theme={theme}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  item: {},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {},
  chevron: {
    lineHeight: 24,
  },
  contentWrapper: {},
  content: {},
});
