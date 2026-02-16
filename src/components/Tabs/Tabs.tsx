import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Animated,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { TabsProps, TabSize } from './Tabs.types';

const SIZE_MAP: Record<TabSize, { paddingH: number; paddingV: number; fontSize: number }> = {
  sm: { paddingH: 12, paddingV: 8, fontSize: 13 },
  md: { paddingH: 16, paddingV: 10, fontSize: 15 },
  lg: { paddingH: 20, paddingV: 12, fontSize: 17 },
};

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  variant = 'underline',
  size = 'md',
  fullWidth = false,
  style,
  tabStyle,
  labelStyle,
}) => {
  const theme = useTheme();
  const scrollRef = useRef<ScrollView>(null);
  const [tabLayouts, setTabLayouts] = useState<Record<string, { x: number; width: number }>>({});
  const indicatorAnim = useRef(new Animated.Value(0)).current;
  const indicatorWidthAnim = useRef(new Animated.Value(0)).current;

  const activeIndex = tabs.findIndex((t) => t.key === activeTab);
  const activeLayout = activeIndex >= 0 ? tabLayouts[tabs[activeIndex].key] : null;

  useEffect(() => {
    if (activeLayout) {
      Animated.parallel([
        Animated.spring(indicatorAnim, {
          toValue: activeLayout.x,
          useNativeDriver: false,
          tension: 80,
          friction: 12,
        }),
        Animated.spring(indicatorWidthAnim, {
          toValue: activeLayout.width,
          useNativeDriver: false,
          tension: 80,
          friction: 12,
        }),
      ]).start();
    }
  }, [activeLayout, indicatorAnim, indicatorWidthAnim]);

  const handleTabLayout = (key: string) => (event: { nativeEvent: { layout: { x: number; width: number } } }) => {
    const { x, width } = event.nativeEvent.layout;
    setTabLayouts((prev) => ({ ...prev, [key]: { x, width } }));
  };

  const sizeStyle = SIZE_MAP[size];
  const primaryColor = theme.colors.primary;
  const inactiveColor = theme.colors.textSecondary;

  return (
    <View style={[styles.container, fullWidth && styles.fullWidth, style]}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, fullWidth && styles.scrollContentFull]}
      >
        {tabs.map((tab) => {
          const isActive = tab.key === activeTab;
          const labelColor = isActive ? primaryColor : inactiveColor;

          return (
            <Pressable
              key={tab.key}
              onPress={() => onTabChange(tab.key)}
              onLayout={handleTabLayout(tab.key)}
              style={[
                styles.tab,
                {
                  paddingHorizontal: sizeStyle.paddingH,
                  paddingVertical: sizeStyle.paddingV,
                  ...(fullWidth && { flex: 1 }),
                },
                variant === 'pill' && isActive && {
                  backgroundColor: primaryColor + '20',
                  borderRadius: theme.radii.full,
                },
                variant === 'soft' && isActive && {
                  backgroundColor: theme.colors.surfaceVariant,
                  borderRadius: theme.radii.md,
                },
                tabStyle,
              ]}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
            >
              {tab.icon != null && <View style={styles.icon}>{tab.icon}</View>}
              <Text
                style={[
                  {
                    fontSize: sizeStyle.fontSize,
                    fontFamily: theme.typography.fontFamily.medium,
                    color: labelColor,
                  },
                  labelStyle,
                ]}
              >
                {tab.label}
              </Text>
            </Pressable>
          );
        })}

        {variant === 'underline' && activeLayout && (
          <Animated.View
            style={[
              styles.indicator,
              {
                backgroundColor: primaryColor,
                left: 0,
                transform: [
                  { translateX: indicatorAnim },
                  { translateY: 0 },
                ],
                width: indicatorWidthAnim,
              },
            ]}
          />
        )}
      </ScrollView>

      {variant === 'underline' && (
        <View
          style={[
            styles.underlineTrack,
            { borderBottomColor: theme.colors.borderLight },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  fullWidth: {
    width: '100%',
  },
  scrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollContentFull: {
    flex: 1,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 6,
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    borderRadius: 1.5,
  },
  underlineTrack: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderBottomWidth: 1,
  },
});
