import React, { useRef, useEffect, useCallback, useState } from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  Pressable,
} from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { LogoCloudProps, LogoItem } from './LogoCloud.types';

const SIZE_MAP = {
  sm: { logoW: 80, logoH: 32, fontSize: 10 },
  md: { logoW: 120, logoH: 40, fontSize: 11 },
  lg: { logoW: 160, logoH: 48, fontSize: 12 },
};

const LogoItemView: React.FC<{
  logo: LogoItem;
  size: 'sm' | 'md' | 'lg';
  showName: boolean;
  itemStyle?: object;
  theme: ReturnType<typeof useTheme>;
}> = ({ logo, size, showName, itemStyle, theme }) => {
  const dim = SIZE_MAP[size];

  return (
    <View
      style={[
        {
          width: dim.logoW,
          height: dim.logoH,
          alignItems: 'center',
          justifyContent: 'center',
        },
        itemStyle,
      ]}
      accessibilityRole="image"
      accessibilityLabel={logo.name}
    >
      {(logo.image || logo.uri) && (
        <Image
          source={logo.image ?? { uri: logo.uri }}
          style={{
            width: dim.logoW * 0.7,
            height: dim.logoH * 0.7,
            resizeMode: 'contain',
          }}
        />
      )}
      {showName && (
        <Text
          style={{
            fontSize: dim.fontSize,
            fontWeight: '600',
            color: theme.colors.textSecondary,
            marginTop: 4,
            textAlign: 'center',
          }}
          numberOfLines={1}
        >
          {logo.name}
        </Text>
      )}
    </View>
  );
};

const GridVariant: React.FC<LogoCloudProps> = ({
  logos,
  size = 'md',
  showNames = false,
  animated = true,
  gap,
  logoStyle,
}) => {
  const theme = useTheme();
  const spacing = gap ?? theme.spacing.md;
  const anims = useRef(logos.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    if (!animated) {
      anims.forEach((a) => a.setValue(1));
      return;
    }
    const sequence = anims.map((anim, i) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 400,
        delay: i * 80,
        useNativeDriver: true,
      })
    );
    Animated.stagger(80, sequence).start();
  }, [animated, anims]);

  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: spacing,
      }}
    >
      {logos.map((logo, i) => {
        const opacity = anims[i];
        const scale = opacity.interpolate({
          inputRange: [0, 1],
          outputRange: [0.8, 1],
        });
        const Wrapper = logo.onPress ? Pressable : View;
        const wrapperProps = logo.onPress
          ? { onPress: logo.onPress }
          : {};

        return (
          <Animated.View
            key={logo.id}
            style={[{ opacity, transform: [{ scale }] }]}
          >
            <Wrapper
              {...wrapperProps}
              style={[
                {
                  backgroundColor: theme.colors.surface,
                  borderRadius: theme.radii.md,
                  padding: theme.spacing.md,
                  borderWidth: 1,
                  borderColor: theme.colors.border,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
                logoStyle,
              ]}
            >
              <LogoItemView
                logo={logo}
                size={size}
                showName={showNames}
                theme={theme}
              />
            </Wrapper>
          </Animated.View>
        );
      })}
    </View>
  );
};

const MarqueeVariant: React.FC<LogoCloudProps> = ({
  logos,
  size = 'md',
  showNames = false,
  marqueeSpeed = 1,
  marqueeDirection = 'left',
  pauseOnPress = false,
  gap,
  logoStyle,
}) => {
  const theme = useTheme();
  const spacing = gap ?? theme.spacing.lg;
  const translateX = useRef(new Animated.Value(0)).current;
  const [contentWidth, setContentWidth] = useState(0);
  const animRef = useRef<Animated.CompositeAnimation | null>(null);
  const isPaused = useRef(false);

  const duration = Math.max(500, 8000 / marqueeSpeed);

  const startAnim = useCallback(() => {
    if (contentWidth <= 0 || isPaused.current) return;
    translateX.setValue(0);
    const dist = contentWidth + spacing;
    const toVal = marqueeDirection === 'left' ? -dist : dist;
    animRef.current = Animated.loop(
      Animated.timing(translateX, {
        toValue: toVal,
        duration,
        useNativeDriver: true,
      }),
      { resetBeforeIteration: true }
    );
    animRef.current.start();
  }, [contentWidth, marqueeDirection, duration, spacing, translateX]);

  const stopAnim = useCallback(() => {
    animRef.current?.stop();
    animRef.current = null;
  }, []);

  useEffect(() => {
    if (contentWidth > 0 && !isPaused.current) startAnim();
    return () => stopAnim();
  }, [contentWidth, startAnim, stopAnim]);

  const handlePress = useCallback(() => {
    if (!pauseOnPress) return;
    isPaused.current = !isPaused.current;
    isPaused.current ? stopAnim() : startAnim();
  }, [pauseOnPress, startAnim, stopAnim]);

  const handleLayout = useCallback(
    (e: { nativeEvent: { layout: { width: number } } }) => {
      const w = e.nativeEvent.layout.width;
      if (w > 0 && w !== contentWidth) setContentWidth(w);
    },
    [contentWidth]
  );

  const row = (key: string) => (
    <View
      key={key}
      style={{ flexDirection: 'row', alignItems: 'center', gap: spacing }}
    >
      {logos.map((logo) => (
        <View
          key={`${key}-${logo.id}`}
          style={[
            {
              backgroundColor: theme.colors.surface,
              borderRadius: theme.radii.md,
              padding: theme.spacing.sm,
              borderWidth: 1,
              borderColor: theme.colors.border,
            },
            logoStyle,
          ]}
        >
          <LogoItemView
            logo={logo}
            size={size}
            showName={showNames}
            theme={theme}
          />
        </View>
      ))}
    </View>
  );

  const content = (
    <Animated.View
      style={{ flexDirection: 'row', transform: [{ translateX }] }}
    >
      <View onLayout={handleLayout} style={{ flexDirection: 'row' }}>
        {row('a')}
      </View>
      <View style={{ marginLeft: spacing, flexDirection: 'row' }}>
        {row('b')}
      </View>
    </Animated.View>
  );

  if (pauseOnPress) {
    return (
      <Pressable onPress={handlePress} style={{ overflow: 'hidden' }}>
        {content}
      </Pressable>
    );
  }
  return <View style={{ overflow: 'hidden' }}>{content}</View>;
};

const BlurFlipVariant: React.FC<LogoCloudProps> = ({
  logos,
  size = 'md',
  showNames = true,
  gap,
  logoStyle,
}) => {
  const theme = useTheme();
  const spacing = gap ?? theme.spacing.md;

  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: spacing,
      }}
    >
      {logos.map((logo) => (
        <BlurFlipItem
          key={logo.id}
          logo={logo}
          size={size}
          showName={showNames}
          theme={theme}
          logoStyle={logoStyle}
        />
      ))}
    </View>
  );
};

const BlurFlipItem: React.FC<{
  logo: LogoItem;
  size: 'sm' | 'md' | 'lg';
  showName: boolean;
  theme: ReturnType<typeof useTheme>;
  logoStyle?: object;
}> = ({ logo, size, showName, theme, logoStyle }) => {
  const fadeAnim = useRef(new Animated.Value(0.4)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(fadeAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1.05,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(fadeAnim, {
        toValue: 0.4,
        useNativeDriver: true,
        tension: 80,
        friction: 10,
      }),
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: true,
        tension: 80,
        friction: 10,
      }),
    ]).start();
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={logo.onPress}
    >
      <Animated.View
        style={[
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
            backgroundColor: theme.colors.surface,
            borderRadius: theme.radii.md,
            padding: theme.spacing.md,
            borderWidth: 1,
            borderColor: theme.colors.border,
            alignItems: 'center',
            justifyContent: 'center',
          },
          logoStyle,
        ]}
      >
        <LogoItemView
          logo={logo}
          size={size}
          showName={showName}
          theme={theme}
        />
      </Animated.View>
    </Pressable>
  );
};

const SpotlightVariant: React.FC<LogoCloudProps> = ({
  logos,
  size = 'md',
  showNames = true,
  gap,
  logoStyle,
}) => {
  const theme = useTheme();
  const spacing = gap ?? theme.spacing.md;

  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: spacing,
      }}
    >
      {logos.map((logo) => (
        <SpotlightItem
          key={logo.id}
          logo={logo}
          size={size}
          showName={showNames}
          theme={theme}
          logoStyle={logoStyle}
        />
      ))}
    </View>
  );
};

const SpotlightItem: React.FC<{
  logo: LogoItem;
  size: 'sm' | 'md' | 'lg';
  showName: boolean;
  theme: ReturnType<typeof useTheme>;
  logoStyle?: object;
}> = ({ logo, size, showName, theme, logoStyle }) => {
  const glowAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.timing(glowAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1.08,
        useNativeDriver: true,
        tension: 120,
        friction: 8,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.timing(glowAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 80,
        friction: 10,
      }),
    ]).start();
  };

  const shadowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.05, 0.3],
  });

  const borderColorAnim = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.border, theme.colors.primary],
  });

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={logo.onPress}
    >
      <Animated.View
        style={[
          {
            transform: [{ scale: scaleAnim }],
            backgroundColor: theme.colors.background,
            borderRadius: theme.radii.lg,
            padding: theme.spacing.lg,
            borderWidth: 1.5,
            borderColor: borderColorAnim,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: theme.colors.primary,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity,
            shadowRadius: 20,
            elevation: 4,
          },
          logoStyle,
        ]}
      >
        <LogoItemView
          logo={logo}
          size={size}
          showName={showName}
          theme={theme}
        />
      </Animated.View>
    </Pressable>
  );
};

export const LogoCloud: React.FC<LogoCloudProps> = (props) => {
  const {
    variant = 'grid',
    title,
    subtitle,
    style,
  } = props;

  const theme = useTheme();

  return (
    <View style={[{ alignItems: 'center' }, style]}>
      {title && (
        <Text
          style={{
            fontSize: 16,
            fontWeight: '700',
            color: theme.colors.text,
            textAlign: 'center',
            marginBottom: subtitle ? 4 : theme.spacing.lg,
            letterSpacing: -0.3,
          }}
        >
          {title}
        </Text>
      )}
      {subtitle && (
        <Text
          style={{
            fontSize: 13,
            color: theme.colors.textSecondary,
            textAlign: 'center',
            marginBottom: theme.spacing.lg,
            lineHeight: 20,
          }}
        >
          {subtitle}
        </Text>
      )}
      {variant === 'grid' && <GridVariant {...props} />}
      {variant === 'marquee' && <MarqueeVariant {...props} />}
      {variant === 'blur-flip' && <BlurFlipVariant {...props} />}
      {variant === 'spotlight' && <SpotlightVariant {...props} />}
    </View>
  );
};
